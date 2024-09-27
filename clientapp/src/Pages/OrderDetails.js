import React from "react";
import "./OrderDetails.css";
import NavBar from "../Components/NavBar";
import { UserProvider } from "../Components/UserAdminContext";

const OrderDetails = () => {
  const order = {
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
    <UserProvider>
      <NavBar
        logoSrc="/St_Mary_COC_Logo_No_Background.png"
        title="St. Mary's Coptic Orthodox Church Bookstore"
      />
      <div className="order-details-page">
        <header className="page-header">
          <h1>Order Details</h1>
        </header>

        <main className="order-main-container">
          <section className="delivery-details">
            <h2>Delivery Details</h2>
            <OrderInfo label="Date Ordered" value={order.dateOrdered} />
            <OrderInfo label="Order Number" value={order.orderNumber} />
            <OrderInfo
              label="Order Status"
              value={
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              }
            />
            {order.items.map((item) => (
              <OrderItem key={item.id} item={item} />
            ))}
          </section>

          <OrderSummary order={order} />
        </main>
      </div>
    </UserProvider>
  );
};

const OrderInfo = ({ label, value }) => (
  <p>
    <strong>{label}:</strong> {value}
  </p>
);

const OrderItem = ({ item }) => (
  <div className="item">
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
);

const OrderSummary = ({ order }) => (
  <section className="order-summary">
    <h2>Order Total</h2>
    <OrderInfo label="Subtotal" value={`$${order.subtotal}`} />
    <OrderInfo label="Shipping" value={order.shipping} />
    <OrderInfo label="Sales Tax" value={`$${order.tax}`} />
    <OrderInfo label="Total" value={`$${order.total}`} />
  </section>
);

export default OrderDetails;
