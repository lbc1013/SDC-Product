const {pool} = require('../database/index.js');

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

exports.getRelatedItems = (productId) => {
  const qstr = `SELECT array_agg(
    relatedId)
    FROM relatedProduct WHERE relatedProduct.productId = ${productId}`;
  return new Promise((resolve, reject) => {
    pool
      .query(qstr, (err, res) => {
        if (err) {
          reject (err);
        } else {
          resolve(res.rows[0].array_agg);
        }
      })
  })
}