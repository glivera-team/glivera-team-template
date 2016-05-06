var $toTopBtn;
$toTopBtn = $('.toTopBtn');
// animated movement to block
move_to_block($body, $toTopBtn);

function scrollFunc() {
	toggleToTopBtn();
}

function loadFunc() {
	toggleToTopBtn();
}

function move_to_block(block, control) {
	var $block = $(block),
		$control = $(control);
	$control.on('click', function () {
		var $block_pos = $block.offset();
		$('body,html').animate({
			scrollTop: $block_pos.top - 118
		}, 500);
		return false;
	})
}

function toggleToTopBtn() {
	if ($(window).scrollTop() > 0) {
		$toTopBtn.removeClass('hidden');
	} else {
		$toTopBtn.addClass('hidden');
	}
}