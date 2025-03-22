// filepath: f:\Login\my-app\src\components\Farmer\MasterDashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import marketImage from '../assets/market.png';
import weatherImage from '../assets/weather.jpg';
import "../Style/MasterDashboard.css";
function MasterDashboard() {
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'User', profileImage: '/default-profile.png', id: null };
  const [uploadedCrops, setUploadedCrops] = useState([]);
  const [uploadedBeans, setUploadedBeans] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    productType: '',
    variety: '',
    genetics: '',
    price: '',
    totalWeight: '',
    region: '',
    image: null,
    shellType: '',
    almondForm: '',
    peanutForm: '',
    size: '',
    productStatus: '',
    kernalPerQuintal: '',
  });

  const fetchCrops = useCallback(async () => {
    if (!user.id) return; // Don't fetch if no user ID
    
    try {
      const response = await axios.get(`http://localhost:8080/api/crops/farmer/${user.id}`);
      console.log('Crops:', response.data);
      const crops = response.data.filter(crop => 
        crop.name !== 'Peanut' && crop.name !== 'Almond' && crop.name !== 'Cashew'
      );
      setUploadedCrops(crops);
    } catch (error) {
      console.error('Error fetching crops:', error);
    }
  }, [user.id]);
  
  const fetchBeans = useCallback(async () => {
    if (!user.id) return; // Don't fetch if no user ID
    
    try {
      const response = await axios.get(`http://localhost:8080/api/crops/farmer/${user.id}`)
      .catch(error => console.error('API Error:', error.response?.status, error.response?.data));
      console.log('Beans:', response.data);
          const beans = response.data.filter(crop => 
        crop.name === 'Peanut' || crop.name === 'Almond' || crop.name === 'Cashew'
      );
      setUploadedBeans(beans);
    } catch (error) {
      console.error('Error fetching beans:', error);
    }
  }, [user.id]);
  useEffect(() => {
    if (user.id) {
      fetchCrops();
      fetchBeans();
    }
  }, [fetchCrops, fetchBeans, user.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    data.append('farmerId', user.id); // Append farmer ID to the form data

    try {
      if (selectedCrop) {
        await axios.put(`http://localhost:8080/api/crops/${selectedCrop.id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Crop updated successfully');
      } else {
        await axios.post('http://localhost:8080/api/crops', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Crop uploaded successfully');
      }
      fetchCrops();
      fetchBeans();
      setSelectedCrop(null); // Clear selected crop after successful upload/update
    } catch (error) {
      console.error('Error uploading/updating crop:', error);
    }
  };

  const handleDeleteCrop = async (cropId) => {
    try {
      await axios.delete(`http://localhost:8080/api/crops/${cropId}`);
      console.log('Crop deleted successfully');
      fetchCrops();
      fetchBeans();
    } catch (error) {
      console.error('Error deleting crop:', error);
    }
  };

  const handleEditCrop = (crop) => {
    setSelectedCrop(crop);
    setFormData({
      name: crop.name,
      productType: crop.productType,
      variety: crop.variety,
      genetics: crop.genetics,
      processingType: crop.processingType,
      price: crop.price,
      totalWeight: crop.totalWeight,
      region: crop.region,
      image: null,
      shellType: crop.shellType,
      almondForm: crop.almondForm,
      peanutForm: crop.peanutForm,
      size: crop.size,
      productStatus: crop.productStatus,
      kernalPerQuintal: crop.kernalPerKg ,
    });
  };

  return (
    <div className="master-dashboard">
      <nav className="navbar">
        <div className="profile-section">
          <img src={user.profileImage} alt="Profile" className="profile-photo" />
          <span>{user.name}</span>
          <h1 >Digital Market Space</h1>
        </div>
      </nav>
      <div className="content">
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <Link to="/market">
              <img src={marketImage} alt="Market" className="dashboard-card-image" />
              <h2>Market</h2>
            </Link>
          </div>
          <div className="dashboard-card">
            <Link to="/weather">
              <img src={weatherImage} alt="Weather Info" className="dashboard-card-image" />
              <h2>Weather Info</h2>
            </Link>
          </div>
        </div>
        <h2>Available Crops</h2>
        <div className="crops-grid">
          {uploadedCrops.map((crop, index) => (
            <div key={index} className="crop-card">
              <img src={`http://localhost:8080${crop.imageUrl}`} alt={crop.name} className="crop-image" />
              <h3>{crop.name}</h3>
              <p>Product Type: {crop.productType}</p>
              <p>Variety: {crop.variety}</p>
              <p>Genetics: {crop.genetics}</p>
              <p>Processing Type: {crop.processingType}</p>
              <p>Price: ₹{crop.price} per quintal</p>
              <p>Total Weight: {crop.totalWeight} quintal</p>
              <p>Region: {crop.region}</p>
              <button onClick={() => handleEditCrop(crop)} className="edit-button">Edit</button>
              <button onClick={() => handleDeleteCrop(crop.id)} className="delete-button">Delete</button>
            </div>
          ))}
        </div>
        <h2>Available Beans</h2>
        <div className="crops-grid">
          {uploadedBeans.map((bean, index) => (
            <div key={index} className="crop-card">
              <img src={`http://localhost:8080${bean.imageUrl}`} alt={bean.name} className="crop-image" />
              <h3>{bean.name}</h3>
              <p>Product Type: {bean.productType}</p>
              <p>Variety: {bean.variety}</p>
              <p>Genetics: {bean.genetics}</p>
              <p>Price: ₹{bean.price} per quintal</p>
              <p>Total Weight: {bean.totalWeight} quintal</p>
              <p>Region: {bean.region}</p>
              <p>Shell Type: {bean.shellType}</p>
              <p>Almond Form: {bean.almondForm}</p>
              <p>Peanut Form: {bean.peanutForm}</p>
              <p>Size: {bean.size}</p>
              <p>Product Status: {bean.productStatus}</p>
              {/* <p>Kernal Per quintal: {bean.kernalPerQuintal}</p> */}
              <button onClick={() => handleEditCrop(bean)} className="edit-button">Edit</button>
              <button onClick={() => handleDeleteCrop(bean.id)} className="delete-button">Delete</button>
            </div>
          ))}
        </div>
        {selectedCrop && (
          <div className="crop-form card">
            <h1>Edit Crop</h1>
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />

              <label htmlFor="productType">Product Type</label>
              <input type="text" id="productType" name="productType" value={formData.productType} onChange={handleInputChange} />

              <label htmlFor="variety">Variety</label>
              <input type="text" id="variety" name="variety" value={formData.variety} onChange={handleInputChange} />

              <label htmlFor="genetics">Genetics</label>
              <input type="text" id="genetics" name="genetics" value={formData.genetics} onChange={handleInputChange} />
              <label htmlFor='processingType'>Processing Type</label>
              <input type='text' id='processingType' name='processingType' value={formData.processingType} onChange={handleInputChange} />
              <label htmlFor="price">Price per weight unit (₹)</label>
              <input type="number" id="price" name="price" step="0.01" value={formData.price} onChange={handleInputChange} />

              <label htmlFor="totalWeight">Total Weight (quintal)</label>
              <input type="number" id="totalWeight" name="totalWeight" step="0.01" value={formData.totalWeight} onChange={handleInputChange} />

              <label htmlFor="region">Region of Origin</label>
              <input type="text" id="region" name="region" value={formData.region} onChange={handleInputChange} />

              <label htmlFor="shellType">Shell Type</label>
              <input type="text" id="shellType" name="shellType" value={formData.shellType} onChange={handleInputChange} />

              <label htmlFor="almondForm">Almond Form</label>
              <input type="text" id="almondForm" name="almondForm" value={formData.almondForm} onChange={handleInputChange} />

              <label htmlFor="peanutForm">Peanut Form</label>
              <input type="text" id="peanutForm" name="peanutForm" value={formData.peanutForm} onChange={handleInputChange} />

              <label htmlFor="size">Size</label>
              <input type="text" id="size" name="size" value={formData.size} onChange={handleInputChange} />

              <label htmlFor="productStatus">Product Status</label>
              <input type="text" id="productStatus" name="productStatus" value={formData.productStatus} onChange={handleInputChange} />

              {/* <label htmlFor="kernalPerKg">Kernal Per quintal</label>
              <input type="text" id="kernalPerKg" name="kernalPerKg" value={formData.kernalPerKg} onChange={handleInputChange} /> */}

              <label htmlFor="image">Upload Image</label>
              <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />

              <button type="submit" className="market-button">Update</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default MasterDashboard;
