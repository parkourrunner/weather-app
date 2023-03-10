const db = require("../database");

class Cities {
  static getAll(callback) {
    db.query("SELECT city_name FROM cities", (err, res) => {
      if (err.error) {
        return callback(err);
      } else {
        callback(res);
      }
    });
  }
  static insert(city, callback) {
    db.query(
      `INSERT INTO cities (city_name) VALUES ($1)`,
      [city],
      (err, res) => {
        if (err.error) {
          return callback(err);
        } else {
          callback(res);
        }
      }
    );
  }
}

module.exports = Cities;
