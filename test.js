
var Class		= require('Class') ;

var _ 			= require('underscore') ;

var argv 		= require('optimist').
				
				alias('version', 	'v').
				alias('db', 		'd').
				alias('port', 		'p').

				default('db', './db'   ).
				default('port', 8080   ).

				argv;




var version = '0.0.0'

if ( argv.help || argv.h ){
	console.log ('Help!');
	return ;
}

if ( argv.version || argv.v ){
	console.log ( version );
	return ;
}



var schema = require('./app/models/schema');
var db = new schema("./db/system.sqlite3");

db.getTables(function(tables){
	console.log( tables );
});
