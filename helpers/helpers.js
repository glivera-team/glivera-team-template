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

// you should define $scrollTop = 0, then add this to scrollFunc
$scrollTop = $(window).scrollTop();

headerScroll();

// notice you should define $header
function headerScroll() {
	if ($scrollTop > 10 && !$header.hasClass('scroll_mod')) {
		$header.addClass('scroll_mod');
	} else if ($scrollTop < 10) {
		$header.removeClass('scroll_mod');
	}
}

// function adding active class to header, when user scroll page ###

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



