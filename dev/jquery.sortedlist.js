/*!
* SortedList - jQuery Plugin
* SortedList is a jQuery plugin to sort list the way you want
*
* Examples and documentation at: https://github.com/Lutrasoft/SortedList
*
* Copyright (c) 2010-2013 - Lutrasoft
*
* Version: 0.0.1
* Requires: jQuery v1.3.4+
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/
function SortedList( domUL, s )
{
    var _me = this,
        _ul = $( domUL),
        _settings = s;

    _me.init = function () {
        // Set LI index
        _ul.children( "li" ).each( function () {
			var t = $( this );
            t.data( "al-index", t.index() );
            t.data( "al-moved", 0 );
        });

        // When checkbox change, move to top or back into position
        _ul.find( "input[type=checkbox]" ).change( $.proxy( _me.itemChange, this ) );
		
		// Order now
		_me.order();
    }
    _me.itemChange = function ( e ) {
        var cb = $( e.target )
        cb.closest( "li" ).data( "al-moved", cb.is( ":checked" ) );
        _me.order( );
    }

    _me.order = function () {
        _ul.append(
            _ul.children("li").sort(function (a, b) {
				var i, r;
                for( i=0 ; i<_settings.sort.length ; i++ )
				{
					r = _me.handleSort( i, $(a), $(b) )
					if( r ) { return r; }
				}
				
				return 0;
            })
        );
    }
	
	_me.handleSort = function( index, a, b )
	{
		var item = _settings.sort[ index ], k, r;
		switch( typeof item )
		{
			case "function":
				return _me.handle( item( a ), item( b ) );
				
			case "object":
				var keys = _me.getKeys( item ),
					sort = keys[ 0 ],
					item = item[ sort ];
				for( k in item )
				{
					if( typeof a[ k ] == "function" )
					{
						// javascrip
						r = _me.handle( a[ k ]( item[ k ] ), b[ k ]( item[ k ] ), sort );						
						if( r ){ return r; }
					}
				}
				break;
		}
	}
	
	_me.handle = function( a, b, s )
	{
		return (a == b ? 0 : a > b ? -1 : 1) * (s == "desc" ? 1 : -1);
	}

	_me.getKeys = function( o )
	{	
		var k = [], i;
		for( i in o ) k.push( i );
		return k;
	}
    _me.init();
}
$.sortedList = {
	defaults : {
		sort : [
			{ desc : { data : "al-moved" } },
			{ asc : { data : "al-index" } }
		]
	}
};
$.fn.sortedList = function( settings ){
    return this.each( function(){
        new SortedList( this, $.extend( { }, $.sortedList.defaults, settings ) );
    } );
};