var Class		= require('Class') ;
var _ 			= require('underscore') ;
var glob 		= require('glob') ;
var path 		= require('path') ; 
var Q			= require('q');
/** 
 * @class databases
 */
var databases = Class.create({
	/**
	 * @method initialize
	 * @param path 
	 */
	initialize: function(path){
		this._path = path ; 
		this._ext = ['sqlite3'];
	},
	/**
	 * @method get
	 * @return promise
	 */
	get: function(){
		var deferred = Q.defer() ; 
		glob( this._path+'/*.'+this._ext , {nodir:1} , function (err, files) {
			if ( err ){
				deferred.reject( err ) ; 
			} else {
				_.each(files , function(value, key, list ){
					list[key] = { basename: path.basename(  value )  , path: value };
				});
				deferred.resolve(files) ; 
			}
		});
  		return deferred.promise ; 
	}

});

module.exports = databases ; 