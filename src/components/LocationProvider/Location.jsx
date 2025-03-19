import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Location = () => {
  const [userLocation, setUserLocation] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { searchResult, formData, calculatedPrice } = location.state || {};

  const handleLocationSubmit = () => {
    if (!userLocation.trim()) {
      alert('Please enter your location');
      return;
    }
    // Navigate to payment page with all the necessary data
    navigate("/payment", {
      state: {
        searchResult,
        formData,
        location: userLocation,
        calculatedPrice,
      },
    });
  };

  const handleCancel = () => {
    // Go back to previous page
    navigate(-1);
  };

  return (
    <div className="location-container">
      <div className="location-card">
        <h2>Enter Your Delivery Location</h2>
        
        <div className="location-details">
          <p>Product: {searchResult?.name}</p>
          <p>Price: {searchResult?.price} per quintal</p>
          <p>Total Weight: ₹{formData?.totalWeight} quintal</p>
          <p>Total Cost: ₹{calculatedPrice?.toFixed(2)}</p>
        </div>

        <div className="location-input">
          <label htmlFor="location">Delivery Address:</label>
          <textarea
            id="location"
            value={userLocation}
            onChange={(e) => setUserLocation(e.target.value)}
            placeholder="Enter your complete delivery address"
            rows="4"
          />
        </div>

        <div className="location-buttons">
          <button onClick={handleLocationSubmit} className="proceed-button">Proceed to Payment</button>
          <button onClick={handleCancel} className="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

