import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../../App.css'; // Correct path to the App.css file

function BuyerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("buyer");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log("User data:", JSON.parse(storedUser)); // Log the user data
    } else {
      console.log("No user data found, redirecting to login.");
      navigate("/blogin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("buyer");
    navigate("/blogin");
  };

  return (
    <div className="dashboard-body">
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
        <h2>Buy Crops</h2>
        <Link to="/buy" className="buy-crops-link">Buy Crops</Link>
      </section>

      <footer className="dashboard-footer">
        <p>© 2025 AgriAssist. All rights reserved.</p>
      </footer>
    </div>
    </div>
  );
}

export default BuyerDashboard;