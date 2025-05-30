const weatherService = require('../services/weatherService');
const weatherModel = require('../models/weatherModel');

exports.getWeather = async (req, res) => {
  try {
    const city = req.params.city;
    const weatherData = await weatherService.fetchWeather(city);
    const formatted = weatherModel.formatWeatherData(weatherData, city);
    res.json(formatted);
  } catch (error) {
    if (error.message === 'City not found') {
      return res.status(404).json({ error: 'City not found' });
    }
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

exports.getWeatherByCityParam = async (req, res) => {
    try {
      const city = req.params.city;
      if (!city) return res.status(400).json({ error: 'City is required' });
      const weatherData = await weatherService.fetchWeather(city);
      const formatted = weatherModel.formatWeatherData(weatherData, city);
      res.json(formatted);
    } catch (error) {
      if (error.message === 'City not found') {
        return res.status(404).json({ error: 'City not found' });
      }
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  };
  

exports.getWeatherByCityQuery = async (req, res) => {
  try {
    const city = req.query.city;
    if (!city) return res.status(400).json({ error: 'City query parameter is required' });
    const weatherData = await weatherService.fetchWeather(city);
    const formatted = weatherModel.formatWeatherData(weatherData, city);
    res.json(formatted);
  } catch (error) {
    if (error.message === 'City not found') {
      return res.status(404).json({ error: 'City not found' });
    }
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};


exports.getDailyForecast = async (req, res) => {
  try {
    const { lat, lon, cnt } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: 'lat and lon query parameters are required' });
    const forecastData = await weatherService.fetchDailyForecast(lat, lon, cnt);
    res.json(forecastData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch daily forecast' });
  }
};

exports.getUVIndex = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: 'lat and lon query parameters are required' });
    const uvData = await weatherService.fetchUVIndex(lat, lon);
    res.json(uvData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch UV index' });
  }
};