
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
        var longit = 0;
        var latit = 0;
    
        // console.log('Button clicked');
        var apiKey = 'faa01ea92e85d4bc6a69d8f941aba85c';

        var userInput = $('#city-search').val();
        // console.log('City is: ', userInput);

        queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&appid=' + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);
            
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
            // console.log('Tempf: ', tempF);
            $('#temp').html('Temperature: '+tempF.toFixed(1) + '\u00B0' + 'F');

            var humidity = response.main.humidity;
            $('#humid').html('Humidity: '+humidity + '%');

            var windS = response.wind.speed;
            var windSMPH = windS * 2.236936;
            $('#wind').html('Wind-speed: '+ windSMPH.toFixed(1) + ' mph');


            //Call for UV Index
            var queryURL2 = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + latit + '&lon=' + longit + '&appid=' + apiKey;
            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function (response) {
                // console.log('UVI response: ', response);
                var uvIndex = response.value;
                console.log(uvIndex);
                $('#uvi').html('UV Index: ');
                $('#uv-ind').html(uvIndex);
                // $(currentUvindex).html(response.value);
            })

            var queryURL3= 'http://api.openweathermap.org/data/2.5/forecast?q=' + userInput + '&appid=' + apiKey;
            $.ajax({
                url: queryURL3,
                method: "GET"
            }).then(function (response) {
                console.log(response);

                for(var i = 0; i<5; i++){
                    //Start at 12 noon the next day
                    var j = 5;

                    //Display the next 5 dates
                    var dateFD = (today.getMonth()+1) + '/' + (today.getDate()+i+1) + '/' + today.getFullYear();
                    var dateW = '#date-week' + i.toString();
                    $(dateW).html(dateFD);

                    //Display the next 5 weather icons
                    var iconFD = response.weather[j].icon;
                }
            })

        })


    })



});