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
  const [items, setItems] = useState([]);

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
    categories: [],
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", image: "" });

  useEffect(() => {
    const allFieldsFilled =
      newItem.images.length > 0 &&
      newItem.title &&
      newItem.description &&
      newItem.price &&
      newItem.stockNumber;

    setIsButtonDisabled(!allFieldsFilled);
  }, [newItem]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
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

  const handleAddItem = () => {
    setItems([...items, { ...newItem, id: items.length + 1 }]);
    setNewItem({
      id: "",
      images: [],
      title: "",
      description: "",
      price: "",
      stockNumber: "",
      categories: [],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (!value.includes("add-category")) {
      setNewItem((prevItem) => ({
        ...prevItem,
        categories: typeof value === "string" ? value.split(",") : value,
      }));
    }
  };

  const handleAddCategoryClick = () => {
    setAddCategoryOpen(true);
  };

  const handleCloseAddCategory = () => {
    setAddCategoryOpen(false);
  };

  const handleAddNewCategory = () => {
    if (newCategory.name) {
      setCategories([...categories, newCategory.name]);
      setAddCategoryOpen(false);
      setNewCategory({ name: "", image: "" });
    }
  };

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
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          style={{ marginBottom: "20px" }}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            multiple
            value={newItem.categories}
            onChange={handleCategoryChange}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 224,
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
          value={newItem.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Description"
          name="description"
          value={newItem.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
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

        <Box className="admin-actions">
          <CustomButton
            variant="contained"
            onClick={handleAddItem}
            text={"Add Item"}
            disabled={isButtonDisabled}
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
          )
          .map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <ItemCardBig
                image={item.images[0]}
                title={item.title}
                description={item.description}
                price={item.price}
                stockNumber={item.stockNumber}
                categories={item.categories.join(", ")}
                isCart={false}
              />
            </Grid>
          ))}
      </Grid>

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
