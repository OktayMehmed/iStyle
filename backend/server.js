const express = require('express');
const dotenv = require('dotenv')

const products = require('./data/products');

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('API')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV

app.listen(
  PORT, console.log(`Server is listening in ${NODE_ENV} mode at ${PORT} port!!!`)
)