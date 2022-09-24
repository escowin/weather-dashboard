// data.dom
var searchFormEl = document.querySelector("#search-form")
var searchInputEl = document.querySelector("#search-input");
var searchBtnEl = document.querySelector("#search-btn");
var searchHistoryEl = document.querySelector("#search-history");
var currentWeatherEl = document.querySelector("#current-weather");
var forecastEl = document.querySelector("#forecast");

// logic.fetching api data
var getWeather = function(city) {
  var location = city;
  var key = "0962492a18dc2e6ff1c567a057f043f2";
  var current = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=imperial`;
  var forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${key}&cnt=8&units=imperial`;

  fetch(current).then(function(response){
    response.json().then(function(data) {
      displayCurrentWeather(data);
    });
  });
  fetch(forecast).then(function(response){
    response.json().then(function(data) {
      displayForecast(data);
    });
  });
};

// logic.display weather data
var displayCurrentWeather = function(city) {
    console.log(city);

  // dom elements
  var currentCityEl = document.getElementById("current-city");
  var tempEl = document.getElementById("temp");
  var humidityEl = document.getElementById("humidity");
  var windSpeedEl = document.getElementById("windspeed");
  var currentConditionsEl = document.getElementById("current-conditions");

  // display data onto page
  currentCityEl.textContent = city.name;
  tempEl.textContent = `${city.main.temp}\u00B0`;
  humidityEl.textContent = `${city.main.humidity}%`;
  windSpeedEl.textContent = `${city.wind.speed} mph`;
  currentConditionsEl.textContent = city.weather[0].description;
};

var displayForecast = function(forecast) {
  var hours = forecast.list;

  var forecastContainerEl = document.getElementById("forecast-container");
  console.log(hours);

  // iterate through hours
  for (let i = 0; i < hours.length; i++) {
    // create article to hold successive elements
    var forecastHourEl = document.createElement("article");

    // create elements for each data point
    var hourEl = document.createElement("h3");
    hourEl.className = "hour";
    hourEl.textContent = hours[i].dt_txt.split(" ")[1];

    var tempEl = document.createElement("p");
    tempEl.className = "temp";
    tempEl.textContent = `temp ${hours[i].main.temp}\u00B0`;

    var humidityEl = document.createElement("p");
    humidityEl.className = "humidity";
    humidityEl.textContent = `humidity ${hours[i].main.humidity}%`

    var windSpeedEl = document.createElement("p");
    windSpeedEl.className = "wind-speed";
    windSpeedEl.textContent = `wind speed ${hours[i].wind.speed} mph`;

    var conditionsEl = document.createElement("p");
    conditionsEl.className = "conditions";
    conditionsEl.textContent = `conditions ${hours[i].weather[0].description}`;

    // append data point elements to the parent article container
    forecastHourEl.append(hourEl, tempEl, humidityEl, windSpeedEl, conditionsEl);

    // append article to parent section container
    forecastContainerEl.appendChild(forecastHourEl);
  };
};

// logic.display current year
var copyrightYear = function() {
  var year = new Date().getFullYear();
  var copyrightEl = document.getElementById("copyright");
  copyrightEl.textContent = `\u00A9 ${year} `;
};

copyrightYear();
getWeather("Austin");