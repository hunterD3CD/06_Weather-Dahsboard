// ------------------------------------ESTABLISHING VARIABLES-----------------------------------
var cityName = document.querySelector("#searchedCity");
var apiKey = "c8050763e934a3e49035af066c6fde69";

// ------------------------------------------CURRENT WEATHER API-------------------------------------
// When search button is clicked, read the city name and get the weather response
var apiCurrentWeather = function (event) {
  // event.preventDefault();
  var city = document.querySelector("#city").value;
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
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

// ------------------------------------------FORECAST WEATHER API-------------------------------------
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
        console.log(thisMoment.format("HH:mm:ss"));
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

document.getElementById("searchBtn").onclick = function (event) {
  event.preventDefault();
  apiCurrentWeather();
  apiForecastWeather();
};

// When search button is clicked, city name is stored in the local storage
// var saveSearch = function (event) {
//   event.preventDefault();
//   var city = document.querySelector("#city").value;
//   localStorage.setItem("city", city);
// };

// document.getElementById("searchBtn").onclick = saveSearch;
