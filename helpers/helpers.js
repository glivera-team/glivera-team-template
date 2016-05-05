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

// function adding active class to header, when user scroll page
// notice you should define $header_row
function addHeaderClass() {
	if ($(window).scrollTop() > 0) {
		$headerRow.addClass('scroll_mod');
	} else {
		$headerRow.removeClass('scroll_mod');
	}
}

// moving functions
function moveToBlock(block, control) {
	var $block = $(block),
		$control = $(control);
	$control.on('click', function () {
		var blockPosition = $block.offset();
		$('body,html').animate({
			scrollTop: blockPosition.top
		}, 500);
		return false;
	})
}

function docScrollTo(pos, speed, callback) {
	$('html,body').animate({'scrollTop': pos}, speed);
	if (typeof(callback) == 'function') {
		callback();
	}
}

//get random integer
function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
}

//*******************************************useful functions###

//*******************************************sliders stuff
// bx slider with fixed amount of elements
// You should paste this to window.load function, and then reloadSlider in window.resize function
if (slider.length) {
	if (windowWidth >= mediaPoint1) {
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
	else if (windowWidth <= mediaPoint1 && windowWidth >= mediaPoint2) {
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

// add active class to current slider
// when window resize reload slider and add class again
if ($slider.length) {
	$slider.bxSlider({
		pager: false,
		controls: false,
		infiniteLoop: false,
		mode: 'fade',
		speed: 1,
		startSlide:0,
		onSlideAfter: function ($slideElement, oldIndex, newIndex) {
			$slideElement.addClass('active_mod').siblings().removeClass('active_mod');
		}
	});
}
$(window).on('resize',function() {
	if ($slider.length) {
		$slider.reloadSlider();
		$($slider.find('.your_slider_item')[$slider.getCurrentSlide()]).addClass('active_mod');
	}
});
//*******************************************sliders stuff###

