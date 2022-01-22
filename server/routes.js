const express = require('express');
const router = express.Router();
const { getProductList, getProductItem, getStyleItems, getRelatedItems } = require('./model.js');

//default
router.get('/', (req, res) => {
  getProductList()
    .then((data) => {
      res.send('Welcome to SDC Project');
    })
    .catch((err) => {
      console.log(err);
    })
});

//List Products
router.get('/products', (req, res) => {
  getProductList()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    })
});
//Product Information
router.get('/products/:productId', (req, res) => {
  const id = req.params.productId;
  getProductItem(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    })
});
//Product Styles
router.get('/products/:productId/styles', (req, res) => {
  const id = req.params.productId;
  getStyleItems(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    })
});
//Related Products
router.get('/products/:productId/related', (req, res) => {
  const id = req.params.productId;
  getRelatedItems(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    })
});


module.exports = router;