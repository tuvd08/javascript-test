function AlienGallery() {
	aliasObj = this;
	this._srvPath = "http://www.xyz.com/dir";	// url. http://.../path	 Not used yet, perhaps later used.
	this._arrDic;	// dictionary array key:=code, value:=translation. eg. _arrDic['dontknow'] = 'Don´t know';
	this._nClicks;	// number of clicks (evalutions) the user did so far till now.
	this._fHorizontal;	// boolean: true=horizontal (pictures left+right), false=vertical (pictures top+button)
	this._arrClickResults;	// array of arrays: {'r': <buttonTxt>, 'leftPicId': <id>, 'rightPicId': <id>, 'saved': <0|1> }, ..
	this._functionForNextPicturePair; 	// method, which return an array (a pair of pictures)
	this._strDivId;	// id of html div tag in which the gallery will be displayed
	this._animObj;
	this._arrLastEvaluatedPicturePair; // array of two pictures. Needed for 'Undo'.
	this._arrLeftImgIds;	// html img Ids (0 actuell to evaluate, 4 (just appeared, in 3 clicks to evaluate)
	this._arrRightImgIds;   // html img Ids (0 actuell to evaluate, 4 (just appeared, in 3 clicks to evaluate)
	this._uniqueImgId;
	this._fUndoMode = 0;
	this.DailogSetting = {
		width: 600,
		height: 350,
		id : 'divReportUsrMsg',
		size: 300
	}
	/**
	 * @var this._arrPics 
	 * 	= array of arrays of arrays 
	 *  = this._arrPics[0|1|2|3|4]['l'|'r']['url'|'id'|'title'|'w'|'h']
	 * e.g.
	 * this._arrPics=[
	 * 	{
	 *   "l":{"url":"A.jpg","id":"1005","title":"title-artist1","w":"200","h":"220"},
	 * 	 "r":{"url":"1.jpg","id":"1001","title":"title-pic1","w":"200","h":"220"}
	 *  },
	 *  {
	 *   "l":{"url":"A.jpg","id":"1005","title":"title-artist1","w":"200","h":"220"},
	 *   "r":{"url":"2.jpg","id":"1002","title":"title-pic2","w":"200","h":"220"}
	 *  },
	 *  :
	 *  ]
	 */
	this._arrPics;	// array of arrays of arrays

	/**
	 * Main start function of gallery
	 * @param array  arrDictionary		key:=code, value:=translation. eg. _arrDic['dontknow'] = 'Don´t know';
	 * @param array	 arrPics			All picture pairs (see comment for this._arrPics)
	 * @param function functionForNextPicturePair	method, which return an array (a pair of pictures)
	 * @param number nClicks			number of clicks (evalutions) the user did so far till now.
	 * @param boolean fHorizontal	 	true=horizontal (pictures left+right), false=vertical (pictures top+button)
	 * @param string strDivId			id of html div tag in which the gallery will be displayed
	 */
	this.execute = function(arrDictionary, 
							arrPics, 
							functionForNextPicturePair,
							nClicks, 
							fHorizontal, 
							strDivId) 
	{

		this.echo("this._arrPics="+this.json2str(arrIniPics));
	
		this._arrPics = arrPics; // all images. see @var this._arrPics comment	   
		this._arrDic = arrDictionary;
		this._nClicks = nClicks;
		this._fHorizontal = fHorizontal;
		this._functionForNextPicturePair = functionForNextPicturePair;
		this._strDivId = strDivId;
		this._animObj = new AlienGalleryAnim();
		this._animObj.init(this);

		this._arrClickResults = new Array();
		this._uniqueImgId=0;
	   
		this.initHtmlBuild();	
	};

	/**
	 * Render the gallery into the html div with id = this._strDivId;
	 * 		max 2 x 4 images
	 * 		4 x buttons for evaluation
	 * 		1 x button for reporting bad bad pictures to admin
	 * 		1 x Information text for counting clicks
	 */
	this.initHtmlBuild = function() {
		this.echo("initHtmlBuild()");
		$('#'+this._strDivId).html('started');

		try {
			this._arrLeftImgIds = new Array();
			this._arrRightImgIds = new Array();
			for (var i=0; i<this._arrPics.length; i++) {
				this._arrLeftImgIds[i] = this.nextUniqueImgId();
				this._arrRightImgIds[i] = this.nextUniqueImgId();
			}

			this.initHtmlStruct();  // intital display of html structure 
			this.initHtmlImages(); 		// intital display of the picture in the space
			this.initHtmlButtons(); 	// intital display of the evaluation buttons
			this.initHtmlUndoButton();  // intital display of the undo button
			this.initHtmlReportButton();// Intital display of button for reporting bad images
			this.initHtmlInfos(); 		// Intital display of counter clicks information
		} catch (e) {this.alertException(e);}
	};

	/**
	 * intital html struct
	 * @see AlienGalleryAnim.initHtmlStruct()
	 */
	this.initHtmlStruct = function() {
		this.echo("initHtmlStruct()");
		try {
			this._animObj.initHtmlStruct();
		} catch (e) {this.alertException(e);}
	};


	/**
	 * intital display of the pictures in the space
	 */
	this.initHtmlImages = function() {
		this.echo("initHtmlImages()");
		try {
			this._animObj.initHtmlImages();
		} catch (e) {this.alertException(e);}
	};

	/**
	 * Update Images.
	 * Zoom in. Not more. 
	 */
	this.updateHtmlImages = function() {
		this.echo("updateHtmlImages()");
		try {
			this._animObj.updateHtmlImages();
		} catch (e) {this.alertException(e);}
	};

	/** 
	 * JQuery animation. Move two picture away (the ones which were evaluated) 
	 * If button was perfect or good then fadeOut() and at the same time move to top, else move to the buttom and fadeOut()
	 * @todo 	Must be implemented 
	 */
	this.fadeOutPics = function(strTxt, leftPicId, rightPicId) {
		this.echo("fadeOutPics("+strTxt+','+ leftPicId+','+ rightPicId+")");
		try {
			this._animObj.fadeOutPics(strTxt, leftPicId, rightPicId);
 		} catch (e) {this.alertException(e);}		
	};

	/** 
	 * JQuery animation. Two new picture appear in the background.
	 * The last pair of this._arrPics[] 
	 * @todo 	Must be implemented 
	 */
	this.fadeInPics = function() {
		this.echo("fadeInPics()");
		try {
			this._animObj.fadeInPics();
		} catch (e) {this.alertException(e);}		
	};


	/**
	 * Intital display of undo button
	 * @todo do it
	 */
	this.initHtmlUndoButton = function() {
		this.echo("initHtmlUndoButton()");
		try {
			this._animObj.initHtmlUndoButton();
		} catch (e) {this.alertException(e);}
	};

	/**
	 * Update undo button
	 * @todo do it
	 */
	this.updateHtmlUndoButton = function() {
		this.echo("updateHtmlUndoButton()");
		try {
			this._animObj.updateHtmlUndoButton();
		} catch (e) {this.alertException(e);}
	};
	
	/**
	 * Intital display of button for reporting bad images
	 * @todo do it
	 */
	this.initHtmlReportButton = function() {
		this.echo("initHtmlReportButton()");
		try {
			this._animObj.initHtmlReportButton();
		} catch (e) {this.alertException(e);}
	};

	/**
	 * Update button for reporting bad images, IDs of pictures have changed in the button.
	 * @todo do it
	 */
	this.updateHtmlReportButton = function() {
		this.echo("updateHtmlReportButton()");
		try {
			this._animObj.updateHtmlReportButton();
		} catch (e) {this.alertException(e);}
	};

	/**
	 * Intital display of counter clicks information 
	 * @todo do it
	 */
	this.initHtmlInfos = function() {
		this.echo("initHtmlInfos()");
		try {
			this._animObj.initHtmlInfos();
		} catch (e) {this.alertException(e);}
	};

	/**
	 * Update counter clicks information 
	 * @todo do it
	 */
	this.updateHtmlInfos = function() {
		this.echo("updateHtmlInfos()");
		try {
			this._animObj.updateHtmlInfos();
		} catch (e) {this.alertException(e);}
	};

	/**
	 * intital display of the evaluation buttons
	 * @todo do it
	 */
	this.initHtmlButtons = function() {
		this.echo("initHtmlButtons()");
		try {
			this._animObj.initHtmlButtons();
		} catch (e) {this.alertException(e);}
	};

	/**
	 * Update evaluation buttons.  IDs of pictures have changed in the button.
	 * @todo do it
	 */
	this.updateHtmlButtons = function() {
		this.echo("updateHtmlButtons()");
		try {
			this._animObj.updateHtmlButtons();
		} catch (e) {this.alertException(e);}
	};

	/**
	 * Picture pair is flying back and the user can evaluate them again.
	 * - pictures flying back
	 * - buttons must have the old picture ids.
	 * - disable undo button
	 * @todo do it
	 */
	this.undoShowPreviousPicturePairAgain = function() {
		this.echo("undoShowPreviousPicturePairAgain: undo");
		try {	
			if (!this._arrLastEvaluatedPicturePair) return alert('evalutate one picture pair first');
			this._fUndoMode = 1;
			this._nClicks--;
			this._animObj.undoShowPreviousPicturePairAgain(
					this._arrLastEvaluatedPicturePair['l'],
					this._arrLastEvaluatedPicturePair['r'],
					this._arrLastEvaluatedPicturePair['v']
			);
		} catch (e) {this.alertException(e);}		
	}

	/**
	* 
	*/
   this.undoDone = function() {
		this.echo("undoDone");
		try {	
			if (!this._arrLastEvaluatedPicturePair) return alert('evalutate one picture pair first');
			this._fUndoMode = 0;
			this._nClicks++;
			this._animObj.undoDone(
	   			this._arrLastEvaluatedPicturePair['l'],
	   			this._arrLastEvaluatedPicturePair['r'],
	   			this._arrLastEvaluatedPicturePair['v']
			);
   		} catch (e) {this.alertException(e);}		
   }
   

	/**
	 * Bad images with inappropriate content. Report and diable them.
	 * - Ask user why 
	 * - Remove bad characters from answer. Only allow a-zA-Z0-9 and <space>.:,;-+ 
	 */
	this.reportImagesToAdmin = function(leftPicId, rightPicId) {
		this.echo("reportImagesToAdmin("+ leftPicId+','+ rightPicId+")");
		try {	
			$('#divReportUsrMsg').dialog('open');
			this._animObj.reportImagesToAdmin(leftPicId, rightPicId);
		} catch (e) {this.alertException(e);}		
	}

	this.reportImagesToAdminSave = function() {
		this.echo("reportImagesToAdminSave ...");
		var data = this._animObj.reportImagesToAdminSave();
		if(typeof data != 'string') {
			this.saveResult('"reportImgs":"'+data.reportImgs + '"', data.l, data.r);
			this._nClicks--;
		}
		return data;
	}

	/** 
	 * User has clicked on a button.
	 * Tasks:
	 * 		- increment click counter
	 *  	- save click information 
	 *	  - build new array of pictures (get a new pair and add them, remove first pair)
	 *  	- animate pictures and draw new situation (also button values must change)
	 * @param string strTxt 		perfect | good | dontknow | noway | reportImgs
	 * @param string leftPicId		unique picture id of the left picture
	 * @param string rightPicId		unique picture id of the left picture
	 */
	this.onclickButton = function(strTxt, leftPicId, rightPicId) {
		this.echo("onclickButton("+strTxt+','+ leftPicId+','+ rightPicId+")");
		try {
			this.deactivateButtons(strTxt);
			if (strTxt == 'undo') {
				this.undoShowPreviousPicturePairAgain();

			} else if (this._fUndoMode == 1) {
				this.saveResult(strTxt, leftPicId, rightPicId);
				this.undoDone();

			} else if (strTxt == 'reportImgs') {
				this.reportImagesToAdmin(leftPicId, rightPicId);

			} else {
				if (this._arrPics[0]) this._arrLastEvaluatedPicturePair = this._arrPics[0];
				this._nClicks++;
				this.giveMsgAboutAverageVotation(); 
				this.fadeOutPics(strTxt, leftPicId, rightPicId); // move two picture away (the ones which where evaluated)
	
				this.saveResult(strTxt, leftPicId, rightPicId);
				this.buildNextPicArray();

				this.updateHtmlImages(); // zoom images one step nearer	
				this.fadeInPics(); // Two new pictures appear in the background. The last pair of this._arrPics[]
				this.updateHtmlInfos();
			}
			this.activateButtons();
			this.updateHtmlButtons();
			this.updateHtmlReportButton();
		} catch (e) {this.alertException(e);}		
	};

	this.deactivateButtons = function(strTxt) {
		this.echo("deactivateButtons()");
		try {
			this._animObj.deactivateButtons(strTxt);
		} catch (e) {this.alertException(e);}				
	}

	this.activateButtons = function() {
		this.echo("activateButtons()");
		try {
			this._animObj.activateButtons();
		} catch (e) {this.alertException(e);}				
	}

	this.updateHtmlButtons = function() {
		this.echo("updateHtmlButtons()");
		try {
			this._animObj.updateHtmlButtons();
		} catch (e) {this.alertException(e);}				
	}

	this.updateHtmlReportButton = function() {
		this.echo("updateHtmlReportButton()");
		try {
			this._animObj.updateHtmlReportButton();
		} catch (e) {this.alertException(e);}				
	}

	/** 
	 * Like Growl. Show in time displayed Messege. 
	 * @todo 	At the moment it is NOT neccessary to send these information to the server... 
	 */
	this.giveMsgAboutAverageVotation = function(strTxt, leftPicId, rightPicId) {
		this.echo("giveMsgAboutAverageVotation("+strTxt+','+ leftPicId+','+ rightPicId+")");
		try {
			this._animObj.giveMsgAboutAverageVotation(strTxt, leftPicId, rightPicId);
		} catch (e) {this.alertException(e);}		
	};

	/** 
	 * Save the button click somewhere. 
	 * @todo 	At the moment it is NOT neccessary to send these information to the server... 
	 */
	this.saveResult = function(strTxt, leftPicId, rightPicId) {
		this.echo("saveResult("+strTxt+','+ leftPicId+','+ rightPicId+")");
		try {
			var arrResult = {'r': strTxt, 'leftPicId': leftPicId, 'rightPicId': rightPicId, 'isSaved': 0};
			if (this._fUndoMode==1) {
	 		   this._arrClickResults[this._arrClickResults.length-1] = arrResult;
			} else {
			   this._arrClickResults[this._arrClickResults.length] = arrResult;
			}
			var result = this.json2str(this._arrClickResults);
			this.echo("this._arrClickResults = " + result);
		} catch (e) {this.alertException(e);}		
	};

	/**
	 * Modify this._arrPics
	 * - add a new picture pair 
	 * - remove old picture pair
	 */
	this.buildNextPicArray = function() {
		this.echo("buildNextPicArray()");
		try {
	
			// new pair of pictures
			this.echo("Now calling function this._functionForNextPicturePair() to get 2 new images");
			var arrNewPair = this._functionForNextPicturePair();

			// remove old picture pair (position 0) by creating a new array without position 0
			var arrNew = new Array();
			var i;
			for(i=1; i<this._arrPics.length; i++) {
				arrNew[i-1] = this._arrPics[i]; 
			}
			arrNew[i-1] = arrNewPair;
			this._arrPics = arrNew;
			this.echo("this._arrPics="+this.json2str(this._arrPics));

			for(i=1; i<this._arrPics.length; i++) {
				this._arrLeftImgIds[i-1] = this._arrLeftImgIds[i];
				this._arrRightImgIds[i-1] = this._arrRightImgIds[i];
			}
			this._arrLeftImgIds[i-1] = this.nextUniqueImgId();
			this._arrRightImgIds[i-1] = this.nextUniqueImgId();
	

		} catch (e) {this.alertException(e);}	
	};

	/**
	 * Convert array to string
	 * @param array obj		array or object. Both possible.
	 * @return string
	 */
	this.json2str = function(obj) {
		return JSON.stringify(obj);
	};

	/**
	 * dictionary.
	 * @return string 	translation
	 */
	this.d = function(str) {
		return this._arrDic[str]? this._arrDic[str]: 'translate:'+str;
	};

	/**
	 * @return array with 2 pictures. e.g.
	 *   { 'l': { 'url': '1.jpg', 'id': '1001', 'title': 'title-pic1', 'w': '200', 'h': '220'}
	 *	 'r': { 'url': 'A.jpg', 'id': '1005', 'title': 'title-artist1', 'w': '200', 'h': '220'} 
	 *   };
	 */
	this.getPicPair = function(i) {
		try {
			return this._arrPics[i];	 
		} catch (e) {this.alertException(e);}
	};

	/**
	 * @param numeric nPair 	0 = actuell to evaluate, 4 = appeared new (after 3 clicks to evalute) 
	 * @param string strLR 		'l' or 'r' 
	 * @return array e.g. { 'url': '1.jpg', 'id': '1001', 'title': 'title-pic1', 'w': '200', 'h': '220'};
	 */
	this.getPic = function (nPair, strLR) {
		try {
			if (strLR != 'l' && strLR != 'r') {this.alertException('getPic('+nPair+', '+ strLR+' = wrong) invalid');}
			var arrPair = this.getPicPair(nPair);
			return arrPair[strLR];				 
		} catch (e) {this.alertException(e);}
	}

	/**
	 * @param numeric i 		0 = actuell to evaluate, 4 = appeared new (after 3 clicks to evalute) 
	 * @param string strLR 		'l' or 'r' 
	 * @return string	id of html tag
	 */
	this.getHtmlImgId = function (i, strLR) {
		try {
			return strLR=='l'? this._arrLeftImgIds[i]: this._arrRightImgIds[i];
		} catch (e) {this.alertException(e);}
	}

	this.nextUniqueImgId = function() {
		return 'imgAG'+(this._uniqueImgId++);
	}

	this.echo = function(str) {
    if(window.console) {
      //window.console.log(str);
    }
	};

	this.alertException = function(str) {
		alert(str);
	};

	this.processReportImage = function(smg, LoR) {
		var datas = aliasObj.reportImagesToAdminSave();
		if(typeof datas === 'string') {
			$('#dialog').html(o(datas)).css('text-align' , 'center').dialog('open').animate({
				opacity: 1
			  }, 1000, function() {
				$(this).dialog("close");
			  }
			);
		} else {
			try {
				if(datas.reportImgs.length > aliasObj.DailogSetting.size) {
					aliasObj.calculateKey($('#textareaReportUsrMsg'), null);
					return;
				}
				// prepare Options Object
				//url=index.php?plugin=api&task=ajaxReportUsr&urlId=1006&urlAdd=StolenPicture

				var URL = {
					plugin : 'api',
					task : 'ajaxReportUsr',
					urlId : (LoR === 'l') ? datas.l : datas.r,
					urlAdd : window.encodeURI(datas.reportImgs),
					buildUrl : function () {
						var url = JSON.stringify(URL);
						url = url.replace(/":"/gi, '=').replace(/","/gi, '&').replace('{"', '').replace('"}', '');
						url = 'index.php?'+url;
						return url;
					}
				}
				var options = { 
					target:     '#divToUpdate', 
					url:        URL.buildUrl(), 
					success:    function() { 
						aliasObj.echo("Report sent....");
					} 
				}; 
				 
				// pass options to ajaxForm 
				$('#reportForm').ajaxSubmit(options);
				
			} catch (e) {aliasObj.alertException(e);}

			$('#dialog').html(o('reportOK')).css('text-align' , 'center').dialog('open').animate({
				opacity: 1
				}, 1200, function() {
					$(smg).dialog("close").find('#textareaReportUsrMsg').val('');
					$(this).dialog("close");
				}
			);
		}
	}

	this.calculateKey = function(elm, event) {
		var val = String($(elm).val());
		var l = val.length + 1;
		var info = $('span#keyInfo');
		if(l > aliasObj.DailogSetting.size) {
			if(event == null || event.keyCode != 8) {
				$('#dialog').html(o('maxSize')).css('text-align' , 'center').dialog('open').animate({
					opacity: 1
				  }, 800, function() {
					$(this).dialog("close");
				  }
				);
			}
			info.css('color', 'red');
		} else {
			info.css('color', 'gray');
		}
		info.html((aliasObj.DailogSetting.size - l) + '');
	}
	//	var w=600,h=350,id='divReportUsrMsg';  
	this.initDialog = function(w, h, id, size) {

		// Dialog message
		$('#dialog').dialog({
			autoOpen: false,
			width: 355,
			height: 90,
			buttons: {}
		});

		// Dailog report form
		if (!$('#'+id).length) {
			var css = {'font-size': '18px', 'font-family': 'courier'};
			var div = $('<div id="'+id+'" style="display:block"></div>');
			$('body').append(div);
			div.append($(
			"<textarea id=\"textareaReportUsrMsg\" class=\"text ui-widget-content ui-corner-all\" style=\"width:"+(w-40)+"px; height:"+(h-155)+"px\" placeholder=\""+o('reportUserWhy')+"\" title=\""+o('reportUserWhy')+"\">"+o('reportUserWhy')+"</textarea>").css(css).on('focus click', function() {if($(this).val() === o('reportUserWhy')){$(this).val('');}}).on('keydown', function(event){aliasObj.calculateKey($(this), event);})).append('<div style="height:14px; font-size:11px;color:gray;">Still <span id="keyInfo">'+size+'</span> characters possible.</div>');
			div.dialog(
				 {
					autoOpen: false,	width: w, height: h,
					show: { effect: 'drop', direction: "up" },
					hide: { effect: 'drop', direction: "down" },
					title: o('msgTitle'),
					buttons: [
						{
							text: o('reportLeft'),
							click: function() {
								aliasObj.processReportImage($(this), 'l');
							}
						},
						{
							text: o('cancelMsg'),
							click: function() { $('#'+id).dialog("close"); }
						}, {
							text: o('reportRight'),
							click: function() {
								aliasObj.processReportImage($(this), 'r');
							}
						}
					] 
				}
			);
		}
	}
	$(document).ready( function() {
		aliasObj.initDialog(aliasObj.DailogSetting.width, aliasObj.DailogSetting.height,
							aliasObj.DailogSetting.id, aliasObj.DailogSetting.size);
	});
};

