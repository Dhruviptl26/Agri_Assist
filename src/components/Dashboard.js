import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import WeatherApi from "./WeatherApi";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8080/api/crops")
      .then(response =>{setCrops(response.data)} )
      .catch(error => console.error("Error fetching crops:", error))
      .finally(() => setLoading(false));
     

  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("farmer");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("farmer");
    navigate("/login");
  };

  const handleQuantityChange = (cropId, change) => {
    setQuantity(prev => {
      const newQty = (prev[cropId] || 0) + change;
      return { ...prev, [cropId]: newQty < 0 ? 0 : newQty };
    });
  };

  const buyCrops = () => {
    const storedUser = JSON.parse(localStorage.getItem("farmer"));
    const farmerId = storedUser?.id;
    
    if (!farmerId) {
      alert("Farmer ID is missing! Please log in again.");
      navigate("/login");
      return;
    }

    const orders = Object.entries(quantity)
      .filter(([_, qty]) => qty > 0)
      .map(([cropId, qty]) => {
        const crop = crops.find(c => c.id === parseInt(cropId));
        
        if (!crop) {
          console.error(`Crop not found for ID: ${cropId}`);
          return null;
        }

        const price = Number(crop.price); // Ensure price is a valid number
        const totalPrice = qty * price; // Correct multiplication
        console.log(totalPrice);
        return {
          farmerId,
          cropId: parseInt(cropId),
          quantity: qty,
          totalPrice,
          paymentMethod: "COD",
        };
      })
      .filter(order => order !== null); // Remove any invalid entries

    if (orders.length === 0) {
      alert("Please select at least one crop to buy.");
      return;
    }

    axios.post("http://localhost:8080/api/orders/place", { orders })
      .then(response => {
        console.log("Order Response:", response.data);
        const orderId = response.data?.orders?.[0]?.orderId; 

        if (!orderId) {
          alert("Order placed, but orderId is missing.");
          return;
        }

        navigate(`/payment?orderId=${orderId}`);
      })
      .catch(error => {
        console.error("Order failed:", error.response?.data || error.message);
        alert("Order failed: " + (error.response?.data?.error || "Unknown error"));
      });
};

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome to AgriAssist!</h1>
        <div className="profile-container">
          <img
            src={user?.profileImage || "/default-profile.png"}
            alt="Profile"
            className="profile-photo"
            onClick={() => setShowProfile(!showProfile)}
          />
          {showProfile && user && (
            <div className="profile-dropdown">
              <h3>{user.name}</h3>
              <p>Phone: {user.phoneNumber}</p>
              <p>Email: {user.email}</p>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>

      <section className="dashboard-section">
        <WeatherApi />
      </section>

      <section className="dashboard-section">
        <h2>Available Crops</h2>
        {loading ? <p>Loading crops...</p> : (
          <div className="crop-grid">
            {crops.map(crop => (
              <div key={crop.id} className="crop-card">
                <h3>{crop.name}</h3>
                <p><strong>Price:</strong> ₹{crop.price}</p>
                <p><strong>Stock:</strong> {crop.quantity}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(crop.id, -1)}>-</button>
                  <span>{quantity[crop.id] || 0}</span>
                  <button onClick={() => handleQuantityChange(crop.id, 1)}>+</button>
                </div>
              </div>
            ))}
          </div>
        )}
        <button 
          className="buy-button"
          onClick={buyCrops} 
          disabled={Object.values(quantity).every(qty => qty === 0)}
        >
          Buy Selected Crops
        </button>
      </section>

      <footer className="dashboard-footer">
        <p>© 2025 AgriAssist. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Dashboard;
