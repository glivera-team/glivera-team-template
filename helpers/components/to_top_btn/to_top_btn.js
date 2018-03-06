// need ScrollToPlugin
var $toTopBtn = $('.toTopBtn'),
		$window = $(window);

$toTopBtn.click(function(e) {
	TweenLite.to($window, 1, {scrollTo:{y:0, x:0, autoKill: false}, ease:Power2.easeInOut});
});

// if you want the button to appear after scrolling
function scrollFunc() {
	toggleToTopBtn();
}

function loadFunc() {
	toggleToTopBtn();
}

function toggleToTopBtn() {
	if ($window.scrollTop() > 0) {
		$toTopBtn.removeClass('hidden');
	} else {
		$toTopBtn.addClass('hidden');
	}
}