/**
 * The selection inside shadow roots, read and placed the same way in every
 * browser. The page's content (hax-body) and the fields blocks draw sit in
 * shadow roots, where the engines differ:
 *
 * - Reading: Chrome has the selection on the shadow root itself
 *   (ShadowRoot.getSelection). Firefox's document selection holds the nodes
 *   inside shadow roots. Safari's (WebKit) stops at the outermost shadow
 *   host, at offset 0, and only getComposedRanges reaches inside: WebKit 18
 *   takes the shadow roots as arguments, and throws on the standard form (a
 *   dictionary), which is tried second.
 * - Placing: Selection.setBaseAndExtent and collapse take nodes inside
 *   shadow roots in all three. WebKit ignores addRange with such a range
 *   (the selection stays empty), so it's never used.
 *
 *   const range = getEditRange(el); // a copy, in el's tree, or null
 *   range.collapse(false);
 *   setEditRange(range);            // the caret at the selection's end
 */

/** The Selection that node's tree reads and places the selection with. */
export function editSelection(node) {
  return node?.getRootNode?.().getSelection?.() || globalThis.document.getSelection();
}

/**
 * The selection as a Range in the tree node is in (its shadow root, or the
 * document), or null when there's none or it's somewhere else. It's a
 * copy: changing it moves nothing until it's given to setEditRange.
 */
export function getEditRange(node) {
  const root = node?.getRootNode?.();
  const sel = editSelection(node);
  if (!root || !sel?.rangeCount) return null;
  const live = sel.getRangeAt(0);
  if (live.startContainer.getRootNode() === root) return live.cloneRange();
  if (!(root instanceof ShadowRoot) || !sel.getComposedRanges) return null;
  // node's shadow root and the ones around it, out to the document
  const roots = [];
  for (let r = root; r instanceof ShadowRoot; r = r.host.getRootNode()) roots.push(r);
  const inRoot = (r) => r?.startContainer.getRootNode() === root && r.endContainer.getRootNode() === root;
  let composed = null;
  for (const args of [roots, [{ shadowRoots: roots }]]) {
    try {
      [composed] = sel.getComposedRanges(...args);
    } catch {
      composed = null;
    }
    if (inRoot(composed)) break;
  }
  if (!inRoot(composed)) return null;
  const range = globalThis.document.createRange();
  range.setStart(composed.startContainer, composed.startOffset);
  range.setEnd(composed.endContainer, composed.endOffset);
  return range;
}

/**
 * Select a Range or StaticRange (a collapsed one puts the caret there), in
 * any tree. An editable element needs focus first; that's the caller's.
 */
export function setEditRange(range) {
  editSelection(range.startContainer)?.setBaseAndExtent(range.startContainer, range.startOffset, range.endContainer, range.endOffset);
}
