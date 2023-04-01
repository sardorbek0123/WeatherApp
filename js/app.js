const changeLocation = document.getElementById("change-location");
const card = document.getElementById("card");
const details = document.getElementById("details");
const weatherIcon = document.getElementById("weather-icon");
const overlay = document.getElementById("overlay");
const body = document.getElementById("body");

changeLocation.city.focus();

// loader

function loader(state) {
  if (state) {
    overlay.classList.remove("d-none");
  } else {
    overlay.classList.add("d-none");
  }
}

// update UI
const updateUI = (weather) => {
  card.children[0].children[0].style.display = "inline";
  details.innerHTML = `
    <h5 class="mb-3">${weather.name}, ${weather.sys.country}</h5>
    <p class="mb-3 hum__speed">${weather.weather[0].main}</p>
    <p class="mb-3">Humidity : <span class="hum__speed">${
      weather.main.humidity
    }%</span> <br/> Wind Speed : <span class="hum__speed">${
    weather.wind.speed
  }km/hr</span></p>
    <div class="display-4 mb-3">
     <span>${Math.round(weather.main.temp)}</span>
     <span>&deg;C</span>
    </div>
    `;

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }

  weatherIcon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  if (weather.weather[0].main === "Clear") {
    body.style.backgroundImage = "url(images/clear.jpg)";
  } else if (weather.weather[0].main === "Rain") {
    body.style.backgroundImage = "url(images/rain.jpg)";
  } else if (weather.weather[0].main === "Clouds") {
    body.style.backgroundImage = "url(images/clouds.jpg)";
  } else if (weather.weather[0].main === "Snow") {
    body.style.backgroundImage = "url(images/snow.jpg)";
  } else if (weather.weather[0].main === "Drizzle") {
    body.style.backgroundImage = "url(images/drizzle.jpg)";
  }
};

// ERROR
const error = () => {
  card.children[0].children[0].style.display = "none";
  details.innerHTML = `<h5 class="mb-3 mt-3">Location not found. Please try again</h5>`;
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
  body.style.backgroundImage = "url(images/default.jpg)";
};

// get weather from API
const getWeather = async (city) => {
  const data = await getData(city);
  return data;
};

// get location
changeLocation.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityName = changeLocation.city.value.trim();
  if (cityName != "") {
    changeLocation.reset();
    getWeather(cityName)
      .then((data) => updateUI(data))
      .catch(() => error());
  }
});
