import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import ProductInfo from "./Pages/ProductInfo";
import Profile from "./Pages/Profile";
import Orders from "./Pages/Orders";
import AdminAddItems from "./Pages/AdminAddItems";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Products from "./Pages/Products";
import ResetPassword from "./Pages/ResetPassword";
import Checkout from "./Pages/Checkout";
import ManageOrders from "./Pages/ManageOrders";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/productinfo/:id" element={<ProductInfo />} />{" "}
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/adminadditems" element={<AdminAddItems />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/manageorders" element={<ManageOrders />} />
        {/* Dynamic route */}
      </Routes>
    </Router>
  );
}

export default App;
