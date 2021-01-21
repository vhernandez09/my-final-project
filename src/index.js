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
  hour = `0${hour}`;
}

let minutes = time.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = document.querySelector("h4");
currentDate.innerHTML = `${day} ${month} ${date}, ${year} ${hour}:${minutes}`;

function showTemperature(response) {
  let cityHeader = document.querySelector("h3");
  cityHeader.innerHTML = `${response.data.name}`;
  let temp = `${Math.round(response.data.main.temp)}`;
  let tempHeader = document.querySelector("h2");
  tempHeader.innerHTML = `${temp}°F`;
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
