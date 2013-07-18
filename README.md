# jQuery SortedList (Javascript)

SortedList is a jQuery plugin to sort a list of DOM elements the way you want. Think about LI, TR, OPTION and even DIVS. You can see a [demo](http://www.lutrasoft.nl/jQuery/sortedlist/) at the website.

## Example code
### Sorting with table rows
Click on the table header to sort on that column, a second click makes is switch between ASC / DESC.<br />
As you can see, you can easily update the sort settings, handle the ASC / DESC and sort the elements exactly the way you want.<br />

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
		// Switch between ASC / DESC
		if( newColumnIndex == columnIndex ){
			order = !order;
		} else {
			columnIndex = newColumnIndex;
		}
		
		// Reorder
		$( "tbody" ).sortedList( "order" );
	} );
	
### Custom sorting

Sort on checked and second on the class 'x' ( style bold and red ) and third on the index.
		
	$("#demo02").sortedList({
		sort : [
			// Sort on moved or not DESC
			//	Like you see data, you can use attr or whatever jQuery getter you want
			//	it calls functions like: a.data( "moved" ), a.attr( "moved" ), etc
			{ desc : { data : "moved" } },
			
			// Sort on the class "x"
			function( el ){
				return !$(el).hasClass( "x");
			},
			
			// Sort on the data index ASC (al-index is internal var for the initial index of an item)
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

## How to use

Initializing:

	$( "SELECTOR" ).sortedList( SETTINGS );

GET settings:

	$( "SELECTOR" ).sortedList( KEY );

SET settings:

	$( "SELECTOR" ).sortedList( KEY, VALUE );

CALL internal functions:

	$( "SELECTOR" ).sortedList( FUNCTIONNAME );

## Related plugins

* [jQuery Fancyform](http://www.lutrasoft.nl/jQuery/fancyform/)

#Ideas

* Animate the updated items in the selection

#Licence

Fancyform dual licensed under the [MIT](http://opensource.org/licenses/mit-license.php) and [GPL](http://www.gnu.org/licenses/gpl.html) licenses.
