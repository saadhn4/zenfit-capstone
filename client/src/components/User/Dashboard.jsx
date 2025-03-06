import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }
      try {
        const res = await axios.get("http://localhost:5001/api/users/getall", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.users[0]); // Assuming the first user is logged in
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {user.phone}
        </p>
        <p>
          <span className="font-semibold">Membership Type:</span>{" "}
          {user.membershipType}
        </p>
        <p>
          <span className="font-semibold">Weight:</span> {user.weight} kg
        </p>
        <p>
          <span className="font-semibold">Height:</span> {user.height} cm
        </p>
        <p>
          <span className="font-semibold">Age:</span> {user.age}
        </p>
        <p>
          <span className="font-semibold">Gender:</span> {user.gender}
        </p>
        <p>
          <span className="font-semibold">Email Verified:</span>{" "}
          {user.userVerify?.email ? "Yes" : "No"}
        </p>
        <p>
          <span className="font-semibold">Phone Verified:</span>{" "}
          {user.userVerify?.phone ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
