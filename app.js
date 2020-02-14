// note that the fs package does not exist on a normal browser
const fs = require("fs");
const {ipcRenderer} = require('electron');
//a dialog box module from electron
const { dialog } = require("electron").remote;
// Also note that document does not exist in a normal node environment
// button click event


document.getElementById("mybutton").addEventListener("click", () => {
  console.log("WOOHOO!");
  dialog.showOpenDialog({properties: ['openFile']})
    .then(result => {ipcRenderer.send('async-log', result)});
});
