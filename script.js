$(document).ready(function() {
returnPlace();
});

function returnPlace() {
var city, country, lat, lon;

$.getJSON("https://ipapi.co/json", function(place) {
city = place.city;
country = place.country;
lat = place.latitude.toString();
lon = place.longitude.toString();
$(".city").html("<h1><b>Your weather in " + city + ", " + country + "</b></h1>");

var link = "https://api.forecast.io/forecast/f4a861ac46afd5c50561ffc453f15b42/" + lat + "," + lon + "?callback=?&units=ca";

function theWeather () {
  $.ajax({
    url: link,
    dataType: "jsonp",
    success: function(data) {
    
      var tempCa = (data.currently.temperature).toFixed();
      var tempUs = (data.currently.temperature*1.8+32).toFixed();
      var atempCa = (data.currently.apparentTemperature).toFixed();
      var atempUs = (data.currently.apparentTemperature*1.8+32).toFixed();
      var speedCa = (data.currently.windSpeed).toFixed();
      var speedUs = (data.currently.windSpeed*0.625).toFixed();
      var dewCa = (data.currently.dewPoint).toFixed();
      var dewUs = (data.currently.dewPoint*1.8+32).toFixed();

      $("#c").on("click", function() {
		$("#c").addClass("active");
      $("#f").removeClass("active");
      $(".currTemp").html(tempCa + "&deg;C");
      $(".apparentTemperature").html("Apparent temperature: " + atempCa + " &deg;C");
      $(".windSpeed").html("Wind speed: " + speedCa + " km/h");
      $(".dew").html("Dew Pt: " + dewCa + " &deg;C" );
	})
		$("#f").on("click", function() {
      $("#f").addClass("active");
      $("#c").removeClass("active");
      $(".currTemp").html(tempUs + "&deg;F");
      $(".apparentTemperature").html("Apparent temperature: " + atempUs + " &deg;F");
      $(".windSpeed").html("Wind speed: " + speedUs + " mph");
      $(".dew").html("Dew Pt: " + dewUs + " &deg;F" );
	})
      
      $(".currTemp").html(tempCa + "&deg;C");
      $(".windSpeed").html("Wind speed: " + speedCa + " km/h"  );
      $(".apparentTemperature").html("Apparent temperature: " + atempCa + " &deg;C");
      $(".dew").html("Dew Pt: " + dewCa + " &deg;C" );
		$(".sky").html(data.currently.summary);
		$(".humidity").html("Humidity: "+(data.currently.humidity*100).toString()+"%");
		$(".pressure").html("Pressure: " + (data.currently.pressure).toString() + " mBar");	
		$(".day").html(data.hourly.summary);
	
	if(data.currently.hasOwnProperty("icon")) {
		var skycons = new Skycons({"color": "black"});
		skycons.set("skycons", data.currently.icon);
		skycons.play();
	}
		$(".initial").addClass("hidden");
		$(".final").removeClass("hidden");
    }
  });
}
  theWeather();
    
    });
}

/* 

Thought process:
Using the HTML5 geolacalization call*** API is very time-consuming. I've used an IP localization because it works faster.

***
		geoLoc();

function geoLoc() {
				if (!navigator.geolocation) {
						alert("Your browser doesn't support geolacation");
						return;
				}

				function success(position) {
						getData(position.coords.latitude, position.coords.longitude);				
				}

				function error() {
						alert("Task failed");
				}

				navigator.geolocation.getCurrentPosition(success, error, {
						maximumAge: 60000,
						timeout: 8000,
						enableHighAccuracy: true
				});
		}
***

*/