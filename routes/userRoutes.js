const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Locations
router.get('/locations', userController.getLocations);
router.post('/locations', userController.saveLocation);
router.delete('/locations/:id', userController.deleteLocation);
router.put('/locations/:id', userController.updateLocation);

//Preferences
router.get('/preferences', userController.getPreferences);
router.post('/preferences', userController.savePreferences);
router.put('/preferences', userController.updatePreferences);

//Search History
router.get('/search-history', userController.getSearchHistory);
router.post('/search', userController.logSearch);
router.delete('/search-history', userController.clearSearchHistory);

//Feedback
router.post('/feedback', userController.sendFeedback);

module.exports = router; 