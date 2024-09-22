import React from "react";
import NavBar from "../Components/NavBar";
//import ItemCard from "../Components/ItemCard";
//import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
//import BookIcon from "@mui/icons-material/Book";
import "./Home.css";
import { UserProvider } from "../Components/UserAdminContext";
import Footer from "../Components/Footer";
//import ImageCarousel from "../Components/ImageCarousel";
import Category from "../Components/Category";

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
        {/* <Grid container spacing={3} className="grid-container">
          
          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard
              icon={<BookIcon />}
              title="Spiritual Books"
              link="/product/1"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard image="/logo192.png" title="Crosses" link="/product/2" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard
              image="https://via.placeholder.com/345x200"
              title="Sample Item 3"
              description="This item is also pretty cool. You might want to consider buying it."
              price="39.99"
              link="/product/3"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard
              image="/logo192.png"
              title="Accessories and Jewelry"
              link="/product/2"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard
              image="/logo192.png"
              title="Church Supplies"
              link="/product/2"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard image="/logo192.png" title="Children" link="/product/2" />
          </Grid>

          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard
              image="/logo192.png"
              title="Icons and Wall Art"
              link="/product/2"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard image="/logo192.png" title="Apparel" link="/product/2" />
          </Grid>
        </Grid> */}
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
