import React, { useState } from "react";
import axios from "axios";
import '../App.css';

const SellerLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { phoneNumber, password };

    try {
      const response = await axios.post("http://localhost:8080/api/seller/login", data);
      if (response.status === 200) {
        window.location.href = "/rdashbord";
      }
    } catch (error) {
      setErrorMessage(
        error.response && error.response.status === 401
          ? "Invalid phone number or password."
          : "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="login-container">
      <h1>Seller Login</h1>
      <form onSubmit={handleLogin}>
        <label>Phone Number:</label>
        <input type="text" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        <label>Password:</label>
        <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="/sregister">Register Here</a></p>
      </form>
    </div>
  );
};

export default SellerLogin;
