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
          <div className="steps">{/* Steps */}</div>
          <form>
            <div className="form-group">
              <div className="pickup-option">
                <input
                  id="pickup"
                  type="checkbox"
                  checked={pickup}
                  onChange={handlePickupChange}
                />
                <label htmlFor="pickup">
                  Pick up in person at 4110 204th St SW, Lynnwood, WA 98036
                </label>
              </div>
              {pickup && <div>{/* Payment Method and further inputs */}</div>}
            </div>
            {/* Other form inputs and steps */}
            <button type="submit" className="primary-button">
              Next
            </button>
          </form>
        </div>
        <div className="order-summary">{/* Order summary */}</div>
      </div>
    </div>
  );
}

export default Checkout;
