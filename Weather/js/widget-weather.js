$.fn.widgetWeather = function(options) {

// Vars
   
var params = $.extend({
    appID: 'cc9792a46fb8d1504273e763e18f75c6',
    countryCode: 'ua',
    cityName: 'odessa',
    lang: 'en',
    units: 'metric',	
    iconPosition: 'img/placeholder.svg'
}, options);

var iconsArray = [];

iconsArray['01d'] = 'img/01d.svg';
iconsArray['01n'] = 'img/01n.svg';
iconsArray['02d'] = 'img/02n.svg';
iconsArray['02n'] = 'img/02n.svg';
iconsArray['03d'] = 'img/03.svg';
iconsArray['03n'] = 'img/03.svg';
iconsArray['04d'] = 'img/04.svg';
iconsArray['04n'] = 'img/04.svg';
iconsArray['09d'] = 'img/09.svg';
iconsArray['09n'] = 'img/09.svg';
iconsArray['10d'] = 'img/10d.svg';
iconsArray['10n'] = 'img/10n.svg';
iconsArray['11d'] = 'img/11.svg';
iconsArray['11n'] = 'img/11.svg';
iconsArray['13d'] = 'img/13.svg';
iconsArray['13n'] = 'img/13.svg';
iconsArray['50d'] = 'img/50.svg';
iconsArray['50n'] = 'img/50.svg';

//Controllers

setInterval( function() {
var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var currentDate = ((''+day).length<2 ? '0' : '') + day + '.' + ((''+month).length<2 ? '0' : '') + month;
var currentTime = d.getHours() + ":" + ((''+d.getMinutes()).length<2 ? '0' : '') + d.getMinutes();
$('.time').html(currentTime);
$('.header .date').html(currentDate);
}, 1000);

$(document).on('click', '.position', function(){
    $('.modal').addClass('active');
    $('.location').addClass('active');
})

$(document).on('click', '.modal', function(){
    $('.modal').removeClass('active');
    $('.location').removeClass('active');
})

$(document).on('click', '.send', function(){

    params.countryCode = $('#country').val();
    params.cityName = $('#city').val();    
    
    $.getJSON({
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + params.cityName + ',' + params.countryCode + '&APPID=' + params.appID + '&units=' + params.units + '&lang=' + params.lang
    }).done(function(result){
    $('.city-name').html(result.name);
    $('.temperature').html(result.main.temp + '°C');
    $('.icon').html('<img src ="' + iconsArray[result.weather[0].icon] + '">');
    });

    $.getJSON({
        url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + params.cityName + ',' + params.countryCode + '&APPID=' + params.appID + '&units=' + params.units + '&lang=' + params.lang
    }).done(function(resulted){

  $('.week-weather').empty();

    for (var i = 0; i < 40; i++) {
        var date = resulted.list[i].dt_txt.split(' ');
       
        if (date[1].slice(0, 5) == '12:00') {
                   
            var fate = resulted.list[i].dt_txt.split(' ');
            var mate = fate[0].split('-');
                 
        templateSub =       '<div class="item">' +
                                '<span class="temp data-weather-span">' + resulted.list[i].main.temp + '°C</span>' +
                                '<span class="date data-weather-span">' + mate[2] + '.' + mate[1] + '</span>' +
                            '</div>';

                    $('.week-weather').append(templateSub);
        };
    };
});
    $('.modal').removeClass('active');
    $('.location').removeClass('active');
})

//Init

$.getJSON({
    url: 'http://api.openweathermap.org/data/2.5/weather?q=' + params.cityName + ',' + params.countryCode + '&APPID=' + params.appID + '&units=' + params.units + '&lang=' + params.lang
}).done(function(result){
	     
    templateMain = 	'<div class="content">' + 
                        '<div class="modal">' +
                        '</div>' +
                        '<div class="location">' +
                            '<div class="location-select">' +
                            '<form action="#" name="location">' +
                            '<input type="text" name="city-select" class="data-weather-input "id="city" placeholder="City name">' +
                            '<input type="text" name="country-select" class="data-weather-input id="country" placeholder="Country code">' +
                            '<a href="#" class="send">Send</a>' +
                            '</form>' +
                            '</div>' +
                        '</div>' +
                        '<div class="header">' +
                            '<span class="date data-weather-span"></span>' +
                            '<img class="position"src="' + params.iconPosition + '">' +
                        '</div>' +
                        '<div class="main">' +
                            '<span class="city-name data-weather-span">' + result.name + '</span>' +
                        '</div>' +
                        '<div class="time-container">' +
                            '<span class="time data-weather-span"></span>' +
                        '</div>' +
                        '<div class="weather">' +
                            '<span class="temperature data-weather-span">' + result.main.temp + '°C</span>' +
                            '<span class="icon data-weather-span"><img src ="' + iconsArray[result.weather[0].icon] + '"></span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="footer">' + 
                        '<div class="week-weather">' +
                        '</div>' +                   
                    '</div>'
    $('.data-weather-container').html(templateMain);
   
});

$.getJSON({
    url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + params.cityName + ',' + params.countryCode + '&APPID=' + params.appID + '&units=' + params.units + '&lang=' + params.lang
}).done(function(resulted){

    for (var i = 0; i < 40; i++) {  

        var date = resulted.list[i].dt_txt.split(' ');
        if (date[1].slice(0, 5) == '12:00') {
           
            var fate = resulted.list[i].dt_txt.split(' ');
            var mate = fate[0].split('-');

   templateSub =       '<div class="item">' +
                            '<span class="temp data-weather-span">' + resulted.list[i].main.temp + '°C</span>' +
                            '<span class="date data-weather-span">' + mate[2] + '.' + mate[1] + '</span>' +
                        '</div>';

                    $('.week-weather').append(templateSub);
        };   
    };
});

}