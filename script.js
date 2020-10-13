
//Form inputs, prevent default event 
//Input for city name
//Get current and future weather for that city via the API- city, date, icon to represent weather, temp, humidity, wind speed, UV index
//Add city to local storage (array of cities? think of the high scores for the JS quiz)
//UV index should have a color indicating it's severity
//Future weather should show 5 days worth- date, icon, temp and humidity
//When you click on a city in search history show all the info again
//When you open the app, show the last city you searched for
//1. Take input from box, plug it into the api query

$(document).ready(function(){

    
    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        console.log('Button clicked');

        var userInput = $('#city-search').val();
        console.log('City is: ', userInput);
    })



});