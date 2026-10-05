import{SimpleIconsetStore as Xr}from"@haxtheweb/simple-icon/lib/simple-iconset.js";import{store as B}from"@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";import{HAXCMSLitElementTheme as X2,css as f,html as s,unsafeCSS as v2,toJS as _,store as D,autorun as O,svg as $}from"@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";import"@haxtheweb/haxcms-elements/lib/ui-components/active-item/site-active-title.js";import"@haxtheweb/haxcms-elements/lib/ui-components/layout/site-modal.js";import{DDD as Jr}from"@haxtheweb/d-d-d/d-d-d.js";const E={"hax:hax2022":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%203H5a2%202%200%200%200-2%202v14a2%202%200%200%200%202%202h14a2%202%200%200%200%202-2v-7%22%20%2F%3E%20%3Cpath%20d%3D%22M18.375%202.625a1%201%200%200%201%203%203l-9.013%209.014a2%202%200%200%201-.853.505l-2.873.84a.5.5%200%200%201-.62-.62l.84-2.873a2%202%200%200%201%20.506-.852z%22%20%2F%3E%20%3C%2Fsvg%3E","hax:site-map":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20x%3D%2216%22%20y%3D%2216%22%20width%3D%226%22%20height%3D%226%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20x%3D%222%22%20y%3D%2216%22%20width%3D%226%22%20height%3D%226%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20x%3D%229%22%20y%3D%222%22%20width%3D%226%22%20height%3D%226%22%20rx%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M5%2016v-3a1%201%200%200%201%201-1h12a1%201%200%200%201%201%201v3%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2012V8%22%20%2F%3E%20%3C%2Fsvg%3E","hax:page-edit":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M14.364%2013.634a2%202%200%200%200-.506.854l-.837%202.87a.5.5%200%200%200%20.62.62l2.87-.837a2%202%200%200%200%20.854-.506l4.013-4.009a1%201%200%200%200-3.004-3.004z%22%20%2F%3E%20%3Cpath%20d%3D%22M14.487%207.858A1%201%200%200%201%2014%207V2%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2019.645V20a2%202%200%200%201-2%202H6a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l2.516%202.516%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2018h1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:add-page":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2015h6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018v-6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:loading":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%2012a9%209%200%201%201-6.219-8.56%22%20%2F%3E%20%3C%2Fsvg%3E","hax:wizard-hat":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m21.64%203.64-1.28-1.28a1.21%201.21%200%200%200-1.72%200L2.36%2018.64a1.21%201.21%200%200%200%200%201.72l1.28%201.28a1.2%201.2%200%200%200%201.72%200L21.64%205.36a1.2%201.2%200%200%200%200-1.72%22%20%2F%3E%20%3Cpath%20d%3D%22m14%207%203%203%22%20%2F%3E%20%3Cpath%20d%3D%22M5%206v4%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2014v4%22%20%2F%3E%20%3Cpath%20d%3D%22M10%202v2%22%20%2F%3E%20%3Cpath%20d%3D%22M7%208H3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2016h-4%22%20%2F%3E%20%3Cpath%20d%3D%22M11%203H9%22%20%2F%3E%20%3C%2Fsvg%3E","hax:graph":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%203v16a2%202%200%200%200%202%202h16%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2017V9%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2017V5%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2017v-3%22%20%2F%3E%20%3C%2Fsvg%3E","hax:blocks":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2022V7a1%201%200%200%200-1-1H4a2%202%200%200%200-2%202v12a2%202%200%200%200%202%202h12a2%202%200%200%200%202-2v-5a1%201%200%200%200-1-1H2%22%20%2F%3E%20%3Crect%20x%3D%2214%22%20y%3D%222%22%20width%3D%228%22%20height%3D%228%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:add-brick":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M12%208v8%22%20%2F%3E%20%3C%2Fsvg%3E","hax:html-code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2012.5%208%2015l2%202.5%22%20%2F%3E%20%3Cpath%20d%3D%22m14%2012.5%202%202.5-2%202.5%22%20%2F%3E%20%3C%2Fsvg%3E","hax:home-edit":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2021v-8a1%201%200%200%200-1-1h-4a1%201%200%200%200-1%201v8%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2010a2%202%200%200%201%20.709-1.528l7-6a2%202%200%200%201%202.582%200l7%206A2%202%200%200%201%2021%2010v9a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2z%22%20%2F%3E%20%3C%2Fsvg%3E","hax:add-item":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2012H3%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2019H3%22%20%2F%3E%20%3Cpath%20d%3D%22M18%209v6%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012h-6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:view-gallery":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%2214%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%2214%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%223%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:format-textblock":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2012H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2019H3%22%20%2F%3E%20%3C%2Fsvg%3E","hax:file-html":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2012.5%208%2015l2%202.5%22%20%2F%3E%20%3Cpath%20d%3D%22m14%2012.5%202%202.5-2%202.5%22%20%2F%3E%20%3C%2Fsvg%3E","hax:code-json":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2012a1%201%200%200%200-1%201v1a1%201%200%200%201-1%201%201%201%200%200%201%201%201v1a1%201%200%200%200%201%201%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2018a1%201%200%200%200%201-1v-1a1%201%200%200%201%201-1%201%201%200%200%201-1-1v-1a1%201%200%200%200-1-1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:templates":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%227%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%229%22%20height%3D%227%22%20x%3D%223%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%225%22%20height%3D%227%22%20x%3D%2216%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:paragraph":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M13%204v16%22%20%2F%3E%20%3Cpath%20d%3D%22M17%204v16%22%20%2F%3E%20%3Cpath%20d%3D%22M19%204H9.5a4.5%204.5%200%200%200%200%209H13%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h1":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22m17%2012%203-2v8%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h2":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2018h-4c0-4%204-3%204-6%200-1.5-2-2.5-4-1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h3":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17.5%2010.5c1.7-1%203.5%200%203.5%201.5a2%202%200%200%201-2%202%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2017.5c2%201.5%204%20.3%204-1.5a2%202%200%200%200-2-2%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h4":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2010v3a1%201%200%200%200%201%201h3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2010v8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h5":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2013v-3h4%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2017.7c.4.2.8.3%201.3.3%201.5%200%202.7-1.1%202.7-2.5S19.8%2013%2018.3%2013H17%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h6":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Ccircle%20cx%3D%2219%22%20cy%3D%2216%22%20r%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2010c-2%202-3%203.5-3%206%22%20%2F%3E%20%3C%2Fsvg%3E","hax:file-pdf":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2013H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2017H8%22%20%2F%3E%20%3C%2Fsvg%3E","hax:add-child-page":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11.35%2022H6a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.706.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v5.35%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2019h6%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2016v6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:site-settings":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9.671%204.136a2.34%202.34%200%200%201%204.659%200%202.34%202.34%200%200%200%203.319%201.915%202.34%202.34%200%200%201%202.33%204.033%202.34%202.34%200%200%200%200%203.831%202.34%202.34%200%200%201-2.33%204.033%202.34%202.34%200%200%200-3.319%201.915%202.34%202.34%200%200%201-4.659%200%202.34%202.34%200%200%200-3.32-1.915%202.34%202.34%200%200%201-2.33-4.033%202.34%202.34%200%200%200%200-3.831A2.34%202.34%200%200%201%206.35%206.051a2.34%202.34%200%200%200%203.319-1.915%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","hax:multimedia":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m12.296%203.464%203.02%203.956%22%20%2F%3E%20%3Cpath%20d%3D%22M20.2%206%203%2011l-.9-2.4c-.3-1.1.3-2.2%201.3-2.5l13.5-4c1.1-.3%202.2.3%202.5%201.3z%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2011h18v8a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2z%22%20%2F%3E%20%3Cpath%20d%3D%22m6.18%205.276%203.1%203.899%22%20%2F%3E%20%3C%2Fsvg%3E","hax:module":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11%2021.73a2%202%200%200%200%202%200l7-4A2%202%200%200%200%2021%2016V8a2%202%200%200%200-1-1.73l-7-4a2%202%200%200%200-2%200l-7%204A2%202%200%200%200%203%208v8a2%202%200%200%200%201%201.73z%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2022V12%22%20%2F%3E%20%3Cpolyline%20points%3D%223.29%207%2012%2012%2020.71%207%22%20%2F%3E%20%3Cpath%20d%3D%22m7.5%204.27%209%205.15%22%20%2F%3E%20%3C%2Fsvg%3E","hax:menu-open":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M9%203v18%22%20%2F%3E%20%3Cpath%20d%3D%22m14%209%203%203-3%203%22%20%2F%3E%20%3C%2Fsvg%3E","hax:lesson":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%205v16%22%20%2F%3E%20%3Cpath%20d%3D%22M20.001%2019A2%202%200%200022%2017V5a2%202%200%2000-1.999-2L16%203.002A5%205%200%200012%205a5%205%200%2000-4-2H4a2%202%200%2000-2%202v12a2%202%200%20001.999%202H8a5%205%200%20014%202%205%205%200%20014-2z%22%20%2F%3E%20%3C%2Fsvg%3E","hax:keyboard-arrow-up":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18%2015-6-6-6%206%22%20%2F%3E%20%3C%2Fsvg%3E","hax:keyboard-arrow-down":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m6%209%206%206%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:file-docx":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2018h2%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2012v6%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2013v-.5a.5.5%200%200%201%20.5-.5h5a.5.5%200%200%201%20.5.5v.5%22%20%2F%3E%20%3C%2Fsvg%3E","hax:embed":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18%2016%204-4-4-4%22%20%2F%3E%20%3Cpath%20d%3D%22m6%208-4%204%204%204%22%20%2F%3E%20%3Cpath%20d%3D%22m14.5%204-5%2016%22%20%2F%3E%20%3C%2Fsvg%3E","hax:duplicate":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2214%22%20height%3D%2214%22%20x%3D%228%22%20y%3D%228%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2016c-1.1%200-2-.9-2-2V4c0-1.1.9-2%202-2h10c1.1%200%202%20.9%202%202%22%20%2F%3E%20%3C%2Fsvg%3E","hax:abbr":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%227%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209v6%22%20%2F%3E%20%3Ccircle%20cx%3D%2217%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3Cpath%20d%3D%22M14%207v8%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2017v1c0%20.5-.5%201-1%201H3c-.5%200-1-.5-1-1v-1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:wand":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%204V2%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2016v-2%22%20%2F%3E%20%3Cpath%20d%3D%22M8%209h2%22%20%2F%3E%20%3Cpath%20d%3D%22M20%209h2%22%20%2F%3E%20%3Cpath%20d%3D%22M17.8%2011.8%2019%2013%22%20%2F%3E%20%3Cpath%20d%3D%22M15%209h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M17.8%206.2%2019%205%22%20%2F%3E%20%3Cpath%20d%3D%22m3%2021%209-9%22%20%2F%3E%20%3Cpath%20d%3D%22M12.2%206.2%2011%205%22%20%2F%3E%20%3C%2Fsvg%3E","hax:video":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2013%205.223%203.482a.5.5%200%200%200%20.777-.416V7.87a.5.5%200%200%200-.752-.432L16%2010.5%22%20%2F%3E%20%3Crect%20x%3D%222%22%20y%3D%226%22%20width%3D%2214%22%20height%3D%2212%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","hax:unit":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%206%204%2014%22%20%2F%3E%20%3Cpath%20d%3D%22M12%206v14%22%20%2F%3E%20%3Cpath%20d%3D%22M8%208v12%22%20%2F%3E%20%3Cpath%20d%3D%22M4%204v16%22%20%2F%3E%20%3C%2Fsvg%3E","hax:ticket":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2%209a3%203%200%200%201%200%206v2a2%202%200%200%200%202%202h16a2%202%200%200%200%202-2v-2a3%203%200%200%201%200-6V7a2%202%200%200%200-2-2H4a2%202%200%200%200-2%202Z%22%20%2F%3E%20%3Cpath%20d%3D%22M13%205v2%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2017v2%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2011v2%22%20%2F%3E%20%3C%2Fsvg%3E","hax:task":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22m16%209-5.5%205.5L8%2012%22%20%2F%3E%20%3C%2Fsvg%3E","hax:table-column-remove":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%227%22%20height%3D%2213%22%20x%3D%223%22%20y%3D%228%22%20rx%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22m15%202-3%203-3-3%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%2213%22%20x%3D%2214%22%20y%3D%228%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:table-column-plus-after":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%227%22%20height%3D%2213%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22m9%2022%203-3%203%203%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%2213%22%20x%3D%2214%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:skull":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m12.5%2017-.5-1-.5%201h1z%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2022a1%201%200%200%200%201-1v-1a2%202%200%200%200%201.56-3.25%208%208%200%201%200-11.12%200A2%202%200%200%200%208%2020v1a1%201%200%200%200%201%201z%22%20%2F%3E%20%3Ccircle%20cx%3D%2215%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:shovel":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21.56%204.56a1.5%201.5%200%200%201%200%202.122l-.47.47a3%203%200%200%201-4.212-.03%203%203%200%200%201%200-4.243l.44-.44a1.5%201.5%200%200%201%202.121%200z%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2022a1%201%200%200%201-1-1v-3.586a1%201%200%200%201%20.293-.707l3.355-3.355a1.205%201.205%200%200%201%201.704%200l3.296%203.296a1.205%201.205%200%200%201%200%201.704l-3.355%203.355a1%201%200%200%201-.707.293z%22%20%2F%3E%20%3Cpath%20d%3D%22m9%2015%207.879-7.878%22%20%2F%3E%20%3C%2Fsvg%3E","hax:select-element":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12.034%2012.681a.498.498%200%200%201%20.647-.647l9%203.5a.5.5%200%200%201-.033.943l-3.444%201.068a1%201%200%200%200-.66.66l-1.067%203.443a.5.5%200%200%201-.943.033z%22%20%2F%3E%20%3Cpath%20d%3D%22M5%203a2%202%200%200%200-2%202%22%20%2F%3E%20%3Cpath%20d%3D%22M19%203a2%202%200%200%201%202%202%22%20%2F%3E%20%3Cpath%20d%3D%22M5%2021a2%202%200%200%201-2-2%22%20%2F%3E%20%3Cpath%20d%3D%22M9%203h1%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2021h2%22%20%2F%3E%20%3Cpath%20d%3D%22M14%203h1%22%20%2F%3E%20%3Cpath%20d%3D%22M3%209v1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%209v2%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2014v1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:qr-code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%225%22%20height%3D%225%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%225%22%20height%3D%225%22%20x%3D%2216%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%225%22%20height%3D%225%22%20x%3D%223%22%20y%3D%2216%22%20rx%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2016h-3a2%202%200%200%200-2%202v3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2021v.01%22%20%2F%3E%20%3Cpath%20d%3D%22M12%207v3a2%202%200%200%201-2%202H7%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2012h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M12%203h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2016v.01%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2012h1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012v.01%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2021v-1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:outline-designer-outdent":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m7%208-4%204%204%204%22%20%2F%3E%20%3C%2Fsvg%3E","hax:outline-designer-indent":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m3%208%204%204-4%204%22%20%2F%3E%20%3C%2Fsvg%3E","hax:newspaper":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2018h-5%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2014h-8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2022h16a2%202%200%200%200%202-2V4a2%202%200%200%200-2-2H8a2%202%200%200%200-2%202v16a2%202%200%200%201-4%200v-9a2%202%200%200%201%202-2h2%22%20%2F%3E%20%3Crect%20width%3D%228%22%20height%3D%224%22%20x%3D%2210%22%20y%3D%226%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:iframe":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20x%3D%222%22%20y%3D%224%22%20width%3D%2220%22%20height%3D%2216%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M10%204v4%22%20%2F%3E%20%3Cpath%20d%3D%22M2%208h20%22%20%2F%3E%20%3Cpath%20d%3D%22M6%204v4%22%20%2F%3E%20%3C%2Fsvg%3E","hax:hr":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3C%2Fsvg%3E","hax:file-link-outline":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2011V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.706.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202H6a2%202%200%200%201-2-2v-3a2%202%200%200%201%202-2h7%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22m10%2018%203-3-3-3%22%20%2F%3E%20%3C%2Fsvg%3E","hax:figure":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%229%22%20r%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22m21%2015-3.086-3.086a2%202%200%200%200-2.828%200L6%2021%22%20%2F%3E%20%3C%2Fsvg%3E","hax:email":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m22%207-8.991%205.727a2%202%200%200%201-2.009%200L2%207%22%20%2F%3E%20%3Crect%20x%3D%222%22%20y%3D%224%22%20width%3D%2220%22%20height%3D%2216%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","hax:discord":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2.992%2016.342a2%202%200%200%201%20.094%201.167l-1.065%203.29a1%201%200%200%200%201.236%201.168l3.413-.998a2%202%200%200%201%201.099.092%2010%2010%200%201%200-4.777-4.719%22%20%2F%3E%20%3C%2Fsvg%3E","hax:console-line":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m7%2011%202-2-2-2%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2013h4%22%20%2F%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","hax:code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2018%206-6-6-6%22%20%2F%3E%20%3Cpath%20d%3D%22m8%206-6%206%206%206%22%20%2F%3E%20%3C%2Fsvg%3E","hax:bulletin-board":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%228%22%20height%3D%224%22%20x%3D%228%22%20y%3D%222%22%20rx%3D%221%22%20ry%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M16%204h2a2%202%200%200%201%202%202v14a2%202%200%200%201-2%202H6a2%202%200%200%201-2-2V6a2%202%200%200%201%202-2h2%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2011h4%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2016h4%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2011h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2016h.01%22%20%2F%3E%20%3C%2Fsvg%3E","hax:arrow-expand-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%205v14%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H7%22%20%2F%3E%20%3Cpath%20d%3D%22m15%2018%206-6-6-6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:arrow-all":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%202v20%22%20%2F%3E%20%3Cpath%20d%3D%22m15%2019-3%203-3-3%22%20%2F%3E%20%3Cpath%20d%3D%22m19%209%203%203-3%203%22%20%2F%3E%20%3Cpath%20d%3D%22M2%2012h20%22%20%2F%3E%20%3Cpath%20d%3D%22m5%209-3%203%203%203%22%20%2F%3E%20%3Cpath%20d%3D%22m9%205%203-3%203%203%22%20%2F%3E%20%3C%2Fsvg%3E","hax:add":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3Cpath%20d%3D%22M12%205v14%22%20%2F%3E%20%3C%2Fsvg%3E","icons:print":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2018H4a2%202%200%200%201-2-2v-5a2%202%200%200%201%202-2h16a2%202%200%200%201%202%202v5a2%202%200%200%201-2%202h-2%22%20%2F%3E%20%3Cpath%20d%3D%22M6%209V3a1%201%200%200%201%201-1h10a1%201%200%200%201%201%201v6%22%20%2F%3E%20%3Crect%20x%3D%226%22%20y%3D%2214%22%20width%3D%2212%22%20height%3D%228%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","icons:code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2018%206-6-6-6%22%20%2F%3E%20%3Cpath%20d%3D%22m8%206-6%206%206%206%22%20%2F%3E%20%3C%2Fsvg%3E","icons:check":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M20%206%209%2017l-5-5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:warning":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m21.73%2018-8-14a2%202%200%200%200-3.48%200l-8%2014A2%202%200%200%200%204%2021h16a2%202%200%200%200%201.73-3%22%20%2F%3E%20%3Cpath%20d%3D%22M12%209v4%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2017h.01%22%20%2F%3E%20%3C%2Fsvg%3E","icons:select-all":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%203a2%202%200%200%200-2%202%22%20%2F%3E%20%3Cpath%20d%3D%22M19%203a2%202%200%200%201%202%202%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019a2%202%200%200%201-2%202%22%20%2F%3E%20%3Cpath%20d%3D%22M5%2021a2%202%200%200%201-2-2%22%20%2F%3E%20%3Cpath%20d%3D%22M9%203h1%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2021h1%22%20%2F%3E%20%3Cpath%20d%3D%22M14%203h1%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2021h1%22%20%2F%3E%20%3Cpath%20d%3D%22M3%209v1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%209v1%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2014v1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2014v1%22%20%2F%3E%20%3C%2Fsvg%3E","icons:search":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m21%2021-4.34-4.34%22%20%2F%3E%20%3Ccircle%20cx%3D%2211%22%20cy%3D%2211%22%20r%3D%228%22%20%2F%3E%20%3C%2Fsvg%3E","icons:file-download":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2015V3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2015v4a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2v-4%22%20%2F%3E%20%3Cpath%20d%3D%22m7%2010%205%205%205-5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:history":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%2012a9%209%200%201%200%209-9%209.75%209.75%200%200%200-6.74%202.74L3%208%22%20%2F%3E%20%3Cpath%20d%3D%22M3%203v5h5%22%20%2F%3E%20%3Cpath%20d%3D%22M12%207v5l4%202%22%20%2F%3E%20%3C%2Fsvg%3E","icons:visibility":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2.062%2012.348a1%201%200%200%201%200-.696%2010.75%2010.75%200%200%201%2019.876%200%201%201%200%200%201%200%20.696%2010.75%2010.75%200%200%201-19.876%200%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","icons:visibility-off":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10.733%205.076a10.744%2010.744%200%200%201%2011.205%206.575%201%201%200%200%201%200%20.696%2010.747%2010.747%200%200%201-1.444%202.49%22%20%2F%3E%20%3Cpath%20d%3D%22M14.084%2014.158a3%203%200%200%201-4.242-4.242%22%20%2F%3E%20%3Cpath%20d%3D%22M17.479%2017.499a10.75%2010.75%200%200%201-15.417-5.151%201%201%200%200%201%200-.696%2010.75%2010.75%200%200%201%204.446-5.143%22%20%2F%3E%20%3Cpath%20d%3D%22m2%202%2020%2020%22%20%2F%3E%20%3C%2Fsvg%3E","icons:lock":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2211%22%20x%3D%223%22%20y%3D%2211%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2011V7a5%205%200%200%201%2010%200v4%22%20%2F%3E%20%3C%2Fsvg%3E","icons:lock-open":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2211%22%20x%3D%223%22%20y%3D%2211%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2011V7a5%205%200%200%201%209.9-1%22%20%2F%3E%20%3C%2Fsvg%3E","icons:folder":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M20%2020a2%202%200%200%200%202-2V8a2%202%200%200%200-2-2h-7.9a2%202%200%200%201-1.69-.9L9.6%203.9A2%202%200%200%200%207.93%203H4a2%202%200%200%200-2%202v13a2%202%200%200%200%202%202Z%22%20%2F%3E%20%3C%2Fsvg%3E","icons:error":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%228%22%20y2%3D%2212%22%20%2F%3E%20%3Cline%20x1%3D%2212%22%20x2%3D%2212.01%22%20y1%3D%2216%22%20y2%3D%2216%22%20%2F%3E%20%3C%2Fsvg%3E","icons:content-copy":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2214%22%20height%3D%2214%22%20x%3D%228%22%20y%3D%228%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2016c-1.1%200-2-.9-2-2V4c0-1.1.9-2%202-2h10c1.1%200%202%20.9%202%202%22%20%2F%3E%20%3C%2Fsvg%3E","icons:link":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2013a5%205%200%200%200%207.54.54l3-3a5%205%200%200%200-7.07-7.07l-1.72%201.71%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2011a5%205%200%200%200-7.54-.54l-3%203a5%205%200%200%200%207.07%207.07l1.71-1.71%22%20%2F%3E%20%3C%2Fsvg%3E","icons:create":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21.174%206.812a1%201%200%200%200-3.986-3.987L3.842%2016.174a2%202%200%200%200-.5.83l-1.321%204.352a.5.5%200%200%200%20.623.622l4.353-1.32a2%202%200%200%200%20.83-.497z%22%20%2F%3E%20%3Cpath%20d%3D%22m15%205%204%204%22%20%2F%3E%20%3C%2Fsvg%3E","icons:undo":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9%2014%204%209l5-5%22%20%2F%3E%20%3Cpath%20d%3D%22M4%209h10.5a5.5%205.5%200%200%201%205.5%205.5a5.5%205.5%200%200%201-5.5%205.5H11%22%20%2F%3E%20%3C%2Fsvg%3E","icons:redo":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m15%2014%205-5-5-5%22%20%2F%3E%20%3Cpath%20d%3D%22M20%209H9.5A5.5%205.5%200%200%200%204%2014.5A5.5%205.5%200%200%200%209.5%2020H13%22%20%2F%3E%20%3C%2Fsvg%3E","icons:save":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15.2%203a2%202%200%200%201%201.4.6l3.8%203.8a2%202%200%200%201%20.6%201.4V19a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2V5a2%202%200%200%201%202-2z%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2021v-7a1%201%200%200%200-1-1H8a1%201%200%200%200-1%201v7%22%20%2F%3E%20%3Cpath%20d%3D%22M7%203v4a1%201%200%200%200%201%201h7%22%20%2F%3E%20%3C%2Fsvg%3E","icons:refresh":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%2012a9%209%200%200%201%209-9%209.75%209.75%200%200%201%206.74%202.74L21%208%22%20%2F%3E%20%3Cpath%20d%3D%22M21%203v5h-5%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012a9%209%200%200%201-9%209%209.75%209.75%200%200%201-6.74-2.74L3%2016%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2016H3v5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:open-with":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%202v20%22%20%2F%3E%20%3Cpath%20d%3D%22m15%2019-3%203-3-3%22%20%2F%3E%20%3Cpath%20d%3D%22m19%209%203%203-3%203%22%20%2F%3E%20%3Cpath%20d%3D%22M2%2012h20%22%20%2F%3E%20%3Cpath%20d%3D%22m5%209-3%203%203%203%22%20%2F%3E%20%3Cpath%20d%3D%22m9%205%203-3%203%203%22%20%2F%3E%20%3C%2Fsvg%3E","icons:info":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2016v-4%22%20%2F%3E%20%3Cpath%20d%3D%22M12%208h.01%22%20%2F%3E%20%3C%2Fsvg%3E","icons:description":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2013H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2017H8%22%20%2F%3E%20%3C%2Fsvg%3E","icons:delete":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2011v6%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2011v6%22%20%2F%3E%20%3Cpath%20d%3D%22M19%206v14a2%202%200%200%201-2%202H7a2%202%200%200%201-2-2V6%22%20%2F%3E%20%3Cpath%20d%3D%22M3%206h18%22%20%2F%3E%20%3Cpath%20d%3D%22M8%206V4a2%202%200%200%201%202-2h4a2%202%200%200%201%202%202v2%22%20%2F%3E%20%3C%2Fsvg%3E","icons:view-module":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%2214%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%2214%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%223%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","icons:toc":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M8%205h13%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2019h8%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2010a2%202%200%200%200%202%202h3%22%20%2F%3E%20%3Cpath%20d%3D%22M3%205v12a2%202%200%200%200%202%202h3%22%20%2F%3E%20%3C%2Fsvg%3E","icons:swap-vert":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m21%2016-4%204-4-4%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2020V4%22%20%2F%3E%20%3Cpath%20d%3D%22m3%208%204-4%204%204%22%20%2F%3E%20%3Cpath%20d%3D%22M7%204v16%22%20%2F%3E%20%3C%2Fsvg%3E","icons:swap-horiz":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M8%203%204%207l4%204%22%20%2F%3E%20%3Cpath%20d%3D%22M4%207h16%22%20%2F%3E%20%3Cpath%20d%3D%22m16%2021%204-4-4-4%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2017H4%22%20%2F%3E%20%3C%2Fsvg%3E","icons:style":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m14.622%2017.897-10.68-2.913%22%20%2F%3E%20%3Cpath%20d%3D%22M18.376%202.622a1%201%200%201%201%203.002%203.002L17.36%209.643a.5.5%200%200%200%200%20.707l.944.944a2.41%202.41%200%200%201%200%203.408l-.944.944a.5.5%200%200%201-.707%200L8.354%207.348a.5.5%200%200%201%200-.707l.944-.944a2.41%202.41%200%200%201%203.408%200l.944.944a.5.5%200%200%200%20.707%200z%22%20%2F%3E%20%3Cpath%20d%3D%22M9%208c-1.804%202.71-3.97%203.46-6.583%203.948a.507.507%200%200%200-.302.819l7.32%208.883a1%201%200%200%200%201.185.204C12.735%2020.405%2016%2016.792%2016%2015%22%20%2F%3E%20%3C%2Fsvg%3E","icons:restore":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%2012a9%209%200%201%200%209-9%209.75%209.75%200%200%200-6.74%202.74L3%208%22%20%2F%3E%20%3Cpath%20d%3D%22M3%203v5h5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:record-voice-over":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2019v3%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2010v2a7%207%200%200%201-14%200v-2%22%20%2F%3E%20%3Crect%20x%3D%229%22%20y%3D%222%22%20width%3D%226%22%20height%3D%2213%22%20rx%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","icons:perm-media":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m22%2011-1.296-1.296a2.4%202.4%200%200%200-3.408%200L11%2016%22%20%2F%3E%20%3Cpath%20d%3D%22M4%208a2%202%200%200%200-2%202v10a2%202%200%200%200%202%202h10a2%202%200%200%200%202-2%22%20%2F%3E%20%3Ccircle%20cx%3D%2213%22%20cy%3D%227%22%20r%3D%221%22%20fill%3D%22currentColor%22%20%2F%3E%20%3Crect%20x%3D%228%22%20y%3D%222%22%20width%3D%2214%22%20height%3D%2214%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","icons:open-in-new":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%203h6v6%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2014%2021%203%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2013v6a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2V8a2%202%200%200%201%202-2h6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:move-to-inbox":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpolyline%20points%3D%2222%2012%2016%2012%2014%2015%2010%2015%208%2012%202%2012%22%20%2F%3E%20%3Cpath%20d%3D%22M5.45%205.11%202%2012v6a2%202%200%200%200%202%202h16a2%202%200%200%200%202-2v-6l-3.45-6.89A2%202%200%200%200%2016.76%204H7.24a2%202%200%200%200-1.79%201.11z%22%20%2F%3E%20%3C%2Fsvg%3E","icons:menu":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%205h16%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2012h16%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2019h16%22%20%2F%3E%20%3C%2Fsvg%3E","icons:launch":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%203h6v6%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2014%2021%203%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2013v6a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2V8a2%202%200%200%201%202-2h6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:label":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12.586%202.586A2%202%200%200%200%2011.172%202H4a2%202%200%200%200-2%202v7.172a2%202%200%200%200%20.586%201.414l8.704%208.704a2.426%202.426%200%200%200%203.42%200l6.58-6.58a2.426%202.426%200%200%200%200-3.42z%22%20%2F%3E%20%3Ccircle%20cx%3D%227.5%22%20cy%3D%227.5%22%20r%3D%22.5%22%20fill%3D%22currentColor%22%20%2F%3E%20%3C%2Fsvg%3E","icons:fullscreen":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M8%203H5a2%202%200%200%200-2%202v3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%208V5a2%202%200%200%200-2-2h-3%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2016v3a2%202%200%200%200%202%202h3%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2021h3a2%202%200%200%200%202-2v-3%22%20%2F%3E%20%3C%2Fsvg%3E","icons:file-upload":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%203v12%22%20%2F%3E%20%3Cpath%20d%3D%22m17%208-5-5-5%205%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2015v4a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2v-4%22%20%2F%3E%20%3C%2Fsvg%3E","icons:compress":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m14%2010%207-7%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2010h-6V4%22%20%2F%3E%20%3Cpath%20d%3D%22m3%2021%207-7%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2014h6v6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:clear":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%206%206%2018%22%20%2F%3E%20%3Cpath%20d%3D%22m6%206%2012%2012%22%20%2F%3E%20%3C%2Fsvg%3E","icons:close":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%206%206%2018%22%20%2F%3E%20%3Cpath%20d%3D%22m6%206%2012%2012%22%20%2F%3E%20%3C%2Fsvg%3E","icons:cancel":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%206%206%2018%22%20%2F%3E%20%3Cpath%20d%3D%22m6%206%2012%2012%22%20%2F%3E%20%3C%2Fsvg%3E","icons:arrow-upward":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m5%2012%207-7%207%207%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2019V5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:arrow-downward":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%205v14%22%20%2F%3E%20%3Cpath%20d%3D%22m19%2012-7%207-7-7%22%20%2F%3E%20%3C%2Fsvg%3E","icons:arrow-back":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m12%2019-7-7%207-7%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2012H5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:arrow-forward":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3Cpath%20d%3D%22m12%205%207%207-7%207%22%20%2F%3E%20%3C%2Fsvg%3E","icons:chevron-left":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m15%2018-6-6%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:chevron-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:expand-more":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m6%209%206%206%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:expand-less":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18%2015-6-6-6%206%22%20%2F%3E%20%3C%2Fsvg%3E","icons:arrow-drop-down":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m6%209%206%206%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:more-vert":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%225%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2219%22%20r%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","icons:more-horiz":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2219%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%225%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","icons:settings":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9.671%204.136a2.34%202.34%200%200%201%204.659%200%202.34%202.34%200%200%200%203.319%201.915%202.34%202.34%200%200%201%202.33%204.033%202.34%202.34%200%200%200%200%203.831%202.34%202.34%200%200%201-2.33%204.033%202.34%202.34%200%200%200-3.319%201.915%202.34%202.34%200%200%201-4.659%200%202.34%202.34%200%200%200-3.32-1.915%202.34%202.34%200%200%201-2.33-4.033%202.34%202.34%200%200%200%200-3.831A2.34%202.34%200%200%201%206.35%206.051a2.34%202.34%200%200%200%203.319-1.915%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","icons:home":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2021v-8a1%201%200%200%200-1-1h-4a1%201%200%200%200-1%201v8%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2010a2%202%200%200%201%20.709-1.528l7-6a2%202%200%200%201%202.582%200l7%206A2%202%200%200%201%2021%2010v9a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2z%22%20%2F%3E%20%3C%2Fsvg%3E","icons:help":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cpath%20d%3D%22M9.09%209a3%203%200%200%201%205.83%201c0%202-3%203-3%203%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2017h.01%22%20%2F%3E%20%3C%2Fsvg%3E","icons:add":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3Cpath%20d%3D%22M12%205v14%22%20%2F%3E%20%3C%2Fsvg%3E","icons:add-box":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M12%208v8%22%20%2F%3E%20%3C%2Fsvg%3E","icons:remove":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3C%2Fsvg%3E","icons:find-replace":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M14%204a1%201%200%200%201%201-1%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2010a1%201%200%200%201-1-1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%204a1%201%200%200%200-1-1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%209a1%201%200%200%201-1%201%22%20%2F%3E%20%3Cpath%20d%3D%22m3%207%203%203%203-3%22%20%2F%3E%20%3Cpath%20d%3D%22M6%2010V5a2%202%200%200%201%202-2h2%22%20%2F%3E%20%3Crect%20x%3D%223%22%20y%3D%2214%22%20width%3D%227%22%20height%3D%227%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","icons:archive":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2220%22%20height%3D%225%22%20x%3D%222%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M4%208v11a2%202%200%200%200%202%202h12a2%202%200%200%200%202-2V8%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2012h4%22%20%2F%3E%20%3C%2Fsvg%3E","icons:exit-to-app":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2017%205-5-5-5%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H9%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2021H5a2%202%200%200%201-2-2V5a2%202%200%200%201%202-2h4%22%20%2F%3E%20%3C%2Fsvg%3E","icons:account-circle":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2210%22%20r%3D%223%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2020.662V19a2%202%200%200%201%202-2h6a2%202%200%200%201%202%202v1.662%22%20%2F%3E%20%3C%2Fsvg%3E","icons:star":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11.525%202.295a.53.53%200%200%201%20.95%200l2.31%204.679a2.123%202.123%200%200%200%201.595%201.16l5.166.756a.53.53%200%200%201%20.294.904l-3.736%203.638a2.123%202.123%200%200%200-.611%201.878l.882%205.14a.53.53%200%200%201-.771.56l-4.618-2.428a2.122%202.122%200%200%200-1.973%200L6.396%2021.01a.53.53%200%200%201-.77-.56l.881-5.139a2.122%202.122%200%200%200-.611-1.879L2.16%209.795a.53.53%200%200%201%20.294-.906l5.165-.755a2.122%202.122%200%200%200%201.597-1.16z%22%20%2F%3E%20%3C%2Fsvg%3E","icons:bookmark":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M17%203a2%202%200%200%201%202%202v15a1%201%200%200%201-1.496.868l-4.512-2.578a2%202%200%200%200-1.984%200l-4.512%202.578A1%201%200%200%201%205%2020V5a2%202%200%200%201%202-2z%22%20%2F%3E%20%3C%2Fsvg%3E","icons:assignment-turned-in":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%228%22%20height%3D%224%22%20x%3D%228%22%20y%3D%222%22%20rx%3D%221%22%20ry%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M16%204h2a2%202%200%200%201%202%202v14a2%202%200%200%201-2%202H6a2%202%200%200%201-2-2V6a2%202%200%200%201%202-2h2%22%20%2F%3E%20%3Cpath%20d%3D%22m9%2014%202%202%204-4%22%20%2F%3E%20%3C%2Fsvg%3E","editor:insert-link":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2013a5%205%200%200%200%207.54.54l3-3a5%205%200%200%200-7.07-7.07l-1.72%201.71%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2011a5%205%200%200%200-7.54-.54l-3%203a5%205%200%200%200%207.07%207.07l1.71-1.71%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-align-left":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2012H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2019H3%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-align-center":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2012H7%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2019H5%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-align-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H9%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H7%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-align-justify":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%205h18%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2012h18%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2019h18%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-list-bulleted":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%205h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2012h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2019h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M8%205h13%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h13%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2019h13%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-list-numbered":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11%205h10%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2012h10%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2019h10%22%20%2F%3E%20%3Cpath%20d%3D%22M4%204h1v5%22%20%2F%3E%20%3Cpath%20d%3D%22M4%209h2%22%20%2F%3E%20%3Cpath%20d%3D%22M6.5%2020H3.4c0-1%202.6-1.925%202.6-3.5a1.5%201.5%200%200%200-2.6-1.02%22%20%2F%3E%20%3C%2Fsvg%3E","editor:insert-drive-file":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3C%2Fsvg%3E","editor:insert-photo":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%229%22%20r%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22m21%2015-3.086-3.086a2%202%200%200%200-2.828%200L6%2021%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-quote":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%203a2%202%200%200%200-2%202v6a2%202%200%200%200%202%202%201%201%200%200%201%201%201v1a2%202%200%200%201-2%202%201%201%200%200%200-1%201v2a1%201%200%200%200%201%201%206%206%200%200%200%206-6V5a2%202%200%200%200-2-2z%22%20%2F%3E%20%3Cpath%20d%3D%22M5%203a2%202%200%200%200-2%202v6a2%202%200%200%200%202%202%201%201%200%200%201%201%201v1a2%202%200%200%201-2%202%201%201%200%200%200-1%201v2a1%201%200%200%200%201%201%206%206%200%200%200%206-6V5a2%202%200%200%200-2-2z%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-italic":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cline%20x1%3D%2219%22%20x2%3D%2210%22%20y1%3D%224%22%20y2%3D%224%22%20%2F%3E%20%3Cline%20x1%3D%2214%22%20x2%3D%225%22%20y1%3D%2220%22%20y2%3D%2220%22%20%2F%3E%20%3Cline%20x1%3D%2215%22%20x2%3D%229%22%20y1%3D%224%22%20y2%3D%2220%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-bold":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2012h9a4%204%200%200%201%200%208H7a1%201%200%200%201-1-1V5a1%201%200%200%201%201-1h7a4%204%200%200%201%200%208%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-underlined":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%204v6a6%206%200%200%200%2012%200V4%22%20%2F%3E%20%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2220%22%20y2%3D%2220%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-strikethrough":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%204H9a3%203%200%200%200-2.83%204%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2012a4%204%200%200%201%200%208H6%22%20%2F%3E%20%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2212%22%20y2%3D%2212%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-clear":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%207V4h16v3%22%20%2F%3E%20%3Cpath%20d%3D%22M5%2020h6%22%20%2F%3E%20%3Cpath%20d%3D%22M13%204%208%2020%22%20%2F%3E%20%3Cpath%20d%3D%22m15%2015%205%205%22%20%2F%3E%20%3Cpath%20d%3D%22m20%2015-5%205%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-line-spacing":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%205h11%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2012h11%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2019h11%22%20%2F%3E%20%3Cpath%20d%3D%22m3%2010%203-3-3-3%22%20%2F%3E%20%3Cpath%20d%3D%22m3%2020%203-3-3-3%22%20%2F%3E%20%3C%2Fsvg%3E","editor:insert-emoticon":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2010V9%22%20%2F%3E%20%3Cpath%20d%3D%22M16.472%2015a6%206%200%2001-8.943%200%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2010V9%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3C%2Fsvg%3E","editor:highlight":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m9%2011-6%206v3h9l3-3%22%20%2F%3E%20%3Cpath%20d%3D%22m22%2012-4.6%204.6a2%202%200%200%201-2.8%200l-5.2-5.2a2%202%200%200%201%200-2.8L14%204%22%20%2F%3E%20%3C%2Fsvg%3E","editor:functions":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%207V5a1%201%200%200%200-1-1H6.5a.5.5%200%200%200-.4.8l4.5%206a2%202%200%200%201%200%202.4l-4.5%206a.5.5%200%200%200%20.4.8H17a1%201%200%200%200%201-1v-2%22%20%2F%3E%20%3C%2Fsvg%3E","editor:title":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2012h12%22%20%2F%3E%20%3Cpath%20d%3D%22M6%2020V4%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2020V4%22%20%2F%3E%20%3C%2Fsvg%3E","editor:short-text":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2012H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2019H3%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-textdirection-r-to-l":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%203v11%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209H7a1%201%200%200%201%200-6h8%22%20%2F%3E%20%3Cpath%20d%3D%22M14%203v11%22%20%2F%3E%20%3Cpath%20d%3D%22m18%2014%204%204H2%22%20%2F%3E%20%3Cpath%20d%3D%22m22%2018-4%204%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-size":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m15%2016%202.536-7.328a1.02%201.02%201%200%201%201.928%200L22%2016%22%20%2F%3E%20%3Cpath%20d%3D%22M15.697%2014h5.606%22%20%2F%3E%20%3Cpath%20d%3D%22m2%2016%204.039-9.69a.5.5%200%200%201%20.923%200L11%2016%22%20%2F%3E%20%3Cpath%20d%3D%22M3.304%2013h6.392%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-indent-increase":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m3%208%204%204-4%204%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-indent-decrease":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m7%208-4%204%204%204%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-color-text":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2020h16%22%20%2F%3E%20%3Cpath%20d%3D%22m6%2016%206-12%206%2012%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h8%22%20%2F%3E%20%3C%2Fsvg%3E","editor:border-all":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%203v18%22%20%2F%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M3%209h18%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2015h18%22%20%2F%3E%20%3C%2Fsvg%3E","editor:attach-file":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%206-8.414%208.586a2%202%200%200%200%202.829%202.829l8.414-8.586a4%204%200%201%200-5.657-5.657l-8.379%208.551a6%206%200%201%200%208.485%208.485l8.379-8.551%22%20%2F%3E%20%3C%2Fsvg%3E","editor:mode-edit":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21.174%206.812a1%201%200%200%200-3.986-3.987L3.842%2016.174a2%202%200%200%200-.5.83l-1.321%204.352a.5.5%200%200%200%20.623.622l4.353-1.32a2%202%200%200%200%20.83-.497z%22%20%2F%3E%20%3Cpath%20d%3D%22m15%205%204%204%22%20%2F%3E%20%3C%2Fsvg%3E","mdextra:unlink":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18.84%2012.25%201.72-1.71h-.02a5.004%205.004%200%200%200-.12-7.07%205.006%205.006%200%200%200-6.95%200l-1.72%201.71%22%20%2F%3E%20%3Cpath%20d%3D%22m5.17%2011.75-1.71%201.71a5.004%205.004%200%200%200%20.12%207.07%205.006%205.006%200%200%200%206.95%200l1.71-1.71%22%20%2F%3E%20%3Cline%20x1%3D%228%22%20x2%3D%228%22%20y1%3D%222%22%20y2%3D%225%22%20%2F%3E%20%3Cline%20x1%3D%222%22%20x2%3D%225%22%20y1%3D%228%22%20y2%3D%228%22%20%2F%3E%20%3Cline%20x1%3D%2216%22%20x2%3D%2216%22%20y1%3D%2219%22%20y2%3D%2222%22%20%2F%3E%20%3Cline%20x1%3D%2219%22%20x2%3D%2222%22%20y1%3D%2216%22%20y2%3D%2216%22%20%2F%3E%20%3C%2Fsvg%3E","mdextra:superscript":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m4%2019%208-8%22%20%2F%3E%20%3Cpath%20d%3D%22m12%2019-8-8%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2012h-4c0-1.5.442-2%201.5-2.5S20%208.334%2020%207.002c0-.472-.17-.93-.484-1.29a2.105%202.105%200%200%200-2.617-.436c-.42.239-.738.614-.899%201.06%22%20%2F%3E%20%3C%2Fsvg%3E","mdextra:subscript":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m4%205%208%208%22%20%2F%3E%20%3Cpath%20d%3D%22m12%205-8%208%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2019h-4c0-1.5.44-2%201.5-2.5S20%2015.33%2020%2014c0-.47-.17-.93-.48-1.29a2.11%202.11%200%200%200-2.62-.44c-.42.24-.74.62-.9%201.07%22%20%2F%3E%20%3C%2Fsvg%3E","image:tune":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2019H3%22%20%2F%3E%20%3Cpath%20d%3D%22M14%203v4%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2017v4%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012h-9%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019h-5%22%20%2F%3E%20%3Cpath%20d%3D%22M21%205h-7%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2010v4%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012H3%22%20%2F%3E%20%3C%2Fsvg%3E","image:image":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%229%22%20r%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22m21%2015-3.086-3.086a2%202%200%200%200-2.828%200L6%2021%22%20%2F%3E%20%3C%2Fsvg%3E","image:style":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m14.622%2017.897-10.68-2.913%22%20%2F%3E%20%3Cpath%20d%3D%22M18.376%202.622a1%201%200%201%201%203.002%203.002L17.36%209.643a.5.5%200%200%200%200%20.707l.944.944a2.41%202.41%200%200%201%200%203.408l-.944.944a.5.5%200%200%201-.707%200L8.354%207.348a.5.5%200%200%201%200-.707l.944-.944a2.41%202.41%200%200%201%203.408%200l.944.944a.5.5%200%200%200%20.707%200z%22%20%2F%3E%20%3Cpath%20d%3D%22M9%208c-1.804%202.71-3.97%203.46-6.583%203.948a.507.507%200%200%200-.302.819l7.32%208.883a1%201%200%200%200%201.185.204C12.735%2020.405%2016%2016.792%2016%2015%22%20%2F%3E%20%3C%2Fsvg%3E","image:crop-landscape":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2220%22%20height%3D%2212%22%20x%3D%222%22%20y%3D%226%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","image:transform":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%202v14a2%202%200%200%200%202%202h14%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2022V8a2%202%200%200%200-2-2H2%22%20%2F%3E%20%3C%2Fsvg%3E","image:slideshow":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2%203h20%22%20%2F%3E%20%3Cpath%20d%3D%22M21%203v11a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2V3%22%20%2F%3E%20%3Cpath%20d%3D%22m7%2021%205-5%205%205%22%20%2F%3E%20%3C%2Fsvg%3E","image:rotate-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%2012a9%209%200%201%201-9-9c2.52%200%204.93%201%206.74%202.74L21%208%22%20%2F%3E%20%3Cpath%20d%3D%22M21%203v5h-5%22%20%2F%3E%20%3C%2Fsvg%3E","image:photo-library":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m22%2011-1.296-1.296a2.4%202.4%200%200%200-3.408%200L11%2016%22%20%2F%3E%20%3Cpath%20d%3D%22M4%208a2%202%200%200%200-2%202v10a2%202%200%200%200%202%202h10a2%202%200%200%200%202-2%22%20%2F%3E%20%3Ccircle%20cx%3D%2213%22%20cy%3D%227%22%20r%3D%221%22%20fill%3D%22currentColor%22%20%2F%3E%20%3Crect%20x%3D%228%22%20y%3D%222%22%20width%3D%2214%22%20height%3D%2214%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","image:music-note":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9%2018V5l12-2v13%22%20%2F%3E%20%3Ccircle%20cx%3D%226%22%20cy%3D%2218%22%20r%3D%223%22%20%2F%3E%20%3Ccircle%20cx%3D%2218%22%20cy%3D%2216%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","image:grid-on":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M3%209h18%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2015h18%22%20%2F%3E%20%3Cpath%20d%3D%22M9%203v18%22%20%2F%3E%20%3Cpath%20d%3D%22M15%203v18%22%20%2F%3E%20%3C%2Fsvg%3E","image:collections":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2%207v10%22%20%2F%3E%20%3Cpath%20d%3D%22M6%205v14%22%20%2F%3E%20%3Crect%20width%3D%2212%22%20height%3D%2218%22%20x%3D%2210%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","image:blur-on":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11.017%202.814a1%201%200%200%201%201.966%200l1.051%205.558a2%202%200%200%200%201.594%201.594l5.558%201.051a1%201%200%200%201%200%201.966l-5.558%201.051a2%202%200%200%200-1.594%201.594l-1.051%205.558a1%201%200%200%201-1.966%200l-1.051-5.558a2%202%200%200%200-1.594-1.594l-5.558-1.051a1%201%200%200%201%200-1.966l5.558-1.051a2%202%200%200%200%201.594-1.594z%22%20%2F%3E%20%3Cpath%20d%3D%22M20%202v4%22%20%2F%3E%20%3Cpath%20d%3D%22M22%204h-4%22%20%2F%3E%20%3Ccircle%20cx%3D%224%22%20cy%3D%2220%22%20r%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","av:play-circle-filled":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9%209.003a1%201%200%200%201%201.517-.859l4.997%202.997a1%201%200%200%201%200%201.718l-4.997%202.997A1%201%200%200%201%209%2014.996z%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3C%2Fsvg%3E","av:volume-up":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11%204.702a.705.705%200%200%200-1.203-.498L6.413%207.587A1.4%201.4%200%200%201%205.416%208H3a1%201%200%200%200-1%201v6a1%201%200%200%200%201%201h2.416a1.4%201.4%200%200%201%20.997.413l3.383%203.384A.705.705%200%200%200%2011%2019.298z%22%20%2F%3E%20%3Cpath%20d%3D%22M16%209a5%205%200%200%201%200%206%22%20%2F%3E%20%3Cpath%20d%3D%22M19.364%2018.364a9%209%200%200%200%200-12.728%22%20%2F%3E%20%3C%2Fsvg%3E","av:volume-off":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11%204.702a.7.7%200%200%200-1.203-.498L6.413%207.587A1.4%201.4%200%200%201%205.416%208H3a1%201%200%200%200-1%201v6a1%201%200%200%200%201%201h2.416a1.4%201.4%200%200%201%20.997.413l3.383%203.384A.7.7%200%200%200%2011%2019.298z%22%20%2F%3E%20%3Cpath%20d%3D%22m16.5%2014.5%205-5%22%20%2F%3E%20%3Cpath%20d%3D%22m16.5%209.5%205%205%22%20%2F%3E%20%3C%2Fsvg%3E","av:music-note":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9%2018V5l12-2v13%22%20%2F%3E%20%3Ccircle%20cx%3D%226%22%20cy%3D%2218%22%20r%3D%223%22%20%2F%3E%20%3Ccircle%20cx%3D%2218%22%20cy%3D%2216%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","av:videocam":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2013%205.223%203.482a.5.5%200%200%200%20.777-.416V7.87a.5.5%200%200%200-.752-.432L16%2010.5%22%20%2F%3E%20%3Crect%20x%3D%222%22%20y%3D%226%22%20width%3D%2214%22%20height%3D%2212%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","av:call-to-action":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2015h18%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:keyboard-return":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M20%204v7a4%204%200%200%201-4%204H4%22%20%2F%3E%20%3Cpath%20d%3D%22m9%2010-5%205%205%205%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:keyboard":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%208h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2012h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M14%208h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2012h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M18%208h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M6%208h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2016h10%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h.01%22%20%2F%3E%20%3Crect%20width%3D%2220%22%20height%3D%2216%22%20x%3D%222%22%20y%3D%224%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:keyboard-arrow-up":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18%2015-6-6-6%206%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:keyboard-arrow-down":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m6%209%206%206%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:security":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M20%2013c0%205-3.5%207.5-7.66%208.95a1%201%200%200%201-.67-.01C7.5%2020.5%204%2018%204%2013V6a1%201%200%200%201%201-1c2%200%204.5-1.2%206.24-2.72a1.17%201.17%200%200%201%201.52%200C14.51%203.81%2017%205%2019%205a1%201%200%200%201%201%201z%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:computer":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2220%22%20height%3D%2214%22%20x%3D%222%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cline%20x1%3D%228%22%20x2%3D%2216%22%20y1%3D%2221%22%20y2%3D%2221%22%20%2F%3E%20%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%2217%22%20y2%3D%2221%22%20%2F%3E%20%3C%2Fsvg%3E","device:brightness-medium":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%202v2%22%20%2F%3E%20%3Cpath%20d%3D%22M14.837%2016.385a6%206%200%201%201-7.223-7.222c.624-.147.97.66.715%201.248a4%204%200%200%200%205.26%205.259c.589-.255%201.396.09%201.248.715%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2012a4%204%200%200%200-4-4%22%20%2F%3E%20%3Cpath%20d%3D%22m19%205-1.256%201.256%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2012h2%22%20%2F%3E%20%3C%2Fsvg%3E","device:access-time":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cpath%20d%3D%22M12%206v6l4%202%22%20%2F%3E%20%3C%2Fsvg%3E","social:public":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cpath%20d%3D%22M12%202a14.5%2014.5%200%200%200%200%2020%2014.5%2014.5%200%200%200%200-20%22%20%2F%3E%20%3Cpath%20d%3D%22M2%2012h20%22%20%2F%3E%20%3C%2Fsvg%3E","social:person":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M19%2021v-2a4%204%200%200%200-4-4H9a4%204%200%200%200-4%204v2%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%227%22%20r%3D%224%22%20%2F%3E%20%3C%2Fsvg%3E","social:people":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%2021v-2a4%204%200%200%200-4-4H6a4%204%200%200%200-4%204v2%22%20%2F%3E%20%3Cpath%20d%3D%22M16%203.128a4%204%200%200%201%200%207.744%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2021v-2a4%204%200%200%200-3-3.87%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%227%22%20r%3D%224%22%20%2F%3E%20%3C%2Fsvg%3E","social:mood":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2010V9%22%20%2F%3E%20%3Cpath%20d%3D%22M16.472%2015a6%206%200%2001-8.943%200%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2010V9%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3C%2Fsvg%3E","places:all-inclusive":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2016c5%200%207-8%2012-8a4%204%200%200%201%200%208c-5%200-7-8-12-8a4%204%200%201%200%200%208%22%20%2F%3E%20%3C%2Fsvg%3E","maps:local-mall":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%2010a4%204%200%200%201-8%200%22%20%2F%3E%20%3Cpath%20d%3D%22M3.103%206.034h17.794%22%20%2F%3E%20%3Cpath%20d%3D%22M3.4%205.467a2%202%200%200%200-.4%201.2V20a2%202%200%200%200%202%202h14a2%202%200%200%200%202-2V6.667a2%202%200%200%200-.4-1.2l-2-2.667A2%202%200%200%200%2017%202H7a2%202%200%200%200-1.6.8z%22%20%2F%3E%20%3C%2Fsvg%3E","mdi-social:github-circle":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%206a9%209%200%200%200-9%209V3%22%20%2F%3E%20%3Ccircle%20cx%3D%2218%22%20cy%3D%226%22%20r%3D%223%22%20%2F%3E%20%3Ccircle%20cx%3D%226%22%20cy%3D%2218%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:palette":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2022a1%201%200%200%201%200-20%2010%209%200%200%201%2010%209%205%205%200%200%201-5%205h-2.25a1.75%201.75%200%200%200-1.4%202.8l.3.4a1.75%201.75%200%200%201-1.4%202.8z%22%20%2F%3E%20%3Ccircle%20cx%3D%2213.5%22%20cy%3D%226.5%22%20r%3D%22.5%22%20fill%3D%22currentColor%22%20%2F%3E%20%3Ccircle%20cx%3D%2217.5%22%20cy%3D%2210.5%22%20r%3D%22.5%22%20fill%3D%22currentColor%22%20%2F%3E%20%3Ccircle%20cx%3D%226.5%22%20cy%3D%2212.5%22%20r%3D%22.5%22%20fill%3D%22currentColor%22%20%2F%3E%20%3Ccircle%20cx%3D%228.5%22%20cy%3D%227.5%22%20r%3D%22.5%22%20fill%3D%22currentColor%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:pdf":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2013H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2017H8%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:write":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M13%2021h8%22%20%2F%3E%20%3Cpath%20d%3D%22M21.174%206.812a1%201%200%200%200-3.986-3.987L3.842%2016.174a2%202%200%200%200-.5.83l-1.321%204.352a.5.5%200%200%200%20.623.622l4.353-1.32a2%202%200%200%200%20.83-.497z%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:teacher":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21.42%2010.922a1%201%200%200%200-.019-1.838L12.83%205.18a2%202%200%200%200-1.66%200L2.6%209.08a1%201%200%200%200%200%201.832l8.57%203.908a2%202%200%200%200%201.66%200z%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2010v6%22%20%2F%3E%20%3Cpath%20d%3D%22M6%2012.5V16a6%203%200%200%200%2012%200v-3.5%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:quiz":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M13%205h8%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2019h8%22%20%2F%3E%20%3Cpath%20d%3D%22m3%2017%202%202%204-4%22%20%2F%3E%20%3Cpath%20d%3D%22m3%207%202%202%204-4%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:people":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%2021v-2a4%204%200%200%200-4-4H6a4%204%200%200%200-4%204v2%22%20%2F%3E%20%3Cpath%20d%3D%22M16%203.128a4%204%200%200%201%200%207.744%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2021v-2a4%204%200%200%200-3-3.87%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%227%22%20r%3D%224%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:page":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:book":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2019.5v-15A2.5%202.5%200%200%201%206.5%202H19a1%201%200%200%201%201%201v18a1%201%200%200%201-1%201H6.5a1%201%200%200%201%200-5H20%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:assessment":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%228%22%20height%3D%224%22%20x%3D%228%22%20y%3D%222%22%20rx%3D%221%22%20ry%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M16%204h2a2%202%200%200%201%202%202v14a2%202%200%200%201-2%202H6a2%202%200%200%201-2-2V6a2%202%200%200%201%202-2h2%22%20%2F%3E%20%3Cpath%20d%3D%22m9%2014%202%202%204-4%22%20%2F%3E%20%3C%2Fsvg%3E","courseicons:strategy":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2014c.2-1%20.7-1.7%201.5-2.5%201-.9%201.5-2.2%201.5-3.5A6%206%200%200%200%206%208c0%201%20.2%202.2%201.5%203.5.7.7%201.3%201.5%201.5%202.5%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2018h6%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2022h4%22%20%2F%3E%20%3C%2Fsvg%3E","courseicons:listen":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%2014h3a2%202%200%200%201%202%202v3a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2v-7a9%209%200%200%201%2018%200v7a2%202%200%200%201-2%202h-1a2%202%200%200%201-2-2v-3a2%202%200%200%201%202-2h3%22%20%2F%3E%20%3C%2Fsvg%3E","courseicons:learning-objectives":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%226%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","courseicons:knowledge":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2018V5%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2013a4.17%204.17%200%200%201-3-4%204.17%204.17%200%200%201-3%204%22%20%2F%3E%20%3Cpath%20d%3D%22M17.598%206.5A3%203%200%201%200%2012%205a3%203%200%201%200-5.598%201.5%22%20%2F%3E%20%3Cpath%20d%3D%22M17.997%205.125a4%204%200%200%201%202.526%205.77%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2018a4%204%200%200%200%202-7.464%22%20%2F%3E%20%3Cpath%20d%3D%22M19.967%2017.483A4%204%200%201%201%2012%2018a4%204%200%201%201-7.967-.517%22%20%2F%3E%20%3Cpath%20d%3D%22M6%2018a4%204%200%200%201-2-7.464%22%20%2F%3E%20%3Cpath%20d%3D%22M6.003%205.125a4%204%200%200%200-2.526%205.77%22%20%2F%3E%20%3C%2Fsvg%3E","courseicons:chem-connection":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M14%202v6a2%202%200%200%200%20.245.96l5.51%2010.08A2%202%200%200%201%2018%2022H6a2%202%200%200%201-1.755-2.96l5.51-10.08A2%202%200%200%200%2010%208V2%22%20%2F%3E%20%3Cpath%20d%3D%22M6.453%2015h11.094%22%20%2F%3E%20%3Cpath%20d%3D%22M8.5%202h7%22%20%2F%3E%20%3C%2Fsvg%3E","oer:box":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%208a2%202%200%200%200-1-1.73l-7-4a2%202%200%200%200-2%200l-7%204A2%202%200%200%200%203%208v8a2%202%200%200%200%201%201.73l7%204a2%202%200%200%200%202%200l7-4A2%202%200%200%200%2021%2016Z%22%20%2F%3E%20%3Cpath%20d%3D%22m3.3%207%208.7%205%208.7-5%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2022V12%22%20%2F%3E%20%3C%2Fsvg%3E","oer:pilcrow":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M13%204v16%22%20%2F%3E%20%3Cpath%20d%3D%22M17%204v16%22%20%2F%3E%20%3Cpath%20d%3D%22M19%204H9.5a4.5%204.5%200%200%200%200%209H13%22%20%2F%3E%20%3C%2Fsvg%3E","oer:type":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%204v16%22%20%2F%3E%20%3Cpath%20d%3D%22M4%207V5a1%201%200%200%201%201-1h14a1%201%200%200%201%201%201v2%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2020h6%22%20%2F%3E%20%3C%2Fsvg%3E","oer:plus":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3Cpath%20d%3D%22M12%205v14%22%20%2F%3E%20%3C%2Fsvg%3E","oer:arrow-up":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m5%2012%207-7%207%207%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2019V5%22%20%2F%3E%20%3C%2Fsvg%3E","oer:arrow-down":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%205v14%22%20%2F%3E%20%3Cpath%20d%3D%22m19%2012-7%207-7-7%22%20%2F%3E%20%3C%2Fsvg%3E","oer:arrow-up-to-line":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%203h14%22%20%2F%3E%20%3Cpath%20d%3D%22m18%2013-6-6-6%206%22%20%2F%3E%20%3Cpath%20d%3D%22M12%207v14%22%20%2F%3E%20%3C%2Fsvg%3E","oer:arrow-down-to-line":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2017V3%22%20%2F%3E%20%3Cpath%20d%3D%22m6%2011%206%206%206-6%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2021H5%22%20%2F%3E%20%3C%2Fsvg%3E","oer:copy":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2214%22%20height%3D%2214%22%20x%3D%228%22%20y%3D%228%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2016c-1.1%200-2-.9-2-2V4c0-1.1.9-2%202-2h10c1.1%200%202%20.9%202%202%22%20%2F%3E%20%3C%2Fsvg%3E","oer:columns-2":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M12%203v18%22%20%2F%3E%20%3C%2Fsvg%3E","oer:panel-right-close":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M15%203v18%22%20%2F%3E%20%3Cpath%20d%3D%22m8%209%203%203-3%203%22%20%2F%3E%20%3C%2Fsvg%3E","oer:code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2018%206-6-6-6%22%20%2F%3E%20%3Cpath%20d%3D%22m8%206-6%206%206%206%22%20%2F%3E%20%3C%2Fsvg%3E","oer:lock":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2211%22%20x%3D%223%22%20y%3D%2211%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2011V7a5%205%200%200%201%2010%200v4%22%20%2F%3E%20%3C%2Fsvg%3E","oer:lock-open":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2211%22%20x%3D%223%22%20y%3D%2211%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2011V7a5%205%200%200%201%209.9-1%22%20%2F%3E%20%3C%2Fsvg%3E","oer:trash-2":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2011v6%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2011v6%22%20%2F%3E%20%3Cpath%20d%3D%22M19%206v14a2%202%200%200%201-2%202H7a2%202%200%200%201-2-2V6%22%20%2F%3E%20%3Cpath%20d%3D%22M3%206h18%22%20%2F%3E%20%3Cpath%20d%3D%22M8%206V4a2%202%200%200%201%202-2h4a2%202%200%200%201%202%202v2%22%20%2F%3E%20%3C%2Fsvg%3E","oer:heading-2":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2018h-4c0-4%204-3%204-6%200-1.5-2-2.5-4-1%22%20%2F%3E%20%3C%2Fsvg%3E","oer:heading-3":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17.5%2010.5c1.7-1%203.5%200%203.5%201.5a2%202%200%200%201-2%202%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2017.5c2%201.5%204%20.3%204-1.5a2%202%200%200%200-2-2%22%20%2F%3E%20%3C%2Fsvg%3E","oer:heading-4":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2010v3a1%201%200%200%200%201%201h3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2010v8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3C%2Fsvg%3E","oer:heading-5":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2013v-3h4%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2017.7c.4.2.8.3%201.3.3%201.5%200%202.7-1.1%202.7-2.5S19.8%2013%2018.3%2013H17%22%20%2F%3E%20%3C%2Fsvg%3E","oer:heading-6":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Ccircle%20cx%3D%2219%22%20cy%3D%2216%22%20r%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2010c-2%202-3%203.5-3%206%22%20%2F%3E%20%3C%2Fsvg%3E","oer:quote":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%203a2%202%200%200%200-2%202v6a2%202%200%200%200%202%202%201%201%200%200%201%201%201v1a2%202%200%200%201-2%202%201%201%200%200%200-1%201v2a1%201%200%200%200%201%201%206%206%200%200%200%206-6V5a2%202%200%200%200-2-2z%22%20%2F%3E%20%3Cpath%20d%3D%22M5%203a2%202%200%200%200-2%202v6a2%202%200%200%200%202%202%201%201%200%200%201%201%201v1a2%202%200%200%201-2%202%201%201%200%200%200-1%201v2a1%201%200%200%200%201%201%206%206%200%200%200%206-6V5a2%202%200%200%200-2-2z%22%20%2F%3E%20%3C%2Fsvg%3E","oer:square-code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m10%209-3%203%203%203%22%20%2F%3E%20%3Cpath%20d%3D%22m14%2015%203-3-3-3%22%20%2F%3E%20%3Crect%20x%3D%223%22%20y%3D%223%22%20width%3D%2218%22%20height%3D%2218%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","oer:list":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%205h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2012h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2019h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M8%205h13%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h13%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2019h13%22%20%2F%3E%20%3C%2Fsvg%3E","oer:list-ordered":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11%205h10%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2012h10%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2019h10%22%20%2F%3E%20%3Cpath%20d%3D%22M4%204h1v5%22%20%2F%3E%20%3Cpath%20d%3D%22M4%209h2%22%20%2F%3E%20%3Cpath%20d%3D%22M6.5%2020H3.4c0-1%202.6-1.925%202.6-3.5a1.5%201.5%200%200%200-2.6-1.02%22%20%2F%3E%20%3C%2Fsvg%3E","oer:indent-increase":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m3%208%204%204-4%204%22%20%2F%3E%20%3C%2Fsvg%3E","oer:indent-decrease":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m7%208-4%204%204%204%22%20%2F%3E%20%3C%2Fsvg%3E","oer:align-left":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2012H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2019H3%22%20%2F%3E%20%3C%2Fsvg%3E","oer:align-center":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2012H7%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2019H5%22%20%2F%3E%20%3C%2Fsvg%3E","oer:align-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H9%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H7%22%20%2F%3E%20%3C%2Fsvg%3E","oer:bold":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2012h9a4%204%200%200%201%200%208H7a1%201%200%200%201-1-1V5a1%201%200%200%201%201-1h7a4%204%200%200%201%200%208%22%20%2F%3E%20%3C%2Fsvg%3E","oer:italic":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cline%20x1%3D%2219%22%20x2%3D%2210%22%20y1%3D%224%22%20y2%3D%224%22%20%2F%3E%20%3Cline%20x1%3D%2214%22%20x2%3D%225%22%20y1%3D%2220%22%20y2%3D%2220%22%20%2F%3E%20%3Cline%20x1%3D%2215%22%20x2%3D%229%22%20y1%3D%224%22%20y2%3D%2220%22%20%2F%3E%20%3C%2Fsvg%3E","oer:underline":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%204v6a6%206%200%200%200%2012%200V4%22%20%2F%3E%20%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2220%22%20y2%3D%2220%22%20%2F%3E%20%3C%2Fsvg%3E","oer:strikethrough":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%204H9a3%203%200%200%200-2.83%204%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2012a4%204%200%200%201%200%208H6%22%20%2F%3E%20%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2212%22%20y2%3D%2212%22%20%2F%3E%20%3C%2Fsvg%3E","oer:highlighter":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m9%2011-6%206v3h9l3-3%22%20%2F%3E%20%3Cpath%20d%3D%22m22%2012-4.6%204.6a2%202%200%200%201-2.8%200l-5.2-5.2a2%202%200%200%201%200-2.8L14%204%22%20%2F%3E%20%3C%2Fsvg%3E","oer:subscript":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m4%205%208%208%22%20%2F%3E%20%3Cpath%20d%3D%22m12%205-8%208%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2019h-4c0-1.5.44-2%201.5-2.5S20%2015.33%2020%2014c0-.47-.17-.93-.48-1.29a2.11%202.11%200%200%200-2.62-.44c-.42.24-.74.62-.9%201.07%22%20%2F%3E%20%3C%2Fsvg%3E","oer:superscript":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m4%2019%208-8%22%20%2F%3E%20%3Cpath%20d%3D%22m12%2019-8-8%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2012h-4c0-1.5.442-2%201.5-2.5S20%208.334%2020%207.002c0-.472-.17-.93-.484-1.29a2.105%202.105%200%200%200-2.617-.436c-.42.239-.738.614-.899%201.06%22%20%2F%3E%20%3C%2Fsvg%3E","oer:whole-word":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%227%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209v6%22%20%2F%3E%20%3Ccircle%20cx%3D%2217%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3Cpath%20d%3D%22M14%207v8%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2017v1c0%20.5-.5%201-1%201H3c-.5%200-1-.5-1-1v-1%22%20%2F%3E%20%3C%2Fsvg%3E","oer:link":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2013a5%205%200%200%200%207.54.54l3-3a5%205%200%200%200-7.07-7.07l-1.72%201.71%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2011a5%205%200%200%200-7.54-.54l-3%203a5%205%200%200%200%207.07%207.07l1.71-1.71%22%20%2F%3E%20%3C%2Fsvg%3E","oer:unlink":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18.84%2012.25%201.72-1.71h-.02a5.004%205.004%200%200%200-.12-7.07%205.006%205.006%200%200%200-6.95%200l-1.72%201.71%22%20%2F%3E%20%3Cpath%20d%3D%22m5.17%2011.75-1.71%201.71a5.004%205.004%200%200%200%20.12%207.07%205.006%205.006%200%200%200%206.95%200l1.71-1.71%22%20%2F%3E%20%3Cline%20x1%3D%228%22%20x2%3D%228%22%20y1%3D%222%22%20y2%3D%225%22%20%2F%3E%20%3Cline%20x1%3D%222%22%20x2%3D%225%22%20y1%3D%228%22%20y2%3D%228%22%20%2F%3E%20%3Cline%20x1%3D%2216%22%20x2%3D%2216%22%20y1%3D%2219%22%20y2%3D%2222%22%20%2F%3E%20%3Cline%20x1%3D%2219%22%20x2%3D%2222%22%20y1%3D%2216%22%20y2%3D%2216%22%20%2F%3E%20%3C%2Fsvg%3E","oer:remove-formatting":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%207V4h16v3%22%20%2F%3E%20%3Cpath%20d%3D%22M5%2020h6%22%20%2F%3E%20%3Cpath%20d%3D%22M13%204%208%2020%22%20%2F%3E%20%3Cpath%20d%3D%22m15%2015%205%205%22%20%2F%3E%20%3Cpath%20d%3D%22m20%2015-5%205%22%20%2F%3E%20%3C%2Fsvg%3E","oer:omega":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%2020h4.5a.5.5%200%200%200%20.5-.5v-.282a.52.52%200%200%200-.247-.437%208%208%200%201%201%208.494-.001.52.52%200%200%200-.247.438v.282a.5.5%200%200%200%20.5.5H21%22%20%2F%3E%20%3C%2Fsvg%3E","oer:smile":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2010V9%22%20%2F%3E%20%3Cpath%20d%3D%22M16.472%2015a6%206%200%2001-8.943%200%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2010V9%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3C%2Fsvg%3E","oer:sigma":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%207V5a1%201%200%200%200-1-1H6.5a.5.5%200%200%200-.4.8l4.5%206a2%202%200%200%201%200%202.4l-4.5%206a.5.5%200%200%200%20.4.8H17a1%201%200%200%200%201-1v-2%22%20%2F%3E%20%3C%2Fsvg%3E","oer:book-a":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2019.5v-15A2.5%202.5%200%200%201%206.5%202H19a1%201%200%200%201%201%201v18a1%201%200%200%201-1%201H6.5a1%201%200%200%201%200-5H20%22%20%2F%3E%20%3Cpath%20d%3D%22m8%2013%204-7%204%207%22%20%2F%3E%20%3Cpath%20d%3D%22M9.1%2011h5.7%22%20%2F%3E%20%3C%2Fsvg%3E","oer:audio-lines":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2%2010v3%22%20%2F%3E%20%3Cpath%20d%3D%22M6%206v11%22%20%2F%3E%20%3Cpath%20d%3D%22M10%203v18%22%20%2F%3E%20%3Cpath%20d%3D%22M14%208v7%22%20%2F%3E%20%3Cpath%20d%3D%22M18%205v13%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2010v3%22%20%2F%3E%20%3C%2Fsvg%3E","oer:message-square-quote":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M14%2014a2%202%200%200%200%202-2V8h-2%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2017a2%202%200%200%201-2%202H6.828a2%202%200%200%200-1.414.586l-2.202%202.202A.71.71%200%200%201%202%2021.286V5a2%202%200%200%201%202-2h16a2%202%200%200%201%202%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2014a2%202%200%200%200%202-2V8H8%22%20%2F%3E%20%3C%2Fsvg%3E","oer:chevron-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%20%2F%3E%20%3C%2Fsvg%3E","oer:check":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M20%206%209%2017l-5-5%22%20%2F%3E%20%3C%2Fsvg%3E","oer:smile-plus":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M13.267%202.08a10%2010%200%20108.653%208.653%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2010V9%22%20%2F%3E%20%3Cpath%20d%3D%22M16%205h6%22%20%2F%3E%20%3Cpath%20d%3D%22M16.472%2015a6%206%200%2001-8.943%200%22%20%2F%3E%20%3Cpath%20d%3D%22M19%202v6%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2010V9%22%20%2F%3E%20%3C%2Fsvg%3E","oer:grip-vertical":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%225%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%2219%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2215%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2215%22%20cy%3D%225%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2215%22%20cy%3D%2219%22%20r%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","oer:chevron-up":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18%2015-6-6-6%206%22%20%2F%3E%20%3C%2Fsvg%3E","oer:chevron-down":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m6%209%206%206%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","oer:sliders-horizontal":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2019H3%22%20%2F%3E%20%3Cpath%20d%3D%22M14%203v4%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2017v4%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012h-9%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019h-5%22%20%2F%3E%20%3Cpath%20d%3D%22M21%205h-7%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2010v4%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012H3%22%20%2F%3E%20%3C%2Fsvg%3E","oer:x":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%206%206%2018%22%20%2F%3E%20%3Cpath%20d%3D%22m6%206%2012%2012%22%20%2F%3E%20%3C%2Fsvg%3E","oer:command":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%206v12a3%203%200%201%200%203-3H6a3%203%200%201%200%203%203V6a3%203%200%201%200-3%203h12a3%203%200%201%200-3-3%22%20%2F%3E%20%3C%2Fsvg%3E","oer:circle-dashed":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10.1%202.182a10%2010%200%200%201%203.8%200%22%20%2F%3E%20%3Cpath%20d%3D%22M13.9%2021.818a10%2010%200%200%201-3.8%200%22%20%2F%3E%20%3Cpath%20d%3D%22M17.609%203.721a10%2010%200%200%201%202.69%202.7%22%20%2F%3E%20%3Cpath%20d%3D%22M2.182%2013.9a10%2010%200%200%201%200-3.8%22%20%2F%3E%20%3Cpath%20d%3D%22M20.279%2017.609a10%2010%200%200%201-2.7%202.69%22%20%2F%3E%20%3Cpath%20d%3D%22M21.818%2010.1a10%2010%200%200%201%200%203.8%22%20%2F%3E%20%3Cpath%20d%3D%22M3.721%206.391a10%2010%200%200%201%202.7-2.69%22%20%2F%3E%20%3Cpath%20d%3D%22M6.391%2020.279a10%2010%200%200%201-2.69-2.7%22%20%2F%3E%20%3C%2Fsvg%3E","oer:circle-check":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cpath%20d%3D%22m16%209-5.5%205.5L8%2012%22%20%2F%3E%20%3C%2Fsvg%3E","oer:clock":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cpath%20d%3D%22M12%206v6l4%202%22%20%2F%3E%20%3C%2Fsvg%3E","oer:arrow-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3Cpath%20d%3D%22m12%205%207%207-7%207%22%20%2F%3E%20%3C%2Fsvg%3E","oer:circle-alert":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%228%22%20y2%3D%2212%22%20%2F%3E%20%3Cline%20x1%3D%2212%22%20x2%3D%2212.01%22%20y1%3D%2216%22%20y2%3D%2216%22%20%2F%3E%20%3C%2Fsvg%3E","oer:eye-off":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10.733%205.076a10.744%2010.744%200%200%201%2011.205%206.575%201%201%200%200%201%200%20.696%2010.747%2010.747%200%200%201-1.444%202.49%22%20%2F%3E%20%3Cpath%20d%3D%22M14.084%2014.158a3%203%200%200%201-4.242-4.242%22%20%2F%3E%20%3Cpath%20d%3D%22M17.479%2017.499a10.75%2010.75%200%200%201-15.417-5.151%201%201%200%200%201%200-.696%2010.75%2010.75%200%200%201%204.446-5.143%22%20%2F%3E%20%3Cpath%20d%3D%22m2%202%2020%2020%22%20%2F%3E%20%3C%2Fsvg%3E","oer:eye":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2.062%2012.348a1%201%200%200%201%200-.696%2010.75%2010.75%200%200%201%2019.876%200%201%201%200%200%201%200%20.696%2010.75%2010.75%200%200%201-19.876%200%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","oer:files":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%202h-4a2%202%200%200%200-2%202v11a2%202%200%200%200%202%202h8a2%202%200%200%200%202-2V8%22%20%2F%3E%20%3Cpath%20d%3D%22M16.706%202.706A2.4%202.4%200%200%200%2015%202v5a1%201%200%200%200%201%201h5a2.4%202.4%200%200%200-.706-1.706z%22%20%2F%3E%20%3Cpath%20d%3D%22M5%207a2%202%200%200%200-2%202v11a2%202%200%200%200%202%202h8a2%202%200%200%200%201.732-1%22%20%2F%3E%20%3C%2Fsvg%3E","oer:chevron-left":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m15%2018-6-6%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:insert-drive-file":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3C%2Fsvg%3E"};function Zr(){const o=Xr;if(!o||o.__lucideInstalled)return;const e=o.getIcon.bind(o);o.getIcon=(t,r)=>{if(typeof t=="string"&&t){const i=t.includes(":")?t:`icons:${t}`;if(E[i])return E[i]}return e(t,r)},o.__lucideInstalled=!0,J2(globalThis.document)}function J2(o){for(const e of o.querySelectorAll("*")){if(typeof e.icon=="string"&&e.icon&&"src"in e){const t=e.icon;e.icon="",e.icon=t}e.shadowRoot&&J2(e.shadowRoot)}}function Qr(){let o=X2,e=null;for(;o&&o!==HTMLElement;){if(Object.prototype.hasOwnProperty.call(o,"finalizeStyles"))return{ReactiveElement:o,LitElement:e};e=o,o=Object.getPrototypeOf(o)}throw new Error("Could not locate Lit base classes from HAXCMSLitElementTheme")}const{ReactiveElement:ei,LitElement:F}=Qr(),ti=4e3;let ri=0,Ae=class extends F{static get tag(){return"oer-toast"}static get properties(){return{_items:{state:!0}}}constructor(){super(),this._items=[],this.__timers=new Map}show({text:e="",duration:t=ti,closeText:r="Close",slot:i=null,onClose:a=null}){const n=++ri;this._items=[...this._items,{id:n,text:e,closeText:r,slot:i,onClose:a}].slice(-4),t&&t>0&&this.__timers.set(n,setTimeout(()=>this.dismiss(n),Math.max(t,2e3)))}dismiss(e){const t=this._items.find(r=>r.id===e);clearTimeout(this.__timers.get(e)),this.__timers.delete(e),this._items=this._items.filter(r=>r.id!==e),t?.onClose?.()}clear(){for(const{id:e}of this._items)this.dismiss(e)}static get styles(){return f`
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
    `}};customElements.define(Ae.tag,Ae);function Z2(){let o=globalThis.document.querySelector(Ae.tag);return o||(o=globalThis.document.createElement(Ae.tag),globalThis.document.body.appendChild(o)),o}function ii(){try{globalThis.localStorage.setItem("app-hax-soundStatus","false")}catch{}B.soundStatus=!1,B.playSound=()=>{},globalThis.addEventListener("haxcms-toast-show",o=>{o.stopImmediatePropagation();const e=o.detail||{};Z2().show({text:e.text,duration:e.duration,closeText:e.closeText,slot:e.slot,onClose:typeof e.eventCallback=="function"?e.eventCallback:null})},{capture:!0}),globalThis.addEventListener("haxcms-toast-hide",o=>{o.stopImmediatePropagation(),Z2().clear()},{capture:!0})}const De=new Map;function oi(o){if(o.styleSheet)return o.styleSheet;const e=new CSSStyleSheet;return e.replaceSync(String(o.cssText??o)),e}function Q2(o,e){const t=o.adoptedStyleSheets,r=e.filter(i=>!t.includes(i));r.length&&(o.adoptedStyleSheets=[...t,...r])}function f2(o){for(const[e,t]of Object.entries(o)){const r=oi(t);for(const i of e.split(",").map(a=>a.trim()).filter(Boolean))De.has(i)||De.set(i,[]),De.get(i).push(r)}et(globalThis.document)}function ai(){const o=ei.prototype;if(o.__oerShadowStyles)return;const e=o.createRenderRoot;o.createRenderRoot=function(){const t=e.call(this),r=De.get(this.localName);return r&&t&&t.adoptedStyleSheets&&Q2(t,r),t},o.__oerShadowStyles=!0}function et(o){for(const e of o.querySelectorAll("*"))if(e.shadowRoot){const t=De.get(e.localName);t&&Q2(e.shadowRoot,t),et(e.shadowRoot)}}const ni=f`
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
`,tt=["haxcms-appearance-admin-dialog","haxcms-content-admin-dialog","haxcms-files-admin-dialog","haxcms-outline-editor-dialog","haxcms-page-revisions-dialog","haxcms-seo-admin-dialog","haxcms-site-dashboard","haxcms-site-details-dialog","haxcms-site-import-export-dashboard","haxcms-site-settings-dashboard","haxcms-views-admin-dialog","hax-confirm-dialog","haxcms-about-dialog-ui","haxcms-allowed-blocks-ui","haxcms-editor-settings-dialog-ui","haxcms-site-platform-ui","haxcms-theme-preview-panel","haxcms-page-get-started"].join(","),si=["haxcms-site-editor-ui","app-hax-top-bar","app-hax-user-menu","app-hax-user-menu-button","simple-toolbar-button","simple-toolbar-menu","simple-toolbar-menu-item","simple-modal","simple-modal-template","simple-popover","simple-tooltip","hax-tray","hax-tray-button","hax-gizmo-browser","hax-stax-browser","hax-map","hax-view-source","hax-gizmo-browser","hax-picker","hax-app-picker","hax-cancel-dialog","hax-plate-context","hax-toolbar","hax-toolbar-item","hax-toolbar-menu","hax-context-item","hax-context-item-menu","hax-text-editor-toolbar","hax-text-editor-button","rich-text-editor-toolbar","rich-text-editor-button","super-daemon","super-daemon-ui","super-daemon-row","super-daemon-search","simple-fields","simple-fields-field","simple-fields-tabs","simple-fields-fieldset","haxcms-outline-editor-dialog","outline-designer","haxcms-site-dashboard","haxcms-page-revisions-dialog","hax-body","simple-toast-el","rpg-character-toast","haxcms-toast","a11y-collapse","simple-fields-container","simple-fields-url-combo","simple-fields-tag-list","page-break","simple-context-menu","simple-tooltip","d-d-d-sample","hax-plate-context","simple-picker","hax-map","hax-view-source","hax-gizmo-browser","hax-stax-browser","simple-popover","simple-popover-manager","hax-element-demo","hax-tray-upload","hax-upload-field","simple-file-upload","simple-button-grid","simple-popover-selection","outline-designer"].join(",")+","+tt,rt=`
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
`,xe=f`
  outline: 2px solid var(--ring);
  outline-offset: 2px;
`,li={[si]:ni,"simple-fields-container, simple-fields-field, simple-fields-url-combo, simple-fields-tag-list":f`
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
  `,"simple-fields-field, simple-fields-url-combo, simple-fields-tag-list":f`
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
  `,"simple-toolbar-button, hax-toolbar-item, rich-text-editor-button, hax-text-editor-button":f`
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
      ${xe}
    }
  `,"simple-tag":f`
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
  `,"hax-tray":f`
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
  `,"a11y-collapse":f`
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
      ${xe}
    }
    #content {
      font-size: 0.875rem;
    }
  `,"hax-gizmo-browser, hax-stax-browser":f`
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
  `,"hax-tray-button":f`
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
      ${xe}
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
  `,"hax-upload-field":f`
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
  `,"hax-tray-upload":f`
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
  `,"simple-file-upload":f`
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
  `,"hax-plate-context":f`
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
  `,"rich-text-editor-toolbar, hax-text-editor-toolbar":f`
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
  `,"hax-context-item, hax-toolbar-menu, hax-toolbar-item, rich-text-editor-button, hax-text-editor-button, rich-text-editor-link, rich-text-editor-unlink, rich-text-editor-underline, rich-text-editor-symbol-picker, rich-text-editor-emoji-picker, rich-text-editor-icon-picker":f`
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
  `,"simple-picker":f`
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
  `,"hax-toolbar":f`
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
  `,"hax-text-editor-toolbar, rich-text-editor-toolbar":f`
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
  `,"hax-toolbar-menu, hax-context-item-menu, simple-toolbar-menu":f`
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
  `,"simple-toolbar-menu-item, hax-toolbar-menu-item":f`
    :host {
      font-family: var(--font-sans);
      font-size: 0.875rem;
    }
    ::slotted(*),
    button {
      border-radius: var(--radius-sm) !important;
      font-size: 0.875rem !important;
    }
  `,"page-break":f`
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
  `,"hax-map":f`
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
  `,"hax-view-source":f`
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
  `,"simple-popover-manager":f`
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
  `,"simple-popover":f`
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
  `,"hax-element-demo":f`
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
  `,"d-d-d-sample":f`
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
  `,"simple-tooltip":f`
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
  `,"hax-body":f`
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
  `,"grid-plate":f`
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
  `,"editable-table-display":f`
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
  `,"haxcms-files-admin-dialog":f`
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
  `,"haxcms-theme-picker":f`
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
  `,"simple-modal":f`
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
  `,[tt]:f`
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
      ${v2(rt)}
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
      ${v2(rt)}
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
      ${xe}
    }
  `,"rich-text-editor-prompt":f`
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
  `,"hax-confirm-dialog":f`
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
  `,"haxcms-site-settings-dashboard":f`
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
      ${xe}
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
  `,"outline-designer":f`
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
  `,"super-daemon":f`
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
  `,"super-daemon-ui":f`
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
  `,"super-daemon-search":f`
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
  `,"super-daemon-row":f`
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
  `,"haxcms-site-editor-ui":f`
    :host {
      --top-bar-height: 0px !important;
      height: 0 !important;
      min-height: 0 !important;
      overflow: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
  `,"app-hax-top-bar":f`
    :host {
      --top-bar-height: 3.5rem !important;
    }
  `},di=["content-add","content-edit","content-map","view-source"];function b2(){return B.cmsSiteEditor?.haxCmsSiteEditorUIElement??null}function Se(){return globalThis.HaxStore?.requestAvailability?.()??null}const ci=o=>({target:o,preventDefault(){},stopPropagation(){}});function ze(o,e){const t=b2();if(!t)return;const r=e?t.shadowRoot?.querySelector(e):null;t[o]?.(ci(r))}const pi=()=>ze("_editButtonTap","#editbutton"),hi=()=>ze("_editButtonTap","#editbutton"),mi=()=>ze("_cancelButtonTap","#cancelbutton"),ui=()=>ze("_manifestButtonTap","#manifestbtn"),gi=()=>b2()?._logout?.(),vi=()=>Se()?.activeHaxBody?.undo?.(),fi=()=>Se()?.activeHaxBody?.redo?.();function bi(o){const e=Se()?.activeHaxBody?.shadowRoot?.querySelector("hax-plate-context"),t=n=>{for(const l of n?.querySelectorAll("*")||[]){if(l.getAttribute("event-name")===o)return l;const d=l.shadowRoot&&t(l.shadowRoot);if(d)return d}return null},r=e&&(t(e)||t(e.shadowRoot));let i=null;const a=[r?.shadowRoot];for(;!i&&a.length;){const n=a.shift();if(n){i=n.querySelector("button");for(const l of n.querySelectorAll("*"))a.push(l.shadowRoot)}}i?.click()}function Te(){const o=globalThis.document.querySelector("custom-oer-docs-theme")?.shadowRoot?.querySelector("main")?.getBoundingClientRect();return o?{top:o.top,bottom:o.bottom}:{top:0,bottom:globalThis.innerHeight}}function wi(o){const e=Se()?.haxTray;!e||!di.includes(o)||(o==="view-source"&&e.shadowRoot?.querySelector("#view-source")?.openSource?.(),e.trayDetail=o,e.collapsed=!1)}function w2(o=""){const e=globalThis.SuperDaemonManager?.requestAvailability?.();e&&(e.runProgram(o,"*"),e.mini=!1,e.wand=!1,e.open())}const it=/Mac|iPhone|iPad/.test(globalThis.navigator?.platform??""),W=it?"\u2318":"Ctrl",Di=it?"\u2318\u21E7K":"Ctrl\u21E7K";let ye=null;const ot=o=>o.shiftKey&&(o.altKey||o.metaKey||o.ctrlKey);async function xi(){globalThis.addEventListener("keydown",a=>{if(ye=a,ot(a)&&a.code==="KeyK"&&(a.preventDefault(),a.metaKey||a.ctrlKey)){a.stopImmediatePropagation();const n=globalThis.SuperDaemonManager?.instance;n?.opened?n.close():w2()}},{capture:!0}),await customElements.whenDefined("super-daemon");const o=customElements.get("super-daemon").prototype;if(o.__oerModal)return;const e=a=>{if(!a||a.__oerGated)return;let n=a.allowedCallback;const l=function(...d){return ye&&ot(ye)&&ye.code!=="KeyK"&&ye.key!=="Escape"?!1:typeof n=="function"?n.apply(this,d):!0};Object.defineProperty(a,"allowedCallback",{configurable:!0,get:()=>l,set:d=>{n=d}}),a.__oerGated=!0};e(globalThis.SuperDaemonManager?.instance);const t=o.waveWand;o.waveWand=function(...a){t.apply(this,a),this.mini=!1,this.wand=!1,this.activeNode=null};const r=o.updated;o.updated=function(a){r?.call(this,a),e(this),a.has("opened")&&this.opened&&this.mini&&(this.mini=!1,this.wand=!1)},o.__oerModal=!0;const i=globalThis.SuperDaemonManager?.instance;i?.mini&&(i.mini=!1,i.wand=!1)}function je(o,e){customElements.whenDefined(o).then(()=>e(customElements.get(o)))}const yi={"editor:format-clear":"Clean","hax:format-textblock":"Prettify","icons:content-copy":"Copy"};function ki(){for(const o of["hax-text-editor-toolbar","rich-text-editor-toolbar","hax-toolbar"])je(o,e=>{const t=e.prototype;if(t.__oerExpanded)return;Object.defineProperty(t,"alwaysExpanded",{get:()=>!0,set:()=>{},configurable:!0});const r=t.updated;t.updated=function(i){r?.call(this,i),this.collapsed&&(this.collapsed=!1)},t.__oerExpanded=!0});je("simple-fields-field",o=>{const e=o.prototype,t=e.updated,r=i=>i.querySelector('d-d-d-sample[type="accent"], d-d-d-sample[type="primary"]')?.shadowRoot?.querySelector(".label")?.textContent?.trim();e.updated=function(i){t?.call(this,i),this.type==="radio"&&requestAnimationFrame(()=>{for(const a of this.shadowRoot?.querySelectorAll('[part="option"]')??[]){const n=r(a);n&&a.title!==n&&(a.title=n)}})}}),je("hax-gizmo-browser",o=>{const e=o.prototype,t=e.updated;e.updated=function(r){t?.call(this,r);const i=this.shadowRoot?.querySelector("#inputfilter");i&&!i.placeholder&&(i.placeholder="Search blocks\u2026")}}),at("simple-popover-manager",o=>{const e=()=>o.toggleAttribute("data-oer-preview",!!o.querySelector("hax-element-demo"));new MutationObserver(e).observe(o,{childList:!0,subtree:!0}),e()}),je("hax-view-source",o=>{const e=o.prototype,t=e.updated;e.updated=function(r){t?.call(this,r),this.shadowRoot?.querySelector("hax-toolbar")?.setAttribute("data-oer-source","");for(const i of this.shadowRoot?.querySelectorAll("hax-tray-button")??[]){i.showTextLabel||(i.showTextLabel=!0),i.setAttribute("data-oer-labelled","");const a=yi[i.icon];a&&i.label!==a&&(i.label=a)}}})}function at(o,e){const t=globalThis.document,r=t.querySelector(o);if(r)return e(r);const i=new MutationObserver(()=>{const a=t.querySelector(o);a&&(i.disconnect(),e(a))});i.observe(t.body,{childList:!0})}function _i(){at("hax-tray",async o=>{if(await customElements.whenDefined("hax-tray"),await o.updateComplete,!o.shadowRoot||o.__oerEnhanced)return;o.__oerEnhanced=!0;let e=null;const t=()=>{const r=o.shadowRoot.querySelector('a11y-collapse[id="settings.configure"]');r&&r!==e&&(e=r,requestAnimationFrame(()=>{r.expanded||(r.expanded=!0)}))};new MutationObserver(t).observe(o.shadowRoot,{childList:!0,subtree:!0}),t()})}const $i=(o,e)=>(Number(o.order)||0)-(Number(e.order)||0);function oe(o){const e=new Map;for(const t of o||[]){const r=t.parent||null;e.has(r)||e.set(r,[]),e.get(r).push(t)}for(const t of e.values())t.sort($i);return e}function Be(o,e=null){const t=oe(o),r=[],i=(a,n)=>{for(const l of t.get(a)||[])r.push({item:l,depth:n}),i(l.id,n+1)};return i(e,0),r}function nt(o,e){const t=new Map((o||[]).map(a=>[a.id,a])),r=[];let i=t.get(e);for(;i?.parent&&t.has(i.parent);)r.push(i.parent),i=t.get(i.parent);return r}function st(){return B.cmsSiteEditor?.instance??globalThis.document.querySelector("haxcms-site-editor")}function lt(o){return(B.manifest?.items?.find?.(e=>e.metadata?.pageType==="oer:system")?.metadata?.oerContentTypes?.types?.find?.(e=>e.id===o)?.template||"").trim()||"<p></p>"}function Fi(o,e=null,t=""){const r=oe(B.manifest?.items).get(e||null)||[],i=r[r.length-1],a=i?(Number(i.order)||0)+1:0,n=st()||globalThis.document.body;n.dispatchEvent(new CustomEvent("haxcms-create-node",{bubbles:!0,composed:!0,cancelable:!0,detail:{originalTarget:n,values:{node:{title:o||"New page",location:"",contents:lt(t)},order:a,parent:e||null,...t?{metadata:{pageType:t}}:{}}}}))}function ae(o){const e=B.manifest;return st()?.saveOutline?.({detail:o}),Ci(e)}function Ci(o=B.manifest,e=15e3){return new Promise(t=>{const r=Date.now(),i=()=>{B.manifest!==o?t(!0):Date.now()-r>e?t(!1):setTimeout(i,200)};setTimeout(i,200)})}const ke=()=>`item-${globalThis.crypto.randomUUID()}`;function D2(o,e){const t=new Set(e);let r=!0;for(;r;){r=!1;for(const i of o||[])t.has(i.id)||(t.has(i.parent)||t.has(i.metadata?.oerSnapshotOf))&&(t.add(i.id),r=!0)}return t}const Ei="oer:",G="oer:system",Mi="oer:section",P="oer:heading",dt={id:P,label:"Heading",icon:"oer:heading-2",children:[],fields:[]},me=o=>o?.metadata?.pageType===P,Ai=[{kind:"text",label:"Text"},{kind:"longtext",label:"Long text"},{kind:"number",label:"Number"},{kind:"select",label:"Choice"},{kind:"list",label:"List"},{kind:"boolean",label:"Yes / no"},{kind:"date",label:"Date"},{kind:"image",label:"Image URL"},{kind:"url",label:"Link"},{kind:"relation",label:"Link to pages"},{kind:"files",label:"Files and links"},{kind:"people",label:"People"}],ne=()=>_(D.manifest?.items)||[];function Si(o){const e=o.filter(Boolean);return e.length<3?e.join(" and "):`${e.slice(0,-1).join(", ")}, and ${e.at(-1)}`}function Ie(o){return(Array.isArray(o)?o:o==null||o===""?[]:[o]).map(e=>e&&typeof e=="object"?{name:String(e.name||""),url:String(e.url||"")}:{name:String(e),url:""}).filter(e=>e.name||e.url)}const Q=o=>o?.metadata?.pageType===G;function Le(o=ne()){return o.find(Q)||null}function T(o=ne()){const e=Le(o)?.metadata?.oerContentTypes;return e&&Array.isArray(e.types)?e:{version:1,types:[]}}function x2(o=ne()){return Le(o)?.metadata?.oerNavIcons!==!1}function ct(o,e=ne()){const t=T(e).types;if(!o)return t;const r=t.find(i=>i.id===o);return!r||r.children===null||r.children===void 0?t:t.filter(i=>r.children.includes(i.id))}function zi(o=ne()){const e=new Map;for(const t of o){const r=t.metadata?.pageType;r&&r!==G&&e.set(r,(e.get(r)||0)+1)}return e}const pt=o=>Ei+(String(o||"").replace(/^oer:/i,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"type"),Ti=o=>String(o||"").replace(/[^A-Za-z0-9]+/g," ").trim().split(/\s+/).filter(Boolean).map((e,t)=>t?e[0].toUpperCase()+e.slice(1).toLowerCase():e.toLowerCase()).join("")||"field";async function ji(o,e=null){const t=ne(),r=Le(t),i=t.map(a=>{if(r&&a.id===r.id)return{...a,metadata:{...a.metadata,oerContentTypes:o},modified:!0};const n=e?.(a);return n?{...n,modified:!0}:a});if(!r){const a=t.filter(n=>!n.parent);i.push({id:ke(),title:"Content types",parent:null,order:a.length,indent:0,location:"",description:"Site configuration: content type definitions (hidden).",metadata:{pageType:G,hideInMenu:!0,published:!1,oerContentTypes:o},contents:"<p>This page stores the site's content type definitions.</p>",new:!0})}return ae(i)}function Bi(){return D.cmsSiteEditor?.instance??null}async function Ii(o,{pageType:e,description:t,fields:r}){const i=ne(),a=i.find(l=>l.id===o),n=i.map(l=>{if(l.id!==o)return l;const d={};for(const[p,h]of Object.entries(l.metadata?.oerFields||{}))p in r||(d[p]=Array.isArray(h)?[]:"");const c={...l.metadata,oerFields:{...d,...r}};return c.pageType=e||"",{...l,metadata:c,modified:!0}});await ae(n),a&&typeof t=="string"&&t!==(a.description||"")&&await Bi()?.saveNodeDetails?.({detail:{id:o,operation:"setDescription",description:t}})}const se=o=>!!o?.metadata?.oerSnapshotOf,y2=()=>_(D.manifest?.items)||[];function qe(o){const e=String(o||"").match(/^(\d+)\.(\d+)\.(\d+)$/);return e?e.slice(1).map(Number):null}function k2(o,e){const[t,r,i]=qe(o)||[0,0,0];return e==="major"?`${t+1}.0.0`:e==="minor"?`${t}.${r+1}.0`:`${t}.${r}.${i+1}`}const Li=(o,e)=>{const t=qe(o)||[0,0,0],r=qe(e)||[0,0,0];return t[0]-r[0]||t[1]-r[1]||t[2]-r[2]};function ee(o,e=y2()){const t=e.find(a=>a.id===o),r=e.filter(a=>a.metadata?.oerSnapshotOf===o),i=(t?.metadata?.oerVersions||[]).map(a=>({...a,snapshot:r.find(n=>n.metadata?.version===a.version)||null}));for(const a of r)i.some(n=>n.version===a.metadata.version)||i.push({version:a.metadata.version,date:a.metadata.created,notes:"",snapshot:a});return i.sort((a,n)=>Li(n.version,a.version))}function qi(o,e=y2()){return e.find(t=>t.id===o?.metadata?.oerSnapshotOf)||null}async function Ri(o){const e=new URL(o.location,globalThis.document.baseURI);e.searchParams.set("t",String(Date.now()));const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Could not read the page (${t.status})`);return(await t.text()).replace(/<page-break\b[^>]*>(?:\s*<\/page-break>)?/gi,"").trim()||"<p></p>"}async function Pi(o,e,t=""){if(!qe(e))throw new Error("Versions look like 1.2.0");const r=y2(),i=r.find(h=>h.id===o);if(!i)throw new Error("Page not found");if(ee(o,r).some(h=>h.version===e))throw new Error(`Version ${e} already exists`);const a=await Ri(i),n=Math.floor(Date.now()/1e3),l=r.filter(h=>h.parent===o),d={id:ke(),title:`v${e}`,parent:o,order:l.length+1e3,indent:(Number(i.indent)||0)+1,location:"",description:i.description||"",metadata:{pageType:i.metadata?.pageType,oerFields:i.metadata?.oerFields||{},icon:i.metadata?.icon,oerSnapshotOf:o,oerSnapshotTitle:i.title,version:e,versionStatus:"archived",hideInMenu:!0,locked:!0,published:i.metadata?.published!==!1},contents:a,new:!0};d.metadata.pageType||delete d.metadata.pageType,d.metadata.icon||delete d.metadata.icon;const c={version:e,date:n,notes:t.trim()},p=r.map(h=>h.id===o?{...h,metadata:{...h.metadata,version:e,oerVersions:[c,...h.metadata?.oerVersions||[]]},modified:!0}:h);return p.push(d),ae(p)}const ht=()=>_(D.manifest?.items)||[];function ue(o,e=ht()){return(Array.isArray(o)?o:[]).filter(t=>t&&t.page).map(t=>{const r=e.find(a=>a.id===t.page)||null,i=r&&t.version?ee(r.id,e).find(a=>a.version===t.version)?.snapshot:null;return{page:t.page,version:t.version||"",item:r,href:(i||r)?.slug||"",missing:!r}})}function Oi(o,e,t=ht()){const r=[];for(const a of t){if(a.id===o||a.metadata?.oerSnapshotOf||a.metadata?.pageType===G)continue;if(a.metadata?.oerRef?.page===o){const l=t.find(d=>d.id===a.parent);r.push({item:l||a,via:"Includes it"});continue}const n=e.find(l=>l.id===a.metadata?.pageType);for(const l of n?.fields||[]){if(l.kind!=="relation")continue;const d=a.metadata?.oerFields?.[l.name];Array.isArray(d)&&d.some(c=>c?.page===o)&&r.push({item:a,via:l.label})}}const i=new Set;return r.filter(a=>i.has(a.item.id)?!1:i.add(a.item.id))}async function Hi(o){const e=D,t=new FormData;t.append("file-upload",o,o.name);const r={};e.jwt&&(r.Authorization=`Bearer ${e.jwt}`);const i=e.appSettings?.siteToken;i&&(r["X-HAXCMS-Site-Token"]=i);const a=new URL("x/api/v1/files",globalThis.document.baseURI),n=await fetch(a,{method:"POST",headers:r,body:t,credentials:"same-origin"}),l=await n.json().catch(()=>null);if(!n.ok)throw new Error(l?.data?.message||`Upload failed (${n.status})`);const d=l?.data?.file||l?.file||{};return d.url||d.fullUrl||d.path||""}const mt=o=>/\.(png|jpe?g|gif|webp|svg|avif)(\?|#|$)/i.test(String(o||""));function Ni(o){const e=String(o||"").split(/[?#]/)[0].split(".").pop();return e&&e.length<=5&&!String(o).endsWith("/")?e.toUpperCase():"Link"}const _2=(o,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${E[o]||""}&quot;)"></span>`;let Re=class extends F{static get tag(){return"oer-page-picker"}static get properties(){return{open:{type:Boolean,reflect:!0},_q:{state:!0},_type:{state:!0},_versions:{state:!0},_children:{state:!0}}}constructor(){super(),this.open=!1,this._q="",this._type="",this._versions={},this._children=!1,this.__keys=e=>{this.open&&e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),this._done(null))}}pick({exclude:e=[],types:t=null,children:r=!0,title:i="Add an existing page",hint:a=null}={}){return this._exclude=new Set(e),this._only=t&&t.length?new Set(t):null,this._offerChildren=r,this._title=i,this._hint=a,this._q="",this._type="",this._versions={},this._children=!1,this.open=!0,globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector("input")?.focus()),new Promise(n=>this.__resolve=n)}_done(e){this.open=!1,globalThis.removeEventListener("keydown",this.__keys,!0),this.__resolve?.(e),this.__resolve=null}get _items(){return(_(D.manifest?.items)||[]).filter(e=>!Q(e)&&!se(e)&&!this._exclude?.has(e.id)&&(!this._only||this._only.has(e.metadata?.pageType)))}static get styles(){return f`
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
    `}render(){if(!this.open)return s``;const e=T().types.filter(n=>!this._only||this._only.has(n.id)),t=this._q.trim().toLowerCase(),r=_(D.manifest?.items)||[],i=new Map(r.map(n=>[n.id,n])),a=this._items.filter(n=>(!this._type||n.metadata?.pageType===this._type)&&(!t||n.title.toLowerCase().includes(t))).sort((n,l)=>n.title.localeCompare(l.title)).slice(0,60);return s`
      <div class="backdrop" @click="${()=>this._done(null)}"></div>
      <div class="box" role="dialog" aria-modal="true" aria-labelledby="t">
        <h2 id="t">${this._title}</h2>
        <p class="sub">${this._hint??"It is shown here, not copied: changes to the original appear here, unless you pin a released version."}</p>
        <div class="bar">
          <label class="search">${_2("icons:search")}<input type="search" placeholder="Search pages…" aria-label="Search pages" .value="${this._q}" @input="${n=>this._q=n.target.value}" /></label>
          <select aria-label="Content type" @change="${n=>this._type=n.target.value}">
            <option value="">All types</option>
            ${e.map(n=>s`<option value="${n.id}">${n.label}</option>`)}
          </select>
        </div>
        ${a.length?s`<ul aria-label="Pages">
              ${a.map(n=>{const l=e.find(p=>p.id===n.metadata?.pageType),d=ee(n.id,r).filter(p=>p.snapshot),c=i.get(n.parent);return s`<li>
                  ${l?.icon?s`<simple-icon-lite icon="${l.icon}"></simple-icon-lite>`:_2("lrn:page")}
                  <div class="info">
                    <div class="title">${n.title}</div>
                    <div class="meta">${[l?.label,c?`in ${c.title}`:""].filter(Boolean).join(" \xB7 ")}</div>
                  </div>
                  ${d.length?s`<select aria-label="Version of ${n.title}" @change="${p=>this._versions={...this._versions,[n.id]:p.target.value}}">
                        <option value="">Latest${n.metadata?.version?` (v${n.metadata.version})`:""}</option>
                        ${d.map(p=>s`<option value="${p.version}">v${p.version}</option>`)}
                      </select>`:n.metadata?.version?s`<span class="ver">v${n.metadata.version}</span>`:""}
                  <button class="add" @click="${()=>this._done({page:n,version:this._versions[n.id]||"",withChildren:this._children})}">
                    ${_2("oer:plus","sm")}Add
                  </button>
                </li>`})}
            </ul>`:s`<div class="empty">No pages match.</div>`}
        <div class="foot">
          ${this._offerChildren?s`<label><input type="checkbox" .checked="${this._children}" @change="${n=>this._children=n.target.checked}" />Also add its sub-pages</label>`:s`<span></span>`}
          <button class="cancel" @click="${()=>this._done(null)}">Cancel</button>
        </div>
      </div>
    `}};customElements.define(Re.tag,Re);function ut(){const o=globalThis.document;return o.querySelector(Re.tag)||o.body.appendChild(o.createElement(Re.tag))}const Ui="https://dmd-program.github.io/aiul/api",Vi="https://dmd-program.github.io/aiul/guide.html",Ki={NA:{description:"No AI tools allowed. All work must be entirely student-generated.",requirements:["Students may not use AI generation tools for any part of the assignment","All work must be completed using only the student's own skills and knowledge","Third-party non-AI tools and resources may still be permitted according to standard course policies","Students should be prepared to explain their process and demonstrate their skills if asked"],students:["Complete all aspects of the assignment without using AI tools","Document their process in the traditional manner required by the instructor","Be prepared to explain their working process if asked","Follow all other course guidelines for acceptable resources"]},WA:{description:"Limited AI assistance is permitted only with instructor pre-approval.",requirements:["Students must request and receive explicit permission before using AI tools","Students must document which AI tools were used and how they were integrated into the work","AI usage should support rather than replace the student's work","Students must follow any additional guidelines specified in the approval"],students:["Submit a request for AI usage approval before beginning work with AI tools","Clearly explain which tools they wish to use and how they will be integrated","Wait for explicit approval before proceeding with AI assistance","Document their AI usage according to approved parameters","Be prepared to discuss how AI contributed to their process"]},CD:{description:"AI tools may be used for research and ideation, but the final work must be entirely student-generated.",requirements:["Students may use AI tools only for research, ideation, and concept development","The final work must be entirely created by the student without AI generation","Students must document which AI tools were used and how they contributed to the ideation process","AI outputs may inform but not directly appear in the final work"],students:["Use AI tools to explore concepts, gather information, and develop ideas","Document the AI tools used and how they contributed to the ideation process","Create the final work entirely themselves, without AI-generated content","Be prepared to discuss how AI-assisted research influenced their thinking","Cite AI tools and prompts used in the research/ideation phase"]},TC:{description:"AI may be used as a collaborative tool, but outputs must be significantly transformed.",requirements:["Students may use AI tools as collaborative partners in the creation process","All AI outputs must be significantly transformed and modified by the student","Students must document the AI tools used, prompts provided, and how outputs were transformed","The final work must demonstrate the student's critical thinking and creative direction"],students:["Use AI tools as collaborative partners in the creation process","Critically evaluate and significantly transform all AI-generated content","Document the original AI outputs and your transformations","Provide clear explanations of your creative decisions and modifications","Be prepared to discuss your collaborative process and creative direction"]},DP:{description:"AI-assisted creation is permitted with clear direction and modification from the student.",requirements:["Students may use AI tools to generate content under their direction","Students must provide clear creative direction to the AI tools","Students must apply post-processing and refinement to AI outputs","Students must document their prompts, direction process, and post-processing decisions"],students:["Provide clear, intentional direction to AI tools through careful prompt crafting","Apply thoughtful post-processing and refinement to AI outputs","Document the direction process, including prompt iterations and decisions","Explain post-processing choices and their relationship to your creative vision","Be prepared to discuss how your direction shaped the AI-generated elements"]},IU:{description:"AI usage is a required component of the assignment, with focus on sophisticated AI integration.",requirements:["Students must use AI tools as a significant component of the assignment","Students must demonstrate sophisticated and intentional AI usage","Students must thoroughly document their AI usage, including prompts and process","Students must reflect on the ethical implications and effectiveness of their AI integration"],students:["Use AI tools extensively and intentionally as part of the assignment","Demonstrate sophisticated prompt engineering and AI interaction techniques","Document their process thoroughly, including prompts, iterations, and decision-making","Reflect critically on the effectiveness and implications of their AI usage","Be prepared to discuss both technical and ethical dimensions of their work with AI"]}};let $2=null;function gt(){if(!$2){const o=e=>fetch(`${Ui}/${e}.json`).then(t=>t.ok?t.json():Promise.reject(t.status)).then(t=>t.data||[]);$2=Promise.all([o("licenses"),o("modifiers"),o("combinations")]).then(([e,t,r])=>({licenses:e,modifiers:t,combinations:r})).catch(()=>{const e=globalThis.WCGlobalBasePath||new URL("build/es6/node_modules/",globalThis.document.baseURI).href;return fetch(`${e}@haxtheweb/ai-usage-license/lib/v1.json`).then(t=>t.ok?t.json():null).catch(()=>null)})}return $2}function F2(o,e){const[,t,r]=String(o).match(/^AIUL-([A-Z]+)(?:-([A-Z0-9]+))?$/i)||[],i=(t||"").toUpperCase(),a=(r||"").toUpperCase(),n=e?.licenses?.find(h=>h.code===i),l=a?e?.modifiers?.find(h=>h.code===a):null,d=a?e?.combinations?.find(h=>h.code===`${i}-${a}`):null,c=Ki[i]||{description:"",requirements:[],students:[]},p={description:n?.description||c.description,requirements:n?.requirements?.length?n.requirements:c.requirements,students:n?.studentGuidelines?.length?n.studentGuidelines:c.students};return{code:o,title:n?.title||(i?`AIUL-${i}`:String(o)),name:n?.fullName||"",modifier:l?l.fullName||l.title:a,url:d?.url||n?.url||"",image:d?.image||n?.image||"",...p}}const Wi=o=>o.kind==="select"&&o.multiple&&(o.options||[]).length>0&&o.options.every(e=>/^AIUL-/i.test(e.value)),vt=/^AIUL-([A-Z]+)(?:-([A-Z0-9]+))?$/i,L=(o,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${E[o]||""}&quot;)"></span>`,C2=o=>o==null||o===""||Array.isArray(o)&&!o.filter(e=>String(e).trim()).length,E2=o=>Array.isArray(o)?o:o?String(o).split(",").map(e=>e.trim()).filter(Boolean):[];let Pe=class extends F{static get tag(){return"oer-page-details"}static get properties(){return{open:{type:Boolean,reflect:!0},_type:{state:!0},_desc:{state:!0},_values:{state:!0},_saving:{state:!0},_tried:{state:!0}}}constructor(){super(),this.open=!1,this._values={},this.__keys=e=>{this.open&&e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),this._close())}}show(e,{onSaved:t=null}={}){this._onSaved=t;const r=_(D.manifest?.items)||[],i=r.find(l=>l.id===e);if(!i)return;this._item=i;const a=i.parent?r.find(l=>l.id===i.parent):null;this._allowed=ct(a?.metadata?.pageType||null,r),this._allTypes=T(r).types,this._type=i.metadata?.pageType||"",this._desc=i.description||"",this._values={...i.metadata?.oerFields||{}};const n=T(r).types.find(l=>l.id===i.metadata?.pageType);for(const l of n?.fields||[])l.default!==void 0&&l.default!==""&&(this._values[l.name]===void 0||this._values[l.name]==="")&&(this._values[l.name]=l.kind==="list"||l.kind==="select"&&l.multiple?String(l.default).split(",").map(d=>d.trim()):l.default);this._tried=!1,this._saving=!1,gt().then(l=>{this._aiul=l,this.requestUpdate()}),this.open=!0,globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector("select, input, textarea")?.focus())}_close(){this.open=!1,globalThis.removeEventListener("keydown",this.__keys,!0)}get _typeDef(){return this._allTypes?.find(e=>e.id===this._type)||null}_set(e,t){this._values={...this._values,[e]:t}}_missing(){return(this._typeDef?.fields||[]).filter(e=>e.required&&C2(this._values[e.name]))}async _save(){if(this._tried=!0,this._missing().length||this._saving)return;this._saving=!0;const e={};for(const t of this._typeDef?.fields||[]){let r=this._values[t.name];t.kind==="list"&&(r=(r||[]).map(i=>String(i).trim()).filter(Boolean)),t.kind==="select"&&t.multiple&&(r=(t.options||[]).map(i=>i.value).filter(i=>E2(r).includes(i))),t.kind==="relation"&&(r=(Array.isArray(r)?r:[]).filter(i=>i?.page).map(i=>({page:i.page,version:i.version||""}))),t.kind==="files"&&(r=(Array.isArray(r)?r:[]).map(i=>({title:(i.title||"").trim(),url:(i.url||"").trim(),description:(i.description||"").trim(),alt:(i.alt||"").trim()})).filter(i=>i.url||i.title)),t.kind==="people"&&(r=Ie(r).map(i=>({name:i.name.trim(),url:(i.url||"").trim()})).filter(i=>i.name)),t.kind==="number"&&r!==""&&r!==void 0&&(r=Number(r)),(!C2(r)||t.kind==="boolean")&&(e[t.name]=t.kind==="boolean"?!!r:r)}await Ii(this._item.id,{pageType:this._type,description:this._desc.trim(),fields:e}),this._onSaved?.({pageType:this._type,description:this._desc.trim(),fields:e}),this._saving=!1,this._close()}static get styles(){return f`
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
      @media (max-width: 480px) {
        .person-row {
          grid-template-columns: minmax(0, 1fr) auto auto;
        }
        .person-row input[type="url"] {
          grid-column: 1;
          grid-row: 2;
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
    `}_renderField(e){const t=`f-${e.name}`,r=this._values[e.name],i=this._tried&&e.required&&C2(r),a=s`<label for="${t}">${e.label}${e.required?s` <span class="req" aria-hidden="true">*</span>`:""}</label>`,n=e.help?s`<p class="hint" id="${t}-help">${e.help}</p>`:"",l=i?s`<p class="err">${e.label} is required.</p>`:"",d={invalid:i};let c;switch(e.kind){case"longtext":c=s`<textarea id="${t}" class="${i?"invalid":""}" .value="${r||""}" @input="${p=>this._set(e.name,p.target.value)}"></textarea>`;break;case"select":if(Wi(e))return s`<div>
            <span class="label" id="${t}-l">${e.label}${e.required?s` <span class="req" aria-hidden="true">*</span>`:""}</span>
            ${this._renderAiulPicker(e)}${n}${l}
          </div>`;if(e.multiple){const p=E2(r);return s`<div>
            <span class="label" id="${t}-l">${e.label}${e.required?s` <span class="req" aria-hidden="true">*</span>`:""}</span>
            <div class="choices" role="group" aria-labelledby="${t}-l">
              ${(e.options||[]).map(h=>s`<label class="check"
                  ><input
                    type="checkbox"
                    .checked="${p.includes(h.value)}"
                    @change="${m=>this._set(e.name,m.target.checked?[...p,h.value]:p.filter(g=>g!==h.value))}"
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
        </div>`;case"relation":return s`<div><span class="label" id="${t}-l">${e.label}${e.required?s` <span class="req">*</span>`:""}</span>${this._renderRelation(e)}${n}${l}</div>`;case"people":return s`<div><span class="label" id="${t}-l">${e.label}${e.required?s` <span class="req">*</span>`:""}</span>${this._renderPeople(e)}${n}${l}</div>`;case"files":return s`<div><span class="label" id="${t}-l">${e.label}${e.required?s` <span class="req">*</span>`:""}</span>${this._renderFiles(e)}${n}${l}</div>`;case"list":{const p=Array.isArray(r)?r:r?[r]:[],h=p.length?p:[""];return c=s`<div class="list" role="group" aria-labelledby="${t}-l">
          ${h.map((m,g)=>s`<div class="list-row">
              <input
                class="input ${i?"invalid":""}"
                id="${g===0?t:`${t}-${g}`}"
                aria-label="${e.label} ${g+1}"
                .value="${m}"
                @input="${u=>{const v=[...h];v[g]=u.target.value,this._set(e.name,v)}}"
                @keydown="${u=>{if(u.key==="Enter"){u.preventDefault();const v=[...h];v.splice(g+1,0,""),this._set(e.name,v),this.updateComplete.then(()=>this.shadowRoot.getElementById(`${t}-${g+1}`)?.focus())}}}"
              />
              <button
                class="icon-act"
                title="Remove"
                aria-label="Remove ${e.label} ${g+1}"
                @click="${()=>this._set(e.name,h.filter((u,v)=>v!==g))}"
              >
                ${L("oer:x","sm")}
              </button>
            </div>`)}
          <button class="add-item" @click="${()=>this._set(e.name,[...h,""])}">${L("oer:plus","sm")}Add ${e.label.toLowerCase()}</button>
        </div>`,s`<div><span class="label" id="${t}-l">${e.label}${e.required?s` <span class="req">*</span>`:""}</span>${c}${n}${l}</div>`}default:{const p={number:"number",date:"date",url:"url",image:"url"}[e.kind]||"text",h=e.kind==="date"&&r?String(r).slice(0,10):r??"";c=s`<input id="${t}" class="input ${d.invalid?"invalid":""}" type="${p}" .value="${h}" @input="${m=>this._set(e.name,m.target.value)}" />`}}return s`<div>${a}${c}${n}${l}</div>`}_renderAiulPicker(e){const t=`f-${e.name}`,r=E2(this._values[e.name]),i=new Set((e.options||[]).map(u=>u.value)),a=[],n=[];for(const u of e.options){const[,v,x]=u.value.match(vt)||[];v&&!a.includes(v.toUpperCase())&&a.push(v.toUpperCase()),x&&!n.includes(x.toUpperCase())&&n.push(x.toUpperCase())}const l=u=>F2(`AIUL-${u}`,this._aiul).name,d=u=>this._aiul?.modifiers?.find(v=>v.code===u)?.title||u,c=u=>this._set(e.name,u),p=r.map(u=>{const[,v="",x=""]=u.match(vt)||[];return{code:u,l:v.toUpperCase(),m:x.toUpperCase()}}),h=(u,v)=>`AIUL-${u}${v?`-${v}`:""}`,m=(u,v,x)=>{const C=[...r];C[u]=i.has(h(v,x))?h(v,x):h(v,""),c(C)},g=()=>{for(const u of a)if(!r.includes(h(u,"")))return h(u,"");return h(a[0],n[0]||"")};return s`<div class="aiul-picker" role="group" aria-labelledby="${t}-l">
      ${p.map((u,v)=>{const x=F2(u.code,this._aiul),C=r.indexOf(u.code)!==v;return s`<div class="aiul-row">
          <div class="aiul-selects">
            <select
              id="${v===0?t:`${t}-${v}`}"
              aria-label="${e.label} ${v+1}: license"
              @change="${A=>m(v,A.target.value,u.m)}"
            >
              ${a.map(A=>s`<option value="${A}" ?selected="${A===u.l}">AIUL-${A}${l(A)?` \xB7 ${l(A)}`:""}</option>`)}
            </select>
            <select aria-label="${e.label} ${v+1}: media" @change="${A=>m(v,u.l,A.target.value)}">
              <option value="" ?selected="${!u.m}">All media</option>
              ${n.filter(A=>i.has(h(u.l,A))).map(A=>s`<option value="${A}" ?selected="${A===u.m}">${d(A)} only</option>`)}
            </select>
            <button class="icon-act" title="Remove" aria-label="Remove ${u.code}" @click="${()=>c(r.filter((A,Y)=>Y!==v))}">${L("oer:x","sm")}</button>
          </div>
          <p class="hint aiul-hint">
            <code>${u.code}</code> ${x.description}${C?s` <span class="err-inline">Listed twice.</span>`:""}
          </p>
        </div>`})}
      <button
        class="add-item"
        @click="${()=>{c([...r,g()]),this.updateComplete.then(()=>this.shadowRoot.getElementById(`${t}-${r.length}`)?.focus()||this.shadowRoot.getElementById(t)?.focus())}}"
      >
        ${L("oer:plus","sm")}Add AI usage license
      </button>
    </div>`}async _addLinks(e){const t=Array.isArray(this._values[e.name])?this._values[e.name]:[],r=(e.types||[]).map(a=>this._allTypes.find(n=>n.id===a)?.label).filter(Boolean),i=await ut().pick({exclude:[this._item.id,...t.map(a=>a.page)],types:e.types,children:!1,title:`Add to ${e.label}`,hint:r.length?`Choose a page: ${r.join(", ")}.`:"Choose any page. Pin a released version to keep linking to it as it is now."});i&&this._set(e.name,[...t,{page:i.page.id,version:i.version||""}])}_renderRelation(e){const t=Array.isArray(this._values[e.name])?this._values[e.name]:[],r=ue(t),i=a=>{const n=[...t];a(n),this._set(e.name,n)};return s`<div class="links" role="list">
      ${r.map((a,n)=>{const l=this._allTypes.find(c=>c.id===a.item?.metadata?.pageType),d=a.item?ee(a.item.id):[];return s`<div class="link-row" role="listitem">
          ${l?.icon?s`<simple-icon-lite icon="${l.icon}"></simple-icon-lite>`:L("lrn:page","sm")}
          <span class="link-title">${a.item?a.item.title:s`<em>Missing page</em>`}<small>${l?.label||""}</small></span>
          ${d.length?s`<select aria-label="Version of ${a.item.title}" @change="${c=>i(p=>p[n]={...p[n],version:c.target.value})}">
                <option value="" ?selected="${!a.version}">Latest</option>
                ${d.map(c=>s`<option value="${c.version}" ?selected="${c.version===a.version}">v${c.version}</option>`)}
              </select>`:""}
          <button class="icon-act" title="Move up" aria-label="Move ${a.item?.title||"link"} up" ?disabled="${n===0}" @click="${()=>i(c=>c.splice(n-1,0,c.splice(n,1)[0]))}">
            ${L("icons:arrow-upward","sm")}
          </button>
          <button class="icon-act" title="Remove" aria-label="Remove ${a.item?.title||"link"}" @click="${()=>i(c=>c.splice(n,1))}">${L("oer:x","sm")}</button>
        </div>`})}
      <button class="add-item" @click="${()=>this._addLinks(e)}">${L("oer:plus","sm")}Add ${e.label.toLowerCase()}</button>
    </div>`}_renderPeople(e){const t=`f-${e.name}`,r=Ie(this._values[e.name]),i=r.length?r:[{name:"",url:""}],a=n=>{const l=i.map(d=>({...d}));n(l),this._set(e.name,l)};return s`<div class="people" role="group" aria-labelledby="${t}-l">
      ${i.map((n,l)=>s`<div class="person-row">
          <input
            class="input"
            id="${l===0?t:`${t}-${l}`}"
            placeholder="Name"
            aria-label="${e.label} ${l+1}: name"
            .value="${n.name}"
            @input="${d=>a(c=>c[l].name=d.target.value)}"
          />
          <input
            class="input"
            type="url"
            placeholder="Link (optional)"
            aria-label="${e.label} ${l+1}: link"
            .value="${n.url||""}"
            @input="${d=>a(c=>c[l].url=d.target.value)}"
          />
          <button class="icon-act" title="Move up" aria-label="Move ${n.name||`person ${l+1}`} up" ?disabled="${l===0}" @click="${()=>a(d=>d.splice(l-1,0,d.splice(l,1)[0]))}">
            ${L("icons:arrow-upward","sm")}
          </button>
          <button class="icon-act" title="Remove" aria-label="Remove ${n.name||`person ${l+1}`}" @click="${()=>a(d=>d.splice(l,1))}">${L("oer:x","sm")}</button>
        </div>`)}
      <button
        class="add-item"
        @click="${()=>{a(n=>n.push({name:"",url:""})),this.updateComplete.then(()=>this.shadowRoot.getElementById(`${t}-${i.length}`)?.focus())}}"
      >
        ${L("oer:plus","sm")}Add person
      </button>
    </div>`}async _upload(e,t,r){const i=r.files?.[0];if(!i)return;const a=[...this._values[e.name]||[]];a[t]={...a[t],uploading:!0},this._set(e.name,a);try{const n=await Hi(i),l=[...this._values[e.name]||[]];l[t]={...l[t],url:n,title:l[t].title||i.name.replace(/\.[^.]+$/,""),uploading:!1,error:""},this._set(e.name,l)}catch(n){const l=[...this._values[e.name]||[]];l[t]={...l[t],uploading:!1,error:n.message},this._set(e.name,l)}r.value=""}_renderFiles(e){const t=Array.isArray(this._values[e.name])?this._values[e.name]:[],r=(i,a)=>{const n=[...t];n[i]={...n[i],...a},this._set(e.name,n)};return s`<div class="files">
      ${t.map((i,a)=>s`<fieldset class="file-row">
          <legend class="sr">${e.label} ${a+1}</legend>
          <div class="file-grid">
            <input class="input" placeholder="Title" aria-label="Title" .value="${i.title||""}" @input="${n=>r(a,{title:n.target.value})}" />
            <div class="url-row">
              <input class="input" placeholder="File or link address" aria-label="File or link address" .value="${i.url||""}" @input="${n=>r(a,{url:n.target.value})}" />
              <label class="upload">
                ${L("icons:file-upload","sm")}${i.uploading?"Uploading\u2026":"Upload"}
                <input type="file" @change="${n=>this._upload(e,a,n.target)}" />
              </label>
            </div>
            <input class="input" placeholder="Description (optional)" aria-label="Description" .value="${i.description||""}" @input="${n=>r(a,{description:n.target.value})}" />
            ${mt(i.url)?s`<input class="input" placeholder="Alt text for the image" aria-label="Alt text" .value="${i.alt||""}" @input="${n=>r(a,{alt:n.target.value})}" />`:""}
            ${i.error?s`<p class="err">${i.error}</p>`:""}
          </div>
          <button class="icon-act" title="Remove" aria-label="Remove ${i.title||"file"}" @click="${()=>this._set(e.name,t.filter((n,l)=>l!==a))}">${L("oer:x","sm")}</button>
        </fieldset>`)}
      <button class="add-item" @click="${()=>this._set(e.name,[...t,{title:"",url:"",description:"",alt:""}])}">
        ${L("oer:plus","sm")}Add file or link
      </button>
    </div>`}render(){if(!this.open)return s``;const e=this._typeDef,t=this._tried?this._missing():[],r=this._allowed||[],i=e&&!r.some(a=>a.id===e.id)?[...r,e]:r;return s`
      <div class="backdrop" @click="${this._close}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">Page details</h2>
            <p class="sub">${this._item.title}</p>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._close}">${L("oer:x")}</button>
        </header>
        <div class="body">
          <div>
            <label for="ptype">Content type</label>
            <select id="ptype" @change="${a=>this._type=a.target.value}">
              <option value="" ?selected="${!this._type}">No type</option>
              ${i.map(a=>s`<option value="${a.id}" ?selected="${a.id===this._type}">${a.label}</option>`)}
            </select>
            ${e?.description?s`<p class="hint">${e.description}</p>`:""}
          </div>
          <div>
            <label for="pdesc">Description</label>
            <textarea id="pdesc" .value="${this._desc}" @input="${a=>this._desc=a.target.value}"></textarea>
            <p class="hint">Shown under the title and in search results.</p>
          </div>
          ${e?s`<div class="sep" role="separator"></div>
                ${e.fields.length?e.fields.map(a=>this._renderField(a)):s`<p class="notype">${e.label} has no fields of its own.</p>`}`:""}
        </div>
        <footer>
          <span class="status">${t.length?`Fill in: ${t.map(a=>a.label).join(", ")}`:""}</span>
          <button class="btn outline" @click="${this._close}">Cancel</button>
          <button class="btn primary" aria-disabled="${this._saving?"true":"false"}" @click="${this._save}">${this._saving?"Saving\u2026":"Save details"}</button>
        </footer>
      </div>
    `}};customElements.define(Pe.tag,Pe);function ft(){const o=globalThis.document;return o.querySelector(Pe.tag)||o.body.appendChild(o.createElement(Pe.tag))}const bt="Page details",M2=o=>o.composedPath().find(e=>e?.localName==="page-break"&&e.closest?.("hax-body"));function wt(o){o.t&&o.t.selectToEditPageDetails!==bt&&(o.t={...o.t,selectToEditPageDetails:bt})}function Dt(o){const e=o.getAttribute("item-id")||B.activeId;ft().show(e,{onSaved:({pageType:t,description:r})=>{o.isConnected&&(t?o.setAttribute("page-type",t):o.removeAttribute("page-type"),o.setAttribute("description",r||""),"pageType"in o&&(o.pageType=t||null),"description"in o&&(o.description=r||""))}})}let xt=!1;function Yi(){if(xt)return;xt=!0;const o=globalThis,e=r=>{if(!B.editMode)return;const i=M2(r);i&&(wt(i),r.preventDefault(),r.stopImmediatePropagation())};for(const r of["pointerdown","mousedown"])o.addEventListener(r,e,!0);o.addEventListener("click",r=>{if(!B.editMode)return;const i=M2(r);i&&(r.preventDefault(),r.stopImmediatePropagation(),Dt(i))},!0),o.addEventListener("keydown",r=>{if(!B.editMode||r.key!=="Enter"&&r.key!==" ")return;const i=M2(r);i&&(r.preventDefault(),r.stopImmediatePropagation(),Dt(i))},!0);const t=()=>{globalThis.HaxStore?.requestAvailability?.()?.activeHaxBody?.querySelectorAll?.("page-break").forEach(wt)};O(()=>{if(B.editMode)for(const r of[0,300,1e3,2500])setTimeout(t,r)})}const Oe=20;function yt(o){const e=o.getBoundingClientRect(),t=e.top-4,r=e.bottom+4;return{top:t,bottom:r,left:e.left-4,right:e.right+4,height:r-t,compact:r-t<60,block:e}}const kt=o=>o.localName!=="page-break"&&o.getClientRects().length>0;function Gi(o){const e=new Set;for(const t of o.querySelectorAll("[slot]")){const r=t.parentElement;!r||r===o||e.has(r)||(o.__isLayout?o.__isLayout(r):r.localName==="grid-plate")&&e.add(r)}for(const t of o.querySelectorAll("grid-plate"))e.add(t);return[...e]}function Xi(o){const e=o.shadowRoot,t=[];if(!e)return t;const r=typeof o.layout=="string"?o.layout.split("-").length:1/0;for(const i of[...e.querySelectorAll("[id^='col']")].slice(0,r)){const a=i.querySelector("slot")?.getAttribute("name"),n=i.getBoundingClientRect();!a||n.width===0||getComputedStyle(i).display==="none"||t.push({name:a,rect:n})}return t}function A2(o,e){if(e-o>=16)return[o,e];const t=(o+e)/2;return[t-16/2,t+16/2]}function He(o){const e=[];if(!o)return e;const t=o.getBoundingClientRect(),r=[...o.children].filter(kt),i=r.map(a=>a.getBoundingClientRect());for(let a=0;a<=r.length;a++){const n=a===r.length,l=a===0?(i[0]?.top??t.top)-16:i[a-1].bottom,d=n?l+16:i[a].top,[c,p]=A2(l,d);e.push({container:o,slotName:null,before:r[a]||null,after:r[a-1]||null,nested:!1,end:n,top:c,height:p-c,left:t.left,width:t.width})}for(const a of Gi(o))for(const n of Xi(a)){const l=[...a.children].filter(c=>c.getAttribute("slot")===n.name&&kt(c)),d=l.map(c=>c.getBoundingClientRect());if(!l.length){const[c,p]=A2(n.rect.top,n.rect.bottom);e.push({container:a,slotName:n.name,before:null,after:null,nested:!0,top:c,height:p-c,left:n.rect.left,width:n.rect.width});continue}for(let c=0;c<=l.length;c++){const p=c===0?n.rect.top:d[c-1].bottom,h=c===l.length?Math.max(n.rect.bottom,p):d[c].top,[m,g]=A2(p,h);e.push({container:a,slotName:n.name,before:l[c]||null,after:l[c-1]||null,nested:!0,top:m,height:g-m,left:n.rect.left,width:n.rect.width})}}return e}function _t(o,e,t,{gutter:r=0}={}){let i=null;for(const a of o){const n=a.nested?a.left:a.left-r;e<n||e>a.left+a.width||t<a.top||t>a.top+a.height||(!i||a.width*a.height<i.width*i.height)&&(i=a)}return i}function Ji(o,e,t){const r=_t(o,e,t,{gutter:96});if(r)return r;let i=null,a=1/0;for(const n of o){const l=e<n.left?n.left-e:e>n.left+n.width?e-n.left-n.width:0,d=t<n.top?n.top-t:t>n.top+n.height?t-n.top-n.height:0,c=Math.hypot(l*2,d);c<a&&(a=c,i=n)}return i}const S2=(o,e)=>!!o&&!!e&&o.container===e.container&&o.slotName===e.slotName&&o.before===e.before&&o.after===e.after;function $t(o){const e=()=>{for(const t of o)t?.isConnected&&t.hasAttribute("slot")&&t.parentElement?.localName!=="grid-plate"&&t.removeAttribute("slot")};e(),setTimeout(e,150),setTimeout(e,600)}function Ft(o,e){e.before?e.before.before(o):e.after?e.after.after(o):e.container.append(o),e.slotName?o.setAttribute("slot",e.slotName):$t([o])}async function Ct(o,e,{tag:t,content:r="",properties:i={}}){const a=o.activeHaxBody,n=new Set(e.container.children),l=new Set(a.children);let d=e.after;!d&&!e.nested&&(d=[...a.children].find(p=>p.localName==="page-break")),d||(d=e.before||e.container),a.__addAbove=!1,a.haxInsert(t,r,i,d),await new Promise(p=>requestAnimationFrame(()=>requestAnimationFrame(p)));const c=[...e.container.children].find(p=>!n.has(p))||[...a.children].find(p=>!l.has(p));return c?(e.nested&&(!e.after||c.parentElement!==e.container)&&Ft(c,e),c):null}const Et=o=>s`<span class="icon" aria-hidden="true" style="--src:url(&quot;${E[`oer:${o}`]||""}&quot;)"></span>`,Zi=["contenteditable","data-hax-active","data-hax-ray","draggable","id"];let Ne=class extends F{static get tag(){return"oer-settings-dialog"}static get properties(){return{mode:{type:String,reflect:!0},_title:{state:!0}}}constructor(){super(),this.mode=null,this._title="",this.__keys=e=>{this.mode&&e.key==="Escape"&&!e.defaultPrevented&&(e.preventDefault(),e.stopPropagation(),this.close())},this.__place=()=>{this.mode&&(this.__raf=requestAnimationFrame(this.__place),this._placeTray())}}get _hax(){return globalThis.HaxStore?.requestAvailability?.()}open(e="settings"){const t=this._hax,r=t?.activeNode;if(!(e==="settings"&&!r)){if(this.__returnFocus=globalThis.document.activeElement,this.__node=e==="settings"?r:null,e==="settings"){const i=t.haxSchemaFromTag?.(r.localName);this._title=`${i?.gizmo?.title||r.localName} settings`}else this._title="HTML source";this.mode=e,wi(e==="source"?"view-source":"content-edit"),t?.haxTray?.setAttribute("data-oer-dialog",e),globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>{this._refreshPreview(),this._watch(),this.__place(),this.shadowRoot.querySelector(".close")?.focus()})}}close(){if(!this.mode)return;this.mode=null,cancelAnimationFrame(this.__raf),this.__observer?.disconnect(),globalThis.removeEventListener("keydown",this.__keys,!0),this._hax?.haxTray?.removeAttribute("data-oer-dialog");const e=this.__node;this.__node=null,(e?.isConnected?e:this.__returnFocus)?.focus?.()}_placeTray(){const e=this._hax?.haxTray,t=this.shadowRoot.querySelector(".form");if(!e||!t)return;const r=t.getBoundingClientRect(),i=`${r.top}|${r.left}|${r.width}|${r.height}`;i!==this.__trayKey&&(this.__trayKey=i,e.style.setProperty("--oer-tray-top",`${r.top}px`),e.style.setProperty("--oer-tray-left",`${r.left}px`),e.style.setProperty("--oer-tray-width",`${r.width}px`),e.style.setProperty("--oer-tray-height",`${r.height}px`))}_watch(){this.__observer?.disconnect();const e=this.__node;e&&(this.__observer=new MutationObserver(()=>{cancelAnimationFrame(this.__previewRaf),this.__previewRaf=requestAnimationFrame(()=>this._refreshPreview())}),this.__observer.observe(e,{attributes:!0,childList:!0,subtree:!0,characterData:!0}))}_refreshPreview(){const e=this.querySelector("[slot='preview']"),t=this.__node;if(!e||!t?.isConnected)return;const r=t.cloneNode(!0);for(const a of[r,...r.querySelectorAll("*")])for(const n of Zi)a.removeAttribute(n);e.replaceChildren(r);const i=getComputedStyle(t);for(const a of["font-family","font-size","line-height","color"])e.style.setProperty(a,i.getPropertyValue(a))}static get styles(){return f`
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
          ${Et(this.mode==="source"?"code":"sliders-horizontal")}
          <h2 id="title">${this._title}</h2>
          <button class="close" aria-label="Close" title="Close (Esc)" @click="${this.close}">${Et("x")}</button>
        </header>
        <div class="body">
          <div class="preview" aria-label="Preview">
            <p class="preview-label">Preview</p>
            <div class="stage" inert><slot name="preview"></slot></div>
          </div>
          <div class="form"></div>
        </div>
      </div>
    `}};customElements.define(Ne.tag,Ne);function Mt(){const o=globalThis.document;let e=o.querySelector(Ne.tag);if(!e){e=o.createElement(Ne.tag);const t=o.createElement("div");t.slot="preview",e.append(t),o.body.append(e)}return e}const At=o=>o?.localName==="grid-plate";function St(o,e,{self:t=!0}={}){let r=t?e:e?.parentElement;for(;r&&r!==o;){if(At(r))return r;r=r.parentElement}return null}const zt=o=>typeof o?.layout=="string"?o.layout.split("-").length:1;function Qi(o){return[...o.shadowRoot?.querySelectorAll("[id^='col']")||[]].slice(0,zt(o)).map(e=>e.getBoundingClientRect()).filter(e=>e.width>0)}function eo(o){const e=o?.layouts||globalThis.document.createElement("grid-plate").layouts||{};return Object.entries(e).map(([t,r])=>({key:t,label:(r.columnLayout||t).replace(/^\d+:\s*/,""),ratios:t.split("-").map(Number)}))}const to=()=>new Promise(o=>requestAnimationFrame(()=>requestAnimationFrame(o)));function ro(o,e){const t=e.split("-").length,r=`col-${t}`;for(const i of[...o.children])Number((i.getAttribute("slot")||"col-1").replace("col-",""))>t&&i.setAttribute("slot",r);o.layout=e}async function io(o,e,t){const r=o.activeHaxBody,i=e.parentElement,a=new Set(i.children);r.__addAbove=!1,r.haxInsert("grid-plate","",{layout:t},e),await to();const n=[...i.children].find(l=>!a.has(l)&&l.localName==="grid-plate");return n?(n.append(e),e.setAttribute("slot","col-1"),n):null}function oo(o){const e=At(o.parentElement)?o.getAttribute("slot"):null,t=i=>Number((i.getAttribute("slot")||"col-1").replace("col-","")),r=[...o.children].sort((i,a)=>t(i)-t(a));for(const i of r)o.before(i),e?i.setAttribute("slot",e):i.removeAttribute("slot");return o.remove(),e||$t(r),r[0]||null}const ie=o=>s`<span class="icon" aria-hidden="true" style="--src:url(&quot;${E[`oer:${o}`]||""}&quot;)"></span>`,ao=4,Ue=48;let Tt=class extends F{static get tag(){return"oer-block-frame"}static get properties(){return{_label:{state:!0},_drag:{state:!0},_layout:{state:!0},_guides:{state:!0},_menu:{state:!0}}}constructor(){super(),this._label="",this._drag=null,this._layout=null,this._guides=[],this._menu=!1,this.__outside=e=>{this._menu&&!e.composedPath().includes(this)&&(this._menu=!1)},this.__tick=this._tick.bind(this),this.__keys=e=>{if(this._menu&&e.key==="Escape"){e.preventDefault(),e.stopPropagation(),this._menu=!1;return}this._drag&&e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),this._endDrag(!1))}}connectedCallback(){super.connectedCallback(),this.hidden=!0,this.__raf=requestAnimationFrame(this.__tick),globalThis.addEventListener("keydown",this.__keys,!0),globalThis.addEventListener("pointerdown",this.__outside,!0)}disconnectedCallback(){globalThis.removeEventListener("pointerdown",this.__outside,!0),cancelAnimationFrame(this.__raf),globalThis.removeEventListener("keydown",this.__keys,!0),super.disconnectedCallback()}get _hax(){return globalThis.HaxStore?.requestAvailability?.()}_tick(){this.__raf=requestAnimationFrame(this.__tick);const e=this._hax,t=B.editMode?e?.activeNode:null;if(!t||!t.isConnected||t.localName==="page-break"){this.hidden=!0,this.__node=null,this._menu=!1;return}if(t!==this.__node){this.__node=t,this._menu=!1,this._layout=St(e.activeHaxBody,t);const d=e.haxSchemaFromTag?.(t.localName);this._label=d?.gizmo?.title||t.localName}const r=yt(t),i=Te();if((r.bottom<i.top||r.top>i.bottom||r.block.width===0)&&!this._drag){this.hidden=!0;return}this.hidden=!1;const a=this.style;a.setProperty("--top",`${Math.round(r.top)}px`),a.setProperty("--left",`${Math.round(r.left)}px`),a.setProperty("--width",`${Math.round(r.right-r.left)}px`),a.setProperty("--height",`${Math.round(r.height)}px`);const n=Math.max(r.top,i.top),l=Math.min(r.bottom,i.bottom);a.setProperty("--grip",`${Math.round((n+l)/2-r.top)}px`),this.toggleAttribute("compact",r.compact),this._updateGuides(),this._drag&&this._dragFrame()}_updateGuides(){const e=this._hax?.activeHaxBody,t=this._drag?[...e?.querySelectorAll("grid-plate")||[]]:this._layout?.isConnected?[this._layout]:[],r=n=>({top:Math.round(n.top),left:Math.round(n.left),width:Math.round(n.width),height:Math.round(n.height)}),i=t.filter(n=>n.getClientRects().length).map(n=>{const l=r(n.getBoundingClientRect()),d=Qi(n).map(r),c=[];for(let p=1;p<d.length;p++){const h=d[p-1],m=d[p];m.left>=h.left+h.width-1?c.push({left:Math.round((h.left+h.width+m.left)/2),top:l.top,width:0,height:l.height}):c.push({left:l.left,top:Math.round((h.top+h.height+m.top)/2),width:l.width,height:0})}return{...l,count:zt(n),cols:d,dividers:c}}),a=JSON.stringify(i);a!==this.__guideKey&&(this.__guideKey=a,this._guides=i)}_currentLayout(){const e=this._hax,t=e?.activeNode;return t?St(e.activeHaxBody,t):null}_selectLayout(){const e=this._hax,t=this._currentLayout();e&&t&&(e.activeNode=t),this._menu=!1}async _chooseLayout(e){const t=this._hax,r=t?.activeNode;if(this._menu=!1,!t||!r)return;const i=this._currentLayout();i?ro(i,e):await io(t,r,e)&&(this.__node=null,t.activeNode=r)}_removeLayout(){const e=this._hax,t=this._currentLayout();if(this._menu=!1,!e||!t)return;const r=e.activeNode===t?null:e.activeNode,i=oo(t);this.__node=null,e.activeNode=r||i}_move(e){bi(e==="up"?"hax-plate-up":"hax-plate-down")}_gripKeys(e){(e.key==="ArrowUp"||e.key==="ArrowDown")&&(e.preventDefault(),this._move(e.key==="ArrowUp"?"up":"down"))}_pointerDown(e){if(e.button===0){e.preventDefault();try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}this.__press={x:e.clientX,y:e.clientY,id:e.pointerId}}}_pointerMove(e){if(!this.__press)return;const t=Math.hypot(e.clientX-this.__press.x,e.clientY-this.__press.y);!this._drag&&t<ao||(this._drag||(globalThis.__oerDragging=!0),this._drag={...this._drag||{},x:e.clientX,y:e.clientY})}_pointerUp(e){if(this.__press){this.__press=null;try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}this._drag&&this._endDrag(!0)}}_dragFrame(){const e=this._drag,t=Te(),r=globalThis.document.querySelector("custom-oer-docs-theme")?.shadowRoot?.querySelector("main");r&&(e.y<t.top+Ue?r.scrollTop-=Math.ceil((t.top+Ue-e.y)/4):e.y>t.bottom-Ue&&(r.scrollTop+=Math.ceil((e.y-t.bottom+Ue)/4)));const i=this.__node,a=He(this._hax?.activeHaxBody).filter(d=>!i.contains(d.container)),n=Ji(a,e.x,e.y),l=!!n&&n.before!==i&&n.after!==i;(!S2(n,e.slot)||l!==e.valid||!e.rect||e.rect.top!==Math.round(n?.top))&&(this._drag={...e,slot:n,valid:l,rect:n&&{top:Math.round(n.top),left:Math.round(n.left),width:Math.round(n.width),height:Math.round(n.height)}})}_endDrag(e){const t=this._drag;this._drag=null,globalThis.__oerDragging=!1;const r=this.__node;if(!e||!t?.slot||!t.valid||!r)return;Ft(r,t.slot);const i=this._hax;i&&(i.activeNode=r),r.scrollIntoView?.({block:"nearest"})}static get styles(){return f`
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
        left: calc(var(--left) - ${Oe}px + 2px);
        width: ${Oe}px;
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
        width: ${Oe}px;
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
        @click="${()=>{this._menu=!1,Mt().open("settings")}}"
      >
        ${ie("sliders-horizontal")}
      </button>
      <button
        class="lay"
        title="Layout"
        aria-label="Layout options"
        aria-haspopup="menu"
        aria-expanded="${this._menu?"true":"false"}"
        @click="${()=>this._menu=!this._menu}"
      >
        ${ie("columns-2")}
      </button>
      ${e?s`<button class="crumb" title="Select the column layout" @click="${this._selectLayout}">Columns</button>
            <span class="sep" aria-hidden="true">${ie("chevron-right")}</span>`:""}
      <span>${this._label}</span>
    </div>`}_renderMenu(){const e=this._layout,t=eo(e).filter(r=>e||r.key!=="1");return s`<div class="menu" role="menu" aria-label="Layout" @mousedown="${r=>r.preventDefault()}">
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
            ${e!==this.__node?s`<button class="item" role="menuitem" @click="${this._selectLayout}">${ie("box")} Select layout</button>`:""}
            <button class="item" role="menuitem" @click="${this._removeLayout}">${ie("panel-right-close")} Remove layout, keep blocks</button>`:""}
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
        <button class="step" title="Move up" aria-label="Move block up" @click="${()=>this._move("up")}">${ie("chevron-up")}</button>
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
          ${ie("grip-vertical")}
        </button>
        <button class="step" title="Move down" aria-label="Move block down" @click="${()=>this._move("down")}">${ie("chevron-down")}</button>
      </div>
      ${e?.valid&&e.rect?s`<div class="drop" style="top:${e.rect.top}px;left:${e.rect.left}px;width:${e.rect.width}px;height:${e.rect.height}px"></div>`:""}
      ${e?s`<div class="ghost" style="left:${e.x}px;top:${e.y}px">${this._label}</div>`:""}
    `}};customElements.define(Tt.tag,Tt);const X={sep:!0};function z2(o,e=[]){if(!o)return e;for(const t of o.querySelectorAll("*"))e.push(t),t.shadowRoot&&z2(t.shadowRoot,e);return e}function no(o){if(!o)return null;if(o.localName==="button")return o;const e=[o.shadowRoot];for(;e.length;){const t=e.shift();if(!t)continue;const r=t.querySelector("button");if(r)return r;for(const i of t.querySelectorAll("*"))e.push(i.shadowRoot)}return null}const jt=o=>o&&!o.hidden&&getComputedStyle(o).display!=="none",te=o=>e=>e.find(t=>t.getAttribute?.("event-name")===o),z=(o,e)=>t=>t.find(r=>r.command===o&&(!e||r.label===e)),so=[{label:"Move up",icon:"arrow-up",find:te("hax-plate-up")},{label:"Move down",icon:"arrow-down",find:te("hax-plate-down")},X,{label:"Insert block above\u2026",icon:"arrow-up-to-line",find:te("insert-above-active"),insert:"above"},{label:"Insert block below\u2026",icon:"arrow-down-to-line",find:te("insert-below-active"),insert:"below"},{label:"Duplicate",icon:"copy",find:te("hax-plate-duplicate")},X,{label:"Add column",icon:"columns-2",find:te("hax-plate-create-right")},{label:"Remove column",icon:"panel-right-close",find:te("hax-plate-remove-right")},X,{label:"Edit HTML",icon:"code",find:te("hax-source-view-toggle")},{label:o=>o.label||"Lock",icon:o=>o.icon==="icons:lock"?"lock":"lock-open",find:o=>o.find(e=>e.localName==="hax-context-item"&&/lock/.test(e.icon||""))},X,{label:"Remove block",icon:"trash-2",danger:!0,find:te("hax-plate-delete")}],lo={p:"pilcrow",h2:"heading-2",h3:"heading-3",h4:"heading-4",h5:"heading-5",h6:"heading-6",blockquote:"quote",pre:"square-code"},co={pre:"Code block",blockquote:"Quote"},po=[{picker:"hax-text-editor-heading-picker",icons:lo,labels:co,checked:"tag"},X,{label:"Bulleted list",icon:"list",find:z("ul")},{label:"Numbered list",icon:"list-ordered",find:z("ol")},{label:"Indent",icon:"indent-increase",find:z("indent"),shortcut:`${W}]`,needs:"In lists"},{label:"Outdent",icon:"indent-decrease",find:z("outdent"),shortcut:`${W}[`,needs:"In lists"},X,{picker:"hax-text-editor-alignment-picker",icons:{"":"align-left",center:"align-center",right:"align-right"},labels:{"":"Align left",center:"Align center",right:"Align right"},checked:"align"}],ho=[{label:"Bold",icon:"bold",find:z("bold"),shortcut:`${W}B`,toggle:!0},{label:"Italic",icon:"italic",find:z("italic"),shortcut:`${W}I`,toggle:!0},{label:"Underline",icon:"underline",find:z("underline"),shortcut:`${W}U`,toggle:!0,selection:!0},{label:"Strikethrough",icon:"strikethrough",find:z("strikeThrough"),toggle:!0,selection:!0},{label:"Highlight",icon:"highlighter",find:z("wrapRange","Highlight"),toggle:!0,selection:!0},{label:"Inline code",icon:"code",find:z("wrapRange","Code"),toggle:!0,selection:!0},{label:"Subscript",icon:"subscript",find:z("subscript"),toggle:!0},{label:"Superscript",icon:"superscript",find:z("superscript"),toggle:!0},{label:"Abbreviation",icon:"whole-word",find:z("wrapRange","Abbreviation"),selection:!0},X,{label:"Link",icon:"link",find:z("createLink"),shortcut:`${W}K`},{label:"Remove link",icon:"unlink",find:z("unlink")},X,{label:"Clear formatting",icon:"remove-formatting",find:z("removeFormat")}],mo=[{label:"Symbol\u2026",icon:"omega",grid:"rich-text-editor-symbol-picker"},{label:"Emoji\u2026",icon:"smile",grid:"rich-text-editor-emoji-picker",filter:!0},X,{label:"Math",icon:"sigma",find:z("insertHTML","Math")},{label:"Vocabulary",icon:"book-a",find:z("insertHTML","Vocab"),selection:!0},{label:"Inline audio",icon:"audio-lines",find:z("insertHTML","Inline audio"),selection:!0},{label:"Sarcasm",icon:"message-square-quote",find:z("insertHTML","Sarcasm"),selection:!0}],uo=[{id:"block",label:"Block",icon:"box",source:"plate",items:so},{id:"text",label:"Text",icon:"pilcrow",source:"text",items:po},{id:"format",label:"Format",icon:"type",source:"text",items:ho},{id:"insert",label:"Insert inline",icon:"smile-plus",source:"text",items:mo}],Ve=o=>s`<span
    class="icon"
    aria-hidden="true"
    style="--src:url(&quot;${E[`oer:${o}`]||""}&quot;)"
  ></span>`,Bt=globalThis.document.createElement("textarea"),go=o=>(Bt.innerHTML=o,Bt.value);let It=class extends F{static get tag(){return"oer-block-rail"}static get properties(){return{_cats:{state:!0},_open:{state:!0},_grid:{state:!0},_query:{state:!0}}}constructor(){super(),this._cats=[],this._open=null,this._grid=null,this._query="",this.__tick=this._tick.bind(this),this.__keys=this._globalKeys.bind(this),this.__outside=e=>{this._open&&!e.composedPath().includes(this)&&this._close()}}connectedCallback(){super.connectedCallback(),this.hidden=!0,this.__raf=requestAnimationFrame(this.__tick),globalThis.addEventListener("keydown",this.__keys,!0),globalThis.addEventListener("pointerdown",this.__outside,!0)}disconnectedCallback(){cancelAnimationFrame(this.__raf),globalThis.removeEventListener("keydown",this.__keys,!0),globalThis.removeEventListener("pointerdown",this.__outside,!0),super.disconnectedCallback()}get _hax(){return globalThis.HaxStore?.requestAvailability?.()}_stock(){const e=this._hax?.activeHaxBody?.shadowRoot,t=e?.querySelector("hax-plate-context"),r=e?.querySelector("hax-text-editor-toolbar");return{plate:t,text:jt(r)?r:null}}_tick(){this.__raf=requestAnimationFrame(this.__tick);const e=B.editMode?this._hax?.activeNode:null;if(!e||!e.isConnected||e.localName==="page-break"){this.hidden||this._hide();return}const t=e.getBoundingClientRect(),r=this._stock(),i=`${e.localName}|${!!r.plate}|${!!r.text}`;(e!==this.__node||i!==this.__key)&&(e!==this.__node&&this._close(),this.__node=e,this.__key=i,this._cats=uo.filter(u=>r[u.source]));const a=this.shadowRoot?.querySelector(".rail"),n=a?.offsetHeight||0,l=Te(),d=l.top+8,c=yt(e);let p=c.top;if(p<d&&(p=Math.max(Math.min(d,c.bottom-n),c.top)),(c.bottom<d||c.top>l.bottom||t.width===0)&&!this._open){this.hidden=!0;return}this.hidden=!1;const h=this._hax?.activeHaxBody?.getBoundingClientRect().left??c.left,m=Math.min(c.left,h-4-6),g=Math.round(m-Oe-8-(a?.offsetWidth||42));this.style.transform=`translate(${g}px, ${Math.round(p)}px)`}_hide(){this._close(),this.hidden=!0,this.__node=null}_items(e){const t=this._stock()[e.source];if(!t)return[];const r=[t,...z2(t),...z2(t.shadowRoot)],i=[];for(const a of e.items){if(a.sep){i.length&&!i[i.length-1].sep&&i.push(X);continue}if(a.picker){const c=r.find(h=>h.localName===a.picker);if(!c)continue;const p=this._pickerCurrent(a);for(const h of(c.options||[]).flat())!h||h.value===null||h.value===void 0||i.push({label:a.labels?.[h.value]||h.alt,icon:a.icons?.[h.value]||"pilcrow",checked:p===h.value,run:()=>c._pickerChange?.({detail:{value:h.value}})});continue}if(a.grid){const c=r.find(p=>p.localName===a.grid);if(!c)continue;i.push({label:a.label,icon:a.icon,submenu:!0,run:()=>this._openGrid(a,c)});continue}const n=a.find(r);if(!n)continue;const l=jt(n),d=a.needs||(a.selection?"Select text":"");!l&&!d||i.push({label:typeof a.label=="function"?a.label(n):a.label,icon:typeof a.icon=="function"?a.icon(n):a.icon,shortcut:a.shortcut,danger:a.danger,disabled:!l,hint:l?"":d,pressed:a.toggle&&l?!!n.toggled:void 0,run:a.insert?()=>globalThis.document.querySelector("oer-block-inserter")?.openFor(this._hax.activeNode,a.insert):()=>no(n)?.click()})}for(;i.length&&i[i.length-1].sep;)i.pop();return i}_pickerCurrent(e){const t=this._hax?.activeNode;if(t){if(e.checked==="tag")return t.localName;if(e.checked==="align"){const r=t.style?.textAlign||"";return r==="left"?"":r}}}_toggle(e,t){if(this._open?.id===e.id&&!this._grid){this._close();return}this._grid=null,this._query="",this._open={...e,items:this._items(e),y:t?.currentTarget?.offsetTop??0}}_close(e=!1){const t=this._open?.id;this._open=null,this._grid=null,this._query="",e&&t&&this.updateComplete.then(()=>this.shadowRoot.querySelector(`[data-cat="${t}"]`)?.focus())}_openGrid(e,t){const r=(t.shadowRoot?.querySelector("simple-symbol-picker, simple-emoji-picker, simple-picker")?.options||[]).flat().filter(i=>i&&i.value);this._grid={label:e.label.replace("\u2026",""),filter:e.filter,options:r,el:t},this.updateComplete.then(()=>{this.shadowRoot.querySelector(".grid input, .grid button")?.focus()})}_run(e){if(!(e.disabled||e.sep)){if(e.submenu){e.run();return}e.run(),this._close()}}_insertGlyph(e){this._grid.el._pickerChange?.({detail:{value:e.value}}),this._close()}_globalKeys(e){this.hidden||e.altKey&&e.key==="F10"&&(e.preventDefault(),e.stopPropagation(),this.shadowRoot.querySelector(".rail button")?.focus())}_railKeys(e){const t=[...this.shadowRoot.querySelectorAll(".rail button")],r=t.indexOf(this.shadowRoot.activeElement),i=a=>t[(r+a+t.length)%t.length]?.focus();if(e.key==="ArrowDown")i(1);else if(e.key==="ArrowUp")i(-1);else if(e.key==="Home")t[0]?.focus();else if(e.key==="End")t[t.length-1]?.focus();else if(e.key==="ArrowRight"){const a=this._cats[r];a&&this._open?.id!==a.id&&this._toggle(a,{currentTarget:t[r]}),this._focusMenu()}else if(e.key==="Escape")this._open?this._close():this._hax?.activeNode?.focus?.();else return;e.preventDefault()}_focusMenu(){this.updateComplete.then(()=>this.shadowRoot.querySelector(".menu [role^=menuitem]:not([aria-disabled=true])")?.focus())}_menuKeys(e){const t=[...this.shadowRoot.querySelectorAll(".menu [role^=menuitem]")],r=t.indexOf(this.shadowRoot.activeElement),i=a=>t[(r+a+t.length)%t.length]?.focus();if(e.key==="ArrowDown")i(1);else if(e.key==="ArrowUp")i(-1);else if(e.key==="Home")t[0]?.focus();else if(e.key==="End")t[t.length-1]?.focus();else if(e.key==="Escape"||e.key==="ArrowLeft")this._close(!0);else if(e.key==="Tab")this._close();else return;e.preventDefault()}_gridKeys(e){const t=[...this.shadowRoot.querySelectorAll(".cells button")],r=t.indexOf(this.shadowRoot.activeElement),i=8,a=n=>{e.preventDefault(),t[Math.max(0,Math.min(t.length-1,n))]?.focus()};e.key==="Escape"?(e.preventDefault(),this._grid=null,this._focusMenu()):r<0?e.key==="ArrowDown"&&a(0):e.key==="ArrowRight"?a(r+1):e.key==="ArrowLeft"?a(r-1):e.key==="ArrowDown"?a(r+i):e.key==="ArrowUp"&&(r<i?(e.preventDefault(),this.shadowRoot.querySelector(".grid input")?.focus()):a(r-i))}_keepSelection(e){e.target.closest?.("input")||e.preventDefault()}updated(){const e=this.shadowRoot.querySelector(".menu");if(!e)return;const t=e.getBoundingClientRect().bottom-(globalThis.innerHeight-8);t>0&&(e.style.top=`${Math.max(e.offsetTop-t,8-this.getBoundingClientRect().top)}px`)}static get styles(){return f`
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
      ${Ve(e.icon)}
      <span class="text">${e.label}</span>
      ${e.hint?s`<span class="end">${e.hint}</span>`:e.shortcut?s`<span class="end">${e.shortcut}</span>`:""}
      ${r?s`<span class="check">${Ve("check")}</span>`:""}
      ${e.submenu?Ve("chevron-right"):""}
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
        ${r.map(i=>{const a=go(i.value),n=i.description||a;return s`<button title="${n}" aria-label="${n}" @click="${()=>this._insertGlyph(i)}">${a}</button>`})}
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
              ${Ve(t.icon)}
            </button>`)}
        </div>
        ${e&&this._grid?this._renderGrid():e?s`<div class="menu" role="menu" aria-label="${e.label}" style="top:${e.y}px" @keydown="${this._menuKeys}">
                <div class="label">${e.label}</div>
                ${e.items.map(t=>this._renderItem(t))}
              </div>`:""}
      </div>
    `}};customElements.define(It.tag,It);const Ke=288,T2=288,Lt=o=>s`<span class="icon" aria-hidden="true" style="--src:url(&quot;${E[`oer:${o}`]||""}&quot;)"></span>`;let qt=class extends F{static get tag(){return"oer-block-inserter"}static get properties(){return{_hover:{state:!0},_end:{state:!0},_open:{state:!0},_query:{state:!0},_active:{state:!0}}}constructor(){super(),this._hover=null,this._end=null,this._open=null,this._query="",this._active=0,this.__tick=this._tick.bind(this),this.__move=e=>{this.__pointer={x:e.clientX,y:e.clientY}},this.__outside=e=>{this._open&&!e.composedPath().includes(this)&&this.close()}}connectedCallback(){super.connectedCallback(),this.__raf=requestAnimationFrame(this.__tick),globalThis.addEventListener("pointermove",this.__move,{passive:!0}),globalThis.addEventListener("pointerdown",this.__outside,!0)}disconnectedCallback(){cancelAnimationFrame(this.__raf),globalThis.removeEventListener("pointermove",this.__move),globalThis.removeEventListener("pointerdown",this.__outside,!0),super.disconnectedCallback()}get _hax(){return globalThis.HaxStore?.requestAvailability?.()}_blocks(){const e=this._hax?.activeHaxBody;return e?[...e.children].filter(t=>t.localName!=="page-break"&&t.getClientRects().length):[]}_tick(){this.__raf=requestAnimationFrame(this.__tick);const e=B.editMode?this._hax?.activeHaxBody:null;if(!e||!e.isConnected){(this._hover||this._end||this._open)&&(this._hover=this._end=null,this.close());return}const t=e.getBoundingClientRect(),r=Te(),i=c=>c>r.top+4&&c<r.bottom-4,a=this._blocks().map(c=>c.getBoundingClientRect()),n=a.length?a[a.length-1].bottom:t.top;let l={y:Math.round(n+8),left:Math.round(t.left),width:Math.round(t.width)};(!i(l.y)||!i(l.y+36))&&(l=null),!(l&&this._end&&this._end.y===l.y&&this._end.left===l.left&&this._end.width===l.width)&&(l||this._end)&&(this._end=l);let d=null;if(!globalThis.__oerDragging){const c=He(e).filter(p=>!p.end);if(this._open)this._open.slot.end||(d=c.find(p=>S2(p,this._open.slot))||null);else if(this.__pointer){const p=_t(c,this.__pointer.x,this.__pointer.y,{gutter:72});p&&i(p.top+p.height/2)&&(d=p)}}d&&(d={...d,top:Math.round(d.top),height:Math.round(d.height),left:Math.round(d.left),width:Math.round(d.width)}),!(d&&this._hover&&S2(d,this._hover)&&["top","height","left","width"].every(c=>d[c]===this._hover[c]))&&(d||this._hover)&&(this._hover=d)}openAt(e,t){this._query="",this._active=0,this._open={slot:e,x:t.x,y:t.y},this.updateComplete.then(()=>this.shadowRoot.querySelector(".panel input")?.focus())}_endSlot(){return He(this._hax?.activeHaxBody).find(e=>e.end)}openFor(e,t){const r=He(this._hax?.activeHaxBody).find(a=>t==="below"?a.after===e:a.before===e);if(!r)return;const i=e.getBoundingClientRect();this.openAt(r,{x:i.left+12,y:t==="below"?i.bottom:i.top})}close(){this._open&&(this._open=null)}_gizmos(){const e=this._hax,t=e?.haxTray?.shadowRoot?.querySelector("hax-gizmo-browser"),r=h=>t?._gizmoAllowedInTray?t._gizmoAllowedInTray(h):!!h?.tag,i=(e?.gizmoList||[]).filter(r),a=e?.platformAllows?.("blockTemplates")===!1?[]:(e?.staxList||[]).filter(h=>h?.stax?.length).map(h=>({stax:h.stax,title:h.details?.title||"Template",description:h.details?.description||"",image:h.details?.image||"",icon:h.details?.icon||"hax:templates",tags:h.details?.tags||[]})),n=this._query.trim().toLowerCase();if(n){const h=m=>[m.title,m.tag,m.description,...m.tags||[]].join(" ").toLowerCase().includes(n);return[{label:"Blocks",items:i.filter(h)},{label:"Templates",items:a.filter(h)}].filter(m=>m.items.length)}const l=[],d=(t?.recentGizmoList||[]).filter(r).slice().reverse();d.length&&l.push({label:"Recent",items:d});const c=(t?.popularGizmoList||[]).filter(r);c.length&&l.push({label:"Popular",items:c});const p=t?.updateCategories?t.updateCategories(i):[];for(const h of p){const m=i.filter(g=>(g.tags?.[0]||"Other")===h).sort((g,u)=>g.title.localeCompare(u.title));m.length&&l.push({label:h,items:m})}return a.length&&l.push({label:"Templates",items:a}),l}async _insert(e){const t=this._hax;if(!t?.activeHaxBody||!e||!this._open)return;const r=this._open.slot;this.close();let i=null;if(e.stax){let a=r;for(const n of e.stax){const l=await Ct(t,a,n);if(!l)break;i=i||l,a={...r,after:l,before:null}}}else{const a=t.haxSchemaFromTag(e.tag),n=a?.demoSchema?.[0]||t.haxElementPrototype({tag:e.tag},{},"");t.recentGizmoList?.push?.(a?.gizmo||e),i=await Ct(t,r,n)}i&&(t.activeNode=i,i.focus?.(),i.scrollIntoView?.({block:"nearest"}))}_flat(){return this._gizmos().flatMap(e=>e.items)}_panelKeys(e){const t=this._flat();if(e.key==="ArrowDown")this._active=Math.min(this._active+1,t.length-1);else if(e.key==="ArrowUp")this._active=Math.max(this._active-1,0);else if(e.key==="Home"&&e.target.localName!=="input")this._active=0;else if(e.key==="End"&&e.target.localName!=="input")this._active=t.length-1;else if(e.key==="Enter")this._insert(t[this._active]);else if(e.key==="Escape")this.close();else return;e.preventDefault(),this.updateComplete.then(()=>this.shadowRoot.querySelector(`[data-i="${this._active}"]`)?.scrollIntoView({block:"nearest"}))}static get styles(){return f`
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
        width: ${Ke}px;
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
        width: ${T2}px;
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
    `}_renderPanel(){const e=this._open,t=this._gizmos(),r=t.flatMap(p=>p.items),i=r[Math.min(this._active,r.length-1)],a=globalThis.innerWidth,n=Math.max(8,Math.min(e.x+16,a-Ke-8)),l=Math.max(8,e.y-20),d=n+Ke+8+T2<=a-8?n+Ke+8:n-T2-8;let c=-1;return s`
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
                      @mousedown="${g=>g.preventDefault()}"
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
            <span class="plus">${Lt("plus")}</span>
          </button>`:""}
      ${t?s`<button
            class="end ${this._open?.slot.end?"chosen":""}"
            style="left:${t.left}px;top:${t.y}px;width:${t.width}px"
            aria-haspopup="listbox"
            @click="${()=>{const r=this._endSlot();r&&this.openAt(r,{x:t.left,y:t.y})}}"
          >
            ${Lt("plus")} Add block
          </button>`:""}
      ${this._open?this._renderPanel():""}
    `}};customElements.define(qt.tag,qt);let Rt=!1;function vo(){Rt||(Rt=!0,Zr(),ii(),ai(),f2(li),xi(),ki(),_i(),Yi(),new MutationObserver(Pt).observe(globalThis.document.body,{childList:!0}),Pt())}function Pt(){const o=globalThis.document,e=o.querySelector("haxcms-site-editor-ui");if(e){if(!e.hasAttribute("data-oer-hidden")){e.setAttribute("data-oer-hidden",""),e.setAttribute("aria-hidden","true"),e.inert=!0;for(const[t,r]of[["height","0"],["min-height","0"],["overflow","hidden"],["opacity","0"],["pointer-events","none"]])e.style.setProperty(t,r,"important")}for(const t of["oer-block-frame","oer-block-rail","oer-block-inserter"])o.querySelector(t)||o.body.append(o.createElement(t))}else o.querySelector("oer-block-frame")?.remove(),o.querySelector("oer-block-rail")?.remove(),o.querySelector("oer-block-inserter")?.remove()}const Ot={sm:560,md:720,lg:960,xl:1200};let Ht=!1;function fo(){Ht||(Ht=!0,globalThis.addEventListener("responsive-element",o=>{o.detail?.element?.localName==="grid-plate"&&Object.assign(o.detail,Ot)},{capture:!0}),customElements.whenDefined("grid-plate").then(()=>{for(const o of globalThis.document.querySelectorAll("grid-plate"))o.hasUpdated&&globalThis.dispatchEvent(new CustomEvent("responsive-element",{detail:{element:o,attribute:"responsive-size",relativeToParent:!1,...Ot}}))}))}const Nt="oer-site-nav-open",Ut=o=>s`<span class="lucide" aria-hidden="true" style="--src:url(&quot;${E[o]||""}&quot;)"></span>`;function bo(){try{return new Set(JSON.parse(globalThis.localStorage.getItem(Nt)||"[]"))}catch{return new Set}}let Vt=class extends F{static get tag(){return"oer-site-nav"}static get properties(){return{editable:{type:Boolean,reflect:!0},root:{type:String},filter:{type:String},_items:{state:!0},_activeId:{state:!0},_open:{state:!0},_adding:{state:!0},_addType:{state:!0}}}constructor(){super(),this.editable=!1,this._items=[],this._activeId=null,this._open=bo(),this._adding=null,this.__disposers=[]}connectedCallback(){super.connectedCallback(),this.__disposers.push(O(()=>{const e=!!D.isLoggedIn,t=(_(D.manifest?.items)||[]).filter(i=>e||i.metadata?.published!==!1),r=_(D.activeId);Promise.resolve().then(()=>{if(this._all=t,this._items=t.filter(i=>!i.metadata?.hideInMenu||me(i)),r!==this._activeId){this._activeId=r;const i=new Set(this._open);for(const a of nt(t,r))i.add(a);this._setOpen(i)}})}))}disconnectedCallback(){for(const e of this.__disposers)e?.();this.__disposers=[],super.disconnectedCallback()}_setOpen(e){this._open=e;try{globalThis.localStorage.setItem(Nt,JSON.stringify([...e]))}catch{}}_toggle(e){const t=new Set(this._open);t.has(e)?t.delete(e):t.add(e),this._setOpen(t)}_choices(e){const t=this._all||[],r=e?t.find(l=>l.id===e)?.metadata?.pageType:null,i=ct(r||null,t),a=r&&T(t).types.find(l=>l.id===r),n=!!a&&Array.isArray(a.children);return{types:i,untyped:!n}}_startAdd(e){const{types:t,untyped:r}=this._choices(e);this._addType=r?"":t[0]?.id||"",this._adding=e??"root",this.updateComplete.then(()=>this.shadowRoot.querySelector(".add-input")?.focus())}_addKeys(e,t){if(e.key==="Enter"){e.preventDefault();const r=(this.shadowRoot.querySelector(".add-input")?.value||"").trim();if(!r){this.shadowRoot.querySelector(".add-input")?.focus();return}this._adding=null,r&&Fi(r,t,this._addType)}else e.key==="Escape"&&(e.preventDefault(),this._adding=null,this.updateComplete.then(()=>this.shadowRoot.querySelector(`[data-add="${t??"root"}"]`)?.focus()))}static get styles(){return f`
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
    `}_renderAdd(e,t=!1){if(!this.editable)return"";const r=e??"root",{types:i,untyped:a}=this._choices(e);return!i.length&&!a?"":this._adding===r?s`<li class="add-field ${t?"grouped":""}">
        ${i.length?s`<select
              class="add-type"
              aria-label="Content type of the new page"
              @change="${n=>this._addType=n.target.value}"
              @keydown="${n=>this._addKeys(n,e)}"
            >
              ${a?s`<option value="" ?selected="${!this._addType}">No type</option>`:""}
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
        ${Ut("oer:plus")}Add page
      </button>
    </li>`}_renderLevel(e,t,r){const i=e.get(t)||[];let a=!1;return s`<ul role="list">
      ${i.map(n=>{if(me(n))return a=!0,s`<li class="heading"><span class="group-label" role="heading" aria-level="2">${n.title}</span></li>`;const l=(e.get(n.id)||[]).length>0,d=this.__forceOpen||this._open.has(n.id),c=n.metadata?.icon;return s`<li class="${[l?"has-kids":"",a?"grouped":""].join(" ")}">
          <div class="row">
            <a
              href="${this._href(n)}"
              class="${n.metadata?.published===!1?"draft":""}"
              aria-current="${n.id===this._activeId||n.id===this.__pinnedActive?"page":n.id===this.__location?"location":"false"}"
            >
              ${r===0&&x2(this._all)?c?s`<simple-icon-lite icon="${c}"></simple-icon-lite>`:s`<span class="no-icon"></span>`:""}
              <span class="title">${n.title}</span>
            </a>
            ${l?s`<button
                  class="chev"
                  aria-expanded="${d?"true":"false"}"
                  aria-label="${d?"Collapse":"Expand"} ${n.title}"
                  @click="${()=>this._toggle(n.id)}"
                >
                  ${Ut("oer:chevron-down")}
                </button>`:""}
          </div>
          ${l&&d?this._renderLevel(e,n.id,r+1):""}
        </li>`})}
      ${this._renderAdd(t,i.some(me))}
    </ul>`}_href(e){const t=e.metadata?.oerNavVersion;if(!t)return e.slug;const r=(this._all||[]).find(i=>i.metadata?.oerSnapshotOf===e.id&&i.metadata?.version===t);return r?r.slug:e.slug}_navItems(){if(this.root)return this._items;const e=new Set(T(this._all).types.filter(t=>t.nav===!1).map(t=>t.id));return e.size?this._items.filter(t=>!e.has(t.metadata?.pageType)):this._items}render(){this.toggleAttribute("no-icons",!x2(this._all));let e=this._navItems();const t=new Set(e.map(d=>d.id)),r=new Map((this._all||[]).map(d=>[d.id,d]));let i=r.get(this._activeId);for(;i&&!t.has(i.id);)i=r.get(i.parent);this.__location=i&&i.id!==this._activeId?i.id:null;const a=r.get(this._activeId);i&&a?.metadata?.oerSnapshotOf===i.id&&a.metadata.version===i.metadata?.oerNavVersion?(this.__location=null,this.__pinnedActive=i.id):this.__pinnedActive=null;const n=(this.filter||"").trim().toLowerCase();if(n){const d=new Map(e.map(p=>[p.id,p])),c=new Set;for(const p of e)if(p.title.toLowerCase().includes(n))for(let h=p;h&&!c.has(h.id);h=d.get(h.parent))c.add(h.id);e=e.filter(p=>c.has(p.id)),this.__forceOpen=!0}else this.__forceOpen=!1;const l=oe(e);return n&&!e.length?s`<p class="none">No pages match “${this.filter}”.</p>`:this._renderLevel(l,this.root||null,0)}};customElements.define(Vt.tag,Vt);const wo=480,Do=4,xo=s`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>`,yo=s`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>`;let Kt=class extends F{static get tag(){return"oer-breadcrumb"}static get properties(){return{_trail:{state:!0},_narrow:{state:!0},_open:{state:!0}}}constructor(){super(),this._trail=[],this._narrow=!1,this._open=!1,this.__outside=e=>{this._open&&!e.composedPath().includes(this)&&(this._open=!1)}}connectedCallback(){super.connectedCallback(),this.__dispose=O(()=>{const e=_(D.manifest?.items)||[],t=_(D.activeId);Promise.resolve().then(()=>{const r=new Map(e.map(a=>[a.id,a])),i=[];for(let a=r.get(t);a&&!Q(a);a=r.get(a.parent))i.unshift(a);this._trail=i.map(a=>({id:a.id,title:a.title,slug:a.slug})),this._open=!1})}),this.__resize=new ResizeObserver(([e])=>{this._narrow=e.contentRect.width<wo}),this.__resize.observe(this),globalThis.addEventListener("pointerdown",this.__outside,!0)}disconnectedCallback(){this.__dispose?.(),this.__resize?.disconnect(),globalThis.removeEventListener("pointerdown",this.__outside,!0),super.disconnectedCallback()}static get styles(){return f`
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
    `}_toggle(){this._open=!this._open,this._open&&this.updateComplete.then(()=>this.shadowRoot.querySelector(".menu a")?.focus())}_menuKeys(e){const t=[...this.shadowRoot.querySelectorAll(".menu a")],r=t.indexOf(this.shadowRoot.activeElement);if(e.key==="ArrowDown")t[(r+1)%t.length]?.focus();else if(e.key==="ArrowUp")t[(r-1+t.length)%t.length]?.focus();else if(e.key==="Home")t[0]?.focus();else if(e.key==="End")t[t.length-1]?.focus();else if(e.key==="Escape"||e.key==="Tab"){if(this._open=!1,e.key==="Escape"&&this.shadowRoot.querySelector("button.ellipsis")?.focus(),e.key==="Tab")return}else return;e.preventDefault()}render(){const e=this._trail;if(!e.length)return s``;const t=e[e.length-1],r=e.slice(0,-1);let i,a;this._narrow?(i=[],a=r):e.length>Do?(i=[r[0],"\u2026",...r.slice(-1)],a=r.slice(1,-1)):(i=r,a=[]),!this._narrow&&a.length===0&&(i=i.filter(c=>c!=="\u2026"));const n=s`<span class="sep" aria-hidden="true">${xo}</span>`,l=s`<li class="ellipsis-wrap">
      <button
        class="ellipsis"
        aria-label="Show ${a.length} more level${a.length===1?"":"s"}"
        aria-haspopup="menu"
        aria-expanded="${this._open?"true":"false"}"
        @click="${this._toggle}"
      >
        ${yo}
      </button>
      ${this._open?s`<div class="menu" role="menu" @keydown="${this._menuKeys}">
            ${a.map(c=>s`<a role="menuitem" href="${c.slug}" @click="${()=>this._open=!1}">${c.title}</a>`)}
          </div>`:""}
    </li>`,d=this._narrow?a.length?[l]:[]:i.map(c=>c==="\u2026"?l:s`<li class="crumb"><a href="${c.slug}" title="${c.title}">${c.title}</a></li>`);return s`<nav aria-label="Breadcrumb" class="${this._narrow?"narrow":""}">
      <ol>
        ${d.map(c=>s`${c}<li class="sep-item" aria-hidden="true">${n}</li>`)}
        <li class="current"><span class="page" aria-current="page" title="${t.title}">${t.title}</span></li>
      </ol>
    </nav>`}};customElements.define(Kt.tag,Kt);const ko=f`
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
`,_o=f`
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
`;let Wt=class extends F{static get tag(){return"oer-command-search"}static get properties(){return{open:{type:Boolean,reflect:!0}}}constructor(){super(),this.open=!1,this.__outside=e=>{this.open&&!e.composedPath().includes(this)&&(this.open=!1)}}connectedCallback(){super.connectedCallback(),globalThis.addEventListener("pointerdown",this.__outside)}disconnectedCallback(){globalThis.removeEventListener("pointerdown",this.__outside),super.disconnectedCallback()}updated(e){e.has("open")&&this.open&&this.shadowRoot.querySelector("input")?.focus()}_input(e){const t=e.target.value;t&&(e.target.value="",this.open=!1,w2(t))}_keydown(e){e.key==="Escape"?(e.preventDefault(),this.open=!1,this.shadowRoot.querySelector("button")?.focus()):e.key==="Enter"&&!e.target.value&&(e.preventDefault(),this.open=!1,w2())}static get styles(){return f`
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
          title="Run a command (${Di})"
          aria-label="Run a command"
          @click="${()=>this.open=!this.open}"
        >
          <span
            class="icon"
            aria-hidden="true"
            style="--src:url(&quot;${E["oer:command"]}&quot;)"
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
    `}};customElements.define(Wt.tag,Wt);const Yt=Object.keys(E).filter(o=>!o.startsWith("oer:")),Gt=o=>s`<span class="lucide" aria-hidden="true" style="--src:url(&quot;${E[o]||""}&quot;)"></span>`;let We=class extends F{static get tag(){return"oer-icon-picker"}static get properties(){return{open:{type:Boolean,reflect:!0},_query:{state:!0},_current:{state:!0}}}constructor(){super(),this.open=!1,this._query="",this._current="",this.__keys=e=>{this.open&&e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),this._done(null))}}pick(e=""){return this._current=e,this._query="",this.open=!0,globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector("input")?.focus()),new Promise(t=>this.__resolve=t)}_done(e){this.open=!1,globalThis.removeEventListener("keydown",this.__keys,!0),this.__resolve?.(e),this.__resolve=null}static get styles(){return f`
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
    `}render(){if(!this.open)return s``;const e=this._query.trim().toLowerCase(),t=(e?Yt.filter(r=>r.toLowerCase().includes(e)):Yt).slice(0,120);return s`
      <div class="backdrop" @click="${()=>this._done(null)}"></div>
      <div class="box" role="dialog" aria-modal="true" aria-labelledby="t">
        <h2 id="t">Choose icon</h2>
        <div class="search">
          ${Gt("icons:search")}
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
                  ${Gt(r)}<small>${r.split(":").pop()}</small>
                </button>`)}
            </div>`:s`<div class="empty">No icons match “${this._query}”</div>`}
        <div class="foot">
          <button class="remove" @click="${()=>this._done("")}">Remove icon</button>
          <button class="cancel" @click="${()=>this._done(null)}">Cancel</button>
        </div>
      </div>
    `}};customElements.define(We.tag,We);function Xt(){const o=globalThis.document;return o.querySelector(We.tag)||o.body.appendChild(o.createElement(We.tag))}const j2="oer:pathway",Jt="oer:specialization",$o=["Beginner","Intermediate","Advanced"],Ye=o=>Array.isArray(o)?o:typeof o=="string"&&o?o.split(",").map(e=>e.trim()).filter(Boolean):[],Zt=()=>_(D.manifest?.items)||[],Fo=(o,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${E[o]||""}&quot;)"></span>`,B2=o=>$o.findIndex(e=>e.toLowerCase()===String(o||"").toLowerCase())+1,I2=o=>[...new Set(Ye(o))].sort((e,t)=>(B2(e)||99)-(B2(t)||99));function ge(o,e=""){const t=B2(o);return s`<span class="level ${e}"
    ><span class="steps" aria-hidden="true">${[1,2,3].map(r=>s`<span class="${r<=t?"on":""}"></span>`)}</span>${o}</span
  >`}const L2=(o="")=>s`<span class="dev ${o}">${Fo("oer:circle-dashed","xs")}In development</span>`,Ge=f`
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
`;function Qt(o,e=Zt()){const t=new Map(e.map(r=>[r.id,r]));for(let r=t.get(o);r;r=t.get(r.parent))if(r.metadata?.pageType===j2)return r;return null}const er=o=>I2(o?.metadata?.oerFields?.levels),tr=o=>!Q(o)&&!o.metadata?.oerSnapshotOf&&(D.isLoggedIn||o.metadata?.published!==!1);function Co(o,e=Zt(),t=T(e).types){const r=oe(e.filter(tr)),i=new Map(e.map(p=>[p.id,p])),a=p=>t.find(h=>h.id===p?.metadata?.pageType)||null,n=p=>!p.metadata?.oerRef?.page&&(!p.metadata?.pageType||p.metadata.pageType===Mi),l=(p,h,m)=>{const g=p.metadata?.oerRef?.page,u=g?i.get(g):p,v=a(u),x=!g&&!p.metadata?.pageType&&!(r.get(p.id)||[]).length;return{id:p.id,title:p.title,href:x?"":p.slug,level:p.metadata?.oerLevel||h||"",type:v,typeLabel:v?.label||"",duration:u?.metadata?.oerFields?.estimatedDuration||"",planned:x,missing:!!g&&!u,placeholder:!!u?.metadata?.oerFields?.placeholder,group:m,components:(u?.metadata?.oerFields?.components||[]).map(C=>i.get(C?.page)).filter(C=>C&&tr(C)).map(C=>({id:C.id,title:C.title,href:C.slug,type:a(C),typeLabel:a(C)?.label||"",draft:C.metadata?.published===!1}))}},d=(r.get(o.id)||[]).filter(p=>p.metadata?.pageType!==Jt).map(p=>{const h=p.metadata?.oerLevel||"",m=[];for(const g of r.get(p.id)||[]){const u=r.get(g.id)||[];if(u.length&&n(g)){const v=g.metadata?.oerLevel||h;for(const x of u)m.push(l(x,v,g.title))}else m.push(l(g,h,""))}return{id:p.id,title:p.title,href:n(p)?"":p.slug,level:h,items:m}}),c=o.metadata?.oerFields||{};return{item:o,fields:c,levels:I2(c.levels),courses:Ye(c.courses),targetRole:c.targetRole||"",duration:c.estimatedDuration||"",placeholder:!!c.placeholder,objectives:Ye(c.learningObjectives),testOut:Ye(c.testOutCriteria),prerequisites:ue(c.prerequisites,e),modules:d,specializations:(r.get(o.id)||[]).filter(p=>p.metadata?.pageType===Jt)}}function Eo(o,e){return e?o.map(t=>({...t,items:t.items.filter(r=>!r.level||r.level===e)})).filter(t=>t.items.length):o}const ve=20,rr=o=>`<oer-include page="${o.page}"${o.version?` version="${o.version}"`:""}></oer-include>`,J=6,Mo=2e3,S=(o,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${E[o]||""}&quot;)"></span>`;class Xe extends F{static get tag(){return"oer-outline-builder"}static get properties(){return{open:{type:Boolean,reflect:!0},_rows:{state:!0},_collapsed:{state:!0},_editing:{state:!0},_showIcons:{state:!0},_navIcons:{state:!0},_hoverAdd:{state:!0},_drag:{state:!0},_longPress:{state:!0},_typeMenu:{state:!0},_confirmDiscard:{state:!0}}}constructor(){super(),this.open=!1,this._rows=[],this._deleted=new Map,this._hidden=new Map,this._collapsed=new Set,this._editing=null,this._showIcons=!0,this._hoverAdd=null,this._drag=null,this._longPress=null,this._typeMenu=null,this._types=[],this._confirmDiscard=!1,this.__keys=e=>{!this.open||e.key!=="Escape"||globalThis.document.querySelector("oer-icon-picker[open]")||(this._typeMenu?this._typeMenu=null:this._editing?this._editing=null:this._requestClose(),e.preventDefault(),e.stopPropagation())}}show(e=null){const t=_(D.manifest?.items)||[];this._items=t,this._byId=new Map(t.map(i=>[i.id,i])),this._root=e,this._rootItem=e?t.find(i=>i.id===e):null;const r=i=>i.metadata?.hideInMenu&&i.metadata?.pageType!==P;this._rows=Be(t.filter(i=>!Q(i)&&!se(i)&&!r(i)),e).map(({item:i,depth:a})=>({id:i.id,title:i.title,icon:i.metadata?.icon||"",type:i.metadata?.pageType||"",ref:i.metadata?.oerRef?.page?i.metadata.oerRef:null,navVersion:i.metadata?.oerNavVersion||"",level:i.metadata?.oerLevel||"",depth:a,orig:i})),this._types=[...T(t).types,dt],this._navIcons=x2(t),this._snapshot=this._signature(),this._deleted=new Map,this._hidden=new Map,this._collapsed=new Set,this._editing=null,this._confirmDiscard=!1,this.open=!0,globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector("[role=treeitem], .empty button")?.focus())}_close(){this.open=!1,this._typeMenu=null,globalThis.removeEventListener("keydown",this.__keys,!0)}_signature(){return JSON.stringify([this._navIcons,...this._rows.map(e=>[e.id,e.title,e.icon,e.type,e.level,e.depth,e.ref?.page,e.ref?.version,e.navVersion,!!e.unhide])])}get _dirty(){return this._deleted.size>0||this._hidden.size>0||this._signature()!==this._snapshot}_requestClose(){if(this._dirty&&!this._confirmDiscard){this._confirmDiscard=!0;return}this._close()}_save(){const e=_(D.manifest?.items)||[],t=this._rootItem?(Number(this._rootItem.indent)||0)+1:0,r=new Map(e.map(l=>[l.id,{...l}])),i=[],a=new Map;for(const l of this._rows){const d=l.depth===0?this._root:i[l.depth-1];i[l.depth]=l.id,i.length=l.depth+1;const c=d??"__root",p=a.get(c)??0;a.set(c,p+1);const h=l.title.trim()||"Untitled page",m=t+l.depth;if(l.orig){const g=l.orig,u=r.get(l.id),v=(g.parent||null)!==(d||null)||Number(g.order)!==p||Number(g.indent)!==m||g.title!==h||(g.metadata?.icon||"")!==l.icon||(g.metadata?.pageType||"")!==l.type||(g.metadata?.oerLevel||"")!==(l.level||"")||(g.metadata?.oerRef?.version||"")!==(l.ref?.version||"")||(g.metadata?.oerNavVersion||"")!==(l.navVersion||"")||!!l.unhide;Object.assign(u,{parent:d||null,order:p,indent:m,title:h}),u.metadata={...g.metadata||{}},u.metadata.icon=l.icon||"",u.metadata.pageType=l.type||"",l.type===P?u.metadata.hideInMenu=!0:(g.metadata?.pageType===P||l.unhide)&&(u.metadata.hideInMenu=!1),(l.level||g.metadata?.oerLevel)&&(u.metadata.oerLevel=l.level||""),(l.navVersion||g.metadata?.oerNavVersion)&&(u.metadata.oerNavVersion=l.navVersion||""),l.ref&&(g.metadata?.oerRef?.version||"")!==(l.ref.version||"")&&(u.metadata.oerRef={page:l.ref.page,version:l.ref.version||""},u.contents=rr(l.ref)),v&&(u.modified=!0)}else r.set(l.id,{id:l.id,title:h,parent:d||null,order:p,indent:m,location:"",description:"",metadata:{...l.icon?{icon:l.icon}:{},...l.type?{pageType:l.type}:{},...l.ref?{oerRef:l.ref}:{},...l.level?{oerLevel:l.level}:{},...l.type===P?{hideInMenu:!0}:{}},contents:l.ref?rr(l.ref):lt(l.type),new:!0})}for(const l of this._hidden.keys()){const d=r.get(l);!d||this._deleted.has(l)||(d.metadata={...d.metadata||{},hideInMenu:!0},d.modified=!0)}for(const l of this._deletedWithVersions()){const d=r.get(l);d&&(d.delete=!0)}const n=Le(e);if(n&&n.metadata?.oerNavIcons!==!1!==this._navIcons){const l=r.get(n.id);l.metadata={...l.metadata||{},oerNavIcons:this._navIcons},l.modified=!0}ae([...r.values()]),this._close()}_index(e){return this._rows.findIndex(t=>t.id===e)}_subtree(e){const t=this._rows[e].depth;let r=e+1;for(;r<this._rows.length&&this._rows[r].depth>t;)r++;return{start:e,end:r}}_hasChildren(e){return e+1<this._rows.length&&this._rows[e+1].depth>this._rows[e].depth}_visible(){const e=[];let t=-1;return this._rows.forEach((r,i)=>{if(t>=0){if(r.depth>t)return;t=-1}e.push({row:r,index:i}),this._collapsed.has(r.id)&&this._hasChildren(i)&&(t=r.depth)}),e}_nextSiblingAtDepth(e,t){const{end:r}=this._subtree(e);for(let i=r;i<this._rows.length;i++){if(this._rows[i].depth<t)return!1;if(this._rows[i].depth===t)return!0}return!1}_closingRows(e,t){const{row:r,index:i}=e[t],a=t+1<e.length?e[t+1].row.depth:-1;if(a>=r.depth)return[];const n=[];for(let l=r.depth;l>a;l--){let d=r.id;if(l<r.depth)for(let c=t-1;c>=0;c--){if(e[c].row.depth===l){d=e[c].row.id;break}if(e[c].row.depth<l)break}n.push({depth:l,afterId:d,index:i})}return n}_hasClosingAddAtDepth(e,t,r){for(let i=t+1;i<e.length;i++){const a=e[i].row.depth;if(a<r)return!0;if(a===r)return!1}return!0}_highlight(){if(this._hoverAdd)return this._hoverAdd;const e=this._drag;return e?.overId&&e.position!=="child"&&e.previewDepth!==null?{afterId:e.overId,depth:e.previewDepth}:null}_isSibling(e){const t=this._highlight();if(!t)return!1;const r=this._rows,i=r.find(d=>d.id===e);if(!i||i.depth!==t.depth)return!1;if(t.depth===0)return!0;const a=this._index(t.afterId);if(a<0)return!1;const n=t.afterId===this._drag?.id?a-1:a;let l=-1;for(let d=n;d>=0;d--){if(r[d].depth===t.depth-1){l=d;break}if(r[d].depth<t.depth-1)break}if(l<0)return!1;for(let d=l+1;d<r.length&&!(r[d].depth<t.depth);d++)if(r[d].depth===t.depth&&r[d].id===e)return!0;return!1}_columnHighlighted(e,t){const r=this._highlight();if(!r||t!==r.depth)return!1;for(let i=this._index(e);i>=0;i--){if(this._rows[i].depth===t)return this._isSibling(this._rows[i].id);if(this._rows[i].depth<t)return!1}return!1}_commit(e=[...this._rows]){this._rows=e,this._confirmDiscard=!1}_newRow(e,t=null){return{id:ke(),title:"",icon:"",type:this._defaultType(t),depth:e,orig:null}}_addAfter(e,t){const r=[...this._rows],i=this._index(e),a=i<0?r.length:this._subtree(i).end;let n=this._rootItem?.metadata?.pageType||null;for(let d=a-1;d>=0;d--)if(r[d].depth<t){n=r[d].type||null;break}const l=this._newRow(t,n);r.splice(a,0,l),this._commit(r),this._startEdit(l.id)}async _addExisting(e,t){const r=await ut().pick({exclude:this._root?[this._root]:[]});if(!r)return;const i=_(D.manifest?.items)||[],a=oe(i.filter(h=>!Q(h)&&!se(h))),n=(h,m,g="")=>({id:ke(),title:h.title,icon:h.metadata?.icon||"",type:h.metadata?.pageType||"",ref:{page:h.id,version:g},depth:Math.min(m,J),orig:null}),l=r.page;if(this._hidden.has(l.id)||l.metadata?.hideInMenu&&l.metadata?.pageType!==P&&this._index(l.id)<0){this._hidden.delete(l.id);const h=(x,C)=>({id:x.id,title:x.title,icon:x.metadata?.icon||"",type:x.metadata?.pageType||"",ref:x.metadata?.oerRef?.page?x.metadata.oerRef:null,navVersion:x.id===l.id?r.version||"":x.metadata?.oerNavVersion||"",level:x.metadata?.oerLevel||"",depth:Math.min(C,J),orig:x,unhide:x.id===l.id}),m=[h(l,t)],g=(x,C)=>(a.get(x)||[]).forEach(A=>{A.metadata?.hideInMenu&&A.metadata?.pageType!==P||(m.push(h(A,C)),g(A.id,C+1))});g(l.id,t+1);const u=[...this._rows],v=this._index(e);u.splice(v<0?u.length:this._subtree(v).end,0,...m),this._commit(u),this._focusRow(l.id);return}const d=[n(r.page,t,r.version)];if(r.withChildren){const h=(m,g)=>(a.get(m)||[]).forEach(u=>(d.push(n(u,g)),h(u.id,g+1)));h(r.page.id,t+1)}const c=[...this._rows],p=this._index(e);c.splice(p<0?c.length:this._subtree(p).end,0,...d),this._commit(c),this._focusRow(d[0].id)}_addHeading(e,t){const r=[...this._rows],i=this._index(e),a=i<0?r.length:this._subtree(i).end,n={...this._newRow(t),type:P};r.splice(a,0,n),this._commit(r),this._startEdit(n.id)}_addChild(e){const t=this._index(e);if(t<0)return;const r=[...this._rows],i=this._newRow(Math.min(r[t].depth+1,J),r[t].type||null);r.splice(this._subtree(t).end,0,i);const a=new Set(this._collapsed);a.delete(e),this._collapsed=a,this._commit(r),this._startEdit(i.id)}_addFirst(){const e=this._newRow(0,this._rootItem?.metadata?.pageType||null);this._commit([...this._rows,e]),this._startEdit(e.id)}_remove(e,{deletePage:t=!1}={}){const r=this._index(e);if(r<0)return;const{start:i,end:a}=this._subtree(r),n=[...this._rows];if(t)for(const d of n.slice(i,a))d.orig&&this._deleted.set(d.id,d.orig);else n[r].orig&&this._hidden.set(e,n[r].orig);const l=r>0?n[r-1].id:null;n.splice(i,a-i),this._commit(n),l&&this._focusRow(l)}_deletedWithVersions(){return this._deleted.size?D2(this._items,this._deleted.keys()):new Set}_linksToDeleted(){const e=this._deletedWithVersions();return(this._items||[]).filter(t=>!e.has(t.id)&&e.has(t.metadata?.oerRef?.page)).length}_rename(e,t){const r=this._rows.map(i=>i.id===e?{...i,title:t}:i);this._commit(r)}_shiftSubtree(e,t){const{start:r,end:i}=this._subtree(e);this._commit(this._rows.map((a,n)=>n>=r&&n<i?{...a,depth:a.depth+t}:a))}_indent(e){const t=this._index(e);if(t<=0||this._rows[t].depth>this._rows[t-1].depth)return;const{start:r,end:i}=this._subtree(t);Math.max(...this._rows.slice(r,i).map(a=>a.depth))>=J||this._shiftSubtree(t,1)}_outdent(e){const t=this._index(e);t<0||this._rows[t].depth<=0||this._shiftSubtree(t,-1)}_moveUp(e){const t=this._index(e);if(t<=0)return;const r=[...this._rows],i=r[t].depth;let a=t-1;for(;a>=0&&r[a].depth>i;)a--;if(a<0||r[a].depth<i)return;const{start:n,end:l}=this._subtree(t),d=r.splice(n,l-n);r.splice(a,0,...d),this._commit(r),this._focusRow(e)}_moveDown(e){const t=this._index(e);if(t<0)return;const r=this._rows[t].depth,{start:i,end:a}=this._subtree(t);if(a>=this._rows.length||this._rows[a].depth!==r)return;const n=this._subtree(a).end,l=[...this._rows],d=l.splice(i,a-i);l.splice(n-d.length,0,...d),this._commit(l),this._focusRow(e)}_toggle(e){const t=new Set(this._collapsed);t.has(e)?t.delete(e):t.add(e),this._collapsed=t}_collapseAll(){this._collapsed=new Set(this._rows.filter((e,t)=>this._hasChildren(t)).map(e=>e.id))}_startEdit(e){this._editing=e,this.updateComplete.then(()=>{const t=this.shadowRoot.querySelector(`[data-edit="${e}"]`);t?.focus(),t&&(t.selectionStart=t.selectionEnd=t.value.length)})}_stopEdit(e=!0){const t=this._editing;this._editing=null,e&&t&&this._focusRow(t)}_focusRow(e){this.updateComplete.then(()=>this.shadowRoot.querySelector(`[role=treeitem][data-id="${e}"]`)?.focus())}_editKeys(e,t){e.key==="Enter"?(e.preventDefault(),this._stopEdit()):e.key==="Tab"?(e.preventDefault(),e.shiftKey?this._outdent(t.id):this._indent(t.id)):e.key==="Backspace"&&!e.target.value?(e.preventDefault(),this._editing=null,this._remove(t.id)):e.altKey&&(e.key==="ArrowUp"||e.key==="ArrowDown")&&(e.preventDefault(),e.key==="ArrowUp"?this._moveUp(t.id):this._moveDown(t.id),this._startEdit(t.id)),e.stopPropagation()}_rowKeys(e,t,r,i){if(this._editing===t.id)return;const a=i.findIndex(l=>l.row.id===t.id),n=l=>i[l]&&this._focusRow(i[l].row.id);if(e.key==="Tab")e.shiftKey?this._outdent(t.id):this._indent(t.id),this._focusRow(t.id);else if(e.key==="Enter"||e.key==="F2")this._startEdit(t.id);else if(e.altKey&&e.key==="ArrowUp")this._moveUp(t.id);else if(e.altKey&&e.key==="ArrowDown")this._moveDown(t.id);else if(e.key==="ArrowUp")n(a-1);else if(e.key==="ArrowDown")n(a+1);else if(e.key==="ArrowRight"&&this._hasChildren(r)&&this._collapsed.has(t.id))this._toggle(t.id);else if(e.key==="ArrowLeft"&&this._hasChildren(r)&&!this._collapsed.has(t.id))this._toggle(t.id);else if(e.key==="Delete"&&e.shiftKey)this._remove(t.id,{deletePage:!0});else if(e.key==="Delete"||e.key==="Backspace"&&!t.title)this._remove(t.id);else if((e.key==="t"||e.key==="l"||e.key==="v")&&!e.metaKey&&!e.ctrlKey&&!e.altKey){if(e.key==="l"&&this._levelsFor(r).length<2&&!t.level)return;const l={t:".type-chip",l:".title",v:".ref"}[e.key],d=e.currentTarget.querySelector(l);if(!d)return;this._openMenu(t,r,{t:"type",l:"level",v:"version"}[e.key],d)}else return;e.preventDefault()}_pointerDown(e,t){!this._hasChildren(t)||this._collapsed.has(e.id)||(this._longPress=e.id,clearTimeout(this.__lpTimer),this.__lpTimer=setTimeout(()=>{this._longPress===e.id&&(this._collapsed=new Set([...this._collapsed,e.id]),this._longPress=null)},Mo))}_cancelLongPress(){clearTimeout(this.__lpTimer),this._longPress=null}_previewDepth(e,t){const r=Math.round((e.x-e.startX)/ve);let i=Math.max(0,Math.min(J,e.origDepth+r));const a=this._index(t);if(t&&t!==e.id&&a>=0)if(e.position==="child")i=Math.min(J,this._rows[a].depth+1);else{const n=e.position==="before"?Math.max(0,a-1):a;i=Math.min(i,this._rows[n].depth+1)}else t===e.id&&a>0&&(i=Math.min(i,this._rows[a-1].depth+1));return i}_dragStart(e,t){this._cancelLongPress(),e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",t.id),this._drag={id:t.id,overId:null,position:"after",startX:e.clientX,x:e.clientX,origDepth:t.depth,previewDepth:null,droppedOnOther:!1}}_dragOver(e,t){const r=this._drag;if(!r)return;e.preventDefault(),e.dataTransfer.dropEffect="move";const i={...r,x:e.clientX,overId:t.id};if(t.id!==r.id){const a=e.currentTarget.getBoundingClientRect(),n=(e.clientY-a.top)/a.height;i.position=n<.3?"before":n>.7?"after":t.depth<J?"child":"after"}i.previewDepth=this._previewDepth(i,t.id),i.overId!==r.overId||i.position!==r.position||i.previewDepth!==r.previewDepth?this._drag=i:this._drag.x=i.x}_dragLeave(e,t){(!e.relatedTarget||!e.currentTarget.contains(e.relatedTarget))&&this._drag?.overId===t.id&&(this._drag={...this._drag,overId:null})}_drop(e,t){e.preventDefault();const r=this._drag;if(!r||r.id===t.id)return;const i=[...this._rows],a=this._index(r.id);if(a<0)return;const{start:n,end:l}=this._subtree(a);let d=i.splice(n,l-n);const c=p=>d=d.map(h=>({...h,depth:Math.max(0,Math.min(J,h.depth+p))}));if(r.position==="child"){const p=i.findIndex(h=>h.id===t.id);if(p<0)i.push(...d);else{c(Math.min(i[p].depth+1,J)-d[0].depth);let h=p+1;for(;h<i.length&&i[h].depth>i[p].depth;)h++;i.splice(h,0,...d);const m=new Set(this._collapsed);m.delete(t.id),this._collapsed=m}}else{r.previewDepth!==null&&c(r.previewDepth-d[0].depth);let p=i.findIndex(h=>h.id===t.id);p<0&&(p=i.length),r.position==="after"&&p++,i.splice(p,0,...d)}this._drag={...r,droppedOnOther:!0},this._commit(i)}_dragEnd(){const e=this._drag;if(e&&!e.droppedOnOther&&e.previewDepth!==null){const t=this._index(e.id);t>=0&&this._rows[t].depth!==e.previewDepth&&this._commit(this._rows.map((r,i)=>i===t?{...r,depth:e.previewDepth}:r))}this._drag=null}async _chooseIcon(e){const t=await Xt().pick(e.icon);t!==null&&(this._commit(this._rows.map(r=>r.id===e.id?{...r,icon:t}:r)),this._focusRow(e.id))}_parentRow(e){const t=this._rows[e].depth;for(let r=e-1;r>=0;r--)if(this._rows[r].depth<t)return this._rows[r];return null}_allowedUnder(e){const t=this._types,r=e?t.find(a=>a.id===e):null,i=!!r&&Array.isArray(r.children);return{types:i?t.filter(a=>r.children.includes(a.id)):t,untyped:!i,none:i&&r.children.length===0}}_rowAllowed(e){const t=this._parentRow(e),r=t?null:this._rootItem?.metadata?.pageType||null;return this._allowedUnder(t?t.type:r)}_invalid(e){const t=this._rows[e];if(t.type===P)return!1;const{types:r,untyped:i}=this._rowAllowed(e);return t.type?!r.some(a=>a.id===t.type):!i}_defaultType(e){const{types:t,untyped:r}=this._allowedUnder(e);return r?"":t[0]?.id||""}_levelsFor(e){for(let r=e,i=this._parentRow(e);i;i=this._parentRow(r))if(r=this._index(i.id),i.type===j2)return er(i.orig);const t=this._root?Qt(this._root,this._items||[]):null;return t?er(t):[]}_setLevel(e,t){this._typeMenu=null,this._commit(this._rows.map(r=>r.id===e?{...r,level:t}:r)),this._focusRow(e)}_openMenu(e,t,r,i){const a=i.getBoundingClientRect(),n=this.shadowRoot.querySelector(".dialog").getBoundingClientRect();this._typeMenu={id:e.id,index:t,kind:r,x:a.right-n.left,y:a.bottom-n.top+4}}_setType(e,t){this._typeMenu=null,this._commit(this._rows.map(r=>r.id===e?{...r,type:t}:r)),this._focusRow(e)}static get styles(){return[Ge,f`
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
        width: ${ve}px;
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
        width: ${ve}px;
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

    `]}_levelClosed(e){const t=this._index(e.afterId);if(t<0)return!1;const r=this._parentRow(t),i=r?r.type:this._rootItem?.metadata?.pageType||null;return this._allowedUnder(i||null).none}_pinnable(e){return ee(e,this._items||[]).filter(t=>t.snapshot)}_setVersion(e,t){this._typeMenu=null,this._commit(this._rows.map(r=>r.id===e?r.ref?{...r,ref:{...r.ref,version:t}}:{...r,navVersion:t}:r)),this._focusRow(e)}_renderRef(e,t){const r=this._byId?.get(e.ref.page),i=e.ref.version,a=r?`Shows \u201C${r.title}\u201D, ${i?`pinned to v${i}`:"latest version"}. Change version (V)`:"Linked page not found";return s`<button
      class="ref ${i?"pinned":""}"
      tabindex="-1"
      title="${a}"
      aria-label="${a}"
      @mousedown="${n=>n.preventDefault()}"
      @click="${n=>{n.stopPropagation(),r&&this._openMenu(e,t,"version",n.currentTarget)}}"
    >
      ${S("icons:link","sm")}<span class="ref-title">${r?r.title:"missing"}</span><b>${i?`v${i}`:"latest"}</b>
    </button>`}_renderNavVersion(e,t){const r=e.navVersion,i=`The navigation links to ${r?`v${r} as released`:"the latest version"}. Change version (V)`;return s`<button
      class="ref ${r?"pinned":""}"
      tabindex="-1"
      title="${i}"
      aria-label="${i}"
      @mousedown="${a=>a.preventDefault()}"
      @click="${a=>{a.stopPropagation(),this._openMenu(e,t,"version",a.currentTarget)}}"
    >
      ${S("icons:history","sm")}<b>${r?`v${r}`:"latest"}</b>
    </button>`}_renderTypeChip(e,t){if(!this._types.length)return"";const r=this._types.find(a=>a.id===e.type),i=this._invalid(t);return s`<button
      class="type-chip ${r?"":"untyped"} ${i?"bad":""}"
      tabindex="-1"
      title="${i?"This type is not allowed here. Click to change.":"Content type (click to change)"}"
      aria-label="Content type: ${r?r.label:"none"}${i?", not allowed here":""}. Change"
      @mousedown="${a=>a.preventDefault()}"
      @click="${a=>{a.stopPropagation(),this._openMenu(e,t,"type",a.currentTarget)}}"
    >
      ${r?.icon?s`<simple-icon-lite icon="${r.icon}"></simple-icon-lite>`:""}${r?r.label:"No type"}
    </button>`}_renderTypeMenu(){const e=this._typeMenu,t=this._index(e.id);if(t<0)return"";const r=this._rows[t],i=d=>{const c=[...d.currentTarget.querySelectorAll("[role=menuitemradio]")],p=c.indexOf(this.shadowRoot.activeElement);if(d.key==="ArrowDown")c[(p+1)%c.length]?.focus();else if(d.key==="ArrowUp")c[(p-1+c.length)%c.length]?.focus();else if(d.key==="Escape")this._typeMenu=null,this._focusRow(r.id);else return;d.preventDefault(),d.stopPropagation()};if(e.kind==="version"){const d=r.ref?r.ref.page:r.id,c=(r.ref?r.ref.version:r.navVersion)||"",p=this._byId?.get(d),h=this._pinnable(d),m=p?.metadata?.version,g=(u,v,x="")=>s`<button role="menuitemradio" aria-checked="${c===u?"true":"false"}" @click="${()=>this._setVersion(r.id,u)}">
        <span class="check">${c===u?S("oer:check","sm"):""}</span>${v}${x?s`<span class="menu-hint">${x}</span>`:""}
      </button>`;return s`<div class="menu-layer" @click="${()=>this._typeMenu=null}">
        <div class="type-menu" role="menu" aria-label="Version" style="left:${e.x}px;top:${e.y}px" @click="${u=>u.stopPropagation()}" @keydown="${i}">
          <div class="menu-label">${r.ref?"Version shown":"Navigation links to"}</div>
          ${g("","Latest",m?`v${m}, follows changes`:"follows changes")}
          ${h.map(u=>g(u.version,`v${u.version}`,"as released"))}
          ${h.length?"":s`<div class="menu-empty">No earlier versions released yet.</div>`}
        </div>
      </div>`}if(e.kind==="level"){const d=this._levelsFor(t),c=(p,h)=>s`<button role="menuitemradio" aria-checked="${r.level===p?"true":"false"}" @click="${()=>this._setLevel(r.id,p)}">
        <span class="check">${r.level===p?S("oer:check","sm"):""}</span>${h}
      </button>`;return s`<div class="menu-layer" @click="${()=>this._typeMenu=null}">
        <div class="type-menu" role="menu" aria-label="Level" style="left:${e.x}px;top:${e.y}px" @click="${p=>p.stopPropagation()}" @keydown="${i}">
          <div class="menu-label">Level</div>
          ${c("","Every level")}
          ${[...new Set([...d,...r.level?[r.level]:[]])].map(p=>c(p,ge(p)))}
        </div>
      </div>`}const a=this._rowAllowed(t),n=a.untyped,l=a.types.some(d=>d.id===P)?a.types:[...a.types,dt];return s`<div class="menu-layer" @click="${()=>this._typeMenu=null}">
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
              <span class="check">${r.type?"":S("oer:check","sm")}</span>No type
            </button>`:""}
        ${l.map(d=>s`<button role="menuitemradio" aria-checked="${d.id===r.type?"true":"false"}" @click="${()=>this._setType(r.id,d.id)}">
            <span class="check">${d.id===r.type?S("oer:check","sm"):""}</span>
            ${d.icon?s`<simple-icon-lite icon="${d.icon}"></simple-icon-lite>`:s`<span class="ph"></span>`}${d.label}
          </button>`)}
        ${!l.length&&!n?s`<div class="menu-empty">Nothing is allowed here.</div>`:""}
      </div>
    </div>`}updated(e){if(e.has("_typeMenu")&&this._typeMenu){const t=this.shadowRoot.querySelector(".type-menu");if(!t)return;const r=this.shadowRoot.querySelector(".dialog").getBoundingClientRect(),i=t.getBoundingClientRect();i.bottom>r.bottom-8&&(t.style.top=`${Math.max(8,this._typeMenu.y-i.height-36)}px`),(t.querySelector("[aria-checked=true]")||t.querySelector("[role=menuitemradio]"))?.focus()}}_renderIndent(e,t,r,i){const a=[],n=this._closingRows(r,i);for(let c=1;c<=e.depth;c++)if(c<e.depth){const p=this._nextSiblingAtDepth(t,c)||this._hasClosingAddAtDepth(r,i,c);a.push(s`<div class="col">${p?s`<div class="line full ${this._columnHighlighted(e.id,c)?"hl":""}"></div>`:""}</div>`)}else{const p=this._isSibling(e.id)?"hl":"",h=this._nextSiblingAtDepth(t,c)||n.some(m=>m.depth===c);a.push(s`<div class="col">
          <div class="line top ${p}"></div>
          ${h?s`<div class="line bottom ${p}"></div>`:""}
          <div class="hline ${p}"></div>
        </div>`)}const l=this._drag,d=l?.id===e.id&&l.previewDepth!==null?l.previewDepth:e.depth;return s`<div class="indent" style="width:${d*ve}px">${a}</div>`}_renderRow(e,t,r,i){const a=this._drag,n=this._hasChildren(t),l=this._collapsed.has(e.id),d=this._isSibling(e.id),c=this._editing===e.id,p=l?this._subtree(t).end-t-1:0,h=["row",a?.id===e.id?"dragging":"",a?.overId===e.id&&a.id!==e.id&&a.position==="child"?"child-target":"",this._longPress===e.id?"pressing":"",this._invalid(t)?"invalid":""].join(" ");return s`<div
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
      ${a?.overId===e.id&&a.id!==e.id&&a.position!=="child"?s`<div class="dropline ${a.position}">
            <div class="bar"></div>
            <div class="dot" style="left:${13+(a.previewDepth??0)*ve}px"></div>
          </div>`:""}
      ${this._renderIndent(e,t,r,i)}
      <div class="toggle">
        ${n?s`<button
              class="chev ${d?"hl-ring":""}"
              tabindex="-1"
              aria-label="${l?"Expand":"Collapse"}"
              @click="${m=>{m.stopPropagation(),this._toggle(e.id)}}"
            >
              ${S(l?"oer:chevron-right":"oer:chevron-down","sm")}
            </button>`:s`<div class="leaf ${d?"hl":""}"></div>`}
      </div>
      ${this._showIcons?s`<button
            class="icon-btn ${e.icon?"":"unset"}"
            tabindex="-1"
            title="${e.icon?`Icon: ${e.icon} (click to change)`:"Set icon"}"
            aria-label="${e.icon?"Change icon":"Set icon"}"
            @click="${m=>{m.stopPropagation(),this._chooseIcon(e)}}"
          >
            ${e.icon?s`<simple-icon-lite icon="${e.icon}"></simple-icon-lite>`:S("oer:smile-plus","sm")}
          </button>`:""}
      ${c?s`<input
            class="edit"
            data-edit="${e.id}"
            .value="${e.title}"
            placeholder="${e.type===P?"Heading\u2026":e.depth===0?"Page title\u2026":"Sub-page title\u2026"}"
            aria-label="Page title"
            @input="${m=>this._rename(e.id,m.target.value)}"
            @keydown="${m=>this._editKeys(m,e)}"
            @blur="${()=>this._editing===e.id&&this._stopEdit(!1)}"
          />`:s`<div class="title" @dblclick="${()=>this._startEdit(e.id)}">
            ${e.title?s`<span class="${e.type===P?"heading-title":e.depth===0?"top":"nested"}">${e.title}</span>`:s`<span class="placeholder">${e.type===P?"Heading\u2026":e.depth===0?"Page title\u2026":"Sub-page title\u2026"}</span>`}
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
        ${S(c?"oer:check":"icons:create","sm")}
      </button>
      ${e.ref?this._renderRef(e,t):this._pinnable(e.id).length?this._renderNavVersion(e,t):""}
      ${this._renderTypeChip(e,t)}
      ${p>0?s`<span class="badge">${p}</span>`:""}
      <div class="hover-only">
        ${e.depth<J&&!this._allowedUnder(e.type||null).none?s`<button
              class="act"
              tabindex="-1"
              title="Add sub-page"
              aria-label="Add sub-page"
              @click="${m=>{m.stopPropagation(),this._addChild(e.id)}}"
            >
              ${S("oer:plus","sm")}
            </button>`:""}
        <button
          class="act"
          tabindex="-1"
          title="Remove from navigation (Delete). The page is kept."
          aria-label="Remove from navigation"
          @click="${m=>{m.stopPropagation(),this._remove(e.id)}}"
        >
          ${S("oer:eye-off","sm")}
        </button>
        <button
          class="act danger"
          tabindex="-1"
          title="Delete page (Shift+Delete)"
          aria-label="Delete page"
          @click="${m=>{m.stopPropagation(),this._remove(e.id,{deletePage:!0})}}"
        >
          ${S("oer:trash-2","sm")}
        </button>
      </div>
    </div>`}_renderAddRow(e,t,r){const i=this._closingRows(t,r),a=[];for(let n=1;n<=e.depth;n++)if(n<e.depth){const l=this._nextSiblingAtDepth(e.index,n)||i.some(d=>d.depth===n);a.push(s`<div class="col">${l?s`<div class="line full ${this._columnHighlighted(e.afterId,n)?"hl":""}"></div>`:""}</div>`)}else a.push(s`<div class="col"><div class="line top"></div><div class="hline"></div></div>`);return s`<button
      class="add"
      title="Add a page here"
      @mouseenter="${()=>this._hoverAdd={afterId:e.afterId,depth:e.depth}}"
      @mouseleave="${()=>this._hoverAdd=null}"
      @focus="${()=>this._hoverAdd={afterId:e.afterId,depth:e.depth}}"
      @blur="${()=>this._hoverAdd=null}"
      @click="${()=>{this._hoverAdd=null,this._addAfter(e.afterId,e.depth)}}"
    >
      <div class="indent" style="width:${e.depth*ve}px">${a}</div>
      <div class="toggle">
        <div class="leaf"></div>
        <span class="plus">${S("oer:plus","sm")}</span>
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
        ${S("icons:link","sm")}Add existing
      </button>
      <button
        class="add-existing"
        title="Add a heading that labels the pages after it in the navigation"
        @mouseenter="${()=>this._hoverAdd={afterId:e.afterId,depth:e.depth}}"
        @mouseleave="${()=>this._hoverAdd=null}"
        @click="${()=>{this._hoverAdd=null,this._addHeading(e.afterId,e.depth)}}"
      >
        ${S("oer:heading-2","sm")}Add heading
      </button>
    </div>`}render(){if(!this.open)return s``;const e=this._visible(),t=this._rows.filter(c=>c.depth===0).length,r=this._rows.some((c,p)=>this._hasChildren(p)),i=this._dirty,a=this._deletedWithVersions().size,n=[...this._hidden.keys()].filter(c=>!this._deleted.has(c)).length,l=a?this._linksToDeleted():0,d=this._rows.filter((c,p)=>this._invalid(p)).length;return s`
      <div class="backdrop" @click="${this._requestClose}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${S("hax:site-map")}${this._rootItem?`${this._rootItem.title} outline`:"Site outline"}</h2>
            <p class="sub">
              ${this._rootItem?"Sub-pages of this page.":"Every page in the site."} Changes apply when you save.
            </p>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._requestClose}">${S("oer:x")}</button>
        </header>
        <div class="tools">
            ${r?s`<button class="tool" @click="${this._collapseAll}">${S("oer:chevron-right","sm")}Collapse all</button>
                  <button class="tool" @click="${()=>this._collapsed=new Set}">${S("oer:chevron-down","sm")}Expand all</button>`:""}
            <button
              class="tool"
              aria-pressed="${this._showIcons?"true":"false"}"
              title="Show the icon column here, to change or remove a page's icon"
              @click="${()=>this._showIcons=!this._showIcons}"
            >
              ${S(this._showIcons?"icons:visibility":"icons:visibility-off","sm")}Edit icons
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
                ${S("hax:site-map")}
                <p>No pages yet</p>
                <button class="btn outline" @click="${this._addFirst}">${S("oer:plus","sm")}Add page</button>
                <button class="btn outline" @click="${()=>this._addExisting(null,0)}">${S("icons:link","sm")}Add existing</button>
              </div>`}
        </div>
        <footer>
          ${this._confirmDiscard?s`<span class="warn">Discard your outline changes?</span>
                <button class="btn outline" @click="${()=>this._confirmDiscard=!1}">Keep editing</button>
                <button class="btn destructive" @click="${this._close}">Discard</button>`:s`${d?s`<span class="warn">${d} page${d===1?" is":"s are"} in a place ${d===1?"its":"their"} type isn't allowed. Change the type or move ${d===1?"it":"them"}.</span>`:a||n?s`<span class="warn">
                      ${[a?`${a} page${a===1?"":"s"}${a>this._deleted.size?" (with sub-pages and archived versions)":""} will be deleted${l?`, breaking ${l} link${l===1?"":"s"} to ${a===1?"it":"them"}`:""}.`:"",n?`${n} page${n===1?"":"s"} will leave the navigation and stay in Browse pages.`:""].join(" ")}
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
    `}}customElements.define(Xe.tag,Xe);function ir(){const o=globalThis.document;return o.querySelector(Xe.tag)||o.body.appendChild(o.createElement(Xe.tag))}const le=(o,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${E[o]||""}&quot;)"></span>`,Ao=[{id:"all",label:"All"},{id:"hidden",label:"Not in navigation"},{id:"versions",label:"Archived versions"}];let Je=class extends F{static get tag(){return"oer-pages-browser"}static get properties(){return{open:{type:Boolean,reflect:!0},_filter:{state:!0},_query:{state:!0},_confirm:{state:!0},_busy:{state:!0},_selected:{state:!0},_status:{state:!0}}}constructor(){super(),this.open=!1,this._filter="all",this._query="",this._selected=new Set,this._status="",this.__keys=e=>{!this.open||e.key!=="Escape"||this._busy||(e.preventDefault(),e.stopPropagation(),this._confirm?this._confirm=null:this._close())}}show(e="all"){this._filter=e,this._query="",this._confirm=null,this._busy=!1,this._selected=new Set,this._status="",this.open=!0,this.__stop?.(),this.__stop=O(()=>{this._list=_(D.manifest?.items)||[],this.requestUpdate()}),globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector("input")?.focus())}_close(){this.open=!1,this.__stop?.(),this.__stop=null,globalThis.removeEventListener("keydown",this.__keys,!0)}get _items(){return this._list||[]}_whyHidden(e,t,r){if(e.metadata?.oerSnapshotOf)return"archived";for(let i=e;i;i=t.get(i.parent)){if(i.metadata?.hideInMenu&&!me(i))return i===e?"removed":"parent";if(r.has(i.metadata?.pageType)&&i===e)return"type"}return""}_go(e){this._close(),globalThis.history.pushState({},"",e),globalThis.dispatchEvent(new PopStateEvent("popstate"))}async _showInNav(e){this._busy=!0;const t=this._items.map(r=>r.id===e.id?{...r,metadata:{...r.metadata,hideInMenu:!1},modified:!0}:r);await ae(t),this._busy=!1}updated(){for(const e of this.shadowRoot.querySelectorAll(".pick[data-id]"))e.checked=this._selected.has(e.dataset.id)}_toggleSelect(e,t){const r=new Set(this._selected);t?r.add(e):r.delete(e),this._selected=r,this._status=""}async _appendSelected(e){const t=this._items,r=new Map(t.map(p=>[p.id,p])),{types:i}=T(t),a=new Set(i.filter(p=>p.nav===!1).map(p=>p.id));let n=Math.max(-1,...t.filter(p=>!p.parent).map(p=>Number(p.order)||0))+1;const l=new Map,d=[];for(const p of e){const h=this._whyHidden(p,r,a);if(h==="removed"||h==="parent"){l.set(p.id,{...p,parent:null,order:n++,indent:0,metadata:{...p.metadata,hideInMenu:!1},modified:!0});continue}const m=p.metadata?.oerSnapshotOf,g=m?{page:m,version:p.metadata.version||""}:p.metadata?.oerRef?.page?p.metadata.oerRef:{page:p.id,version:""},u=r.get(g.page)||p,v=u.metadata?.pageType||"";d.push({id:ke(),title:u.title,parent:null,order:n++,indent:0,location:"",description:"",metadata:{...u.metadata?.icon?{icon:u.metadata.icon}:{},...v&&!a.has(v)?{pageType:v}:{},oerRef:g},contents:`<oer-include page="${g.page}"${g.version?` version="${g.version}"`:""}></oer-include>`,new:!0})}this._busy=!0,await ae([...t.map(p=>l.get(p.id)||p),...d]),this._busy=!1;const c=e.length;this._selected=new Set,this._status=`Appended ${c} page${c===1?"":"s"} to the navigation.`}async _delete(e){this._busy=!0,e.has(D.activeId)&&(globalThis.history.pushState({},"",D.homeLink||"./"),globalThis.dispatchEvent(new PopStateEvent("popstate"))),await ae(this._items.map(t=>e.has(t.id)?{...t,delete:!0}:t)),this._selected=new Set([...this._selected].filter(t=>!e.has(t))),this._confirm=null,this._status=`Deleted ${e.size} page${e.size===1?"":"s"}.`,this._busy=!1}static get styles(){return f`
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
    `}_renderRow(e,t){const{byId:r,hiddenTypes:i,types:a,items:n}=t,l=this._whyHidden(e,r,i),d=e.metadata?.oerSnapshotOf?r.get(e.metadata.oerSnapshotOf):null,c=e.metadata?.oerRef?.page?r.get(e.metadata.oerRef.page):null,p=a.find(Y=>Y.id===e.metadata?.pageType),h=nt(n,e.id).reverse().map(Y=>r.get(Y)?.title).filter(Boolean).join(" \u203A "),m=d?`${e.metadata?.oerSnapshotTitle||d.title} v${e.metadata.version}`:e.title,g=this._confirm===e.id,u=this._busy?"true":"false";let v=null;g&&(v=D2(n,[e.id]));const x=v?v.size-1:0,C=v?n.filter(Y=>!v.has(Y.id)&&v.has(Y.metadata?.oerRef?.page)).length:0,A=this._selected.has(e.id);return s`<li class="${A?"selected":""}">
      <input type="checkbox" class="pick" data-id="${e.id}" aria-label="Select ${m}" .checked="${A}" @change="${Y=>this._toggleSelect(e.id,Y.target.checked)}" />
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
              ${le("oer:eye","sm")}Show in navigation
            </button>`:""}
        <button class="btn ghost danger" aria-label="Delete ${m}" title="Delete" aria-disabled="${u}" @click="${()=>!this._busy&&(this._confirm=e.id)}">
          ${le("oer:trash-2","sm")}
        </button>
      </div>
      ${g?s`<div class="confirm" role="alert">
            <span
              >Delete “${m}”${x?` and ${x} sub-page${x===1?"":"s"} or archived version${x===1?"":"s"}`:""}?
              ${C?`${C} link${C===1?"":"s"} to ${x?"them":"it"} will break. `:""}This can't be undone here.</span
            >
            <button class="btn outline" @click="${()=>this._confirm=null}">Cancel</button>
            <button class="btn destructive" aria-disabled="${u}" @click="${()=>!this._busy&&this._delete(v)}">
              ${this._busy?"Deleting\u2026":"Delete"}
            </button>
          </div>`:""}
    </li>`}_renderSelectionBar(e,t){const r=this._selected.size,i=t.filter(c=>this._selected.has(c.id)).length,a=t.length>0&&i===t.length,n=r-i,l=(c,p)=>(c.metadata?.oerSnapshotTitle||c.title).localeCompare(p.metadata?.oerSnapshotTitle||p.title),d=this._busy?"true":"false";return s`<div class="selbar">
      <input
        type="checkbox"
        class="pick"
        aria-label="Select all shown"
        title="Select all shown"
        .checked="${a}"
        .indeterminate="${i>0&&!a}"
        @change="${c=>{const p=new Set(this._selected);for(const h of t)c.target.checked?p.add(h.id):p.delete(h.id);this._selected=p,this._status=""}}"
      />
      <span class="count" aria-live="polite">
        ${this._status||(r?`${r} selected${n?` (${n} not shown)`:""}`:"Select pages to append them to the navigation.")}
      </span>
      ${r&&this._confirm==="__selection"?this._renderBulkConfirm():""}
      ${r&&this._confirm!=="__selection"?s`<button class="btn ghost" @click="${()=>this._selected=new Set}">Clear</button>
            <button class="btn outline danger" aria-disabled="${d}" @click="${()=>!this._busy&&(this._confirm="__selection")}">
              ${le("oer:trash-2","sm")}Delete
            </button>
            <button
              class="btn primary"
              aria-disabled="${d}"
              @click="${()=>!this._busy&&this._appendSelected(e.filter(c=>this._selected.has(c.id)).sort(l))}"
            >
              ${le("oer:plus","sm")}${this._busy?"Appending\u2026":"Append to navigation"}
            </button>`:""}
    </div>`}_renderBulkConfirm(){const e=this._items,t=D2(e,this._selected),r=this._selected.size,i=t.size-r,a=e.filter(l=>!t.has(l.id)&&t.has(l.metadata?.oerRef?.page)).length,n=this._busy?"true":"false";return s`<div class="confirm" role="alert">
      <span
        >Delete ${r} selected page${r===1?"":"s"}${i?` and ${i} sub-page${i===1?"":"s"} or archived version${i===1?"":"s"}`:""}?
        ${a?`${a} link${a===1?"":"s"} to ${r+i===1?"it":"them"} will break. `:""}This can't be undone here.</span
      >
      <button class="btn outline" @click="${()=>this._confirm=null}">Cancel</button>
      <button class="btn destructive" aria-disabled="${n}" @click="${()=>!this._busy&&this._delete(t)}">
        ${this._busy?"Deleting\u2026":`Delete ${t.size}`}
      </button>
    </div>`}render(){if(!this.open)return s``;const e=this._items,t=new Map(e.map(c=>[c.id,c])),{types:r}=T(e),i=new Set(r.filter(c=>c.nav===!1).map(c=>c.id)),a={byId:t,hiddenTypes:i,types:r,items:e},n=e.filter(c=>!Q(c)&&!me(c)),l=this._query.trim().toLowerCase(),d=n.filter(c=>{const p=this._whyHidden(c,t,i);return this._filter==="hidden"?p==="removed"||p==="parent":this._filter==="versions"?p==="archived":!0}).filter(c=>!l||c.title.toLowerCase().includes(l)||`${c.metadata?.oerSnapshotTitle||""} v${c.metadata?.version||""}`.toLowerCase().includes(l)).sort((c,p)=>(c.metadata?.oerSnapshotTitle||c.title).localeCompare(p.metadata?.oerSnapshotTitle||p.title));return s`
      <div class="backdrop" @click="${()=>!this._busy&&this._close()}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${le("oer:files")}Browse pages</h2>
            <p class="sub">Every page in the site, including pages the navigation doesn't list.</p>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._close}">${le("oer:x")}</button>
        </header>
        <div class="tools">
          <label class="search">
            ${le("icons:search","sm")}
            <input type="search" placeholder="Search pages" aria-label="Search pages" .value="${this._query}" @input="${c=>this._query=c.target.value}" />
          </label>
          <div class="seg" role="group" aria-label="Show">
            ${Ao.map(c=>s`<button aria-pressed="${this._filter===c.id?"true":"false"}" @click="${()=>this._filter=c.id}">${c.label}</button>`)}
          </div>
        </div>
        ${this._renderSelectionBar(n,d)}
        <div class="body">
          ${d.length?s`<ul aria-label="Pages">
                ${d.map(c=>this._renderRow(c,a))}
              </ul>`:s`<p class="empty">${l?"No pages match.":this._filter==="hidden"?"Every page is in the navigation.":this._filter==="versions"?"No archived versions yet.":"No pages yet."}</p>`}
        </div>
        <footer>${d.length} of ${n.length} pages. To put a page somewhere specific, use Add existing in the outline builder.</footer>
      </div>
    `}};customElements.define(Je.tag,Je);function So(){const o=globalThis.document;return o.querySelector(Je.tag)||o.body.appendChild(o.createElement(Je.tag))}const q=(o,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${E[o]||""}&quot;)"></span>`,_e=o=>JSON.parse(JSON.stringify(o)),zo=[{label:"Paragraph",html:"<p></p>"},{label:"Sub-page outline",html:`<h2>In this lesson</h2>
<oer-collection scope="children" view="outline" sort="order"></oer-collection>`},{label:"Sub-page table",html:'<oer-collection scope="children" view="table" sort="order" controls="full"></oer-collection>'},{label:"Sub-page cards",html:'<oer-collection scope="children" view="cards" sort="order" controls="none"></oer-collection>'},{label:"Callout",html:'<oer-callout type="objective" title="What you will learn"><p></p></oer-callout>'}];let Ze=class extends F{static get tag(){return"oer-type-editor"}static get properties(){return{open:{type:Boolean,reflect:!0},_types:{state:!0},_selected:{state:!0},_expanded:{state:!0},_confirm:{state:!0},_io:{state:!0},_ioText:{state:!0},_ioError:{state:!0},_saving:{state:!0},_dragField:{state:!0}}}constructor(){super(),this.open=!1,this._types=[],this._selected=0,this._expanded=new Set,this._confirm=!1,this._io=null,this._ioText="",this._ioError="",this._saving=!1,this._dragField=null,this.__keys=e=>{!this.open||e.key!=="Escape"||To()||(e.preventDefault(),e.stopPropagation(),this._io?this._io=null:this._requestClose())}}show(){this._types=_e(T().types).map(e=>({...e,fields:e.fields.map(t=>({...t,__saved:!0}))})),this._usage=zi(),this._savedIds=new Set(this._types.map(e=>e.id)),this._snapshot=JSON.stringify(this._clean(this._types)),this._selected=0,this._expanded=new Set,this._confirm=!1,this._io=null,this.open=!0,globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector(".types button")?.focus())}_close(){this.open=!1,globalThis.removeEventListener("keydown",this.__keys,!0)}get _dirty(){return JSON.stringify(this._clean(this._types))!==this._snapshot}_requestClose(){if(this._dirty&&!this._confirm){this._confirm=!0;return}this._close()}_problems(){const e=[],t=new Set;for(const r of this._types){r.label.trim()||e.push("Every type needs a name."),t.has(r.id)&&e.push(`Two types share the ID \u201C${r.id}\u201D.`),t.add(r.id);const i=new Set;for(const a of r.fields)a.label.trim()||e.push(`${r.label||"A type"}: every field needs a label.`),i.has(a.name)&&e.push(`${r.label}: two fields share the key \u201C${a.name}\u201D.`),i.add(a.name),a.kind==="select"&&!(a.options||[]).length&&e.push(`${r.label}: \u201C${a.label}\u201D needs at least one choice.`)}return[...new Set(e)]}_update(e){const t=_e(this._types);e(t[this._selected],t),this._types=t,this._confirm=!1}_addType(){const e=_e(this._types);let t="new-type";for(let r=2;e.some(i=>i.id===t);r++)t=`new-type-${r}`;e.push({id:t,label:"New type",icon:"",description:"",children:null,fields:[]}),this._types=e,this._selected=e.length-1,this.updateComplete.then(()=>{const r=this.shadowRoot.querySelector("#type-label");r?.focus(),r?.select()})}_deleteType(){const e=this._types[this._selected];if(!e||this._usage.get(e.id))return;const t=_e(this._types).filter((r,i)=>i!==this._selected);for(const r of t)Array.isArray(r.children)&&(r.children=r.children.filter(i=>i!==e.id));this._types=t,this._selected=Math.max(0,this._selected-1)}_idLocked(e){return this._savedIds.has(e.id)&&(this._usage.get(e.id)||0)>0}_setLabel(e){this._update(t=>{!this._idLocked(t)&&!t.__idTouched&&!this._savedIds.has(t.id)&&(t.id=pt(e)),t.label=e})}async _chooseIcon(){const e=this._types[this._selected],t=await Xt().pick(e.icon);t!==null&&this._update(r=>r.icon=t)}_setChildrenMode(e){this._update(t=>{e==="any"?t.children=null:e==="none"?t.children=[]:t.children=Array.isArray(t.children)&&t.children.length?t.children:[],t.__only=e==="only"})}_toggleChild(e){this._update(t=>{const r=new Set(t.children||[]);r.has(e)?r.delete(e):r.add(e),t.children=[...r],t.__only=!0})}_addField(){this._update(e=>{let t="newField";for(let r=2;e.fields.some(i=>i.name===t);r++)t=`newField${r}`;e.fields.push({name:t,label:"",kind:"text"})}),this.updateComplete.then(()=>{const e=this.shadowRoot.querySelectorAll(".field-label");e[e.length-1]?.focus()})}_setField(e,t){this._update(r=>{const i=r.fields[e];"label"in t&&!i.__nameTouched&&!i.__saved&&(i.name=Ti(t.label)),Object.assign(i,t),i.kind!=="select"&&delete i.options,i.kind!=="relation"&&delete i.types;for(const a of Object.keys(i))(i[a]===!1||i[a]==="")&&a!=="label"&&a!=="name"&&delete i[a]})}_moveField(e,t){this._update(r=>{const i=e+t;if(i<0||i>=r.fields.length)return;const[a]=r.fields.splice(e,1);r.fields.splice(i,0,a)}),this.updateComplete.then(()=>this.shadowRoot.querySelectorAll(".grip")[e+t]?.focus())}_removeField(e){this._update(t=>t.fields.splice(e,1))}_toggleExpanded(e){const t=new Set(this._expanded);t.has(e)?t.delete(e):t.add(e),this._expanded=t}_clean(e){return JSON.parse(JSON.stringify(e,(t,r)=>t.startsWith("__")?void 0:r))}async _save(){!this._dirty||this._problems().length||this._saving||(this._saving=!0,await ji({version:1,types:this._clean(this._types)}),this._saving=!1,this._close())}_openExport(){this._ioText=JSON.stringify({version:1,types:this._clean(this._types)},null,2),this._ioError="",this._io="export"}_openImport(){this._ioText="",this._ioError="",this._io="import"}_import(){try{const e=JSON.parse(this._ioText),t=Array.isArray(e)?e:e.types;if(!Array.isArray(t)||t.some(i=>!i.id||!i.label||!Array.isArray(i.fields)))throw new Error("Expected { types: [{ id, label, fields: [] }, \u2026] }");const r=_e(this._types);for(const i of t){const a=r.findIndex(n=>n.id===i.id);a>=0?r[a]=i:r.push(i)}this._types=r,this._io=null}catch(e){this._ioError=e.message}}static get styles(){return f`
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
      <button class="new" @click="${this._addType}">${q("oer:plus","sm")}New type</button>
    </nav>`}_renderField(e,t,r){const i=`${e.id}:${r}`,a=this._expanded.has(i),n=this._dragField,l=n&&n.over===r&&n.from!==r?n.before?"over-before":"over-after":"";return s`<div
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
          ${q("oer:grip-vertical","sm")}
        </button>
        <input
          class="input field-label"
          placeholder="Field label"
          aria-label="Field label"
          .value="${t.label}"
          @input="${d=>this._setField(r,{label:d.target.value})}"
        />
        <select aria-label="Field kind" @change="${d=>this._setField(r,{kind:d.target.value})}">
          ${Ai.map(d=>s`<option value="${d.kind}" ?selected="${d.kind===t.kind}">${d.label}</option>`)}
        </select>
        <div class="center">
          <input type="checkbox" aria-label="Required" .checked="${!!t.required}" @change="${d=>this._setField(r,{required:d.target.checked})}" />
        </div>
        <div class="center">
          <input type="checkbox" aria-label="Show in page header" .checked="${!!t.header}" @change="${d=>this._setField(r,{header:d.target.checked})}" />
        </div>
        <div class="acts">
          <button class="icon-act" aria-expanded="${a?"true":"false"}" title="More settings" aria-label="More settings for ${t.label||"field"}" @click="${()=>this._toggleExpanded(i)}">
            ${q("oer:chevron-right","sm")}
          </button>
          <button class="icon-act danger" title="Remove field" aria-label="Remove ${t.label||"field"}" @click="${()=>this._removeField(r)}">
            ${q("oer:trash-2","sm")}
          </button>
        </div>
      </div>
      ${a?s`<div class="more">
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
                        ${c?q("oer:check","sm"):""}${d.label}
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
          </div>`:""}`}_renderEditor(){const e=this._types[this._selected];if(!e)return s`<div class="empty-editor"><div><p>No content types yet.</p><button class="btn outline" @click="${this._addType}">${q("oer:plus","sm")}New type</button></div></div>`;const t=this._idLocked(e),r=this._usage.get(e.id)||0,i=e.children===null||e.children===void 0?"any":e.children.length||e.__only?"only":"none";return s`<div class="editor">
      <section>
        <div class="row">
          <div>
            <label for="type-label">Name</label>
            <input id="type-label" class="input" .value="${e.label}" @input="${a=>this._setLabel(a.target.value)}" />
          </div>
          <div>
            <label for="type-id">ID</label>
            <input
              id="type-id"
              class="input mono"
              .value="${e.id}"
              ?readonly="${t}"
              @input="${a=>this._update(n=>{n.id=pt(a.target.value),n.__idTouched=!0})}"
            />
          </div>
          <div>
            <span class="label">Icon</span>
            <button class="icon-choice" @click="${this._chooseIcon}" aria-label="Choose icon">
              ${e.icon?s`<simple-icon-lite icon="${e.icon}"></simple-icon-lite>`:q("oer:smile-plus")}${e.icon?"Change":"Choose"}
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
            @input="${a=>this._update(n=>n.schemaType=a.target.value.trim()||void 0)}"
          />
          <p class="hint">How pages of this type describe themselves to search engines and repositories (oerschema.org). Left empty, a sensible default is used.</p>
        </div>
        ${t?s`<p class="hint">The ID is fixed because ${r} page${r===1?" uses":"s use"} this type.</p>`:""}
        <div style="margin-top:1rem">
          <label for="type-desc">Description</label>
          <textarea id="type-desc" .value="${e.description||""}" @input="${a=>this._update(n=>n.description=a.target.value)}"></textarea>
        </div>
      </section>

      <section>
        <label class="check" style="font-size:0.875rem">
          <input type="checkbox" .checked="${e.nav!==!1}" @change="${a=>this._update(n=>n.nav=a.target.checked)}" />
          Show in the navigation
        </label>
        <p class="hint">Off: pages of this type (and everything under them) stay out of the sidebar, which then lists only the sections that hold them, as in Decap. Collections, search, links and the outline still find them.</p>
      </section>

      <section>
        <label class="check" style="font-size:0.875rem">
          <input type="checkbox" .checked="${!!e.reader}" @change="${a=>this._update(n=>n.reader=a.target.checked||void 0)}" />
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
              ${this._types.map(a=>s`<button class="chip" aria-pressed="${(e.children||[]).includes(a.id)?"true":"false"}" @click="${()=>this._toggleChild(a.id)}">
                  ${(e.children||[]).includes(a.id)?q("oer:check","sm"):""}${a.label||a.id}
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
          ${e.fields.length?e.fields.map((a,n)=>this._renderField(e,a,n)):s`<div class="nofields">No fields yet. Every page also has a title, description and tags.</div>`}
          <button class="add" @click="${this._addField}">${q("oer:plus","sm")}Add field</button>
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
          @input="${a=>this._update(n=>n.template=a.target.value)}"
        ></textarea>
        <div class="chips">
          ${zo.map(a=>s`<button class="chip" @click="${()=>this._update(n=>n.template=`${(n.template||"").trim()}
${a.html}`.trim())}">
              ${q("oer:plus","sm")}${a.label}
            </button>`)}
        </div>
        <p class="hint">What a new page of this type starts with (HTML; any blocks). Existing pages are not changed.</p>
      </section>

      <section class="danger-zone">
        <button class="btn danger-outline" aria-disabled="${r?"true":"false"}" @click="${this._deleteType}">${q("oer:trash-2","sm")}Delete type</button>
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
            <h2 id="t">${q("hax:templates")}Content types</h2>
            <p class="sub">The kinds of page this site uses, their fields, and what each can contain.</p>
          </div>
          <button class="ghost" @click="${this._openImport}">${q("icons:file-upload","sm")}Import</button>
          <button class="ghost" @click="${this._openExport}">${q("icons:file-download","sm")}Export</button>
          <button class="ghost x" aria-label="Close" title="Close (Esc)" @click="${this._requestClose}">${q("oer:x")}</button>
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
    `}};customElements.define(Ze.tag,Ze);const To=()=>!!globalThis.document.querySelector("oer-icon-picker[open]");function jo(){const o=globalThis.document;return o.querySelector(Ze.tag)||o.body.appendChild(o.createElement(Ze.tag))}function or(){const o=new URLSearchParams(globalThis.location.search).get("embed");return o==="1"||o==="true"}let Qe=null,q2=0,ar=null;function nr(o){try{globalThis.parent?.postMessage(JSON.stringify(o),"*")}catch{}}function sr(o){const e=Math.ceil(o.getBoundingClientRect().height)+24;Math.abs(e-q2)<5||(q2=e,nr({subject:"lti.frameResize",height:e}))}function Bo(o){globalThis.parent===globalThis||!o||(Io(),Qe=new ResizeObserver(()=>{clearTimeout(ar),ar=setTimeout(()=>sr(o),100)}),Qe.observe(o),sr(o),nr({subject:"lti.scrollToTop"}))}function Io(){Qe?.disconnect(),Qe=null,q2=0}function lr(o,e={}){const t=new URL(o||"",globalThis.document.baseURI);t.searchParams.set("embed","1");for(const[r,i]of Object.entries(e))i&&t.searchParams.set(r,"true");return t.href}const dr=()=>_(D.manifest?.items)||[];async function cr(o){const e=new URL(o.location,globalThis.document.baseURI),t=await fetch(e,{cache:"no-cache"});return t.ok?(await t.text()).replace(/<page-break\b[^>]*>(?:\s*<\/page-break>)?/gi,"").replace(/<oer-draft\b[^>]*>[\s\S]*?<\/oer-draft>/gi,""):""}async function pr(o,e){let t=await cr(o);const r=[...t.matchAll(/<oer-include\b([^>]*)>\s*<\/oer-include>/gi)];for(const i of r){const a=i[1].match(/\bpage="([^"]+)"/)?.[1],n=i[1].match(/\bversion="([^"]+)"/)?.[1],l=e.find(c=>c.id===a),d=l&&n?ee(l.id,e).find(c=>c.version===n)?.snapshot:l;t=t.replace(i[0],d?await cr(d):"")}return t.replace(/<oer-collection\b[^>]*>\s*<\/oer-collection>/gi,"").trim()}async function hr(o){const e=dr(),t=e.find(a=>a.id===o),r=Be(e.filter(a=>!se(a)&&a.metadata?.pageType!==G&&a.metadata?.published!==!1),o),i=[{item:t,depth:-1,html:await pr(t,e)}];for(const{item:a,depth:n}of r)i.push({item:a,depth:n,html:await pr(a,e)});return i}const Lo=(()=>{const o=new Uint32Array(256);for(let e=0;e<256;e++){let t=e;for(let r=0;r<8;r++)t=t&1?3988292384^t>>>1:t>>>1;o[e]=t>>>0}return o})();function qo(o){let e=4294967295;for(let t=0;t<o.length;t++)e=Lo[(e^o[t])&255]^e>>>8;return(e^4294967295)>>>0}function mr(o){const e=new TextEncoder,t=[],r=[];let i=0;for(const l of o){const d=e.encode(l.name),c=typeof l.data=="string"?e.encode(l.data):l.data,p=qo(c),h=new DataView(new ArrayBuffer(30));h.setUint32(0,67324752,!0),h.setUint16(4,20,!0),h.setUint16(6,2048,!0),h.setUint32(14,p,!0),h.setUint32(18,c.length,!0),h.setUint32(22,c.length,!0),h.setUint16(26,d.length,!0),t.push(h.buffer,d,c);const m=new DataView(new ArrayBuffer(46));m.setUint32(0,33639248,!0),m.setUint16(4,20,!0),m.setUint16(6,20,!0),m.setUint16(8,2048,!0),m.setUint32(16,p,!0),m.setUint32(20,c.length,!0),m.setUint32(24,c.length,!0),m.setUint16(28,d.length,!0),m.setUint32(42,i,!0),r.push(m.buffer,d),i+=30+d.length+c.length}const a=r.reduce((l,d)=>l+(d.byteLength??d.length),0),n=new DataView(new ArrayBuffer(22));return n.setUint32(0,101010256,!0),n.setUint16(8,o.length,!0),n.setUint16(10,o.length,!0),n.setUint32(12,a,!0),n.setUint32(16,i,!0),new Blob([...t,...r,n.buffer],{type:"application/zip"})}const R=o=>String(o??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),ur=o=>String(o||"book").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"book";function gr(o,e){const t=URL.createObjectURL(o),r=Object.assign(globalThis.document.createElement("a"),{href:t,download:e});globalThis.document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(t),2e3)}const vr=`body{font:18px/1.6 system-ui,sans-serif;max-width:46rem;margin:2rem auto;padding:0 1rem;color:#111}
img,video{max-width:100%;height:auto}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ccc;padding:.4rem .6rem}
nav a{display:block;padding:.15rem 0}.meta{color:#555;font-size:.9rem}a{color:#0059a0}`;async function Ro(o){const e=await hr(o),t=e[0].item,r=new URL(".",globalThis.document.baseURI).href,i=l=>`chapter-${String(l).padStart(2,"0")}.html`,a=e.slice(1).map((l,d)=>({name:i(d+1),data:`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${R(l.item.title)} \u2014 ${R(t.title)}</title><base href="${r}"><style>${vr}</style></head><body>
<p class="meta"><a href="index.html">${R(t.title)}</a></p><h1>${R(l.item.title)}</h1>${l.html}
<p class="meta">${d>0?`<a href="${i(d)}">\u2190 Previous</a> \xB7 `:""}${d+2<e.length?`<a href="${i(d+2)}">Next \u2192</a>`:""}</p></body></html>`})),n=e.slice(1).map((l,d)=>`<a href="${i(d+1)}" style="padding-left:${l.depth*1.25}rem">${R(l.item.title)}</a>`).join(`
`);a.unshift({name:"index.html",data:`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${R(t.title)}</title><base href="${r}"><style>${vr}</style></head><body>
<h1>${R(t.title)}</h1>${t.description?`<p>${R(t.description)}</p>`:""}${e[0].html}<h2>Contents</h2><nav>${n}</nav></body></html>`}),gr(mr(a),`${ur(t.title)}-html.zip`)}async function Po(o){const e=dr(),t=e.find(c=>c.id===o),r=Be(e.filter(c=>!se(c)&&c.metadata?.pageType!==G&&c.metadata?.published!==!1),o),i=[],a=[],n=(c,p)=>{const h=`WL${p}`;return i.push({name:`${h}.xml`,data:`<?xml version="1.0" encoding="UTF-8"?>
<webLink xmlns="http://www.imsglobal.org/xsd/imsccv1p3/imswl_v1p3"><title>${R(c.title)}</title><url href="${R(lr(c.slug))}" target="_iframe"/></webLink>`}),a.push(`<resource identifier="${h}" type="imswl_xmlv1p3"><file href="${h}.xml"/></resource>`),h};let l="",d=0;for(r.forEach(({item:c,depth:p},h)=>{for(;d>p;d--)l+="</item>";const m=n(c,h+1);r[h+1]?.depth>p?(l+=`<item identifier="F${h+1}"><title>${R(c.title)}</title><item identifier="I${h+1}" identifierref="${m}"><title>${R(c.title)}</title></item>`,d=p+1):l+=`<item identifier="I${h+1}" identifierref="${m}"><title>${R(c.title)}</title></item>`});d>0;d--)l+="</item>";i.unshift({name:"imsmanifest.xml",data:`<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="${R(t.id)}" xmlns="http://www.imsglobal.org/xsd/imsccv1p3/imscp_v1p1" xmlns:lomimscc="http://ltsc.ieee.org/xsd/imsccv1p3/LOM/manifest">
<metadata><schema>IMS Common Cartridge</schema><schemaversion>1.3.0</schemaversion>
<lomimscc:lom><lomimscc:general><lomimscc:title><lomimscc:string>${R(t.title)}</lomimscc:string></lomimscc:title></lomimscc:general></lomimscc:lom></metadata>
<organizations><organization identifier="O1" structure="rooted-hierarchy"><item identifier="root">${l}</item></organization></organizations>
<resources>${a.join("")}</resources>
</manifest>`}),gr(mr(i),`${ur(t.title)}.imscc`)}const Oo=`@media print {
  body > *:not(oer-book-print) { display: none !important; }
  oer-book-print { position: static !important; overflow: visible !important; background: #fff !important; }
}`;let e2=class extends F{static get tag(){return"oer-book-print"}static get properties(){return{open:{type:Boolean,reflect:!0},_status:{state:!0}}}constructor(){super(),this.open=!1,this._status="",this.__keys=e=>{this.open&&e.key==="Escape"&&this._close()}}async show(e){if(!globalThis.document.getElementById("oer-print-css")){const d=Object.assign(globalThis.document.createElement("style"),{id:"oer-print-css",textContent:Oo});globalThis.document.head.append(d)}this.open=!0,this._status="Gathering chapters\u2026",globalThis.addEventListener("keydown",this.__keys,!0),this.replaceChildren();const t=await hr(e),[r,...i]=t,a=globalThis.document,n=a.createElement("section");n.className="oer-print-cover",n.innerHTML=`<h1>${r.item.title}</h1>${r.item.description?`<p>${r.item.description}</p>`:""}`;const l=a.createElement("nav");l.className="oer-print-toc",l.innerHTML=`<h2>Contents</h2><ol>${i.map(d=>`<li style="margin-left:${d.depth*1.25}rem">${d.item.title}</li>`).join("")}</ol>`,this.append(n,l);for(const d of i){const c=a.createElement("section");c.className="oer-print-chapter";const p=d.depth===0?"h1":"h2";c.innerHTML=`<${p}>${d.item.title}</${p}>${d.html}`,this.append(c)}this._status="",this.updateComplete.then(()=>this.shadowRoot.querySelector(".print")?.focus())}_close(){this.open=!1,globalThis.removeEventListener("keydown",this.__keys,!0),this.replaceChildren()}static get styles(){return f`
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
      <div class="page"><slot></slot></div>`}};customElements.define(e2.tag,e2);function Ho(){const o=globalThis.document;return o.querySelector(e2.tag)||o.body.appendChild(o.createElement(e2.tag))}const No=["CC BY 4.0","CC BY-SA 4.0","CC BY-NC 4.0","CC BY-NC-SA 4.0","CC BY-ND 4.0","CC BY-NC-ND 4.0","CC0 1.0","Public domain","All Rights Reserved"],fr=Object.fromEntries([["","\u2014"],...No.map(o=>[o,o])]);function fe(o){const e=String(o||"").trim();if(!e||/all rights reserved/i.test(e))return null;if(/^cc0/i.test(e))return{name:"CC0 1.0",url:"https://creativecommons.org/publicdomain/zero/1.0/",parts:["cc","zero"]};if(/^public domain$/i.test(e))return{name:"Public domain",url:"https://creativecommons.org/publicdomain/mark/1.0/",parts:["pd"]};const t=e.match(/^CC\s+([A-Z-]+)\s+(\d\.\d)$/i);if(!t)return{name:e,url:"",parts:[]};const r=t[1].toLowerCase();return{name:e,url:`https://creativecommons.org/licenses/${r}/${t[2]}/`,parts:["cc",...r.split("-")]}}const R2=o=>`https://mirrors.creativecommons.org/presskit/icons/${o}.svg`,Uo={small:"Small",medium:"Medium",large:"Large (full column)"};class U extends F{static get properties(){return{title:{type:String,reflect:!0},caption:{type:String,reflect:!0},credit:{type:String,reflect:!0},creditUrl:{type:String,attribute:"credit-url",reflect:!0},license:{type:String,reflect:!0},size:{type:String,reflect:!0}}}constructor(){super(),this.size="large"}static figureSettings(){return[{property:"title",title:"Title",description:"Describes the media for screen readers.",inputMethod:"textfield"},{property:"caption",title:"Caption",inputMethod:"textarea"},{property:"credit",title:"Credit",description:"Who made it, shown after the caption.",inputMethod:"textfield"},{property:"creditUrl",title:"Credit link",description:"Link to the original source.",inputMethod:"textfield",validationType:"url"},{property:"license",title:"License",description:"The media's own licence, if it differs from the page's. Listed in the page footer's credits.",inputMethod:"select",options:fr},{property:"size",title:"Size",inputMethod:"select",options:Uo}]}static get styles(){return f`
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
    `}renderEmpty(e,t){return s`<div class="empty"><strong>No ${e} yet</strong><span>${t}</span></div>`}renderCaption(){if(!this.caption&&!this.credit&&!this.license)return"";const e=this.credit?this.creditUrl?s`<a href="${this.creditUrl}" target="_blank" rel="noopener noreferrer">${this.credit}</a>`:this.credit:"",t=fe(this.license),r=this.license?t?.url?s`<a class="license" href="${t.url}" target="_blank" rel="license noopener noreferrer"
            >${t.parts.map(i=>s`<img src="${R2(i)}" alt="" />`)}${t.name}</a
          >`:s`<span class="license">${this.license}</span>`:"";return s`<figcaption>
      ${this.caption}${this.caption&&(e||r)?s` &mdash; `:""}${e}${e&&r?", ":""}${r}
    </figcaption>`}renderMedia(){return""}get aspect(){return null}render(){const e=this.aspect,t=this.height?/^\d+$/.test(String(this.height))?`${this.height}px`:this.height:"";return s`<figure>
      <div class="media ${e?"ratio":""}" style="${e?`aspect-ratio:${e}`:t?`height:${t}`:""}">
        ${this.renderMedia()}
      </div>
      ${this.renderCaption()}
    </figure>`}}function br(o){try{const e=new URL(o),t=e.hostname.replace(/^www\./,"");if(t==="youtube.com"||t==="youtube-nocookie.com"||t==="m.youtube.com"){const r=e.searchParams.get("list"),i=e.searchParams.get("v");if(e.pathname.startsWith("/embed/videoseries")&&r)return`https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(r)}`;if(e.pathname.startsWith("/embed/"))return`https://www.youtube-nocookie.com${e.pathname}${e.search}`;if(e.pathname.startsWith("/shorts/"))return`https://www.youtube-nocookie.com/embed/${e.pathname.split("/")[2]}`;if(i)return`https://www.youtube-nocookie.com/embed/${i}${r?`?list=${encodeURIComponent(r)}`:""}`;if(r)return`https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(r)}`}if(t==="youtu.be"){const r=e.pathname.slice(1).split("/")[0];if(r)return`https://www.youtube-nocookie.com/embed/${r}`}}catch{}return null}function wr(o){const e=String(o||"").match(/vimeo\.com\/(?:video\/)?(\d+)/);return e?`https://player.vimeo.com/video/${e[1]}`:null}function Vo(o){const e=String(o||"").trim();return br(e)||wr(e)||e}function Ko(o){let e=String(o||"").trim();if(!e)return"";if(e.includes("docs.google.com")){const t=e.match(/\/d\/(?:e\/)?([a-zA-Z0-9-_]+)/);t&&(e=t[1])}return e.startsWith("2PACX")?`https://docs.google.com/presentation/d/e/${e}/pubembed?start=false&loop=false&delayms=3000`:`https://docs.google.com/presentation/d/${e}/embed?start=false&loop=false&delayms=3000`}function Wo(o){const e=String(o||"").trim();if(!e)return"";if(e.includes("/embed"))return e;let t="";return e.includes("/3d-models/")?t=(e.split("/").pop()||"").match(/([a-f0-9]{32})/)?.[1]||"":e.includes("/models/")?t=(e.split("/models/")[1]||"").split(/[?#/]/)[0]:/^[a-f0-9]{32}$/.test(e)&&(t=e),t?`https://sketchfab.com/models/${t}/embed?autostart=1&ui_theme=dark`:e}const Dr=new Map;function P2(){const o=globalThis.HaxStore?.requestAvailability?.();if(!o||!o.appStoreLoaded)return!1;for(const[e,t]of Dr)o.elementList?.[e]||o.setHaxProperties(t.haxProperties,e);return!0}let xr=!1;function Yo(){if(xr)return;xr=!0,globalThis.addEventListener("hax-store-app-store-loaded",()=>setTimeout(P2,0));const o=setInterval(()=>{P2()&&clearInterval(o)},1e3)}function re(...o){for(const e of o)Dr.set(e.tag,e);Yo(),P2()}const $e=(o,e,t,r)=>({title:o,description:e,icon:t,color:"blue",tags:r,meta:{author:"Michael Collins"}}),yr={fromAttribute:o=>o!=="false",toAttribute:o=>o?"":"false"},kr="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";class _r extends U{static get tag(){return"oer-iframe"}static get properties(){return{...super.properties,src:{type:String,reflect:!0},height:{type:String,reflect:!0}}}constructor(){super(),this.height="600"}get _video(){return br(this.src)||wr(this.src)}get aspect(){return this._video?"16 / 9":null}renderMedia(){return this.src?s`<iframe
      src="${this._video||this.src}"
      title="${this.title||"Embedded page"}"
      allow="${kr}"
      allowfullscreen
      loading="lazy"
      credentialless
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>`:this.renderEmpty("page","Set the address in the block settings.")}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:$e("Embedded page","Show another web page (or a YouTube / Vimeo video) with a caption and credit.","hax:iframe",["Media","iframe","embed","website"]),settings:{configure:[{property:"src",title:"Address",description:"The page to show. YouTube and Vimeo links play as video.",inputMethod:"textfield",validationType:"url",required:!0},{property:"height",title:"Height",description:"In pixels (ignored for videos, which use 16:9).",inputMethod:"textfield"},...U.figureSettings()],advanced:[]},demoSchema:[{tag:"oer-iframe",properties:{src:"https://www.openstreetmap.org/export/embed.html",title:"Map",height:"400"},content:""}]}}}class $r extends U{static get tag(){return"oer-video"}static get properties(){return{...super.properties,src:{type:String,reflect:!0}}}get aspect(){return"16 / 9"}renderMedia(){return this.src?s`<iframe src="${Vo(this.src)}" title="${this.title||"Video"}" allow="${kr}" allowfullscreen loading="lazy" credentialless referrerpolicy="strict-origin-when-cross-origin"></iframe>`:this.renderEmpty("video","Paste a YouTube or Vimeo link in the block settings.")}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:$e("Video (with credit)","YouTube or Vimeo video with a caption and credit line.","hax:video",["Media","video","youtube","vimeo"]),settings:{configure:[{property:"src",title:"Video link",description:"A YouTube (video or playlist) or Vimeo link.",inputMethod:"textfield",validationType:"url",required:!0},...U.figureSettings()],advanced:[]},demoSchema:[{tag:"oer-video",properties:{src:"https://www.youtube.com/watch?v=uDqjIdI4bF4",title:"The 12 principles of animation"},content:""}]}}}class Fr extends U{static get tag(){return"oer-google-slides"}static get properties(){return{...super.properties,slides:{type:String,reflect:!0}}}get aspect(){return"960 / 569"}renderMedia(){return this.slides?s`<iframe src="${Ko(this.slides)}" title="${this.title||"Presentation"}" allowfullscreen loading="lazy" credentialless referrerpolicy="strict-origin-when-cross-origin"></iframe>`:this.renderEmpty("slides","Paste the presentation link or ID in the block settings.")}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:$e("Google Slides","A Google Slides presentation, with a caption and credit.","image:slideshow",["Media","slides","presentation","google"]),settings:{configure:[{property:"slides",title:"Presentation",description:"The presentation's link (Share or Publish to web) or its ID.",inputMethod:"textfield",required:!0},...U.figureSettings()],advanced:[]},demoSchema:[{tag:"oer-google-slides",properties:{slides:"",title:"Presentation"},content:""}]}}}class Cr extends U{static get tag(){return"oer-sketchfab"}static get properties(){return{...super.properties,src:{type:String,reflect:!0},height:{type:String,reflect:!0}}}constructor(){super(),this.height="600"}renderMedia(){return this.src?s`<iframe
      src="${Wo(this.src)}"
      title="${this.title||"Sketchfab model"}"
      allow="autoplay; fullscreen; xr-spatial-tracking"
      allowfullscreen
      loading="lazy"
      credentialless
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>`:this.renderEmpty("model","Paste the Sketchfab model link in the block settings.")}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:$e("Sketchfab model","An interactive 3D model from Sketchfab, with a caption and credit.","hax:module",["Media","3d","sketchfab","model"]),settings:{configure:[{property:"src",title:"Model link",description:"The model's Sketchfab page link (or its ID).",inputMethod:"textfield",required:!0},{property:"height",title:"Height",description:"In pixels.",inputMethod:"textfield"},...U.figureSettings()],advanced:[]},demoSchema:[{tag:"oer-sketchfab",properties:{src:"",title:"3D model",height:"500"},content:""}]}}}function Fe(){customElements.get("model-viewer")||Fe.started||(Fe.started=!0,import(`${globalThis.WCGlobalBasePath||new URL("build/es6/node_modules/",globalThis.document.baseURI).href}@google/model-viewer/dist/model-viewer.js`).catch(()=>{Fe.started=!1}))}class Er extends U{static get tag(){return"oer-3d-viewer"}static get properties(){return{...super.properties,src:{type:String,reflect:!0},height:{type:String,reflect:!0},autoRotate:{type:Boolean,attribute:"auto-rotate",reflect:!0,converter:yr},cameraControls:{type:Boolean,attribute:"camera-controls",reflect:!0,converter:yr}}}constructor(){super(),this.height="600",this.autoRotate=!0,this.cameraControls=!0}renderMedia(){return this.src?(Fe(),s`<model-viewer
      src="${this.src}"
      alt="${this.title||"3D model"}"
      ?auto-rotate="${this.autoRotate}"
      ?camera-controls="${this.cameraControls}"
      shadow-intensity="1"
      camera-orbit="45deg 55deg 2.5m"
      min-camera-orbit="auto auto 5%"
      max-camera-orbit="auto auto 100%"
    ></model-viewer>`):this.renderEmpty("3D model","Upload or link a .glb or .gltf file in the block settings.")}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:$e("3D model viewer","Show a .glb / .gltf model people can rotate and zoom, with a caption and credit.","hax:module",["Media","3d","model","gltf"]),settings:{configure:[{property:"src",title:"Model file",description:"A .glb or .gltf file.",inputMethod:"haxupload",required:!0},{property:"height",title:"Height",description:"In pixels.",inputMethod:"textfield"},{property:"autoRotate",title:"Rotate slowly",inputMethod:"boolean"},{property:"cameraControls",title:"Let people rotate and zoom",inputMethod:"boolean"},...U.figureSettings()],advanced:[]},demoSchema:[{tag:"oer-3d-viewer",properties:{src:"",title:"3D model",height:"500",autoRotate:!0,cameraControls:!0},content:""}]}}}for(const o of[_r,$r,Fr,Cr,Er])customElements.get(o.tag)||customElements.define(o.tag,o);re(_r,$r,Fr,Cr,Er);const de=(o,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${E[o]||""}&quot;)"></span>`,Mr={image:["png","jpg","jpeg","gif","webp","svg","avif"],pdf:["pdf"],video:["mp4","webm","mov","m4v","ogv"],audio:["mp3","wav","ogg","oga","m4a","aac","flac"],text:["txt","md","csv","tsv","json","xml","yml","yaml","js","mjs","ts","css","html","py","c","cpp","h","java","glsl","srt","vtt"],model:["glb","gltf"],docx:["docx"]},O2=2e5,Go="https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js",t2=o=>String(o||"").split(/[?#]/)[0].split("/").pop().split(".").slice(1).pop()?.toLowerCase()||"";function r2(o){const e=t2(o);return Object.keys(Mr).find(t=>Mr[t].includes(e))||""}const Xo=o=>/^https?:\/\//i.test(o)&&!o.startsWith(globalThis.location.origin);let H2=null;function Jo(){return globalThis.mammoth?Promise.resolve(globalThis.mammoth):(H2||=new Promise((o,e)=>{const t=Object.assign(globalThis.document.createElement("script"),{src:Go,async:!0});t.onload=()=>o(globalThis.mammoth),t.onerror=()=>{H2=null,e(new Error("Could not load the Word document viewer"))},globalThis.document.head.append(t)}),H2)}let i2=class extends F{static get tag(){return"oer-file-preview"}static get properties(){return{open:{type:Boolean,reflect:!0},_index:{state:!0},_body:{state:!0}}}constructor(){super(),this.open=!1,this._files=[],this._index=0,this.__keys=e=>{if(this.open){if(e.key==="Escape")this._close();else if(e.key==="ArrowRight"&&this._files.length>1&&!this._typing(e))this._go(1);else if(e.key==="ArrowLeft"&&this._files.length>1&&!this._typing(e))this._go(-1);else if(e.key==="Tab")this._trapFocus(e);else return;e.key!=="Tab"&&(e.preventDefault(),e.stopPropagation())}}}show(e,t=0){this._files=(e||[]).filter(r=>r?.url),this._files.length&&(this._returnFocus=globalThis.document.activeElement,this.open=!0,this._load(Math.max(0,Math.min(t,this._files.length-1))),globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector(".x")?.focus()))}_close(){this.open=!1,this._body=null,globalThis.removeEventListener("keydown",this.__keys,!0),this._returnFocus?.focus?.()}_typing(e){return e.composedPath().some(t=>t?.localName==="model-viewer"||t?.localName==="video"||t?.localName==="audio")}_trapFocus(e){const t=[...this.shadowRoot.querySelectorAll("button, a[href], video, audio, iframe, model-viewer")].filter(a=>!a.disabled);if(!t.length)return;const r=this.shadowRoot.activeElement,i=t.indexOf(r);e.shiftKey&&i<=0?(e.preventDefault(),t.at(-1).focus()):!e.shiftKey&&i===t.length-1&&(e.preventDefault(),t[0].focus())}_go(e){this._load((this._index+e+this._files.length)%this._files.length)}async _load(e){this._index=e,this._body=null;const t=this._files[e],r=r2(t.url),i=this.__token={};try{if(r==="model"&&Fe(),r==="text"){const a=await fetch(t.url);if(!a.ok)throw new Error(`Could not load the file (${a.status})`);const n=await a.text();i===this.__token&&(this._body={text:n.length>O2?`${n.slice(0,O2)}
\u2026`:n,cut:n.length>O2})}if(r==="docx"){const[a,n]=await Promise.all([Jo(),fetch(t.url).then(d=>d.ok?d.arrayBuffer():Promise.reject(new Error(`Could not load the file (${d.status})`)))]),l=await a.convertToHtml({arrayBuffer:n});i===this.__token&&(this._body={html:l.value})}}catch(a){i===this.__token&&(this._body={error:a.message||String(a)})}}static get styles(){return f`
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
    `}_renderStage(e){const t=r2(e.url),r=this._body,i=e.title||e.url.split("/").pop();if(r?.error)return s`<div class="note">${de("icons:error","big")}<span>${r.error}</span></div>`;switch(t){case"image":return s`<img src="${e.url}" alt="${e.alt||i}" />`;case"pdf":return s`<iframe src="${e.url}" title="${i}" credentialless referrerpolicy="strict-origin-when-cross-origin"></iframe>`;case"video":return s`<video src="${e.url}" controls preload="metadata" aria-label="${i}"></video>`;case"audio":return s`<audio src="${e.url}" controls preload="metadata" aria-label="${i}"></audio>`;case"model":return s`<model-viewer src="${e.url}" alt="${e.alt||i}" camera-controls touch-action="pan-y" shadow-intensity="1"></model-viewer>`;case"text":return r?s`<pre tabindex="0" aria-label="${i}">${r.text}</pre>`:s`<div class="note">Loading…</div>`;case"docx":return r?s`<div class="doc" tabindex="0" aria-label="${i}" .innerHTML="${r.html}"></div>`:s`<div class="note">Converting the document…</div>`;default:return s`<div class="note">
          ${de("icons:insert-drive-file","big")}
          <span>No preview for ${t2(e.url)?`.${t2(e.url)} files`:"this link"}. Download it to open it.</span>
        </div>`}}render(){if(!this.open)return s``;const e=this._files[this._index];if(!e)return s``;const t=e.title||e.url.split("/").pop(),r=Xo(e.url),i=this._files.length>1;return s`
      <div class="backdrop" @click="${this._close}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${t}</h2>
            <p class="sub">${t2(e.url).toUpperCase()||"Link"}${i?` \xB7 ${this._index+1} of ${this._files.length}`:""}</p>
          </div>
          <a class="btn" href="${e.url}" target="_blank" rel="noopener noreferrer" title="Open in a new tab">${de("icons:open-in-new")}<span class="label">Open</span></a>
          ${r?"":s`<a class="btn primary" href="${e.url}" download>${de("icons:file-download")}<span class="label">Download</span></a>`}
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._close}">${de("oer:x")}</button>
        </header>
        <div class="stage">
          ${this._renderStage(e)}
          ${i?s`<button class="nav prev" aria-label="Previous file" title="Previous (←)" @click="${()=>this._go(-1)}">${de("oer:chevron-left")}</button>
                <button class="nav next" aria-label="Next file" title="Next (→)" @click="${()=>this._go(1)}">${de("oer:chevron-right")}</button>`:""}
        </div>
        ${e.description||this._body?.cut?s`<footer><span class="desc">${e.description||""}</span>${this._body?.cut?s`<span>Showing the start of the file.</span>`:""}</footer>`:""}
      </div>
    `}};customElements.define(i2.tag,i2);function Zo(){const o=globalThis.document;return o.querySelector(i2.tag)||o.body.appendChild(o.createElement(i2.tag))}const ce=o=>s`<span class="lucide" aria-hidden="true" style="--src:url(&quot;${E[o]||""}&quot;)"></span>`,Qo=o=>o!=null&&o!==""&&!(Array.isArray(o)&&!o.length);let Ar=class extends F{static get tag(){return"oer-page-header"}static get properties(){return{_item:{state:!0},_types:{state:!0},_exportOpen:{state:!0},_exporting:{state:!0}}}constructor(){super(),this._item=null,this._types=[]}connectedCallback(){super.connectedCallback(),this.__dispose=O(()=>{const e=_(D.activeItem),t=_(D.manifest?.items)||[];Promise.resolve().then(()=>{this._allItems=t,this._item=e&&t.find(r=>r.id===e.id)||e,this._types=T(t).types})})}disconnectedCallback(){this.__dispose?.(),super.disconnectedCallback()}static get styles(){return[Ge,f`
      :host {
        display: block;
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
      }
      .block h2 {
        margin: 0 0 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        letter-spacing: normal;
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
    `]}_renderLinks(e){const t=ue(e,this._allItems||[]).filter(r=>D.isLoggedIn||r.item?.metadata?.published!==!1);return s`<ul class="rel">
      ${t.map(r=>{const i=this._types.find(a=>a.id===r.item?.metadata?.pageType);return s`<li>
          ${i?.icon?s`<simple-icon-lite icon="${i.icon}"></simple-icon-lite>`:s`<span class="noicon"></span>`}
          <span class="rel-text">
            ${r.item?s`<a href="${r.href}">${r.item.title}</a>`:s`<em>Missing page</em>`}
            <small>${[i?.label,r.version?`v${r.version}`:""].filter(Boolean).join(" \xB7 ")}</small>
          </span>
        </li>`})}
    </ul>`}_renderFiles(e){const t=(Array.isArray(e)?e:[]).filter(i=>i?.url),r=t.filter(i=>r2(i.url));return s`<ul class="att">
      ${t.map(i=>{const a=/^https?:\/\//i.test(i.url)&&!i.url.startsWith(globalThis.location.origin),n=i.title||i.url.split("/").pop(),l=mt(i.url)?s`<img src="${i.url}" alt="" loading="lazy" />`:s`<span class="kind">${Ni(i.url)}</span>`,d=r2(i.url)?()=>Zo().show(r,r.indexOf(i)):null;return s`<li>
          ${d?s`<button class="thumb" aria-label="Preview ${n}" title="Preview" @click="${d}">${l}</button>`:l}
          <span class="rel-text"
            >${d?s`<button class="name" @click="${d}"><b>${n}</b></button>`:s`<b>${n}</b>`}${i.description?s`<small>${i.description}</small>`:""}</span
          >
          <a class="dl" href="${i.url}" ?download="${!a}" target="${a?"_blank":""}" rel="${a?"noopener noreferrer":""}" aria-label="${a?"Open":"Download"} ${i.title||"file"}">
            ${ce(a?"icons:open-in-new":"icons:file-download")}
          </a>
        </li>`})}
    </ul>`}async _export(e,t){if(this._exportOpen=!1,e==="print")return Ho().show(t.id);this._exporting=!0;try{e==="html"?await Ro(t.id):await Po(t.id)}finally{this._exporting=!1}}_short(e,t){if(e.kind==="people")return Si(Ie(t).map(r=>r.name));if(Array.isArray(t))return t.map(r=>this._short(e,r)).join(", ");if(e.kind==="boolean")return t?"Yes":"No";if(e.kind==="select")return(e.options||[]).find(r=>r.value===t)?.label||t;if(e.kind==="date"){const r=new Date(t);return Number.isNaN(r.getTime())?t:r.toLocaleDateString()}return t}render(){const e=this._item,t=e?.metadata?.oerRef?.page,r=t?(this._allItems||[]).find(v=>v.id===t):null,i=r?{...e,description:e.description||r.description,metadata:{...e.metadata,oerFields:r.metadata?.oerFields||{}}}:e,a=i?.metadata?.pageType;if(!i||a===G)return s``;const n=this._types.find(v=>v.id===a),l=i.metadata?.oerFields||{},d=(n?.fields||[]).filter(v=>v.header&&Qo(l[v.name])),c=d.filter(v=>["text","number","select","boolean","date","people"].includes(v.kind)),p=d.filter(v=>!c.includes(v)),h=se(i),m=h?qi(i,this._allItems):null,g=i.metadata?.version,u=(this._allItems||[]).filter(v=>v.parent===i.id&&!v.metadata?.oerSnapshotOf&&!v.metadata?.hideInMenu).sort((v,x)=>(Number(v.order)||0)-(Number(x.order)||0))[0];return!n&&!h?s``:s`
      ${h&&m?s`<div class="archived" role="status">
            ${ce("icons:history")}
            <span>You're viewing version ${g} of <b>${m.title}</b>, as released.</span>
            <a href="${m.slug}">See the latest version</a>
          </div>`:""}
      <div class="meta">
        ${n?s`<span class="type">${n.icon?s`<simple-icon-lite icon="${n.icon}"></simple-icon-lite>`:""}${n.label}</span>`:""}
        ${l.placeholder?L2("md"):""}
        ${c.map(v=>s`<span class="pill">${v.kind==="people"&&v.name==="authors"?"By":v.label} <b>${this._short(v,l[v.name])}</b></span>`)}
        <span class="actions">
          ${n?.reader&&u?s`<a class="edit start" href="${u.slug}">${ce("hax:lesson")}Start reading</a>
                <span class="menu-wrap">
                  <button class="edit" aria-haspopup="menu" aria-expanded="${!!this._exportOpen}" @click="${()=>this._exportOpen=!this._exportOpen}">
                    ${ce("icons:file-download")}${this._exporting?"Exporting\u2026":"Export"}
                  </button>
                  ${this._exportOpen?s`<div class="menu" role="menu" @keydown="${v=>v.key==="Escape"&&(this._exportOpen=!1)}">
                        <button role="menuitem" @click="${()=>this._export("print",i)}">${ce("icons:print")}Print / PDF</button>
                        <button role="menuitem" @click="${()=>this._export("html",i)}">${ce("hax:file-html")}HTML (.zip)</button>
                        <button role="menuitem" @click="${()=>this._export("cc",i)}">${ce("hax:module")}Common Cartridge (.imscc)</button>
                      </div>`:""}
                </span>`:""}
        </span>
      </div>
      ${n&&i.description?s`<p class="desc">${i.description}</p>`:""}
      ${p.length?s`<div class="blocks">
            ${p.map(v=>{const x=l[v.name];return s`<section class="block">
                <h2>${v.label}</h2>
                ${v.kind==="relation"?this._renderLinks(x):v.kind==="files"?this._renderFiles(x):v.kind==="list"?s`<ul>${(Array.isArray(x)?x:[x]).map(C=>s`<li>${C}</li>`)}</ul>`:v.kind==="image"?s`<img src="${x}" alt="" />`:v.kind==="url"?s`<p><a href="${x}">${x}</a></p>`:s`<p>${x}</p>`}
              </section>`})}
          </div>`:""}
    `}};customElements.define(Ar.tag,Ar);const N2=(o,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${E[o]||""}&quot;)"></span>`,ea=[{part:"patch",label:"Patch",hint:"Fixes: typos, broken links"},{part:"minor",label:"Minor",hint:"Additions that keep existing use working"},{part:"major",label:"Major",hint:"Changes that break how it was used"}];let o2=class extends F{static get tag(){return"oer-versions-dialog"}static get properties(){return{open:{type:Boolean,reflect:!0},_part:{state:!0},_notes:{state:!0},_busy:{state:!0},_error:{state:!0},_publishing:{state:!0}}}constructor(){super(),this.open=!1,this._part="minor",this._notes="",this.__keys=e=>{this.open&&e.key==="Escape"&&!this._busy&&(e.preventDefault(),e.stopPropagation(),this._close())}}show(e,{publish:t=!1}={}){this._pageId=e,this._part="minor",this._notes="",this._error="",this._busy=!1,this._publishing=t&&D.isLoggedIn,this.open=!0,globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector(this._publishing?"textarea":"a, button")?.focus())}_close(){this.open=!1,globalThis.removeEventListener("keydown",this.__keys,!0)}get _page(){return(_(D.manifest?.items)||[]).find(e=>e.id===this._pageId)||null}async _publish(){if(this._busy)return;const e=this._page,t=k2(e?.metadata?.version||"0.0.0",this._part);this._busy=!0,this._error="";try{await Pi(this._pageId,t,this._notes),this._publishing=!1}catch(r){this._error=r.message}this._busy=!1}_go(e){this._close(),globalThis.history.pushState({},"",e),globalThis.dispatchEvent(new PopStateEvent("popstate"))}static get styles(){return f`
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
    `}render(){if(!this.open)return s``;const e=this._page;if(!e)return s``;const t=e.metadata?.version||"",r=ee(e.id),i=a=>a?new Date(Number(a)*1e3).toLocaleDateString():"";return s`
      <div class="backdrop" @click="${()=>!this._busy&&this._close()}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${N2("icons:history")}Versions</h2>
            <p class="sub">${e.title}${t?` \u2014 latest release v${t}`:" \u2014 not released yet"}</p>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._close}">${N2("oer:x")}</button>
        </header>
        <div class="body">
          ${this._publishing?s`<section class="publish">
                <h3>Publish a version</h3>
                <div class="bumps" role="radiogroup" aria-label="Kind of change">
                  ${ea.map(a=>s`<button class="bump" role="radio" aria-checked="${this._part===a.part}" @click="${()=>this._part=a.part}">
                      <b>${a.label}</b><code>${t||"0.0.0"} → ${k2(t||"0.0.0",a.part)}</code><span>${a.hint}</span>
                    </button>`)}
                </div>
                <label for="notes">Release notes</label>
                <textarea id="notes" .value="${this._notes}" @input="${a=>this._notes=a.target.value}" placeholder="What changed in this version?"></textarea>
                <p class="hint">Freezes the page as it is now. Readers and books can keep using this version while the page changes.</p>
                ${this._error?s`<p class="error">${this._error}</p>`:""}
                <div class="row">
                  <button class="btn outline" @click="${()=>this._publishing=!1}">Cancel</button>
                  <button class="btn primary" aria-disabled="${this._busy?"true":"false"}" @click="${this._publish}">
                    ${this._busy?"Publishing\u2026":`Publish v${k2(t||"0.0.0",this._part)}`}
                  </button>
                </div>
              </section>`:D.isLoggedIn?s`<div><button class="btn outline" @click="${()=>this._publishing=!0}">${N2("oer:plus")}Publish a version</button></div>`:""}
          ${r.length?s`<ol>
                ${r.map((a,n)=>s`<li>
                    <span class="v">v${a.version}</span>
                    <span class="when">${i(a.date)}</span>
                    ${n===0?s`<span class="badge">Latest release</span>`:s`<span></span>`}
                    ${a.notes?s`<p class="notes">${a.notes}</p>`:""}
                    ${a.snapshot?s`<button class="link" @click="${()=>this._go(a.snapshot.slug)}">View v${a.version} as released</button>`:""}
                  </li>`)}
              </ol>`:s`<p class="empty">No versions yet. ${D.isLoggedIn?"Publish one to freeze the page as it is now.":""}</p>`}
        </div>
      </div>
    `}};customElements.define(o2.tag,o2);function Sr(){const o=globalThis.document;return o.querySelector(o2.tag)||o.body.appendChild(o.createElement(o2.tag))}const zr={light:"https://cdn.jsdelivr.net/gh/open-curriculum/oerschema@master/public/oerschema-logo-black.png",dark:"https://cdn.jsdelivr.net/gh/open-curriculum/oerschema@master/public/oerschema-logo-white.png"},ta=["oer-iframe","oer-video","oer-google-slides","oer-sketchfab","oer-3d-viewer","oer-code-embed"],ra=["oer-credit",...ta.flatMap(o=>[`${o}[credit]`,`${o}[license]`])].join(", "),a2=3,n2=(o,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${E[o]||""}&quot;)"></span>`,Tr={lesson:"oer:LearningComponent",exercise:"oer:Practice",project:"oer:Project",quiz:"oer:Quiz",unit:"oer:Unit",pathway:"oer:Course",specialization:"oer:InstructionalPattern",article:"oer:SupportingMaterial",tutorial:"oer:SupportingMaterial",lecture:"oer:SupportingMaterial",rubric:"oer:Rubric",book:"schema:Book",section:"oer:Unit"},U2=o=>(Array.isArray(o)?o:o?[o]:[]).map(e=>String(e).trim()).filter(Boolean);let jr=class extends F{static get tag(){return"oer-page-footer"}static get properties(){return{_item:{state:!0},_aiul:{state:!0},_aiulOpen:{state:!0},_cite:{state:!0},_copied:{state:!0},_schemaOpen:{state:!0},_usedAll:{state:!0},_dark:{state:!0}}}connectedCallback(){super.connectedCallback(),this.__dispose=O(()=>{const t=_(D.activeItem),r=_(D.manifest?.items)||[],i=_(D.manifest),a=!!_(D.darkMode);Promise.resolve().then(()=>{this._dark=a,this._items=r,this._site=i;const n=t&&r.find(d=>d.id===t.id),l=n?.metadata?.oerRef?.page&&r.find(d=>d.id===n.metadata.oerRef.page);this._item=l?{...n,metadata:{...n.metadata,oerFields:l.metadata?.oerFields||{}}}:n||t,this._cite=!1,this._schemaOpen=!1,this._usedAll=!1,this._aiulOpen=null,this._writeJsonLd()})}),gt().then(t=>this._aiul=t),this.__credits=new MutationObserver(()=>{clearTimeout(this.__creditsTimer),this.__creditsTimer=setTimeout(()=>this._refreshCredits(),150)});const e=this._contentRoot();e&&this.__credits.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["credit","credit-url","license","title","creator","creator-url","source","note","caption"]}),this._refreshCredits()}_contentRoot(){return this.getRootNode()?.host||null}_refreshCredits(){const e=this._contentRoot(),t=(e?[...e.querySelectorAll(ra)]:[]).map(r=>r.localName==="oer-credit"?{title:r.title||"",creator:r.creator||"",creatorUrl:r.creatorUrl||"",source:r.source||"",license:r.license||""}:{title:r.caption||r.title||"",creator:r.credit||"",creatorUrl:"",source:r.creditUrl||"",license:r.license||""});JSON.stringify(t)!==JSON.stringify(this._credits||[])&&(this._credits=t,this.requestUpdate(),this._writeJsonLd())}disconnectedCallback(){this.__dispose?.(),this.__credits?.disconnect(),globalThis.document.getElementById("oer-schema-jsonld")?.remove(),super.disconnectedCallback()}get _fields(){const e={...this._item?.metadata?.oerFields||{}};for(const t of this._type?.fields||[])(e[t.name]===void 0||e[t.name]==="")&&t.default&&(e[t.name]=t.default);return e}get _people(){const e=this._fields,t=Ie(e.authors);if(t.length)return t;if(e.author)return[{name:String(e.author),url:String(e.authorUrl||"")}];const r=this._site?.author||this._site?.metadata?.author?.name;return r?[{name:String(r),url:""}]:[]}get _authors(){return this._people.map(e=>e.name)}get _type(){return T(this._items).types.find(e=>e.id===this._item?.metadata?.pageType)||null}_url(){return new URL(this._item?.slug||"",globalThis.document.baseURI).href}_schema(){const e=this._item;if(!e)return null;const t=this._fields,r=fe(t.license),i=e.metadata?.pageType,a={"@context":{oer:"https://oerschema.org/",schema:"https://schema.org/"},"@type":this._type?.schemaType||Tr[String(i||"").replace(/^oer:/,"")]||"schema:CreativeWork","@id":this._url(),"schema:name":e.title,"schema:url":this._url()};e.description&&(a["schema:description"]=e.description),r?.url&&(a["schema:license"]=r.url),this._authors.length&&(a["schema:author"]=this._people.map(p=>({"@type":"schema:Person","schema:name":p.name,...p.url?{"schema:url":p.url}:{}}))),e.metadata?.updated&&(a["schema:dateModified"]=new Date(e.metadata.updated*1e3).toISOString()),e.metadata?.version&&(a["schema:version"]=e.metadata.version),t.difficulty&&(a["schema:educationalLevel"]=t.difficulty),t.estimatedDuration&&(a["schema:timeRequired"]=t.estimatedDuration);const n=U2(t.learningObjectives);n.length&&(a["oer:hasLearningObjective"]=n.map(p=>({"@type":"oer:LearningObjective","schema:description":p})));const l=(t.components||[]).map(p=>(this._items||[]).find(h=>h.id===p?.page)).filter(p=>p&&p.metadata?.published!==!1);if(l.length){const p=T(this._items||[]).types;a["oer:hasComponent"]=l.map(h=>({"@type":p.find(m=>m.id===h.metadata?.pageType)?.schemaType||Tr[String(h.metadata?.pageType||"").replace(/^oer:/,"")]||"oer:LearningComponent","schema:name":h.title,"schema:url":new URL(h.slug,globalThis.document.baseURI).href}))}const d=U2(String(e.metadata?.tags||"").split(","));d.length&&(a["schema:keywords"]=d.join(", "));const c=(this._credits||[]).filter(p=>p.title||p.creator||p.license);return c.length&&(a["schema:hasPart"]=c.map(p=>({"@type":"schema:CreativeWork",...p.title?{"schema:name":p.title}:{},...p.creator?{"schema:creator":{"@type":"schema:Person","schema:name":p.creator,...p.creatorUrl?{"schema:url":p.creatorUrl}:{}}}:{},...p.source?{"schema:url":p.source}:{},...p.license?{"schema:license":fe(p.license)?.url||p.license}:{}}))),a}_writeJsonLd(){const e=globalThis.document;let t=e.getElementById("oer-schema-jsonld");const r=this._item?.metadata?.pageType&&this._item.metadata.pageType!==G?this._schema():null;if(!r)return t?.remove();t||(t=Object.assign(e.createElement("script"),{id:"oer-schema-jsonld",type:"application/ld+json"}),e.head.append(t)),t.textContent=JSON.stringify(r)}_citation(e){const t=this._item,r=this._authors,i=new Date((t.metadata?.updated||t.metadata?.created||Date.now()/1e3)*1e3).getFullYear(),a=this._site?.title||"",n=this._url(),l=(d,c)=>r.length>1?`${r.slice(0,-1).join(d)}${c}${r.at(-1)}`:r[0]||a;switch(e){case"APA":return`${l(", ",", & ")} (${i}). ${t.title}. ${a}. ${n}`;case"MLA":return`${l(", ",", and ")}. "${t.title}." ${a}, ${i}, ${n}.`;case"Chicago":return`${l(", ",", and ")}. "${t.title}." ${a}, ${i}. ${n}.`;default:return`@misc{${`${(r[0]||a).split(/\s+/).pop()}${i}`.replace(/[^A-Za-z0-9]/g,"")},
  author = {${r.join(" and ")||a}},
  title = {${t.title}},
  year = {${i}},
  publisher = {${a}},
  url = {${n}}
}`}}async _copy(e){try{await globalThis.navigator.clipboard.writeText(this._citation(e)),this._copied=e,setTimeout(()=>this._copied="",2e3)}catch{this._copied=""}}static get styles(){return f`
      :host {
        display: block;
        margin-top: 3rem;
        padding-top: 1.25rem;
        border-top: 1px solid var(--border);
        font-size: 0.8125rem;
        line-height: 1.6;
        color: var(--muted-foreground);
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
    `}_renderAiul(e){if(!e.length)return"";const t=e.map(a=>F2(a,this._aiul)),r=t.find(a=>a.code===this._aiulOpen),i=a=>this._aiulOpen=this._aiulOpen===a?null:a;return s`<dt>AI use</dt>
      <dd class="aiul">
        <div class="aiul-tags">
          ${t.map((a,n)=>s`<button
              class="aiul-tag"
              aria-expanded="${r===a?"true":"false"}"
              aria-controls="aiul-panel"
              @click="${()=>i(a.code)}"
            >
              ${a.image?s`<img src="${a.image}" alt="" loading="lazy" @error="${l=>l.target.remove()}" />`:s`<code>${a.title}</code>`}
              <span class="aiul-name">${a.name||a.title}${a.modifier?s`<span class="aiul-mod"> · ${a.modifier}</span>`:""}</span>
              ${n2(r===a?"oer:chevron-up":"oer:chevron-down","sm")}
            </button>`)}
        </div>
        ${r?s`<div class="aiul-panel" id="aiul-panel" role="region" aria-label="${r.title}${r.name?` (${r.name})`:""}">
              <p class="aiul-desc"><b>${r.title}${r.name?` \xB7 ${r.name}`:""}.</b> ${r.description}${r.modifier?s` Applies to <b>${r.modifier}</b> work.`:""}</p>
              ${r.requirements.length?s`<h3>Requirements</h3>
                    <ul>
                      ${r.requirements.map(a=>s`<li>${a}</li>`)}
                    </ul>`:""}
              ${r.students.length?s`<h3>Guidelines for students</h3>
                    <ul>
                      ${r.students.map(a=>s`<li>${a}</li>`)}
                    </ul>`:""}
              <p class="aiul-links">
                ${r.url?s`<a href="${r.url}" target="_blank" rel="noopener noreferrer">Full ${r.title} license</a>`:""}
                <a href="${Vi}" target="_blank" rel="noopener noreferrer">About AI Usage Licenses</a>
              </p>
            </div>`:""}
      </dd>`}_renderCredits(){const e=(this._credits||[]).filter(r=>r.title||r.creator||r.license);if(!e.length)return"";const t=(r,i)=>i?s`<a href="${i}" target="_blank" rel="noopener noreferrer">${r}</a>`:r;return s`<dt>Credits</dt>
      <dd>
        <ul class="credits">
          ${e.map(r=>{const i=fe(r.license);return s`<li>
              ${r.title?t(r.title,r.source):""}${r.title&&r.creator?" \u2014 ":""}${r.creator?t(r.creator,r.creatorUrl||(r.title?"":r.source)):""}${(r.title||r.creator)&&r.license?", ":""}${r.license?i?.url?s`<a href="${i.url}" target="_blank" rel="license noopener noreferrer">${i.name}</a>`:r.license:""}
            </li>`})}
        </ul>
      </dd>`}_renderPeople(){const e=this._people;return e.map((t,r)=>{const i=r===e.length-1,a=r===0?"":i?e.length>2?", and ":" and ":", ";return s`${a}${t.url?s`<a href="${t.url}" target="_blank" rel="noopener noreferrer">${t.name}</a>`:t.name}`})}_renderVersion(){const e=this._item,t=e?.metadata?.version,r=e?.metadata?.updated?new Date(e.metadata.updated*1e3):null;if(!t&&!r)return"";const i=r?r.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"}):"";return s`<dt>${t?"Version":"Updated"}</dt>
      <dd>
        ${t?s`<button
              class="pill version"
              title="All versions"
              aria-label="Version ${t}${e.metadata?.oerSnapshotOf?", archived":""}. All versions"
              @click="${()=>Sr().show(e.metadata?.oerSnapshotOf||e.id)}"
            >
              ${n2("icons:history")}v${t}${e.metadata?.oerSnapshotOf?" \xB7 archived":""}
            </button>`:""}
        ${i?s`<span class="${t?"muted":""}">${t?`Updated ${i}`:i}</span>`:""}
      </dd>`}_renderUsedIn(){const e=this._item?.metadata?.oerRef?.page?null:this._item?.id;if(!e)return"";const t=Oi(e,T(this._items).types,this._items);if(!t.length)return"";const r=new Map;for(const a of t)r.set(a.via,[...r.get(a.via)||[],a.item]);const i=[...r.values()].reduce((a,n)=>a+Math.max(0,n.length-a2),0);return s`<dt>Used in</dt>
      <dd>
        <span>
          ${[...r].map(([a,n])=>{const l=this._usedAll?n:n.slice(0,a2);return s`<span class="used-group"
              ><span class="via">${a}:</span>${l.map((d,c)=>s`${c?", ":""}<a href="${d.slug}">${d.title}</a>`)}${!this._usedAll&&n.length>a2?s`, and ${n.length-a2} more`:""}</span
            >`})}
          ${i?s` <button class="link" aria-expanded="${this._usedAll?"true":"false"}" @click="${()=>this._usedAll=!this._usedAll}">
                ${this._usedAll?"Show fewer":"Show all"}
              </button>`:""}
        </span>
      </dd>`}render(){const e=this._item;if(e?.metadata?.pageType===G)return s``;if(!e?.metadata?.pageType)return e?.metadata?.version?s`<dl>${this._renderVersion()}</dl>`:s``;const t=this._fields,r=fe(t.license),i=this._authors,a=new URLSearchParams(globalThis.location.search).get("hideAILicense")==="true"?[]:U2(t.aiLicense).flatMap(n=>n.split(",")).map(n=>n.trim()).filter(Boolean);return s`
      <div class="top">
        <p class="license">
          ${r?.parts?.length?s`<a class="cc" href="${r.url}" target="_blank" rel="license noopener noreferrer" aria-label="${r.name}">
                ${r.parts.map(n=>s`<img src="${R2(n)}" alt="" loading="lazy" />`)}
              </a>`:""}
          <span>
            <b>${e.title}</b>${i.length?s` by ${this._renderPeople()}`:""}${r?s` is licensed under ${r.url?s`<a href="${r.url}" target="_blank" rel="license noopener noreferrer">${r.name}</a>`:r.name}.`:t.license?s` — ${t.license}.`:""}
          </span>
        </p>
        <span class="actions">
          <button class="btn" aria-expanded="${this._cite?"true":"false"}" @click="${()=>(this._cite=!this._cite,this._schemaOpen=!1)}">
            ${n2("editor:format-quote")}Cite
          </button>
          <button
            class="btn badge"
            aria-label="OER Schema: view this page's structured data"
            title="OER Schema: view this page's structured data"
            aria-expanded="${this._schemaOpen?"true":"false"}"
            @click="${()=>(this._schemaOpen=!this._schemaOpen,this._cite=!1)}"
          >
            <img src="${this._dark?zr.dark:zr.light}" alt="OER Schema" @error="${n=>n.target.replaceWith(globalThis.document.createTextNode("OER Schema"))}" />
          </button>
        </span>
      </div>
      ${this._cite?s`<div class="panel">
            ${["APA","MLA","Chicago","BibTeX"].map(n=>s`<div class="cite-row">
                <b>${n}</b><code>${this._citation(n)}</code>
                <button class="copy" @click="${()=>this._copy(n)}">${n2(this._copied===n?"oer:check":"icons:content-copy")}${this._copied===n?"Copied":"Copy"}</button>
              </div>`)}
          </div>`:""}
      ${this._schemaOpen?s`<div class="panel">
            <pre>${JSON.stringify(this._schema(),null,2)}</pre>
            <p style="margin:0.5rem 0 0">Published in the page as JSON-LD (<a href="https://oerschema.org/" target="_blank" rel="noopener noreferrer">OER Schema</a> and schema.org) for search engines and repositories.</p>
          </div>`:""}
      <dl>${this._renderAiul(a)}${this._renderVersion()}${this._renderUsedIn()}${this._renderCredits()}</dl>
    `}};customElements.define(jr.tag,jr);const s2=(o,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${E[o]||""}&quot;)"></span>`,ia=[{key:"hideRubric",label:"Rubric",hint:"Assessment rubrics on the page."},{key:"hideAILicense",label:"AI usage license",hint:"The AIUL notice in the page footer."},{key:"hideHeader",label:"Page header",hint:"Type, description and details under the title."},{key:"hideTitle",label:"Title",hint:"The page title."}];class l2 extends F{static get tag(){return"oer-embed-dialog"}static get properties(){return{open:{type:Boolean,reflect:!0},_hide:{state:!0},_height:{state:!0},_copied:{state:!0}}}constructor(){super(),this.open=!1,this._hide={},this._height=600,this._copied="",this.__keys=e=>{this.open&&e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),this._close())}}show(e){this._item=e,this._hide={},this._copied="",this.open=!0,globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector("input")?.focus())}_close(){this.open=!1,globalThis.removeEventListener("keydown",this.__keys,!0)}get _url(){return lr(this._item?.slug,this._hide)}get _code(){const e=(this._item?.title||"Embedded page").replace(/"/g,"&quot;");return`<iframe src="${this._url}" title="${e}" width="100%" height="${this._height}" style="border:0" allowfullscreen></iframe>`}async _copy(e){try{await globalThis.navigator.clipboard.writeText(e==="link"?this._url:this._code),this._copied=e,setTimeout(()=>this._copied="",2e3)}catch{this.shadowRoot.querySelector("textarea")?.select()}}static get styles(){return f`
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
            <h2 id="t">${s2("icons:open-in-new")}Embed this page</h2>
            <p class="sub">${this._item?.title} — for an LMS (Canvas resizes the frame to fit) or any website.</p>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._close}">${s2("oer:x")}</button>
        </header>
        <div class="body">
          <div class="side">
            <div>
              <h3>Leave out</h3>
              ${ia.map(e=>s`<label class="opt">
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
                <button class="btn primary" @click="${()=>this._copy("code")}">${s2(this._copied==="code"?"oer:check":"icons:content-copy")}${this._copied==="code"?"Copied":"Copy code"}</button>
                <button class="btn outline" @click="${()=>this._copy("link")}">${s2(this._copied==="link"?"oer:check":"icons:link")}${this._copied==="link"?"Copied":"Copy link"}</button>
              </div>
            </div>
          </div>
          <div class="preview">
            <h3>Preview</h3>
            <iframe src="${this._url}" title="Preview of the embedded page"></iframe>
          </div>
        </div>
      </div>
    `:s``}}customElements.define(l2.tag,l2);function Br(){const o=globalThis.document;return o.querySelector(l2.tag)||o.body.appendChild(o.createElement(l2.tag))}v2(`url("${E["icons:chevron-right"]}")`);const oa={"map-menu-item, map-menu-header":f`
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
  `,"map-menu-submenu":f`
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
  `,"map-menu-container":f`
    #activeindicator {
      display: none !important;
    }
  `,"map-menu-builder":f`
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
  `,"a11y-collapse":f`
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
  `},Ir=["multiple-choice","true-false-question","fill-in-the-blanks","matching-question","sorting-question","tagging-question"],Lr=f`
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
`,aa={[Ir.join(", ")]:f`
    ${Lr}
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
  `,"self-check":f`
    ${Lr}
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
  `,"stop-note":f`
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
  `,"flash-card":f`
    :host {
      display: block !important;
      margin: 1.5rem 0 !important;
      font-family: var(--font-sans) !important;
    }
  `,"flash-card-answer-box":f`
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
  `,"vocab-term":f`
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
  `};function qr(o){const e=o.shadowRoot?.querySelector("grid-plate");e&&e.getAttribute("layout")!=="1"&&e.setAttribute("layout","1");const t=o.shadowRoot?.querySelector("#directions");t&&!o.__oerDirections&&(o.__oerDirections=!0,t.removeAttribute("open"))}let Rr=!1;function na(){if(Rr)return;Rr=!0;const o=e=>{const t=customElements.get(e);if(!t||t.prototype.__oerStacked)return;const r=t.prototype.updated;t.prototype.updated=function(i){r?.call(this,i),qr(this)},t.prototype.__oerStacked=!0,globalThis.document.querySelectorAll(e).forEach(qr)};for(const e of Ir)customElements.get(e)?o(e):customElements.whenDefined(e).then(()=>o(e))}let Pr=!1;const sa="(max-width: 767px)";function M(o){return s`<span
    class="lucide"
    aria-hidden="true"
    style="--src:url(&quot;${E[o]}&quot;)"
  ></span>`}const k={share:s`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`,panelLeft:s`<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></svg>`,search:s`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,sun:s`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.07-2.93 1.41-1.41m11.32-11.32 1.41-1.41M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41"/></svg>`,moon:s`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,undo:M("icons:undo"),redo:M("icons:redo"),save:M("icons:save"),chevronDown:M("icons:expand-more"),pencil:M("icons:create"),lock:M("icons:lock"),user:M("social:person"),layoutDashboard:M("hax:home-edit"),logOut:M("icons:exit-to-app"),type:M("editor:title"),shapes:M("hax:hax2022"),image:M("image:photo-library"),tag:M("icons:label"),history:M("icons:history"),chart:M("hax:graph"),eye:M("icons:visibility"),eyeOff:M("icons:visibility-off"),lockOpen:M("icons:lock-open"),trash:M("icons:delete"),book:M("lrn:book"),siteMap:M("hax:site-map"),settings:M("icons:settings"),types:M("hax:templates"),files:M("oer:files"),details:M("image:tune"),code:M("icons:code"),chevronLeft:s`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>`,chevronRight:s`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`};let Or=class extends X2{static get tag(){return"custom-oer-docs-theme"}static get properties(){return{...super.properties,collapsed:{type:Boolean,reflect:!0},mobileOpen:{type:Boolean,reflect:!0,attribute:"mobile-open"},dark:{type:Boolean,reflect:!0},siteTitle:{type:String},_prev:{state:!0},_next:{state:!0},_loggedIn:{state:!0},_userName:{state:!0},_activeTitle:{state:!0},_locked:{state:!0},_published:{state:!0},_pageMenuOpen:{state:!0},_banner:{state:!0},_canEmbed:{state:!0},_sidebarTab:{state:!0},_userMenuOpen:{state:!0},_book:{state:!0},_bookFilter:{state:!0},embed:{type:Boolean,reflect:!0},hideHeader:{type:Boolean,reflect:!0,attribute:"hide-header"},hideTitle:{type:Boolean,reflect:!0,attribute:"hide-title"},_siteDescription:{state:!0}}}constructor(){super(),this.HAXCMSThemeSettings.autoScroll=!0,this.collapsed=!1,this.mobileOpen=!1,this.dark=!1,this.siteTitle="",this.__mq=globalThis.matchMedia(sa),this.__keyHandler=this._onKeydown.bind(this),this._loggedIn=!1,this._pageMenuOpen=!1;const e=new URLSearchParams(globalThis.location.search);this.embed=or(),this.hideHeader=this.embed&&e.get("hideHeader")==="true",this.hideTitle=this.embed&&e.get("hideTitle")==="true";try{this._sidebarTab=globalThis.localStorage.getItem("oer-sidebar-tab")==="site"?"site":"nav"}catch{this._sidebarTab="nav"}this.__outsideMenu=t=>{const r=t.composedPath();this._userMenuOpen&&!r.includes(this.shadowRoot.querySelector(".user-wrap"))&&(this._userMenuOpen=!1),this._pageMenuOpen&&!r.includes(this.shadowRoot.querySelector(".page-header .menu-wrap"))&&(this._pageMenuOpen=!1)},this.__disposer.push(O(()=>{const t=_(D.isLoggedIn),r=_(D.userData),i=_(D.activeItem),a=_(D.manifest);Promise.resolve().then(()=>{this._siteDescription=a?.description||"",this._loggedIn=!!t,this._userName=r?.userName||"",this._activeTitle=i?.title||"",this._locked=!!i?.metadata?.locked,this._published=i?.metadata?.published!==!1;const n=i?.metadata?.oerRef?.page,l=((n?(a?.items||[]).find(d=>d.id===n):null)||i)?.metadata?.oerFields||{};this._banner=l.image?{src:l.image,alt:l.imageAlt||""}:null,this._embedItem=i,this._canEmbed=!!i&&!or()&&l.allowEmbed!==!1&&i.metadata?.published!==!1})})),this.__editorBarObserver=new ResizeObserver(()=>this._measureEditorBar()),this.__bodyObserver=new MutationObserver(()=>this._watchEditorBar()),this.__disposer.push(O(()=>{const t=_(D.darkMode);Promise.resolve().then(()=>{this.dark=!!t})})),this.__disposer.push(O(()=>{const t=_(D.siteTitle);Promise.resolve().then(()=>{this.siteTitle=t||""})})),this.__disposer.push(O(()=>{const t=_(D.activeId),r=_(D.manifest?.items)||[],i=this._bookOf(t,r),a=!!D.isLoggedIn;let n=(_(D.routerManifest?.items)||[]).filter(m=>!Q(m)&&!se(m)&&!me(m)&&!m.metadata?.hideInMenu&&(a||m.metadata?.published!==!1));if(i){const m=new Set([i.id,...Be(r,i.id).map(g=>g.item.id)]);n=n.filter(g=>m.has(g.id))}const l=r.find(m=>m.id===t),d=l?.metadata?.oerSnapshotOf,c=d&&r.find(m=>m.id===d)?.metadata?.oerNavVersion===l.metadata.version?d:t,p=n.findIndex(m=>m.id===c),h=m=>{const g=m?.metadata?.oerNavVersion,u=g&&r.find(v=>v.metadata?.oerSnapshotOf===m.id&&v.metadata?.version===g);return m&&u?{...m,slug:u.slug}:m};Promise.resolve().then(()=>{this.mobileOpen=!1,i?.id!==this._book?.id&&(this._bookFilter=""),this._book=i,this._followVersionParam(t),this._prev=p>0?h(n[p-1]):null,this._next=p>=0&&p<n.length-1?h(n[p+1]):null})}))}connectedCallback(){if(super.connectedCallback(),vo(),fo(),Pr||(Pr=!0,f2(oa),f2(aa),na()),globalThis.addEventListener("keydown",this.__keyHandler),globalThis.addEventListener("pointerdown",this.__outsideMenu),this.__bodyObserver.observe(globalThis.document.body,{childList:!0}),this._watchEditorBar(),!globalThis.document.getElementById("oer-docs-fonts")){const e=globalThis.document.createElement("link");e.id="oer-docs-fonts",e.rel="stylesheet",e.href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",globalThis.document.head.appendChild(e)}}_watchEditorBar(){const e=globalThis.document.querySelector("haxcms-site-editor-ui");e!==this.__editorBar&&(this.__editorBar=e,this.__editorBarObserver.disconnect(),e&&this.__editorBarObserver.observe(e),this._measureEditorBar())}_measureEditorBar(){const e=globalThis.document.querySelector("haxcms-site-editor-ui"),t=e?e.getBoundingClientRect().height:0;this.style.setProperty("--editor-bar-height",`${Math.round(t)}px`)}disconnectedCallback(){this.__editorBarObserver.disconnect(),this.__bodyObserver.disconnect(),globalThis.removeEventListener("keydown",this.__keyHandler),globalThis.removeEventListener("pointerdown",this.__outsideMenu),super.disconnectedCallback()}HAXCMSGlobalStyleSheetContent(){return[...super.HAXCMSGlobalStyleSheetContent(),ko,_o,f`
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
        custom-oer-docs-theme {
          line-height: 1.7;
        }
        custom-oer-docs-theme :is(p, li) {
          text-align: start;
        }
        /* screenshots and other figures in page content */
        custom-oer-docs-theme figure {
          margin: 1.5rem 0;
        }
        custom-oer-docs-theme figure img {
          display: block;
          max-width: 100%;
          height: auto;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
        }
        custom-oer-docs-theme figcaption {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          line-height: 1.5;
          color: var(--muted-foreground);
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
      `]}static get styles(){return[super.styles,f`
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
        ?inert="${!e||this.editMode}"
      >
        <div class="sidebar-header">
          <a class="brand" href="${D.homeLink||"./"}">
            <span class="brand-mark" aria-hidden="true">${k.book}</span>
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
                <button class="label-action" @click="${()=>ir().show()}">${k.pencil}Edit outline</button>
              </div>`:""}
        </nav>
        ${this._loggedIn&&this._sidebarTab==="site"?s`<div class="site-panel" id="panel-site" role="tabpanel" aria-labelledby="tab-site">
              <div class="nav-group-label">Site</div>
              <button class="site-action" @click="${()=>So().show()}">${k.files}Browse pages</button>
              <button class="site-action" @click="${()=>jo().show()}">${k.types}Content types</button>
              <button class="site-action" @click="${ui}">${k.settings}Settings</button>
            </div>`:""}
        ${this._loggedIn?s`<div class="sidebar-footer">${this.renderUser()}</div>`:""}
      </aside>
      <div class="scrim" role="presentation" @click="${this._closeMobile}"></div>

      <div class="main-col">
        ${this.editMode?this.renderEditorHeader(e):this.renderTopbar(e)}

        <main id="main">
          <article id="contentcontainer">
            ${this._banner?s`<img class="page-banner" src="${this._banner.src}" alt="${this._banner.alt}" />`:""}
            <div class="page-header">
              <site-active-title part="page-title"></site-active-title>
              ${!this.editMode&&(this._loggedIn||this._canEmbed)?this.renderPageMenu():""}
            </div>
            <oer-page-header></oer-page-header>
            <section id="slot"><slot></slot></section>
            ${this.editMode?"":s`<oer-page-footer></oer-page-footer>`}
            <nav class="pager" aria-label="Previous and next page" ?hidden="${this.editMode}">
              ${this._prev?s`<a class="pager-link prev" href="${this._prev.slug}">
                    <span class="pager-label">${k.chevronLeft} Previous</span>
                    <span class="pager-title">${this._prev.title}</span>
                  </a>`:s`<span></span>`}
              ${this._next?s`<a class="pager-link next" href="${this._next.slug}">
                    <span class="pager-label">Next ${k.chevronRight}</span>
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
          ${k.panelLeft}
        </button>
        <div class="separator" aria-hidden="true"></div>
        <oer-breadcrumb part="breadcrumb"></oer-breadcrumb>
        <button class="icon-btn" @click="${this.openSearch}" title="Search the site (⌘K)" aria-label="Search the site">
          ${k.search}
        </button>
        <site-modal icon="icons:search" title="Search site" button-label="Search" @site-modal-click="${this._loadSearch}">
          <site-search></site-search>
        </site-modal>
        ${this._loggedIn?s`<oer-command-search></oer-command-search>`:""}
        <button
          class="icon-btn"
          @click="${this.toggleDark}"
          title="${this.dark?"Switch to light mode":"Switch to dark mode"}"
          aria-pressed="${this.dark}"
        >
          ${this.dark?k.sun:k.moon}
        </button>
      </header>
    `}renderEditorHeader(){return s`
      <header class="topbar editing" part="topbar">
        <span class="badge"><span class="dot" aria-hidden="true"></span>Editing</span>
        <span class="editing-title">${this._activeTitle}</span>
        <div class="toolbar-group">
          <button class="icon-btn" @click="${vi}" title="Undo (${W}Z)" aria-label="Undo">
            ${k.undo}
          </button>
          <button class="icon-btn" @click="${fi}" title="Redo (${W}⇧Z)" aria-label="Redo">
            ${k.redo}
          </button>
          <div class="separator" aria-hidden="true"></div>
          <button
            class="icon-btn"
            @click="${()=>Mt().open("source")}"
            title="Edit HTML source"
            aria-label="Edit HTML source"
          >
            ${k.code}
          </button>
          <oer-command-search></oer-command-search>
          <div class="separator" aria-hidden="true"></div>
          <button class="btn btn-outline" @click="${mi}" title="Discard changes (${W}⇧/)">
            Cancel
          </button>
          <button class="btn btn-primary" @click="${hi}" title="Save (${W}⇧S)">
            ${k.save}Save
          </button>
        </div>
      </header>
    `}renderPageMenu(){const e=r=>this._menuAction(()=>this.querySelector("page-break")?.[r]?.()),t=(r,i,a,n="")=>s`<button role="menuitem" class="${n}" @click="${r}">${i}${a}</button>`;return s`
      <div class="menu-wrap">
        <button
          class="icon-btn"
          aria-haspopup="menu"
          aria-expanded="${this._pageMenuOpen}"
          aria-label="Page options"
          title="Page options"
          @click="${this._togglePageMenu}"
        >
          ${k.chevronDown}
        </button>
        ${this._pageMenuOpen&&!this._loggedIn?s`<div class="menu" role="menu" @keydown="${this._menuKeys}">
              ${t(this._menuAction(()=>Br().show(this._embedItem)),k.share,"Embed\u2026")}
            </div>`:""}
        ${this._pageMenuOpen&&this._loggedIn?s`<div class="menu" role="menu" @keydown="${this._menuKeys}">
              <button role="menuitem" ?disabled="${this._locked}" @click="${this._menuAction(pi)}">
                ${k.pencil}Edit page<kbd>${W}⇧E</kbd>
              </button>
              <div class="menu-sep" role="separator"></div>
              ${t(e("_editTitle"),k.type,"Rename page")}
              ${t(e("_editIcon"),k.shapes,"Change icon")}
              ${t(e("_editMedia"),k.image,"Page media")}
              ${t(this._menuAction(()=>ft().show(D.activeId)),k.details,"Page details")}
              ${t(e("_editTags"),k.tag,"Tags")}
              ${t(this._menuAction(()=>ir().show(D.activeId)),k.siteMap,"Edit page outline")}
              ${this._canEmbed?t(this._menuAction(()=>Br().show(this._embedItem)),k.share,"Embed\u2026"):""}
              <div class="menu-sep" role="separator"></div>
              ${t(this._menuAction(()=>Sr().show(D.activeId,{publish:!0})),k.history,"Versions\u2026")}
              ${t(e("_openRevisions"),k.history,"Revisions")}
              ${t(e("_openPageReport"),k.chart,"Page report")}
              <div class="menu-sep" role="separator"></div>
              ${t(e("_togglePublished"),this._published?k.eyeOff:k.eye,this._published?"Unpublish":"Publish")}
              ${t(e("_toggleLocked"),this._locked?k.lockOpen:k.lock,this._locked?"Unlock page":"Lock page")}
              <div class="menu-sep" role="separator"></div>
              ${t(e("_deletePage"),k.trash,"Delete page","danger")}
            </div>`:""}
      </div>
    `}_followVersionParam(e){const t=new URLSearchParams(globalThis.location.search).get("version");if(!t||!e)return;const r=ee(e).find(i=>i.version===t);r?.snapshot&&(globalThis.history.replaceState({},"",r.snapshot.slug),globalThis.dispatchEvent(new PopStateEvent("popstate")))}_bookOf(e,t){const r=T(t).types,i=new Map(t.map(a=>[a.id,a]));for(let a=i.get(e);a;a=i.get(a.parent))if(r.find(n=>n.id===a.metadata?.pageType)?.reader)return a;return null}renderBookHeader(){const e=this._book;return s`<div class="book-head">
      <a class="book-back" href="${D.homeLink||"./"}">${k.chevronLeft}All pages</a>
      <a class="book-title" href="${e.slug}" aria-current="${D.activeId===e.id?"page":"false"}">${k.book}<span>${e.title}</span></a>
      <label class="book-filter">
        ${k.search}
        <input
          type="search"
          placeholder="Filter chapters…"
          aria-label="Filter chapters"
          .value="${this._bookFilter||""}"
          @input="${t=>this._bookFilter=t.target.value}"
        />
      </label>
    </div>`}firstUpdated(e){super.firstUpdated?.(e),this.embed&&Bo(this)}renderSidebarTabs(){const e=(t,r)=>s`<button
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
          <span class="avatar" aria-hidden="true">${this._userName?e.slice(0,2):k.user}</span>
          <span class="user-name">${e}</span>
          ${k.chevronDown}
        </button>
        ${this._userMenuOpen?s`<div class="menu user-menu" role="menu" aria-label="Account" @keydown="${this._userMenuKeys}">
              <div class="menu-label">${e}</div>
              <a role="menuitem" href="${b2()?.backLink??"/"}">${k.layoutDashboard}Site dashboard</a>
              <div class="menu-sep" role="separator"></div>
              <button role="menuitem" class="danger" @click="${()=>(this._userMenuOpen=!1,gi())}">${k.logOut}Log out</button>
            </div>`:""}
      </div>
    `}_userMenuKeys(e){const t=[...this.shadowRoot.querySelectorAll('.user-menu [role="menuitem"]')],r=t.indexOf(this.shadowRoot.activeElement);if(e.key==="Escape")this._userMenuOpen=!1,this.shadowRoot.querySelector(".user-row")?.focus();else if(e.key==="ArrowDown")t[(r+1)%t.length]?.focus();else if(e.key==="ArrowUp")t[(r-1+t.length)%t.length]?.focus();else return;e.preventDefault()}_togglePageMenu(){this._pageMenuOpen=!this._pageMenuOpen}_menuAction(e){return()=>{this._pageMenuOpen=!1,e()}}_menuKeys(e){const t=[...this.shadowRoot.querySelectorAll('.menu [role="menuitem"]')],r=t.indexOf(this.shadowRoot.activeElement);e.key==="Escape"?this._pageMenuOpen=!1:(e.key==="ArrowDown"||e.key==="ArrowUp")&&(e.preventDefault(),t[(r+(e.key==="ArrowDown"?1:-1)+t.length)%t.length]?.focus())}toggleSidebar(){this.__mq.matches?this.mobileOpen=!this.mobileOpen:this.collapsed=!this.collapsed}_closeMobile(){this.mobileOpen=!1}toggleDark(){D.darkMode=!D.darkMode}async _loadSearch(){await import("@haxtheweb/haxcms-elements/lib/ui-components/site/site-search.js"),setTimeout(()=>{globalThis.SimpleModal?.requestAvailability()?.querySelector("site-search")?.shadowRoot?.querySelector("simple-fields-field")?.focus()},50)}openSearch(){this.shadowRoot.querySelector("site-modal")?.shadowRoot?.querySelector("#btn")?.click()}_onKeydown(e){this.editMode||((e.metaKey||e.ctrlKey)&&!e.shiftKey&&e.key.toLowerCase()==="k"?(e.preventDefault(),this.openSearch()):e.key==="Escape"&&this.mobileOpen&&(this.mobileOpen=!1))}};customElements.define(Or.tag,Or);const la="files/data/rubrics.json";let V2;function da(){return V2||(V2=fetch(new URL(la,globalThis.document.baseURI)).then(o=>o.ok?o.json():[]).catch(()=>[])),V2}class Me extends Jr{static get tag(){return"oer-rubric"}static get properties(){return{...super.properties,rubricId:{type:String,attribute:"rubric-id",reflect:!0}}}constructor(){super(),this.rubricId="",this.__rubric=null,this.__loaded=!1}updated(e){super.updated?.(e),e.has("rubricId")&&this._load()}async _load(){const e=await da();this.__rubric=e.find(t=>t.slug===this.rubricId)??null,this.__loaded=!0,this.requestUpdate()}get _hidden(){return new URLSearchParams(globalThis.location.search).get("hideRubric")==="true"}static get styles(){return[super.styles,f`
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
      </div>`}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:{title:"Rubric",description:"Assessment rubric from the site's rubrics data file.",icon:"icons:assignment-turned-in",color:"blue",tags:["Instructional","assessment","rubric","grading"],meta:{author:"Michael Collins"}},settings:{configure:[{property:"rubricId",title:"Rubric",description:"Which rubric to show (slug in files/data/rubrics.json).",inputMethod:"select",options:{exercise:"Exercise","exercise-low-poly":"Exercise (low poly)",project:"Project",task:"Task","written-statement":"Written statement"}}],advanced:[]},demoSchema:[{tag:Me.tag,properties:{rubricId:"exercise"},content:""}]}}}customElements.define(Me.tag,Me),re(Me);const d2=(o,e,t,r)=>({title:o,description:e,icon:t,color:"blue",tags:r,meta:{author:"Michael Collins"}}),K2={info:{label:"Note",icon:"icons:info",color:"oklch(0.55 0.15 250)"},tip:{label:"Tip",icon:"courseicons:strategy",color:"oklch(0.55 0.14 150)"},warning:{label:"Warning",icon:"icons:warning",color:"oklch(0.62 0.15 70)"},danger:{label:"Important",icon:"icons:error",color:"oklch(0.55 0.2 25)"},definition:{label:"Definition",icon:"hax:lesson",color:"oklch(0.52 0.16 300)"},objective:{label:"Objective",icon:"courseicons:learning-objectives",color:"oklch(0.5 0.13 200)"}};class Hr extends F{static get tag(){return"oer-callout"}static get properties(){return{type:{type:String,reflect:!0},title:{type:String,reflect:!0}}}constructor(){super(),this.type="info"}static get styles(){return f`
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
    `}render(){const e=K2[this.type]||K2.info;return s`<div class="callout" role="note" aria-label="${this.title||e.label}" style="--c:${e.color}">
      <span class="icon" aria-hidden="true" style="--src:url(&quot;${E[e.icon]||""}&quot;)"></span>
      <div class="body">
        ${this.title?s`<p class="title">${this.title}</p>`:""}
        <slot></slot>
      </div>
    </div>`}static get haxProperties(){return{type:"grid",canScale:!1,canEditSource:!0,contentEditable:!0,gizmo:d2("Callout","A highlighted note: info, tip, warning, important, definition or objective.","icons:info",["Instructional","callout","note","tip","warning"]),settings:{configure:[{property:"type",title:"Kind",inputMethod:"select",options:Object.fromEntries(Object.entries(K2).map(([e,t])=>[e,t.label]))},{property:"title",title:"Title",description:"Optional heading inside the callout.",inputMethod:"textfield"},{slot:"",title:"Text",inputMethod:"code-editor",slotWrapper:"p"}],advanced:[]},demoSchema:[{tag:"oer-callout",properties:{type:"tip",title:"Tip"},content:"<p>Write the callout text here.</p>"}]}}}const Nr={codepen:"CodePen",jsfiddle:"JSFiddle",codesandbox:"CodeSandbox",stackblitz:"StackBlitz",replit:"Replit",glitch:"Glitch",other:"Other (embed address)"};function ca(o,e){const t=String(e||"").trim();if(!t)return"";const r=(i,a)=>i.replace(/\/?$/,a);switch((o||"").toLowerCase()){case"codepen":if(t.includes("codepen.io"))try{return`https://codepen.io${new URL(t).pathname.replace(/\/pen\//,"/embed/")}?default-tab=result`}catch{return""}if(t.includes("/")){const[i,a]=t.split("/");return`https://codepen.io/${i}/embed/${a}?default-tab=result`}return"";case"jsfiddle":return t.includes("jsfiddle.net")?r(t,"/embedded/"):`https://jsfiddle.net/${t}/embedded/`;case"codesandbox":if(t.includes("codesandbox.io"))try{const i=new URL(t).pathname.split("/s/")[1]?.split("/")[0];return i?`https://codesandbox.io/embed/${i}`:""}catch{return""}return`https://codesandbox.io/embed/${t}`;case"stackblitz":return t.includes("stackblitz.com")?t.includes("/embed")||t.includes("embed=1")?t:r(t,"?embed=1"):`https://stackblitz.com/edit/${t}?embed=1`;case"replit":return t.includes("replit.com")||t.includes("repl.it")?t.includes("embed=true")?t:r(t,"?embed=true"):`https://replit.com/${t}?embed=true`;case"glitch":return t.includes("glitch.com")?t.includes("/embed")?t:r(t,"/embed"):`https://glitch.com/embed/#!/embed/${t}`;default:try{return new URL(t).href}catch{return""}}}class Ur extends U{static get tag(){return"oer-code-embed"}static get properties(){return{...super.properties,provider:{type:String,reflect:!0},src:{type:String,reflect:!0},height:{type:String,reflect:!0}}}constructor(){super(),this.provider="codepen",this.height="400"}renderMedia(){const e=ca(this.provider,this.src);return e?s`<iframe
      src="${e}"
      title="${this.title||"Code example"}"
      loading="lazy"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
      allow="clipboard-write"
      credentialless
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>`:this.src?this.renderEmpty("valid address",`That doesn't look like a ${Nr[this.provider]||"code"} link.`):this.renderEmpty("code example","Pick the service and paste the link in the block settings.")}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:d2("Code example","A live code example from CodePen, JSFiddle, CodeSandbox, StackBlitz, Replit or Glitch.","icons:code",["Media","code","codepen","embed"]),settings:{configure:[{property:"provider",title:"Service",inputMethod:"select",options:Nr},{property:"src",title:"Link",description:"The example's link (or its short ID, e.g. user/pen for CodePen).",inputMethod:"textfield",required:!0},{property:"height",title:"Height",description:"In pixels.",inputMethod:"textfield"},...U.figureSettings()],advanced:[]},demoSchema:[{tag:"oer-code-embed",properties:{provider:"codepen",height:"400",title:"Code example"},content:""}]}}}class Vr extends F{static get tag(){return"oer-divider"}static get properties(){return{label:{type:String,reflect:!0}}}static get styles(){return f`
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
    `}render(){return this.label?s`<div class="rule" role="separator" aria-label="${this.label}">${this.label}</div>`:s`<div class="rule plain" role="separator"></div>`}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:d2("Divider with label","A horizontal rule, optionally with a short label in the middle.","hax:hr",["Layout","divider","rule","separator"]),settings:{configure:[{property:"label",title:"Label",description:"Optional, e.g. \u201CPart 2\u201D.",inputMethod:"textfield"}],advanced:[]},demoSchema:[{tag:"oer-divider",properties:{label:"Part 2"},content:""}]}}}const pa={sm:"Small",md:"Medium",lg:"Large",xl:"Extra large"};class Kr extends F{static get tag(){return"oer-spacer"}static get properties(){return{size:{type:String,reflect:!0}}}constructor(){super(),this.size="md"}static get styles(){return f`
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
    `}render(){return s``}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:d2("Spacer","Extra vertical space between blocks.","icons:swap-vert",["Layout","spacer","space","gap"]),settings:{configure:[{property:"size",title:"Size",inputMethod:"select",options:pa}],advanced:[]},demoSchema:[{tag:"oer-spacer",properties:{size:"md"},content:""}]}}}for(const o of[Hr,Ur,Vr,Kr])customElements.get(o.tag)||customElements.define(o.tag,o);re(Hr,Ur,Vr,Kr);const V=(o,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${E[o]||""}&quot;)"></span>`,ha={table:"Table",cards:"Cards",outline:"Outline (modules)",pathways:"Pathways (start here, next, in development)"},ma={site:"Whole site",children:"This page's sub-pages",descendants:"Everything under this page"},ua={title:"Title",updated:"Recently updated",created:"Newest",order:"Outline order"},W2=["beginner","intermediate","advanced"],K=o=>Array.isArray(o)?o:typeof o=="string"&&o?o.split(",").map(e=>e.trim()).filter(Boolean):[],ga=o=>(Array.isArray(o)?o:[]).filter(e=>e&&(e.url||e.title)),va=o=>String(o).split(/[?#]/)[0].split("/").pop();function fa(o){try{return JSON.parse(globalThis.localStorage.getItem(o)||"null")}catch{return null}}function ba(o,e){try{globalThis.localStorage.setItem(o,JSON.stringify(e))}catch{}}class Ce extends F{static get tag(){return"oer-collection"}static get properties(){return{heading:{type:String,reflect:!0},types:{type:String,reflect:!0},scope:{type:String,reflect:!0},view:{type:String,reflect:!0},sort:{type:String,reflect:!0},perPage:{type:Number,attribute:"per-page",reflect:!0},controls:{type:String,reflect:!0}}}constructor(){super(),this.scope="site",this.view="table",this.sort="title",this.perPage=20,this.controls="full",this._items=[],this._defs=[],this._state={q:"",filters:{},tags:[],sortKey:null,sortDir:1,groupBy:"",page:1,view:null,hidden:[]},this._columnsOpen=!1}connectedCallback(){super.connectedCallback(),this.__dispose=O(()=>{const e=_(D.manifest?.items)||[],t=_(D.activeId);Promise.resolve().then(()=>{this._all=e,this._defs=T(e).types,this._pageId=this._ownerPageId(e,t),this._items=this._select(e),this._restore()})})}disconnectedCallback(){this.__dispose?.(),super.disconnectedCallback()}updated(e){["types","scope","sort"].some(t=>e.has(t))&&this._all&&(this._items=this._select(this._all))}_ownerPageId(e,t){return t||null}get _storageKey(){const e=[...this.parentNode?.querySelectorAll?.("oer-collection")||[]].indexOf(this);return`oer-collection:${this._pageId||"site"}:${e}`}_restore(){if(this.__restored===this._storageKey)return;this.__restored=this._storageKey;const e=fa(this._storageKey);e&&(this._state={...this._state,...e,page:1})}_setState(e){this._state={...this._state,...e};const{q:t,filters:r,tags:i,sortKey:a,sortDir:n,groupBy:l,view:d,hidden:c}=this._state;ba(this._storageKey,{q:t,filters:r,tags:i,sortKey:a,sortDir:n,groupBy:l,view:d,hidden:c})}get _typeIds(){return K(this.types)}_select(e){const t=new Set(this._typeIds);let r=e.filter(i=>!Q(i)&&!i.metadata?.oerSnapshotOf&&!i.metadata?.hideInMenu);if(D.isLoggedIn||(r=r.filter(i=>i.metadata?.published!==!1)),this.scope!=="site"&&this._pageId)if(this.scope==="children")r=r.filter(i=>i.parent===this._pageId);else{const i=oe(e),a=new Set,n=l=>(i.get(l)||[]).forEach(d=>(a.add(d.id),n(d.id)));n(this._pageId),r=r.filter(l=>a.has(l.id))}return t.size?r=r.filter(i=>t.has(i.metadata?.pageType)):this.view==="pathways"?r=r.filter(i=>i.metadata?.pageType===j2):this.view!=="outline"&&this.scope==="site"&&(r=r.filter(i=>i.metadata?.pageType)),r}_type(e){return this._defs.find(t=>t.id===e.metadata?.pageType)||null}_value(e,t){return t==="tags"?K(e.metadata?.tags):e.metadata?.oerFields?.[t]}_plain(e,t=null){return t?.kind==="people"||e&&typeof e=="object"&&"name"in e?K(e).map(r=>typeof r=="object"?r.name:r).filter(Boolean).join(", "):Array.isArray(e)?e.map(r=>this._plain(r,t)).filter(Boolean).join(", "):e&&typeof e=="object"?e.page?ue([e],this._all||[])[0]?.item?.title||"":e.title||e.url||"":e==null?"":String(this._label(t,e))}_image(e){const t=e.metadata?.oerFields||{};return t.image||t.coverImage||e.metadata?.image||""}get _fields(){const e=this._typeIds.length?this._typeIds:[...new Set(this._items.map(r=>r.metadata?.pageType).filter(Boolean))],t=new Map;for(const r of e)for(const i of this._defs.find(a=>a.id===r)?.fields||[])t.has(i.name)||t.set(i.name,i);return[...t.values()]}get _filterFields(){return this._fields.filter(e=>(e.kind==="select"||e.kind==="list")&&this._distinct(e.name).length>1&&e.name!=="learningObjectives")}_distinct(e){const t=new Set;for(const r of this._items)for(const i of K(this._value(r,e)))t.add(i);return e==="difficulty"?[...t].sort((r,i)=>W2.indexOf(String(r).toLowerCase())-W2.indexOf(String(i).toLowerCase())):[...t].sort((r,i)=>String(r).localeCompare(String(i)))}_label(e,t){return(e?.options||[]).find(r=>r.value===t)?.label||t}get _columns(){const e=[];this._items.some(t=>this._image(t))&&e.push({key:"image",label:"Image"}),e.push({key:"title",label:"Title",fixed:!0,sortable:!0}),new Set(this._items.map(t=>t.metadata?.pageType)).size>1&&e.push({key:"type",label:"Type",sortable:!0}),this._distinct("tags").length&&e.push({key:"tags",label:"Tags"});for(const t of this._fields)!t.header||t.kind==="list"||t.kind==="longtext"||t.kind==="image"||this._items.some(r=>this._value(r,t.name)!==void 0&&this._value(r,t.name)!=="")&&e.push({key:t.name,label:t.label,field:t,sortable:t.kind!=="relation"&&t.kind!=="files"});return e}get _filtered(){const{q:e,filters:t,tags:r}=this._state,i=e.trim().toLowerCase();return this._items.filter(a=>{if(i&&![a.title,a.description,...K(a.metadata?.tags),...Object.values(a.metadata?.oerFields||{}).map(n=>this._plain(n))].join(" ").toLowerCase().includes(i))return!1;for(const[n,l]of Object.entries(t))if(l&&!K(this._value(a,n)).includes(l))return!1;return!(r.length&&!K(a.metadata?.tags).some(n=>r.includes(n)))})}_sorted(e){const t=this._state.sortKey||this.sort||"title",r=this._state.sortDir||1,i=new Map(this._all.map((n,l)=>[n.id,l])),a=n=>{if(t==="title")return n.title||"";if(t==="type")return this._type(n)?.label||"";if(t==="updated")return-(n.metadata?.updated||0);if(t==="created")return-(n.metadata?.created||0);if(t==="order")return Number(n.order)||0;if(t==="difficulty"){const l=W2.indexOf(String(this._value(n,t)||"").toLowerCase());return l<0?99:l}return this._plain(this._value(n,t))};return[...e].sort((n,l)=>{const d=a(n),c=a(l);return((typeof d=="number"&&typeof c=="number"?d-c:String(d).localeCompare(String(c),void 0,{numeric:!0}))||i.get(n.id)-i.get(l.id))*r})}_groups(e){const t=this._state.groupBy;if(!t)return[{key:"",items:e}];const r=new Map;for(const i of e){const a=t==="type"?[this._type(i)?.label||"No type"]:K(this._value(i,t));for(const n of a.length?a:["\u2014"])r.has(n)||r.set(n,[]),r.get(n).push(i)}return[...r.entries()].map(([i,a])=>({key:i,items:a}))}_toggleSort(e){const{sortKey:t,sortDir:r}=this._state,i=t||this.sort;this._setState({sortKey:e,sortDir:i===e?-r:1,page:1})}_setFilter(e,t){const r={...this._state.filters};r[e]===t||!t?delete r[e]:r[e]=t,this._setState({filters:r,page:1})}_toggleTag(e){const t=this._state.tags.includes(e)?this._state.tags.filter(r=>r!==e):[...this._state.tags,e];this._setState({tags:t,page:1})}_clear(){this._setState({q:"",filters:{},tags:[],page:1})}_go(e){globalThis.history.pushState({},"",e.slug),globalThis.dispatchEvent(new PopStateEvent("popstate"))}static get styles(){return[Ge,f`
      :host {
        display: block;
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
      .bar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }
      .search {
        flex: 1 1 14rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 2.25rem;
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
      select.filter {
        height: 2.25rem;
        padding: 0 2rem 0 0.75rem;
        border: 1px solid var(--input-border, var(--border, #ddd));
        border-radius: var(--radius-md, 0.5rem);
        background: var(--background, #fff);
        font-size: 0.875rem;
      }
      .btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border, #ddd));
        border-radius: var(--radius-md, 0.5rem);
        background: var(--background, #fff);
        font-size: 0.875rem;
        cursor: pointer;
        white-space: nowrap;
      }
      .btn:hover {
        background: var(--accent, #f4f4f5);
      }
      .seg {
        display: inline-flex;
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
        height: 1.75rem;
        padding: 0 0.625rem;
        border-radius: calc(var(--radius-md, 0.5rem) - 2px);
        font-size: 0.8125rem;
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
      .card img,
      .card .ph {
        display: block;
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        background: var(--muted, #f4f4f5);
      }
      .card .ph {
        display: grid;
        place-items: center;
        color: var(--muted-foreground, #555);
        --simple-icon-height: 2rem;
        --simple-icon-width: 2rem;
      }
      .card-body {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        padding: 0.875rem 1rem 1rem;
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
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        margin-top: 0.75rem;
        font-size: 0.8125rem;
        color: var(--muted-foreground, #555);
      }
      .pages {
        display: flex;
        gap: 0.25rem;
      }
      .pages button {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md, 0.5rem);
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
    `]}_typeIcon(e){const t=this._type(e);return t?.icon?s`<simple-icon-lite icon="${t.icon}"></simple-icon-lite>`:s`<span class="noicon"></span>`}_pills(e,t=3){const r=[];for(const i of this._fields){if(!i.header||!["select","text","number"].includes(i.kind))continue;const a=this._value(e,i.name);if(!(a===void 0||a===""||a===null)){for(const n of i.kind==="select"?K(a):[a])r.push(i.kind==="select"&&this._filterFields.includes(i)?s`<button class="pill" title="Filter by ${i.label}" @click="${l=>(l.preventDefault(),this._setFilter(i.name,n))}">${this._label(i,n)}</button>`:s`<span class="pill muted">${i.kind==="text"&&/duration|time/i.test(i.name)?V("device:access-time","xs"):""}${this._label(i,n)}</span>`);if(r.length>=t)break}}return r}_cell(e,t){switch(e.key){case"image":{const r=this._image(t);return r?s`<img class="thumb" src="${r}" alt="" loading="lazy" />`:s`<span class="thumb"></span>`}case"title":return s`<div class="title">
            <a href="${t.slug}">${t.title}</a>${t.metadata?.published===!1?s`<span class="draft">Draft</span>`:""}
          </div>
          ${t.description?s`<div class="desc">${t.description}</div>`:""}`;case"type":{const r=this._type(t);return r?s`<span class="eyebrow">${this._typeIcon(t)}${r.label}</span>`:""}case"tags":return K(t.metadata?.tags).map(r=>s`<button class="pill muted" title="Filter by tag" @click="${()=>this._toggleTag(r)}">${r}</button>`);default:{const r=this._value(t,e.key);if(r===void 0||r===""||Array.isArray(r)&&!r.length)return"";const i=e.field?.kind;return i==="relation"?ue(r,this._all||[]).filter(a=>!a.missing).map((a,n)=>s`${n?", ":""}<a class="cell-link" href="${a.href}">${a.item.title}</a>${a.version?` v${a.version}`:""}`):i==="files"?ga(r).map((a,n)=>s`${n?", ":""}${a.url?s`<a class="cell-link" href="${a.url}" download>${a.title||va(a.url)}</a>`:a.title}`):i==="select"&&this._filterFields.includes(e.field)?K(r).map(a=>s`<button class="pill" title="Filter by ${e.label}" @click="${()=>this._setFilter(e.key,a)}">${this._label(e.field,a)}</button>`):i==="boolean"?r?"Yes":"No":this._plain(r,e.field)}}}_renderTable(e){const t=this._columns.filter(i=>i.fixed||!this._state.hidden.includes(i.key)),r=this._state.sortKey||this.sort;return s`<div class="table-wrap">
      <table>
        <thead>
          <tr>
            ${t.map(i=>{if(!i.sortable)return s`<th scope="col">${i.key==="image"?s`<span class="sr" style="position:absolute;clip-path:inset(50%)">Image</span>`:i.label}</th>`;const a=r===i.key;return s`<th scope="col" aria-sort="${a?this._state.sortDir>0?"ascending":"descending":"none"}">
                <button @click="${()=>this._toggleSort(i.key)}">
                  ${i.label}${V(a?this._state.sortDir>0?"icons:arrow-upward":"icons:arrow-downward":"icons:swap-vert","xs")}
                </button>
              </th>`})}
          </tr>
        </thead>
        <tbody>
          ${e.map(i=>s`<tr>${t.map(a=>s`<td>${this._cell(a,i)}</td>`)}</tr>`)}
        </tbody>
      </table>
    </div>`}_renderCards(e){return s`<div class="cards">
      ${e.map(t=>{const r=this._image(t),i=this._type(t);return s`<a class="card" href="${t.slug}">
          ${r?s`<img src="${r}" alt="" loading="lazy" />`:s`<div class="ph">${this._typeIcon(t)}</div>`}
          <div class="card-body">
            ${i?s`<span class="eyebrow">${this._typeIcon(t)}${i.label}</span>`:""}
            <span class="card-title">${t.title}${t.metadata?.published===!1?s`<span class="draft">Draft</span>`:""}</span>
            ${t.description?s`<span class="desc">${t.description}</span>`:""}
            <span>${this._pills(t)}</span>
          </div>
        </a>`})}
    </div>`}_renderPathways(e){if(!e.length)return s`<div class="empty">Nothing here yet.</div>`;const t=[...e].sort((g,u)=>g.title.localeCompare(u.title)),r=g=>g.metadata?.oerFields||{},i=g=>ue(r(g).prerequisites,this._all).filter(u=>!u.missing),a=t.filter(g=>r(g).placeholder),n=t.filter(g=>!r(g).placeholder),l=n.filter(g=>!i(g).length),d=n.filter(g=>i(g).length),c=new Set(d.map(g=>i(g).map(u=>u.page).join())).size===1?i(d[0]):[],p=c.length===1?`After ${c[0].item.title.replace(/ pathway$/i,"")}`:"Next steps",h=g=>{const u=r(g),v=I2(u.levels),x=K(u.courses);return s`<a class="pw-card" href="${g.slug}">
        <span class="pw-title"><strong>${g.title}</strong>${u.placeholder?L2():""}${g.metadata?.published===!1?s`<span class="draft">Draft</span>`:""}</span>
        ${g.description?s`<p class="pw-desc">${g.description}</p>`:""}
        <span class="pw-meta">
          ${x.length?s`<span>${x.join(" or ")}</span>`:""}
          ${v.length?s`<span class="chips">${v.map(C=>ge(C))}</span>`:u.placeholder?"":s`<span>One level</span>`}
          ${u.targetRole?s`<span>Leads toward ${u.targetRole}</span>`:""}
          ${V("oer:arrow-right","go")}
        </span>
      </a>`},m=(g,u,{featured:v=!1,intro:x=""}={})=>u.length?s`<section class="pw-section">
            <h3>${g}</h3>
            ${x?s`<p>${x}</p>`:""}
            <div class="pw-grid ${v?"featured":""}">${u.map(h)}</div>
          </section>`:"";return s`${m("Start here",l,{featured:!0})}${m(p,d)}${m("In development",a,{intro:"Planned pathways. Their modules are still being written, so they can't be taken yet."})}`}_renderOutline(e){const t=oe((this._all||[]).filter(i=>!i.metadata?.hideInMenu&&(D.isLoggedIn||i.metadata?.published!==!1))),r=this._sorted(e);return r.length?s`<div class="modules">
      ${r.map((i,a)=>{const n=t.get(i.id)||[];return s`<section class="module">
          <div class="module-head">
            <span class="num">${String(a+1).padStart(2,"0")}</span>
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
    </div>`:s`<div class="empty">Nothing here yet.</div>`}_renderControls(e,t){const r=this._state,i=r.view||this.view,a=this._filterFields,n=this._distinct("tags"),l=[...new Set(this._items.map(c=>c.metadata?.pageType)).size>1?[{key:"type",label:"Type"}]:[],...a.filter(c=>c.kind==="select").map(c=>({key:c.name,label:c.label})),...n.length?[{key:"tags",label:"Tag"}]:[]],d=[...Object.entries(r.filters).map(([c,p])=>({label:`${a.find(h=>h.name===c)?.label||c}: ${this._label(a.find(h=>h.name===c),p)}`,clear:()=>this._setFilter(c,null)})),...r.tags.map(c=>({label:`Tag: ${c}`,clear:()=>this._toggleTag(c)}))];return s`
      <div class="bar">
        <label class="search">
          ${V("icons:search","sm")}
          <input type="search" placeholder="Search…" aria-label="Search" .value="${r.q}" @input="${c=>this._setState({q:c.target.value,page:1})}" />
        </label>
        ${a.map(c=>s`<select class="filter" aria-label="${c.label}" @change="${p=>this._setFilter(c.name,p.target.value)}">
            <option value="" ?selected="${!r.filters[c.name]}">${c.label}: all</option>
            ${this._distinct(c.name).map(p=>s`<option value="${p}" ?selected="${r.filters[c.name]===p}">${this._label(c,p)}</option>`)}
          </select>`)}
        ${i==="table"?s`<div class="cols-wrap">
              <button class="btn" aria-expanded="${this._columnsOpen}" @click="${()=>this._columnsOpen=!this._columnsOpen}">${V("oer:columns-2","sm")}Columns</button>
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
          <button aria-pressed="${i==="table"}" @click="${()=>this._setState({view:"table"})}">${V("editor:border-all","sm")}Table</button>
          <button aria-pressed="${i==="cards"}" @click="${()=>this._setState({view:"cards"})}">${V("icons:view-module","sm")}Cards</button>
        </div>
      </div>
      ${n.length>1?s`<div class="chips" role="group" aria-label="Tags">
            ${n.map(c=>s`<button class="chip" aria-pressed="${r.tags.includes(c)}" @click="${()=>this._toggleTag(c)}">${c}</button>`)}
          </div>`:""}
      ${l.length?s`<div class="bar">
            <span class="status" style="margin:0">${V("icons:view-module","xs")}Group by</span>
            <div class="seg" role="group" aria-label="Group by">
              <button aria-pressed="${!r.groupBy}" @click="${()=>this._setState({groupBy:"",page:1})}">None</button>
              ${l.map(c=>s`<button aria-pressed="${r.groupBy===c.key}" @click="${()=>this._setState({groupBy:c.key,page:1})}">${c.label}</button>`)}
            </div>
          </div>`:""}
      <div class="status" aria-live="polite">
        ${d.map(c=>s`<button class="chip active" @click="${c.clear}" aria-label="Remove filter ${c.label}">${V("image:tune","xs")}${c.label}${V("oer:x","xs")}</button>`)}
        <span>${t===e?`${e} item${e===1?"":"s"}`:`${t} of ${e}`}</span>
        ${d.length||r.q?s`<button class="link" @click="${this._clear}">Clear all</button>`:""}
      </div>
    `}_renderPager(e){const t=Math.max(1,Number(this.perPage)||20),r=Math.ceil(e/t);if(r<=1)return"";const i=Math.min(this._state.page,r),a=n=>{this._setState({page:n}),this.scrollIntoView({block:"start",behavior:"auto"})};return s`<nav class="pager" aria-label="Pages">
      <span>Showing ${(i-1)*t+1} to ${Math.min(i*t,e)} of ${e}</span>
      <div class="pages">
        <button ?disabled="${i===1}" aria-label="Previous page" @click="${()=>a(i-1)}">${V("icons:chevron-left","sm")}</button>
        ${Array.from({length:r},(n,l)=>l+1).map(n=>s`<button aria-current="${n===i?"page":"false"}" @click="${()=>a(n)}">${n}</button>`)}
        <button ?disabled="${i===r}" aria-label="Next page" @click="${()=>a(i+1)}">${V("icons:chevron-right","sm")}</button>
      </div>
    </nav>`}render(){const e=this.heading?s`<h2 class="heading">${this.heading}</h2>`:"";if(this.view==="outline")return s`${e}${this._renderOutline(this._items)}`;if(this.view==="pathways")return s`${e}${this._renderPathways(this._items)}`;const t=this.controls==="full"?this._state.view||this.view:this.view,r=this.controls==="full"?this._filtered:this._items,i=this._sorted(r),a=Math.max(1,Number(this.perPage)||20),n=this._groups(i),l=c=>{const p=Math.min(this._state.page,Math.max(1,Math.ceil(c.length/a)));return c.slice((p-1)*a,p*a)},d=c=>t==="cards"?this._renderCards(c):this._renderTable(c);return s`
      ${e}
      ${this.controls==="full"?this._renderControls(this._items.length,r.length):""}
      ${i.length?n.length>1||this._state.groupBy?n.map(c=>s`<section class="group">
                <h3>${c.key}<span class="count">${c.items.length}</span></h3>
                ${d(c.items.slice(0,a))}
              </section>`):s`${d(l(i))}${this._renderPager(i.length)}`:s`<div class="empty">
            ${this._items.length?s`Nothing matches. <button class="link" @click="${this._clear}">Clear filters</button>`:"Nothing here yet."}
          </div>`}
    `}static get haxProperties(){const e=Object.fromEntries([["","Any type"],...T().types.map(t=>[t.id,t.label])]);return{canScale:!1,canEditSource:!0,gizmo:{title:"Page collection",description:"List pages by content type and place: a filterable table, cards, or a module outline.",icon:"icons:view-module",color:"blue",tags:["Layout","collection","index","listing","table","outline"],meta:{author:"Michael Collins"}},settings:{configure:[{property:"heading",title:"Heading",description:"Optional, shown above the list.",inputMethod:"textfield"},{property:"types",title:"Content type",description:"Which pages to list. For several, edit the source and separate IDs with commas.",inputMethod:"select",options:e},{property:"scope",title:"From",inputMethod:"select",options:ma},{property:"view",title:"View",inputMethod:"select",options:ha},{property:"sort",title:"Sort by",inputMethod:"select",options:ua},{property:"perPage",title:"Items per page",inputMethod:"number"},{property:"controls",title:"Search and filters",inputMethod:"select",options:{full:"Show (readers can switch table / cards)",none:"Hide"}}],advanced:[]},demoSchema:[{tag:"oer-collection",properties:{types:"oer:lesson",scope:"site",view:"table",sort:"title",perPage:20,controls:"full"},content:""}]}}}for(const o of["_items","_defs","_state","_columnsOpen"])Object.defineProperty(Ce.prototype,o,{get(){return this[`__${o}`]},set(e){this[`__${o}`]=e,this.requestUpdate()}});customElements.get(Ce.tag)||customElements.define(Ce.tag,Ce),re(Ce);const c2=new Map;function wa(o){if(!c2.has(o)){const e=new URL(o,globalThis.document.baseURI);c2.set(o,fetch(e,{cache:"no-cache"}).then(t=>t.ok?t.text():Promise.reject(new Error(String(t.status)))).then(t=>t.replace(/<page-break\b[^>]*>(?:\s*<\/page-break>)?/gi,"")).catch(t=>{throw c2.delete(o),t}))}return c2.get(o)}class p2 extends F{static get tag(){return"oer-include"}static get properties(){return{page:{type:String,reflect:!0},version:{type:String,reflect:!0},source:{type:String,reflect:!0}}}constructor(){super(),this.source="show"}_resolve(){const e=_(D.manifest?.items)||[],t=e.find(i=>i.id===this.page);if(!t)return{page:null,target:null};if(!this.version)return{page:t,target:t};const r=ee(t.id,e).find(i=>i.version===this.version);return{page:t,target:r?.snapshot||null}}updated(e){(e.has("page")||e.has("version"))&&this._load()}async _load(){const e=this.shadowRoot.querySelector(".content");if(!e)return;const{page:t,target:r}=this._resolve();if(!t||!r){e.innerHTML="",this.__missing=t?`Version ${this.version} of \u201C${t.title}\u201D was not found.`:"The included page was not found.",this.requestUpdate();return}this.__missing="";try{const i=await wa(r.location);this._resolve().target?.id===r.id&&(e.innerHTML=i)}catch{this.__missing=`\u201C${t.title}\u201D could not be loaded.`}this.requestUpdate()}static get styles(){return f`
      :host {
        display: block;
      }
      /* the included page reads like the page around it */
      .content {
        font-size: var(--ddd-theme-body-font-size, 1.125rem);
        line-height: 1.6;
      }
      .content > :first-child {
        margin-top: 0;
      }
      .content h2 {
        margin: 2rem 0 0.75rem;
        font-size: 1.75rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        line-height: 1.25;
      }
      .content h3 {
        margin: 1.5rem 0 0.5rem;
        font-size: 1.375rem;
        font-weight: 600;
      }
      .content h4 {
        margin: 1.25rem 0 0.5rem;
        font-size: 1.125rem;
        font-weight: 600;
      }
      .content p,
      .content ul,
      .content ol {
        margin: 0 0 1rem;
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
        font-size: 0.9375rem;
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
        display: flex;
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
    `}firstUpdated(){this._load()}static get haxProperties(){const e=Object.fromEntries((_(D.manifest?.items)||[]).filter(t=>!t.metadata?.oerSnapshotOf&&t.metadata?.pageType!==G).map(t=>[t.id,t.title]));return{canScale:!1,canEditSource:!0,gizmo:{title:"Include a page",description:"Show another page's content here (latest or a released version) without copying it.",icon:"hax:file-link-outline",color:"blue",tags:["Layout","include","reuse","book","embed"],meta:{author:"Michael Collins"}},settings:{configure:[{property:"page",title:"Page",inputMethod:"select",options:e},{property:"version",title:"Version",description:"A released version like 1.2.0, or empty for the latest.",inputMethod:"textfield"},{property:"source",title:"Source line",inputMethod:"select",options:{show:"Show \u201CFrom \u2026\u201D",hide:"Hide"}}],advanced:[]},demoSchema:[{tag:"oer-include",properties:{source:"show"},content:""}]}}}customElements.get(p2.tag)||customElements.define(p2.tag,p2),re(p2);const pe=(o,e="")=>s`<span class="lucide ${e}" aria-hidden="true" style="--src:url(&quot;${E[o]||""}&quot;)"></span>`,Da={matrix:"Level matrix",syllabus:"Syllabus (one column)",sidebar:"Sidebar (facts beside the route)"};class Ee extends F{static get tag(){return"oer-pathway"}static get properties(){return{layout:{type:String,reflect:!0}}}constructor(){super(),this.layout="matrix",this._data=null,this._level=null}connectedCallback(){super.connectedCallback(),this.__dispose=O(()=>{const e=_(D.manifest?.items)||[],t=_(D.activeId);D.isLoggedIn,Promise.resolve().then(()=>{const r=Qt(t,e);this._data=r?Co(r,e,T(e).types):null})})}disconnectedCallback(){this.__dispose?.(),super.disconnectedCallback()}static get styles(){return[Ge,f`
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
        <dd class="chips">${r||e.levels.map(i=>ge(i))}</dd>
      </div>
      <div>
        <dt>Before you start</dt>
        <dd>
          ${e.prerequisites.length?e.prerequisites.map((i,a)=>s`${a?", ":""}${i.missing?s`<span>Missing page</span>`:s`<a href="${i.href}">${i.item.title}</a>`}${i.version?` (v${i.version})`:""}`):"Nothing \u2014 start here"}
        </dd>
      </div>
    </dl>`}_itemRow(e,t){const r=e.missing?s`<span class="icon bad">${pe("oer:circle-alert","sm")}</span>`:e.planned?s`<span class="icon">${pe("oer:circle-dashed","sm")}</span>`:s`<span class="icon">${e.type?.icon?s`<simple-icon-lite icon="${e.type.icon}"></simple-icon-lite>`:pe("lrn:page","sm")}</span>`;return s`<div class="item">
      ${r}
      <div class="item-body">
        <div class="item-title">
          ${e.href?s`<a href="${e.href}">${e.title}</a>`:s`<span class="planned">${e.title}</span>`}
          ${t&&e.level?ge(e.level):""} ${e.placeholder&&!e.missing?L2():""}
        </div>
        <p class="item-meta">
          ${e.missing?s`<span class="bad">Linked content not found</span>`:s`<span>${e.planned?"Planned":e.typeLabel||"Page"}</span>`}
          ${e.duration?s`<span class="dur">${pe("oer:clock","xs")}${e.duration}</span>`:""}
        </p>
        ${e.components?.length?s`<ul class="components" aria-label="In ${e.title}">
              ${e.components.map(i=>s`<li>
                  ${i.type?.icon?s`<simple-icon-lite icon="${i.type.icon}"></simple-icon-lite>`:pe("lrn:page","xs")}
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
      <div class="rows">${e.items.map(a=>this._itemRow(a,!i))}</div>
    </li>`}_outline(e,t){return s`<ol class="modules">
      ${Eo(e,t).map((r,i)=>this._module(r,i,{level:t}))}
    </ol>`}_switcher(e){const t=[{value:null,label:"All levels"},...e.map(i=>({value:i,label:i}))],r=(i,a)=>{const n={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[i.key];if(!n)return;i.preventDefault();const l=(a+n+t.length)%t.length;this._level=t[l].value,this.updateComplete.then(()=>this.shadowRoot.querySelectorAll(".switcher button")[l]?.focus())};return s`<div class="switcher" role="radiogroup" aria-label="Level">
      ${t.map((i,a)=>{const n=this._level===i.value;return s`<button role="radio" aria-checked="${n?"true":"false"}" tabindex="${n?0:-1}" @click="${()=>this._level=i.value}" @keydown="${l=>r(l,a)}">
          ${i.value?ge(i.value):i.label}
        </button>`})}
    </div>`}_matrix(e,t){return s`<div class="matrix-wrap">
      <table>
        <thead>
          <tr>
            <th scope="col">Module</th>
            ${t.map(r=>s`<th scope="col">${ge(r)}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${e.map(r=>{const i=r.items.filter(n=>!n.level),a=t.map(n=>r.items.filter(l=>l.level===n));return s`<tr>
              <th scope="row">${r.href?s`<a href="${r.href}">${r.title}</a>`:r.title}</th>
              ${i.length&&a.every(n=>!n.length)?s`<td colspan="${t.length}">${i.map(n=>this._itemRow(n,!1))}</td>`:a.map(n=>s`<td>${[...i,...n].map(l=>this._itemRow(l,!1))}</td>`)}
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
          ${e.objectives.map(r=>s`<li>${pe("oer:check")}<span>${r}</span></li>`)}
        </ul>`:""}_testOut(e,t){return e.testOut.length?s`<section class="testout ${t?"wide":""}" aria-labelledby="testout">
          <h2 id="testout">Already know this?</h2>
          <p>You can ask your instructor to test out. You'll need to show work that meets these criteria:</p>
          <ul>
            ${e.testOut.map(r=>s`<li>${pe("oer:circle-check")}<span>${r}</span></li>`)}
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
    </div>`}render(){const e=this._data;return e?this.layout==="syllabus"?this._renderSyllabus(e):this.layout==="sidebar"?this._renderSidebar(e):this._renderMatrix(e):s`<div class="empty">This block shows a pathway. Place it on a page of type Pathway (or one of its sub-pages).</div>`}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:{title:"Pathway",description:"A pathway's facts, route through its modules by level, objectives and test-out criteria.",icon:"hax:unit",color:"blue",tags:["Layout","pathway","course","levels","matrix","outline"],meta:{author:"Michael Collins"}},settings:{configure:[{property:"layout",title:"Layout",inputMethod:"select",options:Da}],advanced:[]},demoSchema:[{tag:"oer-pathway",properties:{layout:"matrix"},content:""}]}}}for(const o of["_data","_level"])Object.defineProperty(Ee.prototype,o,{get(){return this[`__${o}`]},set(e){this[`__${o}`]=e,this.requestUpdate()}});customElements.get(Ee.tag)||customElements.define(Ee.tag,Ee),re(Ee);const y=400,be=240,b=(o,e,t,r,i="box",a=4)=>$`<rect x=${o} y=${e} width=${t} height=${r} rx=${a} class=${i}></rect>`,w=(o,e,t,r="t")=>b(o,e,t,5,r,2.5),j=(o,e,t,r="lbl",i="start")=>$`<text x=${o} y=${e} class=${r} text-anchor=${i}>${t}</text>`,I=(o,e,t,r="t")=>$`<circle cx=${o} cy=${e} r=${t} class=${r}></circle>`,we=(o,e="stroke")=>$`<path d=${o} class=${e}></path>`,Z=(o,e,t)=>$`<line x1=${o} y1=${e} x2=${t} y2=${e} class="rule"></line>`,H=(o,e,t,r,i="hi-o")=>$`${b(o,e,t,18,i,9)}${j(o+t/2,e+12.5,r,i==="hi"?"lbl on":"lbl","middle")}`,xa=(o,e,t=!0)=>$`${b(o,e,10,10,t?"hi":"card",2.5)}${t?we(`M${o+2.5} ${e+5.2} l2 2 l3.2 -4`,"tick"):""}`,Y2=(o,e,t="stroke hi-line")=>we(`M${o} ${e} l3.5 3.5 l3.5 -3.5`,t),N=(o=!0)=>$`
  ${b(.5,.5,y-1,be-1,"win",10)}
  ${Z(.5,28,y-.5)}
  ${I(14,14,3.5,"t2")}${I(25,14,3.5,"t2")}${I(36,14,3.5,"t2")}
  ${w(y-74,11.5,40,"t2")}${I(y-18,14,5,"t2")}
  ${o?$`${b(.5,28,110,be-28.5,"panel",0)}${we(`M110.5 28 V${be-.5}`,"rule")}`:""}`,h2=(o,e,t,r=5)=>$`
  ${b(o,e,t*.55,10,"t",3)}
  ${Array.from({length:r},(i,a)=>w(o,e+24+a*12,t*(a%3===2?.7:.95)))}`,he=(o,e,t=14)=>Array.from({length:e},(r,i)=>w(t,o+i*13,58+i*17%26)),Wr={sidebar:()=>$`
    ${N()}
    ${b(8,36,94,20,"card",6)}
    ${b(10,38,50,16,"hi-soft",5)}${j(35,49,"Navigation","lbl sm","middle")}${w(68,43.5,24,"t2")}
    ${j(14,74,"LIBRARY","lbl sm caps")}
    ${he(82,3,22)}
    ${j(14,132,"CURRICULUM","lbl sm caps")}
    ${he(140,3,22)}
    ${H(18,186,74,"+ Add page","ghost")}
    ${H(22,210,66,"Edit outline")}
    ${h2(126,44,258,9)}`,breadcrumb:()=>$`
    ${N(!1)}
    ${Z(.5,62,y-.5)}
    ${w(18,42,34)}${j(60,47,"/","sep")}
    ${b(70,35,26,18,"hi-soft",5)}${j(83,48,"\u2026","lbl","middle")}
    ${j(104,47,"/","sep")}${w(114,42,46)}${j(168,47,"/","sep")}${b(178,42,58,5,"t-strong",2.5)}
    ${b(62,58,120,66,"pop hi-line",7)}
    ${w(74,72,72)}${w(74,88,88)}${w(74,104,64)}
    ${h2(200,82,180,7)}
    ${w(20,140,160)}${w(20,152,150)}${w(20,164,168)}${w(20,176,120)}`,editor:()=>$`
    ${N(!1)}
    ${b(.5,28,y-1,30,"panel",0)}${Z(.5,58,y-.5)}
    ${w(16,40.5,70,"t")}
    ${H(y-132,34,56,"Cancel","ghost")}${H(y-70,34,54,"Save","hi")}
    ${b(70,72,160,10,"t",3)}
    ${w(70,92,270)}${w(70,104,250)}
    ${we(`M70 126 H${y-50}`,"stroke hi-line dash")}${I(y/2+10,126,8,"hi")}${we(`M${y/2+6} 126 h8 M${y/2+10} 122 v8`,"tick")}
    ${b(64,140,284,56,"hi-o",5)}
    ${b(40,140,18,72,"card",5)}
    ${b(44,145,10,10,"hi",2.5)}${b(44,161,10,10,"hi-soft",2.5)}${b(44,177,10,10,"hi-soft",2.5)}${b(44,193,10,10,"hi-soft",2.5)}
    ${w(74,152,250)}${w(74,164,262)}${w(74,176,200)}
    ${w(70,214,260)}${w(70,226,180)}`,collection:()=>$`
    ${N(!1)}
    ${b(18,42,160,10,"t",3)}
    ${b(18,64,150,20,"card",5)}${w(28,71.5,60,"t2")}
    ${b(176,64,56,20,"card",10)}${w(188,71.5,32,"t2")}
    ${b(y-128,64,110,20,"card",6)}
    ${b(y-126,66,36,16,"hi-soft",4)}${j(y-108,77.5,"Table","lbl sm","middle")}
    ${w(y-82,71.5,24,"t2")}${w(y-50,71.5,24,"t2")}
    ${b(18,96,y-36,128,"card",6)}
    ${b(18.5,96.5,y-37,20,"panel",5.5)}
    ${w(30,104,60,"t-strong")}${Y2(94,103,"stroke hi-line")}${w(170,104,50,"t-strong")}${w(280,104,50,"t-strong")}
    ${[0,1,2,3,4].map(o=>$`${Z(18.5,116.5+o*21,y-18.5)}${w(30,124+o*21,90+o*23%40)}${b(170,122+o*21,42,9,"pill",4.5)}${w(280,124+o*21,60)}`)}`,"content-types":()=>$`
    ${N()}
    ${j(14,46,"SITE","lbl sm caps")}
    ${b(8,54,94,18,"hi-soft",5)}${w(16,60.5,60,"t-hi")}
    ${he(86,5)}
    ${b(126,40,120,10,"t",3)}
    ${b(126,58,52,20,"card",6)}${w(134,65.5,36,"t2")}
    ${b(182,58,52,20,"hi-soft",6)}${w(190,65.5,36,"t-hi")}
    ${b(238,58,52,20,"card",6)}${w(246,65.5,36,"t2")}
    ${[0,1,2,3].map(o=>$`
      ${b(126,90+o*34,258,28,"card",6)}
      ${w(136,101.5+o*34,56+o*19%30)}
      ${b(232,98+o*34,48,12,"pill",6)}
      ${o===1?$`${b(342,98+o*34,24,12,"hi",6)}${I(360,104+o*34,4.5,"knob")}`:$`${b(342,98+o*34,24,12,"pill",6)}${I(348,104+o*34,4.5,"knob")}`}`)}`,"page-menu":()=>$`
    ${N()}
    ${he(44,10)}
    ${b(126,44,160,12,"t",3)}
    ${b(y-36,42,18,16,"hi-o",4)}${Y2(y-30.5,48)}
    ${b(126,68,36,10,"pill",5)}${b(168,68,30,10,"pill",5)}
    ${w(126,94,150)}${w(126,106,140)}${w(126,118,146)}
    ${b(126,136,150,70,"box",5)}
    ${b(y-128,64,110,156,"pop hi-line",8)}
    ${b(y-122,70,98,18,"hi-soft",5)}${w(y-114,76.5,56,"t-hi")}
    ${[0,1,2,3,4].map(o=>w(y-114,100+o*16,48+o*13%26))}
    ${Z(y-122,184,y-24)}${w(y-114,194,44)}${w(y-114,208,54)}`,"page-details":()=>$`
    ${N()}
    ${he(44,10)}
    ${h2(126,44,258,9)}
    ${b(.5,28,y-1,be-28.5,"scrim",0)}
    ${b(110,46,200,182,"pop hi-line",10)}
    ${b(124,60,90,10,"t",3)}
    ${w(124,84,30,"t2")}${b(124,93,172,20,"card",5)}${w(132,100.5,50)}${Y2(282,101,"stroke")}
    ${w(124,124,50,"t2")}${b(124,133,172,34,"card",5)}${w(132,141,120)}${w(132,153,90)}
    ${w(124,178,40,"t2")}${b(124,187,172,18,"card",5)}${w(132,193.5,70)}
    ${H(246,210,50,"Save","hi")}`,"outline-builder":()=>$`
    ${N(!1)}
    ${b(18,40,120,10,"t",3)}
    ${j(y-86,49,"Icons","lbl sm","end")}${b(y-80,40,24,12,"hi",6)}${I(y-62,46,4.5,"knob")}
    ${H(y-50,37,36,"Save","hi")}
    ${Z(18,64,y-18)}
    ${[{x:18,w:90,head:!0},{x:18,w:110,chip:!0},{x:38,w:90,chip:!0},{x:38,w:100,link:!0},{x:18,w:70,head:!0},{x:18,w:120,chip:!0}].map((o,e)=>{const t=74+e*22;return $`
        ${I(o.x+4,t+7.5,1.3,"t")}${I(o.x+8,t+7.5,1.3,"t")}${I(o.x+4,t+3.5,1.3,"t")}${I(o.x+8,t+3.5,1.3,"t")}${I(o.x+4,t+11.5,1.3,"t")}${I(o.x+8,t+11.5,1.3,"t")}
        ${o.head?j(o.x+18,t+11,e?"CURRICULUM":"LIBRARY","lbl sm caps"):w(o.x+18,t+5,o.w)}
        ${o.chip?b(y-92,t+1,52,13,"pill",6.5):""}
        ${o.link?$`${b(y-92,t+1,52,13,"hi-soft",6.5)}${j(y-66,t+10.5,"v1.2.0","lbl sm","middle")}`:""}`})}
    ${H(38,212,72,"+ Add page")}${H(116,212,94,"+ Add existing")}${H(216,212,94,"+ Add heading")}`,"pathways-index":()=>$`
    ${N(!1)}
    ${b(18,40,140,10,"t",3)}
    ${[{x:18,label:"START HERE",n:2},{x:144,label:"BUILDS ON",n:3},{x:270,label:"IN DEVELOPMENT",n:1}].map(o=>$`
        ${j(o.x,72,o.label,"lbl sm caps")}${we(`M${o.x} 78 H${o.x+112}`,"stroke hi-line")}
        ${Array.from({length:o.n},(e,t)=>$`
          ${b(o.x,86+t*48,112,40,"card",6)}
          ${w(o.x+10,96+t*48,70,"t-strong")}${w(o.x+10,108+t*48,86)}
          ${b(o.x+10,115+t*48,26,6,"pill",3)}`)}`)}`,pathway:()=>$`
    ${N(!1)}
    ${b(18,40,150,10,"t",3)}
    ${[0,1,2,3].map(o=>$`${b(18+o*92,60,84,30,"card",6)}${w(26+o*92,67,30,"t2")}${w(26+o*92,78,52,"t-strong")}`)}
    ${b(18,104,y-36,120,"card",6)}
    ${b(18.5,104.5,y-37,22,"hi-soft",5.5)}
    ${j(30,119,"MODULE","lbl sm caps")}
    ${["Beginner","Intermediate","Advanced"].map((o,e)=>j(152+e*80,119,o,"lbl sm"))}
    ${[0,1,2].map(o=>$`
      ${Z(18.5,126.5+o*32,y-18.5)}
      ${w(30,139+o*32,80,"t-strong")}
      ${[0,1,2].map(e=>(o+e)%3===2?"":$`${b(152+e*80,134+o*32,66,14,"pill",7)}`)}`)}`,versions:()=>$`
    ${N()}
    ${he(44,10)}
    ${b(126,44,150,12,"t",3)}
    ${b(126,64,36,10,"pill",5)}
    ${[0,1,2,3,4,5].map(o=>w(126,96+o*12,o%3===2?40:52))}
    ${b(186,70,198,156,"pop hi-line",10)}
    ${b(198,82,80,10,"t",3)}
    ${H(310,78,62,"Publish","hi")}
    ${[["v1.2.0",!0],["v1.1.0",!1],["v1.0.0",!1]].map(([o,e],t)=>$`
      ${Z(198,108+t*36,372)}
      ${j(198,124+t*36,o,e?"lbl sm":"muted sm")}
      ${e?b(238,116+t*36,34,11,"hi-soft",5.5):""}
      ${w(286,120+t*36,54,"t2")}
      ${w(198,132+t*36,140)}`)}`,embed:()=>$`
    ${N()}
    ${he(44,10)}
    ${h2(126,44,258,9)}
    ${b(.5,28,y-1,be-28.5,"scrim",0)}
    ${b(100,44,220,184,"pop hi-line",10)}
    ${b(114,58,80,10,"t",3)}
    ${b(114,78,192,50,"code",6)}
    ${w(124,88,150,"t-code")}${w(124,100,170,"t-code")}${w(124,112,110,"t-code")}
    ${[0,1,2,3].map(o=>$`${xa(114,140+o*16,o!==2)}${w(132,142.5+o*16,80+o*21%40)}`)}
    ${H(248,204,58,"Copy","hi")}`,footer:()=>$`
    ${N(!1)}
    ${w(18,42,340)}${w(18,54,300)}
    ${Z(18,76,y-18)}
    ${I(26,96,8,"hi-soft")}${I(44,96,8,"hi-soft")}${I(62,96,8,"hi-soft")}${w(78,93.5,140)}
    ${H(y-158,87,50,"Cite")}${H(y-102,87,84,"OER Schema")}
    ${[["AI use",3],["Version",0],["Used in",0]].map(([o,e],t)=>$`
      ${Z(18,120+t*36,y-18)}
      ${j(18,140+t*36,o,"muted sm")}
      ${e?Array.from({length:e},(r,i)=>b(110+i*54,131+t*36,48,13,"pill",6.5)):$`${w(110,135+t*36,t===1?120:170,"t")}${t===1?w(240,135+t*36,48,"t-hi"):""}`}`)}`},ya=Object.keys(Wr);class m2 extends F{static get tag(){return"oer-schematic"}static get properties(){return{preset:{type:String,reflect:!0},alt:{type:String,reflect:!0},caption:{type:String,reflect:!0}}}static get styles(){return f`
      :host {
        display: block;
        margin: 1.75rem 0;
      }
      figure {
        margin: 0;
      }
      .frame {
        padding: clamp(0.75rem, 4%, 1.75rem);
        border-radius: var(--radius-lg, 0.75rem);
        background: color-mix(in oklch, var(--muted, #f4f4f5) 55%, transparent);
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
        font-size: 11px;
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
        font-size: 9.5px;
      }
      .caps {
        letter-spacing: 0.06em;
      }
    `}render(){const e=Wr[this.preset];return s`<figure>
      <div class="frame">
        ${e?s`<svg viewBox="0 0 ${y} ${be}" role="img" aria-label=${this.alt||this.caption||"Interface diagram"}>${e()}</svg>`:s`<div class="missing">Choose a diagram in the block settings.</div>`}
      </div>
      ${this.caption?s`<figcaption>${this.caption}</figcaption>`:""}
    </figure>`}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:{title:"Interface diagram",description:"A simplified drawing of part of the site, with one feature highlighted, for documentation.",icon:"image:image",color:"blue",tags:["Media","diagram","schematic","documentation","help"],meta:{author:"Michael Collins"}},settings:{configure:[{property:"preset",title:"Diagram",inputMethod:"select",options:Object.fromEntries(ya.map(e=>[e,e.replace(/-/g," ").replace(/^./,t=>t.toUpperCase())]))},{property:"alt",title:"Description",description:"What the diagram shows, for screen readers.",inputMethod:"textarea"},{property:"caption",title:"Caption",inputMethod:"textarea"}],advanced:[]},demoSchema:[{tag:"oer-schematic",properties:{preset:"sidebar",alt:"The sidebar",caption:"The sidebar"},content:""}]}}}customElements.get(m2.tag)||customElements.define(m2.tag,m2),re(m2);class u2 extends F{static get tag(){return"oer-credit"}static get properties(){return{title:{type:String,reflect:!0},creator:{type:String,reflect:!0},creatorUrl:{type:String,attribute:"creator-url",reflect:!0},source:{type:String,reflect:!0},license:{type:String,reflect:!0},note:{type:String,reflect:!0}}}static get styles(){return f`
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
    `}render(){const e=(a,n)=>n?s`<a href="${n}" target="_blank" rel="noopener noreferrer">${a}</a>`:a,t=fe(this.license),r=this.license?t?.url?s`<a class="license" href="${t.url}" target="_blank" rel="license noopener noreferrer">${t.parts.map(a=>s`<img src="${R2(a)}" alt="" />`)}${t.name}</a>`:s`<span class="license">${this.license}</span>`:"";if(!this.title&&!this.creator&&!this.license)return s`<p class="empty">Credit: add the title, creator and licence in the block settings.</p>`;const i=[];return this.title&&i.push(s`“${e(this.title,this.source)}”`),this.creator&&i.push(s`${this.title?" by ":"By "}${e(this.creator,this.creatorUrl)}`),s`<p>
      ${i}${i.length&&r?", ":""}${r}${i.length||r?".":""}${this.note?s` ${this.note.replace(/\.?$/,".")}`:""}
    </p>`}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:{title:"Credit",description:"Attribution for third-party material placed above it: title, creator, source and licence.",icon:"icons:copyright",color:"blue",tags:["Text","credit","attribution","license","creative commons","copyright","source"],meta:{author:"Michael Collins"}},settings:{configure:[{property:"title",title:"Title of the work",inputMethod:"textfield"},{property:"source",title:"Source link",description:"Where the original is published.",inputMethod:"textfield",validationType:"url"},{property:"creator",title:"Creator",inputMethod:"textfield"},{property:"creatorUrl",title:"Creator link",inputMethod:"textfield",validationType:"url"},{property:"license",title:"License",inputMethod:"select",options:fr},{property:"note",title:"Changes",description:"How you adapted it, e.g. \u201CCropped and recoloured\u201D.",inputMethod:"textfield"}],advanced:[]},demoSchema:[{tag:"oer-credit",properties:{title:"Title of the work",creator:"Creator",license:"CC BY 4.0"},content:""}]}}}customElements.get(u2.tag)||customElements.define(u2.tag,u2),re(u2);const ka={"true-false-question":"multiple-choice/lib/true-false-question.js","fill-in-the-blanks":"fill-in-the-blanks/fill-in-the-blanks.js","matching-question":"matching-question/matching-question.js","sorting-question":"sorting-question/sorting-question.js","tagging-question":"tagging-question/tagging-question.js"},_a=()=>globalThis.WCGlobalBasePath||new URL("build/es6/node_modules/",globalThis.document.baseURI).href;async function $a(o){for(const[e,t]of Object.entries(ka))if(!o.elementList?.[e])try{await import(`${_a()}@haxtheweb/${t}`);let r=customElements.get(e)?.haxProperties;typeof r=="string"&&(r=await fetch(new URL(r,globalThis.document.baseURI)).then(i=>i.ok?i.json():null)),r&&o.setHaxProperties(r,e)}catch(r){console.warn(`[oer] could not add ${e} to the block list`,r)}}let G2=!1;function Yr(){const o=globalThis.HaxStore?.requestAvailability?.();return!o||!o.appStoreLoaded||G2?!!G2:(G2=!0,$a(o),!0)}globalThis.addEventListener("hax-store-app-store-loaded",()=>setTimeout(Yr,0));const Fa=setInterval(()=>Yr()&&clearInterval(Fa),1500);function Ca(o){if(!o||o.prototype.__oerCorrect)return;o.prototype.__oerCorrect=!0;const e=o.prototype.processInput;e&&(o.prototype.processInput=function(r,i,...a){const n=e.call(this,r,i,...a),l=i?.[r];return n&&l?.hasAttribute?.("data-correct")&&(n.correct=!0),n});const t=o.prototype.haxpreProcessNodeToContent;t&&(o.prototype.haxpreProcessNodeToContent=async function(r,...i){const a=await t.call(this,r,...i);for(const n of new Set([this,r,a].filter(l=>l?.querySelectorAll)))n.querySelectorAll("input[correct]").forEach(l=>l.setAttribute("data-correct","true"));return a})}for(const o of["multiple-choice","true-false-question","fill-in-the-blanks","matching-question","sorting-question","tagging-question"])customElements.whenDefined(o).then(()=>{let e=customElements.get(o);for(;e&&e!==HTMLElement&&e.name!=="QuestionElement";)e=Object.getPrototypeOf(e);e?.name==="QuestionElement"&&Ca(e)});const Gr=o=>s`<span class="icon" aria-hidden="true" style="--src:url(&quot;${E[o]||""}&quot;)"></span>`;class g2 extends F{static get tag(){return"oer-draft"}static get properties(){return{note:{type:String,reflect:!0}}}connectedCallback(){super.connectedCallback(),this.__stop=O(()=>{this.toggleAttribute("data-author",!!D.isLoggedIn),this.toggleAttribute("data-editing",!!D.editMode),this.requestUpdate()}),this.__ray=new MutationObserver(()=>this.requestUpdate()),this.__ray.observe(this,{attributes:!0,attributeFilter:["data-hax-ray"]})}disconnectedCallback(){this.__stop?.(),this.__ray?.disconnect(),super.disconnectedCallback()}static get styles(){return f`
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
        <span class="label">${Gr("icons:visibility-off")}Draft for review</span>
        <span class="note"
          >${this.note?`${this.note}. `:""}Only signed-in authors see this.${e?"":" Edit the page to review and publish it."}</span
        >
        ${e?s`<button @click="${this._publish}">${Gr("oer:check")}Publish</button>`:""}
      </div>
      <slot></slot>`}static get haxProperties(){return{type:"grid",canScale:!1,canEditSource:!0,gizmo:{title:"Draft",description:"Blocks only signed-in authors see, until you publish them.",icon:"icons:visibility-off",color:"orange",tags:["Layout","draft","review","hidden"],meta:{author:"Michael Collins"}},settings:{configure:[{property:"note",title:"Note",description:"Why it's a draft, e.g. \u201CSuggested questions\u201D.",inputMethod:"textfield"}],advanced:[]},demoSchema:[{tag:"oer-draft",properties:{note:"Not ready yet"},content:"<p>Draft content.</p>"}]}}}customElements.get(g2.tag)||customElements.define(g2.tag,g2),re(g2);
