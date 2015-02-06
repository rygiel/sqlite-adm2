var Class		= require('Class') ;
var _ 			= require('underscore') ;
var sqlite		= require('sqlite3').verbose();
var Q			= require('q');
var fs 			= require('fs');
/** 
 * @class query
 */
var query = Class.create({

	/**
	 * @method initialize
	 * @param dp 
	 */
	initialize: function(db) {
		this._db = db ; 
	},
	/**
	 * @method data
	 * @param query
	 * @return promise
	 */
	data: function(query ){

		var deferred = Q.defer() ; 
		if (fs.existsSync( this._db ) === false ) { 		
			deferred.reject('File not found') ; 
		} else {
			var db = new sqlite.Database( this._db );
			var result = [] ; 
			db.each(query , function(err, row) {
				if ( err ){
					deferred.reject('File not found') ; 
				} else {
					result.push( row  );     		
				}
	  		});
	  		db.close(function(){
	  			deferred.resolve(result) ; 
	  		});
	  	}
 		return deferred.promise ; 

	}

});

module.exports = query ; 
