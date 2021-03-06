var Class		= require('Class') ;
var _ 			= require('underscore') ;
var sqlite		= require('sqlite3').verbose();
var Q			= require('q');
var fs 			= require('fs');
var query		= require('./query');

/** 
 *
 * @class schema
 */
var schema = Class.create({

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
	 * @method getTables
	 * @return promise
	 */
	getTables: function(){
		
  		var db = new query( this._db );
  		return db.data('SELECT name FROM sqlite_master WHERE type="table"');

	},
	/**
	 * @method getIndexes
	 * @return promise
	 */
	getIndexes: function(){

  		var db = new query( this._db );
  		return db.data('SELECT name FROM sqlite_master WHERE type="index" ');

	},
	/**
	 *
	 *
	 * @method getColumns
	 * @param tableName
	 * @return promise
	 */
	getColumns: function(tableName ){

  		var db = new query( this._db );
  		return db.data('PRAGMA table_info(`'+tableName+'`)');

	},
	/**
	 * @method toSql
	 * @return promise
	 */
	toSql: function(){
		var deferred = Q.defer() ; 
		if (fs.existsSync( this._db ) === false ) { 				
			deferred.reject('File not found') ; 
		} else {
			var db = new sqlite.Database( this._db );
			var result = [] ; 
			db.each('SELECT sql FROM sqlite_master ', function(err, row) {	
				if ( err ){
					deferred.reject( err ) ; 
				} else {
					result.push( row.sql );
				}
	  		});
	  		db.close(function(){
				deferred.resolve(result) ; 			
	  		});
	  	}
  		return deferred.promise ; 
	}

});

module.exports = schema ; 