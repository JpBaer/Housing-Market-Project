// ------------------------------------------------------------------------------- //

// Zillow: stuff needed

    // Zillow Docs: https://bridgedataoutput.com/docs/explorer/zestimates#listZestimates
    // Zillow URL: https://api.bridgedataoutput.com/api/v2/zestimates_v2/zestimates?access_token=SERVER_TOKEN

    // Request: near, fields, limit, radius
        // get city info from search bar, store in near

    // Responses needed: address, zestimate, city, A timestamp representing when last this record was modified
        // link: click here for street view
        // retrieve address and zestimate from the Zestimate API

//Example code for calling a fetch from realty-in-us
var searchButton = document.getElementById('searchButton');
function fetchRealty(){
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': "eba8306e12msh1c414b154242eb7p11f720jsnd5aaf05cb4b3",
                "X-RapidAPI-Host": "realty-in-us.p.rapidapi.com"
            }
        };
        //var stateCode: 
        //var cityName:
        //spaces in city name need to be replaced with %20
        fetch("https://realty-in-us.p.rapidapi.com/properties/list-for-sale?state_code=" + stateCode + "&city=" + cityName + "&offset=0&limit=200&sort=relevance", options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }

searchButton.addEventListener('click',function(){fetchRealty()});


        
// ----------------Beginning of Google Maps Section--------------- //


// We will need 3 seperate Map functions
// #1 Take users current location and display on the page upon page load
    // User will have to have location sharing enabled
// #2 Replace current location with the location of the searched area in map section of main page
    //Bonus points if you can display icons for each house
// #3 On Single House page show location of selected house and street view if applicable

//Create a function for when a house is clicked that pulls lat and lon from zillow and displays map

var GoogleAPIKey = "AIzaSyCxd2Ls7wflVthdU9GtS3jhfKlUOaMxd0U"


//
function initMap(){
    //var latlon = 
    var lat = 47.6062
    var lng = -122.3321
    var coords = {lat:lat,lng:lng}
    var options = {
        zoom: 10,
        center: coords
    }

    var map = new google.maps.Map(document.getElementById('map'),options);

    var marker = new google.maps.Marker({
        position: coords,
        map: map,
      });
}




// Example HTTPS Call https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=API_Key
// JSON signifies to return response in JSON
// Address components seperated by +









