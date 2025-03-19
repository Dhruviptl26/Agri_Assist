import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import riceImage from '../assets/rice.png';
import cornImage from '../assets/corn.png';
import wheatImage from '../assets/wheat.png';
import peanutImage from '../assets/peanutImage.jpg';
import almondImage from '../assets/almondImage.jpg';
import cashewImage from '../assets/cashewImage.jpg';
import BajaraImage from '../assets/bajara.jpg';
import JowarImage from '../assets/jowar.jpg';
const BuyCrops = () => {
  const [view, setView] = useState('main');
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productType: '',
    variety: '',
    genetics: '',
    totalWeight: '',
    region: '',
    shellType: '',
    almondForm: '',
    peanutForm: '',
    size: '',
    productStatus: '',
    kernalPerKg: '',
  });
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/crops');
        setCrops(response.data);
      } catch (error) {
        console.error('Error fetching crops:', error);
        setErrorMessage('Error fetching crops. Please try again later.');
      }
    };

    fetchCrops();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = () => {
    try {
      console.log(crops.productType)
      const matchingCrops = crops.filter(crop => {
        return (
          crop.name.toLowerCase() === selectedCrop.toLowerCase() &&
          crop.productType.toLowerCase() === formData.productType.toLowerCase()  &&
          crop.region.toLowerCase() === formData.region.toLowerCase()
        );
        
        
      });

      if (matchingCrops.length === 0) {
        console.log(crops.productType)
        setErrorMessage('No matching crops found.');
        setSearchResults([]);
        return;
      }

      setSearchResults(matchingCrops);
      setErrorMessage('');
    } catch (error) {
      console.error('Error during search:', error);
      setErrorMessage('Error during search. Please try again.');
    }
  };

  const handleBuy = (crop) => {
    // Navigate to location page with all necessary data
    navigate("/location", {
      state: {
        searchResult: crop,
        formData,
        calculatedPrice: crop.price * formData.totalWeight,
      },
    });
  };

  const handleGrainsClick = () => {
    setView('grains');
  };

  const handleBeansClick = () => {
    setView('beans');
  };

  const handleCropClick = (cropName) => {
    setSelectedCrop(cropName);
    setView('searchForm');
  };

  return (
  
    <div className="buy-crops-container">
      {view === 'main' && (
        <>
          <h1>Buy Crops</h1>
          <div className="button-container">
            <button onClick={handleGrainsClick} className="buy-crops-button">
              Grains
            </button>
            <button onClick={handleBeansClick} className="buy-crops-button">
              Beans
            </button>
          </div>
        </>
      )}
      {view === 'grains' && (
        <>
          <h1>Grains</h1>
          <div className="crops-grid">
            <div className="crop-circle" onClick={() => handleCropClick('Rice')}>
              <img src={riceImage} alt="Rice" className="crop-image" />
              <p>Rice</p>
            </div>
            <div className="crop-circle" onClick={() => handleCropClick('Corn')}>
              <img src={cornImage} alt="Corn" className="crop-image" />
              <p>Corn</p>
            </div>
            <div className="crop-circle" onClick={() => handleCropClick('Wheat')}>
              <img src={wheatImage} alt="Wheat" className="crop-image" />
              <p>Wheat</p>
            </div>
            <div className="crop-circle" onClick={() => handleCropClick('Bajra')}>
              <img src={BajaraImage} alt="Bajara" className="crop-image" />
              <p>Bajara</p>
    
            </div>
            <div className="crop-circle" onClick={() => handleCropClick('Jowar')}>
              <img src={JowarImage} alt="jowar" className="crop-image" />
              <p>Jowar</p>
            </div>
          </div>
          <button onClick={() => setView('main')} className="buy-crops-button">
            Back
          </button>
        </>
      )}
      {view === 'beans' && (
        <>
          <h1>Beans</h1>
          <div className="crops-grid">
            <div className="crop-circle" onClick={() => handleCropClick('Peanut')}>
              <img src={peanutImage} alt="Peanut" className="crop-image" />
              <p>Peanut</p>
            </div>
            <div className="crop-circle" onClick={() => handleCropClick('Almond')}>
              <img src={almondImage} alt="Almond" className="crop-image" />
              <p>Almond</p>
            </div>
            <div className="crop-circle" onClick={() => handleCropClick('Cashew')}>
              <img src={cashewImage} alt="Cashew" className="crop-image" />
              <p>Cashew</p>
            </div>
          </div>
          <button onClick={() => setView('main')} className="buy-crops-button">
            Back
          </button>
        </>
      )}
      {view === 'searchForm' && (
        <>
          <h2>Search {selectedCrop}</h2>
          <div className="search-form">
            {selectedCrop === 'Rice' && (
              <>
                <label htmlFor="productType">Product Type</label>
                <select id="productType" name="productType" onChange={handleInputChange}>
                  <option value="all">All</option>
                  <option value="mediumgrain">Medium Grain</option>
                  <option value="japonica">Japonica</option>
                  <option value="indica">Indica</option>
                  <option value="javanica">Javanica</option>
                </select>

                <label htmlFor="variety">Variety</label>
                <select id="variety" name="variety" onChange={handleInputChange}>
                  <option value="basmati">Basmati</option>
                  <option value="brown">Brown</option>
                  <option value="sona masoori">Sona Masoori</option>
                  <option value="bamboo">Bamboo</option>
                  <option value="glutinous">Glutinous</option>
                  <option value="samba">Samba</option>
                </select>
              </>
            )}
            {selectedCrop === 'Corn' && (
              <>
                <label htmlFor="productType">Product Type</label>
                <select id="productType" name="productType" onChange={handleInputChange}>
                  <option value="indian">Indian</option>
                  <option value="sweetcorn">Sweet Corn</option>
                  <option value="whitecorn">White Corn</option>
                  <option value="popcorn">Popcorn - Butterfly</option>
                </select>

                <label htmlFor="genetics">Genetics</label>
                <select id="genetics" name="genetics" onChange={handleInputChange}>
                  <option value="gmo">GMO</option>
                  <option value="nongmo">Non-GMO</option>
                </select>
              </>
            )}
            {selectedCrop === 'Wheat' && (
              <>
                <label htmlFor="productType">Product Type</label>
                <select id="productType" name="productType" onChange={handleInputChange}>
                  <option value="softwheat">Soft Wheat</option>
                  <option value="durumwheat">Durum Wheat</option>
                </select>

                <label htmlFor="genetics">Genetics</label>
                <select id="genetics" name="genetics" onChange={handleInputChange}>
                  <option value="gmo">GMO</option>
                  <option value="nongmo">Non-GMO</option>
                </select>
              </>
            )}
            {selectedCrop === 'Bajra' && (
              <>
                <label htmlFor="productType">Product Type</label>
                <select id="productType" name="productType" onChange={handleInputChange}>
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

            {selectedCrop === 'Jowar' && (
              <>
                <label htmlFor="productType">Product Type</label>
                <select id="productType" name="productType" onChange={handleInputChange}>
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

            {selectedCrop === 'Almond' && (
              <>
                <label htmlFor="shellType">Shell Type</label>
                <select id="shellType" name="shellType" onChange={handleInputChange}>
                  <option value="papershell">Paper Shell</option>
                  <option value="thinshell">Thin Shell</option>
                </select>

                <label htmlFor="variety">Variety</label>
                <select id="variety" name="variety" onChange={handleInputChange}>
                  <option value="gurbandi">Gurbandi</option>
                  <option value="california">California</option>
                </select>

                <label htmlFor="productType">Product Type</label>
                <select id="productType" name="productType" onChange={handleInputChange}>
                  <option value="blanched">Blanched</option>
                  <option value="natural">Natural</option>
                </select>

                <label htmlFor="almondForm">Almond Form</label>
                <select id="almondForm" name="almondForm" onChange={handleInputChange}>
                  <option value="roasted">Roasted</option>
                  <option value="whole">Whole</option>
                </select>
              </>
            )}
            {selectedCrop === 'Peanut' && (
              <>
                <label htmlFor="peanutForm">Peanut Form</label>
                <select id="peanutForm" name="peanutForm" onChange={handleInputChange}>
                  <option value="shelled">shelled</option>
                  <option value="chopped">Chopped</option>
                </select>

                <label htmlFor="variety">Variety</label>
                <select id="variety" name="variety" onChange={handleInputChange}>
                  <option value="g9">G-9</option>
                  <option value="gg20">GG-20</option>
                  <option value="gg39">GG-39</option>
                </select>

                <label htmlFor="size">Size</label>
                <select id="size" name="size" onChange={handleInputChange}>
                  <option value="38/42">38/42</option>
                  <option value="40/45">40/45</option>
                  <option value="45/55">45/55</option>
                </select>
              </>
            )}
            {selectedCrop === 'Cashew' && (
              <>
                <label htmlFor="productStatus">Product Status</label>
                <select id="productStatus" name="productStatus" onChange={handleInputChange}>
                  <option value="cashewkernals">Cashew Kernals</option>
                  <option value="inshellcashew">Inshell Cashew</option>
                </select>

                <label htmlFor="productType">Product Type</label>
                <select id="productType" name="productType" onChange={handleInputChange}>
                  <option value="roasted">Roasted</option>
                  <option value="raw">Raw</option>
                  <option value="driedraw">Dried Raw</option>
                </select>

                <label htmlFor="kernalPerKg">Kernal Per quintali</label>
                <select id="kernalPerKg" name="kernalPerKg" onChange={handleInputChange}>
                  <option value="W320">W320</option>
                  <option value="W240">W240</option>
                  <option value="W180">W180</option>
                </select>
              </>
            )}
            <label htmlFor="totalWeight">Total Weight (q)</label>
            <input type="number" id="totalWeight" name="totalWeight" step="0.01" onChange={handleInputChange} />

            <label htmlFor="region">Region of Origin</label>
            <select id="region" name="region" onChange={handleInputChange}>
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
            <button onClick={handleSearch} className="search-button">Search</button>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {searchResults.length > 0 && (
            <div className="serch-results-container">
            <div className="search-results">
              {searchResults.map((result) => (
                <div key={result.id} className="search-result">
                  <h3>{result.name}</h3>
                  <img src={`http://localhost:8080${result.imageUrl}`} alt={result.name} className="crop-image" />
                  <p>Price: ${result.price}</p>
                  <p>Product Type: {result.productType}</p>{console.log(result.productType)}
                  <p>Variety: {result.variety}</p>
                  <p>Genetics: {result.genetics}</p>
                  <p>Weight: {result.totalWeight} kg</p>
                  <p>Region: {result.region}</p>
                  <button onClick={() => handleBuy(result)} className="buy-button">Buy</button>
                </div>
              ))}
            </div>
            </div>
          )}
          
          <button onClick={() => setView(selectedCrop === 'Rice' || selectedCrop === 'Corn' || selectedCrop === 'Wheat' ? 'grains' : 'beans')} className="back-button">Back</button>
        </>
      )}
    </div>
    
  );
};

export default BuyCrops;