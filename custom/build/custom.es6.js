import{SimpleIconsetStore as ht}from"@haxtheweb/simple-icon/lib/simple-iconset.js";import{store as E}from"@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";import{HAXCMSLitElementTheme as D2,css as u,html as s,unsafeCSS as i2,toJS as b,store as w,autorun as z}from"@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";import"@haxtheweb/haxcms-elements/lib/ui-components/navigation/site-breadcrumb.js";import"@haxtheweb/haxcms-elements/lib/ui-components/active-item/site-active-title.js";import"@haxtheweb/haxcms-elements/lib/ui-components/layout/site-modal.js";import{DDD as pt}from"@haxtheweb/d-d-d/d-d-d.js";const x={"hax:hax2022":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%203H5a2%202%200%200%200-2%202v14a2%202%200%200%200%202%202h14a2%202%200%200%200%202-2v-7%22%20%2F%3E%20%3Cpath%20d%3D%22M18.375%202.625a1%201%200%200%201%203%203l-9.013%209.014a2%202%200%200%201-.853.505l-2.873.84a.5.5%200%200%201-.62-.62l.84-2.873a2%202%200%200%201%20.506-.852z%22%20%2F%3E%20%3C%2Fsvg%3E","hax:site-map":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20x%3D%2216%22%20y%3D%2216%22%20width%3D%226%22%20height%3D%226%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20x%3D%222%22%20y%3D%2216%22%20width%3D%226%22%20height%3D%226%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20x%3D%229%22%20y%3D%222%22%20width%3D%226%22%20height%3D%226%22%20rx%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M5%2016v-3a1%201%200%200%201%201-1h12a1%201%200%200%201%201%201v3%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2012V8%22%20%2F%3E%20%3C%2Fsvg%3E","hax:page-edit":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M14.364%2013.634a2%202%200%200%200-.506.854l-.837%202.87a.5.5%200%200%200%20.62.62l2.87-.837a2%202%200%200%200%20.854-.506l4.013-4.009a1%201%200%200%200-3.004-3.004z%22%20%2F%3E%20%3Cpath%20d%3D%22M14.487%207.858A1%201%200%200%201%2014%207V2%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2019.645V20a2%202%200%200%201-2%202H6a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l2.516%202.516%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2018h1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:add-page":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2015h6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018v-6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:loading":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%2012a9%209%200%201%201-6.219-8.56%22%20%2F%3E%20%3C%2Fsvg%3E","hax:wizard-hat":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m21.64%203.64-1.28-1.28a1.21%201.21%200%200%200-1.72%200L2.36%2018.64a1.21%201.21%200%200%200%200%201.72l1.28%201.28a1.2%201.2%200%200%200%201.72%200L21.64%205.36a1.2%201.2%200%200%200%200-1.72%22%20%2F%3E%20%3Cpath%20d%3D%22m14%207%203%203%22%20%2F%3E%20%3Cpath%20d%3D%22M5%206v4%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2014v4%22%20%2F%3E%20%3Cpath%20d%3D%22M10%202v2%22%20%2F%3E%20%3Cpath%20d%3D%22M7%208H3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2016h-4%22%20%2F%3E%20%3Cpath%20d%3D%22M11%203H9%22%20%2F%3E%20%3C%2Fsvg%3E","hax:graph":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%203v16a2%202%200%200%200%202%202h16%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2017V9%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2017V5%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2017v-3%22%20%2F%3E%20%3C%2Fsvg%3E","hax:blocks":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2022V7a1%201%200%200%200-1-1H4a2%202%200%200%200-2%202v12a2%202%200%200%200%202%202h12a2%202%200%200%200%202-2v-5a1%201%200%200%200-1-1H2%22%20%2F%3E%20%3Crect%20x%3D%2214%22%20y%3D%222%22%20width%3D%228%22%20height%3D%228%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:add-brick":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M12%208v8%22%20%2F%3E%20%3C%2Fsvg%3E","hax:html-code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2012.5%208%2015l2%202.5%22%20%2F%3E%20%3Cpath%20d%3D%22m14%2012.5%202%202.5-2%202.5%22%20%2F%3E%20%3C%2Fsvg%3E","hax:home-edit":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2021v-8a1%201%200%200%200-1-1h-4a1%201%200%200%200-1%201v8%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2010a2%202%200%200%201%20.709-1.528l7-6a2%202%200%200%201%202.582%200l7%206A2%202%200%200%201%2021%2010v9a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2z%22%20%2F%3E%20%3C%2Fsvg%3E","hax:add-item":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2012H3%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2019H3%22%20%2F%3E%20%3Cpath%20d%3D%22M18%209v6%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012h-6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:view-gallery":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%2214%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%2214%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%223%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:format-textblock":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2012H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2019H3%22%20%2F%3E%20%3C%2Fsvg%3E","hax:file-html":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2012.5%208%2015l2%202.5%22%20%2F%3E%20%3Cpath%20d%3D%22m14%2012.5%202%202.5-2%202.5%22%20%2F%3E%20%3C%2Fsvg%3E","hax:code-json":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2012a1%201%200%200%200-1%201v1a1%201%200%200%201-1%201%201%201%200%200%201%201%201v1a1%201%200%200%200%201%201%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2018a1%201%200%200%200%201-1v-1a1%201%200%200%201%201-1%201%201%200%200%201-1-1v-1a1%201%200%200%200-1-1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:templates":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%227%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%229%22%20height%3D%227%22%20x%3D%223%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%225%22%20height%3D%227%22%20x%3D%2216%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:paragraph":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M13%204v16%22%20%2F%3E%20%3Cpath%20d%3D%22M17%204v16%22%20%2F%3E%20%3Cpath%20d%3D%22M19%204H9.5a4.5%204.5%200%200%200%200%209H13%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h1":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22m17%2012%203-2v8%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h2":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2018h-4c0-4%204-3%204-6%200-1.5-2-2.5-4-1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h3":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17.5%2010.5c1.7-1%203.5%200%203.5%201.5a2%202%200%200%201-2%202%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2017.5c2%201.5%204%20.3%204-1.5a2%202%200%200%200-2-2%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h4":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2010v3a1%201%200%200%200%201%201h3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2010v8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h5":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2013v-3h4%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2017.7c.4.2.8.3%201.3.3%201.5%200%202.7-1.1%202.7-2.5S19.8%2013%2018.3%2013H17%22%20%2F%3E%20%3C%2Fsvg%3E","hax:h6":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Ccircle%20cx%3D%2219%22%20cy%3D%2216%22%20r%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2010c-2%202-3%203.5-3%206%22%20%2F%3E%20%3C%2Fsvg%3E","hax:file-pdf":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2013H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2017H8%22%20%2F%3E%20%3C%2Fsvg%3E","hax:add-child-page":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11.35%2022H6a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.706.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v5.35%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2019h6%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2016v6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:site-settings":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9.671%204.136a2.34%202.34%200%200%201%204.659%200%202.34%202.34%200%200%200%203.319%201.915%202.34%202.34%200%200%201%202.33%204.033%202.34%202.34%200%200%200%200%203.831%202.34%202.34%200%200%201-2.33%204.033%202.34%202.34%200%200%200-3.319%201.915%202.34%202.34%200%200%201-4.659%200%202.34%202.34%200%200%200-3.32-1.915%202.34%202.34%200%200%201-2.33-4.033%202.34%202.34%200%200%200%200-3.831A2.34%202.34%200%200%201%206.35%206.051a2.34%202.34%200%200%200%203.319-1.915%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","hax:multimedia":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m12.296%203.464%203.02%203.956%22%20%2F%3E%20%3Cpath%20d%3D%22M20.2%206%203%2011l-.9-2.4c-.3-1.1.3-2.2%201.3-2.5l13.5-4c1.1-.3%202.2.3%202.5%201.3z%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2011h18v8a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2z%22%20%2F%3E%20%3Cpath%20d%3D%22m6.18%205.276%203.1%203.899%22%20%2F%3E%20%3C%2Fsvg%3E","hax:module":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11%2021.73a2%202%200%200%200%202%200l7-4A2%202%200%200%200%2021%2016V8a2%202%200%200%200-1-1.73l-7-4a2%202%200%200%200-2%200l-7%204A2%202%200%200%200%203%208v8a2%202%200%200%200%201%201.73z%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2022V12%22%20%2F%3E%20%3Cpolyline%20points%3D%223.29%207%2012%2012%2020.71%207%22%20%2F%3E%20%3Cpath%20d%3D%22m7.5%204.27%209%205.15%22%20%2F%3E%20%3C%2Fsvg%3E","hax:menu-open":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M9%203v18%22%20%2F%3E%20%3Cpath%20d%3D%22m14%209%203%203-3%203%22%20%2F%3E%20%3C%2Fsvg%3E","hax:lesson":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%205v16%22%20%2F%3E%20%3Cpath%20d%3D%22M20.001%2019A2%202%200%200022%2017V5a2%202%200%2000-1.999-2L16%203.002A5%205%200%200012%205a5%205%200%2000-4-2H4a2%202%200%2000-2%202v12a2%202%200%20001.999%202H8a5%205%200%20014%202%205%205%200%20014-2z%22%20%2F%3E%20%3C%2Fsvg%3E","hax:keyboard-arrow-up":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18%2015-6-6-6%206%22%20%2F%3E%20%3C%2Fsvg%3E","hax:keyboard-arrow-down":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m6%209%206%206%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:file-docx":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2018h2%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2012v6%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2013v-.5a.5.5%200%200%201%20.5-.5h5a.5.5%200%200%201%20.5.5v.5%22%20%2F%3E%20%3C%2Fsvg%3E","hax:embed":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18%2016%204-4-4-4%22%20%2F%3E%20%3Cpath%20d%3D%22m6%208-4%204%204%204%22%20%2F%3E%20%3Cpath%20d%3D%22m14.5%204-5%2016%22%20%2F%3E%20%3C%2Fsvg%3E","hax:duplicate":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2214%22%20height%3D%2214%22%20x%3D%228%22%20y%3D%228%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2016c-1.1%200-2-.9-2-2V4c0-1.1.9-2%202-2h10c1.1%200%202%20.9%202%202%22%20%2F%3E%20%3C%2Fsvg%3E","hax:abbr":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%227%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209v6%22%20%2F%3E%20%3Ccircle%20cx%3D%2217%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3Cpath%20d%3D%22M14%207v8%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2017v1c0%20.5-.5%201-1%201H3c-.5%200-1-.5-1-1v-1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:wand":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%204V2%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2016v-2%22%20%2F%3E%20%3Cpath%20d%3D%22M8%209h2%22%20%2F%3E%20%3Cpath%20d%3D%22M20%209h2%22%20%2F%3E%20%3Cpath%20d%3D%22M17.8%2011.8%2019%2013%22%20%2F%3E%20%3Cpath%20d%3D%22M15%209h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M17.8%206.2%2019%205%22%20%2F%3E%20%3Cpath%20d%3D%22m3%2021%209-9%22%20%2F%3E%20%3Cpath%20d%3D%22M12.2%206.2%2011%205%22%20%2F%3E%20%3C%2Fsvg%3E","hax:video":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2013%205.223%203.482a.5.5%200%200%200%20.777-.416V7.87a.5.5%200%200%200-.752-.432L16%2010.5%22%20%2F%3E%20%3Crect%20x%3D%222%22%20y%3D%226%22%20width%3D%2214%22%20height%3D%2212%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","hax:unit":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%206%204%2014%22%20%2F%3E%20%3Cpath%20d%3D%22M12%206v14%22%20%2F%3E%20%3Cpath%20d%3D%22M8%208v12%22%20%2F%3E%20%3Cpath%20d%3D%22M4%204v16%22%20%2F%3E%20%3C%2Fsvg%3E","hax:ticket":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2%209a3%203%200%200%201%200%206v2a2%202%200%200%200%202%202h16a2%202%200%200%200%202-2v-2a3%203%200%200%201%200-6V7a2%202%200%200%200-2-2H4a2%202%200%200%200-2%202Z%22%20%2F%3E%20%3Cpath%20d%3D%22M13%205v2%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2017v2%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2011v2%22%20%2F%3E%20%3C%2Fsvg%3E","hax:task":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22m16%209-5.5%205.5L8%2012%22%20%2F%3E%20%3C%2Fsvg%3E","hax:table-column-remove":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%227%22%20height%3D%2213%22%20x%3D%223%22%20y%3D%228%22%20rx%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22m15%202-3%203-3-3%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%2213%22%20x%3D%2214%22%20y%3D%228%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:table-column-plus-after":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%227%22%20height%3D%2213%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22m9%2022%203-3%203%203%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%2213%22%20x%3D%2214%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:skull":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m12.5%2017-.5-1-.5%201h1z%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2022a1%201%200%200%200%201-1v-1a2%202%200%200%200%201.56-3.25%208%208%200%201%200-11.12%200A2%202%200%200%200%208%2020v1a1%201%200%200%200%201%201z%22%20%2F%3E%20%3Ccircle%20cx%3D%2215%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:shovel":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21.56%204.56a1.5%201.5%200%200%201%200%202.122l-.47.47a3%203%200%200%201-4.212-.03%203%203%200%200%201%200-4.243l.44-.44a1.5%201.5%200%200%201%202.121%200z%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2022a1%201%200%200%201-1-1v-3.586a1%201%200%200%201%20.293-.707l3.355-3.355a1.205%201.205%200%200%201%201.704%200l3.296%203.296a1.205%201.205%200%200%201%200%201.704l-3.355%203.355a1%201%200%200%201-.707.293z%22%20%2F%3E%20%3Cpath%20d%3D%22m9%2015%207.879-7.878%22%20%2F%3E%20%3C%2Fsvg%3E","hax:select-element":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12.034%2012.681a.498.498%200%200%201%20.647-.647l9%203.5a.5.5%200%200%201-.033.943l-3.444%201.068a1%201%200%200%200-.66.66l-1.067%203.443a.5.5%200%200%201-.943.033z%22%20%2F%3E%20%3Cpath%20d%3D%22M5%203a2%202%200%200%200-2%202%22%20%2F%3E%20%3Cpath%20d%3D%22M19%203a2%202%200%200%201%202%202%22%20%2F%3E%20%3Cpath%20d%3D%22M5%2021a2%202%200%200%201-2-2%22%20%2F%3E%20%3Cpath%20d%3D%22M9%203h1%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2021h2%22%20%2F%3E%20%3Cpath%20d%3D%22M14%203h1%22%20%2F%3E%20%3Cpath%20d%3D%22M3%209v1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%209v2%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2014v1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:qr-code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%225%22%20height%3D%225%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%225%22%20height%3D%225%22%20x%3D%2216%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%225%22%20height%3D%225%22%20x%3D%223%22%20y%3D%2216%22%20rx%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2016h-3a2%202%200%200%200-2%202v3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2021v.01%22%20%2F%3E%20%3Cpath%20d%3D%22M12%207v3a2%202%200%200%201-2%202H7%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2012h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M12%203h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2016v.01%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2012h1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012v.01%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2021v-1%22%20%2F%3E%20%3C%2Fsvg%3E","hax:outline-designer-outdent":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m7%208-4%204%204%204%22%20%2F%3E%20%3C%2Fsvg%3E","hax:outline-designer-indent":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m3%208%204%204-4%204%22%20%2F%3E%20%3C%2Fsvg%3E","hax:newspaper":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2018h-5%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2014h-8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2022h16a2%202%200%200%200%202-2V4a2%202%200%200%200-2-2H8a2%202%200%200%200-2%202v16a2%202%200%200%201-4%200v-9a2%202%200%200%201%202-2h2%22%20%2F%3E%20%3Crect%20width%3D%228%22%20height%3D%224%22%20x%3D%2210%22%20y%3D%226%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","hax:iframe":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20x%3D%222%22%20y%3D%224%22%20width%3D%2220%22%20height%3D%2216%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M10%204v4%22%20%2F%3E%20%3Cpath%20d%3D%22M2%208h20%22%20%2F%3E%20%3Cpath%20d%3D%22M6%204v4%22%20%2F%3E%20%3C%2Fsvg%3E","hax:hr":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3C%2Fsvg%3E","hax:file-link-outline":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2011V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.706.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202H6a2%202%200%200%201-2-2v-3a2%202%200%200%201%202-2h7%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22m10%2018%203-3-3-3%22%20%2F%3E%20%3C%2Fsvg%3E","hax:figure":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%229%22%20r%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22m21%2015-3.086-3.086a2%202%200%200%200-2.828%200L6%2021%22%20%2F%3E%20%3C%2Fsvg%3E","hax:email":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m22%207-8.991%205.727a2%202%200%200%201-2.009%200L2%207%22%20%2F%3E%20%3Crect%20x%3D%222%22%20y%3D%224%22%20width%3D%2220%22%20height%3D%2216%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","hax:discord":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2.992%2016.342a2%202%200%200%201%20.094%201.167l-1.065%203.29a1%201%200%200%200%201.236%201.168l3.413-.998a2%202%200%200%201%201.099.092%2010%2010%200%201%200-4.777-4.719%22%20%2F%3E%20%3C%2Fsvg%3E","hax:console-line":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m7%2011%202-2-2-2%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2013h4%22%20%2F%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","hax:code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2018%206-6-6-6%22%20%2F%3E%20%3Cpath%20d%3D%22m8%206-6%206%206%206%22%20%2F%3E%20%3C%2Fsvg%3E","hax:bulletin-board":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%228%22%20height%3D%224%22%20x%3D%228%22%20y%3D%222%22%20rx%3D%221%22%20ry%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M16%204h2a2%202%200%200%201%202%202v14a2%202%200%200%201-2%202H6a2%202%200%200%201-2-2V6a2%202%200%200%201%202-2h2%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2011h4%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2016h4%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2011h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2016h.01%22%20%2F%3E%20%3C%2Fsvg%3E","hax:arrow-expand-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%205v14%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H7%22%20%2F%3E%20%3Cpath%20d%3D%22m15%2018%206-6-6-6%22%20%2F%3E%20%3C%2Fsvg%3E","hax:arrow-all":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%202v20%22%20%2F%3E%20%3Cpath%20d%3D%22m15%2019-3%203-3-3%22%20%2F%3E%20%3Cpath%20d%3D%22m19%209%203%203-3%203%22%20%2F%3E%20%3Cpath%20d%3D%22M2%2012h20%22%20%2F%3E%20%3Cpath%20d%3D%22m5%209-3%203%203%203%22%20%2F%3E%20%3Cpath%20d%3D%22m9%205%203-3%203%203%22%20%2F%3E%20%3C%2Fsvg%3E","hax:add":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3Cpath%20d%3D%22M12%205v14%22%20%2F%3E%20%3C%2Fsvg%3E","icons:print":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2018H4a2%202%200%200%201-2-2v-5a2%202%200%200%201%202-2h16a2%202%200%200%201%202%202v5a2%202%200%200%201-2%202h-2%22%20%2F%3E%20%3Cpath%20d%3D%22M6%209V3a1%201%200%200%201%201-1h10a1%201%200%200%201%201%201v6%22%20%2F%3E%20%3Crect%20x%3D%226%22%20y%3D%2214%22%20width%3D%2212%22%20height%3D%228%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","icons:code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2018%206-6-6-6%22%20%2F%3E%20%3Cpath%20d%3D%22m8%206-6%206%206%206%22%20%2F%3E%20%3C%2Fsvg%3E","icons:check":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M20%206%209%2017l-5-5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:warning":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m21.73%2018-8-14a2%202%200%200%200-3.48%200l-8%2014A2%202%200%200%200%204%2021h16a2%202%200%200%200%201.73-3%22%20%2F%3E%20%3Cpath%20d%3D%22M12%209v4%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2017h.01%22%20%2F%3E%20%3C%2Fsvg%3E","icons:select-all":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%203a2%202%200%200%200-2%202%22%20%2F%3E%20%3Cpath%20d%3D%22M19%203a2%202%200%200%201%202%202%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019a2%202%200%200%201-2%202%22%20%2F%3E%20%3Cpath%20d%3D%22M5%2021a2%202%200%200%201-2-2%22%20%2F%3E%20%3Cpath%20d%3D%22M9%203h1%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2021h1%22%20%2F%3E%20%3Cpath%20d%3D%22M14%203h1%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2021h1%22%20%2F%3E%20%3Cpath%20d%3D%22M3%209v1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%209v1%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2014v1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2014v1%22%20%2F%3E%20%3C%2Fsvg%3E","icons:search":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m21%2021-4.34-4.34%22%20%2F%3E%20%3Ccircle%20cx%3D%2211%22%20cy%3D%2211%22%20r%3D%228%22%20%2F%3E%20%3C%2Fsvg%3E","icons:file-download":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2015V3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2015v4a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2v-4%22%20%2F%3E%20%3Cpath%20d%3D%22m7%2010%205%205%205-5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:history":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%2012a9%209%200%201%200%209-9%209.75%209.75%200%200%200-6.74%202.74L3%208%22%20%2F%3E%20%3Cpath%20d%3D%22M3%203v5h5%22%20%2F%3E%20%3Cpath%20d%3D%22M12%207v5l4%202%22%20%2F%3E%20%3C%2Fsvg%3E","icons:visibility":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2.062%2012.348a1%201%200%200%201%200-.696%2010.75%2010.75%200%200%201%2019.876%200%201%201%200%200%201%200%20.696%2010.75%2010.75%200%200%201-19.876%200%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","icons:visibility-off":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10.733%205.076a10.744%2010.744%200%200%201%2011.205%206.575%201%201%200%200%201%200%20.696%2010.747%2010.747%200%200%201-1.444%202.49%22%20%2F%3E%20%3Cpath%20d%3D%22M14.084%2014.158a3%203%200%200%201-4.242-4.242%22%20%2F%3E%20%3Cpath%20d%3D%22M17.479%2017.499a10.75%2010.75%200%200%201-15.417-5.151%201%201%200%200%201%200-.696%2010.75%2010.75%200%200%201%204.446-5.143%22%20%2F%3E%20%3Cpath%20d%3D%22m2%202%2020%2020%22%20%2F%3E%20%3C%2Fsvg%3E","icons:lock":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2211%22%20x%3D%223%22%20y%3D%2211%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2011V7a5%205%200%200%201%2010%200v4%22%20%2F%3E%20%3C%2Fsvg%3E","icons:lock-open":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2211%22%20x%3D%223%22%20y%3D%2211%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2011V7a5%205%200%200%201%209.9-1%22%20%2F%3E%20%3C%2Fsvg%3E","icons:folder":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M20%2020a2%202%200%200%200%202-2V8a2%202%200%200%200-2-2h-7.9a2%202%200%200%201-1.69-.9L9.6%203.9A2%202%200%200%200%207.93%203H4a2%202%200%200%200-2%202v13a2%202%200%200%200%202%202Z%22%20%2F%3E%20%3C%2Fsvg%3E","icons:error":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%228%22%20y2%3D%2212%22%20%2F%3E%20%3Cline%20x1%3D%2212%22%20x2%3D%2212.01%22%20y1%3D%2216%22%20y2%3D%2216%22%20%2F%3E%20%3C%2Fsvg%3E","icons:content-copy":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2214%22%20height%3D%2214%22%20x%3D%228%22%20y%3D%228%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2016c-1.1%200-2-.9-2-2V4c0-1.1.9-2%202-2h10c1.1%200%202%20.9%202%202%22%20%2F%3E%20%3C%2Fsvg%3E","icons:link":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2013a5%205%200%200%200%207.54.54l3-3a5%205%200%200%200-7.07-7.07l-1.72%201.71%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2011a5%205%200%200%200-7.54-.54l-3%203a5%205%200%200%200%207.07%207.07l1.71-1.71%22%20%2F%3E%20%3C%2Fsvg%3E","icons:create":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21.174%206.812a1%201%200%200%200-3.986-3.987L3.842%2016.174a2%202%200%200%200-.5.83l-1.321%204.352a.5.5%200%200%200%20.623.622l4.353-1.32a2%202%200%200%200%20.83-.497z%22%20%2F%3E%20%3Cpath%20d%3D%22m15%205%204%204%22%20%2F%3E%20%3C%2Fsvg%3E","icons:undo":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9%2014%204%209l5-5%22%20%2F%3E%20%3Cpath%20d%3D%22M4%209h10.5a5.5%205.5%200%200%201%205.5%205.5a5.5%205.5%200%200%201-5.5%205.5H11%22%20%2F%3E%20%3C%2Fsvg%3E","icons:redo":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m15%2014%205-5-5-5%22%20%2F%3E%20%3Cpath%20d%3D%22M20%209H9.5A5.5%205.5%200%200%200%204%2014.5A5.5%205.5%200%200%200%209.5%2020H13%22%20%2F%3E%20%3C%2Fsvg%3E","icons:save":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15.2%203a2%202%200%200%201%201.4.6l3.8%203.8a2%202%200%200%201%20.6%201.4V19a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2V5a2%202%200%200%201%202-2z%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2021v-7a1%201%200%200%200-1-1H8a1%201%200%200%200-1%201v7%22%20%2F%3E%20%3Cpath%20d%3D%22M7%203v4a1%201%200%200%200%201%201h7%22%20%2F%3E%20%3C%2Fsvg%3E","icons:refresh":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%2012a9%209%200%200%201%209-9%209.75%209.75%200%200%201%206.74%202.74L21%208%22%20%2F%3E%20%3Cpath%20d%3D%22M21%203v5h-5%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012a9%209%200%200%201-9%209%209.75%209.75%200%200%201-6.74-2.74L3%2016%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2016H3v5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:open-with":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%202v20%22%20%2F%3E%20%3Cpath%20d%3D%22m15%2019-3%203-3-3%22%20%2F%3E%20%3Cpath%20d%3D%22m19%209%203%203-3%203%22%20%2F%3E%20%3Cpath%20d%3D%22M2%2012h20%22%20%2F%3E%20%3Cpath%20d%3D%22m5%209-3%203%203%203%22%20%2F%3E%20%3Cpath%20d%3D%22m9%205%203-3%203%203%22%20%2F%3E%20%3C%2Fsvg%3E","icons:info":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2016v-4%22%20%2F%3E%20%3Cpath%20d%3D%22M12%208h.01%22%20%2F%3E%20%3C%2Fsvg%3E","icons:description":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2013H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2017H8%22%20%2F%3E%20%3C%2Fsvg%3E","icons:delete":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2011v6%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2011v6%22%20%2F%3E%20%3Cpath%20d%3D%22M19%206v14a2%202%200%200%201-2%202H7a2%202%200%200%201-2-2V6%22%20%2F%3E%20%3Cpath%20d%3D%22M3%206h18%22%20%2F%3E%20%3Cpath%20d%3D%22M8%206V4a2%202%200%200%201%202-2h4a2%202%200%200%201%202%202v2%22%20%2F%3E%20%3C%2Fsvg%3E","icons:view-module":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%2214%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%2214%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3Crect%20width%3D%227%22%20height%3D%227%22%20x%3D%223%22%20y%3D%2214%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","icons:toc":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M8%205h13%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2019h8%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2010a2%202%200%200%200%202%202h3%22%20%2F%3E%20%3Cpath%20d%3D%22M3%205v12a2%202%200%200%200%202%202h3%22%20%2F%3E%20%3C%2Fsvg%3E","icons:swap-vert":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m21%2016-4%204-4-4%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2020V4%22%20%2F%3E%20%3Cpath%20d%3D%22m3%208%204-4%204%204%22%20%2F%3E%20%3Cpath%20d%3D%22M7%204v16%22%20%2F%3E%20%3C%2Fsvg%3E","icons:swap-horiz":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M8%203%204%207l4%204%22%20%2F%3E%20%3Cpath%20d%3D%22M4%207h16%22%20%2F%3E%20%3Cpath%20d%3D%22m16%2021%204-4-4-4%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2017H4%22%20%2F%3E%20%3C%2Fsvg%3E","icons:style":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m14.622%2017.897-10.68-2.913%22%20%2F%3E%20%3Cpath%20d%3D%22M18.376%202.622a1%201%200%201%201%203.002%203.002L17.36%209.643a.5.5%200%200%200%200%20.707l.944.944a2.41%202.41%200%200%201%200%203.408l-.944.944a.5.5%200%200%201-.707%200L8.354%207.348a.5.5%200%200%201%200-.707l.944-.944a2.41%202.41%200%200%201%203.408%200l.944.944a.5.5%200%200%200%20.707%200z%22%20%2F%3E%20%3Cpath%20d%3D%22M9%208c-1.804%202.71-3.97%203.46-6.583%203.948a.507.507%200%200%200-.302.819l7.32%208.883a1%201%200%200%200%201.185.204C12.735%2020.405%2016%2016.792%2016%2015%22%20%2F%3E%20%3C%2Fsvg%3E","icons:restore":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%2012a9%209%200%201%200%209-9%209.75%209.75%200%200%200-6.74%202.74L3%208%22%20%2F%3E%20%3Cpath%20d%3D%22M3%203v5h5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:record-voice-over":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2019v3%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2010v2a7%207%200%200%201-14%200v-2%22%20%2F%3E%20%3Crect%20x%3D%229%22%20y%3D%222%22%20width%3D%226%22%20height%3D%2213%22%20rx%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","icons:perm-media":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m22%2011-1.296-1.296a2.4%202.4%200%200%200-3.408%200L11%2016%22%20%2F%3E%20%3Cpath%20d%3D%22M4%208a2%202%200%200%200-2%202v10a2%202%200%200%200%202%202h10a2%202%200%200%200%202-2%22%20%2F%3E%20%3Ccircle%20cx%3D%2213%22%20cy%3D%227%22%20r%3D%221%22%20fill%3D%22currentColor%22%20%2F%3E%20%3Crect%20x%3D%228%22%20y%3D%222%22%20width%3D%2214%22%20height%3D%2214%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","icons:open-in-new":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%203h6v6%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2014%2021%203%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2013v6a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2V8a2%202%200%200%201%202-2h6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:move-to-inbox":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpolyline%20points%3D%2222%2012%2016%2012%2014%2015%2010%2015%208%2012%202%2012%22%20%2F%3E%20%3Cpath%20d%3D%22M5.45%205.11%202%2012v6a2%202%200%200%200%202%202h16a2%202%200%200%200%202-2v-6l-3.45-6.89A2%202%200%200%200%2016.76%204H7.24a2%202%200%200%200-1.79%201.11z%22%20%2F%3E%20%3C%2Fsvg%3E","icons:menu":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%205h16%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2012h16%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2019h16%22%20%2F%3E%20%3C%2Fsvg%3E","icons:launch":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%203h6v6%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2014%2021%203%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2013v6a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2V8a2%202%200%200%201%202-2h6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:label":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12.586%202.586A2%202%200%200%200%2011.172%202H4a2%202%200%200%200-2%202v7.172a2%202%200%200%200%20.586%201.414l8.704%208.704a2.426%202.426%200%200%200%203.42%200l6.58-6.58a2.426%202.426%200%200%200%200-3.42z%22%20%2F%3E%20%3Ccircle%20cx%3D%227.5%22%20cy%3D%227.5%22%20r%3D%22.5%22%20fill%3D%22currentColor%22%20%2F%3E%20%3C%2Fsvg%3E","icons:fullscreen":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M8%203H5a2%202%200%200%200-2%202v3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%208V5a2%202%200%200%200-2-2h-3%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2016v3a2%202%200%200%200%202%202h3%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2021h3a2%202%200%200%200%202-2v-3%22%20%2F%3E%20%3C%2Fsvg%3E","icons:file-upload":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%203v12%22%20%2F%3E%20%3Cpath%20d%3D%22m17%208-5-5-5%205%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2015v4a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2v-4%22%20%2F%3E%20%3C%2Fsvg%3E","icons:compress":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m14%2010%207-7%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2010h-6V4%22%20%2F%3E%20%3Cpath%20d%3D%22m3%2021%207-7%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2014h6v6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:clear":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%206%206%2018%22%20%2F%3E%20%3Cpath%20d%3D%22m6%206%2012%2012%22%20%2F%3E%20%3C%2Fsvg%3E","icons:close":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%206%206%2018%22%20%2F%3E%20%3Cpath%20d%3D%22m6%206%2012%2012%22%20%2F%3E%20%3C%2Fsvg%3E","icons:cancel":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%206%206%2018%22%20%2F%3E%20%3Cpath%20d%3D%22m6%206%2012%2012%22%20%2F%3E%20%3C%2Fsvg%3E","icons:arrow-upward":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m5%2012%207-7%207%207%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2019V5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:arrow-downward":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%205v14%22%20%2F%3E%20%3Cpath%20d%3D%22m19%2012-7%207-7-7%22%20%2F%3E%20%3C%2Fsvg%3E","icons:arrow-back":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m12%2019-7-7%207-7%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2012H5%22%20%2F%3E%20%3C%2Fsvg%3E","icons:arrow-forward":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3Cpath%20d%3D%22m12%205%207%207-7%207%22%20%2F%3E%20%3C%2Fsvg%3E","icons:chevron-left":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m15%2018-6-6%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:chevron-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:expand-more":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m6%209%206%206%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:expand-less":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18%2015-6-6-6%206%22%20%2F%3E%20%3C%2Fsvg%3E","icons:arrow-drop-down":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m6%209%206%206%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","icons:more-vert":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%225%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2219%22%20r%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","icons:more-horiz":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2219%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%225%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","icons:settings":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9.671%204.136a2.34%202.34%200%200%201%204.659%200%202.34%202.34%200%200%200%203.319%201.915%202.34%202.34%200%200%201%202.33%204.033%202.34%202.34%200%200%200%200%203.831%202.34%202.34%200%200%201-2.33%204.033%202.34%202.34%200%200%200-3.319%201.915%202.34%202.34%200%200%201-4.659%200%202.34%202.34%200%200%200-3.32-1.915%202.34%202.34%200%200%201-2.33-4.033%202.34%202.34%200%200%200%200-3.831A2.34%202.34%200%200%201%206.35%206.051a2.34%202.34%200%200%200%203.319-1.915%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","icons:home":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2021v-8a1%201%200%200%200-1-1h-4a1%201%200%200%200-1%201v8%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2010a2%202%200%200%201%20.709-1.528l7-6a2%202%200%200%201%202.582%200l7%206A2%202%200%200%201%2021%2010v9a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2z%22%20%2F%3E%20%3C%2Fsvg%3E","icons:help":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cpath%20d%3D%22M9.09%209a3%203%200%200%201%205.83%201c0%202-3%203-3%203%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2017h.01%22%20%2F%3E%20%3C%2Fsvg%3E","icons:add":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3Cpath%20d%3D%22M12%205v14%22%20%2F%3E%20%3C%2Fsvg%3E","icons:add-box":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M12%208v8%22%20%2F%3E%20%3C%2Fsvg%3E","icons:remove":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3C%2Fsvg%3E","icons:find-replace":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M14%204a1%201%200%200%201%201-1%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2010a1%201%200%200%201-1-1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%204a1%201%200%200%200-1-1%22%20%2F%3E%20%3Cpath%20d%3D%22M21%209a1%201%200%200%201-1%201%22%20%2F%3E%20%3Cpath%20d%3D%22m3%207%203%203%203-3%22%20%2F%3E%20%3Cpath%20d%3D%22M6%2010V5a2%202%200%200%201%202-2h2%22%20%2F%3E%20%3Crect%20x%3D%223%22%20y%3D%2214%22%20width%3D%227%22%20height%3D%227%22%20rx%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","icons:archive":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2220%22%20height%3D%225%22%20x%3D%222%22%20y%3D%223%22%20rx%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M4%208v11a2%202%200%200%200%202%202h12a2%202%200%200%200%202-2V8%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2012h4%22%20%2F%3E%20%3C%2Fsvg%3E","icons:exit-to-app":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2017%205-5-5-5%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H9%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2021H5a2%202%200%200%201-2-2V5a2%202%200%200%201%202-2h4%22%20%2F%3E%20%3C%2Fsvg%3E","icons:account-circle":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2210%22%20r%3D%223%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2020.662V19a2%202%200%200%201%202-2h6a2%202%200%200%201%202%202v1.662%22%20%2F%3E%20%3C%2Fsvg%3E","icons:star":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11.525%202.295a.53.53%200%200%201%20.95%200l2.31%204.679a2.123%202.123%200%200%200%201.595%201.16l5.166.756a.53.53%200%200%201%20.294.904l-3.736%203.638a2.123%202.123%200%200%200-.611%201.878l.882%205.14a.53.53%200%200%201-.771.56l-4.618-2.428a2.122%202.122%200%200%200-1.973%200L6.396%2021.01a.53.53%200%200%201-.77-.56l.881-5.139a2.122%202.122%200%200%200-.611-1.879L2.16%209.795a.53.53%200%200%201%20.294-.906l5.165-.755a2.122%202.122%200%200%200%201.597-1.16z%22%20%2F%3E%20%3C%2Fsvg%3E","icons:bookmark":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M17%203a2%202%200%200%201%202%202v15a1%201%200%200%201-1.496.868l-4.512-2.578a2%202%200%200%200-1.984%200l-4.512%202.578A1%201%200%200%201%205%2020V5a2%202%200%200%201%202-2z%22%20%2F%3E%20%3C%2Fsvg%3E","icons:assignment-turned-in":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%228%22%20height%3D%224%22%20x%3D%228%22%20y%3D%222%22%20rx%3D%221%22%20ry%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M16%204h2a2%202%200%200%201%202%202v14a2%202%200%200%201-2%202H6a2%202%200%200%201-2-2V6a2%202%200%200%201%202-2h2%22%20%2F%3E%20%3Cpath%20d%3D%22m9%2014%202%202%204-4%22%20%2F%3E%20%3C%2Fsvg%3E","editor:insert-link":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2013a5%205%200%200%200%207.54.54l3-3a5%205%200%200%200-7.07-7.07l-1.72%201.71%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2011a5%205%200%200%200-7.54-.54l-3%203a5%205%200%200%200%207.07%207.07l1.71-1.71%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-align-left":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2012H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2019H3%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-align-center":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2012H7%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2019H5%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-align-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H9%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H7%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-align-justify":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%205h18%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2012h18%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2019h18%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-list-bulleted":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%205h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2012h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2019h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M8%205h13%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h13%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2019h13%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-list-numbered":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11%205h10%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2012h10%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2019h10%22%20%2F%3E%20%3Cpath%20d%3D%22M4%204h1v5%22%20%2F%3E%20%3Cpath%20d%3D%22M4%209h2%22%20%2F%3E%20%3Cpath%20d%3D%22M6.5%2020H3.4c0-1%202.6-1.925%202.6-3.5a1.5%201.5%200%200%200-2.6-1.02%22%20%2F%3E%20%3C%2Fsvg%3E","editor:insert-drive-file":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3C%2Fsvg%3E","editor:insert-photo":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%229%22%20r%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22m21%2015-3.086-3.086a2%202%200%200%200-2.828%200L6%2021%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-quote":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%203a2%202%200%200%200-2%202v6a2%202%200%200%200%202%202%201%201%200%200%201%201%201v1a2%202%200%200%201-2%202%201%201%200%200%200-1%201v2a1%201%200%200%200%201%201%206%206%200%200%200%206-6V5a2%202%200%200%200-2-2z%22%20%2F%3E%20%3Cpath%20d%3D%22M5%203a2%202%200%200%200-2%202v6a2%202%200%200%200%202%202%201%201%200%200%201%201%201v1a2%202%200%200%201-2%202%201%201%200%200%200-1%201v2a1%201%200%200%200%201%201%206%206%200%200%200%206-6V5a2%202%200%200%200-2-2z%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-italic":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cline%20x1%3D%2219%22%20x2%3D%2210%22%20y1%3D%224%22%20y2%3D%224%22%20%2F%3E%20%3Cline%20x1%3D%2214%22%20x2%3D%225%22%20y1%3D%2220%22%20y2%3D%2220%22%20%2F%3E%20%3Cline%20x1%3D%2215%22%20x2%3D%229%22%20y1%3D%224%22%20y2%3D%2220%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-bold":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2012h9a4%204%200%200%201%200%208H7a1%201%200%200%201-1-1V5a1%201%200%200%201%201-1h7a4%204%200%200%201%200%208%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-underlined":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%204v6a6%206%200%200%200%2012%200V4%22%20%2F%3E%20%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2220%22%20y2%3D%2220%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-strikethrough":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%204H9a3%203%200%200%200-2.83%204%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2012a4%204%200%200%201%200%208H6%22%20%2F%3E%20%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2212%22%20y2%3D%2212%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-clear":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%207V4h16v3%22%20%2F%3E%20%3Cpath%20d%3D%22M5%2020h6%22%20%2F%3E%20%3Cpath%20d%3D%22M13%204%208%2020%22%20%2F%3E%20%3Cpath%20d%3D%22m15%2015%205%205%22%20%2F%3E%20%3Cpath%20d%3D%22m20%2015-5%205%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-line-spacing":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%205h11%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2012h11%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2019h11%22%20%2F%3E%20%3Cpath%20d%3D%22m3%2010%203-3-3-3%22%20%2F%3E%20%3Cpath%20d%3D%22m3%2020%203-3-3-3%22%20%2F%3E%20%3C%2Fsvg%3E","editor:insert-emoticon":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2010V9%22%20%2F%3E%20%3Cpath%20d%3D%22M16.472%2015a6%206%200%2001-8.943%200%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2010V9%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3C%2Fsvg%3E","editor:highlight":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m9%2011-6%206v3h9l3-3%22%20%2F%3E%20%3Cpath%20d%3D%22m22%2012-4.6%204.6a2%202%200%200%201-2.8%200l-5.2-5.2a2%202%200%200%201%200-2.8L14%204%22%20%2F%3E%20%3C%2Fsvg%3E","editor:functions":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%207V5a1%201%200%200%200-1-1H6.5a.5.5%200%200%200-.4.8l4.5%206a2%202%200%200%201%200%202.4l-4.5%206a.5.5%200%200%200%20.4.8H17a1%201%200%200%200%201-1v-2%22%20%2F%3E%20%3C%2Fsvg%3E","editor:title":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2012h12%22%20%2F%3E%20%3Cpath%20d%3D%22M6%2020V4%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2020V4%22%20%2F%3E%20%3C%2Fsvg%3E","editor:short-text":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2012H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2019H3%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-textdirection-r-to-l":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%203v11%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209H7a1%201%200%200%201%200-6h8%22%20%2F%3E%20%3Cpath%20d%3D%22M14%203v11%22%20%2F%3E%20%3Cpath%20d%3D%22m18%2014%204%204H2%22%20%2F%3E%20%3Cpath%20d%3D%22m22%2018-4%204%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-size":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m15%2016%202.536-7.328a1.02%201.02%201%200%201%201.928%200L22%2016%22%20%2F%3E%20%3Cpath%20d%3D%22M15.697%2014h5.606%22%20%2F%3E%20%3Cpath%20d%3D%22m2%2016%204.039-9.69a.5.5%200%200%201%20.923%200L11%2016%22%20%2F%3E%20%3Cpath%20d%3D%22M3.304%2013h6.392%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-indent-increase":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m3%208%204%204-4%204%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-indent-decrease":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m7%208-4%204%204%204%22%20%2F%3E%20%3C%2Fsvg%3E","editor:format-color-text":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2020h16%22%20%2F%3E%20%3Cpath%20d%3D%22m6%2016%206-12%206%2012%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h8%22%20%2F%3E%20%3C%2Fsvg%3E","editor:border-all":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%203v18%22%20%2F%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M3%209h18%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2015h18%22%20%2F%3E%20%3C%2Fsvg%3E","editor:attach-file":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%206-8.414%208.586a2%202%200%200%200%202.829%202.829l8.414-8.586a4%204%200%201%200-5.657-5.657l-8.379%208.551a6%206%200%201%200%208.485%208.485l8.379-8.551%22%20%2F%3E%20%3C%2Fsvg%3E","editor:mode-edit":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21.174%206.812a1%201%200%200%200-3.986-3.987L3.842%2016.174a2%202%200%200%200-.5.83l-1.321%204.352a.5.5%200%200%200%20.623.622l4.353-1.32a2%202%200%200%200%20.83-.497z%22%20%2F%3E%20%3Cpath%20d%3D%22m15%205%204%204%22%20%2F%3E%20%3C%2Fsvg%3E","mdextra:unlink":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18.84%2012.25%201.72-1.71h-.02a5.004%205.004%200%200%200-.12-7.07%205.006%205.006%200%200%200-6.95%200l-1.72%201.71%22%20%2F%3E%20%3Cpath%20d%3D%22m5.17%2011.75-1.71%201.71a5.004%205.004%200%200%200%20.12%207.07%205.006%205.006%200%200%200%206.95%200l1.71-1.71%22%20%2F%3E%20%3Cline%20x1%3D%228%22%20x2%3D%228%22%20y1%3D%222%22%20y2%3D%225%22%20%2F%3E%20%3Cline%20x1%3D%222%22%20x2%3D%225%22%20y1%3D%228%22%20y2%3D%228%22%20%2F%3E%20%3Cline%20x1%3D%2216%22%20x2%3D%2216%22%20y1%3D%2219%22%20y2%3D%2222%22%20%2F%3E%20%3Cline%20x1%3D%2219%22%20x2%3D%2222%22%20y1%3D%2216%22%20y2%3D%2216%22%20%2F%3E%20%3C%2Fsvg%3E","mdextra:superscript":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m4%2019%208-8%22%20%2F%3E%20%3Cpath%20d%3D%22m12%2019-8-8%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2012h-4c0-1.5.442-2%201.5-2.5S20%208.334%2020%207.002c0-.472-.17-.93-.484-1.29a2.105%202.105%200%200%200-2.617-.436c-.42.239-.738.614-.899%201.06%22%20%2F%3E%20%3C%2Fsvg%3E","mdextra:subscript":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m4%205%208%208%22%20%2F%3E%20%3Cpath%20d%3D%22m12%205-8%208%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2019h-4c0-1.5.44-2%201.5-2.5S20%2015.33%2020%2014c0-.47-.17-.93-.48-1.29a2.11%202.11%200%200%200-2.62-.44c-.42.24-.74.62-.9%201.07%22%20%2F%3E%20%3C%2Fsvg%3E","image:tune":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2019H3%22%20%2F%3E%20%3Cpath%20d%3D%22M14%203v4%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2017v4%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012h-9%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019h-5%22%20%2F%3E%20%3Cpath%20d%3D%22M21%205h-7%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2010v4%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012H3%22%20%2F%3E%20%3C%2Fsvg%3E","image:image":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%229%22%20r%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22m21%2015-3.086-3.086a2%202%200%200%200-2.828%200L6%2021%22%20%2F%3E%20%3C%2Fsvg%3E","image:style":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m14.622%2017.897-10.68-2.913%22%20%2F%3E%20%3Cpath%20d%3D%22M18.376%202.622a1%201%200%201%201%203.002%203.002L17.36%209.643a.5.5%200%200%200%200%20.707l.944.944a2.41%202.41%200%200%201%200%203.408l-.944.944a.5.5%200%200%201-.707%200L8.354%207.348a.5.5%200%200%201%200-.707l.944-.944a2.41%202.41%200%200%201%203.408%200l.944.944a.5.5%200%200%200%20.707%200z%22%20%2F%3E%20%3Cpath%20d%3D%22M9%208c-1.804%202.71-3.97%203.46-6.583%203.948a.507.507%200%200%200-.302.819l7.32%208.883a1%201%200%200%200%201.185.204C12.735%2020.405%2016%2016.792%2016%2015%22%20%2F%3E%20%3C%2Fsvg%3E","image:crop-landscape":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2220%22%20height%3D%2212%22%20x%3D%222%22%20y%3D%226%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","image:transform":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%202v14a2%202%200%200%200%202%202h14%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2022V8a2%202%200%200%200-2-2H2%22%20%2F%3E%20%3C%2Fsvg%3E","image:slideshow":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2%203h20%22%20%2F%3E%20%3Cpath%20d%3D%22M21%203v11a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2V3%22%20%2F%3E%20%3Cpath%20d%3D%22m7%2021%205-5%205%205%22%20%2F%3E%20%3C%2Fsvg%3E","image:rotate-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%2012a9%209%200%201%201-9-9c2.52%200%204.93%201%206.74%202.74L21%208%22%20%2F%3E%20%3Cpath%20d%3D%22M21%203v5h-5%22%20%2F%3E%20%3C%2Fsvg%3E","image:photo-library":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m22%2011-1.296-1.296a2.4%202.4%200%200%200-3.408%200L11%2016%22%20%2F%3E%20%3Cpath%20d%3D%22M4%208a2%202%200%200%200-2%202v10a2%202%200%200%200%202%202h10a2%202%200%200%200%202-2%22%20%2F%3E%20%3Ccircle%20cx%3D%2213%22%20cy%3D%227%22%20r%3D%221%22%20fill%3D%22currentColor%22%20%2F%3E%20%3Crect%20x%3D%228%22%20y%3D%222%22%20width%3D%2214%22%20height%3D%2214%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","image:music-note":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9%2018V5l12-2v13%22%20%2F%3E%20%3Ccircle%20cx%3D%226%22%20cy%3D%2218%22%20r%3D%223%22%20%2F%3E%20%3Ccircle%20cx%3D%2218%22%20cy%3D%2216%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","image:grid-on":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M3%209h18%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2015h18%22%20%2F%3E%20%3Cpath%20d%3D%22M9%203v18%22%20%2F%3E%20%3Cpath%20d%3D%22M15%203v18%22%20%2F%3E%20%3C%2Fsvg%3E","image:collections":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2%207v10%22%20%2F%3E%20%3Cpath%20d%3D%22M6%205v14%22%20%2F%3E%20%3Crect%20width%3D%2212%22%20height%3D%2218%22%20x%3D%2210%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","image:blur-on":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11.017%202.814a1%201%200%200%201%201.966%200l1.051%205.558a2%202%200%200%200%201.594%201.594l5.558%201.051a1%201%200%200%201%200%201.966l-5.558%201.051a2%202%200%200%200-1.594%201.594l-1.051%205.558a1%201%200%200%201-1.966%200l-1.051-5.558a2%202%200%200%200-1.594-1.594l-5.558-1.051a1%201%200%200%201%200-1.966l5.558-1.051a2%202%200%200%200%201.594-1.594z%22%20%2F%3E%20%3Cpath%20d%3D%22M20%202v4%22%20%2F%3E%20%3Cpath%20d%3D%22M22%204h-4%22%20%2F%3E%20%3Ccircle%20cx%3D%224%22%20cy%3D%2220%22%20r%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","av:play-circle-filled":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9%209.003a1%201%200%200%201%201.517-.859l4.997%202.997a1%201%200%200%201%200%201.718l-4.997%202.997A1%201%200%200%201%209%2014.996z%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3C%2Fsvg%3E","av:volume-up":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11%204.702a.705.705%200%200%200-1.203-.498L6.413%207.587A1.4%201.4%200%200%201%205.416%208H3a1%201%200%200%200-1%201v6a1%201%200%200%200%201%201h2.416a1.4%201.4%200%200%201%20.997.413l3.383%203.384A.705.705%200%200%200%2011%2019.298z%22%20%2F%3E%20%3Cpath%20d%3D%22M16%209a5%205%200%200%201%200%206%22%20%2F%3E%20%3Cpath%20d%3D%22M19.364%2018.364a9%209%200%200%200%200-12.728%22%20%2F%3E%20%3C%2Fsvg%3E","av:volume-off":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11%204.702a.7.7%200%200%200-1.203-.498L6.413%207.587A1.4%201.4%200%200%201%205.416%208H3a1%201%200%200%200-1%201v6a1%201%200%200%200%201%201h2.416a1.4%201.4%200%200%201%20.997.413l3.383%203.384A.7.7%200%200%200%2011%2019.298z%22%20%2F%3E%20%3Cpath%20d%3D%22m16.5%2014.5%205-5%22%20%2F%3E%20%3Cpath%20d%3D%22m16.5%209.5%205%205%22%20%2F%3E%20%3C%2Fsvg%3E","av:music-note":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M9%2018V5l12-2v13%22%20%2F%3E%20%3Ccircle%20cx%3D%226%22%20cy%3D%2218%22%20r%3D%223%22%20%2F%3E%20%3Ccircle%20cx%3D%2218%22%20cy%3D%2216%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","av:videocam":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2013%205.223%203.482a.5.5%200%200%200%20.777-.416V7.87a.5.5%200%200%200-.752-.432L16%2010.5%22%20%2F%3E%20%3Crect%20x%3D%222%22%20y%3D%226%22%20width%3D%2214%22%20height%3D%2212%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","av:call-to-action":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2015h18%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:keyboard-return":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M20%204v7a4%204%200%200%201-4%204H4%22%20%2F%3E%20%3Cpath%20d%3D%22m9%2010-5%205%205%205%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:keyboard":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%208h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2012h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M14%208h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2012h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M18%208h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M6%208h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2016h10%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h.01%22%20%2F%3E%20%3Crect%20width%3D%2220%22%20height%3D%2216%22%20x%3D%222%22%20y%3D%224%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:keyboard-arrow-up":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18%2015-6-6-6%206%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:keyboard-arrow-down":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m6%209%206%206%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:security":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M20%2013c0%205-3.5%207.5-7.66%208.95a1%201%200%200%201-.67-.01C7.5%2020.5%204%2018%204%2013V6a1%201%200%200%201%201-1c2%200%204.5-1.2%206.24-2.72a1.17%201.17%200%200%201%201.52%200C14.51%203.81%2017%205%2019%205a1%201%200%200%201%201%201z%22%20%2F%3E%20%3C%2Fsvg%3E","hardware:computer":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2220%22%20height%3D%2214%22%20x%3D%222%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cline%20x1%3D%228%22%20x2%3D%2216%22%20y1%3D%2221%22%20y2%3D%2221%22%20%2F%3E%20%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%2217%22%20y2%3D%2221%22%20%2F%3E%20%3C%2Fsvg%3E","device:brightness-medium":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%202v2%22%20%2F%3E%20%3Cpath%20d%3D%22M14.837%2016.385a6%206%200%201%201-7.223-7.222c.624-.147.97.66.715%201.248a4%204%200%200%200%205.26%205.259c.589-.255%201.396.09%201.248.715%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2012a4%204%200%200%200-4-4%22%20%2F%3E%20%3Cpath%20d%3D%22m19%205-1.256%201.256%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2012h2%22%20%2F%3E%20%3C%2Fsvg%3E","device:access-time":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cpath%20d%3D%22M12%206v6l4%202%22%20%2F%3E%20%3C%2Fsvg%3E","social:public":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Cpath%20d%3D%22M12%202a14.5%2014.5%200%200%200%200%2020%2014.5%2014.5%200%200%200%200-20%22%20%2F%3E%20%3Cpath%20d%3D%22M2%2012h20%22%20%2F%3E%20%3C%2Fsvg%3E","social:person":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M19%2021v-2a4%204%200%200%200-4-4H9a4%204%200%200%200-4%204v2%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%227%22%20r%3D%224%22%20%2F%3E%20%3C%2Fsvg%3E","social:people":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%2021v-2a4%204%200%200%200-4-4H6a4%204%200%200%200-4%204v2%22%20%2F%3E%20%3Cpath%20d%3D%22M16%203.128a4%204%200%200%201%200%207.744%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2021v-2a4%204%200%200%200-3-3.87%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%227%22%20r%3D%224%22%20%2F%3E%20%3C%2Fsvg%3E","social:mood":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2010V9%22%20%2F%3E%20%3Cpath%20d%3D%22M16.472%2015a6%206%200%2001-8.943%200%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2010V9%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3C%2Fsvg%3E","places:all-inclusive":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2016c5%200%207-8%2012-8a4%204%200%200%201%200%208c-5%200-7-8-12-8a4%204%200%201%200%200%208%22%20%2F%3E%20%3C%2Fsvg%3E","maps:local-mall":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%2010a4%204%200%200%201-8%200%22%20%2F%3E%20%3Cpath%20d%3D%22M3.103%206.034h17.794%22%20%2F%3E%20%3Cpath%20d%3D%22M3.4%205.467a2%202%200%200%200-.4%201.2V20a2%202%200%200%200%202%202h14a2%202%200%200%200%202-2V6.667a2%202%200%200%200-.4-1.2l-2-2.667A2%202%200%200%200%2017%202H7a2%202%200%200%200-1.6.8z%22%20%2F%3E%20%3C%2Fsvg%3E","mdi-social:github-circle":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%206a9%209%200%200%200-9%209V3%22%20%2F%3E%20%3Ccircle%20cx%3D%2218%22%20cy%3D%226%22%20r%3D%223%22%20%2F%3E%20%3Ccircle%20cx%3D%226%22%20cy%3D%2218%22%20r%3D%223%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:palette":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2022a1%201%200%200%201%200-20%2010%209%200%200%201%2010%209%205%205%200%200%201-5%205h-2.25a1.75%201.75%200%200%200-1.4%202.8l.3.4a1.75%201.75%200%200%201-1.4%202.8z%22%20%2F%3E%20%3Ccircle%20cx%3D%2213.5%22%20cy%3D%226.5%22%20r%3D%22.5%22%20fill%3D%22currentColor%22%20%2F%3E%20%3Ccircle%20cx%3D%2217.5%22%20cy%3D%2210.5%22%20r%3D%22.5%22%20fill%3D%22currentColor%22%20%2F%3E%20%3Ccircle%20cx%3D%226.5%22%20cy%3D%2212.5%22%20r%3D%22.5%22%20fill%3D%22currentColor%22%20%2F%3E%20%3Ccircle%20cx%3D%228.5%22%20cy%3D%227.5%22%20r%3D%22.5%22%20fill%3D%22currentColor%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:pdf":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2013H8%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2017H8%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:write":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M13%2021h8%22%20%2F%3E%20%3Cpath%20d%3D%22M21.174%206.812a1%201%200%200%200-3.986-3.987L3.842%2016.174a2%202%200%200%200-.5.83l-1.321%204.352a.5.5%200%200%200%20.623.622l4.353-1.32a2%202%200%200%200%20.83-.497z%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:teacher":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21.42%2010.922a1%201%200%200%200-.019-1.838L12.83%205.18a2%202%200%200%200-1.66%200L2.6%209.08a1%201%200%200%200%200%201.832l8.57%203.908a2%202%200%200%200%201.66%200z%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2010v6%22%20%2F%3E%20%3Cpath%20d%3D%22M6%2012.5V16a6%203%200%200%200%2012%200v-3.5%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:quiz":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M13%205h8%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M13%2019h8%22%20%2F%3E%20%3Cpath%20d%3D%22m3%2017%202%202%204-4%22%20%2F%3E%20%3Cpath%20d%3D%22m3%207%202%202%204-4%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:people":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%2021v-2a4%204%200%200%200-4-4H6a4%204%200%200%200-4%204v2%22%20%2F%3E%20%3Cpath%20d%3D%22M16%203.128a4%204%200%200%201%200%207.744%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2021v-2a4%204%200%200%200-3-3.87%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%227%22%20r%3D%224%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:page":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2022a2%202%200%200%201-2-2V4a2%202%200%200%201%202-2h8a2.4%202.4%200%200%201%201.704.706l3.588%203.588A2.4%202.4%200%200%201%2020%208v12a2%202%200%200%201-2%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M14%202v5a1%201%200%200%200%201%201h5%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:book":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2019.5v-15A2.5%202.5%200%200%201%206.5%202H19a1%201%200%200%201%201%201v18a1%201%200%200%201-1%201H6.5a1%201%200%200%201%200-5H20%22%20%2F%3E%20%3C%2Fsvg%3E","lrn:assessment":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%228%22%20height%3D%224%22%20x%3D%228%22%20y%3D%222%22%20rx%3D%221%22%20ry%3D%221%22%20%2F%3E%20%3Cpath%20d%3D%22M16%204h2a2%202%200%200%201%202%202v14a2%202%200%200%201-2%202H6a2%202%200%200%201-2-2V6a2%202%200%200%201%202-2h2%22%20%2F%3E%20%3Cpath%20d%3D%22m9%2014%202%202%204-4%22%20%2F%3E%20%3C%2Fsvg%3E","courseicons:strategy":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2014c.2-1%20.7-1.7%201.5-2.5%201-.9%201.5-2.2%201.5-3.5A6%206%200%200%200%206%208c0%201%20.2%202.2%201.5%203.5.7.7%201.3%201.5%201.5%202.5%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2018h6%22%20%2F%3E%20%3Cpath%20d%3D%22M10%2022h4%22%20%2F%3E%20%3C%2Fsvg%3E","courseicons:listen":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%2014h3a2%202%200%200%201%202%202v3a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2v-7a9%209%200%200%201%2018%200v7a2%202%200%200%201-2%202h-1a2%202%200%200%201-2-2v-3a2%202%200%200%201%202-2h3%22%20%2F%3E%20%3C%2Fsvg%3E","courseicons:learning-objectives":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%226%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","courseicons:knowledge":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2018V5%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2013a4.17%204.17%200%200%201-3-4%204.17%204.17%200%200%201-3%204%22%20%2F%3E%20%3Cpath%20d%3D%22M17.598%206.5A3%203%200%201%200%2012%205a3%203%200%201%200-5.598%201.5%22%20%2F%3E%20%3Cpath%20d%3D%22M17.997%205.125a4%204%200%200%201%202.526%205.77%22%20%2F%3E%20%3Cpath%20d%3D%22M18%2018a4%204%200%200%200%202-7.464%22%20%2F%3E%20%3Cpath%20d%3D%22M19.967%2017.483A4%204%200%201%201%2012%2018a4%204%200%201%201-7.967-.517%22%20%2F%3E%20%3Cpath%20d%3D%22M6%2018a4%204%200%200%201-2-7.464%22%20%2F%3E%20%3Cpath%20d%3D%22M6.003%205.125a4%204%200%200%200-2.526%205.77%22%20%2F%3E%20%3C%2Fsvg%3E","courseicons:chem-connection":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M14%202v6a2%202%200%200%200%20.245.96l5.51%2010.08A2%202%200%200%201%2018%2022H6a2%202%200%200%201-1.755-2.96l5.51-10.08A2%202%200%200%200%2010%208V2%22%20%2F%3E%20%3Cpath%20d%3D%22M6.453%2015h11.094%22%20%2F%3E%20%3Cpath%20d%3D%22M8.5%202h7%22%20%2F%3E%20%3C%2Fsvg%3E","oer:box":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%208a2%202%200%200%200-1-1.73l-7-4a2%202%200%200%200-2%200l-7%204A2%202%200%200%200%203%208v8a2%202%200%200%200%201%201.73l7%204a2%202%200%200%200%202%200l7-4A2%202%200%200%200%2021%2016Z%22%20%2F%3E%20%3Cpath%20d%3D%22m3.3%207%208.7%205%208.7-5%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2022V12%22%20%2F%3E%20%3C%2Fsvg%3E","oer:pilcrow":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M13%204v16%22%20%2F%3E%20%3Cpath%20d%3D%22M17%204v16%22%20%2F%3E%20%3Cpath%20d%3D%22M19%204H9.5a4.5%204.5%200%200%200%200%209H13%22%20%2F%3E%20%3C%2Fsvg%3E","oer:type":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%204v16%22%20%2F%3E%20%3Cpath%20d%3D%22M4%207V5a1%201%200%200%201%201-1h14a1%201%200%200%201%201%201v2%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2020h6%22%20%2F%3E%20%3C%2Fsvg%3E","oer:plus":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%2012h14%22%20%2F%3E%20%3Cpath%20d%3D%22M12%205v14%22%20%2F%3E%20%3C%2Fsvg%3E","oer:arrow-up":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m5%2012%207-7%207%207%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2019V5%22%20%2F%3E%20%3C%2Fsvg%3E","oer:arrow-down":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%205v14%22%20%2F%3E%20%3Cpath%20d%3D%22m19%2012-7%207-7-7%22%20%2F%3E%20%3C%2Fsvg%3E","oer:arrow-up-to-line":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M5%203h14%22%20%2F%3E%20%3Cpath%20d%3D%22m18%2013-6-6-6%206%22%20%2F%3E%20%3Cpath%20d%3D%22M12%207v14%22%20%2F%3E%20%3C%2Fsvg%3E","oer:arrow-down-to-line":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2017V3%22%20%2F%3E%20%3Cpath%20d%3D%22m6%2011%206%206%206-6%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2021H5%22%20%2F%3E%20%3C%2Fsvg%3E","oer:copy":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2214%22%20height%3D%2214%22%20x%3D%228%22%20y%3D%228%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2016c-1.1%200-2-.9-2-2V4c0-1.1.9-2%202-2h10c1.1%200%202%20.9%202%202%22%20%2F%3E%20%3C%2Fsvg%3E","oer:columns-2":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M12%203v18%22%20%2F%3E%20%3C%2Fsvg%3E","oer:panel-right-close":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M15%203v18%22%20%2F%3E%20%3Cpath%20d%3D%22m8%209%203%203-3%203%22%20%2F%3E%20%3C%2Fsvg%3E","oer:code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m16%2018%206-6-6-6%22%20%2F%3E%20%3Cpath%20d%3D%22m8%206-6%206%206%206%22%20%2F%3E%20%3C%2Fsvg%3E","oer:lock":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2211%22%20x%3D%223%22%20y%3D%2211%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2011V7a5%205%200%200%201%2010%200v4%22%20%2F%3E%20%3C%2Fsvg%3E","oer:lock-open":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Crect%20width%3D%2218%22%20height%3D%2211%22%20x%3D%223%22%20y%3D%2211%22%20rx%3D%222%22%20ry%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M7%2011V7a5%205%200%200%201%209.9-1%22%20%2F%3E%20%3C%2Fsvg%3E","oer:trash-2":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2011v6%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2011v6%22%20%2F%3E%20%3Cpath%20d%3D%22M19%206v14a2%202%200%200%201-2%202H7a2%202%200%200%201-2-2V6%22%20%2F%3E%20%3Cpath%20d%3D%22M3%206h18%22%20%2F%3E%20%3Cpath%20d%3D%22M8%206V4a2%202%200%200%201%202-2h4a2%202%200%200%201%202%202v2%22%20%2F%3E%20%3C%2Fsvg%3E","oer:heading-2":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2018h-4c0-4%204-3%204-6%200-1.5-2-2.5-4-1%22%20%2F%3E%20%3C%2Fsvg%3E","oer:heading-3":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17.5%2010.5c1.7-1%203.5%200%203.5%201.5a2%202%200%200%201-2%202%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2017.5c2%201.5%204%20.3%204-1.5a2%202%200%200%200-2-2%22%20%2F%3E%20%3C%2Fsvg%3E","oer:heading-4":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2010v3a1%201%200%200%200%201%201h3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2010v8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3C%2Fsvg%3E","oer:heading-5":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2013v-3h4%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2017.7c.4.2.8.3%201.3.3%201.5%200%202.7-1.1%202.7-2.5S19.8%2013%2018.3%2013H17%22%20%2F%3E%20%3C%2Fsvg%3E","oer:heading-6":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2012h8%22%20%2F%3E%20%3Cpath%20d%3D%22M4%2018V6%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2018V6%22%20%2F%3E%20%3Ccircle%20cx%3D%2219%22%20cy%3D%2216%22%20r%3D%222%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2010c-2%202-3%203.5-3%206%22%20%2F%3E%20%3C%2Fsvg%3E","oer:quote":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%203a2%202%200%200%200-2%202v6a2%202%200%200%200%202%202%201%201%200%200%201%201%201v1a2%202%200%200%201-2%202%201%201%200%200%200-1%201v2a1%201%200%200%200%201%201%206%206%200%200%200%206-6V5a2%202%200%200%200-2-2z%22%20%2F%3E%20%3Cpath%20d%3D%22M5%203a2%202%200%200%200-2%202v6a2%202%200%200%200%202%202%201%201%200%200%201%201%201v1a2%202%200%200%201-2%202%201%201%200%200%200-1%201v2a1%201%200%200%200%201%201%206%206%200%200%200%206-6V5a2%202%200%200%200-2-2z%22%20%2F%3E%20%3C%2Fsvg%3E","oer:square-code":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m10%209-3%203%203%203%22%20%2F%3E%20%3Cpath%20d%3D%22m14%2015%203-3-3-3%22%20%2F%3E%20%3Crect%20x%3D%223%22%20y%3D%223%22%20width%3D%2218%22%20height%3D%2218%22%20rx%3D%222%22%20%2F%3E%20%3C%2Fsvg%3E","oer:list":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%205h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2012h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M3%2019h.01%22%20%2F%3E%20%3Cpath%20d%3D%22M8%205h13%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012h13%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2019h13%22%20%2F%3E%20%3C%2Fsvg%3E","oer:list-ordered":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M11%205h10%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2012h10%22%20%2F%3E%20%3Cpath%20d%3D%22M11%2019h10%22%20%2F%3E%20%3Cpath%20d%3D%22M4%204h1v5%22%20%2F%3E%20%3Cpath%20d%3D%22M4%209h2%22%20%2F%3E%20%3Cpath%20d%3D%22M6.5%2020H3.4c0-1%202.6-1.925%202.6-3.5a1.5%201.5%200%200%200-2.6-1.02%22%20%2F%3E%20%3C%2Fsvg%3E","oer:indent-increase":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m3%208%204%204-4%204%22%20%2F%3E%20%3C%2Fsvg%3E","oer:indent-decrease":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H11%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H11%22%20%2F%3E%20%3Cpath%20d%3D%22m7%208-4%204%204%204%22%20%2F%3E%20%3C%2Fsvg%3E","oer:align-left":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2012H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2019H3%22%20%2F%3E%20%3C%2Fsvg%3E","oer:align-center":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M17%2012H7%22%20%2F%3E%20%3Cpath%20d%3D%22M19%2019H5%22%20%2F%3E%20%3C%2Fsvg%3E","oer:align-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M21%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012H9%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019H7%22%20%2F%3E%20%3C%2Fsvg%3E","oer:bold":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%2012h9a4%204%200%200%201%200%208H7a1%201%200%200%201-1-1V5a1%201%200%200%201%201-1h7a4%204%200%200%201%200%208%22%20%2F%3E%20%3C%2Fsvg%3E","oer:italic":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cline%20x1%3D%2219%22%20x2%3D%2210%22%20y1%3D%224%22%20y2%3D%224%22%20%2F%3E%20%3Cline%20x1%3D%2214%22%20x2%3D%225%22%20y1%3D%2220%22%20y2%3D%2220%22%20%2F%3E%20%3Cline%20x1%3D%2215%22%20x2%3D%229%22%20y1%3D%224%22%20y2%3D%2220%22%20%2F%3E%20%3C%2Fsvg%3E","oer:underline":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M6%204v6a6%206%200%200%200%2012%200V4%22%20%2F%3E%20%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2220%22%20y2%3D%2220%22%20%2F%3E%20%3C%2Fsvg%3E","oer:strikethrough":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M16%204H9a3%203%200%200%200-2.83%204%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2012a4%204%200%200%201%200%208H6%22%20%2F%3E%20%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2212%22%20y2%3D%2212%22%20%2F%3E%20%3C%2Fsvg%3E","oer:highlighter":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m9%2011-6%206v3h9l3-3%22%20%2F%3E%20%3Cpath%20d%3D%22m22%2012-4.6%204.6a2%202%200%200%201-2.8%200l-5.2-5.2a2%202%200%200%201%200-2.8L14%204%22%20%2F%3E%20%3C%2Fsvg%3E","oer:subscript":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m4%205%208%208%22%20%2F%3E%20%3Cpath%20d%3D%22m12%205-8%208%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2019h-4c0-1.5.44-2%201.5-2.5S20%2015.33%2020%2014c0-.47-.17-.93-.48-1.29a2.11%202.11%200%200%200-2.62-.44c-.42.24-.74.62-.9%201.07%22%20%2F%3E%20%3C%2Fsvg%3E","oer:superscript":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m4%2019%208-8%22%20%2F%3E%20%3Cpath%20d%3D%22m12%2019-8-8%22%20%2F%3E%20%3Cpath%20d%3D%22M20%2012h-4c0-1.5.442-2%201.5-2.5S20%208.334%2020%207.002c0-.472-.17-.93-.484-1.29a2.105%202.105%200%200%200-2.617-.436c-.42.239-.738.614-.899%201.06%22%20%2F%3E%20%3C%2Fsvg%3E","oer:whole-word":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%227%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3Cpath%20d%3D%22M10%209v6%22%20%2F%3E%20%3Ccircle%20cx%3D%2217%22%20cy%3D%2212%22%20r%3D%223%22%20%2F%3E%20%3Cpath%20d%3D%22M14%207v8%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2017v1c0%20.5-.5%201-1%201H3c-.5%200-1-.5-1-1v-1%22%20%2F%3E%20%3C%2Fsvg%3E","oer:link":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%2013a5%205%200%200%200%207.54.54l3-3a5%205%200%200%200-7.07-7.07l-1.72%201.71%22%20%2F%3E%20%3Cpath%20d%3D%22M14%2011a5%205%200%200%200-7.54-.54l-3%203a5%205%200%200%200%207.07%207.07l1.71-1.71%22%20%2F%3E%20%3C%2Fsvg%3E","oer:unlink":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18.84%2012.25%201.72-1.71h-.02a5.004%205.004%200%200%200-.12-7.07%205.006%205.006%200%200%200-6.95%200l-1.72%201.71%22%20%2F%3E%20%3Cpath%20d%3D%22m5.17%2011.75-1.71%201.71a5.004%205.004%200%200%200%20.12%207.07%205.006%205.006%200%200%200%206.95%200l1.71-1.71%22%20%2F%3E%20%3Cline%20x1%3D%228%22%20x2%3D%228%22%20y1%3D%222%22%20y2%3D%225%22%20%2F%3E%20%3Cline%20x1%3D%222%22%20x2%3D%225%22%20y1%3D%228%22%20y2%3D%228%22%20%2F%3E%20%3Cline%20x1%3D%2216%22%20x2%3D%2216%22%20y1%3D%2219%22%20y2%3D%2222%22%20%2F%3E%20%3Cline%20x1%3D%2219%22%20x2%3D%2222%22%20y1%3D%2216%22%20y2%3D%2216%22%20%2F%3E%20%3C%2Fsvg%3E","oer:remove-formatting":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%207V4h16v3%22%20%2F%3E%20%3Cpath%20d%3D%22M5%2020h6%22%20%2F%3E%20%3Cpath%20d%3D%22M13%204%208%2020%22%20%2F%3E%20%3Cpath%20d%3D%22m15%2015%205%205%22%20%2F%3E%20%3Cpath%20d%3D%22m20%2015-5%205%22%20%2F%3E%20%3C%2Fsvg%3E","oer:omega":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M3%2020h4.5a.5.5%200%200%200%20.5-.5v-.282a.52.52%200%200%200-.247-.437%208%208%200%201%201%208.494-.001.52.52%200%200%200-.247.438v.282a.5.5%200%200%200%20.5.5H21%22%20%2F%3E%20%3C%2Fsvg%3E","oer:smile":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M15%2010V9%22%20%2F%3E%20%3Cpath%20d%3D%22M16.472%2015a6%206%200%2001-8.943%200%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2010V9%22%20%2F%3E%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20%2F%3E%20%3C%2Fsvg%3E","oer:sigma":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%207V5a1%201%200%200%200-1-1H6.5a.5.5%200%200%200-.4.8l4.5%206a2%202%200%200%201%200%202.4l-4.5%206a.5.5%200%200%200%20.4.8H17a1%201%200%200%200%201-1v-2%22%20%2F%3E%20%3C%2Fsvg%3E","oer:book-a":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M4%2019.5v-15A2.5%202.5%200%200%201%206.5%202H19a1%201%200%200%201%201%201v18a1%201%200%200%201-1%201H6.5a1%201%200%200%201%200-5H20%22%20%2F%3E%20%3Cpath%20d%3D%22m8%2013%204-7%204%207%22%20%2F%3E%20%3Cpath%20d%3D%22M9.1%2011h5.7%22%20%2F%3E%20%3C%2Fsvg%3E","oer:audio-lines":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M2%2010v3%22%20%2F%3E%20%3Cpath%20d%3D%22M6%206v11%22%20%2F%3E%20%3Cpath%20d%3D%22M10%203v18%22%20%2F%3E%20%3Cpath%20d%3D%22M14%208v7%22%20%2F%3E%20%3Cpath%20d%3D%22M18%205v13%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2010v3%22%20%2F%3E%20%3C%2Fsvg%3E","oer:message-square-quote":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M14%2014a2%202%200%200%200%202-2V8h-2%22%20%2F%3E%20%3Cpath%20d%3D%22M22%2017a2%202%200%200%201-2%202H6.828a2%202%200%200%200-1.414.586l-2.202%202.202A.71.71%200%200%201%202%2021.286V5a2%202%200%200%201%202-2h16a2%202%200%200%201%202%202z%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2014a2%202%200%200%200%202-2V8H8%22%20%2F%3E%20%3C%2Fsvg%3E","oer:chevron-right":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%20%2F%3E%20%3C%2Fsvg%3E","oer:check":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M20%206%209%2017l-5-5%22%20%2F%3E%20%3C%2Fsvg%3E","oer:smile-plus":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M13.267%202.08a10%2010%200%20108.653%208.653%22%20%2F%3E%20%3Cpath%20d%3D%22M15%2010V9%22%20%2F%3E%20%3Cpath%20d%3D%22M16%205h6%22%20%2F%3E%20%3Cpath%20d%3D%22M16.472%2015a6%206%200%2001-8.943%200%22%20%2F%3E%20%3Cpath%20d%3D%22M19%202v6%22%20%2F%3E%20%3Cpath%20d%3D%22M9%2010V9%22%20%2F%3E%20%3C%2Fsvg%3E","oer:grip-vertical":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%225%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%229%22%20cy%3D%2219%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2215%22%20cy%3D%2212%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2215%22%20cy%3D%225%22%20r%3D%221%22%20%2F%3E%20%3Ccircle%20cx%3D%2215%22%20cy%3D%2219%22%20r%3D%221%22%20%2F%3E%20%3C%2Fsvg%3E","oer:chevron-up":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m18%2015-6-6-6%206%22%20%2F%3E%20%3C%2Fsvg%3E","oer:chevron-down":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22m6%209%206%206%206-6%22%20%2F%3E%20%3C%2Fsvg%3E","oer:sliders-horizontal":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M10%205H3%22%20%2F%3E%20%3Cpath%20d%3D%22M12%2019H3%22%20%2F%3E%20%3Cpath%20d%3D%22M14%203v4%22%20%2F%3E%20%3Cpath%20d%3D%22M16%2017v4%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2012h-9%22%20%2F%3E%20%3Cpath%20d%3D%22M21%2019h-5%22%20%2F%3E%20%3Cpath%20d%3D%22M21%205h-7%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2010v4%22%20%2F%3E%20%3Cpath%20d%3D%22M8%2012H3%22%20%2F%3E%20%3C%2Fsvg%3E","oer:x":"data:image/svg+xml,%3Csvg%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20%3E%20%3Cpath%20d%3D%22M18%206%206%2018%22%20%2F%3E%20%3Cpath%20d%3D%22m6%206%2012%2012%22%20%2F%3E%20%3C%2Fsvg%3E"};function ct(){const a=ht;if(!a||a.__lucideInstalled)return;const t=a.getIcon.bind(a);a.getIcon=(e,r)=>{if(typeof e=="string"&&e){const o=e.includes(":")?e:`icons:${e}`;if(x[o])return x[o]}return t(e,r)},a.__lucideInstalled=!0,w2(globalThis.document)}function w2(a){for(const t of a.querySelectorAll("*")){if(typeof t.icon=="string"&&t.icon&&"src"in t){const e=t.icon;t.icon="",t.icon=e}t.shadowRoot&&w2(t.shadowRoot)}}function mt(){let a=D2,t=null;for(;a&&a!==HTMLElement;){if(Object.prototype.hasOwnProperty.call(a,"finalizeStyles"))return{ReactiveElement:a,LitElement:t};t=a,a=Object.getPrototypeOf(a)}throw new Error("Could not locate Lit base classes from HAXCMSLitElementTheme")}const{ReactiveElement:ut,LitElement:y}=mt(),gt=4e3;let vt=0,P=class extends y{static get tag(){return"oer-toast"}static get properties(){return{_items:{state:!0}}}constructor(){super(),this._items=[],this.__timers=new Map}show({text:t="",duration:e=gt,closeText:r="Close",slot:o=null,onClose:i=null}){const n=++vt;this._items=[...this._items,{id:n,text:t,closeText:r,slot:o,onClose:i}].slice(-4),e&&e>0&&this.__timers.set(n,setTimeout(()=>this.dismiss(n),Math.max(e,2e3)))}dismiss(t){const e=this._items.find(r=>r.id===t);clearTimeout(this.__timers.get(t)),this.__timers.delete(t),this._items=this._items.filter(r=>r.id!==t),e?.onClose?.()}clear(){for(const{id:t}of this._items)this.dismiss(t)}static get styles(){return u`
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
        ${this._items.map(t=>s`
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
    `}};customElements.define(P.tag,P);function f2(){let a=globalThis.document.querySelector(P.tag);return a||(a=globalThis.document.createElement(P.tag),globalThis.document.body.appendChild(a)),a}function Dt(){try{globalThis.localStorage.setItem("app-hax-soundStatus","false")}catch{}E.soundStatus=!1,E.playSound=()=>{},globalThis.addEventListener("haxcms-toast-show",a=>{a.stopImmediatePropagation();const t=a.detail||{};f2().show({text:t.text,duration:t.duration,closeText:t.closeText,slot:t.slot,onClose:typeof t.eventCallback=="function"?t.eventCallback:null})},{capture:!0}),globalThis.addEventListener("haxcms-toast-hide",a=>{a.stopImmediatePropagation(),f2().clear()},{capture:!0})}const q=new Map;function wt(a){if(a.styleSheet)return a.styleSheet;const t=new CSSStyleSheet;return t.replaceSync(String(a.cssText??a)),t}function b2(a,t){const e=a.adoptedStyleSheets,r=t.filter(o=>!e.includes(o));r.length&&(a.adoptedStyleSheets=[...e,...r])}function x2(a){for(const[t,e]of Object.entries(a)){const r=wt(e);for(const o of t.split(",").map(i=>i.trim()).filter(Boolean))q.has(o)||q.set(o,[]),q.get(o).push(r)}k2(globalThis.document)}function ft(){const a=ut.prototype;if(a.__oerShadowStyles)return;const t=a.createRenderRoot;a.createRenderRoot=function(){const e=t.call(this),r=q.get(this.localName);return r&&e&&e.adoptedStyleSheets&&b2(e,r),e},a.__oerShadowStyles=!0}function k2(a){for(const t of a.querySelectorAll("*"))if(t.shadowRoot){const e=q.get(t.localName);e&&b2(t.shadowRoot,e),k2(t.shadowRoot)}}const bt=u`
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
`,F2=["haxcms-appearance-admin-dialog","haxcms-content-admin-dialog","haxcms-files-admin-dialog","haxcms-outline-editor-dialog","haxcms-page-revisions-dialog","haxcms-seo-admin-dialog","haxcms-site-dashboard","haxcms-site-details-dialog","haxcms-site-import-export-dashboard","haxcms-site-settings-dashboard","haxcms-views-admin-dialog","hax-confirm-dialog","haxcms-about-dialog-ui","haxcms-allowed-blocks-ui","haxcms-editor-settings-dialog-ui","haxcms-site-platform-ui","haxcms-theme-preview-panel","haxcms-page-get-started"].join(","),xt=["haxcms-site-editor-ui","app-hax-top-bar","app-hax-user-menu","app-hax-user-menu-button","simple-toolbar-button","simple-toolbar-menu","simple-toolbar-menu-item","simple-modal","simple-modal-template","simple-popover","simple-tooltip","hax-tray","hax-tray-button","hax-gizmo-browser","hax-stax-browser","hax-map","hax-view-source","hax-gizmo-browser","hax-picker","hax-app-picker","hax-cancel-dialog","hax-plate-context","hax-toolbar","hax-toolbar-item","hax-toolbar-menu","hax-context-item","hax-context-item-menu","hax-text-editor-toolbar","hax-text-editor-button","rich-text-editor-toolbar","rich-text-editor-button","super-daemon","super-daemon-ui","super-daemon-row","super-daemon-search","simple-fields","simple-fields-field","simple-fields-tabs","simple-fields-fieldset","haxcms-outline-editor-dialog","outline-designer","haxcms-site-dashboard","haxcms-page-revisions-dialog","hax-body","simple-toast-el","rpg-character-toast","haxcms-toast","a11y-collapse","simple-fields-container","simple-fields-url-combo","simple-fields-tag-list","page-break","simple-context-menu","simple-tooltip","d-d-d-sample","hax-plate-context","simple-picker","hax-map","hax-view-source","hax-gizmo-browser","hax-stax-browser","simple-popover","simple-popover-manager","hax-element-demo","hax-tray-upload","hax-upload-field","simple-file-upload","simple-button-grid","simple-popover-selection","outline-designer"].join(",")+","+F2,y2=`
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
`,L=u`
  outline: 2px solid var(--ring);
  outline-offset: 2px;
`,kt={[xt]:bt,"simple-fields-container, simple-fields-field, simple-fields-url-combo, simple-fields-tag-list":u`
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
  `,"simple-fields-field, simple-fields-url-combo, simple-fields-tag-list":u`
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
  `,"simple-toolbar-button, hax-toolbar-item, rich-text-editor-button, hax-text-editor-button":u`
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
      ${L}
    }
  `,"simple-tag":u`
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
  `,"hax-tray":u`
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
  `,"a11y-collapse":u`
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
      ${L}
    }
    #content {
      font-size: 0.875rem;
    }
  `,"hax-gizmo-browser, hax-stax-browser":u`
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
  `,"hax-tray-button":u`
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
      ${L}
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
  `,"hax-upload-field":u`
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
  `,"hax-tray-upload":u`
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
  `,"simple-file-upload":u`
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
  `,"hax-plate-context":u`
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
  `,"rich-text-editor-toolbar, hax-text-editor-toolbar":u`
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
  `,"hax-context-item, hax-toolbar-menu, hax-toolbar-item, rich-text-editor-button, hax-text-editor-button, rich-text-editor-link, rich-text-editor-unlink, rich-text-editor-underline, rich-text-editor-symbol-picker, rich-text-editor-emoji-picker, rich-text-editor-icon-picker":u`
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
  `,"simple-picker":u`
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
  `,"hax-toolbar":u`
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
  `,"hax-text-editor-toolbar, rich-text-editor-toolbar":u`
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
  `,"hax-toolbar-menu, hax-context-item-menu, simple-toolbar-menu":u`
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
  `,"simple-toolbar-menu-item, hax-toolbar-menu-item":u`
    :host {
      font-family: var(--font-sans);
      font-size: 0.875rem;
    }
    ::slotted(*),
    button {
      border-radius: var(--radius-sm) !important;
      font-size: 0.875rem !important;
    }
  `,"page-break":u`
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
  `,"hax-map":u`
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
  `,"hax-view-source":u`
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
  `,"simple-popover-manager":u`
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
  `,"simple-popover":u`
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
  `,"hax-element-demo":u`
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
  `,"d-d-d-sample":u`
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
  `,"simple-tooltip":u`
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
  `,"hax-body":u`
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
  `,"grid-plate":u`
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
  `,"simple-modal":u`
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
  `,[F2]:u`
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
      ${i2(y2)}
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
      ${i2(y2)}
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
      ${L}
    }
  `,"rich-text-editor-prompt":u`
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
  `,"hax-confirm-dialog":u`
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
  `,"haxcms-site-settings-dashboard":u`
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
      ${L}
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
  `,"outline-designer":u`
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
  `,"super-daemon":u`
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
  `,"super-daemon-ui":u`
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
  `,"super-daemon-search":u`
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
  `,"super-daemon-row":u`
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
  `,"haxcms-site-editor-ui":u`
    :host {
      --top-bar-height: 0px !important;
      height: 0 !important;
      min-height: 0 !important;
      overflow: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
  `,"app-hax-top-bar":u`
    :host {
      --top-bar-height: 3.5rem !important;
    }
  `},Ft=["content-add","content-edit","content-map","view-source"];function a2(){return E.cmsSiteEditor?.haxCmsSiteEditorUIElement??null}function V(){return globalThis.HaxStore?.requestAvailability?.()??null}const yt=a=>({target:a,preventDefault(){},stopPropagation(){}});function N(a,t){const e=a2();if(!e)return;const r=t?e.shadowRoot?.querySelector(t):null;e[a]?.(yt(r))}const Ct=()=>N("_editButtonTap","#editbutton"),Et=()=>N("_editButtonTap","#editbutton"),_t=()=>N("_cancelButtonTap","#cancelbutton"),$t=()=>N("_manifestButtonTap","#manifestbtn"),Mt=()=>a2()?._logout?.(),At=()=>V()?.activeHaxBody?.undo?.(),Bt=()=>V()?.activeHaxBody?.redo?.();function jt(a){const t=V()?.activeHaxBody?.shadowRoot?.querySelector("hax-plate-context"),e=n=>{for(const d of n?.querySelectorAll("*")||[]){if(d.getAttribute("event-name")===a)return d;const l=d.shadowRoot&&e(d.shadowRoot);if(l)return l}return null},r=t&&(e(t)||e(t.shadowRoot));let o=null;const i=[r?.shadowRoot];for(;!o&&i.length;){const n=i.shift();if(n){o=n.querySelector("button");for(const d of n.querySelectorAll("*"))i.push(d.shadowRoot)}}o?.click()}function O(){const a=globalThis.document.querySelector("custom-oer-docs-theme")?.shadowRoot?.querySelector("main")?.getBoundingClientRect();return a?{top:a.top,bottom:a.bottom}:{top:0,bottom:globalThis.innerHeight}}function zt(a){const t=V()?.haxTray;!t||!Ft.includes(a)||(a==="view-source"&&t.shadowRoot?.querySelector("#view-source")?.openSource?.(),t.trayDetail=a,t.collapsed=!1)}function n2(a=""){const t=globalThis.SuperDaemonManager?.requestAvailability?.();t&&(t.runProgram(a,"*"),t.mini=!1,t.wand=!1,t.open())}const C2=/Mac|iPhone|iPad/.test(globalThis.navigator?.platform??""),_=C2?"\u2318":"Ctrl",St=C2?"\u2318\u21E7K":"Ctrl\u21E7K";let R=null;const E2=a=>a.shiftKey&&(a.altKey||a.metaKey||a.ctrlKey);async function Tt(){globalThis.addEventListener("keydown",i=>{if(R=i,E2(i)&&i.code==="KeyK"&&(i.preventDefault(),i.metaKey||i.ctrlKey)){i.stopImmediatePropagation();const n=globalThis.SuperDaemonManager?.instance;n?.opened?n.close():n2()}},{capture:!0}),await customElements.whenDefined("super-daemon");const a=customElements.get("super-daemon").prototype;if(a.__oerModal)return;const t=i=>{if(!i||i.__oerGated)return;let n=i.allowedCallback;const d=function(...l){return R&&E2(R)&&R.code!=="KeyK"&&R.key!=="Escape"?!1:typeof n=="function"?n.apply(this,l):!0};Object.defineProperty(i,"allowedCallback",{configurable:!0,get:()=>d,set:l=>{n=l}}),i.__oerGated=!0};t(globalThis.SuperDaemonManager?.instance);const e=a.waveWand;a.waveWand=function(...i){e.apply(this,i),this.mini=!1,this.wand=!1,this.activeNode=null};const r=a.updated;a.updated=function(i){r?.call(this,i),t(this),i.has("opened")&&this.opened&&this.mini&&(this.mini=!1,this.wand=!1)},a.__oerModal=!0;const o=globalThis.SuperDaemonManager?.instance;o?.mini&&(o.mini=!1,o.wand=!1)}function K(a,t){customElements.whenDefined(a).then(()=>t(customElements.get(a)))}const Ht={"editor:format-clear":"Clean","hax:format-textblock":"Prettify","icons:content-copy":"Copy"};function qt(){for(const a of["hax-text-editor-toolbar","rich-text-editor-toolbar","hax-toolbar"])K(a,t=>{const e=t.prototype;if(e.__oerExpanded)return;Object.defineProperty(e,"alwaysExpanded",{get:()=>!0,set:()=>{},configurable:!0});const r=e.updated;e.updated=function(o){r?.call(this,o),this.collapsed&&(this.collapsed=!1)},e.__oerExpanded=!0});K("simple-fields-field",a=>{const t=a.prototype,e=t.updated,r=o=>o.querySelector('d-d-d-sample[type="accent"], d-d-d-sample[type="primary"]')?.shadowRoot?.querySelector(".label")?.textContent?.trim();t.updated=function(o){e?.call(this,o),this.type==="radio"&&requestAnimationFrame(()=>{for(const i of this.shadowRoot?.querySelectorAll('[part="option"]')??[]){const n=r(i);n&&i.title!==n&&(i.title=n)}})}}),K("hax-gizmo-browser",a=>{const t=a.prototype,e=t.updated;t.updated=function(r){e?.call(this,r);const o=this.shadowRoot?.querySelector("#inputfilter");o&&!o.placeholder&&(o.placeholder="Search blocks\u2026")}}),_2("simple-popover-manager",a=>{const t=()=>a.toggleAttribute("data-oer-preview",!!a.querySelector("hax-element-demo"));new MutationObserver(t).observe(a,{childList:!0,subtree:!0}),t()}),K("hax-view-source",a=>{const t=a.prototype,e=t.updated;t.updated=function(r){e?.call(this,r),this.shadowRoot?.querySelector("hax-toolbar")?.setAttribute("data-oer-source","");for(const o of this.shadowRoot?.querySelectorAll("hax-tray-button")??[]){o.showTextLabel||(o.showTextLabel=!0),o.setAttribute("data-oer-labelled","");const i=Ht[o.icon];i&&o.label!==i&&(o.label=i)}}})}function _2(a,t){const e=globalThis.document,r=e.querySelector(a);if(r)return t(r);const o=new MutationObserver(()=>{const i=e.querySelector(a);i&&(o.disconnect(),t(i))});o.observe(e.body,{childList:!0})}function Lt(){_2("hax-tray",async a=>{if(await customElements.whenDefined("hax-tray"),await a.updateComplete,!a.shadowRoot||a.__oerEnhanced)return;a.__oerEnhanced=!0;let t=null;const e=()=>{const r=a.shadowRoot.querySelector('a11y-collapse[id="settings.configure"]');r&&r!==t&&(t=r,requestAnimationFrame(()=>{r.expanded||(r.expanded=!0)}))};new MutationObserver(e).observe(a.shadowRoot,{childList:!0,subtree:!0}),e()})}const U=20;function $2(a){const t=a.getBoundingClientRect(),e=t.top-4,r=t.bottom+4;return{top:e,bottom:r,left:t.left-4,right:t.right+4,height:r-e,compact:r-e<60,block:t}}const M2=a=>a.localName!=="page-break"&&a.getClientRects().length>0;function Rt(a){const t=new Set;for(const e of a.querySelectorAll("[slot]")){const r=e.parentElement;!r||r===a||t.has(r)||(a.__isLayout?a.__isLayout(r):r.localName==="grid-plate")&&t.add(r)}for(const e of a.querySelectorAll("grid-plate"))t.add(e);return[...t]}function It(a){const t=a.shadowRoot,e=[];if(!t)return e;const r=typeof a.layout=="string"?a.layout.split("-").length:1/0;for(const o of[...t.querySelectorAll("[id^='col']")].slice(0,r)){const i=o.querySelector("slot")?.getAttribute("name"),n=o.getBoundingClientRect();!i||n.width===0||getComputedStyle(o).display==="none"||e.push({name:i,rect:n})}return e}function s2(a,t){if(t-a>=16)return[a,t];const e=(a+t)/2;return[e-16/2,e+16/2]}function X(a){const t=[];if(!a)return t;const e=a.getBoundingClientRect(),r=[...a.children].filter(M2),o=r.map(i=>i.getBoundingClientRect());for(let i=0;i<=r.length;i++){const n=i===r.length,d=i===0?(o[0]?.top??e.top)-16:o[i-1].bottom,l=n?d+16:o[i].top,[h,p]=s2(d,l);t.push({container:a,slotName:null,before:r[i]||null,after:r[i-1]||null,nested:!1,end:n,top:h,height:p-h,left:e.left,width:e.width})}for(const i of Rt(a))for(const n of It(i)){const d=[...i.children].filter(h=>h.getAttribute("slot")===n.name&&M2(h)),l=d.map(h=>h.getBoundingClientRect());if(!d.length){const[h,p]=s2(n.rect.top,n.rect.bottom);t.push({container:i,slotName:n.name,before:null,after:null,nested:!0,top:h,height:p-h,left:n.rect.left,width:n.rect.width});continue}for(let h=0;h<=d.length;h++){const p=h===0?n.rect.top:l[h-1].bottom,c=h===d.length?Math.max(n.rect.bottom,p):l[h].top,[m,v]=s2(p,c);t.push({container:i,slotName:n.name,before:d[h]||null,after:d[h-1]||null,nested:!0,top:m,height:v-m,left:n.rect.left,width:n.rect.width})}}return t}function A2(a,t,e,{gutter:r=0}={}){let o=null;for(const i of a){const n=i.nested?i.left:i.left-r;t<n||t>i.left+i.width||e<i.top||e>i.top+i.height||(!o||i.width*i.height<o.width*o.height)&&(o=i)}return o}function Pt(a,t,e){const r=A2(a,t,e,{gutter:96});if(r)return r;let o=null,i=1/0;for(const n of a){const d=t<n.left?n.left-t:t>n.left+n.width?t-n.left-n.width:0,l=e<n.top?n.top-e:e>n.top+n.height?e-n.top-n.height:0,h=Math.hypot(d*2,l);h<i&&(i=h,o=n)}return o}const l2=(a,t)=>!!a&&!!t&&a.container===t.container&&a.slotName===t.slotName&&a.before===t.before&&a.after===t.after;function B2(a){const t=()=>{for(const e of a)e?.isConnected&&e.hasAttribute("slot")&&e.parentElement?.localName!=="grid-plate"&&e.removeAttribute("slot")};t(),setTimeout(t,150),setTimeout(t,600)}function j2(a,t){t.before?t.before.before(a):t.after?t.after.after(a):t.container.append(a),t.slotName?a.setAttribute("slot",t.slotName):B2([a])}async function z2(a,t,{tag:e,content:r="",properties:o={}}){const i=a.activeHaxBody,n=new Set(t.container.children),d=new Set(i.children);let l=t.after;!l&&!t.nested&&(l=[...i.children].find(p=>p.localName==="page-break")),l||(l=t.before||t.container),i.__addAbove=!1,i.haxInsert(e,r,o,l),await new Promise(p=>requestAnimationFrame(()=>requestAnimationFrame(p)));const h=[...t.container.children].find(p=>!n.has(p))||[...i.children].find(p=>!d.has(p));return h?(t.nested&&(!t.after||h.parentElement!==t.container)&&j2(h,t),h):null}const S2=a=>s`<span class="icon" aria-hidden="true" style="--src:url(&quot;${x[`oer:${a}`]||""}&quot;)"></span>`,Vt=["contenteditable","data-hax-active","data-hax-ray","draggable","id"];let G=class extends y{static get tag(){return"oer-settings-dialog"}static get properties(){return{mode:{type:String,reflect:!0},_title:{state:!0}}}constructor(){super(),this.mode=null,this._title="",this.__keys=t=>{this.mode&&t.key==="Escape"&&!t.defaultPrevented&&(t.preventDefault(),t.stopPropagation(),this.close())},this.__place=()=>{this.mode&&(this.__raf=requestAnimationFrame(this.__place),this._placeTray())}}get _hax(){return globalThis.HaxStore?.requestAvailability?.()}open(t="settings"){const e=this._hax,r=e?.activeNode;if(!(t==="settings"&&!r)){if(this.__returnFocus=globalThis.document.activeElement,this.__node=t==="settings"?r:null,t==="settings"){const o=e.haxSchemaFromTag?.(r.localName);this._title=`${o?.gizmo?.title||r.localName} settings`}else this._title="HTML source";this.mode=t,zt(t==="source"?"view-source":"content-edit"),e?.haxTray?.setAttribute("data-oer-dialog",t),globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>{this._refreshPreview(),this._watch(),this.__place(),this.shadowRoot.querySelector(".close")?.focus()})}}close(){if(!this.mode)return;this.mode=null,cancelAnimationFrame(this.__raf),this.__observer?.disconnect(),globalThis.removeEventListener("keydown",this.__keys,!0),this._hax?.haxTray?.removeAttribute("data-oer-dialog");const t=this.__node;this.__node=null,(t?.isConnected?t:this.__returnFocus)?.focus?.()}_placeTray(){const t=this._hax?.haxTray,e=this.shadowRoot.querySelector(".form");if(!t||!e)return;const r=e.getBoundingClientRect(),o=`${r.top}|${r.left}|${r.width}|${r.height}`;o!==this.__trayKey&&(this.__trayKey=o,t.style.setProperty("--oer-tray-top",`${r.top}px`),t.style.setProperty("--oer-tray-left",`${r.left}px`),t.style.setProperty("--oer-tray-width",`${r.width}px`),t.style.setProperty("--oer-tray-height",`${r.height}px`))}_watch(){this.__observer?.disconnect();const t=this.__node;t&&(this.__observer=new MutationObserver(()=>{cancelAnimationFrame(this.__previewRaf),this.__previewRaf=requestAnimationFrame(()=>this._refreshPreview())}),this.__observer.observe(t,{attributes:!0,childList:!0,subtree:!0,characterData:!0}))}_refreshPreview(){const t=this.querySelector("[slot='preview']"),e=this.__node;if(!t||!e?.isConnected)return;const r=e.cloneNode(!0);for(const i of[r,...r.querySelectorAll("*")])for(const n of Vt)i.removeAttribute(n);t.replaceChildren(r);const o=getComputedStyle(e);for(const i of["font-family","font-size","line-height","color"])t.style.setProperty(i,o.getPropertyValue(i))}static get styles(){return u`
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
          ${S2(this.mode==="source"?"code":"sliders-horizontal")}
          <h2 id="title">${this._title}</h2>
          <button class="close" aria-label="Close" title="Close (Esc)" @click="${this.close}">${S2("x")}</button>
        </header>
        <div class="body">
          <div class="preview" aria-label="Preview">
            <p class="preview-label">Preview</p>
            <div class="stage" inert><slot name="preview"></slot></div>
          </div>
          <div class="form"></div>
        </div>
      </div>
    `}};customElements.define(G.tag,G);function T2(){const a=globalThis.document;let t=a.querySelector(G.tag);if(!t){t=a.createElement(G.tag);const e=a.createElement("div");e.slot="preview",t.append(e),a.body.append(t)}return t}const H2=a=>a?.localName==="grid-plate";function q2(a,t,{self:e=!0}={}){let r=e?t:t?.parentElement;for(;r&&r!==a;){if(H2(r))return r;r=r.parentElement}return null}const L2=a=>typeof a?.layout=="string"?a.layout.split("-").length:1;function Nt(a){return[...a.shadowRoot?.querySelectorAll("[id^='col']")||[]].slice(0,L2(a)).map(t=>t.getBoundingClientRect()).filter(t=>t.width>0)}function Ot(a){const t=a?.layouts||globalThis.document.createElement("grid-plate").layouts||{};return Object.entries(t).map(([e,r])=>({key:e,label:(r.columnLayout||e).replace(/^\d+:\s*/,""),ratios:e.split("-").map(Number)}))}const Kt=()=>new Promise(a=>requestAnimationFrame(()=>requestAnimationFrame(a)));function Ut(a,t){const e=t.split("-").length,r=`col-${e}`;for(const o of[...a.children])Number((o.getAttribute("slot")||"col-1").replace("col-",""))>e&&o.setAttribute("slot",r);a.layout=t}async function Xt(a,t,e){const r=a.activeHaxBody,o=t.parentElement,i=new Set(o.children);r.__addAbove=!1,r.haxInsert("grid-plate","",{layout:e},t),await Kt();const n=[...o.children].find(d=>!i.has(d)&&d.localName==="grid-plate");return n?(n.append(t),t.setAttribute("slot","col-1"),n):null}function Gt(a){const t=H2(a.parentElement)?a.getAttribute("slot"):null,e=o=>Number((o.getAttribute("slot")||"col-1").replace("col-","")),r=[...a.children].sort((o,i)=>e(o)-e(i));for(const o of r)a.before(o),t?o.setAttribute("slot",t):o.removeAttribute("slot");return a.remove(),t||B2(r),r[0]||null}const A=a=>s`<span class="icon" aria-hidden="true" style="--src:url(&quot;${x[`oer:${a}`]||""}&quot;)"></span>`,Jt=4,J=48;let R2=class extends y{static get tag(){return"oer-block-frame"}static get properties(){return{_label:{state:!0},_drag:{state:!0},_layout:{state:!0},_guides:{state:!0},_menu:{state:!0}}}constructor(){super(),this._label="",this._drag=null,this._layout=null,this._guides=[],this._menu=!1,this.__outside=t=>{this._menu&&!t.composedPath().includes(this)&&(this._menu=!1)},this.__tick=this._tick.bind(this),this.__keys=t=>{if(this._menu&&t.key==="Escape"){t.preventDefault(),t.stopPropagation(),this._menu=!1;return}this._drag&&t.key==="Escape"&&(t.preventDefault(),t.stopPropagation(),this._endDrag(!1))}}connectedCallback(){super.connectedCallback(),this.hidden=!0,this.__raf=requestAnimationFrame(this.__tick),globalThis.addEventListener("keydown",this.__keys,!0),globalThis.addEventListener("pointerdown",this.__outside,!0)}disconnectedCallback(){globalThis.removeEventListener("pointerdown",this.__outside,!0),cancelAnimationFrame(this.__raf),globalThis.removeEventListener("keydown",this.__keys,!0),super.disconnectedCallback()}get _hax(){return globalThis.HaxStore?.requestAvailability?.()}_tick(){this.__raf=requestAnimationFrame(this.__tick);const t=this._hax,e=E.editMode?t?.activeNode:null;if(!e||!e.isConnected||e.localName==="page-break"){this.hidden=!0,this.__node=null,this._menu=!1;return}if(e!==this.__node){this.__node=e,this._menu=!1,this._layout=q2(t.activeHaxBody,e);const l=t.haxSchemaFromTag?.(e.localName);this._label=l?.gizmo?.title||e.localName}const r=$2(e),o=O();if((r.bottom<o.top||r.top>o.bottom||r.block.width===0)&&!this._drag){this.hidden=!0;return}this.hidden=!1;const i=this.style;i.setProperty("--top",`${Math.round(r.top)}px`),i.setProperty("--left",`${Math.round(r.left)}px`),i.setProperty("--width",`${Math.round(r.right-r.left)}px`),i.setProperty("--height",`${Math.round(r.height)}px`);const n=Math.max(r.top,o.top),d=Math.min(r.bottom,o.bottom);i.setProperty("--grip",`${Math.round((n+d)/2-r.top)}px`),this.toggleAttribute("compact",r.compact),this._updateGuides(),this._drag&&this._dragFrame()}_updateGuides(){const t=this._hax?.activeHaxBody,e=this._drag?[...t?.querySelectorAll("grid-plate")||[]]:this._layout?.isConnected?[this._layout]:[],r=n=>({top:Math.round(n.top),left:Math.round(n.left),width:Math.round(n.width),height:Math.round(n.height)}),o=e.filter(n=>n.getClientRects().length).map(n=>{const d=r(n.getBoundingClientRect()),l=Nt(n).map(r),h=[];for(let p=1;p<l.length;p++){const c=l[p-1],m=l[p];m.left>=c.left+c.width-1?h.push({left:Math.round((c.left+c.width+m.left)/2),top:d.top,width:0,height:d.height}):h.push({left:d.left,top:Math.round((c.top+c.height+m.top)/2),width:d.width,height:0})}return{...d,count:L2(n),cols:l,dividers:h}}),i=JSON.stringify(o);i!==this.__guideKey&&(this.__guideKey=i,this._guides=o)}_currentLayout(){const t=this._hax,e=t?.activeNode;return e?q2(t.activeHaxBody,e):null}_selectLayout(){const t=this._hax,e=this._currentLayout();t&&e&&(t.activeNode=e),this._menu=!1}async _chooseLayout(t){const e=this._hax,r=e?.activeNode;if(this._menu=!1,!e||!r)return;const o=this._currentLayout();o?Ut(o,t):await Xt(e,r,t)&&(this.__node=null,e.activeNode=r)}_removeLayout(){const t=this._hax,e=this._currentLayout();if(this._menu=!1,!t||!e)return;const r=t.activeNode===e?null:t.activeNode,o=Gt(e);this.__node=null,t.activeNode=r||o}_move(t){jt(t==="up"?"hax-plate-up":"hax-plate-down")}_gripKeys(t){(t.key==="ArrowUp"||t.key==="ArrowDown")&&(t.preventDefault(),this._move(t.key==="ArrowUp"?"up":"down"))}_pointerDown(t){if(t.button===0){t.preventDefault();try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}this.__press={x:t.clientX,y:t.clientY,id:t.pointerId}}}_pointerMove(t){if(!this.__press)return;const e=Math.hypot(t.clientX-this.__press.x,t.clientY-this.__press.y);!this._drag&&e<Jt||(this._drag||(globalThis.__oerDragging=!0),this._drag={...this._drag||{},x:t.clientX,y:t.clientY})}_pointerUp(t){if(this.__press){this.__press=null;try{t.currentTarget.releasePointerCapture(t.pointerId)}catch{}this._drag&&this._endDrag(!0)}}_dragFrame(){const t=this._drag,e=O(),r=globalThis.document.querySelector("custom-oer-docs-theme")?.shadowRoot?.querySelector("main");r&&(t.y<e.top+J?r.scrollTop-=Math.ceil((e.top+J-t.y)/4):t.y>e.bottom-J&&(r.scrollTop+=Math.ceil((t.y-e.bottom+J)/4)));const o=this.__node,i=X(this._hax?.activeHaxBody).filter(l=>!o.contains(l.container)),n=Pt(i,t.x,t.y),d=!!n&&n.before!==o&&n.after!==o;(!l2(n,t.slot)||d!==t.valid||!t.rect||t.rect.top!==Math.round(n?.top))&&(this._drag={...t,slot:n,valid:d,rect:n&&{top:Math.round(n.top),left:Math.round(n.left),width:Math.round(n.width),height:Math.round(n.height)}})}_endDrag(t){const e=this._drag;this._drag=null,globalThis.__oerDragging=!1;const r=this.__node;if(!t||!e?.slot||!e.valid||!r)return;j2(r,e.slot);const o=this._hax;o&&(o.activeNode=r),r.scrollIntoView?.({block:"nearest"})}static get styles(){return u`
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
        left: calc(var(--left) - ${U}px + 2px);
        width: ${U}px;
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
        width: ${U}px;
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
    `}updated(t){t.has("_drag")&&this.toggleAttribute("dragging",!!this._drag);const e=this.shadowRoot.querySelector(".menu");if(e){e.style.marginTop="0px";const r=e.getBoundingClientRect(),o=r.bottom-(globalThis.innerHeight-8);o>0&&(e.style.marginTop=`${-Math.min(o,r.top-8)}px`)}}_renderLabel(){const t=this._layout&&this._layout!==this.__node;return s`<div class="label" @mousedown="${e=>e.preventDefault()}">
      <button
        class="lay"
        title="Block settings"
        aria-label="Block settings"
        aria-haspopup="dialog"
        @click="${()=>{this._menu=!1,T2().open("settings")}}"
      >
        ${A("sliders-horizontal")}
      </button>
      <button
        class="lay"
        title="Layout"
        aria-label="Layout options"
        aria-haspopup="menu"
        aria-expanded="${this._menu?"true":"false"}"
        @click="${()=>this._menu=!this._menu}"
      >
        ${A("columns-2")}
      </button>
      ${t?s`<button class="crumb" title="Select the column layout" @click="${this._selectLayout}">Columns</button>
            <span class="sep" aria-hidden="true">${A("chevron-right")}</span>`:""}
      <span>${this._label}</span>
    </div>`}_renderMenu(){const t=this._layout,e=Ot(t).filter(r=>t||r.key!=="1");return s`<div class="menu" role="menu" aria-label="Layout" @mousedown="${r=>r.preventDefault()}">
      <div class="head">${t?"Column layout":"Put in columns"}</div>
      <div class="presets" role="group" aria-label="Column presets">
        ${e.map(r=>s`<button
            role="menuitemradio"
            aria-checked="${t?.layout===r.key?"true":"false"}"
            title="${r.label}"
            aria-label="${r.ratios.length} columns: ${r.label}"
            @click="${()=>this._chooseLayout(r.key)}"
          >
            ${r.ratios.map(o=>s`<span class="bar" style="flex:${o}"></span>`)}
          </button>`)}
      </div>
      ${t?s`<div class="sepline"></div>
            ${t!==this.__node?s`<button class="item" role="menuitem" @click="${this._selectLayout}">${A("box")} Select layout</button>`:""}
            <button class="item" role="menuitem" @click="${this._removeLayout}">${A("panel-right-close")} Remove layout, keep blocks</button>`:""}
    </div>`}render(){const t=this._drag;return s`
      ${this._guides.map(e=>s`${e.cols.map(r=>s`<div class="col" style="top:${r.top}px;left:${r.left}px;width:${r.width}px;height:${r.height}px"></div>`)}
          ${e.dividers.map(r=>s`<div
              class="divider ${r.width?"h":"v"}"
              style="top:${r.top}px;left:${r.left}px;width:${r.width}px;height:${r.height}px"
            ></div>`)}
          <div class="guide" style="top:${e.top-6}px;left:${e.left-6}px;width:${e.width+12}px;height:${e.height+12}px">
            <span class="tab">Columns · ${e.count}</span>
          </div>`)}
      <div class="ring"></div>
      ${this._renderLabel()}
      ${this._menu?this._renderMenu():""}
      <div class="handle" @mousedown="${e=>e.preventDefault()}">
        <button class="step" title="Move up" aria-label="Move block up" @click="${()=>this._move("up")}">${A("chevron-up")}</button>
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
          ${A("grip-vertical")}
        </button>
        <button class="step" title="Move down" aria-label="Move block down" @click="${()=>this._move("down")}">${A("chevron-down")}</button>
      </div>
      ${t?.valid&&t.rect?s`<div class="drop" style="top:${t.rect.top}px;left:${t.rect.left}px;width:${t.rect.width}px;height:${t.rect.height}px"></div>`:""}
      ${t?s`<div class="ghost" style="left:${t.x}px;top:${t.y}px">${this._label}</div>`:""}
    `}};customElements.define(R2.tag,R2);const $={sep:!0};function d2(a,t=[]){if(!a)return t;for(const e of a.querySelectorAll("*"))t.push(e),e.shadowRoot&&d2(e.shadowRoot,t);return t}function Yt(a){if(!a)return null;if(a.localName==="button")return a;const t=[a.shadowRoot];for(;t.length;){const e=t.shift();if(!e)continue;const r=e.querySelector("button");if(r)return r;for(const o of e.querySelectorAll("*"))t.push(o.shadowRoot)}return null}const I2=a=>a&&!a.hidden&&getComputedStyle(a).display!=="none",M=a=>t=>t.find(e=>e.getAttribute?.("event-name")===a),f=(a,t)=>e=>e.find(r=>r.command===a&&(!t||r.label===t)),Wt=[{label:"Move up",icon:"arrow-up",find:M("hax-plate-up")},{label:"Move down",icon:"arrow-down",find:M("hax-plate-down")},$,{label:"Insert block above\u2026",icon:"arrow-up-to-line",find:M("insert-above-active"),insert:"above"},{label:"Insert block below\u2026",icon:"arrow-down-to-line",find:M("insert-below-active"),insert:"below"},{label:"Duplicate",icon:"copy",find:M("hax-plate-duplicate")},$,{label:"Add column",icon:"columns-2",find:M("hax-plate-create-right")},{label:"Remove column",icon:"panel-right-close",find:M("hax-plate-remove-right")},$,{label:"Edit HTML",icon:"code",find:M("hax-source-view-toggle")},{label:a=>a.label||"Lock",icon:a=>a.icon==="icons:lock"?"lock":"lock-open",find:a=>a.find(t=>t.localName==="hax-context-item"&&/lock/.test(t.icon||""))},$,{label:"Remove block",icon:"trash-2",danger:!0,find:M("hax-plate-delete")}],Zt={p:"pilcrow",h2:"heading-2",h3:"heading-3",h4:"heading-4",h5:"heading-5",h6:"heading-6",blockquote:"quote",pre:"square-code"},Qt={pre:"Code block",blockquote:"Quote"},te=[{picker:"hax-text-editor-heading-picker",icons:Zt,labels:Qt,checked:"tag"},$,{label:"Bulleted list",icon:"list",find:f("ul")},{label:"Numbered list",icon:"list-ordered",find:f("ol")},{label:"Indent",icon:"indent-increase",find:f("indent"),shortcut:`${_}]`,needs:"In lists"},{label:"Outdent",icon:"indent-decrease",find:f("outdent"),shortcut:`${_}[`,needs:"In lists"},$,{picker:"hax-text-editor-alignment-picker",icons:{"":"align-left",center:"align-center",right:"align-right"},labels:{"":"Align left",center:"Align center",right:"Align right"},checked:"align"}],ee=[{label:"Bold",icon:"bold",find:f("bold"),shortcut:`${_}B`,toggle:!0},{label:"Italic",icon:"italic",find:f("italic"),shortcut:`${_}I`,toggle:!0},{label:"Underline",icon:"underline",find:f("underline"),shortcut:`${_}U`,toggle:!0,selection:!0},{label:"Strikethrough",icon:"strikethrough",find:f("strikeThrough"),toggle:!0,selection:!0},{label:"Highlight",icon:"highlighter",find:f("wrapRange","Highlight"),toggle:!0,selection:!0},{label:"Inline code",icon:"code",find:f("wrapRange","Code"),toggle:!0,selection:!0},{label:"Subscript",icon:"subscript",find:f("subscript"),toggle:!0},{label:"Superscript",icon:"superscript",find:f("superscript"),toggle:!0},{label:"Abbreviation",icon:"whole-word",find:f("wrapRange","Abbreviation"),selection:!0},$,{label:"Link",icon:"link",find:f("createLink"),shortcut:`${_}K`},{label:"Remove link",icon:"unlink",find:f("unlink")},$,{label:"Clear formatting",icon:"remove-formatting",find:f("removeFormat")}],re=[{label:"Symbol\u2026",icon:"omega",grid:"rich-text-editor-symbol-picker"},{label:"Emoji\u2026",icon:"smile",grid:"rich-text-editor-emoji-picker",filter:!0},$,{label:"Math",icon:"sigma",find:f("insertHTML","Math")},{label:"Vocabulary",icon:"book-a",find:f("insertHTML","Vocab"),selection:!0},{label:"Inline audio",icon:"audio-lines",find:f("insertHTML","Inline audio"),selection:!0},{label:"Sarcasm",icon:"message-square-quote",find:f("insertHTML","Sarcasm"),selection:!0}],oe=[{id:"block",label:"Block",icon:"box",source:"plate",items:Wt},{id:"text",label:"Text",icon:"pilcrow",source:"text",items:te},{id:"format",label:"Format",icon:"type",source:"text",items:ee},{id:"insert",label:"Insert inline",icon:"smile-plus",source:"text",items:re}],Y=a=>s`<span
    class="icon"
    aria-hidden="true"
    style="--src:url(&quot;${x[`oer:${a}`]||""}&quot;)"
  ></span>`,P2=globalThis.document.createElement("textarea"),ie=a=>(P2.innerHTML=a,P2.value);let V2=class extends y{static get tag(){return"oer-block-rail"}static get properties(){return{_cats:{state:!0},_open:{state:!0},_grid:{state:!0},_query:{state:!0}}}constructor(){super(),this._cats=[],this._open=null,this._grid=null,this._query="",this.__tick=this._tick.bind(this),this.__keys=this._globalKeys.bind(this),this.__outside=t=>{this._open&&!t.composedPath().includes(this)&&this._close()}}connectedCallback(){super.connectedCallback(),this.hidden=!0,this.__raf=requestAnimationFrame(this.__tick),globalThis.addEventListener("keydown",this.__keys,!0),globalThis.addEventListener("pointerdown",this.__outside,!0)}disconnectedCallback(){cancelAnimationFrame(this.__raf),globalThis.removeEventListener("keydown",this.__keys,!0),globalThis.removeEventListener("pointerdown",this.__outside,!0),super.disconnectedCallback()}get _hax(){return globalThis.HaxStore?.requestAvailability?.()}_stock(){const t=this._hax?.activeHaxBody?.shadowRoot,e=t?.querySelector("hax-plate-context"),r=t?.querySelector("hax-text-editor-toolbar");return{plate:e,text:I2(r)?r:null}}_tick(){this.__raf=requestAnimationFrame(this.__tick);const t=E.editMode?this._hax?.activeNode:null;if(!t||!t.isConnected||t.localName==="page-break"){this.hidden||this._hide();return}const e=t.getBoundingClientRect(),r=this._stock(),o=`${t.localName}|${!!r.plate}|${!!r.text}`;(t!==this.__node||o!==this.__key)&&(t!==this.__node&&this._close(),this.__node=t,this.__key=o,this._cats=oe.filter(C=>r[C.source]));const i=this.shadowRoot?.querySelector(".rail"),n=i?.offsetHeight||0,d=O(),l=d.top+8,h=$2(t);let p=h.top;if(p<l&&(p=Math.max(Math.min(l,h.bottom-n),h.top)),(h.bottom<l||h.top>d.bottom||e.width===0)&&!this._open){this.hidden=!0;return}this.hidden=!1;const c=this._hax?.activeHaxBody?.getBoundingClientRect().left??h.left,m=Math.min(h.left,c-4-6),v=Math.round(m-U-8-(i?.offsetWidth||42));this.style.transform=`translate(${v}px, ${Math.round(p)}px)`}_hide(){this._close(),this.hidden=!0,this.__node=null}_items(t){const e=this._stock()[t.source];if(!e)return[];const r=[e,...d2(e),...d2(e.shadowRoot)],o=[];for(const i of t.items){if(i.sep){o.length&&!o[o.length-1].sep&&o.push($);continue}if(i.picker){const h=r.find(c=>c.localName===i.picker);if(!h)continue;const p=this._pickerCurrent(i);for(const c of(h.options||[]).flat())!c||c.value===null||c.value===void 0||o.push({label:i.labels?.[c.value]||c.alt,icon:i.icons?.[c.value]||"pilcrow",checked:p===c.value,run:()=>h._pickerChange?.({detail:{value:c.value}})});continue}if(i.grid){const h=r.find(p=>p.localName===i.grid);if(!h)continue;o.push({label:i.label,icon:i.icon,submenu:!0,run:()=>this._openGrid(i,h)});continue}const n=i.find(r);if(!n)continue;const d=I2(n),l=i.needs||(i.selection?"Select text":"");!d&&!l||o.push({label:typeof i.label=="function"?i.label(n):i.label,icon:typeof i.icon=="function"?i.icon(n):i.icon,shortcut:i.shortcut,danger:i.danger,disabled:!d,hint:d?"":l,pressed:i.toggle&&d?!!n.toggled:void 0,run:i.insert?()=>globalThis.document.querySelector("oer-block-inserter")?.openFor(this._hax.activeNode,i.insert):()=>Yt(n)?.click()})}for(;o.length&&o[o.length-1].sep;)o.pop();return o}_pickerCurrent(t){const e=this._hax?.activeNode;if(e){if(t.checked==="tag")return e.localName;if(t.checked==="align"){const r=e.style?.textAlign||"";return r==="left"?"":r}}}_toggle(t,e){if(this._open?.id===t.id&&!this._grid){this._close();return}this._grid=null,this._query="",this._open={...t,items:this._items(t),y:e?.currentTarget?.offsetTop??0}}_close(t=!1){const e=this._open?.id;this._open=null,this._grid=null,this._query="",t&&e&&this.updateComplete.then(()=>this.shadowRoot.querySelector(`[data-cat="${e}"]`)?.focus())}_openGrid(t,e){const r=(e.shadowRoot?.querySelector("simple-symbol-picker, simple-emoji-picker, simple-picker")?.options||[]).flat().filter(o=>o&&o.value);this._grid={label:t.label.replace("\u2026",""),filter:t.filter,options:r,el:e},this.updateComplete.then(()=>{this.shadowRoot.querySelector(".grid input, .grid button")?.focus()})}_run(t){if(!(t.disabled||t.sep)){if(t.submenu){t.run();return}t.run(),this._close()}}_insertGlyph(t){this._grid.el._pickerChange?.({detail:{value:t.value}}),this._close()}_globalKeys(t){this.hidden||t.altKey&&t.key==="F10"&&(t.preventDefault(),t.stopPropagation(),this.shadowRoot.querySelector(".rail button")?.focus())}_railKeys(t){const e=[...this.shadowRoot.querySelectorAll(".rail button")],r=e.indexOf(this.shadowRoot.activeElement),o=i=>e[(r+i+e.length)%e.length]?.focus();if(t.key==="ArrowDown")o(1);else if(t.key==="ArrowUp")o(-1);else if(t.key==="Home")e[0]?.focus();else if(t.key==="End")e[e.length-1]?.focus();else if(t.key==="ArrowRight"){const i=this._cats[r];i&&this._open?.id!==i.id&&this._toggle(i,{currentTarget:e[r]}),this._focusMenu()}else if(t.key==="Escape")this._open?this._close():this._hax?.activeNode?.focus?.();else return;t.preventDefault()}_focusMenu(){this.updateComplete.then(()=>this.shadowRoot.querySelector(".menu [role^=menuitem]:not([aria-disabled=true])")?.focus())}_menuKeys(t){const e=[...this.shadowRoot.querySelectorAll(".menu [role^=menuitem]")],r=e.indexOf(this.shadowRoot.activeElement),o=i=>e[(r+i+e.length)%e.length]?.focus();if(t.key==="ArrowDown")o(1);else if(t.key==="ArrowUp")o(-1);else if(t.key==="Home")e[0]?.focus();else if(t.key==="End")e[e.length-1]?.focus();else if(t.key==="Escape"||t.key==="ArrowLeft")this._close(!0);else if(t.key==="Tab")this._close();else return;t.preventDefault()}_gridKeys(t){const e=[...this.shadowRoot.querySelectorAll(".cells button")],r=e.indexOf(this.shadowRoot.activeElement),o=8,i=n=>{t.preventDefault(),e[Math.max(0,Math.min(e.length-1,n))]?.focus()};t.key==="Escape"?(t.preventDefault(),this._grid=null,this._focusMenu()):r<0?t.key==="ArrowDown"&&i(0):t.key==="ArrowRight"?i(r+1):t.key==="ArrowLeft"?i(r-1):t.key==="ArrowDown"?i(r+o):t.key==="ArrowUp"&&(r<o?(t.preventDefault(),this.shadowRoot.querySelector(".grid input")?.focus()):i(r-o))}_keepSelection(t){t.target.closest?.("input")||t.preventDefault()}updated(){const t=this.shadowRoot.querySelector(".menu");if(!t)return;const e=t.getBoundingClientRect().bottom-(globalThis.innerHeight-8);e>0&&(t.style.top=`${Math.max(t.offsetTop-e,8-this.getBoundingClientRect().top)}px`)}static get styles(){return u`
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
    `}_renderItem(t){if(t.sep)return s`<div class="sep" role="separator"></div>`;const e=t.checked!==void 0?"menuitemradio":t.pressed!==void 0?"menuitemcheckbox":"menuitem",r=t.checked??t.pressed;return s`<button
      role="${e}"
      class="${t.danger?"danger":""}"
      tabindex="-1"
      aria-checked="${r===void 0?"":String(!!r)}"
      aria-disabled="${t.disabled?"true":"false"}"
      aria-haspopup="${t.submenu?"true":"false"}"
      @click="${()=>this._run(t)}"
    >
      ${Y(t.icon)}
      <span class="text">${t.label}</span>
      ${t.hint?s`<span class="end">${t.hint}</span>`:t.shortcut?s`<span class="end">${t.shortcut}</span>`:""}
      ${r?s`<span class="check">${Y("check")}</span>`:""}
      ${t.submenu?Y("chevron-right"):""}
    </button>`}_renderGrid(){const t=this._grid,e=this._query.trim().toLowerCase(),r=e?t.options.filter(o=>(o.description||"").toLowerCase().includes(e)):t.options;return s`<div class="menu grid" style="top:${this._open.y}px" role="dialog" aria-label="${t.label}" @keydown="${this._gridKeys}">
      <div class="label">${t.label}</div>
      ${t.filter?s`<input
            type="search"
            placeholder="Search ${t.label.toLowerCase()}…"
            aria-label="Search ${t.label.toLowerCase()}"
            .value="${this._query}"
            @input="${o=>this._query=o.target.value}"
          />`:""}
      <div class="cells" role="group" aria-label="${t.label}">
        ${r.map(o=>{const i=ie(o.value),n=o.description||i;return s`<button title="${n}" aria-label="${n}" @click="${()=>this._insertGlyph(o)}">${i}</button>`})}
      </div>
      ${r.length?"":s`<div class="empty">No matches</div>`}
    </div>`}render(){const t=this._open;return s`
      <div class="wrap" @mousedown="${this._keepSelection}">
        <div class="rail" role="toolbar" aria-label="Block tools" aria-orientation="vertical" @keydown="${this._railKeys}">
          ${this._cats.map((e,r)=>s`<button
              data-cat="${e.id}"
              tabindex="${r===0?0:-1}"
              title="${e.label}"
              aria-label="${e.label}"
              aria-haspopup="menu"
              aria-expanded="${t?.id===e.id?"true":"false"}"
              @click="${o=>this._toggle(e,o)}"
            >
              ${Y(e.icon)}
            </button>`)}
        </div>
        ${t&&this._grid?this._renderGrid():t?s`<div class="menu" role="menu" aria-label="${t.label}" style="top:${t.y}px" @keydown="${this._menuKeys}">
                <div class="label">${t.label}</div>
                ${t.items.map(e=>this._renderItem(e))}
              </div>`:""}
      </div>
    `}};customElements.define(V2.tag,V2);const W=288,h2=288,N2=a=>s`<span class="icon" aria-hidden="true" style="--src:url(&quot;${x[`oer:${a}`]||""}&quot;)"></span>`;class O2 extends y{static get tag(){return"oer-block-inserter"}static get properties(){return{_hover:{state:!0},_end:{state:!0},_open:{state:!0},_query:{state:!0},_active:{state:!0}}}constructor(){super(),this._hover=null,this._end=null,this._open=null,this._query="",this._active=0,this.__tick=this._tick.bind(this),this.__move=t=>{this.__pointer={x:t.clientX,y:t.clientY}},this.__outside=t=>{this._open&&!t.composedPath().includes(this)&&this.close()}}connectedCallback(){super.connectedCallback(),this.__raf=requestAnimationFrame(this.__tick),globalThis.addEventListener("pointermove",this.__move,{passive:!0}),globalThis.addEventListener("pointerdown",this.__outside,!0)}disconnectedCallback(){cancelAnimationFrame(this.__raf),globalThis.removeEventListener("pointermove",this.__move),globalThis.removeEventListener("pointerdown",this.__outside,!0),super.disconnectedCallback()}get _hax(){return globalThis.HaxStore?.requestAvailability?.()}_blocks(){const t=this._hax?.activeHaxBody;return t?[...t.children].filter(e=>e.localName!=="page-break"&&e.getClientRects().length):[]}_tick(){this.__raf=requestAnimationFrame(this.__tick);const t=E.editMode?this._hax?.activeHaxBody:null;if(!t||!t.isConnected){(this._hover||this._end||this._open)&&(this._hover=this._end=null,this.close());return}const e=t.getBoundingClientRect(),r=O(),o=h=>h>r.top+4&&h<r.bottom-4,i=this._blocks().map(h=>h.getBoundingClientRect()),n=i.length?i[i.length-1].bottom:e.top;let d={y:Math.round(n+8),left:Math.round(e.left),width:Math.round(e.width)};(!o(d.y)||!o(d.y+36))&&(d=null),!(d&&this._end&&this._end.y===d.y&&this._end.left===d.left&&this._end.width===d.width)&&(d||this._end)&&(this._end=d);let l=null;if(!globalThis.__oerDragging){const h=X(t).filter(p=>!p.end);if(this._open)this._open.slot.end||(l=h.find(p=>l2(p,this._open.slot))||null);else if(this.__pointer){const p=A2(h,this.__pointer.x,this.__pointer.y,{gutter:72});p&&o(p.top+p.height/2)&&(l=p)}}l&&(l={...l,top:Math.round(l.top),height:Math.round(l.height),left:Math.round(l.left),width:Math.round(l.width)}),!(l&&this._hover&&l2(l,this._hover)&&["top","height","left","width"].every(h=>l[h]===this._hover[h]))&&(l||this._hover)&&(this._hover=l)}openAt(t,e){this._query="",this._active=0,this._open={slot:t,x:e.x,y:e.y},this.updateComplete.then(()=>this.shadowRoot.querySelector(".panel input")?.focus())}_endSlot(){return X(this._hax?.activeHaxBody).find(t=>t.end)}openFor(t,e){const r=X(this._hax?.activeHaxBody).find(i=>e==="below"?i.after===t:i.before===t);if(!r)return;const o=t.getBoundingClientRect();this.openAt(r,{x:o.left+12,y:e==="below"?o.bottom:o.top})}close(){this._open&&(this._open=null)}_gizmos(){const t=this._hax,e=t?.haxTray?.shadowRoot?.querySelector("hax-gizmo-browser"),r=c=>e?._gizmoAllowedInTray?e._gizmoAllowedInTray(c):!!c?.tag,o=(t?.gizmoList||[]).filter(r),i=t?.platformAllows?.("blockTemplates")===!1?[]:(t?.staxList||[]).filter(c=>c?.stax?.length).map(c=>({stax:c.stax,title:c.details?.title||"Template",description:c.details?.description||"",image:c.details?.image||"",icon:c.details?.icon||"hax:templates",tags:c.details?.tags||[]})),n=this._query.trim().toLowerCase();if(n){const c=m=>[m.title,m.tag,m.description,...m.tags||[]].join(" ").toLowerCase().includes(n);return[{label:"Blocks",items:o.filter(c)},{label:"Templates",items:i.filter(c)}].filter(m=>m.items.length)}const d=[],l=(e?.recentGizmoList||[]).filter(r).slice().reverse();l.length&&d.push({label:"Recent",items:l});const h=(e?.popularGizmoList||[]).filter(r);h.length&&d.push({label:"Popular",items:h});const p=e?.updateCategories?e.updateCategories(o):[];for(const c of p){const m=o.filter(v=>(v.tags?.[0]||"Other")===c).sort((v,C)=>v.title.localeCompare(C.title));m.length&&d.push({label:c,items:m})}return i.length&&d.push({label:"Templates",items:i}),d}async _insert(t){const e=this._hax;if(!e?.activeHaxBody||!t||!this._open)return;const r=this._open.slot;this.close();let o=null;if(t.stax){let i=r;for(const n of t.stax){const d=await z2(e,i,n);if(!d)break;o=o||d,i={...r,after:d,before:null}}}else{const i=e.haxSchemaFromTag(t.tag),n=i?.demoSchema?.[0]||e.haxElementPrototype({tag:t.tag},{},"");e.recentGizmoList?.push?.(i?.gizmo||t),o=await z2(e,r,n)}o&&(e.activeNode=o,o.focus?.(),o.scrollIntoView?.({block:"nearest"}))}_flat(){return this._gizmos().flatMap(t=>t.items)}_panelKeys(t){const e=this._flat();if(t.key==="ArrowDown")this._active=Math.min(this._active+1,e.length-1);else if(t.key==="ArrowUp")this._active=Math.max(this._active-1,0);else if(t.key==="Home"&&t.target.localName!=="input")this._active=0;else if(t.key==="End"&&t.target.localName!=="input")this._active=e.length-1;else if(t.key==="Enter")this._insert(e[this._active]);else if(t.key==="Escape")this.close();else return;t.preventDefault(),this.updateComplete.then(()=>this.shadowRoot.querySelector(`[data-i="${this._active}"]`)?.scrollIntoView({block:"nearest"}))}static get styles(){return u`
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
        width: ${W}px;
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
        width: ${h2}px;
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
    `}_renderPanel(){const t=this._open,e=this._gizmos(),r=e.flatMap(p=>p.items),o=r[Math.min(this._active,r.length-1)],i=globalThis.innerWidth,n=Math.max(8,Math.min(t.x+16,i-W-8)),d=Math.max(8,t.y-20),l=n+W+8+h2<=i-8?n+W+8:n-h2-8;let h=-1;return s`
      <div class="panel" style="left:${n}px;top:${d}px" @keydown="${this._panelKeys}">
        <div class="search">
          <simple-icon-lite icon="icons:search"></simple-icon-lite>
          <input
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="blocks"
            aria-activedescendant="${o?`b${this._active}`:""}"
            aria-label="Search blocks"
            placeholder="Search blocks…"
            .value="${this._query}"
            @input="${p=>{this._query=p.target.value,this._active=0}}"
          />
        </div>
        <div class="list" id="blocks" role="listbox" aria-label="Blocks">
          ${r.length?e.map(p=>s`<div class="group" role="group" aria-label="${p.label}">
                  <div class="heading" aria-hidden="true">${p.label}</div>
                  ${p.items.map(c=>{h+=1;const m=h;return s`<button
                      id="b${m}"
                      data-i="${m}"
                      role="option"
                      tabindex="-1"
                      aria-selected="${m===this._active?"true":"false"}"
                      @mouseenter="${()=>this._active=m}"
                      @mousedown="${v=>v.preventDefault()}"
                      @click="${()=>this._insert(c)}"
                    >
                      <simple-icon-lite icon="${c.icon||"hax:add-brick"}"></simple-icon-lite>
                      <span>${c.title}</span>
                    </button>`})}
                </div>`):s`<div class="empty">No blocks found</div>`}
        </div>
      </div>
      ${o?s`<div class="preview" style="left:${l}px;top:${d}px" aria-hidden="true">
            ${o.stax?this._renderTemplatePreview(o):s`<hax-element-demo
              .renderTag="${o.tag}"
              .gizmoTitle="${o.title}"
              .gizmoIcon="${o.icon}"
              .gizmoDescription="${o.description||""}"
            ></hax-element-demo>`}
          </div>`:""}
    `}_renderTemplatePreview(t){const e=this._hax,r=t.stax.map(o=>e?.haxSchemaFromTag(o.tag)?.gizmo?.title||o.tag);return s`<div class="tpl">
      ${t.image?s`<img src="${t.image}" alt="" />`:s`<ol>${r.map(o=>s`<li>${o}</li>`)}</ol>`}
      <div class="tpl-info">
        <div class="tpl-title">${t.title}</div>
        <div class="tpl-desc">${t.description||`${r.length} block${r.length===1?"":"s"}`}</div>
      </div>
    </div>`}updated(){const t=globalThis.innerHeight;for(const e of this.shadowRoot.querySelectorAll(".panel, .preview")){const r=e.getBoundingClientRect();r.bottom>t-8&&(e.style.top=`${Math.max(8,r.top-(r.bottom-(t-8)))}px`)}}render(){const t=this._hover,e=this._end;return s`
      ${t?s`<button
            class="slot ${this._open?"chosen":""}"
            style="left:${t.left}px;top:${t.top}px;width:${t.width}px;height:${t.height}px"
            tabindex="-1"
            title="Insert block here"
            aria-label="Insert block here"
            @click="${()=>this.openAt(t,{x:t.left,y:t.top+t.height/2})}"
          >
            <span class="plus">${N2("plus")}</span>
          </button>`:""}
      ${e?s`<button
            class="end ${this._open?.slot.end?"chosen":""}"
            style="left:${e.left}px;top:${e.y}px;width:${e.width}px"
            aria-haspopup="listbox"
            @click="${()=>{const r=this._endSlot();r&&this.openAt(r,{x:e.left,y:e.y})}}"
          >
            ${N2("plus")} Add block
          </button>`:""}
      ${this._open?this._renderPanel():""}
    `}}customElements.define(O2.tag,O2),ct(),Dt(),ft(),x2(kt),Tt(),qt(),Lt();function K2(){const a=globalThis.document,t=a.querySelector("haxcms-site-editor-ui");if(t){if(!t.hasAttribute("data-oer-hidden")){t.setAttribute("data-oer-hidden",""),t.setAttribute("aria-hidden","true"),t.inert=!0;for(const[e,r]of[["height","0"],["min-height","0"],["overflow","hidden"],["opacity","0"],["pointer-events","none"]])t.style.setProperty(e,r,"important")}for(const e of["oer-block-frame","oer-block-rail","oer-block-inserter"])a.querySelector(e)||a.body.append(a.createElement(e))}else a.querySelector("oer-block-frame")?.remove(),a.querySelector("oer-block-rail")?.remove(),a.querySelector("oer-block-inserter")?.remove()}new MutationObserver(K2).observe(globalThis.document.body,{childList:!0}),K2();const U2={sm:560,md:720,lg:960,xl:1200};globalThis.addEventListener("responsive-element",a=>{a.detail?.element?.localName==="grid-plate"&&Object.assign(a.detail,U2)},{capture:!0}),customElements.whenDefined("grid-plate").then(()=>{for(const a of globalThis.document.querySelectorAll("grid-plate"))a.hasUpdated&&globalThis.dispatchEvent(new CustomEvent("responsive-element",{detail:{element:a,attribute:"responsive-size",relativeToParent:!1,...U2}}))});const ae=(a,t)=>(Number(a.order)||0)-(Number(t.order)||0);function p2(a){const t=new Map;for(const e of a||[]){const r=e.parent||null;t.has(r)||t.set(r,[]),t.get(r).push(e)}for(const e of t.values())e.sort(ae);return t}function ne(a,t=null){const e=p2(a),r=[],o=(i,n)=>{for(const d of e.get(i)||[])r.push({item:d,depth:n}),o(d.id,n+1)};return o(t,0),r}function se(a,t){const e=new Map((a||[]).map(i=>[i.id,i])),r=[];let o=e.get(t);for(;o?.parent&&e.has(o.parent);)r.push(o.parent),o=e.get(o.parent);return r}function X2(){return E.cmsSiteEditor?.instance??globalThis.document.querySelector("haxcms-site-editor")}function le(a,t=null,e=""){const r=p2(E.manifest?.items).get(t||null)||[],o=r[r.length-1],i=o?(Number(o.order)||0)+1:0,n=X2()||globalThis.document.body;n.dispatchEvent(new CustomEvent("haxcms-create-node",{bubbles:!0,composed:!0,cancelable:!0,detail:{originalTarget:n,values:{node:{title:a||"New page",location:"",contents:"<p></p>"},order:i,parent:t||null,...e?{metadata:{pageType:e}}:{}}}}))}function c2(a){const t=E.manifest;return X2()?.saveOutline?.({detail:a}),de(t)}function de(a=E.manifest,t=15e3){return new Promise(e=>{const r=Date.now(),o=()=>{E.manifest!==a?e(!0):Date.now()-r>t?e(!1):setTimeout(o,200)};setTimeout(o,200)})}const G2=()=>`item-${globalThis.crypto.randomUUID()}`,Z="oer-system",he=[{kind:"text",label:"Text"},{kind:"longtext",label:"Long text"},{kind:"number",label:"Number"},{kind:"select",label:"Choice"},{kind:"list",label:"List"},{kind:"boolean",label:"Yes / no"},{kind:"date",label:"Date"},{kind:"image",label:"Image URL"},{kind:"url",label:"Link"}],S=()=>b(w.manifest?.items)||[],m2=a=>a?.metadata?.pageType===Z;function J2(a=S()){return a.find(m2)||null}function T(a=S()){const t=J2(a)?.metadata?.oerContentTypes;return t&&Array.isArray(t.types)?t:{version:1,types:[]}}function Y2(a,t=S()){const e=T(t).types;if(!a)return e;const r=e.find(o=>o.id===a);return!r||r.children===null||r.children===void 0?e:e.filter(o=>r.children.includes(o.id))}function pe(a=S()){const t=new Map;for(const e of a){const r=e.metadata?.pageType;r&&r!==Z&&t.set(r,(t.get(r)||0)+1)}return t}const W2=a=>String(a||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"type",ce=a=>String(a||"").replace(/[^A-Za-z0-9]+/g," ").trim().split(/\s+/).filter(Boolean).map((t,e)=>e?t[0].toUpperCase()+t.slice(1).toLowerCase():t.toLowerCase()).join("")||"field";async function me(a,t=null){const e=S(),r=J2(e),o=e.map(i=>{if(r&&i.id===r.id)return{...i,metadata:{...i.metadata,oerContentTypes:a},modified:!0};const n=t?.(i);return n?{...n,modified:!0}:i});if(!r){const i=e.filter(n=>!n.parent);o.push({id:G2(),title:"Content types",parent:null,order:i.length,indent:0,location:"",description:"Site configuration: content type definitions (hidden).",metadata:{pageType:Z,hideInMenu:!0,published:!1,oerContentTypes:a},contents:"<p>This page stores the site's content type definitions.</p>",new:!0})}return c2(o)}function ue(){return w.cmsSiteEditor?.instance??null}async function ge(a,{pageType:t,description:e,fields:r}){const o=S(),i=o.find(d=>d.id===a),n=o.map(d=>{if(d.id!==a)return d;const l={...d.metadata,oerFields:r};return t?l.pageType=t:delete l.pageType,{...d,metadata:l,modified:!0}});await c2(n),i&&typeof e=="string"&&e!==(i.description||"")&&ue()?.saveNodeDetails?.({detail:{id:a,operation:"setDescription",details:{description:e}}})}const Z2="oer-site-nav-open",Q2=a=>s`<span class="lucide" aria-hidden="true" style="--src:url(&quot;${x[a]||""}&quot;)"></span>`;function ve(){try{return new Set(JSON.parse(globalThis.localStorage.getItem(Z2)||"[]"))}catch{return new Set}}let tt=class extends y{static get tag(){return"oer-site-nav"}static get properties(){return{editable:{type:Boolean,reflect:!0},_items:{state:!0},_activeId:{state:!0},_open:{state:!0},_adding:{state:!0},_addType:{state:!0}}}constructor(){super(),this.editable=!1,this._items=[],this._activeId=null,this._open=ve(),this._adding=null,this.__disposers=[]}connectedCallback(){super.connectedCallback(),this.__disposers.push(z(()=>{const t=b(w.manifest?.items)||[],e=b(w.activeId);Promise.resolve().then(()=>{if(this._all=t,this._items=t.filter(r=>!r.metadata?.hideInMenu),e!==this._activeId){this._activeId=e;const r=new Set(this._open);for(const o of se(t,e))r.add(o);this._setOpen(r)}})}))}disconnectedCallback(){for(const t of this.__disposers)t?.();this.__disposers=[],super.disconnectedCallback()}_setOpen(t){this._open=t;try{globalThis.localStorage.setItem(Z2,JSON.stringify([...t]))}catch{}}_toggle(t){const e=new Set(this._open);e.has(t)?e.delete(t):e.add(t),this._setOpen(e)}_choices(t){const e=this._all||[],r=t?e.find(d=>d.id===t)?.metadata?.pageType:null,o=Y2(r||null,e),i=r&&T(e).types.find(d=>d.id===r),n=!!i&&Array.isArray(i.children);return{types:o,untyped:!n}}_startAdd(t){const{types:e,untyped:r}=this._choices(t);this._addType=r?"":e[0]?.id||"",this._adding=t??"root",this.updateComplete.then(()=>this.shadowRoot.querySelector(".add-input")?.focus())}_addKeys(t,e){if(t.key==="Enter"){t.preventDefault();const r=(this.shadowRoot.querySelector(".add-input")?.value||"").trim();if(!r){this.shadowRoot.querySelector(".add-input")?.focus();return}this._adding=null,r&&le(r,e,this._addType)}else t.key==="Escape"&&(t.preventDefault(),this._adding=null,this.updateComplete.then(()=>this.shadowRoot.querySelector(`[data-add="${e??"root"}"]`)?.focus()))}static get styles(){return u`
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
      a[aria-current="page"] {
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
    `}_renderAdd(t){if(!this.editable)return"";const e=t??"root",{types:r,untyped:o}=this._choices(t);return!r.length&&!o?"":this._adding===e?s`<li class="add-field">
        ${r.length?s`<select
              class="add-type"
              aria-label="Content type of the new page"
              @change="${i=>this._addType=i.target.value}"
              @keydown="${i=>this._addKeys(i,t)}"
            >
              ${o?s`<option value="" ?selected="${!this._addType}">No type</option>`:""}
              ${r.map(i=>s`<option value="${i.id}" ?selected="${i.id===this._addType}">${i.label}</option>`)}
            </select>`:""}
        <input
          class="add-input"
          type="text"
          placeholder="Page title, then Enter"
          aria-label="New page title"
          @keydown="${i=>this._addKeys(i,t)}"
          @blur="${i=>{!i.target.value.trim()&&!i.relatedTarget?.classList?.contains("add-type")&&(this._adding=null)}}"
        />
      </li>`:s`<li class="row">
      <button class="add" data-add="${e}" @click="${()=>this._startAdd(t)}">
        ${Q2("oer:plus")}Add page
      </button>
    </li>`}_renderLevel(t,e,r){const o=t.get(e)||[];return s`<ul role="list">
      ${o.map(i=>{const n=(t.get(i.id)||[]).length>0,d=this._open.has(i.id),l=i.metadata?.icon;return s`<li class="${n?"has-kids":""}">
          <div class="row">
            <a
              href="${i.slug}"
              class="${i.metadata?.published===!1?"draft":""}"
              aria-current="${i.id===this._activeId?"page":"false"}"
            >
              ${r===0?l?s`<simple-icon-lite icon="${l}"></simple-icon-lite>`:s`<span class="no-icon"></span>`:""}
              <span class="title">${i.title}</span>
            </a>
            ${n?s`<button
                  class="chev"
                  aria-expanded="${d?"true":"false"}"
                  aria-label="${d?"Collapse":"Expand"} ${i.title}"
                  @click="${()=>this._toggle(i.id)}"
                >
                  ${Q2("oer:chevron-down")}
                </button>`:""}
          </div>
          ${n&&d?this._renderLevel(t,i.id,r+1):""}
        </li>`})}
      ${this._renderAdd(e)}
    </ul>`}render(){const t=p2(this._items);return this._renderLevel(t,null,0)}};customElements.define(tt.tag,tt);const De=u`
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
`,we=u`
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
`;let et=class extends y{static get tag(){return"oer-command-search"}static get properties(){return{open:{type:Boolean,reflect:!0}}}constructor(){super(),this.open=!1,this.__outside=t=>{this.open&&!t.composedPath().includes(this)&&(this.open=!1)}}connectedCallback(){super.connectedCallback(),globalThis.addEventListener("pointerdown",this.__outside)}disconnectedCallback(){globalThis.removeEventListener("pointerdown",this.__outside),super.disconnectedCallback()}updated(t){t.has("open")&&this.open&&this.shadowRoot.querySelector("input")?.focus()}_input(t){const e=t.target.value;e&&(t.target.value="",this.open=!1,n2(e))}_keydown(t){t.key==="Escape"?(t.preventDefault(),this.open=!1,this.shadowRoot.querySelector("button")?.focus()):t.key==="Enter"&&!t.target.value&&(t.preventDefault(),this.open=!1,n2())}static get styles(){return u`
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
          title="Search or run a command (${St})"
          aria-label="Search or run a command"
          @click="${()=>this.open=!this.open}"
        >
          <span
            class="icon"
            aria-hidden="true"
            style="--src:url(&quot;${x["icons:search"]}&quot;)"
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
    `}};customElements.define(et.tag,et);const rt=Object.keys(x).filter(a=>!a.startsWith("oer:")),ot=a=>s`<span class="lucide" aria-hidden="true" style="--src:url(&quot;${x[a]||""}&quot;)"></span>`;let Q=class extends y{static get tag(){return"oer-icon-picker"}static get properties(){return{open:{type:Boolean,reflect:!0},_query:{state:!0},_current:{state:!0}}}constructor(){super(),this.open=!1,this._query="",this._current="",this.__keys=t=>{this.open&&t.key==="Escape"&&(t.preventDefault(),t.stopPropagation(),this._done(null))}}pick(t=""){return this._current=t,this._query="",this.open=!0,globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector("input")?.focus()),new Promise(e=>this.__resolve=e)}_done(t){this.open=!1,globalThis.removeEventListener("keydown",this.__keys,!0),this.__resolve?.(t),this.__resolve=null}static get styles(){return u`
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
    `}render(){if(!this.open)return s``;const t=this._query.trim().toLowerCase(),e=(t?rt.filter(r=>r.toLowerCase().includes(t)):rt).slice(0,120);return s`
      <div class="backdrop" @click="${()=>this._done(null)}"></div>
      <div class="box" role="dialog" aria-modal="true" aria-labelledby="t">
        <h2 id="t">Choose icon</h2>
        <div class="search">
          ${ot("icons:search")}
          <input
            type="text"
            placeholder="Search icons…"
            aria-label="Search icons"
            .value="${this._query}"
            @input="${r=>this._query=r.target.value}"
          />
        </div>
        ${e.length?s`<div class="grid">
              ${e.map(r=>s`<button title="${r}" aria-pressed="${r===this._current?"true":"false"}" @click="${()=>this._done(r)}">
                  ${ot(r)}<small>${r.split(":").pop()}</small>
                </button>`)}
            </div>`:s`<div class="empty">No icons match “${this._query}”</div>`}
        <div class="foot">
          <button class="remove" @click="${()=>this._done("")}">Remove icon</button>
          <button class="cancel" @click="${()=>this._done(null)}">Cancel</button>
        </div>
      </div>
    `}};customElements.define(Q.tag,Q);function it(){const a=globalThis.document;return a.querySelector(Q.tag)||a.body.appendChild(a.createElement(Q.tag))}const H=20,B=6,fe=2e3,k=(a,t="")=>s`<span class="lucide ${t}" aria-hidden="true" style="--src:url(&quot;${x[a]||""}&quot;)"></span>`;let t2=class extends y{static get tag(){return"oer-outline-builder"}static get properties(){return{open:{type:Boolean,reflect:!0},_rows:{state:!0},_collapsed:{state:!0},_editing:{state:!0},_showIcons:{state:!0},_hoverAdd:{state:!0},_drag:{state:!0},_longPress:{state:!0},_typeMenu:{state:!0},_confirmDiscard:{state:!0}}}constructor(){super(),this.open=!1,this._rows=[],this._deleted=new Map,this._collapsed=new Set,this._editing=null,this._showIcons=!0,this._hoverAdd=null,this._drag=null,this._longPress=null,this._typeMenu=null,this._types=[],this._confirmDiscard=!1,this.__keys=t=>{!this.open||t.key!=="Escape"||globalThis.document.querySelector("oer-icon-picker[open]")||(this._typeMenu?this._typeMenu=null:this._editing?this._editing=null:this._requestClose(),t.preventDefault(),t.stopPropagation())}}show(t=null){const e=b(w.manifest?.items)||[];this._root=t,this._rootItem=t?e.find(r=>r.id===t):null,this._rows=ne(e.filter(r=>!m2(r)),t).map(({item:r,depth:o})=>({id:r.id,title:r.title,icon:r.metadata?.icon||"",type:r.metadata?.pageType||"",depth:o,orig:r})),this._types=T(e).types,this._snapshot=this._signature(),this._deleted=new Map,this._collapsed=new Set,this._editing=null,this._confirmDiscard=!1,this.open=!0,globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector("[role=treeitem], .empty button")?.focus())}_close(){this.open=!1,this._typeMenu=null,globalThis.removeEventListener("keydown",this.__keys,!0)}_signature(){return JSON.stringify(this._rows.map(t=>[t.id,t.title,t.icon,t.type,t.depth]))}get _dirty(){return this._deleted.size>0||this._signature()!==this._snapshot}_requestClose(){if(this._dirty&&!this._confirmDiscard){this._confirmDiscard=!0;return}this._close()}_save(){const t=b(w.manifest?.items)||[],e=this._rootItem?(Number(this._rootItem.indent)||0)+1:0,r=new Map(t.map(n=>[n.id,{...n}])),o=[],i=new Map;for(const n of this._rows){const d=n.depth===0?this._root:o[n.depth-1];o[n.depth]=n.id,o.length=n.depth+1;const l=d??"__root",h=i.get(l)??0;i.set(l,h+1);const p=n.title.trim()||"Untitled page",c=e+n.depth;if(n.orig){const m=n.orig,v=r.get(n.id),C=(m.parent||null)!==(d||null)||Number(m.order)!==h||Number(m.indent)!==c||m.title!==p||(m.metadata?.icon||"")!==n.icon||(m.metadata?.pageType||"")!==n.type;Object.assign(v,{parent:d||null,order:h,indent:c,title:p}),v.metadata={...m.metadata||{}},n.icon?v.metadata.icon=n.icon:delete v.metadata.icon,n.type?v.metadata.pageType=n.type:delete v.metadata.pageType,C&&(v.modified=!0)}else r.set(n.id,{id:n.id,title:p,parent:d||null,order:h,indent:c,location:"",description:"",metadata:{...n.icon?{icon:n.icon}:{},...n.type?{pageType:n.type}:{}},contents:"<p></p>",new:!0})}for(const n of this._deleted.keys()){const d=r.get(n);d&&(d.delete=!0)}c2([...r.values()]),this._close()}_index(t){return this._rows.findIndex(e=>e.id===t)}_subtree(t){const e=this._rows[t].depth;let r=t+1;for(;r<this._rows.length&&this._rows[r].depth>e;)r++;return{start:t,end:r}}_hasChildren(t){return t+1<this._rows.length&&this._rows[t+1].depth>this._rows[t].depth}_visible(){const t=[];let e=-1;return this._rows.forEach((r,o)=>{if(e>=0){if(r.depth>e)return;e=-1}t.push({row:r,index:o}),this._collapsed.has(r.id)&&this._hasChildren(o)&&(e=r.depth)}),t}_nextSiblingAtDepth(t,e){const{end:r}=this._subtree(t);for(let o=r;o<this._rows.length;o++){if(this._rows[o].depth<e)return!1;if(this._rows[o].depth===e)return!0}return!1}_closingRows(t,e){const{row:r,index:o}=t[e],i=e+1<t.length?t[e+1].row.depth:-1;if(i>=r.depth)return[];const n=[];for(let d=r.depth;d>i;d--){let l=r.id;if(d<r.depth)for(let h=e-1;h>=0;h--){if(t[h].row.depth===d){l=t[h].row.id;break}if(t[h].row.depth<d)break}n.push({depth:d,afterId:l,index:o})}return n}_hasClosingAddAtDepth(t,e,r){for(let o=e+1;o<t.length;o++){const i=t[o].row.depth;if(i<r)return!0;if(i===r)return!1}return!0}_highlight(){if(this._hoverAdd)return this._hoverAdd;const t=this._drag;return t?.overId&&t.position!=="child"&&t.previewDepth!==null?{afterId:t.overId,depth:t.previewDepth}:null}_isSibling(t){const e=this._highlight();if(!e)return!1;const r=this._rows,o=r.find(l=>l.id===t);if(!o||o.depth!==e.depth)return!1;if(e.depth===0)return!0;const i=this._index(e.afterId);if(i<0)return!1;const n=e.afterId===this._drag?.id?i-1:i;let d=-1;for(let l=n;l>=0;l--){if(r[l].depth===e.depth-1){d=l;break}if(r[l].depth<e.depth-1)break}if(d<0)return!1;for(let l=d+1;l<r.length&&!(r[l].depth<e.depth);l++)if(r[l].depth===e.depth&&r[l].id===t)return!0;return!1}_columnHighlighted(t,e){const r=this._highlight();if(!r||e!==r.depth)return!1;for(let o=this._index(t);o>=0;o--){if(this._rows[o].depth===e)return this._isSibling(this._rows[o].id);if(this._rows[o].depth<e)return!1}return!1}_commit(t=[...this._rows]){this._rows=t,this._confirmDiscard=!1}_newRow(t,e=null){return{id:G2(),title:"",icon:"",type:this._defaultType(e),depth:t,orig:null}}_addAfter(t,e){const r=[...this._rows],o=this._index(t),i=o<0?r.length:this._subtree(o).end;let n=this._rootItem?.metadata?.pageType||null;for(let l=i-1;l>=0;l--)if(r[l].depth<e){n=r[l].type||null;break}const d=this._newRow(e,n);r.splice(i,0,d),this._commit(r),this._startEdit(d.id)}_addChild(t){const e=this._index(t);if(e<0)return;const r=[...this._rows],o=this._newRow(Math.min(r[e].depth+1,B),r[e].type||null);r.splice(this._subtree(e).end,0,o);const i=new Set(this._collapsed);i.delete(t),this._collapsed=i,this._commit(r),this._startEdit(o.id)}_addFirst(){const t=this._newRow(0,this._rootItem?.metadata?.pageType||null);this._commit([...this._rows,t]),this._startEdit(t.id)}_remove(t){const e=this._index(t);if(e<0)return;const{start:r,end:o}=this._subtree(e),i=[...this._rows];for(const d of i.slice(r,o))d.orig&&this._deleted.set(d.id,d.orig);const n=e>0?i[e-1].id:null;i.splice(r,o-r),this._commit(i),n&&this._focusRow(n)}_rename(t,e){const r=this._rows.map(o=>o.id===t?{...o,title:e}:o);this._commit(r)}_shiftSubtree(t,e){const{start:r,end:o}=this._subtree(t);this._commit(this._rows.map((i,n)=>n>=r&&n<o?{...i,depth:i.depth+e}:i))}_indent(t){const e=this._index(t);if(e<=0||this._rows[e].depth>this._rows[e-1].depth)return;const{start:r,end:o}=this._subtree(e);Math.max(...this._rows.slice(r,o).map(i=>i.depth))>=B||this._shiftSubtree(e,1)}_outdent(t){const e=this._index(t);e<0||this._rows[e].depth<=0||this._shiftSubtree(e,-1)}_moveUp(t){const e=this._index(t);if(e<=0)return;const r=[...this._rows],o=r[e].depth;let i=e-1;for(;i>=0&&r[i].depth>o;)i--;if(i<0||r[i].depth<o)return;const{start:n,end:d}=this._subtree(e),l=r.splice(n,d-n);r.splice(i,0,...l),this._commit(r),this._focusRow(t)}_moveDown(t){const e=this._index(t);if(e<0)return;const r=this._rows[e].depth,{start:o,end:i}=this._subtree(e);if(i>=this._rows.length||this._rows[i].depth!==r)return;const n=this._subtree(i).end,d=[...this._rows],l=d.splice(o,i-o);d.splice(n-l.length,0,...l),this._commit(d),this._focusRow(t)}_toggle(t){const e=new Set(this._collapsed);e.has(t)?e.delete(t):e.add(t),this._collapsed=e}_collapseAll(){this._collapsed=new Set(this._rows.filter((t,e)=>this._hasChildren(e)).map(t=>t.id))}_startEdit(t){this._editing=t,this.updateComplete.then(()=>{const e=this.shadowRoot.querySelector(`[data-edit="${t}"]`);e?.focus(),e&&(e.selectionStart=e.selectionEnd=e.value.length)})}_stopEdit(t=!0){const e=this._editing;this._editing=null,t&&e&&this._focusRow(e)}_focusRow(t){this.updateComplete.then(()=>this.shadowRoot.querySelector(`[role=treeitem][data-id="${t}"]`)?.focus())}_editKeys(t,e){t.key==="Enter"?(t.preventDefault(),this._stopEdit()):t.key==="Tab"?(t.preventDefault(),t.shiftKey?this._outdent(e.id):this._indent(e.id)):t.key==="Backspace"&&!t.target.value?(t.preventDefault(),this._editing=null,this._remove(e.id)):t.altKey&&(t.key==="ArrowUp"||t.key==="ArrowDown")&&(t.preventDefault(),t.key==="ArrowUp"?this._moveUp(e.id):this._moveDown(e.id),this._startEdit(e.id)),t.stopPropagation()}_rowKeys(t,e,r,o){if(this._editing===e.id)return;const i=o.findIndex(d=>d.row.id===e.id),n=d=>o[d]&&this._focusRow(o[d].row.id);if(t.key==="Tab")t.shiftKey?this._outdent(e.id):this._indent(e.id),this._focusRow(e.id);else if(t.key==="Enter"||t.key==="F2")this._startEdit(e.id);else if(t.altKey&&t.key==="ArrowUp")this._moveUp(e.id);else if(t.altKey&&t.key==="ArrowDown")this._moveDown(e.id);else if(t.key==="ArrowUp")n(i-1);else if(t.key==="ArrowDown")n(i+1);else if(t.key==="ArrowRight"&&this._hasChildren(r)&&this._collapsed.has(e.id))this._toggle(e.id);else if(t.key==="ArrowLeft"&&this._hasChildren(r)&&!this._collapsed.has(e.id))this._toggle(e.id);else if(t.key==="Delete"||t.key==="Backspace"&&!e.title)this._remove(e.id);else return;t.preventDefault()}_pointerDown(t,e){!this._hasChildren(e)||this._collapsed.has(t.id)||(this._longPress=t.id,clearTimeout(this.__lpTimer),this.__lpTimer=setTimeout(()=>{this._longPress===t.id&&(this._collapsed=new Set([...this._collapsed,t.id]),this._longPress=null)},fe))}_cancelLongPress(){clearTimeout(this.__lpTimer),this._longPress=null}_previewDepth(t,e){const r=Math.round((t.x-t.startX)/H);let o=Math.max(0,Math.min(B,t.origDepth+r));const i=this._index(e);if(e&&e!==t.id&&i>=0)if(t.position==="child")o=Math.min(B,this._rows[i].depth+1);else{const n=t.position==="before"?Math.max(0,i-1):i;o=Math.min(o,this._rows[n].depth+1)}else e===t.id&&i>0&&(o=Math.min(o,this._rows[i-1].depth+1));return o}_dragStart(t,e){this._cancelLongPress(),t.dataTransfer.effectAllowed="move",t.dataTransfer.setData("text/plain",e.id),this._drag={id:e.id,overId:null,position:"after",startX:t.clientX,x:t.clientX,origDepth:e.depth,previewDepth:null,droppedOnOther:!1}}_dragOver(t,e){const r=this._drag;if(!r)return;t.preventDefault(),t.dataTransfer.dropEffect="move";const o={...r,x:t.clientX,overId:e.id};if(e.id!==r.id){const i=t.currentTarget.getBoundingClientRect(),n=(t.clientY-i.top)/i.height;o.position=n<.3?"before":n>.7?"after":e.depth<B?"child":"after"}o.previewDepth=this._previewDepth(o,e.id),o.overId!==r.overId||o.position!==r.position||o.previewDepth!==r.previewDepth?this._drag=o:this._drag.x=o.x}_dragLeave(t,e){(!t.relatedTarget||!t.currentTarget.contains(t.relatedTarget))&&this._drag?.overId===e.id&&(this._drag={...this._drag,overId:null})}_drop(t,e){t.preventDefault();const r=this._drag;if(!r||r.id===e.id)return;const o=[...this._rows],i=this._index(r.id);if(i<0)return;const{start:n,end:d}=this._subtree(i);let l=o.splice(n,d-n);const h=p=>l=l.map(c=>({...c,depth:Math.max(0,Math.min(B,c.depth+p))}));if(r.position==="child"){const p=o.findIndex(c=>c.id===e.id);if(p<0)o.push(...l);else{h(Math.min(o[p].depth+1,B)-l[0].depth);let c=p+1;for(;c<o.length&&o[c].depth>o[p].depth;)c++;o.splice(c,0,...l);const m=new Set(this._collapsed);m.delete(e.id),this._collapsed=m}}else{r.previewDepth!==null&&h(r.previewDepth-l[0].depth);let p=o.findIndex(c=>c.id===e.id);p<0&&(p=o.length),r.position==="after"&&p++,o.splice(p,0,...l)}this._drag={...r,droppedOnOther:!0},this._commit(o)}_dragEnd(){const t=this._drag;if(t&&!t.droppedOnOther&&t.previewDepth!==null){const e=this._index(t.id);e>=0&&this._rows[e].depth!==t.previewDepth&&this._commit(this._rows.map((r,o)=>o===e?{...r,depth:t.previewDepth}:r))}this._drag=null}async _chooseIcon(t){const e=await it().pick(t.icon);e!==null&&(this._commit(this._rows.map(r=>r.id===t.id?{...r,icon:e}:r)),this._focusRow(t.id))}_parentRow(t){const e=this._rows[t].depth;for(let r=t-1;r>=0;r--)if(this._rows[r].depth<e)return this._rows[r];return null}_allowedUnder(t){const e=this._types,r=t?e.find(i=>i.id===t):null,o=!!r&&Array.isArray(r.children);return{types:o?e.filter(i=>r.children.includes(i.id)):e,untyped:!o,none:o&&r.children.length===0}}_rowAllowed(t){const e=this._parentRow(t),r=e?null:this._rootItem?.metadata?.pageType||null;return this._allowedUnder(e?e.type:r)}_invalid(t){const e=this._rows[t],{types:r,untyped:o}=this._rowAllowed(t);return e.type?!r.some(i=>i.id===e.type):!o}_defaultType(t){const{types:e,untyped:r}=this._allowedUnder(t);return r?"":e[0]?.id||""}_setType(t,e){this._typeMenu=null,this._commit(this._rows.map(r=>r.id===t?{...r,type:e}:r)),this._focusRow(t)}static get styles(){return u`
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
        width: ${H}px;
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
        width: ${H}px;
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

    `}_levelClosed(t){const e=this._index(t.afterId);if(e<0)return!1;const r=this._parentRow(e),o=r?r.type:this._rootItem?.metadata?.pageType||null;return this._allowedUnder(o||null).none}_renderTypeChip(t,e){if(!this._types.length)return"";const r=this._types.find(i=>i.id===t.type),o=this._invalid(e);return s`<button
      class="type-chip ${r?"":"untyped"} ${o?"bad":""}"
      tabindex="-1"
      title="${o?"This type is not allowed here. Click to change.":"Content type (click to change)"}"
      aria-label="Content type: ${r?r.label:"none"}${o?", not allowed here":""}. Change"
      @mousedown="${i=>i.preventDefault()}"
      @click="${i=>{i.stopPropagation();const n=i.currentTarget.getBoundingClientRect(),d=this.shadowRoot.querySelector(".dialog").getBoundingClientRect();this._typeMenu={id:t.id,index:e,x:n.right-d.left,y:n.bottom-d.top+4}}}"
    >
      ${r?.icon?s`<simple-icon-lite icon="${r.icon}"></simple-icon-lite>`:""}${r?r.label:"No type"}
    </button>`}_renderTypeMenu(){const t=this._typeMenu,e=this._index(t.id);if(e<0)return"";const r=this._rows[e],{types:o,untyped:i}=this._rowAllowed(e);return s`<div class="menu-layer" @click="${()=>this._typeMenu=null}">
      <div
        class="type-menu"
        role="menu"
        aria-label="Content type"
        style="left:${t.x}px;top:${t.y}px"
        @click="${n=>n.stopPropagation()}"
        @keydown="${n=>{const d=[...n.currentTarget.querySelectorAll("[role=menuitemradio]")],l=d.indexOf(this.shadowRoot.activeElement);if(n.key==="ArrowDown")d[(l+1)%d.length]?.focus();else if(n.key==="ArrowUp")d[(l-1+d.length)%d.length]?.focus();else if(n.key==="Escape")this._typeMenu=null;else return;n.preventDefault(),n.stopPropagation()}}"
      >
        <div class="menu-label">Content type</div>
        ${i?s`<button role="menuitemradio" aria-checked="${r.type?"false":"true"}" @click="${()=>this._setType(r.id,"")}">
              <span class="check">${r.type?"":k("oer:check","sm")}</span>No type
            </button>`:""}
        ${o.map(n=>s`<button role="menuitemradio" aria-checked="${n.id===r.type?"true":"false"}" @click="${()=>this._setType(r.id,n.id)}">
            <span class="check">${n.id===r.type?k("oer:check","sm"):""}</span>
            ${n.icon?s`<simple-icon-lite icon="${n.icon}"></simple-icon-lite>`:s`<span class="ph"></span>`}${n.label}
          </button>`)}
        ${!o.length&&!i?s`<div class="menu-empty">Nothing is allowed here.</div>`:""}
      </div>
    </div>`}updated(t){if(t.has("_typeMenu")&&this._typeMenu){const e=this.shadowRoot.querySelector(".type-menu");if(!e)return;const r=this.shadowRoot.querySelector(".dialog").getBoundingClientRect(),o=e.getBoundingClientRect();o.bottom>r.bottom-8&&(e.style.top=`${Math.max(8,this._typeMenu.y-o.height-36)}px`),(e.querySelector("[aria-checked=true]")||e.querySelector("[role=menuitemradio]"))?.focus()}}_renderIndent(t,e,r,o){const i=[],n=this._closingRows(r,o);for(let h=1;h<=t.depth;h++)if(h<t.depth){const p=this._nextSiblingAtDepth(e,h)||this._hasClosingAddAtDepth(r,o,h);i.push(s`<div class="col">${p?s`<div class="line full ${this._columnHighlighted(t.id,h)?"hl":""}"></div>`:""}</div>`)}else{const p=this._isSibling(t.id)?"hl":"",c=this._nextSiblingAtDepth(e,h)||n.some(m=>m.depth===h);i.push(s`<div class="col">
          <div class="line top ${p}"></div>
          ${c?s`<div class="line bottom ${p}"></div>`:""}
          <div class="hline ${p}"></div>
        </div>`)}const d=this._drag,l=d?.id===t.id&&d.previewDepth!==null?d.previewDepth:t.depth;return s`<div class="indent" style="width:${l*H}px">${i}</div>`}_renderRow(t,e,r,o){const i=this._drag,n=this._hasChildren(e),d=this._collapsed.has(t.id),l=this._isSibling(t.id),h=this._editing===t.id,p=d?this._subtree(e).end-e-1:0,c=["row",i?.id===t.id?"dragging":"",i?.overId===t.id&&i.id!==t.id&&i.position==="child"?"child-target":"",this._longPress===t.id?"pressing":"",this._invalid(e)?"invalid":""].join(" ");return s`<div
      class="${c}"
      role="treeitem"
      tabindex="0"
      data-id="${t.id}"
      aria-level="${t.depth+1}"
      aria-expanded="${n?String(!d):""}"
      aria-label="${t.title||"Untitled page"}"
      draggable="${h?"false":"true"}"
      @keydown="${m=>this._rowKeys(m,t,e,r)}"
      @pointerdown="${()=>this._pointerDown(t,e)}"
      @pointerup="${this._cancelLongPress}"
      @pointerleave="${this._cancelLongPress}"
      @dragstart="${m=>this._dragStart(m,t)}"
      @dragend="${this._dragEnd}"
      @dragover="${m=>this._dragOver(m,t)}"
      @dragleave="${m=>this._dragLeave(m,t)}"
      @drop="${m=>this._drop(m,t)}"
    >
      ${i?.overId===t.id&&i.id!==t.id&&i.position!=="child"?s`<div class="dropline ${i.position}">
            <div class="bar"></div>
            <div class="dot" style="left:${13+(i.previewDepth??0)*H}px"></div>
          </div>`:""}
      ${this._renderIndent(t,e,r,o)}
      <div class="toggle">
        ${n?s`<button
              class="chev ${l?"hl-ring":""}"
              tabindex="-1"
              aria-label="${d?"Expand":"Collapse"}"
              @click="${m=>{m.stopPropagation(),this._toggle(t.id)}}"
            >
              ${k(d?"oer:chevron-right":"oer:chevron-down","sm")}
            </button>`:s`<div class="leaf ${l?"hl":""}"></div>`}
      </div>
      ${this._showIcons?s`<button
            class="icon-btn ${t.icon?"":"unset"}"
            tabindex="-1"
            title="${t.icon?`Icon: ${t.icon} (click to change)`:"Set icon"}"
            aria-label="${t.icon?"Change icon":"Set icon"}"
            @click="${m=>{m.stopPropagation(),this._chooseIcon(t)}}"
          >
            ${t.icon?s`<simple-icon-lite icon="${t.icon}"></simple-icon-lite>`:k("oer:smile-plus","sm")}
          </button>`:""}
      ${h?s`<input
            class="edit"
            data-edit="${t.id}"
            .value="${t.title}"
            placeholder="${t.depth===0?"Page title\u2026":"Sub-page title\u2026"}"
            aria-label="Page title"
            @input="${m=>this._rename(t.id,m.target.value)}"
            @keydown="${m=>this._editKeys(m,t)}"
            @blur="${()=>this._editing===t.id&&this._stopEdit(!1)}"
          />`:s`<div class="title" @dblclick="${()=>this._startEdit(t.id)}">
            ${t.title?s`<span class="${t.depth===0?"top":"nested"}">${t.title}</span>`:s`<span class="placeholder">${t.depth===0?"Page title\u2026":"Sub-page title\u2026"}</span>`}
            ${t.orig?"":s`<span class="new-badge">New</span>`}
          </div>`}
      <button
        class="act ${h?"always":"hover-only"}"
        tabindex="-1"
        title="${h?"Done":"Rename"}"
        aria-label="${h?"Done renaming":"Rename"}"
        @mousedown="${m=>m.preventDefault()}"
        @click="${m=>{m.stopPropagation(),h?this._stopEdit():this._startEdit(t.id)}}"
      >
        ${k(h?"oer:check":"icons:create","sm")}
      </button>
      ${this._renderTypeChip(t,e)}
      ${p>0?s`<span class="badge">${p}</span>`:""}
      <div class="hover-only">
        ${t.depth<B&&!this._allowedUnder(t.type||null).none?s`<button
              class="act"
              tabindex="-1"
              title="Add sub-page"
              aria-label="Add sub-page"
              @click="${m=>{m.stopPropagation(),this._addChild(t.id)}}"
            >
              ${k("oer:plus","sm")}
            </button>`:""}
        <button
          class="act danger"
          tabindex="-1"
          title="Delete"
          aria-label="Delete"
          @click="${m=>{m.stopPropagation(),this._remove(t.id)}}"
        >
          ${k("oer:trash-2","sm")}
        </button>
      </div>
    </div>`}_renderAddRow(t,e,r){const o=this._closingRows(e,r),i=[];for(let n=1;n<=t.depth;n++)if(n<t.depth){const d=this._nextSiblingAtDepth(t.index,n)||o.some(l=>l.depth===n);i.push(s`<div class="col">${d?s`<div class="line full ${this._columnHighlighted(t.afterId,n)?"hl":""}"></div>`:""}</div>`)}else i.push(s`<div class="col"><div class="line top"></div><div class="hline"></div></div>`);return s`<button
      class="add"
      title="Add a page here"
      @mouseenter="${()=>this._hoverAdd={afterId:t.afterId,depth:t.depth}}"
      @mouseleave="${()=>this._hoverAdd=null}"
      @focus="${()=>this._hoverAdd={afterId:t.afterId,depth:t.depth}}"
      @blur="${()=>this._hoverAdd=null}"
      @click="${()=>{this._hoverAdd=null,this._addAfter(t.afterId,t.depth)}}"
    >
      <div class="indent" style="width:${t.depth*H}px">${i}</div>
      <div class="toggle">
        <div class="leaf"></div>
        <span class="plus">${k("oer:plus","sm")}</span>
      </div>
      <span class="label">Add page</span>
    </button>`}render(){if(!this.open)return s``;const t=this._visible(),e=this._rows.filter(d=>d.depth===0).length,r=this._rows.some((d,l)=>this._hasChildren(l)),o=this._dirty,i=this._deleted.size,n=this._rows.filter((d,l)=>this._invalid(l)).length;return s`
      <div class="backdrop" @click="${this._requestClose}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${k("hax:site-map")}${this._rootItem?`${this._rootItem.title} outline`:"Site outline"}</h2>
            <p class="sub">
              ${this._rootItem?"Sub-pages of this page.":"Every page in the site."} Changes apply when you save.
            </p>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._requestClose}">${k("oer:x")}</button>
        </header>
        <div class="tools">
            ${r?s`<button class="tool" @click="${this._collapseAll}">${k("oer:chevron-right","sm")}Collapse all</button>
                  <button class="tool" @click="${()=>this._collapsed=new Set}">${k("oer:chevron-down","sm")}Expand all</button>`:""}
            <button class="tool" aria-pressed="${this._showIcons?"true":"false"}" @click="${()=>this._showIcons=!this._showIcons}">
              ${k(this._showIcons?"icons:visibility":"icons:visibility-off","sm")}Icons
            </button>
            <span class="count">${e} top-level · ${this._rows.length} page${this._rows.length===1?"":"s"}</span>
        </div>
        <div class="body">
          ${this._rows.length?s`<div class="tree" role="tree" aria-label="Pages">
                ${t.map(({row:d,index:l},h)=>s`${this._renderRow(d,l,t,h)}
                  ${this._closingRows(t,h).filter(p=>!this._levelClosed(p)).map(p=>this._renderAddRow(p,t,h))}`)}
              </div>`:s`<div class="empty">
                ${k("hax:site-map")}
                <p>No pages yet</p>
                <button class="btn outline" @click="${this._addFirst}">${k("oer:plus","sm")}Add page</button>
              </div>`}
        </div>
        <footer>
          ${this._confirmDiscard?s`<span class="warn">Discard your outline changes?</span>
                <button class="btn outline" @click="${()=>this._confirmDiscard=!1}">Keep editing</button>
                <button class="btn destructive" @click="${this._close}">Discard</button>`:s`${n?s`<span class="warn">${n} page${n===1?" is":"s are"} in a place ${n===1?"its":"their"} type isn't allowed. Change the type or move ${n===1?"it":"them"}.</span>`:i?s`<span class="warn">${i} page${i===1?"":"s"} will be deleted when you save.</span>`:s`<div class="hints" aria-hidden="true">
                      <span><kbd>↵</kbd> rename</span><span><kbd>⇥</kbd> indent</span><span><kbd>⇧⇥</kbd> outdent</span>
                      <span><kbd>⌥↑↓</kbd> move</span><span><kbd>↑↓</kbd> navigate</span><span><kbd>←→</kbd> collapse</span>
                      <span>drag ↔ to change level</span>
                    </div>`}
                <button class="btn outline" @click="${this._requestClose}">Cancel</button>
                <button
                  class="btn primary"
                  aria-disabled="${o&&!n?"false":"true"}"
                  @click="${()=>o&&!n&&this._save()}"
                >
                  Save outline
                </button>`}
        </footer>
        ${this._typeMenu?this._renderTypeMenu():""}
      </div>
    `}};customElements.define(t2.tag,t2);function at(){const a=globalThis.document;return a.querySelector(t2.tag)||a.body.appendChild(a.createElement(t2.tag))}const F=(a,t="")=>s`<span class="lucide ${t}" aria-hidden="true" style="--src:url(&quot;${x[a]||""}&quot;)"></span>`,I=a=>JSON.parse(JSON.stringify(a));let e2=class extends y{static get tag(){return"oer-type-editor"}static get properties(){return{open:{type:Boolean,reflect:!0},_types:{state:!0},_selected:{state:!0},_expanded:{state:!0},_confirm:{state:!0},_io:{state:!0},_ioText:{state:!0},_ioError:{state:!0},_saving:{state:!0},_dragField:{state:!0}}}constructor(){super(),this.open=!1,this._types=[],this._selected=0,this._expanded=new Set,this._confirm=!1,this._io=null,this._ioText="",this._ioError="",this._saving=!1,this._dragField=null,this.__keys=t=>{!this.open||t.key!=="Escape"||be()||(t.preventDefault(),t.stopPropagation(),this._io?this._io=null:this._requestClose())}}show(){this._types=I(T().types).map(t=>({...t,fields:t.fields.map(e=>({...e,__saved:!0}))})),this._usage=pe(),this._savedIds=new Set(this._types.map(t=>t.id)),this._snapshot=JSON.stringify(this._clean(this._types)),this._selected=0,this._expanded=new Set,this._confirm=!1,this._io=null,this.open=!0,globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector(".types button")?.focus())}_close(){this.open=!1,globalThis.removeEventListener("keydown",this.__keys,!0)}get _dirty(){return JSON.stringify(this._clean(this._types))!==this._snapshot}_requestClose(){if(this._dirty&&!this._confirm){this._confirm=!0;return}this._close()}_problems(){const t=[],e=new Set;for(const r of this._types){r.label.trim()||t.push("Every type needs a name."),e.has(r.id)&&t.push(`Two types share the ID \u201C${r.id}\u201D.`),e.add(r.id);const o=new Set;for(const i of r.fields)i.label.trim()||t.push(`${r.label||"A type"}: every field needs a label.`),o.has(i.name)&&t.push(`${r.label}: two fields share the key \u201C${i.name}\u201D.`),o.add(i.name),i.kind==="select"&&!(i.options||[]).length&&t.push(`${r.label}: \u201C${i.label}\u201D needs at least one choice.`)}return[...new Set(t)]}_update(t){const e=I(this._types);t(e[this._selected],e),this._types=e,this._confirm=!1}_addType(){const t=I(this._types);let e="new-type";for(let r=2;t.some(o=>o.id===e);r++)e=`new-type-${r}`;t.push({id:e,label:"New type",icon:"",description:"",children:null,fields:[]}),this._types=t,this._selected=t.length-1,this.updateComplete.then(()=>{const r=this.shadowRoot.querySelector("#type-label");r?.focus(),r?.select()})}_deleteType(){const t=this._types[this._selected];if(!t||this._usage.get(t.id))return;const e=I(this._types).filter((r,o)=>o!==this._selected);for(const r of e)Array.isArray(r.children)&&(r.children=r.children.filter(o=>o!==t.id));this._types=e,this._selected=Math.max(0,this._selected-1)}_idLocked(t){return this._savedIds.has(t.id)&&(this._usage.get(t.id)||0)>0}_setLabel(t){this._update(e=>{!this._idLocked(e)&&!e.__idTouched&&!this._savedIds.has(e.id)&&(e.id=W2(t)),e.label=t})}async _chooseIcon(){const t=this._types[this._selected],e=await it().pick(t.icon);e!==null&&this._update(r=>r.icon=e)}_setChildrenMode(t){this._update(e=>{t==="any"?e.children=null:t==="none"?e.children=[]:e.children=Array.isArray(e.children)&&e.children.length?e.children:[],e.__only=t==="only"})}_toggleChild(t){this._update(e=>{const r=new Set(e.children||[]);r.has(t)?r.delete(t):r.add(t),e.children=[...r],e.__only=!0})}_addField(){this._update(t=>{let e="newField";for(let r=2;t.fields.some(o=>o.name===e);r++)e=`newField${r}`;t.fields.push({name:e,label:"",kind:"text"})}),this.updateComplete.then(()=>{const t=this.shadowRoot.querySelectorAll(".field-label");t[t.length-1]?.focus()})}_setField(t,e){this._update(r=>{const o=r.fields[t];"label"in e&&!o.__nameTouched&&!o.__saved&&(o.name=ce(e.label)),Object.assign(o,e),o.kind!=="select"&&delete o.options;for(const i of Object.keys(o))(o[i]===!1||o[i]==="")&&i!=="label"&&i!=="name"&&delete o[i]})}_moveField(t,e){this._update(r=>{const o=t+e;if(o<0||o>=r.fields.length)return;const[i]=r.fields.splice(t,1);r.fields.splice(o,0,i)}),this.updateComplete.then(()=>this.shadowRoot.querySelectorAll(".grip")[t+e]?.focus())}_removeField(t){this._update(e=>e.fields.splice(t,1))}_toggleExpanded(t){const e=new Set(this._expanded);e.has(t)?e.delete(t):e.add(t),this._expanded=e}_clean(t){return JSON.parse(JSON.stringify(t,(e,r)=>e.startsWith("__")?void 0:r))}async _save(){!this._dirty||this._problems().length||this._saving||(this._saving=!0,await me({version:1,types:this._clean(this._types)}),this._saving=!1,this._close())}_openExport(){this._ioText=JSON.stringify({version:1,types:this._clean(this._types)},null,2),this._ioError="",this._io="export"}_openImport(){this._ioText="",this._ioError="",this._io="import"}_import(){try{const t=JSON.parse(this._ioText),e=Array.isArray(t)?t:t.types;if(!Array.isArray(e)||e.some(o=>!o.id||!o.label||!Array.isArray(o.fields)))throw new Error("Expected { types: [{ id, label, fields: [] }, \u2026] }");const r=I(this._types);for(const o of e){const i=r.findIndex(n=>n.id===o.id);i>=0?r[i]=o:r.push(o)}this._types=r,this._io=null}catch(t){this._ioError=t.message}}static get styles(){return u`
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
      ${this._types.map((t,e)=>s`<button aria-current="${e===this._selected?"true":"false"}" @click="${()=>this._selected=e}">
          ${t.icon?s`<simple-icon-lite icon="${t.icon}"></simple-icon-lite>`:s`<span class="no-icon"></span>`}
          <span class="name">${t.label||"Untitled type"}</span>
          ${this._usage.get(t.id)?s`<span class="count" title="Pages of this type">${this._usage.get(t.id)}</span>`:""}
        </button>`)}
      <button class="new" @click="${this._addType}">${F("oer:plus","sm")}New type</button>
    </nav>`}_renderField(t,e,r){const o=`${t.id}:${r}`,i=this._expanded.has(o),n=this._dragField,d=n&&n.over===r&&n.from!==r?n.before?"over-before":"over-after":"";return s`<div
        class="field ${d}"
        @dragover="${l=>{if(!this._dragField)return;l.preventDefault();const h=l.currentTarget.getBoundingClientRect();this._dragField={...this._dragField,over:r,before:l.clientY<h.top+h.height/2}}}"
        @drop="${l=>{l.preventDefault();const h=this._dragField;h&&(this._update(p=>{const[c]=p.fields.splice(h.from,1);let m=h.over>h.from?h.over-1:h.over;h.before||m++,p.fields.splice(m,0,c)}),this._dragField=null)}}"
      >
        <button
          class="grip"
          draggable="true"
          title="Drag to reorder (or Alt+↑/↓)"
          aria-label="Reorder ${e.label||"field"}: Alt+Up or Alt+Down"
          @dragstart="${l=>{l.dataTransfer.effectAllowed="move",l.dataTransfer.setData("text/plain",String(r)),this._dragField={from:r,over:r,before:!0}}}"
          @dragend="${()=>this._dragField=null}"
          @keydown="${l=>{l.altKey&&(l.key==="ArrowUp"||l.key==="ArrowDown")&&(l.preventDefault(),this._moveField(r,l.key==="ArrowUp"?-1:1))}}"
        >
          ${F("oer:grip-vertical","sm")}
        </button>
        <input
          class="input field-label"
          placeholder="Field label"
          aria-label="Field label"
          .value="${e.label}"
          @input="${l=>this._setField(r,{label:l.target.value})}"
        />
        <select aria-label="Field kind" @change="${l=>this._setField(r,{kind:l.target.value})}">
          ${he.map(l=>s`<option value="${l.kind}" ?selected="${l.kind===e.kind}">${l.label}</option>`)}
        </select>
        <div class="center">
          <input type="checkbox" aria-label="Required" .checked="${!!e.required}" @change="${l=>this._setField(r,{required:l.target.checked})}" />
        </div>
        <div class="center">
          <input type="checkbox" aria-label="Show in page header" .checked="${!!e.header}" @change="${l=>this._setField(r,{header:l.target.checked})}" />
        </div>
        <div class="acts">
          <button class="icon-act" aria-expanded="${i?"true":"false"}" title="More settings" aria-label="More settings for ${e.label||"field"}" @click="${()=>this._toggleExpanded(o)}">
            ${F("oer:chevron-right","sm")}
          </button>
          <button class="icon-act danger" title="Remove field" aria-label="Remove ${e.label||"field"}" @click="${()=>this._removeField(r)}">
            ${F("oer:trash-2","sm")}
          </button>
        </div>
      </div>
      ${i?s`<div class="more">
            <div>
              <label for="key-${r}">Key</label>
              <input
                id="key-${r}"
                class="input mono"
                .value="${e.name}"
                @input="${l=>this._setField(r,{name:l.target.value.replace(/[^A-Za-z0-9_]/g,""),__nameTouched:!0})}"
              />
              <p class="hint">Stored name of the value. Changing it hides values saved under the old key.</p>
            </div>
            <div>
              <label for="help-${r}">Help text</label>
              <input id="help-${r}" class="input" .value="${e.help||""}" @input="${l=>this._setField(r,{help:l.target.value})}" />
            </div>
            ${e.kind==="select"?s`<div class="wide">
                  <label for="opts-${r}">Choices</label>
                  <textarea
                    id="opts-${r}"
                    .value="${(e.options||[]).map(l=>l.label&&l.label!==l.value?`${l.value} | ${l.label}`:l.value).join(`
`)}"
                    @change="${l=>this._setField(r,{options:l.target.value.split(`
`).map(h=>h.trim()).filter(Boolean).map(h=>{const[p,c]=h.split("|").map(m=>m.trim());return{value:p,label:c||p}})})}"
                  ></textarea>
                  <p class="hint">One per line. Use “value | Label” when the stored value differs from what people see.</p>
                </div>`:""}
          </div>`:""}`}_renderEditor(){const t=this._types[this._selected];if(!t)return s`<div class="empty-editor"><div><p>No content types yet.</p><button class="btn outline" @click="${this._addType}">${F("oer:plus","sm")}New type</button></div></div>`;const e=this._idLocked(t),r=this._usage.get(t.id)||0,o=t.children===null||t.children===void 0?"any":t.children.length||t.__only?"only":"none";return s`<div class="editor">
      <section>
        <div class="row">
          <div>
            <label for="type-label">Name</label>
            <input id="type-label" class="input" .value="${t.label}" @input="${i=>this._setLabel(i.target.value)}" />
          </div>
          <div>
            <label for="type-id">ID</label>
            <input
              id="type-id"
              class="input mono"
              .value="${t.id}"
              ?readonly="${e}"
              @input="${i=>this._update(n=>{n.id=W2(i.target.value),n.__idTouched=!0})}"
            />
          </div>
          <div>
            <span class="label">Icon</span>
            <button class="icon-choice" @click="${this._chooseIcon}" aria-label="Choose icon">
              ${t.icon?s`<simple-icon-lite icon="${t.icon}"></simple-icon-lite>`:F("oer:smile-plus")}${t.icon?"Change":"Choose"}
            </button>
          </div>
        </div>
        ${e?s`<p class="hint">The ID is fixed because ${r} page${r===1?" uses":"s use"} this type.</p>`:""}
        <div style="margin-top:1rem">
          <label for="type-desc">Description</label>
          <textarea id="type-desc" .value="${t.description||""}" @input="${i=>this._update(n=>n.description=i.target.value)}"></textarea>
        </div>
      </section>

      <section>
        <h3>Can contain</h3>
        <div class="radios" role="radiogroup" aria-label="Can contain">
          <label><input type="radio" name="children" .checked="${o==="any"}" @change="${()=>this._setChildrenMode("any")}" />Any type</label>
          <label><input type="radio" name="children" .checked="${o==="only"}" @change="${()=>this._setChildrenMode("only")}" />Only these types</label>
          <label><input type="radio" name="children" .checked="${o==="none"}" @change="${()=>this._setChildrenMode("none")}" />Nothing</label>
        </div>
        ${o==="only"?s`<div class="chips">
              ${this._types.map(i=>s`<button class="chip" aria-pressed="${(t.children||[]).includes(i.id)?"true":"false"}" @click="${()=>this._toggleChild(i.id)}">
                  ${(t.children||[]).includes(i.id)?F("oer:check","sm"):""}${i.label||i.id}
                </button>`)}
            </div>`:""}
        <p class="hint">
          ${o==="any"?"Pages of this type can hold pages of any type.":o==="none"?"Pages of this type end the outline: no pages can go inside them.":"Add page and the outline builder only offer these types inside this one."}
        </p>
      </section>

      <section>
        <h3>Fields</h3>
        <div class="fields">
          <div class="fhead" aria-hidden="true">
            <span></span><span>Label</span><span>Kind</span><span style="text-align:center">Required</span><span style="text-align:center">In header</span><span></span>
          </div>
          ${t.fields.length?t.fields.map((i,n)=>this._renderField(t,i,n)):s`<div class="nofields">No fields yet. Every page also has a title, description and tags.</div>`}
          <button class="add" @click="${this._addField}">${F("oer:plus","sm")}Add field</button>
        </div>
        <p class="hint">“In header” fields show at the top of each page of this type.</p>
      </section>

      <section class="danger-zone">
        <button class="btn danger-outline" aria-disabled="${r?"true":"false"}" @click="${this._deleteType}">${F("oer:trash-2","sm")}Delete type</button>
        <span>${r?`Used by ${r} page${r===1?"":"s"}; change their type first.`:"Not used by any page."}</span>
      </section>
    </div>`}_renderIO(){const t=this._io==="import";return s`<div class="io">
      <div class="io-box" role="dialog" aria-label="${t?"Import":"Export"} content types">
        <h3>${t?"Import content types":"Export content types"}</h3>
        <p class="hint" style="margin:0">
          ${t?"Paste definitions (JSON). Types with the same ID are replaced; others are added. Nothing is saved until you save the editor.":"Copy these definitions to reuse them in another site."}
        </p>
        <textarea .value="${this._ioText}" ?readonly="${!t}" @input="${e=>this._ioText=e.target.value}"></textarea>
        ${this._ioError?s`<p class="status error">${this._ioError}</p>`:""}
        <div class="io-foot">
          <button class="btn outline" @click="${()=>this._io=null}">${t?"Cancel":"Close"}</button>
          ${t?s`<button class="btn primary" @click="${this._import}">Import</button>`:s`<button class="btn primary" @click="${()=>globalThis.navigator.clipboard?.writeText(this._ioText)}">Copy</button>`}
        </div>
      </div>
    </div>`}render(){if(!this.open)return s``;const t=this._problems(),e=this._dirty;return s`
      <div class="backdrop" @click="${this._requestClose}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${F("hax:templates")}Content types</h2>
            <p class="sub">The kinds of page this site uses, their fields, and what each can contain.</p>
          </div>
          <button class="ghost" @click="${this._openImport}">${F("icons:file-upload","sm")}Import</button>
          <button class="ghost" @click="${this._openExport}">${F("icons:file-download","sm")}Export</button>
          <button class="ghost x" aria-label="Close" title="Close (Esc)" @click="${this._requestClose}">${F("oer:x")}</button>
        </header>
        <div class="body">${this._renderTypeList()}${this._renderEditor()}</div>
        <footer>
          ${this._confirm?s`<span class="status error">Discard your changes to content types?</span>
                <button class="btn outline" @click="${()=>this._confirm=!1}">Keep editing</button>
                <button class="btn destructive" @click="${this._close}">Discard</button>`:s`<span class="status ${t.length?"error":""}">
                  ${t.length?t[0]:e?"Unsaved changes.":`${this._types.length} type${this._types.length===1?"":"s"}.`}
                </span>
                <button class="btn outline" @click="${this._requestClose}">Cancel</button>
                <button class="btn primary" aria-disabled="${!e||t.length||this._saving?"true":"false"}" @click="${this._save}">
                  ${this._saving?"Saving\u2026":"Save content types"}
                </button>`}
        </footer>
        ${this._io?this._renderIO():""}
      </div>
    `}};customElements.define(e2.tag,e2);const be=()=>!!globalThis.document.querySelector("oer-icon-picker[open]");function xe(){const a=globalThis.document;return a.querySelector(e2.tag)||a.body.appendChild(a.createElement(e2.tag))}const u2=(a,t="")=>s`<span class="lucide ${t}" aria-hidden="true" style="--src:url(&quot;${x[a]||""}&quot;)"></span>`,g2=a=>a==null||a===""||Array.isArray(a)&&!a.filter(t=>String(t).trim()).length;class r2 extends y{static get tag(){return"oer-page-details"}static get properties(){return{open:{type:Boolean,reflect:!0},_type:{state:!0},_desc:{state:!0},_values:{state:!0},_saving:{state:!0},_tried:{state:!0}}}constructor(){super(),this.open=!1,this._values={},this.__keys=t=>{this.open&&t.key==="Escape"&&(t.preventDefault(),t.stopPropagation(),this._close())}}show(t){const e=b(w.manifest?.items)||[],r=e.find(i=>i.id===t);if(!r)return;this._item=r;const o=r.parent?e.find(i=>i.id===r.parent):null;this._allowed=Y2(o?.metadata?.pageType||null,e),this._allTypes=T(e).types,this._type=r.metadata?.pageType||"",this._desc=r.description||"",this._values={...r.metadata?.oerFields||{}},this._tried=!1,this._saving=!1,this.open=!0,globalThis.addEventListener("keydown",this.__keys,!0),this.updateComplete.then(()=>this.shadowRoot.querySelector("select, input, textarea")?.focus())}_close(){this.open=!1,globalThis.removeEventListener("keydown",this.__keys,!0)}get _typeDef(){return this._allTypes?.find(t=>t.id===this._type)||null}_set(t,e){this._values={...this._values,[t]:e}}_missing(){return(this._typeDef?.fields||[]).filter(t=>t.required&&g2(this._values[t.name]))}async _save(){if(this._tried=!0,this._missing().length||this._saving)return;this._saving=!0;const t={};for(const e of this._typeDef?.fields||[]){let r=this._values[e.name];e.kind==="list"&&(r=(r||[]).map(o=>String(o).trim()).filter(Boolean)),e.kind==="number"&&r!==""&&r!==void 0&&(r=Number(r)),(!g2(r)||e.kind==="boolean")&&(t[e.name]=e.kind==="boolean"?!!r:r)}await ge(this._item.id,{pageType:this._type,description:this._desc.trim(),fields:t}),this._saving=!1,this._close()}static get styles(){return u`
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
    `}_renderField(t){const e=`f-${t.name}`,r=this._values[t.name],o=this._tried&&t.required&&g2(r),i=s`<label for="${e}">${t.label}${t.required?s` <span class="req" aria-hidden="true">*</span>`:""}</label>`,n=t.help?s`<p class="hint" id="${e}-help">${t.help}</p>`:"",d=o?s`<p class="err">${t.label} is required.</p>`:"",l={invalid:o};let h;switch(t.kind){case"longtext":h=s`<textarea id="${e}" class="${o?"invalid":""}" .value="${r||""}" @input="${p=>this._set(t.name,p.target.value)}"></textarea>`;break;case"select":h=s`<select id="${e}" class="${o?"invalid":""}" @change="${p=>this._set(t.name,p.target.value)}">
          <option value="" ?selected="${!r}">—</option>
          ${(t.options||[]).map(p=>s`<option value="${p.value}" ?selected="${p.value===r}">${p.label}</option>`)}
        </select>`;break;case"boolean":return s`<div>
          <label class="check"><input id="${e}" type="checkbox" .checked="${!!r}" @change="${p=>this._set(t.name,p.target.checked)}" />${t.label}</label>
          ${n}
        </div>`;case"list":{const p=Array.isArray(r)?r:r?[r]:[],c=p.length?p:[""];return h=s`<div class="list" role="group" aria-labelledby="${e}-l">
          ${c.map((m,v)=>s`<div class="list-row">
              <input
                class="input ${o?"invalid":""}"
                id="${v===0?e:`${e}-${v}`}"
                aria-label="${t.label} ${v+1}"
                .value="${m}"
                @input="${C=>{const j=[...c];j[v]=C.target.value,this._set(t.name,j)}}"
                @keydown="${C=>{if(C.key==="Enter"){C.preventDefault();const j=[...c];j.splice(v+1,0,""),this._set(t.name,j),this.updateComplete.then(()=>this.shadowRoot.getElementById(`${e}-${v+1}`)?.focus())}}}"
              />
              <button
                class="icon-act"
                title="Remove"
                aria-label="Remove ${t.label} ${v+1}"
                @click="${()=>this._set(t.name,c.filter((C,j)=>j!==v))}"
              >
                ${u2("oer:x","sm")}
              </button>
            </div>`)}
          <button class="add-item" @click="${()=>this._set(t.name,[...c,""])}">${u2("oer:plus","sm")}Add ${t.label.toLowerCase()}</button>
        </div>`,s`<div><span class="label" id="${e}-l">${t.label}${t.required?s` <span class="req">*</span>`:""}</span>${h}${n}${d}</div>`}default:{const p={number:"number",date:"date",url:"url",image:"url"}[t.kind]||"text",c=t.kind==="date"&&r?String(r).slice(0,10):r??"";h=s`<input id="${e}" class="input ${l.invalid?"invalid":""}" type="${p}" .value="${c}" @input="${m=>this._set(t.name,m.target.value)}" />`}}return s`<div>${i}${h}${n}${d}</div>`}render(){if(!this.open)return s``;const t=this._typeDef,e=this._tried?this._missing():[],r=this._allowed||[],o=t&&!r.some(i=>i.id===t.id)?[...r,t]:r;return s`
      <div class="backdrop" @click="${this._close}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">Page details</h2>
            <p class="sub">${this._item.title}</p>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._close}">${u2("oer:x")}</button>
        </header>
        <div class="body">
          <div>
            <label for="ptype">Content type</label>
            <select id="ptype" @change="${i=>this._type=i.target.value}">
              <option value="" ?selected="${!this._type}">No type</option>
              ${o.map(i=>s`<option value="${i.id}" ?selected="${i.id===this._type}">${i.label}</option>`)}
            </select>
            ${t?.description?s`<p class="hint">${t.description}</p>`:""}
          </div>
          <div>
            <label for="pdesc">Description</label>
            <textarea id="pdesc" .value="${this._desc}" @input="${i=>this._desc=i.target.value}"></textarea>
            <p class="hint">Shown under the title and in search results.</p>
          </div>
          ${t?s`<div class="sep" role="separator"></div>
                ${t.fields.length?t.fields.map(i=>this._renderField(i)):s`<p class="notype">${t.label} has no fields of its own.</p>`}`:""}
        </div>
        <footer>
          <span class="status">${e.length?`Fill in: ${e.map(i=>i.label).join(", ")}`:""}</span>
          <button class="btn outline" @click="${this._close}">Cancel</button>
          <button class="btn primary" aria-disabled="${this._saving?"true":"false"}" @click="${this._save}">${this._saving?"Saving\u2026":"Save details"}</button>
        </footer>
      </div>
    `}}customElements.define(r2.tag,r2);function nt(){const a=globalThis.document;return a.querySelector(r2.tag)||a.body.appendChild(a.createElement(r2.tag))}const ke=a=>s`<span class="lucide" aria-hidden="true" style="--src:url(&quot;${x[a]||""}&quot;)"></span>`,Fe=a=>a!=null&&a!==""&&!(Array.isArray(a)&&!a.length);class st extends y{static get tag(){return"oer-page-header"}static get properties(){return{editable:{type:Boolean},_item:{state:!0},_types:{state:!0}}}constructor(){super(),this.editable=!1,this._item=null,this._types=[]}connectedCallback(){super.connectedCallback(),this.__dispose=z(()=>{const t=b(w.activeItem),e=b(w.manifest?.items)||[];Promise.resolve().then(()=>{this._item=t&&e.find(r=>r.id===t.id)||t,this._types=T(e).types})})}disconnectedCallback(){this.__dispose?.(),super.disconnectedCallback()}static get styles(){return u`
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
      .pill b {
        font-weight: 500;
        color: var(--foreground);
      }
      .edit {
        all: unset;
        margin-left: auto;
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
    `}_short(t,e){if(t.kind==="boolean")return e?"Yes":"No";if(t.kind==="select")return(t.options||[]).find(r=>r.value===e)?.label||e;if(t.kind==="date"){const r=new Date(e);return Number.isNaN(r.getTime())?e:r.toLocaleDateString()}return e}render(){const t=this._item,e=t?.metadata?.pageType;if(!t||e===Z)return s``;const r=this._types.find(l=>l.id===e),o=t.metadata?.oerFields||{},i=(r?.fields||[]).filter(l=>l.header&&Fe(o[l.name])),n=i.filter(l=>["text","number","select","boolean","date"].includes(l.kind)),d=i.filter(l=>!n.includes(l));return!r&&!this.editable?s``:s`
      <div class="meta">
        ${r?s`<span class="type">${r.icon?s`<simple-icon-lite icon="${r.icon}"></simple-icon-lite>`:""}${r.label}</span>`:""}
        ${n.map(l=>s`<span class="pill">${l.label} <b>${this._short(l,o[l.name])}</b></span>`)}
        ${this.editable?s`<button class="edit" @click="${()=>nt().show(t.id)}">${ke("image:tune")}${r?"Edit details":"Set page type"}</button>`:""}
      </div>
      ${r&&t.description?s`<p class="desc">${t.description}</p>`:""}
      ${d.length?s`<div class="blocks">
            ${d.map(l=>{const h=o[l.name];return s`<section class="block">
                <h2>${l.label}</h2>
                ${l.kind==="list"?s`<ul>${(Array.isArray(h)?h:[h]).map(p=>s`<li>${p}</li>`)}</ul>`:l.kind==="image"?s`<img src="${h}" alt="" />`:l.kind==="url"?s`<p><a href="${h}">${h}</a></p>`:s`<p>${h}</p>`}
              </section>`})}
          </div>`:""}
    `}}customElements.define(st.tag,st);const lt=i2(`url("${x["icons:chevron-right"]}")`),ye={"map-menu-item, map-menu-header":u`
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
  `,"map-menu-submenu":u`
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
  `,"map-menu-container":u`
    #activeindicator {
      display: none !important;
    }
  `,"map-menu-builder":u`
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
  `,"a11y-collapse":u`
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
  `,"site-breadcrumb":u`
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
      -webkit-mask: ${lt} center / contain no-repeat;
      mask: ${lt} center / contain no-repeat;
    }
    li:last-child,
    li:last-child span {
      color: var(--foreground) !important;
      font-weight: 400 !important;
      background: transparent !important;
    }
  `};x2(ye);const Ce="(max-width: 767px)";function D(a){return s`<span
    class="lucide"
    aria-hidden="true"
    style="--src:url(&quot;${x[a]}&quot;)"
  ></span>`}const g={panelLeft:s`<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></svg>`,search:s`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,sun:s`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.07-2.93 1.41-1.41m11.32-11.32 1.41-1.41M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41"/></svg>`,moon:s`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,undo:D("icons:undo"),redo:D("icons:redo"),save:D("icons:save"),chevronDown:D("icons:expand-more"),pencil:D("icons:create"),lock:D("icons:lock"),user:D("social:person"),layoutDashboard:D("hax:home-edit"),logOut:D("icons:exit-to-app"),type:D("editor:title"),shapes:D("hax:hax2022"),image:D("image:photo-library"),tag:D("icons:label"),history:D("icons:history"),chart:D("hax:graph"),eye:D("icons:visibility"),eyeOff:D("icons:visibility-off"),lockOpen:D("icons:lock-open"),trash:D("icons:delete"),book:D("lrn:book"),siteMap:D("hax:site-map"),settings:D("icons:settings"),types:D("hax:templates"),details:D("image:tune"),code:D("icons:code"),chevronLeft:s`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>`,chevronRight:s`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`};class dt extends D2{static get tag(){return"custom-oer-docs-theme"}static get properties(){return{...super.properties,collapsed:{type:Boolean,reflect:!0},mobileOpen:{type:Boolean,reflect:!0,attribute:"mobile-open"},dark:{type:Boolean,reflect:!0},siteTitle:{type:String},_prev:{state:!0},_next:{state:!0},_loggedIn:{state:!0},_userName:{state:!0},_activeTitle:{state:!0},_locked:{state:!0},_published:{state:!0},_pageMenuOpen:{state:!0},_siteDescription:{state:!0}}}constructor(){super(),this.HAXCMSThemeSettings.autoScroll=!0,this.collapsed=!1,this.mobileOpen=!1,this.dark=!1,this.siteTitle="",this.__mq=globalThis.matchMedia(Ce),this.__keyHandler=this._onKeydown.bind(this),this._loggedIn=!1,this._pageMenuOpen=!1,this.__outsideMenu=t=>{const e=t.composedPath();this._pageMenuOpen&&!e.includes(this.shadowRoot.querySelector(".page-header .menu-wrap"))&&(this._pageMenuOpen=!1)},this.__disposer.push(z(()=>{const t=b(w.isLoggedIn),e=b(w.userData),r=b(w.activeItem),o=b(w.manifest);Promise.resolve().then(()=>{this._siteDescription=o?.description||"",this._loggedIn=!!t,this._userName=e?.userName||"",this._activeTitle=r?.title||"",this._locked=!!r?.metadata?.locked,this._published=r?.metadata?.published!==!1})})),this.__editorBarObserver=new ResizeObserver(()=>this._measureEditorBar()),this.__bodyObserver=new MutationObserver(()=>this._watchEditorBar()),this.__disposer.push(z(()=>{const t=b(w.darkMode);Promise.resolve().then(()=>{this.dark=!!t})})),this.__disposer.push(z(()=>{const t=b(w.siteTitle);Promise.resolve().then(()=>{this.siteTitle=t||""})})),this.__disposer.push(z(()=>{const t=b(w.activeId),e=(b(w.routerManifest?.items)||[]).filter(o=>!m2(o)),r=e.findIndex(o=>o.id===t);Promise.resolve().then(()=>{this.mobileOpen=!1,this._prev=r>0?e[r-1]:null,this._next=r>=0&&r<e.length-1?e[r+1]:null})}))}connectedCallback(){if(super.connectedCallback(),globalThis.addEventListener("keydown",this.__keyHandler),globalThis.addEventListener("pointerdown",this.__outsideMenu),this.__bodyObserver.observe(globalThis.document.body,{childList:!0}),this._watchEditorBar(),!globalThis.document.getElementById("oer-docs-fonts")){const t=globalThis.document.createElement("link");t.id="oer-docs-fonts",t.rel="stylesheet",t.href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",globalThis.document.head.appendChild(t)}}_watchEditorBar(){const t=globalThis.document.querySelector("haxcms-site-editor-ui");t!==this.__editorBar&&(this.__editorBar=t,this.__editorBarObserver.disconnect(),t&&this.__editorBarObserver.observe(t),this._measureEditorBar())}_measureEditorBar(){const t=globalThis.document.querySelector("haxcms-site-editor-ui"),e=t?t.getBoundingClientRect().height:0;this.style.setProperty("--editor-bar-height",`${Math.round(e)}px`)}disconnectedCallback(){this.__editorBarObserver.disconnect(),this.__bodyObserver.disconnect(),globalThis.removeEventListener("keydown",this.__keyHandler),globalThis.removeEventListener("pointerdown",this.__outsideMenu),super.disconnectedCallback()}HAXCMSGlobalStyleSheetContent(){return[...super.HAXCMSGlobalStyleSheetContent(),De,we,u`
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
      `]}static get styles(){return[super.styles,u`
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

        /* edit mode: the sidebar stays, but navigating away would drop
           unsaved edits, so it is inert (see render) and dimmed */
        :host([edit-mode]) .sidebar nav {
          opacity: 0.6;
        }

        /* site actions above the page list (signed in, not editing):
           shadcn SidebarMenuButton rows */
        .site-actions {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          padding: 0 0.5rem 0.5rem;
        }
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

        .skip-link:focus {
          z-index: 50;
        }
        @media (prefers-reduced-motion: reduce) {
          .sidebar,
          .shell {
            transition: none;
          }
        }
      `]}render(){const t=this.__mq.matches?this.mobileOpen:!this.collapsed;return s`
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
        ${this._loggedIn&&!this.editMode?s`<div class="site-actions" role="group" aria-label="Site">
              <button class="site-action" @click="${()=>at().show()}">${g.siteMap}Outline</button>
              <button class="site-action" @click="${()=>xe().show()}">${g.types}Content types</button>
              <button class="site-action" @click="${$t}">${g.settings}Settings</button>
            </div>`:""}
        <nav aria-label="Course outline">
          <div class="nav-group-label">Contents</div>
          <oer-site-nav part="site-menu" ?editable="${this._loggedIn&&!this.editMode}"></oer-site-nav>
        </nav>
        ${this._loggedIn?s`<div class="sidebar-footer">${this.renderUser()}</div>`:""}
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
            <oer-page-header ?editable="${this._loggedIn&&!this.editMode}"></oer-page-header>
            <section id="slot"><slot></slot></section>
            <nav class="pager" aria-label="Previous and next page" ?hidden="${this.editMode}">
              ${this._prev?s`<a class="pager-link prev" href="${this._prev.slug}">
                    <span class="pager-label">${g.chevronLeft} Previous</span>
                    <span class="pager-title">${this._prev.title}</span>
                  </a>`:s`<span></span>`}
              ${this._next?s`<a class="pager-link next" href="${this._next.slug}">
                    <span class="pager-label">Next ${g.chevronRight}</span>
                    <span class="pager-title">${this._next.title}</span>
                  </a>`:""}
            </nav>
          </article>
        </main>
      </div>
      </div>
    `}renderTopbar(t){return s`
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
        ${this._loggedIn?s`<oer-command-search></oer-command-search>`:""}
        <button
          class="icon-btn"
          @click="${this.toggleDark}"
          title="${this.dark?"Switch to light mode":"Switch to dark mode"}"
          aria-pressed="${this.dark}"
        >
          ${this.dark?g.sun:g.moon}
        </button>
      </header>
    `}renderEditorHeader(){return s`
      <header class="topbar editing" part="topbar">
        <span class="badge"><span class="dot" aria-hidden="true"></span>Editing</span>
        <span class="editing-title">${this._activeTitle}</span>
        <div class="toolbar-group">
          <button class="icon-btn" @click="${At}" title="Undo (${_}Z)" aria-label="Undo">
            ${g.undo}
          </button>
          <button class="icon-btn" @click="${Bt}" title="Redo (${_}⇧Z)" aria-label="Redo">
            ${g.redo}
          </button>
          <div class="separator" aria-hidden="true"></div>
          <button
            class="icon-btn"
            @click="${()=>T2().open("source")}"
            title="Edit HTML source"
            aria-label="Edit HTML source"
          >
            ${g.code}
          </button>
          <oer-command-search></oer-command-search>
          <div class="separator" aria-hidden="true"></div>
          <button class="btn btn-outline" @click="${_t}" title="Discard changes (${_}⇧/)">
            Cancel
          </button>
          <button class="btn btn-primary" @click="${Et}" title="Save (${_}⇧S)">
            ${g.save}Save
          </button>
        </div>
      </header>
    `}renderPageMenu(){const t=r=>this._menuAction(()=>this.querySelector("page-break")?.[r]?.()),e=(r,o,i,n="")=>s`<button role="menuitem" class="${n}" @click="${r}">${o}${i}</button>`;return s`
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
        ${this._pageMenuOpen?s`<div class="menu" role="menu" @keydown="${this._menuKeys}">
              <button role="menuitem" ?disabled="${this._locked}" @click="${this._menuAction(Ct)}">
                ${g.pencil}Edit page<kbd>${_}⇧E</kbd>
              </button>
              <div class="menu-sep" role="separator"></div>
              ${e(t("_editTitle"),g.type,"Rename page")}
              ${e(t("_editIcon"),g.shapes,"Change icon")}
              ${e(t("_editMedia"),g.image,"Page media")}
              ${e(this._menuAction(()=>nt().show(w.activeId)),g.details,"Page details")}
              ${e(t("_editTags"),g.tag,"Tags")}
              ${e(this._menuAction(()=>at().show(w.activeId)),g.siteMap,"Edit page outline")}
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
    `}renderUser(){const t=this._userName||"Signed in";return s`
      <div class="user-row">
        <span class="avatar" aria-hidden="true">${this._userName?t.slice(0,2):g.user}</span>
        <span class="user-name">${t}</span>
        <a class="icon-btn sm" href="${a2()?.backLink??"/"}" title="Site dashboard" aria-label="Site dashboard">
          ${g.layoutDashboard}
        </a>
        <button class="icon-btn sm danger" @click="${Mt}" title="Log out" aria-label="Log out">
          ${g.logOut}
        </button>
      </div>
    `}_togglePageMenu(){this._pageMenuOpen=!this._pageMenuOpen}_menuAction(t){return()=>{this._pageMenuOpen=!1,t()}}_menuKeys(t){const e=[...this.shadowRoot.querySelectorAll('.menu [role="menuitem"]')],r=e.indexOf(this.shadowRoot.activeElement);t.key==="Escape"?this._pageMenuOpen=!1:(t.key==="ArrowDown"||t.key==="ArrowUp")&&(t.preventDefault(),e[(r+(t.key==="ArrowDown"?1:-1)+e.length)%e.length]?.focus())}toggleSidebar(){this.__mq.matches?this.mobileOpen=!this.mobileOpen:this.collapsed=!this.collapsed}_closeMobile(){this.mobileOpen=!1}toggleDark(){w.darkMode=!w.darkMode}async _loadSearch(){await import("@haxtheweb/haxcms-elements/lib/ui-components/site/site-search.js"),setTimeout(()=>{globalThis.SimpleModal?.requestAvailability()?.querySelector("site-search")?.shadowRoot?.querySelector("simple-fields-field")?.focus()},50)}openSearch(){this.shadowRoot.querySelector("site-modal")?.shadowRoot?.querySelector("#btn")?.click()}_onKeydown(t){this.editMode||((t.metaKey||t.ctrlKey)&&!t.shiftKey&&t.key.toLowerCase()==="k"?(t.preventDefault(),this.openSearch()):t.key==="Escape"&&this.mobileOpen&&(this.mobileOpen=!1))}}customElements.define(dt.tag,dt);const Ee="files/data/rubrics.json";let v2;function _e(){return v2||(v2=fetch(new URL(Ee,globalThis.document.baseURI)).then(a=>a.ok?a.json():[]).catch(()=>[])),v2}class o2 extends pt{static get tag(){return"oer-rubric"}static get properties(){return{...super.properties,rubricId:{type:String,attribute:"rubric-id",reflect:!0}}}constructor(){super(),this.rubricId="",this.__rubric=null,this.__loaded=!1}updated(t){super.updated?.(t),t.has("rubricId")&&this._load()}async _load(){const t=await _e();this.__rubric=t.find(e=>e.slug===this.rubricId)??null,this.__loaded=!0,this.requestUpdate()}get _hidden(){return new URLSearchParams(globalThis.location.search).get("hideRubric")==="true"}static get styles(){return[super.styles,u`
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
      `]}render(){if(this._hidden||!this.__loaded)return s``;const t=this.__rubric;return t?s`
      <section class="card" aria-labelledby="title">
        <h3 id="title">${t.name} Rubric</h3>
        ${t.description?s`<p class="desc">${t.description}</p>`:""}
        ${t.criteria?.length?s`<div class="table-wrap">
              <table>
                <thead>
                  <tr><th scope="col">Criterion</th><th scope="col">Description</th></tr>
                </thead>
                <tbody>
                  ${t.criteria.map(e=>s`<tr><td>${e.name}</td><td>${e.description}</td></tr>`)}
                </tbody>
              </table>
            </div>`:""}
      </section>
    `:s`<div class="missing">
        Rubric not found${this.rubricId?s`: <code>${this.rubricId}</code>`:""}
      </div>`}static get haxProperties(){return{canScale:!1,canEditSource:!0,gizmo:{title:"Rubric",description:"Assessment rubric from the site's rubrics data file.",icon:"icons:assignment-turned-in",color:"blue",tags:["Education","assessment","rubric","grading"],meta:{author:"Michael Collins"}},settings:{configure:[{property:"rubricId",title:"Rubric",description:"Which rubric to show (slug in files/data/rubrics.json).",inputMethod:"select",options:{exercise:"Exercise","exercise-low-poly":"Exercise (low poly)",project:"Project",task:"Task","written-statement":"Written statement"}}],advanced:[]},demoSchema:[{tag:o2.tag,properties:{rubricId:"exercise"},content:""}]}}}customElements.define(o2.tag,o2);
