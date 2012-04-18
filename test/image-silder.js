/**
 * This is about <code>image-slider.js</code>.
 * 
 * @author Vu Duy Tu
 * @email duytucntt@gmail.com
 * @date 11:58:49 PM-Apr 17, 2012
 * @deprecated use <code>jquery-1.4.4.js</code>
 */

var SLIDER = {
    imgs: [],
    init: function () {
      SLIDER.displayImg();
    },
    displayImg: function() {
      var container = $('#set-view .view');
      alert(container);
    },
    showSlider: function() {
      
    }    
};

$(document).ready(SLIDER.init());