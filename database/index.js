const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: '',
  host: 'localhost',
  database: 'sdcproduct',
  password: '',
  port: 5432
})

pool.connect((err, client, done) => {
  if (err) throw err;
  if (db.read('productdetail') !== undefined) {
    db.addProductDetail();
  } else {
    console.log('data was already imported');
  };
})

const db = {
  //read: to check if the data was alreday imported into the db
  read: (service) => {
    pool.query(`SELECT * FROM ${service} LIMIT 1`, (err, res) => {
      return res.rows;
    })
  },
  addProductDetail: () => {
    fs.readFile('./csv/product.csv', 'utf8', (err, data) => {
      if (err) {
        throw (err);
      } else {
        const productDetail = [];
        const lines = data.split('\n');
        lines.forEach ((line) => {
          productDetail.push(line.split(','))
        })
        for (let i = 0; i < productDetail.length; i++) {
          pool.query(`INSERT INTO productDetail
          (id, productName, slogan, description, category, defaultPrice)
          VALUES
          ('${productDetail[i][0]}', '${productDetail[i][1]}', '${productDetail[i][2]}', '${productDetail[i][3]}', '${productDetail[i][4]}', '${productDetail[i][5]}')`, (err, res) => {
            if (err) {
              console.log(err);
            }
            console.log(res);
          })
        }
        console.log('data import done');
      }
    })
  }
}

module.exports = {pool};