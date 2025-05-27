const axios = require('axios');

exports.fetchWeather = async (city) => {
  const apiKey = process.env.WEATHER_API_KEY;

  //Get lat/lon from city name
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`;
  const geoRes = await axios.get(geoUrl);
  if (!geoRes.data.length) throw new Error('City not found');
  const { lat, lon } = geoRes.data[0];

  //Get weather data using One Call API
  const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const weatherRes = await axios.get(weatherUrl);

  return weatherRes.data;
};

exports.fetchDailyForecast = async (lat, lon, cnt = 7) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  const res = await axios.get(url);
  // Return only the first cnt days
  return res.data.daily.slice(0, cnt);
};

exports.fetchUVIndex = async (lat, lon) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}&units=metric`;
  const res = await axios.get(url);
  // Return only the current UV index
  return { uvi: res.data.current.uvi };
};