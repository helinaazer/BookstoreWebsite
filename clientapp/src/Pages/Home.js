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


const categories = [
  {
    title: "Category 1",
    image: "/image.png", // URL to the image
    link: "/products", // URL or path the user should be taken to when clicking
  },
  {
    title: "Category 2",
    image: "/image.png",
    link: "/products",
  },
  {
    title: "Category 3",
    image: "/image.png",
    link: "/products",
  },
  {
    title: "Category 4",
    image: "/image.png",
    link: "/products",
  },
  {
    title: "Category 5",
    image: "/image.png",
    link: "/products",
  },
  {
    title: "Category 6",
    image: "/image.png",
    link: "/products",
  },
  {
    title: "Category 7",
    image: "/image.png",
    link: "/products",
  },
  // Add more categories as needed
];

const Home = () => {


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
