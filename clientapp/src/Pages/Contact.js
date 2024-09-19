import React, { useState } from "react";
import "./Contact.css";
import NavBar from "../Components/NavBar"; // Assuming you already have a NavBar component
import Footer from "../Components/Footer"; // Assuming Footer component with social media links
import { UserProvider } from "../Components/UserAdminContext"; // Context for user data

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="background">
      <UserProvider>
        <NavBar
          logoSrc="/St_Mary_COC_Logo_No_Background.png"
          title="St. Mary's Coptic Orthodox Church Bookstore"
        />
      </UserProvider>
      <div className="contact-background">
        <div className="contact-container">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="spacer"></div>{" "}
            {/* Added spacer for visual separation */}
            <textarea
              id="notes"
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={handleChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
