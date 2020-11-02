var tempClass = $(".temp").toArray();
var humidityClass = $(".humidity").toArray();
var dateClass = $(".date").toArray();
var date = moment().format("L");
var iconArray = $(".weather-icon").toArray();


$("#searchBtn").on("click", function() {
  event.preventDefault();
  var userSearch = $("#userSearch").val();
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&appid=d2ab85e5641867afdf5ea19703f5bbc4";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      var list = response.list;
      var city = response.city.name 
      var lat = response.city.coord.lat;
      var lon = response.city.coord.lon;

      $("#cityName").text(response.city.name + " " + date)

      var newQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=d2ab85e5641867afdf5ea19703f5bbc4"

    $.ajax({
      url: newQueryURL,
      method: "GET"
    }).then(function(response) {
      console.log(newQueryURL)
      var daily = response.daily;
      var currentTempK = response.current.temp;
      var currentTempF = ((currentTempK - 273.15) * 1.80 + 32).toFixed(0); 

      $("#currentTemp").text("Temperature: " + currentTempF);
      $("#currentHumidity").text("Humidity: " + response.current.humidity + "%");
      $("#currentWS").text("Wind Speed: " + response.current.wind_speed + " MPH");
      $("#uvIndex").text(response.current.uvi);

      for (var i=0; i<5; i++) {

        var tempK = daily[i].temp.day;
        var tempF =  ((tempK - 273.15) * 1.80 + 32).toFixed(0);
        var humidity = daily[i].humidity;
        var icon = daily[i].weather[0].icon;

        tempClass[i].innerHTML = "Temp: " + tempF;
        humidityClass[i].innerHTML = "Humidity: " + humidity + "%"
        $(".weather-icon").addClass("small-icon");
        iconArray[i].setAttribute("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
        
      }

      for (var j=0; j<dateClass.length; j++) {

      var newDate = moment().add(1+j, 'days');
      formatNewDate = newDate.format("L");
      dateClass[j].innerHTML = formatNewDate;
      }

    });

  });

})

