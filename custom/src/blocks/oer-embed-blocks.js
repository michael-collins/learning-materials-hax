/**
 * Embedded-media blocks ported from learning-materials-decapcms MDC
 * components, all with the shared caption / credit line (OerMediaFigure):
 *
 *   oer-iframe         ::iframe-component        any page; YouTube/Vimeo links play as video
 *   oer-video          ::video-component         YouTube / Vimeo, 16:9
 *   oer-google-slides  ::google-slides-component slide deck by ID or link
 *   oer-sketchfab      ::sketchfab-component     Sketchfab model by link or ID
 *   oer-3d-viewer      ::threed-viewer-component .glb / .gltf with orbit controls
 */
import { html } from "../lit.js";
import { OerMediaFigure } from "./oer-media-figure.js";
import { videoEmbed, youtubeEmbed, vimeoEmbed, slidesEmbed, sketchfabEmbed } from "./embed-urls.js";
import { registerBlocks } from "./register.js";

const gizmo = (title, description, icon, tags) => ({
  title,
  description,
  icon,
  color: "blue",
  tags,
  meta: { author: "Michael Collins" },
});

// on-by-default switches: "off" is stored as ="false" so it survives a save
// (a plain boolean attribute can only say "on")
const onByDefault = { fromAttribute: (v) => v !== "false", toAttribute: (v) => (v ? "" : "false") };

const ALLOW_MEDIA = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";

/* ---------- iframe ---------- */

export class OerIframe extends OerMediaFigure {
  static get tag() {
    return "oer-iframe";
  }

  static get properties() {
    return { ...super.properties, src: { type: String, reflect: true }, height: { type: String, reflect: true } };
  }

  constructor() {
    super();
    this.height = "600";
  }

  get _video() {
    return youtubeEmbed(this.src) || vimeoEmbed(this.src);
  }

  // video links play at 16:9 like the Decap component; pages use the height
  get aspect() {
    return this._video ? "16 / 9" : null;
  }

  renderMedia() {
    if (!this.src) return this.renderEmpty("page", "Set the address in the block settings.");
    return html`<iframe
      src="${this._video || this.src}"
      title="${this.title || "Embedded page"}"
      allow="${ALLOW_MEDIA}"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>`;
  }

  static get haxProperties() {
    return {
      canScale: false,
      canEditSource: true,
      gizmo: gizmo("Embedded page", "Show another web page (or a YouTube / Vimeo video) with a caption and credit.", "hax:iframe", ["Media", "iframe", "embed", "website"]),
      settings: {
        configure: [
          { property: "src", title: "Address", description: "The page to show. YouTube and Vimeo links play as video.", inputMethod: "textfield", validationType: "url", required: true },
          { property: "height", title: "Height", description: "In pixels (ignored for videos, which use 16:9).", inputMethod: "textfield" },
          ...OerMediaFigure.figureSettings(),
        ],
        advanced: [],
      },
      demoSchema: [{ tag: "oer-iframe", properties: { src: "https://www.openstreetmap.org/export/embed.html", title: "Map", height: "400" }, content: "" }],
    };
  }
}

/* ---------- video ---------- */

export class OerVideo extends OerMediaFigure {
  static get tag() {
    return "oer-video";
  }

  static get properties() {
    return { ...super.properties, src: { type: String, reflect: true } };
  }

  get aspect() {
    return "16 / 9";
  }

  renderMedia() {
    if (!this.src) return this.renderEmpty("video", "Paste a YouTube or Vimeo link in the block settings.");
    return html`<iframe src="${videoEmbed(this.src)}" title="${this.title || "Video"}" allow="${ALLOW_MEDIA}" allowfullscreen loading="lazy"></iframe>`;
  }

  static get haxProperties() {
    return {
      canScale: false,
      canEditSource: true,
      gizmo: gizmo("Video (with credit)", "YouTube or Vimeo video with a caption and credit line.", "hax:video", ["Media", "video", "youtube", "vimeo"]),
      settings: {
        configure: [
          { property: "src", title: "Video link", description: "A YouTube (video or playlist) or Vimeo link.", inputMethod: "textfield", validationType: "url", required: true },
          ...OerMediaFigure.figureSettings(),
        ],
        advanced: [],
      },
      demoSchema: [{ tag: "oer-video", properties: { src: "https://www.youtube.com/watch?v=uDqjIdI4bF4", title: "The 12 principles of animation" }, content: "" }],
    };
  }
}

/* ---------- Google Slides ---------- */

export class OerGoogleSlides extends OerMediaFigure {
  static get tag() {
    return "oer-google-slides";
  }

  static get properties() {
    return { ...super.properties, slides: { type: String, reflect: true } };
  }

  // Google's own embed is 960 × 569
  get aspect() {
    return "960 / 569";
  }

  renderMedia() {
    if (!this.slides) return this.renderEmpty("slides", "Paste the presentation link or ID in the block settings.");
    return html`<iframe src="${slidesEmbed(this.slides)}" title="${this.title || "Presentation"}" allowfullscreen loading="lazy"></iframe>`;
  }

