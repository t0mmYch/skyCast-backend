const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the SkyCast Weather API!' });
  });
router.get('/:city', weatherController.getWeather);
router.get('/city', weatherController.getWeatherByCityQuery);
router.get('/daily', weatherController.getDailyForecast);
router.get('/uv', weatherController.getUVIndex);

module.exports = router;