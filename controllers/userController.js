const locationModel = require('../models/locationModel');
const preferencesModel = require('../models/preferencesModel');
const searchHistoryModel = require('../models/searchHistoryModel');
const weatherService = require('../services/weatherService');
const weatherModel = require('../models/weatherModel');

// For demo, use req.user?.id or fallback to 1
const getUserId = (req) => req.user?.id || 1;

// Locations
exports.getLocations = (req, res) => {
  locationModel.getLocations()
    .then(locations => res.json(locations))
    .catch(err => res.status(500).json({ error: 'Failed to fetch locations' }));
};
exports.saveLocation = (req, res) => {
  const { name, lat, lon } = req.body;
  if (!name || lat == null || lon == null) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  locationModel.saveLocation({ name, lat, lon })
    .then(loc => res.status(201).json(loc))
    .catch(err => res.status(500).json({ error: 'Failed to save location' }));
};
exports.deleteLocation = (req, res) => {
  locationModel.deleteLocation(req.params.id)
    .then(result => {
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Location not found' });
      }
      res.status(204).send();
    })
    .catch(err => res.status(500).json({ error: 'Failed to delete location' }));
};
exports.updateLocation = (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  locationModel.updateLocation(req.params.id, req.body.name)
    .then(loc => loc ? res.json(loc) : res.status(404).json({ error: 'Location not found' }))
    .catch(err => res.status(500).json({ error: 'Failed to update location' }));
};

// Preferences
exports.getPreferences = (req, res) => {
  const userId = getUserId(req);
  preferencesModel.getPreferences(userId)
    .then(prefs => res.json(prefs || {}))
    .catch(err => res.status(500).json({ error: 'Failed to fetch preferences' }));
};
exports.savePreferences = (req, res) => {
  const userId = getUserId(req);
  preferencesModel.savePreferences(userId, req.body)
    .then(prefs => res.status(201).json(prefs))
    .catch(err => res.status(500).json({ error: 'Failed to save preferences' }));
};
exports.updatePreferences = (req, res) => {
  const userId = getUserId(req);
  preferencesModel.savePreferences(userId, req.body)
    .then(prefs => res.json(prefs))
    .catch(err => res.status(500).json({ error: 'Failed to update preferences' }));
};

// Search History
exports.getSearchHistory = (req, res) => {
  const userId = getUserId(req);
  searchHistoryModel.getSearchHistory(userId)
    .then(history => res.json(history))
    .catch(err => res.status(500).json({ error: 'Failed to fetch search history' }));
};
exports.logSearch = (req, res) => {
  const userId = getUserId(req);
  if (!req.body.city) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  searchHistoryModel.logSearch(userId, req.body.city)
    .then(entry => res.status(201).json(entry))
    .catch(err => res.status(500).json({ error: 'Failed to log search' }));
};
exports.clearSearchHistory = (req, res) => {
  const userId = getUserId(req);
  searchHistoryModel.clearSearchHistory(userId)
    .then(() => res.status(204).send())
    .catch(err => res.status(500).json({ error: 'Failed to clear search history' }));
};

// Feedback (still in-memory or stub)
exports.sendFeedback = (req, res) => {
  if (!req.body.message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  res.status(201).json({ message: req.body.message });
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
    if (error.message === 'Missing required fields') {
      return res.status(400).json({ error: 'Missing required fields' });
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
    if (error.message === 'Missing required fields') {
      return res.status(400).json({ error: 'Missing required fields' });
    }
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
    if (error.message === 'Missing required fields') {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch UV index' });
  }
}; 