  static get haxProperties() {
    return {
      canScale: false,
      canEditSource: true,
      gizmo: gizmo("Google Slides", "A Google Slides presentation, with a caption and credit.", "image:slideshow", ["Media", "slides", "presentation", "google"]),
      settings: {
        configure: [
          {
            property: "slides",
            title: "Presentation",
            description: "The presentation's link (Share or Publish to web) or its ID.",
            inputMethod: "textfield",
            required: true,
          },
          ...OerMediaFigure.figureSettings(),
        ],
        advanced: [],
      },
      demoSchema: [{ tag: "oer-google-slides", properties: { slides: "", title: "Presentation" }, content: "" }],
    };
  }
}

/* ---------- Sketchfab ---------- */

export class OerSketchfab extends OerMediaFigure {
  static get tag() {
    return "oer-sketchfab";
  }

  static get properties() {
    return { ...super.properties, src: { type: String, reflect: true }, height: { type: String, reflect: true } };
  }

  constructor() {
    super();
    this.height = "600";
  }

  renderMedia() {
    if (!this.src) return this.renderEmpty("model", "Paste the Sketchfab model link in the block settings.");
    return html`<iframe
      src="${sketchfabEmbed(this.src)}"
      title="${this.title || "Sketchfab model"}"
      allow="autoplay; fullscreen; xr-spatial-tracking"
      allowfullscreen
      loading="lazy"
    ></iframe>`;
  }

  static get haxProperties() {
    return {
      canScale: false,
      canEditSource: true,
      gizmo: gizmo("Sketchfab model", "An interactive 3D model from Sketchfab, with a caption and credit.", "hax:module", ["Media", "3d", "sketchfab", "model"]),
      settings: {
        configure: [
          { property: "src", title: "Model link", description: "The model's Sketchfab page link (or its ID).", inputMethod: "textfield", required: true },
          { property: "height", title: "Height", description: "In pixels.", inputMethod: "textfield" },
          ...OerMediaFigure.figureSettings(),
        ],
        advanced: [],
      },
      demoSchema: [{ tag: "oer-sketchfab", properties: { src: "", title: "3D model", height: "500" }, content: "" }],
    };
  }
}

/* ---------- 3D viewer (model-viewer) ---------- */

const MODEL_VIEWER = "https://cdn.jsdelivr.net/npm/@google/model-viewer@4.1.0/dist/model-viewer.min.js";
function loadModelViewer() {
  if (customElements.get("model-viewer") || globalThis.document.querySelector("script[data-oer-model-viewer]")) return;
  const s = globalThis.document.createElement("script");
  s.type = "module";
  s.src = MODEL_VIEWER;
  s.dataset.oerModelViewer = "";
  globalThis.document.head.append(s);
}

export class Oer3dViewer extends OerMediaFigure {
  static get tag() {
    return "oer-3d-viewer";
  }

  static get properties() {
    return {
      ...super.properties,
      src: { type: String, reflect: true },
      height: { type: String, reflect: true },
      autoRotate: { type: Boolean, attribute: "auto-rotate", reflect: true, converter: onByDefault },
      cameraControls: { type: Boolean, attribute: "camera-controls", reflect: true, converter: onByDefault },
    };
  }

  constructor() {
    super();
    this.height = "600";
    this.autoRotate = true;
    this.cameraControls = true;
  }

  renderMedia() {
    if (!this.src) return this.renderEmpty("3D model", "Upload or link a .glb or .gltf file in the block settings.");
    loadModelViewer();
    return html`<model-viewer
      src="${this.src}"
      alt="${this.title || "3D model"}"
      ?auto-rotate="${this.autoRotate}"
      ?camera-controls="${this.cameraControls}"
      shadow-intensity="1"
      camera-orbit="45deg 55deg 2.5m"
      min-camera-orbit="auto auto 5%"
      max-camera-orbit="auto auto 100%"
    ></model-viewer>`;
  }

  static get haxProperties() {
    return {
      canScale: false,
      canEditSource: true,
      gizmo: gizmo("3D model viewer", "Show a .glb / .gltf model people can rotate and zoom, with a caption and credit.", "hax:module", ["Media", "3d", "model", "gltf"]),
      settings: {
        configure: [
          { property: "src", title: "Model file", description: "A .glb or .gltf file.", inputMethod: "haxupload", required: true },
          { property: "height", title: "Height", description: "In pixels.", inputMethod: "textfield" },
          { property: "autoRotate", title: "Rotate slowly", inputMethod: "boolean" },
          { property: "cameraControls", title: "Let people rotate and zoom", inputMethod: "boolean" },
          ...OerMediaFigure.figureSettings(),
        ],
        advanced: [],
      },
      demoSchema: [{ tag: "oer-3d-viewer", properties: { src: "", title: "3D model", height: "500", autoRotate: true, cameraControls: true }, content: "" }],
    };
  }
}

for (const cls of [OerIframe, OerVideo, OerGoogleSlides, OerSketchfab, Oer3dViewer]) {
  if (!customElements.get(cls.tag)) customElements.define(cls.tag, cls);
}
registerBlocks(OerIframe, OerVideo, OerGoogleSlides, OerSketchfab, Oer3dViewer);
