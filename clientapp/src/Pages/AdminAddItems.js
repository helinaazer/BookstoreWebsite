import React, { useState, useEffect } from "react";
import ItemCardBig from "../Components/ItemCardBig";
import NavBar from "../Components/NavBar";
import TextField from "@mui/material/TextField";
import "./AdminAddItems.css";
import { UserProvider } from "../Components/UserAdminContext";
import CustomButton from "../Components/CustomeButton";

const AdminAddItems = () => {
  const [items, setItems] = useState([]); // Initialize items state as an empty array

  const [newItem, setNewItem] = useState({
    id: "",
    image: "",
    title: "",
    price: "",
    stockNumber: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    // Check if all fields are filled
    const allFieldsFilled =
      newItem.image &&
      newItem.title &&
      newItem.price &&
      newItem.stockNumber;

    setIsButtonDisabled(!allFieldsFilled);
  }, [newItem]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewItem((prevItem) => ({ ...prevItem, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddItem = () => {
    setItems([...items, { ...newItem, id: items.length + 1 }]);
    setNewItem({ id: "", image: "", title: "", price: "", stockNumber: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  return (
    <div>
      <UserProvider>
        <NavBar
          logoSrc="/bookstoreLogo.jpg"
          title="St. Mary's Coptic Orthodox Church Bookstore"
        />
      </UserProvider>
      <div className="header">Add Items</div>

      <div className="admin-form">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ marginBottom: "20px" }}
        />
        <TextField
          label="Title"
          name="title"
          value={newItem.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={newItem.price}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Stock Number"
          name="stockNumber"
          type="number"
          value={newItem.stockNumber}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <CustomButton
          variant="contained"
          onClick={handleAddItem}
          text={"Add Item"}
          disabled={isButtonDisabled} // Disable button based on form validation
        />
      </div>

      {items
        .filter((item) => item.image && item.title && item.price && item.stockNumber) // Only show items with all fields filled
        .map((item) => (
          <div key={item.id}>
            <ItemCardBig
              image={item.image}
              title={item.title}
              price={item.price}
              stockNumber={item.stockNumber}
              isCart={false}
            />
          </div>
        ))}
    </div>
  );
};

export default AdminAddItems;
