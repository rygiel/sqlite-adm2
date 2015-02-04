var express    	= require('express');
var bodyParser 	= require('body-parser');
var app        	= express();
var morgan     	= require('morgan');
var sqliteSchema		= require('./app/router/sqliteSchema');
var sqliteQuery			= require('./app/router/sqliteQuery');


var argv 		= require('optimist')
					.alias('version', 	'v')
					.alias('db', 		'd')
					.alias('port', 		'p')
					.default('db', './db'   )
					.default('port', 8080   )
					.argv;



if ( argv.version ){
	console.log( 'Sqlite api version: 0.0.0');
	return ;
}



app.use(morgan('dev')); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || argv.port ; 

var schema = new sqliteSchema( argv.db );
app.use('/schema', schema.getRouter() );


var query = new sqliteQuery( argv.db );
app.use('/data' , query.getRouter() );

app.listen(port);


console.log('sqlite api server listen on ' + port);
