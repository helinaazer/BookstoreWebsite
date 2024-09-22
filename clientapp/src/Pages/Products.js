import React from "react";
import NavBar from "../Components/NavBar";
import "./Cart.css";
import Grid from "@mui/material/Grid";
import "./Products.css";
import ItemCard from "../Components/ItemCard";
import { UserProvider } from "../Components/UserAdminContext";
import CategorySidebar from "../Components/CategorySidebar";

const Products = () => {
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
            <Grid item xs={12} sm={6} md={4} className="grid-item">
              <ItemCard
                image="./agpeya.png"
                title="Coptic Prayer Book of the Seven Hours"
                price="39.99"
                link="/product/3"
              />
            </Grid>

            {/* Additional Product Items */}
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
                title="Church Supplies"
                link="/product/2"
              />
            </Grid>

            {/* Additional Product Items */}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Products;
