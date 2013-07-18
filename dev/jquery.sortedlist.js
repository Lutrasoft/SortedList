/*!
* SortedList - jQuery Plugin
* SortedList is a jQuery plugin to sort list the way you want
*
* Examples and documentation at: https://github.com/Lutrasoft/SortedList
*
* Copyright (c) 2010-2013 - Lutrasoft
*
* Version: 0.0.3
* Requires: jQuery v1.3.4+
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/
function SortedList( domUL, s )
{
    var _me = this,
        _ul = $( domUL);
		
	_me.settings = s;

    _me.init = function () {
        // Set LI index
        _ul.children( _me.settings.selector ).each( function () {
			var t = $( this );
            t.data( "al-index", t.index() );
        });
		
		// Order now
		_me.order();
    }

    _me.order = function () {
        _ul.append(
            _ul.find( _me.settings.selector ).sort(function (a, b) {
				var i, r;
                for( i=0 ; i<_me.settings.sort.length ; i++ )
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
		var item = _me.settings.sort[ index ], k, r, ar, br;
		switch( typeof item )
		{
			case "function":
				ar = item( a );
				br = item( b );
				
				return typeof ar == "object" ? _me.handle( ar.data, br.data, ar.order  ) : _me.handle( ar, br  );
				
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
		selector : "li",
		sort : [
			{ asc : { data : "al-index" } }
		]
	}
};

$.fn.sortedList = function( settings, value ){
    return this.each( function(){
		var _this = this,
			_$this = $( _this ),
			t, sl;
			
		if( _$this.data( "al" ) )
		{
			sl = _$this.data("al");
			if( value )
			{
				sl.settings[ settings ] = value;
			}
			else
			{
				// Call function or return setting
				t = sl[ settings ];
				return typeof t == "function" ? t( ) : sl.settings[ settings ];
			}
		}
		else
		{
			_$this.data( "al", new SortedList( _this, $.extend( { }, $.sortedList.defaults, settings ) ) );
		}
    } );
};