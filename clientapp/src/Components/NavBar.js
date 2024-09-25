import React, { useState } from "react";
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
  Drawer,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import {
  Search as SearchIcon,
  Close as CloseIcon,
  AccountCircle,
  ShoppingCart,
  Logout,
  Login,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";
import "./NavBar.css";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [productMenuAnchorEl, setProductMenuAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [manageProductsOpen, setManageProductsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  // Handle account menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setProductMenuAnchorEl(null);
  };

  const handleProductMenu = (event) => {
    setProductMenuAnchorEl(event.currentTarget);
  };

  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#00203FFF",
        padding: isMobile ? "5px 10px" : "10px 20px",
        boxShadow: "none",
        borderBottom: "2px solid #ADEFD1FF",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Hamburger menu for mobile */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ display: isMobile ? "block" : "none" }}
        >
          <MenuIcon sx={{ fontSize: "30px" }} />
        </IconButton>

        {/* Logo and Title */}
        {!searchOpen && (
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: isMobile ? "1.2rem" : "1.5rem",
              whiteSpace: "normal",
              lineHeight: isMobile ? "1.2" : "1.5",
            }}
          >
            <img
              src="St_Mary_Coc_Logo_No_Background.png"
              alt="Logo"
              style={{
                height: isMobile ? "40px" : "60px",
                marginRight: "10px",
                borderRadius: "50%",
              }}
            />
            St.Mary's Coptic Orthodox Church Bookstore
          </Typography>
        )}

        {/* Links for larger screens */}
        {!isMobile && !searchOpen && (
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
            <SearchIcon sx={{ fontSize: "30px" }} />
          </IconButton>
        )}
        {searchOpen && (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              backgroundColor: "#fff",
              padding: "2px 10px",
              borderRadius: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              gap: "10px",
              width: isMobile ? "100%" : "auto",
            }}
          >
            <FormControl
              variant="outlined"
              sx={{
                width: isMobile ? "30%" : "15%",
                minWidth: "100px",
                height: "40px",
              }} // Adjusted for mobile
            >
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
                sx={{
                  height: "40px",
                  borderRadius: "10px",
                }}
              >
                <MenuItem value="books">Books</MenuItem>
                <MenuItem value="icons">Icons</MenuItem>
                <MenuItem value="candles">Candles</MenuItem>
                <MenuItem value="crosses">Crosses</MenuItem>
              </Select>
            </FormControl>

            <InputBase
              placeholder="Search…"
              sx={{
                flex: 1,
                padding: "5px 10px",
                borderRadius: "10px",
                backgroundColor: "#f4f4f4",
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              inputProps={{ "aria-label": "search" }}
            />

            {searchTerm && (
              <Button
                variant="contained"
                sx={{ backgroundColor: "#ADEFD1FF", height: "40px" }}
              >
                Search
              </Button>
            )}

            <IconButton
              onClick={() => {
                setSearchOpen(false);
                setSearchTerm("");
              }}
              sx={{ color: "#00203FFF" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        {/* Account and Cart Icons (Disabled for mobile) */}
        {!searchOpen && !isMobile && (
          <>
            <IconButton
              edge="end"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{ marginLeft: "10px" }}
            >
              <AccountCircle sx={{ color: "white", fontSize: "30px" }} />
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
                    <Login />
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
                  <MenuItem onClick={handleLogout}>
                    <Logout /> Logout
                  </MenuItem>
                </>
              )}
            </Menu>
          </>
        )}
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
          {isAdmin ? (
            <>
              <MenuItem
                onClick={() => setManageProductsOpen(!manageProductsOpen)}
              >
                Manage Products <ExpandMoreIcon sx={{ color: "#ADEFD1FF" }} />
              </MenuItem>
              {manageProductsOpen && (
                <>
                  <MenuItem>
                    <Link
                      to="/add-product"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Add Product
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/edit-product"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Edit Product
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/remove-product"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Remove Product
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/add-category"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Add Category
                    </Link>
                  </MenuItem>
                </>
              )}
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
              <MenuItem>
                <Link
                  to="/orders"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Orders
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/cart"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <ShoppingCart /> Cart
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
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
