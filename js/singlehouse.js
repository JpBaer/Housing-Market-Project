
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
document.getElementById("house-photo").setAttribute("src", localStorage.getItem("house-picture"));
document.getElementById("show-beds").innerHTML = "# of Bedrooms: " + localStorage.getItem("house-beds");
document.getElementById("show-baths").innerHTML = "# of Bathrooms: " + localStorage.getItem("house-baths");
document.getElementById("show-list-date").innerHTML = "Listing Date: " + localStorage.getItem("house-list-date");
document.getElementById("show-sqft").innerHTML = "Square Footage: " + localStorage.getItem("house-sqft");
document.getElementById("show-prop-type").innerHTML = "Property Type: " + localStorage.getItem("house-prop-type");
document.getElementById("show-office-name").innerHTML = "Office Name: " + localStorage.getItem("house-office-name");
document.getElementById("show-url").innerHTML = "URL: " + localStorage.getItem("house-url");

// var houseCoords = JSON.parse(localStorage.getItem('houseCoords'))
// console.log(houseCoords[0][0]);