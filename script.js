var searchBar = $("#searchBar");
var searchBtn = $("#searchBtn");
var history = $("#history");
var cityName = $("#cityName");
var date = $("#date");
var weatherIcon = $("#weatherIcon");
var temp = $("#temp");
var wind = $("#wind");
var humidity = $("#humidity");
var uvIndex = $("#uv");
// var weatherPull =
// 	"https://api.openweathermap.org/data/2.5/onecall?lat=" +
// 	lat +
// 	"&lon=" +
// 	lon +
// 	"&appid=844d3528241d316fb5b721dd030a0efe";
// API KEY: 844d3528241d316fb5b721dd030a0efe"
//http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit={limit}&appid={844d3528241d316fb5b721dd030a0efe}
// access API
//when searching for a city, weather info is shown for that city
searchBtn.on("click", function () {
	//grab searchBar value
	console.log(searchBar.val());
	fetchCoords(searchBar.val());
});
//use geocoords API to grab lat and log based on city name in search bar
var fetchCoords = function (cityName) {
	$.ajax({
		method: "get",
		url:
			"http://api.openweathermap.org/geo/1.0/direct?q=" +
			cityName +
			"&appid=844d3528241d316fb5b721dd030a0efe",
	}).then(function (response) {
		console.log(response);
		console.log(response[0].lat, response[0].lon);
		weatherFetch(
			response[0].lat,
			response[0].lon,
			response[0].name,
			response[0].state
		);
	});
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
		var todayCity = name;
		cityName.append(todayCity);
		var todayTemp = response.current.temp;
		temp.append(todayTemp);
		var todayWind = response.current.wind_speed;
		wind.append(todayWind);
		var todayHumidity = response.current.humidity;
		humidity.append(todayHumidity);
		var todayUv = response.current.uvi;
		uvIndex.append(todayUv);
		// console.log(
		// 	response[0].lat,
		// 	response[0].lon,
		// 	response[0].name,
		// 	response[0].state
		// );
	});
};
//Info to be shown: city name, date, icon of weather condition, tep, humidity, weind speed, and UV index

//city name and date should be a h3 in a line, and have the icon for the weather type next to it. Temp, Wind, humidity, and UV index should in blocks. Attach them to a span
//uv index should have color code based on severity of UV. Applying a class that has a background color for the span of green/yellow/red based on severity should work

//future weather conditons for city needs : date, icon, temp, wind, and humidity
//forloop to pick days that need to be displayed and append info to each created element index starts at 1, i <response.daily.length -2/3
//all searched cities should be accessible in history, and pull up same information again.

//moment.js for date, use dt keyvalue to format unix time
