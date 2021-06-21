fetch(
  `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=c8050763e934a3e49035af066c6fde69`
)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    console.log(response);
  });
