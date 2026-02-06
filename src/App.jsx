import { useState, useEffect } from 'react';
import { getWeather, getForecast } from './services/weatherService';
import Forecast from './components/Forecast';
import { Wind, Droplets, Eye, Sun, MapPin, Search } from 'lucide-react';

// Skeleton Component (Kept exactly as you had it)
const Skeleton = ({ width, height, style }) => (
  <div style={{
    width, 
    height, 
    background: 'rgba(255,255,255,0.1)', 
    borderRadius: '12px', 
    animation: 'pulse 1.5s infinite',
    marginBottom: '10px',
    ...style
  }} />
);

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState('New York');
  const [bgClass, setBgClass] = useState('bg-default');
  const [loading, setLoading] = useState(false);

  // --- NEW: NIGHT MODE LOGIC ---
  const updateBackground = (data) => {
    // 1. Check for Night Time first
    const currentTime = data.dt;
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;

    // If current time is before sunrise OR after sunset, it's Night.
    if (currentTime <= sunrise || currentTime >= sunset) {
      setBgClass('bg-night');
      return; 
    }

    // 2. If it's Day, check weather conditions
    const id = data.weather[0].id;
    if (id === 800) setBgClass('bg-sunny');
    else if (id >= 200 && id <= 232) setBgClass('bg-thunder');
    else if (id >= 300 && id <= 531) setBgClass('bg-rain');
    else if (id >= 600 && id <= 622) setBgClass('bg-snow');
    else if (id >= 700 && id <= 781) setBgClass('bg-clouds');
    else if (id > 800) setBgClass('bg-clouds');
    else setBgClass('bg-default');
  };

 const fetchWeather = async (cityName) => {
    setLoading(true);
    try {
      // 🚀 OPTIMIZATION: Fetch both APIs in parallel (at the same time)
      const [weatherData, forecastData] = await Promise.all([
        getWeather(cityName),
        getForecast(cityName)
      ]);

      // Now update everything at once
      setWeather(weatherData);
      setForecast(forecastData);
      updateBackground(weatherData); 
      
    } catch (error) {
      console.error(error);
      alert("City not found or API error.");
    } finally {
      setLoading(false);
    }
  };

  const triggerSearch = () => {
    const input = document.querySelector('.search-input');
    if (input && input.value.trim()) {
        fetchWeather(input.value);
        input.value = '';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      triggerSearch();
    }
  };

  // Changed default to Mardan as per your request/screenshot
  useEffect(() => { fetchWeather('Mardan'); }, []);
  useEffect(() => { document.body.className = bgClass; }, [bgClass]);

  const formatTime = (ts) => new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="app-wrapper">
      
      {/* LOADING STATE SKELETON */}
      {loading && (
         <div className="weather-dashboard">
           {/* Left Skeleton */}
           <div className="hero-section">
             <div>
               <Skeleton width="180px" height="40px" />
               <Skeleton width="250px" height="120px" style={{marginTop:'20px'}} />
               <Skeleton width="150px" height="30px" style={{marginTop:'10px'}} />
             </div>
           </div>
           
           {/* Right Skeleton */}
           <div className="widgets-panel">
             <Skeleton width="100%" height="60px" />
             <div className="stats-grid">
               <Skeleton width="100%" height="150px" />
               <Skeleton width="100%" height="150px" />
               <Skeleton width="100%" height="150px" />
               <Skeleton width="100%" height="150px" />
             </div>
             <Skeleton width="100%" height="200px" style={{marginTop:'20px'}} />
           </div>
         </div>
      )}

      {/* REAL DATA DISPLAY */}
      {weather && !loading && (
        <div className="weather-dashboard">
          
          {/* LEFT: HERO */}
          <div className="hero-section">
            <div>
              <div className="city-badge">
                <MapPin size={24} /> {weather.name}
              </div>
              <div className="main-temp">{Math.round(weather.main.temp)}°</div>
              <div className="weather-desc">{weather.weather[0].description}</div>
            </div>
            <div style={{ marginTop: '20px', fontSize: '1.2rem', opacity: 0.7 }}>
              H: {Math.round(weather.main.temp_max)}°  L: {Math.round(weather.main.temp_min)}°
            </div>
          </div>

          {/* RIGHT: DASHBOARD */}
          <div className="widgets-panel">
            <div className="search-container">
              <Search 
                size={20} 
                className="search-icon" 
                onClick={triggerSearch} // CLICKABLE ICON
              />
              <input 
                type="text" 
                placeholder="Search city..." 
                className="search-input"
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="stats-grid">
              <div className="glass-widget">
                <div className="widget-icon"><Wind size={30} /></div>
                <div>
                   <div className="widget-value">{weather.wind.speed} km/h</div>
                   <div className="widget-label">Wind Speed</div>
                </div>
              </div>

              <div className="glass-widget">
                <div className="widget-icon"><Droplets size={30} /></div>
                <div>
                   <div className="widget-value">{weather.main.humidity}%</div>
                   <div className="widget-label">Humidity</div>
                </div>
              </div>

              <div className="glass-widget">
                <div className="widget-icon"><Eye size={30} /></div>
                <div>
                   <div className="widget-value">{weather.visibility / 1000} km</div>
                   <div className="widget-label">Visibility</div>
                </div>
              </div>

              <div className="glass-widget">
                <div className="widget-icon"><Sun size={30} /></div>
                <div>
                   <div className="widget-value">{formatTime(weather.sys.sunrise)}</div>
                   <div className="widget-label">Sunrise</div>
                </div>
              </div>
            </div>

            {forecast && <Forecast data={forecast} />}
          </div>
          
          <div className="footer-text">
            &copy; {new Date().getFullYear()} Aether • Live Forecast. Designed by Yousaf Atiq.
          </div>

        </div>
      )}
    </div>
  );
}

export default App;