
//If failed to get current location runs following function to show default map of seattle
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
      })
}

// using local storage to pass house data to single house page
document.getElementById("show-address").innerHTML = "House Address: " + localStorage.getItem("house-address");
document.getElementById("show-price").innerHTML = "House Price: " + localStorage.getItem("house-price");