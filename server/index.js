const express = require('express')
const app = express();
const port = 3000;
const db = require('../database/index.js')
const productRouter = require('./routes.js');
const dotenv = require('dotenv');
dotenv.config();

app.use('/', productRouter);

app.get(`/${process.env.loader_token}`, (req, res) => {
  res.status(200).send(process.env.loader_token)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
