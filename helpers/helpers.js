//*******************************************useful functions
// function to split some text into spans
function splitSpan(target) {
	target.each(function () {
		var text = $.trim($(this).text()),
			word = text.split(' '),
			str = "";
		$.each(word, function (key, value) {
			if (key != 0) {
				str += " ";
			}
			str += "<span>" + value + "</span>";
		});
		$(this).html(str);
	});
}

//*******************************************useful functions###

//*******************************************sliders stuff
// bx slider with fixed amount of elements
// You should paste this to window.load function, and then reloadSlider in window.resize function
if (slider.length) {
	if (window_width >= media_point_1) {
		slider.bxSlider({
			pager: false,
			minSlides: 3,
			maxSlides: 3,
			moveSlides: 1,
			slideWidth: 5000,// if slideWidth too large slider becomes responsive
			nextSelector: '#last_slider_next',
			prevSelector: '#last_slider_prev',
			nextText: 'next',
			prevText: 'prev'
		});
	}
	else if (window_width <= media_point_1 && window_width >= media_point_2) {
		slider.bxSlider({
			pager: false,
			minSlides: 2,
			maxSlides: 2,
			moveSlides: 1,
			slideWidth: 5000,// if slideWidth too large slider becomes responsive
			nextSelector: '#last_slider_next',
			prevSelector: '#last_slider_prev',
			nextText: 'next',
			prevText: 'prev'
		});
	} else {
		slider.bxSlider({
			pager: false,
			minSlides: 1,
			maxSlides: 1,
			moveSlides: 1,
			slideWidth: 5000,// if slideWidth too large slider becomes responsive
			nextSelector: '#last_slider_next',
			prevSelector: '#last_slider_prev',
			nextText: 'next',
			prevText: 'prev'
		});
	}
}

//*******************************************sliders stuff###

