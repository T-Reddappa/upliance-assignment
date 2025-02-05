import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { signUp } from "../../features/authSlice";
import { AppDispatch, RootState } from "../../store";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    const result = await dispatch(signUp(formData));

    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div
        className="w-[40%] m-auto  p-10  text-center   bg-green-50  rounded-lg shadow-xl"
        // style={{
        //   background: "var(--primary-color)",
        // }}
      >
        <p className="text-2xl font-bold text-center">SignUp</p>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {passwordError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {passwordError}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            size="small"
            margin="normal"
            color="secondary"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            size="small"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            color="secondary"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            size="small"
            color="secondary"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            size="small"
            color="secondary"
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ mt: 3 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography>
              Already have an account? <Link to="/signin">Sign In</Link>
            </Typography>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
