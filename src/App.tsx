import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import AuthContext from "./store/auth/AuthContextProvider";
import { useContext } from "react";
import Auth from "./components/auth/Auth";
import Products from "./components/resource/Products";
import Header from "./components/resource/Header";
import CartViewer from "./components/resource/CartViewer";
import Orders from "./components/resource/Orders";
import AdminHeader from "./components/resource/admin-tools/AdminHeader";
import AdminOrders from "./components/resource/admin-tools/AdminOrders";
import AdminCarts from "./components/resource/admin-tools/AdminCarts";
import AdminUsers from "./components/resource/admin-tools/AdminUsers";
import AdminProducts from "./components/resource/admin-tools/AdminProducts";
import AdminAddProduct from "./components/resource/admin-tools/AdminAddProduct";

function App() {
  const { authState } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div className="App">
      <Header />
      {authState.isAdmin && <AdminHeader />}
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={authState.isLoggedIn ? location.pathname : "/user/login"}
            />
          }
        />
        {!authState.isLoggedIn && (
          <Route path="user">
            <Route path="register" element={<Auth />} />
            <Route path="login" element={<Auth />} />
          </Route>
        )}
        <Route path="products" element={<Products />} />
        <Route path="cart" element={<CartViewer />} />
        <Route path="orders" element={<Orders />} />
        <Route path="adminTools">
          <Route path="orders" element={<AdminOrders />} />
          <Route path="carts" element={<AdminCarts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="addProduct" element={<AdminAddProduct />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
