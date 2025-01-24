import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WetherApi() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London'); // Default city

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/weather?city=${city}`);
      setWeatherData(response.data);  // Store the full response data
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  return (
        <div>
          <h2>Weather Information</h2>
          <div>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
            />
            <button onClick={() => fetchWeather(city)}>Get Weather</button>
          </div>
      
          {weatherData ? (
            <div>
              <p>City: {weatherData.name || 'N/A'}</p>
              <p>Temperature: {weatherData.main?.temp || 'N/A'} °C</p>
              <p>Humidity: {weatherData.main?.humidity || 'N/A'} %</p>
              <p>Weather: {weatherData.weather?.[0]?.description || 'N/A'}</p>
              <p>Wind Speed: {weatherData.wind?.speed || 'N/A'} m/s</p>
              <p>Wind Direction: {weatherData.wind?.deg || 'N/A'}°</p>
              <p>Wind Gust: {weatherData.wind?.gust || 'N/A'} m/s</p>
            </div>
          ) : (
            <p>Loading weather data...</p>
          )}
        </div>
      );
      
}

export default WetherApi;
