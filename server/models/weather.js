const request = require("request-promise");

require("dotenv").config();
class Weather {
  static retrieveByCity(city, callback) {
    request({
      uri: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=imperial`,
      json: true,
    })
      .then((res) => {
        callback(res);
      })
      .catch((err) => {
        console.log(err);
        callback({ error: "Could not reach OpenWeatherMap API." });
      });
  }
}

module.exports = Weather;
