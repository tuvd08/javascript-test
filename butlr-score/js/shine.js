var speed = 15;
var timeout = 5;// by seconds


var j = jQuery.noConflict();
function shine() {
  j('.thumb_shine').css({
    backgroundPosition : '-99px 0px'
  }).animate({
    backgroundPosition : '150px 0px'
  }, (speed*100));
}

(function B() {
  shine();
  setTimeout(B, (timeout*1000));
})();