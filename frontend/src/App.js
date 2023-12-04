import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register';
import Shipping from './pages/Shipping';
import PrivateRoute from './components/PrivateRoute';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import Profile from './pages/Profile';
import AdminRoute from './components/AdminRoute';
import OrderList from './pages/Admin/OrderList';
import ProductList from './pages/Admin/ProductList';
import ProductEdit from './pages/Admin/ProductEdit';
import UserList from './pages/Admin/UserList';
import UserEdit from './pages/Admin/UserEdit';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/page/:pageNumber" element={<Home />} />
        <Route path="/search/:keyword" element={<Home />} />
        <Route path="/search/:keyword/page/:pageNumber" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetail />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="" element={<PrivateRoute />}>
          <Route exact path="/shipping" element={<Shipping />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/placeorder" element={<PlaceOrder />} />
          <Route exact path="/order/:id" element={<Order />} />
          <Route exact path="/profile" element={<Profile />} />
        </Route>
        <Route path="" element={<AdminRoute />}>
          <Route exact path="/admin/orderlist" element={<OrderList />} />
          <Route exact path="/admin/productlist" element={<ProductList />} />
          <Route
            exact
            path="/admin/productlist/:pageNumber"
            element={<ProductList />}
          />
          <Route
            exact
            path="/admin/product/:id/edit"
            element={<ProductEdit />}
          />
          <Route exact path="/admin/userlist" element={<UserList />} />
          <Route exact path="/admin/user/:id/edit" element={<UserEdit />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
