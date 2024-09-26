import React from "react";
import "./OrderDetails.css";
import NavBar from "../Components/NavBar";
import { UserProvider } from "../Components/UserAdminContext";

const OrderDetails = () => {
  const mockOrder = {
    dateOrdered: "2024-09-25",
    orderNumber: "123456",
    status: "Shipped",
    items: [
      {
        id: 6286427,
        image: "https://via.placeholder.com/100",
        name: "Product 1",
        price: 49.99,
        quantity: 1,
      },
      {
        id: 6286428,
        image: "https://via.placeholder.com/100",
        name: "Product 2",
        price: 39.99,
        quantity: 2,
      },
    ],
    subtotal: 129.97,
    shipping: "Free",
    tax: 8.0,
    total: 137.97,
  };

  return (
    <div>
      <UserProvider>
        <NavBar
          logoSrc="/St_Mary_COC_Logo_No_Background.png"
          title="St. Mary's Coptic Orthodox Church Bookstore"
        />
      </UserProvider>
      <div className="page-header">
        <h1>Order Details</h1>
      </div>
      <div className="main-container">
        <div className="order-container">
          <div className="delivery-details">
            <h2>Delivery Details</h2>
            <p>
              <strong>Date Ordered:</strong> {mockOrder.dateOrdered}
            </p>
            <p>
              <strong>Order Number:</strong> {mockOrder.orderNumber}
            </p>
            <p>
              <strong>Order Status:</strong>{" "}
              <span className={`status ${mockOrder.status.toLowerCase()}`}>
                {mockOrder.status}
              </span>
            </p>
            {mockOrder.items.map((item) => (
              <div key={item.id} className="item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <p>
                    <strong>Name:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Price:</strong> ${item.price}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-summary">
            <h2>Order Total</h2>
            <p>
              <strong>Subtotal:</strong> ${mockOrder.subtotal}
            </p>
            <p>
              <strong>Shipping:</strong> {mockOrder.shipping}
            </p>
            <p>
              <strong>Sales Tax:</strong> ${mockOrder.tax}
            </p>
            <p>
              <strong>Total:</strong> ${mockOrder.total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
