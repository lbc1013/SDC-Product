const express = require('express')
const app = express();
const port = 3000;
const db = require('../database/index.js')
const fs = require('fs');

app.get('/products', (req, res) => {
  db.getProduct()
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


