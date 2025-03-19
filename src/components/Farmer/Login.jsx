import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const data = {
      phoneNumber: userId, // Match backend field name
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/farmers/login",
        data, // Send data as JSON object
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data)); // Store user details
        navigate("/mdb"); // Navigate to Dashboard
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
    navigate("/register");
  };

  return (
    <div className="farmer-login">
    <div className="farmer-login">
      <h1>Login</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>Phone No</label>
          <br />
          <input
            type="text"
            value={userId}
            placeholder="Enter phone number"
            onChange={handleUserIdChange}
          />
          <br />
          <br />
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={handlePasswordChange}
          />
          <br />
          <br />
          <button type="button" onClick={redirectToRegister}>
            Don't have an account?
          </button>
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;
