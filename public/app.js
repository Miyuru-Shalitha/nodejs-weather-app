document.querySelector("button").addEventListener("click", (event) => {
  event.preventDefault();

  const inputCityName = document.querySelector("input").value;

  fetch(`http://localhost:3000/weather/${inputCityName}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod == 200) {
        makeWeatherCard(data);
      } else if (data.cod == "404") {
        alert("Not found!");
      } else {
        alert("Error!");
      }
      document.querySelector("input").value = "";
    })
    .catch((err) => console.log(err));
});

function makeWeatherCard(data) {
  // Create background of weatherCard.
  const weatherCard = document.createElement("div");
  const weatherCardContainer = document.getElementById(
    "weather-card-container"
  );
  weatherCard.classList.add("weather-card");
  weatherCardContainer.appendChild(weatherCard);

  // Add city name.
  const cityNameText = document.createElement("p");
  cityNameText.classList.add("weather-card-city-name");
  cityNameText.innerHTML = data.name;
  weatherCard.appendChild(cityNameText);

  // Add weather icon.
  const weatherIcon = document.createElement("img");
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherCard.appendChild(weatherIcon);

  // Add temperature.
  const temp = document.createElement("p");
  temp.style.fontSize = "23px";
  temp.innerHTML = `${Math.round(data.main.temp - 273.15)} &#8451;`;
  weatherCard.appendChild(temp);

  // Add description.
  const description = document.createElement("p");
  description.style.fontSize = "20px";
  description.innerHTML = data.weather[0].description;
  weatherCard.appendChild(description);
}
