import{SimpleIconsetStore as xo}from"@haxtheweb/simple-icon/lib/simple-iconset.js";import{store as T}from"@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";import{HAXCMSLitElementTheme as N2,css as b,html as s,unsafeCSS as Qe,toJS as _,store as y,autorun as R,svg as $}from"@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";import"@haxtheweb/haxcms-elements/lib/ui-components/active-item/site-active-title.js";import"@haxtheweb/haxcms-elements/lib/ui-components/layout/site-modal.js";import{DDD as Do}from"@haxtheweb/d-d-d/d-d-d.js";const S={"hax:hax2022":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%203H5a2%202%200%200%200-2%202v14a2%202%200%200%200%202%202h14a2%202%200%200%200%202-2v-7%22%20%2F%3E%20%3Cpath%20d%3D%22M18.375%202.625a1%201%200%200%201%203%203l-9.013%209.014a2%202%200%200%201-.853.505l-2.873.84a.5.5%200%200%201-.62-.62l.84-2.873a2%202%200%200%201%20.506-.852z%22%20%2F%3E%20%3C%2Fsvg%3E","hax:site-map":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20x%3D%2216%22%20y%3D%2216%22%20width%3D%226%22%20height%3D%226%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20x%3D%222%22%20y%3D%2216%22%20width%3D%226%22%20height%3D%226%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20x%3D%229%22%20y%3D%222%22%20width%3D%226%22%20height%3D%226%22%20rx%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M5%2016v-3a1%201%200%200%201%201-1h12a1%201%200%200%201%201%201v3%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2012V8%22%20%2F%3E%20%3C%2Fsvg%3E","hax:page-edit":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M14.364%2013.634a2%202%200%200%200-.506.854l-.837%202.87a.5.5%200%200%200%20.62.62l2.87-.837a2%202%200%200%200%20.854-.506l4.013-4.009a1%201%200%200%200-3.004-3.004z%22%20%2F%3E%20%3Cpath%20d%3D%22M14.487%207.858A1%201%200%200%201%2014%207V2%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2019.645V20a2%202%200%200%201-2%202H6a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l2.516%202.516%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2018h1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:add-page":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2015h6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018v-6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:loading":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%2012a9%209%200%201%201-6.219-8.56%22%20%2F%3E%20%3C%2Fsvg%3E","hax:wizard-hat":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m21.64%203.64-1.28-1.28a1.21%201.21%200%200%200-1.72%200L2.36%2018.64a1.21%201.21%200%200%200%200%201.72l1.28%201.28a1.2%201.2%200%200%200%201.72%200L21.64%205.36a1.2%201.2%200%200%200%200-1.72%22%20%2F%3E%20%3Cpath%20d%3D%22m14%207%203%203%22%20%2F%3E%20%3Cpath%20d%3D%22M5%206v4%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2014v4%22%20%2F%3E%20%3Cpath%20d%3D%22M10%202v2%22%20%2F%3E%20%3Cpath%20d%3D%22M7%208H3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2016h-4%22%20%2F%3E%20%3Cpath%20d%3D%22M11%203H9%22%20%2F%3E%20%3C%2Fsvg%3E","hax:graph":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%203v16a2%202%200%200%200%202%202h16%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2017V9%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2017V5%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2017v-3%22%20%2F%3E%20%3C%2Fsvg%3E","hax:blocks":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2022V7a1%201%200%200%200-1-1H4a2%202%200%200%200-2%202v12a2%202%200%200%200%202%202h12a2%202%200%200%200%202-2v-5a1%201%200%200%200-1-1H2%22%20%2F%3E%20%3Crect%20x%3D%2214%22%20y%3D%222%22%20width%3D%228%22%20height%3D%228%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:add-brick":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M12%208v8%22%20%2F%3E%20%3C%2Fsvg%3E","hax:html-code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2012.5%208%2015l2%202.5%22%20%2F%3E%20%3Cpath%20d%3D%22m14%2012.5%202%202.5-2%202.5%22%20%2F%3E%20%3C%2Fsvg%3E","hax:home-edit":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2021v-8a1%201%200%200%200-1-1h-4a1%201%200%200%200-1%201v8%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2010a2%202%200%200%201%20.709-1.528l7-6a2%202%200%200%201%202.582%200l7%206A2%202%200%200%201%2021%2010v9a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2z%22%20%2F%3E%20%3C%2Fsvg%3E","hax:add-item":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2012H3%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2019H3%22%20%2F%3E%20%3Cpath%20d%3D%22M18%209v6%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012h-6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:view-gallery":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%2214%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%2214%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%223%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:format-textblock":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2012H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2019H3%22%20%2F%3E%20%3C%2Fsvg%3E","hax:file-html":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2012.5%208%2015l2%202.5%22%20%2F%3E%20%3Cpath%20d%3D%22m14%2012.5%202%202.5-2%202.5%22%20%2F%3E%20%3C%2Fsvg%3E","hax:code-json":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2012a1%201%200%200%200-1%201v1a1%201%200%200%201-1%201%201%201%200%200%201%201%201v1a1%201%200%200%200%201%201%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2018a1%201%200%200%200%201-1v-1a1%201%200%200%201%201-1%201%201%200%200%201-1-1v-1a1%201%200%200%200-1-1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:templates":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%227%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%229%22%20height%3D%227%22%20x%3D%223%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%225%22%20height%3D%227%22%20x%3D%2216%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:paragraph":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M13%204v16%22%20%2F%3E%20%3Cpath%20d%3D%22M17%204v16%22%20%2F%3E%20%3Cpath%20d%3D%22M19%204H9.5a4.5%204.5%200%200%200%200%209H13%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h1":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22m17%2012%203-2v8%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h2":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2018h-4c0-4%204-3%204-6%200-1.5-2-2.5-4-1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h3":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17.5%2010.5c1.7-1%203.5%200%203.5%201.5a2%202%200%200%201-2%202%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2017.5c2%201.5%204%20.3%204-1.5a2%202%200%200%200-2-2%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h4":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2010v3a1%201%200%200%200%201%201h3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2010v8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h5":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2013v-3h4%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2017.7c.4.2.8.3%201.3.3%201.5%200%202.7-1.1%202.7-2.5S19.8%2013%2018.3%2013H17%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h6":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Ccircle%20cx%3D%2219%22%20cy%3D%2216%22%20r%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2010c-2%202-3%203.5-3%206%22%20%2F%3E%20%3C%2Fsvg%3E","hax:file-pdf":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2013H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2017H8%22%20%2F%3E%20%3C%2Fsvg%3E","hax:add-child-page":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11.35%2022H6a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.706.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v5.35%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2019h6%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2016v6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:site-settings":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9.671%204.136a2.34%202.34%200%200%201%204.659%200%202.34%202.34%200%200%200%203.319%201.915%202.34%202.34%200%200%201%202.33%204.033%202.34%202.34%200%200%200%200%203.831%202.34%202.34%200%200%201-2.33%204.033%202.34%202.34%200%200%200-3.319%201.915%202.34%202.34%200%200%201-4.659%200%202.34%202.34%200%200%200-3.32-1.915%202.34%202.34%200%200%201-2.33-4.033%202.34%202.34%200%200%200%200-3.831A2.34%202.34%200%200%201%206.35%206.051a2.34%202.34%200%200%200%203.319-1.915%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","hax:multimedia":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m12.296%203.464%203.02%203.956%22%20%2F%3E%20%3Cpath%20d%3D%22M20.2%206%203%2011l-.9-2.4c-.3-1.1.3-2.2%201.3-2.5l13.5-4c1.1-.3%202.2.3%202.5%201.3z%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2011h18v8a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2z%22%20%2F%3E%20%3Cpath%20d%3D%22m6.18%205.276%203.1%203.899%22%20%2F%3E%20%3C%2Fsvg%3E","hax:module":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11%2021.73a2%202%200%200%200%202%200l7-4A2%202%200%200%200%2021%2016V8a2%202%200%200%200-1-1.73l-7-4a2%202%200%200%200-2%200l-7%204A2%202%200%200%200%203%208v8a2%202%200%200%200%201%201.73z%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2022V12%22%20%2F%3E%20%3Cpolyline%20points%3D%223.29%207%2012%2012%2020.71%207%22%20%2F%3E%20%3Cpath%20d%3D%22m7.5%204.27%209%205.15%22%20%2F%3E%20%3C%2Fsvg%3E","hax:menu-open":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M9%203v18%22%20%2F%3E%20%3Cpath%20d%3D%22m14%209%203%203-3%203%22%20%2F%3E%20%3C%2Fsvg%3E","hax:lesson":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%205v16%22%20%2F%3E%20%3Cpath%20d%3D%22M20.001%2019A2%202%200%200022%2017V5a2%202%200%2000-1.999-2L16%203.002A5%205%200%200012%205a5%205%200%2000-4-2H4a2%202%200%2000-2%202v12a2%202%200%20001.999%202H8a5%205%200%20014%202%205%205%200%20014-2z%22%20%2F%3E%20%3C%2Fsvg%3E","hax:keyboard-arrow-up":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18%2015-6-6-6%206%22%20%2F%3E%20%3C%2Fsvg%3E","hax:keyboard-arrow-down":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m6%209%206%206%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:file-docx":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2018h2%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2012v6%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2013v-.5a.5.5%200%200%201%20.5-.5h5a.5.5%200%200%201%20.5.5v.5%22%20%2F%3E%20%3C%2Fsvg%3E","hax:embed":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18%2016%204-4-4-4%22%20%2F%3E%20%3Cpath%20d%3D%22m6%208-4%204%204%204%22%20%2F%3E%20%3Cpath%20d%3D%22m14.5%204-5%2016%22%20%2F%3E%20%3C%2Fsvg%3E","hax:duplicate":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2214%22%20height%3D%2214%22%20x%3D%228%22%20y%3D%228%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2016c-1.1%200-2-.9-2-2V4c0-1.1.9-2%202-2h10c1.1%200%202%20.9%202%202%22%20%2F%3E%20%3C%2Fsvg%3E","hax:abbr":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%227%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209v6%22%20%2F%3E%20%3Ccircle%20cx%3D%2217%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3Cpath%20d%3D%22M14%207v8%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2017v1c0%20.5-.5%201-1%201H3c-.5%200-1-.5-1-1v-1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:wand":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%204V2%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2016v-2%22%20%2F%3E%20%3Cpath%20d%3D%22M8%209h2%22%20%2F%3E%20%3Cpath%20d%3D%22M20%209h2%22%20%2F%3E%20%3Cpath%20d%3D%22M17.8%2011.8%2019%2013%22%20%2F%3E%20%3Cpath%20d%3D%22M15%209h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M17.8%206.2%2019%205%22%20%2F%3E%20%3Cpath%20d%3D%22m3%2021%209-9%22%20%2F%3E%20%3Cpath%20d%3D%22M12.2%206.2%2011%205%22%20%2F%3E%20%3C%2Fsvg%3E","hax:video":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2013%205.223%203.482a.5.5%200%200%200%20.777-.416V7.87a.5.5%200%200%200-.752-.432L16%2010.5%22%20%2F%3E%20%3Crect%20x%3D%222%22%20y%3D%226%22%20width%3D%2214%22%20height%3D%2212%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","hax:unit":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%206%204%2014%22%20%2F%3E%20%3Cpath%20d%3D%22M12%206v14%22%20%2F%3E%20%3Cpath%20d%3D%22M8%208v12%22%20%2F%3E%20%3Cpath%20d%3D%22M4%204v16%22%20%2F%3E%20%3C%2Fsvg%3E","hax:ticket":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2%209a3%203%200%200%201%200%206v2a2%202%200%200%200%202%202h16a2%202%200%200%200%202-2v-2a3%203%200%200%201%200-6V7a2%202%200%200%200-2-2H4a2%202%200%200%200-2%202Z%22%20%2F%3E%20%3Cpath%20d%3D%22M13%205v2%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2017v2%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2011v2%22%20%2F%3E%20%3C%2Fsvg%3E","hax:task":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22m16%209-5.5%205.5L8%2012%22%20%2F%3E%20%3C%2Fsvg%3E","hax:table-column-remove":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%227%22%20height%3D%2213%22%20x%3D%223%22%20y%3D%228%22%20rx%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22m15%202-3%203-3-3%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%2213%22%20x%3D%2214%22%20y%3D%228%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:table-column-plus-after":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%227%22%20height%3D%2213%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22m9%2022%203-3%203%203%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%2213%22%20x%3D%2214%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:skull":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m12.5%2017-.5-1-.5%201h1z%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2022a1%201%200%200%200%201-1v-1a2%202%200%200%200%201.56-3.25%208%208%200%201%200-11.12%200A2%202%200%200%200%208%2020v1a1%201%200%200%200%201%201z%22%20%2F%3E%20%3Ccircle%20cx%3D%2215%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:shovel":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21.56%204.56a1.5%201.5%200%200%201%200%202.122l-.47.47a3%203%200%200%201-4.212-.03%203%203%200%200%201%200-4.243l.44-.44a1.5%201.5%200%200%201%202.121%200z%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2022a1%201%200%200%201-1-1v-3.586a1%201%200%200%201%20.293-.707l3.355-3.355a1.205%201.205%200%200%201%201.704%200l3.296%203.296a1.205%201.205%200%200%201%200%201.704l-3.355%203.355a1%201%200%200%201-.707.293z%22%20%2F%3E%20%3Cpath%20d%3D%22m9%2015%207.879-7.878%22%20%2F%3E%20%3C%2Fsvg%3E","hax:select-element":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12.034%2012.681a.498.498%200%200%201%20.647-.647l9%203.5a.5.5%200%200%201-.033.943l-3.444%201.068a1%201%200%200%200-.66.66l-1.067%203.443a.5.5%200%200%201-.943.033z%22%20%2F%3E%20%3Cpath%20d%3D%22M5%203a2%202%200%200%200-2%202%22%20%2F%3E%20%3Cpath%20d%3D%22M19%203a2%202%200%200%201%202%202%22%20%2F%3E%20%3Cpath%20d%3D%22M5%2021a2%202%200%200%201-2-2%22%20%2F%3E%20%3Cpath%20d%3D%22M9%203h1%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2021h2%22%20%2F%3E%20%3Cpath%20d%3D%22M14%203h1%22%20%2F%3E%20%3Cpath%20d%3D%22M3%209v1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%209v2%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2014v1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:qr-code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%225%22%20height%3D%225%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%225%22%20height%3D%225%22%20x%3D%2216%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%225%22%20height%3D%225%22%20x%3D%223%22%20y%3D%2216%22%20rx%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2016h-3a2%202%200%200%200-2%202v3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2021v.01%22%20%2F%3E%20%3Cpath%20d%3D%22M12%207v3a2%202%200%200%201-2%202H7%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2012h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M12%203h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2016v.01%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2012h1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012v.01%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2021v-1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:outline-designer-outdent":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m7%208-4%204%204%204%22%20%2F%3E%20%3C%2Fsvg%3E","hax:outline-designer-indent":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m3%208%204%204-4%204%22%20%2F%3E%20%3C%2Fsvg%3E","hax:newspaper":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2018h-5%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2014h-8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2022h16a2%202%200%200%200%202-2V4a2%202%200%200%200-2-2H8a2%202%200%200%200-2%202v16a2%202%200%200%201-4%200v-9a2%202%200%200%201%202-2h2%22%20%2F%3E%20%3Crect%20width%3D%228%22%20height%3D%224%22%20x%3D%2210%22%20y%3D%226%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:iframe":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20x%3D%222%22%20y%3D%224%22%20width%3D%2220%22%20height%3D%2216%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M10%204v4%22%20%2F%3E%20%3Cpath%20d%3D%22M2%208h20%22%20%2F%3E%20%3Cpath%20d%3D%22M6%204v4%22%20%2F%3E%20%3C%2Fsvg%3E","hax:hr":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3C%2Fsvg%3E","hax:file-link-outline":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2011V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.706.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202H6a2%202%200%200%201-2-2v-3a2%202%200%200%201%202-2h7%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22m10%2018%203-3-3-3%22%20%2F%3E%20%3C%2Fsvg%3E","hax:figure":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%229%22%20r%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22m21%2015-3.086-3.086a2%202%200%200%200-2.828%200L6%2021%22%20%2F%3E%20%3C%2Fsvg%3E","hax:email":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m22%207-8.991%205.727a2%202%200%200%201-2.009%200L2%207%22%20%2F%3E%20%3Crect%20x%3D%222%22%20y%3D%224%22%20width%3D%2220%22%20height%3D%2216%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","hax:discord":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2.992%2016.342a2%202%200%200%201%20.094%201.167l-1.065%203.29a1%201%200%200%200%201.236%201.168l3.413-.998a2%202%200%200%201%201.099.092%2010%2010%200%201%200-4.777-4.719%22%20%2F%3E%20%3C%2Fsvg%3E","hax:console-line":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m7%2011%202-2-2-2%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2013h4%22%20%2F%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","hax:code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2018%206-6-6-6%22%20%2F%3E%20%3Cpath%20d%3D%22m8%206-6%206%206%206%22%20%2F%3E%20%3C%2Fsvg%3E","hax:bulletin-board":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%228%22%20height%3D%224%22%20x%3D%228%22%20y%3D%222%22%20rx%3D%221%22%20ry%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M16%204h2a2%202%200%200%201%202%202v14a2%202%200%200%201-2%202H6a2%202%200%200%201-2-2V6a2%202%200%200%201%202-2h2%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2011h4%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2016h4%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2011h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2016h.01%22%20%2F%3E%20%3C%2Fsvg%3E","hax:arrow-expand-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%205v14%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H7%22%20%2F%3E%20%3Cpath%20d%3D%22m15%2018%206-6-6-6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:arrow-all":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%202v20%22%20%2F%3E%20%3Cpath%20d%3D%22m15%2019-3%203-3-3%22%20%2F%3E%20%3Cpath%20d%3D%22m19%209%203%203-3%203%22%20%2F%3E%20%3Cpath%20d%3D%22M2%2012h20%22%20%2F%3E%20%3Cpath%20d%3D%22m5%209-3%203%203%203%22%20%2F%3E%20%3Cpath%20d%3D%22m9%205%203-3%203%203%22%20%2F%3E%20%3C%2Fsvg%3E","hax:add":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3Cpath%20d%3D%22M12%205v14%22%20%2F%3E%20%3C%2Fsvg%3E","icons:print":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2018H4a2%202%200%200%201-2-2v-5a2%202%200%200%201%202-2h16a2%202%200%200%201%202%202v5a2%202%200%200%201-2%202h-2%22%20%2F%3E%20%3Cpath%20d%3D%22M6%209V3a1%201%200%200%201%201-1h10a1%201%200%200%201%201%201v6%22%20%2F%3E%20%3Crect%20x%3D%226%22%20y%3D%2214%22%20width%3D%2212%22%20height%3D%228%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","icons:code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2018%206-6-6-6%22%20%2F%3E%20%3Cpath%20d%3D%22m8%206-6%206%206%206%22%20%2F%3E%20%3C%2Fsvg%3E","icons:check":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M20%206%209%2017l-5-5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:warning":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m21.73%2018-8-14a2%202%200%200%200-3.48%200l-8%2014A2%202%200%200%200%204%2021h16a2%202%200%200%200%201.73-3%22%20%2F%3E%20%3Cpath%20d%3D%22M12%209v4%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2017h.01%22%20%2F%3E%20%3C%2Fsvg%3E","icons:select-all":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%203a2%202%200%200%200-2%202%22%20%2F%3E%20%3Cpath%20d%3D%22M19%203a2%202%200%200%201%202%202%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019a2%202%200%200%201-2%202%22%20%2F%3E%20%3Cpath%20d%3D%22M5%2021a2%202%200%200%201-2-2%22%20%2F%3E%20%3Cpath%20d%3D%22M9%203h1%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2021h1%22%20%2F%3E%20%3Cpath%20d%3D%22M14%203h1%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2021h1%22%20%2F%3E%20%3Cpath%20d%3D%22M3%209v1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%209v1%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2014v1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2014v1%22%20%2F%3E%20%3C%2Fsvg%3E","icons:search":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m21%2021-4.34-4.34%22%20%2F%3E%20%3Ccircle%20cx%3D%2211%22%20cy%3D%2211%22%20r%3D%228%22%20%2F%3E%20%3C%2Fsvg%3E","icons:file-download":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2015V3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2015v4a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2v-4%22%20%2F%3E%20%3Cpath%20d%3D%22m7%2010%205%205%205-5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:history":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%2012a9%209%200%201%200%209-9%209.75%209.75%200%200%200-6.74%202.74L3%208%22%20%2F%3E%20%3Cpath%20d%3D%22M3%203v5h5%22%20%2F%3E%20%3Cpath%20d%3D%22M12%207v5l4%202%22%20%2F%3E%20%3C%2Fsvg%3E","icons:visibility":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2.062%2012.348a1%201%200%200%201%200-.696%2010.75%2010.75%200%200%201%2019.876%200%201%201%200%200%201%200%20.696%2010.75%2010.75%200%200%201-19.876%200%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","icons:visibility-off":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10.733%205.076a10.744%2010.744%200%200%201%2011.205%206.575%201%201%200%200%201%200%20.696%2010.747%2010.747%200%200%201-1.444%202.49%22%20%2F%3E%20%3Cpath%20d%3D%22M14.084%2014.158a3%203%200%200%201-4.242-4.242%22%20%2F%3E%20%3Cpath%20d%3D%22M17.479%2017.499a10.75%2010.75%200%200%201-15.417-5.151%201%201%200%200%201%200-.696%2010.75%2010.75%200%200%201%204.446-5.143%22%20%2F%3E%20%3Cpath%20d%3D%22m2%202%2020%2020%22%20%2F%3E%20%3C%2Fsvg%3E","icons:lock":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2211%22%20x%3D%223%22%20y%3D%2211%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2011V7a5%205%200%200%201%2010%200v4%22%20%2F%3E%20%3C%2Fsvg%3E","icons:lock-open":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2211%22%20x%3D%223%22%20y%3D%2211%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2011V7a5%205%200%200%201%209.9-1%22%20%2F%3E%20%3C%2Fsvg%3E","icons:folder":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M20%2020a2%202%200%200%200%202-2V8a2%202%200%200%200-2-2h-7.9a2%202%200%200%201-1.69-.9L9.6%203.9A2%202%200%200%200%207.93%203H4a2%202%200%200%200-2%202v13a2%202%200%200%200%202%202Z%22%20%2F%3E%20%3C%2Fsvg%3E","icons:error":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%228%22%20y2%3D%2212%22%20%2F%3E%20%3Cline%20x1%3D%2212%22%20x2%3D%2212.01%22%20y1%3D%2216%22%20y2%3D%2216%22%20%2F%3E%20%3C%2Fsvg%3E","icons:content-copy":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2214%22%20height%3D%2214%22%20x%3D%228%22%20y%3D%228%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2016c-1.1%200-2-.9-2-2V4c0-1.1.9-2%202-2h10c1.1%200%202%20.9%202%202%22%20%2F%3E%20%3C%2Fsvg%3E","icons:link":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2013a5%205%200%200%200%207.54.54l3-3a5%205%200%200%200-7.07-7.07l-1.72%201.71%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2011a5%205%200%200%200-7.54-.54l-3%203a5%205%200%200%200%207.07%207.07l1.71-1.71%22%20%2F%3E%20%3C%2Fsvg%3E","icons:create":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21.174%206.812a1%201%200%200%200-3.986-3.987L3.842%2016.174a2%202%200%200%200-.5.83l-1.321%204.352a.5.5%200%200%200%20.623.622l4.353-1.32a2%202%200%200%200%20.83-.497z%22%20%2F%3E%20%3Cpath%20d%3D%22m15%205%204%204%22%20%2F%3E%20%3C%2Fsvg%3E","icons:undo":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9%2014%204%209l5-5%22%20%2F%3E%20%3Cpath%20d%3D%22M4%209h10.5a5.5%205.5%200%200%201%205.5%205.5a5.5%205.5%200%200%201-5.5%205.5H11%22%20%2F%3E%20%3C%2Fsvg%3E","icons:redo":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m15%2014%205-5-5-5%22%20%2F%3E%20%3Cpath%20d%3D%22M20%209H9.5A5.5%205.5%200%200%200%204%2014.5A5.5%205.5%200%200%200%209.5%2020H13%22%20%2F%3E%20%3C%2Fsvg%3E","icons:save":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15.2%203a2%202%200%200%201%201.4.6l3.8%203.8a2%202%200%200%201%20.6%201.4V19a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2V5a2%202%200%200%201%202-2z%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2021v-7a1%201%200%200%200-1-1H8a1%201%200%200%200-1%201v7%22%20%2F%3E%20%3Cpath%20d%3D%22M7%203v4a1%201%200%200%200%201%201h7%22%20%2F%3E%20%3C%2Fsvg%3E","icons:refresh":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%2012a9%209%200%200%201%209-9%209.75%209.75%200%200%201%206.74%202.74L21%208%22%20%2F%3E%20%3Cpath%20d%3D%22M21%203v5h-5%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012a9%209%200%200%201-9%209%209.75%209.75%200%200%201-6.74-2.74L3%2016%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2016H3v5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:open-with":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%202v20%22%20%2F%3E%20%3Cpath%20d%3D%22m15%2019-3%203-3-3%22%20%2F%3E%20%3Cpath%20d%3D%22m19%209%203%203-3%203%22%20%2F%3E%20%3Cpath%20d%3D%22M2%2012h20%22%20%2F%3E%20%3Cpath%20d%3D%22m5%209-3%203%203%203%22%20%2F%3E%20%3Cpath%20d%3D%22m9%205%203-3%203%203%22%20%2F%3E%20%3C%2Fsvg%3E","icons:info":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2016v-4%22%20%2F%3E%20%3Cpath%20d%3D%22M12%208h.01%22%20%2F%3E%20%3C%2Fsvg%3E","icons:description":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2013H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2017H8%22%20%2F%3E%20%3C%2Fsvg%3E","icons:delete":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2011v6%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2011v6%22%20%2F%3E%20%3Cpath%20d%3D%22M19%206v14a2%202%200%200%201-2%202H7a2%202%200%200%201-2-2V6%22%20%2F%3E%20%3Cpath%20d%3D%22M3%206h18%22%20%2F%3E%20%3Cpath%20d%3D%22M8%206V4a2%202%200%200%201%202-2h4a2%202%200%200%201%202%202v2%22%20%2F%3E%20%3C%2Fsvg%3E","icons:view-module":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%2214%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%2214%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%223%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","icons:toc":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M8%205h13%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2019h8%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2010a2%202%200%200%200%202%202h3%22%20%2F%3E%20%3Cpath%20d%3D%22M3%205v12a2%202%200%200%200%202%202h3%22%20%2F%3E%20%3C%2Fsvg%3E","icons:swap-vert":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m21%2016-4%204-4-4%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2020V4%22%20%2F%3E%20%3Cpath%20d%3D%22m3%208%204-4%204%204%22%20%2F%3E%20%3Cpath%20d%3D%22M7%204v16%22%20%2F%3E%20%3C%2Fsvg%3E","icons:swap-horiz":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M8%203%204%207l4%204%22%20%2F%3E%20%3Cpath%20d%3D%22M4%207h16%22%20%2F%3E%20%3Cpath%20d%3D%22m16%2021%204-4-4-4%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2017H4%22%20%2F%3E%20%3C%2Fsvg%3E","icons:style":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m14.622%2017.897-10.68-2.913%22%20%2F%3E%20%3Cpath%20d%3D%22M18.376%202.622a1%201%200%201%201%203.002%203.002L17.36%209.643a.5.5%200%200%200%200%20.707l.944.944a2.41%202.41%200%200%201%200%203.408l-.944.944a.5.5%200%200%201-.707%200L8.354%207.348a.5.5%200%200%201%200-.707l.944-.944a2.41%202.41%200%200%201%203.408%200l.944.944a.5.5%200%200%200%20.707%200z%22%20%2F%3E%20%3Cpath%20d%3D%22M9%208c-1.804%202.71-3.97%203.46-6.583%203.948a.507.507%200%200%200-.302.819l7.32%208.883a1%201%200%200%200%201.185.204C12.735%2020.405%2016%2016.792%2016%2015%22%20%2F%3E%20%3C%2Fsvg%3E","icons:restore":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%2012a9%209%200%201%200%209-9%209.75%209.75%200%200%200-6.74%202.74L3%208%22%20%2F%3E%20%3Cpath%20d%3D%22M3%203v5h5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:record-voice-over":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2019v3%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2010v2a7%207%200%200%201-14%200v-2%22%20%2F%3E%20%3Crect%20x%3D%229%22%20y%3D%222%22%20width%3D%226%22%20height%3D%2213%22%20rx%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","icons:perm-media":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m22%2011-1.296-1.296a2.4%202.4%200%200%200-3.408%200L11%2016%22%20%2F%3E%20%3Cpath%20d%3D%22M4%208a2%202%200%200%200-2%202v10a2%202%200%200%200%202%202h10a2%202%200%200%200%202-2%22%20%2F%3E%20%3Ccircle%20cx%3D%2213%22%20cy%3D%227%22%20r%3D%221%22%20fill%3D%22currentColor%22%20%2F%3E%20%3Crect%20x%3D%228%22%20y%3D%222%22%20width%3D%2214%22%20height%3D%2214%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","icons:open-in-new":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%203h6v6%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2014%2021%203%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2013v6a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2V8a2%202%200%200%201%202-2h6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:move-to-inbox":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpolyline%20points%3D%2222%2012%2016%2012%2014%2015%2010%2015%208%2012%202%2012%22%20%2F%3E%20%3Cpath%20d%3D%22M5.45%205.11%202%2012v6a2%202%200%200%200%202%202h16a2%202%200%200%200%202-2v-6l-3.45-6.89A2%202%200%200%200%2016.76%204H7.24a2%202%200%200%200-1.79%201.11z%22%20%2F%3E%20%3C%2Fsvg%3E","icons:menu":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%205h16%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2012h16%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2019h16%22%20%2F%3E%20%3C%2Fsvg%3E","icons:launch":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%203h6v6%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2014%2021%203%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2013v6a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2V8a2%202%200%200%201%202-2h6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:label":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12.586%202.586A2%202%200%200%200%2011.172%202H4a2%202%200%200%200-2%202v7.172a2%202%200%200%200%20.586%201.414l8.704%208.704a2.426%202.426%200%200%200%203.42%200l6.58-6.58a2.426%202.426%200%200%200%200-3.42z%22%20%2F%3E%20%3Ccircle%20cx%3D%227.5%22%20cy%3D%227.5%22%20r%3D%22.5%22%20fill%3D%22currentColor%22%20%2F%3E%20%3C%2Fsvg%3E","icons:fullscreen":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M8%203H5a2%202%200%200%200-2%202v3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%208V5a2%202%200%200%200-2-2h-3%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2016v3a2%202%200%200%200%202%202h3%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2021h3a2%202%200%200%200%202-2v-3%22%20%2F%3E%20%3C%2Fsvg%3E","icons:file-upload":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%203v12%22%20%2F%3E%20%3Cpath%20d%3D%22m17%208-5-5-5%205%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2015v4a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2v-4%22%20%2F%3E%20%3C%2Fsvg%3E","icons:compress":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m14%2010%207-7%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2010h-6V4%22%20%2F%3E%20%3Cpath%20d%3D%22m3%2021%207-7%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2014h6v6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:clear":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%206%206%2018%22%20%2F%3E%20%3Cpath%20d%3D%22m6%206%2012%2012%22%20%2F%3E%20%3C%2Fsvg%3E","icons:close":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%206%206%2018%22%20%2F%3E%20%3Cpath%20d%3D%22m6%206%2012%2012%22%20%2F%3E%20%3C%2Fsvg%3E","icons:cancel":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%206%206%2018%22%20%2F%3E%20%3Cpath%20d%3D%22m6%206%2012%2012%22%20%2F%3E%20%3C%2Fsvg%3E","icons:arrow-upward":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m5%2012%207-7%207%207%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2019V5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:arrow-downward":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%205v14%22%20%2F%3E%20%3Cpath%20d%3D%22m19%2012-7%207-7-7%22%20%2F%3E%20%3C%2Fsvg%3E","icons:arrow-back":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m12%2019-7-7%207-7%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2012H5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:arrow-forward":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3Cpath%20d%3D%22m12%205%207%207-7%207%22%20%2F%3E%20%3C%2Fsvg%3E","icons:chevron-left":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m15%2018-6-6%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:chevron-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:expand-more":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m6%209%206%206%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:expand-less":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18%2015-6-6-6%206%22%20%2F%3E%20%3C%2Fsvg%3E","icons:arrow-drop-down":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m6%209%206%206%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:more-vert":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%225%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2219%22%20r%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","icons:more-horiz":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2219%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%225%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","icons:settings":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9.671%204.136a2.34%202.34%200%200%201%204.659%200%202.34%202.34%200%200%200%203.319%201.915%202.34%202.34%200%200%201%202.33%204.033%202.34%202.34%200%200%200%200%203.831%202.34%202.34%200%200%201-2.33%204.033%202.34%202.34%200%200%200-3.319%201.915%202.34%202.34%200%200%201-4.659%200%202.34%202.34%200%200%200-3.32-1.915%202.34%202.34%200%200%201-2.33-4.033%202.34%202.34%200%200%200%200-3.831A2.34%202.34%200%200%201%206.35%206.051a2.34%202.34%200%200%200%203.319-1.915%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","icons:home":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2021v-8a1%201%200%200%200-1-1h-4a1%201%200%200%200-1%201v8%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2010a2%202%200%200%201%20.709-1.528l7-6a2%202%200%200%201%202.582%200l7%206A2%202%200%200%201%2021%2010v9a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2z%22%20%2F%3E%20%3C%2Fsvg%3E","icons:help":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cpath%20d%3D%22M9.09%209a3%203%200%200%201%205.83%201c0%202-3%203-3%203%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2017h.01%22%20%2F%3E%20%3C%2Fsvg%3E","icons:add":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3Cpath%20d%3D%22M12%205v14%22%20%2F%3E%20%3C%2Fsvg%3E","icons:add-box":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M12%208v8%22%20%2F%3E%20%3C%2Fsvg%3E","icons:remove":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3C%2Fsvg%3E","icons:find-replace":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M14%204a1%201%200%200%201%201-1%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2010a1%201%200%200%201-1-1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%204a1%201%200%200%200-1-1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%209a1%201%200%200%201-1%201%22%20%2F%3E%20%3Cpath%20d%3D%22m3%207%203%203%203-3%22%20%2F%3E%20%3Cpath%20d%3D%22M6%2010V5a2%202%200%200%201%202-2h2%22%20%2F%3E%20%3Crect%20x%3D%223%22%20y%3D%2214%22%20width%3D%227%22%20height%3D%227%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","icons:archive":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2220%22%20height%3D%225%22%20x%3D%222%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M4%208v11a2%202%200%200%200%202%202h12a2%202%200%200%200%202-2V8%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2012h4%22%20%2F%3E%20%3C%2Fsvg%3E","icons:exit-to-app":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2017%205-5-5-5%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H9%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2021H5a2%202%200%200%201-2-2V5a2%202%200%200%201%202-2h4%22%20%2F%3E%20%3C%2Fsvg%3E","icons:account-circle":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2210%22%20r%3D%223%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2020.662V19a2%202%200%200%201%202-2h6a2%202%200%200%201%202%202v1.662%22%20%2F%3E%20%3C%2Fsvg%3E","icons:star":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11.525%202.295a.53.53%200%200%201%20.95%200l2.31%204.679a2.123%202.123%200%200%200%201.595%201.16l5.166.756a.53.53%200%200%201%20.294.904l-3.736%203.638a2.123%202.123%200%200%200-.611%201.878l.882%205.14a.53.53%200%200%201-.771.56l-4.618-2.428a2.122%202.122%200%200%200-1.973%200L6.396%2021.01a.53.53%200%200%201-.77-.56l.881-5.139a2.122%202.122%200%200%200-.611-1.879L2.16%209.795a.53.53%200%200%201%20.294-.906l5.165-.755a2.122%202.122%200%200%200%201.597-1.16z%22%20%2F%3E%20%3C%2Fsvg%3E","icons:bookmark":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M17%203a2%202%200%200%201%202%202v15a1%201%200%200%201-1.496.868l-4.512-2.578a2%202%200%200%200-1.984%200l-4.512%202.578A1%201%200%200%201%205%2020V5a2%202%200%200%201%202-2z%22%20%2F%3E%20%3C%2Fsvg%3E","icons:assignment-turned-in":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%228%22%20height%3D%224%22%20x%3D%228%22%20y%3D%222%22%20rx%3D%221%22%20ry%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M16%204h2a2%202%200%200%201%202%202v14a2%202%200%200%201-2%202H6a2%202%200%200%201-2-2V6a2%202%200%200%201%202-2h2%22%20%2F%3E%20%3Cpath%20d%3D%22m9%2014%202%202%204-4%22%20%2F%3E%20%3C%2Fsvg%3E","editor:insert-link":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2013a5%205%200%200%200%207.54.54l3-3a5%205%200%200%200-7.07-7.07l-1.72%201.71%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2011a5%205%200%200%200-7.54-.54l-3%203a5%205%200%200%200%207.07%207.07l1.71-1.71%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-align-left":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2012H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2019H3%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-align-center":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2012H7%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2019H5%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-align-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H9%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H7%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-align-justify":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%205h18%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2012h18%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2019h18%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-list-bulleted":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%205h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2012h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2019h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M8%205h13%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h13%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2019h13%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-list-numbered":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11%205h10%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2012h10%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2019h10%22%20%2F%3E%20%3Cpath%20d%3D%22M4%204h1v5%22%20%2F%3E%20%3Cpath%20d%3D%22M4%209h2%22%20%2F%3E%20%3Cpath%20d%3D%22M6.5%2020H3.4c0-1%202.6-1.925%202.6-3.5a1.5%201.5%200%200%200-2.6-1.02%22%20%2F%3E%20%3C%2Fsvg%3E","editor:insert-drive-file":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3C%2Fsvg%3E","editor:insert-photo":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%229%22%20r%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22m21%2015-3.086-3.086a2%202%200%200%200-2.828%200L6%2021%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-quote":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%203a2%202%200%200%200-2%202v6a2%202%200%200%200%202%202%201%201%200%200%201%201%201v1a2%202%200%200%201-2%202%201%201%200%200%200-1%201v2a1%201%200%200%200%201%201%206%206%200%200%200%206-6V5a2%202%200%200%200-2-2z%22%20%2F%3E%20%3Cpath%20d%3D%22M5%203a2%202%200%200%200-2%202v6a2%202%200%200%200%202%202%201%201%200%200%201%201%201v1a2%202%200%200%201-2%202%201%201%200%200%200-1%201v2a1%201%200%200%200%201%201%206%206%200%200%200%206-6V5a2%202%200%200%200-2-2z%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-italic":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cline%20x1%3D%2219%22%20x2%3D%2210%22%20y1%3D%224%22%20y2%3D%224%22%20%2F%3E%20%3Cline%20x1%3D%2214%22%20x2%3D%225%22%20y1%3D%2220%22%20y2%3D%2220%22%20%2F%3E%20%3Cline%20x1%3D%2215%22%20x2%3D%229%22%20y1%3D%224%22%20y2%3D%2220%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-bold":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2012h9a4%204%200%200%201%200%208H7a1%201%200%200%201-1-1V5a1%201%200%200%201%201-1h7a4%204%200%200%201%200%208%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-underlined":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%204v6a6%206%200%200%200%2012%200V4%22%20%2F%3E%20%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2220%22%20y2%3D%2220%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-strikethrough":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%204H9a3%203%200%200%200-2.83%204%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2012a4%204%200%200%201%200%208H6%22%20%2F%3E%20%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2212%22%20y2%3D%2212%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-clear":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%207V4h16v3%22%20%2F%3E%20%3Cpath%20d%3D%22M5%2020h6%22%20%2F%3E%20%3Cpath%20d%3D%22M13%204%208%2020%22%20%2F%3E%20%3Cpath%20d%3D%22m15%2015%205%205%22%20%2F%3E%20%3Cpath%20d%3D%22m20%2015-5%205%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-line-spacing":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%205h11%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2012h11%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2019h11%22%20%2F%3E%20%3Cpath%20d%3D%22m3%2010%203-3-3-3%22%20%2F%3E%20%3Cpath%20d%3D%22m3%2020%203-3-3-3%22%20%2F%3E%20%3C%2Fsvg%3E","editor:insert-emoticon":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2010V9%22%20%2F%3E%20%3Cpath%20d%3D%22M16.472%2015a6%206%200%2001-8.943%200%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2010V9%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3C%2Fsvg%3E","editor:highlight":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m9%2011-6%206v3h9l3-3%22%20%2F%3E%20%3Cpath%20d%3D%22m22%2012-4.6%204.6a2%202%200%200%201-2.8%200l-5.2-5.2a2%202%200%200%201%200-2.8L14%204%22%20%2F%3E%20%3C%2Fsvg%3E","editor:functions":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%207V5a1%201%200%200%200-1-1H6.5a.5.5%200%200%200-.4.8l4.5%206a2%202%200%200%201%200%202.4l-4.5%206a.5.5%200%200%200%20.4.8H17a1%201%200%200%200%201-1v-2%22%20%2F%3E%20%3C%2Fsvg%3E","editor:title":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2012h12%22%20%2F%3E%20%3Cpath%20d%3D%22M6%2020V4%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2020V4%22%20%2F%3E%20%3C%2Fsvg%3E","editor:short-text":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2012H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2019H3%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-textdirection-r-to-l":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%203v11%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209H7a1%201%200%200%201%200-6h8%22%20%2F%3E%20%3Cpath%20d%3D%22M14%203v11%22%20%2F%3E%20%3Cpath%20d%3D%22m18%2014%204%204H2%22%20%2F%3E%20%3Cpath%20d%3D%22m22%2018-4%204%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-size":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m15%2016%202.536-7.328a1.02%201.02%201%200%201%201.928%200L22%2016%22%20%2F%3E%20%3Cpath%20d%3D%22M15.697%2014h5.606%22%20%2F%3E%20%3Cpath%20d%3D%22m2%2016%204.039-9.69a.5.5%200%200%201%20.923%200L11%2016%22%20%2F%3E%20%3Cpath%20d%3D%22M3.304%2013h6.392%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-indent-increase":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m3%208%204%204-4%204%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-indent-decrease":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m7%208-4%204%204%204%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-color-text":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2020h16%22%20%2F%3E%20%3Cpath%20d%3D%22m6%2016%206-12%206%2012%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h8%22%20%2F%3E%20%3C%2Fsvg%3E","editor:border-all":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%203v18%22%20%2F%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M3%209h18%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2015h18%22%20%2F%3E%20%3C%2Fsvg%3E","editor:attach-file":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%206-8.414%208.586a2%202%200%200%200%202.829%202.829l8.414-8.586a4%204%200%201%200-5.657-5.657l-8.379%208.551a6%206%200%201%200%208.485%208.485l8.379-8.551%22%20%2F%3E%20%3C%2Fsvg%3E","editor:mode-edit":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21.174%206.812a1%201%200%200%200-3.986-3.987L3.842%2016.174a2%202%200%200%200-.5.83l-1.321%204.352a.5.5%200%200%200%20.623.622l4.353-1.32a2%202%200%200%200%20.83-.497z%22%20%2F%3E%20%3Cpath%20d%3D%22m15%205%204%204%22%20%2F%3E%20%3C%2Fsvg%3E","mdextra:unlink":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18.84%2012.25%201.72-1.71h-.02a5.004%205.004%200%200%200-.12-7.07%205.006%205.006%200%200%200-6.95%200l-1.72%201.71%22%20%2F%3E%20%3Cpath%20d%3D%22m5.17%2011.75-1.71%201.71a5.004%205.004%200%200%200%20.12%207.07%205.006%205.006%200%200%200%206.95%200l1.71-1.71%22%20%2F%3E%20%3Cline%20x1%3D%228%22%20x2%3D%228%22%20y1%3D%222%22%20y2%3D%225%22%20%2F%3E%20%3Cline%20x1%3D%222%22%20x2%3D%225%22%20y1%3D%228%22%20y2%3D%228%22%20%2F%3E%20%3Cline%20x1%3D%2216%22%20x2%3D%2216%22%20y1%3D%2219%22%20y2%3D%2222%22%20%2F%3E%20%3Cline%20x1%3D%2219%22%20x2%3D%2222%22%20y1%3D%2216%22%20y2%3D%2216%22%20%2F%3E%20%3C%2Fsvg%3E","mdextra:superscript":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m4%2019%208-8%22%20%2F%3E%20%3Cpath%20d%3D%22m12%2019-8-8%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2012h-4c0-1.5.442-2%201.5-2.5S20%208.334%2020%207.002c0-.472-.17-.93-.484-1.29a2.105%202.105%200%200%200-2.617-.436c-.42.239-.738.614-.899%201.06%22%20%2F%3E%20%3C%2Fsvg%3E","mdextra:subscript":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m4%205%208%208%22%20%2F%3E%20%3Cpath%20d%3D%22m12%205-8%208%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2019h-4c0-1.5.44-2%201.5-2.5S20%2015.33%2020%2014c0-.47-.17-.93-.48-1.29a2.11%202.11%200%200%200-2.62-.44c-.42.24-.74.62-.9%201.07%22%20%2F%3E%20%3C%2Fsvg%3E","image:tune":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2019H3%22%20%2F%3E%20%3Cpath%20d%3D%22M14%203v4%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2017v4%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012h-9%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019h-5%22%20%2F%3E%20%3Cpath%20d%3D%22M21%205h-7%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2010v4%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012H3%22%20%2F%3E%20%3C%2Fsvg%3E","image:image":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%229%22%20r%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22m21%2015-3.086-3.086a2%202%200%200%200-2.828%200L6%2021%22%20%2F%3E%20%3C%2Fsvg%3E","image:style":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m14.622%2017.897-10.68-2.913%22%20%2F%3E%20%3Cpath%20d%3D%22M18.376%202.622a1%201%200%201%201%203.002%203.002L17.36%209.643a.5.5%200%200%200%200%20.707l.944.944a2.41%202.41%200%200%201%200%203.408l-.944.944a.5.5%200%200%201-.707%200L8.354%207.348a.5.5%200%200%201%200-.707l.944-.944a2.41%202.41%200%200%201%203.408%200l.944.944a.5.5%200%200%200%20.707%200z%22%20%2F%3E%20%3Cpath%20d%3D%22M9%208c-1.804%202.71-3.97%203.46-6.583%203.948a.507.507%200%200%200-.302.819l7.32%208.883a1%201%200%200%200%201.185.204C12.735%2020.405%2016%2016.792%2016%2015%22%20%2F%3E%20%3C%2Fsvg%3E","image:crop-landscape":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2220%22%20height%3D%2212%22%20x%3D%222%22%20y%3D%226%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","image:transform":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%202v14a2%202%200%200%200%202%202h14%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2022V8a2%202%200%200%200-2-2H2%22%20%2F%3E%20%3C%2Fsvg%3E","image:slideshow":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2%203h20%22%20%2F%3E%20%3Cpath%20d%3D%22M21%203v11a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2V3%22%20%2F%3E%20%3Cpath%20d%3D%22m7%2021%205-5%205%205%22%20%2F%3E%20%3C%2Fsvg%3E","image:rotate-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%2012a9%209%200%201%201-9-9c2.52%200%204.93%201%206.74%202.74L21%208%22%20%2F%3E%20%3Cpath%20d%3D%22M21%203v5h-5%22%20%2F%3E%20%3C%2Fsvg%3E","image:photo-library":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m22%2011-1.296-1.296a2.4%202.4%200%200%200-3.408%200L11%2016%22%20%2F%3E%20%3Cpath%20d%3D%22M4%208a2%202%200%200%200-2%202v10a2%202%200%200%200%202%202h10a2%202%200%200%200%202-2%22%20%2F%3E%20%3Ccircle%20cx%3D%2213%22%20cy%3D%227%22%20r%3D%221%22%20fill%3D%22currentColor%22%20%2F%3E%20%3Crect%20x%3D%228%22%20y%3D%222%22%20width%3D%2214%22%20height%3D%2214%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","image:music-note":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9%2018V5l12-2v13%22%20%2F%3E%20%3Ccircle%20cx%3D%226%22%20cy%3D%2218%22%20r%3D%223%22%20%2F%3E%20%3Ccircle%20cx%3D%2218%22%20cy%3D%2216%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","image:grid-on":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M3%209h18%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2015h18%22%20%2F%3E%20%3Cpath%20d%3D%22M9%203v18%22%20%2F%3E%20%3Cpath%20d%3D%22M15%203v18%22%20%2F%3E%20%3C%2Fsvg%3E","image:collections":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2%207v10%22%20%2F%3E%20%3Cpath%20d%3D%22M6%205v14%22%20%2F%3E%20%3Crect%20width%3D%2212%22%20height%3D%2218%22%20x%3D%2210%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","image:blur-on":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11.017%202.814a1%201%200%200%201%201.966%200l1.051%205.558a2%202%200%200%200%201.594%201.594l5.558%201.051a1%201%200%200%201%200%201.966l-5.558%201.051a2%202%200%200%200-1.594%201.594l-1.051%205.558a1%201%200%200%201-1.966%200l-1.051-5.558a2%202%200%200%200-1.594-1.594l-5.558-1.051a1%201%200%200%201%200-1.966l5.558-1.051a2%202%200%200%200%201.594-1.594z%22%20%2F%3E%20%3Cpath%20d%3D%22M20%202v4%22%20%2F%3E%20%3Cpath%20d%3D%22M22%204h-4%22%20%2F%3E%20%3Ccircle%20cx%3D%224%22%20cy%3D%2220%22%20r%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","av:play-circle-filled":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9%209.003a1%201%200%200%201%201.517-.859l4.997%202.997a1%201%200%200%201%200%201.718l-4.997%202.997A1%201%200%200%201%209%2014.996z%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3C%2Fsvg%3E","av:volume-up":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11%204.702a.705.705%200%200%200-1.203-.498L6.413%207.587A1.4%201.4%200%200%201%205.416%208H3a1%201%200%200%200-1%201v6a1%201%200%200%200%201%201h2.416a1.4%201.4%200%200%201%20.997.413l3.383%203.384A.705.705%200%200%200%2011%2019.298z%22%20%2F%3E%20%3Cpath%20d%3D%22M16%209a5%205%200%200%201%200%206%22%20%2F%3E%20%3Cpath%20d%3D%22M19.364%2018.364a9%209%200%200%200%200-12.728%22%20%2F%3E%20%3C%2Fsvg%3E","av:volume-off":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11%204.702a.7.7%200%200%200-1.203-.498L6.413%207.587A1.4%201.4%200%200%201%205.416%208H3a1%201%200%200%200-1%201v6a1%201%200%200%200%201%201h2.416a1.4%201.4%200%200%201%20.997.413l3.383%203.384A.7.7%200%200%200%2011%2019.298z%22%20%2F%3E%20%3Cpath%20d%3D%22m16.5%2014.5%205-5%22%20%2F%3E%20%3Cpath%20d%3D%22m16.5%209.5%205%205%22%20%2F%3E%20%3C%2Fsvg%3E","av:music-note":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9%2018V5l12-2v13%22%20%2F%3E%20%3Ccircle%20cx%3D%226%22%20cy%3D%2218%22%20r%3D%223%22%20%2F%3E%20%3Ccircle%20cx%3D%2218%22%20cy%3D%2216%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","av:videocam":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2013%205.223%203.482a.5.5%200%200%200%20.777-.416V7.87a.5.5%200%200%200-.752-.432L16%2010.5%22%20%2F%3E%20%3Crect%20x%3D%222%22%20y%3D%226%22%20width%3D%2214%22%20height%3D%2212%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","av:call-to-action":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2015h18%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:keyboard-return":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M20%204v7a4%204%200%200%201-4%204H4%22%20%2F%3E%20%3Cpath%20d%3D%22m9%2010-5%205%205%205%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:keyboard":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%208h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2012h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M14%208h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2012h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M18%208h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M6%208h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2016h10%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h.01%22%20%2F%3E%20%3Crect%20width%3D%2220%22%20height%3D%2216%22%20x%3D%222%22%20y%3D%224%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:keyboard-arrow-up":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18%2015-6-6-6%206%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:keyboard-arrow-down":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m6%209%206%206%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:security":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M20%2013c0%205-3.5%207.5-7.66%208.95a1%201%200%200%201-.67-.01C7.5%2020.5%204%2018%204%2013V6a1%201%200%200%201%201-1c2%200%204.5-1.2%206.24-2.72a1.17%201.17%200%200%201%201.52%200C14.51%203.81%2017%205%2019%205a1%201%200%200%201%201%201z%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:computer":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2220%22%20height%3D%2214%22%20x%3D%222%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cline%20x1%3D%228%22%20x2%3D%2216%22%20y1%3D%2221%22%20y2%3D%2221%22%20%2F%3E%20%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%2217%22%20y2%3D%2221%22%20%2F%3E%20%3C%2Fsvg%3E","device:brightness-medium":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%202v2%22%20%2F%3E%20%3Cpath%20d%3D%22M14.837%2016.385a6%206%200%201%201-7.223-7.222c.624-.147.97.66.715%201.248a4%204%200%200%200%205.26%205.259c.589-.255%201.396.09%201.248.715%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2012a4%204%200%200%200-4-4%22%20%2F%3E%20%3Cpath%20d%3D%22m19%205-1.256%201.256%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2012h2%22%20%2F%3E%20%3C%2Fsvg%3E","device:access-time":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cpath%20d%3D%22M12%206v6l4%202%22%20%2F%3E%20%3C%2Fsvg%3E","social:public":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cpath%20d%3D%22M12%202a14.5%2014.5%200%200%200%200%2020%2014.5%2014.5%200%200%200%200-20%22%20%2F%3E%20%3Cpath%20d%3D%22M2%2012h20%22%20%2F%3E%20%3C%2Fsvg%3E","social:person":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M19%2021v-2a4%204%200%200%200-4-4H9a4%204%200%200%200-4%204v2%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%227%22%20r%3D%224%22%20%2F%3E%20%3C%2Fsvg%3E","social:people":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%2021v-2a4%204%200%200%200-4-4H6a4%204%200%200%200-4%204v2%22%20%2F%3E%20%3Cpath%20d%3D%22M16%203.128a4%204%200%200%201%200%207.744%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2021v-2a4%204%200%200%200-3-3.87%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%227%22%20r%3D%224%22%20%2F%3E%20%3C%2Fsvg%3E","social:mood":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2010V9%22%20%2F%3E%20%3Cpath%20d%3D%22M16.472%2015a6%206%200%2001-8.943%200%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2010V9%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3C%2Fsvg%3E","places:all-inclusive":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2016c5%200%207-8%2012-8a4%204%200%200%201%200%208c-5%200-7-8-12-8a4%204%200%201%200%200%208%22%20%2F%3E%20%3C%2Fsvg%3E","maps:local-mall":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%2010a4%204%200%200%201-8%200%22%20%2F%3E%20%3Cpath%20d%3D%22M3.103%206.034h17.794%22%20%2F%3E%20%3Cpath%20d%3D%22M3.4%205.467a2%202%200%200%200-.4%201.2V20a2%202%200%200%200%202%202h14a2%202%200%200%200%202-2V6.667a2%202%200%200%200-.4-1.2l-2-2.667A2%202%200%200%200%2017%202H7a2%202%200%200%200-1.6.8z%22%20%2F%3E%20%3C%2Fsvg%3E","mdi-social:github-circle":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%206a9%209%200%200%200-9%209V3%22%20%2F%3E%20%3Ccircle%20cx%3D%2218%22%20cy%3D%226%22%20r%3D%223%22%20%2F%3E%20%3Ccircle%20cx%3D%226%22%20cy%3D%2218%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:palette":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2022a1%201%200%200%201%200-20%2010%209%200%200%201%2010%209%205%205%200%200%201-5%205h-2.25a1.75%201.75%200%200%200-1.4%202.8l.3.4a1.75%201.75%200%200%201-1.4%202.8z%22%20%2F%3E%20%3Ccircle%20cx%3D%2213.5%22%20cy%3D%226.5%22%20r%3D%22.5%22%20fill%3D%22currentColor%22%20%2F%3E%20%3Ccircle%20cx%3D%2217.5%22%20cy%3D%2210.5%22%20r%3D%22.5%22%20fill%3D%22currentColor%22%20%2F%3E%20%3Ccircle%20cx%3D%226.5%22%20cy%3D%2212.5%22%20r%3D%22.5%22%20fill%3D%22currentColor%22%20%2F%3E%20%3Ccircle%20cx%3D%228.5%22%20cy%3D%227.5%22%20r%3D%22.5%22%20fill%3D%22currentColor%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:pdf":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2013H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2017H8%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:write":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M13%2021h8%22%20%2F%3E%20%3Cpath%20d%3D%22M21.174%206.812a1%201%200%200%200-3.986-3.987L3.842%2016.174a2%202%200%200%200-.5.83l-1.321%204.352a.5.5%200%200%200%20.623.622l4.353-1.32a2%202%200%200%200%20.83-.497z%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:teacher":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21.42%2010.922a1%201%200%200%200-.019-1.838L12.83%205.18a2%202%200%200%200-1.66%200L2.6%209.08a1%201%200%200%200%200%201.832l8.57%203.908a2%202%200%200%200%201.66%200z%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2010v6%22%20%2F%3E%20%3Cpath%20d%3D%22M6%2012.5V16a6%203%200%200%200%2012%200v-3.5%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:quiz":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M13%205h8%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2019h8%22%20%2F%3E%20%3Cpath%20d%3D%22m3%2017%202%202%204-4%22%20%2F%3E%20%3Cpath%20d%3D%22m3%207%202%202%204-4%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:people":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%2021v-2a4%204%200%200%200-4-4H6a4%204%200%200%200-4%204v2%22%20%2F%3E%20%3Cpath%20d%3D%22M16%203.128a4%204%200%200%201%200%207.744%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2021v-2a4%204%200%200%200-3-3.87%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%227%22%20r%3D%224%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:page":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:book":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2019.5v-15A2.5%202.5%200%200%201%206.5%202H19a1%201%200%200%201%201%201v18a1%201%200%200%201-1%201H6.5a1%201%200%200%201%200-5H20%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:assessment":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%228%22%20height%3D%224%22%20x%3D%228%22%20y%3D%222%22%20rx%3D%221%22%20ry%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M16%204h2a2%202%200%200%201%202%202v14a2%202%200%200%201-2%202H6a2%202%200%200%201-2-2V6a2%202%200%200%201%202-2h2%22%20%2F%3E%20%3Cpath%20d%3D%22m9%2014%202%202%204-4%22%20%2F%3E%20%3C%2Fsvg%3E","courseicons:strategy":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2014c.2-1%20.7-1.7%201.5-2.5%201-.9%201.5-2.2%201.5-3.5A6%206%200%200%200%206%208c0%201%20.2%202.2%201.5%203.5.7.7%201.3%201.5%201.5%202.5%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2018h6%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2022h4%22%20%2F%3E%20%3C%2Fsvg%3E","courseicons:listen":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%2014h3a2%202%200%200%201%202%202v3a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2v-7a9%209%200%200%201%2018%200v7a2%202%200%200%201-2%202h-1a2%202%200%200%201-2-2v-3a2%202%200%200%201%202-2h3%22%20%2F%3E%20%3C%2Fsvg%3E","courseicons:learning-objectives":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%226%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","courseicons:knowledge":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2018V5%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2013a4.17%204.17%200%200%201-3-4%204.17%204.17%200%200%201-3%204%22%20%2F%3E%20%3Cpath%20d%3D%22M17.598%206.5A3%203%200%201%200%2012%205a3%203%200%201%200-5.598%201.5%22%20%2F%3E%20%3Cpath%20d%3D%22M17.997%205.125a4%204%200%200%201%202.526%205.77%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2018a4%204%200%200%200%202-7.464%22%20%2F%3E%20%3Cpath%20d%3D%22M19.967%2017.483A4%204%200%201%201%2012%2018a4%204%200%201%201-7.967-.517%22%20%2F%3E%20%3Cpath%20d%3D%22M6%2018a4%204%200%200%201-2-7.464%22%20%2F%3E%20%3Cpath%20d%3D%22M6.003%205.125a4%204%200%200%200-2.526%205.77%22%20%2F%3E%20%3C%2Fsvg%3E","courseicons:chem-connection":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M14%202v6a2%202%200%200%200%20.245.96l5.51%2010.08A2%202%200%200%201%2018%2022H6a2%202%200%200%201-1.755-2.96l5.51-10.08A2%202%200%200%200%2010%208V2%22%20%2F%3E%20%3Cpath%20d%3D%22M6.453%2015h11.094%22%20%2F%3E%20%3Cpath%20d%3D%22M8.5%202h7%22%20%2F%3E%20%3C%2Fsvg%3E","oer:box":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%208a2%202%200%200%200-1-1.73l-7-4a2%202%200%200%200-2%200l-7%204A2%202%200%200%200%203%208v8a2%202%200%200%200%201%201.73l7%204a2%202%200%200%200%202%200l7-4A2%202%200%200%200%2021%2016Z%22%20%2F%3E%20%3Cpath%20d%3D%22m3.3%207%208.7%205%208.7-5%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2022V12%22%20%2F%3E%20%3C%2Fsvg%3E","oer:graduation-cap":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21.42%2010.922a1%201%200%200%200-.019-1.838L12.83%205.18a2%202%200%200%200-1.66%200L2.6%209.08a1%201%200%200%200%200%201.832l8.57%203.908a2%202%200%200%200%201.66%200z%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2010v6%22%20%2F%3E%20%3Cpath%20d%3D%22M6%2012.5V16a6%203%200%200%200%2012%200v-3.5%22%20%2F%3E%20%3C%2Fsvg%3E","oer:pilcrow":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M13%204v16%22%20%2F%3E%20%3Cpath%20d%3D%22M17%204v16%22%20%2F%3E%20%3Cpath%20d%3D%22M19%204H9.5a4.5%204.5%200%200%200%200%209H13%22%20%2F%3E%20%3C%2Fsvg%3E","oer:type":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%204v16%22%20%2F%3E%20%3Cpath%20d%3D%22M4%207V5a1%201%200%200%201%201-1h14a1%201%200%200%201%201%201v2%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2020h6%22%20%2F%3E%20%3C%2Fsvg%3E","oer:plus":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3Cpath%20d%3D%22M12%205v14%22%20%2F%3E%20%3C%2Fsvg%3E","oer:arrow-up":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m5%2012%207-7%207%207%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2019V5%22%20%2F%3E%20%3C%2Fsvg%3E","oer:arrow-down":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%205v14%22%20%2F%3E%20%3Cpath%20d%3D%22m19%2012-7%207-7-7%22%20%2F%3E%20%3C%2Fsvg%3E","oer:arrow-up-to-line":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%203h14%22%20%2F%3E%20%3Cpath%20d%3D%22m18%2013-6-6-6%206%22%20%2F%3E%20%3Cpath%20d%3D%22M12%207v14%22%20%2F%3E%20%3C%2Fsvg%3E","oer:arrow-down-to-line":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2017V3%22%20%2F%3E%20%3Cpath%20d%3D%22m6%2011%206%206%206-6%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2021H5%22%20%2F%3E%20%3C%2Fsvg%3E","oer:copy":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2214%22%20height%3D%2214%22%20x%3D%228%22%20y%3D%228%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2016c-1.1%200-2-.9-2-2V4c0-1.1.9-2%202-2h10c1.1%200%202%20.9%202%202%22%20%2F%3E%20%3C%2Fsvg%3E","oer:columns-2":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M12%203v18%22%20%2F%3E%20%3C%2Fsvg%3E","oer:panel-right-close":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M15%203v18%22%20%2F%3E%20%3Cpath%20d%3D%22m8%209%203%203-3%203%22%20%2F%3E%20%3C%2Fsvg%3E","oer:code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2018%206-6-6-6%22%20%2F%3E%20%3Cpath%20d%3D%22m8%206-6%206%206%206%22%20%2F%3E%20%3C%2Fsvg%3E","oer:lock":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2211%22%20x%3D%223%22%20y%3D%2211%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2011V7a5%205%200%200%201%2010%200v4%22%20%2F%3E%20%3C%2Fsvg%3E","oer:lock-open":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2211%22%20x%3D%223%22%20y%3D%2211%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2011V7a5%205%200%200%201%209.9-1%22%20%2F%3E%20%3C%2Fsvg%3E","oer:trash-2":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2011v6%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2011v6%22%20%2F%3E%20%3Cpath%20d%3D%22M19%206v14a2%202%200%200%201-2%202H7a2%202%200%200%201-2-2V6%22%20%2F%3E%20%3Cpath%20d%3D%22M3%206h18%22%20%2F%3E%20%3Cpath%20d%3D%22M8%206V4a2%202%200%200%201%202-2h4a2%202%200%200%201%202%202v2%22%20%2F%3E%20%3C%2Fsvg%3E","oer:heading-2":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2018h-4c0-4%204-3%204-6%200-1.5-2-2.5-4-1%22%20%2F%3E%20%3C%2Fsvg%3E","oer:heading-3":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17.5%2010.5c1.7-1%203.5%200%203.5%201.5a2%202%200%200%201-2%202%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2017.5c2%201.5%204%20.3%204-1.5a2%202%200%200%200-2-2%22%20%2F%3E%20%3C%2Fsvg%3E","oer:heading-4":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2010v3a1%201%200%200%200%201%201h3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2010v8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3C%2Fsvg%3E","oer:heading-5":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2013v-3h4%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2017.7c.4.2.8.3%201.3.3%201.5%200%202.7-1.1%202.7-2.5S19.8%2013%2018.3%2013H17%22%20%2F%3E%20%3C%2Fsvg%3E","oer:heading-6":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Ccircle%20cx%3D%2219%22%20cy%3D%2216%22%20r%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2010c-2%202-3%203.5-3%206%22%20%2F%3E%20%3C%2Fsvg%3E","oer:quote":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%203a2%202%200%200%200-2%202v6a2%202%200%200%200%202%202%201%201%200%200%201%201%201v1a2%202%200%200%201-2%202%201%201%200%200%200-1%201v2a1%201%200%200%200%201%201%206%206%200%200%200%206-6V5a2%202%200%200%200-2-2z%22%20%2F%3E%20%3Cpath%20d%3D%22M5%203a2%202%200%200%200-2%202v6a2%202%200%200%200%202%202%201%201%200%200%201%201%201v1a2%202%200%200%201-2%202%201%201%200%200%200-1%201v2a1%201%200%200%200%201%201%206%206%200%200%200%206-6V5a2%202%200%200%200-2-2z%22%20%2F%3E%20%3C%2Fsvg%3E","oer:square-code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m10%209-3%203%203%203%22%20%2F%3E%20%3Cpath%20d%3D%22m14%2015%203-3-3-3%22%20%2F%3E%20%3Crect%20x%3D%223%22%20y%3D%223%22%20width%3D%2218%22%20height%3D%2218%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","oer:list":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%205h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2012h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2019h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M8%205h13%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h13%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2019h13%22%20%2F%3E%20%3C%2Fsvg%3E","oer:list-ordered":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11%205h10%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2012h10%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2019h10%22%20%2F%3E%20%3Cpath%20d%3D%22M4%204h1v5%22%20%2F%3E%20%3Cpath%20d%3D%22M4%209h2%22%20%2F%3E%20%3Cpath%20d%3D%22M6.5%2020H3.4c0-1%202.6-1.925%202.6-3.5a1.5%201.5%200%200%200-2.6-1.02%22%20%2F%3E%20%3C%2Fsvg%3E","oer:indent-increase":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m3%208%204%204-4%204%22%20%2F%3E%20%3C%2Fsvg%3E","oer:indent-decrease":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m7%208-4%204%204%204%22%20%2F%3E%20%3C%2Fsvg%3E","oer:align-left":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2012H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2019H3%22%20%2F%3E%20%3C%2Fsvg%3E","oer:align-center":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2012H7%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2019H5%22%20%2F%3E%20%3C%2Fsvg%3E","oer:align-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H9%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H7%22%20%2F%3E%20%3C%2Fsvg%3E","oer:bold":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2012h9a4%204%200%200%201%200%208H7a1%201%200%200%201-1-1V5a1%201%200%200%201%201-1h7a4%204%200%200%201%200%208%22%20%2F%3E%20%3C%2Fsvg%3E","oer:italic":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cline%20x1%3D%2219%22%20x2%3D%2210%22%20y1%3D%224%22%20y2%3D%224%22%20%2F%3E%20%3Cline%20x1%3D%2214%22%20x2%3D%225%22%20y1%3D%2220%22%20y2%3D%2220%22%20%2F%3E%20%3Cline%20x1%3D%2215%22%20x2%3D%229%22%20y1%3D%224%22%20y2%3D%2220%22%20%2F%3E%20%3C%2Fsvg%3E","oer:underline":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%204v6a6%206%200%200%200%2012%200V4%22%20%2F%3E%20%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2220%22%20y2%3D%2220%22%20%2F%3E%20%3C%2Fsvg%3E","oer:strikethrough":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%204H9a3%203%200%200%200-2.83%204%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2012a4%204%200%200%201%200%208H6%22%20%2F%3E%20%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2212%22%20y2%3D%2212%22%20%2F%3E%20%3C%2Fsvg%3E","oer:highlighter":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m9%2011-6%206v3h9l3-3%22%20%2F%3E%20%3Cpath%20d%3D%22m22%2012-4.6%204.6a2%202%200%200%201-2.8%200l-5.2-5.2a2%202%200%200%201%200-2.8L14%204%22%20%2F%3E%20%3C%2Fsvg%3E","oer:subscript":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m4%205%208%208%22%20%2F%3E%20%3Cpath%20d%3D%22m12%205-8%208%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2019h-4c0-1.5.44-2%201.5-2.5S20%2015.33%2020%2014c0-.47-.17-.93-.48-1.29a2.11%202.11%200%200%200-2.62-.44c-.42.24-.74.62-.9%201.07%22%20%2F%3E%20%3C%2Fsvg%3E","oer:superscript":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m4%2019%208-8%22%20%2F%3E%20%3Cpath%20d%3D%22m12%2019-8-8%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2012h-4c0-1.5.442-2%201.5-2.5S20%208.334%2020%207.002c0-.472-.17-.93-.484-1.29a2.105%202.105%200%200%200-2.617-.436c-.42.239-.738.614-.899%201.06%22%20%2F%3E%20%3C%2Fsvg%3E","oer:whole-word":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%227%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209v6%22%20%2F%3E%20%3Ccircle%20cx%3D%2217%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3Cpath%20d%3D%22M14%207v8%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2017v1c0%20.5-.5%201-1%201H3c-.5%200-1-.5-1-1v-1%22%20%2F%3E%20%3C%2Fsvg%3E","oer:link":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2013a5%205%200%200%200%207.54.54l3-3a5%205%200%200%200-7.07-7.07l-1.72%201.71%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2011a5%205%200%200%200-7.54-.54l-3%203a5%205%200%200%200%207.07%207.07l1.71-1.71%22%20%2F%3E%20%3C%2Fsvg%3E","oer:unlink":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18.84%2012.25%201.72-1.71h-.02a5.004%205.004%200%200%200-.12-7.07%205.006%205.006%200%200%200-6.95%200l-1.72%201.71%22%20%2F%3E%20%3Cpath%20d%3D%22m5.17%2011.75-1.71%201.71a5.004%205.004%200%200%200%20.12%207.07%205.006%205.006%200%200%200%206.95%200l1.71-1.71%22%20%2F%3E%20%3Cline%20x1%3D%228%22%20x2%3D%228%22%20y1%3D%222%22%20y2%3D%225%22%20%2F%3E%20%3Cline%20x1%3D%222%22%20x2%3D%225%22%20y1%3D%228%22%20y2%3D%228%22%20%2F%3E%20%3Cline%20x1%3D%2216%22%20x2%3D%2216%22%20y1%3D%2219%22%20y2%3D%2222%22%20%2F%3E%20%3Cline%20x1%3D%2219%22%20x2%3D%2222%22%20y1%3D%2216%22%20y2%3D%2216%22%20%2F%3E%20%3C%2Fsvg%3E","oer:remove-formatting":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%207V4h16v3%22%20%2F%3E%20%3Cpath%20d%3D%22M5%2020h6%22%20%2F%3E%20%3Cpath%20d%3D%22M13%204%208%2020%22%20%2F%3E%20%3Cpath%20d%3D%22m15%2015%205%205%22%20%2F%3E%20%3Cpath%20d%3D%22m20%2015-5%205%22%20%2F%3E%20%3C%2Fsvg%3E","oer:omega":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%2020h4.5a.5.5%200%200%200%20.5-.5v-.282a.52.52%200%200%200-.247-.437%208%208%200%201%201%208.494-.001.52.52%200%200%200-.247.438v.282a.5.5%200%200%200%20.5.5H21%22%20%2F%3E%20%3C%2Fsvg%3E","oer:smile":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2010V9%22%20%2F%3E%20%3Cpath%20d%3D%22M16.472%2015a6%206%200%2001-8.943%200%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2010V9%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3C%2Fsvg%3E","oer:sigma":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%207V5a1%201%200%200%200-1-1H6.5a.5.5%200%200%200-.4.8l4.5%206a2%202%200%200%201%200%202.4l-4.5%206a.5.5%200%200%200%20.4.8H17a1%201%200%200%200%201-1v-2%22%20%2F%3E%20%3C%2Fsvg%3E","oer:book-a":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2019.5v-15A2.5%202.5%200%200%201%206.5%202H19a1%201%200%200%201%201%201v18a1%201%200%200%201-1%201H6.5a1%201%200%200%201%200-5H20%22%20%2F%3E%20%3Cpath%20d%3D%22m8%2013%204-7%204%207%22%20%2F%3E%20%3Cpath%20d%3D%22M9.1%2011h5.7%22%20%2F%3E%20%3C%2Fsvg%3E","oer:audio-lines":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2%2010v3%22%20%2F%3E%20%3Cpath%20d%3D%22M6%206v11%22%20%2F%3E%20%3Cpath%20d%3D%22M10%203v18%22%20%2F%3E%20%3Cpath%20d%3D%22M14%208v7%22%20%2F%3E%20%3Cpath%20d%3D%22M18%205v13%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2010v3%22%20%2F%3E%20%3C%2Fsvg%3E","oer:message-square-quote":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M14%2014a2%202%200%200%200%202-2V8h-2%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2017a2%202%200%200%201-2%202H6.828a2%202%200%200%200-1.414.586l-2.202%202.202A.71.71%200%200%201%202%2021.286V5a2%202%200%200%201%202-2h16a2%202%200%200%201%202%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2014a2%202%200%200%200%202-2V8H8%22%20%2F%3E%20%3C%2Fsvg%3E","oer:chevron-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%20%2F%3E%20%3C%2Fsvg%3E","oer:check":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M20%206%209%2017l-5-5%22%20%2F%3E%20%3C%2Fsvg%3E","oer:smile-plus":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M13.267%202.08a10%2010%200%20108.653%208.653%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2010V9%22%20%2F%3E%20%3Cpath%20d%3D%22M16%205h6%22%20%2F%3E%20%3Cpath%20d%3D%22M16.472%2015a6%206%200%2001-8.943%200%22%20%2F%3E%20%3Cpath%20d%3D%22M19%202v6%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2010V9%22%20%2F%3E%20%3C%2Fsvg%3E","oer:grip-vertical":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%225%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%2219%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2215%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2215%22%20cy%3D%225%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2215%22%20cy%3D%2219%22%20r%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","oer:chevron-up":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18%2015-6-6-6%206%22%20%2F%3E%20%3C%2Fsvg%3E","oer:chevron-down":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m6%209%206%206%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","oer:sliders-horizontal":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2019H3%22%20%2F%3E%20%3Cpath%20d%3D%22M14%203v4%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2017v4%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012h-9%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019h-5%22%20%2F%3E%20%3Cpath%20d%3D%22M21%205h-7%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2010v4%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012H3%22%20%2F%3E%20%3C%2Fsvg%3E","oer:x":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%206%206%2018%22%20%2F%3E%20%3Cpath%20d%3D%22m6%206%2012%2012%22%20%2F%3E%20%3C%2Fsvg%3E","oer:command":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%206v12a3%203%200%201%200%203-3H6a3%203%200%201%200%203%203V6a3%203%200%201%200-3%203h12a3%203%200%201%200-3-3%22%20%2F%3E%20%3C%2Fsvg%3E","oer:circle-dashed":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10.1%202.182a10%2010%200%200%201%203.8%200%22%20%2F%3E%20%3Cpath%20d%3D%22M13.9%2021.818a10%2010%200%200%201-3.8%200%22%20%2F%3E%20%3Cpath%20d%3D%22M17.609%203.721a10%2010%200%200%201%202.69%202.7%22%20%2F%3E%20%3Cpath%20d%3D%22M2.182%2013.9a10%2010%200%200%201%200-3.8%22%20%2F%3E%20%3Cpath%20d%3D%22M20.279%2017.609a10%2010%200%200%201-2.7%202.69%22%20%2F%3E%20%3Cpath%20d%3D%22M21.818%2010.1a10%2010%200%200%201%200%203.8%22%20%2F%3E%20%3Cpath%20d%3D%22M3.721%206.391a10%2010%200%200%201%202.7-2.69%22%20%2F%3E%20%3Cpath%20d%3D%22M6.391%2020.279a10%2010%200%200%201-2.69-2.7%22%20%2F%3E%20%3C%2Fsvg%3E","oer:circle-check":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cpath%20d%3D%22m16%209-5.5%205.5L8%2012%22%20%2F%3E%20%3C%2Fsvg%3E","oer:clock":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cpath%20d%3D%22M12%206v6l4%202%22%20%2F%3E%20%3C%2Fsvg%3E","oer:arrow-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3Cpath%20d%3D%22m12%205%207%207-7%207%22%20%2F%3E%20%3C%2Fsvg%3E","oer:circle-alert":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%228%22%20y2%3D%2212%22%20%2F%3E%20%3Cline%20x1%3D%2212%22%20x2%3D%2212.01%22%20y1%3D%2216%22%20y2%3D%2216%22%20%2F%3E%20%3C%2Fsvg%3E","oer:eye-off":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10.733%205.076a10.744%2010.744%200%200%201%2011.205%206.575%201%201%200%200%201%200%20.696%2010.747%2010.747%200%200%201-1.444%202.49%22%20%2F%3E%20%3Cpath%20d%3D%22M14.084%2014.158a3%203%200%200%201-4.242-4.242%22%20%2F%3E%20%3Cpath%20d%3D%22M17.479%2017.499a10.75%2010.75%200%200%201-15.417-5.151%201%201%200%200%201%200-.696%2010.75%2010.75%200%200%201%204.446-5.143%22%20%2F%3E%20%3Cpath%20d%3D%22m2%202%2020%2020%22%20%2F%3E%20%3C%2Fsvg%3E","oer:eye":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2.062%2012.348a1%201%200%200%201%200-.696%2010.75%2010.75%200%200%201%2019.876%200%201%201%200%200%201%200%20.696%2010.75%2010.75%200%200%201-19.876%200%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","oer:files":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%202h-4a2%202%200%200%200-2%202v11a2%202%200%200%200%202%202h8a2%202%200%200%200%202-2V8%22%20%2F%3E%20%3Cpath%20d%3D%22M16.706%202.706A2.4%202.4%200%200%200%2015%202v5a1%201%200%200%200%201%201h5a2.4%202.4%200%200%200-.706-1.706z%22%20%2F%3E%20%3Cpath%20d%3D%22M5%207a2%202%200%200%200-2%202v11a2%202%200%200%200%202%202h8a2%202%200%200%200%201.732-1%22%20%2F%3E%20%3C%2Fsvg%3E","oer:chevron-left":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m15%2018-6-6%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:insert-drive-file":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3C%2Fsvg%3E"};function yo(){const a=xo;if(!a||a.__lucideInstalled)return;const e=a.getIcon.bind(a);a.getIcon=(t,r)=>{if(typeof t=="string"&&t){const i=t.includes(":")?t:`icons:${t}`;if(S[i])return S[i]}return e(t,r)},a.__lucideInstalled=!0,U2(globalThis.document)}function U2(a){for(const e of a.querySelectorAll("*")){if(typeof e.icon=="string"&&e.icon&&"src"in e){const t=e.icon;e.icon="",e.icon=t}e.shadowRoot&&U2(e.shadowRoot)}}function ko(){let a=N2,e=null;for(;a&&a!==HTMLElement;){if(Object.prototype.hasOwnProperty.call(a,"finalizeStyles"))return{ReactiveElement:a,LitElement:e};e=a,a=Object.getPrototypeOf(a)}throw new Error("Could not locate Lit base classes from HAXCMSLitElementTheme")}const{ReactiveElement:_o,LitElement:M}=ko(),$o=4e3;let Fo=0,et=class extends M{static get tag(){return"oer-toast"}static get properties(){return{_items:{state:!0}}}constructor(){super(),this._items=[],this.__timers=new Map}show({text:e="",duration:t=$o,closeText:r="Close",slot:i=null,onClose:o=null}){const n=++Fo;this._items=[...this._items,{id:n,text:e,closeText:r,slot:i,onClose:o}].slice(-4),t&&t>0&&this.__timers.set(n,setTimeout(()=>this.dismiss(n),Math.max(t,2e3)))}dismiss(e){const t=this._items.find(r=>r.id===e);clearTimeout(this.__timers.get(e)),this.__timers.delete(e),this._items=this._items.filter(r=>r.id!==e),t?.onClose?.()}clear(){for(const{id:e}of this._items)this.dismiss(e)}static get styles(){return b`
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
    `}render(){return s`
      <div role="status" aria-live="polite" aria-atomic="false">
        ${this._items.map(e=>s`
            <div class="toast">
              <div class="text">
                ${e.text}
                <div class="slot">${e.slot??""}</div>
              </div>
              <button class="close" aria-label="${e.closeText||"Close"}" @click="${()=>this.dismiss(e.id)}">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>
          `)}
      </div>
    `}};customElements.define(et.tag,et);function V2(){let a=globalThis.document.querySelector(et.tag);return a||(a=globalThis.document.createElement(et.tag),globalThis.document.body.appendChild(a)),a}function Co(){try{globalThis.localStorage.setItem("app-hax-soundStatus","false")}catch{}T.soundStatus=!1,T.playSound=()=>{},globalThis.addEventListener("haxcms-toast-show",a=>{a.stopImmediatePropagation();const e=a.detail||{};V2().show({text:e.text,duration:e.duration,closeText:e.closeText,slot:e.slot,onClose:typeof e.eventCallback=="function"?e.eventCallback:null})},{capture:!0}),globalThis.addEventListener("haxcms-toast-hide",a=>{a.stopImmediatePropagation(),V2().clear()},{capture:!0})}const Le=new Map;function Eo(a){if(a.styleSheet)return a.styleSheet;const e=new CSSStyleSheet;return e.replaceSync(String(a.cssText??a)),e}function K2(a,e){const t=a.adoptedStyleSheets,r=e.filter(i=>!t.includes(i));r.length&&(a.adoptedStyleSheets=[...t,...r])}function Yt(a){for(const[e,t]of Object.entries(a)){const r=Eo(t);for(const i of e.split(",").map(o=>o.trim()).filter(Boolean))Le.has(i)||Le.set(i,[]),Le.get(i).push(r)}W2(globalThis.document)}function Mo(){const a=_o.prototype;if(a.__oerShadowStyles)return;const e=a.createRenderRoot;a.createRenderRoot=function(){const t=e.call(this),r=Le.get(this.localName);return r&&t&&t.adoptedStyleSheets&&K2(t,r),t},a.__oerShadowStyles=!0}function W2(a){for(const e of a.querySelectorAll("*"))if(e.shadowRoot){const t=Le.get(e.localName);t&&K2(e.shadowRoot,t),W2(e.shadowRoot)}}const So=b`
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
`,Y2=["haxcms-appearance-admin-dialog","haxcms-content-admin-dialog","haxcms-files-admin-dialog","haxcms-outline-editor-dialog","haxcms-page-revisions-dialog","haxcms-seo-admin-dialog","haxcms-site-dashboard","haxcms-site-details-dialog","haxcms-site-import-export-dashboard","haxcms-site-settings-dashboard","haxcms-views-admin-dialog","hax-confirm-dialog","haxcms-about-dialog-ui","haxcms-allowed-blocks-ui","haxcms-editor-settings-dialog-ui","haxcms-site-platform-ui","haxcms-theme-preview-panel","haxcms-page-get-started"].join(","),Ao=["haxcms-site-editor-ui","app-hax-top-bar","app-hax-user-menu","app-hax-user-menu-button","simple-toolbar-button","simple-toolbar-menu","simple-toolbar-menu-item","simple-modal","simple-modal-template","simple-popover","simple-tooltip","hax-tray","hax-tray-button","hax-gizmo-browser","hax-stax-browser","hax-map","hax-view-source","hax-gizmo-browser","hax-picker","hax-app-picker","hax-cancel-dialog","hax-plate-context","hax-toolbar","hax-toolbar-item","hax-toolbar-menu","hax-context-item","hax-context-item-menu","hax-text-editor-toolbar","hax-text-editor-button","rich-text-editor-toolbar","rich-text-editor-button","super-daemon","super-daemon-ui","super-daemon-row","super-daemon-search","simple-fields","simple-fields-field","simple-fields-tabs","simple-fields-fieldset","haxcms-outline-editor-dialog","outline-designer","haxcms-site-dashboard","haxcms-page-revisions-dialog","hax-body","simple-toast-el","rpg-character-toast","haxcms-toast","a11y-collapse","simple-fields-container","simple-fields-url-combo","simple-fields-tag-list","page-break","simple-context-menu","simple-tooltip","d-d-d-sample","hax-plate-context","simple-picker","hax-map","hax-view-source","hax-gizmo-browser","hax-stax-browser","simple-popover","simple-popover-manager","hax-element-demo","hax-tray-upload","hax-upload-field","simple-file-upload","simple-button-grid","simple-popover-selection","outline-designer"].join(",")+","+Y2,G2=`
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
`,Ie=b`
  outline: 2px solid var(--ring);
  outline-offset: 2px;
`,To={[Ao]:So,"simple-fields-container, simple-fields-field, simple-fields-url-combo, simple-fields-tag-list":b`
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
  `,"simple-fields-field, simple-fields-url-combo, simple-fields-tag-list":b`
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
  `,"simple-toolbar-button, hax-toolbar-item, rich-text-editor-button, hax-text-editor-button":b`
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
      ${Ie}
    }
  `,"simple-tag":b`
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
  `,"hax-tray":b`
    /* HAX's editor panel only appears inside oer-settings-dialog, laid
       over the dialog's form area (which sets the --oer-tray-* values) */
    :host {
      position: fixed !important;
      top: var(--oer-tray-top, 0) !important;
      left: var(--oer-tray-left, 0) !important;
      right: auto !important;
      bottom: auto !important;
      width: var(--oer-tray-width, var(--editor-panel-width)) !important;
      height: var(--oer-tray-height, 100dvh) !important;
      z-index: 10001 !important;
      font-family: var(--font-sans) !important;
      color: var(--foreground);
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
    }
    :host([collapsed]),
    :host(:not([data-oer-dialog])) {
      display: none !important;
    }
    /* the dialog has its own title bar */
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

    /* the dialog's own title names the block */
    .tray-detail-titlebar {
      display: none !important;
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
  `,"a11y-collapse":b`
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
      ${Ie}
    }
    #content {
      font-size: 0.875rem;
    }
  `,"hax-gizmo-browser, hax-stax-browser":b`
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
  `,"hax-tray-button":b`
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
      ${Ie}
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
  `,"hax-upload-field":b`
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
    /* buttons that show their label (e.g. in Site Settings) size to it,
       instead of squeezing the text into an icon-sized square */
    [part="sources"] simple-toolbar-button[show-text-label] {
      width: auto !important;
      padding: 0 0.625rem !important;
    }
    [part="description"],
    #description {
      margin-top: 0.375rem !important;
      font-family: var(--font-sans) !important;
      font-size: 0.8125rem !important;
      line-height: 1.4 !important;
      color: var(--muted-foreground) !important;
    }
  `,"hax-tray-upload":b`
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
  `,"simple-file-upload":b`
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
  `,"hax-plate-context":b`
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
  `,"rich-text-editor-toolbar, hax-text-editor-toolbar":b`
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
  `,"hax-context-item, hax-toolbar-menu, hax-toolbar-item, rich-text-editor-button, hax-text-editor-button, rich-text-editor-link, rich-text-editor-unlink, rich-text-editor-underline, rich-text-editor-symbol-picker, rich-text-editor-emoji-picker, rich-text-editor-icon-picker":b`
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
  `,"simple-picker":b`
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
  `,"hax-toolbar":b`
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
  `,"hax-text-editor-toolbar, rich-text-editor-toolbar":b`
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
  `,"hax-toolbar-menu, hax-context-item-menu, simple-toolbar-menu":b`
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
  `,"simple-toolbar-menu-item, hax-toolbar-menu-item":b`
    :host {
      font-family: var(--font-sans);
      font-size: 0.875rem;
    }
    ::slotted(*),
    button {
      border-radius: var(--radius-sm) !important;
      font-size: 0.875rem !important;
    }
  `,"page-break":b`
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
  `,"hax-map":b`
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
  `,"hax-view-source":b`
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
  `,"simple-popover-manager":b`
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
  `,"simple-popover":b`
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
  `,"hax-element-demo":b`
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
  `,"d-d-d-sample":b`
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
  `,"simple-tooltip":b`
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
  `,"hax-body":b`
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
  `,"grid-plate":b`
    :host([data-hax-ray]) div ::slotted(*),
    :host([data-hax-ray]) div ::slotted(*:hover),
    :host([data-hax-ray]) div ::slotted([data-hax-active]),
    :host([data-hax-ray]) div ::slotted([data-hax-active]:hover) {
      border: 0 !important;
      outline: 0 !important;
    }
    :host([data-hax-ray]) div ::slotted(*:hover:not([data-hax-active])) {
      outline: 1px dashed var(--muted-foreground) !important;
      outline-offset: 4px !important;
    }
    :host([data-hax-ray]) [data-layout-slotname],
    :host([data-hax-ray]) [data-layout-slotname]:hover {
      outline: 0 !important;
    }
  `,"editable-table-display":b`
    :host {
      font-family: var(--font-sans) !important;
      border: 0 !important;
      outline: 0 !important;
    }
    /* the outer container's border already frames the table */
    [class*="table"],
    .wrapper {
      border: 0 !important;
      box-shadow: none !important;
    }
    table {
      width: 100% !important;
      border-collapse: collapse !important;
      border: 0 !important;
      font-size: 0.8125rem !important;
    }
    th,
    thead td {
      height: 2.5rem !important;
      padding: 0 0.75rem !important;
      text-align: start !important;
      font-weight: 500 !important;
      color: var(--muted-foreground) !important;
      background: transparent !important;
      border: 0 !important;
      border-bottom: 1px solid var(--border) !important;
      white-space: nowrap !important;
    }
    td {
      padding: 0.5rem 0.75rem !important;
      border: 0 !important;
      border-bottom: 1px solid var(--border) !important;
      vertical-align: middle !important;
      background: transparent !important;
    }
    tbody tr:hover td {
      background: color-mix(in srgb, var(--muted) 50%, transparent) !important;
    }
    caption {
      font-weight: 600 !important;
      text-align: start !important;
    }
  `,"haxcms-files-admin-dialog":b`
    :host {
      display: block !important;
      max-width: 100% !important;
      min-width: 0 !important;
    }
    .shell,
    .panel {
      max-width: 100% !important;
      min-width: 0 !important;
      box-sizing: border-box !important;
    }
    /* the file table scrolls inside the dialog instead of spilling out */
    .tw {
      max-width: 100% !important;
      overflow-x: auto !important;
      border: 1px solid var(--border) !important;
      border-radius: var(--radius-lg) !important;
    }
    .upload-row {
      display: flex !important;
      flex-wrap: wrap !important;
      align-items: center !important;
      gap: 0.75rem !important;
      padding: 0.75rem !important;
      border: 1px dashed var(--input-border, var(--border)) !important;
      border-radius: var(--radius-lg) !important;
      background: color-mix(in srgb, var(--muted) 40%, transparent) !important;
    }
    .status {
      margin: 0.5rem 0 !important;
      font-size: 0.8125rem !important;
      color: var(--muted-foreground) !important;
    }
    table {
      width: 100% !important;
      border-collapse: collapse !important;
      border: 0 !important;
      font-family: var(--font-sans) !important;
      font-size: 0.8125rem !important;
    }
    th {
      height: 2.5rem !important;
      padding: 0 0.75rem !important;
      text-align: start !important;
      font-weight: 500 !important;
      color: var(--muted-foreground) !important;
      background: transparent !important;
      border: 0 !important;
      border-bottom: 1px solid var(--border) !important;
      white-space: nowrap !important;
    }
    td {
      padding: 0.5rem 0.75rem !important;
      border: 0 !important;
      border-bottom: 1px solid var(--border) !important;
      vertical-align: middle !important;
      background: transparent !important;
    }
    tr:last-child td {
      border-bottom: 0 !important;
    }
    a {
      color: var(--link, var(--primary)) !important;
    }
  `,"haxcms-theme-picker":b`
    :host {
      font-family: var(--font-sans) !important;
    }
    legend {
      font-size: 0.875rem !important;
      font-weight: 600 !important;
    }
    .description {
      font-size: 0.8125rem !important;
      color: var(--muted-foreground) !important;
    }
    .option {
      border: 1px solid var(--border) !important;
      border-radius: var(--radius-lg) !important;
      background: var(--card, var(--background)) !important;
      box-shadow: none !important;
    }
    .option:hover {
      border-color: color-mix(in srgb, var(--primary) 45%, var(--border)) !important;
    }
    .option.selected {
      border-color: var(--primary) !important;
      box-shadow: 0 0 0 1px var(--primary) !important;
    }
    .option:focus-within {
      outline: 2px solid var(--ring) !important;
      outline-offset: 2px !important;
    }
    /* shadcn Badge: Active = primary, Selected = outline */
    .flag {
      padding: 0 0.5rem !important;
      border-radius: 999px !important;
      font-family: var(--font-sans) !important;
      font-size: 0.6875rem !important;
      font-weight: 600 !important;
      line-height: 1.25rem !important;
      letter-spacing: normal !important;
      text-transform: none !important;
    }
    .flag.active {
      background: var(--primary) !important;
      color: var(--primary-foreground) !important;
      border: 0 !important;
    }
    .flag.selected {
      background: var(--background) !important;
      color: var(--foreground) !important;
      border: 1px solid var(--border) !important;
    }
    .theme-name {
      font-size: 0.875rem !important;
      font-weight: 500 !important;
      line-height: 1.3 !important;
      color: var(--foreground) !important;
    }
    .preview-fallback {
      font-size: 0.75rem !important;
      color: var(--muted-foreground) !important;
      background: var(--muted) !important;
    }
  `,"simple-modal":b`
    /* title breadcrumb (Site Settings > Appearance): icon, gap, text */
    .breadcrumb-button,
    [class*="breadcrumb"] {
      display: inline-flex !important;
      align-items: center !important;
      gap: 0.375rem !important;
    }
    .breadcrumb-icon {
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      width: 1rem !important;
      height: 1rem !important;
      color: var(--muted-foreground) !important;
    }
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
  `,[Y2]:b`
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
      ${Qe(G2)}
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
      ${Qe(G2)}
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
      ${Ie}
    }
  `,"rich-text-editor-prompt":b`
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
  `,"hax-confirm-dialog":b`
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
  `,"haxcms-site-settings-dashboard":b`
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
      ${Ie}
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
  `,"outline-designer":b`
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
  `,"super-daemon":b`
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
  `,"super-daemon-ui":b`
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
  `,"super-daemon-search":b`
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
  `,"super-daemon-row":b`
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
  `,"haxcms-site-editor-ui":b`
    :host {
      --top-bar-height: 0px !important;
      height: 0 !important;
      min-height: 0 !important;
      overflow: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
  `,"app-hax-top-bar":b`
    :host {
      --top-bar-height: 3.5rem !important;
    }
  `},zo=["content-add","content-edit","content-map","view-source"];function Gt(){return T.cmsSiteEditor?.haxCmsSiteEditorUIElement??null}function tt(){return globalThis.HaxStore?.requestAvailability?.()??null}const jo=a=>({target:a,preventDefault(){},stopPropagation(){}});function rt(a,e){const t=Gt();if(!t)return;const r=e?t.shadowRoot?.querySelector(e):null;t[a]?.(jo(r))}const Bo=()=>rt("_editButtonTap","#editbutton"),Lo=()=>rt("_editButtonTap","#editbutton"),Io=()=>rt("_cancelButtonTap","#cancelbutton"),Ro=()=>rt("_manifestButtonTap","#manifestbtn"),qo=()=>Gt()?._logout?.(),Po=()=>tt()?.activeHaxBody?.undo?.(),Oo=()=>tt()?.activeHaxBody?.redo?.();function Ho(a){const e=tt()?.activeHaxBody?.shadowRoot?.querySelector("hax-plate-context"),t=n=>{for(const l of n?.querySelectorAll("*")||[]){if(l.getAttribute("event-name")===a)return l;const d=l.shadowRoot&&t(l.shadowRoot);if(d)return d}return null},r=e&&(t(e)||t(e.shadowRoot));let i=null;const o=[r?.shadowRoot];for(;!i&&o.length;){const n=o.shift();if(n){i=n.querySelector("button");for(const l of n.querySelectorAll("*"))o.push(l.shadowRoot)}}i?.click()}function it(){const a=globalThis.document.querySelector("custom-oer-docs-theme")?.shadowRoot?.querySelector("main")?.getBoundingClientRect();return a?{top:a.top,bottom:a.bottom}:{top:0,bottom:globalThis.innerHeight}}function No(a){const e=tt()?.haxTray;!e||!zo.includes(a)||(a==="view-source"&&e.shadowRoot?.querySelector("#view-source")?.openSource?.(),e.trayDetail=a,e.collapsed=!1)}function Jt(a=""){const e=globalThis.SuperDaemonManager?.requestAvailability?.();e&&(e.runProgram(a,"*"),e.mini=!1,e.wand=!1,e.open())}const J2=/Mac|iPhone|iPad/.test(globalThis.navigator?.platform??""),ee=J2?"\u2318":"Ctrl",Uo=J2?"\u2318\u21E7K":"Ctrl\u21E7K";let Re=null;const X2=a=>a.shiftKey&&(a.altKey||a.metaKey||a.ctrlKey);async function Vo(){globalThis.addEventListener("keydown",o=>{if(Re=o,X2(o)&&o.code==="KeyK"&&(o.preventDefault(),o.metaKey||o.ctrlKey)){o.stopImmediatePropagation();const n=globalThis.SuperDaemonManager?.instance;n?.opened?n.close():Jt()}},{capture:!0}),await customElements.whenDefined("super-daemon");const a=customElements.get("super-daemon").prototype;if(a.__oerModal)return;const e=o=>{if(!o||o.__oerGated)return;let n=o.allowedCallback;const l=function(...d){return Re&&X2(Re)&&Re.code!=="KeyK"&&Re.key!=="Escape"?!1:typeof n=="function"?n.apply(this,d):!0};Object.defineProperty(o,"allowedCallback",{configurable:!0,get:()=>l,set:d=>{n=d}}),o.__oerGated=!0};e(globalThis.SuperDaemonManager?.instance);const t=a.waveWand;a.waveWand=function(...o){t.apply(this,o),this.mini=!1,this.wand=!1,this.activeNode=null};const r=a.updated;a.updated=function(o){r?.call(this,o),e(this),o.has("opened")&&this.opened&&this.mini&&(this.mini=!1,this.wand=!1)},a.__oerModal=!0;const i=globalThis.SuperDaemonManager?.instance;i?.mini&&(i.mini=!1,i.wand=!1)}function ot(a,e){customElements.whenDefined(a).then(()=>e(customElements.get(a)))}const Ko={"editor:format-clear":"Clean","hax:format-textblock":"Prettify","icons:content-copy":"Copy"};function Wo(){for(const a of["hax-text-editor-toolbar","rich-text-editor-toolbar","hax-toolbar"])ot(a,e=>{const t=e.prototype;if(t.__oerExpanded)return;Object.defineProperty(t,"alwaysExpanded",{get:()=>!0,set:()=>{},configurable:!0});const r=t.updated;t.updated=function(i){r?.call(this,i),this.collapsed&&(this.collapsed=!1)},t.__oerExpanded=!0});ot("simple-fields-field",a=>{const e=a.prototype,t=e.updated,r=i=>i.querySelector('d-d-d-sample[type="accent"], d-d-d-sample[type="primary"]')?.shadowRoot?.querySelector(".label")?.textContent?.trim();e.updated=function(i){t?.call(this,i),this.type==="radio"&&requestAnimationFrame(()=>{for(const o of this.shadowRoot?.querySelectorAll('[part="option"]')??[]){const n=r(o);n&&o.title!==n&&(o.title=n)}})}}),ot("hax-gizmo-browser",a=>{const e=a.prototype,t=e.updated;e.updated=function(r){t?.call(this,r);const i=this.shadowRoot?.querySelector("#inputfilter");i&&!i.placeholder&&(i.placeholder="Search blocks\u2026")}}),Z2("simple-popover-manager",a=>{const e=()=>a.toggleAttribute("data-oer-preview",!!a.querySelector("hax-element-demo"));new MutationObserver(e).observe(a,{childList:!0,subtree:!0}),e()}),ot("hax-view-source",a=>{const e=a.prototype,t=e.updated;e.updated=function(r){t?.call(this,r),this.shadowRoot?.querySelector("hax-toolbar")?.setAttribute("data-oer-source","");for(const i of this.shadowRoot?.querySelectorAll("hax-tray-button")??[]){i.showTextLabel||(i.showTextLabel=!0),i.setAttribute("data-oer-labelled","");const o=Ko[i.icon];o&&i.label!==o&&(i.label=o)}}})}function Z2(a,e){const t=globalThis.document,r=t.querySelector(a);if(r)return e(r);const i=new MutationObserver(()=>{const o=t.querySelector(a);o&&(i.disconnect(),e(o))});i.observe(t.body,{childList:!0})}function Yo(){Z2("hax-tray",async a=>{if(await customElements.whenDefined("hax-tray"),await a.updateComplete,!a.shadowRoot||a.__oerEnhanced)return;a.__oerEnhanced=!0;let e=null;const t=()=>{const r=a.shadowRoot.querySelector('a11y-collapse[id="settings.configure"]');r&&r!==e&&(e=r,requestAnimationFrame(()=>{r.expanded||(r.expanded=!0)}))};new MutationObserver(t).observe(a.shadowRoot,{childList:!0,subtree:!0}),t()})}const Go=(a,e)=>(Number(a.order)||0)-(Number(e.order)||0);function me(a){const e=new Map;for(const t of a||[]){const r=t.parent||null;e.has(r)||e.set(r,[]),e.get(r).push(t)}for(const t of e.values())t.sort(Go);return e}function at(a,e=null){const t=me(a),r=[],i=(o,n)=>{for(const l of t.get(o)||[])r.push({item:l,depth:n}),i(l.id,n+1)};return i(e,0),r}function Q2(a,e){const t=new Map((a||[]).map(o=>[o.id,o])),r=[];let i=t.get(e);for(;i?.parent&&t.has(i.parent);)r.push(i.parent),i=t.get(i.parent);return r}function er(){return T.cmsSiteEditor?.instance??globalThis.document.querySelector("haxcms-site-editor")}function tr(a){return(T.manifest?.items?.find?.(e=>e.metadata?.pageType==="oer:system")?.metadata?.oerContentTypes?.types?.find?.(e=>e.id===a)?.template||"").trim()||"<p></p>"}function Jo(a,e=null,t=""){const r=me(T.manifest?.items).get(e||null)||[],i=r[r.length-1],o=i?(Number(i.order)||0)+1:0,n=er()||globalThis.document.body;n.dispatchEvent(new CustomEvent("haxcms-create-node",{bubbles:!0,composed:!0,cancelable:!0,detail:{originalTarget:n,values:{node:{title:a||"New page",location:"",contents:tr(t)},order:o,parent:e||null,...t?{metadata:{pageType:t}}:{}}}}))}function se(a){const e=T.manifest,t=(a||[]).filter(r=>r&&(r.new||r.modified||r.delete));return t.length?(er()?.saveOutline?.({detail:t}),Xo(e)):Promise.resolve(!1)}function Xo(a=T.manifest,e=15e3){return new Promise(t=>{const r=Date.now(),i=()=>{T.manifest!==a?t(!0):Date.now()-r>e?t(!1):setTimeout(i,200)};setTimeout(i,200)})}const qe=()=>`item-${globalThis.crypto.randomUUID()}`;function Xt(a,e){const t=new Set(e);let r=!0;for(;r;){r=!1;for(const i of a||[])t.has(i.id)||(t.has(i.parent)||t.has(i.metadata?.oerSnapshotOf))&&(t.add(i.id),r=!0)}return t}const Zo="oer:",te="oer:system",Qo="oer:section",U="oer:heading",rr={id:U,label:"Heading",icon:"oer:heading-2",children:[],fields:[]},ve=a=>a?.metadata?.pageType===U,ea=[{kind:"text",label:"Text"},{kind:"longtext",label:"Long text"},{kind:"number",label:"Number"},{kind:"select",label:"Choice"},{kind:"list",label:"List"},{kind:"boolean",label:"Yes / no"},{kind:"date",label:"Date"},{kind:"image",label:"Image URL"},{kind:"url",label:"Link"},{kind:"relation",label:"Link to pages"},{kind:"files",label:"Files and links"},{kind:"people",label:"People"}],le=()=>_(y.manifest?.items)||[];function ta(a){const e=a.filter(Boolean);return e.length<3?e.join(" and "):`${e.slice(0,-1).join(", ")}, and ${e.at(-1)}`}function ue(a){return(Array.isArray(a)?a:a==null||a===""?[]:[a]).map(e=>e&&typeof e=="object"?{name:String(e.name||""),url:String(e.url||""),...e.affiliation?{affiliation:String(e.affiliation)}:{}}:{name:String(e),url:""}).filter(e=>e.name||e.url)}const ra="oer:course",ir=a=>String(a?.metadata?.oerFields?.code||a?.title||"").trim();function nt(a,e=le()){const t=e.filter(o=>o.metadata?.pageType===ra&&!o.metadata?.oerSnapshotOf),r=Array.isArray(a)?a:typeof a=="string"&&a?a.split(","):[],i=[];for(const o of r){const n=o&&typeof o=="object"?o.page:"",l=n?t.find(d=>d.id===n):t.find(d=>ir(d).toUpperCase()===String(o).trim().toUpperCase());l?i.push({id:l.id,code:ir(l),title:l.title,institution:String(l.metadata?.oerFields?.institution||""),item:l}):!n&&String(o).trim()&&i.push({id:"",code:String(o).trim(),title:String(o).trim(),institution:"",item:null})}return i}function ia(a=le()){const e=new Map,t=r=>{const i=String(r||"").trim();i&&e.set(i,(e.get(i)||0)+1)};for(const r of a){if(r.metadata?.oerSnapshotOf)continue;const i=r.metadata?.oerFields||{};t(i.institution);for(const o of Object.values(i))if(Array.isArray(o))for(const n of o)n&&typeof n=="object"&&"affiliation"in n&&t(n.affiliation)}return[...e.keys()].sort((r,i)=>e.get(i)-e.get(r)||r.localeCompare(i))}const de=a=>a?.metadata?.pageType===te;function st(a=le()){return a.find(de)||null}function B(a=le()){const e=st(a)?.metadata?.oerContentTypes;return e&&Array.isArray(e.types)?e:{version:1,types:[]}}function Zt(a=le()){return st(a)?.metadata?.oerNavIcons!==!1}function or(a,e=le()){const t=B(e).types;if(!a)return t;const r=t.find(i=>i.id===a);return!r||r.children===null||r.children===void 0?t:t.filter(i=>r.children.includes(i.id))}function oa(a=le()){const e=new Map;for(const t of a){const r=t.metadata?.pageType;r&&r!==te&&e.set(r,(e.get(r)||0)+1)}return e}const ar=a=>Zo+(String(a||"").replace(/^oer:/i,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"type"),aa=a=>String(a||"").replace(/[^A-Za-z0-9]+/g," ").trim().split(/\s+/).filter(Boolean).map((e,t)=>t?e[0].toUpperCase()+e.slice(1).toLowerCase():e.toLowerCase()).join("")||"field";async function na(a,e=null){const t=le(),r=st(t),i=t.map(o=>{if(r&&o.id===r.id)return{...o,metadata:{...o.metadata,oerContentTypes:a},modified:!0};const n=e?.(o);return n?{...n,modified:!0}:o});if(!r){const o=t.filter(n=>!n.parent);i.push({id:qe(),title:"Content types",parent:null,order:o.length,indent:0,location:"",description:"Site configuration: content type definitions (hidden).",metadata:{pageType:te,hideInMenu:!0,published:!1,oerContentTypes:a},contents:"<p>This page stores the site's content type definitions.</p>",new:!0})}return se(i)}function sa(){return y.cmsSiteEditor?.instance??null}const nr=a=>String(a?.metadata?.tags||"").split(",").map(e=>e.trim()).filter(Boolean);async function la(a,{pageType:e,description:t,fields:r,tags:i}){const o=le(),n=o.find(d=>d.id===a),l=o.map(d=>{if(d.id!==a)return d;const c={};for(const[h,m]of Object.entries(d.metadata?.oerFields||{}))h in r||(c[h]=Array.isArray(m)?[]:"");const p={...d.metadata,oerFields:{...c,...r}};return p.pageType=e||"",Array.isArray(i)&&(p.tags=i.join(",")),{...d,metadata:p,modified:!0}});await se(l),n&&typeof t=="string"&&t!==(n.description||"")&&await sa()?.saveNodeDetails?.({detail:{id:a,operation:"setDescription",description:t}})}const be=a=>!!a?.metadata?.oerSnapshotOf,Qt=()=>_(y.manifest?.items)||[];function lt(a){const e=String(a||"").match(/^(\d+)\.(\d+)\.(\d+)$/);return e?e.slice(1).map(Number):null}function e2(a,e){const[t,r,i]=lt(a)||[0,0,0];return e==="major"?`${t+1}.0.0`:e==="minor"?`${t}.${r+1}.0`:`${t}.${r}.${i+1}`}const da=(a,e)=>{const t=lt(a)||[0,0,0],r=lt(e)||[0,0,0];return t[0]-r[0]||t[1]-r[1]||t[2]-r[2]};function K(a,e=Qt()){const t=e.find(o=>o.id===a),r=e.filter(o=>o.metadata?.oerSnapshotOf===a),i=(t?.metadata?.oerVersions||[]).map(o=>({...o,snapshot:r.find(n=>n.metadata?.version===o.version)||null}));for(const o of r)i.some(n=>n.version===o.metadata.version)||i.push({version:o.metadata.version,date:o.metadata.created,notes:"",snapshot:o});return i.sort((o,n)=>da(n.version,o.version))}function ca(a,e=Qt()){return e.find(t=>t.id===a?.metadata?.oerSnapshotOf)||null}async function pa(a){const e=new URL(a.location,globalThis.document.baseURI);e.searchParams.set("t",String(Date.now()));const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Could not read the page (${t.status})`);return(await t.text()).replace(/<page-break\b[^>]*>(?:\s*<\/page-break>)?/gi,"").trim()||"<p></p>"}async function ha(a,e,t=""){if(!lt(e))throw new Error("Versions look like 1.2.0");const r=Qt(),i=r.find(h=>h.id===a);if(!i)throw new Error("Page not found");if(K(a,r).some(h=>h.version===e))throw new Error(`Version ${e} already exists`);const o=await pa(i),n=Math.floor(Date.now()/1e3),l=r.filter(h=>h.parent===a),d={id:qe(),title:`v${e}`,parent:a,order:l.length+1e3,indent:(Number(i.indent)||0)+1,location:"",description:i.description||"",metadata:{pageType:i.metadata?.pageType,oerFields:i.metadata?.oerFields||{},icon:i.metadata?.icon,oerSnapshotOf:a,oerSnapshotTitle:i.title,version:e,versionStatus:"archived",hideInMenu:!0,locked:!0,published:i.metadata?.published!==!1},contents:o,new:!0};d.metadata.pageType||delete d.metadata.pageType,d.metadata.icon||delete d.metadata.icon;const c={version:e,date:n,notes:t.trim()},p=r.map(h=>h.id===a?{...h,metadata:{...h.metadata,version:e,oerVersions:[c,...h.metadata?.oerVersions||[]]},modified:!0}:h);return p.push(d),se(p)}const sr=()=>_(y.manifest?.items)||[];function we(a,e=sr()){return(Array.isArray(a)?a:[]).filter(t=>t&&t.page).map(t=>{const r=e.find(o=>o.id===t.page)||null,i=r&&t.version?K(r.id,e).find(o=>o.version===t.version)?.snapshot:null;return{page:t.page,version:t.version||"",item:r,href:(i||r)?.slug||"",missing:!r}})}function ma(a,e,t=sr()){const r=[];for(const o of t){if(o.id===a||o.metadata?.oerSnapshotOf||o.metadata?.pageType===te)continue;if(o.metadata?.oerRef?.page===a){const l=t.find(d=>d.id===o.parent);r.push({item:l||o,via:"Includes it"});continue}const n=e.find(l=>l.id===o.metadata?.pageType);for(const l of n?.fields||[]){if(l.kind!=="relation")continue;const d=o.metadata?.oerFields?.[l.name];Array.isArray(d)&&d.some(c=>c?.page===a)&&r.push({item:o,via:l.label})}}const i=new Set;return r.filter(o=>i.has(o.item.id)?!1:i.add(o.item.id))}async function ua(a){const e=y,t=new FormData;t.append("file-upload",a,a.name);const r={};e.jwt&&(r.Authorization=`Bearer ${e.jwt}`);const i=e.appSettings?.siteToken;i&&(r["X-HAXCMS-Site-Token"]=i);const o=new URL("x/api/v1/files",globalThis.document.baseURI),n=await fetch(o,{method:"POST",headers:r,body:t,credentials:"same-origin"}),l=await n.json().catch(()=>null);if(!n.ok)throw new Error(l?.data?.message||`Upload failed (${n.status})`);const d=l?.data?.file||l?.file||{};return d.url||d.fullUrl||d.path||""}const lr=a=>/\.(png|jpe?g|gif|webp|svg|avif)(\?|#|$)/i.test(String(a||""));function ga(a){const e=String(a||"").split(/[?#]/)[0].split(".").pop();return e&&e.length<=5&&!String(a).endsWith("/")?e.toUpperCase():"Link"}const t2=(a,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${S[a]||""}&quot;)"></span>`;let dt=class extends M{static get tag(){return"oer-page-picker"}static get properties(){return{open:{type:Boolean,reflect:!0},_q:{state:!0},_type:{state:!0},_versions:{state:!0},_children:{state:!0}}}constructor(){super(),this.open=!1,this._q="",this._type="",this._versions={},this._children=!1,this.__keys=e=>{this.open&&e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),this._done(null))}}pick({exclude:e=[],types:t=null,children:r=!0,title:i="Add an existing page",hint:o=null}={}){return this._exclude=new Set(e),this._only=t&&t.length?new Set(t):null,this._offerChildren=r,this._title=i,this._hint=o,this._q="",this._type="",this._versions={},this._children=!1,this.open=!0,globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector("input")?.focus()),new Promise(n=>this.__resolve=n)}_done(e){this.open=!1,globalThis.removeEventListener("keydown",this.__keys,!0),this.__resolve?.(e),this.__resolve=null}get _items(){return(_(y.manifest?.items)||[]).filter(e=>!de(e)&&!be(e)&&!this._exclude?.has(e.id)&&(!this._only||this._only.has(e.metadata?.pageType)))}static get styles(){return b`
      :host {
        position: fixed;
        inset: 0;
        z-index: 10010;
        display: none;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
      }
      :host([open]) {
        display: grid;
        place-items: center;
      }
      .backdrop {
        position: absolute;
        inset: 0;
        background: rgb(0 0 0 / 0.35);
      }
      .box {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        width: min(40rem, calc(100vw - 2rem));
        max-height: min(40rem, calc(100dvh - 2rem));
        padding: 1.25rem;
        box-sizing: border-box;
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 8px 24px rgb(0 0 0 / 0.18);
      }
      button,
      input,
      select {
        font: inherit;
        color: inherit;
      }
      :focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .lucide {
        flex: none;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      h2 {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
      }
      .sub {
        margin: -0.5rem 0 0;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .bar {
        display: flex;
        gap: 0.5rem;
      }
      .search {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        color: var(--muted-foreground);
      }
      .search input {
        flex: 1;
        min-width: 0;
        border: 0;
        outline: none;
        background: transparent;
        color: var(--foreground);
        font-size: 0.875rem;
      }
      select {
        height: 2.25rem;
        padding: 0 0.5rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        font-size: 0.875rem;
      }
      ul {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        list-style: none;
        margin: 0;
        padding: 0;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
      }
      li {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        padding: 0.5rem 0.75rem;
        --simple-icon-height: 1rem;
        --simple-icon-width: 1rem;
      }
      li + li {
        border-top: 1px solid var(--border);
      }
      .info {
        flex: 1;
        min-width: 0;
      }
      .title {
        font-size: 0.875rem;
        font-weight: 500;
      }
      .meta {
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      li select {
        height: 2rem;
        font-size: 0.8125rem;
      }
      .ver {
        font-size: 0.75rem;
        color: var(--muted-foreground);
        white-space: nowrap;
      }
      .add {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        height: 2rem;
        padding: 0 0.75rem;
        border-radius: var(--radius-md);
        background: var(--primary);
        color: var(--primary-foreground);
        font-size: 0.8125rem;
        font-weight: 500;
        cursor: pointer;
      }
      .empty {
        padding: 2rem;
        text-align: center;
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      .foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        font-size: 0.875rem;
      }
      .foot label {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
      }
      input[type="checkbox"] {
        accent-color: var(--primary);
      }
      .cancel {
        all: unset;
        height: 2.25rem;
        padding: 0 1rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        font-weight: 500;
        cursor: pointer;
      }
    `}render(){if(!this.open)return s``;const e=B().types.filter(n=>!this._only||this._only.has(n.id)),t=this._q.trim().toLowerCase(),r=_(y.manifest?.items)||[],i=new Map(r.map(n=>[n.id,n])),o=this._items.filter(n=>(!this._type||n.metadata?.pageType===this._type)&&(!t||n.title.toLowerCase().includes(t))).sort((n,l)=>n.title.localeCompare(l.title)).slice(0,60);return s`
      <div class="backdrop" @click="${()=>this._done(null)}"></div>
      <div class="box" role="dialog" aria-modal="true" aria-labelledby="t">
        <h2 id="t">${this._title}</h2>
        <p class="sub">${this._hint??"It is shown here, not copied: changes to the original appear here, unless you pin a released version."}</p>
        <div class="bar">
          <label class="search">${t2("icons:search")}<input type="search" placeholder="Search pages…" aria-label="Search pages" .value="${this._q}" @input="${n=>this._q=n.target.value}" /></label>
          <select aria-label="Content type" @change="${n=>this._type=n.target.value}">
            <option value="">All types</option>
            ${e.map(n=>s`<option value="${n.id}">${n.label}</option>`)}
          </select>
        </div>
        ${o.length?s`<ul aria-label="Pages">
              ${o.map(n=>{const l=e.find(p=>p.id===n.metadata?.pageType),d=K(n.id,r).filter(p=>p.snapshot),c=i.get(n.parent);return s`<li>
                  ${l?.icon?s`<simple-icon-lite icon="${l.icon}"></simple-icon-lite>`:t2("lrn:page")}
                  <div class="info">
                    <div class="title">${n.title}</div>
                    <div class="meta">${[l?.label,n.metadata?.oerFields?.institution,c?`in ${c.title}`:""].filter(Boolean).join(" \xB7 ")}</div>
                  </div>
                  ${d.length?s`<select aria-label="Version of ${n.title}" @change="${p=>this._versions={...this._versions,[n.id]:p.target.value}}">
                        <option value="">Latest${n.metadata?.version?` (v${n.metadata.version})`:""}</option>
                        ${d.map(p=>s`<option value="${p.version}">v${p.version}</option>`)}
                      </select>`:n.metadata?.version?s`<span class="ver">v${n.metadata.version}</span>`:""}
                  <button class="add" @click="${()=>this._done({page:n,version:this._versions[n.id]||"",withChildren:this._children})}">
                    ${t2("oer:plus","sm")}Add
                  </button>
                </li>`})}
            </ul>`:s`<div class="empty">No pages match.</div>`}
        <div class="foot">
          ${this._offerChildren?s`<label><input type="checkbox" .checked="${this._children}" @change="${n=>this._children=n.target.checked}" />Also add its sub-pages</label>`:s`<span></span>`}
          <button class="cancel" @click="${()=>this._done(null)}">Cancel</button>
        </div>
      </div>
    `}};customElements.define(dt.tag,dt);function dr(){const a=globalThis.document;return a.querySelector(dt.tag)||a.body.appendChild(a.createElement(dt.tag))}const fa="https://dmd-program.github.io/aiul/api",va="https://dmd-program.github.io/aiul/guide.html",ba={NA:{description:"No AI tools allowed. All work must be entirely student-generated.",requirements:["Students may not use AI generation tools for any part of the assignment","All work must be completed using only the student's own skills and knowledge","Third-party non-AI tools and resources may still be permitted according to standard course policies","Students should be prepared to explain their process and demonstrate their skills if asked"],students:["Complete all aspects of the assignment without using AI tools","Document their process in the traditional manner required by the instructor","Be prepared to explain their working process if asked","Follow all other course guidelines for acceptable resources"]},WA:{description:"Limited AI assistance is permitted only with instructor pre-approval.",requirements:["Students must request and receive explicit permission before using AI tools","Students must document which AI tools were used and how they were integrated into the work","AI usage should support rather than replace the student's work","Students must follow any additional guidelines specified in the approval"],students:["Submit a request for AI usage approval before beginning work with AI tools","Clearly explain which tools they wish to use and how they will be integrated","Wait for explicit approval before proceeding with AI assistance","Document their AI usage according to approved parameters","Be prepared to discuss how AI contributed to their process"]},CD:{description:"AI tools may be used for research and ideation, but the final work must be entirely student-generated.",requirements:["Students may use AI tools only for research, ideation, and concept development","The final work must be entirely created by the student without AI generation","Students must document which AI tools were used and how they contributed to the ideation process","AI outputs may inform but not directly appear in the final work"],students:["Use AI tools to explore concepts, gather information, and develop ideas","Document the AI tools used and how they contributed to the ideation process","Create the final work entirely themselves, without AI-generated content","Be prepared to discuss how AI-assisted research influenced their thinking","Cite AI tools and prompts used in the research/ideation phase"]},TC:{description:"AI may be used as a collaborative tool, but outputs must be significantly transformed.",requirements:["Students may use AI tools as collaborative partners in the creation process","All AI outputs must be significantly transformed and modified by the student","Students must document the AI tools used, prompts provided, and how outputs were transformed","The final work must demonstrate the student's critical thinking and creative direction"],students:["Use AI tools as collaborative partners in the creation process","Critically evaluate and significantly transform all AI-generated content","Document the original AI outputs and your transformations","Provide clear explanations of your creative decisions and modifications","Be prepared to discuss your collaborative process and creative direction"]},DP:{description:"AI-assisted creation is permitted with clear direction and modification from the student.",requirements:["Students may use AI tools to generate content under their direction","Students must provide clear creative direction to the AI tools","Students must apply post-processing and refinement to AI outputs","Students must document their prompts, direction process, and post-processing decisions"],students:["Provide clear, intentional direction to AI tools through careful prompt crafting","Apply thoughtful post-processing and refinement to AI outputs","Document the direction process, including prompt iterations and decisions","Explain post-processing choices and their relationship to your creative vision","Be prepared to discuss how your direction shaped the AI-generated elements"]},IU:{description:"AI usage is a required component of the assignment, with focus on sophisticated AI integration.",requirements:["Students must use AI tools as a significant component of the assignment","Students must demonstrate sophisticated and intentional AI usage","Students must thoroughly document their AI usage, including prompts and process","Students must reflect on the ethical implications and effectiveness of their AI integration"],students:["Use AI tools extensively and intentionally as part of the assignment","Demonstrate sophisticated prompt engineering and AI interaction techniques","Document their process thoroughly, including prompts, iterations, and decision-making","Reflect critically on the effectiveness and implications of their AI usage","Be prepared to discuss both technical and ethical dimensions of their work with AI"]}};let r2=null;function cr(){if(!r2){const a=e=>fetch(`${fa}/${e}.json`).then(t=>t.ok?t.json():Promise.reject(t.status)).then(t=>t.data||[]);r2=Promise.all([a("licenses"),a("modifiers"),a("combinations")]).then(([e,t,r])=>({licenses:e,modifiers:t,combinations:r})).catch(()=>{const e=globalThis.WCGlobalBasePath||new URL("build/es6/node_modules/",globalThis.document.baseURI).href;return fetch(`${e}@haxtheweb/ai-usage-license/lib/v1.json`).then(t=>t.ok?t.json():null).catch(()=>null)})}return r2}function i2(a,e){const[,t,r]=String(a).match(/^AIUL-([A-Z]+)(?:-([A-Z0-9]+))?$/i)||[],i=(t||"").toUpperCase(),o=(r||"").toUpperCase(),n=e?.licenses?.find(h=>h.code===i),l=o?e?.modifiers?.find(h=>h.code===o):null,d=o?e?.combinations?.find(h=>h.code===`${i}-${o}`):null,c=ba[i]||{description:"",requirements:[],students:[]},p={description:n?.description||c.description,requirements:n?.requirements?.length?n.requirements:c.requirements,students:n?.studentGuidelines?.length?n.studentGuidelines:c.students};return{code:a,title:n?.title||(i?`AIUL-${i}`:String(a)),name:n?.fullName||"",modifier:l?l.fullName||l.title:o,url:d?.url||n?.url||"",image:d?.image||n?.image||"",...p}}const pr="\0new";class o2 extends M{static get tag(){return"oer-choice-field"}static get properties(){return{value:{type:String},options:{type:Array},fieldId:{type:String,attribute:"field-id"},newLabel:{type:String,attribute:"new-label"},label:{type:String},emptyLabel:{type:String,attribute:"empty-label"},invalid:{type:Boolean},_adding:{state:!0}}}constructor(){super(),this.value="",this.options=[],this.fieldId="",this.newLabel="New\u2026",this.label="",this.emptyLabel="\u2014",this.invalid=!1,this._adding=!1}createRenderRoot(){return this}get _known(){return(this.options||[]).includes(this.value)}_emit(e){this.value=e,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:e},bubbles:!0,composed:!0}))}_pick(e){if(e.target.value===pr){this._adding=!0,this._emit(""),this.updateComplete.then(()=>this.querySelector("input")?.focus());return}this._adding=!1,this._emit(e.target.value)}render(){const e=this._adding||!!this.value&&!this._known,t=this.invalid?"invalid":"";return s`<span class="choice-field" style="display:flex;flex-wrap:wrap;gap:0.5rem">
      <select id="${this.fieldId}" .ariaLabel="${this.label||null}" class="${t}" style="flex:1 1 10rem;min-width:0" @change="${this._pick}">
        <option value="" ?selected="${!e&&!this.value}">${this.emptyLabel||"\u2014"}</option>
        ${(this.options||[]).map(r=>s`<option value="${r}" ?selected="${!e&&r===this.value}">${r}</option>`)}
        <option value="${pr}" ?selected="${e}">${this.newLabel}</option>
      </select>
      ${e?s`<input
            class="input ${t}"
            style="flex:1 1 10rem;min-width:0"
            aria-label="${this.newLabel.replace(/…$/,"")}"
            .value="${this.value||""}"
            @input="${r=>this._emit(r.target.value)}"
          />`:""}
    </span>`}}customElements.get(o2.tag)||customElements.define(o2.tag,o2);function ct(a,e,t,r=[]){const i=new Map;for(const o of a||[]){if(e&&o.metadata?.pageType!==e||o.metadata?.oerSnapshotOf||o.metadata?.oerRef?.page)continue;const n=o.metadata?.oerFields?.[t];for(const l of Array.isArray(n)?n:[n]){const d=String(l??"").trim();d&&i.set(d,(i.get(d)||0)+1)}}for(const o of r)i.has(o)||i.set(o,0);return[...i.keys()].sort((o,n)=>i.get(n)-i.get(o)||o.localeCompare(n))}const wa=a=>a.kind==="select"&&a.multiple&&(a.options||[]).length>0&&a.options.every(e=>/^AIUL-/i.test(e.value)),hr=/^AIUL-([A-Z]+)(?:-([A-Z0-9]+))?$/i,O=(a,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${S[a]||""}&quot;)"></span>`,a2=a=>a==null||a===""||Array.isArray(a)&&!a.filter(e=>String(e).trim()).length,n2=a=>Array.isArray(a)?a:a?String(a).split(",").map(e=>e.trim()).filter(Boolean):[];let pt=class extends M{static get tag(){return"oer-page-details"}static get properties(){return{open:{type:Boolean,reflect:!0},_type:{state:!0},_desc:{state:!0},_tags:{state:!0},_tagDraft:{state:!0},_values:{state:!0},_saving:{state:!0},_tried:{state:!0}}}constructor(){super(),this.open=!1,this._values={},this.__keys=e=>{this.open&&e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),this._close())}}show(e,{onSaved:t=null}={}){this._onSaved=t;const r=_(y.manifest?.items)||[],i=r.find(d=>d.id===e);if(!i)return;this._item=i;const o=i.parent?r.find(d=>d.id===i.parent):null;this._allowed=or(o?.metadata?.pageType||null,r),this._allTypes=B(r).types,this._type=i.metadata?.pageType||"",this._desc=i.description||"",this._tags=nr(i),this._tagDraft="";const n=new Map;for(const d of r)for(const c of nr(d))n.set(c,(n.get(c)||0)+1);this._tagsInUse=[...n.keys()].sort((d,c)=>n.get(c)-n.get(d)||d.localeCompare(c)),this._values={...i.metadata?.oerFields||{}};const l=B(r).types.find(d=>d.id===i.metadata?.pageType);for(const d of l?.fields||[])d.default!==void 0&&d.default!==""&&(this._values[d.name]===void 0||this._values[d.name]==="")&&(this._values[d.name]=d.kind==="list"||d.kind==="select"&&d.multiple?String(d.default).split(",").map(c=>c.trim()):d.default);this._tried=!1,this._saving=!1,cr().then(d=>{this._aiul=d,this.requestUpdate()}),this.open=!0,globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector("select, input, textarea")?.focus())}_close(){this.open=!1,globalThis.removeEventListener("keydown",this.__keys,!0)}get _typeDef(){return this._allTypes?.find(e=>e.id===this._type)||null}_set(e,t){this._values={...this._values,[e]:t}}_addTag(e){const t=String(e||"").replace(/,/g," ").replace(/\s+/g," ").trim();this._tagDraft="";const r=this.shadowRoot?.getElementById("ptags");if(r&&(r.value=""),!t)return;const i=(this._tagsInUse||[]).find(o=>o.toLowerCase()===t.toLowerCase())||t;this._tags.some(o=>o.toLowerCase()===i.toLowerCase())||(this._tags=[...this._tags,i])}_removeTag(e){this._tags=this._tags.filter(t=>t!==e),this.shadowRoot.getElementById("ptags")?.focus()}_renderTags(){const e=new Set(this._tags.map(t=>t.toLowerCase()));return s`<div>
      <label for="ptags">Tags</label>
      ${this._tags.length?s`<ul class="tags" aria-label="Tags on this page">
            ${this._tags.map(t=>s`<li class="tag">
                <span>${t}</span
                ><button type="button" class="tag-x" aria-label="Remove tag ${t}" title="Remove" @click="${()=>this._removeTag(t)}">${O("oer:x","sm")}</button>
              </li>`)}
          </ul>`:""}
      <input
        id="ptags"
        class="input"
        list="ptags-used"
        autocomplete="off"
        aria-describedby="ptags-help"
        placeholder="${this._tags.length?"Add another tag":"Add a tag"}"
        .value="${this._tagDraft}"
        @input="${t=>{const r=t.target.value;if((!t.inputType||t.inputType==="insertReplacementText")&&(this._tagsInUse||[]).includes(r))return this._addTag(r);if(r.includes(","))return r.split(",").forEach(i=>this._addTag(i));this._tagDraft=r}}"
        @keydown="${t=>{t.key==="Enter"&&this._tagDraft.trim()&&(t.preventDefault(),t.stopPropagation(),this._addTag(this._tagDraft))}}"
      />
      <datalist id="ptags-used">${(this._tagsInUse||[]).filter(t=>!e.has(t.toLowerCase())).map(t=>s`<option value="${t}"></option>`)}</datalist>
      <p class="hint" id="ptags-help">Press Enter or type a comma to add a tag. Suggestions are tags other pages use. Used for filtering collections and in search.</p>
    </div>`}_missing(){return(this._typeDef?.fields||[]).filter(e=>e.required&&a2(this._values[e.name]))}async _save(){if(this._tried=!0,this._missing().length||this._saving)return;this._saving=!0;const e={};for(const r of this._typeDef?.fields||[]){let i=this._values[r.name];r.kind==="list"&&(i=(i||[]).map(o=>String(o).trim()).filter(Boolean)),r.kind==="select"&&r.multiple&&(i=(r.options||[]).map(o=>o.value).filter(o=>n2(i).includes(o))),r.kind==="relation"&&(i=(Array.isArray(i)?i:[]).filter(o=>o?.page).map(o=>({page:o.page,version:o.version||""}))),r.kind==="files"&&(i=(Array.isArray(i)?i:[]).map(o=>({title:(o.title||"").trim(),url:(o.url||"").trim(),description:(o.description||"").trim(),alt:(o.alt||"").trim()})).filter(o=>o.url||o.title)),r.kind==="people"&&(i=ue(i).map(o=>({name:o.name.trim(),url:(o.url||"").trim(),...o.affiliation?.trim()?{affiliation:o.affiliation.trim()}:{}})).filter(o=>o.name)),r.kind==="number"&&i!==""&&i!==void 0&&(i=Number(i)),(!a2(i)||r.kind==="boolean")&&(e[r.name]=r.kind==="boolean"?!!i:i)}this._addTag(this._tagDraft);const t=this._tags;await la(this._item.id,{pageType:this._type,description:this._desc.trim(),fields:e,tags:t}),this._onSaved?.({pageType:this._type,description:this._desc.trim(),fields:e,tags:t}),this._saving=!1,this._close()}static get styles(){return b`
      :host {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: none;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
      }
      :host([open]) {
        display: grid;
        place-items: center;
      }
      .backdrop {
        position: absolute;
        inset: 0;
        background: rgb(0 0 0 / 0.5);
      }
      .dialog {
        position: relative;
        display: flex;
        flex-direction: column;
        width: min(40rem, calc(100vw - 2rem));
        max-height: min(46rem, calc(100dvh - 2rem));
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
        overflow: hidden;
      }
      button,
      input,
      select,
      textarea {
        font: inherit;
        color: inherit;
      }
      :focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .lucide {
        flex: none;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      .sm {
        width: 0.875rem;
        height: 0.875rem;
      }
      header {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        padding: 1rem 0.75rem 1rem 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      .heading {
        flex: 1;
      }
      h2 {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
      }
      .sub {
        margin: 0.125rem 0 0;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .x {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md);
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .x:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .body {
        overflow-y: auto;
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 1.125rem;
      }
      label,
      .label {
        display: block;
        margin-bottom: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
      }
      .req {
        color: var(--destructive);
      }
      .hint {
        margin: 0.375rem 0 0;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .err {
        margin: 0.375rem 0 0;
        font-size: 0.75rem;
        color: var(--destructive);
      }
      .input,
      select,
      textarea {
        box-sizing: border-box;
        width: 100%;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        font-size: 0.875rem;
      }
      textarea {
        height: auto;
        min-height: 5rem;
        padding: 0.5rem 0.75rem;
        resize: vertical;
      }
      .invalid {
        border-color: var(--destructive);
      }
      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        margin: 0 0 0.5rem;
        padding: 0;
        list-style: none;
      }
      .tag {
        display: inline-flex;
        align-items: center;
        gap: 0.125rem;
        padding: 0.125rem 0.125rem 0.125rem 0.625rem;
        border: 1px solid var(--border);
        border-radius: 999px;
        background: var(--muted);
        color: var(--foreground);
        font-size: 0.8125rem;
        line-height: 1.5;
      }
      .tag-x {
        display: inline-grid;
        place-items: center;
        width: 1.5rem;
        height: 1.5rem;
        padding: 0;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .tag-x:hover {
        background: var(--accent, var(--muted));
        color: var(--foreground);
      }
      .choices {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem 1.25rem;
        margin-top: 0.25rem;
      }
      .check {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
      }
      input[type="checkbox"] {
        width: 1rem;
        height: 1rem;
        margin: 0;
        accent-color: var(--primary);
      }
      .sep {
        height: 1px;
        background: var(--border);
      }
      .list {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }
      .aiul-picker {
        display: flex;
        flex-direction: column;
        gap: 0.625rem;
        margin-top: 0.25rem;
      }
      .aiul-selects {
        display: grid;
        grid-template-columns: minmax(0, 3fr) minmax(0, 2fr) auto;
        gap: 0.375rem;
        align-items: center;
      }
      @media (max-width: 480px) {
        .aiul-selects {
          grid-template-columns: minmax(0, 1fr) auto;
        }
        .aiul-selects select + select {
          grid-row: 2;
        }
      }
      .aiul-hint {
        margin: 0.25rem 0 0 !important;
      }
      .aiul-hint code {
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.6875rem;
        font-weight: 600;
        color: var(--foreground);
      }
      .err-inline {
        color: var(--destructive);
      }
      .list-row {
        display: flex;
        gap: 0.375rem;
      }
      .list-row oer-choice-field {
        flex: 1;
        min-width: 0;
      }
      .icon-act {
        all: unset;
        flex: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.25rem;
        height: 2.25rem;
        border-radius: var(--radius-md);
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .icon-act:hover {
        background: var(--accent);
        color: var(--destructive);
      }
      .links,
      .files {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }
      .link-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.375rem 0.375rem 0.375rem 0.625rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        --simple-icon-height: 1rem;
        --simple-icon-width: 1rem;
      }
      .link-title {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        font-size: 0.875rem;
        font-weight: 500;
      }
      .link-title small {
        font-size: 0.75rem;
        font-weight: 400;
        color: var(--muted-foreground);
      }
      .link-row select {
        width: auto;
        height: 2rem;
        font-size: 0.8125rem;
      }
      .icon-act[disabled] {
        opacity: 0.35;
        cursor: default;
      }
      .file-row {
        display: flex;
        gap: 0.375rem;
        margin: 0;
        padding: 0.625rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
      }
      .file-grid {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        min-width: 0;
      }
      .url-row {
        display: flex;
        gap: 0.375rem;
      }
      .upload {
        flex: none;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        font-size: 0.8125rem;
        font-weight: 500;
        cursor: pointer;
      }
      .upload:hover {
        background: var(--accent);
      }
      .upload:focus-within {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .upload input {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
      }
      .add-item {
        all: unset;
        align-self: flex-start;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2rem;
        padding: 0 0.625rem;
        border-radius: var(--radius-md);
        font-size: 0.8125rem;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .add-item:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .notype {
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      footer {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border-top: 1px solid var(--border);
      }
      .status {
        flex: 1;
        font-size: 0.8125rem;
        color: var(--destructive);
      }
      .btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        height: 2.25rem;
        padding: 0 1rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
      }
      .people {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }
      .person-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto auto;
        gap: 0.375rem;
        align-items: center;
      }
      /* the affiliation sits under the name and link */
      .person-row .affiliation {
        grid-column: 1 / 3;
      }
      @media (max-width: 480px) {
        .person-row {
          grid-template-columns: minmax(0, 1fr) auto auto;
        }
        .person-row input[type="url"] {
          grid-column: 1;
          grid-row: 2;
        }
        .person-row .affiliation {
          grid-column: 1;
          grid-row: 3;
        }
      }
      .btn.outline {
        border: 1px solid var(--input-border, var(--border));
      }
      .btn.outline:hover {
        background: var(--accent);
      }
      .btn.primary {
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .btn[aria-disabled="true"] {
        opacity: 0.5;
        cursor: default;
      }
    `}_listChoices(e){const t=_(y.manifest?.items)||[],r=[];if(e.suggestFrom){const i=e.suggestFrom.lastIndexOf(":");r.push(...ct(t,e.suggestFrom.slice(0,i),e.suggestFrom.slice(i+1)))}return[...new Set([...r,...ct(t,"",e.name)])]}_renderField(e){const t=`f-${e.name}`,r=this._values[e.name],i=this._tried&&e.required&&a2(r),o=s`<label for="${t}">${e.label}${e.required?s` <span class="req" aria-hidden="true">*</span>`:""}</label>`,n=e.help?s`<p class="hint" id="${t}-help">${e.help}</p>`:"",l=i?s`<p class="err">${e.label} is required.</p>`:"",d={invalid:i};let c;switch(e.kind){case"longtext":c=s`<textarea id="${t}" class="${i?"invalid":""}" .value="${r||""}" @input="${p=>this._set(e.name,p.target.value)}"></textarea>`;break;case"select":if(wa(e))return s`<div>
            <span class="label" id="${t}-l">${e.label}${e.required?s` <span class="req" aria-hidden="true">*</span>`:""}</span>
            ${this._renderAiulPicker(e)}${n}${l}
          </div>`;if(e.multiple){const p=n2(r);return s`<div>
            <span class="label" id="${t}-l">${e.label}${e.required?s` <span class="req" aria-hidden="true">*</span>`:""}</span>
            <div class="choices" role="group" aria-labelledby="${t}-l">
              ${(e.options||[]).map(h=>s`<label class="check"
                  ><input
                    type="checkbox"
                    .checked="${p.includes(h.value)}"
                    @change="${m=>this._set(e.name,m.target.checked?[...p,h.value]:p.filter(v=>v!==h.value))}"
                  />${h.label}</label
                >`)}
            </div>
            ${n}${l}
          </div>`}c=s`<select id="${t}" class="${i?"invalid":""}" @change="${p=>this._set(e.name,p.target.value)}">
          <option value="" ?selected="${!r}">—</option>
          ${(e.options||[]).map(p=>s`<option value="${p.value}" ?selected="${p.value===r}">${p.label}</option>`)}
        </select>`;break;case"boolean":return s`<div>
          <label class="check"><input id="${t}" type="checkbox" .checked="${!!r}" @change="${p=>this._set(e.name,p.target.checked)}" />${e.label}</label>
          ${n}
        </div>`;case"relation":return s`<div><span class="label" id="${t}-l">${e.label}${e.required?s` <span class="req">*</span>`:""}</span>${this._renderRelation(e)}${n}${l}</div>`;case"people":return s`<div><span class="label" id="${t}-l">${e.label}${e.required?s` <span class="req">*</span>`:""}</span>${this._renderPeople(e)}${n}${l}</div>`;case"files":return s`<div><span class="label" id="${t}-l">${e.label}${e.required?s` <span class="req">*</span>`:""}</span>${this._renderFiles(e)}${n}${l}</div>`;case"list":{const p=Array.isArray(r)?r:r?[r]:[],h=p.length?p:[""],m=e.suggest?this._listChoices(e):null;return c=s`<div class="list" role="group" aria-labelledby="${t}-l">
          ${h.map((v,u)=>s`<div class="list-row">
              ${m?s`<oer-choice-field
                    field-id="${u===0?t:`${t}-${u}`}"
                    label="${e.label} ${u+1}"
                    new-label="New ${e.label.toLowerCase().replace(/s$/,"")}…"
                    .options="${m}"
                    .value="${v}"
                    @value-changed="${g=>{const f=[...h];f[u]=g.detail.value,this._set(e.name,f)}}"
                  ></oer-choice-field>`:s`<input
                class="input ${i?"invalid":""}"
                id="${u===0?t:`${t}-${u}`}"
                aria-label="${e.label} ${u+1}"
                .value="${v}"
                @input="${g=>{const f=[...h];f[u]=g.target.value,this._set(e.name,f)}}"
                @keydown="${g=>{if(g.key==="Enter"){g.preventDefault();const f=[...h];f.splice(u+1,0,""),this._set(e.name,f),this.updateComplete.then(()=>this.shadowRoot.getElementById(`${t}-${u+1}`)?.focus())}}}"
              />`}
              <button
                class="icon-act"
                title="Remove"
                aria-label="Remove ${e.label} ${u+1}"
                @click="${()=>this._set(e.name,h.filter((g,f)=>f!==u))}"
              >
                ${O("oer:x","sm")}
              </button>
            </div>`)}
          <button class="add-item" @click="${()=>this._set(e.name,[...h,""])}">${O("oer:plus","sm")}Add ${e.label.toLowerCase()}</button>
        </div>`,s`<div><span class="label" id="${t}-l">${e.label}${e.required?s` <span class="req">*</span>`:""}</span>${c}${n}${l}</div>`}case"text":if(e.suggest){c=s`<oer-choice-field
            field-id="${t}"
            new-label="New ${e.label.toLowerCase()}…"
            .options="${ct(_(y.manifest?.items),this._type,e.name)}"
            .value="${r??""}"
            ?invalid="${d.invalid}"
            @value-changed="${p=>this._set(e.name,p.detail.value)}"
          ></oer-choice-field>`;break}default:{const p={number:"number",date:"date",url:"url",image:"url"}[e.kind]||"text",h=e.kind==="date"&&r?String(r).slice(0,10):r??"";c=s`<input id="${t}" class="input ${d.invalid?"invalid":""}" type="${p}" .value="${h}" @input="${m=>this._set(e.name,m.target.value)}" />`}}return s`<div>${o}${c}${n}${l}</div>`}_renderAiulPicker(e){const t=`f-${e.name}`,r=n2(this._values[e.name]),i=new Set((e.options||[]).map(u=>u.value)),o=[],n=[];for(const u of e.options){const[,g,f]=u.value.match(hr)||[];g&&!o.includes(g.toUpperCase())&&o.push(g.toUpperCase()),f&&!n.includes(f.toUpperCase())&&n.push(f.toUpperCase())}const l=u=>i2(`AIUL-${u}`,this._aiul).name,d=u=>this._aiul?.modifiers?.find(g=>g.code===u)?.title||u,c=u=>this._set(e.name,u),p=r.map(u=>{const[,g="",f=""]=u.match(hr)||[];return{code:u,l:g.toUpperCase(),m:f.toUpperCase()}}),h=(u,g)=>`AIUL-${u}${g?`-${g}`:""}`,m=(u,g,f)=>{const x=[...r];x[u]=i.has(h(g,f))?h(g,f):h(g,""),c(x)},v=()=>{for(const u of o)if(!r.includes(h(u,"")))return h(u,"");return h(o[0],n[0]||"")};return s`<div class="aiul-picker" role="group" aria-labelledby="${t}-l">
      ${p.map((u,g)=>{const f=i2(u.code,this._aiul),x=r.indexOf(u.code)!==g;return s`<div class="aiul-row">
          <div class="aiul-selects">
            <select
              id="${g===0?t:`${t}-${g}`}"
              aria-label="${e.label} ${g+1}: license"
              @change="${k=>m(g,k.target.value,u.m)}"
            >
              ${o.map(k=>s`<option value="${k}" ?selected="${k===u.l}">AIUL-${k}${l(k)?` \xB7 ${l(k)}`:""}</option>`)}
            </select>
            <select aria-label="${e.label} ${g+1}: media" @change="${k=>m(g,u.l,k.target.value)}">
              <option value="" ?selected="${!u.m}">All media</option>
              ${n.filter(k=>i.has(h(u.l,k))).map(k=>s`<option value="${k}" ?selected="${k===u.m}">${d(k)} only</option>`)}
            </select>
            <button class="icon-act" title="Remove" aria-label="Remove ${u.code}" @click="${()=>c(r.filter((k,C)=>C!==g))}">${O("oer:x","sm")}</button>
          </div>
          <p class="hint aiul-hint">
            <code>${u.code}</code> ${f.description}${x?s` <span class="err-inline">Listed twice.</span>`:""}
          </p>
        </div>`})}
      <button
        class="add-item"
        @click="${()=>{c([...r,v()]),this.updateComplete.then(()=>this.shadowRoot.getElementById(`${t}-${r.length}`)?.focus()||this.shadowRoot.getElementById(t)?.focus())}}"
      >
        ${O("oer:plus","sm")}Add AI usage license
      </button>
    </div>`}async _addLinks(e){const t=Array.isArray(this._values[e.name])?this._values[e.name]:[],r=(e.types||[]).map(o=>this._allTypes.find(n=>n.id===o)?.label).filter(Boolean),i=await dr().pick({exclude:[this._item.id,...t.map(o=>o.page)],types:e.types,children:!1,title:`Add to ${e.label}`,hint:r.length?`Choose a page: ${r.join(", ")}.`:"Choose any page. Pin a released version to keep linking to it as it is now."});i&&this._set(e.name,[...t,{page:i.page.id,version:i.version||""}])}_renderRelation(e){const t=Array.isArray(this._values[e.name])?this._values[e.name]:[],r=we(t),i=o=>{const n=[...t];o(n),this._set(e.name,n)};return s`<div class="links" role="list">
      ${r.map((o,n)=>{const l=this._allTypes.find(c=>c.id===o.item?.metadata?.pageType),d=o.item?K(o.item.id):[];return s`<div class="link-row" role="listitem">
          ${l?.icon?s`<simple-icon-lite icon="${l.icon}"></simple-icon-lite>`:O("lrn:page","sm")}
          <span class="link-title">${o.item?o.item.title:s`<em>Missing page</em>`}<small>${l?.label||""}</small></span>
          ${d.length?s`<select aria-label="Version of ${o.item.title}" @change="${c=>i(p=>p[n]={...p[n],version:c.target.value})}">
                <option value="" ?selected="${!o.version}">Latest</option>
                ${d.map(c=>s`<option value="${c.version}" ?selected="${c.version===o.version}">v${c.version}</option>`)}
              </select>`:""}
          <button class="icon-act" title="Move up" aria-label="Move ${o.item?.title||"link"} up" ?disabled="${n===0}" @click="${()=>i(c=>c.splice(n-1,0,c.splice(n,1)[0]))}">
            ${O("icons:arrow-upward","sm")}
          </button>
          <button class="icon-act" title="Remove" aria-label="Remove ${o.item?.title||"link"}" @click="${()=>i(c=>c.splice(n,1))}">${O("oer:x","sm")}</button>
        </div>`})}
      <button class="add-item" @click="${()=>this._addLinks(e)}">${O("oer:plus","sm")}Add ${e.label.toLowerCase()}</button>
    </div>`}_renderPeople(e){const t=`f-${e.name}`,r=ue(this._values[e.name]),i=r.length?r:[{name:"",url:""}],o=ia(_(y.manifest?.items)||[]),n=l=>{const d=i.map(c=>({...c}));l(d),this._set(e.name,d)};return s`<div class="people" role="group" aria-labelledby="${t}-l">
      ${i.map((l,d)=>s`<div class="person-row">
          <input
            class="input"
            id="${d===0?t:`${t}-${d}`}"
            placeholder="Name"
            aria-label="${e.label} ${d+1}: name"
            .value="${l.name}"
            @input="${c=>n(p=>p[d].name=c.target.value)}"
          />
          <input
            class="input"
            type="url"
            placeholder="Link (optional)"
            aria-label="${e.label} ${d+1}: link"
            .value="${l.url||""}"
            @input="${c=>n(p=>p[d].url=c.target.value)}"
          />
          <button class="icon-act" title="Move up" aria-label="Move ${l.name||`person ${d+1}`} up" ?disabled="${d===0}" @click="${()=>n(c=>c.splice(d-1,0,c.splice(d,1)[0]))}">
            ${O("icons:arrow-upward","sm")}
          </button>
          <button class="icon-act" title="Remove" aria-label="Remove ${l.name||`person ${d+1}`}" @click="${()=>n(c=>c.splice(d,1))}">${O("oer:x","sm")}</button>
          <oer-choice-field
            class="affiliation"
            label="${e.label} ${d+1}: university or affiliation"
            new-label="Other university…"
            empty-label="University (optional)"
            .options="${o}"
            .value="${l.affiliation||""}"
            @value-changed="${c=>n(p=>p[d].affiliation=c.detail.value)}"
          ></oer-choice-field>
        </div>`)}
      <button
        class="add-item"
        @click="${()=>{n(l=>l.push({name:"",url:""})),this.updateComplete.then(()=>this.shadowRoot.getElementById(`${t}-${i.length}`)?.focus())}}"
      >
        ${O("oer:plus","sm")}Add person
      </button>
    </div>`}async _upload(e,t,r){const i=r.files?.[0];if(!i)return;const o=[...this._values[e.name]||[]];o[t]={...o[t],uploading:!0},this._set(e.name,o);try{const n=await ua(i),l=[...this._values[e.name]||[]];l[t]={...l[t],url:n,title:l[t].title||i.name.replace(/\.[^.]+$/,""),uploading:!1,error:""},this._set(e.name,l)}catch(n){const l=[...this._values[e.name]||[]];l[t]={...l[t],uploading:!1,error:n.message},this._set(e.name,l)}r.value=""}_renderFiles(e){const t=Array.isArray(this._values[e.name])?this._values[e.name]:[],r=(i,o)=>{const n=[...t];n[i]={...n[i],...o},this._set(e.name,n)};return s`<div class="files">
      ${t.map((i,o)=>s`<fieldset class="file-row">
          <legend class="sr">${e.label} ${o+1}</legend>
          <div class="file-grid">
            <input class="input" placeholder="Title" aria-label="Title" .value="${i.title||""}" @input="${n=>r(o,{title:n.target.value})}" />
            <div class="url-row">
              <input class="input" placeholder="File or link address" aria-label="File or link address" .value="${i.url||""}" @input="${n=>r(o,{url:n.target.value})}" />
              <label class="upload">
                ${O("icons:file-upload","sm")}${i.uploading?"Uploading\u2026":"Upload"}
                <input type="file" @change="${n=>this._upload(e,o,n.target)}" />
              </label>
            </div>
            <input class="input" placeholder="Description (optional)" aria-label="Description" .value="${i.description||""}" @input="${n=>r(o,{description:n.target.value})}" />
            ${lr(i.url)?s`<input class="input" placeholder="Alt text for the image" aria-label="Alt text" .value="${i.alt||""}" @input="${n=>r(o,{alt:n.target.value})}" />`:""}
            ${i.error?s`<p class="err">${i.error}</p>`:""}
          </div>
          <button class="icon-act" title="Remove" aria-label="Remove ${i.title||"file"}" @click="${()=>this._set(e.name,t.filter((n,l)=>l!==o))}">${O("oer:x","sm")}</button>
        </fieldset>`)}
      <button class="add-item" @click="${()=>this._set(e.name,[...t,{title:"",url:"",description:"",alt:""}])}">
        ${O("oer:plus","sm")}Add file or link
      </button>
    </div>`}render(){if(!this.open)return s``;const e=this._typeDef,t=this._tried?this._missing():[],r=this._allowed||[],i=e&&!r.some(o=>o.id===e.id)?[...r,e]:r;return s`
      <div class="backdrop" @click="${this._close}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">Page details</h2>
            <p class="sub">${this._item.title}</p>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._close}">${O("oer:x")}</button>
        </header>
        <div class="body">
          <div>
            <label for="ptype">Content type</label>
            <select id="ptype" @change="${o=>this._type=o.target.value}">
              <option value="" ?selected="${!this._type}">No type</option>
              ${i.map(o=>s`<option value="${o.id}" ?selected="${o.id===this._type}">${o.label}</option>`)}
            </select>
            ${e?.description?s`<p class="hint">${e.description}</p>`:""}
          </div>
          <div>
            <label for="pdesc">Description</label>
            <textarea id="pdesc" .value="${this._desc}" @input="${o=>this._desc=o.target.value}"></textarea>
            <p class="hint">Shown under the title and in search results.</p>
          </div>
          ${this._renderTags()}
          ${e?s`<div class="sep" role="separator"></div>
                ${e.fields.length?e.fields.map(o=>this._renderField(o)):s`<p class="notype">${e.label} has no fields of its own.</p>`}`:""}
        </div>
        <footer>
          <span class="status">${t.length?`Fill in: ${t.map(o=>o.label).join(", ")}`:""}</span>
          <button class="btn outline" @click="${this._close}">Cancel</button>
          <button class="btn primary" aria-disabled="${this._saving?"true":"false"}" @click="${this._save}">${this._saving?"Saving\u2026":"Save details"}</button>
        </footer>
      </div>
    `}};customElements.define(pt.tag,pt);function mr(){const a=globalThis.document;return a.querySelector(pt.tag)||a.body.appendChild(a.createElement(pt.tag))}const ur="Page details",s2=a=>a.composedPath().find(e=>e?.localName==="page-break"&&e.closest?.("hax-body"));function gr(a){a.t&&a.t.selectToEditPageDetails!==ur&&(a.t={...a.t,selectToEditPageDetails:ur})}function fr(a){const e=a.getAttribute("item-id")||T.activeId;mr().show(e,{onSaved:({pageType:t,description:r})=>{a.isConnected&&(t?a.setAttribute("page-type",t):a.removeAttribute("page-type"),a.setAttribute("description",r||""),"pageType"in a&&(a.pageType=t||null),"description"in a&&(a.description=r||""))}})}let vr=!1;function xa(){if(vr)return;vr=!0;const a=globalThis,e=r=>{if(!T.editMode)return;const i=s2(r);i&&(gr(i),r.preventDefault(),r.stopImmediatePropagation())};for(const r of["pointerdown","mousedown"])a.addEventListener(r,e,!0);a.addEventListener("click",r=>{if(!T.editMode)return;const i=s2(r);i&&(r.preventDefault(),r.stopImmediatePropagation(),fr(i))},!0),a.addEventListener("keydown",r=>{if(!T.editMode||r.key!=="Enter"&&r.key!==" ")return;const i=s2(r);i&&(r.preventDefault(),r.stopImmediatePropagation(),fr(i))},!0);const t=()=>{globalThis.HaxStore?.requestAvailability?.()?.activeHaxBody?.querySelectorAll?.("page-break").forEach(gr)};R(()=>{if(T.editMode)for(const r of[0,300,1e3,2500])setTimeout(t,r)})}const br=/\b(1[5-9]\d\d|20\d\d)\b/,Da=/\b(Press|Books|Publish\w*|University|College|Institute|Foundation|Society|Media|Inc|Ltd|ACM|IEEE|MIT|Wiley|Penguin|Routledge|Springer|Elsevier|Sage|O'Reilly)\b/,ya=/^(see|as discussed in|(?:condensed and )?adapted from|source|link|cited in|cf\.)\s*:?\s*/i,ka=/\(?\b(retrieved|accessed)( on)?\b[^)]*?\b(1[5-9]\d\d|20\d\d)\b\)?/gi,l2=/^(retrieved|accessed|available|url|isbn|doi|pp?\b|vol|page|dir\b)/i,xe=a=>String(a||"").replace(/\s+/g," ").trim(),ce=a=>xe(a).replace(/^[\s,.;:(\[]+|[\s,.;:(\[]+$/g,""),Ce=a=>/^(https?:\/\/|www\.)|^[\w-]+(\.[\w-]+)+\/?\S*$/i.test(xe(a)),d2=a=>ce(a)+(/\b\p{Lu}\.[\s,;]*$/u.test(a)?".":""),c2=a=>a===a.toUpperCase()&&(a.match(/\p{Lu}{2,}/gu)||[]).length>1?a.toLowerCase().replace(/(^|[\s'’-])\p{L}/gu,e=>e.toUpperCase()):a,_a=/^(\p{Lu}[\p{L}'’.-]*|de|van|von|der|da|di|la|le)$/u;function ht(a){const e=xe(a).split(" ").filter(Boolean);return e.length>=1&&e.length<=5&&e.every(t=>_a.test(t))&&/\p{Lu}/u.test(a)}function Ee(a){let e=c2(d2(a).replace(/\bet al\.?$/i,"").replace(/^(see|as discussed in|adapted from|cf\.)\s+/i,""));if(!e)return null;let t;e.includes(";")?t=e.split(/\s*;\s*/):t=e.split(/\s*,?\s+(?:and|&)\s+/);const r=[];for(const i of t.map(d2).filter(Boolean)){const o=i.split(/\s*,\s*/).map(d2);if(o.length===2&&ht(o[0])&&ht(o[1]))r.push(`${o[1]} ${o[0]}`);else if(o.length===1&&ht(i)&&i.split(" ").length>=2)r.push(i);else if(o.length===1&&ht(i)&&r.length&&t.length>1)r.push(i);else return null}return r.length?r:null}function $a(a){const e=a.match(/(?:^|[\s(,.])\p{Lu}[\p{L} .]*:\s*([^,;()\d:]+?)\s*(?:[,;()]|(?<!\b\p{Lu})\.\s|$|\d)/u);return e&&!l2.test(e[1])&&!Ce(e[1])?ce(e[1]):a.split(/,|\.\s|\(|\)/).map(ce).find(t=>t&&Da.test(t)&&!l2.test(t)&&!Ce(t)&&!/\d{3}/.test(t)&&t.split(" ").length<=6)||""}function Fa(a,e){let t=a.replace(/_/g," ").replace(/^[\s’”"»'.,;:]+/,"");if(/^[(\[\d]/.test(t))return"";t=t.replace(/^in\b\s*/i,"").replace(/^[^,()]+\((?:dir|eds?)\.?\)\s*,\s*/i,"");const r=t.match(/^([^,]+,\s*\p{Lu}\.?)\s*,\s*(.+)$/u);r&&Ee(r[1])&&(t=r[2]);const i=ce(t.split(/,\s|(?<!\b\p{Lu})\.\s|\(|\[/u)[0]).replace(/\s*\b(vol\.?\s*)?\d+\s*\(\d+\)$/i,"").trim();return!i||i.length>120||!/^\p{Lu}/u.test(i)||l2.test(i)||/dissertation|thesis/i.test(i)||i.includes(":")||Ce(i)||i===e||i.split(" ").length<2?"":c2(i)}function Ca(a){const e={authors:[],year:"",title:"",container:"",url:"",publisher:""};if(!a)return e;if(a.dataset?.cite)try{return{...e,...JSON.parse(a.dataset.cite)}}catch{}const t=a.cloneNode(!0);t.querySelectorAll("a.fn-back, a[href^='#']").forEach(C=>C.remove());const r=xe(t.textContent).replace(/\s*↩\s*/g," ").trim().replace(ya,""),i=[...t.querySelectorAll("a[href^='http']")].find(C=>!/wikipedia\.org\/wiki\/(International_Standard_Book_Number|Special:BookSources)/.test(C.href)),o=i?.getAttribute("href")||"",n=xe(i?.textContent),l=r.replace(/\S*(https?:|www\.)\S*/g,"").replace(ka,""),d=(l.match(new RegExp(`\\((?:[^)]*?)${br.source}\\)`))||l.match(br)||[])[1]||"",c=xe(t.querySelector("em, i, cite")?.textContent),p=xe((r.replace(/\([^)]*\)/g,C=>" ".repeat(C.length)).match(/[‘“"«]\s*([^’”"»]{3,}?)\s*[’”"»]/)||[])[1]);let h=c&&p?r.indexOf(p)<r.indexOf(c)?p:c:c||p;const m=!!h&&h!==c;let v=m&&c&&r.indexOf(c)>r.indexOf(h)?c.replace(/\s*\d+\s*\(\d+\)$/,""):"";!h&&n&&!Ce(n)&&(h=n);let u=null,g=r;const f=h?r.indexOf(h):-1;if(f>0)u=Ee(r.slice(0,f).replace(/\(\s*\d{4}[a-z]?\s*\)/,"").replace(/[‘“"]\s*$/,"")),g=r.slice(f+h.length);else if(f===0)g=r.slice(h.length);else{const C=Be=>ce(Be.split(/(?<!\b\p{Lu})\.\s+|\s*\[/u)[0]),J=r.match(/^(.+?)\s*\(\s*\d{4}[a-z]?\s*\)[.,]?\s*(.+)$/),Xe=r.match(/^(\p{Lu}[\p{L}'’-]+,(?:\s?\p{Lu}\.)+)\s+(.+)$/u),he=r.match(/^([^,]+,\s*[^,]+?),\s*(.+)$/),Q=r.split(/(?<!\b\p{Lu})\.\s+/u),Wt=r.match(/^([^,.]+(?:\.\s?\p{Lu}\.?[^,.]*)*?),\s*(.+)$/u);let Ze;if((Ze=J||Xe)&&(u=Ee(Ze[1])))h=C(Ze[2]),g=Ze[2].slice(h.length);else if(Q.length>1&&Q[0].includes(",")&&(u=Ee(Q[0])))h=ce(Q[1].split(/\s*\[|\s+\d{4}/)[0]),g=Q.slice(2).join(". ");else if(he&&he[1].includes(",")&&(u=Ee(he[1])))h=C(he[2]),g=he[2].slice(h.length);else if(Wt&&(u=Ee(Wt[1]))){const Be=Wt[2];h=ce(Be.split(/\s*\(|,\s|\.\s/)[0]),g=Be.slice(Be.indexOf(h)+h.length)}else h=ce(r.split(/\.\s/)[0]),g=r.slice(h.length)}h=c2(ce(h.replace(/\s*\([^)]*$/,""))),Ce(h)&&(h=""),h.length>200&&(h=`${h.slice(0,197)}\u2026`);const x=g.replace(/\S*(https?:|www\.)\S*/g,""),k=$a(x);return!v&&h&&h!==c&&(m||u)&&(v=Fa(x,k)),{authors:u||[],year:d,title:h||(Ce(n)?"":n),container:v,url:o,publisher:k}}const re=a=>String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),wr=(a=T.activeId)=>String(a||"p").replace(/^item-/,"").slice(0,8)||"p";function mt({authors:a=[],year:e="",title:t="",container:r="",url:i="",publisher:o=""}={}){const n=a.map(c=>typeof c=="string"?c:c?.name).filter(Boolean),l=n.length<3?n.join(" and "):`${n.slice(0,-1).join(", ")}, and ${n.at(-1)}`,d=t?i?`<a href="${re(i)}">${re(t)}</a>`:r?re(t):`<cite>${re(t)}</cite>`:i?`<a href="${re(i)}">${re(i)}</a>`:"";return[l&&`${re(l)}${e?` (${re(e)})`:""}.`,!l&&e?`(${re(e)}).`:"",d&&`${d}.`,r&&`<cite>${re(r)}</cite>.`,o&&`${re(o)}.`].filter(Boolean).join(" ")}function xr(a,e,t){let r=a.querySelector(":scope > section.footnotes");if(!r&&t){r=globalThis.document.createElement("section"),r.className="footnotes",r.setAttribute("aria-labelledby",`fn-${e}-label`),r.innerHTML=`<h2 id="fn-${e}-label">References</h2><ol></ol>`;const i=[...a.children].filter(o=>!(o.localName==="p"&&!o.textContent.trim()&&!o.querySelector("*"))).at(-1);i?i.after(r):a.append(r)}return r&&!r.querySelector("ol")&&r.append(globalThis.document.createElement("ol")),r}function Dr(a,e=T.activeId){if(!a)return 0;const t=wr(e),r=a.querySelector(":scope > section.footnotes"),i=[...a.querySelectorAll("sup.fn-ref > a[href^='#fn-']")].filter(h=>!r?.contains(h));if(!i.length&&!r)return 0;const o=xr(a,t,i.length>0);if(!o)return 0;const n=o.querySelector("ol"),l=new Map([...n.querySelectorAll(":scope > li[id^='fn-']")].map(h=>[h.id,h])),d=[],c=new Map;for(const h of i){const m=h.getAttribute("href").slice(1),v=l.get(m),u=h.parentElement;if(!v){u.remove();continue}d.includes(m)||d.push(m);const g=(c.get(m)||0)+1;c.set(m,g),u.id=`fnref-${m.slice(3)}${g>1?`-${g}`:""}`,h.textContent=String(d.indexOf(m)+1)}const p=[...l.keys()].filter(h=>!d.includes(h));for(const h of[...d,...p]){const m=l.get(h);m.querySelectorAll(":scope > a.fn-back").forEach(g=>g.remove());const v=c.get(h)||0,u=d.indexOf(h)+1;for(let g=1;g<=v;g++){const f=globalThis.document.createElement("a");f.className="fn-back",f.href=`#fnref-${h.slice(3)}${g>1?`-${g}`:""}`,f.setAttribute("aria-label",v>1?`Back to citation ${u}${String.fromCharCode(96+g)}`:`Back to citation ${u}`),f.innerHTML=v>1?`\u21A9<sup>${String.fromCharCode(96+g)}</sup>`:"\u21A9",m.append(" ",f)}n.append(m)}return l.size||o.remove(),i.length}function Ea(a){return[...a?.querySelector(":scope > section.footnotes")?.querySelectorAll("ol > li[id^='fn-']")||[]].map(e=>{const t=e.cloneNode(!0);t.querySelectorAll("a.fn-back").forEach(i=>i.remove());const r=t.querySelector("a[href^='http']");return{id:e.id,html:t.innerHTML.trim(),text:t.textContent.trim(),resource:e.dataset.resource||"",url:r?.getAttribute("href")||"",linkText:r?.textContent.trim()||"",parts:Ca(e)}})}function Ma(a,e,t,r=T.activeId){const i=wr(r);let o=t.id;if(!o){const p=xr(a,i,!0),h=Math.random().toString(36).slice(2,7);o=`fn-${i}-${h}`;const m=globalThis.document.createElement("li");m.id=o,t.resource&&(m.dataset.resource=t.resource),t.data&&(m.dataset.cite=JSON.stringify(t.data)),m.innerHTML=t.html,p.querySelector("ol").append(m)}const n=globalThis.document.createElement("sup");n.className="fn-ref",n.innerHTML=`<a href="#${o}">?</a>`;const l=e.cloneRange();l.collapse(!1),l.insertNode(n);const d=globalThis.document.createRange();d.setStartAfter(n),d.collapse(!0);const c=a.getRootNode().getSelection?.()||globalThis.getSelection();return c?.removeAllRanges(),c?.addRange(d),Dr(a,r),o}function p2(a,e,t){const r=a?.querySelector(`li#${CSS.escape(e)}`);r&&t&&(r.dataset.resource=t)}function Sa(a){return[...new Set([...a?.querySelectorAll("section.footnotes li[data-resource]")||[]].map(e=>e.dataset.resource).filter(Boolean))]}let yr=!1;function Aa(){if(yr)return;yr=!0;let a=!!T.editMode;R(()=>{const e=!!T.editMode,t=T.activeId;a&&!e&&t&&setTimeout(()=>Ta(t),1500),a=e})}async function Ta(a){const e=(_(T.manifest?.items)||[]).find(n=>n.id===a);if(!e?.location)return;const t=await fetch(new URL(`${e.location}?t=${Date.now()}`,globalThis.document.baseURI),{cache:"no-store"}).catch(()=>null);if(!t?.ok)return;const r=new DOMParser().parseFromString(await t.text(),"text/html"),i=Sa(r),o=e.metadata?.oerCites||[];JSON.stringify(i)!==JSON.stringify(o)&&await se([{...e,metadata:{...e.metadata,oerCites:i},modified:!0}])}let kr=!1;function za(){if(kr)return;const a=t=>{if(!t||t.prototype.__oerCitations)return;t.prototype.__oerCitations=!0;const r=t.prototype.haxToContent;t.prototype.haxToContent=async function(...i){try{Dr(this)}catch(o){console.warn("[oer] citations",o)}return r.apply(this,i)}};Aa();const e=customElements.get("hax-body");e?a(e):customElements.whenDefined("hax-body").then(()=>a(customElements.get("hax-body"))),kr=!0}const ut=20;function _r(a){const e=a.getBoundingClientRect(),t=e.top-4,r=e.bottom+4;return{top:t,bottom:r,left:e.left-4,right:e.right+4,height:r-t,compact:r-t<60,block:e}}const $r=a=>a.localName!=="page-break"&&a.getClientRects().length>0;function ja(a){const e=new Set;for(const t of a.querySelectorAll("[slot]")){const r=t.parentElement;!r||r===a||e.has(r)||(a.__isLayout?a.__isLayout(r):r.localName==="grid-plate")&&e.add(r)}for(const t of a.querySelectorAll("grid-plate"))e.add(t);return[...e]}function Ba(a){const e=a.shadowRoot,t=[];if(!e)return t;const r=typeof a.layout=="string"?a.layout.split("-").length:1/0;for(const i of[...e.querySelectorAll("[id^='col']")].slice(0,r)){const o=i.querySelector("slot")?.getAttribute("name"),n=i.getBoundingClientRect();!o||n.width===0||getComputedStyle(i).display==="none"||t.push({name:o,rect:n})}return t}function h2(a,e){if(e-a>=16)return[a,e];const t=(a+e)/2;return[t-16/2,t+16/2]}function gt(a){const e=[];if(!a)return e;const t=a.getBoundingClientRect(),r=[...a.children].filter($r),i=r.map(o=>o.getBoundingClientRect());for(let o=0;o<=r.length;o++){const n=o===r.length,l=o===0?(i[0]?.top??t.top)-16:i[o-1].bottom,d=n?l+16:i[o].top,[c,p]=h2(l,d);e.push({container:a,slotName:null,before:r[o]||null,after:r[o-1]||null,nested:!1,end:n,top:c,height:p-c,left:t.left,width:t.width})}for(const o of ja(a))for(const n of Ba(o)){const l=[...o.children].filter(c=>c.getAttribute("slot")===n.name&&$r(c)),d=l.map(c=>c.getBoundingClientRect());if(!l.length){const[c,p]=h2(n.rect.top,n.rect.bottom);e.push({container:o,slotName:n.name,before:null,after:null,nested:!0,top:c,height:p-c,left:n.rect.left,width:n.rect.width});continue}for(let c=0;c<=l.length;c++){const p=c===0?n.rect.top:d[c-1].bottom,h=c===l.length?Math.max(n.rect.bottom,p):d[c].top,[m,v]=h2(p,h);e.push({container:o,slotName:n.name,before:l[c]||null,after:l[c-1]||null,nested:!0,top:m,height:v-m,left:n.rect.left,width:n.rect.width})}}return e}function Fr(a,e,t,{gutter:r=0}={}){let i=null;for(const o of a){const n=o.nested?o.left:o.left-r;e<n||e>o.left+o.width||t<o.top||t>o.top+o.height||(!i||o.width*o.height<i.width*i.height)&&(i=o)}return i}function La(a,e,t){const r=Fr(a,e,t,{gutter:96});if(r)return r;let i=null,o=1/0;for(const n of a){const l=e<n.left?n.left-e:e>n.left+n.width?e-n.left-n.width:0,d=t<n.top?n.top-t:t>n.top+n.height?t-n.top-n.height:0,c=Math.hypot(l*2,d);c<o&&(o=c,i=n)}return i}const m2=(a,e)=>!!a&&!!e&&a.container===e.container&&a.slotName===e.slotName&&a.before===e.before&&a.after===e.after;function Cr(a){const e=()=>{for(const t of a)t?.isConnected&&t.hasAttribute("slot")&&t.parentElement?.localName!=="grid-plate"&&t.removeAttribute("slot")};e(),setTimeout(e,150),setTimeout(e,600)}function Er(a,e){e.before?e.before.before(a):e.after?e.after.after(a):e.container.append(a),e.slotName?a.setAttribute("slot",e.slotName):Cr([a])}async function Mr(a,e,{tag:t,content:r="",properties:i={}}){const o=a.activeHaxBody,n=new Set(e.container.children),l=new Set(o.children);let d=e.after;!d&&!e.nested&&(d=[...o.children].find(p=>p.localName==="page-break")),d||(d=e.before||e.container),o.__addAbove=!1,o.haxInsert(t,r,i,d),await new Promise(p=>requestAnimationFrame(()=>requestAnimationFrame(p)));const c=[...e.container.children].find(p=>!n.has(p))||[...o.children].find(p=>!l.has(p));return c?(e.nested&&(!e.after||c.parentElement!==e.container)&&Er(c,e),c):null}const Sr=a=>s`<span class="icon" aria-hidden="true" style="--src:url(&quot;${S[`oer:${a}`]||""}&quot;)"></span>`,Ia=["contenteditable","data-hax-active","data-hax-ray","draggable","id"];let ft=class extends M{static get tag(){return"oer-settings-dialog"}static get properties(){return{mode:{type:String,reflect:!0},_title:{state:!0}}}constructor(){super(),this.mode=null,this._title="",this.__keys=e=>{this.mode&&e.key==="Escape"&&!e.defaultPrevented&&(e.preventDefault(),e.stopPropagation(),this.close())},this.__place=()=>{this.mode&&(this.__raf=requestAnimationFrame(this.__place),this._placeTray())}}get _hax(){return globalThis.HaxStore?.requestAvailability?.()}open(e="settings"){const t=this._hax,r=t?.activeNode;if(!(e==="settings"&&!r)){if(this.__returnFocus=globalThis.document.activeElement,this.__node=e==="settings"?r:null,e==="settings"){const i=t.haxSchemaFromTag?.(r.localName);this._title=`${i?.gizmo?.title||r.localName} settings`}else this._title="HTML source";this.mode=e,No(e==="source"?"view-source":"content-edit"),t?.haxTray?.setAttribute("data-oer-dialog",e),globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>{this._refreshPreview(),this._watch(),this.__place(),this.shadowRoot.querySelector(".close")?.focus()})}}close(){if(!this.mode)return;this.mode=null,cancelAnimationFrame(this.__raf),this.__observer?.disconnect(),globalThis.removeEventListener("keydown",this.__keys,!0),this._hax?.haxTray?.removeAttribute("data-oer-dialog");const e=this.__node;this.__node=null,(e?.isConnected?e:this.__returnFocus)?.focus?.()}_placeTray(){const e=this._hax?.haxTray,t=this.shadowRoot.querySelector(".form");if(!e||!t)return;const r=t.getBoundingClientRect(),i=`${r.top}|${r.left}|${r.width}|${r.height}`;i!==this.__trayKey&&(this.__trayKey=i,e.style.setProperty("--oer-tray-top",`${r.top}px`),e.style.setProperty("--oer-tray-left",`${r.left}px`),e.style.setProperty("--oer-tray-width",`${r.width}px`),e.style.setProperty("--oer-tray-height",`${r.height}px`))}_watch(){this.__observer?.disconnect();const e=this.__node;e&&(this.__observer=new MutationObserver(()=>{cancelAnimationFrame(this.__previewRaf),this.__previewRaf=requestAnimationFrame(()=>this._refreshPreview())}),this.__observer.observe(e,{attributes:!0,childList:!0,subtree:!0,characterData:!0}))}_refreshPreview(){const e=this.querySelector("[slot='preview']"),t=this.__node;if(!e||!t?.isConnected)return;const r=t.cloneNode(!0);for(const o of[r,...r.querySelectorAll("*")])for(const n of Ia)o.removeAttribute(n);e.replaceChildren(r);const i=getComputedStyle(t);for(const o of["font-family","font-size","line-height","color"])e.style.setProperty(o,i.getPropertyValue(o))}static get styles(){return b`
      :host {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: none;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
      }
      :host([mode]) {
        display: grid;
        place-items: center;
      }
      .backdrop {
        position: absolute;
        inset: 0;
        background: rgb(0 0 0 / 0.5);
      }
      .dialog {
        position: relative;
        display: flex;
        flex-direction: column;
        width: min(64rem, calc(100vw - 2rem));
        height: min(42rem, calc(100dvh - 2rem));
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
        overflow: hidden;
      }
      header {
        flex: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 3.25rem;
        padding: 0 0.75rem 0 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      h2 {
        flex: 1;
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
        letter-spacing: -0.01em;
      }
      header .icon {
        color: var(--muted-foreground);
      }
      .close {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md);
        cursor: pointer;
        color: var(--muted-foreground);
      }
      .close:hover {
        background: var(--accent);
        color: var(--accent-foreground);
      }
      .close:focus-visible {
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
      .body {
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: minmax(0, 1fr) 22rem;
      }
      :host([mode="source"]) .body {
        grid-template-columns: minmax(0, 1fr);
      }
      .preview {
        position: relative;
        overflow: auto;
        padding: 1.5rem;
        background: var(--muted);
        border-right: 1px solid var(--border);
      }
      .preview-label {
        margin: 0 0 0.75rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--muted-foreground);
      }
      .stage {
        padding: 1.5rem;
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
      }
      ::slotted([slot="preview"]) {
        pointer-events: none;
      }
      :host([mode="source"]) .preview {
        display: none;
      }
      /* HAX's editor panel is laid over this area while the dialog is open */
      .form {
        min-width: 0;
        min-height: 0;
      }
      @media (max-width: 720px) {
        .body {
          grid-template-columns: minmax(0, 1fr);
          grid-template-rows: minmax(8rem, 35%) minmax(0, 1fr);
        }
        .preview {
          border-right: 0;
          border-bottom: 1px solid var(--border);
        }
      }
    `}render(){return s`
      <div class="backdrop" @click="${this.close}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="title">
        <header>
          ${Sr(this.mode==="source"?"code":"sliders-horizontal")}
          <h2 id="title">${this._title}</h2>
          <button class="close" aria-label="Close" title="Close (Esc)" @click="${this.close}">${Sr("x")}</button>
        </header>
        <div class="body">
          <div class="preview" aria-label="Preview">
            <p class="preview-label">Preview</p>
            <div class="stage" inert><slot name="preview"></slot></div>
          </div>
          <div class="form"></div>
        </div>
      </div>
    `}};customElements.define(ft.tag,ft);function Ar(){const a=globalThis.document;let e=a.querySelector(ft.tag);if(!e){e=a.createElement(ft.tag);const t=a.createElement("div");t.slot="preview",e.append(t),a.body.append(e)}return e}const Tr=a=>a?.localName==="grid-plate";function zr(a,e,{self:t=!0}={}){let r=t?e:e?.parentElement;for(;r&&r!==a;){if(Tr(r))return r;r=r.parentElement}return null}const jr=a=>typeof a?.layout=="string"?a.layout.split("-").length:1;function Ra(a){return[...a.shadowRoot?.querySelectorAll("[id^='col']")||[]].slice(0,jr(a)).map(e=>e.getBoundingClientRect()).filter(e=>e.width>0)}function qa(a){const e=a?.layouts||globalThis.document.createElement("grid-plate").layouts||{};return Object.entries(e).map(([t,r])=>({key:t,label:(r.columnLayout||t).replace(/^\d+:\s*/,""),ratios:t.split("-").map(Number)}))}const Pa=()=>new Promise(a=>requestAnimationFrame(()=>requestAnimationFrame(a)));function Oa(a,e){const t=e.split("-").length,r=`col-${t}`;for(const i of[...a.children])Number((i.getAttribute("slot")||"col-1").replace("col-",""))>t&&i.setAttribute("slot",r);a.layout=e}async function Ha(a,e,t){const r=a.activeHaxBody,i=e.parentElement,o=new Set(i.children);r.__addAbove=!1,r.haxInsert("grid-plate","",{layout:t},e),await Pa();const n=[...i.children].find(l=>!o.has(l)&&l.localName==="grid-plate");return n?(n.append(e),e.setAttribute("slot","col-1"),n):null}function Na(a){const e=Tr(a.parentElement)?a.getAttribute("slot"):null,t=i=>Number((i.getAttribute("slot")||"col-1").replace("col-","")),r=[...a.children].sort((i,o)=>t(i)-t(o));for(const i of r)a.before(i),e?i.setAttribute("slot",e):i.removeAttribute("slot");return a.remove(),e||Cr(r),r[0]||null}const ge=a=>s`<span class="icon" aria-hidden="true" style="--src:url(&quot;${S[`oer:${a}`]||""}&quot;)"></span>`,Ua=4,vt=48;let Br=class extends M{static get tag(){return"oer-block-frame"}static get properties(){return{_label:{state:!0},_drag:{state:!0},_layout:{state:!0},_guides:{state:!0},_menu:{state:!0}}}constructor(){super(),this._label="",this._drag=null,this._layout=null,this._guides=[],this._menu=!1,this.__outside=e=>{this._menu&&!e.composedPath().includes(this)&&(this._menu=!1)},this.__tick=this._tick.bind(this),this.__keys=e=>{if(this._menu&&e.key==="Escape"){e.preventDefault(),e.stopPropagation(),this._menu=!1;return}this._drag&&e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),this._endDrag(!1))}}connectedCallback(){super.connectedCallback(),this.hidden=!0,this.__raf=requestAnimationFrame(this.__tick),globalThis.addEventListener("keydown",this.__keys,!0),globalThis.addEventListener("pointerdown",this.__outside,!0)}disconnectedCallback(){globalThis.removeEventListener("pointerdown",this.__outside,!0),cancelAnimationFrame(this.__raf),globalThis.removeEventListener("keydown",this.__keys,!0),super.disconnectedCallback()}get _hax(){return globalThis.HaxStore?.requestAvailability?.()}_tick(){this.__raf=requestAnimationFrame(this.__tick);const e=this._hax,t=T.editMode?e?.activeNode:null;if(!t||!t.isConnected||t.localName==="page-break"){this.hidden=!0,this.__node=null,this._menu=!1;return}if(t!==this.__node){this.__node=t,this._menu=!1,this._layout=zr(e.activeHaxBody,t);const d=e.haxSchemaFromTag?.(t.localName);this._label=d?.gizmo?.title||t.localName}const r=_r(t),i=it();if((r.bottom<i.top||r.top>i.bottom||r.block.width===0)&&!this._drag){this.hidden=!0;return}this.hidden=!1;const o=this.style;o.setProperty("--top",`${Math.round(r.top)}px`),o.setProperty("--left",`${Math.round(r.left)}px`),o.setProperty("--width",`${Math.round(r.right-r.left)}px`),o.setProperty("--height",`${Math.round(r.height)}px`);const n=Math.max(r.top,i.top),l=Math.min(r.bottom,i.bottom);o.setProperty("--grip",`${Math.round((n+l)/2-r.top)}px`),this.toggleAttribute("compact",r.compact),this._updateGuides(),this._drag&&this._dragFrame()}_updateGuides(){const e=this._hax?.activeHaxBody,t=this._drag?[...e?.querySelectorAll("grid-plate")||[]]:this._layout?.isConnected?[this._layout]:[],r=n=>({top:Math.round(n.top),left:Math.round(n.left),width:Math.round(n.width),height:Math.round(n.height)}),i=t.filter(n=>n.getClientRects().length).map(n=>{const l=r(n.getBoundingClientRect()),d=Ra(n).map(r),c=[];for(let p=1;p<d.length;p++){const h=d[p-1],m=d[p];m.left>=h.left+h.width-1?c.push({left:Math.round((h.left+h.width+m.left)/2),top:l.top,width:0,height:l.height}):c.push({left:l.left,top:Math.round((h.top+h.height+m.top)/2),width:l.width,height:0})}return{...l,count:jr(n),cols:d,dividers:c}}),o=JSON.stringify(i);o!==this.__guideKey&&(this.__guideKey=o,this._guides=i)}_currentLayout(){const e=this._hax,t=e?.activeNode;return t?zr(e.activeHaxBody,t):null}_selectLayout(){const e=this._hax,t=this._currentLayout();e&&t&&(e.activeNode=t),this._menu=!1}async _chooseLayout(e){const t=this._hax,r=t?.activeNode;if(this._menu=!1,!t||!r)return;const i=this._currentLayout();i?Oa(i,e):await Ha(t,r,e)&&(this.__node=null,t.activeNode=r)}_removeLayout(){const e=this._hax,t=this._currentLayout();if(this._menu=!1,!e||!t)return;const r=e.activeNode===t?null:e.activeNode,i=Na(t);this.__node=null,e.activeNode=r||i}_move(e){Ho(e==="up"?"hax-plate-up":"hax-plate-down")}_gripKeys(e){(e.key==="ArrowUp"||e.key==="ArrowDown")&&(e.preventDefault(),this._move(e.key==="ArrowUp"?"up":"down"))}_pointerDown(e){if(e.button===0){e.preventDefault();try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}this.__press={x:e.clientX,y:e.clientY,id:e.pointerId}}}_pointerMove(e){if(!this.__press)return;const t=Math.hypot(e.clientX-this.__press.x,e.clientY-this.__press.y);!this._drag&&t<Ua||(this._drag||(globalThis.__oerDragging=!0),this._drag={...this._drag||{},x:e.clientX,y:e.clientY})}_pointerUp(e){if(this.__press){this.__press=null;try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}this._drag&&this._endDrag(!0)}}_dragFrame(){const e=this._drag,t=it(),r=globalThis.document.querySelector("custom-oer-docs-theme")?.shadowRoot?.querySelector("main");r&&(e.y<t.top+vt?r.scrollTop-=Math.ceil((t.top+vt-e.y)/4):e.y>t.bottom-vt&&(r.scrollTop+=Math.ceil((e.y-t.bottom+vt)/4)));const i=this.__node,o=gt(this._hax?.activeHaxBody).filter(d=>!i.contains(d.container)),n=La(o,e.x,e.y),l=!!n&&n.before!==i&&n.after!==i;(!m2(n,e.slot)||l!==e.valid||!e.rect||e.rect.top!==Math.round(n?.top))&&(this._drag={...e,slot:n,valid:l,rect:n&&{top:Math.round(n.top),left:Math.round(n.left),width:Math.round(n.width),height:Math.round(n.height)}})}_endDrag(e){const t=this._drag;this._drag=null,globalThis.__oerDragging=!1;const r=this.__node;if(!e||!t?.slot||!t.valid||!r)return;Er(r,t.slot);const i=this._hax;i&&(i.activeNode=r),r.scrollIntoView?.({block:"nearest"})}static get styles(){return b`
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
        left: calc(var(--left) - ${ut}px + 2px);
        width: ${ut}px;
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
        width: ${ut}px;
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
      /* short blocks: just the grip; ↑ / ↓ remain in the rail's Block menu */
      :host([compact]) .step {
        display: none;
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
      /* breadcrumb label: [▥] Columns › Paragraph */
      .label {
        pointer-events: auto;
        top: var(--top);
        left: calc(var(--left) + var(--width));
        transform: translate(-100%, -100%);
        display: flex;
        align-items: center;
        gap: 0.125rem;
        height: 1.5rem;
        padding: 0 0.375rem 0 0.125rem;
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1.25rem;
        white-space: nowrap;
        color: var(--primary-foreground);
        background: var(--primary);
        border-radius: var(--radius-sm) var(--radius-sm) 0 0;
      }
      .label button {
        width: auto;
        height: 1.25rem;
        padding: 0 0.25rem;
        border-radius: var(--radius-sm);
        font: inherit;
        color: inherit;
      }
      .label .lay {
        width: 1.25rem;
        padding: 0;
      }
      .label .crumb {
        font-weight: 500;
        opacity: 0.85;
      }
      .label .sep {
        opacity: 0.7;
      }
      .label .sep .icon {
        width: 0.75rem;
        height: 0.75rem;
      }

      /* layout guides: the layout around the selection, and its columns */
      .guide,
      .col {
        position: fixed;
        box-sizing: border-box;
        border-radius: var(--radius-sm);
      }
      .guide {
        border: 1px dashed color-mix(in oklch, var(--primary) 70%, transparent);
      }
      .col {
        background: color-mix(in oklch, var(--primary) 4%, transparent);
      }
      .divider {
        position: fixed;
        box-sizing: border-box;
        border-left: 1px dashed color-mix(in oklch, var(--primary) 60%, transparent);
        border-top: 1px dashed color-mix(in oklch, var(--primary) 60%, transparent);
      }
      .divider.v {
        border-top: 0;
      }
      .divider.h {
        border-left: 0;
      }
      .tab {
        position: absolute;
        top: 0;
        left: 0.5rem;
        transform: translateY(-50%);
        padding: 0 0.375rem;
        font-size: 0.6875rem;
        font-weight: 600;
        line-height: 1.125rem;
        white-space: nowrap;
        color: var(--primary);
        background: var(--background);
        border: 1px solid color-mix(in oklch, var(--primary) 70%, transparent);
        border-radius: 999px;
      }

      /* layout menu (shadcn DropdownMenu) */
      .menu {
        pointer-events: auto;
        position: fixed;
        top: var(--top);
        left: calc(var(--left) + var(--width));
        transform: translateX(-100%);
        width: 16rem;
        box-sizing: border-box;
        padding: 0.25rem;
        color: var(--popover-foreground);
        background: var(--popover);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
      }
      .menu .head {
        padding: 0.375rem 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--muted-foreground);
      }
      .presets {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.25rem;
        padding: 0.25rem;
      }
      .menu .presets button {
        width: auto;
        height: 2.25rem;
        padding: 0.375rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        display: flex;
        gap: 2px;
      }
      .menu .presets button:hover {
        border-color: var(--primary);
        background: var(--accent);
      }
      .menu .presets button[aria-checked="true"] {
        border-color: var(--primary);
        box-shadow: inset 0 0 0 1px var(--primary);
      }
      .bar {
        height: 100%;
        border-radius: 2px;
        background: color-mix(in oklch, var(--foreground) 35%, transparent);
      }
      .menu .presets button[aria-checked="true"] .bar {
        background: var(--primary);
      }
      .menu .sepline {
        height: 1px;
        margin: 0.25rem -0.25rem;
        background: var(--border);
      }
      .menu .item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        height: 2rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.875rem;
        justify-content: flex-start;
      }
      .menu .item:hover {
        background: var(--accent);
        color: var(--accent-foreground);
      }
      .menu .icon {
        width: 1rem;
        height: 1rem;
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
    `}updated(e){e.has("_drag")&&this.toggleAttribute("dragging",!!this._drag);const t=this.shadowRoot.querySelector(".menu");if(t){t.style.marginTop="0px";const r=t.getBoundingClientRect(),i=r.bottom-(globalThis.innerHeight-8);i>0&&(t.style.marginTop=`${-Math.min(i,r.top-8)}px`)}}_renderLabel(){const e=this._layout&&this._layout!==this.__node;return s`<div class="label" @mousedown="${t=>t.preventDefault()}">
      <button
        class="lay"
        title="Block settings"
        aria-label="Block settings"
        aria-haspopup="dialog"
        @click="${()=>{this._menu=!1,Ar().open("settings")}}"
      >
        ${ge("sliders-horizontal")}
      </button>
      <button
        class="lay"
        title="Layout"
        aria-label="Layout options"
        aria-haspopup="menu"
        aria-expanded="${this._menu?"true":"false"}"
        @click="${()=>this._menu=!this._menu}"
      >
        ${ge("columns-2")}
      </button>
      ${e?s`<button class="crumb" title="Select the column layout" @click="${this._selectLayout}">Columns</button>
            <span class="sep" aria-hidden="true">${ge("chevron-right")}</span>`:""}
      <span>${this._label}</span>
    </div>`}_renderMenu(){const e=this._layout,t=qa(e).filter(r=>e||r.key!=="1");return s`<div class="menu" role="menu" aria-label="Layout" @mousedown="${r=>r.preventDefault()}">
      <div class="head">${e?"Column layout":"Put in columns"}</div>
      <div class="presets" role="group" aria-label="Column presets">
        ${t.map(r=>s`<button
            role="menuitemradio"
            aria-checked="${e?.layout===r.key?"true":"false"}"
            title="${r.label}"
            aria-label="${r.ratios.length} columns: ${r.label}"
            @click="${()=>this._chooseLayout(r.key)}"
          >
            ${r.ratios.map(i=>s`<span class="bar" style="flex:${i}"></span>`)}
          </button>`)}
      </div>
      ${e?s`<div class="sepline"></div>
            ${e!==this.__node?s`<button class="item" role="menuitem" @click="${this._selectLayout}">${ge("box")} Select layout</button>`:""}
            <button class="item" role="menuitem" @click="${this._removeLayout}">${ge("panel-right-close")} Remove layout, keep blocks</button>`:""}
    </div>`}render(){const e=this._drag;return s`
      ${this._guides.map(t=>s`${t.cols.map(r=>s`<div class="col" style="top:${r.top}px;left:${r.left}px;width:${r.width}px;height:${r.height}px"></div>`)}
          ${t.dividers.map(r=>s`<div
              class="divider ${r.width?"h":"v"}"
              style="top:${r.top}px;left:${r.left}px;width:${r.width}px;height:${r.height}px"
            ></div>`)}
          <div class="guide" style="top:${t.top-6}px;left:${t.left-6}px;width:${t.width+12}px;height:${t.height+12}px">
            <span class="tab">Columns · ${t.count}</span>
          </div>`)}
      <div class="ring"></div>
      ${this._renderLabel()}
      ${this._menu?this._renderMenu():""}
      <div class="handle" @mousedown="${t=>t.preventDefault()}">
        <button class="step" title="Move up" aria-label="Move block up" @click="${()=>this._move("up")}">${ge("chevron-up")}</button>
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
          ${ge("grip-vertical")}
        </button>
        <button class="step" title="Move down" aria-label="Move block down" @click="${()=>this._move("down")}">${ge("chevron-down")}</button>
      </div>
      ${e?.valid&&e.rect?s`<div class="drop" style="top:${e.rect.top}px;left:${e.rect.left}px;width:${e.rect.width}px;height:${e.rect.height}px"></div>`:""}
      ${e?s`<div class="ghost" style="left:${e.x}px;top:${e.y}px">${this._label}</div>`:""}
    `}};customElements.define(Br.tag,Br);const De=(a,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${S[a]||""}&quot;)"></span>`,Lr=a=>String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),Va=[{id:"page",label:"On this page"},{id:"resources",label:"Resources"},{id:"new",label:"New source"}],Ir=a=>String(a||"").trim().toLowerCase().replace(/^https?:\/\/(www\.)?/,"").replace(/[#?].*$/,"").replace(/\/+$/,""),Rr=a=>String(a||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();function qr(a,{url:e="",title:t=""}={}){const r=Ir(e),i=Rr(t);return r&&a.find(o=>Ir(o.metadata?.oerFields?.url)===r)||i.length>3&&a.find(o=>Rr(o.title)===i)||null}const Pr={authors:"",year:"",title:"",container:"",url:"",publisher:"",kind:"reference",description:""};function Or(a){const e=a?.metadata?.oerFields||{};return{authors:ue(e.authors).map(t=>t.name),year:e.date||"",title:a.title,container:e.container||"",url:e.url||"",publisher:e.publisher||""}}let bt=class extends M{static get tag(){return"oer-cite-dialog"}static get properties(){return{open:{type:Boolean,reflect:!0},_tab:{state:!0},_query:{state:!0},_chosen:{state:!0},_form:{state:!0},_free:{state:!0},_save:{state:!0}}}constructor(){super(),this.open=!1,this.__keys=e=>{this.open&&e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),this._finish(null))}}pick({references:e=[]}={}){return this._references=e,this._tab=e.length?"page":"resources",this._query="",this._chosen=null,this._form={...Pr},this._free="",this._save=!0,this._linkTarget=null,this._returnFocus=globalThis.document.activeElement,this.open=!0,globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector(".tabs button[aria-selected='true']")?.focus()),new Promise(t=>this._resolve=t)}_finish(e){this.open=!1,globalThis.removeEventListener("keydown",this.__keys,!0),this._resolve?.(e),this._resolve=null}get _allResources(){return(_(y.manifest?.items)||[]).filter(e=>e.metadata?.pageType==="oer:resource"&&!e.metadata?.oerSnapshotOf)}get _resources(){const e=this._query.trim().toLowerCase();return(_(y.manifest?.items)||[]).filter(t=>t.metadata?.pageType==="oer:resource"&&!t.metadata?.oerSnapshotOf).filter(t=>!e||`${t.title} ${t.metadata?.oerFields?.kind||""} ${ue(t.metadata?.oerFields?.authors).map(r=>r.name).join(" ")}`.toLowerCase().includes(e)).sort((t,r)=>t.title.localeCompare(r.title))}get _newParts(){const e=this._form;return{authors:e.authors.split(/;|\band\b|,(?=\s*[A-Z][a-z]+\s+[A-Z])/).map(t=>t.trim()).filter(Boolean),year:e.year.trim(),title:e.title.trim(),container:e.container.trim(),url:e.url.trim(),publisher:e.publisher.trim()}}get _resourceExtras(){return{kind:this._form.kind.trim(),description:this._form.description.trim()}}get _kinds(){return ct(this._allResources,"oer:resource","kind",["reference"])}get _canCite(){return this._tab==="new"&&this._linkTarget?!!this._form.title.trim():this._tab==="new"?!!(this._free.trim()||this._form.title.trim()||this._form.url.trim()):!!this._chosen}_cite(){if(!this._canCite)return;if(this._linkTarget&&this._tab==="new"){const t=this._newParts;return this._finish({linkReference:this._linkTarget,data:t,resourceExtras:this._resourceExtras,saveAsResource:!0})}if(this._tab==="page")return this._finish({id:this._chosen});if(this._tab==="resources"){const t=this._resources.find(r=>r.id===this._chosen)||(_(y.manifest?.items)||[]).find(r=>r.id===this._chosen);return this._finish({html:mt(Or(t)),resource:t.id})}if(this._free.trim())return this._finish({html:Lr(this._free.trim())});const e=this._newParts;return this._finish({html:mt(e),data:e,resourceExtras:this._resourceExtras,saveAsResource:this._save&&!!e.title})}static get styles(){return b`
      :host {
        position: fixed;
        inset: 0;
        z-index: 10002;
        display: none;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
      }
      :host([open]) {
        display: grid;
        place-items: center;
      }
      .backdrop {
        position: absolute;
        inset: 0;
        background: rgb(0 0 0 / 0.5);
      }
      .dialog {
        position: relative;
        display: flex;
        flex-direction: column;
        width: min(36rem, calc(100vw - 2rem));
        max-height: min(40rem, calc(100dvh - 2rem));
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
        overflow: hidden;
      }
      button,
      input,
      textarea {
        font: inherit;
        color: inherit;
      }
      :focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .lucide {
        flex: none;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem 0.75rem 0.75rem 1.25rem;
      }
      h2 {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
      }
      .x {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md);
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .x:hover {
        background: var(--accent);
      }
      .tabs {
        display: flex;
        gap: 0.25rem;
        margin: 0 1.25rem;
        padding: 0.1875rem;
        border-radius: var(--radius-md);
        background: var(--muted);
      }
      .tabs button {
        all: unset;
        flex: 1;
        padding: 0.375rem 0.5rem;
        border-radius: calc(var(--radius-md) - 2px);
        font-size: 0.8125rem;
        font-weight: 500;
        text-align: center;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .tabs button[aria-selected="true"] {
        background: var(--background);
        color: var(--foreground);
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.08);
      }
      .tabs button:focus-visible {
        outline: 2px solid var(--ring);
      }
      .body {
        flex: 1;
        overflow-y: auto;
        padding: 1rem 1.25rem;
      }
      .search {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 2.25rem;
        margin-bottom: 0.75rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        color: var(--muted-foreground);
      }
      .search:focus-within {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .search input {
        flex: 1;
        min-width: 0;
        border: 0;
        outline: 0;
        background: transparent;
        font-size: 0.875rem;
        color: var(--foreground);
      }
      .options {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }
      .option {
        display: flex;
        gap: 0.625rem;
        align-items: flex-start;
        padding: 0.625rem 0.75rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        line-height: 1.5;
        cursor: pointer;
      }
      .option:hover {
        background: var(--accent);
      }
      .option:has(input:checked) {
        border-color: var(--primary);
        box-shadow: inset 0 0 0 1px var(--primary);
      }
      .option input {
        margin: 0.25rem 0 0;
        accent-color: var(--primary);
      }
      .option small {
        display: block;
        color: var(--muted-foreground);
        font-size: 0.75rem;
      }
      .option a {
        color: var(--link);
        pointer-events: none;
      }
      .ref-actions,
      .res {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        margin-top: 0.375rem;
      }
      .res {
        align-items: center;
        color: var(--muted-foreground);
        font-size: 0.75rem;
      }
      .mini {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        height: 1.625rem;
        padding: 0 0.5rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        font-size: 0.75rem;
        font-weight: 500;
        cursor: pointer;
      }
      .mini:hover {
        background: var(--accent);
      }
      .mini:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .notice {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        margin: 0 0 0.875rem;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-md);
        background: color-mix(in srgb, var(--muted) 60%, transparent);
        font-size: 0.8125rem;
        line-height: 1.5;
      }
      .notice.match {
        background: color-mix(in srgb, var(--primary) 9%, transparent);
      }
      .notice span {
        flex: 1;
      }
      textarea[hidden] {
        display: none;
      }
      .empty {
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      .grid {
        display: grid;
        grid-template-columns: 1fr 6rem;
        gap: 0.625rem 0.75rem;
      }
      .full {
        grid-column: 1 / -1;
      }
      label {
        display: block;
        margin-bottom: 0.25rem;
        font-size: 0.8125rem;
        font-weight: 500;
      }
      .field input,
      .field select,
      textarea {
        box-sizing: border-box;
        width: 100%;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        font-size: 0.875rem;
      }
      textarea {
        height: auto;
        min-height: 4rem;
        padding: 0.5rem 0.75rem;
        resize: vertical;
      }
      .field small {
        display: block;
        margin-top: 0.25rem;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .resource-only {
        margin-top: 1rem;
        padding-top: 0.75rem;
        border-top: 1px solid var(--border);
      }
      .group {
        grid-column: 1 / -1;
        margin: 0;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--muted-foreground);
      }
      .hint {
        margin: 0.25rem 0 0;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .or {
        margin: 1rem 0 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--muted-foreground);
      }
      .preview {
        margin-top: 0.875rem;
        padding: 0.625rem 0.75rem;
        border-radius: var(--radius-md);
        background: color-mix(in srgb, var(--muted) 60%, transparent);
        font-size: 0.875rem;
        line-height: 1.5;
      }
      .preview a {
        color: var(--link);
      }
      .check {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.75rem;
        font-size: 0.875rem;
        font-weight: 400;
      }
      .check input {
        accent-color: var(--primary);
      }
      footer {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border-top: 1px solid var(--border);
      }
      .btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2.25rem;
        padding: 0 1rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
      }
      .btn.outline {
        border: 1px solid var(--input-border, var(--border));
      }
      .btn.outline:hover {
        background: var(--accent);
      }
      .btn.primary {
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .btn[aria-disabled="true"] {
        opacity: 0.5;
        cursor: default;
      }
      .btn:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
    `}_option(e,t,r,i){return s`<label class="option">
      <input type="radio" name="cite" .checked="${this._chosen===e}" @change="${()=>this._chosen=e}" @dblclick="${()=>this._cite()}" />
      <span>${i??t}${r?s`<small>${r}</small>`:""}</span>
    </label>`}_addToResources(e){const t=e.parts||{};this._linkTarget=e.id,this._form={...Pr,authors:(t.authors||[]).join("; "),year:String(t.year||""),title:t.title||e.linkText||e.text.slice(0,120),container:t.container||"",url:t.url||e.url,publisher:t.publisher||""},this._free="",this._tab="new",this.updateComplete.then(()=>this.shadowRoot.getElementById("c-title")?.focus())}_renderPage(){const e=this._references||[];if(!e.length)return s`<p class="empty">This page has no references yet.</p>`;const t=this._allResources;return s`<div class="options" role="radiogroup" aria-label="References on this page">
      ${e.map((r,i)=>{const o=globalThis.document.createElement("span");o.innerHTML=r.html;const n=r.resource&&t.find(c=>c.id===r.resource),l=!n&&qr(t,{url:r.url,title:r.linkText}),d=n?s`<small class="res">${De("editor:attach-file","sm")}In Resources: ${n.title}</small>`:s`<span class="ref-actions">
              ${l?s`<button class="mini" @click="${c=>(c.preventDefault(),this._finish({linkReference:r.id,resource:l.id}))}">
                    ${De("icons:link","sm")}Link to “${l.title}” in Resources
                  </button>`:s`<button class="mini" @click="${c=>(c.preventDefault(),this._addToResources(r))}">${De("oer:plus","sm")}Add to Resources</button>`}
            </span>`;return this._option(r.id,"","",s`<b>${i+1}.</b> ${o}${d}`)})}
    </div>`}_renderResources(){const e=this._resources;return s`<label class="search">
        ${De("icons:search")}
        <input type="search" placeholder="Search resources" aria-label="Search resources" .value="${this._query}" @input="${t=>this._query=t.target.value}" />
      </label>
      ${e.length?s`<div class="options" role="radiogroup" aria-label="Resources">
            ${e.map(t=>{const r=t.metadata?.oerFields||{},i=[r.kind,ue(r.authors).map(o=>o.name).join(", "),r.date,r.url].filter(Boolean).join(" \xB7 ");return this._option(t.id,t.title,i)})}
          </div>`:s`<p class="empty">${this._query?"No resources match.":"No resources yet. Add a new source and save it to Resources."}</p>`}`}_renderNew(){const e=this._form,t=c=>p=>this._form={...this._form,[c]:p.target.value},r=this._free.trim()?Lr(this._free.trim()):mt(this._newParts),i=globalThis.document.createElement("div");i.innerHTML=r;const o=(this._free.match(/https?:\/\/\S+/)||[])[0]||"",n=qr(this._allResources,this._free.trim()?{url:o}:{url:e.url,title:e.title}),l=this._linkTarget&&(this._references||[]).findIndex(c=>c.id===this._linkTarget)+1,d=!this._free.trim()&&(this._linkTarget||this._save);return s`${l?s`<p class="notice">Adding reference ${l} to Resources. The page's reference keeps its wording and links to the new Resource page.
            <button class="mini" @click="${()=>(this._linkTarget=null,this._tab="page")}">Back</button></p>`:""}
      ${n?s`<p class="notice match">
            ${De("editor:attach-file","sm")}<span>Already in Resources: <b>${n.title}</b></span>
            <button
              class="mini"
              @click="${()=>this._linkTarget?this._finish({linkReference:this._linkTarget,resource:n.id}):this._finish({html:mt(Or(n)),resource:n.id})}"
            >
              ${this._linkTarget?"Link to it instead":"Cite it instead"}
            </button>
          </p>`:""}
      <div class="grid">
        <div class="field full"><label for="c-title">Title</label><input id="c-title" .value="${e.title}" @input="${t("title")}" /></div>
        <div class="field">
          <label for="c-authors">Authors</label
          ><input id="c-authors" .value="${e.authors}" @input="${t("authors")}" aria-describedby="c-authors-help" placeholder="e.g. William McDonough; Michael Braungart" />
          <small id="c-authors-help">Separate authors with a semicolon.</small>
        </div>
        <div class="field"><label for="c-year">Year</label><input id="c-year" .value="${e.year}" @input="${t("year")}" inputmode="numeric" /></div>
        <div class="field full"><label for="c-url">Link</label><input id="c-url" type="url" .value="${e.url}" @input="${t("url")}" placeholder="https://" /></div>
        <div class="field full">
          <label for="c-container">Published in</label
          ><input id="c-container" .value="${e.container}" @input="${t("container")}" aria-describedby="c-container-help" placeholder="e.g. Policy Sciences" />
          <small id="c-container-help">The journal, magazine, book or site it appeared in, if any.</small>
        </div>
        <div class="field full"><label for="c-pub">Publisher</label><input id="c-pub" .value="${e.publisher}" @input="${t("publisher")}" /></div>
      </div>
      ${d?s`<div class="grid resource-only">
            <p class="group">For the Resource page</p>
            <div class="field">
              <label for="c-kind">Kind</label
              ><oer-choice-field
                field-id="c-kind"
                new-label="New kind…"
                .options="${this._kinds}"
                .value="${e.kind}"
                @value-changed="${c=>this._form={...this._form,kind:c.detail.value}}"
              ></oer-choice-field>
            </div>
            <div class="field full">
              <label for="c-desc">Description</label
              ><textarea id="c-desc" rows="2" .value="${e.description}" @input="${t("description")}" placeholder="Optional: what it is and why it's useful"></textarea>
            </div>
          </div>`:""}
      ${this._linkTarget?"":s`<p class="or">Or write it yourself</p>`}
      <textarea ?hidden="${!!this._linkTarget}" aria-label="Citation text" .value="${this._free}" @input="${c=>this._free=c.target.value}" placeholder="Rittel, Horst. “Dilemmas in a General Theory of Planning.” Policy Sciences, 1973: 155–169."></textarea>
      ${r?s`<div class="preview" aria-live="polite">${i}</div>`:""}
      ${!this._free.trim()&&!this._linkTarget?s`<label class="check"
            ><input type="checkbox" .checked="${this._save}" @change="${c=>this._save=c.target.checked}" />Also add it to Resources, so other pages can cite it</label
          >`:""}`}render(){if(!this.open)return s``;const e=this._tab==="page"?this._renderPage():this._tab==="resources"?this._renderResources():this._renderNew();return s`
      <div class="backdrop" @click="${()=>this._finish(null)}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <h2 id="t">${De("oer:quote")}Cite a source</h2>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${()=>this._finish(null)}">${De("oer:x")}</button>
        </header>
        <div class="tabs" role="tablist" aria-label="Source">
          ${Va.map(t=>s`<button
              role="tab"
              aria-selected="${this._tab===t.id?"true":"false"}"
              @click="${()=>{this._tab=t.id,this._chosen=null}}"
            >
              ${t.label}${t.id==="page"&&this._references?.length?` (${this._references.length})`:""}
            </button>`)}
        </div>
        <div class="body" role="tabpanel">${e}</div>
        <footer>
          <button class="btn outline" @click="${()=>this._finish(null)}">Cancel</button>
          <button class="btn primary" aria-disabled="${this._canCite?"false":"true"}" @click="${this._cite}">
            ${this._linkTarget&&this._tab==="new"?"Add to Resources":"Cite"}
          </button>
        </footer>
      </div>
    `}};customElements.define(bt.tag,bt);function Ka(){const a=globalThis.document;return a.querySelector(bt.tag)||a.body.appendChild(a.createElement(bt.tag))}const ie={sep:!0};function u2(a,e=[]){if(!a)return e;for(const t of a.querySelectorAll("*"))e.push(t),t.shadowRoot&&u2(t.shadowRoot,e);return e}function Wa(a){if(!a)return null;if(a.localName==="button")return a;const e=[a.shadowRoot];for(;e.length;){const t=e.shift();if(!t)continue;const r=t.querySelector("button");if(r)return r;for(const i of t.querySelectorAll("*"))e.push(i.shadowRoot)}return null}const Hr=a=>a&&!a.hidden&&getComputedStyle(a).display!=="none",pe=a=>e=>e.find(t=>t.getAttribute?.("event-name")===a),I=(a,e)=>t=>t.find(r=>r.command===a&&(!e||r.label===e)),Ya=[{label:"Move up",icon:"arrow-up",find:pe("hax-plate-up")},{label:"Move down",icon:"arrow-down",find:pe("hax-plate-down")},ie,{label:"Insert block above\u2026",icon:"arrow-up-to-line",find:pe("insert-above-active"),insert:"above"},{label:"Insert block below\u2026",icon:"arrow-down-to-line",find:pe("insert-below-active"),insert:"below"},{label:"Duplicate",icon:"copy",find:pe("hax-plate-duplicate")},ie,{label:"Add column",icon:"columns-2",find:pe("hax-plate-create-right")},{label:"Remove column",icon:"panel-right-close",find:pe("hax-plate-remove-right")},ie,{label:"Edit HTML",icon:"code",find:pe("hax-source-view-toggle")},{label:a=>a.label||"Lock",icon:a=>a.icon==="icons:lock"?"lock":"lock-open",find:a=>a.find(e=>e.localName==="hax-context-item"&&/lock/.test(e.icon||""))},ie,{label:"Remove block",icon:"trash-2",danger:!0,find:pe("hax-plate-delete")}],Ga={p:"pilcrow",h2:"heading-2",h3:"heading-3",h4:"heading-4",h5:"heading-5",h6:"heading-6",blockquote:"quote",pre:"square-code"},Ja={pre:"Code block",blockquote:"Quote"},Xa=[{picker:"hax-text-editor-heading-picker",icons:Ga,labels:Ja,checked:"tag"},ie,{label:"Bulleted list",icon:"list",find:I("ul")},{label:"Numbered list",icon:"list-ordered",find:I("ol")},{label:"Indent",icon:"indent-increase",find:I("indent"),shortcut:`${ee}]`,needs:"In lists"},{label:"Outdent",icon:"indent-decrease",find:I("outdent"),shortcut:`${ee}[`,needs:"In lists"},ie,{picker:"hax-text-editor-alignment-picker",icons:{"":"align-left",center:"align-center",right:"align-right"},labels:{"":"Align left",center:"Align center",right:"Align right"},checked:"align"}],Za=[{label:"Bold",icon:"bold",find:I("bold"),shortcut:`${ee}B`,toggle:!0},{label:"Italic",icon:"italic",find:I("italic"),shortcut:`${ee}I`,toggle:!0},{label:"Underline",icon:"underline",find:I("underline"),shortcut:`${ee}U`,toggle:!0,selection:!0},{label:"Strikethrough",icon:"strikethrough",find:I("strikeThrough"),toggle:!0,selection:!0},{label:"Highlight",icon:"highlighter",find:I("wrapRange","Highlight"),toggle:!0,selection:!0},{label:"Inline code",icon:"code",find:I("wrapRange","Code"),toggle:!0,selection:!0},{label:"Subscript",icon:"subscript",find:I("subscript"),toggle:!0},{label:"Superscript",icon:"superscript",find:I("superscript"),toggle:!0},{label:"Abbreviation",icon:"whole-word",find:I("wrapRange","Abbreviation"),selection:!0},ie,{label:"Link",icon:"link",find:I("createLink"),shortcut:`${ee}K`},{label:"Remove link",icon:"unlink",find:I("unlink")},ie,{label:"Clear formatting",icon:"remove-formatting",find:I("removeFormat")}],Qa=[{label:"Citation\u2026",icon:"quote",action:"cite"},ie,{label:"Symbol\u2026",icon:"omega",grid:"rich-text-editor-symbol-picker"},{label:"Emoji\u2026",icon:"smile",grid:"rich-text-editor-emoji-picker",filter:!0},ie,{label:"Math",icon:"sigma",find:I("insertHTML","Math")},{label:"Vocabulary",icon:"book-a",find:I("insertHTML","Vocab"),selection:!0},{label:"Inline audio",icon:"audio-lines",find:I("insertHTML","Inline audio"),selection:!0},{label:"Sarcasm",icon:"message-square-quote",find:I("insertHTML","Sarcasm"),selection:!0}],en=[{id:"block",label:"Block",icon:"box",source:"plate",items:Ya},{id:"text",label:"Text",icon:"pilcrow",source:"text",items:Xa},{id:"format",label:"Format",icon:"type",source:"text",items:Za},{id:"insert",label:"Insert inline",icon:"smile-plus",source:"text",items:Qa}],wt=a=>s`<span
    class="icon"
    aria-hidden="true"
    style="--src:url(&quot;${S[`oer:${a}`]||""}&quot;)"
  ></span>`,Nr=globalThis.document.createElement("textarea"),tn=a=>(Nr.innerHTML=a,Nr.value);class Ur extends M{static get tag(){return"oer-block-rail"}static get properties(){return{_cats:{state:!0},_open:{state:!0},_grid:{state:!0},_query:{state:!0}}}constructor(){super(),this._cats=[],this._open=null,this._grid=null,this._query="",this.__tick=this._tick.bind(this),this.__keys=this._globalKeys.bind(this),this.__outside=e=>{this._open&&!e.composedPath().includes(this)&&this._close()}}connectedCallback(){super.connectedCallback(),this.hidden=!0,this.__raf=requestAnimationFrame(this.__tick),globalThis.addEventListener("keydown",this.__keys,!0),globalThis.addEventListener("pointerdown",this.__outside,!0)}disconnectedCallback(){cancelAnimationFrame(this.__raf),globalThis.removeEventListener("keydown",this.__keys,!0),globalThis.removeEventListener("pointerdown",this.__outside,!0),super.disconnectedCallback()}get _hax(){return globalThis.HaxStore?.requestAvailability?.()}_stock(){const e=this._hax?.activeHaxBody?.shadowRoot,t=e?.querySelector("hax-plate-context"),r=e?.querySelector("hax-text-editor-toolbar");return{plate:t,text:Hr(r)?r:null}}_tick(){this.__raf=requestAnimationFrame(this.__tick);const e=T.editMode?this._hax?.activeNode:null;if(!e||!e.isConnected||e.localName==="page-break"){this.hidden||this._hide();return}const t=e.getBoundingClientRect(),r=this._stock(),i=`${e.localName}|${!!r.plate}|${!!r.text}`;(e!==this.__node||i!==this.__key)&&(e!==this.__node&&this._close(),this.__node=e,this.__key=i,this._cats=en.filter(u=>r[u.source]));const o=this.shadowRoot?.querySelector(".rail"),n=o?.offsetHeight||0,l=it(),d=l.top+8,c=_r(e);let p=c.top;if(p<d&&(p=Math.max(Math.min(d,c.bottom-n),c.top)),(c.bottom<d||c.top>l.bottom||t.width===0)&&!this._open){this.hidden=!0;return}this.hidden=!1;const h=this._hax?.activeHaxBody?.getBoundingClientRect().left??c.left,m=Math.min(c.left,h-4-6),v=Math.round(m-ut-8-(o?.offsetWidth||42));this.style.transform=`translate(${v}px, ${Math.round(p)}px)`}_hide(){this._close(),this.hidden=!0,this.__node=null}_items(e){const t=this._stock()[e.source];if(!t)return[];const r=[t,...u2(t),...u2(t.shadowRoot)],i=[];for(const o of e.items){if(o.sep){i.length&&!i[i.length-1].sep&&i.push(ie);continue}if(o.picker){const c=r.find(h=>h.localName===o.picker);if(!c)continue;const p=this._pickerCurrent(o);for(const h of(c.options||[]).flat())!h||h.value===null||h.value===void 0||i.push({label:o.labels?.[h.value]||h.alt,icon:o.icons?.[h.value]||"pilcrow",checked:p===h.value,run:()=>c._pickerChange?.({detail:{value:h.value}})});continue}if(o.action==="cite"){i.push({label:o.label,icon:o.icon,run:()=>this._cite()});continue}if(o.grid){const c=r.find(p=>p.localName===o.grid);if(!c)continue;i.push({label:o.label,icon:o.icon,submenu:!0,run:()=>this._openGrid(o,c)});continue}const n=o.find(r);if(!n)continue;const l=Hr(n),d=o.needs||(o.selection?"Select text":"");!l&&!d||i.push({label:typeof o.label=="function"?o.label(n):o.label,icon:typeof o.icon=="function"?o.icon(n):o.icon,shortcut:o.shortcut,danger:o.danger,disabled:!l,hint:l?"":d,pressed:o.toggle&&l?!!n.toggled:void 0,run:o.insert?()=>globalThis.document.querySelector("oer-block-inserter")?.openFor(this._hax.activeNode,o.insert):()=>Wa(n)?.click()})}for(;i.length&&i[i.length-1].sep;)i.pop();return i}_pickerCurrent(e){const t=this._hax?.activeNode;if(t){if(e.checked==="tag")return t.localName;if(e.checked==="align"){const r=t.style?.textAlign||"";return r==="left"?"":r}}}_toggle(e,t){if(this._open?.id===e.id&&!this._grid){this._close();return}this._grid=null,this._query="",this._open={...e,items:this._items(e),y:t?.currentTarget?.offsetTop??0}}_close(e=!1){const t=this._open?.id;this._open=null,this._grid=null,this._query="",e&&t&&this.updateComplete.then(()=>this.shadowRoot.querySelector(`[data-cat="${t}"]`)?.focus())}_openGrid(e,t){const r=(t.shadowRoot?.querySelector("simple-symbol-picker, simple-emoji-picker, simple-picker")?.options||[]).flat().filter(i=>i&&i.value);this._grid={label:e.label.replace("\u2026",""),filter:e.filter,options:r,el:t},this.updateComplete.then(()=>{this.shadowRoot.querySelector(".grid input, .grid button")?.focus()})}_run(e){if(!(e.disabled||e.sep)){if(e.submenu){e.run();return}e.run(),this._close()}}async _cite(){const e=this._hax,t=e?.activeHaxBody,r=e?.activeNode;if(!t||!r)return;let i=e.getRange?.();!i||!r.contains(i.startContainer)?(i=globalThis.document.createRange(),i.selectNodeContents(r),i.collapse(!1)):i=i.cloneRange();const o=await Ka().pick({references:Ea(t)});if(!o){r.focus?.();return}if(o.linkReference){r.focus?.(),o.resource?p2(t,o.linkReference,o.resource):this._saveResource(o.data,o.resourceExtras).then(l=>p2(t,o.linkReference,l));return}const n=Ma(t,i,o);r.focus?.(),o.saveAsResource&&this._saveResource(o.data,o.resourceExtras).then(l=>p2(t,n,l))}async _saveResource(e,{kind:t="",description:r=""}={}){const i=_(T.manifest?.items)||[],o=i.find(c=>c.metadata?.pageType==="oer:resource"&&c.title.toLowerCase()===e.title.toLowerCase()&&(c.metadata?.oerFields?.url||"")===(e.url||""));if(o)return o.id;const n=i.find(c=>!c.parent&&c.title==="Resources"&&c.metadata?.pageType==="oer:section"),l=i.filter(c=>c.parent===(n?.id||null));await se([{id:`new-resource-${Date.now()}`,title:e.title,parent:n?.id||null,order:l.length,indent:n?1:0,location:"",description:r,metadata:{pageType:"oer:resource",oerFields:{...e.url?{url:e.url}:{},...t?{kind:t}:{},...e.authors?.length?{authors:e.authors.map(c=>({name:c,url:""}))}:{},...e.year?{date:e.year}:{},...e.container?{container:e.container}:{},...e.publisher?{publisher:e.publisher}:{}}},contents:"<p></p>",new:!0}]);const d=()=>(_(T.manifest?.items)||[]).find(c=>c.metadata?.pageType==="oer:resource"&&c.title===e.title&&(c.metadata?.oerFields?.url||"")===(e.url||""))?.id||"";for(let c=0;c<15e3;c+=250){const p=d();if(p)return p;await new Promise(h=>setTimeout(h,250))}return""}_insertGlyph(e){this._grid.el._pickerChange?.({detail:{value:e.value}}),this._close()}_globalKeys(e){this.hidden||e.altKey&&e.key==="F10"&&(e.preventDefault(),e.stopPropagation(),this.shadowRoot.querySelector(".rail button")?.focus())}_railKeys(e){const t=[...this.shadowRoot.querySelectorAll(".rail button")],r=t.indexOf(this.shadowRoot.activeElement),i=o=>t[(r+o+t.length)%t.length]?.focus();if(e.key==="ArrowDown")i(1);else if(e.key==="ArrowUp")i(-1);else if(e.key==="Home")t[0]?.focus();else if(e.key==="End")t[t.length-1]?.focus();else if(e.key==="ArrowRight"){const o=this._cats[r];o&&this._open?.id!==o.id&&this._toggle(o,{currentTarget:t[r]}),this._focusMenu()}else if(e.key==="Escape")this._open?this._close():this._hax?.activeNode?.focus?.();else return;e.preventDefault()}_focusMenu(){this.updateComplete.then(()=>this.shadowRoot.querySelector(".menu [role^=menuitem]:not([aria-disabled=true])")?.focus())}_menuKeys(e){const t=[...this.shadowRoot.querySelectorAll(".menu [role^=menuitem]")],r=t.indexOf(this.shadowRoot.activeElement),i=o=>t[(r+o+t.length)%t.length]?.focus();if(e.key==="ArrowDown")i(1);else if(e.key==="ArrowUp")i(-1);else if(e.key==="Home")t[0]?.focus();else if(e.key==="End")t[t.length-1]?.focus();else if(e.key==="Escape"||e.key==="ArrowLeft")this._close(!0);else if(e.key==="Tab")this._close();else return;e.preventDefault()}_gridKeys(e){const t=[...this.shadowRoot.querySelectorAll(".cells button")],r=t.indexOf(this.shadowRoot.activeElement),i=8,o=n=>{e.preventDefault(),t[Math.max(0,Math.min(t.length-1,n))]?.focus()};e.key==="Escape"?(e.preventDefault(),this._grid=null,this._focusMenu()):r<0?e.key==="ArrowDown"&&o(0):e.key==="ArrowRight"?o(r+1):e.key==="ArrowLeft"?o(r-1):e.key==="ArrowDown"?o(r+i):e.key==="ArrowUp"&&(r<i?(e.preventDefault(),this.shadowRoot.querySelector(".grid input")?.focus()):o(r-i))}_keepSelection(e){e.target.closest?.("input")||e.preventDefault()}updated(){const e=this.shadowRoot.querySelector(".menu");if(!e)return;const t=e.getBoundingClientRect().bottom-(globalThis.innerHeight-8);t>0&&(e.style.top=`${Math.max(e.offsetTop-t,8-this.getBoundingClientRect().top)}px`)}static get styles(){return b`
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
    `}_renderItem(e){if(e.sep)return s`<div class="sep" role="separator"></div>`;const t=e.checked!==void 0?"menuitemradio":e.pressed!==void 0?"menuitemcheckbox":"menuitem",r=e.checked??e.pressed;return s`<button
      role="${t}"
      class="${e.danger?"danger":""}"
      tabindex="-1"
      aria-checked="${r===void 0?"":String(!!r)}"
      aria-disabled="${e.disabled?"true":"false"}"
      aria-haspopup="${e.submenu?"true":"false"}"
      @click="${()=>this._run(e)}"
    >
      ${wt(e.icon)}
      <span class="text">${e.label}</span>
      ${e.hint?s`<span class="end">${e.hint}</span>`:e.shortcut?s`<span class="end">${e.shortcut}</span>`:""}
      ${r?s`<span class="check">${wt("check")}</span>`:""}
      ${e.submenu?wt("chevron-right"):""}
    </button>`}_renderGrid(){const e=this._grid,t=this._query.trim().toLowerCase(),r=t?e.options.filter(i=>(i.description||"").toLowerCase().includes(t)):e.options;return s`<div class="menu grid" style="top:${this._open.y}px" role="dialog" aria-label="${e.label}" @keydown="${this._gridKeys}">
      <div class="label">${e.label}</div>
      ${e.filter?s`<input
            type="search"
            placeholder="Search ${e.label.toLowerCase()}…"
            aria-label="Search ${e.label.toLowerCase()}"
            .value="${this._query}"
            @input="${i=>this._query=i.target.value}"
          />`:""}
      <div class="cells" role="group" aria-label="${e.label}">
        ${r.map(i=>{const o=tn(i.value),n=i.description||o;return s`<button title="${n}" aria-label="${n}" @click="${()=>this._insertGlyph(i)}">${o}</button>`})}
      </div>
      ${r.length?"":s`<div class="empty">No matches</div>`}
    </div>`}render(){const e=this._open;return s`
      <div class="wrap" @mousedown="${this._keepSelection}">
        <div class="rail" role="toolbar" aria-label="Block tools" aria-orientation="vertical" @keydown="${this._railKeys}">
          ${this._cats.map((t,r)=>s`<button
              data-cat="${t.id}"
              tabindex="${r===0?0:-1}"
              title="${t.label}"
              aria-label="${t.label}"
              aria-haspopup="menu"
              aria-expanded="${e?.id===t.id?"true":"false"}"
              @click="${i=>this._toggle(t,i)}"
            >
              ${wt(t.icon)}
            </button>`)}
        </div>
        ${e&&this._grid?this._renderGrid():e?s`<div class="menu" role="menu" aria-label="${e.label}" style="top:${e.y}px" @keydown="${this._menuKeys}">
                <div class="label">${e.label}</div>
                ${e.items.map(t=>this._renderItem(t))}
              </div>`:""}
      </div>
    `}}customElements.define(Ur.tag,Ur);const xt=288,g2=288,Vr=a=>s`<span class="icon" aria-hidden="true" style="--src:url(&quot;${S[`oer:${a}`]||""}&quot;)"></span>`;let Kr=class extends M{static get tag(){return"oer-block-inserter"}static get properties(){return{_hover:{state:!0},_end:{state:!0},_open:{state:!0},_query:{state:!0},_active:{state:!0}}}constructor(){super(),this._hover=null,this._end=null,this._open=null,this._query="",this._active=0,this.__tick=this._tick.bind(this),this.__move=e=>{this.__pointer={x:e.clientX,y:e.clientY}},this.__outside=e=>{this._open&&!e.composedPath().includes(this)&&this.close()}}connectedCallback(){super.connectedCallback(),this.__raf=requestAnimationFrame(this.__tick),globalThis.addEventListener("pointermove",this.__move,{passive:!0}),globalThis.addEventListener("pointerdown",this.__outside,!0)}disconnectedCallback(){cancelAnimationFrame(this.__raf),globalThis.removeEventListener("pointermove",this.__move),globalThis.removeEventListener("pointerdown",this.__outside,!0),super.disconnectedCallback()}get _hax(){return globalThis.HaxStore?.requestAvailability?.()}_blocks(){const e=this._hax?.activeHaxBody;return e?[...e.children].filter(t=>t.localName!=="page-break"&&t.getClientRects().length):[]}_tick(){this.__raf=requestAnimationFrame(this.__tick);const e=T.editMode?this._hax?.activeHaxBody:null;if(!e||!e.isConnected){(this._hover||this._end||this._open)&&(this._hover=this._end=null,this.close());return}const t=e.getBoundingClientRect(),r=it(),i=c=>c>r.top+4&&c<r.bottom-4,o=this._blocks().map(c=>c.getBoundingClientRect()),n=o.length?o[o.length-1].bottom:t.top;let l={y:Math.round(n+8),left:Math.round(t.left),width:Math.round(t.width)};(!i(l.y)||!i(l.y+36))&&(l=null),!(l&&this._end&&this._end.y===l.y&&this._end.left===l.left&&this._end.width===l.width)&&(l||this._end)&&(this._end=l);let d=null;if(!globalThis.__oerDragging){const c=gt(e).filter(p=>!p.end);if(this._open)this._open.slot.end||(d=c.find(p=>m2(p,this._open.slot))||null);else if(this.__pointer){const p=Fr(c,this.__pointer.x,this.__pointer.y,{gutter:72});p&&i(p.top+p.height/2)&&(d=p)}}d&&(d={...d,top:Math.round(d.top),height:Math.round(d.height),left:Math.round(d.left),width:Math.round(d.width)}),!(d&&this._hover&&m2(d,this._hover)&&["top","height","left","width"].every(c=>d[c]===this._hover[c]))&&(d||this._hover)&&(this._hover=d)}openAt(e,t){this._query="",this._active=0,this._open={slot:e,x:t.x,y:t.y},this.updateComplete.then(()=>this.shadowRoot.querySelector(".panel input")?.focus())}_endSlot(){return gt(this._hax?.activeHaxBody).find(e=>e.end)}openFor(e,t){const r=gt(this._hax?.activeHaxBody).find(o=>t==="below"?o.after===e:o.before===e);if(!r)return;const i=e.getBoundingClientRect();this.openAt(r,{x:i.left+12,y:t==="below"?i.bottom:i.top})}close(){this._open&&(this._open=null)}_gizmos(){const e=this._hax,t=e?.haxTray?.shadowRoot?.querySelector("hax-gizmo-browser"),r=h=>t?._gizmoAllowedInTray?t._gizmoAllowedInTray(h):!!h?.tag,i=(e?.gizmoList||[]).filter(r),o=e?.platformAllows?.("blockTemplates")===!1?[]:(e?.staxList||[]).filter(h=>h?.stax?.length).map(h=>({stax:h.stax,title:h.details?.title||"Template",description:h.details?.description||"",image:h.details?.image||"",icon:h.details?.icon||"hax:templates",tags:h.details?.tags||[]})),n=this._query.trim().toLowerCase();if(n){const h=m=>[m.title,m.tag,m.description,...m.tags||[]].join(" ").toLowerCase().includes(n);return[{label:"Blocks",items:i.filter(h)},{label:"Templates",items:o.filter(h)}].filter(m=>m.items.length)}const l=[],d=(t?.recentGizmoList||[]).filter(r).slice().reverse();d.length&&l.push({label:"Recent",items:d});const c=(t?.popularGizmoList||[]).filter(r);c.length&&l.push({label:"Popular",items:c});const p=t?.updateCategories?t.updateCategories(i):[];for(const h of p){const m=i.filter(v=>(v.tags?.[0]||"Other")===h).sort((v,u)=>v.title.localeCompare(u.title));m.length&&l.push({label:h,items:m})}return o.length&&l.push({label:"Templates",items:o}),l}async _insert(e){const t=this._hax;if(!t?.activeHaxBody||!e||!this._open)return;const r=this._open.slot;this.close();let i=null;if(e.stax){let o=r;for(const n of e.stax){const l=await Mr(t,o,n);if(!l)break;i=i||l,o={...r,after:l,before:null}}}else{const o=t.haxSchemaFromTag(e.tag),n=o?.demoSchema?.[0]||t.haxElementPrototype({tag:e.tag},{},"");t.recentGizmoList?.push?.(o?.gizmo||e),i=await Mr(t,r,n)}i&&(t.activeNode=i,i.focus?.(),i.scrollIntoView?.({block:"nearest"}))}_flat(){return this._gizmos().flatMap(e=>e.items)}_panelKeys(e){const t=this._flat();if(e.key==="ArrowDown")this._active=Math.min(this._active+1,t.length-1);else if(e.key==="ArrowUp")this._active=Math.max(this._active-1,0);else if(e.key==="Home"&&e.target.localName!=="input")this._active=0;else if(e.key==="End"&&e.target.localName!=="input")this._active=t.length-1;else if(e.key==="Enter")this._insert(t[this._active]);else if(e.key==="Escape")this.close();else return;e.preventDefault(),this.updateComplete.then(()=>this.shadowRoot.querySelector(`[data-i="${this._active}"]`)?.scrollIntoView({block:"nearest"}))}static get styles(){return b`
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
        width: ${xt}px;
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
        width: ${g2}px;
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
    `}_renderPanel(){const e=this._open,t=this._gizmos(),r=t.flatMap(p=>p.items),i=r[Math.min(this._active,r.length-1)],o=globalThis.innerWidth,n=Math.max(8,Math.min(e.x+16,o-xt-8)),l=Math.max(8,e.y-20),d=n+xt+8+g2<=o-8?n+xt+8:n-g2-8;let c=-1;return s`
      <div class="panel" style="left:${n}px;top:${l}px" @keydown="${this._panelKeys}">
        <div class="search">
          <simple-icon-lite icon="icons:search"></simple-icon-lite>
          <input
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="blocks"
            aria-activedescendant="${i?`b${this._active}`:""}"
            aria-label="Search blocks"
            placeholder="Search blocks…"
            .value="${this._query}"
            @input="${p=>{this._query=p.target.value,this._active=0}}"
          />
        </div>
        <div class="list" id="blocks" role="listbox" aria-label="Blocks">
          ${r.length?t.map(p=>s`<div class="group" role="group" aria-label="${p.label}">
                  <div class="heading" aria-hidden="true">${p.label}</div>
                  ${p.items.map(h=>{c+=1;const m=c;return s`<button
                      id="b${m}"
                      data-i="${m}"
                      role="option"
                      tabindex="-1"
                      aria-selected="${m===this._active?"true":"false"}"
                      @mouseenter="${()=>this._active=m}"
                      @mousedown="${v=>v.preventDefault()}"
                      @click="${()=>this._insert(h)}"
                    >
                      <simple-icon-lite icon="${h.icon||"hax:add-brick"}"></simple-icon-lite>
                      <span>${h.title}</span>
                    </button>`})}
                </div>`):s`<div class="empty">No blocks found</div>`}
        </div>
      </div>
      ${i?s`<div class="preview" style="left:${d}px;top:${l}px" aria-hidden="true">
            ${i.stax?this._renderTemplatePreview(i):s`<hax-element-demo
              .renderTag="${i.tag}"
              .gizmoTitle="${i.title}"
              .gizmoIcon="${i.icon}"
              .gizmoDescription="${i.description||""}"
            ></hax-element-demo>`}
          </div>`:""}
    `}_renderTemplatePreview(e){const t=this._hax,r=e.stax.map(i=>t?.haxSchemaFromTag(i.tag)?.gizmo?.title||i.tag);return s`<div class="tpl">
      ${e.image?s`<img src="${e.image}" alt="" />`:s`<ol>${r.map(i=>s`<li>${i}</li>`)}</ol>`}
      <div class="tpl-info">
        <div class="tpl-title">${e.title}</div>
        <div class="tpl-desc">${e.description||`${r.length} block${r.length===1?"":"s"}`}</div>
      </div>
    </div>`}updated(){const e=globalThis.innerHeight;for(const t of this.shadowRoot.querySelectorAll(".panel, .preview")){const r=t.getBoundingClientRect();r.bottom>e-8&&(t.style.top=`${Math.max(8,r.top-(r.bottom-(e-8)))}px`)}}render(){const e=this._hover,t=this._end;return s`
      ${e?s`<button
            class="slot ${this._open?"chosen":""}"
            style="left:${e.left}px;top:${e.top}px;width:${e.width}px;height:${e.height}px"
            tabindex="-1"
            title="Insert block here"
            aria-label="Insert block here"
            @click="${()=>this.openAt(e,{x:e.left,y:e.top+e.height/2})}"
          >
            <span class="plus">${Vr("plus")}</span>
          </button>`:""}
      ${t?s`<button
            class="end ${this._open?.slot.end?"chosen":""}"
            style="left:${t.left}px;top:${t.y}px;width:${t.width}px"
            aria-haspopup="listbox"
            @click="${()=>{const r=this._endSlot();r&&this.openAt(r,{x:t.left,y:t.y})}}"
          >
            ${Vr("plus")} Add block
          </button>`:""}
      ${this._open?this._renderPanel():""}
    `}};customElements.define(Kr.tag,Kr);let Wr=!1;function rn(){Wr||(Wr=!0,yo(),Co(),Mo(),Yt(To),Vo(),Wo(),Yo(),xa(),za(),new MutationObserver(Yr).observe(globalThis.document.body,{childList:!0}),Yr())}function Yr(){const a=globalThis.document,e=a.querySelector("haxcms-site-editor-ui");if(e){if(!e.hasAttribute("data-oer-hidden")){e.setAttribute("data-oer-hidden",""),e.setAttribute("aria-hidden","true"),e.inert=!0;for(const[t,r]of[["height","0"],["min-height","0"],["overflow","hidden"],["opacity","0"],["pointer-events","none"]])e.style.setProperty(t,r,"important")}for(const t of["oer-block-frame","oer-block-rail","oer-block-inserter"])a.querySelector(t)||a.body.append(a.createElement(t))}else a.querySelector("oer-block-frame")?.remove(),a.querySelector("oer-block-rail")?.remove(),a.querySelector("oer-block-inserter")?.remove()}const Gr={sm:560,md:720,lg:960,xl:1200};let Jr=!1;function on(){Jr||(Jr=!0,globalThis.addEventListener("responsive-element",a=>{a.detail?.element?.localName==="grid-plate"&&Object.assign(a.detail,Gr)},{capture:!0}),customElements.whenDefined("grid-plate").then(()=>{for(const a of globalThis.document.querySelectorAll("grid-plate"))a.hasUpdated&&globalThis.dispatchEvent(new CustomEvent("responsive-element",{detail:{element:a,attribute:"responsive-size",relativeToParent:!1,...Gr}}))}))}const Xr="oer-site-nav-open",Zr=a=>s`<span class="lucide" aria-hidden="true" style="--src:url(&quot;${S[a]||""}&quot;)"></span>`;function an(){try{return new Set(JSON.parse(globalThis.localStorage.getItem(Xr)||"[]"))}catch{return new Set}}let Qr=class extends M{static get tag(){return"oer-site-nav"}static get properties(){return{editable:{type:Boolean,reflect:!0},root:{type:String},filter:{type:String},_items:{state:!0},_activeId:{state:!0},_open:{state:!0},_adding:{state:!0},_addType:{state:!0}}}constructor(){super(),this.editable=!1,this._items=[],this._activeId=null,this._open=an(),this._adding=null,this.__disposers=[]}connectedCallback(){super.connectedCallback(),this.__disposers.push(R(()=>{const e=!!y.isLoggedIn,t=(_(y.manifest?.items)||[]).filter(i=>e||i.metadata?.published!==!1),r=_(y.activeId);Promise.resolve().then(()=>{if(this._all=t,this._items=t.filter(i=>!i.metadata?.hideInMenu||ve(i)),r!==this._activeId){this._activeId=r;const i=new Set(this._open);for(const o of Q2(t,r))i.add(o);this._setOpen(i)}})}))}disconnectedCallback(){for(const e of this.__disposers)e?.();this.__disposers=[],super.disconnectedCallback()}_setOpen(e){this._open=e;try{globalThis.localStorage.setItem(Xr,JSON.stringify([...e]))}catch{}}_toggle(e){const t=new Set(this._open);t.has(e)?t.delete(e):t.add(e),this._setOpen(t)}_choices(e){const t=this._all||[],r=e?t.find(l=>l.id===e)?.metadata?.pageType:null,i=or(r||null,t),o=r&&B(t).types.find(l=>l.id===r),n=!!o&&Array.isArray(o.children);return{types:i,untyped:!n}}_startAdd(e){const{types:t,untyped:r}=this._choices(e);this._addType=r?"":t[0]?.id||"",this._adding=e??"root",this.updateComplete.then(()=>this.shadowRoot.querySelector(".add-input")?.focus())}_addKeys(e,t){if(e.key==="Enter"){e.preventDefault();const r=(this.shadowRoot.querySelector(".add-input")?.value||"").trim();if(!r){this.shadowRoot.querySelector(".add-input")?.focus();return}this._adding=null,r&&Jo(r,t,this._addType)}else e.key==="Escape"&&(e.preventDefault(),this._adding=null,this.updateComplete.then(()=>this.shadowRoot.querySelector(`[data-add="${t??"root"}"]`)?.focus()))}static get styles(){return b`
      :host {
        display: block;
        font-family: var(--font-sans, system-ui, sans-serif);
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
      }
      /* shadcn SidebarMenuSub: rule on the left (mx-3.5 px-2.5) */
      ul ul {
        margin: 0.125rem 0 0.25rem 0.875rem;
        padding-left: 0.625rem;
        border-left: 1px solid color-mix(in oklch, var(--foreground) 22%, transparent);
      }
      .row {
        position: relative;
        display: flex;
        align-items: center;
      }
      a,
      .add,
      .add-field {
        box-sizing: border-box;
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 2rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: var(--muted-foreground);
        text-decoration: none;
      }
      ul ul a,
      ul ul .add,
      ul ul .add-field {
        height: 1.75rem;
      }
      .has-kids > .row > a {
        padding-right: 2rem;
      }
      a:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      a[aria-current="page"],
      a[aria-current="location"] {
        background: var(--accent);
        color: var(--foreground);
        font-weight: 500;
      }
      a.draft .title::after {
        content: " · Draft";
        font-weight: 400;
        color: var(--muted-foreground);
      }
      a:focus-visible,
      button:focus-visible,
      input:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: -2px;
      }
      .title {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      simple-icon-lite,
      .no-icon {
        flex: none;
        width: 1rem;
        height: 1rem;
        --simple-icon-height: 1rem;
        --simple-icon-width: 1rem;
        color: var(--muted-foreground);
      }
      .chev {
        all: unset;
        position: absolute;
        right: 0.25rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: var(--radius-sm);
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .chev:hover {
        background: color-mix(in oklch, var(--foreground) 8%, transparent);
        color: var(--foreground);
      }
      .chev .lucide {
        transform: rotate(-90deg);
      }
      .chev[aria-expanded="true"] .lucide {
        transform: none;
      }
      .lucide {
        flex: none;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      /* "Add page" rows */
      .add {
        all: unset;
        box-sizing: border-box;
        flex: 1;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 2rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-md);
        font-size: 0.8125rem;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      ul ul .add {
        height: 1.75rem;
      }
      .add:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      /* outline headings: a label over the pages after them */
      li.heading {
        list-style: none;
      }
      /* group label, after the Decap sidebar's: small, uppercase, tracked.
         Full muted colour (Decap's 60% opacity fails AA at this size) */
      li.heading:not(:first-child) {
        margin-top: 1rem;
      }
      .group-label {
        display: flex;
        align-items: center;
        min-height: 1.5rem;
        padding: 0 0.5rem;
        font-size: 0.6875rem;
        font-weight: 500;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--muted-foreground);
      }
      /* a heading inside a page's sub-pages: closer to its pages, no extra
         gap above when it opens the list, sentence case at a lower weight
         than the top-level labels */
      li.heading.nested {
        margin-top: 0.5rem;
      }
      li.heading.nested:first-child {
        margin-top: 0.125rem;
      }
      li.heading.nested .group-label {
        min-height: 1.375rem;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0;
        text-transform: none;
      }

      /* icons off: the Decap sidebar's hierarchy, with text alone doing the
         work. Roomier rows, medium-weight top level, regular sub-pages,
         wider gaps between groups */
      :host([no-icons]) ul {
        gap: 0.25rem;
      }
      :host([no-icons]) a,
      :host([no-icons]) .add {
        height: auto;
        min-height: 2.25rem;
        padding: 0.5rem 0.75rem;
      }
      :host([no-icons]) > ul > li > .row > a {
        font-weight: 500;
      }
      :host([no-icons]) ul ul {
        margin: 0.125rem 0 0.25rem 1rem;
        padding-left: 0.5rem;
      }
      :host([no-icons]) ul ul a,
      :host([no-icons]) ul ul .add {
        min-height: 2rem;
        padding: 0.375rem 0.75rem;
        font-weight: 400;
      }
      :host([no-icons]) ul ul a[aria-current="page"] {
        font-weight: 500;
      }
      :host([no-icons]) .group-label {
        padding: 0 0.75rem;
      }
      /* pages under a heading sit one step in from its label */
      :host([no-icons]) li.grouped {
        margin-left: 0.75rem;
      }
      :host([no-icons]) li.heading:not(:first-child) {
        margin-top: 1.5rem;
      }
      :host([no-icons]) li.heading.nested:not(:first-child) {
        margin-top: 0.75rem;
      }
      :host([no-icons]) .has-kids > .row > a {
        padding-right: 2rem;
      }
      .none {
        margin: 0.5rem;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .add .lucide {
        width: 0.875rem;
        height: 0.875rem;
      }
      .add-field {
        flex-direction: column;
        align-items: stretch;
        gap: 0.25rem;
        height: auto !important;
        padding: 0.25rem;
      }
      .add-type {
        box-sizing: border-box;
        height: 1.75rem;
        padding: 0 0.375rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        color: var(--foreground);
        font: inherit;
        font-size: 0.8125rem;
      }
      .add-input {
        flex: 1;
        min-width: 0;
        height: 1.75rem;
        box-sizing: border-box;
        padding: 0 0.5rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        color: var(--foreground);
        font: inherit;
        font-size: 0.875rem;
      }
    `}_renderAdd(e,t=!1){if(!this.editable)return"";const r=e??"root",{types:i,untyped:o}=this._choices(e);return!i.length&&!o?"":this._adding===r?s`<li class="add-field ${t?"grouped":""}">
        ${i.length?s`<select
              class="add-type"
              aria-label="Content type of the new page"
              @change="${n=>this._addType=n.target.value}"
              @keydown="${n=>this._addKeys(n,e)}"
            >
              ${o?s`<option value="" ?selected="${!this._addType}">No type</option>`:""}
              ${i.map(n=>s`<option value="${n.id}" ?selected="${n.id===this._addType}">${n.label}</option>`)}
            </select>`:""}
        <input
          class="add-input"
          type="text"
          placeholder="Page title, then Enter"
          aria-label="New page title"
          @keydown="${n=>this._addKeys(n,e)}"
          @blur="${n=>{!n.target.value.trim()&&!n.relatedTarget?.classList?.contains("add-type")&&(this._adding=null)}}"
        />
      </li>`:s`<li class="row ${t?"grouped":""}">
      <button class="add" data-add="${r}" @click="${()=>this._startAdd(e)}">
        ${Zr("oer:plus")}Add page
      </button>
    </li>`}_renderLevel(e,t,r){const i=e.get(t)||[];let o=!1;return s`<ul role="list">
      ${i.map(n=>{if(ve(n))return o=!0,s`<li class="heading ${r?"nested":""}"><span class="group-label" role="heading" aria-level="${Math.min(6,r+2)}">${n.title}</span></li>`;const l=(e.get(n.id)||[]).length>0,d=this.__forceOpen||this._open.has(n.id),c=n.metadata?.icon;return s`<li class="${[l?"has-kids":"",o?"grouped":""].join(" ")}">
          <div class="row">
            <a
              href="${this._href(n)}"
              class="${n.metadata?.published===!1?"draft":""}"
              aria-current="${n.id===this._activeId||n.id===this.__pinnedActive?"page":n.id===this.__location?"location":"false"}"
            >
              ${r===0&&Zt(this._all)?c?s`<simple-icon-lite icon="${c}"></simple-icon-lite>`:s`<span class="no-icon"></span>`:""}
              <span class="title">${n.title}</span>
            </a>
            ${l?s`<button
                  class="chev"
                  aria-expanded="${d?"true":"false"}"
                  aria-label="${d?"Collapse":"Expand"} ${n.title}"
                  @click="${()=>this._toggle(n.id)}"
                >
                  ${Zr("oer:chevron-down")}
                </button>`:""}
          </div>
          ${l&&d?this._renderLevel(e,n.id,r+1):""}
        </li>`})}
      ${this._renderAdd(t,i.some(ve))}
    </ul>`}_href(e){const t=e.metadata?.oerNavVersion;if(!t)return e.slug;const r=(this._all||[]).find(i=>i.metadata?.oerSnapshotOf===e.id&&i.metadata?.version===t);return r?r.slug:e.slug}_navItems(){if(this.root)return this._items;const e=new Set(B(this._all).types.filter(t=>t.nav===!1).map(t=>t.id));return e.size?this._items.filter(t=>!e.has(t.metadata?.pageType)):this._items}render(){this.toggleAttribute("no-icons",!Zt(this._all));let e=this._navItems();const t=new Set(e.map(d=>d.id)),r=new Map((this._all||[]).map(d=>[d.id,d]));let i=r.get(this._activeId);for(;i&&!t.has(i.id);)i=r.get(i.parent);this.__location=i&&i.id!==this._activeId?i.id:null;const o=r.get(this._activeId);i&&o?.metadata?.oerSnapshotOf===i.id&&o.metadata.version===i.metadata?.oerNavVersion?(this.__location=null,this.__pinnedActive=i.id):this.__pinnedActive=null;const n=(this.filter||"").trim().toLowerCase();if(n){const d=new Map(e.map(p=>[p.id,p])),c=new Set;for(const p of e)if(p.title.toLowerCase().includes(n))for(let h=p;h&&!c.has(h.id);h=d.get(h.parent))c.add(h.id);e=e.filter(p=>c.has(p.id)),this.__forceOpen=!0}else this.__forceOpen=!1;const l=me(e);return n&&!e.length?s`<p class="none">No pages match “${this.filter}”.</p>`:this._renderLevel(l,this.root||null,0)}};customElements.define(Qr.tag,Qr);const nn=480,sn=4,ln=s`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>`,dn=s`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>`;let ei=class extends M{static get tag(){return"oer-breadcrumb"}static get properties(){return{_trail:{state:!0},_narrow:{state:!0},_open:{state:!0}}}constructor(){super(),this._trail=[],this._narrow=!1,this._open=!1,this.__outside=e=>{this._open&&!e.composedPath().includes(this)&&(this._open=!1)}}connectedCallback(){super.connectedCallback(),this.__dispose=R(()=>{const e=_(y.manifest?.items)||[],t=_(y.activeId);Promise.resolve().then(()=>{const r=new Map(e.map(o=>[o.id,o])),i=[];for(let o=r.get(t);o&&!de(o);o=r.get(o.parent))i.unshift(o);this._trail=i.map(o=>({id:o.id,title:o.title,slug:o.slug})),this._open=!1})}),this.__resize=new ResizeObserver(([e])=>{this._narrow=e.contentRect.width<nn}),this.__resize.observe(this),globalThis.addEventListener("pointerdown",this.__outside,!0)}disconnectedCallback(){this.__dispose?.(),this.__resize?.disconnect(),globalThis.removeEventListener("pointerdown",this.__outside,!0),super.disconnectedCallback()}static get styles(){return b`
      :host {
        display: block;
        min-width: 0;
        font-family: var(--font-sans, system-ui, sans-serif);
        font-size: 0.875rem;
        color: var(--muted-foreground, #555);
      }
      nav {
        min-width: 0;
      }
      ol {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        gap: 0.375rem;
        margin: 0;
        padding: 0;
        list-style: none;
        min-width: 0;
      }
      li {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        min-width: 0;
      }
      li.crumb {
        flex: 0 1 auto;
      }
      li.current {
        flex: 1 1 auto;
      }
      a,
      span.page {
        overflow: hidden;
        max-width: 14rem;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .narrow a,
      .narrow span.page {
        max-width: none;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      a:hover {
        color: var(--foreground, #111);
      }
      span.page {
        color: var(--foreground, #111);
        font-weight: 400;
      }
      .sep {
        display: inline-flex;
        flex: none;
      }
      svg {
        width: 0.875rem;
        height: 0.875rem;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      :focus-visible {
        outline: 2px solid var(--ring, #2563eb);
        outline-offset: 2px;
        border-radius: var(--radius-sm, 0.25rem);
      }
      .ellipsis-wrap {
        position: relative;
        flex: none;
      }
      button.ellipsis {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-md, 0.5rem);
        color: inherit;
        cursor: pointer;
      }
      button.ellipsis:hover,
      button.ellipsis[aria-expanded="true"] {
        background: var(--accent, #f4f4f5);
        color: var(--foreground, #111);
      }
      button.ellipsis svg {
        width: 1rem;
        height: 1rem;
      }
      .menu {
        position: absolute;
        top: calc(100% + 0.25rem);
        left: 0;
        z-index: 50;
        min-width: 10rem;
        max-width: min(18rem, calc(100vw - 2rem));
        padding: 0.25rem;
        border: 1px solid var(--border, #e5e5e5);
        border-radius: var(--radius-md, 0.5rem);
        background: var(--popover, var(--background, #fff));
        color: var(--popover-foreground, var(--foreground, #111));
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
      }
      .menu a {
        display: block;
        max-width: none;
        padding: 0.375rem 0.5rem;
        border-radius: var(--radius-sm, 0.25rem);
        color: inherit;
        white-space: normal;
      }
      .menu a:hover,
      .menu a:focus-visible {
        background: var(--accent, #f4f4f5);
        outline: none;
      }
    `}_toggle(){this._open=!this._open,this._open&&this.updateComplete.then(()=>this.shadowRoot.querySelector(".menu a")?.focus())}_menuKeys(e){const t=[...this.shadowRoot.querySelectorAll(".menu a")],r=t.indexOf(this.shadowRoot.activeElement);if(e.key==="ArrowDown")t[(r+1)%t.length]?.focus();else if(e.key==="ArrowUp")t[(r-1+t.length)%t.length]?.focus();else if(e.key==="Home")t[0]?.focus();else if(e.key==="End")t[t.length-1]?.focus();else if(e.key==="Escape"||e.key==="Tab"){if(this._open=!1,e.key==="Escape"&&this.shadowRoot.querySelector("button.ellipsis")?.focus(),e.key==="Tab")return}else return;e.preventDefault()}render(){const e=this._trail;if(!e.length)return s``;const t=e[e.length-1],r=e.slice(0,-1);let i,o;this._narrow?(i=[],o=r):e.length>sn?(i=[r[0],"\u2026",...r.slice(-1)],o=r.slice(1,-1)):(i=r,o=[]),!this._narrow&&o.length===0&&(i=i.filter(c=>c!=="\u2026"));const n=s`<span class="sep" aria-hidden="true">${ln}</span>`,l=s`<li class="ellipsis-wrap">
      <button
        class="ellipsis"
        aria-label="Show ${o.length} more level${o.length===1?"":"s"}"
        aria-haspopup="menu"
        aria-expanded="${this._open?"true":"false"}"
        @click="${this._toggle}"
      >
        ${dn}
      </button>
      ${this._open?s`<div class="menu" role="menu" @keydown="${this._menuKeys}">
            ${o.map(c=>s`<a role="menuitem" href="${c.slug}" @click="${()=>this._open=!1}">${c.title}</a>`)}
          </div>`:""}
    </li>`,d=this._narrow?o.length?[l]:[]:i.map(c=>c==="\u2026"?l:s`<li class="crumb"><a href="${c.slug}" title="${c.title}">${c.title}</a></li>`);return s`<nav aria-label="Breadcrumb" class="${this._narrow?"narrow":""}">
      <ol>
        ${d.map(c=>s`${c}<li class="sep-item" aria-hidden="true">${n}</li>`)}
        <li class="current"><span class="page" aria-current="page" title="${t.title}">${t.title}</span></li>
      </ol>
    </nav>`}};customElements.define(ei.tag,ei);const cn=b`
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
`,pn=b`
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
`;let ti=class extends M{static get tag(){return"oer-command-search"}static get properties(){return{open:{type:Boolean,reflect:!0}}}constructor(){super(),this.open=!1,this.__outside=e=>{this.open&&!e.composedPath().includes(this)&&(this.open=!1)}}connectedCallback(){super.connectedCallback(),globalThis.addEventListener("pointerdown",this.__outside)}disconnectedCallback(){globalThis.removeEventListener("pointerdown",this.__outside),super.disconnectedCallback()}updated(e){e.has("open")&&this.open&&this.shadowRoot.querySelector("input")?.focus()}_input(e){const t=e.target.value;t&&(e.target.value="",this.open=!1,Jt(t))}_keydown(e){e.key==="Escape"?(e.preventDefault(),this.open=!1,this.shadowRoot.querySelector("button")?.focus()):e.key==="Enter"&&!e.target.value&&(e.preventDefault(),this.open=!1,Jt())}static get styles(){return b`
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
    `}render(){return s`
      <div class="search" role="search">
        <button
          aria-expanded="${this.open}"
          aria-controls="q"
          title="Run a command (${Uo})"
          aria-label="Run a command"
          @click="${()=>this.open=!this.open}"
        >
          <span
            class="icon"
            aria-hidden="true"
            style="--src:url(&quot;${S["oer:command"]}&quot;)"
          ></span>
        </button>
        <input
          id="q"
          type="search"
          placeholder="Run a command…"
          aria-label="Run a command"
          tabindex="${this.open?0:-1}"
          @input="${this._input}"
          @keydown="${this._keydown}"
        />
      </div>
    `}};customElements.define(ti.tag,ti);const ri=Object.keys(S).filter(a=>!a.startsWith("oer:")),ii=a=>s`<span class="lucide" aria-hidden="true" style="--src:url(&quot;${S[a]||""}&quot;)"></span>`;let Dt=class extends M{static get tag(){return"oer-icon-picker"}static get properties(){return{open:{type:Boolean,reflect:!0},_query:{state:!0},_current:{state:!0}}}constructor(){super(),this.open=!1,this._query="",this._current="",this.__keys=e=>{this.open&&e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),this._done(null))}}pick(e=""){return this._current=e,this._query="",this.open=!0,globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector("input")?.focus()),new Promise(t=>this.__resolve=t)}_done(e){this.open=!1,globalThis.removeEventListener("keydown",this.__keys,!0),this.__resolve?.(e),this.__resolve=null}static get styles(){return b`
      :host {
        position: fixed;
        inset: 0;
        z-index: 10010;
        display: none;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
      }
      :host([open]) {
        display: grid;
        place-items: center;
      }
      .backdrop {
        position: absolute;
        inset: 0;
        background: rgb(0 0 0 / 0.35);
      }
      .box {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        width: min(30rem, calc(100vw - 2rem));
        max-height: min(36rem, calc(100dvh - 2rem));
        padding: 1.25rem;
        box-sizing: border-box;
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 8px 24px rgb(0 0 0 / 0.18);
      }
      h2 {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
      }
      .lucide {
        flex: none;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      .search {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        color: var(--muted-foreground);
      }
      .search:focus-within {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      input {
        flex: 1;
        min-width: 0;
        border: 0;
        outline: none;
        background: transparent;
        color: var(--foreground);
        font: inherit;
        font-size: 0.875rem;
      }
      .grid {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 0.25rem;
      }
      .grid button {
        all: unset;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        padding: 0.5rem 0.25rem;
        border-radius: var(--radius-md);
        cursor: pointer;
      }
      .grid button:hover,
      .grid button:focus-visible {
        background: var(--accent);
      }
      .grid button:focus-visible {
        outline: 2px solid var(--ring);
      }
      .grid button[aria-pressed="true"] {
        background: color-mix(in oklch, var(--primary) 12%, transparent);
        color: var(--primary);
      }
      .grid .lucide {
        width: 1.25rem;
        height: 1.25rem;
      }
      small {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        font-size: 0.5625rem;
        color: var(--muted-foreground);
      }
      .empty {
        padding: 2rem 0;
        text-align: center;
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      .foot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 0.75rem;
        border-top: 1px solid var(--border);
      }
      .remove {
        all: unset;
        font-size: 0.75rem;
        color: var(--destructive);
        cursor: pointer;
      }
      .remove:hover {
        text-decoration: underline;
      }
      .cancel {
        all: unset;
        height: 2.25rem;
        padding: 0 1rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
      }
      .cancel:hover {
        background: var(--accent);
      }
      .remove:focus-visible,
      .cancel:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
    `}render(){if(!this.open)return s``;const e=this._query.trim().toLowerCase(),t=(e?ri.filter(r=>r.toLowerCase().includes(e)):ri).slice(0,120);return s`
      <div class="backdrop" @click="${()=>this._done(null)}"></div>
      <div class="box" role="dialog" aria-modal="true" aria-labelledby="t">
        <h2 id="t">Choose icon</h2>
        <div class="search">
          ${ii("icons:search")}
          <input
            type="text"
            placeholder="Search icons…"
            aria-label="Search icons"
            .value="${this._query}"
            @input="${r=>this._query=r.target.value}"
          />
        </div>
        ${t.length?s`<div class="grid">
              ${t.map(r=>s`<button title="${r}" aria-pressed="${r===this._current?"true":"false"}" @click="${()=>this._done(r)}">
                  ${ii(r)}<small>${r.split(":").pop()}</small>
                </button>`)}
            </div>`:s`<div class="empty">No icons match “${this._query}”</div>`}
        <div class="foot">
          <button class="remove" @click="${()=>this._done("")}">Remove icon</button>
          <button class="cancel" @click="${()=>this._done(null)}">Cancel</button>
        </div>
      </div>
    `}};customElements.define(Dt.tag,Dt);function oi(){const a=globalThis.document;return a.querySelector(Dt.tag)||a.body.appendChild(a.createElement(Dt.tag))}const Pe="oer:pathway",ai="oer:specialization",hn=["Beginner","Intermediate","Advanced"],f2=a=>Array.isArray(a)?a:typeof a=="string"&&a?a.split(",").map(e=>e.trim()).filter(Boolean):[],ni=()=>_(y.manifest?.items)||[],mn=(a,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${S[a]||""}&quot;)"></span>`,v2=a=>hn.findIndex(e=>e.toLowerCase()===String(a||"").toLowerCase())+1,b2=a=>[...new Set(f2(a))].sort((e,t)=>(v2(e)||99)-(v2(t)||99));function Me(a,e=""){const t=v2(a);return s`<span class="level ${e}"
    ><span class="steps" aria-hidden="true">${[1,2,3].map(r=>s`<span class="${r<=t?"on":""}"></span>`)}</span>${a}</span
  >`}const w2=(a="")=>s`<span class="dev ${a}">${mn("oer:circle-dashed","xs")}In development</span>`,yt=b`
  .level {
    display: inline-flex;
    flex: none;
    align-items: center;
    gap: 0.375rem;
    padding: 0.125rem 0.5rem;
    border: 1px solid var(--border, #e5e5e5);
    border-radius: 999px;
    background: var(--background, #fff);
    color: var(--foreground, #111);
    font-size: 0.6875rem;
    font-weight: 500;
    line-height: 1rem;
    white-space: nowrap;
  }
  .level .steps {
    display: inline-flex;
    gap: 2px;
  }
  .level .steps span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--border, #d4d4d8);
  }
  .level .steps span.on {
    background: var(--primary, #0071b6);
  }
  .dev {
    display: inline-flex;
    flex: none;
    align-items: center;
    gap: 0.25rem;
    padding: 0.125rem 0.5rem;
    border: 1px dashed color-mix(in srgb, var(--muted-foreground, #555) 50%, transparent);
    border-radius: 999px;
    background: color-mix(in srgb, var(--muted, #f4f4f5) 60%, transparent);
    color: var(--muted-foreground, #555);
    font-size: 0.6875rem;
    font-weight: 500;
    line-height: 1rem;
    white-space: nowrap;
  }
  .dev.md {
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
  }
`;function si(a,e=ni()){const t=new Map(e.map(r=>[r.id,r]));for(let r=t.get(a);r;r=t.get(r.parent))if(r.metadata?.pageType===Pe)return r;return null}const li=a=>b2(a?.metadata?.oerFields?.levels),x2=a=>!de(a)&&!a.metadata?.oerSnapshotOf&&(y.isLoggedIn||a.metadata?.published!==!1);function di(a,e=ni(),t=B(e).types){const r=me(e.filter(x2)),i=new Map(e.map(p=>[p.id,p])),o=p=>t.find(h=>h.id===p?.metadata?.pageType)||null,n=p=>!p.metadata?.oerRef?.page&&(!p.metadata?.pageType||p.metadata.pageType===Qo),l=(p,h,m)=>{const v=p.metadata?.oerRef?.page,u=v?i.get(v):p,g=o(u),f=!v&&!p.metadata?.pageType&&!(r.get(p.id)||[]).length;return{id:p.id,title:p.title,href:f?"":p.slug,level:p.metadata?.oerLevel||h||"",type:g,typeLabel:g?.label||"",duration:u?.metadata?.oerFields?.estimatedDuration||"",planned:f,missing:!!v&&!u,placeholder:!!u?.metadata?.oerFields?.placeholder,group:m,components:(u?.metadata?.oerFields?.components||[]).map(x=>i.get(x?.page)).filter(x=>x&&x2(x)).map(x=>({id:x.id,title:x.title,href:x.slug,type:o(x),typeLabel:o(x)?.label||"",draft:x.metadata?.published===!1}))}},d=(r.get(a.id)||[]).filter(p=>p.metadata?.pageType!==ai).map(p=>{const h=p.metadata?.oerLevel||"",m=[];for(const v of r.get(p.id)||[]){const u=r.get(v.id)||[];if(u.length&&n(v)){const g=v.metadata?.oerLevel||h;for(const f of u)m.push(l(f,g,v.title))}else m.push(l(v,h,""))}return{id:p.id,title:p.title,href:n(p)?"":p.slug,level:h,items:m}}),c=a.metadata?.oerFields||{};return{item:a,fields:c,levels:b2(c.levels),courses:nt(c.courses,e).map(p=>p.code),targetRole:c.targetRole||"",duration:c.estimatedDuration||"",placeholder:!!c.placeholder,objectives:f2(c.learningObjectives),testOut:f2(c.testOutCriteria),prerequisites:we(c.prerequisites,e),readiness:we(c.readinessQuiz,e).filter(p=>p.item&&x2(p.item)),modules:d,specializations:(r.get(a.id)||[]).filter(p=>p.metadata?.pageType===ai)}}function un(a,e){return e?a.map(t=>({...t,items:t.items.filter(r=>!r.level||r.level===e)})).filter(t=>t.items.length):a}const Se=20,ci=a=>`<oer-include page="${a.page}"${a.version?` version="${a.version}"`:""}></oer-include>`,oe=6,gn=2e3,j=(a,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${S[a]||""}&quot;)"></span>`;class kt extends M{static get tag(){return"oer-outline-builder"}static get properties(){return{open:{type:Boolean,reflect:!0},_rows:{state:!0},_collapsed:{state:!0},_editing:{state:!0},_showIcons:{state:!0},_navIcons:{state:!0},_hoverAdd:{state:!0},_drag:{state:!0},_longPress:{state:!0},_typeMenu:{state:!0},_confirmDiscard:{state:!0}}}constructor(){super(),this.open=!1,this._rows=[],this._deleted=new Map,this._hidden=new Map,this._collapsed=new Set,this._editing=null,this._showIcons=!0,this._hoverAdd=null,this._drag=null,this._longPress=null,this._typeMenu=null,this._types=[],this._confirmDiscard=!1,this.__keys=e=>{!this.open||e.key!=="Escape"||globalThis.document.querySelector("oer-icon-picker[open]")||(this._typeMenu?this._typeMenu=null:this._editing?this._editing=null:this._requestClose(),e.preventDefault(),e.stopPropagation())}}show(e=null){const t=_(y.manifest?.items)||[];this._items=t,this._byId=new Map(t.map(i=>[i.id,i])),this._root=e,this._rootItem=e?t.find(i=>i.id===e):null;const r=i=>i.metadata?.hideInMenu&&i.metadata?.pageType!==U;this._rows=at(t.filter(i=>!de(i)&&!be(i)&&!r(i)),e).map(({item:i,depth:o})=>({id:i.id,title:i.title,icon:i.metadata?.icon||"",type:i.metadata?.pageType||"",ref:i.metadata?.oerRef?.page?i.metadata.oerRef:null,navVersion:i.metadata?.oerNavVersion||"",level:i.metadata?.oerLevel||"",depth:o,orig:i})),this._types=[...B(t).types,rr],this._navIcons=Zt(t),this._snapshot=this._signature(),this._deleted=new Map,this._hidden=new Map,this._collapsed=new Set,this._editing=null,this._confirmDiscard=!1,this.open=!0,globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector("[role=treeitem], .empty button")?.focus())}_close(){this.open=!1,this._typeMenu=null,globalThis.removeEventListener("keydown",this.__keys,!0)}_signature(){return JSON.stringify([this._navIcons,...this._rows.map(e=>[e.id,e.title,e.icon,e.type,e.level,e.depth,e.ref?.page,e.ref?.version,e.navVersion,!!e.unhide])])}get _dirty(){return this._deleted.size>0||this._hidden.size>0||this._signature()!==this._snapshot}_requestClose(){if(this._dirty&&!this._confirmDiscard){this._confirmDiscard=!0;return}this._close()}_save(){const e=_(y.manifest?.items)||[],t=this._rootItem?(Number(this._rootItem.indent)||0)+1:0,r=new Map(e.map(l=>[l.id,{...l}])),i=[],o=new Map;for(const l of this._rows){const d=l.depth===0?this._root:i[l.depth-1];i[l.depth]=l.id,i.length=l.depth+1;const c=d??"__root",p=o.get(c)??0;o.set(c,p+1);const h=l.title.trim()||"Untitled page",m=t+l.depth;if(l.orig){const v=l.orig,u=r.get(l.id),g=(v.parent||null)!==(d||null)||Number(v.order)!==p||Number(v.indent)!==m||v.title!==h||(v.metadata?.icon||"")!==l.icon||(v.metadata?.pageType||"")!==l.type||(v.metadata?.oerLevel||"")!==(l.level||"")||(v.metadata?.oerRef?.version||"")!==(l.ref?.version||"")||(v.metadata?.oerNavVersion||"")!==(l.navVersion||"")||!!l.unhide;Object.assign(u,{parent:d||null,order:p,indent:m,title:h}),u.metadata={...v.metadata||{}},u.metadata.icon=l.icon||"",u.metadata.pageType=l.type||"",l.type===U?u.metadata.hideInMenu=!0:(v.metadata?.pageType===U||l.unhide)&&(u.metadata.hideInMenu=!1),(l.level||v.metadata?.oerLevel)&&(u.metadata.oerLevel=l.level||""),(l.navVersion||v.metadata?.oerNavVersion)&&(u.metadata.oerNavVersion=l.navVersion||""),l.ref&&(v.metadata?.oerRef?.version||"")!==(l.ref.version||"")&&(u.metadata.oerRef={page:l.ref.page,version:l.ref.version||""},u.contents=ci(l.ref)),g&&(u.modified=!0)}else r.set(l.id,{id:l.id,title:h,parent:d||null,order:p,indent:m,location:"",description:"",metadata:{...l.icon?{icon:l.icon}:{},...l.type?{pageType:l.type}:{},...l.ref?{oerRef:l.ref}:{},...l.level?{oerLevel:l.level}:{},...l.type===U?{hideInMenu:!0}:{}},contents:l.ref?ci(l.ref):tr(l.type),new:!0})}for(const l of this._hidden.keys()){const d=r.get(l);!d||this._deleted.has(l)||(d.metadata={...d.metadata||{},hideInMenu:!0},d.modified=!0)}for(const l of this._deletedWithVersions()){const d=r.get(l);d&&(d.delete=!0)}const n=st(e);if(n&&n.metadata?.oerNavIcons!==!1!==this._navIcons){const l=r.get(n.id);l.metadata={...l.metadata||{},oerNavIcons:this._navIcons},l.modified=!0}se([...r.values()]),this._close()}_index(e){return this._rows.findIndex(t=>t.id===e)}_subtree(e){const t=this._rows[e].depth;let r=e+1;for(;r<this._rows.length&&this._rows[r].depth>t;)r++;return{start:e,end:r}}_hasChildren(e){return e+1<this._rows.length&&this._rows[e+1].depth>this._rows[e].depth}_visible(){const e=[];let t=-1;return this._rows.forEach((r,i)=>{if(t>=0){if(r.depth>t)return;t=-1}e.push({row:r,index:i}),this._collapsed.has(r.id)&&this._hasChildren(i)&&(t=r.depth)}),e}_nextSiblingAtDepth(e,t){const{end:r}=this._subtree(e);for(let i=r;i<this._rows.length;i++){if(this._rows[i].depth<t)return!1;if(this._rows[i].depth===t)return!0}return!1}_closingRows(e,t){const{row:r,index:i}=e[t],o=t+1<e.length?e[t+1].row.depth:-1;if(o>=r.depth)return[];const n=[];for(let l=r.depth;l>o;l--){let d=r.id;if(l<r.depth)for(let c=t-1;c>=0;c--){if(e[c].row.depth===l){d=e[c].row.id;break}if(e[c].row.depth<l)break}n.push({depth:l,afterId:d,index:i})}return n}_hasClosingAddAtDepth(e,t,r){for(let i=t+1;i<e.length;i++){const o=e[i].row.depth;if(o<r)return!0;if(o===r)return!1}return!0}_highlight(){if(this._hoverAdd)return this._hoverAdd;const e=this._drag;return e?.overId&&e.position!=="child"&&e.previewDepth!==null?{afterId:e.overId,depth:e.previewDepth}:null}_isSibling(e){const t=this._highlight();if(!t)return!1;const r=this._rows,i=r.find(d=>d.id===e);if(!i||i.depth!==t.depth)return!1;if(t.depth===0)return!0;const o=this._index(t.afterId);if(o<0)return!1;const n=t.afterId===this._drag?.id?o-1:o;let l=-1;for(let d=n;d>=0;d--){if(r[d].depth===t.depth-1){l=d;break}if(r[d].depth<t.depth-1)break}if(l<0)return!1;for(let d=l+1;d<r.length&&!(r[d].depth<t.depth);d++)if(r[d].depth===t.depth&&r[d].id===e)return!0;return!1}_columnHighlighted(e,t){const r=this._highlight();if(!r||t!==r.depth)return!1;for(let i=this._index(e);i>=0;i--){if(this._rows[i].depth===t)return this._isSibling(this._rows[i].id);if(this._rows[i].depth<t)return!1}return!1}_commit(e=[...this._rows]){this._rows=e,this._confirmDiscard=!1}_newRow(e,t=null){return{id:qe(),title:"",icon:"",type:this._defaultType(t),depth:e,orig:null}}_addAfter(e,t){const r=[...this._rows],i=this._index(e),o=i<0?r.length:this._subtree(i).end;let n=this._rootItem?.metadata?.pageType||null;for(let d=o-1;d>=0;d--)if(r[d].depth<t){n=r[d].type||null;break}const l=this._newRow(t,n);r.splice(o,0,l),this._commit(r),this._startEdit(l.id)}async _addExisting(e,t){const r=await dr().pick({exclude:this._root?[this._root]:[]});if(!r)return;const i=_(y.manifest?.items)||[],o=me(i.filter(h=>!de(h)&&!be(h))),n=(h,m,v="")=>({id:qe(),title:h.title,icon:h.metadata?.icon||"",type:h.metadata?.pageType||"",ref:{page:h.id,version:v},depth:Math.min(m,oe),orig:null}),l=r.page;if(this._hidden.has(l.id)||l.metadata?.hideInMenu&&l.metadata?.pageType!==U&&this._index(l.id)<0){this._hidden.delete(l.id);const h=(f,x)=>({id:f.id,title:f.title,icon:f.metadata?.icon||"",type:f.metadata?.pageType||"",ref:f.metadata?.oerRef?.page?f.metadata.oerRef:null,navVersion:f.id===l.id?r.version||"":f.metadata?.oerNavVersion||"",level:f.metadata?.oerLevel||"",depth:Math.min(x,oe),orig:f,unhide:f.id===l.id}),m=[h(l,t)],v=(f,x)=>(o.get(f)||[]).forEach(k=>{k.metadata?.hideInMenu&&k.metadata?.pageType!==U||(m.push(h(k,x)),v(k.id,x+1))});v(l.id,t+1);const u=[...this._rows],g=this._index(e);u.splice(g<0?u.length:this._subtree(g).end,0,...m),this._commit(u),this._focusRow(l.id);return}const d=[n(r.page,t,r.version)];if(r.withChildren){const h=(m,v)=>(o.get(m)||[]).forEach(u=>(d.push(n(u,v)),h(u.id,v+1)));h(r.page.id,t+1)}const c=[...this._rows],p=this._index(e);c.splice(p<0?c.length:this._subtree(p).end,0,...d),this._commit(c),this._focusRow(d[0].id)}_addHeading(e,t){const r=[...this._rows],i=this._index(e),o=i<0?r.length:this._subtree(i).end,n={...this._newRow(t),type:U};r.splice(o,0,n),this._commit(r),this._startEdit(n.id)}_addChild(e){const t=this._index(e);if(t<0)return;const r=[...this._rows],i=this._newRow(Math.min(r[t].depth+1,oe),r[t].type||null);r.splice(this._subtree(t).end,0,i);const o=new Set(this._collapsed);o.delete(e),this._collapsed=o,this._commit(r),this._startEdit(i.id)}_addFirst(){const e=this._newRow(0,this._rootItem?.metadata?.pageType||null);this._commit([...this._rows,e]),this._startEdit(e.id)}_remove(e,{deletePage:t=!1}={}){const r=this._index(e);if(r<0)return;const{start:i,end:o}=this._subtree(r),n=[...this._rows];if(t)for(const d of n.slice(i,o))d.orig&&this._deleted.set(d.id,d.orig);else n[r].orig&&this._hidden.set(e,n[r].orig);const l=r>0?n[r-1].id:null;n.splice(i,o-i),this._commit(n),l&&this._focusRow(l)}_deletedWithVersions(){return this._deleted.size?Xt(this._items,this._deleted.keys()):new Set}_linksToDeleted(){const e=this._deletedWithVersions();return(this._items||[]).filter(t=>!e.has(t.id)&&e.has(t.metadata?.oerRef?.page)).length}_rename(e,t){const r=this._rows.map(i=>i.id===e?{...i,title:t}:i);this._commit(r)}_shiftSubtree(e,t){const{start:r,end:i}=this._subtree(e);this._commit(this._rows.map((o,n)=>n>=r&&n<i?{...o,depth:o.depth+t}:o))}_indent(e){const t=this._index(e);if(t<=0||this._rows[t].depth>this._rows[t-1].depth)return;const{start:r,end:i}=this._subtree(t);Math.max(...this._rows.slice(r,i).map(o=>o.depth))>=oe||this._shiftSubtree(t,1)}_outdent(e){const t=this._index(e);t<0||this._rows[t].depth<=0||this._shiftSubtree(t,-1)}_moveUp(e){const t=this._index(e);if(t<=0)return;const r=[...this._rows],i=r[t].depth;let o=t-1;for(;o>=0&&r[o].depth>i;)o--;if(o<0||r[o].depth<i)return;const{start:n,end:l}=this._subtree(t),d=r.splice(n,l-n);r.splice(o,0,...d),this._commit(r),this._focusRow(e)}_moveDown(e){const t=this._index(e);if(t<0)return;const r=this._rows[t].depth,{start:i,end:o}=this._subtree(t);if(o>=this._rows.length||this._rows[o].depth!==r)return;const n=this._subtree(o).end,l=[...this._rows],d=l.splice(i,o-i);l.splice(n-d.length,0,...d),this._commit(l),this._focusRow(e)}_toggle(e){const t=new Set(this._collapsed);t.has(e)?t.delete(e):t.add(e),this._collapsed=t}_collapseAll(){this._collapsed=new Set(this._rows.filter((e,t)=>this._hasChildren(t)).map(e=>e.id))}_startEdit(e){this._editing=e,this.updateComplete.then(()=>{const t=this.shadowRoot.querySelector(`[data-edit="${e}"]`);t?.focus(),t&&(t.selectionStart=t.selectionEnd=t.value.length)})}_stopEdit(e=!0){const t=this._editing;this._editing=null,e&&t&&this._focusRow(t)}_focusRow(e){this.updateComplete.then(()=>this.shadowRoot.querySelector(`[role=treeitem][data-id="${e}"]`)?.focus())}_editKeys(e,t){e.key==="Enter"?(e.preventDefault(),this._stopEdit()):e.key==="Tab"?(e.preventDefault(),e.shiftKey?this._outdent(t.id):this._indent(t.id)):e.key==="Backspace"&&!e.target.value?(e.preventDefault(),this._editing=null,this._remove(t.id)):e.altKey&&(e.key==="ArrowUp"||e.key==="ArrowDown")&&(e.preventDefault(),e.key==="ArrowUp"?this._moveUp(t.id):this._moveDown(t.id),this._startEdit(t.id)),e.stopPropagation()}_rowKeys(e,t,r,i){if(this._editing===t.id)return;const o=i.findIndex(l=>l.row.id===t.id),n=l=>i[l]&&this._focusRow(i[l].row.id);if(e.key==="Tab")e.shiftKey?this._outdent(t.id):this._indent(t.id),this._focusRow(t.id);else if(e.key==="Enter"||e.key==="F2")this._startEdit(t.id);else if(e.altKey&&e.key==="ArrowUp")this._moveUp(t.id);else if(e.altKey&&e.key==="ArrowDown")this._moveDown(t.id);else if(e.key==="ArrowUp")n(o-1);else if(e.key==="ArrowDown")n(o+1);else if(e.key==="ArrowRight"&&this._hasChildren(r)&&this._collapsed.has(t.id))this._toggle(t.id);else if(e.key==="ArrowLeft"&&this._hasChildren(r)&&!this._collapsed.has(t.id))this._toggle(t.id);else if(e.key==="Delete"&&e.shiftKey)this._remove(t.id,{deletePage:!0});else if(e.key==="Delete"||e.key==="Backspace"&&!t.title)this._remove(t.id);else if((e.key==="t"||e.key==="l"||e.key==="v")&&!e.metaKey&&!e.ctrlKey&&!e.altKey){if(e.key==="l"&&this._levelsFor(r).length<2&&!t.level)return;const l={t:".type-chip",l:".title",v:".ref"}[e.key],d=e.currentTarget.querySelector(l);if(!d)return;this._openMenu(t,r,{t:"type",l:"level",v:"version"}[e.key],d)}else return;e.preventDefault()}_pointerDown(e,t){!this._hasChildren(t)||this._collapsed.has(e.id)||(this._longPress=e.id,clearTimeout(this.__lpTimer),this.__lpTimer=setTimeout(()=>{this._longPress===e.id&&(this._collapsed=new Set([...this._collapsed,e.id]),this._longPress=null)},gn))}_cancelLongPress(){clearTimeout(this.__lpTimer),this._longPress=null}_previewDepth(e,t){const r=Math.round((e.x-e.startX)/Se);let i=Math.max(0,Math.min(oe,e.origDepth+r));const o=this._index(t);if(t&&t!==e.id&&o>=0)if(e.position==="child")i=Math.min(oe,this._rows[o].depth+1);else{const n=e.position==="before"?Math.max(0,o-1):o;i=Math.min(i,this._rows[n].depth+1)}else t===e.id&&o>0&&(i=Math.min(i,this._rows[o-1].depth+1));return i}_dragStart(e,t){this._cancelLongPress(),e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",t.id),this._drag={id:t.id,overId:null,position:"after",startX:e.clientX,x:e.clientX,origDepth:t.depth,previewDepth:null,droppedOnOther:!1}}_dragOver(e,t){const r=this._drag;if(!r)return;e.preventDefault(),e.dataTransfer.dropEffect="move";const i={...r,x:e.clientX,overId:t.id};if(t.id!==r.id){const o=e.currentTarget.getBoundingClientRect(),n=(e.clientY-o.top)/o.height;i.position=n<.3?"before":n>.7?"after":t.depth<oe?"child":"after"}i.previewDepth=this._previewDepth(i,t.id),i.overId!==r.overId||i.position!==r.position||i.previewDepth!==r.previewDepth?this._drag=i:this._drag.x=i.x}_dragLeave(e,t){(!e.relatedTarget||!e.currentTarget.contains(e.relatedTarget))&&this._drag?.overId===t.id&&(this._drag={...this._drag,overId:null})}_drop(e,t){e.preventDefault();const r=this._drag;if(!r||r.id===t.id)return;const i=[...this._rows],o=this._index(r.id);if(o<0)return;const{start:n,end:l}=this._subtree(o);let d=i.splice(n,l-n);const c=p=>d=d.map(h=>({...h,depth:Math.max(0,Math.min(oe,h.depth+p))}));if(r.position==="child"){const p=i.findIndex(h=>h.id===t.id);if(p<0)i.push(...d);else{c(Math.min(i[p].depth+1,oe)-d[0].depth);let h=p+1;for(;h<i.length&&i[h].depth>i[p].depth;)h++;i.splice(h,0,...d);const m=new Set(this._collapsed);m.delete(t.id),this._collapsed=m}}else{r.previewDepth!==null&&c(r.previewDepth-d[0].depth);let p=i.findIndex(h=>h.id===t.id);p<0&&(p=i.length),r.position==="after"&&p++,i.splice(p,0,...d)}this._drag={...r,droppedOnOther:!0},this._commit(i)}_dragEnd(){const e=this._drag;if(e&&!e.droppedOnOther&&e.previewDepth!==null){const t=this._index(e.id);t>=0&&this._rows[t].depth!==e.previewDepth&&this._commit(this._rows.map((r,i)=>i===t?{...r,depth:e.previewDepth}:r))}this._drag=null}async _chooseIcon(e){const t=await oi().pick(e.icon);t!==null&&(this._commit(this._rows.map(r=>r.id===e.id?{...r,icon:t}:r)),this._focusRow(e.id))}_parentRow(e){const t=this._rows[e].depth;for(let r=e-1;r>=0;r--)if(this._rows[r].depth<t)return this._rows[r];return null}_allowedUnder(e){const t=this._types,r=e?t.find(o=>o.id===e):null,i=!!r&&Array.isArray(r.children);return{types:i?t.filter(o=>r.children.includes(o.id)):t,untyped:!i,none:i&&r.children.length===0}}_rowAllowed(e){const t=this._parentRow(e),r=t?null:this._rootItem?.metadata?.pageType||null;return this._allowedUnder(t?t.type:r)}_invalid(e){const t=this._rows[e];if(t.type===U)return!1;const{types:r,untyped:i}=this._rowAllowed(e);return t.type?!r.some(o=>o.id===t.type):!i}_defaultType(e){const{types:t,untyped:r}=this._allowedUnder(e);return r?"":t[0]?.id||""}_levelsFor(e){for(let r=e,i=this._parentRow(e);i;i=this._parentRow(r))if(r=this._index(i.id),i.type===Pe)return li(i.orig);const t=this._root?si(this._root,this._items||[]):null;return t?li(t):[]}_setLevel(e,t){this._typeMenu=null,this._commit(this._rows.map(r=>r.id===e?{...r,level:t}:r)),this._focusRow(e)}_openMenu(e,t,r,i){const o=i.getBoundingClientRect(),n=this.shadowRoot.querySelector(".dialog").getBoundingClientRect();this._typeMenu={id:e.id,index:t,kind:r,x:o.right-n.left,y:o.bottom-n.top+4}}_setType(e,t){this._typeMenu=null,this._commit(this._rows.map(r=>r.id===e?{...r,type:t}:r)),this._focusRow(e)}static get styles(){return[yt,b`
      :host {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: none;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
      }
      :host([open]) {
        display: grid;
        place-items: center;
      }
      .backdrop {
        position: absolute;
        inset: 0;
        background: rgb(0 0 0 / 0.5);
      }
      .dialog {
        position: relative;
        display: flex;
        flex-direction: column;
        width: min(46rem, calc(100vw - 2rem));
        height: min(44rem, calc(100dvh - 2rem));
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
        overflow: hidden;
      }
      button {
        font: inherit;
        color: inherit;
      }
      .lucide {
        flex: none;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      .sm {
        width: 0.75rem;
        height: 0.75rem;
      }
      header {
        flex: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.875rem 0.75rem 0.875rem 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      .heading {
        flex: 1;
        min-width: 0;
      }
      h2 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
      }
      h2 .lucide {
        color: var(--muted-foreground);
      }
      .sub {
        margin: 0.125rem 0 0;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .tools {
        flex: none;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.5rem 1rem 0;
      }
      .tool {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        height: 1.75rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.75rem;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .tool.switch input {
        width: 0.875rem;
        height: 0.875rem;
        margin: 0;
        accent-color: var(--primary);
        cursor: pointer;
      }
      .tool.switch:focus-within {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .tool:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .tool[aria-pressed="true"] {
        color: var(--primary);
        background: color-mix(in oklch, var(--primary) 10%, transparent);
      }
      .count {
        margin-left: auto;
        padding: 0 0.25rem 0 0.5rem;
        font-size: 0.75rem;
        color: var(--muted-foreground);
        white-space: nowrap;
      }
      .x {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md);
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .x:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .body {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        padding: 0.5rem 1.25rem 1rem;
      }
      .tree {
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        background: var(--background);
        overflow: hidden;
      }

      /* rows */
      .row {
        position: relative;
        display: flex;
        align-items: center;
        height: 2rem;
        padding: 0 0.5rem;
        outline: none;
      }
      .row:hover,
      .row:focus-within {
        background: color-mix(in oklch, var(--accent) 60%, transparent);
      }
      .row:focus-visible {
        box-shadow: inset 0 0 0 2px var(--ring);
      }
      .row.dragging {
        opacity: 0.4;
      }
      .row.child-target {
        background: color-mix(in oklch, var(--primary) 10%, transparent);
        box-shadow: inset 0 0 0 1px color-mix(in oklch, var(--primary) 40%, transparent);
      }
      .row.pressing {
        box-shadow: inset 0 0 0 1px color-mix(in oklch, var(--primary) 60%, transparent);
      }
      .dropline {
        position: absolute;
        left: 0;
        right: 0;
        z-index: 2;
        pointer-events: none;
      }
      .dropline.before {
        top: -1px;
      }
      .dropline.after {
        bottom: -1px;
      }
      .dropline .bar {
        height: 2px;
        border-radius: 1px;
        background: var(--primary);
      }
      .dropline .dot {
        position: absolute;
        top: -4px;
        width: 10px;
        height: 10px;
        box-sizing: border-box;
        border: 2px solid var(--primary);
        border-radius: 999px;
        background: var(--background);
      }
      .indent {
        display: flex;
        flex: none;
        height: 100%;
      }
      .col {
        position: relative;
        flex: none;
        width: ${Se}px;
        height: 100%;
      }
      .line {
        position: absolute;
        left: 8px;
        width: 1px;
        background: var(--border);
      }
      .line.full {
        top: 0;
        bottom: 0;
      }
      .line.top {
        top: 0;
        height: 50%;
      }
      .line.bottom {
        top: 50%;
        bottom: 0;
      }
      .hline {
        position: absolute;
        left: 8px;
        right: -10px;
        top: 50%;
        height: 1px;
        background: var(--border);
      }
      .hl {
        background: var(--primary);
      }
      .toggle {
        position: relative;
        flex: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: ${Se}px;
        height: 100%;
      }
      .chev {
        all: unset;
        position: relative;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1rem;
        height: 1rem;
        border-radius: 3px;
        background: var(--card, var(--background));
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .chev:hover {
        background: var(--accent);
      }
      .chev.hl-ring {
        box-shadow: 0 0 0 1px var(--primary);
        color: var(--primary);
      }
      .leaf {
        position: relative;
        z-index: 1;
        width: 6px;
        height: 6px;
        border-radius: 999px;
        background: var(--border);
      }
      .leaf.hl {
        background: var(--primary);
      }
      .icon-btn {
        all: unset;
        flex: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 4px;
        cursor: pointer;
        color: var(--primary);
        --simple-icon-height: 0.875rem;
        --simple-icon-width: 0.875rem;
      }
      .icon-btn:hover {
        background: var(--accent);
      }
      .icon-btn.unset {
        color: var(--muted-foreground);
        opacity: 0;
      }
      .row:hover .icon-btn.unset,
      .row:focus-within .icon-btn.unset {
        opacity: 0.6;
      }
      .title {
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        height: 100%;
        cursor: grab;
        user-select: none;
      }
      .title span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 0.375rem;
        font-size: 0.875rem;
      }
      .title .top {
        font-weight: 500;
      }
      .title .nested {
        color: var(--muted-foreground);
      }
      .title .placeholder {
        color: var(--muted-foreground);
        font-style: italic;
        opacity: 0.7;
      }
      .title .new-badge {
        flex: none;
        padding: 0 0.375rem;
        margin-left: 0.25rem;
        font-size: 0.625rem;
        font-weight: 600;
        line-height: 1rem;
        color: var(--primary);
        border: 1px solid color-mix(in oklch, var(--primary) 40%, transparent);
        border-radius: 999px;
      }
      .edit {
        flex: 1;
        min-width: 0;
        height: 1.5rem;
        box-sizing: border-box;
        padding: 0 0.375rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-sm);
        background: var(--background);
        color: var(--foreground);
        font: inherit;
        font-size: 0.875rem;
        outline: none;
      }
      .edit:focus {
        box-shadow: 0 0 0 2px color-mix(in oklch, var(--ring) 40%, transparent);
      }
      .badge {
        flex: none;
        margin-right: 0.25rem;
        padding: 0 0.375rem;
        font-size: 0.625rem;
        font-weight: 500;
        line-height: 1rem;
        color: var(--muted-foreground);
        background: var(--muted);
        border-radius: 999px;
      }
      .act {
        all: unset;
        flex: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 4px;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .act:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .act.danger:hover {
        color: var(--destructive);
      }
      .hover-only {
        display: flex;
        opacity: 0;
      }
      .row:hover .hover-only,
      .row:focus-within .hover-only,
      .act.always {
        opacity: 1;
      }
      .act:focus-visible,
      .chev:focus-visible,
      .icon-btn:focus-visible,
      .add:focus-visible,
      .tool:focus-visible,
      .x:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
        opacity: 1;
      }

      /* linked pages + "Add existing" */
      .ref {
        all: unset;
        box-sizing: border-box;
        cursor: pointer;
        flex: none;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        max-width: 14rem;
        height: 1.25rem;
        margin-right: 0.25rem;
        padding: 0 0.5rem;
        overflow: hidden;
        border-radius: 999px;
        font-size: 0.6875rem;
        color: var(--primary);
        background: color-mix(in srgb, var(--primary) 8%, transparent);
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .ref:hover {
        background: color-mix(in srgb, var(--primary) 16%, transparent);
      }
      .ref .ref-title {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .ref b {
        flex: none;
        font-weight: 600;
      }
      /* a pinned link reads as fixed: solid outline around the chip */
      .ref.pinned {
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary) 55%, transparent);
      }
      .menu-hint {
        margin-left: auto;
        padding-left: 1rem;
        font-size: 0.6875rem;
        color: var(--muted-foreground);
      }
      .ref b {
        font-family: var(--font-mono, ui-monospace, monospace);
        font-weight: 600;
      }
      /* add row: Add page · Add existing · Add heading, side by side */
      .add-wrap {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.125rem;
      }
      .add-wrap .add {
        flex: none;
        width: auto;
        padding-right: 0.5rem;
        border-radius: var(--radius-sm);
      }
      .add-wrap:hover .add .label,
      .add-wrap:focus-within .add .label {
        opacity: 1;
      }
      /* "Add page" gets the same pill hover as Add existing / Add heading;
         the tree's plus and connector still light up */
      .add-wrap .add:hover,
      .add-wrap .add:focus-visible {
        background: none;
      }
      .add-wrap .add .label {
        display: inline-flex;
        align-items: center;
        height: 1.375rem;
        margin-left: 0.25rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-sm);
      }
      .add-wrap .add:hover .label,
      .add-wrap .add:focus-visible .label {
        background: var(--accent);
        color: var(--foreground);
      }
      .add-existing {
        all: unset;
        flex: none;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        height: 1.375rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--muted-foreground);
        opacity: 0;
        cursor: pointer;
      }
      .add-wrap:hover .add-existing,
      .add-wrap:focus-within .add-existing {
        opacity: 1;
      }
      .add-existing:hover,
      .add-existing:focus-visible {
        background: var(--accent);
        color: var(--foreground);
        opacity: 1;
      }

      /* content type chip + menu */
      .type-chip {
        all: unset;
        flex: none;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        height: 1.25rem;
        margin-right: 0.25rem;
        padding: 0 0.5rem;
        border-radius: 999px;
        font-size: 0.6875rem;
        font-weight: 500;
        color: var(--muted-foreground);
        background: var(--muted);
        cursor: pointer;
        --simple-icon-height: 0.75rem;
        --simple-icon-width: 0.75rem;
      }
      .type-chip:hover {
        color: var(--foreground);
        background: var(--accent);
      }
      .type-menu .level {
        border: 0;
        padding: 0;
        background: transparent;
        font-size: inherit;
      }
      .heading-title {
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--muted-foreground);
      }
      .type-chip.untyped {
        background: transparent;
        opacity: 0;
      }
      .row:hover .type-chip.untyped,
      .row:focus-within .type-chip.untyped {
        opacity: 1;
      }
      .type-chip.bad {
        opacity: 1;
        color: var(--destructive);
        background: color-mix(in oklch, var(--destructive) 10%, transparent);
        box-shadow: inset 0 0 0 1px color-mix(in oklch, var(--destructive) 40%, transparent);
      }
      .row.invalid {
        background: color-mix(in oklch, var(--destructive) 5%, transparent);
      }
      .menu-layer {
        position: absolute;
        inset: 0;
        z-index: 6;
      }
      .type-menu {
        position: absolute;
        transform: translateX(-100%);
        min-width: 12rem;
        max-height: 20rem;
        overflow-y: auto;
        padding: 0.25rem;
        box-sizing: border-box;
        background: var(--popover, var(--background));
        color: var(--popover-foreground, var(--foreground));
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
      }
      .menu-label {
        padding: 0.375rem 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--muted-foreground);
      }
      .type-menu button {
        all: unset;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        height: 2rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.875rem;
        cursor: pointer;
        --simple-icon-height: 1rem;
        --simple-icon-width: 1rem;
      }
      .type-menu button:hover,
      .type-menu button:focus-visible {
        background: var(--accent);
        color: var(--accent-foreground, var(--foreground));
      }
      .type-menu .check,
      .type-menu .ph {
        display: inline-flex;
        width: 1rem;
        flex: none;
      }
      .menu-empty {
        padding: 0.5rem;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }

      /* add rows closing each level */
      .add {
        all: unset;
        box-sizing: border-box;
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: 1.75rem;
        padding: 0 0.5rem;
        cursor: pointer;
      }
      .add:hover,
      .add:focus-visible {
        background: color-mix(in oklch, var(--accent) 60%, transparent);
      }
      .add .plus {
        position: absolute;
        display: none;
        align-items: center;
        justify-content: center;
        width: 1rem;
        height: 1rem;
        border-radius: 3px;
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .add:hover .plus,
      .add:focus-visible .plus {
        display: inline-flex;
      }
      .add:hover .leaf,
      .add:focus-visible .leaf {
        visibility: hidden;
      }
      .add:hover .line,
      .add:hover .hline,
      .add:focus-visible .line,
      .add:focus-visible .hline {
        background: var(--primary);
      }
      .add .label {
        padding-left: 0.375rem;
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--muted-foreground);
        opacity: 0;
      }
      .add:hover .label,
      .add:focus-visible .label {
        opacity: 1;
        color: var(--foreground);
      }

      .empty {
        padding: 2.5rem 1rem;
        text-align: center;
        border: 1px dashed var(--border);
        border-radius: var(--radius-lg);
        color: var(--muted-foreground);
        font-size: 0.875rem;
      }
      .empty .lucide {
        width: 1.5rem;
        height: 1.5rem;
        margin: 0 auto 0.5rem;
        display: block;
        opacity: 0.5;
      }

      footer {
        flex: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border-top: 1px solid var(--border);
      }
      .hints {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        gap: 0.125rem 0.75rem;
        font-size: 0.6875rem;
        color: var(--muted-foreground);
      }
      kbd {
        font-family: var(--font-mono, ui-monospace, monospace);
      }
      .warn {
        flex: 1;
        font-size: 0.8125rem;
        color: var(--destructive);
      }
      .btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2.25rem;
        padding: 0 1rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        white-space: nowrap;
      }
      .btn:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
      .btn.outline {
        border: 1px solid var(--input-border, var(--border));
        background: var(--background);
      }
      .btn.outline:hover {
        background: var(--accent);
      }
      .btn.primary {
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .btn.primary[aria-disabled="true"] {
        opacity: 0.5;
        cursor: default;
      }
      .btn.destructive {
        background: var(--destructive);
        color: var(--destructive-foreground, white);
      }

    `]}_levelClosed(e){const t=this._index(e.afterId);if(t<0)return!1;const r=this._parentRow(t),i=r?r.type:this._rootItem?.metadata?.pageType||null;return this._allowedUnder(i||null).none}_pinnable(e){return K(e,this._items||[]).filter(t=>t.snapshot)}_setVersion(e,t){this._typeMenu=null,this._commit(this._rows.map(r=>r.id===e?r.ref?{...r,ref:{...r.ref,version:t}}:{...r,navVersion:t}:r)),this._focusRow(e)}_renderRef(e,t){const r=this._byId?.get(e.ref.page),i=e.ref.version,o=r?`Shows \u201C${r.title}\u201D, ${i?`pinned to v${i}`:"latest version"}. Change version (V)`:"Linked page not found";return s`<button
      class="ref ${i?"pinned":""}"
      tabindex="-1"
      title="${o}"
      aria-label="${o}"
      @mousedown="${n=>n.preventDefault()}"
      @click="${n=>{n.stopPropagation(),r&&this._openMenu(e,t,"version",n.currentTarget)}}"
    >
      ${j("icons:link","sm")}<span class="ref-title">${r?r.title:"missing"}</span><b>${i?`v${i}`:"latest"}</b>
    </button>`}_renderNavVersion(e,t){const r=e.navVersion,i=`The navigation links to ${r?`v${r} as released`:"the latest version"}. Change version (V)`;return s`<button
      class="ref ${r?"pinned":""}"
      tabindex="-1"
      title="${i}"
      aria-label="${i}"
      @mousedown="${o=>o.preventDefault()}"
      @click="${o=>{o.stopPropagation(),this._openMenu(e,t,"version",o.currentTarget)}}"
    >
      ${j("icons:history","sm")}<b>${r?`v${r}`:"latest"}</b>
    </button>`}_renderTypeChip(e,t){if(!this._types.length)return"";const r=this._types.find(o=>o.id===e.type),i=this._invalid(t);return s`<button
      class="type-chip ${r?"":"untyped"} ${i?"bad":""}"
      tabindex="-1"
      title="${i?"This type is not allowed here. Click to change.":"Content type (click to change)"}"
      aria-label="Content type: ${r?r.label:"none"}${i?", not allowed here":""}. Change"
      @mousedown="${o=>o.preventDefault()}"
      @click="${o=>{o.stopPropagation(),this._openMenu(e,t,"type",o.currentTarget)}}"
    >
      ${r?.icon?s`<simple-icon-lite icon="${r.icon}"></simple-icon-lite>`:""}${r?r.label:"No type"}
    </button>`}_renderTypeMenu(){const e=this._typeMenu,t=this._index(e.id);if(t<0)return"";const r=this._rows[t],i=d=>{const c=[...d.currentTarget.querySelectorAll("[role=menuitemradio]")],p=c.indexOf(this.shadowRoot.activeElement);if(d.key==="ArrowDown")c[(p+1)%c.length]?.focus();else if(d.key==="ArrowUp")c[(p-1+c.length)%c.length]?.focus();else if(d.key==="Escape")this._typeMenu=null,this._focusRow(r.id);else return;d.preventDefault(),d.stopPropagation()};if(e.kind==="version"){const d=r.ref?r.ref.page:r.id,c=(r.ref?r.ref.version:r.navVersion)||"",p=this._byId?.get(d),h=this._pinnable(d),m=p?.metadata?.version,v=(u,g,f="")=>s`<button role="menuitemradio" aria-checked="${c===u?"true":"false"}" @click="${()=>this._setVersion(r.id,u)}">
        <span class="check">${c===u?j("oer:check","sm"):""}</span>${g}${f?s`<span class="menu-hint">${f}</span>`:""}
      </button>`;return s`<div class="menu-layer" @click="${()=>this._typeMenu=null}">
        <div class="type-menu" role="menu" aria-label="Version" style="left:${e.x}px;top:${e.y}px" @click="${u=>u.stopPropagation()}" @keydown="${i}">
          <div class="menu-label">${r.ref?"Version shown":"Navigation links to"}</div>
          ${v("","Latest",m?`v${m}, follows changes`:"follows changes")}
          ${h.map(u=>v(u.version,`v${u.version}`,"as released"))}
          ${h.length?"":s`<div class="menu-empty">No earlier versions released yet.</div>`}
        </div>
      </div>`}if(e.kind==="level"){const d=this._levelsFor(t),c=(p,h)=>s`<button role="menuitemradio" aria-checked="${r.level===p?"true":"false"}" @click="${()=>this._setLevel(r.id,p)}">
        <span class="check">${r.level===p?j("oer:check","sm"):""}</span>${h}
      </button>`;return s`<div class="menu-layer" @click="${()=>this._typeMenu=null}">
        <div class="type-menu" role="menu" aria-label="Level" style="left:${e.x}px;top:${e.y}px" @click="${p=>p.stopPropagation()}" @keydown="${i}">
          <div class="menu-label">Level</div>
          ${c("","Every level")}
          ${[...new Set([...d,...r.level?[r.level]:[]])].map(p=>c(p,Me(p)))}
        </div>
      </div>`}const o=this._rowAllowed(t),n=o.untyped,l=o.types.some(d=>d.id===U)?o.types:[...o.types,rr];return s`<div class="menu-layer" @click="${()=>this._typeMenu=null}">
      <div
        class="type-menu"
        role="menu"
        aria-label="Content type"
        style="left:${e.x}px;top:${e.y}px"
        @click="${d=>d.stopPropagation()}"
        @keydown="${d=>{const c=[...d.currentTarget.querySelectorAll("[role=menuitemradio]")],p=c.indexOf(this.shadowRoot.activeElement);if(d.key==="ArrowDown")c[(p+1)%c.length]?.focus();else if(d.key==="ArrowUp")c[(p-1+c.length)%c.length]?.focus();else if(d.key==="Escape")this._typeMenu=null;else return;d.preventDefault(),d.stopPropagation()}}"
      >
        <div class="menu-label">Content type</div>
        ${n?s`<button role="menuitemradio" aria-checked="${r.type?"false":"true"}" @click="${()=>this._setType(r.id,"")}">
              <span class="check">${r.type?"":j("oer:check","sm")}</span>No type
            </button>`:""}
        ${l.map(d=>s`<button role="menuitemradio" aria-checked="${d.id===r.type?"true":"false"}" @click="${()=>this._setType(r.id,d.id)}">
            <span class="check">${d.id===r.type?j("oer:check","sm"):""}</span>
            ${d.icon?s`<simple-icon-lite icon="${d.icon}"></simple-icon-lite>`:s`<span class="ph"></span>`}${d.label}
          </button>`)}
        ${!l.length&&!n?s`<div class="menu-empty">Nothing is allowed here.</div>`:""}
      </div>
    </div>`}updated(e){if(e.has("_typeMenu")&&this._typeMenu){const t=this.shadowRoot.querySelector(".type-menu");if(!t)return;const r=this.shadowRoot.querySelector(".dialog").getBoundingClientRect(),i=t.getBoundingClientRect();i.bottom>r.bottom-8&&(t.style.top=`${Math.max(8,this._typeMenu.y-i.height-36)}px`),(t.querySelector("[aria-checked=true]")||t.querySelector("[role=menuitemradio]"))?.focus()}}_renderIndent(e,t,r,i){const o=[],n=this._closingRows(r,i);for(let c=1;c<=e.depth;c++)if(c<e.depth){const p=this._nextSiblingAtDepth(t,c)||this._hasClosingAddAtDepth(r,i,c);o.push(s`<div class="col">${p?s`<div class="line full ${this._columnHighlighted(e.id,c)?"hl":""}"></div>`:""}</div>`)}else{const p=this._isSibling(e.id)?"hl":"",h=this._nextSiblingAtDepth(t,c)||n.some(m=>m.depth===c);o.push(s`<div class="col">
          <div class="line top ${p}"></div>
          ${h?s`<div class="line bottom ${p}"></div>`:""}
          <div class="hline ${p}"></div>
        </div>`)}const l=this._drag,d=l?.id===e.id&&l.previewDepth!==null?l.previewDepth:e.depth;return s`<div class="indent" style="width:${d*Se}px">${o}</div>`}_renderRow(e,t,r,i){const o=this._drag,n=this._hasChildren(t),l=this._collapsed.has(e.id),d=this._isSibling(e.id),c=this._editing===e.id,p=l?this._subtree(t).end-t-1:0,h=["row",o?.id===e.id?"dragging":"",o?.overId===e.id&&o.id!==e.id&&o.position==="child"?"child-target":"",this._longPress===e.id?"pressing":"",this._invalid(t)?"invalid":""].join(" ");return s`<div
      class="${h}"
      role="treeitem"
      tabindex="0"
      data-id="${e.id}"
      aria-level="${e.depth+1}"
      aria-expanded="${n?String(!l):""}"
      aria-label="${e.title||"Untitled page"}"
      draggable="${c?"false":"true"}"
      @keydown="${m=>this._rowKeys(m,e,t,r)}"
      @pointerdown="${()=>this._pointerDown(e,t)}"
      @pointerup="${this._cancelLongPress}"
      @pointerleave="${this._cancelLongPress}"
      @dragstart="${m=>this._dragStart(m,e)}"
      @dragend="${this._dragEnd}"
      @dragover="${m=>this._dragOver(m,e)}"
      @dragleave="${m=>this._dragLeave(m,e)}"
      @drop="${m=>this._drop(m,e)}"
    >
      ${o?.overId===e.id&&o.id!==e.id&&o.position!=="child"?s`<div class="dropline ${o.position}">
            <div class="bar"></div>
            <div class="dot" style="left:${13+(o.previewDepth??0)*Se}px"></div>
          </div>`:""}
      ${this._renderIndent(e,t,r,i)}
      <div class="toggle">
        ${n?s`<button
              class="chev ${d?"hl-ring":""}"
              tabindex="-1"
              aria-label="${l?"Expand":"Collapse"}"
              @click="${m=>{m.stopPropagation(),this._toggle(e.id)}}"
            >
              ${j(l?"oer:chevron-right":"oer:chevron-down","sm")}
            </button>`:s`<div class="leaf ${d?"hl":""}"></div>`}
      </div>
      ${this._showIcons?s`<button
            class="icon-btn ${e.icon?"":"unset"}"
            tabindex="-1"
            title="${e.icon?`Icon: ${e.icon} (click to change)`:"Set icon"}"
            aria-label="${e.icon?"Change icon":"Set icon"}"
            @click="${m=>{m.stopPropagation(),this._chooseIcon(e)}}"
          >
            ${e.icon?s`<simple-icon-lite icon="${e.icon}"></simple-icon-lite>`:j("oer:smile-plus","sm")}
          </button>`:""}
      ${c?s`<input
            class="edit"
            data-edit="${e.id}"
            .value="${e.title}"
            placeholder="${e.type===U?"Heading\u2026":e.depth===0?"Page title\u2026":"Sub-page title\u2026"}"
            aria-label="Page title"
            @input="${m=>this._rename(e.id,m.target.value)}"
            @keydown="${m=>this._editKeys(m,e)}"
            @blur="${()=>this._editing===e.id&&this._stopEdit(!1)}"
          />`:s`<div class="title" @dblclick="${()=>this._startEdit(e.id)}">
            ${e.title?s`<span class="${e.type===U?"heading-title":e.depth===0?"top":"nested"}">${e.title}</span>`:s`<span class="placeholder">${e.type===U?"Heading\u2026":e.depth===0?"Page title\u2026":"Sub-page title\u2026"}</span>`}
            ${e.orig?"":s`<span class="new-badge">New</span>`}
          </div>`}
      <button
        class="act ${c?"always":"hover-only"}"
        tabindex="-1"
        title="${c?"Done":"Rename"}"
        aria-label="${c?"Done renaming":"Rename"}"
        @mousedown="${m=>m.preventDefault()}"
        @click="${m=>{m.stopPropagation(),c?this._stopEdit():this._startEdit(e.id)}}"
      >
        ${j(c?"oer:check":"icons:create","sm")}
      </button>
      ${e.ref?this._renderRef(e,t):this._pinnable(e.id).length?this._renderNavVersion(e,t):""}
      ${this._renderTypeChip(e,t)}
      ${p>0?s`<span class="badge">${p}</span>`:""}
      <div class="hover-only">
        ${e.depth<oe&&!this._allowedUnder(e.type||null).none?s`<button
              class="act"
              tabindex="-1"
              title="Add sub-page"
              aria-label="Add sub-page"
              @click="${m=>{m.stopPropagation(),this._addChild(e.id)}}"
            >
              ${j("oer:plus","sm")}
            </button>`:""}
        <button
          class="act"
          tabindex="-1"
          title="Remove from navigation (Delete). The page is kept."
          aria-label="Remove from navigation"
          @click="${m=>{m.stopPropagation(),this._remove(e.id)}}"
        >
          ${j("oer:eye-off","sm")}
        </button>
        <button
          class="act danger"
          tabindex="-1"
          title="Delete page (Shift+Delete)"
          aria-label="Delete page"
          @click="${m=>{m.stopPropagation(),this._remove(e.id,{deletePage:!0})}}"
        >
          ${j("oer:trash-2","sm")}
        </button>
      </div>
    </div>`}_renderAddRow(e,t,r){const i=this._closingRows(t,r),o=[];for(let n=1;n<=e.depth;n++)if(n<e.depth){const l=this._nextSiblingAtDepth(e.index,n)||i.some(d=>d.depth===n);o.push(s`<div class="col">${l?s`<div class="line full ${this._columnHighlighted(e.afterId,n)?"hl":""}"></div>`:""}</div>`)}else o.push(s`<div class="col"><div class="line top"></div><div class="hline"></div></div>`);return s`<button
      class="add"
      title="Add a page here"
      @mouseenter="${()=>this._hoverAdd={afterId:e.afterId,depth:e.depth}}"
      @mouseleave="${()=>this._hoverAdd=null}"
      @focus="${()=>this._hoverAdd={afterId:e.afterId,depth:e.depth}}"
      @blur="${()=>this._hoverAdd=null}"
      @click="${()=>{this._hoverAdd=null,this._addAfter(e.afterId,e.depth)}}"
    >
      <div class="indent" style="width:${e.depth*Se}px">${o}</div>
      <div class="toggle">
        <div class="leaf"></div>
        <span class="plus">${j("oer:plus","sm")}</span>
      </div>
      <span class="label">Add page</span>
    </button>`}_renderAddRows(e,t,r){return s`<div class="add-wrap">
      ${this._renderAddRow(e,t,r)}
      <button
        class="add-existing"
        title="Show an existing page here (not a copy)"
        @mouseenter="${()=>this._hoverAdd={afterId:e.afterId,depth:e.depth}}"
        @mouseleave="${()=>this._hoverAdd=null}"
        @click="${()=>{this._hoverAdd=null,this._addExisting(e.afterId,e.depth)}}"
      >
        ${j("icons:link","sm")}Add existing
      </button>
      <button
        class="add-existing"
        title="Add a heading that labels the pages after it in the navigation"
        @mouseenter="${()=>this._hoverAdd={afterId:e.afterId,depth:e.depth}}"
        @mouseleave="${()=>this._hoverAdd=null}"
        @click="${()=>{this._hoverAdd=null,this._addHeading(e.afterId,e.depth)}}"
      >
        ${j("oer:heading-2","sm")}Add heading
      </button>
    </div>`}render(){if(!this.open)return s``;const e=this._visible(),t=this._rows.filter(c=>c.depth===0).length,r=this._rows.some((c,p)=>this._hasChildren(p)),i=this._dirty,o=this._deletedWithVersions().size,n=[...this._hidden.keys()].filter(c=>!this._deleted.has(c)).length,l=o?this._linksToDeleted():0,d=this._rows.filter((c,p)=>this._invalid(p)).length;return s`
      <div class="backdrop" @click="${this._requestClose}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${j("hax:site-map")}${this._rootItem?`${this._rootItem.title} outline`:"Site outline"}</h2>
            <p class="sub">
              ${this._rootItem?"Sub-pages of this page.":"Every page in the site."} Changes apply when you save.
            </p>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._requestClose}">${j("oer:x")}</button>
        </header>
        <div class="tools">
            ${r?s`<button class="tool" @click="${this._collapseAll}">${j("oer:chevron-right","sm")}Collapse all</button>
                  <button class="tool" @click="${()=>this._collapsed=new Set}">${j("oer:chevron-down","sm")}Expand all</button>`:""}
            <button
              class="tool"
              aria-pressed="${this._showIcons?"true":"false"}"
              title="Show the icon column here, to change or remove a page's icon"
              @click="${()=>this._showIcons=!this._showIcons}"
            >
              ${j(this._showIcons?"icons:visibility":"icons:visibility-off","sm")}Edit icons
            </button>
            ${this._root?"":s`<label class="tool switch" title="Site setting: show page icons in the sidebar (saved with the outline)">
                  <input type="checkbox" role="switch" .checked="${this._navIcons}" @change="${c=>this._navIcons=c.target.checked}" />
                  Icons in navigation
                </label>`}
            <span class="count">${t} top-level · ${this._rows.length} page${this._rows.length===1?"":"s"}</span>
        </div>
        <div class="body">
          ${this._rows.length?s`<div class="tree" role="tree" aria-label="Pages">
                ${e.map(({row:c,index:p},h)=>s`${this._renderRow(c,p,e,h)}
                  ${this._closingRows(e,h).filter(m=>!this._levelClosed(m)).map(m=>this._renderAddRows(m,e,h))}`)}
              </div>`:s`<div class="empty">
                ${j("hax:site-map")}
                <p>No pages yet</p>
                <button class="btn outline" @click="${this._addFirst}">${j("oer:plus","sm")}Add page</button>
                <button class="btn outline" @click="${()=>this._addExisting(null,0)}">${j("icons:link","sm")}Add existing</button>
              </div>`}
        </div>
        <footer>
          ${this._confirmDiscard?s`<span class="warn">Discard your outline changes?</span>
                <button class="btn outline" @click="${()=>this._confirmDiscard=!1}">Keep editing</button>
                <button class="btn destructive" @click="${this._close}">Discard</button>`:s`${d?s`<span class="warn">${d} page${d===1?" is":"s are"} in a place ${d===1?"its":"their"} type isn't allowed. Change the type or move ${d===1?"it":"them"}.</span>`:o||n?s`<span class="warn">
                      ${[o?`${o} page${o===1?"":"s"}${o>this._deleted.size?" (with sub-pages and archived versions)":""} will be deleted${l?`, breaking ${l} link${l===1?"":"s"} to ${o===1?"it":"them"}`:""}.`:"",n?`${n} page${n===1?"":"s"} will leave the navigation and stay in Browse pages.`:""].join(" ")}
                    </span>`:s`<div class="hints" aria-hidden="true">
                      <span><kbd>↵</kbd> rename</span><span><kbd>⇥</kbd> indent</span><span><kbd>⇧⇥</kbd> outdent</span>
                      <span><kbd>⌥↑↓</kbd> move</span><span><kbd>↑↓</kbd> navigate</span><span><kbd>←→</kbd> collapse</span><span><kbd>T</kbd> type</span><span><kbd>L</kbd> level</span><span><kbd>V</kbd> version</span><span><kbd>Del</kbd> remove</span><span><kbd>⇧Del</kbd> delete</span>
                      <span>drag ↔ to change level</span>
                    </div>`}
                <button class="btn outline" @click="${this._requestClose}">Cancel</button>
                <button
                  class="btn primary"
                  aria-disabled="${i&&!d?"false":"true"}"
                  @click="${()=>i&&!d&&this._save()}"
                >
                  Save outline
                </button>`}
        </footer>
        ${this._typeMenu?this._renderTypeMenu():""}
      </div>
    `}}customElements.define(kt.tag,kt);function pi(){const a=globalThis.document;return a.querySelector(kt.tag)||a.body.appendChild(a.createElement(kt.tag))}const ye=(a,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${S[a]||""}&quot;)"></span>`,fn=[{id:"all",label:"All"},{id:"hidden",label:"Not in navigation"},{id:"versions",label:"Archived versions"}];let _t=class extends M{static get tag(){return"oer-pages-browser"}static get properties(){return{open:{type:Boolean,reflect:!0},_filter:{state:!0},_query:{state:!0},_confirm:{state:!0},_busy:{state:!0},_selected:{state:!0},_status:{state:!0}}}constructor(){super(),this.open=!1,this._filter="all",this._query="",this._selected=new Set,this._status="",this.__keys=e=>{!this.open||e.key!=="Escape"||this._busy||(e.preventDefault(),e.stopPropagation(),this._confirm?this._confirm=null:this._close())}}show(e="all"){this._filter=e,this._query="",this._confirm=null,this._busy=!1,this._selected=new Set,this._status="",this.open=!0,this.__stop?.(),this.__stop=R(()=>{this._list=_(y.manifest?.items)||[],this.requestUpdate()}),globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector("input")?.focus())}_close(){this.open=!1,this.__stop?.(),this.__stop=null,globalThis.removeEventListener("keydown",this.__keys,!0)}get _items(){return this._list||[]}_whyHidden(e,t,r){if(e.metadata?.oerSnapshotOf)return"archived";for(let i=e;i;i=t.get(i.parent)){if(i.metadata?.hideInMenu&&!ve(i))return i===e?"removed":"parent";if(r.has(i.metadata?.pageType)&&i===e)return"type"}return""}_go(e){this._close(),globalThis.history.pushState({},"",e),globalThis.dispatchEvent(new PopStateEvent("popstate"))}async _showInNav(e){this._busy=!0;const t=this._items.map(r=>r.id===e.id?{...r,metadata:{...r.metadata,hideInMenu:!1},modified:!0}:r);await se(t),this._busy=!1}updated(){for(const e of this.shadowRoot.querySelectorAll(".pick[data-id]"))e.checked=this._selected.has(e.dataset.id)}_toggleSelect(e,t){const r=new Set(this._selected);t?r.add(e):r.delete(e),this._selected=r,this._status=""}async _appendSelected(e){const t=this._items,r=new Map(t.map(p=>[p.id,p])),{types:i}=B(t),o=new Set(i.filter(p=>p.nav===!1).map(p=>p.id));let n=Math.max(-1,...t.filter(p=>!p.parent).map(p=>Number(p.order)||0))+1;const l=new Map,d=[];for(const p of e){const h=this._whyHidden(p,r,o);if(h==="removed"||h==="parent"){l.set(p.id,{...p,parent:null,order:n++,indent:0,metadata:{...p.metadata,hideInMenu:!1},modified:!0});continue}const m=p.metadata?.oerSnapshotOf,v=m?{page:m,version:p.metadata.version||""}:p.metadata?.oerRef?.page?p.metadata.oerRef:{page:p.id,version:""},u=r.get(v.page)||p,g=u.metadata?.pageType||"";d.push({id:qe(),title:u.title,parent:null,order:n++,indent:0,location:"",description:"",metadata:{...u.metadata?.icon?{icon:u.metadata.icon}:{},...g&&!o.has(g)?{pageType:g}:{},oerRef:v},contents:`<oer-include page="${v.page}"${v.version?` version="${v.version}"`:""}></oer-include>`,new:!0})}this._busy=!0,await se([...t.map(p=>l.get(p.id)||p),...d]),this._busy=!1;const c=e.length;this._selected=new Set,this._status=`Appended ${c} page${c===1?"":"s"} to the navigation.`}async _delete(e){this._busy=!0,e.has(y.activeId)&&(globalThis.history.pushState({},"",y.homeLink||"./"),globalThis.dispatchEvent(new PopStateEvent("popstate"))),await se(this._items.map(t=>e.has(t.id)?{...t,delete:!0}:t)),this._selected=new Set([...this._selected].filter(t=>!e.has(t))),this._confirm=null,this._status=`Deleted ${e.size} page${e.size===1?"":"s"}.`,this._busy=!1}static get styles(){return b`
      :host {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: none;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
      }
      :host([open]) {
        display: grid;
        place-items: center;
      }
      .backdrop {
        position: absolute;
        inset: 0;
        background: rgb(0 0 0 / 0.5);
      }
      .dialog {
        position: relative;
        display: flex;
        flex-direction: column;
        width: min(44rem, calc(100vw - 2rem));
        height: min(44rem, calc(100dvh - 2rem));
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
        overflow: hidden;
      }
      button,
      input {
        font: inherit;
        color: inherit;
      }
      :focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .lucide {
        flex: none;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      .lucide.sm {
        width: 0.875rem;
        height: 0.875rem;
      }
      header {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        padding: 1rem 0.75rem 1rem 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      .heading {
        flex: 1;
      }
      h2 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
      }
      .sub {
        margin: 0.125rem 0 0;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .x {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md);
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .x:hover {
        background: var(--accent);
      }
      .tools {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      .search {
        flex: 1 1 12rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        color: var(--muted-foreground);
      }
      .search:focus-within {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .search input {
        flex: 1;
        min-width: 0;
        border: 0;
        outline: 0;
        background: transparent;
        font-size: 0.875rem;
        color: var(--foreground);
      }
      .seg {
        display: inline-flex;
        padding: 0.1875rem;
        border-radius: var(--radius-md);
        background: var(--muted);
      }
      .seg button {
        all: unset;
        padding: 0.25rem 0.625rem;
        border-radius: calc(var(--radius-md) - 2px);
        font-size: 0.8125rem;
        font-weight: 500;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .seg button[aria-pressed="true"] {
        background: var(--background);
        color: var(--foreground);
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.08);
      }
      .seg button:focus-visible {
        outline: 2px solid var(--ring);
      }
      .body {
        flex: 1;
        overflow-y: auto;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      li {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.25rem 0.75rem;
        padding: 0.625rem 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      li.selected {
        background: color-mix(in srgb, var(--primary) 6%, transparent);
      }
      .pick {
        flex: none;
        width: 1rem;
        height: 1rem;
        margin: 0;
        accent-color: var(--primary);
        cursor: pointer;
      }
      .selbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1.25rem;
        border-bottom: 1px solid var(--border);
        font-size: 0.8125rem;
        background: color-mix(in srgb, var(--muted) 50%, transparent);
      }
      .selbar .count {
        flex: 1;
        color: var(--muted-foreground);
      }
      .btn.primary {
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .main {
        flex: 1 1 16rem;
        min-width: 0;
      }
      .title {
        all: unset;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
      }
      .title:hover {
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .path {
        margin: 0.125rem 0 0;
        font-size: 0.75rem;
        color: var(--muted-foreground);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .badges {
        display: inline-flex;
        flex-wrap: wrap;
        gap: 0.25rem;
        margin-left: 0.375rem;
        vertical-align: 1px;
      }
      .badge {
        padding: 0 0.4375rem;
        border-radius: 999px;
        font-size: 0.6875rem;
        font-weight: 500;
        line-height: 1.125rem;
        border: 1px solid var(--border);
        color: var(--muted-foreground);
      }
      .badge.hi {
        border-color: transparent;
        color: var(--primary);
        background: color-mix(in srgb, var(--primary) 10%, transparent);
      }
      .actions {
        display: inline-flex;
        gap: 0.25rem;
      }
      .btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 1.875rem;
        padding: 0 0.625rem;
        border-radius: var(--radius-md);
        font-size: 0.8125rem;
        font-weight: 500;
        cursor: pointer;
      }
      .btn:focus-visible {
        outline: 2px solid var(--ring);
      }
      .btn.outline {
        border: 1px solid var(--input-border, var(--border));
      }
      .btn.outline:hover,
      .btn.ghost:hover {
        background: var(--accent);
      }
      .btn.outline.danger {
        color: var(--destructive);
      }
      .btn.ghost.danger {
        color: var(--destructive);
      }
      .btn.destructive {
        background: var(--destructive);
        color: var(--destructive-foreground, #fff);
      }
      .btn[aria-disabled="true"] {
        opacity: 0.5;
        cursor: default;
      }
      .confirm {
        flex-basis: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        padding: 0.625rem 0.75rem;
        border-radius: var(--radius-md);
        background: color-mix(in srgb, var(--destructive) 8%, transparent);
        font-size: 0.8125rem;
      }
      .confirm span {
        flex: 1 1 14rem;
      }
      .empty {
        padding: 2.5rem 1.25rem;
        text-align: center;
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      footer {
        padding: 0.625rem 1.25rem;
        border-top: 1px solid var(--border);
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
    `}_renderRow(e,t){const{byId:r,hiddenTypes:i,types:o,items:n}=t,l=this._whyHidden(e,r,i),d=e.metadata?.oerSnapshotOf?r.get(e.metadata.oerSnapshotOf):null,c=e.metadata?.oerRef?.page?r.get(e.metadata.oerRef.page):null,p=o.find(C=>C.id===e.metadata?.pageType),h=Q2(n,e.id).reverse().map(C=>r.get(C)?.title).filter(Boolean).join(" \u203A "),m=d?`${e.metadata?.oerSnapshotTitle||d.title} v${e.metadata.version}`:e.title,v=this._confirm===e.id,u=this._busy?"true":"false";let g=null;v&&(g=Xt(n,[e.id]));const f=g?g.size-1:0,x=g?n.filter(C=>!g.has(C.id)&&g.has(C.metadata?.oerRef?.page)).length:0,k=this._selected.has(e.id);return s`<li class="${k?"selected":""}">
      <input type="checkbox" class="pick" data-id="${e.id}" aria-label="Select ${m}" .checked="${k}" @change="${C=>this._toggleSelect(e.id,C.target.checked)}" />
      <div class="main">
        <button class="title" @click="${()=>this._go(e.slug)}">${m}</button>
        <span class="badges">
          ${p?s`<span class="badge">${p.label}</span>`:""}
          ${l==="removed"?s`<span class="badge hi">Not in navigation</span>`:""}
          ${l==="parent"?s`<span class="badge">Under a page not in navigation</span>`:""}
          ${l==="type"?s`<span class="badge">Type not listed in navigation</span>`:""}
          ${d?s`<span class="badge">Archived version</span>`:""}
          ${c?s`<span class="badge">Shows “${c.title}”${e.metadata.oerRef.version?` v${e.metadata.oerRef.version}`:""}</span>`:""}
          ${e.metadata?.published===!1?s`<span class="badge">Draft</span>`:""}
        </span>
        <p class="path">${h||"Top level"}</p>
      </div>
      <div class="actions">
        ${l==="removed"?s`<button class="btn outline" aria-disabled="${u}" @click="${()=>!this._busy&&this._showInNav(e)}">
              ${ye("oer:eye","sm")}Show in navigation
            </button>`:""}
        <button class="btn ghost danger" aria-label="Delete ${m}" title="Delete" aria-disabled="${u}" @click="${()=>!this._busy&&(this._confirm=e.id)}">
          ${ye("oer:trash-2","sm")}
        </button>
      </div>
      ${v?s`<div class="confirm" role="alert">
            <span
              >Delete “${m}”${f?` and ${f} sub-page${f===1?"":"s"} or archived version${f===1?"":"s"}`:""}?
              ${x?`${x} link${x===1?"":"s"} to ${f?"them":"it"} will break. `:""}This can't be undone here.</span
            >
            <button class="btn outline" @click="${()=>this._confirm=null}">Cancel</button>
            <button class="btn destructive" aria-disabled="${u}" @click="${()=>!this._busy&&this._delete(g)}">
              ${this._busy?"Deleting\u2026":"Delete"}
            </button>
          </div>`:""}
    </li>`}_renderSelectionBar(e,t){const r=this._selected.size,i=t.filter(c=>this._selected.has(c.id)).length,o=t.length>0&&i===t.length,n=r-i,l=(c,p)=>(c.metadata?.oerSnapshotTitle||c.title).localeCompare(p.metadata?.oerSnapshotTitle||p.title),d=this._busy?"true":"false";return s`<div class="selbar">
      <input
        type="checkbox"
        class="pick"
        aria-label="Select all shown"
        title="Select all shown"
        .checked="${o}"
        .indeterminate="${i>0&&!o}"
        @change="${c=>{const p=new Set(this._selected);for(const h of t)c.target.checked?p.add(h.id):p.delete(h.id);this._selected=p,this._status=""}}"
      />
      <span class="count" aria-live="polite">
        ${this._status||(r?`${r} selected${n?` (${n} not shown)`:""}`:"Select pages to append them to the navigation.")}
      </span>
      ${r&&this._confirm==="__selection"?this._renderBulkConfirm():""}
      ${r&&this._confirm!=="__selection"?s`<button class="btn ghost" @click="${()=>this._selected=new Set}">Clear</button>
            <button class="btn outline danger" aria-disabled="${d}" @click="${()=>!this._busy&&(this._confirm="__selection")}">
              ${ye("oer:trash-2","sm")}Delete
            </button>
            <button
              class="btn primary"
              aria-disabled="${d}"
              @click="${()=>!this._busy&&this._appendSelected(e.filter(c=>this._selected.has(c.id)).sort(l))}"
            >
              ${ye("oer:plus","sm")}${this._busy?"Appending\u2026":"Append to navigation"}
            </button>`:""}
    </div>`}_renderBulkConfirm(){const e=this._items,t=Xt(e,this._selected),r=this._selected.size,i=t.size-r,o=e.filter(l=>!t.has(l.id)&&t.has(l.metadata?.oerRef?.page)).length,n=this._busy?"true":"false";return s`<div class="confirm" role="alert">
      <span
        >Delete ${r} selected page${r===1?"":"s"}${i?` and ${i} sub-page${i===1?"":"s"} or archived version${i===1?"":"s"}`:""}?
        ${o?`${o} link${o===1?"":"s"} to ${r+i===1?"it":"them"} will break. `:""}This can't be undone here.</span
      >
      <button class="btn outline" @click="${()=>this._confirm=null}">Cancel</button>
      <button class="btn destructive" aria-disabled="${n}" @click="${()=>!this._busy&&this._delete(t)}">
        ${this._busy?"Deleting\u2026":`Delete ${t.size}`}
      </button>
    </div>`}render(){if(!this.open)return s``;const e=this._items,t=new Map(e.map(c=>[c.id,c])),{types:r}=B(e),i=new Set(r.filter(c=>c.nav===!1).map(c=>c.id)),o={byId:t,hiddenTypes:i,types:r,items:e},n=e.filter(c=>!de(c)&&!ve(c)),l=this._query.trim().toLowerCase(),d=n.filter(c=>{const p=this._whyHidden(c,t,i);return this._filter==="hidden"?p==="removed"||p==="parent":this._filter==="versions"?p==="archived":!0}).filter(c=>!l||c.title.toLowerCase().includes(l)||`${c.metadata?.oerSnapshotTitle||""} v${c.metadata?.version||""}`.toLowerCase().includes(l)).sort((c,p)=>(c.metadata?.oerSnapshotTitle||c.title).localeCompare(p.metadata?.oerSnapshotTitle||p.title));return s`
      <div class="backdrop" @click="${()=>!this._busy&&this._close()}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${ye("oer:files")}Browse pages</h2>
            <p class="sub">Every page in the site, including pages the navigation doesn't list.</p>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._close}">${ye("oer:x")}</button>
        </header>
        <div class="tools">
          <label class="search">
            ${ye("icons:search","sm")}
            <input type="search" placeholder="Search pages" aria-label="Search pages" .value="${this._query}" @input="${c=>this._query=c.target.value}" />
          </label>
          <div class="seg" role="group" aria-label="Show">
            ${fn.map(c=>s`<button aria-pressed="${this._filter===c.id?"true":"false"}" @click="${()=>this._filter=c.id}">${c.label}</button>`)}
          </div>
        </div>
        ${this._renderSelectionBar(n,d)}
        <div class="body">
          ${d.length?s`<ul aria-label="Pages">
                ${d.map(c=>this._renderRow(c,o))}
              </ul>`:s`<p class="empty">${l?"No pages match.":this._filter==="hidden"?"Every page is in the navigation.":this._filter==="versions"?"No archived versions yet.":"No pages yet."}</p>`}
        </div>
        <footer>${d.length} of ${n.length} pages. To put a page somewhere specific, use Add existing in the outline builder.</footer>
      </div>
    `}};customElements.define(_t.tag,_t);function vn(){const a=globalThis.document;return a.querySelector(_t.tag)||a.body.appendChild(a.createElement(_t.tag))}const H=(a,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${S[a]||""}&quot;)"></span>`,Oe=a=>JSON.parse(JSON.stringify(a)),bn=[{label:"Paragraph",html:"<p></p>"},{label:"Sub-page outline",html:`<h2>In this lesson</h2>
<oer-collection scope="children" view="outline" sort="order"></oer-collection>`},{label:"Sub-page table",html:'<oer-collection scope="children" view="table" sort="order" controls="full"></oer-collection>'},{label:"Sub-page cards",html:'<oer-collection scope="children" view="cards" sort="order" controls="none"></oer-collection>'},{label:"Callout",html:'<oer-callout type="objective" title="What you will learn"><p></p></oer-callout>'}];let $t=class extends M{static get tag(){return"oer-type-editor"}static get properties(){return{open:{type:Boolean,reflect:!0},_types:{state:!0},_selected:{state:!0},_expanded:{state:!0},_confirm:{state:!0},_io:{state:!0},_ioText:{state:!0},_ioError:{state:!0},_saving:{state:!0},_dragField:{state:!0}}}constructor(){super(),this.open=!1,this._types=[],this._selected=0,this._expanded=new Set,this._confirm=!1,this._io=null,this._ioText="",this._ioError="",this._saving=!1,this._dragField=null,this.__keys=e=>{!this.open||e.key!=="Escape"||wn()||(e.preventDefault(),e.stopPropagation(),this._io?this._io=null:this._requestClose())}}show(){this._types=Oe(B().types).map(e=>({...e,fields:e.fields.map(t=>({...t,__saved:!0}))})),this._usage=oa(),this._savedIds=new Set(this._types.map(e=>e.id)),this._snapshot=JSON.stringify(this._clean(this._types)),this._selected=0,this._expanded=new Set,this._confirm=!1,this._io=null,this.open=!0,globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector(".types button")?.focus())}_close(){this.open=!1,globalThis.removeEventListener("keydown",this.__keys,!0)}get _dirty(){return JSON.stringify(this._clean(this._types))!==this._snapshot}_requestClose(){if(this._dirty&&!this._confirm){this._confirm=!0;return}this._close()}_problems(){const e=[],t=new Set;for(const r of this._types){r.label.trim()||e.push("Every type needs a name."),t.has(r.id)&&e.push(`Two types share the ID \u201C${r.id}\u201D.`),t.add(r.id);const i=new Set;for(const o of r.fields)o.label.trim()||e.push(`${r.label||"A type"}: every field needs a label.`),i.has(o.name)&&e.push(`${r.label}: two fields share the key \u201C${o.name}\u201D.`),i.add(o.name),o.kind==="select"&&!(o.options||[]).length&&e.push(`${r.label}: \u201C${o.label}\u201D needs at least one choice.`)}return[...new Set(e)]}_update(e){const t=Oe(this._types);e(t[this._selected],t),this._types=t,this._confirm=!1}_addType(){const e=Oe(this._types);let t="new-type";for(let r=2;e.some(i=>i.id===t);r++)t=`new-type-${r}`;e.push({id:t,label:"New type",icon:"",description:"",children:null,fields:[]}),this._types=e,this._selected=e.length-1,this.updateComplete.then(()=>{const r=this.shadowRoot.querySelector("#type-label");r?.focus(),r?.select()})}_deleteType(){const e=this._types[this._selected];if(!e||this._usage.get(e.id))return;const t=Oe(this._types).filter((r,i)=>i!==this._selected);for(const r of t)Array.isArray(r.children)&&(r.children=r.children.filter(i=>i!==e.id));this._types=t,this._selected=Math.max(0,this._selected-1)}_idLocked(e){return this._savedIds.has(e.id)&&(this._usage.get(e.id)||0)>0}_setLabel(e){this._update(t=>{!this._idLocked(t)&&!t.__idTouched&&!this._savedIds.has(t.id)&&(t.id=ar(e)),t.label=e})}async _chooseIcon(){const e=this._types[this._selected],t=await oi().pick(e.icon);t!==null&&this._update(r=>r.icon=t)}_setChildrenMode(e){this._update(t=>{e==="any"?t.children=null:e==="none"?t.children=[]:t.children=Array.isArray(t.children)&&t.children.length?t.children:[],t.__only=e==="only"})}_toggleChild(e){this._update(t=>{const r=new Set(t.children||[]);r.has(e)?r.delete(e):r.add(e),t.children=[...r],t.__only=!0})}_addField(){this._update(e=>{let t="newField";for(let r=2;e.fields.some(i=>i.name===t);r++)t=`newField${r}`;e.fields.push({name:t,label:"",kind:"text"})}),this.updateComplete.then(()=>{const e=this.shadowRoot.querySelectorAll(".field-label");e[e.length-1]?.focus()})}_setField(e,t){this._update(r=>{const i=r.fields[e];"label"in t&&!i.__nameTouched&&!i.__saved&&(i.name=aa(t.label)),Object.assign(i,t),i.kind!=="select"&&delete i.options,i.kind!=="relation"&&delete i.types;for(const o of Object.keys(i))(i[o]===!1||i[o]==="")&&o!=="label"&&o!=="name"&&delete i[o]})}_moveField(e,t){this._update(r=>{const i=e+t;if(i<0||i>=r.fields.length)return;const[o]=r.fields.splice(e,1);r.fields.splice(i,0,o)}),this.updateComplete.then(()=>this.shadowRoot.querySelectorAll(".grip")[e+t]?.focus())}_removeField(e){this._update(t=>t.fields.splice(e,1))}_toggleExpanded(e){const t=new Set(this._expanded);t.has(e)?t.delete(e):t.add(e),this._expanded=t}_clean(e){return JSON.parse(JSON.stringify(e,(t,r)=>t.startsWith("__")?void 0:r))}async _save(){!this._dirty||this._problems().length||this._saving||(this._saving=!0,await na({version:1,types:this._clean(this._types)}),this._saving=!1,this._close())}_openExport(){this._ioText=JSON.stringify({version:1,types:this._clean(this._types)},null,2),this._ioError="",this._io="export"}_openImport(){this._ioText="",this._ioError="",this._io="import"}_import(){try{const e=JSON.parse(this._ioText),t=Array.isArray(e)?e:e.types;if(!Array.isArray(t)||t.some(i=>!i.id||!i.label||!Array.isArray(i.fields)))throw new Error("Expected { types: [{ id, label, fields: [] }, \u2026] }");const r=Oe(this._types);for(const i of t){const o=r.findIndex(n=>n.id===i.id);o>=0?r[o]=i:r.push(i)}this._types=r,this._io=null}catch(e){this._ioError=e.message}}static get styles(){return b`
      :host {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: none;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
      }
      :host([open]) {
        display: grid;
        place-items: center;
      }
      .backdrop {
        position: absolute;
        inset: 0;
        background: rgb(0 0 0 / 0.5);
      }
      .dialog {
        position: relative;
        display: flex;
        flex-direction: column;
        width: min(62rem, calc(100vw - 2rem));
        height: min(46rem, calc(100dvh - 2rem));
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
        overflow: hidden;
      }
      button,
      input,
      select,
      textarea {
        font: inherit;
        color: inherit;
      }
      .lucide {
        flex: none;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      .sm {
        width: 0.875rem;
        height: 0.875rem;
      }
      :focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      header {
        flex: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.875rem 0.75rem 0.875rem 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      .heading {
        flex: 1;
        min-width: 0;
      }
      h2 {
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1rem;
        font-weight: 600;
      }
      h2 .lucide {
        color: var(--muted-foreground);
      }
      .sub {
        margin: 0.125rem 0 0;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .ghost {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2rem;
        padding: 0 0.625rem;
        border-radius: var(--radius-md);
        font-size: 0.8125rem;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .ghost:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .x {
        width: 2rem;
        padding: 0;
        justify-content: center;
      }
      .body {
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: 15rem minmax(0, 1fr);
      }

      /* type list (shadcn sidebar menu) */
      .types {
        overflow-y: auto;
        padding: 0.5rem;
        border-right: 1px solid var(--border);
        background: var(--card, var(--muted));
      }
      .types button {
        all: unset;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        height: 2rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        color: var(--muted-foreground);
        cursor: pointer;
        --simple-icon-height: 1rem;
        --simple-icon-width: 1rem;
      }
      .types button:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .types button[aria-current="true"] {
        background: var(--accent);
        color: var(--foreground);
        font-weight: 500;
      }
      .types .name {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .types .count {
        font-size: 0.75rem;
        color: var(--muted-foreground);
        font-weight: 400;
      }
      .types .new {
        margin-top: 0.25rem;
        font-size: 0.8125rem;
      }
      .no-icon {
        width: 1rem;
        height: 1rem;
        flex: none;
      }

      /* editor */
      .editor {
        overflow-y: auto;
        padding: 1.25rem 1.5rem 2rem;
      }
      section + section {
        margin-top: 1.75rem;
      }
      h3 {
        margin: 0 0 0.75rem;
        font-size: 0.875rem;
        font-weight: 600;
      }
      .row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 12rem auto;
        gap: 0.75rem;
        align-items: end;
      }
      label,
      .label {
        display: block;
        margin-bottom: 0.375rem;
        font-size: 0.8125rem;
        font-weight: 500;
      }
      .hint {
        margin: 0.375rem 0 0;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .input,
      textarea,
      select {
        box-sizing: border-box;
        width: 100%;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        font-size: 0.875rem;
      }
      textarea {
        height: auto;
        min-height: 4.5rem;
        padding: 0.5rem 0.75rem;
        resize: vertical;
      }
      .mono {
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.8125rem;
      }
      .input[readonly] {
        background: var(--muted);
        color: var(--muted-foreground);
      }
      .icon-choice {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        cursor: pointer;
        --simple-icon-height: 1rem;
        --simple-icon-width: 1rem;
      }
      .icon-choice:hover {
        background: var(--accent);
      }
      .radios {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem 1.25rem;
        font-size: 0.875rem;
      }
      .radios label,
      .check {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0;
        font-weight: 400;
        cursor: pointer;
      }
      input[type="radio"],
      input[type="checkbox"] {
        width: 1rem;
        height: 1rem;
        margin: 0;
        accent-color: var(--primary);
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        margin-top: 0.75rem;
      }
      .chip {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 1.75rem;
        padding: 0 0.625rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: 999px;
        font-size: 0.8125rem;
        cursor: pointer;
      }
      .chip[aria-pressed="true"] {
        border-color: var(--primary);
        background: color-mix(in oklch, var(--primary) 10%, transparent);
        color: var(--primary);
        font-weight: 500;
      }

      /* fields */
      .fields {
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        overflow: hidden;
      }
      .fhead,
      .field {
        display: grid;
        grid-template-columns: 1.5rem minmax(0, 1fr) 9.5rem 5rem 5rem 4rem;
        gap: 0.5rem;
        align-items: center;
        padding: 0.375rem 0.5rem;
      }
      .fhead {
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--muted-foreground);
        background: var(--muted);
        border-bottom: 1px solid var(--border);
      }
      .field + .field,
      .field + .more,
      .more + .field {
        border-top: 1px solid var(--border);
      }
      .field.over-before {
        box-shadow: inset 0 2px 0 var(--primary);
      }
      .field.over-after {
        box-shadow: inset 0 -2px 0 var(--primary);
      }
      .field .input,
      .field select {
        height: 2rem;
      }
      .grip {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 2rem;
        border-radius: var(--radius-sm);
        color: var(--muted-foreground);
        cursor: grab;
      }
      .center {
        display: flex;
        justify-content: center;
      }
      .acts {
        display: flex;
        justify-content: flex-end;
      }
      .icon-act {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .icon-act:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .icon-act.danger:hover {
        color: var(--destructive);
      }
      .icon-act[aria-expanded="true"] .lucide {
        transform: rotate(90deg);
      }
      .more {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
        padding: 0.75rem 0.75rem 0.875rem 2.5rem;
        background: color-mix(in oklch, var(--muted) 50%, transparent);
      }
      .more .wide {
        grid-column: 1 / -1;
      }
      .add {
        all: unset;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        height: 2.25rem;
        padding: 0 0.75rem;
        border-top: 1px solid var(--border);
        font-size: 0.8125rem;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .add:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .nofields {
        padding: 1rem;
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      .danger-zone {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding-top: 1.25rem;
        border-top: 1px solid var(--border);
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2.25rem;
        padding: 0 1rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        font-weight: 500;
        white-space: nowrap;
        cursor: pointer;
      }
      .btn.outline {
        border: 1px solid var(--input-border, var(--border));
        background: var(--background);
      }
      .btn.outline:hover {
        background: var(--accent);
      }
      .btn.primary {
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .btn.destructive {
        background: var(--destructive);
        color: var(--destructive-foreground, white);
      }
      .btn.danger-outline {
        border: 1px solid color-mix(in oklch, var(--destructive) 50%, transparent);
        color: var(--destructive);
      }
      .btn[aria-disabled="true"] {
        opacity: 0.5;
        cursor: default;
      }
      footer {
        flex: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border-top: 1px solid var(--border);
      }
      .status {
        flex: 1;
        min-width: 0;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .status.error {
        color: var(--destructive);
      }

      /* import / export panel */
      .io {
        position: absolute;
        inset: 0;
        z-index: 5;
        display: grid;
        place-items: center;
        background: rgb(0 0 0 / 0.3);
      }
      .io-box {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        width: min(40rem, calc(100% - 2rem));
        height: min(32rem, calc(100% - 2rem));
        padding: 1.25rem;
        box-sizing: border-box;
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
      }
      .io-box textarea {
        flex: 1;
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.75rem;
      }
      .io-foot {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
      }
      .empty-editor {
        display: grid;
        place-items: center;
        height: 100%;
        text-align: center;
        color: var(--muted-foreground);
        font-size: 0.875rem;
      }
    `}_renderTypeList(){return s`<nav class="types" aria-label="Content types">
      ${this._types.map((e,t)=>s`<button aria-current="${t===this._selected?"true":"false"}" @click="${()=>this._selected=t}">
          ${e.icon?s`<simple-icon-lite icon="${e.icon}"></simple-icon-lite>`:s`<span class="no-icon"></span>`}
          <span class="name">${e.label||"Untitled type"}</span>
          ${this._usage.get(e.id)?s`<span class="count" title="Pages of this type">${this._usage.get(e.id)}</span>`:""}
        </button>`)}
      <button class="new" @click="${this._addType}">${H("oer:plus","sm")}New type</button>
    </nav>`}_renderField(e,t,r){const i=`${e.id}:${r}`,o=this._expanded.has(i),n=this._dragField,l=n&&n.over===r&&n.from!==r?n.before?"over-before":"over-after":"";return s`<div
        class="field ${l}"
        @dragover="${d=>{if(!this._dragField)return;d.preventDefault();const c=d.currentTarget.getBoundingClientRect();this._dragField={...this._dragField,over:r,before:d.clientY<c.top+c.height/2}}}"
        @drop="${d=>{d.preventDefault();const c=this._dragField;c&&(this._update(p=>{const[h]=p.fields.splice(c.from,1);let m=c.over>c.from?c.over-1:c.over;c.before||m++,p.fields.splice(m,0,h)}),this._dragField=null)}}"
      >
        <button
          class="grip"
          draggable="true"
          title="Drag to reorder (or Alt+↑/↓)"
          aria-label="Reorder ${t.label||"field"}: Alt+Up or Alt+Down"
          @dragstart="${d=>{d.dataTransfer.effectAllowed="move",d.dataTransfer.setData("text/plain",String(r)),this._dragField={from:r,over:r,before:!0}}}"
          @dragend="${()=>this._dragField=null}"
          @keydown="${d=>{d.altKey&&(d.key==="ArrowUp"||d.key==="ArrowDown")&&(d.preventDefault(),this._moveField(r,d.key==="ArrowUp"?-1:1))}}"
        >
          ${H("oer:grip-vertical","sm")}
        </button>
        <input
          class="input field-label"
          placeholder="Field label"
          aria-label="Field label"
          .value="${t.label}"
          @input="${d=>this._setField(r,{label:d.target.value})}"
        />
        <select aria-label="Field kind" @change="${d=>this._setField(r,{kind:d.target.value})}">
          ${ea.map(d=>s`<option value="${d.kind}" ?selected="${d.kind===t.kind}">${d.label}</option>`)}
        </select>
        <div class="center">
          <input type="checkbox" aria-label="Required" .checked="${!!t.required}" @change="${d=>this._setField(r,{required:d.target.checked})}" />
        </div>
        <div class="center">
          <input type="checkbox" aria-label="Show in page header" .checked="${!!t.header}" @change="${d=>this._setField(r,{header:d.target.checked})}" />
        </div>
        <div class="acts">
          <button class="icon-act" aria-expanded="${o?"true":"false"}" title="More settings" aria-label="More settings for ${t.label||"field"}" @click="${()=>this._toggleExpanded(i)}">
            ${H("oer:chevron-right","sm")}
          </button>
          <button class="icon-act danger" title="Remove field" aria-label="Remove ${t.label||"field"}" @click="${()=>this._removeField(r)}">
            ${H("oer:trash-2","sm")}
          </button>
        </div>
      </div>
      ${o?s`<div class="more">
            <div>
              <label for="key-${r}">Key</label>
              <input
                id="key-${r}"
                class="input mono"
                .value="${t.name}"
                @input="${d=>this._setField(r,{name:d.target.value.replace(/[^A-Za-z0-9_]/g,""),__nameTouched:!0})}"
              />
              <p class="hint">Stored name of the value. Changing it hides values saved under the old key.</p>
            </div>
            <div>
              <label for="def-${r}">Default</label>
              <input id="def-${r}" class="input" .value="${t.default??""}" @input="${d=>this._setField(r,{default:d.target.value})}" />
              <p class="hint">Used when a page has no value (e.g. CC BY 4.0).</p>
            </div>
            <div>
              <label for="help-${r}">Help text</label>
              <input id="help-${r}" class="input" .value="${t.help||""}" @input="${d=>this._setField(r,{help:d.target.value})}" />
            </div>
            ${t.kind==="relation"?s`<div class="wide">
                  <span class="label">Can link to</span>
                  <div class="chips">
                    ${this._types.map(d=>{const c=(t.types||[]).includes(d.id);return s`<button
                        class="chip"
                        aria-pressed="${c?"true":"false"}"
                        @click="${()=>this._setField(r,{types:c?(t.types||[]).filter(p=>p!==d.id):[...t.types||[],d.id]})}"
                      >
                        ${c?H("oer:check","sm"):""}${d.label}
                      </button>`})}
                  </div>
                  <p class="hint">None selected: any page can be linked.</p>
                </div>`:""}
            ${t.kind==="select"?s`<div class="wide">
                  <label for="opts-${r}">Choices</label>
                  <textarea
                    id="opts-${r}"
                    .value="${(t.options||[]).map(d=>d.label&&d.label!==d.value?`${d.value} | ${d.label}`:d.value).join(`
`)}"
                    @change="${d=>this._setField(r,{options:d.target.value.split(`
`).map(c=>c.trim()).filter(Boolean).map(c=>{const[p,h]=c.split("|").map(m=>m.trim());return{value:p,label:h||p}})})}"
                  ></textarea>
                  <p class="hint">One per line. Use “value | Label” when the stored value differs from what people see.</p>
                  <label class="check" style="margin-top:0.5rem">
                    <input type="checkbox" .checked="${!!t.multiple}" @change="${d=>this._setField(r,{multiple:d.target.checked||void 0})}" />
                    Allow several choices
                  </label>
                </div>`:""}
            ${t.kind==="text"||t.kind==="list"?s`<div class="wide">
                  <label class="check">
                    <input type="checkbox" .checked="${!!t.suggest}" @change="${d=>this._setField(r,{suggest:d.target.checked||void 0})}" />
                    Pick from values other pages use
                  </label>
                  <p class="hint">A dropdown of the values already given, with a choice to add a new one (e.g. a resource's Kind).</p>
                </div>`:""}
          </div>`:""}`}_renderEditor(){const e=this._types[this._selected];if(!e)return s`<div class="empty-editor"><div><p>No content types yet.</p><button class="btn outline" @click="${this._addType}">${H("oer:plus","sm")}New type</button></div></div>`;const t=this._idLocked(e),r=this._usage.get(e.id)||0,i=e.children===null||e.children===void 0?"any":e.children.length||e.__only?"only":"none";return s`<div class="editor">
      <section>
        <div class="row">
          <div>
            <label for="type-label">Name</label>
            <input id="type-label" class="input" .value="${e.label}" @input="${o=>this._setLabel(o.target.value)}" />
          </div>
          <div>
            <label for="type-id">ID</label>
            <input
              id="type-id"
              class="input mono"
              .value="${e.id}"
              ?readonly="${t}"
              @input="${o=>this._update(n=>{n.id=ar(o.target.value),n.__idTouched=!0})}"
            />
          </div>
          <div>
            <span class="label">Icon</span>
            <button class="icon-choice" @click="${this._chooseIcon}" aria-label="Choose icon">
              ${e.icon?s`<simple-icon-lite icon="${e.icon}"></simple-icon-lite>`:H("oer:smile-plus")}${e.icon?"Change":"Choose"}
            </button>
          </div>
        </div>
        <div style="margin-top:1rem">
          <label for="type-schema">OER Schema class</label>
          <input
            id="type-schema"
            class="input mono"
            placeholder="e.g. oer:LearningComponent"
            .value="${e.schemaType||""}"
            @input="${o=>this._update(n=>n.schemaType=o.target.value.trim()||void 0)}"
          />
          <p class="hint">How pages of this type describe themselves to search engines and repositories (oerschema.org). Left empty, a sensible default is used.</p>
        </div>
        ${t?s`<p class="hint">The ID is fixed because ${r} page${r===1?" uses":"s use"} this type.</p>`:""}
        <div style="margin-top:1rem">
          <label for="type-desc">Description</label>
          <textarea id="type-desc" .value="${e.description||""}" @input="${o=>this._update(n=>n.description=o.target.value)}"></textarea>
        </div>
      </section>

      <section>
        <label class="check" style="font-size:0.875rem">
          <input type="checkbox" .checked="${e.nav!==!1}" @change="${o=>this._update(n=>n.nav=o.target.checked)}" />
          Show in the navigation
        </label>
        <p class="hint">Off: pages of this type (and everything under them) stay out of the sidebar, which then lists only the sections that hold them, as in Decap. Collections, search, links and the outline still find them.</p>
      </section>

      <section>
        <label class="check" style="font-size:0.875rem">
          <input type="checkbox" .checked="${!!e.reader}" @change="${o=>this._update(n=>n.reader=o.target.checked||void 0)}" />
          Reader layout
        </label>
        <p class="hint">Pages inside one of these read like a book: the sidebar shows only its chapters (with a filter), Previous / Next stays inside it, and it gets a “Start reading” button.</p>
      </section>

      <section>
        <h3>Can contain</h3>
        <div class="radios" role="radiogroup" aria-label="Can contain">
          <label><input type="radio" name="children" .checked="${i==="any"}" @change="${()=>this._setChildrenMode("any")}" />Any type</label>
          <label><input type="radio" name="children" .checked="${i==="only"}" @change="${()=>this._setChildrenMode("only")}" />Only these types</label>
          <label><input type="radio" name="children" .checked="${i==="none"}" @change="${()=>this._setChildrenMode("none")}" />Nothing</label>
        </div>
        ${i==="only"?s`<div class="chips">
              ${this._types.map(o=>s`<button class="chip" aria-pressed="${(e.children||[]).includes(o.id)?"true":"false"}" @click="${()=>this._toggleChild(o.id)}">
                  ${(e.children||[]).includes(o.id)?H("oer:check","sm"):""}${o.label||o.id}
                </button>`)}
            </div>`:""}
        <p class="hint">
          ${i==="any"?"Pages of this type can hold pages of any type.":i==="none"?"Pages of this type end the outline: no pages can go inside them.":"Add page and the outline builder only offer these types inside this one."}
        </p>
      </section>

      <section>
        <h3>Fields</h3>
        <div class="fields">
          <div class="fhead" aria-hidden="true">
            <span></span><span>Label</span><span>Kind</span><span style="text-align:center">Required</span><span style="text-align:center">In header</span><span></span>
          </div>
          ${e.fields.length?e.fields.map((o,n)=>this._renderField(e,o,n)):s`<div class="nofields">No fields yet. Every page also has a title, description and tags.</div>`}
          <button class="add" @click="${this._addField}">${H("oer:plus","sm")}Add field</button>
        </div>
        <p class="hint">“In header” fields show at the top of each page of this type.</p>
      </section>

      <section>
        <h3>Starter content</h3>
        <textarea
          class="mono"
          style="min-height:7rem"
          aria-label="Starter content (HTML)"
          .value="${e.template||""}"
          @input="${o=>this._update(n=>n.template=o.target.value)}"
        ></textarea>
        <div class="chips">
          ${bn.map(o=>s`<button class="chip" @click="${()=>this._update(n=>n.template=`${(n.template||"").trim()}
${o.html}`.trim())}">
              ${H("oer:plus","sm")}${o.label}
            </button>`)}
        </div>
        <p class="hint">What a new page of this type starts with (HTML; any blocks). Existing pages are not changed.</p>
      </section>

      <section class="danger-zone">
        <button class="btn danger-outline" aria-disabled="${r?"true":"false"}" @click="${this._deleteType}">${H("oer:trash-2","sm")}Delete type</button>
        <span>${r?`Used by ${r} page${r===1?"":"s"}; change their type first.`:"Not used by any page."}</span>
      </section>
    </div>`}_renderIO(){const e=this._io==="import";return s`<div class="io">
      <div class="io-box" role="dialog" aria-label="${e?"Import":"Export"} content types">
        <h3>${e?"Import content types":"Export content types"}</h3>
        <p class="hint" style="margin:0">
          ${e?"Paste definitions (JSON). Types with the same ID are replaced; others are added. Nothing is saved until you save the editor.":"Copy these definitions to reuse them in another site."}
        </p>
        <textarea .value="${this._ioText}" ?readonly="${!e}" @input="${t=>this._ioText=t.target.value}"></textarea>
        ${this._ioError?s`<p class="status error">${this._ioError}</p>`:""}
        <div class="io-foot">
          <button class="btn outline" @click="${()=>this._io=null}">${e?"Cancel":"Close"}</button>
          ${e?s`<button class="btn primary" @click="${this._import}">Import</button>`:s`<button class="btn primary" @click="${()=>globalThis.navigator.clipboard?.writeText(this._ioText)}">Copy</button>`}
        </div>
      </div>
    </div>`}render(){if(!this.open)return s``;const e=this._problems(),t=this._dirty;return s`
      <div class="backdrop" @click="${this._requestClose}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${H("hax:templates")}Content types</h2>
            <p class="sub">The kinds of page this site uses, their fields, and what each can contain.</p>
          </div>
          <button class="ghost" @click="${this._openImport}">${H("icons:file-upload","sm")}Import</button>
          <button class="ghost" @click="${this._openExport}">${H("icons:file-download","sm")}Export</button>
          <button class="ghost x" aria-label="Close" title="Close (Esc)" @click="${this._requestClose}">${H("oer:x")}</button>
        </header>
        <div class="body">${this._renderTypeList()}${this._renderEditor()}</div>
        <footer>
          ${this._confirm?s`<span class="status error">Discard your changes to content types?</span>
                <button class="btn outline" @click="${()=>this._confirm=!1}">Keep editing</button>
                <button class="btn destructive" @click="${this._close}">Discard</button>`:s`<span class="status ${e.length?"error":""}">
                  ${e.length?e[0]:t?"Unsaved changes.":`${this._types.length} type${this._types.length===1?"":"s"}.`}
                </span>
                <button class="btn outline" @click="${this._requestClose}">Cancel</button>
                <button class="btn primary" aria-disabled="${!t||e.length||this._saving?"true":"false"}" @click="${this._save}">
                  ${this._saving?"Saving\u2026":"Save content types"}
                </button>`}
        </footer>
        ${this._io?this._renderIO():""}
      </div>
    `}};customElements.define($t.tag,$t);const wn=()=>!!globalThis.document.querySelector("oer-icon-picker[open]");function xn(){const a=globalThis.document;return a.querySelector($t.tag)||a.body.appendChild(a.createElement($t.tag))}function hi(){const a=new URLSearchParams(globalThis.location.search).get("embed");return a==="1"||a==="true"}let Ft=null,D2=0,mi=null;function ui(a){try{globalThis.parent?.postMessage(JSON.stringify(a),"*")}catch{}}function gi(a){const e=Math.ceil(a.getBoundingClientRect().height)+24;Math.abs(e-D2)<5||(D2=e,ui({subject:"lti.frameResize",height:e}))}function Dn(a){globalThis.parent===globalThis||!a||(yn(),Ft=new ResizeObserver(()=>{clearTimeout(mi),mi=setTimeout(()=>gi(a),100)}),Ft.observe(a),gi(a),ui({subject:"lti.scrollToTop"}))}function yn(){Ft?.disconnect(),Ft=null,D2=0}function fi(a,e={}){const t=new URL(a||"",globalThis.document.baseURI);t.searchParams.set("embed","1");for(const[r,i]of Object.entries(e))i&&t.searchParams.set(r,"true");return t.href}const vi=()=>_(y.manifest?.items)||[];async function bi(a){const e=new URL(a.location,globalThis.document.baseURI),t=await fetch(e,{cache:"no-cache"});return t.ok?(await t.text()).replace(/<page-break\b[^>]*>(?:\s*<\/page-break>)?/gi,"").replace(/<oer-draft\b[^>]*>[\s\S]*?<\/oer-draft>/gi,""):""}async function wi(a,e){let t=await bi(a);const r=[...t.matchAll(/<oer-include\b([^>]*)>\s*<\/oer-include>/gi)];for(const i of r){const o=i[1].match(/\bpage="([^"]+)"/)?.[1],n=i[1].match(/\bversion="([^"]+)"/)?.[1],l=e.find(c=>c.id===o),d=l&&n?K(l.id,e).find(c=>c.version===n)?.snapshot:l;t=t.replace(i[0],d?await bi(d):"")}return t.replace(/<oer-collection\b[^>]*>\s*<\/oer-collection>/gi,"").trim()}async function xi(a){const e=vi(),t=e.find(o=>o.id===a),r=at(e.filter(o=>!be(o)&&o.metadata?.pageType!==te&&o.metadata?.published!==!1),a),i=[{item:t,depth:-1,html:await wi(t,e)}];for(const{item:o,depth:n}of r)i.push({item:o,depth:n,html:await wi(o,e)});return i}const kn=(()=>{const a=new Uint32Array(256);for(let e=0;e<256;e++){let t=e;for(let r=0;r<8;r++)t=t&1?3988292384^t>>>1:t>>>1;a[e]=t>>>0}return a})();function _n(a){let e=4294967295;for(let t=0;t<a.length;t++)e=kn[(e^a[t])&255]^e>>>8;return(e^4294967295)>>>0}function Di(a){const e=new TextEncoder,t=[],r=[];let i=0;for(const l of a){const d=e.encode(l.name),c=typeof l.data=="string"?e.encode(l.data):l.data,p=_n(c),h=new DataView(new ArrayBuffer(30));h.setUint32(0,67324752,!0),h.setUint16(4,20,!0),h.setUint16(6,2048,!0),h.setUint32(14,p,!0),h.setUint32(18,c.length,!0),h.setUint32(22,c.length,!0),h.setUint16(26,d.length,!0),t.push(h.buffer,d,c);const m=new DataView(new ArrayBuffer(46));m.setUint32(0,33639248,!0),m.setUint16(4,20,!0),m.setUint16(6,20,!0),m.setUint16(8,2048,!0),m.setUint32(16,p,!0),m.setUint32(20,c.length,!0),m.setUint32(24,c.length,!0),m.setUint16(28,d.length,!0),m.setUint32(42,i,!0),r.push(m.buffer,d),i+=30+d.length+c.length}const o=r.reduce((l,d)=>l+(d.byteLength??d.length),0),n=new DataView(new ArrayBuffer(22));return n.setUint32(0,101010256,!0),n.setUint16(8,a.length,!0),n.setUint16(10,a.length,!0),n.setUint32(12,o,!0),n.setUint32(16,i,!0),new Blob([...t,...r,n.buffer],{type:"application/zip"})}const N=a=>String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),yi=a=>String(a||"book").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"book";function ki(a,e){const t=URL.createObjectURL(a),r=Object.assign(globalThis.document.createElement("a"),{href:t,download:e});globalThis.document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(t),2e3)}const _i=`body{font:18px/1.6 system-ui,sans-serif;max-width:46rem;margin:2rem auto;padding:0 1rem;color:#111}
img,video{max-width:100%;height:auto}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ccc;padding:.4rem .6rem}
nav a{display:block;padding:.15rem 0}.meta{color:#555;font-size:.9rem}a{color:#0059a0}`;async function $n(a){const e=await xi(a),t=e[0].item,r=new URL(".",globalThis.document.baseURI).href,i=l=>`chapter-${String(l).padStart(2,"0")}.html`,o=e.slice(1).map((l,d)=>({name:i(d+1),data:`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${N(l.item.title)} \u2014 ${N(t.title)}</title><base href="${r}"><style>${_i}</style></head><body>
<p class="meta"><a href="index.html">${N(t.title)}</a></p><h1>${N(l.item.title)}</h1>${l.html}
<p class="meta">${d>0?`<a href="${i(d)}">\u2190 Previous</a> \xB7 `:""}${d+2<e.length?`<a href="${i(d+2)}">Next \u2192</a>`:""}</p></body></html>`})),n=e.slice(1).map((l,d)=>`<a href="${i(d+1)}" style="padding-left:${l.depth*1.25}rem">${N(l.item.title)}</a>`).join(`
`);o.unshift({name:"index.html",data:`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${N(t.title)}</title><base href="${r}"><style>${_i}</style></head><body>
<h1>${N(t.title)}</h1>${t.description?`<p>${N(t.description)}</p>`:""}${e[0].html}<h2>Contents</h2><nav>${n}</nav></body></html>`}),ki(Di(o),`${yi(t.title)}-html.zip`)}async function Fn(a){const e=vi(),t=e.find(c=>c.id===a),r=at(e.filter(c=>!be(c)&&c.metadata?.pageType!==te&&c.metadata?.published!==!1),a),i=[],o=[],n=(c,p)=>{const h=`WL${p}`;return i.push({name:`${h}.xml`,data:`<?xml version="1.0" encoding="UTF-8"?>
<webLink xmlns="http://www.imsglobal.org/xsd/imsccv1p3/imswl_v1p3"><title>${N(c.title)}</title><url href="${N(fi(c.slug))}" target="_iframe"/></webLink>`}),o.push(`<resource identifier="${h}" type="imswl_xmlv1p3"><file href="${h}.xml"/></resource>`),h};let l="",d=0;for(r.forEach(({item:c,depth:p},h)=>{for(;d>p;d--)l+="</item>";const m=n(c,h+1);r[h+1]?.depth>p?(l+=`<item identifier="F${h+1}"><title>${N(c.title)}</title><item identifier="I${h+1}" identifierref="${m}"><title>${N(c.title)}</title></item>`,d=p+1):l+=`<item identifier="I${h+1}" identifierref="${m}"><title>${N(c.title)}</title></item>`});d>0;d--)l+="</item>";i.unshift({name:"imsmanifest.xml",data:`<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="${N(t.id)}" xmlns="http://www.imsglobal.org/xsd/imsccv1p3/imscp_v1p1" xmlns:lomimscc="http://ltsc.ieee.org/xsd/imsccv1p3/LOM/manifest">
<metadata><schema>IMS Common Cartridge</schema><schemaversion>1.3.0</schemaversion>
<lomimscc:lom><lomimscc:general><lomimscc:title><lomimscc:string>${N(t.title)}</lomimscc:string></lomimscc:title></lomimscc:general></lomimscc:lom></metadata>
<organizations><organization identifier="O1" structure="rooted-hierarchy"><item identifier="root">${l}</item></organization></organizations>
<resources>${o.join("")}</resources>
</manifest>`}),ki(Di(i),`${yi(t.title)}.imscc`)}const Cn=`@media print {
  body > *:not(oer-book-print) { display: none !important; }
  oer-book-print { position: static !important; overflow: visible !important; background: #fff !important; }
}`;let Ct=class extends M{static get tag(){return"oer-book-print"}static get properties(){return{open:{type:Boolean,reflect:!0},_status:{state:!0}}}constructor(){super(),this.open=!1,this._status="",this.__keys=e=>{this.open&&e.key==="Escape"&&this._close()}}async show(e){if(!globalThis.document.getElementById("oer-print-css")){const d=Object.assign(globalThis.document.createElement("style"),{id:"oer-print-css",textContent:Cn});globalThis.document.head.append(d)}this.open=!0,this._status="Gathering chapters\u2026",globalThis.addEventListener("keydown",this.__keys,!0),this.replaceChildren();const t=await xi(e),[r,...i]=t,o=globalThis.document,n=o.createElement("section");n.className="oer-print-cover",n.innerHTML=`<h1>${r.item.title}</h1>${r.item.description?`<p>${r.item.description}</p>`:""}`;const l=o.createElement("nav");l.className="oer-print-toc",l.innerHTML=`<h2>Contents</h2><ol>${i.map(d=>`<li style="margin-left:${d.depth*1.25}rem">${d.item.title}</li>`).join("")}</ol>`,this.append(n,l);for(const d of i){const c=o.createElement("section");c.className="oer-print-chapter";const p=d.depth===0?"h1":"h2";c.innerHTML=`<${p}>${d.item.title}</${p}>${d.html}`,this.append(c)}this._status="",this.updateComplete.then(()=>this.shadowRoot.querySelector(".print")?.focus())}_close(){this.open=!1,globalThis.removeEventListener("keydown",this.__keys,!0),this.replaceChildren()}static get styles(){return b`
      :host {
        position: fixed;
        inset: 0;
        z-index: 10020;
        display: none;
        overflow-y: auto;
        background: var(--background, #fff);
        color: var(--foreground, #111);
        font-family: var(--font-sans, system-ui, sans-serif);
      }
      :host([open]) {
        display: block;
      }
      .bar {
        position: sticky;
        top: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border-bottom: 1px solid var(--border, #ddd);
        background: var(--background, #fff);
      }
      .bar span {
        flex: 1;
        font-size: 0.875rem;
        color: var(--muted-foreground, #555);
      }
      button {
        all: unset;
        height: 2.25rem;
        padding: 0 1rem;
        border-radius: var(--radius-md, 0.5rem);
        font: inherit;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
      }
      button:focus-visible {
        outline: 2px solid var(--ring, #2563eb);
        outline-offset: 2px;
      }
      .print {
        background: var(--primary, #0060a8);
        color: var(--primary-foreground, #fff);
      }
      .close {
        border: 1px solid var(--input-border, var(--border, #ddd));
      }
      .page {
        max-width: 46rem;
        margin: 0 auto;
        padding: 2rem 1.25rem 4rem;
        font-size: 1.0625rem;
        line-height: 1.6;
      }
      ::slotted(.oer-print-cover) {
        padding: 6rem 0 3rem;
        text-align: center;
      }
      ::slotted(.oer-print-chapter),
      ::slotted(.oer-print-toc) {
        break-before: page;
        padding-top: 1.5rem;
      }
      @media print {
        .bar {
          display: none;
        }
        .page {
          max-width: none;
          padding: 0;
        }
      }
    `}render(){return s`<div class="bar">
        <span role="status">${this._status||"Print, or choose \u201CSave as PDF\u201D in the print dialog."}</span>
        <button class="print" ?disabled="${!!this._status}" @click="${()=>globalThis.print()}">Print / Save as PDF</button>
        <button class="close" @click="${this._close}">Close</button>
      </div>
      <div class="page"><slot></slot></div>`}};customElements.define(Ct.tag,Ct);function En(){const a=globalThis.document;return a.querySelector(Ct.tag)||a.body.appendChild(a.createElement(Ct.tag))}const Mn=["CC BY 4.0","CC BY-SA 4.0","CC BY-NC 4.0","CC BY-NC-SA 4.0","CC BY-ND 4.0","CC BY-NC-ND 4.0","CC0 1.0","Public domain","All Rights Reserved"],$i=Object.fromEntries([["","\u2014"],...Mn.map(a=>[a,a])]);function ke(a){const e=String(a||"").trim();if(!e||/all rights reserved/i.test(e))return null;if(/^cc0/i.test(e))return{name:"CC0 1.0",url:"https://creativecommons.org/publicdomain/zero/1.0/",parts:["cc","zero"]};if(/^public domain$/i.test(e))return{name:"Public domain",url:"https://creativecommons.org/publicdomain/mark/1.0/",parts:["pd"]};const t=e.match(/^CC\s+([A-Z-]+)\s+(\d\.\d)$/i);if(!t)return{name:e,url:"",parts:[]};const r=t[1].toLowerCase();return{name:e,url:`https://creativecommons.org/licenses/${r}/${t[2]}/`,parts:["cc",...r.split("-")]}}const y2=a=>`https://mirrors.creativecommons.org/presskit/icons/${a}.svg`,Sn={small:"Small",medium:"Medium",large:"Large (full column)"};class X extends M{static get properties(){return{title:{type:String,reflect:!0},caption:{type:String,reflect:!0},credit:{type:String,reflect:!0},creditUrl:{type:String,attribute:"credit-url",reflect:!0},license:{type:String,reflect:!0},size:{type:String,reflect:!0}}}constructor(){super(),this.size="large"}static figureSettings(){return[{property:"title",title:"Title",description:"Describes the media for screen readers.",inputMethod:"textfield"},{property:"caption",title:"Caption",inputMethod:"textarea"},{property:"credit",title:"Credit",description:"Who made it, shown after the caption.",inputMethod:"textfield"},{property:"creditUrl",title:"Credit link",description:"Link to the original source.",inputMethod:"textfield",validationType:"url"},{property:"license",title:"License",description:"The media's own licence, if it differs from the page's. Listed in the page footer's credits.",inputMethod:"select",options:$i},{property:"size",title:"Size",inputMethod:"select",options:Sn}]}static get styles(){return b`
      :host {
        display: block;
        margin: 2rem auto;
        max-width: 100%;
      }
      :host([size="small"]) {
        max-width: 28rem;
      }
      :host([size="medium"]) {
        max-width: 40rem;
      }
      figure {
        margin: 0;
      }
      .media {
        position: relative;
        overflow: hidden;
        border: 1px solid var(--border, #e5e5e5);
        border-radius: var(--radius-lg, 0.75rem);
        background: color-mix(in oklch, var(--muted, #f4f4f5) 30%, transparent);
      }
      .media iframe,
      .media model-viewer {
        display: block;
        width: 100%;
        height: 100%;
        border: 0;
      }
      .ratio iframe,
      .ratio model-viewer {
        position: absolute;
        inset: 0;
      }
      /* editing: clicks select the block, not the embedded page */
      :host([data-hax-ray]) .media::after {
        content: "";
        position: absolute;
        inset: 0;
      }
      figcaption {
        margin-top: 0.5rem;
        text-align: center;
        font-size: 0.875rem;
        line-height: 1.5;
        color: var(--muted-foreground, #555);
      }
      figcaption a {
        color: var(--link, var(--primary, #0060a8));
      }
      .license {
        white-space: nowrap;
      }
      .license img {
        width: 1em;
        height: 1em;
        margin-right: 0.125em;
        vertical-align: -0.125em;
      }
      .license img:last-of-type {
        margin-right: 0.3em;
      }
      .empty {
        display: grid;
        place-items: center;
        gap: 0.25rem;
        min-height: 10rem;
        padding: 2rem;
        text-align: center;
        font-size: 0.875rem;
        color: var(--muted-foreground, #555);
      }
      .empty strong {
        color: var(--foreground, #111);
      }
    `}renderEmpty(e,t){return s`<div class="empty"><strong>No ${e} yet</strong><span>${t}</span></div>`}renderCaption(){if(!this.caption&&!this.credit&&!this.license)return"";const e=this.credit?this.creditUrl?s`<a href="${this.creditUrl}" target="_blank" rel="noopener noreferrer">${this.credit}</a>`:this.credit:"",t=ke(this.license),r=this.license?t?.url?s`<a class="license" href="${t.url}" target="_blank" rel="license noopener noreferrer"
            >${t.parts.map(i=>s`<img src="${y2(i)}" alt="" />`)}${t.name}</a
          >`:s`<span class="license">${this.license}</span>`:"";return s`<figcaption>
      ${this.caption}${this.caption&&(e||r)?s` &mdash; `:""}${e}${e&&r?", ":""}${r}
    </figcaption>`}renderMedia(){return""}get aspect(){return null}render(){const e=this.aspect,t=this.height?/^\d+$/.test(String(this.height))?`${this.height}px`:this.height:"";return s`<figure>
      <div class="media ${e?"ratio":""}" style="${e?`aspect-ratio:${e}`:t?`height:${t}`:""}">
        ${this.renderMedia()}
      </div>
      ${this.renderCaption()}
    </figure>`}}function Fi(a){try{const e=new URL(a),t=e.hostname.replace(/^www\./,"");if(t==="youtube.com"||t==="youtube-nocookie.com"||t==="m.youtube.com"){const r=e.searchParams.get("list"),i=e.searchParams.get("v");if(e.pathname.startsWith("/embed/videoseries")&&r)return`https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(r)}`;if(e.pathname.startsWith("/embed/"))return`https://www.youtube-nocookie.com${e.pathname}${e.search}`;if(e.pathname.startsWith("/shorts/"))return`https://www.youtube-nocookie.com/embed/${e.pathname.split("/")[2]}`;if(i)return`https://www.youtube-nocookie.com/embed/${i}${r?`?list=${encodeURIComponent(r)}`:""}`;if(r)return`https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(r)}`}if(t==="youtu.be"){const r=e.pathname.slice(1).split("/")[0];if(r)return`https://www.youtube-nocookie.com/embed/${r}`}}catch{}return null}function Ci(a){const e=String(a||"").match(/vimeo\.com\/(?:video\/)?(\d+)/);return e?`https://player.vimeo.com/video/${e[1]}`:null}function An(a){const e=String(a||"").trim();return Fi(e)||Ci(e)||e}function Tn(a){let e=String(a||"").trim();if(!e)return"";if(e.includes("docs.google.com")){const t=e.match(/\/d\/(?:e\/)?([a-zA-Z0-9-_]+)/);t&&(e=t[1])}return e.startsWith("2PACX")?`https://docs.google.com/presentation/d/e/${e}/pubembed?start=false&loop=false&delayms=3000`:`https://docs.google.com/presentation/d/${e}/embed?start=false&loop=false&delayms=3000`}function zn(a){const e=String(a||"").trim();if(!e)return"";if(e.includes("/embed"))return e;let t="";return e.includes("/3d-models/")?t=(e.split("/").pop()||"").match(/([a-f0-9]{32})/)?.[1]||"":e.includes("/models/")?t=(e.split("/models/")[1]||"").split(/[?#/]/)[0]:/^[a-f0-9]{32}$/.test(e)&&(t=e),t?`https://sketchfab.com/models/${t}/embed?autostart=1&ui_theme=dark`:e}const Ei=new Map;function k2(){const a=globalThis.HaxStore?.requestAvailability?.();if(!a||!a.appStoreLoaded)return!1;for(const[e,t]of Ei)a.elementList?.[e]||a.setHaxProperties(t.haxProperties,e);return!0}let Mi=!1;function jn(){if(Mi)return;Mi=!0,globalThis.addEventListener("hax-store-app-store-loaded",()=>setTimeout(k2,0));const a=setInterval(()=>{k2()&&clearInterval(a)},1e3)}function ae(...a){for(const e of a)Ei.set(e.tag,e);jn(),k2()}const He=(a,e,t,r)=>({title:a,description:e,icon:t,color:"blue",tags:r,meta:{author:"Michael Collins"}}),Si={fromAttribute:a=>a!=="false",toAttribute:a=>a?"":"false"},Ai="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";class Ti extends X{static get tag(){return"oer-iframe"}static get properties(){return{...super.properties,src:{type:String,reflect:!0},height:{type:String,reflect:!0}}}constructor(){super(),this.height="600"}get _video(){return Fi(this.src)||Ci(this.src)}get aspect(){return this._video?"16 / 9":null}renderMedia(){return this.src?s`<iframe
      src="${this._video||this.src}"
      title="${this.title||"Embedded page"}"
      allow="${Ai}"
      allowfullscreen
      loading="lazy"
      credentialless
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>`:this.renderEmpty("page","Set the address in the block settings.")}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:He("Embedded page","Show another web page (or a YouTube / Vimeo video) with a caption and credit.","hax:iframe",["Media","iframe","embed","website"]),settings:{configure:[{property:"src",title:"Address",description:"The page to show. YouTube and Vimeo links play as video.",inputMethod:"textfield",validationType:"url",required:!0},{property:"height",title:"Height",description:"In pixels (ignored for videos, which use 16:9).",inputMethod:"textfield"},...X.figureSettings()],advanced:[]},demoSchema:[{tag:"oer-iframe",properties:{src:"https://www.openstreetmap.org/export/embed.html",title:"Map",height:"400"},content:""}]}}}class zi extends X{static get tag(){return"oer-video"}static get properties(){return{...super.properties,src:{type:String,reflect:!0}}}get aspect(){return"16 / 9"}renderMedia(){return this.src?s`<iframe src="${An(this.src)}" title="${this.title||"Video"}" allow="${Ai}" allowfullscreen loading="lazy" credentialless referrerpolicy="strict-origin-when-cross-origin"></iframe>`:this.renderEmpty("video","Paste a YouTube or Vimeo link in the block settings.")}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:He("Video (with credit)","YouTube or Vimeo video with a caption and credit line.","hax:video",["Media","video","youtube","vimeo"]),settings:{configure:[{property:"src",title:"Video link",description:"A YouTube (video or playlist) or Vimeo link.",inputMethod:"textfield",validationType:"url",required:!0},...X.figureSettings()],advanced:[]},demoSchema:[{tag:"oer-video",properties:{src:"https://www.youtube.com/watch?v=uDqjIdI4bF4",title:"The 12 principles of animation"},content:""}]}}}class ji extends X{static get tag(){return"oer-google-slides"}static get properties(){return{...super.properties,slides:{type:String,reflect:!0}}}get aspect(){return"960 / 569"}renderMedia(){return this.slides?s`<iframe src="${Tn(this.slides)}" title="${this.title||"Presentation"}" allowfullscreen loading="lazy" credentialless referrerpolicy="strict-origin-when-cross-origin"></iframe>`:this.renderEmpty("slides","Paste the presentation link or ID in the block settings.")}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:He("Google Slides","A Google Slides presentation, with a caption and credit.","image:slideshow",["Media","slides","presentation","google"]),settings:{configure:[{property:"slides",title:"Presentation",description:"The presentation's link (Share or Publish to web) or its ID.",inputMethod:"textfield",required:!0},...X.figureSettings()],advanced:[]},demoSchema:[{tag:"oer-google-slides",properties:{slides:"",title:"Presentation"},content:""}]}}}class Bi extends X{static get tag(){return"oer-sketchfab"}static get properties(){return{...super.properties,src:{type:String,reflect:!0},height:{type:String,reflect:!0}}}constructor(){super(),this.height="600"}renderMedia(){return this.src?s`<iframe
      src="${zn(this.src)}"
      title="${this.title||"Sketchfab model"}"
      allow="autoplay; fullscreen; xr-spatial-tracking"
      allowfullscreen
      loading="lazy"
      credentialless
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>`:this.renderEmpty("model","Paste the Sketchfab model link in the block settings.")}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:He("Sketchfab model","An interactive 3D model from Sketchfab, with a caption and credit.","hax:module",["Media","3d","sketchfab","model"]),settings:{configure:[{property:"src",title:"Model link",description:"The model's Sketchfab page link (or its ID).",inputMethod:"textfield",required:!0},{property:"height",title:"Height",description:"In pixels.",inputMethod:"textfield"},...X.figureSettings()],advanced:[]},demoSchema:[{tag:"oer-sketchfab",properties:{src:"",title:"3D model",height:"500"},content:""}]}}}function Ne(){customElements.get("model-viewer")||Ne.started||(Ne.started=!0,import(`${globalThis.WCGlobalBasePath||new URL("build/es6/node_modules/",globalThis.document.baseURI).href}@google/model-viewer/dist/model-viewer.js`).catch(()=>{Ne.started=!1}))}class Li extends X{static get tag(){return"oer-3d-viewer"}static get properties(){return{...super.properties,src:{type:String,reflect:!0},height:{type:String,reflect:!0},autoRotate:{type:Boolean,attribute:"auto-rotate",reflect:!0,converter:Si},cameraControls:{type:Boolean,attribute:"camera-controls",reflect:!0,converter:Si}}}constructor(){super(),this.height="600",this.autoRotate=!0,this.cameraControls=!0}renderMedia(){return this.src?(Ne(),s`<model-viewer
      src="${this.src}"
      alt="${this.title||"3D model"}"
      ?auto-rotate="${this.autoRotate}"
      ?camera-controls="${this.cameraControls}"
      shadow-intensity="1"
      camera-orbit="45deg 55deg 2.5m"
      min-camera-orbit="auto auto 5%"
      max-camera-orbit="auto auto 100%"
    ></model-viewer>`):this.renderEmpty("3D model","Upload or link a .glb or .gltf file in the block settings.")}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:He("3D model viewer","Show a .glb / .gltf model people can rotate and zoom, with a caption and credit.","hax:module",["Media","3d","model","gltf"]),settings:{configure:[{property:"src",title:"Model file",description:"A .glb or .gltf file.",inputMethod:"haxupload",required:!0},{property:"height",title:"Height",description:"In pixels.",inputMethod:"textfield"},{property:"autoRotate",title:"Rotate slowly",inputMethod:"boolean"},{property:"cameraControls",title:"Let people rotate and zoom",inputMethod:"boolean"},...X.figureSettings()],advanced:[]},demoSchema:[{tag:"oer-3d-viewer",properties:{src:"",title:"3D model",height:"500",autoRotate:!0,cameraControls:!0},content:""}]}}}for(const a of[Ti,zi,ji,Bi,Li])customElements.get(a.tag)||customElements.define(a.tag,a);ae(Ti,zi,ji,Bi,Li);const _e=(a,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${S[a]||""}&quot;)"></span>`,Ii={image:["png","jpg","jpeg","gif","webp","svg","avif"],pdf:["pdf"],video:["mp4","webm","mov","m4v","ogv"],audio:["mp3","wav","ogg","oga","m4a","aac","flac"],text:["txt","md","csv","tsv","json","xml","yml","yaml","js","mjs","ts","css","html","py","c","cpp","h","java","glsl","srt","vtt"],model:["glb","gltf"],docx:["docx"]},_2=2e5,Bn="https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js",Et=a=>String(a||"").split(/[?#]/)[0].split("/").pop().split(".").slice(1).pop()?.toLowerCase()||"";function Mt(a){const e=Et(a);return Object.keys(Ii).find(t=>Ii[t].includes(e))||""}const Ln=a=>/^https?:\/\//i.test(a)&&!a.startsWith(globalThis.location.origin);let $2=null;function In(){return globalThis.mammoth?Promise.resolve(globalThis.mammoth):($2||=new Promise((a,e)=>{const t=Object.assign(globalThis.document.createElement("script"),{src:Bn,async:!0});t.onload=()=>a(globalThis.mammoth),t.onerror=()=>{$2=null,e(new Error("Could not load the Word document viewer"))},globalThis.document.head.append(t)}),$2)}let St=class extends M{static get tag(){return"oer-file-preview"}static get properties(){return{open:{type:Boolean,reflect:!0},_index:{state:!0},_body:{state:!0}}}constructor(){super(),this.open=!1,this._files=[],this._index=0,this.__keys=e=>{if(this.open){if(e.key==="Escape")this._close();else if(e.key==="ArrowRight"&&this._files.length>1&&!this._typing(e))this._go(1);else if(e.key==="ArrowLeft"&&this._files.length>1&&!this._typing(e))this._go(-1);else if(e.key==="Tab")this._trapFocus(e);else return;e.key!=="Tab"&&(e.preventDefault(),e.stopPropagation())}}}show(e,t=0){this._files=(e||[]).filter(r=>r?.url),this._files.length&&(this._returnFocus=globalThis.document.activeElement,this.open=!0,this._load(Math.max(0,Math.min(t,this._files.length-1))),globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector(".x")?.focus()))}_close(){this.open=!1,this._body=null,globalThis.removeEventListener("keydown",this.__keys,!0),this._returnFocus?.focus?.()}_typing(e){return e.composedPath().some(t=>t?.localName==="model-viewer"||t?.localName==="video"||t?.localName==="audio")}_trapFocus(e){const t=[...this.shadowRoot.querySelectorAll("button, a[href], video, audio, iframe, model-viewer")].filter(o=>!o.disabled);if(!t.length)return;const r=this.shadowRoot.activeElement,i=t.indexOf(r);e.shiftKey&&i<=0?(e.preventDefault(),t.at(-1).focus()):!e.shiftKey&&i===t.length-1&&(e.preventDefault(),t[0].focus())}_go(e){this._load((this._index+e+this._files.length)%this._files.length)}async _load(e){this._index=e,this._body=null;const t=this._files[e],r=Mt(t.url),i=this.__token={};try{if(r==="model"&&Ne(),r==="text"){const o=await fetch(t.url);if(!o.ok)throw new Error(`Could not load the file (${o.status})`);const n=await o.text();i===this.__token&&(this._body={text:n.length>_2?`${n.slice(0,_2)}
\u2026`:n,cut:n.length>_2})}if(r==="docx"){const[o,n]=await Promise.all([In(),fetch(t.url).then(d=>d.ok?d.arrayBuffer():Promise.reject(new Error(`Could not load the file (${d.status})`)))]),l=await o.convertToHtml({arrayBuffer:n});i===this.__token&&(this._body={html:l.value})}}catch(o){i===this.__token&&(this._body={error:o.message||String(o)})}}static get styles(){return b`
      :host {
        position: fixed;
        inset: 0;
        z-index: 10001;
        display: none;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
      }
      :host([open]) {
        display: grid;
        place-items: center;
      }
      .backdrop {
        position: absolute;
        inset: 0;
        background: rgb(0 0 0 / 0.75);
      }
      .dialog {
        position: relative;
        display: flex;
        flex-direction: column;
        width: min(72rem, calc(100vw - 2rem));
        height: min(48rem, calc(100dvh - 2rem));
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.3);
        overflow: hidden;
      }
      button,
      a {
        font: inherit;
        color: inherit;
      }
      :focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .lucide {
        flex: none;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.625rem 0.625rem 0.625rem 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      .heading {
        flex: 1;
        min-width: 0;
      }
      h2 {
        margin: 0;
        font-size: 0.9375rem;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .sub {
        margin: 0.125rem 0 0;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .btn,
      .x,
      .nav {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.375rem;
        height: 2.25rem;
        border-radius: var(--radius-md);
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 500;
      }
      .btn {
        padding: 0 0.875rem;
        border: 1px solid var(--input-border, var(--border));
      }
      .btn.primary {
        border-color: transparent;
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .x {
        width: 2.25rem;
        color: var(--muted-foreground);
      }
      .btn:not(.primary):hover,
      .x:hover {
        background: var(--accent);
      }
      .btn:focus-visible,
      .x:focus-visible,
      .nav:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .stage {
        position: relative;
        flex: 1;
        min-height: 0;
        display: grid;
        place-items: center;
        background: color-mix(in srgb, var(--muted) 60%, var(--background));
      }
      .stage img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
      .stage iframe,
      .stage model-viewer {
        width: 100%;
        height: 100%;
        border: 0;
        background: var(--background);
      }
      .stage video {
        max-width: 100%;
        max-height: 100%;
      }
      .stage audio {
        width: min(32rem, 90%);
      }
      .doc,
      pre {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        margin: 0;
        overflow: auto;
        background: var(--background);
      }
      pre {
        padding: 1rem 1.25rem;
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.8125rem;
        line-height: 1.55;
        white-space: pre-wrap;
        word-break: break-word;
      }
      .doc {
        padding: 1.5rem clamp(1rem, 6vw, 4rem);
        font-size: 0.9375rem;
        line-height: 1.65;
        text-align: start;
      }
      .doc img {
        max-width: 100%;
        height: auto;
      }
      .doc h1 {
        font-size: 1.25rem;
      }
      .doc h2 {
        font-size: 1.125rem;
      }
      .doc h3,
      .doc h4 {
        font-size: 1rem;
      }
      .doc :is(h1, h2, h3, h4) {
        margin: 1.5em 0 0.5em;
        line-height: 1.3;
      }
      .doc table {
        width: 100%;
        border-collapse: collapse;
        margin: 0.5rem 0 1rem;
      }
      .doc td,
      .doc th {
        border: 1px solid var(--border);
        padding: 0.375rem 0.625rem;
        height: 1.75rem;
        vertical-align: top;
      }
      .note {
        display: grid;
        justify-items: center;
        gap: 0.75rem;
        padding: 2rem;
        text-align: center;
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      .note .big {
        width: 2rem;
        height: 2rem;
      }
      .nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 999px;
        background: var(--background);
        border: 1px solid var(--border);
        box-shadow: 0 1px 3px rgb(0 0 0 / 0.15);
      }
      .nav.prev {
        left: 0.75rem;
      }
      .nav.next {
        right: 0.75rem;
      }
      .nav:hover {
        background: var(--accent);
      }
      footer {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.625rem 1.25rem;
        border-top: 1px solid var(--border);
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      footer .desc {
        flex: 1;
        min-width: 0;
      }
      @media (max-width: 480px) {
        header .btn .label {
          display: none;
        }
      }
    `}_renderStage(e){const t=Mt(e.url),r=this._body,i=e.title||e.url.split("/").pop();if(r?.error)return s`<div class="note">${_e("icons:error","big")}<span>${r.error}</span></div>`;switch(t){case"image":return s`<img src="${e.url}" alt="${e.alt||i}" />`;case"pdf":return s`<iframe src="${e.url}" title="${i}" credentialless referrerpolicy="strict-origin-when-cross-origin"></iframe>`;case"video":return s`<video src="${e.url}" controls preload="metadata" aria-label="${i}"></video>`;case"audio":return s`<audio src="${e.url}" controls preload="metadata" aria-label="${i}"></audio>`;case"model":return s`<model-viewer src="${e.url}" alt="${e.alt||i}" camera-controls touch-action="pan-y" shadow-intensity="1"></model-viewer>`;case"text":return r?s`<pre tabindex="0" aria-label="${i}">${r.text}</pre>`:s`<div class="note">Loading…</div>`;case"docx":return r?s`<div class="doc" tabindex="0" aria-label="${i}" .innerHTML="${r.html}"></div>`:s`<div class="note">Converting the document…</div>`;default:return s`<div class="note">
          ${_e("icons:insert-drive-file","big")}
          <span>No preview for ${Et(e.url)?`.${Et(e.url)} files`:"this link"}. Download it to open it.</span>
        </div>`}}render(){if(!this.open)return s``;const e=this._files[this._index];if(!e)return s``;const t=e.title||e.url.split("/").pop(),r=Ln(e.url),i=this._files.length>1;return s`
      <div class="backdrop" @click="${this._close}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${t}</h2>
            <p class="sub">${Et(e.url).toUpperCase()||"Link"}${i?` \xB7 ${this._index+1} of ${this._files.length}`:""}</p>
          </div>
          <a class="btn" href="${e.url}" target="_blank" rel="noopener noreferrer" title="Open in a new tab">${_e("icons:open-in-new")}<span class="label">Open</span></a>
          ${r?"":s`<a class="btn primary" href="${e.url}" download>${_e("icons:file-download")}<span class="label">Download</span></a>`}
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._close}">${_e("oer:x")}</button>
        </header>
        <div class="stage">
          ${this._renderStage(e)}
          ${i?s`<button class="nav prev" aria-label="Previous file" title="Previous (←)" @click="${()=>this._go(-1)}">${_e("oer:chevron-left")}</button>
                <button class="nav next" aria-label="Next file" title="Next (→)" @click="${()=>this._go(1)}">${_e("oer:chevron-right")}</button>`:""}
        </div>
        ${e.description||this._body?.cut?s`<footer><span class="desc">${e.description||""}</span>${this._body?.cut?s`<span>Showing the start of the file.</span>`:""}</footer>`:""}
      </div>
    `}};customElements.define(St.tag,St);function Rn(){const a=globalThis.document;return a.querySelector(St.tag)||a.body.appendChild(a.createElement(St.tag))}const Ae="oer:project",Ri="oer:activity",qn=a=>[...a].sort((e,t)=>(Number(e.order)||0)-(Number(t.order)||0));function Ue(a,e){const t=qn((e||[]).filter(n=>n.parent===a&&!n.metadata?.oerSnapshotOf)),r=[];let i="",o=0;for(const n of t){if(ve(n)){i=n.title;continue}if(n.metadata?.hideInMenu)continue;const l=n.metadata?.pageType===Ri;l&&o++,r.push({item:n,activity:l,step:l?o:0,stage:i})}return r}function qi(a,e){if(!a?.parent||a.metadata?.pageType!==Ri)return null;const t=(e||[]).find(o=>o.id===a.parent);if(t?.metadata?.pageType!==Ae)return null;const r=Ue(t.id,e),i=r.find(o=>o.item.id===a.id);return i?{project:t,step:i.step,total:r.filter(o=>o.activity).length,stage:i.stage}:null}const Ve=(a,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${S[a]||""}&quot;)"></span>`,$e=()=>_(y.manifest?.items)||[],At=a=>a&&!a.metadata?.oerSnapshotOf&&(y.isLoggedIn||a.metadata?.published!==!1),Pn="oer:unit",Pi="oer:lesson",On="oer:section",F2="oer:heading",Hn=[Pe,Pn,Pi,Ae],Tt=(a,e)=>a?.metadata?.oerRef?.page&&e.find(t=>t.id===a.metadata.oerRef.page)||a,C2=(a,e)=>e.filter(t=>t.parent===a&&At(t)&&(!t.metadata?.hideInMenu||t.metadata?.pageType===F2)).sort((t,r)=>(Number(t.order)||0)-(Number(r.order)||0));function Oi(a,e=$e()){if(!a)return null;const t=Tt(a,e);return t!==a&&C2(a.id,e).length?a:t}function Hi(a,e=$e()){const t=Oi(a,e);return Hn.includes(Tt(t,e)?.metadata?.pageType)?!!Ni(t.id,e)?.sections.some(r=>r.entries.length||r.id):!1}function Ni(a,e=$e()){const t=B(e).types,r=e.find(c=>c.id===a);if(!r)return null;const i=c=>t.find(p=>p.id===c?.metadata?.pageType),o=(c,p={})=>{const h=i(Tt(c,e));return{id:c.id,title:c.title,typeLabel:h?.label||"",icon:h?.icon||"",step:0,...p}},n=c=>{const p=Tt(c,e),h=p?.metadata?.pageType;return h===Pi?(p.metadata?.oerFields?.components||[]).map(m=>e.find(v=>v.id===m?.page)).filter(At).map(m=>o(m)):h===Ae?Ue(p.id,e).filter(m=>At(m.item)).map(m=>o(m.item,{step:m.step,typeLabel:[i(m.item)?.label,m.stage].filter(Boolean).join(" \xB7 ")})):[]},l=(c,p={})=>({...o(c,p),children:n(c)});if(r.metadata?.pageType===Pe){const c=di(r,e,t);return{root:r,sections:c.modules.map(p=>({title:p.title,id:p.href?p.id:"",entries:p.items.filter(h=>!h.planned&&!h.missing).map((h,m)=>{const v=e.find(u=>u.id===h.id);return{...l(v,{step:m+1}),typeLabel:h.typeLabel,title:h.title}})}))}}if(r.metadata?.pageType===Ae){const c=[];for(const p of Ue(r.id,e).filter(h=>At(h.item)))(!c.length||c.at(-1).title!==p.stage)&&c.push({title:p.stage,id:"",entries:[]}),c.at(-1).entries.push({...o(p.item,{step:p.step}),children:[]});return{root:r,sections:c}}const d=C2(r.id,e);if(d.length){const c=[{title:"",id:"",entries:[]}];for(const p of d){const h=p.metadata?.pageType,m=C2(p.id,e);h===F2?c.push({title:p.title,id:"",entries:[]}):(h===On||!h)&&m.length&&!p.metadata?.oerRef?.page?(c.push({title:p.title,id:"",entries:m.filter(v=>v.metadata?.pageType!==F2).map(v=>l(v))}),c.push({title:"",id:"",entries:[]})):c.at(-1).entries.push(l(p))}return{root:r,sections:c.filter(p=>p.entries.length)}}return{root:r,sections:[{title:"",id:"",entries:n(r).map(c=>({...c,children:[]}))}]}}let Ke=class extends M{static get tag(){return"oer-outline-viewer"}static get properties(){return{_outline:{state:!0},_current:{state:!0},_open:{state:!0},_version:{state:!0},_loading:{state:!0},_error:{state:!0},_showContents:{state:!0}}}constructor(){super(),this._outline=null,this._current="",this._open=new Set,this._version="",this._loading=!1,this._error="",this._showContents=!1,this.__load=0}static get styles(){return b`
      :host {
        display: contents;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
      }
      dialog {
        box-sizing: border-box;
        width: min(80rem, calc(100vw - 2rem));
        height: calc(100dvh - 2rem);
        max-width: none;
        max-height: none;
        padding: 0;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg, 0.75rem);
        background: var(--background);
        color: var(--foreground);
        box-shadow: 0 24px 64px rgb(0 0 0 / 0.28);
        overflow: hidden;
      }
      dialog::backdrop {
        background: rgb(0 0 0 / 0.6);
      }
      .frame {
        display: grid;
        grid-template-columns: minmax(16rem, 22rem) 1fr;
        height: 100%;
      }
      aside {
        display: flex;
        flex-direction: column;
        min-height: 0;
        border-right: 1px solid var(--border);
        background: var(--muted-bg, color-mix(in srgb, var(--muted) 45%, var(--background)));
      }
      .head {
        padding: 1.25rem 1.25rem 1rem;
        border-bottom: 1px solid var(--border);
      }
      .type {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--muted-foreground);
      }
      .type simple-icon-lite {
        --simple-icon-width: 0.875rem;
        --simple-icon-height: 0.875rem;
      }
      h2 {
        margin: 0.25rem 0 0;
        font-size: 1.25rem;
        line-height: 1.3;
        letter-spacing: -0.01em;
      }
      .desc {
        margin: 0.5rem 0 0;
        font-size: 0.8125rem;
        line-height: 1.5;
        color: var(--muted-foreground);
      }
      nav {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        padding: 0.75rem;
      }
      nav h3 {
        margin: 1rem 0.5rem 0.25rem;
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--muted-foreground);
      }
      nav ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      nav ul ul {
        margin: 0.125rem 0 0.25rem 1.75rem;
        padding-left: 0.5rem;
        border-left: 1px solid var(--border);
      }
      .row {
        display: flex;
        align-items: flex-start;
        gap: 0.125rem;
      }
      .entry {
        flex: 1;
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        min-width: 0;
        padding: 0.4375rem 0.5rem;
        border: 0;
        border-radius: var(--radius-md, 0.5rem);
        background: transparent;
        color: inherit;
        font: inherit;
        font-size: 0.875rem;
        line-height: 1.4;
        text-align: start;
        cursor: pointer;
      }
      .entry:hover {
        background: var(--accent, var(--muted));
      }
      .entry[aria-current="true"] {
        background: var(--accent, var(--muted));
        font-weight: 600;
      }
      .entry .label {
        flex: 1;
        min-width: 0;
      }
      .entry small {
        display: block;
        font-weight: 400;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .num {
        flex: none;
        display: inline-grid;
        place-items: center;
        min-width: 1.375rem;
        height: 1.375rem;
        border: 1px solid var(--border);
        border-radius: 999px;
        background: var(--background);
        font-size: 0.75rem;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
      }
      .entry simple-icon-lite,
      .entry .noicon {
        flex: none;
        width: 1.375rem;
        height: 1.375rem;
        --simple-icon-width: 0.875rem;
        --simple-icon-height: 0.875rem;
        color: var(--muted-foreground);
      }
      .toggle,
      .icon-btn {
        flex: none;
        display: inline-grid;
        place-items: center;
        width: 2rem;
        height: 2rem;
        border: 0;
        border-radius: var(--radius-md, 0.5rem);
        background: transparent;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .toggle:hover,
      .icon-btn:hover {
        background: var(--accent, var(--muted));
        color: var(--foreground);
      }
      .toggle[aria-expanded="true"] .lucide {
        transform: rotate(90deg);
      }
      main {
        display: flex;
        flex-direction: column;
        min-width: 0;
        min-height: 0;
      }
      .bar {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        min-height: 3.25rem;
        padding: 0.5rem 0.75rem 0.5rem 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      .crumbs {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
        margin: 0;
        padding: 0;
        list-style: none;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .crumbs li + li::before {
        content: "›";
        margin-right: 0.25rem;
      }
      .crumbs li:last-child {
        color: var(--foreground);
        font-weight: 500;
      }
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2rem;
        padding: 0 0.75rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md, 0.5rem);
        background: var(--background);
        color: inherit;
        font: inherit;
        font-size: 0.8125rem;
        font-weight: 500;
        text-decoration: none;
        white-space: nowrap;
        cursor: pointer;
      }
      .btn:hover {
        background: var(--accent, var(--muted));
      }
      select.btn {
        padding-right: 0.5rem;
      }
      .btn.contents-btn {
        display: none;
      }
      .scroll {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
      }
      .page {
        max-width: 46rem;
        margin: 0 auto;
        padding: 1.5rem 1.5rem 2rem;
      }
      /* long words and links wrap rather than scroll sideways */
      ::slotted(.oer-reading) {
        overflow-wrap: anywhere;
      }
      .page-type {
        margin-bottom: 0.25rem;
      }
      .page h2 {
        margin: 0 0 0.5rem;
        font-size: 1.75rem;
        letter-spacing: -0.02em;
      }
      .status {
        padding: 2rem 0;
        color: var(--muted-foreground);
      }
      .pager {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 1px solid var(--border);
      }
      .pager a,
      .pager button {
        display: inline-flex;
        flex-direction: column;
        gap: 0.125rem;
        max-width: 48%;
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md, 0.5rem);
        background: var(--background);
        color: inherit;
        font: inherit;
        font-size: 0.875rem;
        text-align: start;
        cursor: pointer;
      }
      .pager button:hover {
        background: var(--accent, var(--muted));
      }
      .pager .next {
        margin-left: auto;
        text-align: end;
        align-items: flex-end;
      }
      .pager small {
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      :focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .lucide {
        flex: none;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
      /* narrow screens: the outline is a "Contents" panel above the page */
      @media (max-width: 767px) {
        dialog {
          width: 100vw;
          height: 100dvh;
          border: 0;
          border-radius: 0;
        }
        .frame {
          position: relative;
          grid-template-columns: 1fr;
        }
        /* the outline opens below the toolbar, over the page */
        aside {
          display: none;
          position: absolute;
          inset: 3.25rem 0 0;
          z-index: 2;
          border-right: 0;
          background: var(--background);
        }
        aside.shown {
          display: flex;
        }
        .btn.contents-btn {
          display: inline-flex;
        }
        .crumbs {
          display: none;
        }
        .bar {
          padding-left: 0.75rem;
        }
        .page {
          padding: 1rem;
        }
      }
    `}show(e,{item:t="",version:r=""}={}){const i=$e(),o=Oi(i.find(d=>d.id===e),i)?.id||e;if(this._outline=Ni(o,i),!this._outline)return;let n=globalThis.document.activeElement;for(;n?.shadowRoot?.activeElement;)n=n.shadowRoot.activeElement;this._returnFocus=n,this._showContents=!1;const l=this._flat().some(d=>d.id===t)?t:o;this._open=new Set(this._outline.sections.flatMap(d=>d.entries).filter(d=>d.children.some(c=>c.id===l)||d.id===l).map(d=>d.id)),this.updateComplete.then(()=>{const d=this.shadowRoot.querySelector("dialog");d.open||d.showModal(),this._select(l,{version:r,focus:!1}),this.shadowRoot.querySelector(".head h2")?.focus()})}close(){this.shadowRoot?.querySelector("dialog")?.close()}_onClose(){this._outline=null,this._reading.replaceChildren();const e=new URL(globalThis.location.href);e.searchParams.delete("view"),e.searchParams.delete("item"),e.searchParams.delete("version"),globalThis.history.replaceState(globalThis.history.state,"",e),this._returnFocus?.focus?.()}get _reading(){let e=this.querySelector(":scope > .oer-reading");return e||(e=globalThis.document.createElement("div"),e.className="oer-reading",e.slot="page",e.addEventListener("click",t=>{const r=t.composedPath().find(o=>o.localName==="a"&&o.href);if(!r)return;const i=new URL(r.href,globalThis.document.baseURI);i.origin===globalThis.location.origin&&!(i.hash&&i.pathname===globalThis.location.pathname)&&this.close()}),this.append(e)),e}_flat(){const e=this._outline;if(!e)return[];const t=[{id:e.root.id,title:"Overview",section:""}];for(const r of e.sections){r.id&&t.push({id:r.id,title:r.title,section:r.title});for(const i of r.entries){t.push({id:i.id,title:i.title,section:r.title,entry:i});for(const o of i.children)t.push({id:o.id,title:o.title,section:r.title,entry:i,child:o})}}return t}async _select(e,{version:t="",focus:r=!0}={}){const i=$e().find(l=>l.id===e);if(!i)return;this._current=e,this._version=t;const o=this._flat().find(l=>l.id===e);o?.entry&&o.entry.children.length&&(this._open=new Set([...this._open,o.entry.id])),this._showContents=!1;const n=new URL(globalThis.location.href);n.searchParams.set("view",this._outline.root.id),e===this._outline.root.id?n.searchParams.delete("item"):n.searchParams.set("item",e),t?n.searchParams.set("version",t):n.searchParams.delete("version"),globalThis.history.replaceState(globalThis.history.state,"",n),await this._loadPage(i,t),this.shadowRoot.querySelector(".scroll")?.scrollTo(0,0),r&&this.shadowRoot.querySelector(".page h2")?.focus()}_source(e,t=$e()){const r=e.metadata?.oerRef?.page&&t.find(i=>i.id===e.metadata.oerRef.page)||e;return(this._version?K(r.metadata?.oerSnapshotOf||r.id,t).find(i=>i.version===this._version):null)?.snapshot||r}async _loadPage(e,t){const r=++this.__load,i=this._source(e);this._loading=!0,this._error="";const o=this._reading;o.replaceChildren();try{const n=await fetch(new URL(i.location,globalThis.document.baseURI),{cache:"no-cache"});if(!n.ok)throw new Error(String(n.status));const l=await n.text();if(r!==this.__load)return;const d=globalThis.document.createElement("template");d.innerHTML=l,d.content.querySelectorAll("page-break").forEach(c=>c.remove()),o.dataset.oerPage=i.id,o.replaceChildren(d.content),globalThis.WCAutoload?.process?.()}catch{r===this.__load&&(this._error="This page couldn't be loaded.")}r===this.__load&&(this._loading=!1)}_toggle(e){const t=new Set(this._open);t.has(e)?t.delete(e):t.add(e),this._open=t}_renderEntry(e){const t=this._current===e.id,r=this._open.has(e.id);return s`<li>
      <div class="row">
        <button class="entry" aria-current="${t?"true":"false"}" @click="${()=>this._select(e.id)}">
          ${e.step?s`<span class="num" aria-hidden="true">${e.step}</span>`:e.icon?s`<simple-icon-lite icon="${e.icon}"></simple-icon-lite>`:s`<span class="noicon"></span>`}
          <span class="label">${e.step?s`<span class="sr">${e.step}. </span>`:""}${e.title}${e.typeLabel?s`<small>${e.typeLabel}</small>`:""}</span>
        </button>
        ${e.children.length?s`<button class="toggle" aria-expanded="${r?"true":"false"}" aria-label="${r?"Hide":"Show"} what's in ${e.title}" @click="${()=>this._toggle(e.id)}">
              ${Ve("oer:chevron-right")}
            </button>`:""}
      </div>
      ${e.children.length&&r?s`<ul role="list">
            ${e.children.map(i=>s`<li>
                <button class="entry" aria-current="${this._current===i.id?"true":"false"}" @click="${()=>this._select(i.id)}">
                  ${i.step?s`<span class="num" aria-hidden="true">${i.step}</span>`:i.icon?s`<simple-icon-lite icon="${i.icon}"></simple-icon-lite>`:s`<span class="noicon"></span>`}
                  <span class="label">${i.step?s`<span class="sr">${i.step}. </span>`:""}${i.title}${i.typeLabel?s`<small>${i.typeLabel}</small>`:""}</span>
                </button>
              </li>`)}
          </ul>`:""}
    </li>`}render(){const e=this._outline,t=$e(),r=B(t).types,i=e?r.find(g=>g.id===e.root.metadata?.pageType):null,o=this._flat(),n=o.findIndex(g=>g.id===this._current),l=o[n],d=t.find(g=>g.id===this._current),c=d?this._source(d,t):null,p=c?r.find(g=>g.id===c.metadata?.pageType):null,h=d?K(d.metadata?.oerRef?.page&&t.find(g=>g.id===d.metadata.oerRef.page)?.id||d.id,t).filter(g=>g.snapshot):[],m=n>0?o[n-1]:null,v=n>=0&&n<o.length-1?o[n+1]:null,u=l?[e.root.title,l.section,l.child?l.entry.title:"",l.id===e.root.id?"Overview":l.title].filter(Boolean):[];return s`<dialog aria-labelledby="viewer-title" @close="${this._onClose}">
      ${e?s`<div class="frame">
            <aside class="${this._showContents?"shown":""}" aria-label="Contents">
              <div class="head">
                ${i?s`<span class="type">${i.icon?s`<simple-icon-lite icon="${i.icon}"></simple-icon-lite>`:""}${i.label}</span>`:""}
                <h2 id="viewer-title" tabindex="-1">${e.root.title}</h2>
                ${e.root.description?s`<p class="desc">${e.root.description}</p>`:""}
              </div>
              <nav aria-label="${e.root.title}">
                <ul role="list">
                  <li>
                    <div class="row">
                      <button class="entry" aria-current="${this._current===e.root.id?"true":"false"}" @click="${()=>this._select(e.root.id)}">
                        ${Ve("oer:book-a")}<span class="label">Overview</span>
                      </button>
                    </div>
                  </li>
                </ul>
                ${e.sections.map(g=>s`${g.title?g.id?s`<h3><button class="entry" aria-current="${this._current===g.id?"true":"false"}" @click="${()=>this._select(g.id)}">${g.title}</button></h3>`:s`<h3>${g.title}</h3>`:""}
                    <ul role="list">
                      ${g.entries.map(f=>this._renderEntry(f))}
                    </ul>`)}
              </nav>
            </aside>
            <main>
              <div class="bar">
                <button class="btn contents-btn" aria-expanded="${this._showContents?"true":"false"}" @click="${()=>this._showContents=!this._showContents}">
                  ${Ve("oer:list")}Contents
                </button>
                <ol class="crumbs" aria-label="You are here">
                  ${u.map(g=>s`<li>${g}</li>`)}
                </ol>
                ${h.length?s`<label class="sr" for="viewer-version">Version</label>
                      <select id="viewer-version" class="btn" @change="${g=>this._select(this._current,{version:g.target.value,focus:!1})}">
                        <option value="" ?selected="${!this._version}">Latest</option>
                        ${h.map(g=>s`<option value="${g.version}" ?selected="${g.version===this._version}">v${g.version}</option>`)}
                      </select>`:""}
                ${c?s`<a class="btn" href="${c.slug}" @click="${()=>this.close()}">${Ve("icons:open-in-new")}Open page</a>`:""}
                <button class="icon-btn" aria-label="Close viewer" title="Close" @click="${()=>this.close()}">${Ve("oer:x")}</button>
              </div>
              <div class="scroll">
                <article class="page" aria-labelledby="viewer-page-title" aria-busy="${this._loading?"true":"false"}">
                  ${p?s`<div class="type page-type">${p.icon?s`<simple-icon-lite icon="${p.icon}"></simple-icon-lite>`:""}${p.label}${this._version?` \xB7 v${this._version}`:""}</div>`:""}
                  <h2 id="viewer-page-title" tabindex="-1">${c?.metadata?.oerSnapshotTitle||c?.title||""}</h2>
                  ${this._loading?s`<p class="status" role="status">Loading…</p>`:""}
                  ${this._error?s`<p class="status" role="alert">${this._error}</p>`:""}
                  <slot name="page"></slot>
                  <nav class="pager" aria-label="Previous and next">
                    ${m?s`<button @click="${()=>this._select(m.id)}"><small>Previous</small>${m.title}</button>`:""}
                    ${v?s`<button class="next" @click="${()=>this._select(v.id)}"><small>Next</small>${v.title}</button>`:""}
                  </nav>
                </article>
              </div>
            </main>
          </div>`:""}
    </dialog>`}};customElements.get(Ke.tag)||customElements.define(Ke.tag,Ke);function E2(){const a=globalThis.document;return a.querySelector(Ke.tag)||a.body.appendChild(a.createElement(Ke.tag))}function Nn(a){const e=new URLSearchParams(globalThis.location.search),t=e.get("view");return!t||!a?.some(r=>r.id===t)?!1:(E2().show(t,{item:e.get("item")||"",version:e.get("version")||""}),!0)}const fe=a=>s`<span class="lucide" aria-hidden="true" style="--src:url(&quot;${S[a]||""}&quot;)"></span>`,Un=a=>{try{return decodeURI(String(a)).replace(/^https?:\/\/(www\.)?/i,"").replace(/\/$/,"")}catch{return String(a)}},Vn=a=>a!=null&&a!==""&&!(Array.isArray(a)&&!a.length);let Ui=class extends M{static get tag(){return"oer-page-header"}static get properties(){return{_item:{state:!0},_types:{state:!0},_exportOpen:{state:!0},_exporting:{state:!0}}}constructor(){super(),this._item=null,this._types=[]}connectedCallback(){super.connectedCallback(),this.__dispose=R(()=>{const e=_(y.activeItem),t=_(y.manifest?.items)||[];Promise.resolve().then(()=>{this._allItems=t,this._item=e&&t.find(r=>r.id===e.id)||e,this._types=B(t).types})})}disconnectedCallback(){this.__dispose?.(),super.disconnectedCallback()}static get styles(){return[yt,b`
      :host {
        display: block;
        /* the page body may be justified; lists and tables read ragged-right */
        text-align: start;
      }
      :host([hidden]) {
        display: none;
      }
      .meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        margin: 0 0 1rem;
      }
      .type {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 1.5rem;
        padding: 0 0.625rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--primary);
        background: color-mix(in oklch, var(--primary) 10%, transparent);
        --simple-icon-height: 0.875rem;
        --simple-icon-width: 0.875rem;
      }
      .pill {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 1.5rem;
        padding: 0 0.625rem;
        border: 1px solid var(--border);
        border-radius: 999px;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .archived {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        margin: 0 0 1rem;
        padding: 0.75rem 1rem;
        border: 1px solid color-mix(in srgb, oklch(0.62 0.15 70) 45%, transparent);
        border-radius: var(--radius-md);
        background: color-mix(in srgb, oklch(0.62 0.15 70) 10%, var(--background));
        font-size: 0.875rem;
      }
      .archived a {
        margin-left: auto;
        font-weight: 500;
        color: var(--link, var(--primary));
      }
      .pill b {
        font-weight: 500;
        color: var(--foreground);
      }
      .edit.start {
        background: var(--primary);
        color: var(--primary-foreground);
        font-weight: 500;
        text-decoration: none;
      }
      .edit.start:hover {
        background: color-mix(in srgb, var(--primary) 88%, black);
        color: var(--primary-foreground);
      }
      .rel,
      .att {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .rel li,
      .att li {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        --simple-icon-height: 1rem;
        --simple-icon-width: 1rem;
      }
      .rel simple-icon-lite,
      .noicon {
        flex: none;
        width: 1rem;
        color: var(--muted-foreground);
      }
      .rel-text {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        font-size: 0.9375rem;
        line-height: 1.4;
      }
      .rel-text small {
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .att img,
      .att .kind {
        flex: none;
        width: 4rem;
        height: 2.75rem;
        object-fit: cover;
        border-radius: var(--radius-sm);
        border: 1px solid var(--border);
        background: var(--muted);
      }
      .thumb {
        all: unset;
        flex: none;
        display: inline-flex;
        border-radius: var(--radius-sm);
        cursor: zoom-in;
      }
      .thumb:focus-visible,
      .name:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
      .thumb:hover img,
      .thumb:hover .kind {
        border-color: var(--ring);
      }
      .name {
        all: unset;
        cursor: pointer;
        text-align: start;
      }
      .name:hover b {
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .att .kind {
        display: grid;
        place-items: center;
        font-size: 0.6875rem;
        font-weight: 600;
        color: var(--muted-foreground);
      }
      .dl {
        flex: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md);
        color: var(--foreground);
      }
      .dl:hover {
        background: var(--accent);
      }
      .menu-wrap {
        position: relative;
      }
      .menu {
        position: absolute;
        right: 0;
        top: calc(100% + 0.25rem);
        z-index: 5;
        min-width: 14rem;
        padding: 0.25rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        background: var(--popover, var(--background));
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
      }
      .menu button {
        all: unset;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        height: 2rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.875rem;
        cursor: pointer;
      }
      .menu button:hover,
      .menu button:focus-visible {
        background: var(--accent);
      }
      .actions {
        margin-left: auto;
        display: inline-flex;
        gap: 0.25rem;
      }
      .edit {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 1.75rem;
        padding: 0 0.625rem;
        border-radius: var(--radius-md);
        font-size: 0.8125rem;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .edit:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .edit:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .lucide {
        flex: none;
        width: 0.875rem;
        height: 0.875rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      .desc {
        margin: 0 0 1.25rem;
        text-align: start;
        font-size: 1.125rem;
        line-height: 1.6;
        color: var(--muted-foreground);
      }
      .blocks {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
        gap: 1rem;
        margin: 0 0 1.5rem;
      }
      .block {
        padding: 1rem 1.25rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        background: var(--card, var(--background));
        /* the page body may be justified; card lists read ragged-right */
        text-align: start;
      }
      .block h2 {
        margin: 0 0 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        letter-spacing: normal;
      }
      .steps h3 {
        margin: 0.75rem 0 0.25rem;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--muted-foreground);
      }
      .steps h2 + h3 {
        margin-top: 0;
      }
      .steps ul {
        list-style: none;
        padding: 0;
      }
      .steps li {
        display: flex;
        align-items: baseline;
        gap: 0.5rem;
        padding: 0.125rem 0;
      }
      .steps .num {
        flex: none;
        display: inline-grid;
        place-items: center;
        min-width: 1.375rem;
        height: 1.375rem;
        border: 1px solid var(--border);
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
      }
      .steps simple-icon-lite,
      .steps .noicon {
        flex: none;
        width: 1.375rem;
        --simple-icon-width: 0.875rem;
        --simple-icon-height: 0.875rem;
        color: var(--muted-foreground);
        align-self: center;
      }
      .steps small {
        color: var(--muted-foreground);
        font-size: 0.75rem;
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
      .pill a {
        font-weight: 600;
        color: inherit;
      }
      .block ul {
        margin: 0;
        padding-left: 1.125rem;
        font-size: 0.9375rem;
        line-height: 1.6;
      }
      .block p {
        margin: 0;
        font-size: 0.9375rem;
        line-height: 1.6;
      }
      img {
        display: block;
        max-width: 100%;
        border-radius: var(--radius-md);
      }
      a {
        color: var(--link, var(--primary));
      }
    `]}_renderLinks(e){const t=we(e,this._allItems||[]).filter(r=>y.isLoggedIn||r.item?.metadata?.published!==!1);return s`<ul class="rel">
      ${t.map(r=>{const i=this._types.find(o=>o.id===r.item?.metadata?.pageType);return s`<li>
          ${i?.icon?s`<simple-icon-lite icon="${i.icon}"></simple-icon-lite>`:s`<span class="noicon"></span>`}
          <span class="rel-text">
            ${r.item?s`<a href="${r.href}">${r.item.title}</a>`:s`<em>Missing page</em>`}
            <small>${[i?.label,r.version?`v${r.version}`:""].filter(Boolean).join(" \xB7 ")}</small>
          </span>
        </li>`})}
    </ul>`}_renderSteps(e){const t=Ue(e,this._allItems||[]).filter(i=>y.isLoggedIn||i.item.metadata?.published!==!1);if(!t.some(i=>i.activity))return"";const r=[];for(const i of t)(!r.length||r.at(-1).stage!==i.stage)&&r.push({stage:i.stage,parts:[]}),r.at(-1).parts.push(i);return s`<section class="block steps" aria-labelledby="steps-h">
      <h2 id="steps-h">Project steps</h2>
      ${r.map(i=>s`${i.stage?s`<h3>${i.stage}</h3>`:""}
          <ul role="list">
            ${i.parts.map(o=>{const n=this._types.find(l=>l.id===o.item.metadata?.pageType);return s`<li class="${o.activity?"":"support"}">
                ${o.activity?s`<span class="num" aria-hidden="true">${o.step}</span><span class="sr">Step ${o.step}: </span>`:n?.icon?s`<simple-icon-lite icon="${n.icon}"></simple-icon-lite>`:s`<span class="noicon"></span>`}
                <a href="${o.item.slug}">${o.item.title}</a>
                ${o.activity?"":s`<small>${n?.label||"Page"}</small>`}
              </li>`})}
          </ul>`)}
    </section>`}_renderFiles(e){const t=(Array.isArray(e)?e:[]).filter(i=>i?.url),r=t.filter(i=>Mt(i.url));return s`<ul class="att">
      ${t.map(i=>{const o=/^https?:\/\//i.test(i.url)&&!i.url.startsWith(globalThis.location.origin),n=i.title||i.url.split("/").pop(),l=lr(i.url)?s`<img src="${i.url}" alt="" loading="lazy" />`:s`<span class="kind">${ga(i.url)}</span>`,d=Mt(i.url)?()=>Rn().show(r,r.indexOf(i)):null;return s`<li>
          ${d?s`<button class="thumb" aria-label="Preview ${n}" title="Preview" @click="${d}">${l}</button>`:l}
          <span class="rel-text"
            >${d?s`<button class="name" @click="${d}"><b>${n}</b></button>`:s`<b>${n}</b>`}${i.description?s`<small>${i.description}</small>`:""}</span
          >
          <a class="dl" href="${i.url}" ?download="${!o}" target="${o?"_blank":""}" rel="${o?"noopener noreferrer":""}" aria-label="${o?"Open":"Download"} ${i.title||"file"}">
            ${fe(o?"icons:open-in-new":"icons:file-download")}
          </a>
        </li>`})}
    </ul>`}async _export(e,t){if(this._exportOpen=!1,e==="print")return En().show(t.id);this._exporting=!0;try{e==="html"?await $n(t.id):await Fn(t.id)}finally{this._exporting=!1}}_short(e,t){if(e.kind==="people")return ta(ue(t).map(r=>r.name));if(Array.isArray(t))return t.map(r=>this._short(e,r)).join(", ");if(e.kind==="boolean")return t?"Yes":"No";if(e.kind==="select")return(e.options||[]).find(r=>r.value===t)?.label||t;if(e.kind==="date"){const r=new Date(t);return Number.isNaN(r.getTime())?t:r.toLocaleDateString()}return t}render(){const e=this._item,t=e?.metadata?.oerRef?.page,r=t?(this._allItems||[]).find(x=>x.id===t):null,i=r?{...e,description:e.description||r.description,metadata:{...e.metadata,oerFields:r.metadata?.oerFields||{}}}:e,o=i?.metadata?.pageType;if(!i||o===te)return s``;const n=this._types.find(x=>x.id===o),l=i.metadata?.oerFields||{},d=(n?.fields||[]).filter(x=>x.header&&Vn(l[x.name])),c=d.filter(x=>["text","number","select","boolean","date","people"].includes(x.kind)),p=d.filter(x=>!c.includes(x)),h=be(i),m=h?ca(i,this._allItems):null,v=i.metadata?.version;if(!n&&!h)return s``;const u=r||e,g=qi(u,this._allItems),f=o===Ae?this._renderSteps(u.id):"";return s`
      ${h&&m?s`<div class="archived" role="status">
            ${fe("icons:history")}
            <span>You're viewing version ${v} of <b>${m.title}</b>, as released.</span>
            <a href="${m.slug}">See the latest version</a>
          </div>`:""}
      <div class="meta">
        ${n?s`<span class="type">${n.icon?s`<simple-icon-lite icon="${n.icon}"></simple-icon-lite>`:""}${n.label}</span>`:""}
        ${l.placeholder?w2("md"):""}
        ${g?s`<span class="pill">Step <b>${g.step} of ${g.total}</b></span>
              ${g.stage?s`<span class="pill">Stage <b>${g.stage}</b></span>`:""}
              <span class="pill">Part of <a href="${g.project.slug}">${g.project.title}</a></span>`:""}
        ${c.map(x=>s`<span class="pill">${x.kind==="people"&&x.name==="authors"?"By":x.label} <b>${this._short(x,l[x.name])}</b></span>`)}
        <span class="actions">
          ${Hi(e,this._allItems)?s`<button class="edit" aria-label="Open ${i.title} in the viewer" @click="${()=>E2().show(e.id)}">${fe("oer:eye")}Viewer</button>`:""}
          ${n?.reader?s`<button class="edit start" @click="${()=>globalThis.dispatchEvent(new CustomEvent("oer-reader"))}">${fe("hax:lesson")}Reader mode</button>
                <span class="menu-wrap">
                  <button class="edit" aria-haspopup="menu" aria-expanded="${!!this._exportOpen}" @click="${()=>this._exportOpen=!this._exportOpen}">
                    ${fe("icons:file-download")}${this._exporting?"Exporting\u2026":"Export"}
                  </button>
                  ${this._exportOpen?s`<div class="menu" role="menu" @keydown="${x=>x.key==="Escape"&&(this._exportOpen=!1)}">
                        <button role="menuitem" @click="${()=>this._export("print",i)}">${fe("icons:print")}Print / PDF</button>
                        <button role="menuitem" @click="${()=>this._export("html",i)}">${fe("hax:file-html")}HTML (.zip)</button>
                        <button role="menuitem" @click="${()=>this._export("cc",i)}">${fe("hax:module")}Common Cartridge (.imscc)</button>
                      </div>`:""}
                </span>`:""}
        </span>
      </div>
      ${n&&i.description?s`<p class="desc">${i.description}</p>`:""}
      ${f?s`<div class="blocks">${f}</div>`:""}
      ${p.length?s`<div class="blocks">
            ${p.map(x=>{const k=l[x.name];return s`<section class="block">
                <h2>${x.label}</h2>
                ${x.kind==="relation"?this._renderLinks(k):x.kind==="files"?this._renderFiles(k):x.kind==="list"?s`<ul>${(Array.isArray(k)?k:[k]).map(C=>s`<li>${C}</li>`)}</ul>`:x.kind==="image"?s`<img src="${k}" alt="" />`:x.kind==="url"?s`<p><a href="${k}">${Un(k)}</a></p>`:s`<p>${k}</p>`}
              </section>`})}
          </div>`:""}
    `}};customElements.define(Ui.tag,Ui);const M2=(a,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${S[a]||""}&quot;)"></span>`,Kn=[{part:"patch",label:"Patch",hint:"Fixes: typos, broken links"},{part:"minor",label:"Minor",hint:"Additions that keep existing use working"},{part:"major",label:"Major",hint:"Changes that break how it was used"}];let zt=class extends M{static get tag(){return"oer-versions-dialog"}static get properties(){return{open:{type:Boolean,reflect:!0},_part:{state:!0},_notes:{state:!0},_busy:{state:!0},_error:{state:!0},_publishing:{state:!0}}}constructor(){super(),this.open=!1,this._part="minor",this._notes="",this.__keys=e=>{this.open&&e.key==="Escape"&&!this._busy&&(e.preventDefault(),e.stopPropagation(),this._close())}}show(e,{publish:t=!1}={}){this._pageId=e,this._part="minor",this._notes="",this._error="",this._busy=!1,this._publishing=t&&y.isLoggedIn,this.open=!0,globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector(this._publishing?"textarea":"a, button")?.focus())}_close(){this.open=!1,globalThis.removeEventListener("keydown",this.__keys,!0)}get _page(){return(_(y.manifest?.items)||[]).find(e=>e.id===this._pageId)||null}async _publish(){if(this._busy)return;const e=this._page,t=e2(e?.metadata?.version||"0.0.0",this._part);this._busy=!0,this._error="";try{await ha(this._pageId,t,this._notes),this._publishing=!1}catch(r){this._error=r.message}this._busy=!1}_go(e){this._close(),globalThis.history.pushState({},"",e),globalThis.dispatchEvent(new PopStateEvent("popstate"))}static get styles(){return b`
      :host {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: none;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
      }
      :host([open]) {
        display: grid;
        place-items: center;
      }
      .backdrop {
        position: absolute;
        inset: 0;
        background: rgb(0 0 0 / 0.5);
      }
      .dialog {
        position: relative;
        display: flex;
        flex-direction: column;
        width: min(36rem, calc(100vw - 2rem));
        max-height: min(42rem, calc(100dvh - 2rem));
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
        overflow: hidden;
      }
      button,
      textarea {
        font: inherit;
        color: inherit;
      }
      :focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .lucide {
        flex: none;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      header {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        padding: 1rem 0.75rem 1rem 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      .heading {
        flex: 1;
      }
      h2 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
      }
      .sub {
        margin: 0.125rem 0 0;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .x {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md);
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .x:hover {
        background: var(--accent);
      }
      .body {
        overflow-y: auto;
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }
      .publish {
        padding: 1rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        background: color-mix(in srgb, var(--muted) 50%, transparent);
      }
      h3 {
        margin: 0 0 0.75rem;
        font-size: 0.875rem;
        font-weight: 600;
      }
      .bumps {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }
      .bump {
        all: unset;
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        padding: 0.625rem 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        cursor: pointer;
      }
      .bump[aria-checked="true"] {
        border-color: var(--primary);
        box-shadow: inset 0 0 0 1px var(--primary);
      }
      .bump b {
        font-size: 0.875rem;
      }
      .bump code {
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.8125rem;
        color: var(--primary);
      }
      .bump span {
        font-size: 0.6875rem;
        color: var(--muted-foreground);
      }
      label {
        display: block;
        margin-bottom: 0.375rem;
        font-size: 0.8125rem;
        font-weight: 500;
      }
      textarea {
        box-sizing: border-box;
        width: 100%;
        min-height: 4.5rem;
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        font-size: 0.875rem;
        resize: vertical;
      }
      .hint {
        margin: 0.375rem 0 0;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .error {
        margin: 0.5rem 0 0;
        font-size: 0.8125rem;
        color: var(--destructive);
      }
      .row {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        margin-top: 0.75rem;
      }
      .btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2.25rem;
        padding: 0 1rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
      }
      .btn.primary {
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .btn.outline {
        border: 1px solid var(--input-border, var(--border));
      }
      .btn.outline:hover {
        background: var(--accent);
      }
      .btn[aria-disabled="true"] {
        opacity: 0.5;
        cursor: default;
      }
      ol {
        list-style: none;
        margin: 0;
        padding: 0;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        overflow: hidden;
      }
      li {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 0.25rem 0.75rem;
        align-items: baseline;
        padding: 0.75rem 1rem;
      }
      li + li {
        border-top: 1px solid var(--border);
      }
      .v {
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.875rem;
        font-weight: 600;
      }
      .when {
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .badge {
        justify-self: end;
        padding: 0 0.5rem;
        border-radius: 999px;
        font-size: 0.6875rem;
        font-weight: 600;
        color: var(--primary);
        background: color-mix(in srgb, var(--primary) 10%, transparent);
      }
      .notes {
        grid-column: 1 / -1;
        margin: 0;
        font-size: 0.8125rem;
        line-height: 1.5;
        white-space: pre-wrap;
      }
      .link {
        all: unset;
        grid-column: 1 / -1;
        justify-self: start;
        font-size: 0.8125rem;
        color: var(--link, var(--primary));
        text-decoration: underline;
        text-underline-offset: 2px;
        cursor: pointer;
      }
      .empty {
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
    `}render(){if(!this.open)return s``;const e=this._page;if(!e)return s``;const t=e.metadata?.version||"",r=K(e.id),i=o=>o?new Date(Number(o)*1e3).toLocaleDateString():"";return s`
      <div class="backdrop" @click="${()=>!this._busy&&this._close()}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${M2("icons:history")}Versions</h2>
            <p class="sub">${e.title}${t?` \u2014 latest release v${t}`:" \u2014 not released yet"}</p>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._close}">${M2("oer:x")}</button>
        </header>
        <div class="body">
          ${this._publishing?s`<section class="publish">
                <h3>Publish a version</h3>
                <div class="bumps" role="radiogroup" aria-label="Kind of change">
                  ${Kn.map(o=>s`<button class="bump" role="radio" aria-checked="${this._part===o.part}" @click="${()=>this._part=o.part}">
                      <b>${o.label}</b><code>${t||"0.0.0"} → ${e2(t||"0.0.0",o.part)}</code><span>${o.hint}</span>
                    </button>`)}
                </div>
                <label for="notes">Release notes</label>
                <textarea id="notes" .value="${this._notes}" @input="${o=>this._notes=o.target.value}" placeholder="What changed in this version?"></textarea>
                <p class="hint">Freezes the page as it is now. Readers and books can keep using this version while the page changes.</p>
                ${this._error?s`<p class="error">${this._error}</p>`:""}
                <div class="row">
                  <button class="btn outline" @click="${()=>this._publishing=!1}">Cancel</button>
                  <button class="btn primary" aria-disabled="${this._busy?"true":"false"}" @click="${this._publish}">
                    ${this._busy?"Publishing\u2026":`Publish v${e2(t||"0.0.0",this._part)}`}
                  </button>
                </div>
              </section>`:y.isLoggedIn?s`<div><button class="btn outline" @click="${()=>this._publishing=!0}">${M2("oer:plus")}Publish a version</button></div>`:""}
          ${r.length?s`<ol>
                ${r.map((o,n)=>s`<li>
                    <span class="v">v${o.version}</span>
                    <span class="when">${i(o.date)}</span>
                    ${n===0?s`<span class="badge">Latest release</span>`:s`<span></span>`}
                    ${o.notes?s`<p class="notes">${o.notes}</p>`:""}
                    ${o.snapshot?s`<button class="link" @click="${()=>this._go(o.snapshot.slug)}">View v${o.version} as released</button>`:""}
                  </li>`)}
              </ol>`:s`<p class="empty">No versions yet. ${y.isLoggedIn?"Publish one to freeze the page as it is now.":""}</p>`}
        </div>
      </div>
    `}};customElements.define(zt.tag,zt);function Vi(){const a=globalThis.document;return a.querySelector(zt.tag)||a.body.appendChild(a.createElement(zt.tag))}function Ki(a,e=""){const t=new URL("./",globalThis.document.baseURI);return t.searchParams.set("p",a),e&&t.searchParams.set("version",e),t.href}function Wn(a){const e=new URLSearchParams(globalThis.location.search),t=e.get("p");if(!t||!a?.length)return!1;const r=a.find(l=>l.id===t);if(!r)return!1;const i=e.get("version"),o=(i?K(r.metadata?.oerSnapshotOf||r.id,a).find(l=>l.version===i):null)?.snapshot||r;e.delete("p"),e.delete("version");const n=e.toString();return globalThis.history.replaceState({},"",`${o.slug}${n?`?${n}`:""}${globalThis.location.hash}`),globalThis.dispatchEvent(new PopStateEvent("popstate")),!0}const Wi={light:"https://cdn.jsdelivr.net/gh/open-curriculum/oerschema@master/public/oerschema-logo-black.png",dark:"https://cdn.jsdelivr.net/gh/open-curriculum/oerschema@master/public/oerschema-logo-white.png"},Yn=["oer-iframe","oer-video","oer-google-slides","oer-sketchfab","oer-3d-viewer","oer-code-embed"],Gn=["oer-credit",...Yn.flatMap(a=>[`${a}[credit]`,`${a}[license]`])].join(", "),jt=3,We=(a,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${S[a]||""}&quot;)"></span>`,S2={lesson:"oer:LearningComponent",exercise:"oer:Practice",project:"oer:Project",activity:"oer:Activity",quiz:"oer:Quiz",course:"oer:Course",unit:"oer:Unit",pathway:"oer:Course",specialization:"oer:InstructionalPattern",article:"oer:SupportingMaterial",tutorial:"oer:SupportingMaterial",lecture:"oer:SupportingMaterial",rubric:"oer:Rubric",book:"schema:Book",section:"oer:Unit"},A2=a=>(Array.isArray(a)?a:a?[a]:[]).map(e=>String(e).trim()).filter(Boolean);class Yi extends M{static get tag(){return"oer-page-footer"}static get properties(){return{compact:{type:Boolean,reflect:!0},_item:{state:!0},_aiul:{state:!0},_aiulOpen:{state:!0},_cite:{state:!0},_copied:{state:!0},_schemaOpen:{state:!0},_usedAll:{state:!0},_dark:{state:!0}}}connectedCallback(){super.connectedCallback(),this.__dispose=R(()=>{const t=_(y.activeItem),r=_(y.manifest?.items)||[],i=_(y.manifest),o=!!_(y.darkMode);Promise.resolve().then(()=>{this._dark=o,this._items=r,this._site=i;const n=t&&r.find(d=>d.id===t.id),l=n?.metadata?.oerRef?.page&&r.find(d=>d.id===n.metadata.oerRef.page);this._item=l?{...n,metadata:{...n.metadata,oerFields:l.metadata?.oerFields||{}}}:n||t,this._cite=!1,this._schemaOpen=!1,this._usedAll=!1,this._aiulOpen=null,this._writeJsonLd()})}),cr().then(t=>this._aiul=t),this.__credits=new MutationObserver(()=>{clearTimeout(this.__creditsTimer),this.__creditsTimer=setTimeout(()=>this._refreshCredits(),150)});const e=this._contentRoot();e&&this.__credits.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["credit","credit-url","license","title","creator","creator-url","source","note","caption","data-resource","data-cite"]}),this._refreshCredits()}_contentRoot(){return this.getRootNode()?.host||null}_refreshCredits(){const e=this._contentRoot(),t=(e?[...e.querySelectorAll(Gn)]:[]).map(i=>i.localName==="oer-credit"?{title:i.title||"",creator:i.creator||"",creatorUrl:i.creatorUrl||"",source:i.source||"",license:i.license||""}:{title:i.caption||i.title||"",creator:i.credit||"",creatorUrl:"",source:i.creditUrl||"",license:i.license||""}),r=[...e?.querySelectorAll("section.footnotes li[id^='fn-']")||[]].map(i=>{const o=i.cloneNode(!0);o.querySelectorAll("a.fn-back").forEach(l=>l.remove());let n=null;try{n=i.dataset.cite?JSON.parse(i.dataset.cite):null}catch{n=null}return{text:o.textContent.trim(),resource:i.dataset.resource||"",data:n,url:o.querySelector("a[href^='http']")?.href||""}});JSON.stringify(t)===JSON.stringify(this._credits||[])&&JSON.stringify(r)===JSON.stringify(this._citations||[])||(this._credits=t,this._citations=r,this.requestUpdate(),this._writeJsonLd())}disconnectedCallback(){this.__dispose?.(),this.__credits?.disconnect(),globalThis.document.getElementById("oer-schema-jsonld")?.remove(),globalThis.document.head.querySelectorAll("meta[data-oer-cite]").forEach(e=>e.remove()),super.disconnectedCallback()}get _fields(){const e={...this._item?.metadata?.oerFields||{}};for(const t of this._type?.fields||[])(e[t.name]===void 0||e[t.name]==="")&&t.default&&(e[t.name]=t.default);return e}get _people(){const e=this._fields,t=ue(e.authors);if(t.length)return t;if(e.author)return[{name:String(e.author),url:String(e.authorUrl||"")}];const r=this._site?.author||this._site?.metadata?.author?.name;return r?[{name:String(r),url:""}]:[]}get _authors(){return this._people.map(e=>e.name)}get _type(){return B(this._items).types.find(e=>e.id===this._item?.metadata?.pageType)||null}_url(){return new URL(this._item?.slug||"",globalThis.document.baseURI).href}_schema(){const e=this._item;if(!e)return null;const t=this._fields,r=ke(t.license),i=e.metadata?.pageType,o={"@context":{oer:"https://oerschema.org/",schema:"https://schema.org/"},"@type":this._type?.schemaType||S2[String(i||"").replace(/^oer:/,"")]||"schema:CreativeWork","@id":this._url(),"schema:name":e.title,"schema:url":this._url()};e.description&&(o["schema:description"]=e.description),r?.url&&(o["schema:license"]=r.url),this._authors.length&&(o["schema:author"]=this._people.map(f=>({"@type":"schema:Person","schema:name":f.name,...f.url?{"schema:url":f.url}:{},...f.affiliation?{"schema:affiliation":{"@type":"schema:CollegeOrUniversity","schema:name":f.affiliation}}:{}}))),e.metadata?.updated&&(o["schema:dateModified"]=new Date(e.metadata.updated*1e3).toISOString()),e.metadata?.version&&(o["schema:version"]=e.metadata.version),t.difficulty&&(o["schema:educationalLevel"]=t.difficulty),t.estimatedDuration&&(o["schema:timeRequired"]=t.estimatedDuration);const n=A2(t.learningObjectives);n.length&&(o["oer:hasLearningObjective"]=n.map(f=>({"@type":"oer:LearningObjective","schema:description":f})));const l=(t.components||[]).map(f=>(this._items||[]).find(x=>x.id===f?.page)).filter(f=>f&&f.metadata?.published!==!1);if(l.length){const f=B(this._items||[]).types;o["oer:hasComponent"]=l.map(x=>({"@type":f.find(k=>k.id===x.metadata?.pageType)?.schemaType||S2[String(x.metadata?.pageType||"").replace(/^oer:/,"")]||"oer:LearningComponent","schema:name":x.title,"schema:url":new URL(x.slug,globalThis.document.baseURI).href}))}const d=this._items||[],c=f=>B(d).types.find(x=>x.id===f.metadata?.pageType)?.schemaType||S2[String(f.metadata?.pageType||"").replace(/^oer:/,"")]||"schema:CreativeWork",p=f=>({"@type":c(f),"schema:name":f.title,"schema:url":new URL(f.slug,globalThis.document.baseURI).href});if(i===Ae){const f=Ue(e.id,d).filter(C=>C.item.metadata?.published!==!1),x=f.filter(C=>C.activity),k=f.filter(C=>!C.activity);x.length&&(o["oer:hasActivity"]=x.map(C=>({...p(C.item),"oer:step":C.step,...C.stage?{"oer:stage":C.stage}:{}}))),k.length&&(o["oer:material"]=k.map(C=>p(C.item)))}const h=qi(e,d);h&&(o["oer:activityOf"]=p(h.project),o["oer:step"]=h.step,h.stage&&(o["oer:stage"]=h.stage));const m=(Array.isArray(t.prerequisites)?t.prerequisites:[]).map(f=>d.find(x=>x.id===(f?.page||f))).filter(f=>f&&f.metadata?.published!==!1);if(m.length&&(o["oer:prerequisite"]=m.map(p)),i==="oer:course"){t.code&&(o["oer:courseIdentifier"]=t.code),t.institution&&(o["oer:institution"]={"@type":"schema:CollegeOrUniversity","schema:name":t.institution,...t.institutionUrl?{"schema:url":t.institutionUrl}:{}}),t.bulletin&&(o["schema:sameAs"]=t.bulletin);const f=(Array.isArray(t.coursePrerequisites)?t.coursePrerequisites:[]).map(x=>d.find(k=>k.id===(x?.page||x))).filter(Boolean);(f.length||t.prerequisiteNote)&&(o["oer:coursePrerequisites"]=[...f.map(x=>({...p(x),"oer:courseIdentifier":x.metadata?.oerFields?.code||""})),...t.prerequisiteNote?[t.prerequisiteNote]:[]])}const v=nt(t.courses,d);v.length&&(o["oer:forCourse"]=v.map(f=>({...f.item?p(f.item):{"@type":"oer:Course"},"oer:courseIdentifier":f.code,...f.institution?{"oer:institution":{"@type":"schema:CollegeOrUniversity","schema:name":f.institution}}:{}})));const u=A2(String(e.metadata?.tags||"").split(","));u.length&&(o["schema:keywords"]=u.join(", "));const g=(this._credits||[]).filter(f=>f.title||f.creator||f.license);if(g.length&&(o["schema:hasPart"]=g.map(f=>({"@type":"schema:CreativeWork",...f.title?{"schema:name":f.title}:{},...f.creator?{"schema:creator":{"@type":"schema:Person","schema:name":f.creator,...f.creatorUrl?{"schema:url":f.creatorUrl}:{}}}:{},...f.source?{"schema:url":f.source}:{},...f.license?{"schema:license":ke(f.license)?.url||f.license}:{}}))),this._citations?.length){const f=this._items||[];o["schema:citation"]=this._citations.map(x=>{const k=x.resource&&f.find(Q=>Q.id===x.resource),C=k?.metadata?.oerFields||{},J=x.data||{},Xe=k?.title||J.title||"",he=k?ue(C.authors).map(Q=>Q.name):J.authors||[];return{"@type":"schema:CreativeWork",...Xe?{"schema:name":Xe}:{"schema:description":x.text},...he.length?{"schema:author":he.map(Q=>({"@type":"schema:Person","schema:name":Q}))}:{},...(k?C.date:J.year)?{"schema:datePublished":String(k?C.date:J.year)}:{},...(k?C.container:J.container)?{"schema:isPartOf":{"@type":"schema:CreativeWork","schema:name":k?C.container:J.container}}:{},...(k?C.publisher:J.publisher)?{"schema:publisher":k?C.publisher:J.publisher}:{},...(k?C.url:J.url)||x.url?{"schema:url":(k?C.url:J.url)||x.url}:{}}})}return o}_writeJsonLd(){const e=globalThis.document;let t=e.getElementById("oer-schema-jsonld");const r=this._item?.metadata?.pageType&&this._item.metadata.pageType!==te?this._schema():null;if(this._writeCitationMeta(!!this._item&&this._item.metadata?.pageType!==te),!r)return t?.remove();t||(t=Object.assign(e.createElement("script"),{id:"oer-schema-jsonld",type:"application/ld+json"}),e.head.append(t)),t.textContent=JSON.stringify(r)}get _citeInfo(){const e=this._item,t=!!e?.metadata?.oerSnapshotOf,r=e?.metadata?.oerSnapshotOf||e?.id,i=e?.metadata?.version||"",o=i?K(r,this._items||[]).find(c=>c.version===i):null,n=t||!!o?.snapshot,l=this._fields?.date?new Date(this._fields.date):null,d=o?.date&&Number(o.date)?new Date(Number(o.date)*1e3):l&&!Number.isNaN(l.getTime())?l:new Date((e?.metadata?.updated||e?.metadata?.created||Date.now()/1e3)*1e3);return{title:e?.metadata?.oerSnapshotTitle||e?.title||"",version:i,issued:d,url:n?Ki(r,i):Ki(r),site:this._site?.title||"",authors:this._authors,accessed:new Date,pinned:n}}_citation(e){const t=this._citeInfo,r=t.issued.getFullYear(),i=t.authors,o=u=>{const g=String(u).trim().split(/\s+/);return g.length>1?{family:g.at(-1),given:g.slice(0,-1).join(" ")}:{family:g[0],given:""}},n=u=>u.split(/[\s-]+/).filter(Boolean).map(g=>`${g[0]}.`).join(" "),l=u=>{const{family:g,given:f}=o(u);return f?`${g}, ${f}`:g},d=u=>{const{family:g,given:f}=o(u);return f?`${g}, ${n(f)}`:g},c=e==="APA"?i.map(d):i.map((u,g)=>g===0?l(u):u),p=(u,g)=>c.length>1?`${c.slice(0,-1).join(u)}${g}${c.at(-1)}`:c[0]||t.site,h=t.version,m=u=>u.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),v=u=>`${u.getDate()} ${u.toLocaleDateString("en-US",{month:"short"})}${u.getMonth()===4?"":"."} ${u.getFullYear()}`;switch(e){case"APA":return`${p(", ",", & ")} (${r}). ${t.title}${h?` (Version ${h})`:""}. ${t.site}. ${t.pinned?t.url:`Retrieved ${m(t.accessed)}, from ${t.url}`}`;case"MLA":return`${p(", ",", and ")}. "${t.title}." ${t.site}${h?`, version ${h}`:""}, ${v(t.issued)}, ${t.url}. Accessed ${v(t.accessed)}.`;case"Chicago":return`${p(", ",", and ")}. "${t.title}." ${t.site}${h?`, version ${h}`:""}. ${m(t.issued)}. Accessed ${m(t.accessed)}. ${t.url}.`;default:return`@misc{${`${(i[0]||t.site).split(/\s+/).pop()}${r}`.replace(/[^A-Za-z0-9]/g,"")},
  author = {${i.map(l).join(" and ")||t.site}},
  title = {${t.title}},
  year = {${r}},
  publisher = {${t.site}},${h?`
  version = {${h}},`:""}
  url = {${t.url}},
  urldate = {${t.accessed.toISOString().slice(0,10)}}
}`}}_ris(){const e=this._citeInfo,t=e.issued,r=i=>String(i).padStart(2,"0");return["TY  - ELEC",`TI  - ${e.title}`,...e.authors.length?e.authors.map(i=>`AU  - ${i}`):[`AU  - ${e.site}`],`PY  - ${t.getFullYear()}`,`DA  - ${t.getFullYear()}/${r(t.getMonth()+1)}/${r(t.getDate())}`,`PB  - ${e.site}`,...e.version?[`ET  - ${e.version}`]:[],`UR  - ${e.url}`,`Y2  - ${e.accessed.toISOString().slice(0,10)}`,"ER  - ",""].join(`\r
`)}_csl(){const e=this._citeInfo,t=r=>[[r.getFullYear(),r.getMonth()+1,r.getDate()]];return JSON.stringify([{id:this._item?.metadata?.oerSnapshotOf||this._item?.id,type:"webpage",title:e.title,author:(e.authors.length?e.authors:[e.site]).map(r=>({literal:r})),issued:{"date-parts":t(e.issued)},accessed:{"date-parts":t(e.accessed)},publisher:e.site,"container-title":e.site,...e.version?{version:e.version}:{},URL:e.url}],null,2)}_download(e){const t=e==="ris"?this._ris():e==="csl"?this._csl():this._citation("BibTeX"),r={ris:"ris",csl:"json",bib:"bib"}[e],i={ris:"application/x-research-info-systems",csl:"application/vnd.citationstyles.csl+json",bib:"application/x-bibtex"}[e],o=String(this._citeInfo.title).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,60)||"citation",n=Object.assign(globalThis.document.createElement("a"),{href:URL.createObjectURL(new Blob([t],{type:i})),download:`${o}.${r}`});globalThis.document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3)}_writeCitationMeta(e){const t=globalThis.document;if(t.head.querySelectorAll("meta[data-oer-cite]").forEach(m=>m.remove()),!e)return;const r=this._citeInfo,i=this._fields,o=ke(i.license),n=r.issued,l=m=>String(m).padStart(2,"0"),d=`${n.getFullYear()}/${l(n.getMonth()+1)}/${l(n.getDate())}`,c=this._item?.metadata?.updated?new Date(this._item.metadata.updated*1e3):null,p=String(this._item?.metadata?.tags||"").split(",").map(m=>m.trim()).filter(Boolean),h=[["citation_title",r.title],...(r.authors.length?r.authors:[r.site]).map(m=>["citation_author",m]),["citation_publication_date",d],...c?[["citation_online_date",`${c.getFullYear()}/${l(c.getMonth()+1)}/${l(c.getDate())}`]]:[],["citation_publisher",r.site],["citation_public_url",r.url],["citation_abstract_html_url",this._url()],["citation_language","en"],...p.length?[["citation_keywords",p.join("; ")]]:[],...i.doi?[["citation_doi",String(i.doi)]]:[],["DC.title",r.title],...(r.authors.length?r.authors:[r.site]).map(m=>["DC.creator",m]),["DC.date",d.replace(/\//g,"-")],["DC.publisher",r.site],["DC.identifier",r.url],["DC.language","en"],["DC.type","Text"],...o?.url?[["DC.rights",o.url]]:i.license?[["DC.rights",String(i.license)]]:[],...this._item?.description?[["DC.description",this._item.description]]:[]];for(const[m,v]of h){if(!v)continue;const u=t.createElement("meta");u.name=m,u.content=String(v),u.dataset.oerCite="",t.head.append(u)}}async _copyText(e,t){try{await globalThis.navigator.clipboard.writeText(t),this._copied=e,setTimeout(()=>this._copied="",2e3)}catch{this._copied=""}}async _copy(e){try{await globalThis.navigator.clipboard.writeText(this._citation(e)),this._copied=e,setTimeout(()=>this._copied="",2e3)}catch{this._copied=""}}static get styles(){return b`
      :host {
        display: block;
        /* the page body may be justified; lists and tables read ragged-right */
        text-align: start;
        margin-top: 3rem;
        padding-top: 1.25rem;
        border-top: 1px solid var(--border);
        font-size: 0.8125rem;
        line-height: 1.6;
        color: var(--muted-foreground);
      }
      :host([compact]) :is(.actions, .panel, dl) {
        display: none;
      }
      :host([hidden]) {
        display: none;
      }
      a {
        color: var(--link, var(--primary));
      }
      button {
        font: inherit;
        color: inherit;
      }
      :focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .lucide {
        flex: none;
        display: inline-block;
        width: 0.875rem;
        height: 0.875rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      /* 1. license line with the actions beside it */
      .top {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem 1.5rem;
      }
      .license {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        min-width: 0;
        margin: 0;
      }
      .license b {
        color: var(--foreground);
        font-weight: 600;
      }
      .cc {
        display: inline-flex;
        flex: none;
        gap: 0.125rem;
      }
      .cc img {
        width: 1.25rem;
        height: 1.25rem;
      }
      .actions {
        display: inline-flex;
        flex: none;
        gap: 0.375rem;
      }
      /* shadcn Button, variant outline, size sm */
      .btn {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 1.75rem;
        padding: 0 0.625rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--foreground);
        cursor: pointer;
      }
      .btn:hover {
        background: var(--accent);
      }
      .btn.badge img {
        display: block;
        height: 1rem;
        width: auto;
      }
      .btn[aria-expanded="true"] {
        border-color: var(--primary);
        color: var(--primary);
      }

      /* 2. labelled list */
      dl {
        display: grid;
        grid-template-columns: max-content minmax(0, 1fr);
        gap: 0.625rem 1.25rem;
        margin: 1rem 0 0;
      }
      dt {
        padding-top: 0.125rem;
        font-size: 0.6875rem;
        font-weight: 500;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--muted-foreground);
      }
      dd {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.375rem 0.75rem;
        margin: 0;
        color: var(--foreground);
      }
      @media (max-width: 480px) {
        dl {
          grid-template-columns: minmax(0, 1fr);
          gap: 0.125rem;
        }
        dd + dt {
          margin-top: 0.625rem;
        }
      }
      .pill {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 1.5rem;
        padding: 0 0.5rem;
        border: 1px solid var(--border);
        border-radius: 999px;
        color: var(--foreground);
        text-decoration: none;
        white-space: nowrap;
      }
      a.pill:hover {
        background: var(--accent);
      }
      .pill code {
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.6875rem;
        font-weight: 600;
      }
      .sep,
      .muted {
        color: var(--muted-foreground);
      }
      /* the version chip opens the page's releases */
      .pill.version {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 1.5rem;
        padding: 0 0.625rem;
        border: 1px solid var(--border);
        border-radius: 999px;
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.75rem;
        color: var(--foreground);
        cursor: pointer;
      }
      .pill.version:hover {
        background: var(--accent);
      }
      .pill.version:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .pill.version .lucide {
        width: 0.875rem;
        height: 0.875rem;
      }
      .link {
        all: unset;
        color: var(--link, var(--primary));
        text-decoration: underline;
        text-underline-offset: 2px;
        cursor: pointer;
      }
      .aiul {
        display: block;
      }
      .aiul-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
      }
      .aiul-tag {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        min-height: 1.75rem;
        padding: 0.125rem 0.5rem 0.125rem 0.25rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        font-size: 0.8125rem;
        color: var(--foreground);
        cursor: pointer;
      }
      .aiul-tag:hover,
      .aiul-tag[aria-expanded="true"] {
        background: var(--accent);
      }
      .aiul-tag:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .aiul-tag img {
        height: 1.375rem;
        width: auto;
        border-radius: 3px;
      }
      .aiul-tag code {
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.6875rem;
        font-weight: 600;
        padding-left: 0.25rem;
      }
      .aiul-tag .lucide {
        color: var(--muted-foreground);
      }
      .aiul-mod {
        color: var(--muted-foreground);
      }
      .aiul-panel {
        margin-top: 0.625rem;
        padding: 0.875rem 1rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        background: color-mix(in srgb, var(--muted) 45%, transparent);
        font-size: 0.875rem;
        line-height: 1.55;
        text-align: start;
      }
      .aiul-panel p {
        margin: 0;
      }
      .aiul-panel h3 {
        margin: 0.875rem 0 0.25rem;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--muted-foreground);
      }
      .aiul-panel ul {
        margin: 0;
        padding-left: 1.125rem;
      }
      .aiul-panel li + li {
        margin-top: 0.125rem;
      }
      .aiul-links {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem 1rem;
        margin-top: 0.875rem !important;
      }
      .aiul-links a {
        color: var(--link, var(--primary));
      }
      .credits {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .credits li + li {
        margin-top: 0.25rem;
      }
      .used-group {
        display: inline;
      }
      .used-group + .used-group::before {
        content: "";
        display: block;
        height: 0.25rem;
      }
      .via {
        margin-right: 0.375rem;
        color: var(--muted-foreground);
      }
      .panel {
        margin-top: 0.75rem;
        padding: 0.75rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        background: color-mix(in srgb, var(--muted) 50%, transparent);
      }
      .cite-row {
        display: flex;
        gap: 0.75rem;
        align-items: flex-start;
      }
      .cite-note {
        margin: -0.25rem 0 0.625rem;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .cite-dl {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.25rem 0.875rem;
        margin-top: 0.75rem;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .cite-row + .cite-row {
        margin-top: 0.5rem;
      }
      .cite-row b {
        flex: none;
        width: 4.5rem;
        color: var(--foreground);
      }
      .cite-row code,
      pre {
        flex: 1;
        min-width: 0;
        margin: 0;
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.75rem;
        white-space: pre-wrap;
        word-break: break-word;
        text-align: start;
        color: var(--foreground);
      }
      .copy {
        all: unset;
        flex: none;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0 0.5rem;
        height: 1.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.75rem;
        cursor: pointer;
        color: var(--foreground);
      }
      .copy:hover {
        background: var(--accent);
      }
    `}_renderAiul(e){if(!e.length)return"";const t=e.map(o=>i2(o,this._aiul)),r=t.find(o=>o.code===this._aiulOpen),i=o=>this._aiulOpen=this._aiulOpen===o?null:o;return s`<dt>AI use</dt>
      <dd class="aiul">
        <div class="aiul-tags">
          ${t.map((o,n)=>s`<button
              class="aiul-tag"
              aria-expanded="${r===o?"true":"false"}"
              aria-controls="aiul-panel"
              @click="${()=>i(o.code)}"
            >
              ${o.image?s`<img src="${o.image}" alt="" loading="lazy" @error="${l=>l.target.remove()}" />`:s`<code>${o.title}</code>`}
              <span class="aiul-name">${o.name||o.title}${o.modifier?s`<span class="aiul-mod"> · ${o.modifier}</span>`:""}</span>
              ${We(r===o?"oer:chevron-up":"oer:chevron-down","sm")}
            </button>`)}
        </div>
        ${r?s`<div class="aiul-panel" id="aiul-panel" role="region" aria-label="${r.title}${r.name?` (${r.name})`:""}">
              <p class="aiul-desc"><b>${r.title}${r.name?` \xB7 ${r.name}`:""}.</b> ${r.description}${r.modifier?s` Applies to <b>${r.modifier}</b> work.`:""}</p>
              ${r.requirements.length?s`<h3>Requirements</h3>
                    <ul>
                      ${r.requirements.map(o=>s`<li>${o}</li>`)}
                    </ul>`:""}
              ${r.students.length?s`<h3>Guidelines for students</h3>
                    <ul>
                      ${r.students.map(o=>s`<li>${o}</li>`)}
                    </ul>`:""}
              <p class="aiul-links">
                ${r.url?s`<a href="${r.url}" target="_blank" rel="noopener noreferrer">Full ${r.title} license</a>`:""}
                <a href="${va}" target="_blank" rel="noopener noreferrer">About AI Usage Licenses</a>
              </p>
            </div>`:""}
      </dd>`}_renderCredits(){const e=(this._credits||[]).filter(r=>r.title||r.creator||r.license);if(!e.length)return"";const t=(r,i)=>i?s`<a href="${i}" target="_blank" rel="noopener noreferrer">${r}</a>`:r;return s`<dt>Credits</dt>
      <dd>
        <ul class="credits">
          ${e.map(r=>{const i=ke(r.license);return s`<li>
              ${r.title?t(r.title,r.source):""}${r.title&&r.creator?" \u2014 ":""}${r.creator?t(r.creator,r.creatorUrl||(r.title?"":r.source)):""}${(r.title||r.creator)&&r.license?", ":""}${r.license?i?.url?s`<a href="${i.url}" target="_blank" rel="license noopener noreferrer">${i.name}</a>`:r.license:""}
            </li>`})}
        </ul>
      </dd>`}_renderPeople(){const e=this._people;return e.map((t,r)=>{const i=r===e.length-1,o=r===0?"":i?e.length>2?", and ":" and ":", ";return s`${o}${t.url?s`<a href="${t.url}" target="_blank" rel="noopener noreferrer">${t.name}</a>`:t.name}${t.affiliation?` (${t.affiliation})`:""}`})}_renderVersion(){const e=this._item,t=e?.metadata?.version,r=e?.metadata?.updated?new Date(e.metadata.updated*1e3):null;if(!t&&!r)return"";const i=r?r.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"}):"";return s`<dt>${t?"Version":"Updated"}</dt>
      <dd>
        ${t?s`<button
              class="pill version"
              title="All versions"
              aria-label="Version ${t}${e.metadata?.oerSnapshotOf?", archived":""}. All versions"
              @click="${()=>Vi().show(e.metadata?.oerSnapshotOf||e.id)}"
            >
              ${We("icons:history")}v${t}${e.metadata?.oerSnapshotOf?" \xB7 archived":""}
            </button>`:""}
        ${i?s`<span class="${t?"muted":""}">${t?`Updated ${i}`:i}</span>`:""}
      </dd>`}_renderUsedIn(){const e=this._item?.metadata?.oerRef?.page?null:this._item?.id;if(!e)return"";const t=ma(e,B(this._items).types,this._items),r=(this._items||[]).filter(n=>!n.metadata?.oerSnapshotOf&&(n.metadata?.oerCites||[]).includes(e)&&(y.isLoggedIn||n.metadata?.published!==!1));if(!t.length&&!r.length)return"";const i=new Map;for(const n of t)i.set(n.via,[...i.get(n.via)||[],n.item]);r.length&&i.set("Cited by",r);const o=[...i.values()].reduce((n,l)=>n+Math.max(0,l.length-jt),0);return s`<dt>Used in</dt>
      <dd>
        <span>
          ${[...i].map(([n,l])=>{const d=this._usedAll?l:l.slice(0,jt);return s`<span class="used-group"
              ><span class="via">${n}:</span>${d.map((c,p)=>s`${p?", ":""}<a href="${c.slug}">${c.title}</a>`)}${!this._usedAll&&l.length>jt?s`, and ${l.length-jt} more`:""}</span
            >`})}
          ${o?s` <button class="link" aria-expanded="${this._usedAll?"true":"false"}" @click="${()=>this._usedAll=!this._usedAll}">
                ${this._usedAll?"Show fewer":"Show all"}
              </button>`:""}
        </span>
      </dd>`}render(){const e=this._item;if(e?.metadata?.pageType===te)return s``;if(!e?.metadata?.pageType)return e?.metadata?.version?s`<dl>${this._renderVersion()}</dl>`:s``;const t=this._fields,r=ke(t.license),i=this._authors,o=new URLSearchParams(globalThis.location.search).get("hideAILicense")==="true"?[]:A2(t.aiLicense).flatMap(n=>n.split(",")).map(n=>n.trim()).filter(Boolean);return s`
      <div class="top">
        <p class="license">
          ${r?.parts?.length?s`<a class="cc" href="${r.url}" target="_blank" rel="license noopener noreferrer" aria-label="${r.name}">
                ${r.parts.map(n=>s`<img src="${y2(n)}" alt="" loading="lazy" />`)}
              </a>`:""}
          <span>
            <b>${e.title}</b>${i.length?s` by ${this._renderPeople()}`:""}${r?s` is licensed under ${r.url?s`<a href="${r.url}" target="_blank" rel="license noopener noreferrer">${r.name}</a>`:r.name}.`:t.license?s` — ${t.license}.`:""}
          </span>
        </p>
        <span class="actions">
          <button class="btn" aria-expanded="${this._cite?"true":"false"}" @click="${()=>(this._cite=!this._cite,this._schemaOpen=!1)}">
            ${We("editor:format-quote")}Cite
          </button>
          <button
            class="btn badge"
            aria-label="OER Schema: view this page's structured data"
            title="OER Schema: view this page's structured data"
            aria-expanded="${this._schemaOpen?"true":"false"}"
            @click="${()=>(this._schemaOpen=!this._schemaOpen,this._cite=!1)}"
          >
            <img src="${this._dark?Wi.dark:Wi.light}" alt="OER Schema" @error="${n=>n.target.replaceWith(globalThis.document.createTextNode("OER Schema"))}" />
          </button>
        </span>
      </div>
      ${this._cite?s`<div class="panel">
            <div class="cite-row">
              <b>Link</b><code>${this._citeInfo.url}</code>
              <button class="copy" @click="${()=>this._copyText("link",this._citeInfo.url)}">
                ${We(this._copied==="link"?"oer:check":"icons:content-copy")}${this._copied==="link"?"Copied":"Copy"}
              </button>
            </div>
            <p class="cite-note">
              ${this._citeInfo.pinned?`A permanent link to version ${this._citeInfo.version} as released: it keeps working if the page is renamed or moved.`:"A permanent link: it keeps working if the page is renamed or moved."}
            </p>
            ${["APA","MLA","Chicago","BibTeX"].map(n=>s`<div class="cite-row">
                <b>${n}</b><code>${this._citation(n)}</code>
                <button class="copy" @click="${()=>this._copy(n)}">${We(this._copied===n?"oer:check":"icons:content-copy")}${this._copied===n?"Copied":"Copy"}</button>
              </div>`)}
            <div class="cite-dl">
              <span>Save to a reference manager:</span>
              <button class="link" @click="${()=>this._download("ris")}">RIS (Zotero, EndNote, Mendeley)</button>
              <button class="link" @click="${()=>this._download("csl")}">CSL-JSON</button>
              <button class="link" @click="${()=>this._download("bib")}">BibTeX</button>
            </div>
          </div>`:""}
      ${this._schemaOpen?s`<div class="panel">
            <pre>${JSON.stringify(this._schema(),null,2)}</pre>
            <p style="margin:0.5rem 0 0">Published in the page as JSON-LD (<a href="https://oerschema.org/" target="_blank" rel="noopener noreferrer">OER Schema</a> and schema.org) for search engines and repositories.</p>
          </div>`:""}
      <dl>${this._renderAiul(o)}${this._renderVersion()}${this._renderUsedIn()}${this._renderCredits()}</dl>
    `}}customElements.define(Yi.tag,Yi);const Bt=(a,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${S[a]||""}&quot;)"></span>`,Jn=[{key:"hideRubric",label:"Rubric",hint:"Assessment rubrics on the page."},{key:"hideAILicense",label:"AI usage license",hint:"The AIUL notice in the page footer."},{key:"hideHeader",label:"Page header",hint:"Type, description and details under the title."},{key:"hideTitle",label:"Title",hint:"The page title."}];let Lt=class extends M{static get tag(){return"oer-embed-dialog"}static get properties(){return{open:{type:Boolean,reflect:!0},_hide:{state:!0},_height:{state:!0},_copied:{state:!0}}}constructor(){super(),this.open=!1,this._hide={},this._height=600,this._copied="",this.__keys=e=>{this.open&&e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),this._close())}}show(e){this._item=e,this._hide={},this._copied="",this.open=!0,globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector("input")?.focus())}_close(){this.open=!1,globalThis.removeEventListener("keydown",this.__keys,!0)}get _url(){return fi(this._item?.slug,this._hide)}get _code(){const e=(this._item?.title||"Embedded page").replace(/"/g,"&quot;");return`<iframe src="${this._url}" title="${e}" width="100%" height="${this._height}" style="border:0" allowfullscreen></iframe>`}async _copy(e){try{await globalThis.navigator.clipboard.writeText(e==="link"?this._url:this._code),this._copied=e,setTimeout(()=>this._copied="",2e3)}catch{this.shadowRoot.querySelector("textarea")?.select()}}static get styles(){return b`
      :host {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: none;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
      }
      :host([open]) {
        display: grid;
        place-items: center;
      }
      .backdrop {
        position: absolute;
        inset: 0;
        background: rgb(0 0 0 / 0.5);
      }
      .dialog {
        position: relative;
        display: flex;
        flex-direction: column;
        width: min(64rem, calc(100vw - 2rem));
        height: min(44rem, calc(100dvh - 2rem));
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
        overflow: hidden;
      }
      button,
      input,
      textarea {
        font: inherit;
        color: inherit;
      }
      :focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .lucide {
        flex: none;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      header {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        padding: 1rem 0.75rem 1rem 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      .heading {
        flex: 1;
      }
      h2 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
      }
      .sub {
        margin: 0.125rem 0 0;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .x {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md);
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .x:hover {
        background: var(--accent);
      }
      .body {
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: 20rem minmax(0, 1fr);
      }
      .side {
        overflow-y: auto;
        padding: 1.25rem;
        border-right: 1px solid var(--border);
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }
      h3 {
        margin: 0 0 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
      }
      .opt {
        display: flex;
        gap: 0.625rem;
        padding: 0.375rem 0;
        cursor: pointer;
      }
      .opt input {
        margin-top: 0.1875rem;
        accent-color: var(--primary);
      }
      .opt b {
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
      }
      .opt span {
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      label.field {
        display: block;
        margin-bottom: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
      }
      .input {
        box-sizing: border-box;
        width: 100%;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        font-size: 0.875rem;
      }
      textarea {
        box-sizing: border-box;
        width: 100%;
        min-height: 7rem;
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--muted);
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.75rem;
        resize: vertical;
      }
      .row {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.5rem;
      }
      .btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2.25rem;
        padding: 0 0.875rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
      }
      .btn.primary {
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .btn.outline {
        border: 1px solid var(--input-border, var(--border));
      }
      .btn.outline:hover {
        background: var(--accent);
      }
      .hint {
        margin: 0.375rem 0 0;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .preview {
        display: flex;
        flex-direction: column;
        min-height: 0;
        padding: 1.25rem;
        background: var(--muted);
      }
      .preview iframe {
        flex: 1;
        width: 100%;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        background: var(--background);
      }
      @media (max-width: 760px) {
        .body {
          grid-template-columns: minmax(0, 1fr);
          grid-template-rows: auto minmax(16rem, 1fr);
        }
        .side {
          border-right: 0;
          border-bottom: 1px solid var(--border);
        }
      }
    `}render(){return this.open?s`
      <div class="backdrop" @click="${this._close}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${Bt("icons:open-in-new")}Embed this page</h2>
            <p class="sub">${this._item?.title} — for an LMS (Canvas resizes the frame to fit) or any website.</p>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._close}">${Bt("oer:x")}</button>
        </header>
        <div class="body">
          <div class="side">
            <div>
              <h3>Leave out</h3>
              ${Jn.map(e=>s`<label class="opt">
                  <input type="checkbox" .checked="${!!this._hide[e.key]}" @change="${t=>this._hide={...this._hide,[e.key]:t.target.checked}}" />
                  <span><b>${e.label}</b><span>${e.hint}</span></span>
                </label>`)}
            </div>
            <div>
              <label class="field" for="h">Starting height (px)</label>
              <input id="h" class="input" type="number" min="200" step="50" .value="${String(this._height)}" @input="${e=>this._height=Number(e.target.value)||600}" />
              <p class="hint">Canvas and other LTI hosts adjust it to the content automatically.</p>
            </div>
            <div>
              <label class="field" for="code">Embed code</label>
              <textarea id="code" readonly .value="${this._code}" @focus="${e=>e.target.select()}"></textarea>
              <div class="row">
                <button class="btn primary" @click="${()=>this._copy("code")}">${Bt(this._copied==="code"?"oer:check":"icons:content-copy")}${this._copied==="code"?"Copied":"Copy code"}</button>
                <button class="btn outline" @click="${()=>this._copy("link")}">${Bt(this._copied==="link"?"oer:check":"icons:link")}${this._copied==="link"?"Copied":"Copy link"}</button>
              </div>
            </div>
          </div>
          <div class="preview">
            <h3>Preview</h3>
            <iframe src="${this._url}" title="Preview of the embedded page"></iframe>
          </div>
        </div>
      </div>
    `:s``}};customElements.define(Lt.tag,Lt);function Gi(){const a=globalThis.document;return a.querySelector(Lt.tag)||a.body.appendChild(a.createElement(Lt.tag))}Qe(`url("${S["icons:chevron-right"]}")`);const Xn={"map-menu-item, map-menu-header":b`
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
  `,"map-menu-submenu":b`
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
  `,"map-menu-container":b`
    #activeindicator {
      display: none !important;
    }
  `,"map-menu-builder":b`
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
  `,"a11y-collapse":b`
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
  `},Ji=["multiple-choice","true-false-question","fill-in-the-blanks","matching-question","sorting-question","tagging-question"],Xi=b`
  :host {
    display: block !important;
    margin: 1.5rem 0 !important;
    padding: 1.25rem !important;
    border: 1px solid var(--border) !important;
    border-radius: var(--radius-lg) !important;
    background: var(--card, var(--background)) !important;
    color: var(--card-foreground, var(--foreground)) !important;
    box-shadow: none !important;
    font-family: var(--font-sans) !important;
    font-size: 1rem !important;
    line-height: 1.6 !important;
    transition: none !important;
    text-align: start !important;
  }
  :host(:hover),
  :host(:focus-within) {
    border-color: var(--border) !important;
  }
`,Zn={[Ji.join(", ")]:b`
    ${Xi}
    :host {
      --simple-fields-field-checked-color: var(--primary);
      --simple-fields-field-checked-ink-color: var(--primary);
      --simple-fields-field-checkmark-color: var(--primary-foreground);
      --simple-fields-field-color: var(--foreground);
      --simple-fields-field-label-color: var(--foreground);
      --simple-fields-field-error-color: var(--destructive);
      --simple-toolbar-button-border-color: var(--input-border, var(--border));
      --grid-plate-item-margin: 0;
      --grid-plate-item-padding: 0;
      --ddd-theme-primary: var(--primary);
    }
    grid-plate {
      transition: none !important;
      view-transition-name: none !important;
    }
    details {
      transition: none !important;
      view-transition-name: none !important;
    }
    /* section headers ("Question", "Feedback", "Directions"): small labels */
    summary {
      padding: 0 0 0.5rem !important;
      font-family: var(--font-sans) !important;
      font-size: 0.75rem !important;
      font-weight: 600 !important;
      letter-spacing: 0.06em !important;
      text-transform: uppercase !important;
      color: var(--muted-foreground) !important;
      background: transparent !important;
      border: 0 !important;
      filter: none !important;
      transition: none !important;
      --simple-icon-color: var(--muted-foreground);
    }
    summary:hover,
    summary:focus {
      background: transparent !important;
      color: var(--foreground) !important;
    }
    summary:focus-visible {
      outline: 2px solid var(--ring) !important;
      outline-offset: 2px !important;
      border-radius: var(--radius-sm) !important;
    }
    summary::after {
      font-size: 1rem !important;
      color: var(--muted-foreground) !important;
    }
    .details-icon {
      --simple-icon-height: 0.875rem;
      --simple-icon-width: 0.875rem;
    }
    details[open] > summary {
      background: transparent !important;
      border: 0 !important;
    }
    details[open] .container {
      padding: 0 !important;
      border: 0 !important;
    }
    details[open] p {
      padding: 0 !important;
    }
    /* the question itself */
    h3 {
      margin: 0 0 0.75rem !important;
      font-family: var(--font-sans) !important;
      font-size: 1.0625rem !important;
      font-weight: 600 !important;
      line-height: 1.4 !important;
      color: var(--foreground) !important;
    }
    fieldset.options,
    fieldset {
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 0.375rem !important;
    }
    simple-fields-field {
      margin: 0 !important;
      padding: 0.5rem 0.75rem !important;
      border: 1px solid var(--border) !important;
      border-radius: var(--radius-md) !important;
      background: var(--background) !important;
      box-shadow: none !important;
      color: var(--foreground) !important;
    }
    :host simple-fields-field:hover,
    :host simple-fields-field:focus-within {
      background: var(--accent) !important;
      color: var(--foreground) !important;
      border-color: var(--input-border, var(--border)) !important;
      box-shadow: none !important;
    }
    #buttons {
      justify-content: flex-start !important;
      gap: 0.5rem !important;
      margin: 0.875rem 0 0 !important;
    }
    /* Check answer / Try again (and other actions): shadcn buttons */
    simple-toolbar-button::part(button) {
      height: 2.25rem !important;
      min-height: 0 !important;
      padding: 0 1rem !important;
      border: 1px solid var(--input-border, var(--border)) !important;
      border-radius: var(--radius-md) !important;
      background: var(--background) !important;
      color: var(--foreground) !important;
      box-shadow: none !important;
      opacity: 1 !important;
    }
    simple-toolbar-button::part(label) {
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
      font-weight: 500 !important;
      line-height: 1 !important;
    }
    #check::part(button) {
      border-color: transparent !important;
      background: var(--primary) !important;
      color: var(--primary-foreground) !important;
    }
    :host simple-toolbar-button:hover::part(button),
    :host simple-toolbar-button:focus-within::part(button) {
      background: var(--accent) !important;
      color: var(--foreground) !important;
    }
    :host #check:hover::part(button),
    :host #check:focus-within::part(button) {
      background: color-mix(in srgb, var(--primary) 88%, black) !important;
      color: var(--primary-foreground) !important;
    }
    simple-toolbar-button[disabled]::part(button) {
      opacity: 0.5 !important;
      cursor: default !important;
    }
    /* feedback, directions and the correct / incorrect legend sit below */
    #feedback,
    #directions > summary {
      margin-top: 1rem !important;
    }
    dt.correct {
      color: oklch(0.5 0.13 150) !important;
    }
    dt.incorrect {
      color: var(--destructive) !important;
    }
    :host p,
    :host li,
    :host dd {
      text-align: start !important;
      font-size: 0.875rem !important;
      color: var(--muted-foreground) !important;
    }
  `,"self-check":b`
    ${Xi}
    :host {
      padding: 0 !important;
      overflow: hidden !important;
    }
    .card {
      margin: 0 !important;
      box-shadow: none !important;
      border: 0 !important;
      background: transparent !important;
    }
    .triangle,
    .image-wrap:empty {
      display: none !important;
    }
    #header_wrap {
      display: flex !important;
      align-items: center !important;
      gap: 0.5rem !important;
      margin: 0 !important;
      padding: 1rem 1.25rem 0 !important;
      background: transparent !important;
      color: var(--muted-foreground) !important;
      --simple-icon-color: var(--muted-foreground);
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
    }
    #questionmark {
      width: 1rem !important;
      height: 1rem !important;
      padding: 0 !important;
      margin: 0 !important;
      border: 0 !important;
      background: transparent !important;
    }
    #title,
    .heading {
      margin: 0 !important;
      padding: 0 !important;
      font-family: var(--font-sans) !important;
      font-size: 0.75rem !important;
      font-weight: 600 !important;
      letter-spacing: 0.06em !important;
      text-transform: uppercase !important;
      color: var(--muted-foreground) !important;
    }
    #question_wrap {
      position: relative !important;
      background: transparent !important;
      color: var(--foreground) !important;
    }
    .question {
      display: flex !important;
      align-items: flex-start !important;
      gap: 1rem !important;
      padding: 0.5rem 1.25rem 1.25rem !important;
      font-size: 1.0625rem !important;
      font-weight: 500 !important;
      line-height: 1.5 !important;
    }
    .check_button {
      margin-left: auto !important;
      flex: none !important;
    }
    .check-btn,
    #closeBtn {
      --simple-icon-color: var(--foreground);
      --simple-icon-height: 1.125rem;
      --simple-icon-width: 1.125rem;
      width: 2.25rem !important;
      height: 2.25rem !important;
      border: 1px solid var(--input-border, var(--border)) !important;
      border-radius: var(--radius-md) !important;
      background: var(--background) !important;
      color: var(--foreground) !important;
    }
    .check-btn:hover,
    #closeBtn:hover {
      background: var(--accent) !important;
    }
    #answer_wrap {
      background: color-mix(in srgb, var(--muted) 70%, var(--background)) !important;
      border-top: 1px solid var(--border) !important;
      color: var(--foreground) !important;
      transition: none !important;
    }
    .answer {
      display: flex !important;
      align-items: flex-start !important;
      gap: 1rem !important;
      padding: 1rem 1.25rem !important;
      font-size: 0.9375rem !important;
      line-height: 1.6 !important;
      color: var(--foreground) !important;
    }
    .close_button {
      margin-left: auto !important;
      flex: none !important;
    }
  `,"stop-note":b`
    :host {
      display: block !important;
      margin: 1.5rem 0 !important;
      font-family: var(--font-sans) !important;
    }
    .container {
      display: block !important;
      padding: 0.875rem 1rem 0.875rem 1.125rem !important;
      border: 1px solid var(--border) !important;
      border-left: 3px solid oklch(0.62 0.15 70) !important;
      border-radius: var(--radius-lg) !important;
      background: color-mix(in srgb, oklch(0.62 0.15 70) 7%, var(--background)) !important;
      box-shadow: none !important;
    }
    .svg_wrap {
      display: none !important;
    }
    .message_wrap {
      padding: 0 !important;
      margin: 0 !important;
      background: transparent !important;
      border: 0 !important;
    }
    .main_message,
    h3 {
      margin: 0 0 0.25rem !important;
      font-family: var(--font-sans) !important;
      font-size: 0.9375rem !important;
      font-weight: 600 !important;
      color: var(--foreground) !important;
    }
    .secondary_message {
      font-size: 0.9375rem !important;
      line-height: 1.6 !important;
      color: var(--foreground) !important;
    }
  `,"flash-card":b`
    :host {
      display: block !important;
      margin: 1.5rem 0 !important;
      font-family: var(--font-sans) !important;
    }
  `,"flash-card-answer-box":b`
    :host {
      font-family: var(--font-sans) !important;
      color: var(--foreground) !important;
    }
    :host > div,
    div {
      border-radius: var(--radius-lg) !important;
      border-color: var(--border) !important;
      box-shadow: none !important;
    }
  `,"vocab-term":b`
    :host {
      font-family: var(--font-sans) !important;
    }
    summary,
    #summary {
      display: inline !important;
      padding: 0 !important;
      color: var(--link, var(--primary)) !important;
      text-decoration: underline dotted !important;
      text-underline-offset: 3px !important;
      cursor: help !important;
      background: transparent !important;
      font-weight: inherit !important;
    }
  `};function Zi(a){const e=a.shadowRoot?.querySelector("grid-plate");e&&e.getAttribute("layout")!=="1"&&e.setAttribute("layout","1");const t=a.shadowRoot?.querySelector("#directions");t&&!a.__oerDirections&&(a.__oerDirections=!0,t.removeAttribute("open"))}let Qi=!1;function Qn(){if(Qi)return;Qi=!0;const a=e=>{const t=customElements.get(e);if(!t||t.prototype.__oerStacked)return;const r=t.prototype.updated;t.prototype.updated=function(i){r?.call(this,i),Zi(this)},t.prototype.__oerStacked=!0,globalThis.document.querySelectorAll(e).forEach(Zi)};for(const e of Ji)customElements.get(e)?a(e):customElements.whenDefined(e).then(()=>a(e))}let eo=!1,V=null,It=null;function to(a){const e=a?.getAttribute?.("href")||"";if(!e.startsWith("#")||e.length<2)return null;try{return globalThis.document.getElementById(decodeURIComponent(e.slice(1)))}catch{return null}}function es(a){a.hasAttribute("tabindex")||a.setAttribute("tabindex","-1"),a.scrollIntoView({block:"center"}),a.focus({preventScroll:!0});const{pathname:e,search:t}=globalThis.location;globalThis.history.replaceState(globalThis.history.state,"",`${e}${t}#${a.id}`)}function ts(){return V||(V=globalThis.document.createElement("div"),V.className="oer-fn-tip",V.setAttribute("role","tooltip"),V.id="oer-fn-tip",V.hidden=!0,V.addEventListener("pointerenter",()=>clearTimeout(It)),V.addEventListener("pointerleave",()=>Te()),globalThis.document.body.append(V),V)}function ro(a){const e=to(a);if(!e)return;clearTimeout(It);const t=ts(),r=e.cloneNode(!0);r.querySelectorAll(".fn-back").forEach(d=>d.remove()),r.querySelectorAll("[id]").forEach(d=>d.removeAttribute("id")),t.innerHTML=`<span class="oer-fn-num">${a.textContent.trim()}</span> ${r.innerHTML}`,t.hidden=!1,a.setAttribute("aria-describedby",t.id);const i=a.getBoundingClientRect(),o=Math.min(t.offsetWidth,globalThis.innerWidth-16),n=Math.max(8,Math.min(i.left+i.width/2-o/2,globalThis.innerWidth-o-8)),l=i.top-t.offsetHeight-8;t.style.left=`${n}px`,t.style.top=`${l>8?l:i.bottom+8}px`}function Te(a=!1){clearTimeout(It),It=setTimeout(()=>{V&&(V.hidden=!0)},a?0:150)}const T2=a=>a?.closest?.("sup.fn-ref");function rs(){if(eo)return;eo=!0;const a=globalThis.document;globalThis.addEventListener("click",e=>{if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;const t=e.composedPath().find(i=>i?.localName==="a"&&(i.getAttribute("href")||"").startsWith("#"));if(!t||t.closest("[contenteditable], hax-body"))return;const r=to(t);r&&(e.preventDefault(),e.stopPropagation(),Te(!0),es(r))},!0),a.addEventListener("pointerover",e=>{const t=e.target.closest?.("sup.fn-ref a");t&&ro(t)}),a.addEventListener("pointerout",e=>{T2(e.target)&&!T2(e.relatedTarget)&&Te()}),a.addEventListener("focusin",e=>{const t=e.target.closest?.("sup.fn-ref a");t&&ro(t)}),a.addEventListener("focusout",e=>{T2(e.target)&&Te()}),a.addEventListener("keydown",e=>{e.key==="Escape"&&V&&!V.hidden&&Te(!0)}),globalThis.addEventListener("scroll",()=>Te(!0),{passive:!0,capture:!0})}const Rt=(a,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${S[a]||""}&quot;)"></span>`,z2={size:1,font:"serif",width:"medium",spacing:"normal",colour:"light"},io=[17,19,21,24],oo={narrow:"60ch",medium:"68ch",wide:"80ch"},ao={normal:1.7,relaxed:1.95},j2={serif:'"Source Serif 4", "Source Serif Pro", Georgia, Cambria, "Times New Roman", serif',sans:'var(--font-sans, "Inter", system-ui, sans-serif)'},is="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400..700;1,8..60,400..700&display=swap",no="oer-reader-settings";function os(){try{return{...z2,...JSON.parse(globalThis.localStorage.getItem(no)||"{}")}}catch{return{...z2}}}function as(a){try{globalThis.localStorage.setItem(no,JSON.stringify(a))}catch{}}function ns(a){if(a.font==="serif"&&!globalThis.document.getElementById("oer-reader-serif")){const e=Object.assign(globalThis.document.createElement("link"),{id:"oer-reader-serif",rel:"stylesheet",href:is});globalThis.document.head.append(e)}return{"--reader-size":`${io[a.size]??io[1]}px`,"--reader-measure":oo[a.width]||oo.medium,"--reader-leading":String(ao[a.spacing]||ao.normal),"--reader-font":j2[a.font]||j2.serif}}let B2=class extends M{static get tag(){return"oer-reader-bar"}static get properties(){return{book:{type:Object},position:{type:Object},prev:{type:Object},next:{type:Object},settings:{type:Object},_panel:{state:!0}}}constructor(){super(),this.book=null,this.position={index:0,total:0},this.prev=null,this.next=null,this.settings={...z2},this._panel="",this.__outside=e=>{this._panel&&!e.composedPath().includes(this)&&(this._panel="")},this.__keys=e=>{if(e.key==="Escape"&&this._panel){e.stopPropagation();const t=this.shadowRoot.querySelector(`[aria-controls="panel-${this._panel}"]`);this._panel="",t?.focus()}}}connectedCallback(){super.connectedCallback(),globalThis.addEventListener("pointerdown",this.__outside,!0),globalThis.addEventListener("keydown",this.__keys,!0)}disconnectedCallback(){globalThis.removeEventListener("pointerdown",this.__outside,!0),globalThis.removeEventListener("keydown",this.__keys,!0),super.disconnectedCallback()}updated(e){e.has("position")&&e.get("position")?.index!==this.position?.index&&(this._panel="")}_toggle(e){this._panel=this._panel===e?"":e,this._panel&&this.updateComplete.then(()=>this.shadowRoot.querySelector(`#panel-${e} [tabindex], #panel-${e} button, #panel-${e} oer-site-nav`)?.focus?.())}_set(e,t){const r={...this.settings,[e]:t};this.dispatchEvent(new CustomEvent("reader-settings",{detail:r,bubbles:!0,composed:!0}))}_seg(e,t,r){return s`<div class="setting">
      <span class="setting-label" id="lbl-${t}">${e}</span>
      <div class="seg" role="group" aria-labelledby="lbl-${t}">
        ${r.map(([i,o,n])=>s`<button aria-pressed="${this.settings[t]===i?"true":"false"}" class="${n||""}" @click="${()=>this._set(t,i)}">${o}</button>`)}
      </div>
    </div>`}_arrow(e,t,r){return e?s`<a class="arrow" href="${e.slug}" aria-label="${t}: ${e.title}" title="${t}: ${e.title}">${Rt(r)}</a>`:s`<button class="arrow" disabled aria-label="${t}">${Rt(r)}</button>`}render(){const{index:e=0,total:t=0}=this.position||{},r=t?Math.round((e+1)/t*100):0;return s`<header class="bar" part="reader-bar">
        <div class="tools">
          <button class="btn" aria-controls="panel-contents" aria-expanded="${this._panel==="contents"?"true":"false"}" @click="${()=>this._toggle("contents")}">
            ${Rt("oer:list")}<span class="label">Contents</span>
          </button>
          <button class="btn" aria-controls="panel-text" aria-expanded="${this._panel==="text"?"true":"false"}" @click="${()=>this._toggle("text")}">
            <span class="aa" aria-hidden="true">Aa</span><span class="label">Text</span>
          </button>
        </div>
        <div class="where">
          ${this.book?s`<a class="book" href="${this.book.slug}">${this.book.title}</a>`:""}
          <nav class="turn" aria-label="Previous and next page">
            ${this._arrow(this.prev,"Previous","oer:chevron-left")}
            ${t?s`<span class="pos"><span class="sr">Page </span>${e+1}<span aria-hidden="true"> / </span><span class="sr"> of </span>${t}</span>`:""}
            ${this._arrow(this.next,"Next","oer:chevron-right")}
          </nav>
        </div>
        <div class="tools end">
          <button class="btn exit" @click="${()=>this.dispatchEvent(new CustomEvent("reader-exit",{bubbles:!0,composed:!0}))}">
            ${Rt("oer:x")}<span class="label">Exit reader</span>
          </button>
        </div>
        <div class="progress" role="progressbar" aria-label="How far through the book" aria-valuemin="1" aria-valuemax="${t||1}" aria-valuenow="${e+1}">
          <span style="width:${r}%"></span>
        </div>
      </header>
      ${this._panel==="contents"?s`<div class="panel contents" id="panel-contents" role="dialog" aria-label="Contents">
            <oer-site-nav .root="${this.book?.id||null}" .filter="${""}"></oer-site-nav>
          </div>`:""}
      ${this._panel==="text"?s`<div class="panel text" id="panel-text" role="dialog" aria-label="Text settings">
            ${this._seg("Text size","size",[[0,"A","s0"],[1,"A","s1"],[2,"A","s2"],[3,"A","s3"]])}
            ${this._seg("Typeface","font",[["serif","Serif","serif"],["sans","Sans","sans"]])}
            ${this._seg("Line width","width",[["narrow","Narrow"],["medium","Medium"],["wide","Wide"]])}
            ${this._seg("Line spacing","spacing",[["normal","Normal"],["relaxed","Relaxed"]])}
            ${this._seg("Page","colour",[["light","Light","c-light"],["sepia","Sepia","c-sepia"],["dark","Dark","c-dark"]])}
            <p class="hint">Turn pages with <kbd>←</kbd> and <kbd>→</kbd>. Settings are remembered on this device.</p>
          </div>`:""}`}static get styles(){return b`
      :host {
        position: relative;
        display: block;
        flex: none;
        z-index: 20;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
        /* DDD justifies the theme */
        text-align: start;
      }
      .bar {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: var(--topbar-height, 3.5rem);
        padding: 0 1rem;
        border-bottom: 1px solid var(--border);
        background: var(--background);
      }
      /* the tools either side take equal room, so the book stays centred */
      .tools {
        flex: 1 1 0;
        display: flex;
        gap: 0.5rem;
      }
      .tools.end {
        justify-content: flex-end;
      }
      .where {
        flex: 0 1 auto;
        min-width: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        font-size: 0.875rem;
      }
      .book {
        overflow: hidden;
        color: inherit;
        font-weight: 600;
        text-decoration: none;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .book:hover {
        text-decoration: underline;
      }
      .turn {
        flex: none;
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .pos {
        min-width: 3.5rem;
        color: var(--muted-foreground);
        font-variant-numeric: tabular-nums;
        text-align: center;
      }
      .arrow {
        display: inline-grid;
        place-items: center;
        box-sizing: border-box;
        width: 2rem;
        height: 2rem;
        padding: 0;
        border: 1px solid var(--border);
        border-radius: var(--radius-md, 0.5rem);
        background: var(--background);
        color: inherit;
        cursor: pointer;
      }
      a.arrow:hover {
        background: var(--accent, var(--muted));
      }
      .arrow:disabled {
        color: var(--muted-foreground);
        opacity: 0.5;
        cursor: default;
      }
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        box-sizing: border-box;
        height: 2rem;
        padding: 0 0.75rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md, 0.5rem);
        background: var(--background);
        color: inherit;
        font: inherit;
        font-size: 0.875rem;
        font-weight: 500;
        white-space: nowrap;
        cursor: pointer;
      }
      .btn:hover,
      .btn[aria-expanded="true"] {
        background: var(--accent, var(--muted));
      }
      .aa {
        font-family: Georgia, serif;
        font-weight: 600;
      }
      /* how far through the book: a thin line under the bar, not animated */
      .progress {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -1px;
        height: 2px;
      }
      .progress span {
        display: block;
        height: 100%;
        background: var(--primary);
      }
      .panel {
        position: absolute;
        top: calc(var(--topbar-height, 3.5rem) + 0.5rem);
        z-index: 30;
        box-sizing: border-box;
        max-height: calc(100dvh - var(--topbar-height, 3.5rem) - 2rem);
        overflow-y: auto;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg, 0.75rem);
        background: var(--popover, var(--background));
        color: var(--popover-foreground, var(--foreground));
        box-shadow: 0 12px 32px rgb(0 0 0 / 0.18);
      }
      /* both open under their buttons, at the bar's left */
      .panel.contents {
        left: 1rem;
        width: min(24rem, calc(100vw - 2rem));
        padding: 0.5rem;
      }
      .panel.text {
        left: 1rem;
        width: min(21rem, calc(100vw - 2rem));
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.875rem;
      }
      .setting {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }
      .setting-label {
        font-size: 0.875rem;
        font-weight: 500;
      }
      .seg {
        display: flex;
        box-sizing: border-box;
        height: 2.25rem;
        padding: 0.1875rem;
        gap: 0.125rem;
        border-radius: var(--radius-md, 0.5rem);
        background: var(--muted);
      }
      .seg button {
        flex: 1;
        display: inline-grid;
        place-items: center;
        border: 0;
        border-radius: calc(var(--radius-md, 0.5rem) - 2px);
        background: transparent;
        color: var(--muted-foreground);
        font: inherit;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
      }
      .seg button[aria-pressed="true"] {
        background: var(--background);
        color: var(--foreground);
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.08);
      }
      .seg .s0 {
        font-size: 0.75rem;
      }
      .seg .s1 {
        font-size: 0.9375rem;
      }
      .seg .s2 {
        font-size: 1.125rem;
      }
      .seg .s3 {
        font-size: 1.375rem;
      }
      .seg .serif {
        font-family: ${Qe(j2.serif)};
      }
      /* page colours show as themselves */
      .seg .c-light {
        background: #fff;
        color: #1f2328;
      }
      .seg .c-sepia {
        background: #f5ecdc;
        color: #3d2f1f;
      }
      .seg .c-dark {
        background: #16181d;
        color: #e8e6e3;
      }
      .seg .c-light,
      .seg .c-sepia,
      .seg .c-dark {
        margin: 0 0.0625rem;
        outline: 1px solid rgb(0 0 0 / 0.08);
      }
      .seg .c-light[aria-pressed="true"],
      .seg .c-sepia[aria-pressed="true"],
      .seg .c-dark[aria-pressed="true"] {
        outline: 2px solid var(--primary);
      }
      .hint {
        margin: 0;
        font-size: 0.8125rem;
        line-height: 1.5;
        color: var(--muted-foreground);
      }
      kbd {
        padding: 0 0.3125rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-sm, 0.25rem);
        background: var(--muted);
        font-family: var(--font-mono, monospace);
        font-size: 0.75rem;
      }
      :focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .lucide {
        flex: none;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
      @media (max-width: 600px) {
        .label {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip-path: inset(50%);
        }
        .btn {
          padding: 0 0.5rem;
        }
        /* the counter and arrows stay; the book's title is in Contents */
        .where .book {
          display: none;
        }
      }
    `}};customElements.get(B2.tag)||customElements.define(B2.tag,B2);let so=!1;const ss="(max-width: 767px)";function z(a){return s`<span
    class="lucide"
    aria-hidden="true"
    style="--src:url(&quot;${S[a]}&quot;)"
  ></span>`}const E={share:s`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`,panelLeft:s`<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></svg>`,search:s`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,sun:s`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.07-2.93 1.41-1.41m11.32-11.32 1.41-1.41M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41"/></svg>`,moon:s`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,bookOpen:s`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>`,undo:z("icons:undo"),redo:z("icons:redo"),save:z("icons:save"),chevronDown:z("icons:expand-more"),pencil:z("icons:create"),lock:z("icons:lock"),user:z("social:person"),layoutDashboard:z("hax:home-edit"),logOut:z("icons:exit-to-app"),type:z("editor:title"),shapes:z("hax:hax2022"),image:z("image:photo-library"),tag:z("icons:label"),history:z("icons:history"),chart:z("hax:graph"),eye:z("icons:visibility"),eyeOff:z("icons:visibility-off"),lockOpen:z("icons:lock-open"),trash:z("icons:delete"),book:z("lrn:book"),siteMap:z("hax:site-map"),settings:z("icons:settings"),types:z("hax:templates"),files:z("oer:files"),details:z("image:tune"),code:z("icons:code"),chevronLeft:s`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>`,chevronRight:s`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`};let lo=class extends N2{static get tag(){return"custom-oer-docs-theme"}static get properties(){return{...super.properties,collapsed:{type:Boolean,reflect:!0},mobileOpen:{type:Boolean,reflect:!0,attribute:"mobile-open"},dark:{type:Boolean,reflect:!0},siteTitle:{type:String},_prev:{state:!0},_next:{state:!0},_loggedIn:{state:!0},_userName:{state:!0},_activeTitle:{state:!0},_locked:{state:!0},_published:{state:!0},_pageMenuOpen:{state:!0},_banner:{state:!0},_canEmbed:{state:!0},_sidebarTab:{state:!0},_userMenuOpen:{state:!0},_book:{state:!0},_bookFilter:{state:!0},reader:{type:Boolean,reflect:!0},readerColour:{type:String,reflect:!0,attribute:"reader-colour"},_readerSettings:{state:!0},_readerPos:{state:!0},embed:{type:Boolean,reflect:!0},hideHeader:{type:Boolean,reflect:!0,attribute:"hide-header"},hideTitle:{type:Boolean,reflect:!0,attribute:"hide-title"},_siteDescription:{state:!0}}}constructor(){super(),this.HAXCMSThemeSettings.autoScroll=!0,this.collapsed=!1,this.mobileOpen=!1,this.dark=!1,this.siteTitle="",this.__mq=globalThis.matchMedia(ss),this.__keyHandler=this._onKeydown.bind(this),this._loggedIn=!1,this._pageMenuOpen=!1,this.reader=!1,this.readerColour="",this._readerSettings=os(),this._readerPos=null;try{this.__readerBook=globalThis.sessionStorage.getItem("oer-reader-book")||""}catch{this.__readerBook=""}this.__onReader=()=>this._enterReader();const e=new URLSearchParams(globalThis.location.search);this.embed=hi(),this.hideHeader=this.embed&&e.get("hideHeader")==="true",this.hideTitle=this.embed&&e.get("hideTitle")==="true";try{this._sidebarTab=globalThis.localStorage.getItem("oer-sidebar-tab")==="site"?"site":"nav"}catch{this._sidebarTab="nav"}this.__outsideMenu=t=>{const r=t.composedPath();this._userMenuOpen&&!r.includes(this.shadowRoot.querySelector(".user-wrap"))&&(this._userMenuOpen=!1),this._pageMenuOpen&&!r.includes(this.shadowRoot.querySelector(".page-header .menu-wrap"))&&(this._pageMenuOpen=!1)},this.__disposer.push(R(()=>{const t=_(y.isLoggedIn),r=_(y.userData),i=_(y.activeItem),o=_(y.manifest);Promise.resolve().then(()=>{this._siteDescription=o?.description||"",this._loggedIn=!!t,this._userName=r?.userName||"",this._activeTitle=i?.title||"",this._locked=!!i?.metadata?.locked,this._published=i?.metadata?.published!==!1;const n=i?.metadata?.oerRef?.page,l=((n?(o?.items||[]).find(d=>d.id===n):null)||i)?.metadata?.oerFields||{};this._banner=l.image?{src:l.image,alt:l.imageAlt||""}:null,this._embedItem=i,this._canEmbed=!!i&&!hi()&&l.allowEmbed!==!1&&i.metadata?.published!==!1})})),this.__editorBarObserver=new ResizeObserver(()=>this._measureEditorBar()),this.__bodyObserver=new MutationObserver(()=>this._watchEditorBar()),this.__disposer.push(R(()=>{const t=_(y.darkMode);Promise.resolve().then(()=>{this.dark=!!t})})),this.__disposer.push(R(()=>{const t=_(y.siteTitle);Promise.resolve().then(()=>{this.siteTitle=t||""})})),this.__disposer.push(R(()=>{const t=_(y.manifest?.items)||[];t.length&&new URLSearchParams(globalThis.location.search).has("p")&&Promise.resolve().then(()=>Wn(t))})),this.__disposer.push(R(()=>{const t=_(y.manifest?.items)||[];this.__viewerOpened||!t.length||!new URLSearchParams(globalThis.location.search).has("view")||(this.__viewerOpened=!0,Promise.resolve().then(()=>Nn(t)))})),this.__disposer.push(R(()=>{const t=_(y.activeId),r=!!y.isLoggedIn;t&&(clearTimeout(this.__contentCheck),this.__contentCheck=setTimeout(()=>{const i=globalThis.document.querySelector("haxcms-site-builder");!i||i.loading||!i.activeItemLocation||i.__pageContentOwner===t||y.activeId===t&&i.loadPageData?.()},r?1200:2e3))})),this.__scrollPositions=new Map,this.__onPopState=()=>this.__historyNavAt=Date.now(),globalThis.addEventListener("popstate",this.__onPopState,!0),this.__disposer.push(R(()=>{const t=_(y.activeId);if(!t)return;const r=this.__scrolledFor;this.__scrolledFor=t,r&&r!==t&&this.__scrollPositions.set(r,this._scrollTop()),!(!r||r===t)&&setTimeout(()=>{if(y.activeId!==t)return;const i=Date.now()-(this.__historyNavAt||0)<1e3;this.__historyNavAt=0,i&&this.__scrollPositions.has(t)?this._restoreScroll(this.__scrollPositions.get(t)):globalThis.location.hash||this._scrollTo(0)})})),this.__disposer.push(R(()=>{const t=_(y.activeId),r=_(y.manifest?.items)||[],i=this._bookOf(t,r),o=!!y.isLoggedIn;let n=(_(y.routerManifest?.items)||[]).filter(m=>!de(m)&&!be(m)&&!ve(m)&&!m.metadata?.hideInMenu&&(o||m.metadata?.published!==!1));if(i){const m=new Set([i.id,...at(r,i.id).map(v=>v.item.id)]);n=n.filter(v=>m.has(v.id))}const l=r.find(m=>m.id===t),d=l?.metadata?.oerSnapshotOf,c=d&&r.find(m=>m.id===d)?.metadata?.oerNavVersion===l.metadata.version?d:t,p=n.findIndex(m=>m.id===c),h=m=>{const v=m?.metadata?.oerNavVersion,u=v&&r.find(g=>g.metadata?.oerSnapshotOf===m.id&&g.metadata?.version===v);return m&&u?{...m,slug:u.slug}:m};Promise.resolve().then(()=>{this.mobileOpen=!1,i?.id!==this._book?.id&&(this._bookFilter=""),this._book=i,this._readerPos=i?{index:Math.max(0,p),total:n.length}:null,this.reader=!!i&&!this.embed&&!this.editMode&&i.id===this.__readerBook,this._followVersionParam(t),this._prev=p>0?h(n[p-1]):null,this._next=p>=0&&p<n.length-1?h(n[p+1]):null})}))}connectedCallback(){if(super.connectedCallback(),rn(),on(),rs(),so||(so=!0,Yt(Xn),Yt(Zn),Qn()),globalThis.addEventListener("keydown",this.__keyHandler),globalThis.addEventListener("pointerdown",this.__outsideMenu),globalThis.addEventListener("oer-reader",this.__onReader),this.__bodyObserver.observe(globalThis.document.body,{childList:!0}),this._watchEditorBar(),!globalThis.document.getElementById("oer-docs-fonts")){const e=globalThis.document.createElement("link");e.id="oer-docs-fonts",e.rel="stylesheet",e.href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",globalThis.document.head.appendChild(e)}}_watchEditorBar(){const e=globalThis.document.querySelector("haxcms-site-editor-ui");e!==this.__editorBar&&(this.__editorBar=e,this.__editorBarObserver.disconnect(),e&&this.__editorBarObserver.observe(e),this._measureEditorBar())}_measureEditorBar(){const e=globalThis.document.querySelector("haxcms-site-editor-ui"),t=e?e.getBoundingClientRect().height:0;this.style.setProperty("--editor-bar-height",`${Math.round(t)}px`)}_scroller(){const e=this.shadowRoot?.querySelector("main");return e&&e.scrollHeight>e.clientHeight&&getComputedStyle(e).overflowY!=="visible"?e:null}_scrollTop(){return this._scroller()?.scrollTop??globalThis.scrollY}_scrollTo(e){const t=this.shadowRoot?.querySelector("main");t&&(t.scrollTop=e),globalThis.scrollY&&globalThis.scrollTo(0,e)}_restoreScroll(e){const t=Date.now(),r=()=>{const i=this._scroller(),o=i?i.scrollHeight-i.clientHeight:globalThis.document.documentElement.scrollHeight-globalThis.innerHeight;if(o>=e||Date.now()-t>2e3)return this._scrollTo(Math.min(e,Math.max(0,o)));setTimeout(r,100)};requestAnimationFrame(r)}disconnectedCallback(){globalThis.removeEventListener("popstate",this.__onPopState,!0),this.__editorBarObserver.disconnect(),this.__bodyObserver.disconnect(),globalThis.removeEventListener("keydown",this.__keyHandler),globalThis.removeEventListener("pointerdown",this.__outsideMenu),globalThis.removeEventListener("oer-reader",this.__onReader),super.disconnectedCallback()}HAXCMSGlobalStyleSheetContent(){return[...super.HAXCMSGlobalStyleSheetContent(),cn,pn,b`
        /* desktop uses the inset layout, which scrolls inside its card;
           the document itself must not scroll. (HAX appends a row of inline
           "manager" elements after the site, adding a ~20px line box.)
           overflow: hidden still lets scrollIntoView / focus scroll the body,
           which slid the layout up and showed that line as a gap at the
           bottom; clip allows no scrolling at all */
        @media (min-width: 768px) {
          html,
          body {
            height: 100%;
            overflow: hidden;
            overflow: clip;
          }
        }
        :is(custom-oer-docs-theme, .oer-reading) {
          line-height: 1.7;
        }
        /* Reader mode: the page's text in the reader's type (DDD sizes p, li
           and headings itself); headings, tables and code scale with it */
        custom-oer-docs-theme[reader] :is(p, li, dd, dt, blockquote) {
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
        }
        custom-oer-docs-theme[reader] :is(h2, h3, h4, h5, h6) {
          font-family: inherit;
          line-height: 1.3;
        }
        custom-oer-docs-theme[reader] h2 {
          font-size: 1.5em;
        }
        custom-oer-docs-theme[reader] h3 {
          font-size: 1.25em;
        }
        custom-oer-docs-theme[reader] :is(h4, h5, h6) {
          font-size: 1.05em;
        }
        custom-oer-docs-theme[reader] .lead {
          font-size: 1.1em;
        }
        custom-oer-docs-theme[reader] table {
          font-size: 0.85em;
        }
        custom-oer-docs-theme[reader] pre {
          font-size: 0.8em;
        }
        custom-oer-docs-theme[reader] :is(figcaption, .footnotes) {
          font-size: 0.8em;
        }
        /* HAX's editor bar would sit above the reader; editing leaves Reader mode */
        body:has(custom-oer-docs-theme[reader]) haxcms-site-editor-ui {
          display: none;
        }
        :is(custom-oer-docs-theme, .oer-reading) :is(p, li) {
          text-align: start;
        }
        /* screenshots and other figures in page content */
        :is(custom-oer-docs-theme, .oer-reading) figure {
          margin: 1.5rem 0;
        }
        :is(custom-oer-docs-theme, .oer-reading) figure img {
          display: block;
          max-width: 100%;
          height: auto;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
        }
        /* footnotes (scripts/lib/footnotes.mjs): citations and references */
        :is(custom-oer-docs-theme, .oer-reading) sup.fn-ref {
          line-height: 0;
        }
        :is(custom-oer-docs-theme, .oer-reading) sup.fn-ref a {
          padding: 0 0.15em;
          font-size: 0.75em;
          font-weight: 600;
          text-decoration: none;
          color: var(--link);
        }
        :is(custom-oer-docs-theme, .oer-reading) sup.fn-ref a:hover {
          text-decoration: underline;
        }
        :is(custom-oer-docs-theme, .oer-reading) .footnotes {
          margin-top: 2.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--muted-foreground);
        }
        :is(custom-oer-docs-theme, .oer-reading) .footnotes h2 {
          margin: 0 0 0.5rem;
          font-size: 1rem;
          color: var(--foreground);
        }
        :is(custom-oer-docs-theme, .oer-reading) .footnotes ol {
          margin: 0;
          padding-left: 1.5rem;
        }
        :is(custom-oer-docs-theme, .oer-reading) .footnotes li + li {
          margin-top: 0.375rem;
        }
        :is(custom-oer-docs-theme, .oer-reading) .footnotes li:target,
        :is(custom-oer-docs-theme, .oer-reading) sup.fn-ref:target {
          background: color-mix(in srgb, var(--primary) 12%, transparent);
          border-radius: var(--radius-sm);
        }
        :is(custom-oer-docs-theme, .oer-reading) .footnotes a.fn-back {
          text-decoration: none;
          color: var(--link);
        }
        .oer-fn-tip {
          position: fixed;
          z-index: 10002;
          max-width: min(26rem, calc(100vw - 1rem));
          padding: 0.625rem 0.75rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          background: var(--popover, var(--background));
          color: var(--popover-foreground, var(--foreground));
          box-shadow: 0 8px 24px rgb(0 0 0 / 0.16);
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          line-height: 1.5;
          text-align: start;
        }
        .oer-fn-tip[hidden] {
          display: none;
        }
        .oer-fn-tip a {
          color: var(--link);
        }
        .oer-fn-num {
          font-weight: 600;
          color: var(--muted-foreground);
        }
        :is(custom-oer-docs-theme, .oer-reading) figcaption {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          line-height: 1.5;
          color: var(--muted-foreground);
        }
        :is(custom-oer-docs-theme, .oer-reading) .lead {
          font-size: 1.125rem;
          color: var(--muted-foreground);
        }
        :is(custom-oer-docs-theme, .oer-reading) :is(h2, h3, h4) {
          letter-spacing: -0.015em;
          scroll-margin-top: calc(var(--topbar-height) + 1rem);
        }
        /* DDD's global "a" rule gives every link an accent background and
           bold text; links in page content read as plain links */
        :is(custom-oer-docs-theme, .oer-reading) a:any-link {
          background: transparent;
          font-weight: inherit;
          color: var(--link);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        /* code, after shadcn's typography. DDD styles every code element
           as an inline-block box with a groove border, tight line height,
           margins and a transition; reset all of it here */
        :is(custom-oer-docs-theme, .oer-reading) :not(pre) > code {
          display: inline;
          margin: 0;
          border: 0;
          padding: 0.125rem 0.375rem;
          border-radius: var(--radius-sm);
          background: var(--muted);
          color: var(--foreground);
          font-family: var(--font-mono);
          font-size: 0.875em;
          line-height: inherit;
          transition: none;
          /* long snippets wrap at spaces, each line keeping its padding and
             corners; a word breaks only when it can't fit at all */
          overflow-wrap: break-word;
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
        }
        /* tables in page content, after shadcn's: an outer rounded border,
           lines between rows only, a quiet header, room in each cell, a faint
           stripe to follow a row across; wide tables scroll sideways. DDD
           gives every cell a border on all sides (its color !important,
           inherited: set on the table), no padding and middle alignment. */
        :is(custom-oer-docs-theme, .oer-reading) table {
          display: block;
          box-sizing: border-box;
          width: auto;
          max-width: 100%;
          margin: 1.5rem 0;
          overflow-x: auto;
          border: 1px solid var(--border);
          border-color: var(--border);
          border-radius: var(--radius-lg);
          border-collapse: separate;
          border-spacing: 0;
          font-size: 0.9375rem;
          line-height: 1.55;
        }
        :is(custom-oer-docs-theme, .oer-reading) :is(th, td) {
          padding: 0.625rem 0.875rem;
          border: 0;
          border-bottom: 1px solid;
          font-family: inherit;
          font-size: inherit;
          text-align: start;
          vertical-align: top;
        }
        :is(custom-oer-docs-theme, .oer-reading) th {
          background: color-mix(in srgb, var(--muted) 45%, transparent);
          color: var(--muted-foreground);
          font-size: 0.875rem;
          font-weight: 500;
          white-space: nowrap;
        }
        :is(custom-oer-docs-theme, .oer-reading) tbody tr:nth-child(even) > * {
          background: color-mix(in srgb, var(--muted) 30%, transparent);
        }
        :is(custom-oer-docs-theme, .oer-reading) tr:last-child > td {
          border-bottom: 0;
        }
        /* a cell that's only a name in code (a model, a command) keeps it whole */
        :is(custom-oer-docs-theme, .oer-reading) :is(th, td) > code:only-child {
          white-space: nowrap;
        }
        :is(custom-oer-docs-theme, .oer-reading) caption {
          caption-side: bottom;
          padding: 0.5rem 0.875rem;
          font-size: 0.875rem;
          color: var(--muted-foreground);
          text-align: start;
        }
        :is(custom-oer-docs-theme, .oer-reading) pre {
          /* DDD makes pre an inline box sized to its text */
          display: block;
          box-sizing: border-box;
          width: auto;
          max-width: 100%;
          margin: 1rem 0;
          padding: 0.875rem 1rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--muted);
          color: var(--foreground);
          font-family: var(--font-mono);
          font-size: 0.875rem;
          line-height: 1.6;
          overflow-x: auto;
          tab-size: 2;
        }
        :is(custom-oer-docs-theme, .oer-reading) pre > code {
          display: block;
          margin: 0;
          border: 0;
          padding: 0;
          background: transparent;
          color: inherit;
          font: inherit;
          line-height: inherit;
          white-space: pre;
          transition: none;
        }
      `]}static get styles(){return[super.styles,b`
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
        /* Nav / Site tabs (shadcn TabsList), signed-in authors only */
        .sidebar-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.125rem;
          margin: 0.75rem 0.75rem 0.25rem;
          padding: 0.1875rem;
          border-radius: var(--radius-md);
          background: var(--muted);
        }
        .sidebar-tabs button {
          all: unset;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 1.75rem;
          border-radius: calc(var(--radius-md) - 2px);
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--muted-foreground);
          cursor: pointer;
        }
        .sidebar-tabs button[aria-selected="true"] {
          background: var(--background);
          color: var(--foreground);
          box-shadow: 0 1px 2px rgb(0 0 0 / 0.08);
        }
        .sidebar-tabs button:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 1px;
        }
        .site-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          padding: 0.5rem;
        }
        nav[hidden] {
          display: none;
        }
        .sidebar nav {
          flex: 1;
          overflow-y: auto;
          padding: 0.5rem;
          scrollbar-width: thin;
          scrollbar-color: var(--border) transparent;
        }
        .sidebar-footer {
          padding: 0.75rem;
          border-top: 1px solid var(--border);
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
        .icon-btn:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 2px;
        }
        oer-breadcrumb {
          flex: 1;
          min-width: 0;
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
        .page-banner {
          display: block;
          width: 100%;
          max-height: 22rem;
          margin: 0 0 1.5rem;
          object-fit: cover;
          border-radius: var(--radius-lg);
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
          gap: 0.25rem;
          height: 2rem;
          padding: 0 0.5rem;
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted-foreground);
        }
        /* breathing room between the sidebar tabs (or brand) and the outline */
        #panel-nav > oer-site-nav {
          margin-top: 1rem;
        }
        .nav-actions {
          display: flex;
          justify-content: center;
          padding: 0.75rem 0.25rem 0.5rem;
        }
        /* shadcn Button, variant "outline", size "sm" */
        .label-action {
          all: unset;
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          gap: 0.3125rem;
          height: 1.625rem;
          padding: 0 0.5rem;
          border: 1px solid var(--input-border, var(--border));
          border-radius: var(--radius-md);
          background: transparent;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--foreground);
          cursor: pointer;
        }
        .label-action:hover {
          background: var(--accent);
          color: var(--foreground);
        }
        .label-action:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 1px;
        }
        .label-action svg {
          width: 0.75rem;
          height: 0.75rem;
        }
        /* account menu (shadcn NavUser) */
        .user-wrap {
          position: relative;
        }
        .user-row {
          all: unset;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          height: 2.5rem;
          padding: 0 0.5rem;
          border-radius: var(--radius-md);
          cursor: pointer;
        }
        .user-row:hover,
        .user-row[aria-expanded="true"] {
          background: var(--sidebar-accent, var(--accent));
        }
        .user-row:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: -2px;
        }
        .user-row > .lucide:last-child {
          width: 1rem;
          height: 1rem;
          color: var(--muted-foreground);
          transform: rotate(180deg);
        }
        .menu.user-menu {
          top: auto;
          bottom: calc(100% + 0.25rem);
          left: 0;
          right: 0;
          min-width: 0;
        }
        .menu-label {
          padding: 0.375rem 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--muted-foreground);
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

        /* edit mode: the sidebar stays, but navigating away would drop
           unsaved edits, so it is inert (see render) and dimmed */
        :host([edit-mode]) .sidebar nav {
          opacity: 0.6;
        }

        /* reader layout: the book's own header above its chapters */
        .book-head {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          padding: 0.75rem 0.75rem 0.25rem;
        }
        .book-back {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: var(--muted-foreground);
          text-decoration: none;
        }
        .book-back:hover {
          color: var(--foreground);
        }
        .book-back svg {
          width: 0.875rem;
          height: 0.875rem;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
        }
        .book-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 0.5rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.9375rem;
          line-height: 1.35;
          text-align: start;
          color: var(--foreground);
          text-decoration: none;
        }
        .book-title:hover,
        .book-title[aria-current="page"] {
          background: var(--accent);
        }
        .book-title .lucide {
          width: 1rem;
          height: 1rem;
          color: var(--primary);
        }
        .book-filter {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          height: 2rem;
          padding: 0 0.625rem;
          border: 1px solid var(--input-border, var(--border));
          border-radius: var(--radius-md);
          background: var(--background);
          color: var(--muted-foreground);
        }
        .book-filter:focus-within {
          outline: 2px solid var(--ring);
          outline-offset: 1px;
        }
        .book-filter svg {
          width: 0.875rem;
          height: 0.875rem;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
        }
        .book-filter input {
          flex: 1;
          min-width: 0;
          border: 0;
          outline: none;
          background: transparent;
          color: var(--foreground);
          font: inherit;
          font-size: 0.8125rem;
        }

        /* Site tab rows: shadcn SidebarMenuButton */
        .site-action {
          all: unset;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          height: 2rem;
          padding: 0 0.5rem;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          color: var(--sidebar-foreground, var(--foreground));
          cursor: pointer;
        }
        .site-action:hover {
          background: var(--sidebar-accent, var(--accent));
          color: var(--sidebar-accent-foreground, var(--accent-foreground));
        }
        .site-action:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: -2px;
        }
        .site-action .lucide {
          width: 1rem;
          height: 1rem;
          color: var(--muted-foreground);
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
          :host([reader]) .main-col {
            height: 100vh;
            height: 100dvh;
          }
          oer-reader-bar {
            position: relative;
            top: 0;
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

        /* sidebar footer: the account menu, then the light/dark switch */
        .footer-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.25rem;
        }
        .footer-row .user-wrap {
          flex: 1;
          min-width: 0;
        }
        .theme-toggle {
          flex: none;
        }
        .reader-btn {
          flex: none;
        }
        @media (max-width: 479px) {
          .reader-btn {
            padding: 0 0.5rem;
          }
          .reader-label {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip-path: inset(50%);
          }
        }

        /* Reader mode (ui/oer-reader.js): no sidebar or site chrome, the
           page in one column set in the reader's type, at their size, line
           width and spacing (--reader-*, set on the host), on their page
           colour. Light and dark resolve the site's tokens in that scheme;
           dark and sepia have their own palettes (sepia AA: text 11.5:1, muted
           6.2:1, links 6.7:1) */
        :host([reader]) {
          background: var(--background);
          /* for blocks with their own type styles (oer-include) */
          --reader-h2: 1.5em;
          --reader-h3: 1.25em;
          --reader-h4: 1.05em;
          --reader-gap: 1em;
          --reader-table: 0.85em;
          --oer-include-source: none;
        }
        :host([reader]) .shell,
        :host([reader][collapsed]) .shell {
          grid-template-columns: minmax(0, 1fr);
        }
        :host([reader]) .sidebar,
        :host([reader]) .scrim,
        :host([reader]) oer-page-header {
          display: none;
        }
        :host([reader]) .main-col {
          margin: 0;
          border-radius: 0;
          box-shadow: none;
          background: var(--background);
        }
        :host([reader]) main {
          padding-top: 3rem;
          padding-bottom: 5rem;
        }
        :host([reader]) article {
          max-width: var(--reader-measure, 68ch);
          font-family: var(--reader-font, var(--font-sans));
          font-size: var(--reader-size, 19px);
          line-height: var(--reader-leading, 1.7);
        }
        :host([reader]) :is(.pager, oer-page-footer) {
          font-family: var(--font-sans);
          line-height: 1.5;
        }
        :host([reader]) site-active-title h1 {
          font-family: var(--reader-font, var(--font-sans));
          font-size: 1.85em;
          letter-spacing: -0.01em;
        }
        oer-reader-bar {
          position: sticky;
          top: var(--editor-bar-height, 0px);
        }
        @media (max-width: 767px) {
          :host([reader]) main {
            padding-top: 2rem;
          }
          :host([reader]) site-active-title h1 {
            font-size: 1.5em;
          }
        }
        :host([reader-colour="light"]) {
          color-scheme: only light;
        }
        /* a softer dark than the site's black, easier over long reading
           (AA: text 13.6:1, muted 7.4:1, links 8.2:1) */
        :host([reader-colour="dark"]) {
          color-scheme: only dark;
          --background: #16181d;
          --foreground: #e3e1dc;
          --card: #1d2026;
          --card-foreground: #e3e1dc;
          --popover: #1d2026;
          --popover-foreground: #e3e1dc;
          --muted: #23262d;
          --muted-foreground: #a3a7ae;
          --accent: #262a31;
          --accent-foreground: #e3e1dc;
          --border: #30343c;
          --input-border: #6b717b;
          --primary: #7cb4f0;
          --primary-foreground: #0b1a2b;
          --link: #7cb4f0;
          --ring: #5b8fd0;
        }
        :host([reader-colour="sepia"]) {
          color-scheme: only light;
          --background: #f6efe1;
          --foreground: #3a2e20;
          --card: #efe6d3;
          --card-foreground: #3a2e20;
          --popover: #fbf7ee;
          --popover-foreground: #3a2e20;
          --muted: #ebe1cc;
          --muted-foreground: #675642;
          --accent: #ebe1cc;
          --accent-foreground: #3a2e20;
          --border: #d9c9ab;
          --input-border: #8f7a5c;
          --primary: #7a4a1c;
          --primary-foreground: #ffffff;
          --link: #0f5596;
          --ring: #9a6a36;
        }

        /* embed mode (?embed=1): only the page itself */
        :host([embed]) {
          background: var(--background);
        }
        :host([embed]) .shell {
          display: block;
        }
        :host([embed]) .sidebar,
        :host([embed]) .scrim,
        :host([embed]) .topbar,
        :host([embed]) .pager,
        :host([embed]) .page-header .menu-wrap,
        :host([embed]) .skip-link,
        :host([hide-header]) oer-page-header,
        :host([hide-header]) .page-banner,
        :host([hide-title]) site-active-title {
          display: none !important;
        }
        :host([embed]) .main-col {
          margin: 0 !important;
          height: auto !important;
          overflow: visible !important;
          border: 0 !important;
          border-radius: 0 !important;
          box-shadow: none !important;
        }
        :host([embed]) main {
          overflow: visible !important;
          padding: 1rem 1.25rem 1.5rem !important;
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
      `]}render(){const e=this.__mq.matches?this.mobileOpen:!this.collapsed;return s`
      <a class="skip-link" href="#main">Skip to content</a>
      <div class="shell">
      <aside
        id="sidebar"
        class="sidebar"
        aria-label="Site navigation"
        part="sidebar"
        ?inert="${!e||this.editMode||this.reader}"
      >
        <div class="sidebar-header">
          <a class="brand" href="${y.homeLink||"./"}">
            <span class="brand-mark" aria-hidden="true">${E.book}</span>
            <span class="brand-text">
              <span class="brand-title">${this.siteTitle}</span>
              <span class="brand-sub">${this._siteDescription||"Learning materials"}</span>
            </span>
          </a>
        </div>
        ${this._loggedIn?this.renderSidebarTabs():""}
        ${this._book&&!this.editMode&&this._sidebarTab!=="site"?this.renderBookHeader():""}
        <nav
          aria-label="${this._book?"Book contents":"Course outline"}"
          id="panel-nav"
          role="${this._loggedIn?"tabpanel":"navigation"}"
          aria-labelledby="${this._loggedIn?"tab-nav":""}"
          ?hidden="${this._loggedIn&&this._sidebarTab==="site"}"
        >
          <oer-site-nav
            part="site-menu"
            ?editable="${this._loggedIn&&!this.editMode}"
            .root="${this._book?.id||null}"
            .filter="${this._book&&this._bookFilter||""}"
          ></oer-site-nav>
          ${!this._book&&this._loggedIn&&!this.editMode?s`<div class="nav-actions">
                <button class="label-action" @click="${()=>pi().show()}">${E.pencil}Edit outline</button>
              </div>`:""}
        </nav>
        ${this._loggedIn&&this._sidebarTab==="site"?s`<div class="site-panel" id="panel-site" role="tabpanel" aria-labelledby="tab-site">
              <div class="nav-group-label">Site</div>
              <button class="site-action" @click="${()=>vn().show()}">${E.files}Browse pages</button>
              <button class="site-action" @click="${()=>xn().show()}">${E.types}Content types</button>
              <button class="site-action" @click="${Ro}">${E.settings}Settings</button>
            </div>`:""}
        <div class="sidebar-footer">
          <div class="footer-row">
            ${this._loggedIn?this.renderUser():""}
            <button
              class="icon-btn theme-toggle"
              @click="${this.toggleDark}"
              aria-label="Dark mode"
              title="${this.dark?"Switch to light mode":"Switch to dark mode"}"
              aria-pressed="${this.dark}"
            >
              ${this.dark?E.sun:E.moon}
            </button>
          </div>
        </div>
      </aside>
      <div class="scrim" role="presentation" @click="${this._closeMobile}"></div>

      <div class="main-col">
        ${this.editMode?this.renderEditorHeader(e):this.reader?s`<oer-reader-bar
                .book="${this._book}"
                .position="${this._readerPos}"
                .prev="${this._prev}"
                .next="${this._next}"
                .settings="${this._effectiveReaderSettings()}"
                @reader-exit="${()=>this._exitReader()}"
                @reader-settings="${t=>this._setReaderSettings(t.detail)}"
              ></oer-reader-bar>`:this.renderTopbar(e)}

        <main id="main">
          <article id="contentcontainer">
            ${this._banner?s`<img class="page-banner" src="${this._banner.src}" alt="${this._banner.alt}" />`:""}
            <div class="page-header">
              <site-active-title part="page-title"></site-active-title>
              ${!this.editMode&&!this.reader&&(this._loggedIn||this._canEmbed)?this.renderPageMenu():""}
            </div>
            <oer-page-header></oer-page-header>
            <section id="slot"><slot></slot></section>
            ${this.editMode?"":s`<oer-page-footer ?compact="${this.reader}"></oer-page-footer>`}
            <nav class="pager" aria-label="Previous and next page" ?hidden="${this.editMode}">
              ${this._prev?s`<a class="pager-link prev" href="${this._prev.slug}">
                    <span class="pager-label">${E.chevronLeft} Previous</span>
                    <span class="pager-title">${this._prev.title}</span>
                  </a>`:s`<span></span>`}
              ${this._next?s`<a class="pager-link next" href="${this._next.slug}">
                    <span class="pager-label">Next ${E.chevronRight}</span>
                    <span class="pager-title">${this._next.title}</span>
                  </a>`:""}
            </nav>
          </article>
        </main>
      </div>
      </div>
    `}renderTopbar(e){return s`
      <header class="topbar" part="topbar">
        <button
          class="icon-btn"
          @click="${this.toggleSidebar}"
          aria-controls="sidebar"
          aria-expanded="${e}"
          title="Toggle sidebar"
        >
          ${E.panelLeft}
        </button>
        <div class="separator" aria-hidden="true"></div>
        <oer-breadcrumb part="breadcrumb"></oer-breadcrumb>
        <button class="icon-btn" @click="${this.openSearch}" title="Search the site (⌘K)" aria-label="Search the site">
          ${E.search}
        </button>
        <site-modal icon="icons:search" title="Search site" button-label="Search" @site-modal-click="${this._loadSearch}">
          <site-search></site-search>
        </site-modal>
        ${this._loggedIn?s`<oer-command-search></oer-command-search>`:""}
        ${this._book?s`<button class="btn btn-outline reader-btn" @click="${()=>this._enterReader()}" title="Read this book in Reader mode">
              ${E.bookOpen}<span class="reader-label">Reader</span>
            </button>`:""}
      </header>
    `}renderEditorHeader(){return s`
      <header class="topbar editing" part="topbar">
        <span class="badge"><span class="dot" aria-hidden="true"></span>Editing</span>
        <span class="editing-title">${this._activeTitle}</span>
        <div class="toolbar-group">
          <button class="icon-btn" @click="${Po}" title="Undo (${ee}Z)" aria-label="Undo">
            ${E.undo}
          </button>
          <button class="icon-btn" @click="${Oo}" title="Redo (${ee}⇧Z)" aria-label="Redo">
            ${E.redo}
          </button>
          <div class="separator" aria-hidden="true"></div>
          <button
            class="icon-btn"
            @click="${()=>Ar().open("source")}"
            title="Edit HTML source"
            aria-label="Edit HTML source"
          >
            ${E.code}
          </button>
          <oer-command-search></oer-command-search>
          <div class="separator" aria-hidden="true"></div>
          <button class="btn btn-outline" @click="${Io}" title="Discard changes (${ee}⇧/)">
            Cancel
          </button>
          <button class="btn btn-primary" @click="${Lo}" title="Save (${ee}⇧S)">
            ${E.save}Save
          </button>
        </div>
      </header>
    `}renderPageMenu(){const e=r=>this._menuAction(()=>this.querySelector("page-break")?.[r]?.()),t=(r,i,o,n="")=>s`<button role="menuitem" class="${n}" @click="${r}">${i}${o}</button>`;return s`
      <div class="menu-wrap">
        <button
          class="icon-btn"
          aria-haspopup="menu"
          aria-expanded="${this._pageMenuOpen}"
          aria-label="Page options"
          title="Page options"
          @click="${this._togglePageMenu}"
        >
          ${E.chevronDown}
        </button>
        ${this._pageMenuOpen&&!this._loggedIn?s`<div class="menu" role="menu" @keydown="${this._menuKeys}">
              ${t(this._menuAction(()=>Gi().show(this._embedItem)),E.share,"Embed\u2026")}
            </div>`:""}
        ${this._pageMenuOpen&&this._loggedIn?s`<div class="menu" role="menu" @keydown="${this._menuKeys}">
              <button role="menuitem" ?disabled="${this._locked}" @click="${this._menuAction(Bo)}">
                ${E.pencil}Edit page<kbd>${ee}⇧E</kbd>
              </button>
              <div class="menu-sep" role="separator"></div>
              ${t(e("_editTitle"),E.type,"Rename page")}
              ${t(e("_editIcon"),E.shapes,"Change icon")}
              ${t(e("_editMedia"),E.image,"Page media")}
              ${t(this._menuAction(()=>mr().show(y.activeId)),E.details,"Page details")}
              ${t(e("_editTags"),E.tag,"Tags")}
              ${t(this._menuAction(()=>pi().show(y.activeId)),E.siteMap,"Edit page outline")}
              ${this._canEmbed?t(this._menuAction(()=>Gi().show(this._embedItem)),E.share,"Embed\u2026"):""}
              <div class="menu-sep" role="separator"></div>
              ${t(this._menuAction(()=>Vi().show(y.activeId,{publish:!0})),E.history,"Versions\u2026")}
              ${t(e("_openRevisions"),E.history,"Revisions")}
              ${t(e("_openPageReport"),E.chart,"Page report")}
              <div class="menu-sep" role="separator"></div>
              ${t(e("_togglePublished"),this._published?E.eyeOff:E.eye,this._published?"Unpublish":"Publish")}
              ${t(e("_toggleLocked"),this._locked?E.lockOpen:E.lock,this._locked?"Unlock page":"Lock page")}
              <div class="menu-sep" role="separator"></div>
              ${t(e("_deletePage"),E.trash,"Delete page","danger")}
            </div>`:""}
      </div>
    `}_followVersionParam(e){const t=new URLSearchParams(globalThis.location.search).get("version");if(!t||!e)return;const r=K(e).find(i=>i.version===t);r?.snapshot&&(globalThis.history.replaceState({},"",r.snapshot.slug),globalThis.dispatchEvent(new PopStateEvent("popstate")))}_bookOf(e,t){const r=B(t).types,i=new Map(t.map(o=>[o.id,o]));for(let o=i.get(e);o;o=i.get(o.parent))if(r.find(n=>n.id===o.metadata?.pageType)?.reader)return o;return null}renderBookHeader(){const e=this._book;return s`<div class="book-head">
      <a class="book-back" href="${y.homeLink||"./"}">${E.chevronLeft}All pages</a>
      <a class="book-title" href="${e.slug}" aria-current="${y.activeId===e.id?"page":"false"}">${E.book}<span>${e.title}</span></a>
      <label class="book-filter">
        ${E.search}
        <input
          type="search"
          placeholder="Filter chapters…"
          aria-label="Filter chapters"
          .value="${this._bookFilter||""}"
          @input="${t=>this._bookFilter=t.target.value}"
        />
      </label>
    </div>`}firstUpdated(e){super.firstUpdated?.(e),this.embed&&Dn(this)}renderSidebarTabs(){const e=(t,r)=>s`<button
      role="tab"
      id="tab-${t}"
      aria-selected="${this._sidebarTab===t}"
      aria-controls="panel-${t}"
      tabindex="${this._sidebarTab===t?0:-1}"
      @click="${()=>this._setSidebarTab(t)}"
    >
      ${r}
    </button>`;return s`<div
      class="sidebar-tabs"
      role="tablist"
      aria-label="Sidebar"
      @keydown="${t=>{if(t.key!=="ArrowLeft"&&t.key!=="ArrowRight")return;t.preventDefault();const r=this._sidebarTab==="nav"?"site":"nav";this._setSidebarTab(r),this.updateComplete.then(()=>this.shadowRoot.getElementById(`tab-${r}`)?.focus())}}"
    >
      ${e("nav","Navigation")}${e("site","Site")}
    </div>`}_setSidebarTab(e){this._sidebarTab=e;try{globalThis.localStorage.setItem("oer-sidebar-tab",e)}catch{}}renderUser(){const e=this._userName||"Signed in";return s`
      <div class="user-wrap">
        <button
          class="user-row"
          aria-haspopup="menu"
          aria-expanded="${!!this._userMenuOpen}"
          @click="${()=>this._userMenuOpen=!this._userMenuOpen}"
        >
          <span class="avatar" aria-hidden="true">${this._userName?e.slice(0,2):E.user}</span>
          <span class="user-name">${e}</span>
          ${E.chevronDown}
        </button>
        ${this._userMenuOpen?s`<div class="menu user-menu" role="menu" aria-label="Account" @keydown="${this._userMenuKeys}">
              <div class="menu-label">${e}</div>
              <a role="menuitem" href="${Gt()?.backLink??"/"}">${E.layoutDashboard}Site dashboard</a>
              <div class="menu-sep" role="separator"></div>
              <button role="menuitem" class="danger" @click="${()=>(this._userMenuOpen=!1,qo())}">${E.logOut}Log out</button>
            </div>`:""}
      </div>
    `}_userMenuKeys(e){const t=[...this.shadowRoot.querySelectorAll('.user-menu [role="menuitem"]')],r=t.indexOf(this.shadowRoot.activeElement);if(e.key==="Escape")this._userMenuOpen=!1,this.shadowRoot.querySelector(".user-row")?.focus();else if(e.key==="ArrowDown")t[(r+1)%t.length]?.focus();else if(e.key==="ArrowUp")t[(r-1+t.length)%t.length]?.focus();else return;e.preventDefault()}_togglePageMenu(){this._pageMenuOpen=!this._pageMenuOpen}_menuAction(e){return()=>{this._pageMenuOpen=!1,e()}}_menuKeys(e){const t=[...this.shadowRoot.querySelectorAll('.menu [role="menuitem"]')],r=t.indexOf(this.shadowRoot.activeElement);e.key==="Escape"?this._pageMenuOpen=!1:(e.key==="ArrowDown"||e.key==="ArrowUp")&&(e.preventDefault(),t[(r+(e.key==="ArrowDown"?1:-1)+t.length)%t.length]?.focus())}toggleSidebar(){this.__mq.matches?this.mobileOpen=!this.mobileOpen:this.collapsed=!this.collapsed}_closeMobile(){this.mobileOpen=!1}toggleDark(){y.darkMode=!y.darkMode}_enterReader(){if(!(!this._book||this.editMode||this.embed)){this.__readerBook=this._book.id;try{globalThis.sessionStorage.setItem("oer-reader-book",this._book.id)}catch{}this.reader=!0,this.updateComplete.then(()=>this.shadowRoot.querySelector("oer-reader-bar")?.updateComplete).then(()=>{this.shadowRoot.querySelector("oer-reader-bar")?.shadowRoot?.querySelector(".exit")?.focus()})}}_exitReader(){this.__readerBook="";try{globalThis.sessionStorage.removeItem("oer-reader-book")}catch{}const e=this.reader;this.reader=!1,e&&this.updateComplete.then(()=>this.shadowRoot.querySelector(".reader-btn")?.focus())}_effectiveReaderSettings(){const e=this._readerSettings;return{...e,colour:e.colour||(this.dark?"dark":"light")}}_setReaderSettings(e){this._readerSettings=e,as(e)}updated(e){if(super.updated?.(e),e.has("editMode")&&this.editMode&&this.reader&&(this.reader=!1),e.has("reader")||e.has("_readerSettings")||e.has("dark")){const t=this.reader?ns(this._readerSettings):{};for(const r of["--reader-size","--reader-measure","--reader-leading","--reader-font"])t[r]?this.style.setProperty(r,t[r]):this.style.removeProperty(r);this.readerColour=this.reader?this._effectiveReaderSettings().colour:""}}async _loadSearch(){await import("@haxtheweb/haxcms-elements/lib/ui-components/site/site-search.js"),setTimeout(()=>{globalThis.SimpleModal?.requestAvailability()?.querySelector("site-search")?.shadowRoot?.querySelector("simple-fields-field")?.focus()},50)}openSearch(){this.shadowRoot.querySelector("site-modal")?.shadowRoot?.querySelector("#btn")?.click()}_onKeydown(e){if(!this.editMode){if((e.metaKey||e.ctrlKey)&&!e.shiftKey&&e.key.toLowerCase()==="k")e.preventDefault(),this.openSearch();else if(e.key==="Escape"&&this.mobileOpen)this.mobileOpen=!1;else if(this.reader&&(e.key==="ArrowLeft"||e.key==="ArrowRight")&&!e.altKey&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&!e.defaultPrevented){const t='input, textarea, select, dialog, audio, video, pre, table, [role="slider"], [role="tablist"], [role="radiogroup"], [role="menu"], [role="listbox"], [role="dialog"]';if(e.composedPath().some(i=>i.isContentEditable||i.matches?.(t)))return;const r=this.shadowRoot.querySelector(e.key==="ArrowLeft"?".pager-link.prev":".pager-link.next");if(!r)return;e.preventDefault(),r.click()}}}};customElements.define(lo.tag,lo);const ls="files/data/rubrics.json";let L2;function ds(){return L2||(L2=fetch(new URL(ls,globalThis.document.baseURI)).then(a=>a.ok?a.json():[]).catch(()=>[])),L2}class Je extends Do{static get tag(){return"oer-rubric"}static get properties(){return{...super.properties,rubricId:{type:String,attribute:"rubric-id",reflect:!0}}}constructor(){super(),this.rubricId="",this.__rubric=null,this.__loaded=!1}updated(e){super.updated?.(e),e.has("rubricId")&&this._load()}async _load(){const e=await ds();this.__rubric=e.find(t=>t.slug===this.rubricId)??null,this.__loaded=!0,this.requestUpdate()}get _hidden(){return new URLSearchParams(globalThis.location.search).get("hideRubric")==="true"}static get styles(){return[super.styles,b`
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
      `]}render(){if(this._hidden||!this.__loaded)return s``;const e=this.__rubric;return e?s`
      <section class="card" aria-labelledby="title">
        <h3 id="title">${e.name} Rubric</h3>
        ${e.description?s`<p class="desc">${e.description}</p>`:""}
        ${e.criteria?.length?s`<div class="table-wrap">
              <table>
                <thead>
                  <tr><th scope="col">Criterion</th><th scope="col">Description</th></tr>
                </thead>
                <tbody>
                  ${e.criteria.map(t=>s`<tr><td>${t.name}</td><td>${t.description}</td></tr>`)}
                </tbody>
              </table>
            </div>`:""}
      </section>
    `:s`<div class="missing">
        Rubric not found${this.rubricId?s`: <code>${this.rubricId}</code>`:""}
      </div>`}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:{title:"Rubric",description:"Assessment rubric from the site's rubrics data file.",icon:"icons:assignment-turned-in",color:"blue",tags:["Instructional","assessment","rubric","grading"],meta:{author:"Michael Collins"}},settings:{configure:[{property:"rubricId",title:"Rubric",description:"Which rubric to show (slug in files/data/rubrics.json).",inputMethod:"select",options:{exercise:"Exercise","exercise-low-poly":"Exercise (low poly)",project:"Project",task:"Task","written-statement":"Written statement"}}],advanced:[]},demoSchema:[{tag:Je.tag,properties:{rubricId:"exercise"},content:""}]}}}customElements.define(Je.tag,Je),ae(Je);const qt=(a,e,t,r)=>({title:a,description:e,icon:t,color:"blue",tags:r,meta:{author:"Michael Collins"}}),I2={info:{label:"Note",icon:"icons:info",color:"oklch(0.55 0.15 250)"},tip:{label:"Tip",icon:"courseicons:strategy",color:"oklch(0.55 0.14 150)"},warning:{label:"Warning",icon:"icons:warning",color:"oklch(0.62 0.15 70)"},danger:{label:"Important",icon:"icons:error",color:"oklch(0.55 0.2 25)"},definition:{label:"Definition",icon:"hax:lesson",color:"oklch(0.52 0.16 300)"},objective:{label:"Objective",icon:"courseicons:learning-objectives",color:"oklch(0.5 0.13 200)"}};class co extends M{static get tag(){return"oer-callout"}static get properties(){return{type:{type:String,reflect:!0},title:{type:String,reflect:!0}}}constructor(){super(),this.type="info"}static get styles(){return b`
      :host {
        display: block;
        margin: 1.5rem 0;
      }
      .callout {
        --c: oklch(0.55 0.15 250);
        display: flex;
        gap: 0.75rem;
        padding: 1rem 1.25rem;
        border: 1px solid color-mix(in oklch, var(--c) 35%, transparent);
        border-left: 4px solid var(--c);
        border-radius: var(--radius-md, 0.5rem);
        background: color-mix(in srgb, var(--c) 7%, var(--background, #fff));
        color: var(--foreground, #111);
      }
      .icon {
        flex: none;
        width: 1.25rem;
        height: 1.25rem;
        margin-top: 0.125rem;
        background: var(--c);
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      .body {
        flex: 1;
        min-width: 0;
      }
      .title {
        margin: 0 0 0.25rem;
        font-weight: 600;
        line-height: 1.5;
      }
      ::slotted(*) {
        margin-top: 0 !important;
      }
      ::slotted(*:last-child) {
        margin-bottom: 0 !important;
      }
    `}render(){const e=I2[this.type]||I2.info;return s`<div class="callout" role="note" aria-label="${this.title||e.label}" style="--c:${e.color}">
      <span class="icon" aria-hidden="true" style="--src:url(&quot;${S[e.icon]||""}&quot;)"></span>
      <div class="body">
        ${this.title?s`<p class="title">${this.title}</p>`:""}
        <slot></slot>
      </div>
    </div>`}static get haxProperties(){return{type:"grid",canScale:!1,canEditSource:!0,contentEditable:!0,gizmo:qt("Callout","A highlighted note: info, tip, warning, important, definition or objective.","icons:info",["Instructional","callout","note","tip","warning"]),settings:{configure:[{property:"type",title:"Kind",inputMethod:"select",options:Object.fromEntries(Object.entries(I2).map(([e,t])=>[e,t.label]))},{property:"title",title:"Title",description:"Optional heading inside the callout.",inputMethod:"textfield"},{slot:"",title:"Text",inputMethod:"code-editor",slotWrapper:"p"}],advanced:[]},demoSchema:[{tag:"oer-callout",properties:{type:"tip",title:"Tip"},content:"<p>Write the callout text here.</p>"}]}}}const po={codepen:"CodePen",jsfiddle:"JSFiddle",codesandbox:"CodeSandbox",stackblitz:"StackBlitz",replit:"Replit",glitch:"Glitch",other:"Other (embed address)"};function cs(a,e){const t=String(e||"").trim();if(!t)return"";const r=(i,o)=>i.replace(/\/?$/,o);switch((a||"").toLowerCase()){case"codepen":if(t.includes("codepen.io"))try{return`https://codepen.io${new URL(t).pathname.replace(/\/pen\//,"/embed/")}?default-tab=result`}catch{return""}if(t.includes("/")){const[i,o]=t.split("/");return`https://codepen.io/${i}/embed/${o}?default-tab=result`}return"";case"jsfiddle":return t.includes("jsfiddle.net")?r(t,"/embedded/"):`https://jsfiddle.net/${t}/embedded/`;case"codesandbox":if(t.includes("codesandbox.io"))try{const i=new URL(t).pathname.split("/s/")[1]?.split("/")[0];return i?`https://codesandbox.io/embed/${i}`:""}catch{return""}return`https://codesandbox.io/embed/${t}`;case"stackblitz":return t.includes("stackblitz.com")?t.includes("/embed")||t.includes("embed=1")?t:r(t,"?embed=1"):`https://stackblitz.com/edit/${t}?embed=1`;case"replit":return t.includes("replit.com")||t.includes("repl.it")?t.includes("embed=true")?t:r(t,"?embed=true"):`https://replit.com/${t}?embed=true`;case"glitch":return t.includes("glitch.com")?t.includes("/embed")?t:r(t,"/embed"):`https://glitch.com/embed/#!/embed/${t}`;default:try{return new URL(t).href}catch{return""}}}class ho extends X{static get tag(){return"oer-code-embed"}static get properties(){return{...super.properties,provider:{type:String,reflect:!0},src:{type:String,reflect:!0},height:{type:String,reflect:!0}}}constructor(){super(),this.provider="codepen",this.height="400"}renderMedia(){const e=cs(this.provider,this.src);return e?s`<iframe
      src="${e}"
      title="${this.title||"Code example"}"
      loading="lazy"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
      allow="clipboard-write"
      credentialless
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>`:this.src?this.renderEmpty("valid address",`That doesn't look like a ${po[this.provider]||"code"} link.`):this.renderEmpty("code example","Pick the service and paste the link in the block settings.")}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:qt("Code example","A live code example from CodePen, JSFiddle, CodeSandbox, StackBlitz, Replit or Glitch.","icons:code",["Media","code","codepen","embed"]),settings:{configure:[{property:"provider",title:"Service",inputMethod:"select",options:po},{property:"src",title:"Link",description:"The example's link (or its short ID, e.g. user/pen for CodePen).",inputMethod:"textfield",required:!0},{property:"height",title:"Height",description:"In pixels.",inputMethod:"textfield"},...X.figureSettings()],advanced:[]},demoSchema:[{tag:"oer-code-embed",properties:{provider:"codepen",height:"400",title:"Code example"},content:""}]}}}class mo extends M{static get tag(){return"oer-divider"}static get properties(){return{label:{type:String,reflect:!0}}}static get styles(){return b`
      :host {
        display: block;
        margin: 2.5rem 0;
      }
      .rule {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: var(--muted-foreground, #555);
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .rule::before,
      .rule::after {
        content: "";
        flex: 1;
        height: 1px;
        background: var(--border, #e5e5e5);
      }
      .rule.plain::after {
        display: none;
      }
    `}render(){return this.label?s`<div class="rule" role="separator" aria-label="${this.label}">${this.label}</div>`:s`<div class="rule plain" role="separator"></div>`}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:qt("Divider with label","A horizontal rule, optionally with a short label in the middle.","hax:hr",["Layout","divider","rule","separator"]),settings:{configure:[{property:"label",title:"Label",description:"Optional, e.g. \u201CPart 2\u201D.",inputMethod:"textfield"}],advanced:[]},demoSchema:[{tag:"oer-divider",properties:{label:"Part 2"},content:""}]}}}const ps={sm:"Small",md:"Medium",lg:"Large",xl:"Extra large"};class uo extends M{static get tag(){return"oer-spacer"}static get properties(){return{size:{type:String,reflect:!0}}}constructor(){super(),this.size="md"}static get styles(){return b`
      :host {
        display: block;
        height: 2rem;
      }
      :host([size="sm"]) {
        height: 1rem;
      }
      :host([size="lg"]) {
        height: 4rem;
      }
      :host([size="xl"]) {
        height: 6rem;
      }
      /* visible only while editing */
      :host([data-hax-ray]) {
        outline: 1px dashed var(--border, #ccc);
        outline-offset: -1px;
        background: repeating-linear-gradient(-45deg, transparent 0 6px, color-mix(in oklch, var(--muted, #eee) 70%, transparent) 6px 12px);
      }
    `}render(){return s``}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:qt("Spacer","Extra vertical space between blocks.","icons:swap-vert",["Layout","spacer","space","gap"]),settings:{configure:[{property:"size",title:"Size",inputMethod:"select",options:ps}],advanced:[]},demoSchema:[{tag:"oer-spacer",properties:{size:"md"},content:""}]}}}for(const a of[co,ho,mo,uo])customElements.get(a.tag)||customElements.define(a.tag,a);ae(co,ho,mo,uo);const go="oer:course",fo=["oer:course","oer:pathway","oer:unit","oer:lesson","oer:lecture","oer:tutorial","oer:article","oer:resource","oer:exercise","oer:project","oer:activity","oer:quiz","oer:book"],W=(a,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${S[a]||""}&quot;)"></span>`,hs={table:"Table",cards:"Cards",outline:"Outline (modules)",pathways:"Pathways (start here, next, in development)"},ms={site:"Whole site",children:"This page's sub-pages",descendants:"Everything under this page"},us={title:"Title",updated:"Recently updated",created:"Newest",order:"Outline order"},R2=["beginner","intermediate","advanced"],Y=a=>Array.isArray(a)?a:typeof a=="string"&&a?a.split(",").map(e=>e.trim()).filter(Boolean):[],gs=a=>(Array.isArray(a)?a:[]).filter(e=>e&&(e.url||e.title)),fs=a=>String(a).split(/[?#]/)[0].split("/").pop();function vs(a){try{return JSON.parse(globalThis.localStorage.getItem(a)||"null")}catch{return null}}function bs(a,e){try{globalThis.localStorage.setItem(a,JSON.stringify(e))}catch{}}class Ye extends M{static get tag(){return"oer-collection"}static get properties(){return{heading:{type:String,reflect:!0},types:{type:String,reflect:!0},scope:{type:String,reflect:!0},view:{type:String,reflect:!0},sort:{type:String,reflect:!0},perPage:{type:Number,attribute:"per-page",reflect:!0},controls:{type:String,reflect:!0},course:{type:String,reflect:!0},group:{type:String,reflect:!0}}}constructor(){super(),this.scope="site",this.view="table",this.sort="title",this.perPage=20,this.controls="full",this._items=[],this._defs=[],this._state={q:"",filters:{},tags:[],sortKey:null,sortDir:1,groupBy:"",page:1,groupPages:{},activeGroup:"",view:null,hidden:[],perPage:0},this._columnsOpen=!1}connectedCallback(){super.connectedCallback(),this.__dispose=R(()=>{const e=_(y.manifest?.items)||[],t=_(y.activeId);Promise.resolve().then(()=>{const r=this.closest?.("[data-oer-page]")?.dataset.oerPage;if(!r){if(!this.__owner)this.__owner=t;else if(t!==this.__owner)return}this._all=e,this._defs=B(e).types,this._pageId=r||this.__owner||this._ownerPageId(e,t),this._items=this._select(e),this.group&&!this.__grouped&&(this.__grouped=!0,this._state={...this._state,groupBy:this.group}),this._restore()})})}disconnectedCallback(){this.__dispose?.(),super.disconnectedCallback()}updated(e){["types","scope","sort","course"].some(t=>e.has(t))&&this._all&&(this._items=this._select(this._all))}_ownerPageId(e,t){return this.closest?.("[data-oer-page]")?.dataset.oerPage||t||null}_course(e=this._all||[]){if(this.course)return{id:"",code:this.course.trim().toUpperCase()};const t=e.find(r=>r.id===this._pageId);return t?.metadata?.pageType===go?{id:t.id,code:""}:null}get _storageKey(){const e=[...this.parentNode?.querySelectorAll?.("oer-collection")||[]].indexOf(this);return`oer-collection:${this._pageId||"site"}:${e}`}_restore(){if(this.__restored===this._storageKey)return;this.__restored=this._storageKey;const e=vs(this._storageKey);e&&(this._state={...this._state,...e,page:1})}_setState(e){e.page===1&&!("groupPages"in e)&&(e={...e,groupPages:{},activeGroup:""}),this._state={...this._state,...e};const{q:t,filters:r,tags:i,sortKey:o,sortDir:n,groupBy:l,view:d,hidden:c,perPage:p}=this._state;bs(this._storageKey,{q:t,filters:r,tags:i,sortKey:o,sortDir:n,groupBy:l,view:d,hidden:c,perPage:p})}get _typeIds(){return Y(this.types)}_select(e){const t=new Set(this._typeIds);let r=e.filter(o=>!de(o)&&!o.metadata?.oerSnapshotOf&&!o.metadata?.hideInMenu);if(y.isLoggedIn||(r=r.filter(o=>o.metadata?.published!==!1)),this.scope==="site"&&(r=r.filter(o=>!o.metadata?.oerRef?.page)),this.scope!=="site"&&this._pageId)if(this.scope==="children")r=r.filter(o=>o.parent===this._pageId);else{const o=me(e),n=new Set,l=d=>(o.get(d)||[]).forEach(c=>(n.add(c.id),l(c.id)));l(this._pageId),r=r.filter(d=>n.has(d.id))}const i=this._course(e);return i&&(r=r.filter(o=>o.id!==this._pageId&&!o.metadata?.oerRef?.page&&nt(o.metadata?.oerFields?.courses,e).some(n=>i.id?n.id===i.id:n.code.toUpperCase()===i.code))),t.size?r=r.filter(o=>t.has(o.metadata?.pageType)):this.view==="pathways"?r=r.filter(o=>o.metadata?.pageType===Pe):this.view!=="outline"&&this.scope==="site"&&(r=r.filter(o=>o.metadata?.pageType)),r}_type(e){return this._defs.find(t=>t.id===e.metadata?.pageType)||null}_value(e,t){if(t==="tags")return Y(e.metadata?.tags);const r=e.metadata?.oerFields?.[t];return this._fields.find(i=>i.name===t)?.kind==="relation"?Y(r).map(i=>i&&typeof i=="object"?i.page:i).filter(Boolean):r}_plain(e,t=null){return t?.kind==="people"||e&&typeof e=="object"&&"name"in e?Y(e).map(r=>typeof r=="object"?r.name:r).filter(Boolean).join(", "):Array.isArray(e)?e.map(r=>this._plain(r,t)).filter(Boolean).join(", "):e&&typeof e=="object"?e.page?we([e],this._all||[])[0]?.item?.title||"":e.title||e.url||"":e==null?"":String(this._label(t,e))}_image(e){const t=e.metadata?.oerFields||{};return t.image||t.coverImage||e.metadata?.image||""}get _fields(){const e=this._typeIds.length?this._typeIds:[...new Set(this._items.map(r=>r.metadata?.pageType).filter(Boolean))],t=new Map;for(const r of e)for(const i of this._defs.find(o=>o.id===r)?.fields||[])t.has(i.name)||t.set(i.name,i);return[...t.values()]}get _filterFields(){return this._fields.filter(e=>(e.kind==="select"||e.kind==="list"||e.filter)&&this._distinct(e.name).length>1&&e.name!=="learningObjectives")}_distinct(e){const t=new Set;for(const r of this._items)for(const i of Y(this._value(r,e)))t.add(i);return e==="difficulty"?[...t].sort((r,i)=>R2.indexOf(String(r).toLowerCase())-R2.indexOf(String(i).toLowerCase())):[...t].sort((r,i)=>String(r).localeCompare(String(i)))}_label(e,t){if(e?.kind==="relation"){const r=(this._all||[]).find(i=>i.id===t);if(r?.metadata?.pageType===go){const i=r.metadata.oerFields||{};return[i.code||r.title,i.institution].filter(Boolean).join(" \xB7 ")}return r?.title||t}return(e?.options||[]).find(r=>r.value===t)?.label||t}get _columns(){const e=[];this._items.some(t=>this._image(t))&&e.push({key:"image",label:"Image"}),e.push({key:"title",label:"Title",fixed:!0,sortable:!0}),new Set(this._items.map(t=>t.metadata?.pageType)).size>1&&e.push({key:"type",label:"Type",sortable:!0}),this._distinct("tags").length&&e.push({key:"tags",label:"Tags"});for(const t of this._fields)!t.header||t.kind==="list"||t.kind==="longtext"||t.kind==="image"||this._items.some(r=>this._value(r,t.name)!==void 0&&this._value(r,t.name)!=="")&&e.push({key:t.name,label:t.label,field:t,sortable:t.kind!=="relation"&&t.kind!=="files"});return e}get _filtered(){const{q:e,filters:t,tags:r}=this._state,i=e.trim().toLowerCase();return this._items.filter(o=>{if(i&&![o.title,o.description,...Y(o.metadata?.tags),...Object.values(o.metadata?.oerFields||{}).map(n=>this._plain(n))].join(" ").toLowerCase().includes(i))return!1;for(const[n,l]of Object.entries(t))if(l&&!Y(this._value(o,n)).includes(l))return!1;return!(r.length&&!Y(o.metadata?.tags).some(n=>r.includes(n)))})}_sorted(e){const t=this._state.sortKey||this.sort||"title",r=this._state.sortDir||1,i=new Map(this._all.map((n,l)=>[n.id,l])),o=n=>{if(t==="title")return n.title||"";if(t==="type")return this._type(n)?.label||"";if(t==="updated")return-(n.metadata?.updated||0);if(t==="created")return-(n.metadata?.created||0);if(t==="order")return Number(n.order)||0;if(t==="difficulty"){const l=R2.indexOf(String(this._value(n,t)||"").toLowerCase());return l<0?99:l}return this._plain(this._value(n,t))};return[...e].sort((n,l)=>{const d=o(n),c=o(l);return((typeof d=="number"&&typeof c=="number"?d-c:String(d).localeCompare(String(c),void 0,{numeric:!0}))||i.get(n.id)-i.get(l.id))*r})}_groups(e){const t=this._state.groupBy;if(!t)return[{key:"",items:e}];const r=new Map;for(const o of e){const n=this._fields.find(d=>d.name===t),l=t==="type"?[this._type(o)?.label||"No type"]:Y(this._value(o,t)).map(d=>n?this._label(n,d):d);for(const d of l.length?l:["\u2014"])r.has(d)||r.set(d,[]),r.get(d).push(o)}const i=[...r.entries()].map(([o,n])=>({key:o,items:n}));if(t==="type"){const o=n=>{const l=this._defs.find(c=>c.label===n)?.id,d=fo.indexOf(l);return d<0?fo.length:d};i.sort((n,l)=>o(n.key)-o(l.key))}return i}_toggleSort(e){const{sortKey:t,sortDir:r}=this._state,i=t||this.sort;this._setState({sortKey:e,sortDir:i===e?-r:1,page:1})}_setFilter(e,t){const r={...this._state.filters};r[e]===t||!t?delete r[e]:r[e]=t,this._setState({filters:r,page:1})}_toggleTag(e){const t=this._state.tags.includes(e)?this._state.tags.filter(r=>r!==e):[...this._state.tags,e];this._setState({tags:t,page:1})}_clear(){this._setState({q:"",filters:{},tags:[],page:1})}_go(e){globalThis.history.pushState({},"",e.slug),globalThis.dispatchEvent(new PopStateEvent("popstate"))}static get styles(){return[yt,b`
      :host {
        display: block;
        /* the page body may be justified; lists and tables read ragged-right */
        text-align: start;
        text-align: start;
        margin: 2rem 0;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground, #111);
      }
      button,
      input,
      select {
        font: inherit;
        color: inherit;
      }
      :focus-visible {
        outline: 2px solid var(--ring, #2563eb);
        outline-offset: 1px;
      }
      :host([data-hax-ray]) a {
        pointer-events: none;
      }
      .lucide {
        flex: none;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      .sm {
        width: 0.875rem;
        height: 0.875rem;
      }
      .xs {
        width: 0.75rem;
        height: 0.75rem;
      }
      h2.heading {
        margin: 0 0 1rem;
        font-size: 1.5rem;
        font-weight: 700;
        letter-spacing: -0.02em;
      }
      /* toolbar: one control scale, after shadcn's data table (size sm:
         2rem tall, 0.875rem text, labels outside their controls) */
      .bar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem 0.75rem;
        margin-bottom: 0.75rem;
        font-size: 0.875rem;
        color: var(--foreground, #111);
      }
      .bar-end {
        display: inline-flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        margin-left: auto;
      }
      .field {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }
      .field-label {
        font-size: 0.875rem;
        font-weight: 500;
        line-height: 1;
        color: var(--foreground, #111);
        white-space: nowrap;
      }
      .select {
        position: relative;
        display: inline-flex;
        align-items: center;
      }
      .select select {
        appearance: none;
        -webkit-appearance: none;
        box-sizing: border-box;
        height: 2rem;
        max-width: 16rem;
        padding: 0 2rem 0 0.75rem;
        border: 1px solid var(--input-border, var(--border, #ddd));
        border-radius: var(--radius-md, 0.5rem);
        background: var(--background, #fff);
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
        color: var(--foreground, #111);
        font: inherit;
        font-size: 0.875rem;
        text-overflow: ellipsis;
        cursor: pointer;
      }
      .select .lucide {
        position: absolute;
        right: 0.625rem;
        pointer-events: none;
        opacity: 0.5;
      }
      .search {
        /* a set width, as shadcn's: filters and the view controls share the row */
        flex: 0 1 16rem;
        min-width: 10rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-sizing: border-box;
        height: 2rem;
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border, #ddd));
        border-radius: var(--radius-md, 0.5rem);
        background: var(--background, #fff);
        color: var(--muted-foreground, #555);
      }
      .search:focus-within {
        outline: 2px solid var(--ring, #2563eb);
        outline-offset: 1px;
      }
      .search input {
        flex: 1;
        min-width: 0;
        border: 0;
        outline: none;
        background: transparent;
        color: var(--foreground, #111);
        font-size: 0.875rem;
      }
      .btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        box-sizing: border-box;
        height: 2rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border, #ddd));
        border-radius: var(--radius-md, 0.5rem);
        background: var(--background, #fff);
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        white-space: nowrap;
      }
      .btn:hover {
        background: var(--accent, #f4f4f5);
      }
      .seg {
        display: inline-flex;
        box-sizing: border-box;
        height: 2rem;
        padding: 0.1875rem;
        gap: 0.125rem;
        border-radius: var(--radius-md, 0.5rem);
        background: var(--muted, #f4f4f5);
      }
      .seg button {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 100%;
        padding: 0 0.625rem;
        border-radius: calc(var(--radius-md, 0.5rem) - 2px);
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--muted-foreground, #555);
        cursor: pointer;
      }
      .seg button[aria-pressed="true"] {
        background: var(--background, #fff);
        color: var(--foreground, #111);
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.08);
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        margin-bottom: 0.75rem;
      }
      .chip {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        height: 1.5rem;
        padding: 0 0.5rem;
        border: 1px solid var(--border, #e5e5e5);
        border-radius: 999px;
        font-size: 0.75rem;
        color: var(--muted-foreground, #555);
        cursor: pointer;
      }
      .chip[aria-pressed="true"],
      .chip.active {
        border-color: var(--primary, #2563eb);
        color: var(--primary, #2563eb);
        background: color-mix(in srgb, var(--primary, #2563eb) 10%, transparent);
        font-weight: 500;
      }
      .status {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.375rem;
        margin-bottom: 0.75rem;
        font-size: 0.8125rem;
        color: var(--muted-foreground, #555);
      }
      .link {
        all: unset;
        color: var(--link, var(--primary, #2563eb));
        cursor: pointer;
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .cols-wrap {
        position: relative;
      }
      .cols-pop {
        position: absolute;
        right: 0;
        top: calc(100% + 0.25rem);
        z-index: 5;
        min-width: 12rem;
        padding: 0.375rem;
        border: 1px solid var(--border, #e5e5e5);
        border-radius: var(--radius-md, 0.5rem);
        background: var(--popover, var(--background, #fff));
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
      }
      .cols-pop label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 1.75rem;
        padding: 0 0.375rem;
        border-radius: var(--radius-sm, 0.25rem);
        font-size: 0.8125rem;
        cursor: pointer;
      }
      .cols-pop label:hover {
        background: var(--accent, #f4f4f5);
      }
      input[type="checkbox"] {
        accent-color: var(--primary, #2563eb);
      }

      /* table */
      .table-wrap {
        overflow-x: auto;
        border: 1px solid var(--border, #e5e5e5);
        border-radius: var(--radius-lg, 0.75rem);
      }
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.875rem;
      }
      th {
        height: 2.5rem;
        padding: 0 0.75rem;
        text-align: start;
        font-weight: 500;
        color: var(--muted-foreground, #555);
        border-bottom: 1px solid var(--border, #e5e5e5);
        white-space: nowrap;
      }
      th button {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        cursor: pointer;
      }
      th button:hover {
        color: var(--foreground, #111);
      }
      td {
        padding: 0.625rem 0.75rem;
        vertical-align: middle;
        border-bottom: 1px solid var(--border, #e5e5e5);
      }
      /* titles stay readable as columns are added: the table scrolls
         sideways instead of squeezing them */
      .col-title {
        min-width: 14rem;
      }
      td.col-title .title {
        min-width: 13rem;
      }
      tr:last-child td {
        border-bottom: 0;
      }
      tbody tr:hover {
        background: color-mix(in srgb, var(--muted, #f4f4f5) 50%, transparent);
      }
      .thumb {
        display: block;
        width: 6rem;
        height: 3.5rem;
        border-radius: var(--radius-sm, 0.25rem);
        object-fit: cover;
        background: var(--muted, #f4f4f5);
      }
      .title a {
        font-weight: 500;
        color: var(--foreground, #111);
        text-decoration: none;
      }
      .title a:hover {
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .desc {
        text-align: start;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-top: 0.125rem;
        font-size: 0.8125rem;
        color: var(--muted-foreground, #555);
      }
      .pill {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        height: 1.375rem;
        margin: 0.125rem 0.25rem 0.125rem 0;
        padding: 0 0.5rem;
        border-radius: 999px;
        font-size: 0.75rem;
        background: color-mix(in srgb, var(--primary, #2563eb) 10%, transparent);
        color: var(--primary, #2563eb);
        cursor: pointer;
        white-space: nowrap;
        --simple-icon-height: 0.75rem;
        --simple-icon-width: 0.75rem;
      }
      .cell-link {
        color: var(--primary, #0071b6);
        text-decoration: none;
      }
      .cell-link:hover {
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .pill.muted {
        background: var(--muted, #f4f4f5);
        color: var(--muted-foreground, #555);
      }
      .draft {
        margin-left: 0.375rem;
        font-size: 0.6875rem;
        font-weight: 500;
        color: var(--muted-foreground, #555);
      }

      /* groups */
      .group + .group {
        margin-top: 1.25rem;
      }
      /* paging scrolls a group to the top: clear of the top bar, with room
         for the current group's outline */
      .group {
        scroll-margin-top: calc(var(--topbar-height, 3.5rem) + 1.25rem);
      }
      /* the group being paged: outlined and tinted (drawn outside its box,
         so nothing moves), both fading after a moment. Two identical fades
         alternate so each page change starts it again. With reduced motion
         nothing fades: the outline stays until another group is paged. */
      .group.current {
        border-radius: var(--radius-lg, 0.75rem);
        outline: 2px solid var(--primary, #0071b6);
        outline-offset: 0.625rem;
      }
      .group.current.flash-0 {
        animation: oer-paged-0 2.5s ease-out forwards;
      }
      .group.current.flash-1 {
        animation: oer-paged-1 2.5s ease-out forwards;
      }
      @keyframes oer-paged-0 {
        0%,
        30% {
          background: color-mix(in srgb, var(--primary, #0071b6) 8%, transparent);
          box-shadow: 0 0 0 0.625rem color-mix(in srgb, var(--primary, #0071b6) 8%, transparent);
          outline-color: var(--primary, #0071b6);
        }
        100% {
          background: transparent;
          box-shadow: 0 0 0 0.625rem transparent;
          outline-color: transparent;
        }
      }
      @keyframes oer-paged-1 {
        0%,
        30% {
          background: color-mix(in srgb, var(--primary, #0071b6) 8%, transparent);
          box-shadow: 0 0 0 0.625rem color-mix(in srgb, var(--primary, #0071b6) 8%, transparent);
          outline-color: var(--primary, #0071b6);
        }
        100% {
          background: transparent;
          box-shadow: 0 0 0 0.625rem transparent;
          outline-color: transparent;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .group.current.flash-0,
        .group.current.flash-1 {
          animation: none;
        }
      }
      .group h3 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0 0 0.5rem;
        font-size: 1rem;
        font-weight: 600;
      }
      .count {
        padding: 0 0.5rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 500;
        background: var(--muted, #f4f4f5);
        color: var(--muted-foreground, #555);
      }

      /* cards */
      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
        gap: 1rem;
      }
      .card-wrap {
        position: relative;
      }
      .card-wrap > .card,
      .card-wrap > .pw-card {
        height: 100%;
        box-sizing: border-box;
      }
      .preview {
        position: absolute;
        top: 0.625rem;
        right: 0.625rem;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        gap: 0.3125rem;
        height: 1.75rem;
        padding: 0 0.625rem;
        border: 1px solid var(--border, #e5e5e5);
        border-radius: var(--radius-md, 0.5rem);
        background: var(--background, #fff);
        color: var(--foreground, inherit);
        font: inherit;
        font-size: 0.75rem;
        font-weight: 500;
        cursor: pointer;
      }
      .preview:hover {
        background: var(--accent, var(--muted, #f4f4f5));
      }
      .preview.inline {
        position: static;
        margin-left: 0.5rem;
        vertical-align: middle;
      }
      .has-preview .pw-title {
        padding-right: 6rem;
      }
      .card {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid var(--border, #e5e5e5);
        border-radius: var(--radius-lg, 0.75rem);
        background: var(--card, var(--background, #fff));
        color: inherit;
        text-decoration: none;
      }
      .card:hover {
        border-color: color-mix(in srgb, var(--primary, #2563eb) 50%, var(--border, #e5e5e5));
      }
      .card .media {
        display: grid;
        place-items: center;
        aspect-ratio: 16 / 9;
        overflow: hidden;
        background: var(--muted, #f4f4f5);
      }
      .card .media img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .card .media.ph {
        background: color-mix(in srgb, var(--primary, #0071b6) 7%, var(--background, #fff));
        color: color-mix(in srgb, var(--primary, #0071b6) 55%, var(--background, #fff));
        --simple-icon-height: 2.25rem;
        --simple-icon-width: 2.25rem;
      }
      /* covers: the whole book cover, in portrait (the Decap site's 1800 × 2360) */
      .card.cover .media {
        aspect-ratio: 1800 / 2360;
      }
      .cards.covers {
        grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
        gap: 1.25rem;
      }
      .card-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        padding: 0.875rem 1rem 1rem;
        border-top: 1px solid var(--border, #e5e5e5);
        background: color-mix(in srgb, var(--muted, #f4f4f5) 40%, var(--card, var(--background, #fff)));
      }
      .card-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 0.375rem;
        margin-top: auto;
        padding-top: 0.25rem;
        font-size: 0.75rem;
        color: var(--muted-foreground, #555);
      }
      .card:not(.cover) .card-meta {
        justify-content: flex-start;
      }
      .card-title {
        font-weight: 600;
        line-height: 1.4;
      }
      .eyebrow {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--muted-foreground, #555);
        --simple-icon-height: 0.875rem;
        --simple-icon-width: 0.875rem;
      }

      /* outline (modules) */
      .modules {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .module {
        border: 1px solid var(--border, #e5e5e5);
        border-radius: var(--radius-lg, 0.75rem);
        overflow: hidden;
      }
      .module-head {
        display: flex;
        align-items: baseline;
        gap: 0.75rem;
        padding: 0.875rem 1rem;
        background: color-mix(in srgb, var(--muted, #f4f4f5) 50%, transparent);
        border-bottom: 1px solid var(--border, #e5e5e5);
      }
      .num {
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--primary, #2563eb);
      }
      .module-title {
        flex: 1;
        font-weight: 600;
      }
      .module-title a {
        color: inherit;
        text-decoration: none;
      }
      .module-meta {
        font-size: 0.75rem;
        color: var(--muted-foreground, #555);
      }
      .rows {
        list-style: none;
        margin: 0;
        padding: 0.25rem 0;
      }
      .rows li {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        min-height: 2.5rem;
        padding: 0.25rem 1rem;
        font-size: 0.875rem;
        --simple-icon-height: 1rem;
        --simple-icon-width: 1rem;
      }
      .rows li + li {
        border-top: 1px solid color-mix(in srgb, var(--border, #e5e5e5) 60%, transparent);
      }
      .rows simple-icon-lite,
      .rows .noicon {
        flex: none;
        width: 1rem;
        color: var(--muted-foreground, #555);
      }
      .rows a {
        flex: 1;
        color: var(--foreground, #111);
        text-decoration: none;
      }
      .rows a:hover {
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .rows .kind {
        font-size: 0.75rem;
        color: var(--muted-foreground, #555);
      }

      /* pagination */
      .pager {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem 1rem;
        margin-top: 0.75rem;
        font-size: 0.875rem;
        color: var(--muted-foreground, #555);
      }
      .pager-status {
        margin-right: auto;
      }

      .pages {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .pages .gap {
        min-width: 1.25rem;
        text-align: center;
      }
      .pages button {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        min-width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md, 0.5rem);
        color: var(--foreground, #111);
        font-weight: 500;
        cursor: pointer;
      }
      .pages button:hover {
        background: var(--accent, #f4f4f5);
      }
      .pages button[aria-current="page"] {
        border: 1px solid var(--border, #e5e5e5);
        color: var(--foreground, #111);
        font-weight: 500;
      }
      .pages button[disabled] {
        opacity: 0.4;
        cursor: default;
      }
      .empty {
        padding: 2.5rem 1rem;
        text-align: center;
        border: 1px dashed var(--border, #e5e5e5);
        border-radius: var(--radius-lg, 0.75rem);
        font-size: 0.875rem;
        color: var(--muted-foreground, #555);
      }

      /* pathways index */
      .pw-section + .pw-section {
        margin-top: 2.5rem;
      }
      .pw-section h3 {
        margin: 0;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--muted-foreground, #555);
      }
      .pw-section > p {
        margin: 0.25rem 0 0;
        font-size: 0.875rem;
        color: var(--muted-foreground, #555);
      }
      .pw-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 16rem), 1fr));
        gap: 1rem;
        margin-top: 0.75rem;
      }
      .pw-grid.featured {
        grid-template-columns: 1fr;
      }
      .pw-card {
        display: flex;
        flex-direction: column;
        height: 100%;
        box-sizing: border-box;
        padding: 1.25rem;
        border: 1px solid var(--border, #e5e5e5);
        border-radius: var(--radius-lg, 0.75rem);
        background: var(--card, var(--background, #fff));
        color: inherit;
        text-decoration: none;
      }
      .featured .pw-card {
        padding: 1.5rem 2rem;
      }
      .pw-card:hover {
        border-color: color-mix(in srgb, var(--primary, #0071b6) 50%, var(--border, #e5e5e5));
      }
      .pw-title {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
      }
      .pw-title strong {
        font-size: 1.125rem;
        font-weight: 600;
        letter-spacing: -0.01em;
      }
      .featured .pw-title strong {
        font-size: 1.5rem;
      }
      .pw-card:hover .pw-title strong {
        color: var(--primary, #0071b6);
      }
      .pw-desc {
        display: -webkit-box;
        margin: 0.5rem 0 0;
        overflow: hidden;
        font-size: 0.875rem;
        line-height: 1.5;
        color: var(--muted-foreground, #555);
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
      .featured .pw-desc {
        display: block;
        max-width: 42rem;
        font-size: 1rem;
      }
      .pw-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem 1rem;
        margin-top: auto;
        padding-top: 1rem;
        font-size: 0.75rem;
        color: var(--muted-foreground, #555);
      }
      .pw-meta .chips {
        display: inline-flex;
        flex-wrap: wrap;
        gap: 0.25rem;
      }
      .pw-meta .go {
        margin-left: auto;
      }
      .pw-card:hover .go {
        color: var(--primary, #0071b6);
      }
    `]}_typeIcon(e){const t=this._type(e);return t?.icon?s`<simple-icon-lite icon="${t.icon}"></simple-icon-lite>`:s`<span class="noicon"></span>`}_pills(e,t=3){const r=[];for(const i of this._fields){if(!i.header||!["select","text","number"].includes(i.kind))continue;const o=this._value(e,i.name);if(!(o===void 0||o===""||o===null)){for(const n of i.kind==="select"?Y(o):[o])r.push(i.kind==="select"&&this._filterFields.includes(i)?s`<button class="pill" title="Filter by ${i.label}" @click="${l=>(l.preventDefault(),this._setFilter(i.name,n))}">${this._label(i,n)}</button>`:s`<span class="pill muted">${i.kind==="text"&&/duration|time/i.test(i.name)?W("device:access-time","xs"):""}${this._label(i,n)}</span>`);if(r.length>=t)break}}return r}_cell(e,t){switch(e.key){case"image":{const r=this._image(t);return r?s`<img class="thumb" src="${r}" alt="" loading="lazy" />`:s`<span class="thumb"></span>`}case"title":return s`<div class="title">
            <a href="${t.slug}">${t.title}</a>${t.metadata?.published===!1?s`<span class="draft">Draft</span>`:""}${this._preview(t,"inline")}
          </div>
          ${t.description?s`<div class="desc">${t.description}</div>`:""}`;case"type":{const r=this._type(t);return r?s`<span class="eyebrow">${this._typeIcon(t)}${r.label}</span>`:""}case"tags":return Y(t.metadata?.tags).map(r=>s`<button class="pill muted" title="Filter by tag" @click="${()=>this._toggleTag(r)}">${r}</button>`);default:{const r=this._value(t,e.key);if(r===void 0||r===""||Array.isArray(r)&&!r.length)return"";const i=e.field?.kind;if(i==="relation")return we(t.metadata?.oerFields?.[e.key],this._all||[]).filter(o=>!o.missing).map((o,n)=>s`${n?", ":""}<a class="cell-link" href="${o.href}">${o.item.title}</a>${o.version?` v${o.version}`:""}`);if(i==="url"){let o=String(r);try{o=new URL(r).hostname.replace(/^www\./,"")}catch{}return s`<a class="cell-link" href="${r}" title="${r}">${o}</a>`}return i==="files"?gs(r).map((o,n)=>s`${n?", ":""}${o.url?s`<a class="cell-link" href="${o.url}" download>${o.title||fs(o.url)}</a>`:o.title}`):i==="select"&&this._filterFields.includes(e.field)?Y(r).map(o=>s`<button class="pill" title="Filter by ${e.label}" @click="${()=>this._setFilter(e.key,o)}">${this._label(e.field,o)}</button>`):i==="boolean"?r?"Yes":"No":this._plain(r,e.field)}}}_renderTable(e){const t=o=>o.fixed?!0:o.key==="type"?new Set(e.map(n=>n.metadata?.pageType)).size>1:o.key==="image"?e.some(n=>this._image(n)):o.key==="tags"?e.some(n=>Y(n.metadata?.tags).length):e.some(n=>{const l=this._value(n,o.key);return l!=null&&l!==""&&!(Array.isArray(l)&&!l.length)}),r=this._columns.filter(o=>o.fixed||!this._state.hidden.includes(o.key)&&t(o)),i=this._state.sortKey||this.sort;return s`<div class="table-wrap">
      <table>
        <thead>
          <tr>
            ${r.map(o=>{if(!o.sortable)return s`<th scope="col" class="col-${o.key}">${o.key==="image"?s`<span class="sr" style="position:absolute;clip-path:inset(50%)">Image</span>`:o.label}</th>`;const n=i===o.key;return s`<th scope="col" class="col-${o.key}" aria-sort="${n?this._state.sortDir>0?"ascending":"descending":"none"}">
                <button @click="${()=>this._toggleSort(o.key)}">
                  ${o.label}${W(n?this._state.sortDir>0?"icons:arrow-upward":"icons:arrow-downward":"icons:swap-vert","xs")}
                </button>
              </th>`})}
          </tr>
        </thead>
        <tbody>
          ${e.map(o=>s`<tr>${r.map(n=>s`<td class="col-${n.key}">${this._cell(n,o)}</td>`)}</tr>`)}
        </tbody>
      </table>
    </div>`}_preview(e,t=""){return Hi(e,this._all)?s`<button class="preview ${t}" aria-label="Open ${e.title} in the viewer" @click="${()=>E2().show(e.id)}">${W("oer:eye","xs")}Viewer</button>`:""}_isCover(e){return e.metadata?.pageType==="oer:book"||!!e.metadata?.oerFields?.coverImage}_chapterCount(e){const t=me(this._all||[]);let r=0;const i=o=>(t.get(o)||[]).forEach(n=>{n.metadata?.oerSnapshotOf||n.metadata?.hideInMenu||(["oer:section","oer:heading"].includes(n.metadata?.pageType)||r++,i(n.id))});return i(e.id),r}_renderCards(e){const t=new Set(e.map(i=>i.metadata?.pageType)).size===1,r=e.length>0&&e.every(i=>this._isCover(i));return s`<div class="cards ${r?"covers":""}">
      ${e.map(i=>{const o=this._isCover(i),n=this._image(i),l=this._type(i),d=(i.metadata?.oerFields||{}).license||l?.fields?.find(p=>p.name==="license")?.default||"",c=o?this._chapterCount(i):0;return s`<div class="card-wrap">${this._preview(i)}<a class="card ${o?"cover":""}" href="${i.slug}">
          <div class="media ${n?"":"ph"}">${n?s`<img src="${n}" alt="" loading="lazy" />`:this._typeIcon(i)}</div>
          <div class="card-body">
            ${l&&!t?s`<span class="eyebrow">${this._typeIcon(i)}${l.label}</span>`:""}
            <span class="card-title">${i.title}${i.metadata?.published===!1?s`<span class="draft">Draft</span>`:""}</span>
            ${i.description?s`<span class="desc">${i.description}</span>`:""}
            <span class="card-meta">
              ${o?s`<span>${c?`${c} chapter${c===1?"":"s"}`:""}</span><span>${d}</span>`:this._pills(i)}
            </span>
          </div>
        </a></div>`})}
    </div>`}_renderPathways(e){if(!e.length)return s`<div class="empty">Nothing here yet.</div>`;const t=[...e].sort((v,u)=>v.title.localeCompare(u.title)),r=v=>v.metadata?.oerFields||{},i=v=>we(r(v).prerequisites,this._all).filter(u=>!u.missing),o=t.filter(v=>r(v).placeholder),n=t.filter(v=>!r(v).placeholder),l=n.filter(v=>!i(v).length),d=n.filter(v=>i(v).length),c=new Set(d.map(v=>i(v).map(u=>u.page).join())).size===1?i(d[0]):[],p=c.length===1?`After ${c[0].item.title.replace(/ pathway$/i,"")}`:"Next steps",h=v=>{const u=r(v),g=b2(u.levels),f=nt(u.courses,this._all||[]).map(k=>k.code),x=this._preview(v);return s`<div class="card-wrap ${x?"has-preview":""}">${x}<a class="pw-card" href="${v.slug}">
        <span class="pw-title"><strong>${v.title}</strong>${u.placeholder?w2():""}${v.metadata?.published===!1?s`<span class="draft">Draft</span>`:""}</span>
        ${v.description?s`<p class="pw-desc">${v.description}</p>`:""}
        <span class="pw-meta">
          ${f.length?s`<span>${f.join(" or ")}</span>`:""}
          ${g.length?s`<span class="chips">${g.map(k=>Me(k))}</span>`:u.placeholder?"":s`<span>One level</span>`}
          ${u.targetRole?s`<span>Leads toward ${u.targetRole}</span>`:""}
          ${W("oer:arrow-right","go")}
        </span>
      </a></div>`},m=(v,u,{featured:g=!1,intro:f=""}={})=>u.length?s`<section class="pw-section">
            <h3>${v}</h3>
            ${f?s`<p>${f}</p>`:""}
            <div class="pw-grid ${g?"featured":""}">${u.map(h)}</div>
          </section>`:"";return s`${m("Start here",l,{featured:!0})}${m(p,d)}${m("In development",o,{intro:"Planned pathways. Their modules are still being written, so they can't be taken yet."})}`}_renderOutline(e){const t=me((this._all||[]).filter(i=>!i.metadata?.hideInMenu&&(y.isLoggedIn||i.metadata?.published!==!1))),r=this._sorted(e);return r.length?s`<div class="modules">
      ${r.map((i,o)=>{const n=t.get(i.id)||[];return s`<section class="module">
          <div class="module-head">
            <span class="num">${String(o+1).padStart(2,"0")}</span>
            <span class="module-title"><a href="${i.slug}">${i.title}</a></span>
            <span class="module-meta">${n.length?`${n.length} item${n.length===1?"":"s"}`:""}</span>
          </div>
          ${n.length?s`<ul class="rows">
                ${n.map(l=>s`<li>
                    ${this._typeIcon(l)}
                    <a href="${l.slug}">${l.title}</a>
                    ${this._pills(l,2)}
                    <span class="kind">${this._type(l)?.label||""}</span>
                  </li>`)}
              </ul>`:i.description?s`<p class="desc" style="margin:0;padding:0.75rem 1rem">${i.description}</p>`:""}
        </section>`})}
    </div>`:s`<div class="empty">Nothing here yet.</div>`}_renderControls(e,t){const r=this._state,i=r.view||this.view,o=this._filterFields,n=this._distinct("tags"),l=[...new Set(this._items.map(c=>c.metadata?.pageType)).size>1?[{key:"type",label:"Type"}]:[],...o.filter(c=>c.kind==="select"||c.filter).map(c=>({key:c.name,label:c.label})),...n.length?[{key:"tags",label:"Tag"}]:[]],d=[...Object.entries(r.filters).map(([c,p])=>({label:`${o.find(h=>h.name===c)?.label||c}: ${this._label(o.find(h=>h.name===c),p)}`,clear:()=>this._setFilter(c,null)})),...r.tags.map(c=>({label:`Tag: ${c}`,clear:()=>this._toggleTag(c)}))];return s`
      <div class="bar">
        <label class="search">
          ${W("icons:search","sm")}
          <input type="search" placeholder="Search…" aria-label="Search" .value="${r.q}" @input="${c=>this._setState({q:c.target.value,page:1})}" />
        </label>
        ${o.map(c=>this._dropdown({label:c.label,value:r.filters[c.name]||"",options:[{value:"",label:"All"},...this._distinct(c.name).map(p=>({value:p,label:this._label(c,p)}))],onChange:p=>this._setFilter(c.name,p)}))}
        <span class="bar-end">
        ${i==="table"?s`<div class="cols-wrap">
              <button class="btn" aria-expanded="${this._columnsOpen}" @click="${()=>this._columnsOpen=!this._columnsOpen}">${W("oer:columns-2","sm")}Columns</button>
              ${this._columnsOpen?s`<div class="cols-pop" role="group" aria-label="Columns">
                    ${this._columns.filter(c=>!c.fixed).map(c=>s`<label
                          ><input
                            type="checkbox"
                            .checked="${!r.hidden.includes(c.key)}"
                            @change="${p=>this._setState({hidden:p.target.checked?r.hidden.filter(h=>h!==c.key):[...r.hidden,c.key]})}"
                          />${c.label}</label
                        >`)}
                  </div>`:""}
            </div>`:""}
        <div class="seg" role="group" aria-label="View">
          <button aria-pressed="${i==="table"}" @click="${()=>this._setState({view:"table"})}">${W("editor:border-all","sm")}Table</button>
          <button aria-pressed="${i==="cards"}" @click="${()=>this._setState({view:"cards"})}">${W("icons:view-module","sm")}Cards</button>
        </div>
        </span>
      </div>
      ${n.length>1?s`<div class="chips" role="group" aria-label="Tags">
            ${n.map(c=>s`<button class="chip" aria-pressed="${r.tags.includes(c)}" @click="${()=>this._toggleTag(c)}">${c}</button>`)}
          </div>`:""}
      ${l.length?s`<div class="bar">
            <span class="field-label" id="group-by-label">Group by</span>
            <div class="seg" role="group" aria-labelledby="group-by-label">
              <button aria-pressed="${!r.groupBy}" @click="${()=>this._setState({groupBy:"",page:1})}">None</button>
              ${l.map(c=>s`<button aria-pressed="${r.groupBy===c.key}" @click="${()=>this._setState({groupBy:c.key,page:1})}">${c.label}</button>`)}
            </div>
            ${r.groupBy?s`<span class="bar-end">${this._renderPerPage()}</span>`:""}
          </div>`:""}
      <div class="status" aria-live="polite">
        ${d.map(c=>s`<button class="chip active" @click="${c.clear}" aria-label="Remove filter ${c.label}">${W("image:tune","xs")}${c.label}${W("oer:x","xs")}</button>`)}
        <span>${t===e?`${e} item${e===1?"":"s"}`:`${t} of ${e}`}</span>
        ${d.length||r.q?s`<button class="link" @click="${this._clear}">Clear all</button>`:""}
      </div>
    `}get _per(){return Math.max(1,Number(this._state.perPage)||Number(this.perPage)||20)}_pageList(e,t){if(t<=7)return Array.from({length:t},(o,n)=>n+1);const r=[...new Set([1,2,e-1,e,e+1,t-1,t])].filter(o=>o>=1&&o<=t).sort((o,n)=>o-n),i=[];return r.forEach((o,n)=>{n&&o-r[n-1]>1&&i.push("\u2026"),i.push(o)}),i}_dropdown({label:e,value:t,options:r,onChange:i}){return s`<label class="field">
      <span class="field-label">${e}</span>
      <span class="select">
        <select @change="${o=>i(o.target.value)}">
          ${r.map(o=>s`<option value="${o.value}" ?selected="${String(o.value)===String(t)}">${o.label}</option>`)}
        </select>
        ${W("oer:chevron-down","sm")}
      </span>
    </label>`}get _sizes(){return[...new Set([10,20,50,100,Number(this.perPage)||20])].sort((e,t)=>e-t)}_renderPerPage(){return this._dropdown({label:"Per page",value:this._per,options:this._sizes.map(e=>({value:e,label:String(e)})),onChange:e=>this._setState({perPage:Number(e),page:1})})}_renderPager(e,t,{go:r,label:i="Pages",sizes:o=!0,scrollTo:n=this}={}){const l=this._per,d=Math.max(1,Math.ceil(e/l));if(d<=1&&(!o||e<=this._sizes[0]))return"";const c=p=>{r(p),n?.scrollIntoView?.({block:"start",behavior:"auto"})};return s`<nav class="pager" aria-label="${i}">
      <span class="pager-status" aria-live="polite">Showing ${(t-1)*l+1}–${Math.min(t*l,e)} of ${e}</span>
      ${o?this._renderPerPage():""}
      ${d>1?s`<div class="pages">
            <button ?disabled="${t===1}" aria-label="Previous page" @click="${()=>c(t-1)}">${W("icons:chevron-left","sm")}</button>
            ${this._pageList(t,d).map(p=>p==="\u2026"?s`<span class="gap" aria-hidden="true">…</span>`:s`<button aria-current="${p===t?"page":"false"}" aria-label="Page ${p}" @click="${()=>c(p)}">${p}</button>`)}
            <button ?disabled="${t===d}" aria-label="Next page" @click="${()=>c(t+1)}">${W("icons:chevron-right","sm")}</button>
          </div>`:""}
    </nav>`}render(){const e=this.heading?s`<h2 class="heading">${this.heading}</h2>`:"";if(this.view==="outline")return s`${e}${this._renderOutline(this._items)}`;if(this.view==="pathways")return s`${e}${this._renderPathways(this._items)}`;const t=this.controls==="full"?this._state.view||this.view:this.view,r=this.controls==="full"?this._filtered:this._items,i=this._sorted(r),o=this._per,n=this._groups(i),l=n.length>1||!!this._state.groupBy,d=(m,v)=>Math.min(Math.max(1,v||1),Math.max(1,Math.ceil(m/o))),c=d(i.length,this._state.page),p=m=>d(m.items.length,this._state.groupPages?.[m.key]),h=m=>t==="cards"?this._renderCards(m):this._renderTable(m);return s`
      ${e}
      ${this.controls==="full"?this._renderControls(this._items.length,r.length):""}
      ${i.length?l?n.map(m=>{const v=p(m),u=this._state.activeGroup===m.key;return s`<section class="group ${u?`current flash-${(this._state.pagedCount||0)%2}`:""}" data-group="${m.key}">
                <h3>${m.key}<span class="count">${m.items.length}</span></h3>
                ${h(m.items.slice((v-1)*o,v*o))}
                ${this._renderPager(m.items.length,v,{label:`Pages of ${m.key}`,sizes:!1,scrollTo:null,go:g=>{this._setState({groupPages:{...this._state.groupPages||{},[m.key]:g},activeGroup:m.key,pagedCount:(this._state.pagedCount||0)+1}),this.updateComplete.then(()=>this.shadowRoot.querySelector(`section.group[data-group="${CSS.escape(m.key)}"]`)?.scrollIntoView({block:"start",behavior:"auto"}))}})}
              </section>`}):s`${h(i.slice((c-1)*o,c*o))}${this._renderPager(i.length,c,{go:m=>this._setState({page:m})})}`:s`<div class="empty">
            ${this._items.length?s`Nothing matches. <button class="link" @click="${this._clear}">Clear filters</button>`:"Nothing here yet."}
          </div>`}
    `}static get haxProperties(){const e=Object.fromEntries([["","Any type"],...B().types.map(t=>[t.id,t.label])]);return{canScale:!1,canEditSource:!0,gizmo:{title:"Page collection",description:"List pages by content type and place: a filterable table, cards, or a module outline.",icon:"icons:view-module",color:"blue",tags:["Layout","collection","index","listing","table","outline"],meta:{author:"Michael Collins"}},settings:{configure:[{property:"heading",title:"Heading",description:"Optional, shown above the list.",inputMethod:"textfield"},{property:"types",title:"Content type",description:"Which pages to list. For several, edit the source and separate IDs with commas.",inputMethod:"select",options:e},{property:"scope",title:"From",inputMethod:"select",options:ms},{property:"course",title:"Course",description:"Only pages for this course code (e.g. DART 413). On a Course page, leave empty for that course.",inputMethod:"textfield"},{property:"group",title:"Group by",inputMethod:"select",options:{"":"None",type:"Content type"}},{property:"view",title:"View",inputMethod:"select",options:hs},{property:"sort",title:"Sort by",inputMethod:"select",options:us},{property:"perPage",title:"Items per page",inputMethod:"number"},{property:"controls",title:"Search and filters",inputMethod:"select",options:{full:"Show (readers can switch table / cards)",none:"Hide"}}],advanced:[]},demoSchema:[{tag:"oer-collection",properties:{types:"oer:lesson",scope:"site",view:"table",sort:"title",perPage:20,controls:"full"},content:""}]}}}for(const a of["_items","_defs","_state","_columnsOpen"])Object.defineProperty(Ye.prototype,a,{get(){return this[`__${a}`]},set(e){this[`__${a}`]=e,this.requestUpdate()}});customElements.get(Ye.tag)||customElements.define(Ye.tag,Ye),ae(Ye);const Pt=new Map;function ws(a){if(!Pt.has(a)){const e=new URL(a,globalThis.document.baseURI);Pt.set(a,fetch(e,{cache:"no-cache"}).then(t=>t.ok?t.text():Promise.reject(new Error(String(t.status)))).then(t=>t.replace(/<page-break\b[^>]*>(?:\s*<\/page-break>)?/gi,"")).catch(t=>{throw Pt.delete(a),t}))}return Pt.get(a)}class Ot extends M{static get tag(){return"oer-include"}static get properties(){return{page:{type:String,reflect:!0},version:{type:String,reflect:!0},source:{type:String,reflect:!0}}}constructor(){super(),this.source="show"}_resolve(){const e=_(y.manifest?.items)||[],t=e.find(i=>i.id===this.page);if(!t)return{page:null,target:null};if(!this.version)return{page:t,target:t};const r=K(t.id,e).find(i=>i.version===this.version);return{page:t,target:r?.snapshot||null}}updated(e){(e.has("page")||e.has("version"))&&this._load()}async _load(){const e=this.shadowRoot.querySelector(".content");if(!e)return;const{page:t,target:r}=this._resolve();if(!t||!r){e.innerHTML="",this.__missing=t?`Version ${this.version} of \u201C${t.title}\u201D was not found.`:"The included page was not found.",this.requestUpdate();return}this.__missing="";try{const i=await ws(r.location);this._resolve().target?.id===r.id&&(e.innerHTML=i)}catch{this.__missing=`\u201C${t.title}\u201D could not be loaded.`}this.requestUpdate()}static get styles(){return b`
      :host {
        display: block;
      }
      /* the included page reads like the page around it: ragged-right
         (DDD justifies the theme), and in Reader mode at the reader's size
         and spacing (--reader-*, from the theme) */
      .content {
        font-size: var(--reader-size, var(--ddd-theme-body-font-size, 1.125rem));
        line-height: var(--reader-leading, 1.6);
        text-align: start;
      }
      .content > :first-child {
        margin-top: 0;
      }
      .content :is(h2, h3, h4) {
        line-height: 1.3;
      }
      .content h2 {
        margin: 2rem 0 0.75rem;
        font-size: var(--reader-h2, 1.75rem);
        font-weight: 700;
        letter-spacing: -0.02em;
        line-height: 1.25;
      }
      .content h3 {
        margin: 1.5rem 0 0.5rem;
        font-size: var(--reader-h3, 1.375rem);
        font-weight: 600;
      }
      .content h4 {
        margin: 1.25rem 0 0.5rem;
        font-size: var(--reader-h4, 1.125rem);
        font-weight: 600;
      }
      .content p,
      .content ul,
      .content ol {
        margin: 0 0 var(--reader-gap, 1rem);
      }
      .content li {
        margin: 0.25rem 0;
      }
      .content a {
        color: var(--link, var(--primary));
      }
      .content img,
      .content video {
        max-width: 100%;
        height: auto;
        border-radius: var(--radius-md, 0.5rem);
      }
      .content table {
        width: 100%;
        border-collapse: collapse;
        margin: 0 0 1rem;
        font-size: var(--reader-table, 0.9375rem);
      }
      .content th,
      .content td {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--border);
        text-align: start;
      }
      .content code {
        padding: 0.125rem 0.375rem;
        border-radius: var(--radius-sm, 0.25rem);
        background: var(--muted);
        font-size: 0.875em;
      }
      .content blockquote {
        margin: 0 0 1rem;
        padding-left: 1rem;
        border-left: 3px solid var(--border);
        color: var(--muted-foreground);
      }
      .source {
        display: var(--oer-include-source, flex);
        flex-wrap: wrap;
        gap: 0.375rem;
        align-items: center;
        margin: 0 0 1.25rem;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .source a {
        color: var(--link, var(--primary));
      }
      .version {
        padding: 0 0.5rem;
        border: 1px solid var(--border);
        border-radius: 999px;
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.75rem;
      }
      .missing {
        padding: 1.5rem;
        border: 1px dashed var(--border);
        border-radius: var(--radius-lg, 0.75rem);
        text-align: center;
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
    `}render(){const{page:e}=this._resolve();return s`
      ${e&&this.source!=="hide"?s`<p class="source">
            From <a href="${e.slug}">${e.title}</a>
            ${this.version?s`<span class="version">v${this.version}</span>`:s`<span>(latest)</span>`}
          </p>`:""}
      ${this.__missing?s`<div class="missing">${this.__missing}</div>`:""}
      <div class="content"></div>
    `}firstUpdated(){this._load()}static get haxProperties(){const e=Object.fromEntries((_(y.manifest?.items)||[]).filter(t=>!t.metadata?.oerSnapshotOf&&t.metadata?.pageType!==te).map(t=>[t.id,t.title]));return{canScale:!1,canEditSource:!0,gizmo:{title:"Include a page",description:"Show another page's content here (latest or a released version) without copying it.",icon:"hax:file-link-outline",color:"blue",tags:["Layout","include","reuse","book","embed"],meta:{author:"Michael Collins"}},settings:{configure:[{property:"page",title:"Page",inputMethod:"select",options:e},{property:"version",title:"Version",description:"A released version like 1.2.0, or empty for the latest.",inputMethod:"textfield"},{property:"source",title:"Source line",inputMethod:"select",options:{show:"Show \u201CFrom \u2026\u201D",hide:"Hide"}}],advanced:[]},demoSchema:[{tag:"oer-include",properties:{source:"show"},content:""}]}}}customElements.get(Ot.tag)||customElements.define(Ot.tag,Ot),ae(Ot);const Fe=(a,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${S[a]||""}&quot;)"></span>`,xs={matrix:"Level matrix",syllabus:"Syllabus (one column)",sidebar:"Sidebar (facts beside the route)"};class ze extends M{static get tag(){return"oer-pathway"}static get properties(){return{layout:{type:String,reflect:!0}}}constructor(){super(),this.layout="matrix",this._data=null,this._level=null}_pageId(){return this.closest?.("[data-oer-page]")?.dataset.oerPage||_(y.activeId)}connectedCallback(){super.connectedCallback(),this.__dispose=R(()=>{const e=_(y.manifest?.items)||[];_(y.activeId);const t=this._pageId();y.isLoggedIn,Promise.resolve().then(()=>{const r=si(t,e);this._data=r?di(r,e,B(e).types):null})})}disconnectedCallback(){this.__dispose?.(),super.disconnectedCallback()}static get styles(){return[yt,b`
        :host {
          display: block;
          text-align: start;
          margin: 1.5rem 0 2rem;
          font-family: var(--font-sans, system-ui, sans-serif);
          color: var(--foreground, #111);
          --simple-icon-height: 0.875rem;
          --simple-icon-width: 0.875rem;
        }
        :host([data-hax-ray]) a {
          pointer-events: none;
        }
        button {
          font: inherit;
          color: inherit;
        }
        :focus-visible {
          outline: 2px solid var(--ring, #2563eb);
          outline-offset: 2px;
        }
        a {
          color: inherit;
        }
        .lucide {
          flex: none;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          background: currentColor;
          -webkit-mask: var(--src) center / contain no-repeat;
          mask: var(--src) center / contain no-repeat;
        }
        .xs {
          width: 0.75rem;
          height: 0.75rem;
        }
        .sm {
          width: 0.875rem;
          height: 0.875rem;
        }
        h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.3;
        }
        h2.small {
          font-size: 1.25rem;
        }
        .intro {
          margin: 0.25rem 0 1rem;
          color: var(--muted-foreground, #555);
        }
        section + section,
        .split {
          margin-top: 2.5rem;
        }
        .card {
          border: 1px solid var(--border, #e5e5e5);
          border-radius: var(--radius-lg, 0.75rem);
          background: var(--card, var(--background, #fff));
        }
        .muted {
          color: var(--muted-foreground, #555);
        }

        /* facts */
        .facts-card {
          padding: 1.25rem;
        }
        .facts-card + section {
          margin-top: 2.5rem;
        }
        dl {
          display: grid;
          gap: 1rem 2rem;
          margin: 0;
          font-size: 0.875rem;
        }
        dl.row {
          grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
        }
        dt {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--muted-foreground, #555);
        }
        dd {
          margin: 0.25rem 0 0;
          font-weight: 500;
        }
        dd.chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
        }
        dd a {
          color: var(--primary, #0071b6);
          text-decoration: none;
        }
        dd a:hover {
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        /* level switcher */
        .switch-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .switch-bar p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--muted-foreground, #555);
        }
        .switcher {
          display: inline-flex;
          flex-wrap: wrap;
          gap: 0.25rem;
          padding: 0.25rem;
          border: 1px solid var(--border, #e5e5e5);
          border-radius: var(--radius-lg, 0.75rem);
          background: color-mix(in srgb, var(--muted, #f4f4f5) 40%, transparent);
        }
        .switcher button {
          all: unset;
          display: inline-flex;
          align-items: center;
          padding: 0.375rem 0.75rem;
          border-radius: var(--radius-md, 0.5rem);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--muted-foreground, #555);
          cursor: pointer;
        }
        .switcher button:hover {
          color: var(--foreground, #111);
        }
        .switcher button:focus-visible {
          outline: 2px solid var(--ring, #2563eb);
        }
        .switcher button[aria-checked="true"] {
          background: var(--background, #fff);
          color: var(--foreground, #111);
          box-shadow: 0 1px 2px rgb(0 0 0 / 0.08);
        }
        .switcher .level {
          padding: 0;
          border: 0;
          background: transparent;
          font-size: 0.875rem;
          color: inherit;
        }

        /* modules */
        ol.modules {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .module-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
          gap: 1rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .module {
          overflow: hidden;
        }
        .module-head {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--border, #e5e5e5);
        }
        .num {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 0.75rem;
          color: var(--muted-foreground, #555);
        }
        .module-head h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }
        .module-head h3 a {
          text-decoration: none;
        }
        .module-head h3 a:hover {
          color: var(--primary, #0071b6);
          text-decoration: underline;
        }
        .count {
          margin-left: auto;
          font-size: 0.75rem;
          color: var(--muted-foreground, #555);
          white-space: nowrap;
        }
        .rows {
          padding: 0 1rem;
        }

        /* item row */
        .item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.625rem 0;
        }
        .item + .item {
          border-top: 1px solid var(--border, #e5e5e5);
        }
        .icon {
          display: flex;
          flex: none;
          align-items: center;
          justify-content: center;
          width: 1.75rem;
          height: 1.75rem;
          margin-top: 0.125rem;
          border: 1px solid var(--border, #e5e5e5);
          border-radius: var(--radius-md, 0.5rem);
          background: color-mix(in srgb, var(--muted, #f4f4f5) 40%, transparent);
          color: var(--muted-foreground, #555);
        }
        .icon.bad {
          border-color: color-mix(in srgb, var(--destructive, #b91c1c) 40%, transparent);
          background: transparent;
          color: var(--destructive, #b91c1c);
        }
        .item-body {
          flex: 1;
          min-width: 0;
        }
        .item-title {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.25rem 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .item-title a {
          text-decoration: none;
        }
        .item-title a:hover {
          color: var(--primary, #0071b6);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .item-title .planned {
          color: var(--muted-foreground, #555);
        }
        .item-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0 0.5rem;
          margin: 0.125rem 0 0;
          font-size: 0.75rem;
          color: var(--muted-foreground, #555);
        }
        .components {
          list-style: none;
          margin: 0.375rem 0 0;
          padding: 0 0 0 0.75rem;
          border-left: 1px solid var(--border, #e5e5e5);
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          font-size: 0.8125rem;
          --simple-icon-height: 0.875rem;
          --simple-icon-width: 0.875rem;
          --simple-icon-color: var(--muted-foreground, #555);
        }
        .components li {
          display: flex;
          align-items: baseline;
          gap: 0.375rem;
          min-width: 0;
        }
        .components simple-icon-lite,
        .components .lucide {
          flex: none;
          align-self: center;
        }
        .components a {
          color: inherit;
          text-decoration: none;
        }
        .components a:hover {
          color: var(--primary, #0071b6);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .components .ctype {
          color: var(--muted-foreground, #555);
          font-size: 0.75rem;
          white-space: nowrap;
        }
        .item-meta .bad {
          color: var(--destructive, #b91c1c);
        }
        .item-meta .dur {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        /* matrix */
        .matrix-wrap {
          overflow-x: auto;
          border: 1px solid var(--border, #e5e5e5);
          border-radius: var(--radius-lg, 0.75rem);
        }
        table {
          width: 100%;
          min-width: 45rem;
          border-collapse: collapse;
          font-size: 0.875rem;
        }
        thead tr {
          border-bottom: 1px solid var(--border, #e5e5e5);
          background: color-mix(in srgb, var(--muted, #f4f4f5) 40%, transparent);
        }
        thead th {
          padding: 0.75rem 1rem;
          text-align: left;
        }
        thead th:first-child {
          width: 12rem;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--muted-foreground, #555);
        }
        tbody tr {
          vertical-align: top;
        }
        tbody tr + tr {
          border-top: 1px solid var(--border, #e5e5e5);
        }
        tbody th {
          padding: 0.75rem 1rem;
          text-align: left;
          font-weight: 600;
        }
        tbody td {
          padding: 0.25rem 1rem;
        }

        /* empty route */
        .planned-box {
          padding: 1.25rem;
          border: 1px dashed var(--border, #d4d4d8);
          border-radius: var(--radius-lg, 0.75rem);
        }
        .planned-box p {
          margin: 0;
        }
        .planned-box .muted {
          margin-top: 0.25rem;
          font-size: 0.875rem;
        }
        .planned-box ul {
          margin: 0.75rem 0 0;
          padding: 0;
          list-style: none;
          font-size: 0.875rem;
        }
        .planned-box li + li {
          margin-top: 0.375rem;
        }
        .planned-box a {
          color: var(--primary, #0071b6);
          font-weight: 500;
          text-decoration: none;
        }

        /* objectives and test-out */
        .objectives {
          display: grid;
          gap: 0.625rem 2rem;
          margin: 0.75rem 0 0;
          padding: 0;
          list-style: none;
        }
        .objectives.two {
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
        }
        .objectives li {
          display: flex;
          align-items: flex-start;
          gap: 0.625rem;
          font-size: 0.875rem;
          line-height: 1.5rem;
        }
        .objectives .lucide {
          margin-top: 0.25rem;
          color: var(--primary, #0071b6);
        }
        .testout {
          padding: 1.25rem;
          border: 1px dashed var(--border, #d4d4d8);
          border-radius: var(--radius-lg, 0.75rem);
          align-self: start;
        }
        .testout h2 {
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0;
        }
        .testout p {
          margin: 0.25rem 0 0;
          font-size: 0.875rem;
          color: var(--muted-foreground, #555);
        }
        .testout ul {
          display: grid;
          gap: 0.5rem 1.5rem;
          margin: 1rem 0 0;
          padding: 0;
          list-style: none;
        }
        .testout.wide ul {
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
        }
        .testout li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.875rem;
        }
        .testout .lucide {
          margin-top: 0.125rem;
          color: var(--muted-foreground, #555);
        }
        .split {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
          gap: 1.5rem;
        }
        .split > section + section {
          margin-top: 0;
        }

        /* sidebar layout */
        .with-aside {
          display: grid;
          gap: 2.5rem;
        }
        .with-aside aside {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        @media (min-width: 64rem) {
          .with-aside {
            grid-template-columns: minmax(0, 1fr) 17rem;
          }
          .with-aside aside {
            position: sticky;
            top: 5rem;
            align-self: start;
          }
        }
        .empty {
          padding: 1.5rem;
          border: 1px dashed var(--border, #d4d4d8);
          border-radius: var(--radius-lg, 0.75rem);
          font-size: 0.875rem;
          color: var(--muted-foreground, #555);
        }
      `]}_facts(e,t){const r=e.levels.length?"":e.placeholder&&!e.modules.length?"To be decided":"One level";return s`<dl class="${t?"":"row"}">
      <div>
        <dt>Course</dt>
        <dd>${e.courses.join(" or ")||"\u2014"}</dd>
      </div>
      ${e.duration?s`<div>
            <dt>Length</dt>
            <dd>${e.duration}</dd>
          </div>`:""}
      <div>
        <dt>Levels</dt>
        <dd class="chips">${r||e.levels.map(i=>Me(i))}</dd>
      </div>
      <div>
        <dt>Before you start</dt>
        <dd>
          ${e.prerequisites.length?e.prerequisites.map((i,o)=>s`${o?", ":""}${i.missing?s`<span>Missing page</span>`:s`<a href="${i.href}">${i.item.title}</a>`}${i.version?` (v${i.version})`:""}`):"Nothing \u2014 start here"}
        </dd>
      </div>
      ${e.readiness?.length?s`<div>
            <dt>Ready?</dt>
            <dd>
              ${e.readiness.map((i,o)=>s`${o?", ":""}<a href="${i.href}">${i.item.title}</a>${i.item.metadata?.published===!1?" (unpublished)":""}`)}
            </dd>
          </div>`:""}
    </dl>`}_itemRow(e,t){const r=e.missing?s`<span class="icon bad">${Fe("oer:circle-alert","sm")}</span>`:e.planned?s`<span class="icon">${Fe("oer:circle-dashed","sm")}</span>`:s`<span class="icon">${e.type?.icon?s`<simple-icon-lite icon="${e.type.icon}"></simple-icon-lite>`:Fe("lrn:page","sm")}</span>`;return s`<div class="item">
      ${r}
      <div class="item-body">
        <div class="item-title">
          ${e.href?s`<a href="${e.href}">${e.title}</a>`:s`<span class="planned">${e.title}</span>`}
          ${t&&e.level?Me(e.level):""} ${e.placeholder&&!e.missing?w2():""}
        </div>
        <p class="item-meta">
          ${e.missing?s`<span class="bad">Linked content not found</span>`:s`<span>${e.planned?"Planned":e.typeLabel||"Page"}</span>`}
          ${e.duration?s`<span class="dur">${Fe("oer:clock","xs")}${e.duration}</span>`:""}
        </p>
        ${e.components?.length?s`<ul class="components" aria-label="In ${e.title}">
              ${e.components.map(i=>s`<li>
                  ${i.type?.icon?s`<simple-icon-lite icon="${i.type.icon}"></simple-icon-lite>`:Fe("lrn:page","xs")}
                  <a href="${i.href}">${i.title}</a><span class="ctype">${i.typeLabel}${i.draft?" \xB7 unpublished":""}</span>
                </li>`)}
            </ul>`:""}
      </div>
    </div>`}_module(e,t,{numbered:r=!0,level:i=null}={}){return s`<li class="card module">
      <div class="module-head">
        ${r?s`<span class="num">${String(t+1).padStart(2,"0")}</span>`:""}
        <h3>${e.href?s`<a href="${e.href}">${e.title}</a>`:e.title}</h3>
        <span class="count">${e.items.length} ${e.items.length===1?"item":"items"}</span>
      </div>
      <div class="rows">${e.items.map(o=>this._itemRow(o,!i))}</div>
    </li>`}_outline(e,t){return s`<ol class="modules">
      ${un(e,t).map((r,i)=>this._module(r,i,{level:t}))}
    </ol>`}_switcher(e){const t=[{value:null,label:"All levels"},...e.map(i=>({value:i,label:i}))],r=(i,o)=>{const n={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[i.key];if(!n)return;i.preventDefault();const l=(o+n+t.length)%t.length;this._level=t[l].value,this.updateComplete.then(()=>this.shadowRoot.querySelectorAll(".switcher button")[l]?.focus())};return s`<div class="switcher" role="radiogroup" aria-label="Level">
      ${t.map((i,o)=>{const n=this._level===i.value;return s`<button role="radio" aria-checked="${n?"true":"false"}" tabindex="${n?0:-1}" @click="${()=>this._level=i.value}" @keydown="${l=>r(l,o)}">
          ${i.value?Me(i.value):i.label}
        </button>`})}
    </div>`}_matrix(e,t){return s`<div class="matrix-wrap">
      <table>
        <thead>
          <tr>
            <th scope="col">Module</th>
            ${t.map(r=>s`<th scope="col">${Me(r)}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${e.map(r=>{const i=r.items.filter(n=>!n.level),o=t.map(n=>r.items.filter(l=>l.level===n));return s`<tr>
              <th scope="row">${r.href?s`<a href="${r.href}">${r.title}</a>`:r.title}</th>
              ${i.length&&o.every(n=>!n.length)?s`<td colspan="${t.length}">${i.map(n=>this._itemRow(n,!1))}</td>`:o.map(n=>s`<td>${[...i,...n].map(l=>this._itemRow(l,!1))}</td>`)}
            </tr>`})}
        </tbody>
      </table>
    </div>`}_route(e,t){if(!e.modules.length)return s`<div class="planned-box">
        <p><strong>This pathway is still being planned.</strong></p>
        <p class="muted">
          Its modules haven't been written yet.${e.specializations.length?" These specializations show the areas it will cover:":""}
        </p>
        ${e.specializations.length?s`<ul>${e.specializations.map(i=>s`<li><a href="${i.slug}">${i.title}</a></li>`)}</ul>`:""}
      </div>`;const r=e.levels.length>1;return t==="matrix"&&r?this._matrix(e.modules,e.levels):s`${r?s`<div class="switch-bar">
            ${this._switcher(e.levels)}
            <p>Items without a level are part of every level.</p>
          </div>`:""}${this._outline(e.modules,r?this._level:null)}`}_objectives(e,t){return e.objectives.length?s`<ul class="objectives ${t?"two":""}">
          ${e.objectives.map(r=>s`<li>${Fe("oer:check")}<span>${r}</span></li>`)}
        </ul>`:""}_testOut(e,t){return e.testOut.length?s`<section class="testout ${t?"wide":""}" aria-labelledby="testout">
          <h2 id="testout">Already know this?</h2>
          <p>You can ask your instructor to test out. You'll need to show work that meets these criteria:</p>
          <ul>
            ${e.testOut.map(r=>s`<li>${Fe("oer:circle-check")}<span>${r}</span></li>`)}
          </ul>
        </section>`:""}_renderMatrix(e){const t=e.levels.length>1;return s`
      <div class="card facts-card">${this._facts(e,!1)}</div>
      <section>
        <h2>${t?"Choose your level":"The route"}</h2>
        <p class="intro">
          ${t?`Same pathway, ${e.levels.length} depths. Take it again at a higher level on a repeat run.`:e.modules.length?"Every student takes the same route. Lessons cover the ideas; exercises and projects are what you submit.":""}
        </p>
        ${t||!e.modules.length?this._route(e,"matrix"):s`<ul class="module-grid">${e.modules.map((r,i)=>this._module(r,i,{numbered:!1}))}</ul>`}
      </section>
      ${e.objectives.length||e.testOut.length?s`<div class="split">
            ${e.objectives.length?s`<section>
                  <h2 class="small">What you'll learn</h2>
                  ${this._objectives(e,!1)}
                </section>`:""}
            ${this._testOut(e,!1)}
          </div>`:""}
    `}_renderSyllabus(e){return s`
      <div class="card facts-card">${this._facts(e,!1)}</div>
      ${e.objectives.length?s`<section>
            <h2>What you'll learn</h2>
            ${this._objectives(e,!0)}
          </section>`:""}
      <section>
        <h2>The route</h2>
        <p class="intro">${e.modules.length?"Work through the modules in order. Lessons cover the ideas; exercises and projects are what you submit.":""}</p>
        ${this._route(e,"list")}
      </section>
      ${e.testOut.length?s`<section>${this._testOut(e,!0)}</section>`:""}
    `}_renderSidebar(e){return s`<div class="with-aside">
      <div>
        <section>
          <h2>The route</h2>
          <p class="intro">${e.modules.length?"Modules in order. Lessons cover the ideas; exercises and projects are what you submit.":""}</p>
          ${this._route(e,"list")}
        </section>
        ${e.objectives.length?s`<section>
              <h2>What you'll learn</h2>
              ${this._objectives(e,!1)}
            </section>`:""}
      </div>
      <aside aria-label="Pathway facts">
        <div class="card facts-card">${this._facts(e,!0)}</div>
        ${this._testOut(e,!1)}
      </aside>
    </div>`}render(){const e=this._data;return e?this.layout==="syllabus"?this._renderSyllabus(e):this.layout==="sidebar"?this._renderSidebar(e):this._renderMatrix(e):s`<div class="empty">This block shows a pathway. Place it on a page of type Pathway (or one of its sub-pages).</div>`}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:{title:"Pathway",description:"A pathway's facts, route through its modules by level, objectives and test-out criteria.",icon:"hax:unit",color:"blue",tags:["Layout","pathway","course","levels","matrix","outline"],meta:{author:"Michael Collins"}},settings:{configure:[{property:"layout",title:"Layout",inputMethod:"select",options:xs}],advanced:[]},demoSchema:[{tag:"oer-pathway",properties:{layout:"matrix"},content:""}]}}}for(const a of["_data","_level"])Object.defineProperty(ze.prototype,a,{get(){return this[`__${a}`]},set(e){this[`__${a}`]=e,this.requestUpdate()}});customElements.get(ze.tag)||customElements.define(ze.tag,ze),ae(ze);class Ht extends ze{static get tag(){return"oer-unit"}static get properties(){return{}}_module(){const e=this._data;if(!e)return null;const t=_(y.manifest?.items)||[],r=new Map(t.map(i=>[i.id,i]));for(let i=r.get(this._pageId());i;i=r.get(i.parent)){const o=e.modules.find(n=>n.id===i.id);if(o)return o}return null}render(){const e=this._module();return e?s`<section aria-label="In this unit">
      <div class="card module">
        <div class="module-head">
          <h3>In this unit</h3>
          <span class="count">${e.items.length} ${e.items.length===1?"item":"items"}</span>
        </div>
        <div class="rows">${e.items.map(t=>this._itemRow(t,!0))}</div>
      </div>
    </section>`:s`<div class="empty">This block lists a unit's lessons. Place it on a unit page inside a pathway.</div>`}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:{title:"Unit outline",description:"A unit's lessons, their materials and quiz, and the unit project.",icon:"icons:view-module",color:"blue",tags:["Layout","unit","pathway","outline"],meta:{author:"Michael Collins"}},settings:{configure:[],advanced:[]},demoSchema:[{tag:"oer-unit",properties:{},content:""}]}}}customElements.get(Ht.tag)||customElements.define(Ht.tag,Ht),ae(Ht);const F=400,Ge=240,w=(a,e,t,r,i="box",o=4)=>$`<rect x=${a} y=${e} width=${t} height=${r} rx=${o} class=${i}></rect>`,D=(a,e,t,r="t")=>w(a,e,t,5,r,2.5),A=(a,e,t,r="lbl",i="start")=>$`<text x=${a} y=${e} class=${r} text-anchor=${i}>${t}</text>`,L=(a,e,t,r="t")=>$`<circle cx=${a} cy=${e} r=${t} class=${r}></circle>`,Z=(a,e="stroke")=>$`<path d=${a} class=${e}></path>`,G=(a,e,t)=>$`<line x1=${a} y1=${e} x2=${t} y2=${e} class="rule"></line>`,q=(a,e,t,r,i="hi-o")=>$`${w(a,e,t,18,i,9)}${A(a+t/2,e+12.5,r,i==="hi"?"lbl on":"lbl","middle")}`,Ds=(a,e,t=!0)=>$`${w(a,e,10,10,t?"hi":"card",2.5)}${t?Z(`M${a+2.5} ${e+5.2} l2 2 l3.2 -4`,"tick"):""}`,q2=(a,e,t="stroke hi-line")=>Z(`M${a} ${e} l3.5 3.5 l3.5 -3.5`,t),P2=(a,e,t,r,[i,o,n,l],d)=>$`<path class=${d} d=${`M${a+i} ${e} H${a+t-o} A${o} ${o} 0 0 1 ${a+t} ${e+o} V${e+r-n} A${n} ${n} 0 0 1 ${a+t-n} ${e+r} H${a+l} A${l} ${l} 0 0 1 ${a} ${e+r-l} V${e+i} A${i} ${i} 0 0 1 ${a+i} ${e} Z`}></path>`,Nt=10,P=(a=!0)=>$`
  ${w(.5,.5,F-1,Ge-1,"win",Nt)}
  ${G(.5,28,F-.5)}
  ${L(14,14,3.5,"t2")}${L(25,14,3.5,"t2")}${L(36,14,3.5,"t2")}
  ${D(F-74,11.5,40,"t2")}${L(F-18,14,5,"t2")}
  ${a?$`${P2(1,28.5,109.5,Ge-29.5,[0,0,0,Nt-1],"panel")}${Z(`M110.5 28 V${Ge-.5}`,"rule")}`:""}`,O2=()=>P2(1,28.5,F-2,Ge-29.5,[0,0,Nt-1,Nt-1],"scrim"),je=(a,e,t,r=5)=>$`
  ${w(a,e,t*.55,10,"t",3)}
  ${Array.from({length:r},(i,o)=>D(a,e+24+o*12,t*(o%3===2?.7:.95)))}`,ne=(a,e,t=14)=>Array.from({length:e},(r,i)=>D(t,a+i*13,58+i*17%26)),vo={sidebar:()=>$`
    ${P()}
    ${w(8,36,94,20,"card",6)}
    ${w(10,38,50,16,"hi-soft",5)}${A(35,49,"Navigation","lbl sm","middle")}${D(68,43.5,24,"t2")}
    ${A(14,74,"LIBRARY","lbl sm caps")}
    ${ne(82,3,22)}
    ${A(14,132,"CURRICULUM","lbl sm caps")}
    ${ne(140,3,22)}
    ${q(18,186,74,"+ Add page","ghost")}
    ${q(22,210,66,"Edit outline")}
    ${je(126,44,258,9)}`,breadcrumb:()=>$`
    ${P(!1)}
    ${G(.5,62,F-.5)}
    ${D(18,42,34)}${A(60,47,"/","sep")}
    ${w(70,35,26,18,"hi-soft",5)}${A(83,48,"\u2026","lbl","middle")}
    ${A(104,47,"/","sep")}${D(114,42,46)}${A(168,47,"/","sep")}${w(178,42,58,5,"t-strong",2.5)}
    ${w(62,58,120,66,"pop hi-line",7)}
    ${D(74,72,72)}${D(74,88,88)}${D(74,104,64)}
    ${je(200,82,180,7)}
    ${D(20,140,160)}${D(20,152,150)}${D(20,164,168)}${D(20,176,120)}`,editor:()=>$`
    ${P(!1)}
    ${w(.5,28,F-1,30,"panel",0)}${G(.5,58,F-.5)}
    ${D(16,40.5,70,"t")}
    ${q(F-132,34,56,"Cancel","ghost")}${q(F-70,34,54,"Save","hi")}
    ${w(70,72,160,10,"t",3)}
    ${D(70,92,270)}${D(70,104,250)}
    ${Z(`M70 126 H${F-50}`,"stroke hi-line dash")}${L(F/2+10,126,8,"hi")}${Z(`M${F/2+6} 126 h8 M${F/2+10} 122 v8`,"tick")}
    ${w(64,140,284,56,"hi-o",5)}
    ${w(40,140,18,72,"card",5)}
    ${w(44,145,10,10,"hi",2.5)}${w(44,161,10,10,"hi-soft",2.5)}${w(44,177,10,10,"hi-soft",2.5)}${w(44,193,10,10,"hi-soft",2.5)}
    ${D(74,152,250)}${D(74,164,262)}${D(74,176,200)}
    ${D(70,214,260)}${D(70,226,180)}`,collection:()=>$`
    ${P(!1)}
    ${w(18,42,160,10,"t",3)}
    ${w(18,64,150,20,"card",5)}${D(28,71.5,60,"t2")}
    ${w(176,64,56,20,"card",10)}${D(188,71.5,32,"t2")}
    ${w(F-128,64,110,20,"card",6)}
    ${w(F-126,66,36,16,"hi-soft",4)}${A(F-108,77.5,"Table","lbl sm","middle")}
    ${D(F-82,71.5,24,"t2")}${D(F-50,71.5,24,"t2")}
    ${w(18,96,F-36,128,"card",6)}
    ${w(18.5,96.5,F-37,20,"panel",5.5)}
    ${D(30,104,60,"t-strong")}${q2(94,103,"stroke hi-line")}${D(170,104,50,"t-strong")}${D(280,104,50,"t-strong")}
    ${[0,1,2,3,4].map(a=>$`${G(18.5,116.5+a*21,F-18.5)}${D(30,124+a*21,90+a*23%40)}${w(170,122+a*21,42,9,"pill",4.5)}${D(280,124+a*21,60)}`)}`,"content-types":()=>$`
    ${P()}
    ${A(14,46,"SITE","lbl sm caps")}
    ${w(8,54,94,18,"hi-soft",5)}${D(16,60.5,60,"t-hi")}
    ${ne(86,5)}
    ${w(126,40,120,10,"t",3)}
    ${w(126,58,52,20,"card",6)}${D(134,65.5,36,"t2")}
    ${w(182,58,52,20,"hi-soft",6)}${D(190,65.5,36,"t-hi")}
    ${w(238,58,52,20,"card",6)}${D(246,65.5,36,"t2")}
    ${[0,1,2,3].map(a=>$`
      ${w(126,90+a*34,258,28,"card",6)}
      ${D(136,101.5+a*34,56+a*19%30)}
      ${w(232,98+a*34,48,12,"pill",6)}
      ${a===1?$`${w(342,98+a*34,24,12,"hi",6)}${L(360,104+a*34,4.5,"knob")}`:$`${w(342,98+a*34,24,12,"pill",6)}${L(348,104+a*34,4.5,"knob")}`}`)}`,"page-menu":()=>$`
    ${P()}
    ${ne(44,10)}
    ${w(126,44,160,12,"t",3)}
    ${w(F-36,42,18,16,"hi-o",4)}${q2(F-30.5,48)}
    ${w(126,68,36,10,"pill",5)}${w(168,68,30,10,"pill",5)}
    ${D(126,94,150)}${D(126,106,140)}${D(126,118,146)}
    ${w(126,136,150,70,"box",5)}
    ${w(F-128,64,110,156,"pop hi-line",8)}
    ${w(F-122,70,98,18,"hi-soft",5)}${D(F-114,76.5,56,"t-hi")}
    ${[0,1,2,3,4].map(a=>D(F-114,100+a*16,48+a*13%26))}
    ${G(F-122,184,F-24)}${D(F-114,194,44)}${D(F-114,208,54)}`,"page-details":()=>$`
    ${P()}
    ${ne(44,10)}
    ${je(126,44,258,9)}
    ${O2()}
    ${w(110,40,200,190,"pop hi-line",10)}
    ${w(124,54,90,10,"t",3)}
    ${D(124,76,30,"t2")}${w(124,85,172,18,"card",5)}${D(132,91.5,50)}${q2(282,92,"stroke")}
    ${D(124,114,50,"t2")}${w(124,123,172,32,"card",5)}${D(132,131,120)}${D(132,143,90)}
    ${D(124,166,40,"t2")}${w(124,175,172,18,"card",5)}${D(132,181.5,70)}
    ${q(246,202,50,"Save","hi")}`,"outline-builder":()=>$`
    ${P(!1)}
    ${w(18,40,120,10,"t",3)}
    ${A(F-86,49,"Icons","lbl sm","end")}${w(F-80,40,24,12,"hi",6)}${L(F-62,46,4.5,"knob")}
    ${q(F-50,37,36,"Save","hi")}
    ${G(18,64,F-18)}
    ${[{x:18,w:90,head:!0},{x:18,w:110,chip:!0},{x:38,w:90,chip:!0},{x:38,w:100,link:!0},{x:18,w:70,head:!0},{x:18,w:120,chip:!0}].map((a,e)=>{const t=74+e*22;return $`
        ${L(a.x+4,t+7.5,1.3,"t")}${L(a.x+8,t+7.5,1.3,"t")}${L(a.x+4,t+3.5,1.3,"t")}${L(a.x+8,t+3.5,1.3,"t")}${L(a.x+4,t+11.5,1.3,"t")}${L(a.x+8,t+11.5,1.3,"t")}
        ${a.head?A(a.x+18,t+11,e?"CURRICULUM":"LIBRARY","lbl sm caps"):D(a.x+18,t+5,a.w)}
        ${a.chip?w(F-92,t+1,52,13,"pill",6.5):""}
        ${a.link?$`${w(F-92,t+1,52,13,"hi-soft",6.5)}${A(F-66,t+10.5,"v1.2.0","lbl sm","middle")}`:""}`})}
    ${q(38,212,72,"+ Add page")}${q(116,212,94,"+ Add existing")}${q(216,212,94,"+ Add heading")}`,"pathways-index":()=>$`
    ${P(!1)}
    ${w(18,40,140,10,"t",3)}
    ${[{x:18,label:"START HERE",n:2},{x:144,label:"BUILDS ON",n:3},{x:270,label:"IN DEVELOPMENT",n:1}].map(a=>$`
        ${A(a.x,72,a.label,"lbl sm caps")}${Z(`M${a.x} 78 H${a.x+112}`,"stroke hi-line")}
        ${Array.from({length:a.n},(e,t)=>$`
          ${w(a.x,86+t*48,112,40,"card",6)}
          ${D(a.x+10,96+t*48,70,"t-strong")}${D(a.x+10,108+t*48,86)}
          ${w(a.x+10,115+t*48,26,6,"pill",3)}`)}`)}`,pathway:()=>$`
    ${P(!1)}
    ${w(18,40,150,10,"t",3)}
    ${[0,1,2,3].map(a=>$`${w(18+a*92,60,84,30,"card",6)}${D(26+a*92,67,30,"t2")}${D(26+a*92,78,52,"t-strong")}`)}
    ${w(18,104,F-36,120,"card",6)}
    ${w(18.5,104.5,F-37,22,"hi-soft",5.5)}
    ${A(30,119,"MODULE","lbl sm caps")}
    ${["Beginner","Intermediate","Advanced"].map((a,e)=>A(152+e*80,119,a,"lbl sm"))}
    ${[0,1,2].map(a=>$`
      ${G(18.5,126.5+a*32,F-18.5)}
      ${D(30,139+a*32,80,"t-strong")}
      ${[0,1,2].map(e=>(a+e)%3===2?"":$`${w(152+e*80,134+a*32,66,14,"pill",7)}`)}`)}`,versions:()=>$`
    ${P()}
    ${ne(44,10)}
    ${w(126,44,150,12,"t",3)}
    ${w(126,64,36,10,"pill",5)}
    ${[0,1,2,3,4,5].map(a=>D(126,96+a*12,a%3===2?40:52))}
    ${w(186,70,198,156,"pop hi-line",10)}
    ${w(198,82,80,10,"t",3)}
    ${q(310,78,62,"Publish","hi")}
    ${[["v1.2.0",!0],["v1.1.0",!1],["v1.0.0",!1]].map(([a,e],t)=>$`
      ${G(198,108+t*36,372)}
      ${A(198,124+t*36,a,e?"lbl sm":"muted sm")}
      ${e?w(238,116+t*36,34,11,"hi-soft",5.5):""}
      ${D(286,120+t*36,54,"t2")}
      ${D(198,132+t*36,140)}`)}`,embed:()=>$`
    ${P()}
    ${ne(44,10)}
    ${je(126,44,258,9)}
    ${O2()}
    ${w(100,40,220,190,"pop hi-line",10)}
    ${w(114,54,80,10,"t",3)}
    ${w(114,72,192,48,"code",6)}
    ${D(124,82,150,"t-code")}${D(124,94,170,"t-code")}${D(124,106,110,"t-code")}
    ${[0,1,2,3].map(a=>$`${Ds(114,132+a*16,a!==2)}${D(132,134.5+a*16,80+a*21%40)}`)}
    ${q(248,202,58,"Copy","hi")}`,footer:()=>$`
    ${P(!1)}
    ${D(18,42,340)}${D(18,54,300)}
    ${G(18,76,F-18)}
    ${L(26,96,8,"hi-soft")}${L(44,96,8,"hi-soft")}${L(62,96,8,"hi-soft")}${D(78,93.5,140)}
    ${q(F-158,87,50,"Cite")}${q(F-102,87,84,"OER Schema")}
    ${[["AI use",3],["Version",0],["Used in",0]].map(([a,e],t)=>$`
      ${G(18,120+t*36,F-18)}
      ${A(18,140+t*36,a,"muted sm")}
      ${e?Array.from({length:e},(r,i)=>w(110+i*54,131+t*36,48,13,"pill",6.5)):$`${D(110,135+t*36,t===1?120:170,"t")}${t===1?D(240,135+t*36,48,"t-hi"):""}`}`)}`,project:()=>{const a=[["DISCOVER",[[1,70]]],["DEFINE",[[2,96],[3,80]]],["DEVELOP",[[4,64],[5,88],[0,72],[6,92]]]];let e=95;return $`
      ${P()}
      ${ne(44,10)}
      ${w(126,40,150,11,"t",3)}
      ${w(126,58,40,11,"hi-soft",5.5)}${D(172,61,40,"t2")}
      ${w(126,76,258,156,"card hi-line",8)}
      ${A(138,90,"Project steps","lbl sm")}
      ${a.map(([t,r])=>{const i=$`${A(138,e+8,t,"muted sm caps")}${r.map(([o,n],l)=>{const d=e+18+l*12;return o?$`${L(144,d,5,"hi-soft")}${A(144,d+2.5,String(o),"lbl sm","middle")}${D(156,d-2.5,n,"t-hi")}`:$`${w(140,d-4,8,8,"t2",2)}${D(156,d-2.5,n)}`})}`;return e+=16+r.length*12,i})}`},course:()=>$`
    ${P()}
    ${ne(44,10)}
    ${w(126,40,170,11,"t",3)}
    ${w(126,58,40,11,"hi-soft",5.5)}${w(172,58,48,11,"pill",5.5)}${w(226,58,34,11,"pill",5.5)}
    ${w(126,76,124,34,"card",6)}${D(134,84,40,"t2")}${D(134,97,90,"t-code")}
    ${w(258,76,126,34,"card",6)}${D(266,84,50,"t2")}${D(266,97,96)}
    ${w(126,120,258,112,"card hi-line",8)}
    ${A(138,134,"Taught in this course","lbl sm")}
    ${[["LESSONS",2],["READINGS",2],["PROJECTS",1]].reduce((a,[e,t])=>{const r=a.y;return a.out.push($`${A(138,r+8,e,"muted sm caps")}${Array.from({length:t},(i,o)=>$`${w(138,r+13+o*10,6,6,"t2",1.5)}${D(150,r+13.5+o*10,80+o*23%50,"t-hi")}`)}`),a.y+=14+t*10,a},{y:138,out:[]}).out}`,viewer:()=>$`
    ${P()}
    ${ne(44,10)}
    ${je(126,44,258,9)}
    ${O2()}
    ${w(18,38,364,194,"pop hi-line",10)}
    ${P2(19.25,39.25,119.25,191.5,[9,0,0,9],"panel")}${Z("M138.5 39 V231","rule")}
    ${w(28,50,80,9,"t",3)}${D(28,66,96,"t2")}
    ${G(18.5,78,138.5)}
    ${D(42,88,50)}
    ${A(28,106,"UNIT","muted sm caps")}
    ${L(34,117,5,"card")}${D(44,114.5,70)}
    ${w(24,126,108,14,"hi-soft",4)}${L(34,133,5,"card")}${D(44,130.5,76,"t-hi")}
    ${Z("M40 144 V176","rule")}
    ${[0,1,2].map(a=>D(48,148+a*12,60+a*13%20,"t2"))}
    ${A(28,196,"UNIT","muted sm caps")}
    ${L(34,207,5,"card")}${D(44,204.5,64)}
    ${D(152,50,110,"t2")}${q(284,43,62,"Open page","ghost")}${Z("M357 48.5 l6 6 M363 48.5 l-6 6","stroke")}
    ${G(138.5,66,381.5)}
    ${je(158,80,200,7)}
    ${w(158,204,70,18,"card",5)}${w(290,204,70,18,"card",5)}`,reader:()=>{const a=(e,t,r,i=[])=>{const o=112/t.length;return $`${w(82,e,112,14,"box",4)}${t.map((n,l)=>$`${l===r?w(84+l*o,e+2,o-4,10,"card",3):""}<text x=${82+l*o+o/2} y=${e+10} class=${l===r?"lbl sm":"muted sm"} text-anchor="middle" style=${i[l]?`font-size:${i[l]}px`:""}>${n}</text>`)}`};return $`
      ${P(!1)}
      ${G(.5,56,F-.5)}
      ${w(1,55,52,2,"hi",1)}
      ${q(10,33,56,"Contents","ghost")}${q(72,33,30,"Aa")}
      ${D(146,40,58,"t2")}${Z("M218 38.5 l-3.5 3.5 l3.5 3.5","stroke")}${A(234,45,"3 / 30","muted sm","middle")}${Z("M250 38.5 l3.5 3.5 l-3.5 3.5","stroke")}
      ${q(332,33,58,"Exit","ghost")}${Z("M341 39.5 l5 5 M346 39.5 l-5 5","stroke")}
      ${w(150,72,120,10,"t",3)}
      ${[0,1,2,3,4].map(e=>D(150,94+e*11,e===4?110:160))}
      ${w(150,152,72,7,"t",3)}
      ${[0,1,2,3,4,5].map(e=>D(150,168+e*11,e===5?96:160))}
      ${w(72,62,132,142,"pop hi-line",8)}
      ${A(82,76,"Text size","muted sm")}${a(80,["A","A","A","A"],1,[6.5,8,9.5,11])}
      ${A(82,108,"Typeface","muted sm")}${a(112,["Serif","Sans"],0)}
      ${A(82,140,"Line width","muted sm")}${a(144,["Narrow","Medium","Wide"],1)}
      ${A(82,172,"Page","muted sm")}
      ${w(82,176,36,16,"card",4)}${w(120,176,36,16,"box",4)}${w(158,176,36,16,"t-strong",4)}
      ${w(119,175,38,18,"ghost hi-line",5)}`}},ys=Object.keys(vo);class Ut extends M{static get tag(){return"oer-schematic"}static get properties(){return{preset:{type:String,reflect:!0},alt:{type:String,reflect:!0},caption:{type:String,reflect:!0}}}static get styles(){return b`
      :host {
        display: block;
        margin: 1.75rem 0;
      }
      /* as wide as the drawing, so the caption lines up under it */
      figure {
        max-width: 28rem;
        margin: 0 auto;
      }
      /* the window outline sets the drawing apart; no panel behind it */
      .frame {
        padding: 0.25rem 0;
      }
      svg {
        display: block;
        width: 100%;
        max-width: 28rem;
        height: auto;
        margin: 0 auto;
        overflow: visible;
      }
      figcaption {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        line-height: 1.5;
        color: var(--muted-foreground, #555);
      }
      .missing {
        padding: 1rem;
        font-size: 0.875rem;
        color: var(--muted-foreground, #555);
      }

      /* drawing */
      .win {
        fill: var(--background, #fff);
        stroke: var(--border, #e5e5e5);
      }
      .panel {
        fill: color-mix(in oklch, var(--muted, #f4f4f5) 60%, var(--background, #fff));
      }
      .card,
      .pop {
        fill: var(--background, #fff);
        stroke: var(--border, #e5e5e5);
      }
      .pop {
        filter: drop-shadow(0 2px 6px color-mix(in oklch, var(--foreground, #000) 12%, transparent));
      }
      .rule,
      .stroke {
        fill: none;
        stroke: var(--border, #e5e5e5);
        stroke-width: 1;
      }
      .stroke {
        stroke: color-mix(in oklch, var(--muted-foreground, #666) 50%, var(--background, #fff));
        stroke-width: 1.5;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .t {
        fill: light-dark(color-mix(in oklch, var(--muted-foreground, #666) 38%, var(--background, #fff)), color-mix(in oklch, var(--muted-foreground, #666) 58%, var(--background, #fff)));
      }
      .t2,
      .pill {
        fill: light-dark(color-mix(in oklch, var(--muted-foreground, #666) 20%, var(--background, #fff)), color-mix(in oklch, var(--muted-foreground, #666) 34%, var(--background, #fff)));
      }
      .t-strong {
        fill: light-dark(color-mix(in oklch, var(--muted-foreground, #666) 65%, var(--background, #fff)), color-mix(in oklch, var(--muted-foreground, #666) 80%, var(--background, #fff)));
      }
      .box {
        fill: light-dark(color-mix(in oklch, var(--muted-foreground, #666) 12%, var(--background, #fff)), color-mix(in oklch, var(--muted-foreground, #666) 22%, var(--background, #fff)));
      }
      .knob {
        fill: var(--background, #fff);
      }
      .scrim {
        fill: var(--foreground, #000);
        opacity: 0.12;
      }
      .code {
        fill: color-mix(in oklch, var(--muted, #f4f4f5) 80%, var(--background, #fff));
        stroke: var(--border, #e5e5e5);
      }
      .t-code {
        fill: light-dark(color-mix(in oklch, var(--muted-foreground, #666) 50%, var(--background, #fff)), color-mix(in oklch, var(--muted-foreground, #666) 65%, var(--background, #fff)));
      }
      .ghost {
        fill: transparent;
        stroke: var(--border, #e5e5e5);
      }
      /* the feature being explained */
      .hi {
        fill: var(--primary);
      }
      .hi-o {
        fill: var(--background, #fff);
        stroke: var(--primary);
        stroke-width: 1.5;
      }
      .hi-soft {
        fill: color-mix(in srgb, var(--primary) 14%, var(--background, #fff));
      }
      .t-hi {
        fill: var(--primary);
      }
      .hi-line {
        stroke: var(--primary);
        stroke-width: 1.5;
      }
      .dash {
        stroke-dasharray: 4 3;
      }
      .tick {
        fill: none;
        stroke: var(--primary-foreground, #fff);
        stroke-width: 1.6;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      text {
        font-family: var(--font-sans, system-ui, sans-serif);
        font-size: 9.5px;
        font-weight: 600;
      }
      .lbl {
        fill: var(--primary);
      }
      .lbl.on {
        fill: var(--primary-foreground, #fff);
      }
      .ghost + .lbl {
        fill: var(--muted-foreground, #555);
      }
      .muted,
      .sep {
        fill: var(--muted-foreground, #555);
      }
      .sep {
        font-weight: 400;
      }
      .sm {
        font-size: 8px;
      }
      .caps {
        letter-spacing: 0.06em;
      }
    `}render(){const e=vo[this.preset];return s`<figure>
      <div class="frame">
        ${e?s`<svg viewBox="0 0 ${F} ${Ge}" role="img" aria-label=${this.alt||this.caption||"Interface diagram"}>${e()}</svg>`:s`<div class="missing">Choose a diagram in the block settings.</div>`}
      </div>
      ${this.caption?s`<figcaption>${this.caption}</figcaption>`:""}
    </figure>`}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:{title:"Interface diagram",description:"A simplified drawing of part of the site, with one feature highlighted, for documentation.",icon:"image:image",color:"blue",tags:["Media","diagram","schematic","documentation","help"],meta:{author:"Michael Collins"}},settings:{configure:[{property:"preset",title:"Diagram",inputMethod:"select",options:Object.fromEntries(ys.map(e=>[e,e.replace(/-/g," ").replace(/^./,t=>t.toUpperCase())]))},{property:"alt",title:"Description",description:"What the diagram shows, for screen readers.",inputMethod:"textarea"},{property:"caption",title:"Caption",inputMethod:"textarea"}],advanced:[]},demoSchema:[{tag:"oer-schematic",properties:{preset:"sidebar",alt:"The sidebar",caption:"The sidebar"},content:""}]}}}customElements.get(Ut.tag)||customElements.define(Ut.tag,Ut),ae(Ut);class Vt extends M{static get tag(){return"oer-credit"}static get properties(){return{title:{type:String,reflect:!0},creator:{type:String,reflect:!0},creatorUrl:{type:String,attribute:"creator-url",reflect:!0},source:{type:String,reflect:!0},license:{type:String,reflect:!0},note:{type:String,reflect:!0}}}static get styles(){return b`
      :host {
        display: block;
        margin: -0.75rem 0 1.5rem;
        font-size: 0.875rem;
        line-height: 1.5;
        color: var(--muted-foreground, #555);
      }
      a {
        color: var(--link, var(--primary, #0060a8));
      }
      .license {
        white-space: nowrap;
      }
      .license img {
        width: 1em;
        height: 1em;
        margin-right: 0.125em;
        vertical-align: -0.125em;
      }
      .license img:last-of-type {
        margin-right: 0.3em;
      }
      .empty {
        font-style: italic;
      }
    `}render(){const e=(o,n)=>n?s`<a href="${n}" target="_blank" rel="noopener noreferrer">${o}</a>`:o,t=ke(this.license),r=this.license?t?.url?s`<a class="license" href="${t.url}" target="_blank" rel="license noopener noreferrer">${t.parts.map(o=>s`<img src="${y2(o)}" alt="" />`)}${t.name}</a>`:s`<span class="license">${this.license}</span>`:"";if(!this.title&&!this.creator&&!this.license)return s`<p class="empty">Credit: add the title, creator and licence in the block settings.</p>`;const i=[];return this.title&&i.push(s`“${e(this.title,this.source)}”`),this.creator&&i.push(s`${this.title?" by ":"By "}${e(this.creator,this.creatorUrl)}`),s`<p>
      ${i}${i.length&&r?", ":""}${r}${i.length||r?".":""}${this.note?s` ${this.note.replace(/\.?$/,".")}`:""}
    </p>`}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:{title:"Credit",description:"Attribution for third-party material placed above it: title, creator, source and licence.",icon:"icons:copyright",color:"blue",tags:["Text","credit","attribution","license","creative commons","copyright","source"],meta:{author:"Michael Collins"}},settings:{configure:[{property:"title",title:"Title of the work",inputMethod:"textfield"},{property:"source",title:"Source link",description:"Where the original is published.",inputMethod:"textfield",validationType:"url"},{property:"creator",title:"Creator",inputMethod:"textfield"},{property:"creatorUrl",title:"Creator link",inputMethod:"textfield",validationType:"url"},{property:"license",title:"License",inputMethod:"select",options:$i},{property:"note",title:"Changes",description:"How you adapted it, e.g. \u201CCropped and recoloured\u201D.",inputMethod:"textfield"}],advanced:[]},demoSchema:[{tag:"oer-credit",properties:{title:"Title of the work",creator:"Creator",license:"CC BY 4.0"},content:""}]}}}customElements.get(Vt.tag)||customElements.define(Vt.tag,Vt),ae(Vt);const ks={"true-false-question":"multiple-choice/lib/true-false-question.js","fill-in-the-blanks":"fill-in-the-blanks/fill-in-the-blanks.js","matching-question":"matching-question/matching-question.js","sorting-question":"sorting-question/sorting-question.js","tagging-question":"tagging-question/tagging-question.js"},_s=()=>globalThis.WCGlobalBasePath||new URL("build/es6/node_modules/",globalThis.document.baseURI).href;async function $s(a){for(const[e,t]of Object.entries(ks))if(!a.elementList?.[e])try{await import(`${_s()}@haxtheweb/${t}`);let r=customElements.get(e)?.haxProperties;typeof r=="string"&&(r=await fetch(new URL(r,globalThis.document.baseURI)).then(i=>i.ok?i.json():null)),r&&a.setHaxProperties(r,e)}catch(r){console.warn(`[oer] could not add ${e} to the block list`,r)}}let H2=!1;function bo(){const a=globalThis.HaxStore?.requestAvailability?.();return!a||!a.appStoreLoaded||H2?!!H2:(H2=!0,$s(a),!0)}globalThis.addEventListener("hax-store-app-store-loaded",()=>setTimeout(bo,0));const Fs=setInterval(()=>bo()&&clearInterval(Fs),1500);function Cs(a){if(!a||a.prototype.__oerCorrect)return;a.prototype.__oerCorrect=!0;const e=a.prototype.processInput;e&&(a.prototype.processInput=function(r,i,...o){const n=e.call(this,r,i,...o),l=i?.[r];return n&&l?.hasAttribute?.("data-correct")&&(n.correct=!0),n});const t=a.prototype.haxpreProcessNodeToContent;t&&(a.prototype.haxpreProcessNodeToContent=async function(r,...i){const o=await t.call(this,r,...i);for(const n of new Set([this,r,o].filter(l=>l?.querySelectorAll)))n.querySelectorAll("input[correct]").forEach(l=>l.setAttribute("data-correct","true"));return o})}for(const a of["multiple-choice","true-false-question","fill-in-the-blanks","matching-question","sorting-question","tagging-question"])customElements.whenDefined(a).then(()=>{let e=customElements.get(a);for(;e&&e!==HTMLElement&&e.name!=="QuestionElement";)e=Object.getPrototypeOf(e);e?.name==="QuestionElement"&&Cs(e)});const wo=a=>s`<span class="icon" aria-hidden="true" style="--src:url(&quot;${S[a]||""}&quot;)"></span>`;class Kt extends M{static get tag(){return"oer-draft"}static get properties(){return{note:{type:String,reflect:!0}}}connectedCallback(){super.connectedCallback(),this.__stop=R(()=>{this.toggleAttribute("data-author",!!y.isLoggedIn),this.toggleAttribute("data-editing",!!y.editMode),this.requestUpdate()}),this.__ray=new MutationObserver(()=>this.requestUpdate()),this.__ray.observe(this,{attributes:!0,attributeFilter:["data-hax-ray"]})}disconnectedCallback(){this.__stop?.(),this.__ray?.disconnect(),super.disconnectedCallback()}static get styles(){return b`
      :host {
        display: none;
      }
      :host([data-author]),
      :host([data-hax-ray]) {
        display: block;
        margin: 1.5rem 0;
        padding: 0.75rem 1rem 0.25rem;
        border: 1px dashed var(--input-border, var(--border));
        border-radius: var(--radius-lg);
      }
      .bar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.375rem 0.75rem;
        font-family: var(--font-sans, system-ui, sans-serif);
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .label {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.125rem 0.5rem;
        border-radius: 999px;
        font-weight: 600;
        color: oklch(0.45 0.12 70);
        background: color-mix(in srgb, oklch(0.62 0.15 70) 14%, transparent);
      }
      .note {
        flex: 1 1 16rem;
      }
      .icon {
        width: 0.875rem;
        height: 0.875rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      button {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 1.875rem;
        padding: 0 0.75rem;
        border-radius: var(--radius-md);
        background: var(--primary);
        color: var(--primary-foreground);
        font-weight: 500;
        cursor: pointer;
      }
      button:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
    `}_publish(){const e=this.parentNode;if(!e)return;const t=[...this.childNodes];for(const r of t)e.insertBefore(r,this);this.remove()}render(){const e=this.hasAttribute("data-editing")||this.hasAttribute("data-hax-ray");return s`<div class="bar">
        <span class="label">${wo("icons:visibility-off")}Draft for review</span>
        <span class="note"
          >${this.note?`${this.note}${/[.!?]$/.test(this.note.trim())?"":"."} `:""}Only signed-in authors see this.${e?"":" Edit the page to review and publish it."}</span
        >
        ${e?s`<button @click="${this._publish}">${wo("oer:check")}Publish</button>`:""}
      </div>
      <slot></slot>`}static get haxProperties(){return{type:"grid",canScale:!1,canEditSource:!0,gizmo:{title:"Draft",description:"Blocks only signed-in authors see, until you publish them.",icon:"icons:visibility-off",color:"orange",tags:["Layout","draft","review","hidden"],meta:{author:"Michael Collins"}},settings:{configure:[{property:"note",title:"Note",description:"Why it's a draft, e.g. \u201CSuggested questions\u201D.",inputMethod:"textfield"}],advanced:[]},demoSchema:[{tag:"oer-draft",properties:{note:"Not ready yet"},content:"<p>Draft content.</p>"}]}}}customElements.get(Kt.tag)||customElements.define(Kt.tag,Kt),ae(Kt);
