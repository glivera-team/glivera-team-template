$(function() {
	pageWidget(['index']);
});
function getAllClasses(context,output) {
	var allElements = $(context).find($('*')),//get all elements of our page
		mainArray = [];//create empty array
	//If element has class push this class to mainArray
	for(var i = 0;i<allElements.length;i++) {
		var someElement = allElements[i],
			elementClass = someElement.className;
		if (elementClass.length>0) {//if element have not empty class
			//If element have multiple classes - separate them
			var elementClassArray = elementClass.split(' '),
				classesAmount = elementClassArray.length;
			// I know that it is very bad, but if I use cycles it kill by browser, I have no idea why
			if (classesAmount === 1) {
				mainArray.push(elementClassArray[0]);
			} else {
				for(var j = 0;j<classesAmount;j++) {
					mainArray.push(elementClassArray[j]);
				}
			}
		}
	}

	//creating finalArray, that don't have repeating elements
	var finalArray = unique(mainArray);
	for (var i = 0;i<finalArray.length;i++) {
		$('<div>.'+finalArray[i]+' { }</div>').appendTo(output);
	}
	//function that delete repeating elements from arrays, for more information visit http://mathhelpplanet.com/static.php?p=javascript-algoritmy-obrabotki-massivov
	function unique(A) {
		var n = A.length, k = 0, B = [];
		for (var i = 0; i < n; i++)
		{ var j = 0;
			while (j < k && B[j] !== A[i]) j++;
			if (j == k) B[k++] = A[i];
		}
		return B;
	}
}

function pageWidget(pages) {
	var widgetWrap = $('<div class="widget_wrap"><ul class="widget_list"></ul></div>');
	widgetWrap.prependTo("body");
	for (var i = 0; i < pages.length; i++) {
		$('<li class="widget_item"><a class="widget_link" href="' + pages[i] + '.html' + '">' + pages[i] + '</a></li>').appendTo('.widget_list');
	}
	var widgetStilization = $('<style>body {position:relative} .widget_wrap{position:absolute;top:0;left:0;padding:10px 20px;background:#222;border-bottom-right-radius:10px;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:translate(-100%,0);-ms-transform:translate(-100%,0);transform:translate(-100%,0)}.widget_wrap:after{content:" ";position:absolute;top:0;left:100%;width:24px;height:24px;background:#222 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRF////////AAAA////BQBkwgAAAAN0Uk5TxMMAjAd+zwAAACNJREFUCNdjqP///y/DfyBg+LVq1Xoo8W8/CkFYAmwA0Kg/AFcANT5fe7l4AAAAAElFTkSuQmCC) no-repeat 50% 50%;cursor:pointer}.widget_wrap:hover{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}.widget_item{padding:0 0 10px}.widget_link{color:#fff;text-decoration:none;font-size:15px;}.widget_link:hover{text-decoration:underline} </style>');
	widgetStilization.prependTo(".widget_wrap");
}