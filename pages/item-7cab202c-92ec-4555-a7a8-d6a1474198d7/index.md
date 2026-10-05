This site runs on HAXcms with a custom theme that brings the features of the learning-materials-decapcms platform to HAX: content types with fields, pathways, versions, books, embedding and open licensing, plus an editor redesigned in the shadcn/ui style. This page explains what is new and where to find it.

<oer-callout type="tip" title="Where things are"><p>Most actions live in three places: the <strong>sidebar</strong> (Navigation and Site tabs), the <strong>page menu</strong> (the ⌄ beside a page title) and the <strong>top bar</strong> (search, command search and dark mode).</p></oer-callout>

Getting around
--------------

*   **Sidebar tabs.** Signed-in authors see two tabs. _Navigation_ shows the site's outline; _Site_ holds Browse pages, Content types and Settings. Readers see the outline only.
*   **Outline headings.** Uppercase labels such as Library, Curriculum and Assessments group the pages after them, like the categories of the Decap site. Headings never change a page's address.
*   **Icons in navigation.** Page icons can be switched off for the whole site in the outline builder. Without icons the sidebar uses the Decap layout: roomier rows, bold top-level pages and pages indented under their heading.
*   **Breadcrumbs.** The top bar shows where a page sits. On narrow screens the levels above collapse into a … menu so the trail stays on one line.
*   **Search.** The magnifier (or ⌘K) searches the site. Signed-in authors also get a command search for pages and editor actions.
*   **Previous and Next** at the foot of each page follow the outline. Inside a book they stay within the book.

Editing pages
-------------

*   **Edit page** from the page menu, or press ⌘⇧E. Save and Cancel sit in the editing bar at the top.
*   **Block rail.** The selected block gets a rail on its left with Block, Text, Format and Insert menus, in place of HAX's floating toolbars.
*   **Insert in place.** Hover the space between blocks, including inside columns, to add a block from a searchable list with previews and templates.
*   **Block settings** open in a dialog with a live preview. The HTML source view opens in a dialog too.
*   The editor is quiet and still: no sounds and no decorative animation, and every control works from the keyboard.

### Blocks this theme adds

*   **Callout**: notes, tips, warnings, definitions and objectives.
*   **Embeds**: embedded page, video, Google Slides, Sketchfab, 3D model viewer and code examples (CodePen, JSFiddle, CodeSandbox, StackBlitz, Replit, Glitch), each with a caption, credit and its own licence.
*   **Page collection**: lists pages by type and place as a filterable, sortable table, cards, a module outline or a pathways index.
*   **Pathway**: a pathway's facts, its route by level (a level matrix or a list with a level switcher), objectives and test-out criteria, in three layouts.
*   **Include a page**: shows another page here without copying it, optionally pinned to a released version.
*   **Credit**: attribution for an image, excerpt or adapted work placed above it (title, creator, source, licence and changes).
*   **Rubric**, **divider with label** and **spacer**.

Content types and page details
------------------------------

Every page can have a **content type** (Lesson, Exercise, Pathway…) with its own fields, like the collections of the Decap site. Manage them in _Site → Content types_:

*   **Fields** can be text, long text, number, choice (one or several), list, yes/no, date, image, link, _Link to pages_ (prerequisites, resources; optionally limited to some types and pinned to a version), _Files and links_ (downloads with title, description and alt text) and _People_ (names with optional links, used for Authors).
*   **Show in page header** on a field puts it in the header: short values as labels beside the type badge, lists, links and files as cards.
*   **Show in the navigation** keeps pages of a type out of the sidebar, so it lists only the sections that hold them.
*   **Reader layout** makes pages inside a type read like a book; **starter content** fills new pages of the type.

To edit a page's type, description and fields, open the page menu and choose **Page details**. A page's _image_ field shows as a banner above its title. The menu also has Rename page, Change icon, Page media, Tags, Embed… and Versions….

The outline builder
-------------------

Open it with **Edit outline** under the sidebar's pages (or from a page's menu for its sub-pages). Nothing is written until **Save outline**.

*   Drag rows to reorder them: the top of a row puts a page before it, the middle makes it a child, the bottom puts it after, and dragging sideways changes its level.
*   Hover the space at the end of a level for **Add page**, **Add existing** (show an existing page here without copying it) and **Add heading**.
*   Each row's chip sets its content type. Inside a pathway with several levels, L sets an item's level. On a linked page, the link chip (or V) chooses the version it shows: the latest, or a released version. A page with released versions has a version chip too: the navigation and Previous/Next link to the release you choose.
*   **Removing a row** (the eye button, or Delete) only takes the page out of the navigation; the page and its sub-pages are kept. **Delete page** (the bin, or Shift+Delete) deletes it on save, with its sub-pages and archived versions. _Add existing_ on a page that is out of the navigation moves it back in.
*   **Edit icons** shows the icon column; **Icons in navigation** switches icons on or off for the whole sidebar.
*   Keyboard: Enter rename, Tab/Shift+Tab indent and outdent, Alt+↑/↓ move, ←/→ collapse and expand, Delete remove from navigation, Shift+Delete delete page, T type, L level, V version.

Pathways
--------

A pathway is a page of type Pathway whose sub-pages are its modules; each module's sub-pages are its items, usually linked from the library so they stay in one place. The Pathways page lists them in three groups: where to start, what builds on it, and what is still in development. On a pathway page you see the course, length, levels and what to do first, then the route: a matrix of modules by level, or a module list with a level switcher. Items without a level belong to every level.

Browse pages
------------

_Site → Browse pages_ lists every page, including pages the navigation doesn't show: pages removed from the outline, archived versions and linked copies. Search or filter them, open one, put a page back in the navigation with **Show in navigation**, or delete it.

Versions
--------

*   A released page shows its version in the page footer. its version chip there, or _Versions…_ in the page menu, opens the page's releases. Authors publish a new release with a semver number (1.2.0) and notes; the page's content at that moment is kept as an archived copy.
*   Archived versions open with a banner pointing to the latest one. Links can be pinned to a version in the outline builder, in _Add existing_, in _Link to pages_ fields, and with `?version=` in an address.
*   Version history from the Decap site was imported: current version numbers and every archived version.

Books, embedding and export
---------------------------

*   **Books.** A type with the reader layout gets a _Start reading_ button, a sidebar of its chapters with a filter, and in-book Previous and Next. Books export to **print or PDF**, an **HTML zip** and **IMS Common Cartridge** for an LMS.
*   **Embedding.** _Embed…_ in the page menu gives the code to place a page in an LMS such as Canvas, with options to leave out the header, the title, the rubric or the AI licence. Embedded pages resize themselves the way Canvas expects.

The page footer
---------------

Typed pages end with their licence and credits: the Creative Commons licence with its icons and the authors, the AI Usage License (AIUL) as linked labels, the version and last update, the pages that use this one, **Credits** for third-party material (from Credit blocks and media with a credit or licence), a **Cite** menu (APA, MLA, Chicago, BibTeX) and the **OER Schema** badge, which shows the structured data published with every page for search engines and repositories.

Accessibility
-------------

Colours meet WCAG AA contrast in light and dark mode, the layout works at phone width, every control has a keyboard path and a label, menus stay inside the window, and nothing moves for decoration.

<oer-callout type="info" title="Built on HAX"><p>The theme is a layer on top of stock HAXcms, with no changes to HAX itself. Fixes found along the way have been contributed back to HAX. If the site switches to another HAX theme, the editor returns to stock HAX while these blocks keep working.</p></oer-callout>