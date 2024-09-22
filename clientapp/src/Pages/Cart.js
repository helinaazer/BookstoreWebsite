import React from "react";
import ItemCardBig from "../Components/ItemCardBig";
import NavBar from "../Components/NavBar";
import "./Cart.css";
import { UserProvider } from "../Components/UserAdminContext";
import CustomButton from "../Components/CustomeButton";

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      title:
        "Christopher Knight Home Daisy Outdoor Club Chair with Cushion (Set of 4), Teak Finish, Cream",
      description: "",
      price: 824.91,
      quantity: 1,
      stockNumber: 8,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      title:
        "Christopher Knight Home Daisy Outdoor Club Chair with Cushion (Set of 4), Teak Finish, Cream",
      description: "",
      price: 824.91,
      quantity: 1,
      stockNumber: 8,
    },
    {
      id: 3,
      image: "https://via.placeholder.com/150",
      title:
        "Christopher Knight Home Daisy Outdoor Club Chair with Cushion (Set of 4), Teak Finish, Cream",
      description: "",
      price: 824.91,
      quantity: 1,
      stockNumber: 8,
    },
  ];

  const handleRemove = (id) => {
    console.log("Remove item with id:", id);
  };

  const handleProceedToOrder = () => {
    console.log("Proceed to Order");
    // Add functionality to handle the order process
  };

  return (
    <div>
      <UserProvider>
        <NavBar
          logoSrc="/St_Mary_COC_Logo_No_Background.png"
          title="St. Mary's Coptic Orthodox Church Bookstore"
        />
      </UserProvider>
      <div className="header">Shopping Cart</div>
      {cartItems.map((item) => (
        <div key={item.id}>
          <ItemCardBig
            image={item.image}
            title={item.title}
            price={item.price}
            quantity={item.quantity}
            onRemove={() => handleRemove(item.id)}
            stockNumber={item.stockNumber}
            isCart={true}
          />
        </div>
      ))}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          marginTop: "10px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          Subtotal ({cartItems.length} item): $
          {cartItems
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2)}
        </h2>
        <CustomButton
          variant="contained"
          onClick={handleProceedToOrder}
          text={"Proceed to Order"}
        />
      </div>
    </div>
  );
};

export default Cart;
