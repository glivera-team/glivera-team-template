var $allAnimateElements = [];

// grabbing all anim elements
function loadFunc() {

	$(".animatable").each(function(i, el) {
		var el = $(this);
		var $position = el.offset().top;
		var obj = {
			'el':el,
			'position': $position,
			'shown':false
		}

		$allAnimateElements.push(obj);

	});

}

function scrollFunc() {

	var $scrollTop = $(window).scrollTop();

	$.each( $allAnimateElements, function( key, val ) {
		if (!val.shown && $scrollTop + windowHeight*1 > val.position ) {
			val.shown = true;
			// If you want the elements to appear one at a time
			if(val.el.hasClass('someclass')) {
				TweenMax.staggerTo($('.animElement',val.el), 1, {className: '+=animated', delay: .1}, .1)
			} else {
				TweenMax.set(val.el, {className: '+=animated'})
			}

		}
	});

}