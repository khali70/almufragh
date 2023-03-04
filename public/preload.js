//const { Titlebar, Color } = require('custom-electron-titlebar');
const { ipcRenderer } = require("electron");

process.once("loaded", () => {
  window.ipcRenderer = ipcRenderer;
});
// window.addEventListener('DOMContentLoaded', () => {
//     // Title bar implemenation
//     new Titlebar({
//         backgroundColor: Color.fromHex("#0275d8"),
//         itemBackgroundColor: Color.fromHex("#000"),
//         svgColor: Color.WHITE,

//         menu: null // = do not automatically use Menu.applicationMenu
//     });
// });
