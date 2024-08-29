import React from "react";
import { Avatar, Tabs, Tab, Box, TextField } from "@mui/material";
import "./ProfileInfo.css";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CustomButton from "./CustomeButton";

const ProfileInfo = ({ user }) => {
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    if (newValue === 0) {
      navigate("/orders");
    } else if (newValue === 1) {
      navigate("/cart");
    }
  };

  return (
    <Box className="profile-info-container">
      <Box className="left-side">
        <Avatar
          src={user.avatar}
          alt="User Avatar"
          sx={{
            width: { xs: 150, sm: 200, md: 300 }, // Responsive sizing
            height: { xs: 150, sm: 200, md: 300 },
            borderRadius: "50%",
            marginBottom: "8px",
          }}
        >
          JD
        </Avatar>
        <Box sx={{ textAlign: "center", marginTop: "8px" }}>
          <div style={{ fontSize: "30px", fontWeight: "bold" }}>
            {user.firstName} {user.lastName}
          </div>
        </Box>
        <Tabs
          orientation="vertical"
          value={false}
          onChange={handleTabChange}
          className="profile-tabs"
          TabIndicatorProps={{ style: { display: "none" } }}
        >
          <Tab
            icon={<ListAltIcon />}
            iconPosition="start"
            label="Orders"
            className="tab-button"
          />
          <Tab
            icon={<ShoppingCartIcon />}
            iconPosition="start"
            label="Cart"
            className="tab-button"
          />
        </Tabs>
      </Box>
      <Box className="right-side">
        <Box className="profile-details">
          <TextField
            label="First Name"
            value={user.firstName}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Last Name"
            value={user.lastName}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Username"
            value={user.username}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Password"
            value={user.password}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Account Created"
            value={user.accountCreated}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Shipping Address"
            value={user.shippingAddress}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Phone Number"
            value={user.phoneNumber}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Email"
            value={user.email}
            fullWidth
            margin="normal"
            disabled
          />
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <CustomButton text="Edit Information" />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileInfo;
