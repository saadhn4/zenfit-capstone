import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Dashboard from "./components/User/Dashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Home from "./components/Home/Home"; // ✅ Import Home component

// ✅ Function to get the user's role from localStorage
const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("🚀 Checking stored user role:", user?.role); // ✅ Debugging
  return user ? user.role : null;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        {/* ✅ Default path set to Home */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/admin"
          element={
            getUserRole() === "Super Admin" ||
            getUserRole() === "Manager" ||
            getUserRole() === "Trainer" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
