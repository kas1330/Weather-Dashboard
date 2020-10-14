
//Form inputs, prevent default event 
//Input for city name
//Get current and future weather for that city via the API- city, date, icon to represent weather, temp, humidity, wind speed, UV index
//Add city to local storage (array of cities? think of the high scores for the JS quiz)
//UV index should have a color indicating it's severity
//Future weather should show 5 days worth- date, icon, temp and humidity
//When you click on a city in search history show all the info again
//When you open the app, show the last city you searched for
//1. Take input from box, plug it into the api query
//2. Put city name and date at top  of weather box. 
//Get the image depicting the weather, put that below city name

$(document).ready(function(){

    
    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        console.log('Button clicked');
        var apiKey = 'faa01ea92e85d4bc6a69d8f941aba85c';

        var userInput = $('#city-search').val();
        console.log('City is: ', userInput);

        queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&appid=' + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            cityName = response.name;
            console.log('City name is: ', cityName);
            var today = new Date();
            // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var date = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
            console.log('Date is: ', date);
            $('#city-name').html(cityName+ ' ' + date);



        })
    })



});