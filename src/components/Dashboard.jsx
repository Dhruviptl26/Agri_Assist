import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WeatherApi from "./WeatherApi";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCrop, setNewCrop] = useState({ name: "", price: "", image: null });
  const [updateCrop, setUpdateCrop] = useState(null);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8080/api/crops")
      .then(response => { setCrops(response.data) })
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

  const handleCropChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewCrop(prev => ({ ...prev, image: files[0] }));
    } else {
      setNewCrop(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCropSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newCrop.name);
    formData.append("price", newCrop.price);
    formData.append("image", newCrop.image);

    axios.post("http://localhost:8080/api/crops", formData)
      .then(response => {
        setCrops([...crops, response.data]);
        setNewCrop({ name: "", price: "", image: null });
      })
      .catch(error => console.error("Error uploading crop:", error));
  };

  const handleRemoveCrop = (cropId) => {
    axios.delete(`http://localhost:8080/api/crops/${cropId}`)
      .then(() => {
        setCrops(crops.filter(crop => crop.id !== cropId));
      })
      .catch(error => console.error("Error removing crop:", error));
  };

  const handleUpdateCrop = (crop) => {
    setUpdateCrop(crop);
    setNewCrop({ name: crop.name, price: crop.price, image: null });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newCrop.name);
    formData.append("price", newCrop.price);
    if (newCrop.image) {
      formData.append("image", newCrop.image);
    }

    axios.put(`http://localhost:8080/api/crops/${updateCrop.id}`, formData)
      .then(response => {
        setCrops(crops.map(crop => crop.id === updateCrop.id ? response.data : crop));
        setUpdateCrop(null);
        setNewCrop({ name: "", price: "", image: null });
      })
      .catch(error => console.error("Error updating crop:", error));
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
        <h2>Upload New Crop</h2>
        <form onSubmit={updateCrop ? handleUpdateSubmit : handleCropSubmit}>
          <div>
            <label>
              Crop Name:
              <input
                type="text"
                name="name"
                value={newCrop.name}
                onChange={handleCropChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={newCrop.price}
                onChange={handleCropChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Image:
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleCropChange}
              />
            </label>
          </div>
          <button type="submit">{updateCrop ? "Update Crop" : "Upload Crop"}</button>
        </form>
      </section>

      <section className="dashboard-section">
        <h2>Uploaded Crops</h2>
        {loading ? <p>Loading crops...</p> : (
          <div className="crop-grid">
            {crops.map(crop => (
              <div key={crop.id} className="crop-card">
                <h3>{crop.name}</h3>
                <p><strong>Price:</strong> ₹{crop.price}</p>
                <img src={crop.imageUrl} alt={crop.name} className="crop-image" />
                <div className="crop-actions">
                  <button onClick={() => handleUpdateCrop(crop)}>Update</button>
                  <button onClick={() => handleRemoveCrop(crop.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="dashboard-footer">
        <p>© 2025 AgriAssist. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Dashboard;