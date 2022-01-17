const express = require('express')
const app = express();
const port = 3000;
const db = require('../database/index.js')
const fs = require('fs');

//List Products
app.get('/products', (req, res) => {
  db.getProductList()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    })
})

//Product Information
app.get('/products/:productId', (req, res) => {
  const id = req.params.productId;
  db.getProductItem(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    })
})

//Product Styles
app.get('/products/:productId/styles', (req, res) => {
  const id = req.params.productId;
  db.getStyleItems(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    })
})

//Related Products
app.get('/products/:productId/related', (req, res) => {
  const id = req.params.productId;
  db.getRelatedItems(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


