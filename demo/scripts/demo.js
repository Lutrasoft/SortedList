$(function(){
	$("#demo01").sortedList();
	$("#demo02").sortedList({
		sort : [
			{ desc : { data : "al-moved" } },
			function( el ){
				return !$(el).hasClass( "x");
			},
			{ asc : { data : "al-index" } }
		]
	});
	
	/* 
	==============
		Others
	==============
	*/
	prettyPrint();
});