const axios = require('axios');

exports.fetchWeather = async (city) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) throw new Error('Weather API key not configured');

    //Get lat/lon from city name
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`;
    const geoRes = await axios.get(geoUrl);
    if (!geoRes.data.length) throw new Error('City not found');
    const { lat, lon } = geoRes.data[0];

    //Get weather data using One Call API
    const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const weatherRes = await axios.get(weatherUrl);

    if (!weatherRes.data || !weatherRes.data.current) {
      throw new Error('Invalid weather data format');
    }

    return weatherRes.data;
  } catch (error) {
    if (error.message === 'City not found') throw error;
    if (error.response?.status === 404) throw new Error('City not found');
    throw new Error('Failed to fetch weather data');
  }
};

exports.fetchDailyForecast = async (lat, lon, cnt = 7) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) throw new Error('Weather API key not configured');

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
    const res = await axios.get(url);
    
    if (!res.data || !res.data.daily || !Array.isArray(res.data.daily)) {
      throw new Error('Invalid forecast data format');
    }

    // Return only the first cnt days
    return res.data.daily.slice(0, cnt);
  } catch (error) {
    if (error.response?.status === 404) throw new Error('Location not found');
    throw new Error('Failed to fetch daily forecast');
  }
};

exports.fetchUVIndex = async (lat, lon) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) throw new Error('Weather API key not configured');

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}&units=metric`;
    const res = await axios.get(url);
    
    if (!res.data || !res.data.current || typeof res.data.current.uvi === 'undefined') {
      throw new Error('Invalid UV data format');
    }

    // Return only the current UV index
    return { uvi: res.data.current.uvi };
  } catch (error) {
    if (error.response?.status === 404) throw new Error('Location not found');
    throw new Error('Failed to fetch UV index');
  }
};