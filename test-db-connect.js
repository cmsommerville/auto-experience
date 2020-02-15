const dotenv = require('dotenv');
dotenv.config();

const { Client } = require('pg');
const { convert_rows } = require('./data-handling')


const client = new Client();


client.connect()
client.query("SELECT * FROM app1.experience WHERE GRPNUM = '0000002000'", (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    let data = convert_rows(res.rows);
    console.log(data);
  }
  client.end();
})
