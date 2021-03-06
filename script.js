// ------------------------------------ESTABLISHING VARIABLES-----------------------------------
var cityName = document.querySelector("#searchedCity");
var apiKey = "c8050763e934a3e49035af066c6fde69";
var city = "";
var lastCity = "";

// ------------------------------------------FUNCTION I: CURRENT WEATHER API-------------------------------------
// When search button is clicked, read the city name and get the weather response
var apiCurrentWeather = function (event) {
  // event.preventDefault();
  var city = document.querySelector("#city").value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log("currentweather", response);
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
        "Temperature: " +
        Math.floor((response.main.temp - 273.15) * 1.8 + 32) +
        " ??F";
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
          // console.log("uvi", uvi);
          currentUvi = document.createElement("span");
          currentUvi.textContent = "UV Index: " + uvi.value;
          currentWeather.append(currentUvi);
        });
    });
};

// ------------------------------------------FUNCTION II: FORECAST WEATHER API-------------------------------------
// When search button is clicked, read the city name and get the weather response
var apiForecastWeather = function (event) {
  // event.preventDefault();
  var city = document.querySelector("#city").value;
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("forecast", data);
      // /////////////////////////////////////////////////////////////////PART 3: FORECAST WEATHER TITLE
      var forecastTitle = document.querySelector("#forecast");
      forecastTitle.textContent = "";
      forecastTitle.textContent = "5-Day Forecast";
      // /////////////////////////////////////////////////////////////////PART 4: FORECAST WEATHER DATA
      var fiveDayForecast = document.querySelector("#fiveDayContainer");
      fiveDayForecast.innerHTML = "";
      for (let i = 0; i < data.list.length; i++) {
        // 01. using moment to get the time
        var dayData = data.list[i];
        var dayTimeUTC = dayData.dt;
        var timeZoneOffset = data.city.timezone;
        var timeZoneOffsetHours = timeZoneOffset / 60 / 60;
        var thisMoment = moment
          .unix(dayTimeUTC)
          .utc()
          .utcOffset(timeZoneOffsetHours);
        // console.log("five day time", thisMoment.format("HH:mm:ss"));
        // 02. only display noon forecast
        // -----------------------------------------------------------------data: forecast data
        if (
          thisMoment.format("HH:mm:ss") === "11:00:00" ||
          thisMoment.format("HH:mm:ss") === "12:00:00" ||
          thisMoment.format("HH:mm:ss") === "13:00:00"
        ) {
          // -------------------------------------------------list data: 1.time 2.temp 3.icon 4.wind 5.humidity
          fiveDayForecast.innerHTML += `
          <div class="card m-2 p0">
              <ul class="list-unstyled p-3">
                  <li>${thisMoment.format("MM/DD/YY")}</li>
                  <li class="weather-icon"><img src="https://openweathermap.org/img/wn/${
                    dayData.weather[0].icon
                  }@2x.png"></li>
                  <li>Temp: ${dayData.main.temp}&#8457;</li>
                  <br>
                  <li>Temp: ${dayData.wind.speed}MHP;</li>
                  <br>
                  <li>Humidity: ${dayData.main.humidity}%</li>
              </ul>
          </div>`;
        }
      }
    });
};

// ------------------------------------------FUNCTION III: LOCAL STORAGE: SAVE & GET------------------------------------
// /////////////////////////////////////////////////////////////////save the city to localStorage
var saveCity = function (newCity) {
  let cityExists = false;
  var city = document.querySelector("#city").value;
  // Check if City exists in local storage
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage["cities" + i] === city) {
      cityExists = true;
      break;
    }
  }
  // Save to localStorage if city is new
  if (cityExists === false) {
    localStorage.setItem("cities" + localStorage.length, city);
  }
};
// /////////////////////////////////////////////////////////////////get the city to localStorage
var renderCity = function () {
  var cityHistoryContainer = document.querySelector("#cityHistoryContainer");
  cityHistoryContainer.textContent = "";
  // getItem from local storage and create new buttons
  for (let i = 0; i < localStorage.length; i++) {
    let cityHistory = localStorage.getItem("cities" + i);
    console.log(cityHistory);
    let cityEl;
    cityEl = `<button type="button" class="list-group-item list-group-item-action active">${cityHistory}</button></li><br>`;
    // Append city history to page
    $("#cityHistoryContainer").prepend(cityEl);
  }
};
// ------------------------------------------RUN ALL THE FUNCTIONS BY CLICKING-----------------------
document.getElementById("searchBtn").onclick = function (event) {
  event.preventDefault();
  apiCurrentWeather();
  apiForecastWeather();
  saveCity();
  renderCity();
};
// /////////////////////////////////////////////////////////////////run the history button
document.getElementById("cityHistoryContainer").onclick = function (event) {
  event.preventDefault();

  $("#city").val(event.target.textContent);
  city = $("#city").val();
  //re-run the weather api
  apiCurrentWeather(event);
  apiForecastWeather(event);
};
