function main() {

// Location call
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
    
// Localization for city name using IP adress

function parseCity(url) {
  $.getJSON(url) 
         .done (function(location)
         {
            city = location.city;
         });
}

$.getJSON() 
         .done (function(location)
         {
            $('.city').html('<h1><b>Your weather in ' + location.city + ', ' + location.country_name + '</b></h1>');
         });
/*		
// Fahrenheit to Celsius and vice versa		
		$("#f").click(function() {
			if(!$("#f").hasClass("active")) {
				$("#f").addClass("active");
				$("#c").removeClass("active");
			}
		});
		
		$("#c").click(function() {
			if(!$("#c").hasClass("active")) {
				$("#c").addClass("active");
				$("#f").removeClass("active");
			}
		});
		
				var speedUnit, tempUnit, unit;
		if($("#c").hasClass("active")) {
			unit = "ca";
			speedUnit = "km/h";
			tempUnit = "Celsius";
		}
		else {
			unit = "us"
			speedUnit = "Mph";
			tempUnit = "Fahrenheit";
		}
*/		
function getData(latitude, longitude) {
		
		var coordinates = latitude.toString() + ',' + longitude.toString();
		
		var link = "https://api.forecast.io/forecast/f4a861ac46afd5c50561ffc453f15b42/" + coordinates + "?callback=?&units=" + unit;
		$.ajax({
				url: link,
				dataType: "jsonp",
				success: function(data) {
					pasteData(data);
				}
		});
}
		
// JSONP descriptions
function pasteData(data) {

var weatherC = (data.currently.temperature).toFixed();
       var weatherF = (data.currently.temperature*1.8+32).toFixed();
      $(".currTemp").text(weatherF + "° F");
      //in progress
      $("#c").on("click", function() {
        $(".currTemp").text(weatherC + "° C");
      })
       $("#f").on("click", function() {
        $(".currTemp").text(weatherF + "° F");
      })


		$(".sky").html(data.currently.summary);
		$(".windSpeed").html("Wind speed: " + (data.currently.windSpeed).toString() + " " + speedUnit);
		$(".humidity").html("Humidity: "+(data.currently.humidity*100).toString()+"%");
		//(".currTemp").html((Math.round(data.currently.temperature)).toString() + "&deg;" + tempUnit);
		$(".apparentTemperature").html("Apparent temperature: " + (data.currently.apparentTemperature).toString() + " &deg;" + tempUnit);
		$(".dew").html("Dew Pt: " + (data.currently.dewPoint).toString() + " &deg;" + tempUnit);
		$(".pressure").html("Pressure: " + (data.currently.pressure).toString() + " mBar");	
	
	if(data.currently.hasOwnProperty("icon")) {
		var skycons = new Skycons({"color": "black"});
		skycons.set("skycons", data.currently.icon);
		skycons.play();
	}
	
		$(".day").html(data.hourly.summary);
	
	$(".initial").addClass("hidden");
	$(".final").removeClass("hidden");
}
}

$(document).ready(main());