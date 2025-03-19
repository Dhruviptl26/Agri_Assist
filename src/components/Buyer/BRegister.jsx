import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function BRegister() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const data = {
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
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
      console.error("Registration Error:", error);
      alert("An error occurred while registering. Please try again later.");
    }
  };

  const redirectToLogin = () => {
    navigate("/blogin");
  };

  return (
    <div className="register-body">
    <div className="register-container">
      <h1>Buyer Register</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={handleNameChange}
          required
        />
        <label>Phone Number</label>
        <input
          type="text"
          value={phoneNumber}
          placeholder="Enter phone number"
          onChange={handlePhoneNumberChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={handleEmailChange}
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
        <button type="submit">Register</button>
        <button type="button" onClick={redirectToLogin}>
          Already have an account? Login
        </button>
      </form>
    </div>
    </div>
  );
}

export default BRegister;