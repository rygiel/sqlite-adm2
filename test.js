//var Q			= require('q');



var schema = require('./app/models/schema');
var db = new schema("./db/system.sqlite3");

db.getTables()
	.then(function(tables){

		console.log( tables );

	})
	.fail(function( error){

		console.log ( error ) ;

	});
