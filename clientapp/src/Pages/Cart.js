import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { FaTrash } from "react-icons/fa";
import NavBar from "../Components/NavBar";
import { UserProvider } from "../Components/UserAdminContext";

function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    {
      id: 1,
      title: "You Are Loved Canvas Tote Bag",
      price: 14.99,
      quantity: 1,
      imgSrc: "./tote.png",
    },
    {
      id: 2,
      title: "Be Still Journal with Zipper",
      price: 24.99,
      quantity: 1,
      imgSrc: "./journal.png",
    },
  ]);

  const handleQuantityChange = (id, delta) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const navigateToProducts = () => {
    navigate("/products");
  };

  const navigateToCheckout = () => {
    navigate("/checkout"); // Assuming you have a route for checkout
  };

  const calculateSubtotal = () => {
    return items
      .reduce((acc, item) => acc + item.quantity * item.price, 0)
      .toFixed(2);
  };

  return (
    <div>
      <UserProvider>
        <NavBar
          logoSrc="/St_Mary_COC_Logo_No_Background.png"
          title="St. Mary's Coptic Orthodox Church Bookstore"
        />
      </UserProvider>
      <div className="cart-container">
        <h2>Your cart ({items.length} items)</h2>
        {items.map((item) => (
          <div className="item" key={item.id}>
            <img src={item.imgSrc} alt={item.title} className="item-image" />
            <div className="item-details">
              <div className="item-info">
                <p className="item-title">{item.title}</p>
                <span className="item-price">${item.price.toFixed(2)}</span>
                <div className="quantity-selector">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="quantity-button"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    readOnly
                    className="quantity-input"
                  />
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="quantity-button"
                  >
                    +
                  </button>
                  <FaTrash
                    className="delete-icon"
                    onClick={() => handleRemoveItem(item.id)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="subtotal">Subtotal: ${calculateSubtotal()}</div>
        <div className="buttons-container">
          <button
            onClick={navigateToProducts}
            className="add-more-items-button"
          >
            Add more items
          </button>
          <button
            onClick={navigateToCheckout}
            className="proceed-to-checkout-button"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
