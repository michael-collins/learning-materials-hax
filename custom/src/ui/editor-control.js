/**
 * editorControl() — a Lit directive for a control a block draws in its own
 * shadow DOM while editing (a button, a field, the hero's image field):
 * HAX never sees the control's pointer, key, focus or paste events, so the
 * control keeps focus and its keys don't edit the page (nu-hax
 * docs/editor-redesign/spec.md §6.2 #5, docs/editor-spikes/structure.md S7).
 *
 *   html`<button ${editorControl()} @click="${…}">Change image</button>`
 *   html`<oer-image-field ${editorControl()} …></oer-image-field>`
 *
 * What HAX does with them, without it (HAX 26.8.1):
 * - click: hax-body's window click listener (scrollerFixclickEvent)
 *   positions its menus, which sets contenteditable on the active block
 *   again, and any change to that blurs a focused control.
 * - focus and dblclick: the text toolbar leaves listeners on every block it
 *   ever made its target (targetHandlers makes new ones each time, so
 *   unsetTarget never removes them), and a block hears focus when anything
 *   in its shadow DOM takes it: the block became the toolbar's target again,
 *   with role="textbox", and the control lost focus.
 *   rich-text-editor/lib/toolbars/rich-text-editor-toolbar.js targetHandlers
 *   1663, setTarget 1593.
 * - pointerdown, mousedown, focusin: hax-body makes the block active and
 *   moves focus to its toolbar. hax-body/hax-body.js _mouseDown 936,
 *   _focusIn 4049.
 * - keydown, keyup, paste: HAX acts on keys and pastes at the last caret
 *   in the content.
 * The events still reach the control's own listeners; they stop at it.
 *
 * Put it on the control itself, or on an element that draws controls in
 * its own shadow root (as oer-image-field does): focus doesn't bubble, so
 * a wrapper <div> around a button wouldn't hear it.
 *
 * The theme can't import Lit's directive module (the site's import map
 * only maps @haxtheweb/, see lit.js), so this is a directive by Lit's own
 * protocol (lit-html/directive.js): its value is { _$litDirective$: class,
 * values }, and Lit makes one of the class for the element, initializes it
 * and asks it to resolve each render, under names Lit's builds give those
 * methods across its packages (_$AT and _$AS; _$initialize and _$resolve
 * in its development build).
 */

// what HAX takes from a control (see above)
export const CONTROL_EVENTS = ["pointerdown", "mousedown", "click", "dblclick", "focus", "focusin", "keydown", "keyup", "paste"];

const stop = (e) => e.stopPropagation();
const kept = new WeakSet();

/** Whether an element is a control kept from HAX this way (the editor's Tab goes to it: blocks/course-site/cs-keys.js). */
export const isEditorControl = (el) => kept.has(el);

/** Keep an element's events from HAX (what the directive does), once. */
export function keepFromHax(el) {
  if (!el?.addEventListener || kept.has(el)) return el;
  kept.add(el);
  for (const type of CONTROL_EVENTS) el.addEventListener(type, stop);
  return el;
}

class EditorControl {
  // Lit's _$initialize(part, parent, attributeIndex): nothing to keep
  _$AT() {}
  // Lit's _$resolve(part, values): an element binding hands the element
  _$AS(part) {
    keepFromHax(part?.element);
  }
}
EditorControl.prototype._$initialize = EditorControl.prototype._$AT;
EditorControl.prototype._$resolve = EditorControl.prototype._$AS;

/** The directive: `<button ${editorControl()}>`. */
export const editorControl = () => ({ _$litDirective$: EditorControl, values: [] });
