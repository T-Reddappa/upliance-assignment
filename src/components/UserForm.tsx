import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { saveUser } from "../features/userSlice";

const UserForm = () => {
  const initialFormState = {
    name: "",
    address: "",
    email: "",
    phone: "",
  };
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialFormState);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Handle unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e: any) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  // Handle form changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setHasUnsavedChanges(true);
  };

  // Handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Generate unique ID
    const userId = uuidv4();
    const userData = {
      id: userId,
      ...formData,
      createdAt: new Date().toISOString(),
    };

    dispatch(saveUser(userData));

    // Save to local storage
    try {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      setShowSnackbar(true);
      setHasUnsavedChanges(false);
      setFormData(initialFormState);
    } catch (error) {
      console.error("Error saving to local storage:", error);
    }
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  // Handle dialog confirm
  const handleConfirmClose = () => {
    setShowDialog(false);
    setHasUnsavedChanges(false);
    window.close();
  };

  return (
    <div
      className="w-[50%] border shadow-xl rounded-md p-4 bg-white
    "
    >
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Form
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            margin="normal"
            label="Name"
            name="name"
            size="small"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            required
            margin="normal"
            label="Email"
            name="email"
            type="email"
            size="small"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            required
            margin="normal"
            label="Phone"
            size="small"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            required
            margin="normal"
            label="Address"
            name="address"
            size="small"
            multiline
            rows={3}
            value={formData.address}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Submit
          </Button>
        </form>
      </Box>

      {/* Unsaved Changes Dialog */}
      <Dialog open={showDialog} onClose={handleCloseDialog}>
        <DialogTitle>Unsaved Changes</DialogTitle>
        <DialogContent>
          <Typography>
            You have unsaved changes. Are you sure you want to leave?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmClose} color="error">
            Leave
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert severity="success" onClose={() => setShowSnackbar(false)}>
          User data saved successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserForm;
