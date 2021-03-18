require("dotenv").config();
const express = require("express");
const https = require("https");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/weather/:cityName", (req, res) => {
  const city = req.params.cityName;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.APP_ID}`;
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      res.status(200).send(weatherData);
    });
  });
});

app.listen(3000, () => console.log(`Server is running on port ${port}`));
