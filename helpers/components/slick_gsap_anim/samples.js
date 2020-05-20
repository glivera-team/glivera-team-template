// variables
var sliderEl,
		sliderArray = [],
		slider_w,
		checkAnim = false,
		sliderCounter;

$(document).ready(function ($) {
	sliderEl = $('.sliderEl');
	slider_w = $('.slider_w');
	sliderCounter = $('.slider_counter');
});

$(window).on('load', function () {
	initSlider();
});

function initSlider() {
	if (sliderEl.length) {

		sliderArray = [];

		// array of slide elements

		$('.slider_item', sliderEl).each(function () {
			let $this = $(this);

			let sub_object = {
				el: $this,
				decor: $('.decor_item', $this),
				el_wrap: $('.slider_item_in', $this),
				title: $('.slider_title', $this),
				descr: $('.slider_descr', $this),
				timeline: ''
			};

			sliderArray.push(sub_object);
		});

	}

	$.each(sliderArray, function (key, val) {

		// create a timeline for slider animation
		let tlAnimSlide = gsap.timeline({paused: true});

		// demo anim
		tlAnimSlide
			.addLabel('start')
			.fromTo(sliderArray[key].title, .5, {
				yPercent: 200,
				opacity: 0
			}, {
				opacity: 1,
				yPercent: 0,
				ease: "power2.out",
				stagger: .05
			}, 'start')
			.fromTo(sliderArray[key].descr, .4, {
				yPercent: 100,
				opacity: 0
			}, {
				yPercent: 0,
				opacity: 1,
				// stagger: .1,
				ease: "power3.out",
			}, '-=.4')
			.fromTo(sliderArray[key].decor, .5, {
				xPercent: -101
			}, {
				xPercent: 0,
				ease: "power2.out",
			}, '-=.4')
			.addLabel('start_end')
			.addLabel('out')
			.fromTo(sliderArray[key].title, .5, {
				yPercent: 0,
				opacity: 1,
			}, {
				yPercent: 100,
				opacity: 0,
				ease: "power2.in",
				immediateRender: false
			}, 'out')
			.fromTo(sliderArray[key].descr, .5, {
				yPercent: 0,
				opacity: 1
			}, {
				yPercent: 200,
				opacity: 0,
				ease: "power2.in",
				immediateRender: false
			}, '-=.4')
			.fromTo(sliderArray[key].decor, .5, {
				xPercent: 0
			}, {
				xPercent: 101,
				ease: "power2.out",
				immediateRender: false
			}, '+=.8')
			.addLabel('out_end')

		sliderArray[key].timeline = tlAnimSlide;

	});

	// function for slider counter
	var updateSliderCounter = function(slick, currentIndex) {
		currentSlide = slick.slickCurrentSlide() + 1;
		slidesCount = slick.slideCount;
		sliderCounter.text(currentSlide + '/' +slidesCount)
	};


	sliderEl.on('init', function (event, slick, currentSlide) {

		// add an inactive class (pointer-events: none) for the slider from the beginning to the end of the animation
		slider_w.toggleClass('animation_active_mod');

		// animation of the first slide
		$.each(sliderArray, function (key, val) {
			gsap.set(sliderArray[key].el, {
				xPercent: -100 * key
			})
		});

		sliderArray[0].timeline.tweenFromTo("start", "start_end", {
			delay: .5, onComplete: function () {
				slider_w.toggleClass('animation_active_mod')
			}
		});

		sliderArray[0].timeline.tweenFromTo("start", "start_end", {delay: .5});

		// add counter
		updateSliderCounter(slick);

	});

	// add slider
	sliderEl.slick({
		prevArrow: $('.prevSlide'),
		nextArrow: $('.nextSlide'),
		speed: 0,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		draggable: true,
		arrows: true,
		autoplay: false,
		accessibility: false,
		autoplaySpeed: 2000,
		fade: true
	});


	// slide change animation
	sliderEl.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		console.log(event, slick, checkAnim);
		if (!currentSlide !== nextSlide) {
			slider_w.toggleClass('animation_active_mod')
			let currentSlideTl = sliderArray[currentSlide].timeline;

			currentSlideTl.tweenFromTo("out", "out_end");

			// animation delay
			let delayTime = 1;

			console.log(delayTime);

			gsap.delayedCall(delayTime, function () {
				sliderArray[nextSlide].timeline.tweenFromTo("start", "start_end", {
					onComplete: function () {
						slider_w.toggleClass('animation_active_mod')
					}
				});
			});

		} else {
			return false;
		}
	});

	// update counter
	sliderEl.on('afterChange', function (event, slick, currentSlide) {
		updateSliderCounter(slick, currentSlide);
	});

}