import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Profile from "./Pages/Profile";
import Orders from "./Pages/Orders";
import AdminAddItems from "./Pages/AdminAddItems";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />{" "}
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/adminadditems" element={<AdminAddItems />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Dynamic route */}
      </Routes>
    </Router>
  );
}

export default App;
