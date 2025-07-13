

import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
// import MyOrders from './pages/MyOrders';
import SellerLogin from './components/seller/SellerLogin';
import SellerLayout from './pages/seller/SellerLayout';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';

import { useAppContext } from './context/AppContext';

const App = () => {
  const location = useLocation();
  const isSellerPath = location.pathname.includes("seller");
  const { showUserLogin, isSeller, setUser, axios /*, setUserOrders */ } = useAppContext();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/user/me'); // withCredentials assumed set in axios defaults
        if (data.success) {
          setUser(data.user);

          // ✅ Optional: Fetch orders only if needed
          // const orderRes = await axios.get('/api/order/user');
          // console.log("Fetched orders:", orderRes.data.orders);
          // setUserOrders(orderRes.data.orders); // <-- Make sure to define this in context if used
        }
      } catch (err) {
        const message = err?.response?.data?.message || err.message || "Unknown error";
        console.log("User not logged in:", message);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {!isSellerPath && <Navbar />}
      {showUserLogin && <Login />}
      <Toaster />

      <div className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          {/* <Route path='/my-orders' element={<MyOrders />} /> */}

          <Route path='/seller' element={isSeller ? <SellerLayout /> : <SellerLogin />}>
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path='product-list' element={<ProductList />} />
            <Route path='orders' element={<Orders />} />
          </Route>
        </Routes>
      </div>

      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;

