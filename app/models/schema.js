var Class		= require('Class') ;
var _ 			= require('underscore') ;
var sqlite		= require('sqlite3').verbose();
var Q			= require('q');
var fs 			= require('fs');

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
	 *
	 *
	 * @method getTables
	 * @param callBack
	 */
	getTables: function(){

		var deferred = Q.defer() ; 

		if (fs.existsSync( this._db ) === false ) { 
			
			deferred.reject('File not found') ; 

		} else {

			var db = new sqlite.Database( this._db );
			var result = [] ; 
			db.each('SELECT name FROM sqlite_master WHERE type="table"', function(err, row) {


				if ( err ){

					deferred.reject( err ) ; 

				} else { 

					result.push( row.name );     		
				}
	  		});

	  		db.close(function(){

	  			deferred.resolve(result) ; 

	  		});


  		}

  		return deferred.promise ; 

	},
	/**
	 *
	 *
	 * @method getIndexes
	 * @param callBack
	 */
	getIndexes: function(callBack){
		var db = new sqlite.Database( this._db );

		var result = [] ; 

		db.each('SELECT name FROM sqlite_master WHERE type="index" ', function(err, row) {
			result.push( row.name );	
  		});

  		db.close(function(){
  			if ( _.isFunction( callBack ) ){
				callBack( result );
			}
  		});

	},
	/**
	 *
	 *
	 * @method getColumns
	 * @param tableName
	 * @param callBack
	 */
	getColumns: function(tableName,callBack){

		var db = new sqlite.Database(this._db);

		var result = [] ; 

		db.each('PRAGMA table_info(`'+tableName+'`); ', function(err, row) {
		
			result.push( row );     		

  		});

  		db.close(function(){
  	
  			if ( _.isFunction( callBack ) ){
				callBack( result );
			}

  		});

	},
	/**
	 *
	 *
	 * @method toSql
	 * @param callBack
	 */
	toSql: function(callBack){

		var db = new sqlite.Database( this._db );

		var result = [] ; 

		db.each('SELECT sql FROM sqlite_master ', function(err, row) {	
			result.push( row.sql );     		
  		});

  		db.close(function(){

  			if ( _.isFunction( callBack ) ){
				callBack( result );				
			}

  		});


	}

});

module.exports = schema ; 