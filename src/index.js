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
    currentHour = `0${currentHour}`;
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
  search(cityResult.value);
}
function search(city) {
  let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
  let apiCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiCityUrl).then(showCurrentTemperature);
}
function showCurrentTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempheading = document.querySelector("h2");
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
  getForecast(response.data);
  console.log(response);
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
  let forecastHtml = `<div class="container"><div class="row">`;
  response.data.daily.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="col">
        <div class="weather-forecast-date">
           Thu
           <img
               class="weather-forecast-icon"
                src="${day.condition.icon_url}"
                alt=""
                width="36"
           />
        </div>
        <div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max">${Math.round(
                day.temperature.maximum
              )}</span>
              <span class="weather-forecast-temperature-min">${Math.round(
                day.temperature.minimum
              )}</span>
            </div>
        </div>`;
  });
  forecastElement.innerHTML = forecastHtml + `</div></div>`;
}

search("London");
