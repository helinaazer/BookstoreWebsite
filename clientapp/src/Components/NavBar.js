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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useUser } from "./UserAdminContext"; // Import the custom hook
import "./NavBar.css";

const NavBar = ({ logoSrc, title, onSearch }) => {
  const { user } = useUser(); // Access the user context
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showHamburger, setShowHamburger] = useState(false);
  const navLinksRef = useRef(null);
  const toolbarRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchToggle = () => {
    if (showSearch) {
      setSearchText(""); // Clear search text on close
    }
    setShowSearch((prev) => !prev);
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchText);
    }
  };

  // Define the common links for all users
  const commonLinks = [
    { label: "Home", to: "/" },
    { label: "Profile", to: "/profile", icon: PersonIcon },
  ];

  // Admin-specific links
  const adminLinks = [
    { label: "Admin Dashboard", to: "/admin", icon: DashboardIcon },
    { label: "Orders", to: "/orders", icon: ShoppingCartIcon },
  ];

  // Regular user-specific links
  const userLinks = [
    {
      label: "St. Mary's COC Website",
      to: "https://www.stmaryseattle.org/Default.aspx",
      external: true,
    },
    { label: "Contact Us", to: "/contact" },
    { label: "Cart", to: "/cart", icon: ShoppingCartIcon },
    { label: "Logout", to: "/logout" },
  ];

  // Combine links based on user's role
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
            onClick={() => setMenuOpen(false)} // Close menu on link click
          >
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
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
                    sx={{ mx: 1 }} // Add some margin for spacing
                  >
                    {link.icon && <link.icon sx={{ mr: 0.5 }} />}
                    {link.label}
                  </Button>
                ))}
              </div>
            </>
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
            sx={{
              position: "absolute",
              top: "64px", // Height of AppBar
              left: 0,
              width: "100%",
              backgroundColor: "#d9caaa",
              color: "rgb(54, 49, 39)",
              zIndex: 1300, // Ensure it appears on top of other elements
              display: "flex",
              justifyContent: "center",
            }}
          >
            {drawerContent}
          </Box>
        )}
      </AppBar>
    </>
  );
};

export default NavBar;
