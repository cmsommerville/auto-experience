const dotenv = require('dotenv');
dotenv.config();
const { Client } = require('pg');

// define function that takes in a query string and executes against database
const run_query = (query) => {
  return new Promise((resolve, reject) => {

    // connect to client using environmental variables
    const client = new Client();
    client.connect()

    client.query(query, (err, res) => {
      if (err) {reject('Could not execute query')}
      let data = res.rows;
      client.end();
      resolve(data);
    });
  });
};

exports.run_query = run_query;
