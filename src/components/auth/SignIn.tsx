import { TextField, Button, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../store";
import { signIn } from "../../features/authSlice";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(formData);
    const result = await dispatch(signIn(formData));
    if (signIn.fulfilled.match(result)) {
      navigate("/");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuestSignIn = () => {
    setFormData({ email: "upliance@gmail.com", password: "password123" });
  };

  return (
    <div
      className="m-auto w-[40%] p-10 bg-green-50  rounded-lg shadow-xl"
      // style={{
      //   background: "var(--primary-color)",
      // }}
    >
      <form onSubmit={handleSubmit} className="text-center m-auto ">
        <p className="text-2xl font-bold">SignIn</p>
        <div className="flex items-center flex-col">
          <TextField
            fullWidth
            required
            margin="normal"
            label="Email"
            name="email"
            size="small"
            type="email"
            color="secondary"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            required
            margin="normal"
            label="Password"
            name="password"
            size="small"
            type="password"
            color="secondary"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={isLoading}
            sx={{ mt: 3 }}
          >
            SignIn
          </Button>
          <Button
            onClick={() => handleGuestSignIn()}
            variant="outlined"
            color="secondary"
            disabled={isLoading}
            sx={{ mt: 3 }}
          >
            Guest SignIn
          </Button>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </Typography>
          </Box>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
