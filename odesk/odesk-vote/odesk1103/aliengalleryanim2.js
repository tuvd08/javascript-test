function AlienGalleryAnim() {
  var alien = this;
	this._galleryObj; 
	this._strDivId;
	this._nTop=100;
	this._nLeft=0;

	//this._arrPosPathLX={0: 200, 1: 100, 2: 200, 3: 320, 4: 350};
	this._arrPosPathLX={0: 200,	1: 100,	2: 150,	3: 220,	4: 350};
	
	//this._arrPosPathLY={0: 170, 1: 140, 2: 110, 3: 80, 4: 90};
	this._arrPosPathLY={0: 170, 1: 110, 2: 50, 3: 30, 4: 20};

	//this._arrPosPathRX={0: 520, 1: 610, 2: 590, 3: 570, 4: 530};
	this._arrPosPathRX={0: 520, 1: 590, 2: 540, 3: 470, 4: 520};

	//this._arrPosPathRY={0: 170, 1: 130, 2: 100, 3: 70, 4: 50};
	this._arrPosPathRY={0: 170, 1: 110, 2: 50, 3: 30, 4: 50};

	this._arrPosW={0: 400, 1: 350, 2: 220, 3: 100, 4: 50};
	this._arrPosH={0: 250, 1: 200, 2: 150, 3: 120, 4: 50};

	this._fUndoMode=0;

	this.reportImages={};
	
	this.init = function(galleryObj) {
		this._galleryObj = galleryObj;
		this._strDivId = galleryObj._strDivId;
		this.css();
	}
	
	this.isWebKet = function() {
		return (BrowserDetect.browser === "Chrome" || BrowserDetect.browser === "Safari");
	}
	
	this.isIE = (BrowserDetect.browser === "Explorer");
	
	this.timeout = (this.isWebKet() || this.isIE) ? 500 : 800;
	
	this.css = function() {
		$("head")
			.append("<style type=\"text/css\">"
				+ "#"+this._strDivId+" { background: #e5e5e5; width: 900px; height: 400px;"
				+							"background: -moz-linear-gradient(top, #e5e5e5 0%, #ffffff 100%);"
				+				 "background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#e5e5e5), color-stop(100%,#ffffff));"
				+	 			 "background: -webkit-linear-gradient(top, #e5e5e5 0%,#ffffff 100%); "
				+				 "background: -o-linear-gradient(top, #e5e5e5 0%,#ffffff 100%);"
				+				 "background: -ms-linear-gradient(top, #e5e5e5 0%,#ffffff 100%); "
				+				 "background: linear-gradient(to bottom, #e5e5e5 0%,#ffffff 100%)"
				+				 "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e5e5e5', endColorstr='#ffffff',GradientType=0 );" 
				+ "}\n"
				+ ".imgAG {border: 10px solid #fffffe; }"
				+ ".cntrF {color: #fff; font-family: courier; z-index: 8; font-size: 16px; font-weight: bold; display: block; position: absolute;}\n"
				+ "</style>");
	}

	/**
	 * intital html struct
	 * @see AlienGalleryAnim.initHtmlStruct()
	 */
	this.initHtmlStruct = function() {
		this.echo("anim.initHtmlStruct()");
		try {//divAliengallery
			var strHtml = '<hr>'
				+ '<div id="divAlienCounter"></div>'
				+ '<hr>'
				+ '<div id="divAlienGalleryPics" style="width:600px; height: 400px; "></div>'
				+ '<div id="divAlienMsg" style="z-index: 6; margin-left: 100px; height: 20px; width: 400px; background-color: #ffffff; text-align: center; padding: 10px; border: 3px solid #000; box-shadow: 5px 5px 10px #555555; position: absolute;margin-top: -80px; border-radius: 10px;display:none"></div>'
				+ '<div id="divAlienButtons"></div>'
				+ '<div id="divAlienUndo"></div><br>'
				+ '<div id="divAlienReport"></div>'
				+ '<hr>';
			$('#'+this._strDivId).html(strHtml);
			var offset = $('#'+this._strDivId).offset();
			this._nTop = offset.top;
			this._nLeft = offset.left;

		} catch (e) {this.alertException(e);}
	};


	/**
	 * intital display of the pictures in the space
	 * @todo do it
	 */
	this.initHtmlImages = function() {
		this.echo("anim.initHtmlImages()");
		try {
			this._arrLeftImgIds = new Array();
			this._arrRightImgIds = new Array();
			var strHtml='';
			for (var i=3; i>=0; i--) {

				var arrPicLeft = this.getPic(i, 'l');
				var arrPicRight = this.getPic(i, 'r');
				
				var imgIdLeft = this.getHtmlImgId(i,'l');
				var imgIdRight = this.getHtmlImgId(i,'r');

				strHtml +=	this.oneImage(i, 'l') + this.oneImage(i, 'r');
			}

			$('#divAlienGalleryPics').html(strHtml);
			} catch (e) {this.alertException(e);}
	};

	/** 
	 * JQuery animation. Two new picture appear in the background.
	 * The last pair of this._arrPics[] 
	 * @todo 	Must be implemented 
	 */
	this.fadeInPics = function() {
		this.echo("anim.fadeInPics()");
		try {
			var strHtml = this.oneImage(4, 'l')+this.oneImage(4, 'r');
			$('#divAlienGalleryPics').append(strHtml);

			for(var strLR in {'l':1, 'r':1}) {
				var id = this.getHtmlImgId(3, strLR);
				var arrPic = this.getPic(3, strLR);
				var x = this.picXPos(3, strLR)+'px';
				var y = this.picYPos(3, strLR)+'px';
				var zoom = this.zoom(3, strLR);
				var item = $('#div'+id);
				//fix firefox
				item[0].style.MozTransform = 'scale('+zoom+')';
				item.show().animate({
					left: x,
					top: y,
					'transform': 'scale('+zoom+')',
					'-ms-transform': 'scale('+zoom+')', /* IE 9 */
					'-webkit-transform': 'scale('+zoom+')', /* Safari and Chrome */
					'-o-transform': 'scale('+zoom+')', /* Opera */
					'-moz-transform': 'scale('+zoom+')', /* Firefox */
					'zoom': zoom
				}, this.timeout, function() {
					;//done
				});
			}
		} catch (e) {this.alertException(e);}	
	};
	 

	/**
	 * Update Images. Move rows 1,2,3 to front. row 0 is done by fadeInImg
	 * Zoom in. Not more. 
	 * @todo doit
	 */
	this.updateHtmlImages = function() {
		this.echo("anim.updateHtmlImages()");
		try {
			//
			var imgIdLeft='', x,y,w,h;
			for (i=0; i<3; i++) {
				for(var strLR in {'l':1, 'r':1}) {
					var zoom = this.zoom(i, strLR);
					var o = this.opacity(i, strLR);							
					var id = this.getHtmlImgId(i, strLR);
					var x = this.picXPos(i, strLR)+'px';
					var y = this.picYPos(i, strLR)+'px';
					var item = $('#div'+id);
					//fix firefox
					item[0].style.MozTransform = 'scale('+zoom+')';
					item.css('z-index', (6-i))
						.animate({
							'left': x,
							'top': y,
							'transform': 'scale('+zoom+')',
							'-ms-transform': 'scale('+zoom+')', /* IE 9 */
							'-webkit-transform': 'scale('+zoom+')', /* Safari and Chrome */
							'-o-transform': 'scale('+zoom+')', /* Opera */
							'-moz-transform': 'scale('+zoom+')', /* Firefox */
							'zoom': zoom
						}, this.timeout, function() {
						;//done
					});
					$('#'+id).css('opacity', o);
				}
			}
		} catch (e) {this.alertException(e);}
	};


	/** 
	 * JQuery animation. Move two picture away (the ones which were evaluated) 
	 * If button was perfect or good then fadeOut() and at the same time move to top, else move to the buttom and fadeOut()
	 * @todo 	Must be implemented 
	 */
	this.fadeOutPics = function(strTxt, leftPicId, rightPicId) {
		this.echo("anim.fadeOutPics("+strTxt+','+ leftPicId+','+ rightPicId+")");
		try {
			this.echo("anim.fadeOutPics task todo!!! If button was perfect or good then fadeOut() and at the same time move to top, else move to the buttom and fadeOut().");

			var imgIdLeft = this.getHtmlImgId(0, 'l');
			var imgIdRight = this.getHtmlImgId(0, 'r');
			var y,x;
			var zoom=($.browser.mozilla) ? 0.2 : 0.4;
			if (strTxt=='good' || strTxt=='perfect') {
				y = this.getPicY((this._nTop + 60), 1) + 'px';
				x1 = ($('#divAliengallery').outerWidth() + this._nLeft - 200)/2;
				x2=x1;

        x1 += 'px';
        x2 += 'px';
			} else {
         x1 = '-150px' ;
         x2 = (this._nLeft + $('#divAliengallery').outerWidth() - 150) + 'px';
         y = '250px';
			}

			var itemL = $('#div'+imgIdLeft);
      this.animateItem(itemL, x1, y, zoom, 'L');

			var itemR = $('#div'+imgIdRight);
      this.animateItem(itemR, x2, y, zoom, 'R');

		} catch (e) {this.alertException(e);}
	};


  this.animateItem = function(item, left, top, zoom, l) {
      var zI = (item.css('z-index'))*1;
      var t = zI;
      if($.browser.mozilla) {
        var style = $('#anim1a').html();
        style = style.replace('top: 10px', 'top: '+item.css('top'))
                     .replace('top: 11px', 'top: '+top)
                     .replace('left: 10px', 'left: '+item.css('left'))
                     .replace('left: 11px', 'left: '+left)
                     .replace('anim1aMain', 'anim1a'+l);
        if(l == 'L') {
          $('#anim1aExtendL').html(style);
          item.addClass('animate anim1aL');
        } else {
          $('#anim1aExtendR').html(style);
          item.addClass('animate anim1aR');
        }
        
        item.css('z-index', (zI+2));
      } else {
        item.animate({
          'opacity' : '0',
          'left': left,
          'top': top,
          'scale' : zoom
        }, {step: function(now, fx) {
          if(fx.prop === 'scale') {
            ++t;
            var val = 1 - now;
            item.css({
              'z-index' : t,
              '-ms-transform': 'scale('+val+')', /* IE 9 */
              '-webkit-transform': 'scale('+val+')', /* Safari and Chrome */
              '-o-transform': 'scale('+val+')'
            });
          }
        }, duration : (alien.timeout + 200), specialEasing: 'linear',
          complete : function() {
            item.css('z-index', zI + 2);
          }
        });
      }
  }

	/**
	 * Intital display of undo button
	 * @todo do it
	 */
	this.initHtmlUndoButton = function() {
		this.echo("anim.initHtmlUndoButton()");
		try {
			$('#divAlienUndo').html(
				'<img src="top2b.png" USEMAP="#topButton" style="width:900px; height: 39px; display:block; position: absolute; top:'+this._nTop+'px; left:'+this._nLeft+'px;"/>'
				+'<map name="topButton">'
				+ this.htmlButton('undo', 0, 0)
				+ this.htmlButton('reportImgs', 1005, 1001)
				+'</map>'
				+'<div><div id="divUndoImgL"></div><div id="divUndoImgR"></div></div>'
			);

			/*
			$('#divAlienUndo').html(
					this.htmlButton('undo', 0, 0)
			);
			*/
		} catch (e) {this.alertException(e);}
	};

	/**
	 * Update undo button
	 * @todo do it
	 */
	this.updateHtmlUndoButton = function() {
		this.echo("anim.updateHtmlUndoButton()");
		try {
			this.echo("updateHtmlUndoButton(): todo!");
			this.initHtmlUndoButton();
		} catch (e) {this.alertException(e);}
	};

	/**
	 * @retun string 	Html Code for one button.
	 */
	this.htmlButton = function(strTxt, leftPicId, rightPicId) {
		this.echo("htmlButton("+strTxt+")");
		try {
			var href="javascript:window.alienGallery.onclickButton('"
				+ strTxt
				+ "','"
				+ leftPicId
				+ "','"
				+ rightPicId
				+ "')";

			if (strTxt=='perfect') {
				return '<area shape="rect" coords="100,0,269,105" href="' + href + '"/>';
			} else if (strTxt=='good') {
				return '<area shape="rect" coords="279,0,448,105" href="' + href + '"/>';
			} else if (strTxt=='dontknow') {
				return '<area shape="rect" coords="447,0,616,105" href="' + href + '"/>';
			} else if (strTxt=='noway') {
				return '<area shape="rect" coords="622,0,791,105" href="' + href + '"/>';
			} else if (strTxt=='undo') {
				return '<area shape="rect" coords="0,0,100,39" href="' + href + '"/>';
			} else if(strTxt=='reportImgs') {
				return '<area shape="rect" coords="120,0,270,39" href="' + href + '"/>';
			}
			return "<a href=\"javascript:window.alienGallery.onclickButton('"
					+ strTxt
					+ "','"
					+ leftPicId
					+ "','"
					+ rightPicId
					+ "')\">"
					+ this.d(strTxt)
					+ '</a>';
		} catch (e) {this.alertException(e);}
	};

	/**
	 * Intital display of button for reporting bad images
	 * @todo do it
	 */
	this.initHtmlReportButton = function() {
		try {
			this.echo("initHtmlReportButton()");
			var arrPicLeft = this.getPic(0, 'l');
			var arrPicRight = this.getPic(0, 'r');
			$('map[name=topButton]').find('area:last').attr('href', function() {
				var href = "javascript:window.alienGallery.onclickButton('reportImgs','" 
						 + arrPicLeft['id'] + "','" + arrPicRight['id'] + "')";
				return href;
			});
		} catch (e) {this.alertException(e);}
	};

	/**
	 * Update button for reporting bad images, IDs of pictures have changed in the button.
	 * @todo do it
	 */
	this.updateHtmlReportButton = function() {
		this.echo("anim.updateHtmlReportButton()");
		try {
			this.initHtmlReportButton();
		} catch (e) {this.alertException(e);}
	};

	/**
	 * Intital display of counter clicks information 
	 * @todo do it
	 */
	this.initHtmlInfos = function() {
		this.echo("anim.initHtmlInfos()");
		try {
			this.echo("initHtmlInfos(): todo!");
			var strC='00000'+this.getClicks()+'12345';
			strC = strC.substr(strC.length-5, 5);
			var strHtml='';
			for (var i=0; i<5; i++){
				strHtml +=
					'<div class="cntrF" id="cntr'+i+'" '
					+' style="left: '+(this._nLeft+783 + (i*15) )+'px; top: '+(this._nTop+10)+'px">'
					+ strC.substr(i,1)
					+ '</div>';
			}
			$('#divAlienCounter').html(strHtml);
		} catch (e) {this.alertException(e);}
	};

	/**
	 * Update counter clicks information 
	 * @todo do it
	 */
	this.updateHtmlInfos = function() {
		this.echo("anim.updateHtmlInfos()");
		try {
			this.echo("updateHtmlInfos(): todo!");
			var strC='00000'+this.getClicks();
			strC = strC.substr(strC.length-5, 5);
			for (var i=0; i<5; i++){
				$('#cntr'+i).html(strC.substr(i,1));
			}
		} catch (e) {this.alertException(e);}
	};

	/**
	 * intital display of the evaluation buttons
	 * @todo do it
	 */
	this.initHtmlButtons = function() {
		this.echo("anim.initHtmlButtons()");
		try {
			this.echo("anim.initHtmlButtons(): todo!");

			var arrPicLeft = this.getPic(0, 'l');
			var arrPicRight = this.getPic(0, 'r');
			var strHtml =
					'<div id="divHideButtons" style="z-index: -1; margin:0; opacity: 0.5; position: absolute; width: 900px; height: 110px; background-color: #AAAAAA"></div>'
					+ '<img id="imgHideButtonsa" src="buttons2a.png" style="z-index: 2; display:none; position: absolute; width: 900px; height: 110px;" />'
					+ '<img id="imgHideButtonsb" src="buttons2b.png" style="z-index: 2; display:none; position: absolute; width: 900px; height: 110px;" />'
					+ '<img id="imgHideButtonsc" src="buttons2c.png" style="z-index: 2; display:none; position: absolute; width: 900px; height: 110px;" />'
					+ '<img id="imgHideButtonsd" src="buttons2d.png" style="z-index: 2; display:none; position: absolute; width: 900px; height: 110px;" />'
					+ '<IMG id="imgButtons" SRC="buttons2.png" style="z-index: 1; width:900px; height: 110px;" USEMAP="#butt2">'
					+ '<map name="butt2">'
				+ this.htmlButton('perfect', arrPicLeft['id'], arrPicRight['id'])
				+ this.htmlButton('good', arrPicLeft['id'], arrPicRight['id'])
				+ this.htmlButton('dontknow', arrPicLeft['id'], arrPicRight['id'])
				+ this.htmlButton('noway', arrPicLeft['id'], arrPicRight['id'])
				+ '</map>';

			$('#divAlienButtons').html(strHtml);
			} catch (e) {this.alertException(e);}
	};

	/**
	 * Update evaluation buttons.	IDs of pictures have changed in the button.
	 * @todo do it
	 */
	this.updateHtmlButtons = function() {
		this.echo("anim.updateHtmlButtons()");
		try {
			this.initHtmlButtons();
		} catch (e) {this.alertException(e);}
	};

	/**
	 * Picture pair is flying back and the user can evaluate them again.
	 * - pictures flying back
	 * - buttons must have the old picture ids.
	 * - disable undo button
	 * @todo do it
	 */
	this.undoShowPreviousPicturePairAgain = function(arrPicL, arrPicR, strComVote) {
		this.echo("anim.undoShowPreviousPicturePairAgain: undo");
		try {
			this.echo("anim.undoShowPreviousPicturePairAgain: @todo task!");
			for(var strLR in {'l':1, 'r':1}) {
				for (i=0; i<4; i++) {
					$('#div'+this.getHtmlImgId(i, strLR)).hide();
				}
			}
				var x=150;
				var y=90;
				var strImgL = this.imageHtml(arrPicL, x-50, y+10, 8, 1, 'InnerUL', 1);
				$('#divUndoImgL').hide().html(strImgL);
				$('#divInnerUL').css('opacity', 0.1);
				$('#divUndoImgL').show();
				$('#divInnerUL').animate({
					'opacity': 1,
					'top': (y+'px'),
					'left': (x+'px')
				}, this.timeout, function() {
					;//done
			});

				var x=500;
				var y=90;
				var strImgR = this.imageHtml(arrPicR, x+10, y+10, 8, 1, 'InnerUR', 1);
				$('#divUndoImgR').hide().html(strImgR);
				$('#divInnerUR').css('opacity', 0.1);
				$('#divUndoImgR').show();
				$('#divInnerUR').animate({
					'opacity': 1,
					'top': (y+'px'),
					'left': (x+'px')
				}, this.timeout, function() {
					;//done
			});

		} catch (e) {this.alertException(e);}	
	}

	this.undoDone = function(arrPicL, arrPicR, strComVote) {
		try {
			$('#divUndoImgL').fadeOut(400);
			$('#divUndoImgR').fadeOut(400);
				for (i=0; i<4; i++) {
				$('#div'+this.getHtmlImgId(i, 'l')).delay(this.timeout).show();
				$('#div'+this.getHtmlImgId(i, 'r')).delay(this.timeout).show();
				}

		} catch (e) {this.alertException(e);}	
	}

	/**
	 * Bad images with inappropriate content. Report and diable them.
	 * - Ask user why 
	 * - Remove bad characters from answer. Only allow a-zA-Z0-9 and <space>.:,;-+ 
	 */
	this.reportImagesToAdmin = function(leftPicId, rightPicId) {
		this.echo("anim.reportImagesToAdmin("+ leftPicId+','+ rightPicId+")");
		try {
			this.echo("anim.reportImagesToAdmin: @todo task!");
			this.reportImages = {'reportImgs': '', l: leftPicId, r : rightPicId};
		} catch (e) {this.alertException(e);}	
	}

	this.reportImagesToAdminSave =  function() {
		this.echo("anim.reportImagesToAdminSave()");
		var dailog = $('div#divReportUsrMsg');
		var valMsg = dailog.find("#textareaReportUsrMsg").val();
		if(valMsg === '' || valMsg === o('reportUserWhy')) {
			return "msgEmpty";
		} else {
			this.reportImages.reportImgs = valMsg;
			return this.reportImages;
		}
		
	}

	/** 
	 * Like Growl. Show in time displayed Messege. 
	 * @todo 	At the moment it is NOT neccessary to send these information to the server... 
	 */
	this.giveMsgAboutAverageVotation = function(strTxt, leftPicId, rightPicId) {
		this.echo("anim.giveMsgAboutAverageVotation("+strTxt+','+ leftPicId+','+ rightPicId+")");
		try {
			var strAverageSays = this._galleryObj._arrLastEvaluatedPicturePair['v'];
			if (strAverageSays) {
				$('#divAlienMsg').hide().html('Community voted: '+strAverageSays).show().delay(2500).fadeOut(200);
			}
		} catch (e) {this.alertException(e);}	
	};



	this.oneImage = function(i, strLR) {
		try {
			var p=i;
			if (i==4) { // virtuell!!! there are only 4 images, 0 to 3. But oneImage(4, ...) means image 3 at position of 4 (image 3 moves from position 4 to 3)
				i=3;
				p=4;
			}
			var arrPic = this.getPic(i, strLR);
			var imgId = this.getHtmlImgId(i, strLR);
			var o = this.opacity(p, strLR);
			var zoom = this.zoom(p, strLR);
			var strHtml = this.imageHtml(arrPic, this.picXPos(p,	strLR), this.picYPos(p, strLR), (6-i), zoom , imgId, o); 
			return strHtml;
		} catch (e) {this.alertException(e);}
	};

	this.styleZoom = function(nZoom) {
	var style = 'transform: scale('+nZoom+'); '+
			'-ms-transform: scale('+nZoom+'); '+ /* IE 9 */
			//'-webkit-transform: scale('+nZoom+'); '+ /* Safari and Chrome */
			'-o-transform: scale('+nZoom+'); '+ /* Opera */
			'-moz-transform: scale('+nZoom+'); '+ /* Firefox */
			'zoom:' + nZoom + ';';
		return style;
	};

	this.imageHtml = function(arrPic, x, y, z, zoom, id, o) {
    	try {
    		var wMax=this._arrPosW[0];
    		var h=200;
    		var w=this.wResized(200, arrPic['w'], arrPic['h']);
	    	var strHtml = '<div id="div'+id+'"'
			+ ' style="background: #e5e5e5; opacity: 1; position: absolute; box-shadow: 5px 5px 8px #666666;'
			+ ' width: '+ (20+1*w) + "px; height: "+(20+1*h)+'px;'+this.styleZoom(zoom)
			+ ' top: '+ y + 'px; left: ' + x + 'px;'
			+ ' z-index: '+(z)+';">'
			+ '<img src="'+arrPic['url']+'" class="imgAG"'
			+ ' id="'+id+'"'
			+ ' style="opacity:'+ o + ';'
			+ ' width: '+ w + "px; height: "+h+'px;">'
			+ '</div>';

	    	this.echo("imageHtml()"+ strHtml);
	    	return strHtml;
        } catch (e) {this.alertException(e);}    	
    };	
 
	this.deactivateButtons = function(strTxt) {
		this.echo("anim.deactivateButtons()");

		try {
			if (strTxt=='perfect') {
				$('#imgHideButtonsa').show();
			} else if (strTxt=='good') {
				$('#imgHideButtonsb').show();
			} else if (strTxt=='dontknow') {
				$('#imgHideButtonsc').show()
			} else if (strTxt=='noway') {
				$('#imgHideButtonsd').show()
			} else {
				$('#divHideButtons').css('z-index', 2);
			}
			this._strLastTxt = strTxt;
		} catch (e) {this.alertException(e);}				
	};

	this.activateButtons = function() {
		this.echo("anim.activateButtons()");
		try {
			window.setTimeout("window.alienGallery._animObj.activateButtons2()", 800);
		} catch (e) {this.alertException(e);}				
	};

	this.activateButtons2 = function() {
		this.echo("anim.activateButtons2()");
		try {
			if (this._strLastTxt=='perfect') {
				$('#imgHideButtonsa').hide()
			} else if (this._strLastTxt=='good') {
				$('#imgHideButtonsb').hide()
			} else if (this._strLastTxt=='dontknow') {
				$('#imgHideButtonsc').hide()
			} else if (this._strLastTxt=='noway') {
				$('#imgHideButtonsd').hide()
			} else {
					$('#divHideButtons').css('z-index', -1);
			}
		} catch (e) {this.alertException(e);}				
	};

	this.picXPos = function(i, strLeftOrRight) {
		var x = ((strLeftOrRight=='l')? this._arrPosPathLX[i]: this._arrPosPathRX[i]);
		var z = this.zoom(i, strLeftOrRight);
		return this.getPicX(x, z);
	};

	this.picYPos = function(i, strLeftOrRight) {
		var y = ((strLeftOrRight=='l')? this._arrPosPathLY[i]: this._arrPosPathRY[i]);
		var z = this.zoom(i, strLeftOrRight);
		return this.getPicY(y, z);
	};

	this.getPicX = function (x, z) {
		if(this.isWebKet()) {
			return Math.floor((this._nLeft+x)/((z < 1) ? (z-0.05) : 1));
		} if(this.isIE) {
			return Math.floor(this._nLeft+x) + ((z == 1) ? -20 : (z == 0.75) ? 18 : (z == 0.45) ? 45 : 58);
		}  else {
			return Math.floor(this._nLeft+x);
		}
	};

	this.getPicY = function (y, z) {
		if(this.isWebKet()) {
			return Math.floor((this._nTop+y)/((z < 1) ? (z-0.15) : 1));
		} if(this.isIE) {
			return Math.floor((this._nTop+y)/1.05) + 25 ;
		} else {
			return Math.floor((this._nTop+y)/0.78) - 45 ;
		}
	};

	this.wResized = function(newH, w, h) {
	var isLandscape = w>h;
	return Math.floor(w*newH/h);	 
	};

	this.opacity = function(i, strLR) {
		return ((i==0) ? 1 : (i==1) ? 0.65 : (i==2) ? 0.3 : 0.15);
	};

	this.zoom = function(i, strLR) {
		return (i==0? 1 : (i==1? 0.75: (i==2? 0.45: (i==3? 0.35 : 0.2))));
	};
 
	this.getDisplImgW = function(i, strLR) {
		this.echo("anim.getDisplImgW()");
		try {
		var arrPic = this.getPic(i, strLR);
		return this.wResized(this._arrPosH[i], arrPic['w'], arrPic['h']);
			} catch (e) {this.alertException(e);}
	};

	this.getDisplImgH = function(i, strLR) {
	return this._arrPosH[i];
	};

	/**
	 * @param numeric pos 		0 = actuell to evaluate, 4 = appeared new (after 3 clicks to evalute) 
	 * @return array e.g. { 'url': '1.jpg', 'id': '1001', 'title': 'title-pic1', 'w': '200', 'h': '220'};
	 */
	this.getPic = function(pos, strLeftOrRight) {
		return this._galleryObj.getPic(pos, strLeftOrRight);
	};

	this.getHtmlImgId = function(pos, strLeftOrRight) {
		return this._galleryObj.getHtmlImgId(pos, strLeftOrRight);
	};

	this.echo = function(str) {
    if(window.console) {
      //window.console.log(str);
    }
	};

	this.d = function(str) {
		return this._galleryObj.d(str);
	};

	this.getClicks = function(str) {
		return this._galleryObj._nClicks;
	};

	this.alertException = function(str) {
		alert(str);
	};
}
