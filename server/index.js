const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const citiesApi = require("./api/cities");
const weatherApi = require("./api/weather");

const db = require("./database");

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = new express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log("Server listening on port:", PORT);
});

app.use("/api/cities", citiesApi);
app.use("/api/weather", weatherApi);

db.query("select NOW()", (err, ress) => {
  console.log(ress);
});
module.exports = app;
