// need ScrollToPlugin
var $mainNavLink = $('.main_nav_link'),
		$header = $('.header'),
		$window = $(window);

$mainNavLink.on('click', function() {
	var $this = $(this),
			href = $this.attr('href'),
			topY = $(href).offset().top;
			url = document.location.href;

	$mainNavLink.removeClass('active_mod');
	$(this).addClass('active_mod');

	// for mobile when the menu is hidden
	if ($body.hasClass('menu_open')) {
		$body.removeClass('menu_open');
		$menuTrigger.removeClass('active_mod');
	}

	TweenMax.to($window, 1, {
		scrollTo:{
			y: topY,
			offsetY: $header.height(),
			autoKill: false
		},
		ease:Power3.easeOut
	});

	return false;
});