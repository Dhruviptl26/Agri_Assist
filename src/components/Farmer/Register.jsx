import React, { useState } from "react";
import axios from 'axios';

function Register() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const data = {
      phoneNumber: phoneNumber,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/farmers/register", data);

      // If registration is successful
      
      setMessage(response.data);
      window.location.href="/login";  // Assuming the backend returns a success message like "Registration successful"
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An error occurred during registration. Please try again later.");
    }
  };

  return (
    <body className="registration">
    <div className="registration">
      <h1 className="Regi">Register</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>Phone Number</label>
          <br />
          <input
            type="text"
            value={phoneNumber}
            placeholder="Enter phone number"
            onChange={handlePhoneNumberChange}
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
          <label>Confirm Password</label>
          <br />
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={handleConfirmPasswordChange}
          />
          <br />
          <br />
          <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
    </body>
  );
}

export default Register;
