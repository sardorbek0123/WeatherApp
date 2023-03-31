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
    <p class="mb-3">${weather.weather[0].main}</p>
    <div class="display-4 mb-3">
     <span>${Math.round(weather.main.temp)}</span>
     <span>&deg;C</span>
    </div>
    `;

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }

  weatherIcon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  console.log(weather.weather[0].main);

  if (weather.weather[0].main === "Clear") {
    body.style.backgroundImage = "url(images/clear.jpg)";
    console.log("CLEAR");
  } else if (weather.weather[0].main === "Rain") {
    body.style.backgroundImage = "url(images/rain.jpg)";
    console.log("RAIN");
  } else if (weather.weather[0].main === "Clouds") {
    body.style.backgroundImage = "url(images/clouds.jpg)";
    console.log("CLOUDS");
  } else if (weather.weather[0].main === "Snow") {
    body.style.backgroundImage = "url(images/snow.jpg)";
    console.log("SNOWING");
  }
};

// ERROR
const error = () => {
  card.children[0].children[0].style.display = "none";
  details.innerHTML = `<h5 class="mb-3">Location is not found. Please try</h5>`;
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
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
