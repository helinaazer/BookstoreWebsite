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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddProductDialog from "../Components/AddProductDialog";

const Products = () => {
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 33;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const isAdmin = true;

  // Categories will now contain both a name and an image
  const [categories, setCategories] = useState([
    { name: "Books", image: "/path/to/book-image.jpg" },
    { name: "Apparel", image: "/path/to/apparel-image.jpg" },
    // Add more categories as needed
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
  };

  const handleSaveNewProduct = (newProduct) => {
    console.log("New product created:", newProduct);
    setIsAddProductOpen(false);
  };

  const handleAddNewCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]); // Add the new category (name and image)
  };

  const handleDeleteCategories = (categoriesToDelete) => {
    setCategories((prevCategories) =>
      prevCategories.filter(
        (category) => !categoriesToDelete.includes(category.name)
      )
    ); // Remove the selected categories from the list
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
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value="all">All Products</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.name} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          ) : (
            <div className="sidebar">
              <ul className="category-list">
                <li onClick={() => setCategory("all")}>All Products</li>
                {categories.map((category) => (
                  <li
                    key={category.name}
                    onClick={() => setCategory(category.name)}
                  >
                    {category.name}
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

      <AddProductDialog
        open={isAddProductOpen}
        handleClose={handleCloseAddProduct}
        handleSave={handleSaveNewProduct}
        categories={categories} // Pass the categories
        handleAddNewCategory={handleAddNewCategory} // Pass the add category function
        handleDeleteCategories={handleDeleteCategories} // Pass the delete category function
      />
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
