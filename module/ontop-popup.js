/**
 * This is about <code>ontop-popup.js</code>.
 * @author Vu Duy Tu
 * @email duytucntt@gmail.com
 * @date 11:53:11 PM-May 3, 2012
 * @deprecated use <code>jQuery.js</code>
 * @requires <code>search-source.js</code>
 */
var clazzMainBody = "div.MainBody";
var clazzPopupLv1 = "div.PopupLv1";
var idPopup = "div#Popup";
var _runonce = false;

window.onscroll = function() {
  var docScrollTop = parseInt(jQuery(window).scrollTop());
  var mainBodyOffsetTop = parseInt(jQuery(clazzMainBody).offset().top);
  if (mainBodyOffsetTop < (docScrollTop + 10)) {
    jQuery(idPopup).width((jQuery(clazzPopupLv1).width()-1)).show();
  } else {
    jQuery(idPopup).hide();
  }
};