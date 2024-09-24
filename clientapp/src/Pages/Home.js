import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import "./Home.css";
import { UserProvider } from "../Components/UserAdminContext";
import Footer from "../Components/Footer";

import Category from "../Components/Category";
import axios from "axios";



const Home = () => {

  const [categories, setCategories] = useState([]);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categories/'); // Update this URL based on your backend endpoint
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  
  return (
    <div style={{ backgroundColor: "#f4f4f4" }}>
      <UserProvider>
        <NavBar
          logoSrc="/St_Mary_COC_Logo_No_Background.png"
          title="St. Mary's Coptic Orthodox Church Bookstore"
        />
      </UserProvider>

      <Container className="container">
        {/* Hero Section */}
        <Box className="hero-banner-no-image">
          <h1>Welcome to St. Mary's Bookstore</h1>
          <p>Your source for spiritual books and gifts.</p>
          <Button variant="contained" size="large" className="cta-button">
            Shop Now
          </Button>
        </Box>
        <div className="homeheader">Categories</div>
        <Category categories={categories} />;
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
