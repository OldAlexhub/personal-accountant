import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Add from "../routes/Add";
import Home from "../routes/Home";
import Login from "../routes/Login";
import PL from "../routes/PL";
import Report from "../routes/Report";
import Signup from "../routes/Signup";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Replace with your authentication logic

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const RouteManager = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route
            path="pl"
            element={
              <ProtectedRoute>
                <PL />
              </ProtectedRoute>
            }
          />
          <Route
            path="add"
            element={
              <ProtectedRoute>
                <Add />
              </ProtectedRoute>
            }
          />
          <Route
            path="reports"
            element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteManager;
