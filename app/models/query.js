var Class		= require('Class') ;
var _ 			= require('underscore') ;
var sqlite		= require('sqlite3').verbose();


/** 
 *
 * @class query
 */
var query = Class.create({

	/**
	 *
	 *
	 * @method initialize
	 * @param dp 
	 */
	initialize: function(db) {
		this._db = db ; 
	},

	/**
	 *
	 *
	 * @method data
	 * @param query
	 * @param callBack
	 */
	data: function(query,callBack){

		var db = new sqlite.Database( this._db );

		var result = [] ; 

		db.each(query , function(err, row) {
					


			result.push( row  );     		

  		});

  		db.close(function(){

  			if ( _.isFunction( callBack ) ){
				callBack( result );
			}

  		});

	},


});

module.exports = query ; 
