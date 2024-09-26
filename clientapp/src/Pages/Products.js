import React, { useState, useMemo, useCallback } from "react";
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
import AddIcon from "@mui/icons-material/Add";

const Products = () => {
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 33;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [errors, setErrors] = useState({
    title: "",
    price: "",
    quantity: "",
    description: "",
    categories: "",
  });

  const isAdmin = true;

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
  const products = useMemo(
    () =>
      Array.from({ length: totalProducts }, (_, index) => ({
        id: index + 1,
        title: `Product ${index + 1}`,
        price: `$${((index + 1) * 5).toFixed(2)}`,
        image: "./agpeya.png",
        quantity: index % 3 === 0 ? 0 : 10,
        isRequestable: index % 5 === 0,
      })),
    [totalProducts]
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = useMemo(
    () => products.slice(indexOfFirstProduct, indexOfLastProduct),
    [indexOfFirstProduct, indexOfLastProduct, products]
  );

  const paginate = useCallback(
    (pageNumber) => {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setCurrentPage]
  );

  const handleCategoryChange = useCallback((event) => {
    setCategory(event.target.value);
  }, []);

  const handleOpenAddProduct = () => {
    setIsAddProductOpen(true);
  };

  const handleCloseAddProduct = () => {
    setIsAddProductOpen(false);
    resetNewProduct();
  };

  const resetNewProduct = useCallback(() => {
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
    setSelectedCategories([]);
    setErrors({
      title: "",
      price: "",
      quantity: "",
      description: "",
      categories: "",
    });
  }, []);

  const handleNewProductChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setNewProduct((prev) => ({
        ...prev,
        [name]: value,
      }));

      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    },
    [setNewProduct, setErrors]
  );

  const handleCategoryChangeAddProduct = useCallback(
    (event) => {
      const value = event.target.value;
      setSelectedCategories(value);
      setErrors((prev) => ({
        ...prev,
        categories:
          value.length === 0 ? "At least one category is required." : "",
      }));
    },
    [setSelectedCategories, setErrors]
  );

  const handleSaveNewProduct = useCallback(() => {
    const newErrors = {
      title: newProduct.title ? "" : "Product name is required.",
      price: newProduct.price ? "" : "Price is required.",
      quantity: newProduct.quantity ? "" : "Stock quantity is required.",
      description: newProduct.description
        ? ""
        : "Product description is required.",
      categories:
        selectedCategories.length === 0
          ? "At least one category is required."
          : "",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => err !== "");

    if (!hasError) {
      console.log("New product created:", {
        ...newProduct,
        categories: selectedCategories,
      });
      setIsAddProductOpen(false);
      resetNewProduct();
    }
  }, [newProduct, selectedCategories, resetNewProduct]);

  const handleImageUpload = useCallback(
    (e) => {
      const files = Array.from(e.target.files);
      const newImages = files.map((file) => URL.createObjectURL(file));

      setNewProduct((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    },
    [setNewProduct]
  );

  const handleAddNewCategory = useCallback(() => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory]);
      setSelectedCategories([...selectedCategories, newCategory]);
      setIsAddCategoryDialogOpen(false);
      setNewCategory("");
    }
  }, [newCategory, categories, selectedCategories]);

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
                  {categories.map((category, index) => (
                    <MenuItem key={index} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          ) : (
            <div className="sidebar">
              <ul className="category-list">
                <li onClick={() => setCategory("all")}>All Products</li>
                {categories.map((category, index) => (
                  <li key={index} onClick={() => setCategory(category)}>
                    {category}
                  </li>
                ))}
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
                    onEdit={() => console.log("Edit product")}
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
      <AddProductDialog
        isOpen={isAddProductOpen}
        onClose={handleCloseAddProduct}
        newProduct={newProduct}
        handleNewProductChange={handleNewProductChange}
        handleCategoryChangeAddProduct={handleCategoryChangeAddProduct}
        handleImageUpload={handleImageUpload}
        selectedCategories={selectedCategories}
        errors={errors}
        handleSaveNewProduct={handleSaveNewProduct}
        categories={categories}
        setIsAddCategoryDialogOpen={setIsAddCategoryDialogOpen}
      />

      {/* Add Category Dialog */}
      <Dialog
        open={isAddCategoryDialogOpen}
        onClose={() => setIsAddCategoryDialogOpen(false)}
      >
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
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

// Separate AddProductDialog Component
const AddProductDialog = ({
  isOpen,
  onClose,
  newProduct,
  handleNewProductChange,
  handleCategoryChangeAddProduct,
  handleImageUpload,
  selectedCategories,
  errors,
  handleSaveNewProduct,
  categories,
  setIsAddCategoryDialogOpen,
}) => (
  <Dialog open={isOpen} onClose={onClose}>
    <DialogTitle>Add New Product</DialogTitle>
    <DialogContent>
      <GridDialog container spacing={2}>
        {/* Swap categories and product name */}
        <GridDialog item xs={12}>
          <FormControl fullWidth margin="normal" required>
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
            {errors.categories && (
              <Typography sx={{ color: "red", fontSize: "0.8rem", mt: 0.5 }}>
                {errors.categories}
              </Typography>
            )}
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
            label="Product Name"
            name="title"
            value={newProduct.title}
            onChange={handleNewProductChange}
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title}
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
            error={!!errors.description}
            helperText={errors.description}
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
            error={!!errors.price}
            helperText={errors.price}
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
            error={!!errors.quantity}
            helperText={errors.quantity}
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
                  handleNewProductChange({
                    target: { name: "isRequestable", value: e.target.checked },
                  })
                }
              />
            }
            label="Requestable"
          />
        </GridDialog>
      </GridDialog>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={handleSaveNewProduct} variant="contained">
        Add Product
      </Button>
    </DialogActions>
  </Dialog>
);

const Pagination = ({
  currentPage,
  productsPerPage,
  totalProducts,
  paginate,
}) => {
  const pageNumbers = useMemo(() => {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalProducts, productsPerPage]);

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
