const express = require('express');
const products = require('./data/products');

const app = express();

app.listen(8000, console.log('Server is listening at 8000 port!!!'))

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