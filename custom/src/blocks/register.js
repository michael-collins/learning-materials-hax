/**
 * Register this site's blocks with HAX. HAX only registers blocks listed in
 * its app store, so custom elements must hand their haxProperties to the
 * store themselves once it has loaded (it loads with the editor). Until a
 * block is registered it cannot be inserted, and HAX treats existing ones
 * as unknown markup.
 */
const queue = new Map(); // tag -> class

function flush() {
  const hax = globalThis.HaxStore?.requestAvailability?.();
  if (!hax || !hax.appStoreLoaded) return false;
  for (const [tag, cls] of queue) {
    if (!hax.elementList?.[tag]) hax.setHaxProperties(cls.haxProperties, tag);
  }
  return true;
}

let watching = false;
function watch() {
  if (watching) return;
  watching = true;
  globalThis.addEventListener("hax-store-app-store-loaded", () => setTimeout(flush, 0));
  // the store may already be up (or come up before the event is heard)
  const poll = setInterval(() => {
    if (flush()) clearInterval(poll);
  }, 1000);
}

/** Register block classes (each with a static `tag` and `haxProperties`). */
export function registerBlocks(...classes) {
  for (const cls of classes) queue.set(cls.tag, cls);
  watch();
  flush();
}
