var $dropdownContainer,
	$dropdownTrigger,
	mouseInDropdown = false;

$dropdownContainer = $('.dropdownContainer');
$dropdownTrigger = $('.dropdownTrigger');

$dropdownTrigger.on('click', function () {
	var container = $(this).closest($dropdownContainer);
	container.siblings($dropdownContainer).removeClass('opened_mod');
	container.toggleClass('opened_mod');
	return false;
});

$dropdownContainer.hover(function () {
	mouseInDropdown = true;
}, function () {
	mouseInDropdown = false;
});

$body.on('click', function () {
	if (!mouseInDropdown) {
		$dropdownContainer.removeClass('opened_mod');
	}
});