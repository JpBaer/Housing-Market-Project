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
var cityInput = document.getElementById('city-input');
var stateInput = document.getElementById('state-select')

function fetchRealty(){
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': "eba8306e12msh1c414b154242eb7p11f720jsnd5aaf05cb4b3",
                "X-RapidAPI-Host": "realty-in-us.p.rapidapi.com"
            }
        };

        //Grabs value from state code dropdown
        //Need to add a modal for errors if stateCode of cityName doesnt exist
        var stateCode = stateInput.value; 
        console.log(stateCode)
        //Replaces spaces with %20 for fetch url
        var cityName = cityInput.value.split(' ').join('%20');
        console.log(cityName);
        
        fetch("https://realty-in-us.p.rapidapi.com/properties/list-for-sale?state_code=" + stateCode + "&city=" + cityName + "&offset=0&limit=200&sort=relevance", options)
       //fetch("https://realty-in-us.p.rapidapi.com/properties/list-for-sale?state_code=NY&city=New%20York%20City&offset=0&limit=200&sort=relevance", options)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
                var houseCoords = [];
                for( var i = 0; i < 5; i++){

                console.log(data.listings[i])
                console.log(data.listings[i].address)
                console.log(data.listings[i].lat)
                console.log(data.listings[i].lon)
                console.log(data.listings[i].photo)
                console.log(data.listings[i].price)

                //Add house coordinates to array for setting markers
                houseCoords.push([data.listings[i].lat, data.listings[i].lon])


                //Create function to take lat lon and place marker on map

                }

                // Call function to put markers on map, housecoords is an array containing coordinates from each house
                setMarkers(housecoords)
            })
            
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

//Grabs users location
var userPosition = navigator.geolocation;

//determines users location
userPosition.getCurrentPosition(success,failure);
//If successful runs success function to show a map with current location
function success(position){

    var userLat = position.coords.latitude;
    var userLng = position.coords.longitude;
    var coords = new google.maps.LatLng(userLat,userLng);
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
//If failed to get current location runs following function to show default map of seattle
function failure(){
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


function setMarkers(map, houseCoords)

// Example HTTPS Call https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=API_Key
// JSON signifies to return response in JSON
// Address components seperated by +









