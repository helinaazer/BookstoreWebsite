import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import NavBar from "../Components/NavBar";
import { UserProvider } from "../Components/UserAdminContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    username: "",
    phoneNumber: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Function to capitalize the first letter of each word
    const capitalizeWords = (str) =>
      str.replace(/\b(\w)/g, (s) => s.toUpperCase());

    if (name === "firstName" || name === "lastName") {
      // Capitalize the first letter of each word for names
      formattedValue = capitalizeWords(value.toLowerCase());
    } else if (name === "email" || name === "username") {
      // Convert email to lowercase
      formattedValue = value.toLowerCase();
    } else if (name === "address") {
      // Capitalize each word in the address
      formattedValue = capitalizeWords(value);
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const validateForm = () => {
    const newErrors = {};

    // Password validation
    const password = formData.password;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8;

    if (!isValidLength || !hasUpperCase || !hasSpecialChar) {
      newErrors.password =
        "Password must be at least 8 characters long, contain at least one uppercase letter, and one special character.";
    }

    // Email validation
    if (!formData.email.includes("@")) {
      newErrors.email = "Email must contain an @ symbol and be a valid email.";
    }

    // Phone number validation (US 10-digit phone number)
    const phoneNumber = formData.phoneNumber;
    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      newErrors.phoneNumber =
        "Phone number must be a valid 10-digit US number.";
    }

    // Address validation (basic regex for US addresses)
    const addressRegex = /^\d+\s[\w\s.-]+/; // Accepts numbers, letters, spaces, dots, and hyphens
    if (!addressRegex.test(formData.address)) {
      newErrors.address = "Please enter a valid US address.";
    }

    // Username validation: only letters, numbers, and underscores
    const usernameRegex = /^[A-Za-z0-9_]+$/;
    if (!usernameRegex.test(formData.username)) {
      newErrors.username =
        "Username invalid. Only letters, numbers, and underscores are allowed.";
    }
    // Return the errors object
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Handle form submission logic here
      console.log(formData);
      setErrors({});
    }
  };

  return (
    <div className="background">
      <UserProvider>
        <NavBar
          logoSrc="/St_Mary_COC_Logo_No_Background.png"
          title="St. Mary's Coptic Orthodox Church Bookstore"
        />
      </UserProvider>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" sx={{ color: "#2b2d42" }}>
              Sign Up
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  value={formData.firstName}
                  onChange={handleChange}
                  InputLabelProps={{ sx: { color: "#2b2d42" } }}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  value={formData.lastName}
                  onChange={handleChange}
                  InputLabelProps={{ sx: { color: "#2b2d42" } }}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  InputLabelProps={{ sx: { color: "#2b2d42" } }}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={formData.password}
                  onChange={handleChange}
                  InputLabelProps={{ sx: { color: "#2b2d42" } }}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  name="address"
                  label="Address"
                  variant="outlined"
                  value={formData.address}
                  onChange={handleChange}
                  InputLabelProps={{ sx: { color: "#2b2d42" } }}
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  variant="outlined"
                  value={formData.username}
                  onChange={handleChange}
                  InputLabelProps={{ sx: { color: "#2b2d42" } }}
                  error={!!errors.username}
                  helperText={errors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  type="tel"
                  variant="outlined"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  InputLabelProps={{ sx: { color: "#2b2d42" } }}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="gender-label" sx={{ color: "#2b2d42" }}>
                    Gender
                  </InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    label="Gender"
                    required
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box textAlign="center" mt={4}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#2b2d42",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#1d202e" },
                }}
              >
                Sign Up
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Signup;
