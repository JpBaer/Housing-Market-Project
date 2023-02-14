// ------------------------------------------------------------------------------- //

// Zillow: stuff needed

    // Zillow Docs: https://bridgedataoutput.com/docs/explorer/zestimates#listZestimates
    // Zillow URL: https://api.bridgedataoutput.com/api/v2/zestimates_v2/zestimates?access_token=SERVER_TOKEN

    // Request: near, fields, limit, radius
        // get city info from search bar, store in near

    // Responses needed: address, zestimate, city, A timestamp representing when last this record was modified
        // link: click here for street view
        // retrieve address and zestimate from the Zestimate API

var searchButton = document.getElementById('searchButton');
var cityInput = document.getElementById('city-input');
var stateInput = document.getElementById('state-select');
var modalbtn = document.querySelector('.modal-close');
var modal = document.querySelector('.modal');

function fetchRealty(stateCode, cityName){
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': "eba8306e12msh1c414b154242eb7p11f720jsnd5aaf05cb4b3",
                "X-RapidAPI-Host": "realty-in-us.p.rapidapi.com"
            }
        };
        
        fetch("https://realty-in-us.p.rapidapi.com/properties/list-for-sale?state_code=" + stateCode + "&city=" + cityName + "&offset=0&limit=200&sort=relevance", options)
       //fetch("https://realty-in-us.p.rapidapi.com/properties/list-for-sale?state_code=NY&city=New%20York%20City&offset=0&limit=200&sort=relevance", options)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
                if(data.listings.length === 0){
                    modal.classList.add("is-active");
                    return;
                }
                
                var houseCoords = [];
                var housePrices = [];
                for( var i = 0; i < 6; i++){

             

                //Add house coordinates to array for setting markers
                houseCoords.push([data.listings[i].lat, data.listings[i].lon]);
                housePrices.push(data.listings[i].price);


             

                    console.log(data.listings[i])

                    // console.log(data.listings[i].address)
                    // console.log(data.listings[i].lat)
                    // console.log(data.listings[i].lon)
                    // console.log(data.listings[i].photo)
                    // console.log(data.listings[i].price)
                    document.getElementsByClassName("cardImage")[i].setAttribute("src", data.listings[i].photo);
                    document.getElementsByClassName("cardAddress")[i].innerHTML = data.listings[i].address;
                    document.getElementsByClassName("cardPrice")[i].innerHTML = data.listings[i].price;
                    document.getElementsByClassName("card")[i].setAttribute("data-listdate", data.listings[i].list_date);
                    document.getElementsByClassName("card")[i].setAttribute("data-proptype", data.listings[i].prop_type);
                    document.getElementsByClassName("card")[i].setAttribute("data-beds", data.listings[i].beds);
                    document.getElementsByClassName("card")[i].setAttribute("data-baths", data.listings[i].baths);
                    document.getElementsByClassName("card")[i].setAttribute("data-sqft", data.listings[i].sqft);
                    document.getElementsByClassName("card")[i].setAttribute("data-officename", data.listings[i].office_name);
                    document.getElementsByClassName("card")[i].setAttribute("data-url", data.listings[i].rdc_web_url);
                }
                    //Takes coordinates and prices and places on map
                    //Add Address
                    setMarkers(houseCoords, housePrices);
                    localStorage.setItem('houseCoords',JSON.stringify(houseCoords));
                // calculates the mean price for houses in the area
                var averagePrice = 0;
                for (var n = 0; n < data.listings.length; n++) {
                    averagePrice += data.listings[n].price_raw;
                }  

                averagePrice = averagePrice / data.listings.length;
                console.log(averagePrice);

                
            })
            
            .catch(err => {console.error(err)
            });
    }

searchButton.addEventListener('click',function(){
    //Grabs value from state code dropdown
    //Need to add a modal for errors if stateCode of cityName doesnt exist
    var stateCode = stateInput.value; 
    console.log(stateCode)
    //Replaces spaces with %20 for fetch url
    var cityName = cityInput.value.split(' ').join('%20');
        fetchRealty(stateCode, cityName);
});

modalbtn.addEventListener('click', function(){
    modal.classList.remove("is-active");
})

// TODO: card 1 works, testing card clickability for other cards
function passValues(cardNumber) {
    console.log("house card clicked");
    localStorage.setItem("house-address", document.getElementById("card-" + cardNumber + "-link").getElementsByClassName("cardAddress")[0].innerHTML);
    localStorage.setItem("house-price", document.getElementById("card-" + cardNumber + "-link").getElementsByClassName("cardPrice")[0].innerHTML);
}

// ----------------Beginning of Google Maps Section--------------- //


// We will need 3 seperate Map functions
// #1 Take users current location and display on the page upon page load
    // User will have to have location sharing enabled
// #2 Replace current location with the location of the searched area in map section of main page
    //Bonus points if you can display icons for each house
// #3 On Single House page show location of selected house and street view if applicable

//Create a function for when a house is clicked that pulls lat and lon from Realty-In-US and displays map

var GoogleAPIKey = "AIzaSyCxd2Ls7wflVthdU9GtS3jhfKlUOaMxd0U"

//Grabs users location
var userPosition = navigator.geolocation;



//determines users location
userPosition.getCurrentPosition(success,failure);
//If successful runs success function to show a map with current location
function success(position){

    console.log(position)

    var userLat = position.coords.latitude;
    var userLng = position.coords.longitude;
    var coords = new google.maps.LatLng(userLat,userLng);
    var options = {
        zoom: 10,
        center: coords
    }

    //Creates map on users location
    var map = new google.maps.Map(document.getElementById('map'),options);

    //Creates marker on users location
    var marker = new google.maps.Marker({
        position: coords,
        map: map,
      });

    // Reverse Geolocate (convert lat and lng into readable address)
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({location: {lat: userLat, lng: userLng}})

      .then(function(response){
        return response;
      })
      .then(function(data){
        console.log(data);
        var userState = data.results[8].address_components[2].short_name;
        var userCity = data.results[8].address_components[0].long_name;

        //Populate with houses in users location upon page load

        fetchRealty(userState, userCity);
      })
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

//Creates map of seattle

    var map = new google.maps.Map(document.getElementById('map'),options);
//creates marker on seattle
    var marker = new google.maps.Marker({
        position: coords,
        map: map
      })
    var defaultState = 'WA';
    var defaultCity = 'Seattle';
//Calls realty function with seattle as default
    fetchRealty(defaultState, defaultCity);
}


//Function to set markers for populated houses
function setMarkers(houseCoords, housePrices){
    console.log(houseCoords)
    map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,

    // Sets center of map to location of first house
    center: {lat: houseCoords[0][0], lng: houseCoords[0][1]}
  });

    // loops through houses and places markers and infowindows

    for(let i = 0; i < houseCoords.length; i++){
        var markerCoords = houseCoords[i];
        var housePrice = housePrices[i];
        //console.log("House Price:" + housePrice);
      

        var marker =  new google.maps.Marker({
        position: { lat: markerCoords[0], lng: markerCoords[1] },
        map: map
        });

        var infowindow = new google.maps.InfoWindow({
            content: housePrice,
    
        });

        // This asigns content to each individual marker to prevent only one infowindow from being populated
        marker.infowindow = infowindow;
       
        marker.addListener("mouseover", function(){
           
            return this.infowindow.open(map, this);

        })
        // When mouse is moved away from marker infowindow dissapears
        marker.addListener("mouseout", function(){
            return this.infowindow.close(map, this);
        })
        }
 
    }
;












