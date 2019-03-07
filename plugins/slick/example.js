// Initialization
$('.container').slick({
	prevArrow: $('.js_slider_prev'),
	nextArrow: $('.js_slider_next'),
	infinite: true,
	slidesToShow: 3,
	slidesToScroll: 1,
	dots: false,
	arrows: false,
	autoplay: true,
	autoplaySpeed: 2000
});

// if need resize(example)
var $slider = $('.container');

// add to updateSize function
if (windowWidth < mediaPoint1) {
	if (!$slider.hasClass('slick-slider')) {
		initSliderFunc();
	}
} else {
	if ($slider.hasClass('slick-initialized')) {
		$slider.slick("unslick");
	}
}

function initSliderFunc() {
	$slider.slick({
		prevArrow: $('.js_slider_prev'),
		nextArrow: $('.js_slider_next'),
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 2000
	});
}