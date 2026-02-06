import React from 'react';
import { Wind, Droplets, MapPin } from 'lucide-react'; // Icons

const WeatherDisplay = ({ weather }) => {
  return (
    <div className="weather-card">
      <div className="location" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
        <MapPin size={20} />
        <h2>{weather.name}, {weather.sys.country}</h2>
      </div>

      <div className="main-temp">
        <h1>{Math.round(weather.main.temp)}°</h1>
        <p style={{ textTransform: 'capitalize' }}>{weather.weather[0].description}</p>
      </div>

      <div className="details">
        <div className="detail-item">
          <Wind size={20} />
          <p>{weather.wind.speed} m/s</p>
          <span>Wind</span>
        </div>
        <div className="detail-item">
          <Droplets size={20} />
          <p>{weather.main.humidity}%</p>
          <span>Humidity</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;