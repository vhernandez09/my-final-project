
let time = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[time.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let month = months[time.getMonth()];

let date = time.getDate();

let year = time.getFullYear();

let hour = time.getHours();
if (hour < 10) {
  hour = `0${hour}`
}
if (hour <12) {
  midday = "AM"
} else { midday = "PM"}
if (hour > 12) {
  hour = `${hour}` - 12
}


let minutes = time.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}


let currentDate = document.querySelector("h4");
currentDate.innerHTML = `Last updated: ${day} ${month} ${date}, ${year} ${hour}:${minutes} ${midday}`;


function showTemperature(response) {
  let cityHeader = document.querySelector("h3");

  fahrenheitTemperature = response.data.main.temp
  fahrenheitRealFeel = response.data.main.feels_like

  cityHeader.innerHTML = `${response.data.name}`;
  let temp = `${Math.round(fahrenheitTemperature)}`;
  let tempHeader = document.querySelector("h2");
  tempHeader.innerHTML = `${temp}°F`;

  

  let realFeel = `${Math.round(response.data.main.feels_like)}`;
  let feelsLike = document.querySelector("h5");
  feelsLike.innerHTML = `Feels like: ${realFeel}°F`;
  let description = document.querySelector("h6");
  description.innerHTML = `${response.data.weather[0].description}`;
  let icon = document.querySelector("#icon");
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} km/h`;
}

function showLocation(position) {
  let latitude = `${position.coords.latitude}`;
  let longitude = `${position.coords.longitude}`;
  let apiKey = "bddb40bf6d4e87c1095eea2ffea7c540";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getLocation);

function getResults(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let searchCity = `${input.value}`;
  let apiKey = "bddb40bf6d4e87c1095eea2ffea7c540";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", getResults);

let fahrenheitTemperature = null;
let fahrenheitRealFeel = null;

function displayCelsiusTemperature(event) {
event.preventDefault();
fahrenheitLink.classList.remove("active");
celsiusLink.classList.add("active");
let temperature = document.querySelector("h2");
let celsiusTemperature = (fahrenheitTemperature - 32) *  5 / 9;
temperature.innerHTML = `${Math.round(celsiusTemperature)}°C`;
let celsiusRealFeel = (fahrenheitRealFeel - 32) *  5 / 9;
let feelsLike = document.querySelector("h5");
feelsLike.innerHTML = `Feels like: ${Math.round(celsiusRealFeel)}°C` ;
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("h2");
  temperature.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
  let feelsLike = document.querySelector("h5");
  feelsLike.innerHTML = `Feels like: ${Math.round(fahrenheitRealFeel)}°F`;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);