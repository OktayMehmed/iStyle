import { Container } from 'react-bootstrap'
import {BrowserRouter, Route} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import ProductDetail from './components/ProductDetail'


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomePage} exact />
          <Route path='/product/:id' component={ProductDetail}/>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
