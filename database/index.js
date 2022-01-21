const { Pool } = require('pg');
const format = require('pg-format');
const dotenv = require('dotenv');

const fs = require('fs');

dotenv.config();

const pool = new Pool({
  user: process.env.username,
  host: process.env.host,
  database: process.env.db,
  password: process.env.password,
  port: 5432
})

pool.connect((err, client, done) => {
  if (err) {
    throw err;
  } else {
    console.log('db connected scucessfully');
  }

  // - -  - ETL Process - - -
  // db.read('productdetail')
  //   .then(res => {
  //     if(res.rows[0] === undefined) {
  //       db.addProductDetail();
  //     } else {
  //       console.log('productdetail data already imported');
  //     }
  //   })

  //   db.read('relatedproduct')
  //   .then(res => {
  //     if(res.rows[0] === undefined) {
  //       db.addRelatedProduct();
  //     } else {
  //       console.log('relatedproduct data already imported');
  //     }
  //   })
})


// - -  - ETL Process - - -
const db = {
  //read: to check if the data was alreday imported into the db
  read: (service) => {
    return pool.query(`SELECT * FROM ${service} LIMIT 1`)
  },
  // productDetail
  addProductDetail: () => {
    fs.readFile('./csv/product.csv', 'utf8', (err, data) => {
      if (err) {
        throw (err);
      } else {
        const lines = data.split('\n');
        lines.forEach((line) => {
          const qstr = format('INSERT INTO productDetail (id, productName, slogan, description, category, defaultPrice) VALUES ($1, $2, $3, $4, $5, $6)');
          pool
          .query(qstr, line.split(','))
          .then (res => {
              console.log('productdetail data import done', res);
            })
            .catch(err => console.log(err.stack))
        })
      }
    })
  },
  // relatedproduct (id,current_product_id,related_product_id)
  addRelatedProduct: () => {
    fs.readFile('./csv/related.csv', 'utf8', (err, data) => {
      if (err) {
        throw (err);
      } else {
        const lines = data.split('\n');
        lines.forEach((line) => {
          const qstr = format('INSERT INTO relatedproduct (id, productid, relatedid) VALUES ($1, $2, $3)');
          pool
            .query(qstr, line.split(','))
            .then(res => {
              console.log('data import done', res);
            })
            .catch(err => console.log(err.stack))
        })
      }
    })
  }
};

module.exports = {pool};
