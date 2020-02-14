const { app, BrowserWindow } = require("electron");
const { ipcMain, dialog } = require("electron");

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // and load the index.html of the app.
    win.loadFile("index.html");
};


ipcMain.on('show-open-dialog', (event)=> {
  dialog.showOpenDialog()
  .then(result => {
    console.log(result.filePaths)
  }).catch(err => {
    console.log(err)
  })
});


app.allowRendererProcessReuse = false;
app.on("ready", createWindow);
