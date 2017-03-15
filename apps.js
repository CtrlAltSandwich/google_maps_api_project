//AIzaSyAj1RljIOaRskQUDGPp8nCj83zJaqORJtQ
var map;
var canvas = document.getElementById("map-canvas");
var panorama;
var dots = 1;
function street() {
    var long = Math.random() * -58 - 66;
    var lati = Math.random() *25 + 24;
    var random ={
        lat: lati,
        lng: long
    };
        panorama = new google.maps.StreetViewPanorama(
            document.getElementById('map-canvas'),
            {
              position: {lat: lati, lng: long},
              pov: {heading: 165, pitch: 0},
              zoom: 1
            });
      }
function initMap(){
    var mapOptions = {
        center: new google.maps.LatLng(-34,397,150.644),
        zoom:5
    }
    map = new google.maps.Map(canvas, mapOptions);
    var input = document.getElementById("user-input");
    
   /* var autocomplete = new google.maps.places.Autocomplete(input, { 
        placeIdOnly: true
    });
    autocomplete.bindTo('bounds', map);
    var geocoder = new google.maps.Geocoder;
    var marker = new google.maps.Marker({
        map: map
    });
    
    autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();

          if (!place.place_id) {
            return;
          }
          geocoder.geocode({'placeId': place.place_id}, function(results, status) {

            if (status !== 'OK') {
              window.alert('Geocoder failed due to: ' + status);
              return;
            }
            map.setZoom(11);
            map.setCenter(results[0].geometry.location);
            // Set the position of the marker using the place ID and location.
            marker.setPlace({
              placeId: place.place_id,
              location: results[0].geometry.location
            });
            marker.setVisible(true);
              
          });
     });*/
    
    document.getElementById("guess").addEventListener("click", function (){
        //street();
        randomLocation();
        //$("#map-canvas").hide();
        //$("#pan").show();
    });
}; 




function randomLocation(){
    var long = Math.random() * -58 - 66;
    var lati = Math.random() *25 + 24;
    var random ={
        lat: lati,
        lng: long
    };
      var sv = new google.maps.StreetViewService();
console.log(sv);
        //panorama = new google.maps.StreetViewPanorama(document.getElementById('pan'));
panorama = new google.maps.StreetViewPanorama(
            document.getElementById('left'),
            {
              position: {lat: lati, lng: long},
              pov: {heading: 165, pitch: 0},
                addressControl: false,
              zoom: 1
            });
      

        // Set the initial Street View camera to the center of the map
        sv.getPanorama({location: random, radius: 50}, processSVData);

      // Set up the map.
        map = new google.maps.Map(document.getElementById('right'), {
          center: random,
          zoom: 1,
          streetViewControl: false
        });
    
        // Look for a nearby Street View panorama when the map is clicked.
        // getPanoramaByLocation will return the nearest pano when the
        // given radius is 50 meters or less.
        map.addListener('click', function(event) {
          sv.getPanorama({location: event.latLng, radius: 50}, processSVData);
        });
}

function processSVData(data, status) {
          console.log(data);
          console.log(status);
        if (status === 'OK') {
             $("#map-canvas").show();
          var marker = new google.maps.Marker({
            position: data.location.latLng,
            map: map,
            title: data.location.description
          });

          panorama.setPano(data.location.pano);
          panorama.setPov({
            heading: 270,
            pitch: 0
          });
          panorama.setVisible(true);

         /* marker.addListener('click', function() {
            var markerPanoID = data.location.pano;
            // Set the Pano to use the passed panoID.
            panorama.setPano(markerPanoID);
            panorama.setPov({
              heading: 270,
              pitch: 0
            });
            panorama.setVisible(true); 
          });*/
        $("#map-canvas").hide();
             $("#loading").hide();
            $("#guessLocation").show();            
        } else {
          console.error('Street View data not found for this location.');
            $("#map-canvas").hide();
            $("#guessLocation").hide();
            $("#loading").show();
            randomLocation();
        }
}

    function loading(){
        if(dots == 1){
            $("h3").text("Loading.");
            dots = 2; 
        }else if(dots == 2){
            $("h3").text("Loading..");
            dots = 3;
        }else {
            $("h3").text("Loading...");
             dots = 1;
         }
    }
    
    setInterval(function(){
        loading();
    }, 1500);



$(document).ready(function(){
    $("#loading").hide();
$("#guessLocation").hide();

    
});