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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Link,
} from "@mui/material";
import "./ProfileInfo.css";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CustomButton from "./CustomeButton";

const ProfileInfo = ({ user, isAdmin }) => {
  const navigate = useNavigate();

  // Store the initial form data to revert on cancel
  const initialFormData = {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    password: user.password,
    accountCreated: user.accountCreated,
    shippingAddress: user.shippingAddress,
    phoneNumber: user.phoneNumber,
    email: user.email,
    isAdmin: user.isAdmin,
    gender: user.gender || "male", // Default to male if not specified
  };

  // State to manage the edit mode and form data
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
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
    // Typically make an API call to save the updated information to the database
    console.log("Saving data:", formData);
    setIsEditing(false);
    setHasChanged(false); // Reset change tracking after saving
  };

  // Handle cancel button click
  const handleCancelClick = () => {
    // Reset form data to the original values (including gender)
    setFormData(initialFormData);
    setIsEditing(false);
    setHasChanged(false); // Reset change tracking
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setHasChanged(true); // Mark that a change has been made
  };

  // Handle gender change from the dropdown
  const handleGenderChange = (e) => {
    setFormData((prevData) => ({ ...prevData, gender: e.target.value }));
    setHasChanged(true); // Mark that a change has been made
  };

  // Handle admin checkbox toggle
  const handleAdminChange = (e) => {
    const { checked } = e.target;
    setFormData((prevData) => ({ ...prevData, isAdmin: checked }));
    setHasChanged(true);
  };

  // Determine avatar image based on gender
  const getAvatarImage = () => {
    if (formData.gender === "female") {
      return "./female.png";
    } else if (formData.gender === "male") {
      return "./male.png";
    }
  };

  return (
    <Box className="profile-info-container">
      <Box className="left-side">
        <Avatar
          src={getAvatarImage()}
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
        <Box sx={{ textAlign: "center", marginTop: "16px" }}>
          {/* Add "Change Password" link below Cart */}
          <Link
            href="/resetpassword"
            underline="none"
            sx={{
              fontSize: "14px",
              color: "#001f3f",
              fontWeight: "bold",
              cursor: "pointer",
              textDecoration: "none", // No underline on hover
              "&:hover": {
                textDecoration: "none", // Ensure no underline on hover
              },
            }}
          >
            Change Password
          </Link>
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
            fullWidth
            margin="normal"
            disabled // Username is not editable
          />
          <TextField
            label="Password"
            name="password"
            value={formData.password}
            fullWidth
            margin="normal"
            disabled // Password field is always uneditable
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

          {/* Gender Dropdown Field */}
          <FormControl fullWidth margin="normal" disabled={!isEditing}>
            <InputLabel>Gender</InputLabel>
            <Select
              value={formData.gender}
              onChange={handleGenderChange}
              label="Gender"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
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
                sx={{
                  color: "#001f3f", // Navy blue color
                  borderColor: "#001f3f", // Navy blue border
                }}
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
