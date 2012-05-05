/**
 * Search Engine Keyword Highlight (http://fucoder.com/code/se-hilite/)
 *
 * This module can be imported by any HTML page, and it would analyse the
 * referrer for search engine keywords, and then highlight those keywords on
 * the page, by wrapping them around <span class="hilite">...</span> tags.
 * Document can then define styles else where to provide visual feedbacks.
 *
 * Usage:
 *
 *   In HTML. Add the following line towards the end of the document.
 *
 *     <script type="text/javascript" src="search-core.js"></script>
 *
 *   In CSS, define the following style:
 *
 *     .hilite { background-color: #ff0; }
 *
 *   If Hilite.style_name_suffix is true, then define the follow styles:
 *
 *     .hilite1 { background-color: #ff0; }
 *     .hilite2 { background-color: #f0f; }
 *     .hilite3 { background-color: #0ff; }
 *     .hilite4 ...
 *
 * @author Scott Yang <http://scott.yang.id.au/>
 * @version 1.5
 */
/**
* Author: Shishir "sisir48@yahoo.com"
* Modified Date: April 14, 2009
* Modified functions to display list of dynamic keyword from the referer such as google, yahoo, aol etc.
* Modified some Hilite.search_engines parameters to tarce the correct referal URL of a search engine.
* Highlighting feature removed.
* Fixed the endless loop in some special cases (This issue hanged the browser and had to kill the process).
* Works well with IE, Firefox, Safari, Opera, Chrome.
**/
//var wow;
// Configuration:
Hilite = {
    /**
     * Element ID to be highlighted. If set, then only content inside this DOM
     * element will be highlighted, otherwise everything inside document.body
     * will be searched.
     */
    elementid: 'content',
    
    /**
     * Whether we are matching an exact word. For example, searching for
     * "highlight" will only match "highlight" but not "highlighting" if exact
     * is set to true.
     */
    exact: true,

    /**
     * Maximum number of DOM nodes to test, before handing the control back to
     * the GUI thread. This prevents locking up the UI when parsing and
     * replacing inside a large document.
     */
    max_nodes: 1000,

    /**
     * Whether to automatically hilite a section of the HTML document, by
     * binding the "Hilite.hilite()" to window.onload() event. If this
     * attribute is set to false, you can still manually trigger the hilite by
     * calling Hilite.hilite() in Javascript after document has been fully
     * loaded.
     */
    onload: false,

    /**
     * Name of the style to be used. Default to 'hilite'.
     */
    style_name: 'hilite',
    
    /**
     * Whether to use different style names for different search keywords by
     * appending a number starting from 1, i.e. hilite1, hilite2, etc.
     */
    style_name_suffix: true,

    /**
     * Set it to override the document.referrer string. Used for debugging
     * only.
     */
    debug_referrer: ''
};

Hilite.search_engines = [    
	['bing\\.', 'q'], 					            // Bing
	['google\\.', 'q'],                             // Google
    ['search\\.yahoo\\.', 'p'],                     // Yahoo
    ['search\\.msn\\.', 'q'],                       // MSN    
	['search\\.live\\.', 'q'],                  	// MSN Live    
	['search\\.aol\\.', 'query'],               	// AOL
    ['ask\\.com', 'q'],                             // Ask.com
    ['altavista\\.', 'q'],                          // AltaVista
    ['feedster\\.', 'q'],                           // Feedster
    ['search\\.lycos\\.', 'query'],                 // Lycos	
    ['alltheweb\\.', 'q'],                          // AllTheWeb
    ['technorati\\.com/search/([^\\?/]+)', 1],      // Technorati
    ['dogpile\\.com/info\\.dogpl/search/web/([^\\?/]+)', 1, true] // DogPile
];

/**
 * Decode the referrer string and return a list of search keywords.
 */
Hilite.decodeReferrer = function(referrer) {
    var query = null;
	
    for (var i = 0; i < Hilite.search_engines.length; i ++) {
        var se = Hilite.search_engines[i];
		var regex = new RegExp('^http://(www\\.)?' + se[0], 'i');		
        var match = referrer.match(regex);		
        if (match) {
            var result;
            if (isNaN(se[1])) {
                result = Hilite.decodeReferrerQS(referrer, se[1]);
            } else {
                result = match[se[1] + 1];
            }
            if (result) {                
				result = decodeURIComponent(result);
                // XXX: DogPile's URI requires decoding twice.                
				if (se.length > 2 && se[2])
                	result = decodeURIComponent(result);
                result = result.replace(/\'|"/g, '');
                //result = result.split(/[\s,\+\.]+/);
          		result = result.replace(/\+/g, ' ');
				
				return result;				
            }
            break;
        }
    }
    return null;
};

Hilite.decodeReferrerQS = function(referrer, match) {
    var idx = referrer.indexOf('?');
    var idx2;
	var count = 0;
    if (idx >= 0) {
        var qs = new String(referrer.substring(idx + 1));        
		idx  = 0;
        idx2 = 0;		
		
		//shishir "sisir48@yahoo.com". Check the 'match' against querystring (qs).		
		var qs_arr = qs.split("=");		
		var qs_arr_count = qs_arr.length-1;		
		if(qs.indexOf(match, idx)>=0) {		
			while ((idx >= 0) && ((idx2 = qs.indexOf('=', idx)) >= 0)) {
				var key, val;
				count++;
				key = qs.substring(idx, idx2);
				idx = qs.indexOf('&', idx2) + 1;				
				if (key == match) {
					if (idx <= 0) {                    
						return qs.substring(idx2+1);
					} else {       					
						return qs.substring(idx2+1, idx - 1);
					}
				}
				
				if(count>qs_arr_count) {
					return null;
				}
			}
		}
    }
    return null;
};

/**
* Author: Shishir "sisir48@yahoo.com"
* Modified Date: April 14, 2009
* Modified this function to display list of dynamic keyword from the referer such as google, yahoo, aol etc.
* Highlighting feature removed.
**/
Hilite.hilite = function() {    
    var q = Hilite.debug_referrer ? Hilite.debug_referrer : document.referrer;
	var e = null;
    q = Hilite.decodeReferrer(q);	
	if(q)
    	return q;
    else 
    	return "";
};