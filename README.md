# learning-materials-hax

A [HAXcms](https://github.com/haxtheweb/haxcms-nodejs) site with a custom theme that makes HAX look and work like the [learning-materials-decapcms](https://github.com/michael-collins/learning-materials-decapcms) OER platform: shadcn-style chrome, Lucide icons, WCAG AA colours, and no sound effects or decorative motion. Everything is a layer on top of stock HAX, in `custom/src`. HAX itself is not forked or patched.

Tooling, migration scripts and the regression-protection proposal are in **[nu-hax](https://github.com/michael-collins/nu-hax)**.

## Features

**Editing**
- **Left block rail:** Block, Text, Format and Insert-inline menus, replacing HAX's floating toolbars.
- **Selection frame:** an integrated drag handle (move up/down, drag to any slot), a breadcrumb label and a layout menu.
- **Insert in place:** hover the empty slot between blocks (inside grid columns too) to open a searchable block list with previews and templates.
- **Block settings:** a dialog with a live preview of the block. The HTML source view also opens in a dialog.
- **Sidebar:** a page tree with "Add page" at every level, and Nav / Site tabs.
- **Outline builder:** drag and drop with indent, keyboard control, inline rename, icons, "Add existing" (reuse pages, pinned versions) and content-type rules.

**Content model**
- **Content types:** a visual type editor for fields, defaults, "can contain" rules, starter content, OER Schema class and reader layout. Each typed page gets a header with its fields.
- **Versions:** semver releases frozen as read-only snapshots, a versions dialog, archived-version banners and `?version=` links.
- **Books:** reuse lessons and articles without copying, a reader layout (book sidebar, chapter filter, in-book Previous/Next) and exports (print/PDF, HTML zip, IMS Common Cartridge).
- **Relations and files:** "Link to pages" fields (optionally limited to types, pinned to a version) and "Files and links" fields with uploads; pages list where they are used.
- **Page footer:** Creative Commons license line, AI Usage License (AIUL), citation formats and OER Schema JSON-LD.

**Blocks**
- **Page collection:** a filter/sort table, cards, module outline or pathways index ("Start here", what builds on it, "In development") of pages by type and place.
- **Pathway:** a pathway's facts (course, length, levels, prerequisites), its route as a level matrix (modules × levels) or a module list with a level switcher, objectives and test-out criteria, in three layouts. Items get a level in the outline builder (L key); untyped, unlinked items show as planned.
- **Embeds:** embedded page, video, Google Slides, Sketchfab, 3D model viewer and code examples (CodePen, JSFiddle, CodeSandbox, StackBlitz, Replit, Glitch), all with caption and credit.
- **Other blocks:** callout, divider with label, spacer, rubric, and include-a-page.

**Embedding:** `?embed=1` gives a chrome-free page for LMS iframes, which resizes itself the way Canvas expects. An embed dialog offers leave-out options, copy code and a preview.

## Develop

```bash
cd custom && npm install && npm run build     # theme bundle → custom/build/custom.es6.js
cd .. && npx @haxtheweb/haxcms-nodejs          # http://localhost:3000, live-reloads on custom/src changes
```

Theme entry: `custom/src/custom.js`. Modules:
- `editor/`: chrome, skins, rail, inserter, frame, settings dialog
- `blocks/`: HAX blocks and their registration
- `outline/`: nav, outline builder
- `types/`: content types, page header and details, footer
- `versions/`: releases
- `books/`: include, picker, reader exports
- `embed/`: embed mode and dialog
- `pathways/`: pathway model, level chips, pathway block
- `tokens/`: design tokens

HAXcms commits the whole site folder on every save, so commit code changes before testing saves in the browser.

## License

Code: [Apache 2.0](LICENSE.md). Course content is licensed per page, as stated in each page's footer (CC BY 4.0 by default).
