import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Link } from "react-router-dom";
import { useUser } from "./UserAdminContext";
import "./NavBar.css";

const NavBar = ({ logoSrc, title, onSearch }) => {
  const { user, setUser } = useUser();

  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showHamburger, setShowHamburger] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navLinksRef = useRef(null);
  const toolbarRef = useRef(null);
  const menuRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Function to handle click outside of the hamburger menu
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  // Effect to listen for clicks outside of the hamburger menu and resize events
  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    const handleResize = () => {
      // Automatically close the hamburger menu if the screen size increases
      if (!isMobile && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen, isMobile]);

  useEffect(() => {
    const checkOverflow = () => {
      setTimeout(() => {
        if (navLinksRef.current && toolbarRef.current) {
          const toolbarWidth = toolbarRef.current.clientWidth;
          const navLinksWidth = navLinksRef.current.scrollWidth;
          setShowHamburger(navLinksWidth > toolbarWidth || isMobile);
        }
      }, 0);
    };

    window.addEventListener("resize", checkOverflow);
    checkOverflow();

    return () => window.removeEventListener("resize", checkOverflow);
  }, [isMobile]);

  const handleSearchChange = (event) => setSearchText(event.target.value);
  const handleSearchClick = () => onSearch && onSearch(searchText);
  const handleSearchToggle = () => {
    setShowSearch((prev) => !prev);
    if (showSearch) setSearchText("");
  };

  const handleMenuToggle = () => setMenuOpen((prev) => !prev);
  const handlePersonMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handlePersonMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    setUser(null);
    handlePersonMenuClose();
  };

  const commonLinks = [{ label: "Home", to: "/" }];
  const adminLinks = [
    { label: "Manage Inventory", to: "/AdminAddItems" },
    { label: "Orders", to: "/orders" },
  ];
  const userLinks = [
    {
      label: "St. Mary's COC Website",
      to: "https://www.stmaryseattle.org/Default.aspx",
      external: true,
    },
    { label: "Contact Us", to: "/contact" },
  ];

  const roleBasedLinks = user.isAdmin
    ? [...commonLinks, ...adminLinks]
    : [...commonLinks, ...userLinks];

  const drawerContent = (
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: "#d9caaa",
        color: "rgb(54, 49, 39)",
        padding: "16px",
        width: "100%",
      }}
    >
      <List>
        {roleBasedLinks.map((link, index) => (
          <ListItem
            button
            key={index}
            component={link.external ? "a" : Link}
            to={link.external ? undefined : link.to}
            href={link.external ? link.to : undefined}
            onClick={() => setMenuOpen(false)}
          >
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
        <ListItem button onClick={handlePersonMenuClick}>
          {menuOpen ? "Manage" : <PersonIcon />}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        className="custom-appbar"
        sx={{ backgroundColor: "#d9caaa", color: "rgb(54, 49, 39)" }}
      >
        <Toolbar ref={toolbarRef}>
          <img
            src={logoSrc}
            alt="Bookstore Logo"
            style={{ height: "70px", marginRight: "10px" }}
          />
          {showSearch ? (
            <>
              <TextField
                id="search-bar"
                variant="outlined"
                placeholder="Search..."
                size="small"
                autoFocus
                value={searchText}
                onChange={handleSearchChange}
                sx={{ flexGrow: 1 }}
              />
              {searchText && (
                <Button color="inherit" onClick={handleSearchClick}>
                  Search
                </Button>
              )}
            </>
          ) : (
            <>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {title}
              </Typography>
              <div ref={navLinksRef} className="nav-links">
                {roleBasedLinks.map((link, index) => (
                  <Button
                    key={index}
                    color="inherit"
                    component={link.external ? "a" : Link}
                    to={link.external ? undefined : link.to}
                    href={link.external ? link.to : undefined}
                    sx={{ mx: 1 }}
                  >
                    {link.label}
                  </Button>
                ))}
              </div>
            </>
          )}
          {!showHamburger && (
            <IconButton color="inherit" onClick={handlePersonMenuClick}>
              <PersonIcon />
            </IconButton>
          )}
          <IconButton color="inherit" onClick={handleSearchToggle}>
            {showSearch ? <CloseIcon /> : <SearchIcon />}
          </IconButton>
          {showHamburger && (
            <IconButton
              color="inherit"
              className="menu-icon"
              onClick={handleMenuToggle}
              style={{ outline: "none" }}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </Toolbar>
        {menuOpen && (
          <Box
            ref={menuRef}
            sx={{
              position: "absolute",
              top: "64px",
              left: 0,
              width: "100%",
              backgroundColor: "#d9caaa",
              color: "rgb(54, 49, 39)",
              zIndex: 1300,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {drawerContent}
          </Box>
        )}
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handlePersonMenuClose}
        sx={{
          marginTop: "10px",
          marginLeft: showHamburger ? "16px" : "0px",
          "& .MuiPaper-root": {
            backgroundColor: "#d9caaa",
            color: "rgb(54, 49, 39)",
            borderRadius: "8px",
            padding: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            minWidth: "150px",
          },
        }}
      >
        {user ? (
          <>
            <MenuItem
              onClick={handlePersonMenuClose}
              component={Link}
              to="/profile"
            >
              Profile
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={handlePersonMenuClose}
              component={Link}
              to="/orders"
            >
              <ListAltIcon sx={{ mr: 1 }} /> Orders
            </MenuItem>
            <MenuItem
              onClick={handlePersonMenuClose}
              component={Link}
              to="/cart"
            >
              <ShoppingCartIcon sx={{ mr: 1 }} /> Cart
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </>
        ) : (
          <MenuItem
            onClick={handlePersonMenuClose}
            component={Link}
            to="/login"
          >
            Sign In/Up
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default NavBar;
