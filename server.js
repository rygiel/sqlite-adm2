var express    	= require('express');
var bodyParser 	= require('body-parser');
var app        	= express();
var morgan     	= require('morgan');
var fs	     	= require('fs');

var sqliteSchema		= require('./app/router/sqliteSchema');
var sqliteQuery			= require('./app/router/sqliteQuery');


var argv 		= require('optimist')
					.alias('version', 	'v')
					.alias('db', 		'd')
					.alias('port', 		'p')
					.alias('help', 		'h')

					.default('db', './db'   )
					.default('port', 8080   )
					.argv;

if ( argv.h || argv.help ){

	var package = JSON.parse(fs.readFileSync('package.json', 'utf8'));
	console.log(package.name+ ' ' + package.version);
	console.log('Help');
	return ;

}

if ( argv.version ){

	var package = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    console.log( package.name+ ' ' + package.version );
    return ;

}



app.use(morgan('dev')); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


var port     = process.env.PORT || argv.port ; 

var schema = new sqliteSchema( argv.db );
app.use('/schema', schema.getRouter() );


var query = new sqliteQuery( argv.db );
app.use('/data' , query.getRouter() );

app.listen(port);


console.log('sqlite api server listen on ' + port);
