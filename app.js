// note that the fs package does not exist on a normal browser
const fs = require("fs");
const {ipcRenderer} = require('electron');
//a dialog box module from electron
const { dialog } = require("electron").remote;


document.getElementById("open-file-button").addEventListener("click", (event) => {
  event.preventDefault();
  ipcRenderer.send('show-open-dialog');
});
