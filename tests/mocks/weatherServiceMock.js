const mockWeatherData = {
  current: {
    temp: 20,
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    humidity: 65,
    wind_speed: 5,
    pressure: 1015,
    uvi: 5.5,
    sunset: 1647890123
  },
  daily: [
    {
      dt: 1647890123,
      temp: { min: 15, max: 25 },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
      humidity: 65,
      wind_speed: 5,
      pressure: 1015,
      uvi: 5.5,
      sunset: 1647890123
    }
  ]
};

exports.fetchWeather = async (city) => {
  if (city === 'UnknownCity') {
    throw new Error('City not found');
  }
  return mockWeatherData;
};

exports.fetchDailyForecast = async (lat, lon, cnt = 7) => {
  return Array(cnt).fill(mockWeatherData.daily[0]);
};

exports.fetchUVIndex = async (lat, lon) => {
  return { uvi: mockWeatherData.current.uvi };
}; 