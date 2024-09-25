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
} from "@mui/material";

const Products = () => {
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 33;
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Create 100 dummy products with unique names, prices, and quantities for testing
  const totalProducts = 100;
  const products = Array.from({ length: totalProducts }, (_, index) => ({
    id: index + 1, // Ensure each product has a unique id
    title: `Product long for testing purposes ${index + 1}`,
    price: `$${(index + 1) * 5}.99`, // Different prices for testing
    image: "./agpeya.png",
    quantity: index % 3 === 0 ? 0 : 10, // Every third product is out of stock
    isRequestable: index % 5 === 0, // Every fifth product is requestable
  }));

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // Calculate the current products to display
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page and scroll to top
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top with smooth behavior
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
                    isAdmin={true} // Set this based on the user's role
                  />
                </Grid>
              ))}
            </Grid>

            {/* Pagination Component */}
            <Pagination
              currentPage={currentPage}
              totalProducts={totalProducts}
              productsPerPage={productsPerPage}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Define the Pagination component
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
