const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require('fs');
const { run_query } = require("./database");
const { db_rows_to_JSON, experience_query_builder } = require("./data-handling");


const getQueryResults = async (input_data) => {
  try {
    const query_string = await experience_query_builder(input_data['groups']);
    const experience_data_raw = await run_query(query_string);
    const experience_data = await db_rows_to_JSON(experience_data_raw);
    console.log(experience_data);
  }
  catch {
    console.log("Can't get query results")
  }
};


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
      let input_data = JSON.parse(data);

      // function reads group numbers, queries DB, and returns experience
      getQueryResults(input_data);
    });


  }).catch(err => {
    console.log(err)
  })
});


app.allowRendererProcessReuse = false;
app.on("ready", createWindow);
