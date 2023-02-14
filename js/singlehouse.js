
//If failed to get current location runs following function to show default map of seattle
function initMap(){
    //var latlon = 
    var houseCoords = [localStorage.getItem('latitude'), localStorage.getItem('longitude')];
    console.log(houseCoords);
    var lat = Number(houseCoords[0]);
    console.log(lat);
    var lng = Number(houseCoords[1]);
    console.log(lng);
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



// var houseCoords = JSON.parse(localStorage.getItem('houseCoords'))
// console.log(houseCoords[0][0]);