const express = require('express')
const app = express();
const port = 3000;
const pool = require('../database/index.js')
const extract = require('../database/extract.js')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})