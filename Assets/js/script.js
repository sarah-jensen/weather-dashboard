$("#search-button").on("click", function(){
    let cityName = $("#city-name").val();
    getWeather(cityName);
})

function getWeather(cityName) {
    let requestUrl = "https://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=1&appid=7af7e291bb513f26d14b0b266e6e8742"
    fetch(requestUrl)
    .then(function (response) {
      return response.json();
  }) .then (function(data) {
        console.log(data);
        let lat = data[0].lat;
        let lon = data[0].lon;
        getForecast(lat,lon);
  })
}

function getForecast(lat, lon) {
    let requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=7af7e291bb513f26d14b0b266e6e8742&units=imperial"
    fetch(requestUrl)
    .then(function (response) {
      return response.json();
  }) .then (function(data) {
        console.log(data);
    showCurrentWeather(data);
  })
}

function showCurrentWeather(data) {
    let city = data.city.name;
    let date = data.list[0].dt_txt;
    let iconData = data.list[0].weather[0].icon;
    let iconUrl = "https://openweathermap.org/img/wn/"+iconData+"@2x.png"
    let iconEl = $("<img>").text(`${iconUrl}`);
    let cityEl = $("<h2>").text(`${city} ${date} ${iconEl}`);
    $("#current-weather").append(cityEl);
    

    
    let temp = data.list[0].main.temp;
    let tempEl = $("<p>").text(`Temp: ${temp} °F`);
    $("#current-weather").append(tempEl);
    let wind = data.list[0].wind.speed;
    let windEl = $("<p>").text(`Wind speed: ${wind} MPH`);
    $("#current-weather").append(windEl);
    let humid = data.list[0].main.humidity;
    let humidEl = $("<p>").text(`Humidity: ${humid} %`);
    $("#current-weather").append(humidEl);
}

// for (let index = 0; index < array.length; index+=8) {
//     const element = array[index];
    
// }