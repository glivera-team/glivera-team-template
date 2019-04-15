function loadFunc() {
  if (isMobile.apple.phone || isMobile.android.phone || isMobile.seven_inch) {
    var vh = window.innerHeight * 0.01;
    // var vh2 = document.documentElement.clientHeight * 0.01;
  
    document.documentElement.style.setProperty('--vh', vh + 'px');
  }
}

function resizeFunc() {
  var vh = window.innerHeight * 0.01;
  // var vh2 = document.documentElement.clientHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
}