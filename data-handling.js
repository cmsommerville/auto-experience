
const experience_query_builder = (groups) => {
  const table_experience = 'app1.experience';
  let group_list = groups.join('\',\'');
  group_list = group_list.replace('[^A-Za-z0-9-_,]', '');

  let query =
    `SELECT lob, experience_year, SUM(earned_prem) AS earned_prem, SUM(incurred_clms) AS incurred_clms
    FROM ${table_experience}
    WHERE grpnum IN (\'${group_list}\')
    GROUP BY lob, experience_year
    ORDER BY lob, experience_year`;

  return query;
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
  // converts database rows that are returned as a list of JSON objects
  // into a single object split by line of business

  let experience = new Object();

  for (var i=0; i < data.length; i++) {

    // add LOB key
    let lob = data[i]["lob"];
    if (!(lob in experience)) {
      experience[lob] = new Object();
    };

    let year = data[i]["experience_year"];
    if (!("year" in experience[lob])) {
      let arr = [year];
      experience[lob]["year"] = arr;
    } else {
      experience[lob]["year"].push(year);
    }

    let earned_prem = data[i]["earned_prem"];
    if (!("earned_prem" in experience[lob])) {
      let arr = [earned_prem];
      experience[lob]["earned_prem"] = [earned_prem];
    } else {
      experience[lob]["earned_prem"].push(earned_prem);
    }

    let incurred_clms = data[i]["incurred_clms"];
    if (!("incurred_clms" in experience[lob])) {
      let arr = [incurred_clms];
      experience[lob]["incurred_clms"] = [incurred_clms];
    } else {
      experience[lob]["incurred_clms"].push(incurred_clms);
    }
  }

  return experience;
};





exports.experience_query_builder = experience_query_builder;
exports.utilization_query_builder = utilization_query_builder;
exports.db_rows_to_JSON = db_rows_to_JSON;
