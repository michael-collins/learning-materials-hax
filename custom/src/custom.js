// Entry for the site's custom bundle (built to custom/build/custom.es6.js).
// HAXcms loads this bundle whatever the active theme is. The editor chrome
// and theme skins switch on only when custom-oer-docs-theme connects (see
// installEditorChrome); blocks register everywhere, since content that uses
// them must keep working under any theme.
import "./editor/index.js";
import "./layout-breakpoints.js";
import "./custom-oer-docs-theme.js";
import "./oer-rubric.js";
import "./blocks/oer-embed-blocks.js";
import "./blocks/oer-content-blocks.js";
import "./blocks/oer-collection.js";
import "./books/oer-include.js";
import "./pathways/oer-pathway.js";
import "./blocks/oer-schematic.js";
import "./blocks/oer-credit.js";
