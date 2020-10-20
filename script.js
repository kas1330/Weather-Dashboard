
//When you open the app, show the last city you searched for



$(document).ready(function(){

    var apiKey = 'faa01ea92e85d4bc6a69d8f941aba85c';

    if(JSON.parse(localStorage.getItem('citiesList'))){
        var l = JSON.parse(localStorage.getItem('citiesList'));
        var listLength = l.length;
        var i = 0;
        l.forEach(city => {
            console.log(city);
            var cityInput = $('<input type= "button" id= "" class= "mb-2 btn-primary btn-lg cityBtn" value=""/>');
            cityInput.attr('id', l[i].city);
            cityInput.attr('value', l[i].city);
            $('#buttonList').append(cityInput);
            i++;
        });
    }

    //Finds out which button has been clicked and calls the get weather function
    $(function(){
        $('#buttonList').click(function(e){
            console.log('Clicked a choice');
            var clicked = e.target.id;
            // console.log('Clicked: ', clicked);
            queryURL4 = 'https://api.openweathermap.org/data/2.5/weather?q=' + clicked + '&appid=' + apiKey;
            $.ajax({
                url: queryURL4,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                getWeather(clicked);
                
            })
        })
    })
    
    function getWeather(x){

        var longit = 0;
        var latit = 0;

        queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + x + '&appid=' + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);
            
            longit = response.coord.lon;
            latit = response.coord.lat;

            //Display city name
            cityName = response.name;
            var today = new Date();
            var date = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
            $('#city-name').html(cityName + ' ' + '('+ date + ')' + ' ');

            //Display weather icon
            var icon = response.weather[0].icon;
            imgURL = 'http://openweathermap.org/img/wn/'+ icon + '.png';
            $('#weather-icon').attr('src', imgURL);

            //Display temp
            var tempK = response.main.feels_like;
            var tempF = (tempK * (9/5)) - 459.67;
            $('#temp').html('Temperature: '+tempF.toFixed(1) + '\u00B0' + 'F');

            //Display humidity
            var humidity = response.main.humidity;
            $('#humid').html('Humidity: '+humidity + '%');

            //Display wind speed
            var windS = response.wind.speed;
            var windSMPH = windS * 2.236936;
            $('#wind').html('Wind-speed: '+ windSMPH.toFixed(1) + ' mph');


            //Call for UV Index
            var queryURL2 = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + latit + '&lon=' + longit + '&appid=' + apiKey;
            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function (response) {
                var uvIndex = response.value;
                $('#uvi').html('UV Index: ');
                $('#uv-ind').html(uvIndex);
                // $(currentUvindex).html(response.value);
                if(uvIndex >= 0 && uvIndex < 3){
                    $('#uv-ind').css("background-color", "green");
                    $('#uv-ind').css('color', 'white');

                }
                if(uvIndex >= 3 && uvIndex <= 6){
                    $('#uv-ind').css("background-color", "yellow");
                    $('#uv-ind').css('color', 'black');
                }
                if(uvIndex >= 6 && uvIndex <= 8){
                    $('#uv-ind').css("background-color", "orange");
                }
                if(uvIndex >= 8 && uvIndex <= 11){
                    $('#uv-ind').css("background-color", "red");
                    $('#uv-ind').css('color', 'white');
                }
                if(uvIndex > 11){
                    $('#uv-ind').css("background-color", "violet");
                }
            })

            var queryURL3= 'http://api.openweathermap.org/data/2.5/forecast?q=' + x + '&appid=' + apiKey;
            $.ajax({
                url: queryURL3,
                method: "GET"
            }).then(function (response) {
                console.log(response);

                //Start at 12 noon the next day
                var j = 5;
                for(var i = 0; i<5; i++){
                    
                    //Display the next 5 dates
                    var dateFD = (today.getMonth()+1) + '/' + (today.getDate()+i+1) + '/' + today.getFullYear();
                    var dateW = '#date-week' + i.toString();
                    $(dateW).html(dateFD);

                    //Display the next 5 weather icons
                    var iconFD = response.list[j].weather[0].icon;
                    var weatherFD = '#weather-pic' + i.toString();
                    imgURLFD = 'http://openweathermap.org/img/wn/'+ iconFD + '.png';
                    $(weatherFD).attr('src', imgURLFD);
                  
                    //Display the temp
                    var tempFDK = response.list[j].main.temp;
                    var tempFDF = (tempFDK * (9/5)) - 459.67;
                    var tempFD = '#future-temp' + i.toString();
                    $(tempFD).html('Temp: ' + tempFDF.toFixed(1) + '\u00B0' + 'F');

                    //Display humidity
                    var humidityFD = response.list[j].main.humidity;
                    var humidFD = '#future-humid' + i.toString();
                    $(humidFD).html('Humidity: ' + humidityFD + '%');

                    //Increment j to show data 24hrs from now
                    j= j+8;
                }
            })

        })
    }
    
    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        // var longit = 0;
        // var latit = 0;
    
        // console.log('Button clicked');
        var userInput = $('#city-search').val();
        // console.log('City is: ', userInput);

        //Store cities in local storage
        var storedCities = JSON.parse(localStorage.getItem('citiesList')) || [];
        var newCity = {city: userInput.toUpperCase()};
        storedCities.push(newCity);
        localStorage.setItem('citiesList', JSON.stringify(storedCities));
        // console.log(localStorage);

        getWeather(userInput);

        //Display most recent input button below the others
        var cityInput = $('<input type= "button" id= "" class= "mb-2 btn-primary btn-lg cityBtn" value=""/>');
        cityInput.attr('id', userInput);
        var upperInput = userInput.toUpperCase();
        cityInput.attr('value', upperInput);
        $('#buttonList').append(cityInput);

    })

    // //Clear local storage as well as the button div
    // $('#clear-btn').on('click', function (event){
    //     event.preventDefault();
    //     console.log('Clear button clicked');
    //     localStorage.removeItem('citiesList');
    //     $('#buttonList').empty();
    // })

});