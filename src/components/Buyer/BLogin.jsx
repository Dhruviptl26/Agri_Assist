import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function BLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const data = {
      phoneNumber: phoneNumber, // Match backend field name
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        JSON.stringify(data), // Convert data to JSON string
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("buyer", JSON.stringify(response.data)); // Store user details
        navigate("/buyer-dashboard"); // Navigate to Buyer Dashboard
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid phone number or password. Please try again.");
      } else {
        console.error("Login Error:", error);
        alert("An error occurred while logging in. Please try again later.");
      }
    }
  };

  const redirectToRegister = () => {
    navigate("/bregister");
  };

  return (
    <div className="login-body">
    <div className="login-container">
      <h1>Buyer Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Phone Number</label>
        <input
          type="text"
          value={phoneNumber}
          placeholder="Enter phone number"
          onChange={handlePhoneNumberChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={handlePasswordChange}
          required
        />
        <button type="submit">Login</button>
        <button type="button" onClick={redirectToRegister}>
          Don't have an account? Register
        </button>
      </form>
    </div>
    </div>
  );
}

export default BLogin;