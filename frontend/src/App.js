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
import OrderPage from "./components/OrderPage";
import UserListPage from "./components/UserListPage";
import UserEditPage from "./components/UserEditPage";
import ProductListPage from "./components/ProductListPage";
import ProductEditPage from "./components/ProductEditPage";
import OrderListPage from "./components/OrderListPage";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomePage} exact />
          <Route path="/search/:keyword" component={HomePage} />
          <Route path="/shipping" component={ShippingPage} />
          <Route path="/placeorder" component={PlaceOrderPage} />
          <Route path="/order/:id" component={OrderPage} />
          <Route path="/payment" component={PaymentPage} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/admin/userlist" component={UserListPage} />
          <Route path="/admin/user/:id/edit" component={UserEditPage} />
          <Route path="/admin/productlist" component={ProductListPage} />
          <Route path="/admin/product/:id/edit" component={ProductEditPage} />
          <Route path="/admin/orderlist" component={OrderListPage} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/cart/:id?" component={CartPage} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
