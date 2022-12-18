const express = require("express");
const Cities = require("../models/cities");

const router = express.Router();
router.get("/", (req, res) => {
  Cities.getAll((err, cities) => {
    if (err) return res.json(err);
    return res.json(citites);
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  const city = req.body.city;
  Cities.insert(city, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
