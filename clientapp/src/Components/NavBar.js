import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./NavBar.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";

const NavBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleMenuToggle = () => {
    if (showSearch) {
      setShowSearch(false);
      setSearchText("");
    }
    setMenuOpen(!menuOpen);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchToggle = () => {
    if (showSearch) {
      setSearchText("");
    }
    setShowSearch(!showSearch);
  };

  return (
    <AppBar position="static" class="custom-appbar">
      <Toolbar>
        <img
          src={"/bookstoreLogo.jpg"}
          alt="Bookstore Logo"
          style={{ height: "70px", marginRight: "10px" }}
        />
        {showSearch ? (
          <>
            <TextField
              id="search-bar"
              className="text search-bar"
              variant="outlined"
              placeholder="Search..."
              size="small"
              autoFocus
              value={searchText}
              onChange={handleSearchChange}
              sx={{ flexGrow: 1 }}
            />
            {searchText && (
              <Button color="inherit" onClick={() => alert("Search clicked!")}>
                Search
              </Button>
            )}
          </>
        ) : (
          <>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              St. Mary's Coptic Orthodox Church Bookstore
            </Typography>
            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
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
              <Button color="inherit" component={Link} to="/cart">
                <ShoppingCartIcon />
              </Button>
              <Button color="inherit" component={Link} to="/login">
                <PersonIcon />
              </Button>
            </div>
          </>
        )}
        <IconButton color="inherit" onClick={handleSearchToggle}>
          {showSearch ? <CloseIcon /> : <SearchIcon />}
        </IconButton>
        <IconButton
          color="inherit"
          class="menu-icon"
          onClick={handleMenuToggle}
          style={{ outline: "none" }}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
