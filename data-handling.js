
const experience_query_builder = (groups) => {
  return new Promise((resolve, reject) => {
    const table_experience = 'app1.experience';
    let group_list = groups.join('\',\'');
    group_list = group_list.replace('[^A-Za-z0-9-_,]', '');

    let query =
      `SELECT lob, experience_year, SUM(earned_prem) AS earned_prem, SUM(incurred_clms) AS incurred_clms
FROM ${table_experience}
WHERE grpnum IN (\'${group_list}\')
GROUP BY lob, experience_year
ORDER BY lob, experience_year`;

    resolve(query);
  })
};

const utilization_query_builder = (groups) => {
  const table_utilization = 'app1.utilization';
  let group_list = groups.join('\',\'');
  group_list = group_list.replace('[^A-Za-z0-9-_,]', '');

  let query =
    `SELECT lob, experience_year, SUM(earned_prem) AS earned_prem, SUM(incurred_clms) AS incurred_clms
    FROM ${table_utilization}
    WHERE grpnum IN (\'${group_list}\')
    GROUP BY lob, experience_year
    ORDER BY lob, experience_year`;

  return query;
};


const db_rows_to_JSON = (data) => {
  return new Promise((resolve, reject) => {

    let experience = new Object();

    for (var i=0; i < data.length; i++) {

      // add LOB key
      let lob = data[i]["lob"];
      if (!(lob in experience)) {
        experience[lob] = new Object();
        experience[lob]["name"] = lob;
        experience[lob]["experience"] = [];
      };

      let current_experience = new Object();
      current_experience["year"] = data[i]["experience_year"];
      current_experience["earnedPrem"] = Number(data[i]["earned_prem"]).toFixed(2);
      current_experience["incClaims"] = Number(data[i]["incurred_clms"]).toFixed(2);
      current_experience["lossRatio"] = Number(data[i]["incurred_clms"] / data[i]["earned_prem"]).toFixed(4);

      experience[lob]["experience"].push(current_experience);
    };;

    resolve({expdata: experience});
  });
};



const template_handler = (data, html) => {
  return new Promise((resolve, reject) => {

    let output = html.replace("{% VUE_DATA_OBJECT %}", JSON.stringify(data));
    resolve(output);
  });
};




const currentTimeStamp = () => {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();

  const hour = now.getHours();
  const minute = now.getMinutes();
  const sec = now.getSeconds();

  return ([year * 10000 + month * 100 + day, hour * 10000 + minute * 100 + sec].join("-"))
};



exports.experience_query_builder = experience_query_builder;
exports.utilization_query_builder = utilization_query_builder;
exports.db_rows_to_JSON = db_rows_to_JSON;
exports.template_handler = template_handler;
exports.currentTimeStamp = currentTimeStamp; 
