const Pool = require('pg').Pool;

const pool = new Pool({
  user: '',
  host: 'localhost',
  database: 'sdcproduct',
  password: '',
  port: 5432
}).connect()
    .then((result) => {
      console.log('connect to db!')
    })
    .catch((err) => {
      console.log(err);
    })


module.exports = pool;