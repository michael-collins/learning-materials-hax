import{SimpleIconsetStore as A2}from"@haxtheweb/simple-icon/lib/simple-iconset.js";import{store as b}from"@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";import{HAXCMSLitElementTheme as Q,css as h,html as l,unsafeCSS as O,autorun as y,toJS as x,store as w}from"@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";import"@haxtheweb/haxcms-elements/lib/ui-components/navigation/site-menu.js";import"@haxtheweb/haxcms-elements/lib/ui-components/navigation/site-breadcrumb.js";import"@haxtheweb/haxcms-elements/lib/ui-components/active-item/site-active-title.js";import"@haxtheweb/haxcms-elements/lib/ui-components/layout/site-modal.js";import{DDD as B2}from"@haxtheweb/d-d-d/d-d-d.js";const k={"hax:hax2022":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%203H5a2%202%200%200%200-2%202v14a2%202%200%200%200%202%202h14a2%202%200%200%200%202-2v-7%22%20%2F%3E%20%3Cpath%20d%3D%22M18.375%202.625a1%201%200%200%201%203%203l-9.013%209.014a2%202%200%200%201-.853.505l-2.873.84a.5.5%200%200%201-.62-.62l.84-2.873a2%202%200%200%201%20.506-.852z%22%20%2F%3E%20%3C%2Fsvg%3E","hax:site-map":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20x%3D%2216%22%20y%3D%2216%22%20width%3D%226%22%20height%3D%226%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20x%3D%222%22%20y%3D%2216%22%20width%3D%226%22%20height%3D%226%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20x%3D%229%22%20y%3D%222%22%20width%3D%226%22%20height%3D%226%22%20rx%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M5%2016v-3a1%201%200%200%201%201-1h12a1%201%200%200%201%201%201v3%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2012V8%22%20%2F%3E%20%3C%2Fsvg%3E","hax:page-edit":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M14.364%2013.634a2%202%200%200%200-.506.854l-.837%202.87a.5.5%200%200%200%20.62.62l2.87-.837a2%202%200%200%200%20.854-.506l4.013-4.009a1%201%200%200%200-3.004-3.004z%22%20%2F%3E%20%3Cpath%20d%3D%22M14.487%207.858A1%201%200%200%201%2014%207V2%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2019.645V20a2%202%200%200%201-2%202H6a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l2.516%202.516%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2018h1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:add-page":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2015h6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018v-6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:loading":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%2012a9%209%200%201%201-6.219-8.56%22%20%2F%3E%20%3C%2Fsvg%3E","hax:wizard-hat":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m21.64%203.64-1.28-1.28a1.21%201.21%200%200%200-1.72%200L2.36%2018.64a1.21%201.21%200%200%200%200%201.72l1.28%201.28a1.2%201.2%200%200%200%201.72%200L21.64%205.36a1.2%201.2%200%200%200%200-1.72%22%20%2F%3E%20%3Cpath%20d%3D%22m14%207%203%203%22%20%2F%3E%20%3Cpath%20d%3D%22M5%206v4%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2014v4%22%20%2F%3E%20%3Cpath%20d%3D%22M10%202v2%22%20%2F%3E%20%3Cpath%20d%3D%22M7%208H3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2016h-4%22%20%2F%3E%20%3Cpath%20d%3D%22M11%203H9%22%20%2F%3E%20%3C%2Fsvg%3E","hax:graph":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%203v16a2%202%200%200%200%202%202h16%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2017V9%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2017V5%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2017v-3%22%20%2F%3E%20%3C%2Fsvg%3E","hax:blocks":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2022V7a1%201%200%200%200-1-1H4a2%202%200%200%200-2%202v12a2%202%200%200%200%202%202h12a2%202%200%200%200%202-2v-5a1%201%200%200%200-1-1H2%22%20%2F%3E%20%3Crect%20x%3D%2214%22%20y%3D%222%22%20width%3D%228%22%20height%3D%228%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:add-brick":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M12%208v8%22%20%2F%3E%20%3C%2Fsvg%3E","hax:html-code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2012.5%208%2015l2%202.5%22%20%2F%3E%20%3Cpath%20d%3D%22m14%2012.5%202%202.5-2%202.5%22%20%2F%3E%20%3C%2Fsvg%3E","hax:home-edit":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2021v-8a1%201%200%200%200-1-1h-4a1%201%200%200%200-1%201v8%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2010a2%202%200%200%201%20.709-1.528l7-6a2%202%200%200%201%202.582%200l7%206A2%202%200%200%201%2021%2010v9a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2z%22%20%2F%3E%20%3C%2Fsvg%3E","hax:add-item":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2012H3%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2019H3%22%20%2F%3E%20%3Cpath%20d%3D%22M18%209v6%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012h-6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:view-gallery":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%2214%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%2214%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%223%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:format-textblock":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2012H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2019H3%22%20%2F%3E%20%3C%2Fsvg%3E","hax:file-html":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2012.5%208%2015l2%202.5%22%20%2F%3E%20%3Cpath%20d%3D%22m14%2012.5%202%202.5-2%202.5%22%20%2F%3E%20%3C%2Fsvg%3E","hax:code-json":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2012a1%201%200%200%200-1%201v1a1%201%200%200%201-1%201%201%201%200%200%201%201%201v1a1%201%200%200%200%201%201%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2018a1%201%200%200%200%201-1v-1a1%201%200%200%201%201-1%201%201%200%200%201-1-1v-1a1%201%200%200%200-1-1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:templates":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%227%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%229%22%20height%3D%227%22%20x%3D%223%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%225%22%20height%3D%227%22%20x%3D%2216%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:paragraph":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M13%204v16%22%20%2F%3E%20%3Cpath%20d%3D%22M17%204v16%22%20%2F%3E%20%3Cpath%20d%3D%22M19%204H9.5a4.5%204.5%200%200%200%200%209H13%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h1":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22m17%2012%203-2v8%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h2":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2018h-4c0-4%204-3%204-6%200-1.5-2-2.5-4-1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h3":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17.5%2010.5c1.7-1%203.5%200%203.5%201.5a2%202%200%200%201-2%202%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2017.5c2%201.5%204%20.3%204-1.5a2%202%200%200%200-2-2%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h4":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2010v3a1%201%200%200%200%201%201h3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2010v8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h5":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2013v-3h4%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2017.7c.4.2.8.3%201.3.3%201.5%200%202.7-1.1%202.7-2.5S19.8%2013%2018.3%2013H17%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h6":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Ccircle%20cx%3D%2219%22%20cy%3D%2216%22%20r%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2010c-2%202-3%203.5-3%206%22%20%2F%3E%20%3C%2Fsvg%3E","hax:file-pdf":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2013H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2017H8%22%20%2F%3E%20%3C%2Fsvg%3E","hax:add-child-page":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11.35%2022H6a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.706.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v5.35%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2019h6%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2016v6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:site-settings":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9.671%204.136a2.34%202.34%200%200%201%204.659%200%202.34%202.34%200%200%200%203.319%201.915%202.34%202.34%200%200%201%202.33%204.033%202.34%202.34%200%200%200%200%203.831%202.34%202.34%200%200%201-2.33%204.033%202.34%202.34%200%200%200-3.319%201.915%202.34%202.34%200%200%201-4.659%200%202.34%202.34%200%200%200-3.32-1.915%202.34%202.34%200%200%201-2.33-4.033%202.34%202.34%200%200%200%200-3.831A2.34%202.34%200%200%201%206.35%206.051a2.34%202.34%200%200%200%203.319-1.915%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","hax:multimedia":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m12.296%203.464%203.02%203.956%22%20%2F%3E%20%3Cpath%20d%3D%22M20.2%206%203%2011l-.9-2.4c-.3-1.1.3-2.2%201.3-2.5l13.5-4c1.1-.3%202.2.3%202.5%201.3z%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2011h18v8a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2z%22%20%2F%3E%20%3Cpath%20d%3D%22m6.18%205.276%203.1%203.899%22%20%2F%3E%20%3C%2Fsvg%3E","hax:module":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11%2021.73a2%202%200%200%200%202%200l7-4A2%202%200%200%200%2021%2016V8a2%202%200%200%200-1-1.73l-7-4a2%202%200%200%200-2%200l-7%204A2%202%200%200%200%203%208v8a2%202%200%200%200%201%201.73z%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2022V12%22%20%2F%3E%20%3Cpolyline%20points%3D%223.29%207%2012%2012%2020.71%207%22%20%2F%3E%20%3Cpath%20d%3D%22m7.5%204.27%209%205.15%22%20%2F%3E%20%3C%2Fsvg%3E","hax:menu-open":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M9%203v18%22%20%2F%3E%20%3Cpath%20d%3D%22m14%209%203%203-3%203%22%20%2F%3E%20%3C%2Fsvg%3E","hax:lesson":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%205v16%22%20%2F%3E%20%3Cpath%20d%3D%22M20.001%2019A2%202%200%200022%2017V5a2%202%200%2000-1.999-2L16%203.002A5%205%200%200012%205a5%205%200%2000-4-2H4a2%202%200%2000-2%202v12a2%202%200%20001.999%202H8a5%205%200%20014%202%205%205%200%20014-2z%22%20%2F%3E%20%3C%2Fsvg%3E","hax:keyboard-arrow-up":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18%2015-6-6-6%206%22%20%2F%3E%20%3C%2Fsvg%3E","hax:keyboard-arrow-down":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m6%209%206%206%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:file-docx":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2018h2%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2012v6%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2013v-.5a.5.5%200%200%201%20.5-.5h5a.5.5%200%200%201%20.5.5v.5%22%20%2F%3E%20%3C%2Fsvg%3E","hax:embed":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18%2016%204-4-4-4%22%20%2F%3E%20%3Cpath%20d%3D%22m6%208-4%204%204%204%22%20%2F%3E%20%3Cpath%20d%3D%22m14.5%204-5%2016%22%20%2F%3E%20%3C%2Fsvg%3E","hax:duplicate":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2214%22%20height%3D%2214%22%20x%3D%228%22%20y%3D%228%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2016c-1.1%200-2-.9-2-2V4c0-1.1.9-2%202-2h10c1.1%200%202%20.9%202%202%22%20%2F%3E%20%3C%2Fsvg%3E","hax:abbr":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%227%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209v6%22%20%2F%3E%20%3Ccircle%20cx%3D%2217%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3Cpath%20d%3D%22M14%207v8%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2017v1c0%20.5-.5%201-1%201H3c-.5%200-1-.5-1-1v-1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:wand":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%204V2%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2016v-2%22%20%2F%3E%20%3Cpath%20d%3D%22M8%209h2%22%20%2F%3E%20%3Cpath%20d%3D%22M20%209h2%22%20%2F%3E%20%3Cpath%20d%3D%22M17.8%2011.8%2019%2013%22%20%2F%3E%20%3Cpath%20d%3D%22M15%209h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M17.8%206.2%2019%205%22%20%2F%3E%20%3Cpath%20d%3D%22m3%2021%209-9%22%20%2F%3E%20%3Cpath%20d%3D%22M12.2%206.2%2011%205%22%20%2F%3E%20%3C%2Fsvg%3E","hax:video":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2013%205.223%203.482a.5.5%200%200%200%20.777-.416V7.87a.5.5%200%200%200-.752-.432L16%2010.5%22%20%2F%3E%20%3Crect%20x%3D%222%22%20y%3D%226%22%20width%3D%2214%22%20height%3D%2212%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","hax:unit":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%206%204%2014%22%20%2F%3E%20%3Cpath%20d%3D%22M12%206v14%22%20%2F%3E%20%3Cpath%20d%3D%22M8%208v12%22%20%2F%3E%20%3Cpath%20d%3D%22M4%204v16%22%20%2F%3E%20%3C%2Fsvg%3E","hax:ticket":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2%209a3%203%200%200%201%200%206v2a2%202%200%200%200%202%202h16a2%202%200%200%200%202-2v-2a3%203%200%200%201%200-6V7a2%202%200%200%200-2-2H4a2%202%200%200%200-2%202Z%22%20%2F%3E%20%3Cpath%20d%3D%22M13%205v2%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2017v2%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2011v2%22%20%2F%3E%20%3C%2Fsvg%3E","hax:task":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22m16%209-5.5%205.5L8%2012%22%20%2F%3E%20%3C%2Fsvg%3E","hax:table-column-remove":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%227%22%20height%3D%2213%22%20x%3D%223%22%20y%3D%228%22%20rx%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22m15%202-3%203-3-3%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%2213%22%20x%3D%2214%22%20y%3D%228%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:table-column-plus-after":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%227%22%20height%3D%2213%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22m9%2022%203-3%203%203%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%2213%22%20x%3D%2214%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:skull":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m12.5%2017-.5-1-.5%201h1z%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2022a1%201%200%200%200%201-1v-1a2%202%200%200%200%201.56-3.25%208%208%200%201%200-11.12%200A2%202%200%200%200%208%2020v1a1%201%200%200%200%201%201z%22%20%2F%3E%20%3Ccircle%20cx%3D%2215%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:shovel":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21.56%204.56a1.5%201.5%200%200%201%200%202.122l-.47.47a3%203%200%200%201-4.212-.03%203%203%200%200%201%200-4.243l.44-.44a1.5%201.5%200%200%201%202.121%200z%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2022a1%201%200%200%201-1-1v-3.586a1%201%200%200%201%20.293-.707l3.355-3.355a1.205%201.205%200%200%201%201.704%200l3.296%203.296a1.205%201.205%200%200%201%200%201.704l-3.355%203.355a1%201%200%200%201-.707.293z%22%20%2F%3E%20%3Cpath%20d%3D%22m9%2015%207.879-7.878%22%20%2F%3E%20%3C%2Fsvg%3E","hax:select-element":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12.034%2012.681a.498.498%200%200%201%20.647-.647l9%203.5a.5.5%200%200%201-.033.943l-3.444%201.068a1%201%200%200%200-.66.66l-1.067%203.443a.5.5%200%200%201-.943.033z%22%20%2F%3E%20%3Cpath%20d%3D%22M5%203a2%202%200%200%200-2%202%22%20%2F%3E%20%3Cpath%20d%3D%22M19%203a2%202%200%200%201%202%202%22%20%2F%3E%20%3Cpath%20d%3D%22M5%2021a2%202%200%200%201-2-2%22%20%2F%3E%20%3Cpath%20d%3D%22M9%203h1%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2021h2%22%20%2F%3E%20%3Cpath%20d%3D%22M14%203h1%22%20%2F%3E%20%3Cpath%20d%3D%22M3%209v1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%209v2%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2014v1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:qr-code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%225%22%20height%3D%225%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%225%22%20height%3D%225%22%20x%3D%2216%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%225%22%20height%3D%225%22%20x%3D%223%22%20y%3D%2216%22%20rx%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2016h-3a2%202%200%200%200-2%202v3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2021v.01%22%20%2F%3E%20%3Cpath%20d%3D%22M12%207v3a2%202%200%200%201-2%202H7%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2012h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M12%203h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2016v.01%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2012h1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012v.01%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2021v-1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:outline-designer-outdent":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m7%208-4%204%204%204%22%20%2F%3E%20%3C%2Fsvg%3E","hax:outline-designer-indent":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m3%208%204%204-4%204%22%20%2F%3E%20%3C%2Fsvg%3E","hax:newspaper":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2018h-5%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2014h-8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2022h16a2%202%200%200%200%202-2V4a2%202%200%200%200-2-2H8a2%202%200%200%200-2%202v16a2%202%200%200%201-4%200v-9a2%202%200%200%201%202-2h2%22%20%2F%3E%20%3Crect%20width%3D%228%22%20height%3D%224%22%20x%3D%2210%22%20y%3D%226%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:iframe":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20x%3D%222%22%20y%3D%224%22%20width%3D%2220%22%20height%3D%2216%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M10%204v4%22%20%2F%3E%20%3Cpath%20d%3D%22M2%208h20%22%20%2F%3E%20%3Cpath%20d%3D%22M6%204v4%22%20%2F%3E%20%3C%2Fsvg%3E","hax:hr":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3C%2Fsvg%3E","hax:file-link-outline":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2011V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.706.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202H6a2%202%200%200%201-2-2v-3a2%202%200%200%201%202-2h7%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22m10%2018%203-3-3-3%22%20%2F%3E%20%3C%2Fsvg%3E","hax:figure":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%229%22%20r%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22m21%2015-3.086-3.086a2%202%200%200%200-2.828%200L6%2021%22%20%2F%3E%20%3C%2Fsvg%3E","hax:email":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m22%207-8.991%205.727a2%202%200%200%201-2.009%200L2%207%22%20%2F%3E%20%3Crect%20x%3D%222%22%20y%3D%224%22%20width%3D%2220%22%20height%3D%2216%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","hax:discord":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2.992%2016.342a2%202%200%200%201%20.094%201.167l-1.065%203.29a1%201%200%200%200%201.236%201.168l3.413-.998a2%202%200%200%201%201.099.092%2010%2010%200%201%200-4.777-4.719%22%20%2F%3E%20%3C%2Fsvg%3E","hax:console-line":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m7%2011%202-2-2-2%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2013h4%22%20%2F%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","hax:code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2018%206-6-6-6%22%20%2F%3E%20%3Cpath%20d%3D%22m8%206-6%206%206%206%22%20%2F%3E%20%3C%2Fsvg%3E","hax:bulletin-board":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%228%22%20height%3D%224%22%20x%3D%228%22%20y%3D%222%22%20rx%3D%221%22%20ry%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M16%204h2a2%202%200%200%201%202%202v14a2%202%200%200%201-2%202H6a2%202%200%200%201-2-2V6a2%202%200%200%201%202-2h2%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2011h4%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2016h4%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2011h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2016h.01%22%20%2F%3E%20%3C%2Fsvg%3E","hax:arrow-expand-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%205v14%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H7%22%20%2F%3E%20%3Cpath%20d%3D%22m15%2018%206-6-6-6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:arrow-all":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%202v20%22%20%2F%3E%20%3Cpath%20d%3D%22m15%2019-3%203-3-3%22%20%2F%3E%20%3Cpath%20d%3D%22m19%209%203%203-3%203%22%20%2F%3E%20%3Cpath%20d%3D%22M2%2012h20%22%20%2F%3E%20%3Cpath%20d%3D%22m5%209-3%203%203%203%22%20%2F%3E%20%3Cpath%20d%3D%22m9%205%203-3%203%203%22%20%2F%3E%20%3C%2Fsvg%3E","hax:add":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3Cpath%20d%3D%22M12%205v14%22%20%2F%3E%20%3C%2Fsvg%3E","icons:print":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2018H4a2%202%200%200%201-2-2v-5a2%202%200%200%201%202-2h16a2%202%200%200%201%202%202v5a2%202%200%200%201-2%202h-2%22%20%2F%3E%20%3Cpath%20d%3D%22M6%209V3a1%201%200%200%201%201-1h10a1%201%200%200%201%201%201v6%22%20%2F%3E%20%3Crect%20x%3D%226%22%20y%3D%2214%22%20width%3D%2212%22%20height%3D%228%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","icons:code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2018%206-6-6-6%22%20%2F%3E%20%3Cpath%20d%3D%22m8%206-6%206%206%206%22%20%2F%3E%20%3C%2Fsvg%3E","icons:check":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M20%206%209%2017l-5-5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:warning":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m21.73%2018-8-14a2%202%200%200%200-3.48%200l-8%2014A2%202%200%200%200%204%2021h16a2%202%200%200%200%201.73-3%22%20%2F%3E%20%3Cpath%20d%3D%22M12%209v4%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2017h.01%22%20%2F%3E%20%3C%2Fsvg%3E","icons:select-all":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%203a2%202%200%200%200-2%202%22%20%2F%3E%20%3Cpath%20d%3D%22M19%203a2%202%200%200%201%202%202%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019a2%202%200%200%201-2%202%22%20%2F%3E%20%3Cpath%20d%3D%22M5%2021a2%202%200%200%201-2-2%22%20%2F%3E%20%3Cpath%20d%3D%22M9%203h1%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2021h1%22%20%2F%3E%20%3Cpath%20d%3D%22M14%203h1%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2021h1%22%20%2F%3E%20%3Cpath%20d%3D%22M3%209v1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%209v1%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2014v1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2014v1%22%20%2F%3E%20%3C%2Fsvg%3E","icons:search":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m21%2021-4.34-4.34%22%20%2F%3E%20%3Ccircle%20cx%3D%2211%22%20cy%3D%2211%22%20r%3D%228%22%20%2F%3E%20%3C%2Fsvg%3E","icons:file-download":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2015V3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2015v4a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2v-4%22%20%2F%3E%20%3Cpath%20d%3D%22m7%2010%205%205%205-5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:history":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%2012a9%209%200%201%200%209-9%209.75%209.75%200%200%200-6.74%202.74L3%208%22%20%2F%3E%20%3Cpath%20d%3D%22M3%203v5h5%22%20%2F%3E%20%3Cpath%20d%3D%22M12%207v5l4%202%22%20%2F%3E%20%3C%2Fsvg%3E","icons:visibility":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2.062%2012.348a1%201%200%200%201%200-.696%2010.75%2010.75%200%200%201%2019.876%200%201%201%200%200%201%200%20.696%2010.75%2010.75%200%200%201-19.876%200%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","icons:visibility-off":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10.733%205.076a10.744%2010.744%200%200%201%2011.205%206.575%201%201%200%200%201%200%20.696%2010.747%2010.747%200%200%201-1.444%202.49%22%20%2F%3E%20%3Cpath%20d%3D%22M14.084%2014.158a3%203%200%200%201-4.242-4.242%22%20%2F%3E%20%3Cpath%20d%3D%22M17.479%2017.499a10.75%2010.75%200%200%201-15.417-5.151%201%201%200%200%201%200-.696%2010.75%2010.75%200%200%201%204.446-5.143%22%20%2F%3E%20%3Cpath%20d%3D%22m2%202%2020%2020%22%20%2F%3E%20%3C%2Fsvg%3E","icons:lock":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2211%22%20x%3D%223%22%20y%3D%2211%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2011V7a5%205%200%200%201%2010%200v4%22%20%2F%3E%20%3C%2Fsvg%3E","icons:lock-open":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2211%22%20x%3D%223%22%20y%3D%2211%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2011V7a5%205%200%200%201%209.9-1%22%20%2F%3E%20%3C%2Fsvg%3E","icons:folder":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M20%2020a2%202%200%200%200%202-2V8a2%202%200%200%200-2-2h-7.9a2%202%200%200%201-1.69-.9L9.6%203.9A2%202%200%200%200%207.93%203H4a2%202%200%200%200-2%202v13a2%202%200%200%200%202%202Z%22%20%2F%3E%20%3C%2Fsvg%3E","icons:error":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%228%22%20y2%3D%2212%22%20%2F%3E%20%3Cline%20x1%3D%2212%22%20x2%3D%2212.01%22%20y1%3D%2216%22%20y2%3D%2216%22%20%2F%3E%20%3C%2Fsvg%3E","icons:content-copy":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2214%22%20height%3D%2214%22%20x%3D%228%22%20y%3D%228%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2016c-1.1%200-2-.9-2-2V4c0-1.1.9-2%202-2h10c1.1%200%202%20.9%202%202%22%20%2F%3E%20%3C%2Fsvg%3E","icons:link":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2013a5%205%200%200%200%207.54.54l3-3a5%205%200%200%200-7.07-7.07l-1.72%201.71%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2011a5%205%200%200%200-7.54-.54l-3%203a5%205%200%200%200%207.07%207.07l1.71-1.71%22%20%2F%3E%20%3C%2Fsvg%3E","icons:create":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21.174%206.812a1%201%200%200%200-3.986-3.987L3.842%2016.174a2%202%200%200%200-.5.83l-1.321%204.352a.5.5%200%200%200%20.623.622l4.353-1.32a2%202%200%200%200%20.83-.497z%22%20%2F%3E%20%3Cpath%20d%3D%22m15%205%204%204%22%20%2F%3E%20%3C%2Fsvg%3E","icons:undo":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9%2014%204%209l5-5%22%20%2F%3E%20%3Cpath%20d%3D%22M4%209h10.5a5.5%205.5%200%200%201%205.5%205.5a5.5%205.5%200%200%201-5.5%205.5H11%22%20%2F%3E%20%3C%2Fsvg%3E","icons:redo":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m15%2014%205-5-5-5%22%20%2F%3E%20%3Cpath%20d%3D%22M20%209H9.5A5.5%205.5%200%200%200%204%2014.5A5.5%205.5%200%200%200%209.5%2020H13%22%20%2F%3E%20%3C%2Fsvg%3E","icons:save":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15.2%203a2%202%200%200%201%201.4.6l3.8%203.8a2%202%200%200%201%20.6%201.4V19a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2V5a2%202%200%200%201%202-2z%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2021v-7a1%201%200%200%200-1-1H8a1%201%200%200%200-1%201v7%22%20%2F%3E%20%3Cpath%20d%3D%22M7%203v4a1%201%200%200%200%201%201h7%22%20%2F%3E%20%3C%2Fsvg%3E","icons:refresh":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%2012a9%209%200%200%201%209-9%209.75%209.75%200%200%201%206.74%202.74L21%208%22%20%2F%3E%20%3Cpath%20d%3D%22M21%203v5h-5%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012a9%209%200%200%201-9%209%209.75%209.75%200%200%201-6.74-2.74L3%2016%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2016H3v5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:open-with":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%202v20%22%20%2F%3E%20%3Cpath%20d%3D%22m15%2019-3%203-3-3%22%20%2F%3E%20%3Cpath%20d%3D%22m19%209%203%203-3%203%22%20%2F%3E%20%3Cpath%20d%3D%22M2%2012h20%22%20%2F%3E%20%3Cpath%20d%3D%22m5%209-3%203%203%203%22%20%2F%3E%20%3Cpath%20d%3D%22m9%205%203-3%203%203%22%20%2F%3E%20%3C%2Fsvg%3E","icons:info":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2016v-4%22%20%2F%3E%20%3Cpath%20d%3D%22M12%208h.01%22%20%2F%3E%20%3C%2Fsvg%3E","icons:description":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2013H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2017H8%22%20%2F%3E%20%3C%2Fsvg%3E","icons:delete":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2011v6%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2011v6%22%20%2F%3E%20%3Cpath%20d%3D%22M19%206v14a2%202%200%200%201-2%202H7a2%202%200%200%201-2-2V6%22%20%2F%3E%20%3Cpath%20d%3D%22M3%206h18%22%20%2F%3E%20%3Cpath%20d%3D%22M8%206V4a2%202%200%200%201%202-2h4a2%202%200%200%201%202%202v2%22%20%2F%3E%20%3C%2Fsvg%3E","icons:view-module":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%2214%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%2214%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%223%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","icons:toc":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M8%205h13%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2019h8%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2010a2%202%200%200%200%202%202h3%22%20%2F%3E%20%3Cpath%20d%3D%22M3%205v12a2%202%200%200%200%202%202h3%22%20%2F%3E%20%3C%2Fsvg%3E","icons:swap-vert":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m21%2016-4%204-4-4%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2020V4%22%20%2F%3E%20%3Cpath%20d%3D%22m3%208%204-4%204%204%22%20%2F%3E%20%3Cpath%20d%3D%22M7%204v16%22%20%2F%3E%20%3C%2Fsvg%3E","icons:swap-horiz":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M8%203%204%207l4%204%22%20%2F%3E%20%3Cpath%20d%3D%22M4%207h16%22%20%2F%3E%20%3Cpath%20d%3D%22m16%2021%204-4-4-4%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2017H4%22%20%2F%3E%20%3C%2Fsvg%3E","icons:style":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m14.622%2017.897-10.68-2.913%22%20%2F%3E%20%3Cpath%20d%3D%22M18.376%202.622a1%201%200%201%201%203.002%203.002L17.36%209.643a.5.5%200%200%200%200%20.707l.944.944a2.41%202.41%200%200%201%200%203.408l-.944.944a.5.5%200%200%201-.707%200L8.354%207.348a.5.5%200%200%201%200-.707l.944-.944a2.41%202.41%200%200%201%203.408%200l.944.944a.5.5%200%200%200%20.707%200z%22%20%2F%3E%20%3Cpath%20d%3D%22M9%208c-1.804%202.71-3.97%203.46-6.583%203.948a.507.507%200%200%200-.302.819l7.32%208.883a1%201%200%200%200%201.185.204C12.735%2020.405%2016%2016.792%2016%2015%22%20%2F%3E%20%3C%2Fsvg%3E","icons:restore":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%2012a9%209%200%201%200%209-9%209.75%209.75%200%200%200-6.74%202.74L3%208%22%20%2F%3E%20%3Cpath%20d%3D%22M3%203v5h5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:record-voice-over":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2019v3%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2010v2a7%207%200%200%201-14%200v-2%22%20%2F%3E%20%3Crect%20x%3D%229%22%20y%3D%222%22%20width%3D%226%22%20height%3D%2213%22%20rx%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","icons:perm-media":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m22%2011-1.296-1.296a2.4%202.4%200%200%200-3.408%200L11%2016%22%20%2F%3E%20%3Cpath%20d%3D%22M4%208a2%202%200%200%200-2%202v10a2%202%200%200%200%202%202h10a2%202%200%200%200%202-2%22%20%2F%3E%20%3Ccircle%20cx%3D%2213%22%20cy%3D%227%22%20r%3D%221%22%20fill%3D%22currentColor%22%20%2F%3E%20%3Crect%20x%3D%228%22%20y%3D%222%22%20width%3D%2214%22%20height%3D%2214%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","icons:open-in-new":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%203h6v6%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2014%2021%203%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2013v6a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2V8a2%202%200%200%201%202-2h6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:move-to-inbox":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpolyline%20points%3D%2222%2012%2016%2012%2014%2015%2010%2015%208%2012%202%2012%22%20%2F%3E%20%3Cpath%20d%3D%22M5.45%205.11%202%2012v6a2%202%200%200%200%202%202h16a2%202%200%200%200%202-2v-6l-3.45-6.89A2%202%200%200%200%2016.76%204H7.24a2%202%200%200%200-1.79%201.11z%22%20%2F%3E%20%3C%2Fsvg%3E","icons:menu":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%205h16%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2012h16%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2019h16%22%20%2F%3E%20%3C%2Fsvg%3E","icons:launch":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%203h6v6%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2014%2021%203%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2013v6a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2V8a2%202%200%200%201%202-2h6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:label":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12.586%202.586A2%202%200%200%200%2011.172%202H4a2%202%200%200%200-2%202v7.172a2%202%200%200%200%20.586%201.414l8.704%208.704a2.426%202.426%200%200%200%203.42%200l6.58-6.58a2.426%202.426%200%200%200%200-3.42z%22%20%2F%3E%20%3Ccircle%20cx%3D%227.5%22%20cy%3D%227.5%22%20r%3D%22.5%22%20fill%3D%22currentColor%22%20%2F%3E%20%3C%2Fsvg%3E","icons:fullscreen":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M8%203H5a2%202%200%200%200-2%202v3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%208V5a2%202%200%200%200-2-2h-3%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2016v3a2%202%200%200%200%202%202h3%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2021h3a2%202%200%200%200%202-2v-3%22%20%2F%3E%20%3C%2Fsvg%3E","icons:file-upload":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%203v12%22%20%2F%3E%20%3Cpath%20d%3D%22m17%208-5-5-5%205%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2015v4a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2v-4%22%20%2F%3E%20%3C%2Fsvg%3E","icons:compress":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m14%2010%207-7%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2010h-6V4%22%20%2F%3E%20%3Cpath%20d%3D%22m3%2021%207-7%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2014h6v6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:clear":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%206%206%2018%22%20%2F%3E%20%3Cpath%20d%3D%22m6%206%2012%2012%22%20%2F%3E%20%3C%2Fsvg%3E","icons:close":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%206%206%2018%22%20%2F%3E%20%3Cpath%20d%3D%22m6%206%2012%2012%22%20%2F%3E%20%3C%2Fsvg%3E","icons:cancel":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%206%206%2018%22%20%2F%3E%20%3Cpath%20d%3D%22m6%206%2012%2012%22%20%2F%3E%20%3C%2Fsvg%3E","icons:arrow-upward":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m5%2012%207-7%207%207%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2019V5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:arrow-downward":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%205v14%22%20%2F%3E%20%3Cpath%20d%3D%22m19%2012-7%207-7-7%22%20%2F%3E%20%3C%2Fsvg%3E","icons:arrow-back":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m12%2019-7-7%207-7%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2012H5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:arrow-forward":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3Cpath%20d%3D%22m12%205%207%207-7%207%22%20%2F%3E%20%3C%2Fsvg%3E","icons:chevron-left":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m15%2018-6-6%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:chevron-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:expand-more":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m6%209%206%206%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:expand-less":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18%2015-6-6-6%206%22%20%2F%3E%20%3C%2Fsvg%3E","icons:arrow-drop-down":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m6%209%206%206%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:more-vert":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%225%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2219%22%20r%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","icons:more-horiz":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2219%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%225%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","icons:settings":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9.671%204.136a2.34%202.34%200%200%201%204.659%200%202.34%202.34%200%200%200%203.319%201.915%202.34%202.34%200%200%201%202.33%204.033%202.34%202.34%200%200%200%200%203.831%202.34%202.34%200%200%201-2.33%204.033%202.34%202.34%200%200%200-3.319%201.915%202.34%202.34%200%200%201-4.659%200%202.34%202.34%200%200%200-3.32-1.915%202.34%202.34%200%200%201-2.33-4.033%202.34%202.34%200%200%200%200-3.831A2.34%202.34%200%200%201%206.35%206.051a2.34%202.34%200%200%200%203.319-1.915%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","icons:home":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2021v-8a1%201%200%200%200-1-1h-4a1%201%200%200%200-1%201v8%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2010a2%202%200%200%201%20.709-1.528l7-6a2%202%200%200%201%202.582%200l7%206A2%202%200%200%201%2021%2010v9a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2z%22%20%2F%3E%20%3C%2Fsvg%3E","icons:help":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cpath%20d%3D%22M9.09%209a3%203%200%200%201%205.83%201c0%202-3%203-3%203%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2017h.01%22%20%2F%3E%20%3C%2Fsvg%3E","icons:add":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3Cpath%20d%3D%22M12%205v14%22%20%2F%3E%20%3C%2Fsvg%3E","icons:add-box":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M12%208v8%22%20%2F%3E%20%3C%2Fsvg%3E","icons:remove":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3C%2Fsvg%3E","icons:find-replace":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M14%204a1%201%200%200%201%201-1%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2010a1%201%200%200%201-1-1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%204a1%201%200%200%200-1-1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%209a1%201%200%200%201-1%201%22%20%2F%3E%20%3Cpath%20d%3D%22m3%207%203%203%203-3%22%20%2F%3E%20%3Cpath%20d%3D%22M6%2010V5a2%202%200%200%201%202-2h2%22%20%2F%3E%20%3Crect%20x%3D%223%22%20y%3D%2214%22%20width%3D%227%22%20height%3D%227%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","icons:archive":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2220%22%20height%3D%225%22%20x%3D%222%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M4%208v11a2%202%200%200%200%202%202h12a2%202%200%200%200%202-2V8%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2012h4%22%20%2F%3E%20%3C%2Fsvg%3E","icons:exit-to-app":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2017%205-5-5-5%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H9%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2021H5a2%202%200%200%201-2-2V5a2%202%200%200%201%202-2h4%22%20%2F%3E%20%3C%2Fsvg%3E","icons:account-circle":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2210%22%20r%3D%223%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2020.662V19a2%202%200%200%201%202-2h6a2%202%200%200%201%202%202v1.662%22%20%2F%3E%20%3C%2Fsvg%3E","icons:star":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11.525%202.295a.53.53%200%200%201%20.95%200l2.31%204.679a2.123%202.123%200%200%200%201.595%201.16l5.166.756a.53.53%200%200%201%20.294.904l-3.736%203.638a2.123%202.123%200%200%200-.611%201.878l.882%205.14a.53.53%200%200%201-.771.56l-4.618-2.428a2.122%202.122%200%200%200-1.973%200L6.396%2021.01a.53.53%200%200%201-.77-.56l.881-5.139a2.122%202.122%200%200%200-.611-1.879L2.16%209.795a.53.53%200%200%201%20.294-.906l5.165-.755a2.122%202.122%200%200%200%201.597-1.16z%22%20%2F%3E%20%3C%2Fsvg%3E","icons:bookmark":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M17%203a2%202%200%200%201%202%202v15a1%201%200%200%201-1.496.868l-4.512-2.578a2%202%200%200%200-1.984%200l-4.512%202.578A1%201%200%200%201%205%2020V5a2%202%200%200%201%202-2z%22%20%2F%3E%20%3C%2Fsvg%3E","icons:assignment-turned-in":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%228%22%20height%3D%224%22%20x%3D%228%22%20y%3D%222%22%20rx%3D%221%22%20ry%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M16%204h2a2%202%200%200%201%202%202v14a2%202%200%200%201-2%202H6a2%202%200%200%201-2-2V6a2%202%200%200%201%202-2h2%22%20%2F%3E%20%3Cpath%20d%3D%22m9%2014%202%202%204-4%22%20%2F%3E%20%3C%2Fsvg%3E","editor:insert-link":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2013a5%205%200%200%200%207.54.54l3-3a5%205%200%200%200-7.07-7.07l-1.72%201.71%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2011a5%205%200%200%200-7.54-.54l-3%203a5%205%200%200%200%207.07%207.07l1.71-1.71%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-align-left":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2012H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2019H3%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-align-center":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2012H7%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2019H5%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-align-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H9%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H7%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-align-justify":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%205h18%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2012h18%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2019h18%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-list-bulleted":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%205h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2012h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2019h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M8%205h13%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h13%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2019h13%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-list-numbered":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11%205h10%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2012h10%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2019h10%22%20%2F%3E%20%3Cpath%20d%3D%22M4%204h1v5%22%20%2F%3E%20%3Cpath%20d%3D%22M4%209h2%22%20%2F%3E%20%3Cpath%20d%3D%22M6.5%2020H3.4c0-1%202.6-1.925%202.6-3.5a1.5%201.5%200%200%200-2.6-1.02%22%20%2F%3E%20%3C%2Fsvg%3E","editor:insert-drive-file":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3C%2Fsvg%3E","editor:insert-photo":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%229%22%20r%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22m21%2015-3.086-3.086a2%202%200%200%200-2.828%200L6%2021%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-quote":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%203a2%202%200%200%200-2%202v6a2%202%200%200%200%202%202%201%201%200%200%201%201%201v1a2%202%200%200%201-2%202%201%201%200%200%200-1%201v2a1%201%200%200%200%201%201%206%206%200%200%200%206-6V5a2%202%200%200%200-2-2z%22%20%2F%3E%20%3Cpath%20d%3D%22M5%203a2%202%200%200%200-2%202v6a2%202%200%200%200%202%202%201%201%200%200%201%201%201v1a2%202%200%200%201-2%202%201%201%200%200%200-1%201v2a1%201%200%200%200%201%201%206%206%200%200%200%206-6V5a2%202%200%200%200-2-2z%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-italic":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cline%20x1%3D%2219%22%20x2%3D%2210%22%20y1%3D%224%22%20y2%3D%224%22%20%2F%3E%20%3Cline%20x1%3D%2214%22%20x2%3D%225%22%20y1%3D%2220%22%20y2%3D%2220%22%20%2F%3E%20%3Cline%20x1%3D%2215%22%20x2%3D%229%22%20y1%3D%224%22%20y2%3D%2220%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-bold":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2012h9a4%204%200%200%201%200%208H7a1%201%200%200%201-1-1V5a1%201%200%200%201%201-1h7a4%204%200%200%201%200%208%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-underlined":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%204v6a6%206%200%200%200%2012%200V4%22%20%2F%3E%20%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2220%22%20y2%3D%2220%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-strikethrough":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%204H9a3%203%200%200%200-2.83%204%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2012a4%204%200%200%201%200%208H6%22%20%2F%3E%20%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2212%22%20y2%3D%2212%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-clear":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%207V4h16v3%22%20%2F%3E%20%3Cpath%20d%3D%22M5%2020h6%22%20%2F%3E%20%3Cpath%20d%3D%22M13%204%208%2020%22%20%2F%3E%20%3Cpath%20d%3D%22m15%2015%205%205%22%20%2F%3E%20%3Cpath%20d%3D%22m20%2015-5%205%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-line-spacing":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%205h11%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2012h11%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2019h11%22%20%2F%3E%20%3Cpath%20d%3D%22m3%2010%203-3-3-3%22%20%2F%3E%20%3Cpath%20d%3D%22m3%2020%203-3-3-3%22%20%2F%3E%20%3C%2Fsvg%3E","editor:insert-emoticon":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2010V9%22%20%2F%3E%20%3Cpath%20d%3D%22M16.472%2015a6%206%200%2001-8.943%200%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2010V9%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3C%2Fsvg%3E","editor:highlight":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m9%2011-6%206v3h9l3-3%22%20%2F%3E%20%3Cpath%20d%3D%22m22%2012-4.6%204.6a2%202%200%200%201-2.8%200l-5.2-5.2a2%202%200%200%201%200-2.8L14%204%22%20%2F%3E%20%3C%2Fsvg%3E","editor:functions":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%207V5a1%201%200%200%200-1-1H6.5a.5.5%200%200%200-.4.8l4.5%206a2%202%200%200%201%200%202.4l-4.5%206a.5.5%200%200%200%20.4.8H17a1%201%200%200%200%201-1v-2%22%20%2F%3E%20%3C%2Fsvg%3E","editor:title":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2012h12%22%20%2F%3E%20%3Cpath%20d%3D%22M6%2020V4%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2020V4%22%20%2F%3E%20%3C%2Fsvg%3E","editor:short-text":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2012H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2019H3%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-textdirection-r-to-l":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%203v11%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209H7a1%201%200%200%201%200-6h8%22%20%2F%3E%20%3Cpath%20d%3D%22M14%203v11%22%20%2F%3E%20%3Cpath%20d%3D%22m18%2014%204%204H2%22%20%2F%3E%20%3Cpath%20d%3D%22m22%2018-4%204%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-size":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m15%2016%202.536-7.328a1.02%201.02%201%200%201%201.928%200L22%2016%22%20%2F%3E%20%3Cpath%20d%3D%22M15.697%2014h5.606%22%20%2F%3E%20%3Cpath%20d%3D%22m2%2016%204.039-9.69a.5.5%200%200%201%20.923%200L11%2016%22%20%2F%3E%20%3Cpath%20d%3D%22M3.304%2013h6.392%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-indent-increase":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m3%208%204%204-4%204%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-indent-decrease":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m7%208-4%204%204%204%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-color-text":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2020h16%22%20%2F%3E%20%3Cpath%20d%3D%22m6%2016%206-12%206%2012%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h8%22%20%2F%3E%20%3C%2Fsvg%3E","editor:border-all":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%203v18%22%20%2F%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M3%209h18%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2015h18%22%20%2F%3E%20%3C%2Fsvg%3E","editor:attach-file":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%206-8.414%208.586a2%202%200%200%200%202.829%202.829l8.414-8.586a4%204%200%201%200-5.657-5.657l-8.379%208.551a6%206%200%201%200%208.485%208.485l8.379-8.551%22%20%2F%3E%20%3C%2Fsvg%3E","editor:mode-edit":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21.174%206.812a1%201%200%200%200-3.986-3.987L3.842%2016.174a2%202%200%200%200-.5.83l-1.321%204.352a.5.5%200%200%200%20.623.622l4.353-1.32a2%202%200%200%200%20.83-.497z%22%20%2F%3E%20%3Cpath%20d%3D%22m15%205%204%204%22%20%2F%3E%20%3C%2Fsvg%3E","mdextra:unlink":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18.84%2012.25%201.72-1.71h-.02a5.004%205.004%200%200%200-.12-7.07%205.006%205.006%200%200%200-6.95%200l-1.72%201.71%22%20%2F%3E%20%3Cpath%20d%3D%22m5.17%2011.75-1.71%201.71a5.004%205.004%200%200%200%20.12%207.07%205.006%205.006%200%200%200%206.95%200l1.71-1.71%22%20%2F%3E%20%3Cline%20x1%3D%228%22%20x2%3D%228%22%20y1%3D%222%22%20y2%3D%225%22%20%2F%3E%20%3Cline%20x1%3D%222%22%20x2%3D%225%22%20y1%3D%228%22%20y2%3D%228%22%20%2F%3E%20%3Cline%20x1%3D%2216%22%20x2%3D%2216%22%20y1%3D%2219%22%20y2%3D%2222%22%20%2F%3E%20%3Cline%20x1%3D%2219%22%20x2%3D%2222%22%20y1%3D%2216%22%20y2%3D%2216%22%20%2F%3E%20%3C%2Fsvg%3E","mdextra:superscript":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m4%2019%208-8%22%20%2F%3E%20%3Cpath%20d%3D%22m12%2019-8-8%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2012h-4c0-1.5.442-2%201.5-2.5S20%208.334%2020%207.002c0-.472-.17-.93-.484-1.29a2.105%202.105%200%200%200-2.617-.436c-.42.239-.738.614-.899%201.06%22%20%2F%3E%20%3C%2Fsvg%3E","mdextra:subscript":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m4%205%208%208%22%20%2F%3E%20%3Cpath%20d%3D%22m12%205-8%208%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2019h-4c0-1.5.44-2%201.5-2.5S20%2015.33%2020%2014c0-.47-.17-.93-.48-1.29a2.11%202.11%200%200%200-2.62-.44c-.42.24-.74.62-.9%201.07%22%20%2F%3E%20%3C%2Fsvg%3E","image:tune":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2019H3%22%20%2F%3E%20%3Cpath%20d%3D%22M14%203v4%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2017v4%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012h-9%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019h-5%22%20%2F%3E%20%3Cpath%20d%3D%22M21%205h-7%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2010v4%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012H3%22%20%2F%3E%20%3C%2Fsvg%3E","image:image":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%229%22%20r%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22m21%2015-3.086-3.086a2%202%200%200%200-2.828%200L6%2021%22%20%2F%3E%20%3C%2Fsvg%3E","image:style":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m14.622%2017.897-10.68-2.913%22%20%2F%3E%20%3Cpath%20d%3D%22M18.376%202.622a1%201%200%201%201%203.002%203.002L17.36%209.643a.5.5%200%200%200%200%20.707l.944.944a2.41%202.41%200%200%201%200%203.408l-.944.944a.5.5%200%200%201-.707%200L8.354%207.348a.5.5%200%200%201%200-.707l.944-.944a2.41%202.41%200%200%201%203.408%200l.944.944a.5.5%200%200%200%20.707%200z%22%20%2F%3E%20%3Cpath%20d%3D%22M9%208c-1.804%202.71-3.97%203.46-6.583%203.948a.507.507%200%200%200-.302.819l7.32%208.883a1%201%200%200%200%201.185.204C12.735%2020.405%2016%2016.792%2016%2015%22%20%2F%3E%20%3C%2Fsvg%3E","image:crop-landscape":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2220%22%20height%3D%2212%22%20x%3D%222%22%20y%3D%226%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","image:transform":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%202v14a2%202%200%200%200%202%202h14%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2022V8a2%202%200%200%200-2-2H2%22%20%2F%3E%20%3C%2Fsvg%3E","image:slideshow":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2%203h20%22%20%2F%3E%20%3Cpath%20d%3D%22M21%203v11a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2V3%22%20%2F%3E%20%3Cpath%20d%3D%22m7%2021%205-5%205%205%22%20%2F%3E%20%3C%2Fsvg%3E","image:rotate-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%2012a9%209%200%201%201-9-9c2.52%200%204.93%201%206.74%202.74L21%208%22%20%2F%3E%20%3Cpath%20d%3D%22M21%203v5h-5%22%20%2F%3E%20%3C%2Fsvg%3E","image:photo-library":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m22%2011-1.296-1.296a2.4%202.4%200%200%200-3.408%200L11%2016%22%20%2F%3E%20%3Cpath%20d%3D%22M4%208a2%202%200%200%200-2%202v10a2%202%200%200%200%202%202h10a2%202%200%200%200%202-2%22%20%2F%3E%20%3Ccircle%20cx%3D%2213%22%20cy%3D%227%22%20r%3D%221%22%20fill%3D%22currentColor%22%20%2F%3E%20%3Crect%20x%3D%228%22%20y%3D%222%22%20width%3D%2214%22%20height%3D%2214%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","image:music-note":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9%2018V5l12-2v13%22%20%2F%3E%20%3Ccircle%20cx%3D%226%22%20cy%3D%2218%22%20r%3D%223%22%20%2F%3E%20%3Ccircle%20cx%3D%2218%22%20cy%3D%2216%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","image:grid-on":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M3%209h18%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2015h18%22%20%2F%3E%20%3Cpath%20d%3D%22M9%203v18%22%20%2F%3E%20%3Cpath%20d%3D%22M15%203v18%22%20%2F%3E%20%3C%2Fsvg%3E","image:collections":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2%207v10%22%20%2F%3E%20%3Cpath%20d%3D%22M6%205v14%22%20%2F%3E%20%3Crect%20width%3D%2212%22%20height%3D%2218%22%20x%3D%2210%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","image:blur-on":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11.017%202.814a1%201%200%200%201%201.966%200l1.051%205.558a2%202%200%200%200%201.594%201.594l5.558%201.051a1%201%200%200%201%200%201.966l-5.558%201.051a2%202%200%200%200-1.594%201.594l-1.051%205.558a1%201%200%200%201-1.966%200l-1.051-5.558a2%202%200%200%200-1.594-1.594l-5.558-1.051a1%201%200%200%201%200-1.966l5.558-1.051a2%202%200%200%200%201.594-1.594z%22%20%2F%3E%20%3Cpath%20d%3D%22M20%202v4%22%20%2F%3E%20%3Cpath%20d%3D%22M22%204h-4%22%20%2F%3E%20%3Ccircle%20cx%3D%224%22%20cy%3D%2220%22%20r%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","av:play-circle-filled":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9%209.003a1%201%200%200%201%201.517-.859l4.997%202.997a1%201%200%200%201%200%201.718l-4.997%202.997A1%201%200%200%201%209%2014.996z%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3C%2Fsvg%3E","av:volume-up":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11%204.702a.705.705%200%200%200-1.203-.498L6.413%207.587A1.4%201.4%200%200%201%205.416%208H3a1%201%200%200%200-1%201v6a1%201%200%200%200%201%201h2.416a1.4%201.4%200%200%201%20.997.413l3.383%203.384A.705.705%200%200%200%2011%2019.298z%22%20%2F%3E%20%3Cpath%20d%3D%22M16%209a5%205%200%200%201%200%206%22%20%2F%3E%20%3Cpath%20d%3D%22M19.364%2018.364a9%209%200%200%200%200-12.728%22%20%2F%3E%20%3C%2Fsvg%3E","av:volume-off":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11%204.702a.7.7%200%200%200-1.203-.498L6.413%207.587A1.4%201.4%200%200%201%205.416%208H3a1%201%200%200%200-1%201v6a1%201%200%200%200%201%201h2.416a1.4%201.4%200%200%201%20.997.413l3.383%203.384A.7.7%200%200%200%2011%2019.298z%22%20%2F%3E%20%3Cpath%20d%3D%22m16.5%2014.5%205-5%22%20%2F%3E%20%3Cpath%20d%3D%22m16.5%209.5%205%205%22%20%2F%3E%20%3C%2Fsvg%3E","av:music-note":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9%2018V5l12-2v13%22%20%2F%3E%20%3Ccircle%20cx%3D%226%22%20cy%3D%2218%22%20r%3D%223%22%20%2F%3E%20%3Ccircle%20cx%3D%2218%22%20cy%3D%2216%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","av:videocam":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2013%205.223%203.482a.5.5%200%200%200%20.777-.416V7.87a.5.5%200%200%200-.752-.432L16%2010.5%22%20%2F%3E%20%3Crect%20x%3D%222%22%20y%3D%226%22%20width%3D%2214%22%20height%3D%2212%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","av:call-to-action":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2015h18%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:keyboard-return":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M20%204v7a4%204%200%200%201-4%204H4%22%20%2F%3E%20%3Cpath%20d%3D%22m9%2010-5%205%205%205%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:keyboard":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%208h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2012h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M14%208h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2012h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M18%208h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M6%208h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2016h10%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h.01%22%20%2F%3E%20%3Crect%20width%3D%2220%22%20height%3D%2216%22%20x%3D%222%22%20y%3D%224%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:keyboard-arrow-up":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18%2015-6-6-6%206%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:keyboard-arrow-down":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m6%209%206%206%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:security":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M20%2013c0%205-3.5%207.5-7.66%208.95a1%201%200%200%201-.67-.01C7.5%2020.5%204%2018%204%2013V6a1%201%200%200%201%201-1c2%200%204.5-1.2%206.24-2.72a1.17%201.17%200%200%201%201.52%200C14.51%203.81%2017%205%2019%205a1%201%200%200%201%201%201z%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:computer":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2220%22%20height%3D%2214%22%20x%3D%222%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cline%20x1%3D%228%22%20x2%3D%2216%22%20y1%3D%2221%22%20y2%3D%2221%22%20%2F%3E%20%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%2217%22%20y2%3D%2221%22%20%2F%3E%20%3C%2Fsvg%3E","device:brightness-medium":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%202v2%22%20%2F%3E%20%3Cpath%20d%3D%22M14.837%2016.385a6%206%200%201%201-7.223-7.222c.624-.147.97.66.715%201.248a4%204%200%200%200%205.26%205.259c.589-.255%201.396.09%201.248.715%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2012a4%204%200%200%200-4-4%22%20%2F%3E%20%3Cpath%20d%3D%22m19%205-1.256%201.256%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2012h2%22%20%2F%3E%20%3C%2Fsvg%3E","device:access-time":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cpath%20d%3D%22M12%206v6l4%202%22%20%2F%3E%20%3C%2Fsvg%3E","social:public":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cpath%20d%3D%22M12%202a14.5%2014.5%200%200%200%200%2020%2014.5%2014.5%200%200%200%200-20%22%20%2F%3E%20%3Cpath%20d%3D%22M2%2012h20%22%20%2F%3E%20%3C%2Fsvg%3E","social:person":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M19%2021v-2a4%204%200%200%200-4-4H9a4%204%200%200%200-4%204v2%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%227%22%20r%3D%224%22%20%2F%3E%20%3C%2Fsvg%3E","social:people":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%2021v-2a4%204%200%200%200-4-4H6a4%204%200%200%200-4%204v2%22%20%2F%3E%20%3Cpath%20d%3D%22M16%203.128a4%204%200%200%201%200%207.744%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2021v-2a4%204%200%200%200-3-3.87%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%227%22%20r%3D%224%22%20%2F%3E%20%3C%2Fsvg%3E","social:mood":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2010V9%22%20%2F%3E%20%3Cpath%20d%3D%22M16.472%2015a6%206%200%2001-8.943%200%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2010V9%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3C%2Fsvg%3E","places:all-inclusive":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2016c5%200%207-8%2012-8a4%204%200%200%201%200%208c-5%200-7-8-12-8a4%204%200%201%200%200%208%22%20%2F%3E%20%3C%2Fsvg%3E","maps:local-mall":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%2010a4%204%200%200%201-8%200%22%20%2F%3E%20%3Cpath%20d%3D%22M3.103%206.034h17.794%22%20%2F%3E%20%3Cpath%20d%3D%22M3.4%205.467a2%202%200%200%200-.4%201.2V20a2%202%200%200%200%202%202h14a2%202%200%200%200%202-2V6.667a2%202%200%200%200-.4-1.2l-2-2.667A2%202%200%200%200%2017%202H7a2%202%200%200%200-1.6.8z%22%20%2F%3E%20%3C%2Fsvg%3E","mdi-social:github-circle":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%206a9%209%200%200%200-9%209V3%22%20%2F%3E%20%3Ccircle%20cx%3D%2218%22%20cy%3D%226%22%20r%3D%223%22%20%2F%3E%20%3Ccircle%20cx%3D%226%22%20cy%3D%2218%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:palette":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2022a1%201%200%200%201%200-20%2010%209%200%200%201%2010%209%205%205%200%200%201-5%205h-2.25a1.75%201.75%200%200%200-1.4%202.8l.3.4a1.75%201.75%200%200%201-1.4%202.8z%22%20%2F%3E%20%3Ccircle%20cx%3D%2213.5%22%20cy%3D%226.5%22%20r%3D%22.5%22%20fill%3D%22currentColor%22%20%2F%3E%20%3Ccircle%20cx%3D%2217.5%22%20cy%3D%2210.5%22%20r%3D%22.5%22%20fill%3D%22currentColor%22%20%2F%3E%20%3Ccircle%20cx%3D%226.5%22%20cy%3D%2212.5%22%20r%3D%22.5%22%20fill%3D%22currentColor%22%20%2F%3E%20%3Ccircle%20cx%3D%228.5%22%20cy%3D%227.5%22%20r%3D%22.5%22%20fill%3D%22currentColor%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:pdf":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2013H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2017H8%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:write":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M13%2021h8%22%20%2F%3E%20%3Cpath%20d%3D%22M21.174%206.812a1%201%200%200%200-3.986-3.987L3.842%2016.174a2%202%200%200%200-.5.83l-1.321%204.352a.5.5%200%200%200%20.623.622l4.353-1.32a2%202%200%200%200%20.83-.497z%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:teacher":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21.42%2010.922a1%201%200%200%200-.019-1.838L12.83%205.18a2%202%200%200%200-1.66%200L2.6%209.08a1%201%200%200%200%200%201.832l8.57%203.908a2%202%200%200%200%201.66%200z%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2010v6%22%20%2F%3E%20%3Cpath%20d%3D%22M6%2012.5V16a6%203%200%200%200%2012%200v-3.5%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:quiz":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M13%205h8%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2019h8%22%20%2F%3E%20%3Cpath%20d%3D%22m3%2017%202%202%204-4%22%20%2F%3E%20%3Cpath%20d%3D%22m3%207%202%202%204-4%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:people":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%2021v-2a4%204%200%200%200-4-4H6a4%204%200%200%200-4%204v2%22%20%2F%3E%20%3Cpath%20d%3D%22M16%203.128a4%204%200%200%201%200%207.744%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2021v-2a4%204%200%200%200-3-3.87%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%227%22%20r%3D%224%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:page":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:book":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2019.5v-15A2.5%202.5%200%200%201%206.5%202H19a1%201%200%200%201%201%201v18a1%201%200%200%201-1%201H6.5a1%201%200%200%201%200-5H20%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:assessment":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%228%22%20height%3D%224%22%20x%3D%228%22%20y%3D%222%22%20rx%3D%221%22%20ry%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M16%204h2a2%202%200%200%201%202%202v14a2%202%200%200%201-2%202H6a2%202%200%200%201-2-2V6a2%202%200%200%201%202-2h2%22%20%2F%3E%20%3Cpath%20d%3D%22m9%2014%202%202%204-4%22%20%2F%3E%20%3C%2Fsvg%3E","courseicons:strategy":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2014c.2-1%20.7-1.7%201.5-2.5%201-.9%201.5-2.2%201.5-3.5A6%206%200%200%200%206%208c0%201%20.2%202.2%201.5%203.5.7.7%201.3%201.5%201.5%202.5%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2018h6%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2022h4%22%20%2F%3E%20%3C%2Fsvg%3E","courseicons:listen":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%2014h3a2%202%200%200%201%202%202v3a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2v-7a9%209%200%200%201%2018%200v7a2%202%200%200%201-2%202h-1a2%202%200%200%201-2-2v-3a2%202%200%200%201%202-2h3%22%20%2F%3E%20%3C%2Fsvg%3E","courseicons:learning-objectives":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%226%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","courseicons:knowledge":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2018V5%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2013a4.17%204.17%200%200%201-3-4%204.17%204.17%200%200%201-3%204%22%20%2F%3E%20%3Cpath%20d%3D%22M17.598%206.5A3%203%200%201%200%2012%205a3%203%200%201%200-5.598%201.5%22%20%2F%3E%20%3Cpath%20d%3D%22M17.997%205.125a4%204%200%200%201%202.526%205.77%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2018a4%204%200%200%200%202-7.464%22%20%2F%3E%20%3Cpath%20d%3D%22M19.967%2017.483A4%204%200%201%201%2012%2018a4%204%200%201%201-7.967-.517%22%20%2F%3E%20%3Cpath%20d%3D%22M6%2018a4%204%200%200%201-2-7.464%22%20%2F%3E%20%3Cpath%20d%3D%22M6.003%205.125a4%204%200%200%200-2.526%205.77%22%20%2F%3E%20%3C%2Fsvg%3E","courseicons:chem-connection":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M14%202v6a2%202%200%200%200%20.245.96l5.51%2010.08A2%202%200%200%201%2018%2022H6a2%202%200%200%201-1.755-2.96l5.51-10.08A2%202%200%200%200%2010%208V2%22%20%2F%3E%20%3Cpath%20d%3D%22M6.453%2015h11.094%22%20%2F%3E%20%3Cpath%20d%3D%22M8.5%202h7%22%20%2F%3E%20%3C%2Fsvg%3E","oer:box":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%208a2%202%200%200%200-1-1.73l-7-4a2%202%200%200%200-2%200l-7%204A2%202%200%200%200%203%208v8a2%202%200%200%200%201%201.73l7%204a2%202%200%200%200%202%200l7-4A2%202%200%200%200%2021%2016Z%22%20%2F%3E%20%3Cpath%20d%3D%22m3.3%207%208.7%205%208.7-5%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2022V12%22%20%2F%3E%20%3C%2Fsvg%3E","oer:pilcrow":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M13%204v16%22%20%2F%3E%20%3Cpath%20d%3D%22M17%204v16%22%20%2F%3E%20%3Cpath%20d%3D%22M19%204H9.5a4.5%204.5%200%200%200%200%209H13%22%20%2F%3E%20%3C%2Fsvg%3E","oer:type":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%204v16%22%20%2F%3E%20%3Cpath%20d%3D%22M4%207V5a1%201%200%200%201%201-1h14a1%201%200%200%201%201%201v2%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2020h6%22%20%2F%3E%20%3C%2Fsvg%3E","oer:plus":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3Cpath%20d%3D%22M12%205v14%22%20%2F%3E%20%3C%2Fsvg%3E","oer:arrow-up":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m5%2012%207-7%207%207%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2019V5%22%20%2F%3E%20%3C%2Fsvg%3E","oer:arrow-down":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%205v14%22%20%2F%3E%20%3Cpath%20d%3D%22m19%2012-7%207-7-7%22%20%2F%3E%20%3C%2Fsvg%3E","oer:arrow-up-to-line":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%203h14%22%20%2F%3E%20%3Cpath%20d%3D%22m18%2013-6-6-6%206%22%20%2F%3E%20%3Cpath%20d%3D%22M12%207v14%22%20%2F%3E%20%3C%2Fsvg%3E","oer:arrow-down-to-line":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2017V3%22%20%2F%3E%20%3Cpath%20d%3D%22m6%2011%206%206%206-6%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2021H5%22%20%2F%3E%20%3C%2Fsvg%3E","oer:copy":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2214%22%20height%3D%2214%22%20x%3D%228%22%20y%3D%228%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2016c-1.1%200-2-.9-2-2V4c0-1.1.9-2%202-2h10c1.1%200%202%20.9%202%202%22%20%2F%3E%20%3C%2Fsvg%3E","oer:columns-2":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M12%203v18%22%20%2F%3E%20%3C%2Fsvg%3E","oer:panel-right-close":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M15%203v18%22%20%2F%3E%20%3Cpath%20d%3D%22m8%209%203%203-3%203%22%20%2F%3E%20%3C%2Fsvg%3E","oer:code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2018%206-6-6-6%22%20%2F%3E%20%3Cpath%20d%3D%22m8%206-6%206%206%206%22%20%2F%3E%20%3C%2Fsvg%3E","oer:lock":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2211%22%20x%3D%223%22%20y%3D%2211%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2011V7a5%205%200%200%201%2010%200v4%22%20%2F%3E%20%3C%2Fsvg%3E","oer:lock-open":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2211%22%20x%3D%223%22%20y%3D%2211%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2011V7a5%205%200%200%201%209.9-1%22%20%2F%3E%20%3C%2Fsvg%3E","oer:trash-2":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2011v6%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2011v6%22%20%2F%3E%20%3Cpath%20d%3D%22M19%206v14a2%202%200%200%201-2%202H7a2%202%200%200%201-2-2V6%22%20%2F%3E%20%3Cpath%20d%3D%22M3%206h18%22%20%2F%3E%20%3Cpath%20d%3D%22M8%206V4a2%202%200%200%201%202-2h4a2%202%200%200%201%202%202v2%22%20%2F%3E%20%3C%2Fsvg%3E","oer:heading-2":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2018h-4c0-4%204-3%204-6%200-1.5-2-2.5-4-1%22%20%2F%3E%20%3C%2Fsvg%3E","oer:heading-3":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17.5%2010.5c1.7-1%203.5%200%203.5%201.5a2%202%200%200%201-2%202%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2017.5c2%201.5%204%20.3%204-1.5a2%202%200%200%200-2-2%22%20%2F%3E%20%3C%2Fsvg%3E","oer:heading-4":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2010v3a1%201%200%200%200%201%201h3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2010v8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3C%2Fsvg%3E","oer:heading-5":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2013v-3h4%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2017.7c.4.2.8.3%201.3.3%201.5%200%202.7-1.1%202.7-2.5S19.8%2013%2018.3%2013H17%22%20%2F%3E%20%3C%2Fsvg%3E","oer:heading-6":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Ccircle%20cx%3D%2219%22%20cy%3D%2216%22%20r%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2010c-2%202-3%203.5-3%206%22%20%2F%3E%20%3C%2Fsvg%3E","oer:quote":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%203a2%202%200%200%200-2%202v6a2%202%200%200%200%202%202%201%201%200%200%201%201%201v1a2%202%200%200%201-2%202%201%201%200%200%200-1%201v2a1%201%200%200%200%201%201%206%206%200%200%200%206-6V5a2%202%200%200%200-2-2z%22%20%2F%3E%20%3Cpath%20d%3D%22M5%203a2%202%200%200%200-2%202v6a2%202%200%200%200%202%202%201%201%200%200%201%201%201v1a2%202%200%200%201-2%202%201%201%200%200%200-1%201v2a1%201%200%200%200%201%201%206%206%200%200%200%206-6V5a2%202%200%200%200-2-2z%22%20%2F%3E%20%3C%2Fsvg%3E","oer:square-code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m10%209-3%203%203%203%22%20%2F%3E%20%3Cpath%20d%3D%22m14%2015%203-3-3-3%22%20%2F%3E%20%3Crect%20x%3D%223%22%20y%3D%223%22%20width%3D%2218%22%20height%3D%2218%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","oer:list":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%205h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2012h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2019h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M8%205h13%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h13%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2019h13%22%20%2F%3E%20%3C%2Fsvg%3E","oer:list-ordered":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11%205h10%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2012h10%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2019h10%22%20%2F%3E%20%3Cpath%20d%3D%22M4%204h1v5%22%20%2F%3E%20%3Cpath%20d%3D%22M4%209h2%22%20%2F%3E%20%3Cpath%20d%3D%22M6.5%2020H3.4c0-1%202.6-1.925%202.6-3.5a1.5%201.5%200%200%200-2.6-1.02%22%20%2F%3E%20%3C%2Fsvg%3E","oer:indent-increase":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m3%208%204%204-4%204%22%20%2F%3E%20%3C%2Fsvg%3E","oer:indent-decrease":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m7%208-4%204%204%204%22%20%2F%3E%20%3C%2Fsvg%3E","oer:align-left":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2012H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2019H3%22%20%2F%3E%20%3C%2Fsvg%3E","oer:align-center":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2012H7%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2019H5%22%20%2F%3E%20%3C%2Fsvg%3E","oer:align-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H9%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H7%22%20%2F%3E%20%3C%2Fsvg%3E","oer:bold":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2012h9a4%204%200%200%201%200%208H7a1%201%200%200%201-1-1V5a1%201%200%200%201%201-1h7a4%204%200%200%201%200%208%22%20%2F%3E%20%3C%2Fsvg%3E","oer:italic":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cline%20x1%3D%2219%22%20x2%3D%2210%22%20y1%3D%224%22%20y2%3D%224%22%20%2F%3E%20%3Cline%20x1%3D%2214%22%20x2%3D%225%22%20y1%3D%2220%22%20y2%3D%2220%22%20%2F%3E%20%3Cline%20x1%3D%2215%22%20x2%3D%229%22%20y1%3D%224%22%20y2%3D%2220%22%20%2F%3E%20%3C%2Fsvg%3E","oer:underline":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%204v6a6%206%200%200%200%2012%200V4%22%20%2F%3E%20%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2220%22%20y2%3D%2220%22%20%2F%3E%20%3C%2Fsvg%3E","oer:strikethrough":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%204H9a3%203%200%200%200-2.83%204%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2012a4%204%200%200%201%200%208H6%22%20%2F%3E%20%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2212%22%20y2%3D%2212%22%20%2F%3E%20%3C%2Fsvg%3E","oer:highlighter":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m9%2011-6%206v3h9l3-3%22%20%2F%3E%20%3Cpath%20d%3D%22m22%2012-4.6%204.6a2%202%200%200%201-2.8%200l-5.2-5.2a2%202%200%200%201%200-2.8L14%204%22%20%2F%3E%20%3C%2Fsvg%3E","oer:subscript":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m4%205%208%208%22%20%2F%3E%20%3Cpath%20d%3D%22m12%205-8%208%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2019h-4c0-1.5.44-2%201.5-2.5S20%2015.33%2020%2014c0-.47-.17-.93-.48-1.29a2.11%202.11%200%200%200-2.62-.44c-.42.24-.74.62-.9%201.07%22%20%2F%3E%20%3C%2Fsvg%3E","oer:superscript":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m4%2019%208-8%22%20%2F%3E%20%3Cpath%20d%3D%22m12%2019-8-8%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2012h-4c0-1.5.442-2%201.5-2.5S20%208.334%2020%207.002c0-.472-.17-.93-.484-1.29a2.105%202.105%200%200%200-2.617-.436c-.42.239-.738.614-.899%201.06%22%20%2F%3E%20%3C%2Fsvg%3E","oer:whole-word":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%227%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209v6%22%20%2F%3E%20%3Ccircle%20cx%3D%2217%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3Cpath%20d%3D%22M14%207v8%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2017v1c0%20.5-.5%201-1%201H3c-.5%200-1-.5-1-1v-1%22%20%2F%3E%20%3C%2Fsvg%3E","oer:link":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2013a5%205%200%200%200%207.54.54l3-3a5%205%200%200%200-7.07-7.07l-1.72%201.71%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2011a5%205%200%200%200-7.54-.54l-3%203a5%205%200%200%200%207.07%207.07l1.71-1.71%22%20%2F%3E%20%3C%2Fsvg%3E","oer:unlink":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18.84%2012.25%201.72-1.71h-.02a5.004%205.004%200%200%200-.12-7.07%205.006%205.006%200%200%200-6.95%200l-1.72%201.71%22%20%2F%3E%20%3Cpath%20d%3D%22m5.17%2011.75-1.71%201.71a5.004%205.004%200%200%200%20.12%207.07%205.006%205.006%200%200%200%206.95%200l1.71-1.71%22%20%2F%3E%20%3Cline%20x1%3D%228%22%20x2%3D%228%22%20y1%3D%222%22%20y2%3D%225%22%20%2F%3E%20%3Cline%20x1%3D%222%22%20x2%3D%225%22%20y1%3D%228%22%20y2%3D%228%22%20%2F%3E%20%3Cline%20x1%3D%2216%22%20x2%3D%2216%22%20y1%3D%2219%22%20y2%3D%2222%22%20%2F%3E%20%3Cline%20x1%3D%2219%22%20x2%3D%2222%22%20y1%3D%2216%22%20y2%3D%2216%22%20%2F%3E%20%3C%2Fsvg%3E","oer:remove-formatting":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%207V4h16v3%22%20%2F%3E%20%3Cpath%20d%3D%22M5%2020h6%22%20%2F%3E%20%3Cpath%20d%3D%22M13%204%208%2020%22%20%2F%3E%20%3Cpath%20d%3D%22m15%2015%205%205%22%20%2F%3E%20%3Cpath%20d%3D%22m20%2015-5%205%22%20%2F%3E%20%3C%2Fsvg%3E","oer:omega":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%2020h4.5a.5.5%200%200%200%20.5-.5v-.282a.52.52%200%200%200-.247-.437%208%208%200%201%201%208.494-.001.52.52%200%200%200-.247.438v.282a.5.5%200%200%200%20.5.5H21%22%20%2F%3E%20%3C%2Fsvg%3E","oer:smile":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2010V9%22%20%2F%3E%20%3Cpath%20d%3D%22M16.472%2015a6%206%200%2001-8.943%200%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2010V9%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3C%2Fsvg%3E","oer:sigma":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%207V5a1%201%200%200%200-1-1H6.5a.5.5%200%200%200-.4.8l4.5%206a2%202%200%200%201%200%202.4l-4.5%206a.5.5%200%200%200%20.4.8H17a1%201%200%200%200%201-1v-2%22%20%2F%3E%20%3C%2Fsvg%3E","oer:book-a":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2019.5v-15A2.5%202.5%200%200%201%206.5%202H19a1%201%200%200%201%201%201v18a1%201%200%200%201-1%201H6.5a1%201%200%200%201%200-5H20%22%20%2F%3E%20%3Cpath%20d%3D%22m8%2013%204-7%204%207%22%20%2F%3E%20%3Cpath%20d%3D%22M9.1%2011h5.7%22%20%2F%3E%20%3C%2Fsvg%3E","oer:audio-lines":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2%2010v3%22%20%2F%3E%20%3Cpath%20d%3D%22M6%206v11%22%20%2F%3E%20%3Cpath%20d%3D%22M10%203v18%22%20%2F%3E%20%3Cpath%20d%3D%22M14%208v7%22%20%2F%3E%20%3Cpath%20d%3D%22M18%205v13%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2010v3%22%20%2F%3E%20%3C%2Fsvg%3E","oer:message-square-quote":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M14%2014a2%202%200%200%200%202-2V8h-2%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2017a2%202%200%200%201-2%202H6.828a2%202%200%200%200-1.414.586l-2.202%202.202A.71.71%200%200%201%202%2021.286V5a2%202%200%200%201%202-2h16a2%202%200%200%201%202%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2014a2%202%200%200%200%202-2V8H8%22%20%2F%3E%20%3C%2Fsvg%3E","oer:chevron-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%20%2F%3E%20%3C%2Fsvg%3E","oer:check":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M20%206%209%2017l-5-5%22%20%2F%3E%20%3C%2Fsvg%3E","oer:smile-plus":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M13.267%202.08a10%2010%200%20108.653%208.653%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2010V9%22%20%2F%3E%20%3Cpath%20d%3D%22M16%205h6%22%20%2F%3E%20%3Cpath%20d%3D%22M16.472%2015a6%206%200%2001-8.943%200%22%20%2F%3E%20%3Cpath%20d%3D%22M19%202v6%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2010V9%22%20%2F%3E%20%3C%2Fsvg%3E","oer:grip-vertical":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%225%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%2219%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2215%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2215%22%20cy%3D%225%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2215%22%20cy%3D%2219%22%20r%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","oer:chevron-up":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18%2015-6-6-6%206%22%20%2F%3E%20%3C%2Fsvg%3E","oer:chevron-down":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m6%209%206%206%206-6%22%20%2F%3E%20%3C%2Fsvg%3E"};function j2(){const o=A2;if(!o||o.__lucideInstalled)return;const t=o.getIcon.bind(o);o.getIcon=(e,i)=>{if(typeof e=="string"&&e){const a=e.includes(":")?e:`icons:${e}`;if(k[a])return k[a]}return t(e,i)},o.__lucideInstalled=!0,t2(globalThis.document)}function t2(o){for(const t of o.querySelectorAll("*")){if(typeof t.icon=="string"&&t.icon&&"src"in t){const e=t.icon;t.icon="",t.icon=e}t.shadowRoot&&t2(t.shadowRoot)}}function $2(){let o=Q,t=null;for(;o&&o!==HTMLElement;){if(Object.prototype.hasOwnProperty.call(o,"finalizeStyles"))return{ReactiveElement:o,LitElement:t};t=o,o=Object.getPrototypeOf(o)}throw new Error("Could not locate Lit base classes from HAXCMSLitElementTheme")}const{ReactiveElement:z2,LitElement:M}=$2(),S2=4e3;let H2=0,S=class extends M{static get tag(){return"oer-toast"}static get properties(){return{_items:{state:!0}}}constructor(){super(),this._items=[],this.__timers=new Map}show({text:t="",duration:e=S2,closeText:i="Close",slot:a=null,onClose:r=null}){const n=++H2;this._items=[...this._items,{id:n,text:t,closeText:i,slot:a,onClose:r}].slice(-4),e&&e>0&&this.__timers.set(n,setTimeout(()=>this.dismiss(n),Math.max(e,2e3)))}dismiss(t){const e=this._items.find(i=>i.id===t);clearTimeout(this.__timers.get(t)),this.__timers.delete(t),this._items=this._items.filter(i=>i.id!==t),e?.onClose?.()}clear(){for(const{id:t}of this._items)this.dismiss(t)}static get styles(){return h`
      :host {
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        z-index: 100001;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: min(22rem, calc(100vw - 2rem));
        font-family: var(--font-sans, system-ui, sans-serif);
        pointer-events: none;
      }
      .toast {
        pointer-events: auto;
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 0.875rem 1rem;
        background: var(--popover, #fff);
        color: var(--popover-foreground, #111);
        border: 1px solid var(--border, #e5e7eb);
        border-radius: var(--radius-lg, 0.625rem);
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.08);
        font-size: 0.875rem;
        line-height: 1.4;
      }
      .text {
        flex: 1;
        min-width: 0;
        padding-top: 0.125rem;
      }
      .slot:empty {
        display: none;
      }
      .slot {
        margin-top: 0.5rem;
      }
      button.close {
        flex: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
        padding: 0;
        border: 0;
        border-radius: var(--radius-sm, 0.25rem);
        background: transparent;
        color: var(--muted-foreground, #555);
        cursor: pointer;
      }
      button.close:hover {
        background: var(--accent, #eee);
        color: var(--accent-foreground, #111);
      }
      button.close:focus-visible {
        outline: 2px solid var(--ring, #2563eb);
        outline-offset: 2px;
      }
      svg {
        width: 1rem;
        height: 1rem;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    `}render(){return l`
      <div role="status" aria-live="polite" aria-atomic="false">
        ${this._items.map(t=>l`
            <div class="toast">
              <div class="text">
                ${t.text}
                <div class="slot">${t.slot??""}</div>
              </div>
              <button class="close" aria-label="${t.closeText||"Close"}" @click="${()=>this.dismiss(t.id)}">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>
          `)}
      </div>
    `}};customElements.define(S.tag,S);function e2(){let o=globalThis.document.querySelector(S.tag);return o||(o=globalThis.document.createElement(S.tag),globalThis.document.body.appendChild(o)),o}function T2(){try{globalThis.localStorage.setItem("app-hax-soundStatus","false")}catch{}b.soundStatus=!1,b.playSound=()=>{},globalThis.addEventListener("haxcms-toast-show",o=>{o.stopImmediatePropagation();const t=o.detail||{};e2().show({text:t.text,duration:t.duration,closeText:t.closeText,slot:t.slot,onClose:typeof t.eventCallback=="function"?t.eventCallback:null})},{capture:!0}),globalThis.addEventListener("haxcms-toast-hide",o=>{o.stopImmediatePropagation(),e2().clear()},{capture:!0})}const _=new Map;function q2(o){if(o.styleSheet)return o.styleSheet;const t=new CSSStyleSheet;return t.replaceSync(String(o.cssText??o)),t}function o2(o,t){const e=o.adoptedStyleSheets,i=t.filter(a=>!e.includes(a));i.length&&(o.adoptedStyleSheets=[...e,...i])}function r2(o){for(const[t,e]of Object.entries(o)){const i=q2(e);for(const a of t.split(",").map(r=>r.trim()).filter(Boolean))_.has(a)||_.set(a,[]),_.get(a).push(i)}i2(globalThis.document)}function L2(){const o=z2.prototype;if(o.__oerShadowStyles)return;const t=o.createRenderRoot;o.createRenderRoot=function(){const e=t.call(this),i=_.get(this.localName);return i&&e&&e.adoptedStyleSheets&&o2(e,i),e},o.__oerShadowStyles=!0}function i2(o){for(const t of o.querySelectorAll("*"))if(t.shadowRoot){const e=_.get(t.localName);e&&o2(t.shadowRoot,e),i2(t.shadowRoot)}}const V2=h`
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
`,a2=["haxcms-appearance-admin-dialog","haxcms-content-admin-dialog","haxcms-files-admin-dialog","haxcms-outline-editor-dialog","haxcms-page-revisions-dialog","haxcms-seo-admin-dialog","haxcms-site-dashboard","haxcms-site-details-dialog","haxcms-site-import-export-dashboard","haxcms-site-settings-dashboard","haxcms-views-admin-dialog","hax-confirm-dialog","haxcms-about-dialog-ui","haxcms-allowed-blocks-ui","haxcms-editor-settings-dialog-ui","haxcms-site-platform-ui","haxcms-theme-preview-panel","haxcms-page-get-started"].join(","),R2=["haxcms-site-editor-ui","app-hax-top-bar","app-hax-user-menu","app-hax-user-menu-button","simple-toolbar-button","simple-toolbar-menu","simple-toolbar-menu-item","simple-modal","simple-modal-template","simple-popover","simple-tooltip","hax-tray","hax-tray-button","hax-gizmo-browser","hax-stax-browser","hax-map","hax-view-source","hax-gizmo-browser","hax-picker","hax-app-picker","hax-cancel-dialog","hax-plate-context","hax-toolbar","hax-toolbar-item","hax-toolbar-menu","hax-context-item","hax-context-item-menu","hax-text-editor-toolbar","hax-text-editor-button","rich-text-editor-toolbar","rich-text-editor-button","super-daemon","super-daemon-ui","super-daemon-row","super-daemon-search","simple-fields","simple-fields-field","simple-fields-tabs","simple-fields-fieldset","haxcms-outline-editor-dialog","outline-designer","haxcms-site-dashboard","haxcms-page-revisions-dialog","hax-body","simple-toast-el","rpg-character-toast","haxcms-toast","a11y-collapse","simple-fields-container","simple-fields-url-combo","simple-fields-tag-list","page-break","simple-context-menu","simple-tooltip","d-d-d-sample","hax-plate-context","simple-picker","hax-map","hax-view-source","hax-gizmo-browser","hax-stax-browser","simple-popover","simple-popover-manager","hax-element-demo","hax-tray-upload","hax-upload-field","simple-file-upload","simple-button-grid","simple-popover-selection","outline-designer"].join(",")+","+a2,n2=`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 2.25rem;
  padding: 0 1rem;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  border: 0;
  border-radius: var(--radius-md);
  box-shadow: none;
  cursor: pointer;
`,A=h`
  outline: 2px solid var(--ring);
  outline-offset: 2px;
`,I2={[R2]:V2,"simple-fields-container, simple-fields-field, simple-fields-url-combo, simple-fields-tag-list":h`
    :host {
      --simple-fields-font-family: var(--font-sans);
      --simple-fields-font-size: 0.875rem;
      --simple-fields-detail-font-family: var(--font-sans);
      --simple-fields-detail-font-size: 0.8125rem;
      --simple-fields-color: var(--foreground);
      --simple-fields-accent-color: var(--ring);
      --simple-fields-border-color: var(--input-border);
      --simple-fields-border-color-light: var(--border);
      --simple-fields-error-color: var(--destructive);
      --simple-fields-background-color: var(--background);
      margin: 0 0 1rem !important;
      font-family: var(--font-sans);
      /* only the input box is filled; the field row sits on the panel */
      background: transparent !important;
    }
    /* material underline -> none; the field itself gets the box */
    .border-bottom {
      display: none !important;
    }
    [part="label"],
    .label-main {
      background: transparent !important;
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
      font-weight: 500 !important;
      color: var(--foreground) !important;
      margin-bottom: 0.375rem !important;
      text-transform: none !important;
      letter-spacing: normal !important;
    }
    [part="field-desc"],
    #description {
      font-size: 0.8125rem !important;
      color: var(--muted-foreground) !important;
      margin-top: 0.375rem !important;
    }
    [part="error-msg"] {
      font-size: 0.8125rem !important;
      color: var(--destructive) !important;
    }
  `,"simple-fields-field, simple-fields-url-combo, simple-fields-tag-list":h`
    :host {
      --simple-fields-font-family: var(--font-sans);
      --simple-fields-font-size: 0.875rem;
      --simple-fields-color: var(--foreground);
      --simple-fields-accent-color: var(--ring);
      --simple-fields-border-color: var(--input-border);
      --simple-fields-border-color-light: var(--border);
      --simple-fields-background-color: var(--background);
      --simple-fields-placeholder-color: var(--muted-foreground);
      --simple-fields-placeholder-opacity: 1;
      --simple-fields-placeholder-font-style: normal;
      --simple-fields-select-background-color: var(--background);
      --simple-fields-select-option-background-color: var(--popover);
      --simple-fields-select-option-selected-background-color: var(--accent);
    }
    input.field:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="color"]),
    textarea.field,
    select.field,
    [part="select"],
    [part="textarea"] {
      box-sizing: border-box !important;
      width: 100% !important;
      min-height: 2.25rem !important;
      padding: 0.375rem 0.75rem !important;
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
      line-height: 1.5 !important;
      color: var(--foreground) !important;
      background: var(--background) !important;
      border: 1px solid var(--input-border) !important;
      border-radius: var(--radius-md) !important;
      box-shadow: 0 1px 2px rgb(0 0 0 / 0.04) !important;
    }
    textarea.field,
    [part="textarea"] {
      min-height: 5rem !important;
    }
    input.field:focus-visible,
    textarea.field:focus-visible,
    select.field:focus-visible {
      outline: 2px solid var(--ring) !important;
      outline-offset: 1px !important;
    }
    input::placeholder,
    textarea::placeholder {
      color: var(--muted-foreground) !important;
      font-style: normal !important;
    }
    /* Merlin's filter field sits bare in the Command header */
    :host([part="filter"][role="combobox"]) {
      background: transparent !important;
      padding: 0 !important;
    }
    :host([part="filter"][role="combobox"])
      input.field.box-input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not(
        [type="color"]
      ) {
      border: 0 !important;
      box-shadow: none !important;
      background: transparent !important;
      padding-left: 0 !important;
      height: 2.75rem !important;
    }
    :host([part="filter"][role="combobox"]) input.field:focus-visible {
      outline: none !important;
    }
    simple-icon-lite,
    [part="option-icon"] {
      --simple-icon-height: 1rem !important;
      --simple-icon-width: 1rem !important;
      color: var(--muted-foreground);
    }
    input[type="checkbox"],
    input[type="radio"] {
      accent-color: var(--primary);
      width: 1rem;
      height: 1rem;
    }
    [part="fieldset-legend"] {
      font-size: 0.875rem !important;
      font-weight: 500 !important;
      color: var(--foreground) !important;
    }
    [part="option-label"] {
      font-size: 0.875rem !important;
    }
    /* radio groups (incl. colour pickers): shadcn RadioGroup rows in a
       responsive grid, control on the left, selected row ringed */
    :host([type="radio"]) [part="fieldset-options"] {
      display: grid !important;
      grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr)) !important;
      gap: 0.25rem !important;
      margin-top: 0.25rem !important;
    }
    :host([type="radio"]) [part="option"] {
      display: flex !important;
      flex-direction: row-reverse !important;
      justify-content: flex-end !important;
      align-items: center !important;
      gap: 0.5rem !important;
      min-height: 2rem !important;
      margin: 0 !important;
      padding: 0.25rem 0.5rem !important;
      border-radius: var(--radius-md) !important;
      cursor: pointer;
    }
    :host([type="radio"]) [part="option"]:hover {
      background: var(--accent) !important;
    }
    :host([type="radio"]) [part="option"]:has(input:checked) {
      background: var(--accent) !important;
      box-shadow: inset 0 0 0 1px var(--primary) !important;
    }
    :host([type="radio"]) [part="option-label"] {
      flex: 1;
      min-width: 0;
      margin: 0 !important;
      font-size: 0.8125rem !important;
      line-height: 1.25 !important;
      cursor: pointer;
    }
    :host([type="radio"]) [part="option-inner"] {
      flex: none;
      display: inline-flex !important;
      margin: 0 !important;
    }

    /* colour pickers (options rendered as d-d-d-sample swatches): a grid
       of swatches instead of a checklist. The radio stays, invisible but
       stretched over the swatch, so clicks, keyboard and screen readers
       work unchanged; names show as tooltips (set in ux-tweaks.js). */
    :host([type="radio"]) [part="fieldset-options"]:has(d-d-d-sample[type="accent"], d-d-d-sample[type="primary"]) {
      grid-template-columns: repeat(auto-fill, 1.75rem) !important;
      gap: 0.5rem !important;
      padding: 0.25rem 0.125rem !important;
    }
    :host([type="radio"]) [part="option"]:has(d-d-d-sample[type="accent"], d-d-d-sample[type="primary"]) {
      position: relative !important;
      width: 1.75rem !important;
      height: 1.75rem !important;
      min-height: 0 !important;
      padding: 0 !important;
      border-radius: var(--radius-md) !important;
      background: transparent !important;
      box-shadow: none !important;
    }
    :host([type="radio"]) [part="option"]:has(d-d-d-sample[type="accent"], d-d-d-sample[type="primary"]) [part="option-label"] {
      position: absolute !important;
      inset: 0 !important;
      margin: 0 !important;
    }
    :host([type="radio"]) [part="option"]:has(d-d-d-sample[type="accent"], d-d-d-sample[type="primary"]) [part="option-inner"] {
      position: absolute !important;
      inset: 0 !important;
      z-index: 1;
    }
    /* HAX draws its radio circle as an icon; the swatch ring replaces it */
    :host([type="radio"]) [part="option"]:has(d-d-d-sample[type="accent"], d-d-d-sample[type="primary"]) simple-icon-lite,
    :host([type="radio"]) [part="option"]:has(d-d-d-sample[type="accent"], d-d-d-sample[type="primary"]) [part="option-icon"] {
      display: none !important;
    }
    :host([type="radio"]) [part="option"]:has(d-d-d-sample[type="accent"], d-d-d-sample[type="primary"]) input {
      width: 100% !important;
      height: 100% !important;
      margin: 0 !important;
      opacity: 0 !important;
      cursor: pointer !important;
    }
    :host([type="radio"]) [part="option"]:has(d-d-d-sample[type="accent"], d-d-d-sample[type="primary"]):has(input:checked) {
      box-shadow: 0 0 0 2px var(--card), 0 0 0 4px var(--primary) !important;
    }
    :host([type="radio"]) [part="option"]:has(d-d-d-sample[type="accent"], d-d-d-sample[type="primary"]):has(input:focus-visible) {
      box-shadow: 0 0 0 2px var(--card), 0 0 0 4px var(--ring) !important;
    }
    :host([type="radio"]) [part="option"]:has(d-d-d-sample[type="accent"], d-d-d-sample[type="primary"]):hover {
      transform: none;
      box-shadow: 0 0 0 2px var(--card), 0 0 0 3px var(--muted-foreground) !important;
    }
  `,"simple-toolbar-button, hax-toolbar-item, rich-text-editor-button, hax-text-editor-button":h`
    :host {
      --simple-toolbar-button-height: 2rem;
      --simple-toolbar-button-min-width: 2rem;
      --simple-toolbar-button-padding: 0 0.5rem;
      --simple-toolbar-button-border-radius: var(--radius-md);
      --simple-toolbar-button-border-width: 0;
      --simple-toolbar-button-bg: transparent;
      --simple-toolbar-button-color: var(--foreground);
      --simple-toolbar-button-hover-bg: var(--accent);
      --simple-toolbar-button-hover-color: var(--accent-foreground);
      --simple-toolbar-button-hover-border-color: transparent;
      --simple-toolbar-button-toggled-bg: var(--accent);
      --simple-toolbar-button-toggled-color: var(--accent-foreground);
      --simple-toolbar-button-toggled-border-color: transparent;
      --simple-toolbar-button-disabled-opacity: 0.5;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      font-family: var(--font-sans);
      font-size: 0.875rem;
    }
    button {
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
      font-weight: 500 !important;
      border-radius: var(--radius-md) !important;
      box-shadow: none !important;
      text-transform: none !important;
    }
    button:focus-visible {
      ${A}
    }
  `,"simple-tag":h`
    :host {
      --simple-tag-font-size: 0.75rem;
    }
    :host,
    .tag,
    span {
      font-family: var(--font-sans) !important;
      font-size: 0.75rem !important;
      font-weight: 500 !important;
      line-height: 1.25rem !important;
      background: var(--secondary-muted, var(--muted)) !important;
      color: var(--foreground) !important;
      border: 1px solid var(--border) !important;
      border-radius: 999px !important;
      padding: 0 0.5rem !important;
      margin: 0 !important;
    }
  `,"hax-tray":h`
    :host {
      position: fixed !important;
      top: 0 !important;
      bottom: 0 !important;
      left: 0 !important;
      right: auto !important;
      width: var(--editor-panel-width) !important;
      z-index: 35 !important;
      font-family: var(--font-sans) !important;
      color: var(--foreground);
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
    }
    :host([collapsed]) {
      display: none !important;
    }
    /* stock reserves 64px above the panel for its own top bar */
    .wrapper {
      margin: 0 !important;
      padding: 0 !important;
    }
    .wrapper,
    .detail {
      position: static !important;
      width: 100% !important;
      height: 100% !important;
      max-width: none !important;
      max-height: none !important;
      transform: none !important;
      /* stock makes the panel drag-resizable, drawing a corner grip */
      resize: none !important;
    }
    /* inset variant: the panel sits on the page background like the
       sidebar it replaces, beside the rounded content card */
    .detail {
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
      background: var(--card) !important;
      color: var(--foreground) !important;
      border-right: 0 !important;
      box-shadow: none !important;
    }
    #tray-detail {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      padding-top: 0.75rem;
      scrollbar-width: thin;
      scrollbar-color: var(--border) transparent;
    }
    .resize,
    #haxMenuAlign,
    .tray-detail-titlebar-actions {
      display: none !important;
    }

    /* panel header: aligned with the editor header (same height and
       bottom rule), holding a shadcn TabsList */
    .oer-panel-header {
      flex: none;
      display: flex;
      align-items: center;
      /* level with the content card's header (card has a 0.5rem inset) */
      height: calc(var(--topbar-height) + 0.5rem);
      padding: 0.5rem 0.75rem 0;
      box-sizing: border-box;
    }
    .oer-tabs {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.125rem;
      padding: 0.1875rem;
      border-radius: var(--radius-md);
      background: var(--muted);
    }
    /* text-only tabs, as in the learning-materials editor */
    .oer-tab .oer-icon {
      display: none;
    }
    .oer-tab {
      all: unset;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.375rem;
      height: 1.875rem;
      border-radius: calc(var(--radius-md) - 2px);
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--muted-foreground);
      cursor: pointer;
    }
    .oer-tab:hover {
      color: var(--foreground);
    }
    .oer-tab[aria-selected="true"] {
      background: var(--background);
      color: var(--foreground);
      box-shadow: 0 1px 2px rgb(0 0 0 / 0.12), 0 0 0 1px var(--border);
    }
    .oer-tab:focus-visible {
      outline: 2px solid var(--ring);
      outline-offset: 1px;
    }
    .oer-icon {
      display: inline-block;
      flex: none;
      width: 0.875rem;
      height: 0.875rem;
      background: currentColor;
      -webkit-mask: var(--src) center / contain no-repeat;
      mask: var(--src) center / contain no-repeat;
    }

    /* panel footer: Site actions (only visible while editing, since the
       panel only exists then) */
    .oer-panel-footer {
      flex: none;
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
      padding: 0.75rem;
      border-top: 1px solid var(--border);
    }
    .oer-footer-label {
      padding: 0.25rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--muted-foreground);
    }
    .oer-footer-item {
      all: unset;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.375rem 0.75rem;
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      color: var(--foreground);
      cursor: pointer;
    }
    .oer-footer-item .oer-icon {
      width: 1rem;
      height: 1rem;
      color: var(--muted-foreground);
    }
    .oer-footer-item:hover {
      background: var(--accent);
      color: var(--accent-foreground);
    }
    .oer-footer-item:focus-visible {
      outline: 2px solid var(--ring);
      outline-offset: -2px;
    }

    .oer-account {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
      padding: 0.5rem 0.25rem 0 0.5rem;
      border-top: 1px solid var(--border);
    }
    .oer-avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: none;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 999px;
      background: var(--muted);
      color: var(--foreground);
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    .oer-avatar .oer-icon {
      width: 0.875rem;
      height: 0.875rem;
    }
    .oer-account-name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.75rem;
      font-weight: 500;
    }
    .oer-account-btn {
      all: unset;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.75rem;
      height: 1.75rem;
      border-radius: var(--radius-md);
      color: var(--muted-foreground);
      cursor: pointer;
    }
    .oer-account-btn:hover {
      background: var(--accent);
      color: var(--foreground);
    }
    .oer-account-btn.danger:hover {
      color: var(--destructive);
      background: color-mix(in oklch, var(--destructive) 10%, transparent);
    }
    .oer-account-btn:focus-visible {
      outline: 2px solid var(--ring);
      outline-offset: 1px;
    }

    /* panel sub-header: only the Block tab needs it (names the block) */
    :host(:not([tray-detail="content-edit"])) .tray-detail-titlebar {
      display: none !important;
    }
    .tray-detail-titlebar {
      position: sticky !important;
      /* #tray-detail has 0.75rem top padding; stick flush under the header */
      top: -0.75rem !important;
      margin-top: -0.75rem !important;
      z-index: 2 !important;
      display: flex !important;
      align-items: center !important;
      gap: 0.5rem !important;
      height: auto !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      margin-bottom: 0.5rem !important;
      padding: 0.625rem 1rem !important;
      background: var(--card) !important;
      color: var(--foreground) !important;
      border-bottom: 1px solid var(--border) !important;
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
      font-weight: 600 !important;
      letter-spacing: normal !important;
      text-transform: none !important;
      --simple-icon-color: var(--muted-foreground);
    }
    .tray-detail-titlebar-icon {
      --simple-icon-height: 1rem !important;
      --simple-icon-width: 1rem !important;
      width: 1rem !important;
      height: 1rem !important;
    }
    .tray-detail-titlebar-label {
      flex: 1;
      text-align: start !important;
    }

    /* Insert panel: finding a block comes first, uploading media last */
    .block-add-wrapper {
      display: flex !important;
      flex-direction: column !important;
      gap: 0.75rem !important;
      padding: 0.25rem 1rem 1rem !important;
    }
    #gizmobrowser {
      order: 1;
    }
    #staxbrowser {
      order: 2;
    }
    #pagesbrowser {
      order: 3;
    }
    hax-tray-upload {
      order: 4;
    }
    #settingsform,
    simple-fields {
      padding: 0.25rem 1rem 1rem !important;
      background: transparent !important;
      font-size: 0.875rem !important;
    }
  `,"a11y-collapse":h`
    :host {
      font-family: var(--font-sans);
      border: 0 !important;
      border-bottom: 1px solid var(--border) !important;
      margin: 0 !important;
    }
    #heading,
    button {
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
      font-weight: 500 !important;
      color: var(--foreground) !important;
      background: transparent !important;
    }
    button:hover #heading {
      text-decoration: underline;
      text-underline-offset: 4px;
    }
    /* nested style groups inside Configure read lighter than sections */
    :host([id*="ddd-styles"]) #heading,
    :host([id*="ddd-styles"]) button {
      font-weight: 400 !important;
      color: var(--muted-foreground) !important;
    }
    button:focus-visible {
      ${A}
    }
    #content {
      font-size: 0.875rem;
    }
  `,"hax-gizmo-browser, hax-stax-browser":h`
    /* block list, not a grid of big squares */
    simple-button-grid {
      --simple-button-grid-cols: 100%;
      --simple-button-grid-margin: 0;
    }
    .toolbar-inner {
      padding: 0 0 0.5rem !important;
      margin: 0 !important;
      background: transparent !important;
    }
    #inputfilter {
      margin: 0 !important;
    }
  `,"hax-tray-button":h`
    :host {
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      font-family: var(--font-sans);
    }
    button {
      font-family: var(--font-sans) !important;
      background: var(--background) !important;
      color: var(--foreground) !important;
      border: 1px solid var(--border) !important;
      border-radius: var(--radius-md) !important;
      box-shadow: none !important;
      gap: 0.375rem !important;
      padding: 0.5rem 0.25rem !important;
    }
    button:hover,
    :host([toggled]) button,
    :host([active]) button {
      background: var(--accent) !important;
      color: var(--accent-foreground) !important;
      border-color: var(--accent) !important;
    }
    button:focus-visible {
      ${A}
    }
    #icon {
      width: 1rem !important;
      height: 1rem !important;
      color: var(--muted-foreground) !important;
    }
    #label {
      font-size: 0.75rem !important;
      font-weight: 500 !important;
      line-height: 1rem !important;
    }
    /* Insert panel entries: list rows (icon + label), like a command menu */
    :host([part="grid-button"]) {
      display: block;
      width: 100%;
    }
    :host([part="grid-button"]) button {
      flex-direction: row !important;
      justify-content: flex-start !important;
      align-items: center !important;
      width: 100% !important;
      height: 2.25rem !important;
      min-height: 0 !important;
      gap: 0.625rem !important;
      padding: 0 0.625rem !important;
      background: transparent !important;
      border: 0 !important;
      border-radius: var(--radius-md) !important;
      text-align: start !important;
    }
    :host([part="grid-button"]) button:hover,
    :host([part="grid-button"]) button:focus-visible {
      background: var(--accent) !important;
      color: var(--accent-foreground) !important;
    }
    :host([part="grid-button"]) #label {
      font-size: 0.875rem !important;
      font-weight: 400 !important;
      line-height: 1.25rem !important;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    /* labelled action buttons (Source panel) read as shadcn Buttons */
    :host([data-oer-labelled]) button {
      width: 100% !important;
      justify-content: center !important;
      flex-direction: row !important;
      height: 2rem !important;
      padding: 0 0.75rem !important;
      gap: 0.375rem !important;
      background: var(--simple-toolbar-button-bg, var(--background)) !important;
      color: var(--simple-toolbar-button-color, var(--foreground)) !important;
      border-color: var(--input-border) !important;
    }
    :host([data-oer-labelled]) #label {
      font-size: 0.8125rem !important;
    }
  `,"hax-upload-field":h`
    :host {
      background: transparent !important;
    }
    #upload-options,
    simple-file-upload {
      padding: 0 !important;
      margin: 0 !important;
    }
    fieldset {
      border: 0 !important;
      padding: 0 !important;
      margin: 0 0 1rem !important;
      min-width: 0;
    }
    legend {
      padding: 0 !important;
      margin: 0 0 0.375rem !important;
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
      font-weight: 500 !important;
      color: var(--foreground) !important;
    }
    #upload {
      display: flex !important;
      flex-wrap: wrap !important;
      align-items: center !important;
      justify-content: flex-start !important;
      gap: 0.375rem !important;
      margin-top: 0.5rem !important;
      padding: 0 !important;
      text-align: start !important;
    }
    [part="drop-area-text"] {
      font-family: var(--font-sans) !important;
      font-size: 0.8125rem !important;
      font-weight: 400 !important;
      color: var(--muted-foreground) !important;
      margin: 0 0.25rem 0 0 !important;
    }
    [part="sources"] {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 0.25rem !important;
    }
    [part="sources"] simple-toolbar-button {
      width: 2rem !important;
      height: 2rem !important;
      min-width: 0 !important;
      margin: 0 !important;
      --simple-toolbar-button-height: 2rem;
      --simple-toolbar-button-min-width: 2rem;
      --simple-toolbar-button-border-width: 1px;
      --simple-toolbar-button-border-color: var(--input-border);
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
    }
    [part="description"],
    #description {
      margin-top: 0.375rem !important;
      font-family: var(--font-sans) !important;
      font-size: 0.8125rem !important;
      line-height: 1.4 !important;
      color: var(--muted-foreground) !important;
    }
  `,"hax-tray-upload":h`
    fieldset {
      border: 1px dashed var(--input-border) !important;
      border-radius: var(--radius-lg) !important;
      padding: 0.75rem !important;
      margin: 0 0 1rem !important;
      background: transparent !important;
    }
    legend {
      font-family: var(--font-sans) !important;
      font-size: 0.75rem !important;
      font-weight: 500 !important;
      color: var(--muted-foreground) !important;
      padding: 0 0.25rem !important;
    }
    [part="drop-area-text"] {
      display: block;
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
      font-weight: 400 !important;
      color: var(--muted-foreground) !important;
      margin-bottom: 0.5rem !important;
    }
    [part="sources"] {
      display: flex !important;
      flex-wrap: wrap !important;
      justify-content: center !important;
      gap: 0.375rem !important;
    }
    [part="sources"] simple-toolbar-button {
      width: 2.25rem !important;
      height: 2.25rem !important;
      min-width: 0 !important;
      margin: 0 !important;
      --simple-toolbar-button-height: 2.25rem;
      --simple-toolbar-button-min-width: 2.25rem;
      --simple-toolbar-button-border-width: 1px;
      --simple-toolbar-button-border-color: var(--input-border);
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
    }
  `,"simple-file-upload":h`
    :host {
      display: block;
      background: transparent !important;
      font-family: var(--font-sans) !important;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
    }
    [part="browse-area"] {
      padding: 0 !important;
      margin: 0 !important;
      background: transparent !important;
    }
    #upload {
      display: flex !important;
      flex-wrap: wrap !important;
      align-items: center !important;
      justify-content: flex-start !important;
      gap: 0.375rem !important;
      margin-top: 0.5rem !important;
      padding: 0 !important;
      text-align: start !important;
      background: transparent !important;
      border: 0 !important;
    }
    [part="drop-area-text"] {
      font-size: 0.8125rem !important;
      color: var(--muted-foreground) !important;
      font-weight: 400 !important;
      margin: 0 0.25rem 0 0 !important;
    }
    [part="sources"] {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 0.25rem !important;
    }
    [part="sources"] simple-toolbar-button {
      width: 2rem !important;
      height: 2rem !important;
      min-width: 0 !important;
      margin: 0 !important;
      --simple-toolbar-button-height: 2rem;
      --simple-toolbar-button-min-width: 2rem;
      --simple-toolbar-button-border-width: 1px;
      --simple-toolbar-button-border-color: var(--input-border);
    }
    [part="description"] {
      margin-top: 0.375rem !important;
      font-size: 0.8125rem !important;
      line-height: 1.4 !important;
      color: var(--muted-foreground) !important;
    }
    /* the URL sub-field repeats the field's own label */
    simple-fields-url-combo {
      margin: 0 !important;
    }
  `,"hax-plate-context":h`
    /* replaced by oer-block-rail, which presses these controls; kept
       mounted (not display:none) so their handlers and state stay live */
    :host {
      visibility: hidden !important;
      pointer-events: none !important;
    }
    /* the groups are slotted into hax-toolbar from here; stock gives each
       its own #ddd box inside the toolbar's border */
    .group {
      display: flex !important;
      align-items: center !important;
      gap: 0.125rem !important;
      padding: 0 0.125rem !important;
      background: transparent !important;
      border: 0 !important;
      border-radius: 0 !important;
      box-shadow: none !important;
    }
    .group + .group {
      border-left: 1px solid var(--border) !important;
      margin-left: 0.125rem !important;
      padding-left: 0.25rem !important;
    }
  `,"rich-text-editor-toolbar, hax-text-editor-toolbar":h`
    /* selecting text adds selection-only buttons; let them wrap onto a
       second row inside the toolbar box instead of spilling over the text */
    :host {
      height: auto !important;
      max-height: none !important;
    }
    #buttons {
      flex-wrap: wrap !important;
      height: auto !important;
      max-height: none !important;
      max-width: 100% !important;
      overflow: visible !important;
      row-gap: 0.125rem !important;
    }
    .group {
      display: flex !important;
      align-items: center !important;
      gap: 0.125rem !important;
    }
    #buttons > * + .group,
    #buttons > .group + * {
      border-left: 1px solid var(--border);
      padding-left: 0.25rem;
      margin-left: 0.125rem;
    }
  `,"hax-context-item, hax-toolbar-menu, hax-toolbar-item, rich-text-editor-button, hax-text-editor-button, rich-text-editor-link, rich-text-editor-unlink, rich-text-editor-underline, rich-text-editor-symbol-picker, rich-text-editor-emoji-picker, rich-text-editor-icon-picker":h`
    :host {
      --simple-icon-height: 1rem !important;
      --simple-icon-width: 1rem !important;
      --simple-icon-color: var(--foreground);
      color: var(--foreground);
    }
    button {
      box-sizing: border-box !important;
      height: 1.75rem !important;
      min-width: 1.75rem !important;
      padding: 0 0.375rem !important;
      gap: 0.125rem !important;
      border: 0 !important;
      border-radius: var(--radius-sm) !important;
      background: transparent !important;
      color: var(--foreground) !important;
      box-shadow: none !important;
    }
    button:hover,
    :host([toggled]) button,
    button[aria-pressed="true"] {
      background: var(--accent) !important;
      color: var(--accent-foreground) !important;
    }
    button:focus-visible {
      outline: 2px solid var(--ring) !important;
      outline-offset: 1px !important;
    }
    #icon {
      width: 1rem !important;
      height: 1rem !important;
    }
    /* dropdown menus keep a small muted caret after the icon */
    #dropdownicon {
      width: 0.75rem !important;
      height: 0.75rem !important;
      --simple-icon-width: 0.75rem !important;
      --simple-icon-height: 0.75rem !important;
      --simple-icon-color: var(--muted-foreground);
      color: var(--muted-foreground) !important;
    }
  `,"simple-picker":h`
    [part="sample"] {
      box-sizing: border-box !important;
      display: flex !important;
      align-items: center !important;
      gap: 0.125rem !important;
      height: 1.75rem !important;
      padding: 0 0.375rem !important;
      border: 0 !important;
      border-radius: var(--radius-sm) !important;
      background: transparent !important;
      font-family: var(--font-sans) !important;
      font-size: 0.8125rem !important;
      font-weight: 500 !important;
      color: var(--foreground) !important;
      --simple-icon-height: 0.875rem;
      --simple-icon-width: 0.875rem;
      --simple-icon-color: var(--muted-foreground);
    }
    [part="sample"]:hover {
      background: var(--accent) !important;
    }
    [part="label"]:empty {
      display: none !important;
    }
  `,"hax-toolbar":h`
    :host {
      display: inline-flex !important;
      align-items: center !important;
      gap: 0 !important;
      padding: 0.1875rem !important;
      background: var(--popover) !important;
      border: 1px solid var(--border) !important;
      border-radius: var(--radius-md) !important;
      box-shadow: 0 2px 8px rgb(0 0 0 / 0.1) !important;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      --simple-icon-color: var(--foreground);
    }
    .group {
      display: flex !important;
      align-items: center !important;
      gap: 0.125rem !important;
      padding: 0 0.125rem !important;
      background: transparent !important;
      border: 0 !important;
      border-radius: 0 !important;
      box-shadow: none !important;
    }
    /* Source panel toolbar (marked by ux-tweaks.js): Update HTML full
       width, then the three secondary actions in one row */
    :host([data-oer-source]) {
      display: block !important;
      padding: 0 !important;
      background: transparent !important;
      border: 0 !important;
      box-shadow: none !important;
    }
    :host([data-oer-source]) #buttons {
      display: grid !important;
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      gap: 0.375rem !important;
    }
    :host([data-oer-source]) ::slotted(.updatecontent) {
      grid-column: 1 / -1;
    }
    .group + .group,
    .group + #buttons {
      border-left: 1px solid var(--border) !important;
      margin-left: 0.125rem !important;
      padding-left: 0.25rem !important;
    }
  `,"hax-text-editor-toolbar, rich-text-editor-toolbar":h`
    /* hax-text-editor-toolbar is replaced by oer-block-rail (see above) */
    :host(hax-text-editor-toolbar) {
      visibility: hidden !important;
      pointer-events: none !important;
    }
    :host {
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      font-family: var(--font-sans) !important;
      /* #buttons draws the container; avoid a second border */
      border: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
    }
    #buttons {
      gap: 0.125rem !important;
      padding: 0.125rem !important;
      background: var(--popover) !important;
      border: 1px solid var(--border) !important;
      border-radius: var(--radius-md) !important;
      box-shadow: 0 1px 3px rgb(0 0 0 / 0.08) !important;
    }
  `,"hax-toolbar-menu, hax-context-item-menu, simple-toolbar-menu":h`
    :host {
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      font-family: var(--font-sans);
      font-size: 0.875rem;
    }
    /* dropdown list -> shadcn DropdownMenu content */
    [role="menu"],
    #menu,
    .menu,
    simple-popover,
    absolute-position-behavior {
      background: var(--popover) !important;
      color: var(--popover-foreground) !important;
      border: 1px solid var(--border) !important;
      border-radius: var(--radius-md) !important;
      box-shadow: 0 4px 12px rgb(0 0 0 / 0.08) !important;
      padding: 0.25rem !important;
    }
  `,"simple-toolbar-menu-item, hax-toolbar-menu-item":h`
    :host {
      font-family: var(--font-sans);
      font-size: 0.875rem;
    }
    ::slotted(*),
    button {
      border-radius: var(--radius-sm) !important;
      font-size: 0.875rem !important;
    }
  `,"page-break":h`
    /* view-mode pencil menu; its actions live in the theme's page menu */
    #pageactionsbtn,
    #menu {
      display: none !important;
    }
    /* edit mode: no full-width bar, just a compact "Page details" button;
       its save / cancel buttons duplicate the editor header's */
    :host([data-hax-ray]),
    :host([edit-mode]),
    :host {
      border: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
      outline: 0 !important;
    }
    /* stock edit-mode spacing is 16px padding + an 80px bottom margin */
    :host([data-hax-ray]) {
      display: block !important;
      min-height: 2.25rem !important;
      margin: 0 0 1rem !important;
      padding: 0 !important;
    }
    .save-button,
    .cancel-button {
      display: none !important;
    }
    /* "Select to edit Page details" is a button: make it look like one.
       Only while HAX shows it (data-hax-ray); otherwise it stays hidden */
    :host([data-hax-ray]) .text {
      display: inline-flex !important;
    }
    .text {
      align-items: center !important;
      gap: 0.5rem !important;
      height: 2rem !important;
      font-family: var(--font-sans) !important;
      font-size: 0.8125rem !important;
      font-weight: 500 !important;
      color: var(--foreground) !important;
      background: var(--background) !important;
      border: 1px solid var(--input-border) !important;
      border-radius: var(--radius-md) !important;
      box-shadow: 0 1px 2px rgb(0 0 0 / 0.05) !important;
      padding: 0 0.625rem !important;
      margin: 0 !important;
      cursor: pointer !important;
      color: var(--muted-foreground) !important;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      --simple-icon-color: var(--muted-foreground);
    }
    :host([data-hax-active]) .text {
      border-color: var(--primary) !important;
      color: var(--foreground) !important;
    }
    .text:hover {
      background: var(--accent) !important;
    }
    .menu-button,
    .save-button,
    .cancel-button {
      --simple-toolbar-button-height: 1.75rem;
      --simple-toolbar-button-min-width: 1.75rem;
      border-radius: var(--radius-sm) !important;
      box-shadow: none !important;
    }
    .menu-button {
      background: transparent !important;
      color: var(--foreground) !important;
      --simple-icon-color: var(--muted-foreground);
    }
    .save-button {
      background: var(--primary) !important;
      color: var(--primary-foreground) !important;
      --simple-icon-color: var(--primary-foreground);
    }
    .cancel-button {
      background: transparent !important;
      color: var(--foreground) !important;
      border: 1px solid var(--input-border) !important;
      --simple-icon-color: var(--foreground);
    }
    .link-info {
      font-family: var(--font-sans) !important;
      background: var(--muted) !important;
      border-color: var(--border) !important;
      color: var(--muted-foreground) !important;
      border-radius: var(--radius-md) !important;
    }
    .link-url {
      font-family: var(--font-mono) !important;
      background: var(--background) !important;
      border-color: var(--border) !important;
      color: var(--foreground) !important;
    }
  `,"hax-map":h`
    :host {
      font-family: var(--font-sans) !important;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      --simple-icon-color: var(--muted-foreground);
    }
    ul {
      list-style: none !important;
      margin: 0 !important;
      padding: 0.5rem !important;
    }
    li {
      position: relative;
      display: flex !important;
      align-items: center !important;
      gap: 0.125rem !important;
      min-height: 2rem !important;
      margin: 0 0 1px !important;
      padding: 0 !important;
      border-radius: var(--radius-md) !important;
    }
    li:hover {
      background: var(--accent);
    }
    li:has(hax-toolbar-item[data-active-item]) {
      background: var(--accent);
      box-shadow: inset 2px 0 0 var(--primary);
    }
    hax-toolbar-item {
      flex: 1;
      min-width: 0;
      --simple-toolbar-button-border-width: 0 !important;
      --simple-toolbar-button-bg: transparent !important;
      --simple-toolbar-button-hover-bg: transparent !important;
      --simple-toolbar-button-height: 2rem !important;
    }
    hax-toolbar-item::part(button) {
      width: 100%;
      justify-content: flex-start;
      padding: 0 0.5rem;
      font-size: 0.875rem;
      font-weight: 400;
      background: transparent !important;
      color: var(--foreground) !important;
      border: 0 !important;
      box-shadow: none !important;
    }
    hax-toolbar-item[data-active-item]::part(button) {
      font-weight: 600;
    }
    hax-toolbar-item::part(label) {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: start;
    }
    /* nested blocks (list items etc.) indent with a guide line */
    li.is-child {
      margin-left: 0.875rem !important;
      padding-left: 0.375rem !important;
      border-radius: 0 var(--radius-md) var(--radius-md) 0 !important;
      box-shadow: inset 1px 0 0 var(--border);
    }
    li.is-child:has(hax-toolbar-item[data-active-item]) {
      box-shadow: inset 2px 0 0 var(--primary);
    }
    /* row actions: shown on the current row and on the hovered/focused
       row, hidden elsewhere so labels keep their width */
    simple-icon-button-lite {
      flex: none;
      display: none !important;
      width: 1.75rem !important;
      height: 1.75rem !important;
      margin: 0 !important;
      border: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
      border-radius: var(--radius-sm);
      --simple-icon-height: 1rem !important;
      --simple-icon-width: 1rem !important;
      --simple-icon-color: var(--muted-foreground) !important;
      color: var(--muted-foreground) !important;
    }
    li:hover simple-icon-button-lite,
    li:focus-within simple-icon-button-lite,
    li:has(hax-toolbar-item[data-active-item]) simple-icon-button-lite {
      display: inline-flex !important;
      opacity: 1 !important;
      visibility: visible !important;
    }
    simple-icon-button-lite:hover {
      background: var(--background) !important;
      color: var(--foreground);
    }
    simple-icon-button-lite.del:hover {
      color: var(--destructive);
    }
  `,"hax-view-source":h`
    :host {
      font-family: var(--font-sans) !important;
    }
    /* Update HTML across the top, then Clean / Prettify / Copy in a row */
    hax-toolbar {
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
      margin: 0 1rem 0.75rem !important;
      padding: 0 !important;
      background: transparent !important;
      border: 0 !important;
      box-shadow: none !important;
      gap: 0.375rem !important;
    }
    hax-toolbar hax-tray-button {
      width: 100%;
    }
    hax-toolbar hax-tray-button.updatecontent {
      grid-column: 1 / -1;
    }
    hax-tray-button.updatecontent {
      --simple-toolbar-button-bg: var(--primary);
      --simple-toolbar-button-color: var(--primary-foreground);
      --simple-icon-color: var(--primary-foreground);
    }
    textarea,
    code-editor,
    #textarea {
      font-family: var(--font-mono) !important;
      font-size: 0.8125rem !important;
      line-height: 1.6 !important;
      border: 1px solid var(--input-border) !important;
      border-radius: var(--radius-md) !important;
      background: var(--background) !important;
      color: var(--foreground) !important;
    }
  `,"simple-popover-manager":h`
    /* stock anchors it to the right of the hovered tile, covering the
       neighbouring tiles; pin block previews just outside the panel.
       data-oer-preview is set by ux-tweaks.js (:host(:has()) is invalid) */
    :host([data-oer-preview]) simple-popover {
      left: calc(var(--editor-panel-width) + 0.5rem) !important;
    }
    /* wrappers around the heading/body/nav slots carry stock padding */
    :host([data-oer-preview]) simple-popover > div {
      padding: 0 !important;
      margin: 0 !important;
    }
  `,"simple-popover":h`
    #content {
      padding: 0 !important;
      max-height: none !important;
      height: auto !important;
      width: 18rem !important;
      max-width: calc(100vw - var(--editor-panel-width) - 1.5rem) !important;
      background: var(--popover) !important;
      color: var(--popover-foreground) !important;
      border: 1px solid var(--border) !important;
      border-radius: var(--radius-lg) !important;
      box-shadow: 0 8px 24px rgb(0 0 0 / 0.14) !important;
      overflow: hidden !important;
    }
    #pointer-outer,
    #pointer {
      display: none !important;
    }
    ::slotted(div:empty) {
      display: none !important;
    }
  `,"hax-element-demo":h`
    :host {
      display: block;
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box;
      font-family: var(--font-sans) !important;
    }
    .preview-wrap {
      display: grid !important;
      place-items: center !important;
      min-height: 4.5rem !important;
      max-height: 9rem !important;
      padding: 1rem !important;
      overflow: hidden !important;
      background: var(--muted) !important;
      border-bottom: 1px solid var(--border) !important;
    }
    /* stock shrinks previews to 50% with a transform, which makes text
       blocks unreadable; render at the card's width instead */
    ::slotted(*) {
      transform: none !important;
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      font-size: 0.875rem !important;
      pointer-events: none;
    }
    .info {
      padding: 0.75rem 1rem !important;
    }
    .title {
      display: flex !important;
      align-items: center !important;
      gap: 0.5rem !important;
      font-size: 0.875rem !important;
      font-weight: 600 !important;
      color: var(--foreground) !important;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      --simple-icon-color: var(--muted-foreground);
    }
    .description {
      margin-top: 0.25rem !important;
      font-size: 0.8125rem !important;
      line-height: 1.45 !important;
      color: var(--muted-foreground) !important;
    }
  `,"d-d-d-sample":h`
    /* colour swatches fill their grid cell; the name is kept for screen
       readers (and shown as a tooltip) rather than printed */
    :host([type="accent"]),
    :host([type="primary"]) {
      display: block !important;
      width: 1.75rem !important;
      height: 1.75rem !important;
    }
    :host([type="accent"]) .wrapper,
    :host([type="primary"]) .wrapper {
      width: 1.75rem !important;
      height: 1.75rem !important;
      gap: 0 !important;
    }
    :host([type="accent"]) .sample,
    :host([type="primary"]) .sample {
      width: 1.75rem !important;
      height: 1.75rem !important;
      border-radius: var(--radius-md) !important;
    }
    :host([type="accent"]) .label,
    :host([type="primary"]) .label {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      overflow: hidden !important;
      clip-path: inset(50%) !important;
      white-space: nowrap !important;
    }
    .wrapper {
      display: flex !important;
      align-items: center !important;
      flex-wrap: nowrap !important;
      gap: 0.5rem !important;
      min-width: 0;
    }
    .sample {
      flex: none !important;
      width: 1.25rem !important;
      height: 1.25rem !important;
      margin: 0 !important;
      border-radius: var(--radius-sm) !important;
      box-shadow: inset 0 0 0 1px color-mix(in oklch, var(--foreground) 15%, transparent) !important;
    }
    .label {
      font-family: var(--font-sans) !important;
      font-size: 0.8125rem !important;
      font-weight: 400 !important;
      white-space: nowrap !important;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    /* size samples (padding, margin, radius...): width encodes the size,
       so put the label first and right-align a quiet sample bar */
    :host(:not([type="accent"]):not([type="primary"])) .wrapper {
      flex-direction: row-reverse !important;
      justify-content: space-between !important;
      width: 100%;
    }
    :host(:not([type="accent"]):not([type="primary"])) .sample {
      height: 0.75rem !important;
      background-color: color-mix(in oklch, var(--foreground) 30%, transparent) !important;
      box-shadow: none !important;
    }
    :host(:not([type="accent"]):not([type="primary"])) {
      flex: 1;
    }
  `,"simple-tooltip":h`
    #tooltip {
      font-family: var(--font-sans) !important;
      font-size: 0.75rem !important;
      font-weight: 500 !important;
      line-height: 1rem !important;
      color: var(--background) !important;
      background: var(--foreground) !important;
      border: 0 !important;
      border-radius: var(--radius-sm) !important;
      padding: 0.3125rem 0.625rem !important;
      box-shadow: 0 2px 8px rgb(0 0 0 / 0.15) !important;
      opacity: 1 !important;
      white-space: nowrap;
    }
  `,"hax-body":h`
    ::slotted(p),
    ::slotted(li),
    ::slotted(ul),
    ::slotted(ol) {
      text-align: start !important;
    }
    /* hover = dashed hint; the selected block's ring, label and drag
       handle are drawn by oer-block-frame */
    ::slotted(*:hover:not([data-hax-active])) {
      outline: 1px dashed var(--muted-foreground) !important;
      outline-offset: 4px !important;
    }
    ::slotted([data-hax-active]) {
      outline: 0 !important;
    }
    /* page-break is shown as a compact button that marks its own state */
    ::slotted(page-break),
    ::slotted(page-break:hover),
    ::slotted(page-break[data-hax-active]) {
      outline: 0 !important;
    }
  `,"simple-modal":h`
    :host {
      --simple-modal-titlebar-background: var(--background) !important;
      --simple-modal-titlebar-color: var(--foreground) !important;
      --simple-modal-titlebar-height: auto !important;
      --simple-modal-titlebar-line-height: 1.4 !important;
      --simple-modal-titlebar-padding: 0 !important;
      --simple-modal-header-background: var(--background) !important;
      --simple-modal-header-color: var(--foreground) !important;
      --simple-modal-content-container-background: var(--background) !important;
      --simple-modal-content-container-color: var(--foreground) !important;
      --simple-modal-buttons-background: var(--background) !important;
      --simple-modal-buttons-color: var(--foreground) !important;
      --simple-modal-button-background: var(--primary) !important;
      --simple-modal-button-color: var(--primary-foreground) !important;
      --simple-modal-backdrop-background: rgb(0 0 0 / 0.5) !important;
      --simple-modal-title-icon-size: 1rem !important;
      --simple-modal-titlebar-icon-height: 1rem !important;
      --simple-modal-titlebar-icon-width: 1rem !important;
      --dialog-border-radius: var(--radius-lg);
      /* size to content like shadcn Dialog, not a fixed 80vw x 80vh */
      --simple-modal-width: min(56rem, calc(100vw - 2rem)) !important;
      --simple-modal-max-width: calc(100vw - 2rem) !important;
      --simple-modal-height: auto !important;
      --simple-modal-min-height: 0 !important;
      --simple-modal-max-height: 85vh !important;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      font-family: var(--font-sans) !important;
    }
    /* [part=dialog] is the full-screen web-dialog host; the box itself is
       inside its shadow root and only reachable through its variables */
    web-dialog {
      --dialog-bg: var(--background);
      --dialog-color: var(--foreground);
      --dialog-border-radius: var(--radius-lg);
      --dialog-box-shadow: 0 0 0 1px var(--border), 0 16px 40px rgb(0 0 0 / 0.18);
      --dialog-backdrop-bg: transparent;
      --dialog-animation-duration: 0s;
      --dialog-padding: 0;
      /* the host is the full-screen fixed layer; dim with it directly (its
         own z-index:-1 #backdrop does not reliably paint over the page) */
      background: rgb(0 0 0 / 0.5) !important;
    }
    #titlebar {
      display: flex !important;
      align-items: center !important;
      gap: 0.5rem !important;
      min-height: 0 !important;
      padding: 1.25rem 1.5rem 0.75rem !important;
      background: var(--background) !important;
      color: var(--foreground) !important;
      border: 0 !important;
    }
    #simple-modal-title,
    [part="title"] {
      flex: 1;
      margin: 0 !important;
      padding: 0 !important;
      font-family: var(--font-sans) !important;
      font-size: 1.125rem !important;
      font-weight: 600 !important;
      line-height: 1.4 !important;
      letter-spacing: -0.01em !important;
      color: var(--foreground) !important;
      border: 0 !important;
    }
    #simple-modal-title *,
    .breadcrumbs {
      font-size: inherit !important;
      color: inherit !important;
    }
    .breadcrumbs simple-icon-lite,
    #simple-modal-title simple-icon-lite {
      --simple-icon-height: 1rem !important;
      --simple-icon-width: 1rem !important;
      width: 1rem !important;
      height: 1rem !important;
      color: var(--muted-foreground) !important;
    }
    #close {
      width: 2rem !important;
      height: 2rem !important;
      padding: 0 !important;
      border-radius: var(--radius-sm) !important;
      color: var(--muted-foreground) !important;
      --simple-icon-color: var(--muted-foreground);
      --simple-icon-width: 1rem !important;
      --simple-icon-height: 1rem !important;
    }
    #close:hover {
      background: var(--accent) !important;
    }
    #close:focus-visible,
    #close:focus-within {
      outline: 2px solid var(--ring) !important;
      outline-offset: 2px !important;
    }
    #headerbar {
      padding: 0 1.5rem !important;
    }
    #simple-modal-content,
    [part="content"] {
      margin: 0 !important;
      padding: 0.5rem 1.5rem 1.5rem !important;
      background: var(--background) !important;
      color: var(--foreground) !important;
      font-size: 0.875rem !important;
      line-height: 1.5 !important;
    }
    /* dialogs render their own footer; keep the modal's slot neutral */
    .buttons,
    [part="buttons"] {
      display: flex !important;
      justify-content: flex-end !important;
      gap: 0.5rem !important;
      padding: 0 1.5rem !important;
      background: var(--background) !important;
      border: 0 !important;
    }
  `,[a2]:h`
    :host {
      font-family: var(--font-sans) !important;
      font-size: 0.875rem;
      line-height: 1.5;
      color: var(--foreground);
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
    }
    h1,
    h2,
    h3,
    h4,
    h5 {
      font-family: var(--font-sans) !important;
      color: var(--foreground) !important;
      font-weight: 600 !important;
      letter-spacing: -0.01em !important;
      line-height: 1.3 !important;
      text-transform: none !important;
    }
    h1 {
      font-size: 1.25rem !important;
    }
    h2 {
      font-size: 1.125rem !important;
    }
    h3 {
      font-size: 1rem !important;
    }
    h4,
    h5 {
      font-size: 0.875rem !important;
    }
    p,
    li,
    label,
    td,
    th {
      font-size: 0.875rem !important;
    }
    p {
      color: var(--muted-foreground);
    }
    .buttons {
      display: flex !important;
      justify-content: flex-end !important;
      gap: 0.5rem !important;
      margin-top: 1rem !important;
      padding: 1rem 0 0 !important;
      background: transparent !important;
      border-top: 1px solid var(--border) !important;
    }
    /* collapsible settings groups -> shadcn Card with header */
    details.group {
      margin: 0 0 0.75rem !important;
      padding: 0 !important;
      background: var(--background) !important;
      border: 1px solid var(--border) !important;
      border-radius: var(--radius-lg) !important;
      box-shadow: none !important;
      overflow: hidden;
    }
    summary.group-summary {
      display: flex !important;
      align-items: center !important;
      gap: 0.5rem !important;
      min-height: 0 !important;
      padding: 0.75rem 1rem !important;
      background: transparent !important;
      color: var(--foreground) !important;
      font-size: 0.875rem !important;
      cursor: pointer;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      --simple-icon-color: var(--muted-foreground);
    }
    summary.group-summary simple-icon-lite {
      width: 1rem !important;
      height: 1rem !important;
      color: var(--muted-foreground) !important;
    }
    summary.group-summary h3,
    summary.group-summary h4 {
      flex: 1;
      margin: 0 !important;
      font-size: 0.875rem !important;
      font-weight: 600 !important;
    }
    summary.group-summary::after,
    summary.group-summary::marker {
      color: var(--muted-foreground) !important;
      font-size: 1rem !important;
      font-weight: 400 !important;
    }
    details.group[open] > summary.group-summary {
      border-bottom: 1px solid var(--border) !important;
    }
    .group-body {
      padding: 1rem !important;
    }
    .actions {
      display: flex !important;
      justify-content: flex-end !important;
      gap: 0.5rem !important;
      padding: 1rem 0 0 !important;
      background: transparent !important;
      border-top: 1px solid var(--border) !important;
    }
    button.action,
    .actions button {
      ${O(n2)}
      height: 2.25rem !important;
      padding: 0 1rem !important;
      font-size: 0.875rem !important;
      background: var(--primary) !important;
      color: var(--primary-foreground) !important;
      border: 0 !important;
      border-radius: var(--radius-md) !important;
    }
    button.action.secondary,
    button.action.cancel,
    .actions button.secondary,
    .actions button.cancel {
      background: var(--background) !important;
      color: var(--foreground) !important;
      border: 1px solid var(--input-border) !important;
    }
    .hax-modal-btn,
    button.hax-modal-btn {
      ${O(n2)}
      background: var(--primary) !important;
      color: var(--primary-foreground) !important;
      font-size: 0.875rem !important;
      height: 2.25rem !important;
      padding: 0 1rem !important;
      border-radius: var(--radius-md) !important;
      border: 0 !important;
    }
    .hax-modal-btn:hover {
      background: color-mix(in oklch, var(--primary) 90%, black) !important;
    }
    .hax-modal-btn.import,
    .hax-modal-btn.cancel,
    .hax-modal-btn.secondary,
    .hax-modal-btn[data-variant="outline"] {
      background: var(--background) !important;
      color: var(--foreground) !important;
      border: 1px solid var(--input-border) !important;
    }
    .hax-modal-btn.import:hover,
    .hax-modal-btn.cancel:hover,
    .hax-modal-btn.secondary:hover {
      background: var(--accent) !important;
      color: var(--accent-foreground) !important;
    }
    .hax-modal-btn.danger,
    .hax-modal-btn.delete {
      background: var(--destructive) !important;
      color: var(--destructive-foreground) !important;
    }
    button:focus-visible,
    a:focus-visible {
      ${A}
    }
  `,"rich-text-editor-prompt":h`
    #prompt {
      z-index: 9995 !important;
    }
    #form {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding: 0.75rem;
      font-family: var(--font-sans);
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }
  `,"hax-confirm-dialog":h`
    .confirm-shell {
      background: transparent !important;
      background-image: none !important;
      border: 0 !important;
      padding: 0 !important;
    }
    .message {
      margin: 0 0 1rem !important;
      font-size: 0.875rem !important;
      color: var(--muted-foreground) !important;
    }
    .actions {
      border-top: 0 !important;
      padding-top: 0 !important;
    }
    .actions button:not(.destructive) {
      background: var(--background) !important;
      color: var(--foreground) !important;
      border: 1px solid var(--input-border) !important;
    }
    .actions button:not(.destructive):hover {
      background: var(--accent) !important;
    }
    .actions button.destructive {
      background: var(--destructive) !important;
      color: var(--destructive-foreground) !important;
    }
  `,"haxcms-site-settings-dashboard":h`
    .dashboard-shell {
      display: flex !important;
      flex-direction: column !important;
      gap: 1.25rem !important;
    }
    .primary-grid,
    .advanced-grid {
      gap: 0.75rem !important;
    }
    .dashboard-item {
      height: auto !important;
      min-height: 0 !important;
    }
    .dashboard-action {
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      justify-content: flex-end !important;
      gap: 0.75rem !important;
      width: 100% !important;
      height: 6rem !important;
      min-height: 0 !important;
      padding: 1rem !important;
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
      font-weight: 500 !important;
      text-align: start !important;
      color: var(--card-foreground) !important;
      background: var(--card) !important;
      border: 1px solid var(--border) !important;
      border-radius: var(--radius-lg) !important;
      box-shadow: none !important;
      --simple-icon-height: 1.25rem !important;
      --simple-icon-width: 1.25rem !important;
      --simple-icon-color: var(--muted-foreground);
    }
    .dashboard-action.advanced {
      height: 4.5rem !important;
      flex-direction: row !important;
      align-items: center !important;
      justify-content: flex-start !important;
      --simple-icon-height: 1rem !important;
      --simple-icon-width: 1rem !important;
    }
    .dashboard-action simple-icon-lite,
    .dashboard-action simple-icon {
      width: 1.25rem !important;
      height: 1.25rem !important;
      color: var(--muted-foreground) !important;
    }
    .dashboard-action.advanced simple-icon-lite,
    .dashboard-action.advanced simple-icon {
      width: 1rem !important;
      height: 1rem !important;
    }
    .dashboard-action:hover {
      background: var(--accent) !important;
      color: var(--accent-foreground) !important;
      border-color: var(--accent) !important;
    }
    .dashboard-action:focus-visible {
      ${A}
    }
    .advanced-heading {
      display: flex !important;
      align-items: center !important;
      gap: 0.75rem !important;
    }
    .advanced-title {
      margin: 0 !important;
      font-size: 0.75rem !important;
      font-weight: 500 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.06em !important;
      color: var(--muted-foreground) !important;
    }
    .advanced-rule {
      flex: 1;
      border: 0 !important;
      border-top: 1px solid var(--border) !important;
      height: 0 !important;
    }
  `,"outline-designer":h`
    :host {
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      --simple-icon-color: var(--muted-foreground);
    }
    .controls {
      display: flex !important;
      gap: 0.25rem !important;
      padding: 0 0 0.75rem !important;
      background: transparent !important;
    }
    .controls .control {
      height: 2rem !important;
      min-width: 2rem !important;
      background: transparent !important;
      --simple-toolbar-button-height: 2rem;
      --simple-toolbar-button-min-width: 2rem;
      --simple-toolbar-button-border-width: 1px;
      --simple-toolbar-button-border-color: var(--input-border);
    }
    #list {
      margin: 0 !important;
      padding: 0 !important;
      border: 1px solid var(--border) !important;
      border-radius: var(--radius-md) !important;
      overflow: hidden;
    }
    li.item {
      display: flex !important;
      align-items: center !important;
      min-height: 2.5rem !important;
      margin: 0 !important;
      padding: 0 0.5rem !important;
      border: 0 !important;
      border-bottom: 1px solid var(--border) !important;
      background: var(--background) !important;
      color: var(--foreground) !important;
      box-shadow: none !important;
    }
    li.item:last-child {
      border-bottom: 0 !important;
    }
    li.item:hover,
    li.item:focus-within {
      background: var(--accent) !important;
    }
    .item-leading-operations {
      display: flex !important;
      align-items: center !important;
      gap: 0.125rem !important;
      height: 2.5rem !important;
    }
    .drag-handle,
    .actions-menu-button,
    .collapse-slot simple-icon-button-lite,
    .controls .control {
      --simple-icon-height: 1rem !important;
      --simple-icon-width: 1rem !important;
    }
    .drag-handle,
    .actions-menu-button,
    .collapse-slot simple-icon-button-lite {
      width: 1.75rem !important;
      height: 1.75rem !important;
      background: transparent !important;
      border-radius: var(--radius-sm) !important;
      --simple-toolbar-button-height: 1.75rem;
      --simple-toolbar-button-min-width: 1.75rem;
    }
    .drag-handle {
      cursor: grab;
    }
    .label {
      font-size: 0.875rem !important;
      font-weight: 400 !important;
      color: var(--foreground) !important;
    }
    .actions-menu {
      font-size: 0.875rem !important;
    }
  `,"super-daemon":h`
    web-dialog {
      --dialog-border-radius: var(--radius-lg);
      --dialog-padding: 0;
      --dialog-max-width: 40rem;
      --dialog-width: min(40rem, calc(100vw - 2rem));
      --dialog-background: var(--popover);
      --dialog-color: var(--popover-foreground);
      --dialog-backdrop-bg: rgb(0 0 0 / 0.5);
      --dialog-box-shadow: 0 16px 40px rgb(0 0 0 / 0.18);
    }
    web-dialog {
      --dialog-box-shadow: 0 0 0 1px var(--border), 0 16px 40px rgb(0 0 0 / 0.18);
      --dialog-bg: var(--popover);
      --dialog-color: var(--popover-foreground);
      --dialog-animation-duration: 0s;
    }
    web-dialog[open] {
      background: rgb(0 0 0 / 0.5) !important;
    }
    /* shadcn Dialog close: small ghost X in the corner */
    #cancel {
      position: absolute !important;
      top: 0.625rem !important;
      right: 0.625rem !important;
      z-index: 2;
      width: 1.75rem !important;
      height: 1.75rem !important;
      padding: 0 !important;
      border-radius: var(--radius-sm) !important;
      background: transparent !important;
      color: var(--muted-foreground) !important;
      opacity: 0.8;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      --simple-icon-color: var(--muted-foreground);
      --simple-icon-button-border-radius: var(--radius-sm);
    }
    #cancel:hover {
      opacity: 1;
      background: var(--accent) !important;
    }
  `,"super-daemon-ui":h`
    :host {
      font-family: var(--font-sans) !important;
      color: var(--popover-foreground) !important;
      background: var(--popover) !important;
      border-radius: var(--radius-lg);
    }
    super-daemon-search {
      border-bottom: 1px solid var(--border) !important;
      padding-right: 2.75rem !important;
    }
    super-daemon-row,
    super-daemon-row:nth-child(even),
    super-daemon-row:nth-child(odd) {
      background: transparent !important;
    }
    .results {
      padding: 0.25rem !important;
    }
    .no-results,
    .loading {
      padding: 1.5rem !important;
      text-align: center;
      font-size: 0.875rem !important;
      font-style: normal !important;
      color: var(--muted-foreground) !important;
    }
    .results-stats,
    .mini-results-counter {
      font-family: var(--font-sans) !important;
      font-size: 0.75rem !important;
      color: var(--muted-foreground) !important;
      background: transparent !important;
      border-top: 1px solid var(--border) !important;
      padding: 0.375rem 0.75rem !important;
    }
  `,"super-daemon-search":h`
    :host {
      display: flex !important;
      align-items: center !important;
      gap: 0.5rem !important;
      padding: 0 0.75rem !important;
      height: 3rem !important;
      --simple-icon-height: 1rem !important;
      --simple-icon-width: 1rem !important;
      background: transparent !important;
      border: 0 !important;
      border-radius: 0 !important;
      font-family: var(--font-sans) !important;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      --simple-icon-color: var(--muted-foreground);
    }
    simple-fields-field {
      flex: 1;
      margin: 0 !important;
      padding: 0 !important;
      background: transparent !important;
      --simple-fields-font-size: 0.875rem;
    }
    .program {
      font-size: 0.75rem !important;
      font-weight: 500 !important;
      padding: 0.125rem 0.5rem !important;
      border-radius: var(--radius-sm) !important;
      background: var(--muted) !important;
      color: var(--foreground) !important;
    }
    .voice {
      display: none !important;
    }
  `,"super-daemon-row":h`
    :host {
      display: block;
      font-family: var(--font-sans) !important;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      --simple-icon-color: var(--muted-foreground);
    }
    button {
      display: flex !important;
      align-items: center !important;
      gap: 0.75rem !important;
      width: 100% !important;
      min-height: 2.25rem !important;
      padding: 0.375rem 0.75rem !important;
      border: 0 !important;
      border-radius: var(--radius-sm) !important;
      background: transparent !important;
      color: var(--popover-foreground) !important;
      text-align: start !important;
      cursor: pointer;
    }
    :host([active]) button,
    :host([aria-selected="true"]) button,
    button:hover,
    button:focus-visible {
      background: var(--accent) !important;
      color: var(--accent-foreground) !important;
      outline: none !important;
    }
    .result-icon,
    .result-image {
      flex: none;
      width: 1rem !important;
      height: 1rem !important;
      --simple-icon-height: 1rem !important;
      --simple-icon-width: 1rem !important;
    }
    .label-wrap {
      flex: 1;
      min-width: 0;
    }
    .action {
      font-size: 0.875rem !important;
      font-weight: 400 !important;
      line-height: 1.25rem !important;
    }
    .path {
      font-size: 0.75rem !important;
      font-style: normal !important;
      color: var(--muted-foreground) !important;
      line-height: 1rem !important;
    }
    .tags {
      display: none !important;
    }
    .more {
      flex: none;
    }
  `,"haxcms-site-editor-ui":h`
    :host {
      --top-bar-height: 0px !important;
      height: 0 !important;
      min-height: 0 !important;
      overflow: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
  `,"app-hax-top-bar":h`
    :host {
      --top-bar-height: 3.5rem !important;
    }
  `},s2=["content-add","content-edit","content-map","view-source"];function B(){return b.cmsSiteEditor?.haxCmsSiteEditorUIElement??null}function H(){return globalThis.HaxStore?.requestAvailability?.()??null}const l2=o=>({target:o,preventDefault(){},stopPropagation(){}});function j(o,t){const e=B();if(!e)return;const i=t?e.shadowRoot?.querySelector(t):null;e[o]?.(l2(i))}const P2=()=>j("_editButtonTap","#editbutton"),N2=()=>j("_editButtonTap","#editbutton"),O2=()=>j("_cancelButtonTap","#cancelbutton"),K2=()=>j("_outlineButtonTap","#outlinebutton"),U2=()=>j("_manifestButtonTap","#manifestbtn"),d2=()=>B()?._logout?.(),X2=()=>H()?.activeHaxBody?.undo?.(),G2=()=>H()?.activeHaxBody?.redo?.();function W2(){const o=B()?.shadowRoot?.querySelector("#addpagebutton");o?.HAXCMSButtonClick?.(l2(o))}function Y2(o){const t=H()?.activeHaxBody?.shadowRoot?.querySelector("hax-plate-context"),e=n=>{for(const s of n?.querySelectorAll("*")||[]){if(s.getAttribute("event-name")===o)return s;const p=s.shadowRoot&&e(s.shadowRoot);if(p)return p}return null},i=t&&(e(t)||e(t.shadowRoot));let a=null;const r=[i?.shadowRoot];for(;!a&&r.length;){const n=r.shift();if(n){a=n.querySelector("button");for(const s of n.querySelectorAll("*"))r.push(s.shadowRoot)}}a?.click()}function T(){const o=globalThis.document.querySelector("custom-oer-docs-theme")?.shadowRoot?.querySelector("main")?.getBoundingClientRect();return o?{top:o.top,bottom:o.bottom}:{top:0,bottom:globalThis.innerHeight}}function K(o){const t=H()?.haxTray;!t||!s2.includes(o)||(o==="view-source"&&t.shadowRoot?.querySelector("#view-source")?.openSource?.(),t.trayDetail=o,t.collapsed=!1)}function U(o=""){const t=globalThis.SuperDaemonManager?.requestAvailability?.();t&&(t.runProgram(o,"*"),t.mini=!1,t.wand=!1,t.open())}const h2=/Mac|iPhone|iPad/.test(globalThis.navigator?.platform??""),F=h2?"\u2318":"Ctrl",Z2=h2?"\u2318\u21E7K":"Ctrl\u21E7K";let $=null;const p2=o=>o.shiftKey&&(o.altKey||o.metaKey||o.ctrlKey);async function J2(){globalThis.addEventListener("keydown",r=>{if($=r,p2(r)&&r.code==="KeyK"&&(r.preventDefault(),r.metaKey||r.ctrlKey)){r.stopImmediatePropagation();const n=globalThis.SuperDaemonManager?.instance;n?.opened?n.close():U()}},{capture:!0}),await customElements.whenDefined("super-daemon");const o=customElements.get("super-daemon").prototype;if(o.__oerModal)return;const t=r=>{if(!r||r.__oerGated)return;let n=r.allowedCallback;const s=function(...p){return $&&p2($)&&$.code!=="KeyK"&&$.key!=="Escape"?!1:typeof n=="function"?n.apply(this,p):!0};Object.defineProperty(r,"allowedCallback",{configurable:!0,get:()=>s,set:p=>{n=p}}),r.__oerGated=!0};t(globalThis.SuperDaemonManager?.instance);const e=o.waveWand;o.waveWand=function(...r){e.apply(this,r),this.mini=!1,this.wand=!1,this.activeNode=null};const i=o.updated;o.updated=function(r){i?.call(this,r),t(this),r.has("opened")&&this.opened&&this.mini&&(this.mini=!1,this.wand=!1)},o.__oerModal=!0;const a=globalThis.SuperDaemonManager?.instance;a?.mini&&(a.mini=!1,a.wand=!1)}function q(o,t){customElements.whenDefined(o).then(()=>t(customElements.get(o)))}const Q2={"editor:format-clear":"Clean","hax:format-textblock":"Prettify","icons:content-copy":"Copy"};function t0(){for(const o of["hax-text-editor-toolbar","rich-text-editor-toolbar","hax-toolbar"])q(o,t=>{const e=t.prototype;if(e.__oerExpanded)return;Object.defineProperty(e,"alwaysExpanded",{get:()=>!0,set:()=>{},configurable:!0});const i=e.updated;e.updated=function(a){i?.call(this,a),this.collapsed&&(this.collapsed=!1)},e.__oerExpanded=!0});q("simple-fields-field",o=>{const t=o.prototype,e=t.updated,i=a=>a.querySelector('d-d-d-sample[type="accent"], d-d-d-sample[type="primary"]')?.shadowRoot?.querySelector(".label")?.textContent?.trim();t.updated=function(a){e?.call(this,a),this.type==="radio"&&requestAnimationFrame(()=>{for(const r of this.shadowRoot?.querySelectorAll('[part="option"]')??[]){const n=i(r);n&&r.title!==n&&(r.title=n)}})}}),q("hax-gizmo-browser",o=>{const t=o.prototype,e=t.updated;t.updated=function(i){e?.call(this,i);const a=this.shadowRoot?.querySelector("#inputfilter");a&&!a.placeholder&&(a.placeholder="Search blocks\u2026")}}),m2("simple-popover-manager",o=>{const t=()=>o.toggleAttribute("data-oer-preview",!!o.querySelector("hax-element-demo"));new MutationObserver(t).observe(o,{childList:!0,subtree:!0}),t()}),q("hax-view-source",o=>{const t=o.prototype,e=t.updated;t.updated=function(i){e?.call(this,i),this.shadowRoot?.querySelector("hax-toolbar")?.setAttribute("data-oer-source","");for(const a of this.shadowRoot?.querySelectorAll("hax-tray-button")??[]){a.showTextLabel||(a.showTextLabel=!0),a.setAttribute("data-oer-labelled","");const r=Q2[a.icon];r&&a.label!==r&&(a.label=r)}}})}const e0=[["content-edit","image:tune","Block"],["content-map","icons:toc","Outline"],["view-source","hax:html-code","Source"]];function z(o){const t=globalThis.document.createElement("span");return t.className="oer-icon",t.setAttribute("aria-hidden","true"),t.style.setProperty("--src",`url("${k[o]}")`),t}function o0(){const o=globalThis.document.createElement("div");o.className="oer-tabs",o.setAttribute("role","tablist"),o.setAttribute("aria-label","Editor panel");for(const[e,i,a]of e0){const r=globalThis.document.createElement("button");r.type="button",r.className="oer-tab",r.dataset.panel=e,r.setAttribute("role","tab"),r.append(z(i),globalThis.document.createTextNode(a)),r.addEventListener("click",()=>K(e)),o.append(r)}o.addEventListener("keydown",e=>{if(e.key!=="ArrowRight"&&e.key!=="ArrowLeft")return;const i=[...o.querySelectorAll(".oer-tab")],a=i.indexOf(e.target),r=i[(a+(e.key==="ArrowRight"?1:-1)+i.length)%i.length];r.focus(),r.click()});const t=globalThis.document.createElement("div");return t.className="oer-panel-header",t.append(o),t}function r0(){const o=globalThis.document,t=o.createElement("div");t.className="oer-panel-footer";const e=o.createElement("div");e.className="oer-footer-label",e.textContent="Site",t.append(e);for(const[i,a,r]of[["hax:add-page","Add page",W2],["hax:site-map","Outline",K2],["icons:settings","Settings",U2]]){const n=o.createElement("button");n.type="button",n.className="oer-footer-item",n.append(z(i),o.createTextNode(a)),n.addEventListener("click",r),t.append(n)}return t.append(i0()),t}function i0(){const o=globalThis.document,t=b.userData?.userName||"",e=o.createElement("div");e.className="oer-account";const i=o.createElement("span");i.className="oer-avatar",i.setAttribute("aria-hidden","true"),t?i.textContent=t.slice(0,2):i.append(z("social:person"));const a=o.createElement("span");a.className="oer-account-name",a.textContent=t||"Signed in";const r=o.createElement("a");r.className="oer-account-btn",r.href=B()?.backLink??"/",r.title="Site dashboard",r.setAttribute("aria-label","Site dashboard"),r.append(z("hax:home-edit"));const n=o.createElement("button");return n.type="button",n.className="oer-account-btn danger",n.title="Log out",n.setAttribute("aria-label","Log out"),n.append(z("icons:exit-to-app")),n.addEventListener("click",d2),e.append(i,a,r,n),e}function m2(o,t){const e=globalThis.document,i=e.querySelector(o);if(i)return t(i);const a=new MutationObserver(()=>{const r=e.querySelector(o);r&&(a.disconnect(),t(r))});a.observe(e.body,{childList:!0})}function a0(){m2("hax-tray",async o=>{if(await customElements.whenDefined("hax-tray"),await o.updateComplete,!o.shadowRoot||o.__oerEnhanced)return;o.__oerEnhanced=!0;let t=null;const e=()=>{const a=o.getAttribute("tray-detail");a==="content-add"&&b.editMode&&!o.__oerRedirect&&(o.__oerRedirect=!0,requestAnimationFrame(()=>{if(o.__oerRedirect=!1,o.getAttribute("tray-detail")!=="content-add")return;const r=globalThis.HaxStore?.requestAvailability?.();if(r&&!r.activeNode){const n=[...r.activeHaxBody?.children||[]].find(s=>s.localName!=="page-break");n&&(r.activeNode=n)}K("content-edit")}));for(const r of o.shadowRoot.querySelectorAll(".oer-tab")){const n=r.dataset.panel===a;r.setAttribute("aria-selected",String(n)),r.tabIndex=n?0:-1}},i=()=>{const a=o.shadowRoot,r=a.querySelector(".detail");r&&!r.querySelector(".oer-panel-header")&&(r.prepend(o0()),e()),r&&!r.querySelector(".oer-panel-footer")&&r.append(r0());const n=a.querySelector('a11y-collapse[id="settings.configure"]');n&&n!==t&&(t=n,requestAnimationFrame(()=>{n.expanded||(n.expanded=!0)}))};new MutationObserver(i).observe(o.shadowRoot,{childList:!0,subtree:!0}),new MutationObserver(e).observe(o,{attributes:!0,attributeFilter:["tray-detail"]}),i(),y(()=>{x(b.editMode)&&requestAnimationFrame(()=>{const a=o.getAttribute("tray-detail");K(s2.includes(a)&&a!=="content-add"?a:"content-edit")})})})}const L=20;function c2(o){const t=o.getBoundingClientRect();let e=t.top-4,i=t.bottom+4;if(i-e<60){const a=(60-(i-e))/2;e-=a,i+=a}return{top:e,bottom:i,left:t.left-4,right:t.right+4,height:i-e,block:t}}const g2=o=>o.localName!=="page-break"&&o.getClientRects().length>0;function n0(o){const t=new Set;for(const e of o.querySelectorAll("[slot]")){const i=e.parentElement;!i||i===o||t.has(i)||(o.__isLayout?o.__isLayout(i):i.localName==="grid-plate")&&t.add(i)}for(const e of o.querySelectorAll("grid-plate"))t.add(e);return[...t]}function s0(o){const t=o.shadowRoot,e=[];if(!t)return e;for(const i of t.querySelectorAll("[id^='col']")){const a=i.querySelector("slot")?.getAttribute("name"),r=i.getBoundingClientRect();!a||r.width===0||getComputedStyle(i).display==="none"||e.push({name:a,rect:r})}return e}function X(o,t){if(t-o>=16)return[o,t];const e=(o+t)/2;return[e-16/2,e+16/2]}function V(o){const t=[];if(!o)return t;const e=o.getBoundingClientRect(),i=[...o.children].filter(g2),a=i.map(r=>r.getBoundingClientRect());for(let r=0;r<=i.length;r++){const n=r===i.length,s=r===0?(a[0]?.top??e.top)-16:a[r-1].bottom,p=n?s+16:a[r].top,[d,m]=X(s,p);t.push({container:o,slotName:null,before:i[r]||null,after:i[r-1]||null,nested:!1,end:n,top:d,height:m-d,left:e.left,width:e.width})}for(const r of n0(o))for(const n of s0(r)){const s=[...r.children].filter(d=>d.getAttribute("slot")===n.name&&g2(d)),p=s.map(d=>d.getBoundingClientRect());if(!s.length){const[d,m]=X(n.rect.top,n.rect.bottom);t.push({container:r,slotName:n.name,before:null,after:null,nested:!0,top:d,height:m-d,left:n.rect.left,width:n.rect.width});continue}for(let d=0;d<=s.length;d++){const m=d===0?n.rect.top:p[d-1].bottom,c=d===s.length?Math.max(n.rect.bottom,m):p[d].top,[v,E]=X(m,c);t.push({container:r,slotName:n.name,before:s[d]||null,after:s[d-1]||null,nested:!0,top:v,height:E-v,left:n.rect.left,width:n.rect.width})}}return t}function D2(o,t,e,{gutter:i=0}={}){let a=null;for(const r of o){const n=r.nested?r.left:r.left-i;t<n||t>r.left+r.width||e<r.top||e>r.top+r.height||(!a||r.width*r.height<a.width*a.height)&&(a=r)}return a}function l0(o,t,e){const i=D2(o,t,e,{gutter:96});if(i)return i;let a=null,r=1/0;for(const n of o){const s=t<n.left?n.left-t:t>n.left+n.width?t-n.left-n.width:0,p=e<n.top?n.top-e:e>n.top+n.height?e-n.top-n.height:0,d=Math.hypot(s*2,p);d<r&&(r=d,a=n)}return a}const G=(o,t)=>!!o&&!!t&&o.container===t.container&&o.slotName===t.slotName&&o.before===t.before&&o.after===t.after;function u2(o,t){t.before?t.before.before(o):t.after?t.after.after(o):t.container.append(o),t.slotName?o.setAttribute("slot",t.slotName):o.removeAttribute("slot")}async function v2(o,t,{tag:e,content:i="",properties:a={}}){const r=o.activeHaxBody,n=new Set(t.container.children),s=new Set(r.children);let p=t.after;!p&&!t.nested&&(p=[...r.children].find(m=>m.localName==="page-break")),p||(p=t.before||t.container),r.__addAbove=!1,r.haxInsert(e,i,a,p),await new Promise(m=>requestAnimationFrame(()=>requestAnimationFrame(m)));const d=[...t.container.children].find(m=>!n.has(m))||[...r.children].find(m=>!s.has(m));return d?(t.nested&&(!t.after||d.parentElement!==t.container)&&u2(d,t),d):null}const W=o=>l`<span class="icon" aria-hidden="true" style="--src:url(&quot;${k[`oer:${o}`]||""}&quot;)"></span>`,d0=4,R=48;class w2 extends M{static get tag(){return"oer-block-frame"}static get properties(){return{_label:{state:!0},_drag:{state:!0}}}constructor(){super(),this._label="",this._drag=null,this.__tick=this._tick.bind(this),this.__keys=t=>{this._drag&&t.key==="Escape"&&(t.preventDefault(),t.stopPropagation(),this._endDrag(!1))}}connectedCallback(){super.connectedCallback(),this.hidden=!0,this.__raf=requestAnimationFrame(this.__tick),globalThis.addEventListener("keydown",this.__keys,!0)}disconnectedCallback(){cancelAnimationFrame(this.__raf),globalThis.removeEventListener("keydown",this.__keys,!0),super.disconnectedCallback()}get _hax(){return globalThis.HaxStore?.requestAvailability?.()}_tick(){this.__raf=requestAnimationFrame(this.__tick);const t=this._hax,e=b.editMode?t?.activeNode:null;if(!e||!e.isConnected||e.localName==="page-break"){this.hidden=!0,this.__node=null;return}if(e!==this.__node){this.__node=e;const p=t.haxSchemaFromTag?.(e.localName);this._label=p?.gizmo?.title||e.localName}const i=c2(e),a=T();if((i.bottom<a.top||i.top>a.bottom||i.block.width===0)&&!this._drag){this.hidden=!0;return}this.hidden=!1;const r=this.style;r.setProperty("--top",`${Math.round(i.top)}px`),r.setProperty("--left",`${Math.round(i.left)}px`),r.setProperty("--width",`${Math.round(i.right-i.left)}px`),r.setProperty("--height",`${Math.round(i.height)}px`);const n=Math.max(i.top,a.top),s=Math.min(i.bottom,a.bottom);r.setProperty("--grip",`${Math.round((n+s)/2-i.top)}px`),this._drag&&this._dragFrame()}_move(t){Y2(t==="up"?"hax-plate-up":"hax-plate-down")}_gripKeys(t){(t.key==="ArrowUp"||t.key==="ArrowDown")&&(t.preventDefault(),this._move(t.key==="ArrowUp"?"up":"down"))}_pointerDown(t){if(t.button===0){t.preventDefault();try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}this.__press={x:t.clientX,y:t.clientY,id:t.pointerId}}}_pointerMove(t){if(!this.__press)return;const e=Math.hypot(t.clientX-this.__press.x,t.clientY-this.__press.y);!this._drag&&e<d0||(this._drag||(globalThis.__oerDragging=!0),this._drag={...this._drag||{},x:t.clientX,y:t.clientY})}_pointerUp(t){if(this.__press){this.__press=null;try{t.currentTarget.releasePointerCapture(t.pointerId)}catch{}this._drag&&this._endDrag(!0)}}_dragFrame(){const t=this._drag,e=T(),i=globalThis.document.querySelector("custom-oer-docs-theme")?.shadowRoot?.querySelector("main");i&&(t.y<e.top+R?i.scrollTop-=Math.ceil((e.top+R-t.y)/4):t.y>e.bottom-R&&(i.scrollTop+=Math.ceil((t.y-e.bottom+R)/4)));const a=this.__node,r=V(this._hax?.activeHaxBody).filter(p=>!a.contains(p.container)),n=l0(r,t.x,t.y),s=!!n&&n.before!==a&&n.after!==a;(!G(n,t.slot)||s!==t.valid||!t.rect||t.rect.top!==Math.round(n?.top))&&(this._drag={...t,slot:n,valid:s,rect:n&&{top:Math.round(n.top),left:Math.round(n.left),width:Math.round(n.width),height:Math.round(n.height)}})}_endDrag(t){const e=this._drag;this._drag=null,globalThis.__oerDragging=!1;const i=this.__node;if(!t||!e?.slot||!e.valid||!i)return;u2(i,e.slot);const a=this._hax;a&&(a.activeNode=i),i.scrollIntoView?.({block:"nearest"})}static get styles(){return h`
      :host {
        position: fixed;
        inset: 0 auto auto 0;
        z-index: 9990;
        pointer-events: none;
        font-family: var(--font-sans, system-ui, sans-serif);
        --r: var(--radius-md, 0.5rem);
      }
      :host([hidden]) {
        display: none;
      }
      .ring,
      .handle,
      .label {
        position: fixed;
        box-sizing: border-box;
      }
      /* square except bottom-right: the handle covers the left side and
         the label sits on the top-right */
      .ring {
        top: var(--top);
        left: var(--left);
        width: var(--width);
        height: var(--height);
        border: 2px solid var(--primary);
        border-radius: 0 0 var(--r) 0;
      }
      .handle {
        pointer-events: auto;
        top: var(--top);
        left: calc(var(--left) - ${L}px + 2px);
        width: ${L}px;
        height: var(--height);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        background: var(--primary);
        color: var(--primary-foreground);
        border-radius: var(--r) 0 0 var(--r);
      }
      button {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: ${L}px;
        height: 1.25rem;
        cursor: pointer;
        border-radius: var(--r);
      }
      button:hover {
        background: color-mix(in oklch, var(--primary-foreground) 18%, transparent);
      }
      button:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .grip {
        position: absolute;
        top: var(--grip);
        left: 0;
        margin-top: -0.625rem;
        cursor: grab;
        touch-action: none;
      }
      :host([dragging]) .grip {
        cursor: grabbing;
      }
      .icon {
        width: 0.875rem;
        height: 0.875rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      .label {
        top: var(--top);
        left: calc(var(--left) + var(--width));
        transform: translate(-100%, -100%);
        padding: 0.125rem 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1.25rem;
        white-space: nowrap;
        color: var(--primary-foreground);
        background: var(--primary);
        border-radius: var(--radius-sm) var(--radius-sm) 0 0;
      }
      /* while dragging: the block's frame goes quiet, the target slot lights up */
      :host([dragging]) .ring {
        border-style: dashed;
        background: color-mix(in oklch, var(--primary) 6%, transparent);
      }
      .drop {
        position: fixed;
        box-sizing: border-box;
        border: 2px solid var(--primary);
        border-radius: var(--radius-sm);
        background: color-mix(in oklch, var(--primary) 14%, transparent);
      }
      .ghost {
        position: fixed;
        transform: translate(12px, 12px);
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--popover-foreground);
        background: var(--popover);
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
        white-space: nowrap;
      }
    `}updated(t){t.has("_drag")&&this.toggleAttribute("dragging",!!this._drag)}render(){const t=this._drag;return l`
      <div class="ring"></div>
      <div class="label">${this._label}</div>
      <div class="handle" @mousedown="${e=>e.preventDefault()}">
        <button title="Move up" aria-label="Move block up" @click="${()=>this._move("up")}">${W("chevron-up")}</button>
        <button
          class="grip"
          title="Drag to move (or use the arrow keys)"
          aria-label="Move block: drag, or press the up and down arrow keys"
          @pointerdown="${this._pointerDown}"
          @pointermove="${this._pointerMove}"
          @pointerup="${this._pointerUp}"
          @pointercancel="${()=>this._endDrag(!1)}"
          @keydown="${this._gripKeys}"
        >
          ${W("grip-vertical")}
        </button>
        <button title="Move down" aria-label="Move block down" @click="${()=>this._move("down")}">${W("chevron-down")}</button>
      </div>
      ${t?.valid&&t.rect?l`<div class="drop" style="top:${t.rect.top}px;left:${t.rect.left}px;width:${t.rect.width}px;height:${t.rect.height}px"></div>`:""}
      ${t?l`<div class="ghost" style="left:${t.x}px;top:${t.y}px">${this._label}</div>`:""}
    `}}customElements.define(w2.tag,w2);const f={sep:!0};function Y(o,t=[]){if(!o)return t;for(const e of o.querySelectorAll("*"))t.push(e),e.shadowRoot&&Y(e.shadowRoot,t);return t}function h0(o){if(!o)return null;if(o.localName==="button")return o;const t=[o.shadowRoot];for(;t.length;){const e=t.shift();if(!e)continue;const i=e.querySelector("button");if(i)return i;for(const a of e.querySelectorAll("*"))t.push(a.shadowRoot)}return null}const F2=o=>o&&!o.hidden&&getComputedStyle(o).display!=="none",C=o=>t=>t.find(e=>e.getAttribute?.("event-name")===o),D=(o,t)=>e=>e.find(i=>i.command===o&&(!t||i.label===t)),p0=[{label:"Move up",icon:"arrow-up",find:C("hax-plate-up")},{label:"Move down",icon:"arrow-down",find:C("hax-plate-down")},f,{label:"Insert block above\u2026",icon:"arrow-up-to-line",find:C("insert-above-active"),insert:"above"},{label:"Insert block below\u2026",icon:"arrow-down-to-line",find:C("insert-below-active"),insert:"below"},{label:"Duplicate",icon:"copy",find:C("hax-plate-duplicate")},f,{label:"Add column",icon:"columns-2",find:C("hax-plate-create-right")},{label:"Remove column",icon:"panel-right-close",find:C("hax-plate-remove-right")},f,{label:"Edit HTML",icon:"code",find:C("hax-source-view-toggle")},{label:o=>o.label||"Lock",icon:o=>o.icon==="icons:lock"?"lock":"lock-open",find:o=>o.find(t=>t.localName==="hax-context-item"&&/lock/.test(t.icon||""))},f,{label:"Remove block",icon:"trash-2",danger:!0,find:C("hax-plate-delete")}],m0={p:"pilcrow",h2:"heading-2",h3:"heading-3",h4:"heading-4",h5:"heading-5",h6:"heading-6",blockquote:"quote",pre:"square-code"},c0={pre:"Code block",blockquote:"Quote"},g0=[{picker:"hax-text-editor-heading-picker",icons:m0,labels:c0,checked:"tag"},f,{label:"Bulleted list",icon:"list",find:D("ul")},{label:"Numbered list",icon:"list-ordered",find:D("ol")},{label:"Indent",icon:"indent-increase",find:D("indent"),shortcut:`${F}]`,needs:"In lists"},{label:"Outdent",icon:"indent-decrease",find:D("outdent"),shortcut:`${F}[`,needs:"In lists"},f,{picker:"hax-text-editor-alignment-picker",icons:{"":"align-left",center:"align-center",right:"align-right"},labels:{"":"Align left",center:"Align center",right:"Align right"},checked:"align"}],D0=[{label:"Bold",icon:"bold",find:D("bold"),shortcut:`${F}B`,toggle:!0},{label:"Italic",icon:"italic",find:D("italic"),shortcut:`${F}I`,toggle:!0},{label:"Underline",icon:"underline",find:D("underline"),shortcut:`${F}U`,toggle:!0,selection:!0},{label:"Strikethrough",icon:"strikethrough",find:D("strikeThrough"),toggle:!0,selection:!0},{label:"Highlight",icon:"highlighter",find:D("wrapRange","Highlight"),toggle:!0,selection:!0},{label:"Inline code",icon:"code",find:D("wrapRange","Code"),toggle:!0,selection:!0},{label:"Subscript",icon:"subscript",find:D("subscript"),toggle:!0},{label:"Superscript",icon:"superscript",find:D("superscript"),toggle:!0},{label:"Abbreviation",icon:"whole-word",find:D("wrapRange","Abbreviation"),selection:!0},f,{label:"Link",icon:"link",find:D("createLink"),shortcut:`${F}K`},{label:"Remove link",icon:"unlink",find:D("unlink")},f,{label:"Clear formatting",icon:"remove-formatting",find:D("removeFormat")}],u0=[{label:"Symbol\u2026",icon:"omega",grid:"rich-text-editor-symbol-picker"},{label:"Emoji\u2026",icon:"smile",grid:"rich-text-editor-emoji-picker",filter:!0},f,{label:"Math",icon:"sigma",find:D("insertHTML","Math")},{label:"Vocabulary",icon:"book-a",find:D("insertHTML","Vocab"),selection:!0},{label:"Inline audio",icon:"audio-lines",find:D("insertHTML","Inline audio"),selection:!0},{label:"Sarcasm",icon:"message-square-quote",find:D("insertHTML","Sarcasm"),selection:!0}],v0=[{id:"block",label:"Block",icon:"box",source:"plate",items:p0},{id:"text",label:"Text",icon:"pilcrow",source:"text",items:g0},{id:"format",label:"Format",icon:"type",source:"text",items:D0},{id:"insert",label:"Insert inline",icon:"smile-plus",source:"text",items:u0}],I=o=>l`<span
    class="icon"
    aria-hidden="true"
    style="--src:url(&quot;${k[`oer:${o}`]||""}&quot;)"
  ></span>`,x2=globalThis.document.createElement("textarea"),w0=o=>(x2.innerHTML=o,x2.value);let f2=class extends M{static get tag(){return"oer-block-rail"}static get properties(){return{_cats:{state:!0},_open:{state:!0},_grid:{state:!0},_query:{state:!0}}}constructor(){super(),this._cats=[],this._open=null,this._grid=null,this._query="",this.__tick=this._tick.bind(this),this.__keys=this._globalKeys.bind(this),this.__outside=t=>{this._open&&!t.composedPath().includes(this)&&this._close()}}connectedCallback(){super.connectedCallback(),this.hidden=!0,this.__raf=requestAnimationFrame(this.__tick),globalThis.addEventListener("keydown",this.__keys,!0),globalThis.addEventListener("pointerdown",this.__outside,!0)}disconnectedCallback(){cancelAnimationFrame(this.__raf),globalThis.removeEventListener("keydown",this.__keys,!0),globalThis.removeEventListener("pointerdown",this.__outside,!0),super.disconnectedCallback()}get _hax(){return globalThis.HaxStore?.requestAvailability?.()}_stock(){const t=this._hax?.activeHaxBody?.shadowRoot,e=t?.querySelector("hax-plate-context"),i=t?.querySelector("hax-text-editor-toolbar");return{plate:e,text:F2(i)?i:null}}_tick(){this.__raf=requestAnimationFrame(this.__tick);const t=b.editMode?this._hax?.activeNode:null;if(!t||!t.isConnected||t.localName==="page-break"){this.hidden||this._hide();return}const e=t.getBoundingClientRect(),i=this._stock(),a=`${t.localName}|${!!i.plate}|${!!i.text}`;(t!==this.__node||a!==this.__key)&&(t!==this.__node&&this._close(),this.__node=t,this.__key=a,this._cats=v0.filter(v=>i[v.source]));const r=this.shadowRoot?.querySelector(".rail"),n=r?.offsetHeight||0,s=T(),p=s.top+8,d=c2(t);let m=d.top;if(m<p&&(m=Math.max(Math.min(p,d.bottom-n),d.top)),(d.bottom<p||d.top>s.bottom||e.width===0)&&!this._open){this.hidden=!0;return}this.hidden=!1;const c=Math.round(d.left-L-8-(r?.offsetWidth||42));this.style.transform=`translate(${c}px, ${Math.round(m)}px)`}_hide(){this._close(),this.hidden=!0,this.__node=null}_items(t){const e=this._stock()[t.source];if(!e)return[];const i=[e,...Y(e),...Y(e.shadowRoot)],a=[];for(const r of t.items){if(r.sep){a.length&&!a[a.length-1].sep&&a.push(f);continue}if(r.picker){const d=i.find(c=>c.localName===r.picker);if(!d)continue;const m=this._pickerCurrent(r);for(const c of(d.options||[]).flat())!c||c.value===null||c.value===void 0||a.push({label:r.labels?.[c.value]||c.alt,icon:r.icons?.[c.value]||"pilcrow",checked:m===c.value,run:()=>d._pickerChange?.({detail:{value:c.value}})});continue}if(r.grid){const d=i.find(m=>m.localName===r.grid);if(!d)continue;a.push({label:r.label,icon:r.icon,submenu:!0,run:()=>this._openGrid(r,d)});continue}const n=r.find(i);if(!n)continue;const s=F2(n),p=r.needs||(r.selection?"Select text":"");!s&&!p||a.push({label:typeof r.label=="function"?r.label(n):r.label,icon:typeof r.icon=="function"?r.icon(n):r.icon,shortcut:r.shortcut,danger:r.danger,disabled:!s,hint:s?"":p,pressed:r.toggle&&s?!!n.toggled:void 0,run:r.insert?()=>globalThis.document.querySelector("oer-block-inserter")?.openFor(this._hax.activeNode,r.insert):()=>h0(n)?.click()})}for(;a.length&&a[a.length-1].sep;)a.pop();return a}_pickerCurrent(t){const e=this._hax?.activeNode;if(e){if(t.checked==="tag")return e.localName;if(t.checked==="align"){const i=e.style?.textAlign||"";return i==="left"?"":i}}}_toggle(t,e){if(this._open?.id===t.id&&!this._grid){this._close();return}this._grid=null,this._query="",this._open={...t,items:this._items(t),y:e?.currentTarget?.offsetTop??0}}_close(t=!1){const e=this._open?.id;this._open=null,this._grid=null,this._query="",t&&e&&this.updateComplete.then(()=>this.shadowRoot.querySelector(`[data-cat="${e}"]`)?.focus())}_openGrid(t,e){const i=(e.shadowRoot?.querySelector("simple-symbol-picker, simple-emoji-picker, simple-picker")?.options||[]).flat().filter(a=>a&&a.value);this._grid={label:t.label.replace("\u2026",""),filter:t.filter,options:i,el:e},this.updateComplete.then(()=>{this.shadowRoot.querySelector(".grid input, .grid button")?.focus()})}_run(t){if(!(t.disabled||t.sep)){if(t.submenu){t.run();return}t.run(),this._close()}}_insertGlyph(t){this._grid.el._pickerChange?.({detail:{value:t.value}}),this._close()}_globalKeys(t){this.hidden||t.altKey&&t.key==="F10"&&(t.preventDefault(),t.stopPropagation(),this.shadowRoot.querySelector(".rail button")?.focus())}_railKeys(t){const e=[...this.shadowRoot.querySelectorAll(".rail button")],i=e.indexOf(this.shadowRoot.activeElement),a=r=>e[(i+r+e.length)%e.length]?.focus();if(t.key==="ArrowDown")a(1);else if(t.key==="ArrowUp")a(-1);else if(t.key==="Home")e[0]?.focus();else if(t.key==="End")e[e.length-1]?.focus();else if(t.key==="ArrowRight"){const r=this._cats[i];r&&this._open?.id!==r.id&&this._toggle(r,{currentTarget:e[i]}),this._focusMenu()}else if(t.key==="Escape")this._open?this._close():this._hax?.activeNode?.focus?.();else return;t.preventDefault()}_focusMenu(){this.updateComplete.then(()=>this.shadowRoot.querySelector(".menu [role^=menuitem]:not([aria-disabled=true])")?.focus())}_menuKeys(t){const e=[...this.shadowRoot.querySelectorAll(".menu [role^=menuitem]")],i=e.indexOf(this.shadowRoot.activeElement),a=r=>e[(i+r+e.length)%e.length]?.focus();if(t.key==="ArrowDown")a(1);else if(t.key==="ArrowUp")a(-1);else if(t.key==="Home")e[0]?.focus();else if(t.key==="End")e[e.length-1]?.focus();else if(t.key==="Escape"||t.key==="ArrowLeft")this._close(!0);else if(t.key==="Tab")this._close();else return;t.preventDefault()}_gridKeys(t){const e=[...this.shadowRoot.querySelectorAll(".cells button")],i=e.indexOf(this.shadowRoot.activeElement),a=8,r=n=>{t.preventDefault(),e[Math.max(0,Math.min(e.length-1,n))]?.focus()};t.key==="Escape"?(t.preventDefault(),this._grid=null,this._focusMenu()):i<0?t.key==="ArrowDown"&&r(0):t.key==="ArrowRight"?r(i+1):t.key==="ArrowLeft"?r(i-1):t.key==="ArrowDown"?r(i+a):t.key==="ArrowUp"&&(i<a?(t.preventDefault(),this.shadowRoot.querySelector(".grid input")?.focus()):r(i-a))}_keepSelection(t){t.target.closest?.("input")||t.preventDefault()}updated(){const t=this.shadowRoot.querySelector(".menu");if(!t)return;const e=t.getBoundingClientRect().bottom-(globalThis.innerHeight-8);e>0&&(t.style.top=`${Math.max(t.offsetTop-e,8-this.getBoundingClientRect().top)}px`)}static get styles(){return h`
      :host {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9991;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--popover-foreground);
      }
      :host([hidden]) {
        display: none;
      }
      .rail {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        padding: 0.25rem;
        background: var(--popover);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 1px 3px rgb(0 0 0 / 0.08);
      }
      button {
        all: unset;
        box-sizing: border-box;
        cursor: pointer;
      }
      button:focus-visible,
      [role^="menuitem"]:focus-visible,
      input:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .rail button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md);
        color: var(--foreground);
      }
      .rail button:hover,
      .rail button[aria-expanded="true"] {
        background: var(--accent);
        color: var(--accent-foreground);
      }
      .icon {
        flex: none;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }

      /* shadcn DropdownMenu */
      .menu {
        position: absolute;
        left: calc(100% + 0.5rem);
        min-width: 14rem;
        max-height: min(28rem, calc(100dvh - 2rem));
        overflow-y: auto;
        box-sizing: border-box;
        padding: 0.25rem;
        background: var(--popover);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
      }
      .label {
        padding: 0.375rem 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--muted-foreground);
      }
      .sep {
        height: 1px;
        margin: 0.25rem -0.25rem;
        background: var(--border);
      }
      [role^="menuitem"] {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        height: 2rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.875rem;
        line-height: 1.25rem;
        white-space: nowrap;
      }
      [role^="menuitem"]:hover,
      [role^="menuitem"]:focus-visible {
        background: var(--accent);
        color: var(--accent-foreground);
      }
      [role^="menuitem"][aria-disabled="true"] {
        cursor: default;
        color: var(--muted-foreground);
        background: transparent;
      }
      [role^="menuitem"].danger {
        color: var(--destructive);
      }
      [role^="menuitem"].danger:hover,
      [role^="menuitem"].danger:focus-visible {
        background: color-mix(in oklch, var(--destructive) 10%, transparent);
      }
      .text {
        flex: 1;
      }
      .end {
        margin-left: auto;
        padding-left: 1rem;
        font-size: 0.75rem;
        letter-spacing: 0.05em;
        color: var(--muted-foreground);
      }
      .check {
        width: 1rem;
        height: 1rem;
      }

      /* symbol / emoji grid */
      .grid input {
        box-sizing: border-box;
        width: 100%;
        height: 2rem;
        margin: 0 0 0.25rem;
        padding: 0 0.5rem;
        border: 1px solid var(--input-border);
        border-radius: var(--radius-md);
        background: var(--background);
        color: var(--foreground);
        font: inherit;
        font-size: 0.875rem;
      }
      .cells {
        display: grid;
        grid-template-columns: repeat(8, 2rem);
        gap: 0.125rem;
      }
      .cells button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-sm);
        font-size: 1.125rem;
      }
      .cells button:hover {
        background: var(--accent);
      }
      .empty {
        padding: 0.5rem;
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
    `}_renderItem(t){if(t.sep)return l`<div class="sep" role="separator"></div>`;const e=t.checked!==void 0?"menuitemradio":t.pressed!==void 0?"menuitemcheckbox":"menuitem",i=t.checked??t.pressed;return l`<button
      role="${e}"
      class="${t.danger?"danger":""}"
      tabindex="-1"
      aria-checked="${i===void 0?"":String(!!i)}"
      aria-disabled="${t.disabled?"true":"false"}"
      aria-haspopup="${t.submenu?"true":"false"}"
      @click="${()=>this._run(t)}"
    >
      ${I(t.icon)}
      <span class="text">${t.label}</span>
      ${t.hint?l`<span class="end">${t.hint}</span>`:t.shortcut?l`<span class="end">${t.shortcut}</span>`:""}
      ${i?l`<span class="check">${I("check")}</span>`:""}
      ${t.submenu?I("chevron-right"):""}
    </button>`}_renderGrid(){const t=this._grid,e=this._query.trim().toLowerCase(),i=e?t.options.filter(a=>(a.description||"").toLowerCase().includes(e)):t.options;return l`<div class="menu grid" style="top:${this._open.y}px" role="dialog" aria-label="${t.label}" @keydown="${this._gridKeys}">
      <div class="label">${t.label}</div>
      ${t.filter?l`<input
            type="search"
            placeholder="Search ${t.label.toLowerCase()}…"
            aria-label="Search ${t.label.toLowerCase()}"
            .value="${this._query}"
            @input="${a=>this._query=a.target.value}"
          />`:""}
      <div class="cells" role="group" aria-label="${t.label}">
        ${i.map(a=>{const r=w0(a.value),n=a.description||r;return l`<button title="${n}" aria-label="${n}" @click="${()=>this._insertGlyph(a)}">${r}</button>`})}
      </div>
      ${i.length?"":l`<div class="empty">No matches</div>`}
    </div>`}render(){const t=this._open;return l`
      <div class="wrap" @mousedown="${this._keepSelection}">
        <div class="rail" role="toolbar" aria-label="Block tools" aria-orientation="vertical" @keydown="${this._railKeys}">
          ${this._cats.map((e,i)=>l`<button
              data-cat="${e.id}"
              tabindex="${i===0?0:-1}"
              title="${e.label}"
              aria-label="${e.label}"
              aria-haspopup="menu"
              aria-expanded="${t?.id===e.id?"true":"false"}"
              @click="${a=>this._toggle(e,a)}"
            >
              ${I(e.icon)}
            </button>`)}
        </div>
        ${t&&this._grid?this._renderGrid():t?l`<div class="menu" role="menu" aria-label="${t.label}" style="top:${t.y}px" @keydown="${this._menuKeys}">
                <div class="label">${t.label}</div>
                ${t.items.map(e=>this._renderItem(e))}
              </div>`:""}
      </div>
    `}};customElements.define(f2.tag,f2);const P=288,Z=288,b2=o=>l`<span class="icon" aria-hidden="true" style="--src:url(&quot;${k[`oer:${o}`]||""}&quot;)"></span>`;class k2 extends M{static get tag(){return"oer-block-inserter"}static get properties(){return{_hover:{state:!0},_end:{state:!0},_open:{state:!0},_query:{state:!0},_active:{state:!0}}}constructor(){super(),this._hover=null,this._end=null,this._open=null,this._query="",this._active=0,this.__tick=this._tick.bind(this),this.__move=t=>{this.__pointer={x:t.clientX,y:t.clientY}},this.__outside=t=>{this._open&&!t.composedPath().includes(this)&&this.close()}}connectedCallback(){super.connectedCallback(),this.__raf=requestAnimationFrame(this.__tick),globalThis.addEventListener("pointermove",this.__move,{passive:!0}),globalThis.addEventListener("pointerdown",this.__outside,!0)}disconnectedCallback(){cancelAnimationFrame(this.__raf),globalThis.removeEventListener("pointermove",this.__move),globalThis.removeEventListener("pointerdown",this.__outside,!0),super.disconnectedCallback()}get _hax(){return globalThis.HaxStore?.requestAvailability?.()}_blocks(){const t=this._hax?.activeHaxBody;return t?[...t.children].filter(e=>e.localName!=="page-break"&&e.getClientRects().length):[]}_tick(){this.__raf=requestAnimationFrame(this.__tick);const t=b.editMode?this._hax?.activeHaxBody:null;if(!t||!t.isConnected){(this._hover||this._end||this._open)&&(this._hover=this._end=null,this.close());return}const e=t.getBoundingClientRect(),i=T(),a=d=>d>i.top+4&&d<i.bottom-4,r=this._blocks().map(d=>d.getBoundingClientRect()),n=r.length?r[r.length-1].bottom:e.top;let s={y:Math.round(n+8),left:Math.round(e.left),width:Math.round(e.width)};(!a(s.y)||!a(s.y+36))&&(s=null),!(s&&this._end&&this._end.y===s.y&&this._end.left===s.left&&this._end.width===s.width)&&(s||this._end)&&(this._end=s);let p=null;if(!globalThis.__oerDragging){const d=V(t).filter(m=>!m.end);if(this._open)this._open.slot.end||(p=d.find(m=>G(m,this._open.slot))||null);else if(this.__pointer){const m=D2(d,this.__pointer.x,this.__pointer.y,{gutter:72});m&&a(m.top+m.height/2)&&(p=m)}}p&&(p={...p,top:Math.round(p.top),height:Math.round(p.height),left:Math.round(p.left),width:Math.round(p.width)}),!(p&&this._hover&&G(p,this._hover)&&["top","height","left","width"].every(d=>p[d]===this._hover[d]))&&(p||this._hover)&&(this._hover=p)}openAt(t,e){this._query="",this._active=0,this._open={slot:t,x:e.x,y:e.y},this.updateComplete.then(()=>this.shadowRoot.querySelector(".panel input")?.focus())}_endSlot(){return V(this._hax?.activeHaxBody).find(t=>t.end)}openFor(t,e){const i=V(this._hax?.activeHaxBody).find(r=>e==="below"?r.after===t:r.before===t);if(!i)return;const a=t.getBoundingClientRect();this.openAt(i,{x:a.left+12,y:e==="below"?a.bottom:a.top})}close(){this._open&&(this._open=null)}_gizmos(){const t=this._hax,e=t?.haxTray?.shadowRoot?.querySelector("hax-gizmo-browser"),i=c=>e?._gizmoAllowedInTray?e._gizmoAllowedInTray(c):!!c?.tag,a=(t?.gizmoList||[]).filter(i),r=t?.platformAllows?.("blockTemplates")===!1?[]:(t?.staxList||[]).filter(c=>c?.stax?.length).map(c=>({stax:c.stax,title:c.details?.title||"Template",description:c.details?.description||"",image:c.details?.image||"",icon:c.details?.icon||"hax:templates",tags:c.details?.tags||[]})),n=this._query.trim().toLowerCase();if(n){const c=v=>[v.title,v.tag,v.description,...v.tags||[]].join(" ").toLowerCase().includes(n);return[{label:"Blocks",items:a.filter(c)},{label:"Templates",items:r.filter(c)}].filter(v=>v.items.length)}const s=[],p=(e?.recentGizmoList||[]).filter(i).slice().reverse();p.length&&s.push({label:"Recent",items:p});const d=(e?.popularGizmoList||[]).filter(i);d.length&&s.push({label:"Popular",items:d});const m=e?.updateCategories?e.updateCategories(a):[];for(const c of m){const v=a.filter(E=>(E.tags?.[0]||"Other")===c).sort((E,_2)=>E.title.localeCompare(_2.title));v.length&&s.push({label:c,items:v})}return r.length&&s.push({label:"Templates",items:r}),s}async _insert(t){const e=this._hax;if(!e?.activeHaxBody||!t||!this._open)return;const i=this._open.slot;this.close();let a=null;if(t.stax){let r=i;for(const n of t.stax){const s=await v2(e,r,n);if(!s)break;a=a||s,r={...i,after:s,before:null}}}else{const r=e.haxSchemaFromTag(t.tag),n=r?.demoSchema?.[0]||e.haxElementPrototype({tag:t.tag},{},"");e.recentGizmoList?.push?.(r?.gizmo||t),a=await v2(e,i,n)}a&&(e.activeNode=a,a.focus?.(),a.scrollIntoView?.({block:"nearest"}))}_flat(){return this._gizmos().flatMap(t=>t.items)}_panelKeys(t){const e=this._flat();if(t.key==="ArrowDown")this._active=Math.min(this._active+1,e.length-1);else if(t.key==="ArrowUp")this._active=Math.max(this._active-1,0);else if(t.key==="Home"&&t.target.localName!=="input")this._active=0;else if(t.key==="End"&&t.target.localName!=="input")this._active=e.length-1;else if(t.key==="Enter")this._insert(e[this._active]);else if(t.key==="Escape")this.close();else return;t.preventDefault(),this.updateComplete.then(()=>this.shadowRoot.querySelector(`[data-i="${this._active}"]`)?.scrollIntoView({block:"nearest"}))}static get styles(){return h`
      :host {
        position: fixed;
        inset: 0 auto auto 0;
        z-index: 9989;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--popover-foreground);
        pointer-events: none;
      }
      button {
        all: unset;
        box-sizing: border-box;
        cursor: pointer;
      }
      button:focus-visible,
      input:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .icon {
        flex: none;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }

      /* the empty slot between blocks, highlighted on hover / while chosen */
      .slot {
        pointer-events: auto;
        position: fixed;
        box-sizing: border-box;
        border: 1px dashed var(--primary);
        border-radius: var(--radius-sm);
        background: color-mix(in oklch, var(--primary) 8%, transparent);
      }
      .slot.chosen {
        border-style: solid;
        background: color-mix(in oklch, var(--primary) 14%, transparent);
      }
      .plus {
        position: absolute;
        left: -0.75rem;
        top: 50%;
        margin-top: -0.75rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 999px;
        background: var(--primary);
        color: var(--primary-foreground);
        box-shadow: 0 0 0 2px var(--background);
      }
      .plus .icon {
        width: 0.875rem;
        height: 0.875rem;
      }

      /* persistent "Add block" row after the last block */
      .end {
        pointer-events: auto;
        position: fixed;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-sizing: border-box;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px dashed var(--input-border);
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      .end.chosen,
      .end:hover {
        border-color: var(--primary);
        color: var(--foreground);
        background: var(--accent);
      }

      /* flyout: shadcn Command in a Popover */
      .panel,
      .preview {
        pointer-events: auto;
        position: fixed;
        box-sizing: border-box;
        background: var(--popover);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 8px 24px rgb(0 0 0 / 0.14);
      }
      .panel {
        display: flex;
        flex-direction: column;
        width: ${P}px;
        max-height: min(30rem, calc(100dvh - 1rem));
        overflow: hidden;
      }
      .search {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0 0.75rem;
        border-bottom: 1px solid var(--border);
        color: var(--muted-foreground);
      }
      .search input {
        flex: 1;
        min-width: 0;
        height: 2.5rem;
        border: 0;
        outline: none;
        background: transparent;
        color: var(--foreground);
        font: inherit;
        font-size: 0.875rem;
      }
      .search input::placeholder {
        color: var(--muted-foreground);
      }
      .list {
        overflow-y: auto;
        padding: 0.25rem;
      }
      .group + .group {
        border-top: 1px solid var(--border);
        margin: 0.25rem -0.25rem 0;
        padding: 0.25rem 0.25rem 0;
      }
      .heading {
        padding: 0.375rem 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--muted-foreground);
      }
      [role="option"] {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        height: 2rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.875rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      [role="option"][aria-selected="true"] {
        background: var(--accent);
        color: var(--accent-foreground);
      }
      simple-icon-lite {
        flex: none;
        --simple-icon-height: 1rem;
        --simple-icon-width: 1rem;
        color: var(--muted-foreground);
      }
      .empty {
        padding: 1.5rem 0.5rem;
        text-align: center;
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      .preview {
        width: ${Z}px;
        overflow: hidden;
      }
      .tpl ol {
        margin: 0;
        padding: 1rem 1rem 1rem 2.25rem;
        background: var(--muted);
        border-bottom: 1px solid var(--border);
        font-size: 0.875rem;
      }
      .tpl img {
        display: block;
        width: 100%;
        max-height: 9rem;
        object-fit: cover;
        border-bottom: 1px solid var(--border);
      }
      .tpl-info {
        padding: 0.75rem 1rem;
      }
      .tpl-title {
        font-size: 0.875rem;
        font-weight: 600;
      }
      .tpl-desc {
        margin-top: 0.25rem;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
    `}_renderPanel(){const t=this._open,e=this._gizmos(),i=e.flatMap(m=>m.items),a=i[Math.min(this._active,i.length-1)],r=globalThis.innerWidth,n=Math.max(8,Math.min(t.x+16,r-P-8)),s=Math.max(8,t.y-20),p=n+P+8+Z<=r-8?n+P+8:n-Z-8;let d=-1;return l`
      <div class="panel" style="left:${n}px;top:${s}px" @keydown="${this._panelKeys}">
        <div class="search">
          <simple-icon-lite icon="icons:search"></simple-icon-lite>
          <input
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="blocks"
            aria-activedescendant="${a?`b${this._active}`:""}"
            aria-label="Search blocks"
            placeholder="Search blocks…"
            .value="${this._query}"
            @input="${m=>{this._query=m.target.value,this._active=0}}"
          />
        </div>
        <div class="list" id="blocks" role="listbox" aria-label="Blocks">
          ${i.length?e.map(m=>l`<div class="group" role="group" aria-label="${m.label}">
                  <div class="heading" aria-hidden="true">${m.label}</div>
                  ${m.items.map(c=>{d+=1;const v=d;return l`<button
                      id="b${v}"
                      data-i="${v}"
                      role="option"
                      tabindex="-1"
                      aria-selected="${v===this._active?"true":"false"}"
                      @mouseenter="${()=>this._active=v}"
                      @mousedown="${E=>E.preventDefault()}"
                      @click="${()=>this._insert(c)}"
                    >
                      <simple-icon-lite icon="${c.icon||"hax:add-brick"}"></simple-icon-lite>
                      <span>${c.title}</span>
                    </button>`})}
                </div>`):l`<div class="empty">No blocks found</div>`}
        </div>
      </div>
      ${a?l`<div class="preview" style="left:${p}px;top:${s}px" aria-hidden="true">
            ${a.stax?this._renderTemplatePreview(a):l`<hax-element-demo
              .renderTag="${a.tag}"
              .gizmoTitle="${a.title}"
              .gizmoIcon="${a.icon}"
              .gizmoDescription="${a.description||""}"
            ></hax-element-demo>`}
          </div>`:""}
    `}_renderTemplatePreview(t){const e=this._hax,i=t.stax.map(a=>e?.haxSchemaFromTag(a.tag)?.gizmo?.title||a.tag);return l`<div class="tpl">
      ${t.image?l`<img src="${t.image}" alt="" />`:l`<ol>${i.map(a=>l`<li>${a}</li>`)}</ol>`}
      <div class="tpl-info">
        <div class="tpl-title">${t.title}</div>
        <div class="tpl-desc">${t.description||`${i.length} block${i.length===1?"":"s"}`}</div>
      </div>
    </div>`}updated(){const t=globalThis.innerHeight;for(const e of this.shadowRoot.querySelectorAll(".panel, .preview")){const i=e.getBoundingClientRect();i.bottom>t-8&&(e.style.top=`${Math.max(8,i.top-(i.bottom-(t-8)))}px`)}}render(){const t=this._hover,e=this._end;return l`
      ${t?l`<button
            class="slot ${this._open?"chosen":""}"
            style="left:${t.left}px;top:${t.top}px;width:${t.width}px;height:${t.height}px"
            tabindex="-1"
            title="Insert block here"
            aria-label="Insert block here"
            @click="${()=>this.openAt(t,{x:t.left,y:t.top+t.height/2})}"
          >
            <span class="plus">${b2("plus")}</span>
          </button>`:""}
      ${e?l`<button
            class="end ${this._open?.slot.end?"chosen":""}"
            style="left:${e.left}px;top:${e.y}px;width:${e.width}px"
            aria-haspopup="listbox"
            @click="${()=>{const i=this._endSlot();i&&this.openAt(i,{x:e.left,y:e.y})}}"
          >
            ${b2("plus")} Add block
          </button>`:""}
      ${this._open?this._renderPanel():""}
    `}}customElements.define(k2.tag,k2),j2(),T2(),L2(),r2(I2),J2(),t0(),a0();function C2(){const o=globalThis.document,t=o.querySelector("haxcms-site-editor-ui");if(t){if(!t.hasAttribute("data-oer-hidden")){t.setAttribute("data-oer-hidden",""),t.setAttribute("aria-hidden","true"),t.inert=!0;for(const[e,i]of[["height","0"],["min-height","0"],["overflow","hidden"],["opacity","0"],["pointer-events","none"]])t.style.setProperty(e,i,"important")}for(const e of["oer-block-frame","oer-block-rail","oer-block-inserter"])o.querySelector(e)||o.body.append(o.createElement(e))}else o.querySelector("oer-block-frame")?.remove(),o.querySelector("oer-block-rail")?.remove(),o.querySelector("oer-block-inserter")?.remove()}new MutationObserver(C2).observe(globalThis.document.body,{childList:!0}),C2();const F0=h`
  :root {
    --background: light-dark(oklch(1 0 0), oklch(0 0 0));
    --foreground: light-dark(oklch(0.1884 0.0128 248.5103), oklch(0.9328 0.0025 228.7857));
    --card: light-dark(oklch(0.9784 0.0011 197.1387), oklch(0.2097 0.008 274.5332));
    --card-foreground: light-dark(oklch(0.1884 0.0128 248.5103), oklch(0.8853 0 0));
    --popover: light-dark(oklch(1 0 0), oklch(0 0 0));
    --popover-foreground: light-dark(oklch(0.1884 0.0128 248.5103), oklch(0.9328 0.0025 228.7857));
    --primary: light-dark(oklch(0.53 0.14 245), oklch(0.6692 0.1607 245.011));
    --primary-foreground: light-dark(oklch(1 0 0), oklch(0.1884 0.0128 248.5103));
    --secondary: light-dark(oklch(0.1884 0.0128 248.5103), oklch(0.9622 0.0035 219.5331));
    --secondary-foreground: light-dark(oklch(1 0 0), oklch(0.1884 0.0128 248.5103));
    --muted: light-dark(oklch(0.9222 0.0013 286.3737), oklch(0.209 0 0));
    --muted-foreground: light-dark(oklch(0.45 0.0128 248.5103), oklch(0.66 0.008 248));
    --accent: light-dark(oklch(0.9392 0.0166 250.8453), oklch(0.1928 0.0331 242.5459));
    --accent-foreground: light-dark(oklch(0.5 0.13 245), oklch(0.6692 0.1607 245.011));
    --link: light-dark(oklch(0.53 0.14 245), oklch(0.72 0.14 245));
    --destructive: oklch(0.57 0.23 25.7658);
    --destructive-foreground: oklch(1 0 0);
    --border: light-dark(oklch(0.9317 0.0118 231.6594), oklch(0.2674 0.0047 248.0045));
    --input: light-dark(oklch(0.9809 0.0025 228.7836), oklch(0.302 0.0288 244.8244));
    --ring: light-dark(oklch(0.6 0.16 243.354), oklch(0.6818 0.1584 243.354));
    --input-border: light-dark(oklch(0.64 0.012 240), oklch(0.54 0.012 240));

    --radius: 0.625rem;
    --radius-lg: var(--radius);
    --radius-md: calc(var(--radius) - 2px);
    --radius-sm: calc(var(--radius) - 4px);

    --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;

    --sidebar-width: 16rem;
    --editor-panel-width: 20rem;
    --topbar-height: 3.5rem;
  }
`,x0=h`
  /* :root:root out-ranks DDD's own :root declarations, which load after ours */
  :root:root {
    /* semantic colour */
    --ddd-theme-primary: var(--primary);
    --ddd-theme-accent: var(--accent);
    --ddd-theme-default-link: var(--link);
    --ddd-theme-default-link80: var(--link);
    --ddd-theme-default-background: var(--background);
    --ddd-theme-default-error: var(--destructive);
    --ddd-theme-header-border-color: var(--border);

    /* type. DDD sets :root { font-size: var(--ddd-theme-body-font-size) },
       which is 20px by default and makes every rem 25% larger than the
       16px scale shadcn sizes assume */
    --ddd-theme-body-font-size: 16px;
    --ddd-font-primary: var(--font-sans);
    --ddd-font-secondary: var(--font-sans);
    --ddd-font-navigation: var(--font-sans);

    /* shape */
    --ddd-radius-xs: var(--radius-sm);
    --ddd-radius-sm: var(--radius-sm);
    --ddd-radius-md: var(--radius-md);
    --ddd-radius-lg: var(--radius-lg);
    --ddd-border-sm: 1px solid var(--border);
    --ddd-border-md: 1px solid var(--border);

    /* site-menu / map-menu */
    --site-menu-color: var(--foreground);
    --site-menu-background-color: transparent;
    --site-menu-container-background-color: transparent;
    --map-menu-item-a-color: var(--muted-foreground);
    --map-menu-item-a-active-color: var(--foreground);
    --map-menu-item-a-active-background-color: var(--accent);
    --map-menu-item-border-radius: var(--radius-md);
    --map-menu-item-a-text-decoration: none;
    --map-menu-header-a-text-decoration: none;
    --map-menu-font-size: 0.875rem;
    --site-breadcrumb-last-color: var(--foreground);
  }

  /* HAX editor UI tokens. hax-body appends its own body{} and
     body[hax-ui-theme=...]{} blocks at the end of <body>, so these need
     at least that specificity */
  html body,
  html body[hax-ui-theme] {
    --hax-ui-font-family: var(--font-sans);
    --hax-ui-font-size-xs: 0.6875rem;
    --hax-ui-font-size-sm: 0.75rem;
    --hax-ui-font-size: 0.875rem;
    --hax-ui-font-size-lg: 1rem;
    --hax-ui-font-size-xl: 1.125rem;
    --hax-ui-spacing-xs: 0.25rem;
    --hax-ui-spacing-sm: 0.5rem;
    --hax-ui-spacing: 0.75rem;
    --hax-ui-spacing-lg: 1rem;
    --hax-ui-spacing-xl: 1.5rem;
    --hax-ui-color: var(--foreground);
    --hax-ui-color-faded: var(--muted-foreground);
    --hax-ui-color-accent: var(--primary);
    --hax-ui-color-accent-secondary: var(--accent-foreground);
    --hax-ui-color-focus: var(--primary);
    --hax-ui-color-hover: color-mix(in oklch, var(--ring) 45%, transparent);
    --hax-ui-color-danger: var(--destructive);
    --hax-ui-color-danger-secondary: var(--destructive-foreground);
    --hax-ui-background-color: var(--background);
    --hax-ui-background-color-secondary: var(--muted);
    --hax-ui-background-color-accent: var(--accent);
    --hax-ui-background-color-faded: var(--muted);
    --hax-ui-background-color-danger: color-mix(in oklch, var(--destructive) 12%, var(--background));
    --hax-ui-border-color: var(--border);
    --hax-ui-border-radius: var(--radius-md);
    --hax-ui-disabled-color: var(--muted-foreground);

    /* toolbar chrome defaults to a hard-coded #ddd border */
    --simple-toolbar-border-color: var(--border);
    --simple-toolbar-button-border-color: transparent;

    /* a11y-collapse as shadcn Accordion (editor panels and content) */
    --a11y-collapse-border: 0;
    --a11y-collapse-border-between: 1px solid var(--border);
    --a11y-collapse-border-color: var(--border);
    --a11y-collapse-heading-background-color: transparent;
    --a11y-collapse-heading-color: var(--foreground);
    --a11y-collapse-heading-font-weight: 500;
    --a11y-collapse-horizontal-padding: 0;
    --a11y-collapse-vertical-padding: 1rem;
    --a11y-collapse-margin: 0;
  }

  /* tier 2: editor chrome only */
  haxcms-site-editor-ui,
  hax-tray,
  super-daemon,
  page-break,
  hax-body,
  simple-modal {
    --ddd-theme-default-skyBlue: var(--primary);
    --ddd-theme-default-coalyGray: var(--foreground);
    --ddd-theme-default-limestoneGray: var(--muted);
    --ddd-theme-default-white: var(--background);
    --ddd-theme-default-error: var(--destructive);
  }

  body {
    background-color: var(--background);
    color: var(--foreground);
    font-family: var(--font-sans);
  }
`;let E2=class extends M{static get tag(){return"oer-command-search"}static get properties(){return{open:{type:Boolean,reflect:!0}}}constructor(){super(),this.open=!1,this.__outside=t=>{this.open&&!t.composedPath().includes(this)&&(this.open=!1)}}connectedCallback(){super.connectedCallback(),globalThis.addEventListener("pointerdown",this.__outside)}disconnectedCallback(){globalThis.removeEventListener("pointerdown",this.__outside),super.disconnectedCallback()}updated(t){t.has("open")&&this.open&&this.shadowRoot.querySelector("input")?.focus()}_input(t){const e=t.target.value;e&&(t.target.value="",this.open=!1,U(e))}_keydown(t){t.key==="Escape"?(t.preventDefault(),this.open=!1,this.shadowRoot.querySelector("button")?.focus()):t.key==="Enter"&&!t.target.value&&(t.preventDefault(),this.open=!1,U())}static get styles(){return h`
      :host {
        display: inline-flex;
      }
      .search {
        display: flex;
        align-items: center;
        width: 2rem;
        height: 2rem;
        border: 1px solid transparent;
        border-radius: var(--radius-md);
        overflow: hidden;
        transition: width 180ms ease-out, border-color 180ms ease-out;
      }
      :host([open]) .search {
        width: min(18rem, 40vw);
        border-color: var(--input-border);
        background: var(--background);
      }
      .search:focus-within {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
      button {
        all: unset;
        flex: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md);
        color: var(--foreground);
        cursor: pointer;
      }
      button:hover {
        background: var(--accent);
        color: var(--accent-foreground);
      }
      :host([open]) button {
        color: var(--muted-foreground);
        background: transparent;
      }
      .icon {
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      input {
        flex: 1;
        min-width: 0;
        height: 100%;
        padding: 0 0.5rem 0 0;
        border: 0;
        outline: none;
        background: transparent;
        color: var(--foreground);
        font: inherit;
        font-size: 0.875rem;
        opacity: 0;
      }
      :host([open]) input {
        opacity: 1;
      }
      input::placeholder {
        color: var(--muted-foreground);
      }
      /* honour the OS "reduce motion" setting */
      @media (prefers-reduced-motion: reduce) {
        .search {
          transition: none;
        }
      }
    `}render(){return l`
      <div class="search" role="search">
        <button
          aria-expanded="${this.open}"
          aria-controls="q"
          title="Search or run a command (${Z2})"
          aria-label="Search or run a command"
          @click="${()=>this.open=!this.open}"
        >
          <span
            class="icon"
            aria-hidden="true"
            style="--src:url(&quot;${k["icons:search"]}&quot;)"
          ></span>
        </button>
        <input
          id="q"
          type="search"
          placeholder="Search or run a command…"
          aria-label="Search or run a command"
          tabindex="${this.open?0:-1}"
          @input="${this._input}"
          @keydown="${this._keydown}"
        />
      </div>
    `}};customElements.define(E2.tag,E2);const y2=O(`url("${k["icons:chevron-right"]}")`),f0={"map-menu-item, map-menu-header":h`
    :host {
      font-family: var(--font-sans) !important;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      --simple-icon-color: var(--muted-foreground);
    }
    a {
      text-decoration: none !important;
      color: inherit !important;
    }
    button {
      display: flex !important;
      align-items: center !important;
      gap: 0.5rem !important;
      width: 100% !important;
      min-height: 2rem !important;
      margin: 0 !important;
      padding: 0.375rem 0.5rem !important;
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
      font-weight: 400 !important;
      line-height: 1.25rem !important;
      text-align: start !important;
      color: var(--muted-foreground) !important;
      background: transparent !important;
      border: 0 !important;
      border-radius: var(--radius-md) !important;
      cursor: pointer;
    }
    button:hover {
      background: var(--accent) !important;
      color: var(--foreground) !important;
    }
    /* "selected" is set on every visible row; "active" marks the page */
    :host([active]) button,
    button[aria-current="page"] {
      background: var(--accent) !important;
      color: var(--foreground) !important;
      font-weight: 500 !important;
    }
    button:focus-visible {
      outline: 2px solid var(--ring) !important;
      outline-offset: -2px !important;
    }
    /* shadcn SidebarMenuSub rows: h-7, no icons; the sub-menu's own rule
       replaces HAX's per-item left border */
    :host([is-nested]) {
      border-left: 0 !important;
      margin-left: 0 !important;
    }
    :host([is-nested]) button {
      min-height: 1.75rem !important;
      padding: 0.25rem 0.5rem !important;
    }
    :host([is-nested]) simple-icon-lite,
    :host([is-nested]) .no-icon {
      display: none !important;
    }
    /* top-level rows without an icon keep the label column aligned */
    :host(:not([is-nested])) .no-icon {
      display: inline-block !important;
      flex: none;
      width: 1rem;
      height: 1rem;
    }
    /* section rows leave room for the collapse chevron */
    :host([slot="heading"]) button {
      padding-right: 2rem !important;
    }
    /* per-row page-operations pencil; the page options menu covers it */
    .ops {
      display: none !important;
    }
    simple-icon-lite,
    simple-icon {
      flex: none;
      width: 1rem !important;
      height: 1rem !important;
      color: var(--muted-foreground) !important;
    }
    .title {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `,"map-menu-submenu":h`
    :host {
      --map-menu-item-height: 2rem;
    }
    ::slotted(map-menu-builder) {
      display: flex !important;
      flex-direction: column !important;
      gap: 0.125rem !important;
      margin: 0.125rem 0 0.25rem 0.875rem !important;
      padding: 0 0 0 0.625rem !important;
      /* --border is ~1.1:1 on the sidebar's card background; use a
         perceivable mid tone for the nesting rule */
      border-left: 1px solid color-mix(in oklch, var(--foreground) 22%, transparent) !important;
    }
  `,"map-menu-container":h`
    #activeindicator {
      display: none !important;
    }
  `,"map-menu-builder":h`
    /* HAX tree-connector ticks; the sub-menu rule replaces them */
    :host::after,
    :host::before {
      display: none !important;
    }
    .wrapper {
      display: flex !important;
      flex-direction: column !important;
      gap: 0.125rem !important;
    }
  `,"a11y-collapse":h`
    :host(#container) {
      border: 0 !important;
      margin: 0 !important;
    }
    :host(#container)::before,
    :host(#container)::after {
      display: none !important;
    }
    :host(#container) #heading {
      position: relative !important;
      align-items: center !important;
    }
    :host(#container) #text {
      flex: 1 !important;
      min-width: 0 !important;
    }
    :host(#container) #expand {
      position: absolute !important;
      right: 0.375rem !important;
      top: 50% !important;
      width: 1.25rem !important;
      height: 1.25rem !important;
      transform: translateY(-50%) !important;
      color: var(--muted-foreground) !important;
      --simple-icon-height: 1rem !important;
      --simple-icon-width: 1rem !important;
      --simple-icon-color: var(--muted-foreground);
      border-radius: var(--radius-sm);
    }
    /* stock fades the chevron in on hover only; keep it visible */
    :host(#container) #expand {
      opacity: 1 !important;
      visibility: visible !important;
    }
    :host(#container:not([expanded])) #expand {
      transform: translateY(-50%) rotate(-90deg) !important;
    }
    :host(#container) #expand:hover {
      background: var(--accent) !important;
    }
  `,"site-breadcrumb":h`
    :host {
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
    }
    ol {
      display: flex !important;
      flex-wrap: wrap;
      align-items: center !important;
      gap: 0.375rem !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    li {
      display: inline-flex !important;
      align-items: center !important;
      gap: 0.375rem !important;
      color: var(--muted-foreground) !important;
    }
    a {
      background: transparent !important;
      color: var(--muted-foreground) !important;
      padding: 0 !important;
      text-decoration: none !important;
      border-radius: var(--radius-sm);
    }
    a:hover {
      color: var(--foreground) !important;
    }
    a:focus-visible {
      outline: 2px solid var(--ring) !important;
      outline-offset: 2px !important;
    }
    /* HAX renders no separators; shadcn uses a chevron */
    li:not(:last-child)::after {
      content: "";
      width: 0.875rem;
      height: 0.875rem;
      background: currentColor;
      -webkit-mask: ${y2} center / contain no-repeat;
      mask: ${y2} center / contain no-repeat;
    }
    li:last-child,
    li:last-child span {
      color: var(--foreground) !important;
      font-weight: 400 !important;
      background: transparent !important;
    }
  `};r2(f0);const b0="(max-width: 767px)";function u(o){return l`<span
    class="lucide"
    aria-hidden="true"
    style="--src:url(&quot;${k[o]}&quot;)"
  ></span>`}const g={panelLeft:l`<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></svg>`,search:l`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,sun:l`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.07-2.93 1.41-1.41m11.32-11.32 1.41-1.41M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41"/></svg>`,moon:l`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,undo:u("icons:undo"),redo:u("icons:redo"),save:u("icons:save"),chevronDown:u("icons:expand-more"),pencil:u("icons:create"),lock:u("icons:lock"),user:u("social:person"),layoutDashboard:u("hax:home-edit"),logOut:u("icons:exit-to-app"),type:u("editor:title"),shapes:u("hax:hax2022"),image:u("image:photo-library"),tag:u("icons:label"),history:u("icons:history"),chart:u("hax:graph"),eye:u("icons:visibility"),eyeOff:u("icons:visibility-off"),lockOpen:u("icons:lock-open"),trash:u("icons:delete"),book:u("lrn:book"),chevronLeft:l`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>`,chevronRight:l`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`};class M2 extends Q{static get tag(){return"custom-oer-docs-theme"}static get properties(){return{...super.properties,collapsed:{type:Boolean,reflect:!0},mobileOpen:{type:Boolean,reflect:!0,attribute:"mobile-open"},dark:{type:Boolean,reflect:!0},siteTitle:{type:String},_prev:{state:!0},_next:{state:!0},_loggedIn:{state:!0},_userName:{state:!0},_activeTitle:{state:!0},_locked:{state:!0},_published:{state:!0},_pageMenuOpen:{state:!0},_siteDescription:{state:!0}}}constructor(){super(),this.HAXCMSThemeSettings.autoScroll=!0,this.collapsed=!1,this.mobileOpen=!1,this.dark=!1,this.siteTitle="",this.__mq=globalThis.matchMedia(b0),this.__keyHandler=this._onKeydown.bind(this),this._loggedIn=!1,this._pageMenuOpen=!1,this.__outsideMenu=t=>{const e=t.composedPath();this._pageMenuOpen&&!e.includes(this.shadowRoot.querySelector(".page-header .menu-wrap"))&&(this._pageMenuOpen=!1)},this.__disposer.push(y(()=>{const t=x(w.isLoggedIn),e=x(w.userData),i=x(w.activeItem),a=x(w.manifest);Promise.resolve().then(()=>{this._siteDescription=a?.description||"",this._loggedIn=!!t,this._userName=e?.userName||"",this._activeTitle=i?.title||"",this._locked=!!i?.metadata?.locked,this._published=i?.metadata?.published!==!1})})),this.__editorBarObserver=new ResizeObserver(()=>this._measureEditorBar()),this.__bodyObserver=new MutationObserver(()=>this._watchEditorBar()),this.__disposer.push(y(()=>{const t=x(w.darkMode);Promise.resolve().then(()=>{this.dark=!!t})})),this.__disposer.push(y(()=>{const t=x(w.siteTitle);Promise.resolve().then(()=>{this.siteTitle=t||""})})),this.__disposer.push(y(()=>{x(w.activeId);const t=x(w.routerManifest?.items)||[],e=x(w.activeManifestIndex);Promise.resolve().then(()=>{this.mobileOpen=!1,this._prev=e>0?t[e-1]:null,this._next=e>=0&&e<t.length-1?t[e+1]:null})}))}connectedCallback(){if(super.connectedCallback(),globalThis.addEventListener("keydown",this.__keyHandler),globalThis.addEventListener("pointerdown",this.__outsideMenu),this.__bodyObserver.observe(globalThis.document.body,{childList:!0}),this._watchEditorBar(),!globalThis.document.getElementById("oer-docs-fonts")){const t=globalThis.document.createElement("link");t.id="oer-docs-fonts",t.rel="stylesheet",t.href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",globalThis.document.head.appendChild(t)}}_watchEditorBar(){const t=globalThis.document.querySelector("haxcms-site-editor-ui");t!==this.__editorBar&&(this.__editorBar=t,this.__editorBarObserver.disconnect(),t&&this.__editorBarObserver.observe(t),this._measureEditorBar())}_measureEditorBar(){const t=globalThis.document.querySelector("haxcms-site-editor-ui"),e=t?t.getBoundingClientRect().height:0;this.style.setProperty("--editor-bar-height",`${Math.round(e)}px`)}disconnectedCallback(){this.__editorBarObserver.disconnect(),this.__bodyObserver.disconnect(),globalThis.removeEventListener("keydown",this.__keyHandler),globalThis.removeEventListener("pointerdown",this.__outsideMenu),super.disconnectedCallback()}HAXCMSGlobalStyleSheetContent(){return[...super.HAXCMSGlobalStyleSheetContent(),F0,x0,h`
        /* desktop uses the inset layout, which scrolls inside its card;
           the document itself must not scroll. (HAX appends a row of inline
           "manager" elements after the site, adding a ~20px line box.) */
        @media (min-width: 768px) {
          html,
          body {
            height: 100%;
            overflow: hidden;
          }
        }
        custom-oer-docs-theme {
          line-height: 1.7;
        }
        custom-oer-docs-theme :is(p, li) {
          text-align: start;
        }
        custom-oer-docs-theme .lead {
          font-size: 1.125rem;
          color: var(--muted-foreground);
        }
        custom-oer-docs-theme :is(h2, h3, h4) {
          letter-spacing: -0.015em;
          scroll-margin-top: calc(var(--topbar-height) + 1rem);
        }
        custom-oer-docs-theme a:any-link {
          color: var(--link);
          text-underline-offset: 3px;
        }
        custom-oer-docs-theme :not(pre) > code {
          font-family: var(--font-mono);
          font-size: 0.875em;
          background: var(--muted);
          border-radius: var(--radius-sm);
          padding: 0.125rem 0.375rem;
        }
      `]}static get styles(){return[super.styles,h`
        :host {
          display: block;
          min-height: 100vh;
          background: var(--background);
          color: var(--foreground);
          font-family: var(--font-sans);
        }
        svg {
          width: 1rem;
          height: 1rem;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* grid shell; the sidebar is sticky rather than fixed so the HAX
           editor bar (in normal flow above the theme when logged in) pushes
           it down instead of covering it */
        .shell {
          display: grid;
          grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
          transition: grid-template-columns 200ms ease;
        }
        :host([collapsed]) .shell {
          grid-template-columns: 0 minmax(0, 1fr);
        }
        .sidebar {
          position: sticky;
          top: var(--editor-bar-height, 0px);
          z-index: 30;
          height: calc(100vh - var(--editor-bar-height, 0px));
          height: calc(100dvh - var(--editor-bar-height, 0px));
          width: var(--sidebar-width);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: var(--card);
          border-right: 1px solid var(--border);
          transition: transform 200ms ease;
        }
        :host([collapsed]) .sidebar {
          transform: translateX(-100%);
        }
        /* shadcn SidebarHeader: brand row at the page header's height */
        .sidebar-header {
          height: var(--topbar-height);
          display: flex;
          align-items: center;
          padding: 0 0.5rem;
          border-bottom: 1px solid var(--border);
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.375rem 0.5rem;
          border-radius: var(--radius-md);
          color: var(--foreground);
          text-decoration: none;
        }
        .brand:hover {
          background: var(--accent);
        }
        .brand-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: none;
          width: 2rem;
          height: 2rem;
          border-radius: var(--radius-lg);
          background: var(--primary);
          color: var(--primary-foreground);
        }
        .brand-text {
          display: flex;
          flex-direction: column;
          min-width: 0;
          line-height: 1.25;
        }
        .brand-title {
          font-size: 0.875rem;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .brand-sub {
          font-size: 0.75rem;
          color: var(--muted-foreground);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .sidebar-search {
          padding: 0.75rem 0.75rem 0.25rem;
        }
        .sidebar nav {
          flex: 1;
          overflow-y: auto;
          padding: 0.5rem;
          scrollbar-width: thin;
          scrollbar-color: var(--border) transparent;
        }
        site-menu {
          height: auto;
          --site-menu-font-size: 0.875rem;
        }
        .sidebar-footer {
          padding: 0.75rem;
          border-top: 1px solid var(--border);
        }
        .search-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          font: inherit;
          font-size: 0.875rem;
          color: var(--muted-foreground);
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          cursor: pointer;
        }
        .search-btn:hover {
          background: var(--accent);
          color: var(--accent-foreground);
        }
        .search-btn span {
          flex: 1;
          text-align: left;
        }
        kbd {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          padding: 0.125rem 0.375rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          background: var(--muted);
          color: var(--muted-foreground);
        }
        /* site-modal renders its own icon button; we trigger it from ours */
        site-modal {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip-path: inset(50%);
        }

        /* main column */
        .main-col {
          min-width: 0;
        }
        .topbar {
          position: sticky;
          top: var(--editor-bar-height, 0px);
          z-index: 20;
          height: var(--topbar-height);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0 1rem;
          border-bottom: 1px solid var(--border);
          background: color-mix(in oklch, var(--background) 80%, transparent);
          backdrop-filter: blur(8px);
        }
        .icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          padding: 0;
          color: var(--foreground);
          background: transparent;
          border: 0;
          border-radius: var(--radius-md);
          cursor: pointer;
        }
        .icon-btn:hover {
          background: var(--accent);
          color: var(--accent-foreground);
        }
        .icon-btn:focus-visible,
        .search-btn:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 2px;
        }
        site-breadcrumb {
          flex: 1;
          min-width: 0;
          font-size: 0.875rem;
          --site-breadcrumb-margin: 0;
          color: var(--muted-foreground);
        }
        .separator {
          width: 1px;
          height: 1rem;
          background: var(--border);
        }

        main {
          padding: 2.5rem 1.5rem 4rem;
        }
        /* gutter for oer-block-rail, which sits left of the selected block */
        :host([edit-mode]) main {
          padding-left: 5.5rem;
        }
        article {
          max-width: 48rem;
          margin: 0 auto;
        }
        site-active-title {
          display: block;
          margin: 0 0 1.5rem;
        }
        site-active-title h1 {
          font-family: var(--font-sans);
          font-size: 2.25rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.2;
        }
        site-active-title h1 .site-active-title-icon {
          --simple-icon-height: 1.5rem;
          --simple-icon-width: 1.5rem;
          color: var(--muted-foreground);
        }
        :host([edit-mode]) #slot {
          display: none;
        }
        .pager {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }
        /* shadcn-style prev/next cards */
        .pager[hidden] {
          display: none;
        }
        .pager-link {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          min-width: 0;
          max-width: 50%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          color: var(--foreground);
          text-decoration: none;
        }
        .pager-link.next {
          margin-left: auto;
          align-items: flex-end;
          text-align: end;
        }
        .pager-link:hover {
          background: var(--accent);
        }
        .pager-link:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 2px;
        }
        .pager-label {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.8125rem;
          color: var(--muted-foreground);
        }
        .pager-title {
          font-size: 0.875rem;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 100%;
        }

        .lucide {
          display: inline-block;
          flex: none;
          width: 1rem;
          height: 1rem;
          background: currentColor;
          -webkit-mask: var(--src) center / contain no-repeat;
          mask: var(--src) center / contain no-repeat;
        }

        /* shadcn Button (sm) */
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          height: 2rem;
          padding: 0 0.75rem;
          font: inherit;
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: var(--radius-md);
          border: 1px solid transparent;
          cursor: pointer;
          white-space: nowrap;
        }
        .btn:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 2px;
        }
        .btn-primary {
          background: var(--primary);
          color: var(--primary-foreground);
        }
        .btn-primary:hover {
          background: color-mix(in oklch, var(--primary) 90%, black);
        }
        .btn-outline {
          background: var(--background);
          color: var(--foreground);
          border-color: var(--input-border);
        }
        .btn-outline:hover {
          background: var(--accent);
        }
        .icon-btn.sm {
          width: 1.75rem;
          height: 1.75rem;
          color: var(--muted-foreground);
        }
        .icon-btn.danger:hover {
          color: var(--destructive);
          background: color-mix(in oklch, var(--destructive) 10%, transparent);
        }

        /* sidebar: site admin group + user row (learning-materials CMS) */
        .sidebar-footer {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        /* shadcn SidebarGroupLabel: h-8, text-xs, medium, muted */
        .nav-group-label {
          display: flex;
          align-items: center;
          height: 2rem;
          padding: 0 0.5rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--muted-foreground);
        }
        /* footer: Site group + compact user row */
        .user-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0.25rem 0 0.5rem;
        }
        .avatar {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: none;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 999px;
          background: var(--muted);
          color: var(--foreground);
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        .avatar .lucide {
          width: 0.875rem;
          height: 0.875rem;
        }
        .user-name {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.75rem;
          font-weight: 500;
        }
        /* page header: title + page options menu */
        .page-header {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }
        .page-header site-active-title {
          flex: 1;
          min-width: 0;
        }
        .menu-wrap {
          position: relative;
          flex: none;
          margin-top: 0.375rem;
        }
        .menu {
          position: absolute;
          right: 0;
          top: calc(100% + 0.25rem);
          z-index: 40;
          min-width: 14rem;
          padding: 0.25rem;
          background: var(--popover);
          color: var(--popover-foreground);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          box-shadow: 0 8px 24px rgb(0 0 0 / 0.12);
        }
        .menu [role="menuitem"] {
          all: unset;
          color: var(--popover-foreground);
          box-sizing: border-box;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          cursor: pointer;
        }
        .menu [role="menuitem"]:hover,
        .menu [role="menuitem"]:focus-visible {
          background: var(--accent);
          color: var(--accent-foreground);
        }
        .menu kbd {
          margin-left: auto;
        }
        .menu [role="menuitem"] .lucide {
          color: var(--muted-foreground);
        }
        .menu [role="menuitem"][disabled] {
          opacity: 0.5;
          pointer-events: none;
        }
        .menu [role="menuitem"].danger,
        .menu [role="menuitem"].danger .lucide {
          color: var(--destructive);
        }
        .menu [role="menuitem"].danger:hover {
          background: color-mix(in oklch, var(--destructive) 10%, transparent);
          color: var(--destructive);
        }
        .menu-sep {
          height: 1px;
          margin: 0.25rem -0.25rem;
          background: var(--border);
        }

        /* edit mode: the breadcrumb bar becomes the editor header */
        .topbar.editing {
          gap: 0.5rem;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          height: 1.5rem;
          padding: 0 0.5rem;
          border: 1px solid var(--border);
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 500;
          white-space: nowrap;
        }
        .dot {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 999px;
          background: var(--primary);
        }
        .editing-title {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.875rem;
          font-weight: 600;
        }
        .toolbar-group {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        /* edit mode: the site sidebar makes way for the docked editor panel
           (hax-tray, positioned by the editor skin at the same spot) */
        :host([edit-mode]) .shell {
          grid-template-columns: var(--editor-panel-width) minmax(0, 1fr);
        }
        :host([edit-mode]) .sidebar {
          visibility: hidden;
        }

        /* shadcn sidebar-08 "inset" variant: the page takes the sidebar's
           colour and the content sits in a rounded card that scrolls on its
           own, so the sticky header keeps its rounded top */
        @media (min-width: 768px) {
          :host {
            background: var(--card);
          }
          .shell {
            height: 100vh;
            height: 100dvh;
          }
          .sidebar {
            border-right: 0;
            background: transparent;
          }
          .sidebar-header {
            border-bottom: 0;
          }
          /* the card is a column: fixed header, scrolling body below it,
             so the scrollbar never runs up beside the header */
          .main-col {
            display: flex;
            flex-direction: column;
            /* gap on all sides so the card's outline never sits under the
               sidebar or the docked editor panel */
            margin: 0.5rem;
            height: calc(100vh - 1rem);
            height: calc(100dvh - 1rem);
            overflow: hidden;
            border-radius: 0.75rem;
            background: var(--background);
            /* shadow-sm plus a faint outline, so the card edge stays
               perceivable on the near-white page background */
            box-shadow:
              0 1px 2px rgb(0 0 0 / 0.06),
              0 0 0 1px color-mix(in oklch, var(--foreground) 9%, transparent);
          }
          .topbar {
            position: relative;
            top: 0;
            flex: none;
          }
          main {
            flex: 1;
            min-height: 0;
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: var(--border) transparent;
          }
        }

        /* mobile: sidebar becomes an overlay drawer */
        .scrim {
          display: none;
        }
        @media (max-width: 767px) {
          .shell,
          :host([collapsed]) .shell {
            grid-template-columns: minmax(0, 1fr);
          }
          .sidebar {
            position: fixed;
            inset: 0 auto 0 0;
            height: auto;
            transform: translateX(-100%);
            box-shadow: 0 10px 30px rgb(0 0 0 / 0.2);
          }
          :host([mobile-open]) .sidebar {
            transform: none;
          }
          :host([mobile-open]) .scrim {
            display: block;
            position: fixed;
            inset: 0;
            z-index: 25;
            background: rgb(0 0 0 / 0.4);
          }
          main {
            padding: 1.5rem 1rem 3rem;
          }
          site-active-title h1 {
            font-size: 1.75rem;
          }
        }

        .skip-link:focus {
          z-index: 50;
        }
        @media (prefers-reduced-motion: reduce) {
          .sidebar,
          .shell {
            transition: none;
          }
        }
      `]}render(){const t=this.__mq.matches?this.mobileOpen:!this.collapsed;return l`
      <a class="skip-link" href="#main">Skip to content</a>
      <div class="shell">
      <aside
        id="sidebar"
        class="sidebar"
        aria-label="Site navigation"
        part="sidebar"
        ?inert="${!t||this.editMode}"
      >
        <div class="sidebar-header">
          <a class="brand" href="${w.homeLink||"./"}">
            <span class="brand-mark" aria-hidden="true">${g.book}</span>
            <span class="brand-text">
              <span class="brand-title">${this.siteTitle}</span>
              <span class="brand-sub">${this._siteDescription||"Learning materials"}</span>
            </span>
          </a>
        </div>
        <div class="sidebar-search">
          <button class="search-btn" @click="${this.openSearch}" ?disabled="${this.editMode}">
            ${g.search}<span>Search…</span><kbd>⌘K</kbd>
          </button>
          <site-modal
            icon="icons:search"
            title="Search site"
            button-label="Search"
            @site-modal-click="${this._loadSearch}"
          >
            <site-search></site-search>
          </site-modal>
        </div>
        <nav aria-label="Course outline">
          <div class="nav-group-label">Contents</div>
          <site-menu part="site-menu"></site-menu>
        </nav>
        ${this._loggedIn?l`<div class="sidebar-footer">${this.renderUser()}</div>`:""}
      </aside>
      <div class="scrim" role="presentation" @click="${this._closeMobile}"></div>

      <div class="main-col">
        ${this.editMode?this.renderEditorHeader(t):this.renderTopbar(t)}

        <main id="main">
          <article id="contentcontainer">
            <div class="page-header">
              <site-active-title part="page-title"></site-active-title>
              ${this._loggedIn&&!this.editMode?this.renderPageMenu():""}
            </div>
            <section id="slot"><slot></slot></section>
            <nav class="pager" aria-label="Previous and next page" ?hidden="${this.editMode}">
              ${this._prev?l`<a class="pager-link prev" href="${this._prev.slug}">
                    <span class="pager-label">${g.chevronLeft} Previous</span>
                    <span class="pager-title">${this._prev.title}</span>
                  </a>`:l`<span></span>`}
              ${this._next?l`<a class="pager-link next" href="${this._next.slug}">
                    <span class="pager-label">Next ${g.chevronRight}</span>
                    <span class="pager-title">${this._next.title}</span>
                  </a>`:""}
            </nav>
          </article>
        </main>
      </div>
      </div>
    `}renderTopbar(t){return l`
      <header class="topbar" part="topbar">
        <button
          class="icon-btn"
          @click="${this.toggleSidebar}"
          aria-controls="sidebar"
          aria-expanded="${t}"
          title="Toggle sidebar"
        >
          ${g.panelLeft}
        </button>
        <div class="separator" aria-hidden="true"></div>
        <site-breadcrumb part="breadcrumb"></site-breadcrumb>
        ${this._loggedIn?l`<oer-command-search></oer-command-search>`:""}
        <button
          class="icon-btn"
          @click="${this.toggleDark}"
          title="${this.dark?"Switch to light mode":"Switch to dark mode"}"
          aria-pressed="${this.dark}"
        >
          ${this.dark?g.sun:g.moon}
        </button>
      </header>
    `}renderEditorHeader(){return l`
      <header class="topbar editing" part="topbar">
        <span class="badge"><span class="dot" aria-hidden="true"></span>Editing</span>
        <span class="editing-title">${this._activeTitle}</span>
        <div class="toolbar-group">
          <button class="icon-btn" @click="${X2}" title="Undo (${F}Z)" aria-label="Undo">
            ${g.undo}
          </button>
          <button class="icon-btn" @click="${G2}" title="Redo (${F}⇧Z)" aria-label="Redo">
            ${g.redo}
          </button>
          <div class="separator" aria-hidden="true"></div>
          <oer-command-search></oer-command-search>
          <div class="separator" aria-hidden="true"></div>
          <button class="btn btn-outline" @click="${O2}" title="Discard changes (${F}⇧/)">
            Cancel
          </button>
          <button class="btn btn-primary" @click="${N2}" title="Save (${F}⇧S)">
            ${g.save}Save
          </button>
        </div>
      </header>
    `}renderPageMenu(){const t=i=>this._menuAction(()=>this.querySelector("page-break")?.[i]?.()),e=(i,a,r,n="")=>l`<button role="menuitem" class="${n}" @click="${i}">${a}${r}</button>`;return l`
      <div class="menu-wrap">
        <button
          class="icon-btn"
          aria-haspopup="menu"
          aria-expanded="${this._pageMenuOpen}"
          aria-label="Page options"
          title="Page options"
          @click="${this._togglePageMenu}"
        >
          ${g.chevronDown}
        </button>
        ${this._pageMenuOpen?l`<div class="menu" role="menu" @keydown="${this._menuKeys}">
              <button role="menuitem" ?disabled="${this._locked}" @click="${this._menuAction(P2)}">
                ${g.pencil}Edit page<kbd>${F}⇧E</kbd>
              </button>
              <div class="menu-sep" role="separator"></div>
              ${e(t("_editTitle"),g.type,"Rename page")}
              ${e(t("_editIcon"),g.shapes,"Change icon")}
              ${e(t("_editMedia"),g.image,"Page media")}
              ${e(t("_editTags"),g.tag,"Tags")}
              <div class="menu-sep" role="separator"></div>
              ${e(t("_openRevisions"),g.history,"Revisions")}
              ${e(t("_openPageReport"),g.chart,"Page report")}
              <div class="menu-sep" role="separator"></div>
              ${e(t("_togglePublished"),this._published?g.eyeOff:g.eye,this._published?"Unpublish":"Publish")}
              ${e(t("_toggleLocked"),this._locked?g.lockOpen:g.lock,this._locked?"Unlock page":"Lock page")}
              <div class="menu-sep" role="separator"></div>
              ${e(t("_deletePage"),g.trash,"Delete page","danger")}
            </div>`:""}
      </div>
    `}renderUser(){const t=this._userName||"Signed in";return l`
      <div class="user-row">
        <span class="avatar" aria-hidden="true">${this._userName?t.slice(0,2):g.user}</span>
        <span class="user-name">${t}</span>
        <a class="icon-btn sm" href="${B()?.backLink??"/"}" title="Site dashboard" aria-label="Site dashboard">
          ${g.layoutDashboard}
        </a>
        <button class="icon-btn sm danger" @click="${d2}" title="Log out" aria-label="Log out">
          ${g.logOut}
        </button>
      </div>
    `}_togglePageMenu(){this._pageMenuOpen=!this._pageMenuOpen}_menuAction(t){return()=>{this._pageMenuOpen=!1,t()}}_menuKeys(t){const e=[...this.shadowRoot.querySelectorAll('.menu [role="menuitem"]')],i=e.indexOf(this.shadowRoot.activeElement);t.key==="Escape"?this._pageMenuOpen=!1:(t.key==="ArrowDown"||t.key==="ArrowUp")&&(t.preventDefault(),e[(i+(t.key==="ArrowDown"?1:-1)+e.length)%e.length]?.focus())}toggleSidebar(){this.__mq.matches?this.mobileOpen=!this.mobileOpen:this.collapsed=!this.collapsed}_closeMobile(){this.mobileOpen=!1}toggleDark(){w.darkMode=!w.darkMode}async _loadSearch(){await import("@haxtheweb/haxcms-elements/lib/ui-components/site/site-search.js"),setTimeout(()=>{globalThis.SimpleModal?.requestAvailability()?.querySelector("site-search")?.shadowRoot?.querySelector("simple-fields-field")?.focus()},50)}openSearch(){this.shadowRoot.querySelector("site-modal")?.shadowRoot?.querySelector("#btn")?.click()}_onKeydown(t){this.editMode||((t.metaKey||t.ctrlKey)&&!t.shiftKey&&t.key.toLowerCase()==="k"?(t.preventDefault(),this.openSearch()):t.key==="Escape"&&this.mobileOpen&&(this.mobileOpen=!1))}}customElements.define(M2.tag,M2);const k0="files/data/rubrics.json";let J;function C0(){return J||(J=fetch(new URL(k0,globalThis.document.baseURI)).then(o=>o.ok?o.json():[]).catch(()=>[])),J}class N extends B2{static get tag(){return"oer-rubric"}static get properties(){return{...super.properties,rubricId:{type:String,attribute:"rubric-id",reflect:!0}}}constructor(){super(),this.rubricId="",this.__rubric=null,this.__loaded=!1}updated(t){super.updated?.(t),t.has("rubricId")&&this._load()}async _load(){const t=await C0();this.__rubric=t.find(e=>e.slug===this.rubricId)??null,this.__loaded=!0,this.requestUpdate()}get _hidden(){return new URLSearchParams(globalThis.location.search).get("hideRubric")==="true"}static get styles(){return[super.styles,h`
        :host {
          display: block;
          margin: 2rem 0;
        }
        .card {
          border: 1px solid var(--border, var(--ddd-theme-default-limestoneLight));
          border-radius: var(--radius-lg, var(--ddd-radius-md));
          padding: 1rem;
        }
        h3 {
          margin: 1rem 1rem 0;
          font-size: 1.125rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }
        .desc {
          text-align: start;
          margin: 0.5rem 1rem 1.5rem;
          color: var(--muted-foreground, var(--ddd-theme-default-coalyGray));
        }
        .table-wrap {
          overflow-x: auto;
        }
        /* DDD ships a bordered-grid table style with enough weight that the
           reset needs !important; shadcn tables only rule between rows */
        table,
        table thead,
        table tbody,
        table tr,
        table th,
        table td {
          border: 0 !important;
          outline: 0 !important;
          background: transparent !important;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
        }
        th,
        td {
          text-align: start;
          vertical-align: top;
          padding: 0.75rem 1rem !important;
        }
        table thead th,
        table tbody tr:not(:last-child) td {
          border-bottom: 1px solid var(--border, var(--ddd-theme-default-limestoneLight)) !important;
        }
        th {
          color: var(--muted-foreground, inherit);
        }
        th {
          font-weight: 500;
        }
        td:first-child {
          font-weight: 500;
          white-space: nowrap;
        }
        td:last-child {
          color: var(--muted-foreground, var(--ddd-theme-default-coalyGray));
        }
        .missing {
          padding: 1rem;
          border: 1px dashed var(--border, currentColor);
          border-radius: var(--radius-lg, var(--ddd-radius-md));
          color: var(--muted-foreground, inherit);
          background: color-mix(in oklch, var(--muted, #eee) 30%, transparent);
        }
      `]}render(){if(this._hidden||!this.__loaded)return l``;const t=this.__rubric;return t?l`
      <section class="card" aria-labelledby="title">
        <h3 id="title">${t.name} Rubric</h3>
        ${t.description?l`<p class="desc">${t.description}</p>`:""}
        ${t.criteria?.length?l`<div class="table-wrap">
              <table>
                <thead>
                  <tr><th scope="col">Criterion</th><th scope="col">Description</th></tr>
                </thead>
                <tbody>
                  ${t.criteria.map(e=>l`<tr><td>${e.name}</td><td>${e.description}</td></tr>`)}
                </tbody>
              </table>
            </div>`:""}
      </section>
    `:l`<div class="missing">
        Rubric not found${this.rubricId?l`: <code>${this.rubricId}</code>`:""}
      </div>`}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:{title:"Rubric",description:"Assessment rubric from the site's rubrics data file.",icon:"icons:assignment-turned-in",color:"blue",tags:["Education","assessment","rubric","grading"],meta:{author:"Michael Collins"}},settings:{configure:[{property:"rubricId",title:"Rubric",description:"Which rubric to show (slug in files/data/rubrics.json).",inputMethod:"select",options:{exercise:"Exercise","exercise-low-poly":"Exercise (low poly)",project:"Project",task:"Task","written-statement":"Written statement"}}],advanced:[]},demoSchema:[{tag:N.tag,properties:{rubricId:"exercise"},content:""}]}}}customElements.define(N.tag,N);
