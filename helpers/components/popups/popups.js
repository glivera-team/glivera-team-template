	//-------------------------------------------------popup

	let myPopupBtn = $('.myPopupBtn');
	let myPopup = $('.myPopup');
	let popupEl = $('.popup');

	function openPopup(btn, popup) {
		btn.on('click', function (e) {
			e.preventDefault();

			$body.addClass('popup_open');
			popup.addClass('active_mod');
		});
	}

	popupEl.each(function () {
		let $this = $(this);
		let popupContent = $this.find('.popup_in');
		let closeButton = $this.find('.popupClose');

		closeButton.on('click', function () {
			$body.removeClass('popup_open');
			$this.removeClass('active_mod');
		});

		$(document).mouseup(function (e) {
			if (
				!popupContent.is(e.target) &&
				popupContent.has(e.target).length === 0
			) {
				$this.removeClass('active_mod');
				$body.removeClass('popup_open');
			}
		});
	});

	openPopup(myPopupBtn, myPopup);

	//-------------------------------------------------popup###