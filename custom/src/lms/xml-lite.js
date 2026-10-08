/**
 * A small XML reader for the Canvas import: elements, attributes, text,
 * CDATA, entities; comments and processing instructions are skipped. Names
 * lose their namespace prefix (qti:item → item). The same code runs in the
 * browser and in Node, which has no DOMParser.
 *
 *   const doc = parseXml(text);        // the root element
 *   child(doc, "title"), children(doc, "item"), find(doc, "mattext"),
 *   findAll(doc, "response_label"), textOf(node), childText(doc, "title")
 */
const ENTITIES = { lt: "<", gt: ">", amp: "&", quot: '"', apos: "'", nbsp: " " };

/** Decode XML/HTML character references and the common named entities. */
export function decodeEntities(s) {
  return String(s).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === "#") {
      const code = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

const local = (name) => name.slice(name.indexOf(":") + 1);

/** Parse XML text into { name, attrs, children, text } nodes; returns the root element. */
export function parseXml(text) {
  const src = String(text || "");
  const root = { name: "#document", attrs: {}, children: [], text: "" };
  const stack = [root];
  const re = /<!\[CDATA\[([\s\S]*?)\]\]>|<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<!DOCTYPE[^>]*>|<\/([^\s>]+)\s*>|<([^\s/>]+)((?:\s+[^\s=/>]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>|([^<]+)/gi;
  for (const m of src.matchAll(re)) {
    const top = stack[stack.length - 1];
    if (m[1] !== undefined) top.text += m[1];
    else if (m[2]) {
      const name = local(m[2]);
      // close up to the matching element (tolerates small slips)
      for (let i = stack.length - 1; i > 0; i--) {
        if (stack[i].name === name) {
          stack.length = i;
          break;
        }
      }
    } else if (m[3]) {
      const node = { name: local(m[3]), attrs: {}, children: [], text: "" };
      for (const a of (m[4] || "").matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
        node.attrs[local(a[1])] = decodeEntities(a[2] ?? a[3] ?? a[4] ?? "");
      }
      top.children.push(node);
      if (!m[5]) stack.push(node);
    } else if (m[6] !== undefined) top.text += decodeEntities(m[6]);
  }
  return root.children[0] || root;
}

/** The first child element named `name`. */
export const child = (node, name) => node?.children?.find((c) => c.name === name) || null;

/** All child elements named `name`. */
export const children = (node, name) => (node?.children || []).filter((c) => c.name === name);

/** The first descendant element named `name` (depth first). */
export function find(node, name) {
  for (const c of node?.children || []) {
    if (c.name === name) return c;
    const hit = find(c, name);
    if (hit) return hit;
  }
  return null;
}

/** All descendant elements named `name`. */
export function findAll(node, name, out = []) {
  for (const c of node?.children || []) {
    if (c.name === name) out.push(c);
    findAll(c, name, out);
  }
  return out;
}

/** A node's text, trimmed. */
export const textOf = (node) => (node ? node.text.trim() : "");

/** The text of the first child named `name`. */
export const childText = (node, name) => textOf(child(node, name));
