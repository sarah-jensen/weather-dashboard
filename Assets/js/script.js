
let searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');


$("#search-button").on("click", function () {
  const cityName = $("#city-name").val();
  getWeather(cityName);
  localStorage.setItem(cityName);
  $(".search-city=current").html("Current Weather: " + $(cityName))
});

// write city name to ".results h1"

//write function to check Storage to load anything in local storage
//write function to createCityButton for cities in local storage and after searching

//write function to clear history

function getWeather(cityName) {
  // $("#sun-gif").attr("display", "none");
  // $("#results").attr("display", "flex");
     let requestUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=1&appid=7af7e291bb513f26d14b0b266e6e8742";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let lat = data[0].lat;
      let lon = data[0].lon;
      getForecast(lat, lon);
    });
}


function getForecast(lat, lon) {
  let requestUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=7af7e291bb513f26d14b0b266e6e8742&units=imperial";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      showCurrentWeather(data);
      showFiveDayForecast(data);
    });
}

function showCurrentWeather(data) {
  const header = $("<h1>").text("Current Weather");
  $("#current-weather").append(header);

  let city = data.city.name;
  let date = data.list[0].dt_txt;
  let iconData = data.list[0].weather[0].icon;
  let iconUrl = "https://openweathermap.org/img/wn/" + iconData + "@2x.png";
  console.log(iconUrl);
  let iconEl = $("<img>").attr(`src`, `${iconUrl}`);
  let cityEl = $("<h2>").text(`${city} ${date}`);
  $("#current-weather").append(cityEl);
  $("#current-weather").append(iconEl);

  let temp = data.list[0].main.temp;
  let tempEl = $("<p>").text(`Temp: ${temp} °F`);
  $("#current-weather").append(tempEl);
  let wind = data.list[0].wind.speed;
  let windEl = $("<p>").text(`Wind speed: ${wind} MPH`);
  $("#current-weather").append(windEl);
  let humid = data.list[0].main.humidity;
  let humidEl = $("<p>").text(`Humidity: ${humid} %`);
  $("#current-weather").append(humidEl);
  console.log(data.list);
}

  function showFiveDayForecast(data) {
  const fiveDay = $("<h1>").text("5-Day Forecast");
  $("#forecast").prepend(fiveDay);



  // for loop to generate 5-day forecast
  for (let index = 0; index <= 40; index += 8) {
    
    let forecast = data.list[index];
    console.log(forecast);
    let date = forecast.dt_txt;
    console.log(date);
    let dateEl = $("<h2>").text(`${date}`);
    $("#forecast").append(dateEl);
    let iconData = forecast.weather[0].icon;
    let iconUrl = "https://openweathermap.org/img/wn/" + iconData + "@2x.png";
    console.log(iconUrl);
    let iconEl = $("<img>").attr(`src`, `${iconUrl}`);
    $("#forecast").append(iconEl);
    let temp = forecast.main.temp;
    let tempEl = $("<p>").text(`Temp: ${temp} °F`);
    $("#forecast").append(tempEl);
    let wind = forecast.wind.speed;
    let windEl = $("<p>").text(`Wind speed: ${wind} MPH`);
    $("#forecast").append(windEl);
    let humid = forecast.main.humidity;
    let humidEl = $("<p>").text(`Humidity: ${humid} %`);
    $("#forecast").append(humidEl);
    // generateDayCard()
  }
}


