const {ipcRenderer} = require('electron');

document.getElementById("open-file-button").addEventListener("click", (event) => {
  event.preventDefault();
  ipcRenderer.send('show-open-dialog');
});

document.getElementById("submit-button").addEventListener("click", (event) => {
  event.preventDefault();
  let report_from = document.getElementById("report-from-date");
  let report_thru = document.getElementById("report-thru-date");
  let report_title = document.getElementById("report-title");

  ipcRender.send('send-report-parms', {
    report_from: report_from,
    report_thru: report_thru,
    report_title: report_title
  });
});
