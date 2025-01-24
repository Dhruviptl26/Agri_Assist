import React, { useState } from "react";
import axios from "axios";
import "../App.css";

function SellerRegister() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = { phoneNumber, password };

    try {
      const response = await axios.post("http://localhost:8080/api/seller/register", data);
      if (response.status === 200) {
        setSuccessMessage("Registration successful for seller!");
        setErrorMessage("");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Phone number already registered. Try logging in.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="register-container">
      <h1>Seller Registration</h1>
      <form onSubmit={handleRegister}>
        <label>Phone Number:</label>
        <input
          type="text"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default SellerRegister;
