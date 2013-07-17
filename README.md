# jQuery SortedList (Javascript)

SortedList is a jQuery plugin to sort list the way you want.

## Example code

Example below is sorted first the checked items and than the initial index. Default it uses a checkbox to sort.

	<ul id="demo01">
		<li><input type="checkbox" /> A</li>
		<li><input type="checkbox" /> B</li>
		<li><input type="checkbox" /> C</li>
		<li><input type="checkbox" /> D</li>
		<li><input type="checkbox" /> E</li>
		<li><input type="checkbox" /> F</li>
		<li><input type="checkbox" /> G</li>
		<li><input type="checkbox" /> H</li>
	</ul>
	
	$("#demo01").sortedList();
	
###Custom sorting

Sort on checked and second on the class 'x' (style bold and red) and third on the index.

	<ul id="demo02">
		<li><input type="checkbox" /> A</li>
		<li><input type="checkbox" /> B</li>
		<li class="x"><input type="checkbox" /> C</li>
		<li class="x"><input type="checkbox" /> D</li>
		<li><input type="checkbox" /> E</li>
		<li><input type="checkbox" /> F</li>
		<li><input type="checkbox" /> G</li>
		<li><input type="checkbox" /> H</li>
	</ul>
	
	$("#demo02").sortedList({
		sort : [
			// Sort on moved or not DESC
			//	Like you see data, you can use attr or whatever jQuery getter you want
			//	it calls functions like: a.data( "al-moved" ), a.attr( "al-moved" ), etc
			{ desc : { data : "al-moved" } },
			
			// Sort on the class "x"
			function( el ){
				return !$(el).hasClass( "x");
			},
			
			// Sort on the data index ASC
			{ asc : { data : "al-index" } }
		]
	});

#Ideas

* Animate the updated items in the selection

#Licence

Fancyform dual licensed under the [MIT](http://opensource.org/licenses/mit-license.php) and [GPL](http://www.gnu.org/licenses/gpl.html) licenses.