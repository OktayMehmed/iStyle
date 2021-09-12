import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'

import Product from '../Product'

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products').then(({ data }) => {
      setProducts(data)
    })
  }, []);

return (
  <>
    <h1>Latest Products</h1>
    <Row>
      {products.map(product => (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          <Product product={product} />
        </Col>
      ))}
    </Row>
  </>
)
}

export default HomePage