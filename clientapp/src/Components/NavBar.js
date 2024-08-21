import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./NavBar.css";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = () => {
  return (
    <AppBar position="static" className="custom-appbar">
      <Toolbar>
        <img
          src={"/bookstoreLogo.jpg"}
          alt="Bookstore Logo"
          style={{ height: "70px", marginRight: "10px" }}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          St. Mary's Coptic Orthodox Church Bookstore
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button
          color="inherit"
          href="https://www.stmaryseattle.org/Default.aspx"
        >
          St. Mary's COC Website
        </Button>
        <Button color="inherit" component={Link} to="/contact">
          Contact Us
        </Button>
        <Button color="inherit" component={Link} to="/search">
          Search
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          Cart
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login/Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
