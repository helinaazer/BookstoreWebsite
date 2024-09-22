import React, { useState, useEffect } from "react";
import ItemCardBig from "../Components/ItemCardBig";
import NavBar from "../Components/NavBar";
import TextField from "@mui/material/TextField";
import {
  Box,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "./AdminAddItems.css";
import { UserProvider } from "../Components/UserAdminContext";
import CustomButton from "../Components/CustomeButton";

const AdminAddItems = () => {
  const [items, setItems] = useState([]); // Initialize items state as an empty array

  // Categories array (you can add more categories as needed)
  const [categories, setCategories] = useState([
    "Books",
    "Apparel",
    "Jewelry",
    "Accessories",
    "Church Supplies",
    "Food Products",
    "Crosses",
    "Children",
  ]);

  const [newItem, setNewItem] = useState({
    id: "",
    images: [],
    title: "",
    description: "",
    price: "",
    stockNumber: "",
    categories: [], // Add categories field
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false); // Modal state
  const [newCategory, setNewCategory] = useState({ name: "", image: "" }); // New category state

  useEffect(() => {
    // Check if all fields are filled
    const allFieldsFilled =
      newItem.images.length > 0 &&
      newItem.title &&
      newItem.description &&
      newItem.price &&
      newItem.stockNumber;

    setIsButtonDisabled(!allFieldsFilled);
  }, [newItem]);

  // Handle image upload (multiple images)
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    const readers = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((images) => {
      setNewItem((prevItem) => ({ ...prevItem, images }));
    });
  };

  // Handle adding the item
  const handleAddItem = () => {
    setItems([...items, { ...newItem, id: items.length + 1 }]);
    setNewItem({
      id: "",
      images: [],
      title: "",
      description: "",
      price: "",
      stockNumber: "",
      categories: [], // Reset categories
    });
  };

  // Handle input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  // Handle category selection
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setNewItem((prevItem) => ({
      ...prevItem,
      categories: typeof value === "string" ? value.split(",") : value,
    }));
  };

  // Handle opening the "Add Category" modal
  const handleAddCategoryClick = () => {
    setAddCategoryOpen(true);
  };

  // Handle closing the modal
  const handleCloseAddCategory = () => {
    setAddCategoryOpen(false);
  };

  // Handle adding a new category
  const handleAddNewCategory = () => {
    if (newCategory.name) {
      setCategories([...categories, newCategory.name]);
      setAddCategoryOpen(false);
      setNewCategory({ name: "", image: "" });
    }
  };

  // Handle new category image upload
  const handleNewCategoryImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewCategory((prevCategory) => ({
        ...prevCategory,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <UserProvider>
        <NavBar
          logoSrc="/St_Mary_COC_Logo_No_Background.png"
          title="St. Mary's Coptic Orthodox Church Bookstore"
        />
      </UserProvider>
      <Box className="header">
        <Typography variant="h4" component="h1">
          Add Items
        </Typography>
      </Box>

      <Box className="admin-form">
        {/* File Upload Input */}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          style={{ marginBottom: "20px" }}
          required
        />

        {/* Category Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            multiple
            value={newItem.categories}
            onChange={handleCategoryChange}
            required
            renderValue={(selected) => selected.join(", ")}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 224, // Limit the height to 5 items (scrollable after)
                },
              },
            }}
          >
            <MenuItem value="add-category" onClick={handleAddCategoryClick}>
              <Typography color="primary">+ Add Category</Typography>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                <Checkbox checked={newItem.categories.indexOf(category) > -1} />
                <ListItemText primary={category} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Title"
          name="title"
          required
          value={newItem.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Description"
          name="description"
          required
          value={newItem.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          multiline
          rows={4} // Text area for description
        />

        <TextField
          label="Price"
          name="price"
          type="number"
          required
          value={newItem.price}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Stock Number"
          name="stockNumber"
          required
          type="number"
          value={newItem.stockNumber}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <Box className="admin-actions">
          <CustomButton
            variant="contained"
            onClick={handleAddItem}
            text={"Add Item"}
            disabled={isButtonDisabled} // Disable button based on form validation
          />
        </Box>
      </Box>

      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        {items
          .filter(
            (item) =>
              item.images.length > 0 &&
              item.title &&
              item.description &&
              item.price &&
              item.stockNumber
          ) // Only show items with all fields filled
          .map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <ItemCardBig
                image={item.images[0]} // Show the first image
                title={item.title}
                description={item.description}
                price={item.price}
                stockNumber={item.stockNumber}
                categories={item.categories.join(", ")} // Show categories as comma-separated list
                isCart={false}
              />
            </Grid>
          ))}
      </Grid>

      {/* Add Category Dialog */}
      <Dialog open={addCategoryOpen} onClose={handleCloseAddCategory}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleNewCategoryImageUpload}
            style={{ marginTop: "20px" }}
          />
          {newCategory.image && (
            <img
              src={newCategory.image}
              alt="New Category"
              style={{ width: "100px", marginTop: "20px" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddCategory} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddNewCategory} color="primary">
            Add Category
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminAddItems;
