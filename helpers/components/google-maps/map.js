var $map,
	mapMarker;

$(document).ready(function ($) {
	$map = $('#map');
});

$(window).on('load',function() {
	if ($map.length) {
		initMap();
	}
});

$(window).on('resize',function() {
	if ($map.length) {
		initMap();
	}
});

function initMap() {
	var mapDiv = document.getElementById('map');
	var map = new google.maps.Map(mapDiv, {
		center: {lat: 44.540, lng: -78.546},
		zoom: 8,
		scrollwheel: false,
		disableDefaultUI: true
	});
	mapMarker =  new MarkerWithLabel({
		position: new google.maps.LatLng(44.540, -78.546),
		draggable: false,
		map: map,
		icon: 'i/icons/empty.svg', //empty icon because impossible to delete icon in google maps
		labelContent: "Текст",
		labelAnchor: new google.maps.Point(20,20), // margin-left and margin-top values
		labelClass: "map_marker" // the CSS class for the label
	});
}