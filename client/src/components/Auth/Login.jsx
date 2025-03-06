import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting Data:", formData); // ✅ Debugging

    try {
      const res = await axios.post(
        "http://localhost:5001/api/public/login",
        formData
      );

      console.log("Response:", res.data); // ✅ Log response data

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Log stored user data for debugging
      const storedUser = JSON.parse(localStorage.getItem("user"));
      console.log("Stored user in localStorage:", storedUser);

      alert("Login successful!");

      // Redirect based on role
      const role = storedUser.role;
      console.log("User role:", role); // ✅ Log role

      if (role === "Super Admin" || role === "Manager" || role === "Trainer") {
        console.log("Redirecting to Admin Panel...");
        navigate("/admin"); // Redirect to admin panel
      } else {
        console.log("Redirecting to User Dashboard...");
        navigate("/dashboard"); // Redirect to user dashboard
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error
      );
      alert(error.response ? error.response.data.msg : "Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
