const convert_rows = (data) => {

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






exports.convert_rows = convert_rows;
