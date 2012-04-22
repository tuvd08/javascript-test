var myCounter = null;
var timerId = null;
var speedFrom = 500;
var speedTo = 800;
var find = function(id){
	return document.getElementById(id);
};
var itemList = {
	0 : {
		previewBackground : './bg/bg6.jpg',
		layoutIndex : 0
	},
	
	1 : {
		previewBackground : './bg/bg5.jpg',
		layoutIndex : 0
	},
	
	2 : {
		layoutIndex : 0,
		previewBackground : './bg/bg5.jpg'
	},
	
	3 : {
		layoutIndex : 1,
		previewBackground : './bg/bg6.jpg'
	},
	
	4 : {
		layoutIndex : 1,
		previewBackground : './bg/bg3.jpg'
	},
	
	5 : {
		layoutIndex : 1,
		previewBackground : './bg/bg6.jpg'
	},
	
	6 : {
		layoutIndex : 1,
		previewBackground : './bg/bg5.jpg'
	},
	
	7 : {
		layoutIndex : 1,
		previewBackground : './bg/bg5.jpg'
	}
};

var currentExampleId = 0;
function showExample(inx){
	window.location = '#' + 'usage_examples';
	showItem(inx);
	return false;
}

function showItem(inx){
	currentExampleId = inx;
	var temp = "";
	var i = 0;
	var showDescription = true;
	var showCustom = true;
	if (find("item_"+inx)){
		temp = find("item_"+inx).innerHTML;
	} else {
		temp = find("item_default").innerHTML;
	}
	while (temp.indexOf("name=\"counter\"") != -1){
		i++;
		temp = temp.replace("name=\"counter\"", "id=\"counter_"+ inx + "_" + i +"\"");
	}
	find("preview_item").innerHTML = temp;
	if (timerId != null){
		clearInterval(timerId);
		clearTimeout(timerId);
	}
	
	if (myCounter){
		if (myCounter[0]){
			for (i = 0; i < myCounter.length; i++){
				if (myCounter[i].intervalTimerId != null)
					clearInterval(myCounter[i].intervalTimerId);
				if (myCounter[i].timeoutTimerId != null)
					clearTimeout(myCounter[i].timeoutTimerId);
			}
		}
		
		if (myCounter.intervalTimerId != null)
			clearInterval(myCounter.intervalTimerId);
		if (myCounter.timeoutTimerId != null)
			clearTimeout(myCounter.timeoutTimerId);
		
	}
	delete myCounter;
	if (find("item_description_"+inx) && find("item_description_"+inx).innerHTML != ""){		
		find("preview_description").innerHTML = find("item_description_"+inx).innerHTML;
		find("preview_description").style.display = "";
		showDescription = true;
	} else {
		find("preview_description").style.display = "none";
		showDescription = false;
	}
	var item = itemList[inx];
	eval("example_"+ inx +"()");
	if (showCustom){
		if (find("animation_style"))
			find("animation_style").value = myCounter.animationStyle;
		if (find("animation_speed"))
			find("animation_speed").value = myCounter.animationSpeed;
		if (find("animation_smooth"))
			find("animation_smooth").value = myCounter.animationSmoothness;
	}
}

function example_0(){
	myCounter = new Counter("counter_0_1", {
		digitsNumber : 5,
		direction : Counter.ScrollDirection.Downwards, 
		characterSet : Counter.DefaultCharacterSets.numericUp,
		charsImageUrl : "./css/images/numeric_up_blackbg.png",
		markerImageUrl : "./css/images/marker.png",
	});
	myCounter.value = 10000;
	timerId = window.setInterval("myCounter.setValue(parseInt(myCounter.value) - 1, speedFrom, 3999);", speedTo); 
}
