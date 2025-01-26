import React from 'react';
import '../App.css'; // Import the external CSS file // Ensure the file and export names match
import WetherApi from './WetherApi';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Welcome to AgriAssist !!</h1>
      <p>Your one-stop solution for smart farming.</p>

      {/* Main Feature: Crop Health Monitoring */}
      <section className="dashboard-section">
        <h2>Crop Health Monitoring</h2>
        <p>
          Monitor the health of your crops using advanced machine learning models to detect potential diseases 
          and suggest remedies. Stay informed and optimize your yield.
        </p>
        <button 
          className="dashboard-button" 
          onClick={() => alert('Crop Health Monitoring is coming soon!')}
        >
          Start Monitoring
        </button>
      </section>

      {/* Weather Component */}
      <section className="dashboard-section">
            <WetherApi></WetherApi>
      </section>
      

      {/* More Section */}
      <section className="dashboard-section">
        <h2>More</h2>
        <ul className="dashboard-list">
          <li>
            <button
              className="dashboard-link-button"
              onClick={() => alert('Crop Details is under construction!')}
            >
              Crop Details
            </button>
          </li>
          <li>
            <button
              className="dashboard-link-button"
              onClick={() => alert('More features coming soon!')}
            >
              Additional Features
            </button>
          </li>
        </ul>
      </section>
      <footer>
        
      </footer>
    </div>
  );
}

export default Dashboard;
