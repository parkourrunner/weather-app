const express = require("express");
const Weather = require("../models/weather");

const router = express.Router();
router.get("/:city", (req, res) => {
  const city = req.params.city;
  Weather.retrieveByCity(city, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
