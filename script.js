// ------------------------------------ESTABLISHING VARIABLES-----------------------------------
// variable: city
var cities = [];
var cityInputE1 = $("#city");
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
    });
};

document.getElementById("searchBtn").onclick = apiFunction;

// When search button is clicked, city name is stored in the local storage
var saveSearch = function (event) {
  event.preventDefault();
  var city = document.querySelector("#city").value;
  localStorage.setItem("city", city);
};

document.getElementById("searchBtn").onclick = saveSearch;
