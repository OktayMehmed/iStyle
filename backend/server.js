const express = require('express');
const dotenv = require('dotenv')

const db = require('./config/db')
const Products = require('./routes/Product');

dotenv.config();

db();

const app = express();

app.get('/', (req, res) => {
  res.send('API')
})

app.use('/api/products', Products);


const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV

app.listen(
  PORT, console.log(`Server is listening in ${NODE_ENV} mode at ${PORT} port!!!`)
)