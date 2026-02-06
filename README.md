# 🌤️ Aether Weather | Cinematic Live Forecast

![Project Banner](public/banner-placeholder.png) 


## 🚀 Overview
**Aether Weather** is a production-grade, responsive weather dashboard engineered with React.js and Vite. It features a cinematic, glassmorphism UI that dynamically adapts to real-time weather conditions and time of day (Day/Night cycles).

Unlike standard weather apps, Aether focuses on **immersive user experience**, using atmospheric radial gradients and smooth animations to visualize data, powered by the OpenWeatherMap API.

## ✨ Key Features
* **Dynamic Theming:** The application state (backgrounds, icons, UI colors) updates automatically based on live weather conditions (Sunny, Rain, Thunder, Snow) and local time (Sunset/Sunrise detection).
* **Smart Forecasting:**
    * **Real-time Dashboard:** Instant access to temperature, wind, humidity, and visibility.
    * **24-Hour Outlook:** A horizontal slider visualizing the trend for the next day.
    * **5-Day Trend:** A vertical summary for upcoming week planning.
* **Premium UI/UX:**
    * **Glassmorphism:** Frosted glass aesthetics using advanced CSS backdrop-filters.
    * **Responsive Grid:** A mobile-first architecture that seamlessly transforms into a split-screen dashboard on desktop.
    * **Fluid Animations:** Smooth fade-ins and transitions for a polished feel.

## 🛠️ Tech Stack
* **Frontend Library:** React.js (Vite)
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Styling:** CSS3 (Variables, Flexbox, Grid, Media Queries)
* **Data Fetching:** Axios
* **Icons:** Lucide React
* **API:** OpenWeatherMap

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/Usaf007/aether-weather.git](https://github.com/Usaf007/aether-weather.git)
    cd aether-weather
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your OpenWeatherMap API key:
    ```env
    VITE_WEATHER_API_KEY=your_api_key_here
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

## 📱 Live Demo
[Check out the live application here](https://your-project-name.vercel.app)

---

### 👨‍💻 Author
**Yousaf Atiq**
* **GitHub:** [github.com/Usaf007](https://github.com/Usaf007)

---
*© 2026 Aether Weather. All rights reserved.*