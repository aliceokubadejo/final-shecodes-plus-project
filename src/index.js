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
}

function showCurrentTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempheading = document.querySelector("h2");
  let cityName = response.data.name;
  let heading = document.querySelector("h1");
  let humidity = response.data.main.temp.humidity;
  let humidityElement = document.querySelector("#humidity");

  heading.innerHTML = `${cityName}`;
  tempheading.innerHTML = `${temperature}°C`;
  humidityElement.innerHTML = `${humidity}`;
  console.log(response);
}

function showPositions(positions) {
  let lat = positions.coords.latitude;
  let long = positions.coords.longitude;
  let units = "metric";
  let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositions);
}

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", currentLocation);

let forecast = document.querySelector("#forecast");
