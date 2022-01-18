const express = require('express')
const app = express();
const port = 3000;
const db = require('../database/index.js')
const productRouter = require('./routes.js');

app.use('/products', productRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
