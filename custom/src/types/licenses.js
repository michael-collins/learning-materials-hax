/**
 * Licences as the Decap site lists them, and how to show one: name, deed
 * link and the Creative Commons badge icons.
 */
export const LICENSES = ["CC BY 4.0", "CC BY-SA 4.0", "CC BY-NC 4.0", "CC BY-NC-SA 4.0", "CC BY-ND 4.0", "CC BY-NC-ND 4.0", "CC0 1.0", "Public domain", "All Rights Reserved"];

/** HAX select options: { value: label }, with "—" for none. */
export const LICENSE_OPTIONS = Object.fromEntries([["", "—"], ...LICENSES.map((l) => [l, l])]);

// "CC BY-NC-SA 4.0" → { name, url, parts } (parts name the badge icons)
export function ccLicense(code) {
  const c = String(code || "").trim();
  if (!c || /all rights reserved/i.test(c)) return null;
  if (/^cc0/i.test(c)) return { name: "CC0 1.0", url: "https://creativecommons.org/publicdomain/zero/1.0/", parts: ["cc", "zero"] };
  if (/^public domain$/i.test(c)) return { name: "Public domain", url: "https://creativecommons.org/publicdomain/mark/1.0/", parts: ["pd"] };
  const m = c.match(/^CC\s+([A-Z-]+)\s+(\d\.\d)$/i);
  if (!m) return { name: c, url: "", parts: [] };
  const terms = m[1].toLowerCase();
  return { name: c, url: `https://creativecommons.org/licenses/${terms}/${m[2]}/`, parts: ["cc", ...terms.split("-")] };
}

export const ccIcon = (part) => `https://mirrors.creativecommons.org/presskit/icons/${part}.svg`;
