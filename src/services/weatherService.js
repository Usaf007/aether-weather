import axios from 'axios';

// Get your key from .env file
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// 1. Fetch Current Weather
export const getWeather = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: { q: city, appid: API_KEY, units: 'metric' }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching current weather:", error);
        throw error;
    }
};

// 2. Fetch Forecast (Returns 5 days of data with 3-hour intervals)
export const getForecast = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: { q: city, appid: API_KEY, units: 'metric' }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching forecast:", error);
        throw error;
    }
};