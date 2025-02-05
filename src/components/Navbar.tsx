import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { signOut } from "../features/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="h-14 flex gap-3 items-center justify-between  border-b shadow-sm px-12">
      <div className=" flex items-center justify-cente gap-3">
        <p
          className="text-3xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
          style={{ color: "var(--primary-text-color)" }}
        >
          Counter
        </p>
      </div>
      <ul className="flex gap-6">
        {navItems.map((item) => (
          <li
            key={item.path}
            className={`font-semibold cursor-pointer ${
              isActive(item.path) ? " underline" : ""
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center gap-10">
        {isAuthenticated && <p>{user ? `Hey! ${user?.name}` : `Hey!`}</p>}
        {isAuthenticated && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => dispatch(signOut())}
          >
            SignOut
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
