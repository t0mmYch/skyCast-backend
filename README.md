# 🌤️ skyCast Backend

Welcome to the backend API of **skyCast**, a full featured weather app built with **Node.js** and **Express**.
This RESTful API powers the weather forecasting logic, user preferences, saved locations, and search history functionalities.

> 🔗 [Frontend (coming soon)]()  
> 📡 Live demo: _Coming soon_

---

## 🚀 Features

- 🌍 Get real-time and forecast weather data by city or coordinates
- 📍 Save & manage favorite locations
- 🛠️ Configure user display preferences (units, language, theme)
- 🔎 Track and clear city search history
- 📬 Submit feedback or bug reports

---

## 🧠 Tech Stack

- **Node.js** + **Express**
- **Axios** for external API calls (OpenWeatherMap)
- **dotenv**
- **PostgreSQL**
- **Nodemon**

---

## 🧪 API Endpoints

### 📡 Weather

- GET /api/weather/:city
- GET /api/weather/city?city=London
- GET /api/weather/daily?lat=53.48&lon=-2.24&cnt=7
- GET /api/weather/uv?lat=53.48&lon=-2.24

- GET /api/user/locations
- POST /api/user/locations
- PUT /api/user/locations/:id
- DELETE /api/user/locations/:id

- GET /api/user/preferences
- POST /api/user/preferences
- PUT /api/user/preferences

- GET /api/user/search-history
- POST /api/user/search
- DELETE /api/user/search-history

- POST /api/user/feedback

### Setting up

1. Clone the repository

git clone https://github.com/t0mmYch/skyCast-backend.git
cd skyCast-backend

2. Install dependencies

npm install

3. Set up your .env

PORT=5050
WEATHER_API_KEY=2975e69885422b844df3c3b5de07dbf5

4. Run the app

npm run dev

# OR

npm start

👥 Authors
Thomai Christopoulou - Initial work - https://github.com/t0mmYch
