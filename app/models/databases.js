var Class		= require('Class') ;
var _ 			= require('underscore') ;
var glob 		= require('glob') ;
var path 		= require('path') ; 


/** 
 *
 *
 *
 *
 * @class databases
 */
var databases = Class.create({
	/**
	 *
	 * @method initialize
	 * @param path 
	 */
	initialize: function(path){
		this._path = path ; 
		this._ext = ['sqlite3'];
	},
	/**
	 *
	 * @method get
	 * @param callBack
	 */
	get: function(callBack){

		glob( this._path+'/*.'+this._ext , {nodir:1} , function (er, files) {

			_.each(files , function(value, key, list ){
				list[key] = { basename: path.basename(  value )  , path: value };
			});

			if ( _.isFunction( callBack ) ){



				callBack( files );
			}

		});

	}

});

module.exports = databases ; 