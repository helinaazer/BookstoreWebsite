import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Chip,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { UserProvider } from "../Components/UserAdminContext";
import "./ManageOrders.css";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [orderIdSearch, setOrderIdSearch] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null); // Track which order is being edited
  const [editedStatus, setEditedStatus] = useState(""); // Track the status being edited

  // Hardcoded isAdmin for testing purposes
  const isAdmin = false;

  useEffect(() => {
    // Simulate fetching data
    const fetchedOrders = [
      {
        id: 6286437,
        date: "24/09/2024 12:30 PM",
        customer: "Hana Wharton",
        status: "Processing",
        items: 2,
        total: "£87.99",
      },
      {
        id: 6286438,
        date: "25/09/2024 10:45 AM",
        customer: "John Doe",
        status: "Dispatched",
        items: 3,
        total: "£120.50",
      },
      {
        id: 6286439,
        date: "23/09/2024 04:15 PM",
        customer: "Emily Davis",
        status: "Cancelled",
        items: 1,
        total: "£49.99",
      },
      {
        id: 6286440,
        date: "22/09/2024 11:10 AM",
        customer: "Mark Lee",
        status: "Dispatched",
        items: 5,
        total: "£299.99",
      },
    ];
    setOrders(fetchedOrders);
    setFilteredOrders(fetchedOrders);
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (statusFilter) {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    if (orderIdSearch) {
      filtered = filtered.filter((order) =>
        order.id.toString().includes(orderIdSearch)
      );
    }

    setFilteredOrders(filtered);
  }, [statusFilter, orderIdSearch, orders]);

  const statusColor = (status) => {
    switch (status) {
      case "Processing":
        return "orange";
      case "Dispatched":
        return "green";
      case "Cancelled":
        return "red";
      default:
        return "grey";
    }
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleOrderIdSearch = (event) => {
    setOrderIdSearch(event.target.value);
  };

  const startEditing = (orderId, currentStatus) => {
    setEditingOrderId(orderId);
    setEditedStatus(currentStatus);
  };

  const saveStatus = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: editedStatus } : order
      )
    );
    setEditingOrderId(null); // Stop editing mode
  };

  return (
    <div>
      <UserProvider>
        <NavBar
          logoSrc="/St_Mary_COC_Logo_No_Background.png"
          title="St. Mary's Coptic Orthodox Church Bookstore"
        />
      </UserProvider>
      <Box>
        <div className="homeheader">Manage Orders</div>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" }, // Stack vertically on small screens, horizontal on larger
            justifyContent: "space-between",
            mb: 2,
            p: 2,
          }}
        >
          <FormControl
            sx={{
              width: { xs: "100%", sm: "100%", md: 200 }, // Full width on small screens, 200px on medium and larger
              ml: { xs: 0, sm: 0, md: 7 }, // No left margin on small screens, margin-left 7 on medium and up
              mb: { xs: 2, sm: 2, md: 0 }, // Adds some bottom margin on small screens
            }}
          >
            <InputLabel>Status Filter</InputLabel>
            <Select
              value={statusFilter}
              onChange={handleStatusChange}
              label="Status Filter"
              sx={{
                fontSize: { xs: "1rem", sm: "1rem", md: "inherit" }, // Larger font size on small screens
              }}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="Processing">Processing</MenuItem>
              <MenuItem value="Dispatched">Dispatched</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Search by Order ID"
            variant="outlined"
            value={orderIdSearch}
            onChange={handleOrderIdSearch}
            sx={{
              ml: { xs: 0, sm: 0, md: 2 }, // No left margin on small screens, margin-left 2 on medium and up
              mr: { xs: 0, sm: 0, md: 7 },
              width: { xs: "100%", sm: "100%", md: 250 }, // Full width on small screens, 250px on medium and up
              fontSize: { xs: "1rem", sm: "1rem", md: "inherit" }, // Larger font size on small screens
            }}
          />
        </Box>

        <TableContainer
          component={Paper}
          elevation={3}
          sx={{ mt: 3, width: "90%", margin: "0 auto" }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Order ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Date/Time
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Customer
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Status
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Items
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Total
                  </Typography>
                </TableCell>
                {isAdmin && (
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Actions
                    </Typography>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": {
                      backgroundColor: "#f1f1f1",
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Link
                      to={`/orderdetails/${order.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Chip label={`#${order.id}`} color="primary" clickable />
                    </Link>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>
                    {editingOrderId === order.id ? (
                      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                        <Select
                          value={editedStatus}
                          onChange={(e) => setEditedStatus(e.target.value)}
                        >
                          <MenuItem value="Processing">Processing</MenuItem>
                          <MenuItem value="Dispatched">Dispatched</MenuItem>
                          <MenuItem value="Cancelled">Cancelled</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      <Tooltip title={order.status} placement="top" arrow>
                        <Chip
                          label={order.status}
                          sx={{
                            backgroundColor: statusColor(order.status),
                            color: "white",
                          }}
                        />
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  {isAdmin && (
                    <TableCell>
                      <Grid container spacing={1}>
                        <Grid item>
                          {editingOrderId === order.id ? (
                            <Tooltip title="Save" arrow>
                              <IconButton
                                aria-label="save"
                                onClick={() => saveStatus(order.id)}
                              >
                                <CheckIcon color="success" />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Edit Status" arrow>
                              <IconButton
                                aria-label="edit"
                                onClick={() =>
                                  startEditing(order.id, order.status)
                                }
                              >
                                <EditIcon color="secondary" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Grid>
                        <Grid item>
                          <Tooltip title="Delete Order" arrow>
                            <IconButton aria-label="delete">
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default ManageOrders;
