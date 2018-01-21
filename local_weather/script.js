window.onload = init;

function init() {
	var lat, long;
	var object = [];

	//geolocation
	if(navigator.geolocation) {
		//if true get geolocation
		navigator.geolocation.getCurrentPosition(getInfo);
	}
	else{
		window.alert("Could not get geolocation.")
	}

	
	function getInfo(position) {
		lat = position.coords.latitude;
		long = position.coords.longitude;

		//get the doc corresponding to location
		//store the url
		var urlApi = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long;
		//create a request
		var request = new XMLHttpRequest();
		//open request
		request.open('GET', urlApi);
		//set response
		request.responseType = 'json';
		//send request
		request.send();
		//store response
		request.onload = function() {
			//the object
			var datas = request.response;
			//function to use it
			displayWeather(datas);
			getFt(datas);
			changeBack(datas);
		}
	}
	//display infos in dedicated tag
	function displayWeather(datas) {
		//main info
		var loc = document.querySelector("#city");
		let weather = datas.weather;
		 weather.forEach(write);
		function write(d) {
			loc.innerHTML = "<p>weather in "+ datas.name +":<br>"+ weather[0].main +",<br>("+
			weather[0].description +").</p>";
		}
		//temperatures
		var temp = document.querySelector("#temperatures");
		temp.innerHTML = "Actual temperature:<br>"+ datas.main.temp+"° celsius"+"<br>"+
		"today's minimum:<br>"+ datas.main.temp_min +"°<br>"+
		"today's maximum:<br>"+ datas.main.temp_max +"°";

		//coords
		var coords = document.querySelector("#coords");
		coords.innerHTML = "<p>Your location's longitude is<br>"+ datas.coord.lon +"<br>"+
		"your location's latitude is<br> "+ datas.coord.lat +"</p>";
		
		//bonus
		var bonus = document.querySelector("#plus");
		bonus.innerHTML = "<p>humidity level:<br> "+ datas.main.humidity +"%<br>"+
		"wind speed:<br> "+ datas.wind.speed +"m/s</p>";

	}
	
	//farenheit
	function getFt(datas) {
	var button = document.querySelector("#farenheit");

	button.addEventListener("click", function change() {

		let mainFt = Math.round((datas.main.temp * 9/5) + 32);
		let ft_min = (datas.main.temp_min * 9/5) + 32;
		let ft_max = (datas.main.temp_max * 9/5) + 32;
		var temp = document.querySelector("#temperatures");
		temp.innerHTML = "Actual temperature:<br>"+ mainFt+"° farenheit"+"<br>"+
		"today's minimum:<br>"+ ft_min +"°<br>"+
		"today's maximum:<br>"+ ft_max +"°";

		});
	}

	//change background according to weather
	function changeBack(datas) {
		var body = document.querySelector("body");
		//get datas from weather array
		let weather = datas.weather;
		weather.forEach(use);
		function use() {
			var w = weather[0].main;
			var id = weather[0].id;
			//in case of x put img y
			switch(w) {
				case w = "Rain" :
				body.style.backgroundImage = 'url(img/rain.jpg)';
				break;
				case w = "Thunderstorm" :
				body.style.backgroundImage = 'url(img/storm.jpg)';
				break;
				case w = "Drizzle" :
				body.style.backgroundImage = 'url(img/drizzle.jpg)';
				break;
				case w = "Snow" :
				body.style.backgroundImage = 'url(img/snow.jpg)';
				break;
				case w = "Clear" :
				body.style.backgroundImage = 'url(img/sunny.jpg)';
				break;
				case w = "Extreme" :
				body.style.backgroundImage = 'url(img/extreme.jpg)';
				break;
			}
			switch(id) {
				case id = 801: //few clouds
				body.style.backgroundImage = 'url(img/clouds.jpg)';
				break;
				case id = 802 ://scattered or broken clouds
				case id = 803 :
				body.style.backgroundImage = 'url(img/heavy_clouds.jpg';
				break;
				case id = 804 :
				body.style.backgroundImage = 'url(img/overcast.jpg)';
				break;
				case id = 701 : //mist and others
				case id = 711 :
				case id = 721 :
				case id = 741 :
				body.style.backgroundImage = 'url(img/fog.jpg)';
				break;
			}
		}
	}
}