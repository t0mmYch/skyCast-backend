const locationModel = require('../models/locationModel');
const preferencesModel = require('../models/preferencesModel');
const searchHistoryModel = require('../models/searchHistoryModel');

// For demo, use req.user?.id or fallback to 1
const getUserId = (req) => req.user?.id || 1;

// Locations
exports.getLocations = (req, res) => {
  locationModel.getLocations()
    .then(locations => res.json(locations))
    .catch(err => res.status(500).json({ error: 'Failed to fetch locations' }));
};
exports.saveLocation = (req, res) => {
  locationModel.saveLocation(req.body)
    .then(loc => res.status(201).json(loc))
    .catch(err => res.status(500).json({ error: 'Failed to save location' }));
};
exports.deleteLocation = (req, res) => {
  locationModel.deleteLocation(req.params.id)
    .then(() => res.status(204).send())
    .catch(err => res.status(500).json({ error: 'Failed to delete location' }));
};
exports.updateLocation = (req, res) => {
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
  // In a real app, send feedback to email or store in DB
  res.status(201).json({ message: 'Feedback received', ...req.body });
}; 