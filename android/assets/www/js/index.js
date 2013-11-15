/*
Name: Nathan Byarley
Class: AVF
Term: 1311
Project Week 2
*/


var accelerometerFn;

//device ready function
function onDeviceReady() {
    $("#btn-geo").on("click", geoFn);
    $("#btn-notification").on("click", notificationFn);
    $("#btn-accelerometer").on("click", accelerometerFn);
    $("#btn-conn").on("click", connFn);
    $("#btn-weather").on("click", weatherFn);
    $("#btn-instagram").on("vclick", instagramFn);
}//End onDevice Function

//EventListener
document.addEventListener("deviceready", onDeviceReady, false);

//basic layout for button functions
// ------- Android & iOS natives ------
var geoFn = function() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
};

var notificationFn = function() {
};

var accelerometerFn = function() {
    navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
};


//connection
var connFn = function() {
    var networkState = navigator.network.connection.type;
    var status = {};
        status[Connection.UNKNOWN]  = 'Unknown connection';
        status[Connection.ETHERNET] = 'Ethernet connection';
        status[Connection.WIFI]     = 'WiFi connection';
        status[Connection.CELL_2G]  = 'Cell 2G connection';
        status[Connection.CELL_3G]  = 'Cell 3G connection';
        status[Connection.CELL_4G]  = 'Cell 4G connection';
        status[Connection.NONE]     = 'No network connection';
    $("#connType").append("Your connection type is: " + status[networkState]);
    //console.log(status);
}


//Basic layout for button functions
// ------- data API Group --------
    var weatherFn = function() {
        //data
    };

    var instagramFn = function() {
        //data
    };

//Geolocation
var getCurrentPosition = function() {
    var gSuccess = function(pos) {
        var lat = pos.coords.latitude;
        var lon = pos.coords.longitude;
        var text = "<div>Latitude: " + lat +
        "<br/>" + "Longitude: " + lon + "<br/>" +
        "Accuracy: " + pos.coords.accuracy + "m<br/>" + "</div>";
        $("#currentPosition").html(text);
        console.log(text);
        $('#geoMap').css('visibility','visible');
        $('#geoMap').attr('src', "http://maps.googleapis.com/maps/api/staticmap?center=" +
                       pos.coords.latitude + "," + pos.coords.longitude +
                       "&zoom=13&size=600x300&maptype=roadmap&markers=color:green%7C" +
                       pos.coords.latitude + "," + pos.coords.longitude + "&sensor=false");
    };
    var gError = function(error) {
        $("#currentPosition").html("Error getting geolocation: " + error.code);
        console.log("Error getting geolocation: code=" + error.code + " message=" + error.message);
    };
    
    $('#geoMap').css('visibility','hidden');
    $("#currentPosition").html("Getting your current geolocation . . .");
    console.log("Getting geolocation . . .");
    navigator.geolocation.getCurrentPosition(gSuccess, gError);
};


//if onSuccess fails to run error box will deisplay.
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

//Notification
    function alertDismissed() {
        // do something
    }

//show the information in an alert box
    function alertShow(){
        navigator.notification.alert(
            'You are the winner!',  // message
            alertDismissed,         // callback
            'Game Over',            // title
            'Done'                  // buttonName
        );
    }


//ACCELEROMETER

function onSuccess(acceleration) {
    alert('Accelerometer has loaded!');
    alert('Acceleration X: ' + acceleration.x + '\n' +
          'Acceleration Y: ' + acceleration.y + '\n' +
          'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: '      + acceleration.timestamp + '\n');
}


// onError: Failed to get the acceleration
function onError() {
    alert('onError!');
}


//weather section link. 
$(function(){
    var url = "https://api.aerisapi.com/observations/orlando,fl?client_id=LiPjIX9OQKBsFauD0Qx5m&client_secret=igZhgFW7alLw2KzDOIyclVOAm5ryJWXyfLOZQJgz";
    $.getJSON(url, resultOutput);
});


// Function puts search results into a list -- use css to customize the list
    var resultOutput = function(data){
        console.log(data);//call data to console from function

        //variable to shorten the link of accessing the JSON file
        var ob = data.response.ob;
        var wLoc = data.response.place.name;//selects the name within the joson

        //creating a variable for the data and html for easier viewablility on the screen
        var place = "<li> The weather for " + wLoc + " is:</li><br>";//gets the location
        var temp = "<li> The temp is: <h4>" + ob.tempF + " F</h4></li>";//get the temp
        var weather = "<li> The weather condition is: <h4>" + ob.weather + "</h4></li>";//type of weater

        //append the variables to a class within the HTML
        $('#weatherInfo').append(place);
        $('#weatherInfo').append(temp);
        $('#weatherInfo').append(weather);
    };

//get information from instagram based on URL and search.
    $('form #searchbtn').on('click', function(){
        $('#data-output').empty();
        var tag = $('#search').val();
        var url = 'https://api.instagram.com/v1/tags/'+ tag +
                    '/media/recent?callback=?&amp;client_id=dc37a44cb489463bbbd60081eb33069a';
        $.getJSON(url, results);
    });

// Function puts search results into a list -- use css to customize the list
    var results = function(info){
        console.log(info);//call data to console from function
        //This will create the information for every image that populates the field
        $.each(info.data, function(index, photo){
            //variable to get and display pictures in application and link the image to the larger image for a better view.
            var pic = "<li><img src='" + photo.images.low_resolution.url +
                        "'alt='" + photo.user.id + "' /></a></li>";
            $("#data-output").append(pic);
        });
    };

// -------- Research Group --------
//Weekly Progress Section
//Same as the about section JS allows the script to function upon loading of the page
//will hide fields not active and show the tab that is active.
    $('#weekProgress').on('pageinit', function(){
        //Tab function on about page
        $('#weekProgress').delegate('.ui-navbar a', 'click', function () {
            $(this).addClass('ui-btn-active');
            $('.content_div').hide();//hides the field based on the class
            $('#' + $(this).attr('data-href')).show();//shows active field
        });
    });


//About Section
//manipulating the jquery.js files for easier construction
//of the tab control.
    $('#about').on('pageinit', function(){
        //Tab function on about page
        $('#about').delegate('.ui-navbar a', 'click', function () {
            $(this).addClass('ui-btn-active');
            $('.content_div').hide();
            $('#' + $(this).attr('data-href')).show();
        });
    });


