var searchBar = $("#searchBar");
var searchBtn = $("#searchBtn");
var history = $("#history");

//when searching for a city, weather info is shown for that city
searchBtn.on("click", function () {
	//grab searchBar value
	fetchCoords(searchBar.val());
	var cityHistory = JSON.parse(localStorage.getItem("history")) || [];
	cityHistory.push(searchBar.val());
	localStorage.setItem("history", JSON.stringify(cityHistory));

	//set value into local storage and have a button created in history
	searchBar.val("");
});
//Generates a new button with the search term you provide.
// var generateHistoryButton = function(searchTerm) { create button, append to history element, set onclick event }

//use geocoords API to grab lat and log based on city name in search bar
var fetchCoords = function (cityName) {
	$.ajax({
		method: "get",
		url:
			"http://api.openweathermap.org/geo/1.0/direct?q=" +
			cityName +
			"&appid=844d3528241d316fb5b721dd030a0efe",
	}).then(function (response) {
		weatherFetch(
			response[0].lat,
			response[0].lon,
			response[0].name,
			response[0].state
		);
	});
};
var fiveDayFetch = function (days) {
	$("#fiveDay").empty();
	for (let index = 1; index <= 5 && index < days.length; index++) {
		const day = days[index];
		var dayCard = document.createElement("div");
		$(dayCard).attr("id", "day-" + index);
		$(dayCard).attr("class", "col-md-1 fiveDayCard");
		var todayDay = new Date(day.dt * 1000);

		var dateElement =
			'<div class="fiveDayDate">' + todayDay.toLocaleDateString() + "</div>";
		console.log(dateElement);
		console.log($(dateElement));
		var iconSrc =
			"http://openweathermap.org/img/wn/" + day.weather[0].icon + ".png";
		var iconElement = '<img src="' + iconSrc + '"/>';
		var tempElement =
			'<div class="fiveDayTemp">Temp: ' + day.temp.day + "&#8457;</div>";
		var windElement =
			'<div class="fiveDayWind">Wind: ' + day.wind_speed + " MPH</div>";
		var humidityElement =
			'<div class="fiveDayHumidity">Humidity: ' + day.humidity + "%</div>";

		$(dayCard).append(dateElement);
		$(dayCard).append(iconElement);
		$(dayCard).append(tempElement);
		$(dayCard).append(windElement);
		$(dayCard).append(humidityElement);
		$("#fiveDay").append(dayCard);
	}
};
var weatherFetch = function (lat, lon, name, state) {
	$.ajax({
		method: "get",
		url:
			"https://api.openweathermap.org/data/2.5/onecall?lat=" +
			lat +
			"&lon=" +
			lon +
			"&appid=844d3528241d316fb5b721dd030a0efe&units=imperial",
	}).then(function (response) {
		console.log(response);
		$("#city")
			.empty()
			.append(name + ", ");
		$("#state").empty().append(state);
		var todayDay = new Date(response.current.dt * 1000);
		$("#date").empty().append(todayDay.toLocaleDateString());
		var todayIcon =
			"http://openweathermap.org/img/wn/" +
			response.current.weather[0].icon +
			".png";
		$("#weatherIcon").attr("src", todayIcon);
		$("#temp").empty().append(response.current.temp);
		$("#wind").empty().append(response.current.wind_speed);
		$("#humidity").empty().append(response.current.humidity);
		$("#uv").empty().append(response.current.uvi);
		if (response.current.uvi <= 3) {
			$("#uv").attr("class", "").addClass("low");
		}
		if (response.current.uvi > 3 && response.current.uvi <= 5) {
			$("#uv").attr("class", "").addClass("moderate");
		}
		if (response.current.uvi < 5 && response.current.uvi >= 7) {
			$("#uv").attr("class", "").addClass("high");
		}
		if (response.current.uvi < 7 && response.current.uvi >= 10) {
			$("#uv").attr("class", "").addClass("veryHigh");
		}
		if (response.current.uvi > 10) {
			$("#uv").attr("class", "").addClass("extreme");
		}

		fiveDayFetch(response.daily);
	});
};
//Info to be shown: city name, date, icon of weather condition, tep, humidity, weind speed, and UV index

//city name and date should be a h3 in a line, and have the icon for the weather type next to it. Temp, Wind, humidity, and UV index should in blocks. Attach them to a span
//uv index should have color code based on severity of UV. Applying a class that has a background color for the span of green/yellow/red based on severity should work

//future weather conditons for city needs : date, icon, temp, wind, and humidity
//forloop to pick days that need to be displayed and append info to each created element index starts at 1, i <response.daily.length -2/3
//all searched cities should be accessible in history, and pull up same information again.
