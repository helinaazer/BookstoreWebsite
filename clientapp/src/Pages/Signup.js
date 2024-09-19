import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import NavBar from "../Components/NavBar";
import { UserProvider } from "../Components/UserAdminContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    username: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div>
      <UserProvider>
        <NavBar
          logoSrc="/bookstoreLogo.jpg"
          title="St. Mary's Coptic Orthodox Church Bookstore"
        />
      </UserProvider>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: "#d9caaa" }}>
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" sx={{ color: "rgb(54, 49, 39)" }}>
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
                  InputLabelProps={{ sx: { color: "rgb(54, 49, 39)" } }}
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
                  InputLabelProps={{ sx: { color: "rgb(54, 49, 39)" } }}
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
                  InputLabelProps={{ sx: { color: "rgb(54, 49, 39)" } }}
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
                  InputLabelProps={{ sx: { color: "rgb(54, 49, 39)" } }}
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
                  InputLabelProps={{ sx: { color: "rgb(54, 49, 39)" } }}
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
                  InputLabelProps={{ sx: { color: "rgb(54, 49, 39)" } }}
                />
              </Grid>
            </Grid>
            <Box textAlign="center" mt={4}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "rgb(54, 49, 39)",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#4a3e31" },
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
