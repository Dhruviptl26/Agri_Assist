// Market.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Style/Market.css"
import { useNavigate } from 'react-router-dom';
import riceImage from '../assets/rice.png';
import cornImage from '../assets/corn.png';
import wheatImage from '../assets/wheat.png';
import peanutImage from '../assets/peanutImage.jpg';
import almondImage from '../assets/almondImage.jpg';
import cashewImage from '../assets/cashewImage.jpg';
import BajaraImage from '../assets/bajara.jpg';
import JowarImage from '../assets/jowar.jpg';
import cropimage from "../assets/cropimage.jpg";
import dryfruitsimage from "../assets/dryfruits.jpg";
const Market = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [view, setView] = useState('main');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    productType: 'all',
    variety: 'all',
    genetics: 'all',
    price: '',
    totalWeight: '',
    region: 'all',
    image: null,
    shellType: 'all',
    almondForm: 'all',
    peanutForm: 'all',
    size: 'all',
    productStatus: 'all',
    kernalPerQuintal: 'all',
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || !storedUser.id) {
      alert("You must be logged in as a farmer to upload crops. Please login again.");
      navigate('/login');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleGrainsClick = () => {
    setView('grains');
  };

  const handleBeansClick = () => {
    setView('beans');
  };

  const handleCropClick = (crop) => {
    setSelectedCrop(crop);
    setFormData({ ...formData, name: crop.name });
    setView('cropForm');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Validate required numeric fields
    if (!formData.price || !formData.totalWeight || formData.price <= 0 || formData.totalWeight <= 0) {
      alert("Please enter valid values for price and total weight");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Use farmerId in the API request as required by the backend
    data.append('farmerId', Number(user.id));

    // Log the form data to debug
    for (let pair of data.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const response = await axios.post('http://localhost:8080/api/crops', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Crop uploaded successfully:', response.data);
      alert('Crop uploaded successfully!');
      setView('main');
    } catch (error) {
      console.error('Error uploading crop:', error);
      if (error.response) {
        // The request was made and the server responded with an error status
        alert(`Error: ${error.response.data.message || 'Server error occurred'}`);
      } else if (error.request) {
        // The request was made but no response was received
        alert('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request
        alert(`Error: ${error.message}`);
      }
    }
  };

  const crops = [
    { name: 'Rice', image: riceImage },
    { name: 'Corn', image: cornImage },
    { name: 'Wheat', image: wheatImage },
    {name : 'Bajra', image: BajaraImage},
    {name : 'Jowar',image : JowarImage}
  ];

  const beans = [
    { name: 'Peanut', image: peanutImage },
    { name: 'Almond', image: almondImage },
    { name: 'Cashew', image: cashewImage },
  ];

  return (
    <div className="market-page">
      <header className="market-header1">
        <h1>Welcome to the Market</h1>
</header>
    <div className="market-container">
      <div className="background-image"></div>
      <div className="market-header">
      </div>
      {view === 'main' && (
        <>
          <div className="button-container">
            <div className="button-cards">
              <div className="button-card">
            <button onClick={handleGrainsClick} className="market-button">
               <img src={cropimage} alt="Market" className="button-card-image" />
              Grains
            </button>
            </div>
            <div className="button-card">
            <button onClick={handleBeansClick} className="market-button">
            <img src={dryfruitsimage} alt="Market" className="button-card-image" />
              Beans
            </button>
            </div>
            </div>
          </div>
        </>
      )}
      
      {view === 'grains' && (
        <>
          <h1 style={{ textAlign: "center" }}>Grains</h1>
          <div className="crops-grid">
            {crops.map((crop, index) => (
              <div key={index} className="crop-circle" onClick={() => handleCropClick(crop)}>
                <img src={crop.image} alt={crop.name} className="crop-image" />
                <p>{crop.name}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setView('main')} className="market-button">
            Back
          </button>
        </>
      )}
      {view === 'beans' && (
        <>
          <h1 style={{ textAlign: "center" }}>Beans</h1>
          <div className="crops-grid">
            {beans.map((bean, index) => (
              <div key={index} className="crop-circle" onClick={() => handleCropClick(bean)}>
                <img src={bean.image} alt={bean.name} className="crop-image" />
                <p>{bean.name}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setView('main')} className="market-button">
            Back
          </button>
        </>
      )}
      {view === 'cropForm' && selectedCrop && (
        <div className="crop-form card">
          <h1>{selectedCrop.name}</h1>
          <img src={selectedCrop.image} alt={selectedCrop.name} className="crop-image" />
          <form onSubmit={handleFormSubmit}>
            {selectedCrop.name === 'Rice' && (
              <>
                <label htmlFor="productType">Product Type</label>
                <select id="productType" name="productType" value={formData.productType} onChange={handleInputChange}>
                  <option value="all">All</option>
                  <option value="mediumgrain">Medium Grain</option>
                  <option value="japonica">Japonica</option>
                  <option value="indica">Indica</option>
                  <option value="javanica">Javanica</option>
                </select>

                <label htmlFor="variety">Variety</label>
                <select id="variety" name="variety" value={formData.variety} onChange={handleInputChange}>
                  <option value="all">All</option>
                  <option value="basmati">Basmati</option>
                  <option value="brown">Brown</option>
                  <option value="sona masoori">Sona Masoori</option>
                  <option value="bamboo">Bamboo</option>
                  <option value="glutinous">Glutinous</option>
                  <option value="samba">Samba</option>
                </select>
              </>
            )}
            {selectedCrop.name === 'Corn' && (
              <>
                <label htmlFor="productType">Product Type</label>
                <select id="productType" name="productType" value={formData.productType} onChange={handleInputChange}>
                  <option value="all">All</option>
                  <option value="indian">Indian</option>
                  <option value="sweetcorn">Sweet Corn</option>
                  <option value="whitecorn">White Corn</option>
                  <option value="popcorn">Popcorn - Butterfly</option>
                </select>

                <label htmlFor="genetics">Genetics</label>
                <select id="genetics" name="genetics" value={formData.genetics} onChange={handleInputChange}>
                  <option value="all">All</option>
                  <option value="gmo">GMO</option>
                  <option value="nongmo">Non-GMO</option>
                </select>
              </>
            )}
            {selectedCrop.name === 'Wheat' && (
              <>
                <label htmlFor="productType">Product Type</label>
                <select id="productType" name="productType" value={formData.productType} onChange={handleInputChange}>
                  <option value="all">All</option>
                  <option value="softwheat">Soft Wheat</option>
                  <option value="durumwheat">Durum Wheat</option>
                </select>

                <label htmlFor="genetics">Genetics</label>
                <select id="genetics" name="genetics" value={formData.genetics} onChange={handleInputChange}>
                  <option value="all">All</option>
                  <option value="gmo">GMO</option>
                  <option value="nongmo">Non-GMO</option>
                </select>
              </>
            )}
              {selectedCrop.name === 'Bajra' && (
              <>
                <label htmlFor="productType">Product Type</label>
                <select id="productType" name="productType" value={formData.productType} onChange={handleInputChange}>
                  <option value="all">All</option>
                  <option value="pearlmillet">Pearl Millet</option>
                  <option value="foxtailmillet">Foxtail Millet</option>
                  <option value="finger">Finger Millet</option>
                  <option value="proso">Proso Millet</option>
                </select>

                <label htmlFor="variety">Variety</label>
                <select id="variety" name="variety" value={formData.variety} onChange={handleInputChange}>
                  <option value="all">All</option>
                  <option value="desi">Desi</option>
                  <option value="hybrid">Hybrid</option>
                </select>

                  <label htmlFor="processingType">Processing Type</label>
                  <select id="processingType" name="processingType" value={formData.processingType} onChange={handleInputChange}>
                    <option value="all">All</option>
                    <option value="hulled">Hulled</option>
                    <option value="unhulled">Unhulled</option>
                    <option value="flour">Flour</option>
                    <option value="flakes">Flakes</option>
                  </select>

                  <label htmlFor="genetics">Genetics</label>
                  <select id="genetics" name="genetics" value={formData.genetics} onChange={handleInputChange}>
                    <option value="all">All</option>
                    <option value="gmo">GMO</option>
                    <option value="nongmo">Non-GMO</option>
                  </select>
                </>
              )}

              {selectedCrop.name === 'Jowar' && (
                <>
                  <label htmlFor="productType">Product Type</label>
                  <select id="productType" name="productType" value={formData.productType} onChange={handleInputChange}>
                    <option value="all">All</option>
                    <option value="whitejowar">White Jowar</option>
                    <option value="redjowar">Red Jowar</option>
                    <option value="yellowjowar">Yellow Jowar</option>
                    <option value="sweetjowar">Sweet Sorghum</option>
                  </select>

                  <label htmlFor="variety">Variety</label>
                  <select id="variety" name="variety" value={formData.variety} onChange={handleInputChange}>
                    <option value="all">All</option>
                    <option value="maldandi">Maldandi</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="forage">Forage Sorghum</option>
                  </select>

                  <label htmlFor="processingType">Processing Type</label>
                  <select id="processingType" name="processingType" value={formData.processingType} onChange={handleInputChange}>
                    <option value="all">All</option>
                    <option value="whole">Whole Grain</option>
                    <option value="flour">Flour</option>
                    <option value="flakes">Flakes</option>
                    <option value="bran">Bran</option>
                  </select>

                  <label htmlFor="genetics">Genetics</label>
                  <select id="genetics" name="genetics" value={formData.genetics} onChange={handleInputChange}>
                    <option value="all">All</option>
                    <option value="gmo">GMO</option>
                    <option value="nongmo">Non-GMO</option>
                  </select>
                </>
              )}

            {selectedCrop.name === 'Almond' && (
              <>
                <label htmlFor="shellType">Shell Type</label>
                <select id="shellType" name="shellType" value={formData.shellType} onChange={handleInputChange}>
                  <option value="all">All</option>
                  <option value="papershell">Paper Shell</option>
                  <option value="thinshell">Thin Shell</option>
                </select>

                <label htmlFor="variety">Variety</label>
                <select id="variety" name="variety" value={formData.variety} onChange={handleInputChange}>
                  <option value="all">All</option>
                  <option value="gurbandi">Gurbandi</option>
                  <option value="california">California</option>
                </select>

                <label htmlFor="productType">Product Type</label>
                <select id="productType" name="productType" value={formData.productType} onChange={handleInputChange}>
                  <option value="all">All</option>
                  <option value="blanched">Blanched</option>
                  <option value="natural">Natural</option>
                </select>

                <label htmlFor="almondForm">Almond Form</label>
                <select id="almondForm" name="almondForm" value={formData.almondForm} onChange={handleInputChange}>
                  <option value="all">All</option>
                  <option value="roasted">Roasted</option>
                  <option value="whole">Whole</option>
                </select>
              </>
            )}
            {selectedCrop.name === 'Peanut' && (
              <>
                <label htmlFor="peanutForm">Peanut Form</label>
                <select id="peanutForm" name="peanutForm" value={formData.peanutForm} onChange={handleInputChange}>
                  <option value="all">All</option>
                  <option value="shelled">Shelled</option>
                  <option value="chopped">Chopped</option>
                </select>

                <label htmlFor="variety">Variety</label>
                <select id="variety" name="variety" value={formData.variety} onChange={handleInputChange}>
                  <option value="all">All</option>
                  <option value="g9">G-9</option>
                  <option value="gg20">GG-20</option>
                  <option value="gg39">GG-39</option>
                </select>

                <label htmlFor="size">Size</label>
                <select id="size" name="size" value={formData.size} onChange={handleInputChange}>
                  <option value="all">All</option>
                  <option value="38/42">38/42</option>
                  <option value="40/45">40/45</option>
                  <option value="45/55">45/55</option>
                </select>
              </>
            )}
            {selectedCrop.name === 'Cashew' && (
              <>
                <label htmlFor="productStatus">Product Status</label>
                <select id="productStatus" name="productStatus" value={formData.productStatus} onChange={handleInputChange}>
                  <option value="all">All</option>
                  <option value="cashewkernals">Cashew Kernals</option>
                  <option value="inshellcashew">Inshell Cashew</option>
                </select>

                <label htmlFor="productType">Product Type</label>
                <select id="productType" name="productType" value={formData.productType} onChange={handleInputChange}>
                  <option value="all">All</option>
                  <option value="roasted">Roasted</option>
                  <option value="raw">Raw</option>
                  <option value="driedraw">Dried Raw</option>
                </select>

                {/* <label htmlFor="kernalPerKg">Kernal Per Kg</label>
                <select id="kernalPerKg" name="kernalPerKg" value={formData.kernalPerKg} onChange={handleInputChange}>
                  <option value="all">All</option>
                  <option value="W320">W320</option>
                  <option value="W240">W240</option>
                  <option value="W180">W180</option>
                </select> */}
              </>
            )}
            <label htmlFor="price">Price (₹)</label>
            <input type="number" id="price" name="price" step="0.01" value={formData.price} onChange={handleInputChange} required />
                <label htmlFor="totalWeight">Total Weight (q)</label>
                  <input
                    type="number"
                    id="totalWeight"
                    name="totalWeight"
                    step="0.01"
                    value={formData.totalWeight}
                    onChange={handleInputChange}
                    placeholder="Enter total weight"
                    required
                  />

            <label htmlFor="region">Region of Origin</label>
            <select id="region" name="region" value={formData.region} onChange={handleInputChange}>
              <option value="all">All</option>
              <option value="ahmedabad">Ahmedabad</option>
              <option value="surat">Surat</option>
              <option value="vadodara">Vadodara</option>
              <option value="rajkot">Rajkot</option>
              <option value="bhavnagar">Bhavnagar</option>
              <option value="jamnagar">Jamnagar</option>
              <option value="junagadh">Junagadh</option>
              <option value="gandhinagar">Gandhinagar</option>
              <option value="anand">Anand</option>
              <option value="kutch">Kutch</option>
            </select>

            <label htmlFor="image">Upload Image</label>
            <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />

            <button type="submit" className="market-button">Upload</button>
          </form>
          <button onClick={() => setView(selectedCrop.name === 'Rice' || selectedCrop.name === 'Corn' || selectedCrop.name === 'Wheat' ? 'grains' : 'beans')} className="market-button">
            Back
          </button>
        </div>
      )}
    </div>
  
    </div>
  );
};

export default Market;