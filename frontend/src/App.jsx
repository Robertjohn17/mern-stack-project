import React, { useEffect, useCallback, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import MyContext from "./components/Context";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Loading from "./components/Loading";
import { setUser } from "./redux/authSlice";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProfile from "./pages/EditProfile";
import AdminPanel from "./pages/admin/AdminPanel";
import AllUsers from "./pages/admin/AllUsers";
import AddProducts from "./pages/admin/AddProducts";
import EditProduct from "./pages/admin/EditProduct";
import ProductCategory from "./pages/admin/ProductCategory";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import ScrollToTop from "./components/ScrollToTop";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Order from "./pages/Order";
import OrderDetails from "./pages/OrderDetails";
import Search from "./pages/Search";
import Payment from "./pages/Payment";

const serverUrl = "http://localhost:5000";

function App() {
  const dispatch = useDispatch();
  const [initialLoading, setInitialLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserDetails = useCallback(async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(`${serverUrl}/api/user/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.warn("User is not authorized");
      } else {
        console.error("Error fetching user data:", error);
      }
    }
    setInitialLoading(false);
  }, [dispatch]);

  const fetchCartCount = useCallback(async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(`${serverUrl}/api/cart/count`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartCount(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.warn("User is not authorized");
      } else {
        console.error("Error fetching cart count:", error);
      }
    }
  }, []);

  const fetchWishlistItems = useCallback(async () => {
    const token = Cookies.get("token");
    try {
      setLoading(true);
      const response = await axios.get(
        `${serverUrl}/api/wishlist/wishlistItems`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlistItems(response.data.data);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.warn("User is not authorized");
      } else {
        console.error("Error fetching cart count:", error);
      }
    }
  }, []);

  useEffect(() => {
    fetchUserDetails();
    fetchCartCount();
    fetchWishlistItems();
  }, [fetchUserDetails, fetchCartCount, fetchWishlistItems]);

  if (initialLoading) {
    return <Loading />;
  }

  return (
    <MyContext.Provider
      value={{
        fetchUserDetails,
        fetchCartCount,
        cartCount,
        wishlistItems,
        setWishlistItems,
        loading,
        fetchWishlistItems,
      }}
    >
      <ToastContainer position="top-center" autoClose={1500} />
      <Header />
      <div style={{ paddingTop: "80px" }}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route
            path="/admin/products/:category"
            element={<ProductCategory />}
          />
          <Route path="/admin/all-users" element={<AllUsers />} />
          <Route path="/admin/add-products" element={<AddProducts />} />
          <Route path="/admin/edit-products/:id" element={<EditProduct />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/products/details/:id" element={<ProductDetails />} />
          <Route path="/products/cart" element={<Cart />} />
          <Route path="/products/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
      <Footer />
    </MyContext.Provider>
  );
}

export default App;
