import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Import the external CSS file
import WeatherApi from "./WeatherApi";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false); // Toggle profile details
  const [crops, setCrops] = useState([]);
  const [farmerId, setFarmerId] = useState(1); // Replace with logged-in farmer ID

  useEffect(() => {
    axios.get("http://localhost:8080/api/crops")
      .then(response => setCrops(response.data))
      .catch(error => console.error("Error fetching crops:", error));
  }, []);

  const buyCrop = (cropId, quantity) => {
    axios.post(`http://localhost:8080/api/crops/buy/${farmerId}/${cropId}/${quantity}`)
      .then(response => alert("Purchase successful!"))
      .catch(error => alert("Purchase failed!"));
  };
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("farmer"));

    if (!storedUser) {
      navigate("/login"); // Redirect to login if no user is found
    } else {
      setUser(storedUser);
      navigate("/dashbord");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("farmer");
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <div className="dashboard-container">
      {/* Header with Profile */}
      <header className="dashboard-header">
        <h1>Welcome to AgriAssist !!</h1>
        
        
        <div className="profile-container">
          <img
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

      {/* Crop Health Monitoring Section */}
      <section className="dashboard-section">
        <h2>Crop Health Monitoring</h2>
        <p>
          Monitor the health of your crops using advanced AI models to detect diseases and suggest remedies.
        </p>
        <button 
          className="dashboard-button" 
          onClick={() => alert("Crop Health Monitoring is coming soon!")}
        >
          Start Monitoring
        </button>
      </section>

      {/* Weather Component */}
      <section className="dashboard-section">
        <WeatherApi />
      </section>

      {/* More Section */}
      <section className="dashboard-section">
        <h2>More</h2>
        <ul className="dashboard-list">
          <li>
            <button className="dashboard-link-button" onClick={() => alert("Crop Details is under construction!")}>
              Crop Details
            </button>
          </li>
          <li>
            <button className="dashboard-link-button" onClick={() => alert("More features coming soon!")}>
              Additional Features
            </button>
          </li>
        </ul>
      </section>
      <div>
      <h1>Available Crops</h1>
      <ul>
        {crops.map(crop => (
          <li key={crop.id}>
            {crop.name} - ₹{crop.price} (Stock: {crop.quantity})
            <button onClick={() => buyCrop(crop.id, 1)}>Buy 1</button>
          </li>
        ))}
      </ul>
    </div>
      <footer className="dashboard-footer">
        <p>© 2025 AgriAssist. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Dashboard;
