// Entry for the site's custom bundle (built to custom/build/custom.es6.js).
// The editor chrome goes first so its icon override and shadow-style patch
// are installed before any HAX element renders.
import "./editor/index.js";
import "./layout-breakpoints.js";
import "./custom-oer-docs-theme.js";
import "./oer-rubric.js";
import "./blocks/oer-embed-blocks.js";
import "./blocks/oer-content-blocks.js";
import "./blocks/oer-collection.js";
import "./books/oer-include.js";
import "./pathways/oer-pathway.js";
