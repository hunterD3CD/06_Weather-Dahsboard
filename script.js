// ------------------------------------ESTABLISHING VARIABLES-----------------------------------
// variable: city
// var cities = [];
// var cityInputE1 = $("#city");
// // variable: function
// var submit = function (event) {
//   event.preventDefault();
//   var city = cityInputEl.value.trim();
//   if (city) {
//     getCityWeather(city);
//     get5Day(city);
//     cities.unshift({ city });
//     cityInputEl.value = "";
//   } else {
//     alert("Please enter a City");
//   }
//   saveSearch();
//   pastSearch(city);
// };

// var saveSearch = function () {
//   localStorage.setItem("cities", JSON.stringify(cities));
// };
// var getWeather = function (city) {
//   var apiKey = "c8050763e934a3e49035af066c6fde69";
//   fetch(
//     `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
//   )
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (response) {
//       console.log(response);
//     });
// };

var cityName = document.querySelector("#searchedCity");

// ------------------------------------------WEATHER API-------------------------------------
// When search button is clicked, read the city name and get the weather response
var apiFunction = function (event) {
  event.preventDefault();
  var city = document.querySelector("#city").value;
  var apiKey = "c8050763e934a3e49035af066c6fde69";
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      // When search button is clicked, the weather data is displayed
      // /////////////////////////////////////////////////////////////////PART 1: CITY NAME
      // -----------------------------------------------------------------data: cityName
      cityName.textContent = response.name;
      // ------------------------------------------------------------------data: date from moment js
      var currentDate = document.createElement("span");
      currentDate.textContent =
        " ( " + moment(response.dt.value).format("MMMM Do YYYY") + " ) ";
      cityName.appendChild(currentDate);
      // ------------------------------------------------------------------data: weather icon
      var currentIcon = document.createElement("img");
      currentIcon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
      );
      cityName.append(currentIcon);

      // /////////////////////////////////////////////////////////////////PART 2: CURRENT WEATHER DATA
      var currentWeather = document.querySelector("#currentWeatherContainer");
      currentWeather.textContent = "";
      // -----------------------------------------------------------------data: temperature
      var currentTemperature = document.createElement("span");
      currentTemperature.textContent =
        "Temperature: " + response.main.temp + " °F";
      currentWeather.append(currentTemperature);
      // -----------------------------------------------------------------data: humidity
      var currentHumidity = document.createElement("span");
      currentHumidity.textContent = "Humidity: " + response.main.humidity + "%";
      currentWeather.append(currentHumidity);
      // -----------------------------------------------------------------data: wind
      var currentWind = document.createElement("span");
      currentWind.textContent = "Wind: " + response.wind.speed + "MPH";
      currentWeather.append(currentWind);
      // -----------------------------------------------------------------data: uv index (uvi API)
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      fetch(
        `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (uvi) {
          console.log("uvi", uvi);
          currentUvi = document.createElement("span");
          currentUvi.textContent = "UV Index: " + uvi.value;
          currentWeather.append(currentUvi);
        });
    });
};

document.getElementById("searchBtn").onclick = apiFunction;

// When search button is clicked, city name is stored in the local storage
// var saveSearch = function (event) {
//   event.preventDefault();
//   var city = document.querySelector("#city").value;
//   localStorage.setItem("city", city);
// };

// document.getElementById("searchBtn").onclick = saveSearch;
