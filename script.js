
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

    var longit = 0;
    var latit = 0;

    
    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        // console.log('Button clicked');
        var apiKey = 'faa01ea92e85d4bc6a69d8f941aba85c';

        var userInput = $('#city-search').val();
        // console.log('City is: ', userInput);

        queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&appid=' + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            
            longit = response.coord.lon;
            latit = response.coord.lat;
            // console.log('coordinates are: ', longit, latit);

            cityName = response.name;
            var today = new Date();
            var date = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
            // console.log('Date is: ', date);
            $('#city-name').html(cityName + ' ' + '('+ date + ')' + ' ');

            var icon = response.weather[0].icon;
            // console.log('icon is: ', icon);
            imgURL = 'http://openweathermap.org/img/wn/'+ icon + '.png';
            $('#weather-icon').attr('src', imgURL);

            var tempK = response.main.feels_like;
            var tempF = (tempK * (9/5)) - 459.67;
            console.log('Tempf: ', tempF);
            $('#temp').html('Temperature: '+tempF.toFixed(1) + '\u00B0' + 'F');

            var humidity = response.main.humidity;
            $('#humid').html('Humidity: '+humidity + '%');

            var windS = response.wind.speed;
            $('#wind').html('Wind-speed: '+ windS + 'mph');





        })
    })



});