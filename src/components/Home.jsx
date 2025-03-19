import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const goToFarmerRegistration = () => {
    navigate("/login");
  };

  const goToSellerRegistration = () => {
    navigate("/blogin");
  };

  return (
    <div className="home-container">
      <h1 className="msg">Welcome to Digital Farming Assist</h1>
      <p>Please select your role to register :</p>
      <div className="button-container">
        <button onClick={goToFarmerRegistration} className="role-button farmer">
          Farmer Registration
        </button>
        <button onClick={goToSellerRegistration} className="role-button seller">
          Buyer Registration
        </button>
      </div>
    </div>
  );
}

export default Home;
