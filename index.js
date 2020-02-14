const { app, BrowserWindow } = require("electron");
const { ipcMain } = require("electron");

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


ipcMain.on('async-log', (event, data) => {
  console.log(data["filePaths"]);
});

app.allowRendererProcessReuse = false;
app.on("ready", createWindow);
