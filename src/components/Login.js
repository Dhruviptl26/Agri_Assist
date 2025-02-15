import React, { useState } from "react";
import axios from 'axios';
import '../App.css';
import {  useNavigate } from "react-router-dom";
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
      phoneNumber: userId, // Make sure to match the backend field name
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/farmers/login", data);
      

      if (response.status === 200) {
        <p>Login successful!</p>
        console.log(userId,password);
       // window.location.href="/dashbord";
      navigate("/dashbord");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        <p>Invalid phone number or password. Please try again.</p>
      } else {
        console.error("Error during login:", error);
       <p>An error occurred while logging in. Please try again later.</p>
      }
    }
  };

  const redirectToRegister = () => {
    window.location.href = "/register"; // Redirect to the registration page
  };

  return (
    <div className="farmer-login">
      <h1>Login </h1>

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
  );
}

export default Login;
