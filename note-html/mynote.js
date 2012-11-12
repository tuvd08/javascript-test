

(function(document, window) {

  var UTF8 = {
    encode: function(s){
      for(var c, i = -1, l = (s = s.split("")).length, o = String.fromCharCode; ++i < l;
        s[i] = (c = s[i].charCodeAt(0)) >= 127 ? o(0xc0 | (c >>> 6)) + o(0x80 | (c & 0x3f)) : s[i]
      );
      return s.join("");
    },
    decode: function(s){
      for(var a, b, i = -1, l = (s = s.split("")).length, o = String.fromCharCode, c = "charCodeAt"; ++i < l;
        ((a = s[i][c](0)) & 0x80) &&
        (s[i] = (a & 0xfc) == 0xc0 && ((b = s[i + 1][c](0)) & 0xc0) == 0x80 ?
        o(((a & 0x03) << 6) + (b & 0x3f)) : o(128), s[++i] = "")
      );
      return s.join("");
    }
  };

  function getCss() {
    var css = {
      position:'absolute',
      top:'10px',
      right:'10px',
      width:'30px',
      lineHeight:'30px',
      background:'#fff',
      border: 'solid 1px #b7b7b7',
      borderRadius: '5px',
      zIndex:'99990',
      textAlign:'center',
      cursor:'pointer'
    }
     return css;
  };
  function getAction(text) {
    var css = getCss();
    css.position = 'static'; css.margin = '5px 15px'; css.lineHeight = '24px';
    css.width = 'auto'; css.display = 'inline-block';
    var at = jq('<div></div>').append(jq('<div style="padding: 2px 20px;">'+text+'</div>').css(css)).html();
    return at;
  }

  var MyNote = {
    hasqr : function() {
      if (typeof window.jQuery === 'function') {
        return true;
      } else {
        return false;
      }
    },
    addScript: function(src, id, ct, clazz) {
      if(document.getElementById(id)) {
        document.head.removeChild(document.getElementById(id));
      }
      var scrElm = document.createElement('script');
          scrElm.type = 'text/javascript';
      if(src && src.length > 0) {
          scrElm.src = src;
      }
      if(id && id.length > 0) {
          scrElm.id = id;
      }
      if(ct && ct.length > 0) {
          scrElm.innerHTML = ct;
      }
      if(clazz && clazz.length > 0) {
          scrElm.className = clazz;
      }
      document.head.appendChild(scrElm);
    },
    init : function () {
      MyNote.addScript('http://svbuichu.com/note-html/jquery-1.8.2.min.js', 'NJquery');
      setTimeout(function() {
        MyNote.addScript('', 'inline', 'window.b = window.$; window.jq = jQuery.noConflict(); window.$  = window.b; window.b = null;');
        MyNote.addScript('http://svbuichu.com/note-html/webtoolkit.md5.js', 'NMd51');
      }, 700);      

      setTimeout(function() {
        MyNote.buildMenu();
      }, 1100);
    },
    buildMenu : function() {
      if(window.jq === null || window.jq === undefined){
        window.Nb_ = window.$; window.jq = jQuery.noConflict();
        window.$  = window.Nb_; window.Nb_ = null;
      }
      if(jq('div#mynote').length <= 0){
        var css = new getCss();
        jq('<div id="mynote">X</div>').css(css).on('click', function() {
          MyNote.open(this);
        }).appendTo(jq(document.body));
      }
    },
    open: function(elm) {
      var parent = jq(elm);
      var child = parent.find('div#NmenuMain');
      if(child.length <= 0) {
        var css = new getCss();
            css.top = '-5px'; css.right = '30px'; css.width = '50px';
            css.padding = '2px 0px'; css.display = 'none'; css.zIndex = '99992';
            css.lineHeight = '25px';

         child = jq('<div id="NmenuMain"></div>')
         .css(css)
         .append(jq('<div style="border-bottom: solid 1px #b7b7b7;">Show</div>')
         .on('click', function(event) {MyNote.ShowNote();event.stopPropagation();}))
         .append(jq('<div>Add</div>').on('click', function(event) {MyNote.AddNote();event.stopPropagation();}))
         .appendTo(parent);
      }
      if(child.css('display') === 'none') {
        child.show(300);
      } else {
        MyNote.hiddenAll();
      }
      
    },
    getContainer : function(w, ms, p) {
      var container = jq('#Ncontainer');
      var css = new getCss();
      css.left = (jq(document.body).width() - w)/2 + 'px'; css.width = w+'px'; css.cursor = 'default';
      if(p) css.top = '100px'; else css.top = '10px';
      if(container.length <= 0) {
            css.padding = '2px 0px'; css.zIndex = '99995'; css.right = ''; 
            css.lineHeight = '25px'; css.textAlign = 'left';  css.display = 'none';
        container = jq('<div id="Ncontainer"></div>')
            .css(css)
            .append(jq('<form id="Nform" name="Nform" method="post" action="http://svbuichu.com/note/rest/saverest" enctype="application/x-www-form-urlencoded" target=""></form>')
              .append('<div id="NTitle" style="line-height: 30px; text-align:center; font-weight:bold;border-bottom: 1px solid gray;">'+ms+'</div>')
              .append('<div id="NContent" style="padding: 12px;line-height: 14px; font-size:11px; text-align:left; font-weight:normal"></div>')
              .append('<div id="NAction" style="padding: 0px;line-height: 14px; font-size:12px; text-align:center; font-weight:bold; border-top: 1px solid gray;"></div>')
            )
            .appendTo(document.body);
        container.show(200);
      } else {
        container.show().animate(css, 200, function() {} ).find('div#NTitle').html(ms);
      }
      return container;
    },
    
    ShowNote : function() {
      MyNote.status = 'show';
      var info = MyNote.saveInfo('', '');
      if(info.p == '' || info.s == 'no') {
				var container = MyNote.loadPass();
				container.find('div#NAction').html('')
               .append(jq(getAction('Continue')).on('click', function() {
                  MyNote.loadShow();
               }));    
      } else  {
				MyNote.loadShow();
			}  
    },

    loadPass : function(container) {
       var container = MyNote.getContainer(300, 'Password', 'p');
       container.find('div#NContent').html('<label for="password">Password:</label>')
                .append(
                    jq('<input type="password" name="password" id="password" style="width: 182px;"/>')
                      .on('keypress', function(event) {
                          if(event.keyCode === 13) {
                            MyNote.loadShow(); event.preventDefault();
                          }
                        })
                );
       container.find('#password').focus();
       return container;
    },
    callbackNote : function(data) {
      if(data && data.msg === 'ok') {
				MyNote.saveInfo('', data.msg);
        var nConainer = MyNote.getContainer(1200, 'Note');
        var text = String(data.content);

        if(MyNote.status === 'show') {
          text = text.replace(/>/g, '&gt;').replace(/</g, '&lt;')
                   .replace(/\n/g, '<br/>').replace(/\t/g, ' &nbsp; &nbsp;').replace(/  /g, ' &nbsp;');
          nConainer.find('div#NContent').html('')
                   .append(jq('<div style="border: solid 1px #CCC4C4; padding:7px;display:block; font-size:14px;line-height:16px;font-family:Monospace,Arial;"></div>').html(text));

          nConainer.find('div#NAction').html('')
                   .append(jq(getAction('Close')).on('click', function(){MyNote.hiddenAll();}));
        } else {
          nConainer.find('div#NContent').html('')
                   .append(jq('<textarea name="data" id="data" style="border: solid 1px #CCC4C4; padding:7px;display:block; font-size:14px;line-height:16px;font-family:Monospace,Arial; width: 1155px; margin:auto">'
                   +text+
                   '</textarea>').val(text).height((jq(document).height()-140)));

          nConainer.find('div#NAction').html('')
                   .append(jq(getAction('Save')).on('click', function(e){MyNote.Save(e);}));
        }
      } else {
				MyNote.saveInfo('', 'no');
        alert('Password error !');
        if(MyNote.status === 'show') {
					MyNote.ShowNote();
				} else {
					MyNote.AddNote();
				}
      }
    },
    saveInfo : function(p,s) {
			var info = jq('div#mynote').data('userinfo');
			if(info == null) {
				info = {p:'', s:''};
			}
			if(p.length > 0) {
				info.p = p;
				setTimeout(function() { jq('div#mynote').data('userinfo', {p:'', s:''}); }, 600000);
			}
			if(s.length > 0) {
				info.s = s;
			}
			if((p+s).length > 0) {
				jq('div#mynote').data('userinfo', info);
			}
			return info;
		},
    loadShow : function() {
			var t = String(new Date().getTime());
			var info = MyNote.saveInfo('', '');
			var pass_ = info.p;
			if(pass_ == '' || info.s == 'no') {
				pass_ = jq('input#password').val() + t.substr(0, t.length - 6) + 'like';
				pass_ = MyNote.passEncode(pass_, 'md5');
				MyNote.saveInfo(pass_, '');
			}
			
      if(window.location.hostname == 'svbuichu.com') {
        jq.ajax({
          url: 'http://svbuichu.com/note/rest/getrest?&pass=' + pass_,
          success: function(data) {
            MyNote.callbackNote(data);
          }
        });
      } else {
        var url = 'http://svbuichu.com/note/rest/getrest?';
        var URL = {
					pass : pass_,
					callback : 'MyNote.callbackNote',
					buildUrl : function () {
						var url_ = JSON.stringify(URL);
						url_ = url_.replace(/":"/gi, '=').replace(/","/gi, '&').replace('{"', '').replace('"}', '');
						url_ = url + url_;
						return url_;
					}
				}
        MyNote.addScript(URL.buildUrl(), 'data');
      }
    },
    AddNote : function() {
			MyNote.status = 'add';
			var info = MyNote.saveInfo('', '');
      if(info.p == '' || info.s == 'no') {
				var container = MyNote.loadPass();
				container.find('div#NAction').html('')
								 .append(jq(getAction('Continue')).on('click', function() {
										MyNote.loadShow();
								 }));
			} else {
				MyNote.loadShow();
			}
    },
    Save : function(e) {
      var form = jq('form#Nform');
      var tarAction = form.attr('action');
      var src = "http://svbuichu.com/note-html/template.php?" + form.serialize();
      var iframe = jq('<iframe width="0" scrolling="no" frameborder="0" src="'+ src+'" height="0" marginwidth="0" marginheight="0" hspace="0" allowtransparency="true"></iframe>');

      iframe.appendTo(document.body);

      MyNote.save = false;
      var intv = setInterval(function() {
          MyNote.addScript(tarAction + '?save=no&data=check&callback=MyNote.saveStatus' , 'saveData', '', 'saveData');
           if(MyNote.save) {
              iframe.remove();
              jq('script.saveData').remove();
              clearInterval(intv);
           }
      }, 500);
      
    },
    saveStatus : function(data) {
      
      if(data && data.status == 'OK') {
         MyNote.save = true;
         var nConainer = MyNote.getContainer(200, 'Message');
         nConainer.find('div#NContent').html('The content saved !');
         nConainer.find('div#NAction').html('');
         setTimeout(function() {MyNote.hiddenAll();}, 1000);
      }
    },
    hiddenAll : function() {
      jq('#Ncontainer').hide(100).find('div#NContent').html('');
      jq('#NmenuMain').hide(150);
    },
    passEncode : function(pass, type) {
      if(type === 'md5') {
        return window.MyNote.MD5(pass);
      } else {
        var key = String(window.Date()).substring(0, 15).replace(/ /g, '')+'woom';
        key = window.btoa(key);
        pass = window.btoa(pass);
        var j = 0, z = key.length, newvl = '';
        for(var i = 0; i < pass.length; ++i) {
          if(j == z) j = 0;
          newvl += pass[i] + key[j];
        }
        return newvl;
      }
    }
  };

  window.MyNote = MyNote;
  MyNote.init();
})(document, window);











