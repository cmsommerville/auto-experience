const dotenv = require('dotenv');
dotenv.config();

const { Client } = require('pg')
const client = new Client()

console.log(`Your database is ${process.env.PGDATABASE}`);

client.connect()
client.query('SELECT COUNT(1) AS MyCount FROM app1.experience', (err, res) => {
  if (err) {
    console.log(err.stack);
    client.end();
  } else {
    console.log(res.rows[0]);
    client.end();
  }
})
