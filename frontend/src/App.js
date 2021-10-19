import { Container } from "react-bootstrap";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import ProductDetail from "./components/ProductDetail";
import CartPage from "./components/CartPage";
import Login from "./components/Login";
import Register from "./components/Register";
import ProfilePage from "./components/ProfilePage";
import ShippingPage from "./components/ShippingPage";
import PaymentPage from "./components/PaymentPage";
import PlaceOrderPage from "./components/PlaceOrderPage";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomePage} exact />
          <Route path="/shipping" component={ShippingPage} />
          <Route path="/placeorder" component={PlaceOrderPage} />
          <Route path="/payment" component={PaymentPage} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/cart/:id?" component={CartPage} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
