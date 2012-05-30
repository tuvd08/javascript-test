///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// PHOTOSLICE 1.24 MADE BY SKID ( www.photoslice.net ) ////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// special thanks to quirksmode.com for js inspiration ////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

PhotoSliceVARS = {
	effects: 1, // [0, 1] turn off/on the visual effects
	typingEffect: 1, // [0, 1] turn off/on the photo caption typing effect
	framesPerSecond: 35, //effects' speed, the bigger the faster

	loadingImagePath: '/photoslice/loading.gif', //loading animation path [loading image from www.ajaxload.info]
	backgroundAlpha: 80, // [0 - 100] background transparency

	aboutButton: 0, // [0, 1] turn off/on the "about" button (default off, appreciated on)
	prevButton: 'prev', //previous button text
	nextButton: 'next', //next button text
	closeButton: 'close' //close button text
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// DO NOT EDIT BELOW ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

Array.prototype.pushValue = function (value) {
	this[this.length] = value;
	return this.length;
}

Array.prototype.popValue = function () {
	var value = this[this.length - 1]
	delete this[this.length - 1];
	this.length--;
	return value;
}

function PSOverlay () { }

PSOverlay.prototype = {
	Launch:function () {
		var bgDiv = document.createElement('div');
		bgDiv.setAttribute('id', 'PSbackground');
		bgDiv.className = 'PhotoSlice';
		bgDiv.style.position = 'absolute';
		bgDiv.style.zIndex = '99';
		bgDiv.style.left = bgDiv.style.top = bgDiv.style.width = bgDiv.style.height = '0px';
		this.divObj = bgDiv;
		
		PhotoSlice.SetAlpha(bgDiv, 10);
		document.body.appendChild(bgDiv);
		
		this.Stretch(1);
		PhotoSlice.GoToAlpha('PSbackground', PhotoSliceVARS.backgroundAlpha, 25, 'PhotoSlice.Setup();');
		
		PhotoSlice.ForbiddenObjects('hidden');
	},
	Stretch:function (first) {
		var sizeArray = PhotoSlice.GetPageSize();
		var scrollArray = PhotoSlice.GetPageScroll();

		this.divObj.style.width = (sizeArray[0] + scrollArray[0])+ 'px';
		if (first) this.divObj.style.height = sizeArray[1] + 'px';
		
		var self = this;
		window.setTimeout(function () { self.Stretch() }, 1000);
	},
	Close:function (last) {
		if (!PhotoSliceVARS.effects || last) {
			var bgDiv = this.divObj;
			document.body.removeChild(bgDiv);
			PhotoSlice.ForbiddenObjects('visible');
		} else {
			PhotoSlice.GoToAlpha('PSbackground', 0, 25, 'PhotoSlice.photoBg.Close(1);');
		}
	}
}

PhotoSlice = {
	version: '1.24',
	
	photoArray: new Array(),
	currentPhoto: -1,
	photoIsLoaded: 0,
	
	textIsTyping: 0,
	textBuffer: '',
	
	setEvents:function () {
		var links = document.getElementsByTagName('a');
		for (var i = 0; i < links.length; i++) {
			if (links[i].rel.substring(0, 10) == 'photoslice') {
				links[i].onclick = function () {
					if (!PhotoSlice.aObj) PhotoSlice.Start(this);
					return false;
				}
			}
		}
		this.imgPreloader = document.createElement('img');
		this.imgPreloader.setAttribute('src', PhotoSliceVARS.loadingImagePath);
		
		if (document.addEventListener) document.addEventListener("keyup", PhotoSlice.KeyUp, false);
    		else if (document.attachEvent) document.attachEvent("onkeyup", PhotoSlice.KeyUp);
   		else document.onkeyup = PhotoSlice.KeyUp;
	},
	KeyUp:function (e) {
   		if (!PhotoSlice.photoIsLoaded) return;
   		
   		if (!e) e = event;
   		var keyVal = null;
   		if (e.keyCode) keyVal = e.keyCode;
                else if (e.which) keyVal = e.which;
                else if (e.charCode) keyVal = e.charCode;
                else if (e.keyIdentifier) keyVal = e.keyIdentifier;
                else return;
   		
   		var prevValues = new Array('37', '80');
   		var nextValues = new Array('39', '78', '32');
   		var closeValues = new Array('8', '27', '67');
   		
   		var action = null;
   		for (var i = 0; i < prevValues.length; i++) if (prevValues[i] == keyVal) action = 'prev';
   		for (var i = 0; i < nextValues.length; i++) if (nextValues[i] == keyVal) action = 'next';
   		for (var i = 0; i < closeValues.length; i++) if (closeValues[i] == keyVal) action = 'close';
   		
   		switch (action) {
   			case 'prev': if (PhotoSlice.currentPhoto > 0) PhotoSlice.ChangePhoto(-1); break;
   			case 'next': if (PhotoSlice.currentPhoto < (PhotoSlice.photoArray.length - 1)) PhotoSlice.ChangePhoto(1); break;
   			case 'close': PhotoSlice.Close(); break;
   		}
	},
	Start:function (aObj) {
		this.aObj = aObj;
		this.photoIsLoaded = 0;
		
		bgObj = new PSOverlay();
		this.photoBg = bgObj;
		
		bgObj.Launch();
	},
	Setup:function () {
		while (this.photoArray.length) {
			this.photoArray.popValue();
		}
		var links = document.getElementsByTagName('a');
		var x = 0;
		for (var i = 0; i < links.length; i++) {
			if (links[i].rel == this.aObj.rel) {
				var tempArray = new Array(links[i].href, links[i].title);
				this.photoArray.pushValue(tempArray);
				if (links[i] == this.aObj) this.currentPhoto = x;
				x++;
			}
		}
		
		var stageDiv = document.createElement('div');
		stageDiv.setAttribute('id', 'PSstage');
		stageDiv.className = 'PhotoSlice';
		stageDiv.style.position = 'absolute';
		stageDiv.style.zIndex = '100';
		stageDiv.style.left = '0px';
		stageDiv.style.top = '0px';
		document.body.appendChild(stageDiv);
		this.stageDivObj = stageDiv;
		
		var stageDivReplica = document.createElement('div');
		stageDivReplica.setAttribute('id', 'PSstage-replica');
		stageDivReplica.style.position = 'absolute';
		stageDivReplica.style.zIndex = '99';
		stageDivReplica.style.left = '0px';
		stageDivReplica.style.top = '0px';
		document.body.appendChild(stageDivReplica);
		this.stageDivReplicaObj = stageDivReplica;
		
		var captionDiv = document.createElement('div');
		captionDiv.setAttribute('id', 'PScaption');
		captionDiv.className = 'PhotoSlice';
		captionDiv.style.position = 'absolute';
		captionDiv.style.zIndex = '101';
		captionDiv.style.left = '0px';
		captionDiv.style.top = '0px';
		captionDiv.style.width = '100%';
		this.SetAlpha(captionDiv, 0);
		document.body.appendChild(captionDiv);
		this.captionDivObj = captionDiv;
		
		var menuDiv = document.createElement('div');
		menuDiv.setAttribute('id', 'PSmenu');
		menuDiv.className = 'PhotoSlice';
		menuDiv.style.position = 'absolute';
		menuDiv.style.zIndex = '102';
		menuDiv.style.left = '0px';
		menuDiv.style.top = '0px';
		menuDiv.style.width = '100%';
		this.SetAlpha(menuDiv, 0);
		document.body.appendChild(menuDiv);
		this.menuDivObj = menuDiv;
		
		this.LoadPhoto();
	},
	LoadPhoto:function () {	
		var stageDiv = this.stageDivObj;
		stageDiv.innerHTML = '';
		stageDiv.style.left = '0px';
		stageDiv.style.top = this.GetPageScroll()[1] + 'px';
		stageDiv.style.width = this.GetPageSize()[2] + 'px';
		stageDiv.style.height = this.GetPageSize()[3] + 'px';
		stageDiv.style.background = "url('" + PhotoSliceVARS.loadingImagePath + "') no-repeat center center";
		this.SetAlpha(stageDiv, 100);

		stageDiv.onclick = function () {
			PhotoSlice.Close();
		}
		
		stageDiv.innerHTML = '';
		var loadingPhoto = document.createElement('img');
		loadingPhoto.setAttribute('id', 'loadingPhoto');
		loadingPhoto.onload = function () { PhotoSlice.WaitToLoad(this); }
		loadingPhoto.src = this.photoArray[this.currentPhoto][0];
		stageDiv.appendChild(loadingPhoto);
	},
	WaitToLoad:function (obj) {
		if (obj) this.photoObj = obj;
		
		if (this.photoObj.offsetWidth > 0) this.PhotoLoaded();
		else {
			var self = this;
			window.setTimeout(function () { self.WaitToLoad() }, 10);
		}
	},
	PhotoLoaded:function () {
		this.stageDivObj.style.background = 'none';
		
		this.stageDivObj.style.width = this.photoObj.offsetWidth + 'px';
		this.stageDivObj.style.height = this.photoObj.offsetHeight + 'px';
		
		this.ShowPanels();
		this.ArrangeStage(1);
		
		this.stageDivObj.onclick = function () { }
	
		this.photoBg.divObj.onclick = function () {
			PhotoSlice.Close();
		}
	
		if (!PhotoSliceVARS.effects) this.ShowPhoto ();
		else this.ShowPhotoEffect ();
	},
	ShowPhotoEffect:function () {
		var stageDivReplica = this.stageDivReplicaObj;
		
		stageDivReplica.style.left = (this.stageDivObj.offsetLeft - 50) + 'px';
		stageDivReplica.style.top = (this.stageDivObj.offsetTop - 50) + 'px';
		stageDivReplica.style.width = (this.stageDivObj.offsetWidth + 100) + 'px';
		stageDivReplica.style.height = (this.stageDivObj.offsetHeight + 100) + 'px';
		
		this.SetAlpha(this.stageDivObj, 0);
		this.SetAlpha(stageDivReplica, 0);
		
		this.photoObj.style.visibility = 'visible';
		this.GoToSizeAndAlpha('PSstage-replica', this.stageDivObj.offsetLeft, this.stageDivObj.offsetTop, this.stageDivObj.offsetWidth, this.stageDivObj.offsetHeight, 100, 15, 'PhotoSlice.GoToAlpha("PSstage", 100, 20, "PhotoSlice.SetAlpha(PhotoSlice.stageDivReplicaObj, 0); PhotoSlice.ShowPhoto();");');
	},
	ShowPhoto:function () {
		this.photoIsLoaded = 1;
		this.photoObj.style.visibility = 'visible';
		
		this.ArrangeStage();
		this.WriteText('PScomment', this.photoArray[this.currentPhoto][1], 0);
		
		if (this.currentPhoto < (this.photoArray.length - 1)) this.imgPreloader.setAttribute('src', this.photoArray[this.currentPhoto + 1][0]);
	
		if (this.photoArray.length > 1) {
			this.photoObj.onclick = function () {
				PhotoSlice.ChangePhoto(1);
			}
		}
	},
	ChangePhoto:function(dir) {
		if (this.photoIsLoaded) {
			this.photoIsLoaded = 0;
			this.currentPhoto += dir;
		
			if (this.currentPhoto >= this.photoArray.length) this.currentPhoto = 0;
		
			document.getElementById('PScomment').innerHTML = '';
		
			if (!PhotoSliceVARS.effects) this.LoadPhoto();
			else {
				this.SetAlpha(this.stageDivReplicaObj, 100);
				this.GoToAlpha('PSstage', 0, 20, 'PhotoSlice.GoToSizeAndAlpha("PSstage-replica", ' + (this.stageDivObj.offsetLeft + 50) + ', ' + (this.stageDivObj.offsetTop + 50) + ', ' + (this.stageDivObj.offsetWidth - 100) + ', ' + (this.stageDivObj.offsetHeight - 100) + ', 0, 20, "PhotoSlice.LoadPhoto();");');
			}
		}
	},
	ShowPanels:function () {
		var captionDiv = this.captionDivObj;
		captionDiv.innerHTML = '';
		
		var scrollArray = this.GetPageScroll();
		captionDiv.style.left = scrollArray[0] + 'px';
		captionDiv.style.top = scrollArray[1] + 'px';
		
		if (PhotoSliceVARS.aboutButton) {
			var aboutDiv = document.createElement('a');
			aboutDiv.setAttribute('id', 'PSabout');
			aboutDiv.href = '#about';
			aboutDiv.className = 'button';
			aboutDiv.innerHTML = '?';
			captionDiv.appendChild(aboutDiv);
			aboutDiv.onclick = function () { 
				PhotoSlice.WriteText('PScomment', 'PhotoSlice v' + PhotoSlice.version + ' - by skid. FREE to use and download at <a href=\'http://www.photoslice.net\' target=\'_blank\'>www.photoslice.net</a>.', 0);
				return false;
			}
		}
		
		var textDiv = document.createElement('p');
		textDiv.setAttribute('id', 'PScomment');
		captionDiv.appendChild(textDiv);
		
		this.SetAlpha(captionDiv, 95);
		
		var menuDiv = this.menuDivObj;
		menuDiv.innerHTML = '';
		
		var buttonsDiv = document.createElement('div');
		buttonsDiv.setAttribute('id', 'PSbuttons');
		menuDiv.appendChild(buttonsDiv);
		
		var prevDiv = document.createElement('a');
		prevDiv.setAttribute('id', 'PSaPrev');
		prevDiv.href = '#prev';
		prevDiv.className = 'button';
		prevDiv.innerHTML = PhotoSliceVARS.prevButton;
		buttonsDiv.appendChild(prevDiv);
		if (this.currentPhoto > 0) prevDiv.onclick = function () { PhotoSlice.ChangePhoto(-1); return false; }
		else prevDiv.className += ' disabled';
		
		var nextDiv = document.createElement('a');
		nextDiv.setAttribute('id', 'PSaNext');
		nextDiv.href = '#next';
		nextDiv.className = 'button';
		nextDiv.innerHTML = PhotoSliceVARS.nextButton;
		buttonsDiv.appendChild(nextDiv);
		if (this.currentPhoto < (this.photoArray.length - 1)) nextDiv.onclick = function () { PhotoSlice.ChangePhoto(1); return false; }
		else nextDiv.className += ' disabled';
		
		var closeDiv = document.createElement('a');
		closeDiv.setAttribute('id', 'PSaClose');
		closeDiv.href = '#close';
		closeDiv.className = 'button';
		closeDiv.innerHTML = PhotoSliceVARS.closeButton;
		buttonsDiv.appendChild(closeDiv);
		closeDiv.onclick = function () { PhotoSlice.Close(); return false; }
		
		this.SetAlpha(menuDiv, 95);
		
	},
	ArrangeStage:function (first) {
		if (first || this.photoIsLoaded) {
			var sizeArray = this.GetPageSize();
			var scrollArray = this.GetPageScroll();
			
			if (this.captionDivObj) {
				this.captionDivObj.style.left = scrollArray[0] + 'px';
				this.captionDivObj.style.top = scrollArray[1] + 'px';
				
			}
			if (this.menuDivObj) {
				if (this.menuDivObj.innerHTML) {
					this.menuDivObj.style.left = scrollArray[0] + 'px';
					this.menuDivObj.style.top = (sizeArray[3] + scrollArray[1] - this.menuDivObj.offsetHeight) + 'px';
				}
			}
			
			var currLeft = this.stageDivObj.offsetLeft;
			var currTop = this.stageDivObj.offsetTop;
			var nextLeft = (sizeArray[2] / 2 - (this.stageDivObj.offsetWidth / 2) + scrollArray[0]);
			var nextTop = (sizeArray[3] / 2 - (this.stageDivObj.offsetHeight / 2) + scrollArray[1]);
			
			var wDif = sizeArray[2] - ((sizeArray[2] - this.stageDivObj.offsetWidth) / 2);
			var hDif = sizeArray[3] - ((sizeArray[3] - this.stageDivObj.offsetHeight) / 2);
			
			var minTop = 0;
			if (this.captionDivObj) minTop = this.captionDivObj.offsetHeight;
			
			if ((this.stageDivObj.offsetWidth < sizeArray[2]) || (nextLeft - currLeft > wDif) || (currLeft - nextLeft > wDif) || first) {
				if (nextLeft < scrollArray[0]) this.stageDivObj.nextLeft = scrollArray[0];
				else if (nextLeft > (this.photoBg.divObj.offsetWidth - this.stageDivObj.offsetWidth) && this.photoBg.divObj.offsetWidth >= sizeArray[2]) this.stageDivObj.nextLeft = this.photoBg.divObj.offsetWidth - this.stageDivObj.offsetWidth;
				else this.stageDivObj.nextLeft = nextLeft;
			}
			if ((this.stageDivObj.offsetHeight < sizeArray[3]) || (nextTop - currTop > hDif) || (currTop - nextTop > hDif) || first) {
				if (nextTop < (minTop + scrollArray[1]))  this.stageDivObj.nextTop = minTop + scrollArray[1];
				else if (nextTop > (this.photoBg.divObj.offsetHeight - this.stageDivObj.offsetHeight) && this.photoBg.divObj.offsetHeight >= sizeArray[3]) this.stageDivObj.nextTop = this.photoBg.divObj.offsetHeight - this.stageDivObj.offsetHeight;
				else this.stageDivObj.nextTop = nextTop;
			}
			
			this.stageDivObj.style.left = this.stageDivObj.nextLeft + 'px';
			this.stageDivObj.style.top = this.stageDivObj.nextTop + 'px';
			
			if (this.stageDivReplicaObj) {
				this.stageDivReplicaObj.style.left = this.stageDivObj.style.left;
				this.stageDivReplicaObj.style.top = this.stageDivObj.style.top;
			}
			if (!first) {
				var self = this;
				window.setTimeout(function () { self.ArrangeStage() }, 500);
			}
		}
	},
	Close:function (last) {
		if (this.captionDivObj) { document.body.removeChild(this.captionDivObj); this.captionDivObj = null; }
		if (this.menuDivObj) { document.body.removeChild(this.menuDivObj); this.menuDivObj = null; }
		this.aObj = null;
		
		if (!PhotoSliceVARS.effects || last || !this.photoIsLoaded) {
			if (this.stageDivReplicaObj) { document.body.removeChild(this.stageDivReplicaObj); this.stageDivReplicaObj = null; }
			if (this.stageDivObj) { document.body.removeChild(this.stageDivObj); this.stageDivObj = null; }
			this.photoBg.Close();
		} else {
			this.SetAlpha(this.stageDivReplicaObj, 100);
			this.GoToAlpha('PSstage', 0, 20, 'PhotoSlice.GoToSizeAndAlpha("PSstage-replica", ' + (this.stageDivObj.offsetLeft + 50) + ', ' + (this.stageDivObj.offsetTop + 50) + ', ' + (this.stageDivObj.offsetWidth - 100) + ', ' + (this.stageDivObj.offsetHeight - 100) + ', 0, 20, "PhotoSlice.Close(1);");');
		}
		this.photoIsLoaded = 0;
	},
	ForbiddenObjects:function (state) {
		var selects = document.getElementsByTagName('select');
		for (i = 0; i != selects.length; i++) {
			selects[i].style.visibility = state;
		}
		var flashObjects = document.getElementsByTagName('object');
		for (i = 0; i < flashObjects.length; i++) {
			flashObjects[i].style.visibility = state;
		}
		var flashEmbeds = document.getElementsByTagName('embed');
		for (i = 0; i < flashEmbeds.length; i++) {
			flashEmbeds[i].style.visibility = state;
		}
	},
	GetPageScroll:function () {
		var xScroll = 0, yScroll = 0;
    
		if (typeof(window.pageYOffset) == 'number') {
			xScroll = window.pageYOffset;
			yScroll = window.pageXOffset;
		} else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
			xScroll = document.body.scrollTop;
			yScroll = document.body.scrollLeft;
		} else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
			xScroll = document.documentElement.scrollTop;
			yScroll = document.documentElement.scrollLeft;
		}

		var returnArray = Array(yScroll, xScroll);
		return returnArray;
	},
	GetPageSize:function () {
	
		var xPage, yPage;
		
		if (window.innerHeight && window.scrollMaxY) {
			xPage = window.innerWidth + window.scrollMaxX;
			yPage = window.innerHeight + window.scrollMaxY;
		} else if (document.body.scrollHeight > document.body.offsetHeight) {
			xPage = document.body.scrollWidth;
			yPage = document.body.scrollHeight;
		} else { 
			xPage = document.body.offsetWidth;
			yPage = document.body.offsetHeight;
		}
	
		var windowWidth, windowHeight;

		if (self.innerHeight) {
			if (document.documentElement.clientWidth) windowWidth = document.documentElement.clientWidth; 
			else windowWidth = window.innerWidth;
			if (document.documentElement.clientHeight == (window.innerHeight - 16)) windowHeight = document.documentElement.clientHeight;
			else windowHeight = window.innerHeight;
		} else if (document.documentElement && document.documentElement.clientHeight) {
			windowWidth = document.documentElement.clientWidth;
			windowHeight = document.documentElement.clientHeight;
		} else if (document.body) {
			windowWidth = document.body.clientWidth;
			windowHeight = document.body.clientHeight;
		}	
		
		pageWidth = windowWidth;
	
		if (windowHeight < yPage) pageHeight = yPage;
		else pageHeight = windowHeight;

		var returnArray = Array(pageWidth, pageHeight, windowWidth, windowHeight);
		return returnArray;
	},
	SetAlpha:function (obj, alpha) {  
		obj.style.filter = 'alpha(opacity: ' + alpha + ')';
		obj.style.MozOpacity = alpha / 100;
    		obj.style.KhtmlOpacity = alpha / 100;
		obj.style.opacity = alpha / 100;
	},
	GoToAlpha:function (objName, targetAlpha, speed, nextFunction) {
		if (obj = document.getElementById(objName)) {
			var currAlpha = obj.style.opacity * 100;
			var dir = 1;
			if (targetAlpha < currAlpha) dir = -1;

			currAlpha += speed * dir;
			if (PhotoSliceVARS.effects && ((dir == 1 && currAlpha < targetAlpha) || (dir == -1 && currAlpha > targetAlpha))) {
				this.SetAlpha (obj, Math.round(currAlpha));
				setTimeout("PhotoSlice.GoToAlpha('" + objName + "', " + targetAlpha + ", " + speed + ", '" + nextFunction + "')", 1000 / PhotoSliceVARS.framesPerSecond);
			} else {
				this.SetAlpha (obj, Math.round(targetAlpha));
				if (nextFunction) setTimeout(nextFunction, 0);
			}
		}
	},
	GoToSizeAndAlpha:function (objName, targetX, targetY, targetWidth, targetHeight, targetAlpha, speed, nextFunction) {
		if (obj = document.getElementById(objName)) {
			var currentWidth = obj.offsetWidth;
			var currentHeight = obj.offsetHeight;
			var currentX = obj.style.left.substring(0, obj.style.left.length - 2) * 1;
			var currentY = obj.style.top.substring(0, obj.style.top.length - 2) * 1;
			var currentAlpha = obj.style.opacity * 100;
		
			var widthDif = (targetWidth - currentWidth);
			var heightDif = (targetHeight - currentHeight);
			var xDif = (targetX - currentX);
			var yDif = (targetY - currentY);
			var alphaDif = (targetAlpha - currentAlpha);
		
			var totalDif = 0;
			if (widthDif > 0) totalDif += widthDif;
			else totalDif -= widthDif;
			if (heightDif > 0) totalDif += heightDif;
			else totalDif -= heightDif;
	
			var widthStep = speed * (2 * widthDif / totalDif);
			var heightStep = speed * (2 * heightDif / totalDif);
			var xStep = widthStep * (xDif / widthDif);
			var yStep = heightStep * (yDif / heightDif);
			var alphaStep = widthStep * (alphaDif / widthDif);
		
			var nextWidth = currentWidth + widthStep;
			var nextHeight = currentHeight + heightStep;
			var nextX = currentX + xStep;
			var nextY = currentY + yStep;
			var nextAlpha = currentAlpha + alphaStep;
		
			if (PhotoSliceVARS.effects && (((currentWidth < targetWidth && nextWidth < targetWidth) || (currentWidth > targetWidth && nextWidth > targetWidth)) && ((currentHeight < targetHeight && nextHeight < targetHeight) || (currentHeight > targetHeight && nextHeight > targetHeight)))) {

    				obj.style.width = nextWidth + 'px';
    				obj.style.height = nextHeight + 'px';
    				obj.style.left = nextX + 'px';
    				obj.style.top = nextY + 'px';
    				this.SetAlpha (obj, nextAlpha);

				setTimeout("PhotoSlice.GoToSizeAndAlpha('" + objName + "', " + targetX + ", " + targetY + ", " + targetWidth + ", " + targetHeight + ", " + targetAlpha + ", " + speed + ", '" + nextFunction + "')", 1000 / PhotoSliceVARS.framesPerSecond);
	
			} else {
				obj.style.width = targetWidth + 'px';
    				obj.style.height = targetHeight + 'px';
    				obj.style.left = targetX + 'px';
    				obj.style.top = targetY + 'px';
    				this.SetAlpha (obj, targetAlpha);
    	
    				if (nextFunction) setTimeout(nextFunction, 0);
			}
		}
	},
	WriteText:function (objName, fullString, index) {
		if (!index && this.textIsTyping) return;
		this.textIsTyping = 1;
		if ((obj = document.getElementById(objName)) && PhotoSlice.photoIsLoaded) {
			if (PhotoSliceVARS.typingEffect) {
				if (fullString.substr(index, 1) == '<') {
					index++;
					while (fullString.substr(index, 1) != '>' && index < fullString.length) index++;
				}
				index++;
				obj.innerHTML = this.textBuffer = fullString.substr(0, index);
					
				if (index <= fullString.length) setTimeout('PhotoSlice.WriteText("' + objName + '", "' + fullString + '", ' + index + ')', 1000 / PhotoSliceVARS.framesPerSecond);
			} else obj.innerHTML = this.textBuffer = fullString;
		} else {
			this.textBuffer = fullString = '';
			if (obj) obj.innerHTML = this.textBuffer;
		}
		if (fullString == this.textBuffer) this.textIsTyping = 0;
	}
};

var existingLoadEvent = window.onload || function () {};
window.onload = function () {
    existingLoadEvent();
    PhotoSlice.setEvents();
}