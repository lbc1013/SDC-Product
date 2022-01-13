const express = require('express')
const app = express();
const port = 3000;
const { pool ,db } = require('../database/index.js')
const fs = require('fs');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


