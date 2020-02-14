const {ipcRenderer} = require('electron');

document.getElementById("open-file-button").addEventListener("click", (event) => {
  event.preventDefault();
  ipcRenderer.send('show-open-dialog');
});
