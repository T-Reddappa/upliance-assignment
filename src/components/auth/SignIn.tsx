import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../store";
import { signIn } from "../../features/authSlice";

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
    const result = await dispatch(signIn(formData));
    if (signIn.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="m-auto w-[40%] border border-red-400 p-10 rounded-md">
      <form onSubmit={handleSubmit} className="text-center">
        <p className="text-2xl font-bold">SignUp</p>
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
          >
            SignUp
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
