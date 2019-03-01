var $video;

$(document).ready(function ($) {
  $video = $('.video');
});

function insertVideo() {
  var url = $video.data('srcvideo');

  $video.append('<source src="' + url + '" type="video/mp4" />');
}

$(window).on('load', function () {
  if ($video) {
    insertVideo();
  }
});