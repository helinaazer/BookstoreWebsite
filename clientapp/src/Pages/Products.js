import NavBar from "../Components/NavBar";
import "./Cart.css";
import Grid from "@mui/material/Grid";
import "./Products.css";
import ItemCard from "../Components/ItemCard";
import { UserProvider } from "../Components/UserAdminContext";
import CategorySidebar from "../Components/CategorySidebar";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";  // Import Axios for API requests
import Product from "./ProductInfo";

const Products = () => {
  const { id } = useParams();  // Get category ID from URL if available
  const [products, setProducts] = useState([]);  // State to store products
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (id) {
          // If there is a categoryId in the URL, fetch products by category
          response = await axios.get(`http://localhost:8000/api/products/category/${id}/available-or-requestable/`);
        } else {
          // If no categoryId, fetch all available and requestable items
          response = await axios.get('http://localhost:8000/api/products/available-or-requestable/');
        }
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);  // Set loading to false once data is fetched
      }
    };

    fetchProducts();  // Fetch products when the component mounts or when `id` changes
  }, [id]);  // Refetch products when the categoryId changes

  if (loading) {
    return <div>Loading products...</div>;  // Display a loading message while fetching
  }


  return (
    <div>
      <UserProvider>
        <NavBar
          logoSrc="/St_Mary_COC_Logo_No_Background.png"
          title="St. Mary's Coptic Orthodox Church Bookstore"
        />
      </UserProvider>
      <div className="header">Products</div>
      <div className="container">
        <div className="sidebar">
          <CategorySidebar />
        </div>
        <div className="products">
          <Grid container spacing={3} className="grid-container">
        {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} className="grid-item">
              <ItemCard
                image= {product.image}  
                title= {product.productname}  
                price={product.productprice}
                link={'/product/${product.id}'}
              />
            </Grid>
          ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Products;
