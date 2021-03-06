const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require('fs');
const slugify = require('slugify');
const { run_query } = require("./database");
const { db_rows_to_JSON, experience_query_builder, template_handler, currentTimeStamp } = require("./data-handling");

let html_template = fs.readFileSync("./templates/template-main.html", "utf-8");








const createReport = async (input_data, html_template) => {

  try {

    // read input data and create query string
    const query_string = await experience_query_builder(input_data['groups']);
    // execute query against the database
    const experience_data_raw = await run_query(query_string);
    // format the results into vue.js compatible JSON object
    let experience_data = await db_rows_to_JSON(experience_data_raw);

    experience_data["report_from"] = input_data["report_from"];
    experience_data["report_thru"] = input_data["report_thru"];
    experience_data["report_name"] = input_data["report_name"];
    let report_name = slugify(input_data["report_name"], {remove: /[*+~.()'"!:;?,^\[\]{}@/\\#]/g});

    let report_filename = "./reports/" + report_name + "-" + currentTimeStamp() + ".html";

    // pass result data into HTML template
    const output_html = await template_handler(experience_data, html_template);

    // write final file
    fs.writeFile(report_filename, output_html, (err)=> {
      if (err) throw err;
      console.log("The file has been written!");
    });
  }
  catch {
    console.log("Can't get query results")
  }
};








function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 400,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // and load the index.html of the app.
    win.loadFile("app.html");
};








ipcMain.on('show-open-dialog', (event)=> {
  // open dialog box to read input configuration file
  dialog.showOpenDialog({
    // only allow JSON files to be read
    filters: [{name: 'JSON', extensions: ['json']}]
  })
  .then(result => {

    if (!result.canceled) {

      // read first filename
      filename = result.filePaths[0];

      // read contents of filename
      fs.readFile(filename, (err, data) => {
        if (err) throw err;
        let input_data = JSON.parse(data);

        // check if data is an array
        // if an array, loop
        if (Array.isArray(input_data)) {
          for (index in input_data) {
            createReport(input_data[index], html_template);
          }
        } else {
          // function reads group numbers, queries DB, and returns experience
          createReport(input_data, html_template);
        };

        console.log(Array.isArray(input_data));

      });

    };

  }).catch(err => {
    console.log(err)
  });
});


app.allowRendererProcessReuse = false;
app.on("ready", createWindow);
