import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import "./Products.css";
import Grid from "@mui/material/Grid";
import ItemCard from "../Components/ItemCard";
import { UserProvider } from "../Components/UserAdminContext";
import {
  useMediaQuery,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Grid as GridDialog,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // Importing Add Icon

const Products = () => {
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 33;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false); // State for Edit Dialog
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    quantity: "",
    isRequestable: false,
    categories: [],
    description: "",
    images: [],
  });
  const [selectedCategories, setSelectedCategories] = useState([]); // Track selected categories
  const [editProduct, setEditProduct] = useState(null); // State for the product being edited
  const isAdmin = true; // Replace with actual admin check logic

  // Prepopulate with some dummy categories
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

  const totalProducts = 100;
  const products = Array.from({ length: totalProducts }, (_, index) => ({
    id: index + 1,
    title: `Product ${index + 1}`,
    price: `$${((index + 1) * 5).toFixed(2)}`,
    image: "./agpeya.png",
    quantity: index % 3 === 0 ? 0 : 10,
    isRequestable: index % 5 === 0,
  }));

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenAddProduct = () => {
    setIsAddProductOpen(true);
  };

  const handleCloseAddProduct = () => {
    setIsAddProductOpen(false);
    resetNewProduct();
  };

  const resetNewProduct = () => {
    setNewProduct({
      title: "",
      price: "",
      image: "",
      quantity: "",
      isRequestable: false,
      categories: [],
      description: "",
      images: [],
    });
    setSelectedCategories([]); // Reset selected categories
  };

  const formatTitle = (title) => {
    return title.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatDescription = (description) => {
    return description.replace(/(?:^|\.\s*)(\w)/g, (match) =>
      match.toUpperCase()
    );
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "title") {
      formattedValue = formatTitle(value);
    } else if (name === "price") {
      formattedValue = value.replace(/[^0-9.]/g, "");
      if (formattedValue) {
        formattedValue = `$${parseFloat(formattedValue).toFixed(2)}`;
      }
    } else if (name === "quantity") {
      formattedValue = value.replace(/\D/g, "");
      if (parseInt(formattedValue) < 0) {
        formattedValue = "0";
      }
    } else if (name === "description") {
      formattedValue = formatDescription(value);
    }

    setNewProduct((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleCategoryChangeAddProduct = (event) => {
    const value = event.target.value;
    setSelectedCategories(value); // Update selected categories state
  };

  const handleSaveNewProduct = () => {
    console.log("New product created:", {
      ...newProduct,
      categories: selectedCategories,
    });
    setIsAddProductOpen(false);
  };

  const handleEditProductOpen = (product) => {
    setEditProduct(product);
    setIsEditProductOpen(true);
  };

  const handleCloseEditProduct = () => {
    setIsEditProductOpen(false);
    setEditProduct(null); // Reset edit product
  };

  const handleEditProductChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "title") {
      formattedValue = formatTitle(value);
    } else if (name === "price") {
      formattedValue = value.replace(/[^0-9.]/g, "");
      if (formattedValue) {
        formattedValue = `$${parseFloat(formattedValue).toFixed(2)}`;
      }
    } else if (name === "quantity") {
      formattedValue = value.replace(/\D/g, "");
      if (parseInt(formattedValue) < 0) {
        formattedValue = "0";
      }
    } else if (name === "description") {
      formattedValue = formatDescription(value);
    }

    setEditProduct((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleSaveEditProduct = () => {
    console.log("Product edited:", editProduct);
    setIsEditProductOpen(false);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));

    setNewProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const handleAddNewCategory = () => {
    if (newCategory.trim()) {
      const formattedCategory = formatTitle(newCategory);
      setCategories([...categories, formattedCategory]);
      setSelectedCategories([...selectedCategories, formattedCategory]);
      setIsAddCategoryDialogOpen(false);
      setNewCategory("");
    }
  };

  return (
    <div>
      <UserProvider>
        <NavBar
          logoSrc="/St_Mary_COC_Logo_No_Background.png"
          title="St. Mary's Coptic Orthodox Church Bookstore"
        />
      </UserProvider>
      <div className="products-page">
        <div className="ProductsHeader">Products</div>

        {isAdmin && (
          <div style={{ textAlign: "right", marginBottom: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenAddProduct}
              startIcon={<AddIcon />}
            >
              Add Product
            </Button>
          </div>
        )}

        <div className="products-container">
          {isMobile ? (
            <div className="category-filter">
              <FormControl fullWidth>
                <InputLabel id="category-label">Filter by Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  value={category}
                  label="Filter by Category"
                  onChange={handleCategoryChange}
                >
                  <MenuItem value="all">All Products</MenuItem>
                  <MenuItem value="books">Books</MenuItem>
                  <MenuItem value="supplies">Church Supplies</MenuItem>
                </Select>
              </FormControl>
            </div>
          ) : (
            <div className="sidebar">
              <ul className="category-list">
                <li onClick={() => setCategory("all")}>All Products</li>
                <li onClick={() => setCategory("books")}>Books</li>
                <li onClick={() => setCategory("supplies")}>Church Supplies</li>
              </ul>
            </div>
          )}
          <div className="products-content">
            <Grid container spacing={4}>
              {currentProducts.map((product) => (
                <Grid item xs={12} sm={4} md={4} lg={4} key={product.id}>
                  <ItemCard
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    quantity={product.quantity}
                    isRequestable={product.isRequestable}
                    categoriesList={product.categories}
                    isAdmin={isAdmin}
                    onEdit={() => handleEditProductOpen(product)} // Pass edit handler
                  />
                </Grid>
              ))}
            </Grid>

            <Pagination
              currentPage={currentPage}
              totalProducts={totalProducts}
              productsPerPage={productsPerPage}
              paginate={paginate}
            />
          </div>
        </div>
      </div>

      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onClose={handleCloseAddProduct}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <GridDialog container spacing={2}>
            <GridDialog item xs={12}>
              <TextField
                label="Product Name"
                name="title"
                value={newProduct.title}
                onChange={handleNewProductChange}
                fullWidth
                margin="normal"
              />
            </GridDialog>

            <GridDialog item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="category-select-label">Categories</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  multiple
                  value={selectedCategories}
                  onChange={handleCategoryChangeAddProduct}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 48 * 4.5 + 8,
                        width: 250,
                      },
                    },
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      <Checkbox
                        checked={selectedCategories.indexOf(category) > -1}
                      />
                      <ListItemText primary={category} />
                    </MenuItem>
                  ))}
                </Select>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => setIsAddCategoryDialogOpen(true)}
                >
                  + Add Category
                </Button>
              </FormControl>
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
              />
            </GridDialog>

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
          <Button onClick={handleCloseAddProduct}>Cancel</Button>
          <Button onClick={handleSaveNewProduct} variant="contained">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditProductOpen} onClose={handleCloseEditProduct}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {editProduct && (
            <GridDialog container spacing={2}>
              <GridDialog item xs={12}>
                <TextField
                  label="Product Name"
                  name="title"
                  value={editProduct.title}
                  onChange={handleEditProductChange}
                  fullWidth
                  margin="normal"
                />
              </GridDialog>

              <GridDialog item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="category-select-label-edit">
                    Categories
                  </InputLabel>
                  <Select
                    labelId="category-select-label-edit"
                    id="category-select-edit"
                    multiple
                    value={selectedCategories}
                    onChange={(event) =>
                      setSelectedCategories(event.target.value)
                    } // Update selected categories state
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 48 * 4.5 + 8,
                          width: 250,
                        },
                      },
                    }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        <Checkbox
                          checked={selectedCategories.indexOf(category) > -1}
                        />
                        <ListItemText primary={category} />
                      </MenuItem>
                    ))}
                  </Select>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => setIsAddCategoryDialogOpen(true)}
                  >
                    + Add Category
                  </Button>
                </FormControl>
              </GridDialog>

              <GridDialog item xs={12}>
                <TextField
                  label="Product Description"
                  name="description"
                  value={editProduct.description}
                  onChange={handleEditProductChange}
                  fullWidth
                  multiline
                  rows={3}
                  margin="normal"
                />
              </GridDialog>

              <GridDialog item xs={12}>
                <TextField
                  label="Price"
                  name="price"
                  value={editProduct.price}
                  onChange={handleEditProductChange}
                  fullWidth
                  margin="normal"
                />
              </GridDialog>

              <GridDialog item xs={12}>
                <TextField
                  label="Stock Quantity"
                  name="quantity"
                  value={editProduct.quantity}
                  onChange={handleEditProductChange}
                  fullWidth
                  margin="normal"
                  inputProps={{ type: "number", min: "0" }}
                />
              </GridDialog>

              <GridDialog item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={editProduct.isRequestable}
                      onChange={(e) =>
                        setEditProduct((prev) => ({
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
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditProduct}>Cancel</Button>
          <Button onClick={handleSaveEditProduct} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog
        open={isAddCategoryDialogOpen}
        onClose={() => setIsAddCategoryDialogOpen(false)}
      >
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent style={{ padding: "16px" }}>
          <TextField
            label="Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddCategoryDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddNewCategory} variant="contained">
            Add Category
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const Pagination = ({
  currentPage,
  productsPerPage,
  totalProducts,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={number === currentPage ? "active" : ""}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Products;
