/**
 * This is about <code>common-test-jquery.js</code>.
 * 
 * @author Vu Duy Tu
 * @email duytucntt@gmail.com
 * @date 11:58:49 PM-Apr 11, 2012
 * @deprecated use <code>jquery-1.4.4.js</code>
 */

var TestQuery = {
  hasqr : function() {
    if (typeof window.jQuery === 'function') {
      return true;
    } else {
      return false;
    }
  },
  require : function(url, isFirst) {
    var isAdd = true;
    var isqr = this.hasqr();
    if (isqr) {
      var scrs = $('script[src^=' + url + ']');
      isAdd = (typeof scrs === 'undefined' || scrs.length <= 0);
    } else {
      var scripts = document.getElementsByTagName('script');
      for ( var i = 0; i < scripts.length; i++) {
        if (String(scripts[i].src).indexOf(url) >= 0) {
          isAdd = false;
        }
      }
    }
    
    if (isAdd) {
      var scrElm = document.createElement('script');
      scrElm.type = 'text/javascript';
      scrElm.src = url;
      var head = document.head;
      if (isFirst) {
        head.insertBefore(scrElm, head.firstChild);
      } else {
        head.appendChild(scrElm);
      }
    }
  },
  requireFirst : function(url) {
    this.require(url, true);
  },
  requireJQuery : function(vs) {
    this.requireFirst("http://code.jquery.com/jquery-" + vs + ".min.js");
  },
  common : function() {
    if (!(this.hasqr())) {
      this.requireJQuery("1.7.2");
    }
    // test find/get/set
    
  }

};