var map;
var infowindow;

function pos() {
	if (navigator.geolocation) {
		var p = navigator.geolocation.getCurrentPosition(initMap);
	}
}

function initMap(p) {

	var here = {lat: p.coords.latitude, lng: p.coords.longitude};
	console.log(here);

	map = new google.maps.Map(document.getElementById('map'), {
		center: here,
		zoom: 13
	});

	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: here,
		radius: 500
	}, callback);
	console.log('done');
}

function callback(results, status) {
	console.log(results);
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < results.length; i++) {
			console.log(results[i]);
			createMarker(results[i]);
		}
	}
}

function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});

	google.maps.event.addListener(marker, 'click', function() {
		console.log(place.name);
	});
}
