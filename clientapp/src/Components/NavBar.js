import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  Menu,
  Box,
  Button,
  Divider,
  Drawer,
} from "@mui/material";
import {
  Search as SearchIcon,
  AccountCircle,
  ShoppingCart,
  Logout,
  Login,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";
import "./NavBar.css"; // Importing the CSS file
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import isAuthenticated from "../App"
import { AuthContext } from '../AuthContext';

const Navbar = () => {
  // Simulate user states
  const { isAuthenticated, isAdmin, username } = useContext(AuthContext);
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [productMenuAnchorEl, setProductMenuAnchorEl] = useState(null); // For Manage Products dropdown
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  // Handle account menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setProductMenuAnchorEl(null);
  };

  // Handle Manage Products dropdown
  const handleProductMenu = (event) => {
    setProductMenuAnchorEl(event.currentTarget);
  };

  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };

  console.log(isAdmin);
  console.log(isAuthenticated);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#00203FFF",
        padding: "10px 20px",
        boxShadow: "none",
        borderBottom: "2px solid #ADEFD1FF",
      }}
    >
      <Toolbar>
        {/* Hamburger menu for mobile */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ display: isMobile ? "block" : "none" }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo and Title */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            color: "white",
            fontWeight: "bold",
          }}
        >
          <img
            src="St_Mary_Coc_Logo_No_Background.png"
            alt="Logo"
            style={{ height: "60px", marginRight: "15px", borderRadius: "50%" }}
          />
          St.Mary's Coptic Orthodox Church Bookstore
        </Typography>

        {/* Links for larger screens */}
        {!isMobile && (
          <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Button
              component={Link}
              to="/"
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "white",
                textTransform: "none",
                "&:hover": {
                  transition: "0.3s ease",
                },
              }}
            >
              Home
            </Button>
            
            
            {/* Admin: Manage Products Dropdown */}
            {isAdmin && (
              <>
                <Button
                  onClick={handleProductMenu}
                  endIcon={<ExpandMoreIcon />}
                  sx={{
                    color: "white",
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": {
                      transition: "0.3s ease",
                    },
                  }}
                >
                  Manage Products
                </Button>
                {/* Dropdown for Manage Products */}
                <Menu
                  anchorEl={productMenuAnchorEl}
                  open={Boolean(productMenuAnchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      backgroundColor: "#00203FFF",
                      color: "#fff",
                    },
                  }}
                >
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/AdminAddItems"
                  >
                    Add Product
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/edit-product"
                  >
                    Edit Product
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/remove-product"
                  >
                    Remove Product
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/add-category"
                  >
                    Add Category
                  </MenuItem>
                </Menu>
              </>
            )}

            {/* Non-admin links */}
            {!isAdmin && (
              <>
                <Button
                  component={Link}
                  to="/stmary-coc"
                  sx={{
                    color: "white",
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": {
                      transition: "0.3s ease",
                    },
                  }}
                >
                  St.Mary's COC Website
                </Button>
                <Button
                  component={Link}
                  to="/contact"
                  sx={{
                    color: "white",
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": {
                      transition: "0.3s ease",
                    },
                  }}
                >
                  Contact Us
                </Button>
              </>
            )}
          </Box>
        )}

        {/* Search bar */}
        {!searchOpen && (
          <IconButton color="inherit" onClick={() => setSearchOpen(true)}>
            <SearchIcon />
          </IconButton>
        )}
        {searchOpen && (
          <InputBase
            placeholder="Search…"
            sx={{
              backgroundColor: "#fff",
              padding: "5px 10px",
              borderRadius: "20px",
              width: isMobile ? "100%" : "300px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
            inputProps={{ "aria-label": "search" }}
            endAdornment={
              <IconButton
                onClick={() => setSearchOpen(false)}
                sx={{ color: "#00203FFF" }}
              >
                ✕
              </IconButton>
            }
          />
        )}

        {/* Account and Cart Icons */}
        <IconButton
          edge="end"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
          sx={{ marginLeft: "10px" }}
        >
          <AccountCircle sx={{ color: "white" }} />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              backgroundColor: "#00203FFF",
              color: "#fff",
            },
          }}
        >
          {!isAuthenticated ? (
            <>
              <MenuItem onClick={handleClose}>
                <Login />{" "}
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Login
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Signup
                </Link>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={handleClose}>
                <Link
                  to="/profile"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  to="/orders"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Orders
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  to="/cart"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <ShoppingCart /> Cart
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Logout /> Logout
              </MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>

      {/* Drawer for mobile view */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            backgroundColor: "#00203FFF",
            height: "100%",
            color: "#fff",
            padding: "10px",
            transition: "transform 0.3s ease-in-out",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <MenuItem>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Home
            </Link>
          </MenuItem>
          <Divider sx={{ backgroundColor: "white" }} />

          {/* Admin-specific dropdown in drawer */}
          {isAdmin ? (
            <>
              <MenuItem onClick={handleProductMenu}>
                Manage Products <ExpandMoreIcon sx={{ color: "#ADEFD1FF" }} />
              </MenuItem>
              <Divider sx={{ backgroundColor: "white" }} />
              <MenuItem>
                <Link
                  to="/add-product"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Add Product
                </Link>
              </MenuItem>
              <Divider sx={{ backgroundColor: "white" }} />
              <MenuItem>
                <Link
                  to="/edit-product"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Edit Product
                </Link>
              </MenuItem>
              <Divider sx={{ backgroundColor: "white" }} />
              <MenuItem>
                <Link
                  to="/remove-product"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Remove Product
                </Link>
              </MenuItem>
              <Divider sx={{ backgroundColor: "white" }} />
              <MenuItem>
                <Link
                  to="/add-category"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Add Category
                </Link>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <Link
                  to="/stmary-coc"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  St.Mary's COC Website
                </Link>
              </MenuItem>
              <Divider sx={{ backgroundColor: "white" }} />
              <MenuItem>
                <Link
                  to="/contact"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Contact Us
                </Link>
              </MenuItem>
            </>
          )}

          {!isAuthenticated ? (
            <>
              <MenuItem>
                <Link
                  to="/login"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Login
                </Link>
              </MenuItem>
              <Divider sx={{ backgroundColor: "white" }} />
              <MenuItem>
                <Link
                  to="/signup"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Signup
                </Link>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <Link
                  to="/profile"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Profile
                </Link>
              </MenuItem>
              <Divider sx={{ backgroundColor: "white" }} />
              <MenuItem>
                <Link
                  to="/orders"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Orders
                </Link>
              </MenuItem>
              <Divider sx={{ backgroundColor: "white" }} />
              <MenuItem>
                <Link
                  to="/cart"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <ShoppingCart /> Cart
                </Link>
              </MenuItem>
              <Divider sx={{ backgroundColor: "white" }} />
              <MenuItem>
                <Logout /> Logout
              </MenuItem>
            </>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
