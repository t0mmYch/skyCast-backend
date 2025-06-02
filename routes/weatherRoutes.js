const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the SkyCast Weather API!' });
  });

// Specific routes must come before parameterized routes
router.get('/city', weatherController.getWeatherByCityQuery);
router.get('/daily', weatherController.getDailyForecast);
router.get('/uv', weatherController.getUVIndex);
router.get('/:city', weatherController.getWeather);

module.exports = router;