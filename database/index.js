const { Pool } = require('pg');
const format = require('pg-format');

const fs = require('fs');

const pool = new Pool({
  user: '',
  host: 'localhost',
  database: 'sdcproduct',
  password: '',
  port: 5432
})

pool.connect((err, client, done) => {
  if (err) {
    throw err;
  } else {
    console.log('db connected scucessfully');
  }

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

exports.getProductList = (page = 1, count = 5) => {
  let startCount = (page - 1) * count;
  let endCount = startCount + 5;
  const qstr = `SELECT * FROM productdetail WHERE id > ${startCount} AND id <= ${endCount}`;
  return new Promise ((resolve, reject) => {
    pool
      .query(qstr, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows);
        }
      })
  })
};

exports.getProductItem = (productId) => {
  // const qstr = `SELECT productdetail.id, productdetail.productname, productdetail.slogan, productdetail.description, productdetail.category, productdetail.defaultprice, features.feature, features.value
  // FROM productdetail, features WHERE productdetail.id = ${productId} AND features.productid = ${productId}`;
  const qstr = `SELECT
    p.id,
    p.productname,
    p.slogan,
    p.description,
    p.category,
    p.defaultPrice,
    json_agg(json_build_object(
      'feature', f.feature,
      'value', f.value
    )) as features
    FROM productdetail p LEFT OUTER JOIN features f on p.id = f.productId WHERE p.id=${productId} GROUP BY p.id`;
  return new Promise ((resolve, reject) => {
    pool
      .query(qstr, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows[0]);
        }
      })
  })
}

exports.getStyleItems = (productId) => {
  const qstr = `
  SELECT styles.productid AS product_id,
  (SELECT json_agg(result_data)
    FROM(
      SELECT
        styles.id,
        styles.stylename,
        styles.originalprice,
        styles.saleprice,
        styles.defaultstyle,

        (SELECT json_agg(photo_data)
          FROM (
            SELECT
              photos.thumbnailurl,
              photos.url
              FROM photos WHERE photos.styleid = styles.id GROUP BY photos.thumbnailurl, photos.url
          ) AS photo_data
        ) AS photos,

        (SELECT json_agg(skus_data)
          FROM (
            SELECT
              quantity,
              size
              FROM skus WHERE skus.styleid = styles.id GROUP BY skus.quantity, skus.size
          ) AS skus_data
        ) AS skus
      FROM styles WHERE styles.productid = ${productId} GROUP BY styles.id
  ) AS result_data
  ) AS result FROM styles WHERE productid = ${productId}`
  return new Promise((resolve, reject) => {
    pool
      .query(qstr, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows[0]);
        }
      })
  })
}

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

