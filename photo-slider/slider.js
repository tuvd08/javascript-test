
function formatTitleLipo(title, currentArray, currentIndex, currentOpts) {
    return '<div id="slideshow_title"><span class="showtitle">Liposuction Before and After Photos</span><br />' + (title && title.length ? '<b>' + title + '</b><br />' : '' ) + '<span class="showcount">Image ' + (currentIndex + 1) + ' of ' + currentArray.length + '</span></div>';
}
function formatTitleBBL(title, currentArray, currentIndex, currentOpts) {
    return '<div id="slideshow_title"><span class="showtitle">Brazilian Butt Lift Before and After Photos</span><br />' + (title && title.length ? '<b>' + title + '</b><br />' : '' ) + '<span class="showcount">Image ' + (currentIndex + 1) + ' of ' + currentArray.length + '</span></div>';
}


var theoffset = 0;

  jQuery(document).ready(function() {
/*
jQuery('video,audio').mediaelementplayer();
jQuery(".lipobox").fancybox({
                  'transitionIn' : 'elastic',
                  'transitionOut' : 'fade',
                  'speedIn' : 800, 
                  'speedOut' : 600, 
                  'width' : 640, 
                  'height' : 480, 
                  'centerOnScroll' : true, 
                  'titleShow' : true, 
                  'overlayShow'	: true,
                  'overlayOpacity' : 0.7,
                  'overlayColor' : '#000',
                  'titleFormat' : formatTitleLipo,
                  'hideOnOverlayClick': true
          });
jQuery(".bblbox").fancybox({
                  'transitionIn' : 'elastic',
                  'transitionOut' : 'fade',
                  'speedIn' : 800, 
                  'speedOut' : 600, 
                  'width' : 640, 
                  'height' : 480, 
                  'centerOnScroll' : true, 
                  'titleShow' : true, 
                  'overlayShow'	: true,
                  'overlayOpacity' : 0.7,
                  'overlayColor' : '#000',
                  'titleFormat' : formatTitleBBL,
                  'hideOnOverlayClick': true
          });
*/

    jQuery('#slider').cycle();
	jQuery('#b_and_a_gallery').cycle({
	  timeout:  15000,
	  next:  '#next', 
	  prev:  '#prev'
});
	jQuery('#mainslider').cycle({
	  timeout:  7000,
	  next:  '#nexts', 
	  prev:  '#prevs'
	  });
	jQuery('.testimonials').cycle({
	  timeout:  7000
	  });
	jQuery('#slideshow').cycle();


/* social bar */
   var $sidebar = jQuery(".sharepost"),
$window = jQuery(window),
offset = $sidebar.offset();
if ($window.width() < 1096) {
jQuery("#wrap").addClass("narrow");
}
jQuery(window).resize(function() {
if ($window.width() < 1096) {
jQuery("#wrap").addClass("narrow");
} else {
jQuery("#wrap").removeClass("narrow");
}
});
$window.scroll(function () {
if ($window.scrollTop() > offset.top) {
jQuery(".sharepost").addClass("fixed");
} else {
jQuery(".sharepost").removeClass("fixed");
}
});


  });
