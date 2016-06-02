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

// get random integer
function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
}

// change src of main image by click on sub img
function changeSrc(config) {
	$(config.thumb).on('click', function () {
		var $thumb = $(this),
			$container = $thumb.closest(config.container),
			$img = $container.find(config.img),
			src = $thumb.attr('data-thumblink');
		$img.attr('src', src);
		return false;
	});
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


//*******************************************animation method
// create empty array and variable for animation blocks/sections
var animationArray = [],
	$animationSection;


// on document ready init your animation blocks/sections
$animationSection = $('.animationSection');


// define function for creating animation array 
function createAnimationArray() {
	$animationSection.each(function (index, element) {
		var section = new AnimationSection($(this));
		animationArray.push(section);
	});
}

function AnimationSection(section) {
	this.section = section;
	this.animName = section.attr('data-anim-name');
	this.offsetTop = section.offset().top;
	this.animationState = false;

	// update values
	this.update = function () {
		this.offsetTop = section.offset().top;
	};
}


// define function to play animation
function playAnimation(position, version) {
	if (animationArray.length) {
		animationArray.forEach(function (item) {
			if (position > (item.offsetTop - (windowHeight / 2.5) * version) && item.animationState == false) {
				item.animationState = true;

				if (item.animName == "some_name") {
					// some stuff to action
				}
			}
		});
	}
}

// on window.load invoke function to create animation array and trigger scroll
createAnimationArray();
$(window).trigger('scroll');

// on window.resize update your sizes and animation array
updateSizes();
animationArray.forEach(function (item) {
	item.update();
});

// when pages is scrolling update sizes and play animation
updateSizes();
playAnimation($(window).scrollTop(), 1);

// function to update sizes
function updateSizes() {
	windowWidth = $(window).width();
	windowHeight = $(window).height();
}
//*******************************************animation method###

//*******************************************



