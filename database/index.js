const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'jakeb.lee',
  host: 'localhost',
  port: 5432
});


module.exports = pool;