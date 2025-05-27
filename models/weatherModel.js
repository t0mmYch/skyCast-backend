//OpenWeatherMap One Call API respond and returns a simplified object
exports.formatWeatherData = (rawData, city) => {
  return {
    city,
    current: {
      temp: rawData.current.temp,
      weather: rawData.current.weather[0].main,
      description: rawData.current.weather[0].description,
      icon: rawData.current.weather[0].icon,
      humidity: rawData.current.humidity,
      wind_speed: rawData.current.wind_speed,
      pressure: rawData.current.pressure,
      uvi: rawData.current.uvi,
      sunset: rawData.current.sunset,
    },
    daily: rawData.daily.slice(0, 7).map((day) => ({
      date: day.dt,
      temp: {
        min: day.temp.min,
        max: day.temp.max,
      },
      weather: day.weather[0].main,
      description: day.weather[0].description,
      icon: day.weather[0].icon,
      humidity: day.humidity,
      wind_speed: day.wind_speed,
      pressure: day.pressure,
      uvi: day.uvi,
      sunset: day.sunset,
    })),
  };
};
