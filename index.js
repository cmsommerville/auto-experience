const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require('fs');

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
  // open dialog box to read input configuration file 
  dialog.showOpenDialog({
    // only allow JSON files to be read
    filters: [{name: 'JSON', extensions: ['json']}]
  })
  .then(result => {
    // read first filename
    filename = result.filePaths[0];

    // read contents of filename
    fs.readFile(filename, (err, data) => {
      if (err) throw err;

      let config_file = JSON.parse(data);
      console.log(config_file);
    });

  }).catch(err => {
    console.log(err)
  })
});


app.allowRendererProcessReuse = false;
app.on("ready", createWindow);
