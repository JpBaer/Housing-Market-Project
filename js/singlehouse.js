
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


    var map = new google.maps.Map(document.getElementById('singlehouse-map'),options);


    var marker = new google.maps.Marker({
        position: coords,
        map: map,
      })
}

// using local storage to pass house data to single house page
document.getElementById("show-address").innerHTML = "<strong>House Address:</strong> " + localStorage.getItem("house-address");
document.getElementById("show-price").innerHTML = "<strong>House Price:</strong> " + localStorage.getItem("house-price");
document.getElementById("house-photo").setAttribute("src", localStorage.getItem("house-picture"));
document.getElementById("show-list-date").innerHTML = "<strong>Listing Date:</strong>" + dayjs(localStorage.getItem("house-list-date"), 'YYYY-MM-DD').format('MMM D, YYYY');
document.getElementById("show-prop-type").innerHTML = "<strong>Property Type:</strong>" + localStorage.getItem("house-prop-type");
document.getElementById("show-beds").innerHTML = "<strong># of Bedrooms:</strong>" + localStorage.getItem("house-beds");
document.getElementById("show-baths").innerHTML = "<strong># of Bathrooms:<strong>" + localStorage.getItem("house-baths");
document.getElementById("show-sqft").innerHTML = "<strong>Square Footage:</strong>" + localStorage.getItem("house-sqft");
document.getElementById("show-office-name").innerHTML = "<strong>Office Name:</strong>" + localStorage.getItem("house-office-name");
document.getElementById("show-url").innerHTML = "<strong>URL:</strong>" + localStorage.getItem("house-url");

// var houseCoords = JSON.parse(localStorage.getItem('houseCoords'))
// console.log(houseCoords[0][0]);