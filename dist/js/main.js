$(function() {
	pageWidget(['index','town']);
});
function pageWidget(pages) {
	var widgetWrap = $('<div class="widget_wrap"><ul class="widget_list"></ul></div>');
	widgetWrap.prependTo("body");
	for (var i = 0; i < pages.length; i++) {
		$('<li class="widget_item"><a href="' + pages[i] + '.html' + '">' + pages[i] + '</a></li>').prependTo('.widget_list');
	}
}