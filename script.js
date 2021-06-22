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
