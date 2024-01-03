/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignInUp from "./Pages/SignInUp";
import { AuthProvider } from "./contexts/AuthContext";
// import PrivateRoute from "./components/PrivateRoute";
import ProductPage from "./Pages/ProductPage";
import Announcement from "./Pages/Announcement";
import CartPage from "./Pages/CartPage";
import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import AddProduct from "./vendor/pages/AddProduct";
import Dashboard from "./vendor/pages/Dashboard";
import { ProductProvider } from "./contexts/ProductContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHomePage from "./vendor/pages/VendorHomePage";
import SingleProductPage from "./Pages/SingleProductPage";

import { useSelector } from "react-redux";
import BecomeVendor from "./vendor/pages/BecomeVendor";
import Checkout from "./vendor/pages/Checkout";
import UserProfile from "./vendor/pages/UserProfile";
import SerachProducts from "./vendor/pages/SerachProducts";
import OrderHistory from "./Pages/orderHistory";
import Orders from "./vendor/pages/OrdersManagement";
import OrderManagement from "./Test";

function App() {
  const vendorMode = useSelector((state) => state.vendorMode);

  if (!vendorMode) {
    return (
      <>
        <ProductProvider>
          <AuthProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <SignInUp />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <PublicRoute>
                      <SignInUp />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/forgotten-password"
                  element={
                    <PublicRoute>
                      <SignInUp />
                    </PublicRoute>
                  }
                />
                <Route path="/announcement" element={<Announcement />} />
                <Route path="/products/:category" element={<ProductPage />} />
                <Route
                  path="/products/search/:searchkey"
                  element={<SerachProducts />}
                />
                <Route
                  path="/products/product/:productId"
                  element={<SingleProductPage />}
                />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/test" element={<OrderManagement />} />
                <Route path="/become-vendor" element={<BecomeVendor />} />
                <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
                <Route
                  path="/user-profile"
                  element={
                    <PrivateRoute>
                      <UserProfile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/order-history"
                  element={
                    <PrivateRoute>
                      <OrderHistory />
                    </PrivateRoute>
                  }
                />
              </Routes>
              <ToastContainer />
            </Router>
          </AuthProvider>
        </ProductProvider>
      </>
    );
  } else {
    return (
      <>
        <ProductProvider>
          <AuthProvider>
            <Router>
              <Routes>
                <Route path="/" element={<AdminHomePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/test" element={<OrderManagement />} />
              </Routes>
              <ToastContainer />
            </Router>
          </AuthProvider>
        </ProductProvider>
      </>
    );
  }
}

export default App;

function PublicRoute({ children }) {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return !currentUser ? children : <Navigate to="/" />;
}

// eslint-disable-next-line no-unused-vars
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return currentUser ? children : <Navigate to="/login" />;
}

// function AdminRoute({ children }) {
//   const { isVendor } = useAuth();
//   console.log(isVendor);
//   return isVendor ? children : <Navigate to="/" />;
// }
