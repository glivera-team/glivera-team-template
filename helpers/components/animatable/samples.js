var $allAnimateElements = [],
	pastHero_$scrollTop = false,
	$scrollTop = 0,
	xCoord = 0,
	yCoord = 0;

function initAnim() {

	$(".animatable").each(function (i, el) {
		var el = $(this);
		var $position = el.offset().top;

		var obj = {
			'el': el,
			'position': $position,
			'shown': false,
			'height': el.hasClass("parallaxElement") ? windowHeight : el.outerHeight(),
			'startPoint': (el.data("start-point") === undefined) ? .8 : el.data("start-point"),
			'shiftFactor': (el.data("shift-factor") === undefined) ? .1 : el.data("shift-factor"),
			'animIndex': (el.data("anim-index") === undefined) ? undefined : el.data("anim-index"),
			'startOnView': (el.data("start-onview") === undefined) ? 2 : parseFloat(el.data("start-onview")),
			'animVariety': (el.data("anim-variety") === undefined) ? 'default' : el.data("anim-variety"),
			'progress': (el.data("progress-anim") === undefined) ? false : el.data("progress-anim"),
			'tl': false
		};

		obj.tl = animVarietyFunc(obj);

		$allAnimateElements.push(obj);

	});

	function animFunc() {

		if (pastHero_$scrollTop !== $scrollTop) {

			$.each($allAnimateElements, function (key, val) {

				if (val.progress) {
					if (windowWidth > 1023) {

						if  (val.tl) {
							var $progress = 0;
							// var shift = 0;
							var $position;

							$position = val.position - val.height * val.startOnView;

							if ($scrollTop > $position) {
								$progress = ($scrollTop - $position) / val.height;
							}

							if ($progress <= 2) {
								if ($scrollTop === 0) {
									val.tl.progress(0);
									$progress = 0;
								}
								else {
									val.tl.progress($progress);
								}
							}
							else if ($progress > 1) {
								val.tl.progress(1);
								$progress = 1;
							}

						}

					} else if (val.tl) {
						val.tl.progress(0);
					}

				} else {
					if (!val.shown && $scrollTop + windowHeight * val.startPoint > val.position) {
						val.shown = true;

						if (val.el.hasClass('some_class')) {
						} else {
							TweenMax.set(val.el, {className: '+=animated'})
						}
					}
				}
			});
			pastHero_$scrollTop = $scrollTop;
		}
	}

	animFunc();

	TweenLite.ticker.addEventListener("tick", animFunc);

	function animVarietyFunc(obj) {
		var tl,
			yCoord = obj.height * obj.shiftFactor;

		if (obj.animVariety === 'parallax') {
			tl = TweenMax.fromTo(obj.el, 1, {
					y: 0
				},
				{
					y: -yCoord,
					ease: Sine.easeOut,
					paused: true,
				})
		}
		return tl;
	}
}

// add to load function
initAnim();

// add to scroll function
$scrollTop = $(window).scrollTop();

// add to resize function
if ($allAnimateElements) {
	$.each($allAnimateElements, function (key, value) {
		value.position = value.el.offset().top;
		value.height = value.el.hasClass("parallaxElement") ? windowHeight : value.el.outerHeight();
	});
}