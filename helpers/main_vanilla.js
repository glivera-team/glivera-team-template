var $ = function(selector) {
	var result = document.querySelectorAll(selector);

	result.onClick = function(callback) {
		this.forEach(function(item) {
			item.addEventListener('click', function(event) {
				if (callback) {
					callback(event);
				}
			});
		});  	
	};
	
	result.removeClass = function(className) {
		this.forEach(function(item) {
			item.classList.remove(className);
		}); 
	};
	
	result.addClass = function(className) {
		this.forEach(function(item) {
			item.classList.add(className);
		});
	};
	
	return result;
};

var $body,
		windowHeight,
		windowWidth,
		degree = 0.0174532925,
		mediaPoint1 = 1024,
		mediaPoint2 = 768,
		mediaPoint3 = 480,
		mediaPoint4 = 320;

document.addEventListener("DOMContentLoaded", function() {
	$body = document.querySelector('body');
});

window.addEventListener('load', function() {
	updateSizes();
	loadFunc();
});

window.addEventListener('resize', function() {
	resizeFunc();
});

window.addEventListener('scroll', function() {
	scrollFunc();
});

function loadFunc() {

}

function resizeFunc() {
	updateSizes();
}

function scrollFunc() {
	// $scrollTop = window.pageYOffset || document.body.scrollTop;
}

function updateSizes() {
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;
}

//---------------------------------------------Polyfill for object-fit
if ('objectFit' in document.documentElement.style === false) {
	document.addEventListener('DOMContentLoaded', function () {
		Array.prototype.forEach.call(document.querySelectorAll('img[data-object-fit]'), function (image) {
			(image.runtimeStyle || image.style).background = 'url("' + image.src + '") no-repeat 50%/' + (image.currentStyle ? image.currentStyle['object-fit'] : image.getAttribute('data-object-fit'));

			image.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'' + image.width + '\' height=\'' + image.height + '\'%3E%3C/svg%3E';
		});
	});
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}