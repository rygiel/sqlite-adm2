var simpleSqlParser = require('simple-sql-parser');
var sqlParser = require('sql-parser');

var lexer = sqlParser.lexer ;
var parser = sqlParser.parser ;


var _ 			= require('underscore') ;






var q =
"SELECT field1,field2 FROM table1 UNION SELECT field1,field2 FROM table1   ";

var t = lexer.tokenize(q);
console.log  ( t );


console.log ( parser.parse(t).toString() );


//console.log ( sqlParser.parse( t ).toString() );
