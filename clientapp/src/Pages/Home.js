import React from "react";
import NavBar from "../Components/NavBar";
import ItemCard from "../Components/ItemCard";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import "./Home.css"; // Import the CSS file
import { UserProvider } from "../Components/UserAdminContext";

const Home = () => {
  return (
    <div style={{ backgroundColor: "#e7decb" }}>
      <UserProvider>
        <NavBar
          logoSrc="/bookstoreLogo.jpg"
          title="St. Mary's Coptic Orthodox Church Bookstore"
        />
      </UserProvider>

      <Container className="container">
        <Box
          component="img"
          src="/home_pic.webp" // Replace with your image path
          alt="Home Page"
          className="smooth-image" // Adjust width and height as needed
        />

        <div className="homeheader">Categories</div>

        <Grid container spacing={3} className="grid-container">
          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard
              image="/home_pic.webp"
              title="Books"
              link="/product/1" // Add link to product here
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard
              image="/logo192.png"
              title="Mina"
              link="/product/2" // Add link to product here
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard
              image="https://via.placeholder.com/345x200"
              title="Sample Item 3"
              description="This item is also pretty cool. You might want to consider buying it."
              price="39.99"
              link="/product/3" // Add link to product here
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard
              image="https://via.placeholder.com/345x200"
              title="Sample Item 4"
              description="This item is also pretty cool. You might want to consider buying it."
              price="39.99"
              link="/product/4" // Add link to product here
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard
              image="https://via.placeholder.com/345x200"
              title="Sample Item 5"
              description="This item is also pretty cool. You might want to consider buying it."
              price="39.99"
              link="/product/5" // Add link to product here
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard
              image="https://via.placeholder.com/345x200"
              title="Sample Item 6"
              description="This item is also pretty cool. You might want to consider buying it."
              price="39.99"
              link="/product/6" // Add link to product here
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard
              image="https://via.placeholder.com/345x200"
              title="Sample Item 7"
              description="This item is also pretty cool. You might want to consider buying it."
              price="39.99"
              link="/product/7" // Add link to product here
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard
              image="https://via.placeholder.com/345x200"
              title="Sample Item 8"
              description="This item is also pretty cool. You might want to consider buying it."
              price="39.99"
              link="/product/8" // Add link to product here
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
