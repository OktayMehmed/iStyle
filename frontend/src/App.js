import { Container } from "react-bootstrap";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import ProductDetail from "./components/ProductDetail";
import CartPage from "./components/CartPage";
import Login from "./components/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomePage} exact />
          <Route path="/login" component={Login} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/cart/:id?" component={CartPage} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
