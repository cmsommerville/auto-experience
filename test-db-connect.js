const dotenv = require('dotenv');
dotenv.config();
const { Client } = require('pg');
const { db_rows_to_JSON, experience_query_builder } = require('./data-handling')



// build experience query string
let experience_query = experience_query_builder(['0000001000', '0000002000']);

// execute query
client.query(experience_query, (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {

    // convert data into object that can be inserted HTML
    let data = db_rows_to_JSON(res.rows);
    console.log(data);
  }
  client.end();
});
