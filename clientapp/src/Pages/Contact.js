import React from "react";

const Contact = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to reach out to us!</p>
      <ul>
        <li>Email: contact@stmarysbookstore.org</li>
        <li>Phone: (123) 456-7890</li>
        <li>Address: 123 Church St, Seattle, WA 98101</li>
      </ul>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
