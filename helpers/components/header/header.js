var $menuTrigger;

$menuTrigger = $('#menu_trigger');

$menuTrigger.on('click', function () {
	if ($body.hasClass('menu_open')) {
		$body.removeClass('menu_open');
		$(this).removeClass('active_mod');
	} else {
		$body.addClass('menu_open');
		$(this).addClass('active_mod');
	}
});