import React, { useState } from "react";
import "./Checkout.css";
import NavBar from "../Components/NavBar";
import { UserProvider } from "../Components/UserAdminContext";

function Checkout() {
  const [pickup, setPickup] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePickupChange = (event) => {
    setPickup(event.target.checked);
  };

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div>
      <UserProvider>
        <NavBar
          logoSrc="/St_Mary_COC_Logo_No_Background.png"
          title="St. Mary's Coptic Orthodox Church Bookstore"
        />
      </UserProvider>

      <div className="checkout-container">
        <div className="shipping-info">
          <h2>Checkout</h2>
          <div className="steps">
            <div className="step active">
              <span>1</span> Shipping and Gift Options
            </div>
            <div className="step">
              <span>2</span> Payment and Billing
            </div>
            <div className="step">
              <span>3</span> Review and Place Order
            </div>
          </div>
          <form>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={pickup}
                  onChange={handlePickupChange}
                />
                Pick up in person at 4110 204th St SW, Lynnwood, WA 98036
              </label>
              {pickup && (
                <div>
                  <label>
                    Payment Method:
                    <select
                      onChange={handlePaymentChange}
                      value={paymentMethod}
                    >
                      <option value="">Select</option>
                      <option value="cash">Cash</option>
                      <option value="card">Card</option>
                    </select>
                  </label>
                  {paymentMethod && (
                    <>
                      <label>
                        First Name: <input type="text" required />
                      </label>
                      <label>
                        Last Name: <input type="text" required />
                      </label>
                      <label>
                        Email: <input type="email" required />
                      </label>
                      <label>
                        Phone Number: <input type="tel" required />
                      </label>
                    </>
                  )}
                </div>
              )}
            </div>
            {!pickup && (
              <>
                <div className="form-group">
                  <label>
                    First Name: <input type="text" required />
                  </label>
                  <label>
                    Last Name: <input type="text" required />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Street Address: <input type="text" required />
                  </label>
                  <label>
                    Add apt, suite, or other: <input type="text" />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Postal Code: <input type="text" required />
                  </label>
                  <label>
                    City: <input type="text" required />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    State:{" "}
                    <select required>
                      <option value="">Please Select</option>
                      <option value="WA">Washington</option>
                      {/* other states */}
                    </select>
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Phone Number: <input type="tel" required />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <input type="checkbox" />
                    Use as billing address
                  </label>
                </div>
              </>
            )}
            <button type="submit" className="primary-button">
              Next
            </button>
          </form>
        </div>
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-details">
            <p>Merchandise: CAD 179.95</p>
            <p>Shipping & Handling: CAD 19.95</p>
            <p>Tax: CAD 25.98</p>
            <p className="total">
              <strong>Order Total: CAD 225.88</strong>
            </p>
            <button className="secondary-button">Edit cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
