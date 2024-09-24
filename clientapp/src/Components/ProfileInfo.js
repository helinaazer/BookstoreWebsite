import React, { useState } from "react";
import {
  Avatar,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import "./ProfileInfo.css";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CustomButton from "./CustomeButton";

const ProfileInfo = ({ user, isAdmin }) => {
  const navigate = useNavigate();

  // State to manage the edit mode and form data
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    password: user.password,
    accountCreated: user.accountCreated,
    shippingAddress: user.shippingAddress,
    phoneNumber: user.phoneNumber,
    email: user.email,
    isAdmin: user.isAdmin, // Track if the user is an admin
  });
  const [hasChanged, setHasChanged] = useState(false); // Track if fields have been changed

  // Handle tab change navigation
  const handleTabChange = (event, newValue) => {
    if (newValue === 0) {
      navigate("/orders");
    } else if (newValue === 1) {
      navigate("/cart");
    }
  };

  // Handle edit button click
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handle save button click (placeholder for actual save logic)
  const handleSaveClick = () => {
    // Here you would typically make an API call to save the updated information to the database
    console.log("Saving data:", formData);
    setIsEditing(false);
    setHasChanged(false); // Reset change tracking after saving
  };

  // Handle cancel button click
  const handleCancelClick = () => {
    // Reset form data to the original values from the user prop
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
      accountCreated: user.accountCreated,
      shippingAddress: user.shippingAddress,
      phoneNumber: user.phoneNumber,
      email: user.email,
      isAdmin: user.isAdmin, // Reset admin status
    });
    setIsEditing(false);
    setHasChanged(false); // Reset change tracking
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setHasChanged(true); // Mark that a change has been made
  };

  // Handle admin checkbox toggle --  Update DB
  const handleAdminChange = (e) => {
    const { checked } = e.target;
    setFormData((prevData) => ({ ...prevData, isAdmin: checked }));
    setHasChanged(true);
  };

  return (
    <Box className="profile-info-container">
      <Box className="left-side">
        <Avatar
          src={user.avatar}
          alt="User Avatar"
          sx={{
            width: { xs: 150, sm: 200, md: 300 },
            height: { xs: 150, sm: 200, md: 300 },
            borderRadius: "50%",
            marginBottom: "8px",
          }}
        >
          JD
        </Avatar>
        <Box sx={{ textAlign: "center", marginTop: "8px" }}>
          <div style={{ fontSize: "30px", fontWeight: "bold" }}>
            {formData.firstName} {formData.lastName}
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
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled={!isEditing} // Enable when editing
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          <TextField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          <TextField
            label="Account Created"
            name="accountCreated"
            value={formData.accountCreated}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Shipping Address"
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
        </Box>

        {/* Admin checkbox - only shown if the logged-in user is an admin */}
        {isAdmin && (
          <Box sx={{ marginBottom: "16px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isAdmin}
                  onChange={handleAdminChange}
                  color="primary"
                />
              }
              label="Make admin"
            />
          </Box>
        )}

        {/* Buttons */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          {!isEditing ? (
            <CustomButton text="Edit Information" onClick={handleEditClick} />
          ) : (
            <>
              {hasChanged && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveClick}
                  sx={{ marginRight: "10px" }}
                >
                  Save
                </Button>
              )}
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileInfo;
