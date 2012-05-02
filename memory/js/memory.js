// the default images for play game.
var images = [
	'imgs/image4.png',
	'imgs/image3.png',
	'imgs/image8.png',
	'imgs/image1.png',
	'imgs/image6.png',
	'imgs/image2.png',
	'imgs/image5.png',
	'imgs/image7.png'
];

if(typeof extend == "undefined") {
	var extend = [];
}

var blank = 'imgs/blank.png';


var pics = [], map, user, temparray, clickarray, ticket, sec, min, str, id, oktoclick, finished, stt = false;

function initImage() {
	var j = 0, exist = [];
	for (var i = 0; i < 8; i++) {
		pics[i] = new Image();
		while(true) {
			j = Math.floor((Math.random()*images.length));
			if(exist.indexOf(String(j)) < 0){
				pics[i].src = images[j]; // Preload images
				exist[i] = String(j);
				break;
			}
		}
	}
};

// extand by function
$('#extend').click(function() {
	images = images.concat(extend);
	$(this).hide();
});

/*
// auto extend 
(function extendImg() {
	images = images.concat(extend);
})();

*/

$('#memory img').click(function () {
	var but = this.id.slice(3);
	if (oktoclick) {
		oktoclick = false;
		$('#img' + but).attr('src', pics[map[but] - 1].src);
		if (ctr === 0) {
			ctr++;
			clickarray[0] = but;
			oktoclick = true;
		} else {
			clickarray[1] = but;
			ctr = 0;
			setTimeout(function () {
				if (clickarray[0] === clickarray[1] && !user[clickarray[0]]) {
					$('#img' + clickarray[0]).attr('src', blank);
					oktoclick = true;
				} else {
					if (map[clickarray[0]] !== map[clickarray[1]]) {
						if (user[clickarray[0]] === 0) {
							$('#img' + clickarray[0]).attr('src', blank);
						}
						if (user[clickarray[1]] === 0) {
							$('#img' + clickarray[1]).attr('src', blank);
						}
					}
					if (map[clickarray[0]] === map[clickarray[1]]) {
						if (user[clickarray[0]] === 0 && user[clickarray[1]] === 0) {
							finished++;
						}
						user[clickarray[0]] = user[clickarray[1]] = 1;
					}
					if (finished >= 8) {
						stt = false;
						if(confirm('  You did it in ' + $('#memorybutton').text() + '!' + '\n\nYou want to play again ?')) {
							initMemoryGame();
						} else {
							changeStt('Play game...', 'memorybutton');
						}
					} else {
						oktoclick = true;
					}
				}
			}, 600);
		}
	}
});

function changeStt(stt, css) {
	$('#memorybutton')
	.removeClass('memorybutton reset')
	.removeClass('memorybutton timer')
	.addClass('memorybutton '+css).html(stt);
}

function initMemoryGame() {
	stt = true;
	initImage();
	map = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
	user = [];
	temparray = [];
	clickarray = [0, 0];
	ticker = sec = min = ctr = finished = 0;
	oktoclick = true;

	clearInterval(id);
	for (var i = 0; i < 16; i++) {
		user[i] = 0;
	}

	changeStt('Resetting game table...', 'reset');

	// Scramble grid
	for (var z = 0; z < 5; z++) {
		for (var x = 0; x < 16; x++) {
			temparray[0] = Math.floor(Math.random() * 16);
			temparray[1] = map[temparray[0]];
			temparray[2] = map[x];
			map[x] = temparray[1];
			map[temparray[0]] = temparray[2];
		}
	}

	// Ticker
	id = setInterval(function () {
		if(!stt) return;
		sec = (ticker % 60);
		if (sec < 10) {
			sec = '0' + sec;
		}
		changeStt((Math.floor(ticker / 60) + ':' + sec), 'memorybutton timer');
		ticker++;
	}, 1000);

	for (i = 0; i < 16; i++) {
		$('#img' + i).attr('src', blank);
	}
}

$('#memorybutton').click(function() {
	initMemoryGame();
});
//initMemoryGame();

