import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  Grid as GridDialog,
  FormControlLabel,
  Typography,
} from "@mui/material";

// Utility function to capitalize the first letter of each word
const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const AddProductDialog = ({
  open,
  handleClose,
  handleSave,
  categories,
  handleAddNewCategory,
  //   handleDeleteCategories, // Add this prop to handle category deletion
}) => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "$",
    image: "",
    quantity: "",
    isRequestable: false,
    categories: [],
    description: "",
    images: [],
  });

  const [selectedCategories, setSelectedCategories] = useState([]); // For selecting categories for the product
  //const [categoriesToDelete, setCategoriesToDelete] = useState([]); // For selecting categories to delete
  const [newCategoryDialogOpen, setNewCategoryDialogOpen] = useState(false); // For controlling the category dialog
  const [newCategory, setNewCategory] = useState(""); // Category name input
  const [newCategoryImage, setNewCategoryImage] = useState(null); // Category image

  const [errors, setErrors] = useState({
    title: false,
    price: false,
    quantity: false,
    description: false,
    categories: false,
  });

  // Handle changes in product fields
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "title") {
      formattedValue = capitalizeWords(value);
    } else if (name === "price") {
      formattedValue = value.startsWith("$") ? value : `$${value}`;
    } else if (name === "quantity") {
      formattedValue = value.replace(/[^0-9]/g, ""); // Only numbers allowed
    }

    setNewProduct((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleCategoryChangeAddProduct = (event) => {
    setSelectedCategories(event.target.value);
  };

  // Save the new product and reset the form
  const handleSaveNewProduct = () => {
    const { title, price, quantity, description } = newProduct;
    const categoryError = selectedCategories.length === 0;

    setErrors({
      title: !title,
      price: !price || price === "$",
      quantity: !quantity,
      description: !description,
      categories: categoryError,
    });

    if (!title || !price || !quantity || !description || categoryError) {
      return;
    }

    handleSave({ ...newProduct, categories: selectedCategories });
    setNewProduct({
      title: "",
      price: "$",
      image: "",
      quantity: "",
      isRequestable: false,
      categories: [],
      description: "",
      images: [],
    });
    setSelectedCategories([]);
  };

  // Handle image uploads for product
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file)); // Convert the uploaded files to URLs

    setNewProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages], // Add new images to the existing array of images
    }));
  };

  // Open the "Add Category" dialog
  const openAddCategoryDialog = () => {
    setNewCategoryDialogOpen(true);
  };

  // Close the "Add Category" dialog
  const closeAddCategoryDialog = () => {
    setNewCategoryDialogOpen(false);
    setNewCategory("");
    setNewCategoryImage(null); // Reset fields
  };

  // Automatically capitalize the category name as the user types
  const handleNewCategoryChange = (e) => {
    setNewCategory(capitalizeWords(e.target.value)); // Automatically capitalize the first letter of each word
  };

  // Handle the new category image upload
  const handleNewCategoryImageUpload = (e) => {
    const file = e.target.files[0];
    setNewCategoryImage(URL.createObjectURL(file)); // Display the selected image
  };

  // Save the new category (name and image)
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      // Add the new category globally (parent state)
      handleAddNewCategory({
        name: newCategory.trim(),
        image: newCategoryImage,
      });

      // Automatically select the newly added category
      setSelectedCategories((prev) => [...prev, newCategory.trim()]);

      // Close the "Add Category" dialog
      closeAddCategoryDialog();
    }
  };

  // Handle selecting categories to delete
  //   const handleCategoryDeleteChange = (event) => {
  //     setCategoriesToDelete(event.target.value);
  //   };

  // Handle deleting selected categories
  //   const handleDeleteSelectedCategories = () => {
  //     handleDeleteCategories(categoriesToDelete); // Pass the selected categories to parent for deletion
  //     setCategoriesToDelete([]); // Reset the selected categories for deletion
  //   };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          {/* Select categories for the product */}
          <FormControl
            fullWidth
            margin="normal"
            required
            error={errors.categories}
          >
            <InputLabel id="category-select-label">Categories</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              multiple
              value={selectedCategories}
              onChange={handleCategoryChangeAddProduct}
              renderValue={(selected) => selected.join(", ")}
            >
              {categories.map((category) => (
                <MenuItem key={category.name} value={category.name}>
                  <Checkbox
                    checked={selectedCategories.indexOf(category.name) > -1}
                  />
                  <ListItemText primary={category.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Add a new category */}
          <GridDialog container spacing={2}>
            <GridDialog item xs={12}>
              <Button
                onClick={openAddCategoryDialog}
                variant="contained"
                sx={{ mt: 2 }}
              >
                + Add Category
              </Button>
            </GridDialog>
          </GridDialog>

          {/* Delete categories section
          <FormControl fullWidth margin="normal">
            <InputLabel id="delete-category-label">
              Select Categories to Delete
            </InputLabel>
            <Select
              labelId="delete-category-label"
              id="delete-category-select"
              multiple
              value={categoriesToDelete}
              onChange={handleCategoryDeleteChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {categories.map((category) => (
                <MenuItem key={category.name} value={category.name}>
                  <Checkbox
                    checked={categoriesToDelete.indexOf(category.name) > -1}
                  />
                  <ListItemText primary={category.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            onClick={handleDeleteSelectedCategories}
            variant="outlined"
            color="secondary"
            disabled={categoriesToDelete.length === 0} // Disable button if no categories selected
            sx={{ mt: 2 }}
          >
            Delete Selected Categories
          </Button> */}

          {/* Other fields for the new product */}
          <GridDialog container spacing={2}>
            <GridDialog item xs={12}>
              <TextField
                label="Product Name"
                name="title"
                value={newProduct.title}
                onChange={handleNewProductChange}
                fullWidth
                margin="normal"
                required
                error={errors.title}
              />
            </GridDialog>

            <GridDialog item xs={12}>
              <TextField
                label="Product Description"
                name="description"
                value={newProduct.description}
                onChange={handleNewProductChange}
                fullWidth
                multiline
                rows={3}
                margin="normal"
                required
                error={errors.description}
              />
            </GridDialog>

            <GridDialog item xs={12}>
              <TextField
                label="Price"
                name="price"
                value={newProduct.price}
                onChange={handleNewProductChange}
                fullWidth
                margin="normal"
                required
                error={errors.price}
              />
            </GridDialog>

            <GridDialog item xs={12}>
              <TextField
                label="Stock Quantity"
                name="quantity"
                value={newProduct.quantity}
                onChange={handleNewProductChange}
                fullWidth
                margin="normal"
                inputProps={{ type: "number", min: "0" }}
                required
                error={errors.quantity}
              />
            </GridDialog>

            {/* Product Images */}
            <GridDialog item xs={12}>
              <Typography variant="h6">Product Images</Typography>
              <GridDialog container spacing={2}>
                {newProduct.images?.map((img, index) => (
                  <GridDialog item xs={4} key={index}>
                    <img
                      src={img}
                      alt={`Product Image ${index + 1}`}
                      style={{ width: "100%", borderRadius: "4px" }}
                    />
                  </GridDialog>
                ))}
              </GridDialog>
              <Button variant="contained" component="label" sx={{ mt: 2 }}>
                Upload Images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleImageUpload}
                />
              </Button>
            </GridDialog>

            {/* Requestable Checkbox */}
            <GridDialog item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newProduct.isRequestable}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        isRequestable: e.target.checked,
                      }))
                    }
                  />
                }
                label="Requestable"
              />
            </GridDialog>
          </GridDialog>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveNewProduct} variant="contained">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={newCategoryDialogOpen} onClose={closeAddCategoryDialog}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            value={newCategory}
            onChange={handleNewCategoryChange} // Automatically capitalize input
            fullWidth
            margin="normal"
          />
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Upload Category Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleNewCategoryImageUpload}
            />
          </Button>
          {newCategoryImage && (
            <img
              src={newCategoryImage}
              alt="Category"
              style={{ width: "100%", height: "auto", marginTop: "10px" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddCategoryDialog}>Cancel</Button>
          <Button onClick={handleAddCategory} variant="contained">
            Add Category
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddProductDialog;
