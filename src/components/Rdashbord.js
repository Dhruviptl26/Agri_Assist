import React, { useEffect, useState } from "react";
import axios from "axios";

function Rdashbord() {
  const [crops, setCrops] = useState([]);
  const [newCrop, setNewCrop] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    fetchCrops();
  }, []);

  // ✅ Show Crops (Fetch from Backend)
  const fetchCrops = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/crops");
      setCrops(response.data);
    } catch (error) {
      console.error("Error fetching crops:", error);
    }
  };

  // ✅ Add Crop to Backend
  const handleAddCrop = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/crops", newCrop);
      setCrops([...crops, response.data]); // Update state
      setNewCrop({ name: "", description: "", price: "", quantity: "" }); // Clear form
    } catch (error) {
      console.error("Error adding crop:", error);
    }
  };

  // ✅ Remove Crop from Backend
  const handleDeleteCrop = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/crops/${id}`);
      setCrops(crops.filter((crop) => crop.id !== id)); // Remove from state
    } catch (error) {
      console.error("Error deleting crop:", error);
    }
  };

  return (
    <div>
      <h1>🌾 Seller Crop Dashboard</h1>

      {/* ✅ Show Crops Section */}
      <div>
        <h2>📋 Available Crops</h2>
        {crops.length > 0 ? (
          <ul>
            {crops.map((crop) => (
              <li key={crop.id}>
                <strong>{crop.name}</strong> - {crop.description} - ₹{crop.price} - {crop.quantity}kg
                <button onClick={() => handleDeleteCrop(crop.id)}>❌ Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No crops available.</p>
        )}
      </div>

      {/* ✅ Add Crop Section */}
      <div>
        <h2>➕ Add New Crop</h2>
        <input
          type="text"
          placeholder="Crop Name"
          value={newCrop.name}
          onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newCrop.description}
          onChange={(e) => setNewCrop({ ...newCrop, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newCrop.price}
          onChange={(e) => setNewCrop({ ...newCrop, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity (kg)"
          value={newCrop.quantity}
          onChange={(e) => setNewCrop({ ...newCrop, quantity: e.target.value })}
        />
        <button onClick={handleAddCrop}>✅ Add Crop</button>
      </div>
    </div>
  );
}

export default Rdashbord;
