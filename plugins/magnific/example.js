// var buttons
var $popupOpen,
	$popupClose;

// init buttons
$popupOpen = $('popupOpen');
$popupClose = $('popupClose');

// init popup on link(don't forgot to add mfp-hide class to popup and 'href' attr to open link)
// callbacks if needed

$popupOpen.magnificPopup({
	type:'inline',
	midClick: true ,
	showCloseBtn:false,
	callbacks: {
		open: function() {

		},
		close:function() {

		}
	}
});

$popupClose.on('click', function () {
	$.magnificPopup.close();
});