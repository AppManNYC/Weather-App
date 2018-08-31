$(document).ready(function() {

    var c = "&#8451;", f = "&#8457;";
    var key = "af389226ec9228788eba2c7ad3248eb8";
    var api = "https://api.darksky.net/forecast/" + key + "/";
    var temperature, scale = "fahrenheit";
    var chillImg = "https://i.ytimg.com/vi/BQxBh-Oen1w/maxresdefault.jpg";
    var coldImg = "https://i.ytimg.com/vi/JsM910nw_k8/maxresdefault.jpg";
    var rainImg = "https://goo.gl/M0V13J";

    if ("geolocation" in navigator) {

        navigator.geolocation.getCurrentPosition(function(location) {

            latitude = location.coords.latitude;
            longitude = location.coords.longitude;

            api += latitude + "," + longitude;

            $.ajax({
                dataType: "jsonp",
                url: api,
            }).done(function(data) {
                $.getJSON('https://geoip-db.com/json/geoip.php?jsonp=?', function(info) {
                    $("#location").text(info.country_name + ", " + info.city);
                });

                temperature = data.currently.temperature;

                if(temperature >= 77) {
                	// sunny
                	$("#temperature").append(
                		'<i style="margin-right: 20px" class="fa fa-sun-o" aria-hidden="true"></i>'
                		+ data.currently.temperature
                	);                	
                	$("#temperature").append(" " + f);
                } else if(temperature >= 59 && temperature < 77) {
                	$("#background").css("background-image", "url("+chillImg+")");
                	$("#temperature").append(
                		'<i style="margin-right: 20px" class="fa fa-glass-o" aria-hidden="true"></i>'
                		+ data.currently.temperature).append(" " + f
                	);
                } else {
                	$("#background").css("background-image", "url("+coldImg+")");
                	$("#background").css("color", "black");
                	$("#temperature").append(
                		'<i style="margin-right: 20px" class="fa fa-snowflake-o" aria-hidden="true"></i>'
                		+ data.currently.temperature).append(" " + f
                	);
                }

                if(data.currently.summary === "Rain") {
                	$("#background").css("background-image", "url("+rainImg+")");
                	$("#temperature").text('');
                	$("#temperature").append(
                		'<i style="margin-right: 20px" class="fa fa-umbrella" aria-hidden="true"></i>'
                		+ data.currently.temperature).append(" " + f
                	);     
                	$("#background").css("color", "white");           		
                }                

                $("#weather").text(data.currently.summary);
                $("#wind").text(data.currently.windSpeed + " Knots");
            });

        });

    } else { /* geolocation IS NOT available */
        alert('Activate geolocation on your browser, please');
    }

    $("#change-scale").click(function() {
    	$(this).animateCss("flash");
    	if(scale === "fahrenheit") {
    		temperature = ((temperature - 32) * 5/9).toFixed(2);
    		$("#temperature").text(temperature).append(" " + c);
    		scale = "celsius";
    	} else {
    		temperature = (temperature * 9/5 + 32).toFixed(2);
    		$("#temperature").text(temperature).append(" " + f);
    		scale = "fahrenheit"; 
    	}    	
    });

});

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});
