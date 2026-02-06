import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Clock, Calendar, CloudLightning, Moon } from 'lucide-react';

const Forecast = ({ data }) => {
    
    // 1. Hourly Forecast (Next 24 Hours)
    const hourlyForecast = data.list.slice(0, 8);

    // 2. Daily Forecast (Unique Days)
    const dailyForecast = [];
    const seenDates = new Set();

    data.list.forEach((item) => {
        const date = item.dt_txt.split(' ')[0];
        if (!seenDates.has(date) && item.dt_txt.includes("12:00:00")) {
            seenDates.add(date);
            dailyForecast.push(item);
        }
    });

    const formatTime = (dt_txt) => {
        const date = new Date(dt_txt);
        return date.toLocaleTimeString([], { hour: 'numeric', hour12: true });
    };

    const getDay = (dt_txt) => {
        const date = new Date(dt_txt);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    // --- NEW: STRICT TIME CHECK ---
    // The API's 'pod' can sometimes be tricky. Let's force check the hour.
    const isNight = (dt_txt) => {
        const date = new Date(dt_txt);
        const hour = date.getHours(); // 0-23 format
        // Night is generally before 6 AM (6) or after 6 PM (18)
        return hour < 6 || hour >= 18;
    };

    const getIcon = (type, dt_txt) => {
        const nightMode = isNight(dt_txt);

        if (type === 'Clear') {
            return nightMode ? <Moon size={18} color="#FEFCD7" /> : <Sun size={18} color="#FFD700"/>;
        }
        if (type === 'Clouds' && nightMode) {
             // Optional: You can return a Cloudy Moon if you want, 
             // but standard Cloud is fine too.
             return <Cloud size={18} color="#bdc3c7"/>;
        }

        if (type === 'Rain') return <CloudRain size={18} color="#56CCF2"/>;
        if (type === 'Snow') return <CloudSnow size={18} color="#E0EAFC"/>;
        if (type === 'Thunderstorm') return <CloudLightning size={18} color="#A78BFA"/>;
        return <Cloud size={18} color="#bdc3c7"/>;
    };

    return (
        <div className="forecast-wrapper">
            
            {/* HOURLY SLIDER */}
            <div className="forecast-section">
                <div className="section-header">
                    <Clock size={16} /> <span>Today's Outlook</span>
                </div>
                <div className="forecast-scroll">
                    {hourlyForecast.map((item, index) => (
                        <div key={index} className="hourly-card">
                            <p className="time-text">{formatTime(item.dt_txt)}</p>
                            
                            {/* Pass the TIMESTAMP (dt_txt) to check the hour directly */}
                            <div className="icon-box">
                                {getIcon(item.weather[0].main, item.dt_txt)}
                            </div>
                            
                            <p className="temp-text">{Math.round(item.main.temp)}°</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* DAILY LIST */}
            <div className="forecast-section">
                <div className="section-header">
                    <Calendar size={16} /> <span>5-Day Forecast</span>
                </div>
                <div className="daily-grid">
                    {dailyForecast.map((day, index) => (
                        <div key={index} className="daily-row">
                            <span className="day-name">{getDay(day.dt_txt)}</span>
                            {/* For daily overview, we usually show the Day icon (Noon), so we pass a noon time */}
                            <div className="daily-icon">{getIcon(day.weather[0].main, "2024-01-01 12:00:00")}</div>
                            <span className="daily-desc">{day.weather[0].main}</span>
                            <span className="daily-temp">{Math.round(day.main.temp)}°</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Forecast;