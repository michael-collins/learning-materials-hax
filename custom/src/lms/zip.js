/**
 * A minimal zip writer (stored, no compression) and reader (stored or
 * deflated, through the platform's DecompressionStream, which browsers and
 * Node 18+ have), with no other dependencies: the book exports, the LMS
 * exports and the Canvas import share it.
 */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(bytes) {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/** files: [{ name, data: string | Uint8Array }] → the zip file's bytes */
export function zipBytes(files) {
  const enc = new TextEncoder();
  const parts = [];
  const central = [];
  let offset = 0;
  for (const f of files) {
    const name = enc.encode(f.name);
    const data = typeof f.data === "string" ? enc.encode(f.data) : f.data;
    const crc = crc32(data);
    const local = new DataView(new ArrayBuffer(30));
    local.setUint32(0, 0x04034b50, true);
    local.setUint16(4, 20, true);
    local.setUint16(6, 0x0800, true); // UTF-8 names
    local.setUint32(14, crc, true);
    local.setUint32(18, data.length, true);
    local.setUint32(22, data.length, true);
    local.setUint16(26, name.length, true);
    parts.push(local.buffer, name, data);
    const dir = new DataView(new ArrayBuffer(46));
    dir.setUint32(0, 0x02014b50, true);
    dir.setUint16(4, 20, true);
    dir.setUint16(6, 20, true);
    dir.setUint16(8, 0x0800, true);
    dir.setUint32(16, crc, true);
    dir.setUint32(20, data.length, true);
    dir.setUint32(24, data.length, true);
    dir.setUint16(28, name.length, true);
    dir.setUint32(42, offset, true);
    central.push(dir.buffer, name);
    offset += 30 + name.length + data.length;
  }
  const size = central.reduce((n, p) => n + (p.byteLength ?? p.length), 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true);
  end.setUint16(8, files.length, true);
  end.setUint16(10, files.length, true);
  end.setUint32(12, size, true);
  end.setUint32(16, offset, true);
  const out = new Uint8Array(offset + size + 22);
  let at = 0;
  for (const p of [...parts, ...central, end.buffer]) {
    const bytes = p instanceof Uint8Array ? p : new Uint8Array(p);
    out.set(bytes, at);
    at += bytes.length;
  }
  return out;
}


// inflate raw deflate data with the platform's DecompressionStream
async function inflateRaw(bytes) {
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

/**
 * Read a zip: { names, has(name), bytes(name), text(name) }. Entries are
 * inflated when first read. Names are as stored (a single wrapping folder,
 * which some tools add, is stripped).
 */
export function readZip(input) {
  const buf = input instanceof Uint8Array ? input : new Uint8Array(input);
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  // the end of central directory record: the last signature in the file
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) {
    if (view.getUint32(i, true) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error("This isn't a zip file (no central directory).");
  const count = view.getUint16(eocd + 10, true);
  let at = view.getUint32(eocd + 16, true);
  const dec = new TextDecoder();
  const entries = new Map();
  for (let n = 0; n < count; n++) {
    if (view.getUint32(at, true) !== 0x02014b50) throw new Error("The zip's central directory is damaged.");
    const method = view.getUint16(at + 10, true);
    const compressed = view.getUint32(at + 20, true);
    const nameLen = view.getUint16(at + 28, true);
    const extraLen = view.getUint16(at + 30, true);
    const commentLen = view.getUint16(at + 32, true);
    const local = view.getUint32(at + 42, true);
    const name = dec.decode(buf.subarray(at + 46, at + 46 + nameLen));
    if (!name.endsWith("/") && !/(^|\/)(__MACOSX|\.DS_Store|thumbs\.db)/i.test(name)) entries.set(name, { method, compressed, local });
    at += 46 + nameLen + extraLen + commentLen;
  }
  // a single wrapping folder (Foo/imsmanifest.xml) is tolerated
  const names = [...entries.keys()];
  const wrap = names.length && !entries.has("imsmanifest.xml") && names.every((x) => x.startsWith(names[0].split("/")[0] + "/")) ? names[0].split("/")[0] + "/" : "";
  const byName = new Map(names.map((x) => [wrap ? x.slice(wrap.length) : x, entries.get(x)]));
  const cache = new Map();
  const bytes = async (name) => {
    const e = byName.get(name);
    if (!e) return null;
    if (!cache.has(name)) {
      const nameLen = view.getUint16(e.local + 26, true);
      const extraLen = view.getUint16(e.local + 28, true);
      const start = e.local + 30 + nameLen + extraLen;
      const raw = buf.subarray(start, start + e.compressed);
      if (e.method !== 0 && e.method !== 8) throw new Error(`${name}: compression method ${e.method} isn't supported.`);
      cache.set(name, e.method === 8 ? inflateRaw(raw) : Promise.resolve(raw));
    }
    return cache.get(name);
  };
  return {
    names: [...byName.keys()],
    has: (name) => byName.has(name),
    bytes,
    text: async (name) => {
      const b = await bytes(name);
      return b ? dec.decode(b) : null;
    },
  };
}
