setInterval(formatDate, 0);
function formatDate(date) {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${hours}`;
  }
  let currentMin = now.getMinutes();
  if (currentMin < 10) {
    currentMin = `0${currentMin}`;
  }
  let displayDate = [`${currentDay} ${currentHour}:${currentMin}`];

  document.querySelector("#date-time").textContent = displayDate;
}
let searchSubmit = document.querySelector("#search-form");
searchSubmit.addEventListener("submit", searchCity);
function searchCity(event) {
  event.preventDefault();
  let cityResult = document.querySelector("#search-input");
  let cityHeading = document.querySelector("#city");
  cityHeading.innerHTML = [cityResult.value];
  let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
  let apiCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityResult.value}&appid=${apiKey}&units=metric`;
  axios.get(apiCityUrl).then(showCurrentTemperature);
  getForecast(response.data);
}

function showCurrentTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempheading = document.querySelector("h2");
  let temperatureIconElement = response.data;
  let cityName = response.data.name;
  let heading = document.querySelector("h1");
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  let windSpeed = response.data.wind.speed;
  let windSpeedElement = document.querySelector("#wind-speed");
  let conditions = response.data.weather[0].description;
  let conditionsElement = document.querySelector("#conditions");

  heading.innerHTML = `${cityName}`;
  tempheading.innerHTML = `${temperature}°C`;
  humidityElement.innerHTML = `${humidity}`;
  windSpeedElement.innerHTML = `${windSpeed}`;
  conditionsElement.innerHTML = `${conditions}`;
}

function showPositions(positions) {
  let lat = positions.coords.latitude;
  let long = positions.coords.longitude;
  let units = "metric";
  let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios(apiUrl).then(showCurrentTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositions);
}

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", currentLocation);

function getForecast(city) {
  let apiKey = "cat07ba0af43c47b0ca92of160ade31e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let forecastDays = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";
  forecastDays.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
           <div class="container">
        <div class="row">
          <div class="col">
            <div class="weather-forecast-date">
              ${day}
              <img
                src="https://cdn-icons-png.flaticon.com/512/3222/3222791.png"
                alt=""
                width="36"
              />
            </div>
            <div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max">18</span>
              <span class="weather-forecast-temperature-min">12</span>
            </div>
          </div>
          </div>
          </div>
          </div>
        `;
  });
  forecastElement.innerHTML = forecastHtml;
}

displayForecast();
