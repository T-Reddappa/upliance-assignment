import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { initializeAuth } from "./features/authSlice";
import Dashboard from "./pages/Dashboard";

function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initializeAuth()).then((result) => {
      if (initializeAuth.fulfilled.match(result)) {
        navigate("/");
      }
    });
  }, [dispatch]);

  return (
    <div className=" min-h-screen">
      {isAuthenticated && <Navbar />}
      <div className=" min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
