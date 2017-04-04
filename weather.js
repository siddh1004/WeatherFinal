$(document).ready(function (){
var latitude  = '';
var longitude = '';
var length = '';
var temperature = '';
var celsius = '';
var kelvin = '';
var condition = '';
var icon = '';
var sortedCondition = '';
navigator.geolocation.getCurrentPosition(function (p) {
latitude = p.coords.latitude;
longitude = p.coords.longitude;

$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?latlng=' +latitude + ',' +longitude + '&sensor=true', function(json){
result = json.results[0];
 length = result.address_components.length;
	for(var i = 0; i < length; i++){
	if(result.address_components[i].types[0] === 'country'){
	country = result.address_components[i].short_name;
	    }
		if(result.address_components[i].types[0] === 'administrative_area_level_2'){
   city = result.address_components[i].long_name;		
			
		}
	}
$(".location").html(city + ","+ country);
$.getJSON('http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=f637ff4003e5e3acc3c2232298b67c65',function(weather){
temperature = weather.main.temp;
celsius =  Math.floor(temperature - 273.15);
	kelvin = Math.floor(temperature*(9/5) - 459.67);
	condition = weather.weather[0].description;
	icon = weather.weather[0].icon;
	sortedCondition = condition.charAt(0).toUpperCase() + condition.slice(1);
	
$(".temperature").html(celsius);
	$(".condition").html(sortedCondition);
$(".icon").html("<img src='http://openweathermap.org/img/w/"+icon+".png'>");
$(".celsius").on("click",function(){

$(".temperature").html(celsius);
	

});
	$(".farenheit").on("click",function(){

$(".temperature").html(kelvin);

});
});
});
});

});
