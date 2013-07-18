$(function(){
	// Demo 01
	$("#demo01").sortedList({
		sort : [
			{ desc : { data : "moved" } },
			{ asc : { data : "al-index" } }
		]
	});	
	
	$("#demo02").sortedList({
		sort : [
			{ desc : { data : "moved" } },
			function( el ){
				// Directly return the data, withouth passing the order default (ASC)
				return !$(el).hasClass( "x");
			},
			{ asc : { data : "al-index" } }
		]
	});
	
	// When checkbox change, move to top or back into position
	$("#demo01, #demo02")
		.find( "input[type=checkbox]" )
			.each(function(){
				// Initial set moved to 0 because not moved
				$( this ).parent().data( "moved", 0 );
			})
			.change( function(){
				// Set moved, so we can sort on it
				$( this ).parent().data( "moved", $(this).is(":checked") );
				
				// Call function to reorder
				$("#demo01, #demo02").sortedList( "order" )
			});
			
	// Table
	var columnIndex = order = 0;
	
	$( "tbody" ).sortedList({
		selector : "tr",
		sort : [
			function( el )
			{
				// Return an object, so you can pass the order and data to sort with
				return { 
					order : order ? "desc" : "asc" , 
					data : $( el ).find( "td" ).eq( columnIndex ).text( )
				};
			}
		]
	});
	
	$( "thead th" ).click( function(){
		var newColumnIndex = $( this ).index( );
		if( newColumnIndex == columnIndex )
		{
			order = !order;
		}
		else
		{
			columnIndex = newColumnIndex;
		}
		$( "tbody" ).sortedList( "order" );
	} );
	
	/* 
	==============
		Others
	==============
	*/
	prettyPrint();
});