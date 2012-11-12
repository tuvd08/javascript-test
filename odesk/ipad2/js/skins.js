$(document).ready(function() { 
	$('#patterns div').click(function() {
		$('#patterns div').removeClass();
		$(this).addClass("selected");
		if ($(this).attr('id') == 'pat_1') {
			$('#body_pat').css('background-image', 'url(images/patterns/pattern_1.png)');
		};
		if ($(this).attr('id') == 'pat_2') {
			$('#body_pat').css('background-image', 'url(images/patterns/pattern_2.png)');
		};
		if ($(this).attr('id') == 'pat_3') {
			$('#body_pat').css('background-image', 'url(images/patterns/pattern_3.png)');
		};
		if ($(this).attr('id') == 'pat_4') {
			$('#body_pat').css('background-image', 'url(images/patterns/pattern_4.png)');
		};
		if ($(this).attr('id') == 'pat_5') {
			$('#body_pat').css('background-image', 'url(images/patterns/pattern_5.png)');
		};
		
	});
	
	$('#but_expand').click(function() {
		$('#toolsHolder').stop().animate({ width: 49, height: 423 }, 200);
		$(this).css('display','none');
		$('#but_collapse').css('display','block');
	});
	
	$('#but_collapse').click(function() {
		$('#toolsHolder').stop().animate({ width: 0, height: 0 }, 200);
		$(this).css('display','none');
		$('#but_expand').css('display','block');
	});
	
	$('#palette div').click(function() {
		$('#palette div').removeClass();
		$(this).addClass('selected');
		$("#body_pat").removeClass();
		$("#body_pat").addClass($(this).attr('id'));
	});
});