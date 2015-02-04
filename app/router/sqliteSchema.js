var express    	= require('express');
var Class		= require('Class') ;
var fs 			= require('fs');
var _ 			= require('underscore') ;
var databases	= require('../models/databases');
var schema		= require('../models/schema');
var base		= require('./base');

/** 
 *
 * @class rest
 */
var sqliteSchema = Class.create ( base, {
	
	
	events: {

		'/': 						{get:'default'	},
		'/databases': 				{get:'databases'},
		'/tables/:dbname': 			{get:'tables'	},
		'/indexes/:dbname': 		{get:'indexes'	},
		'/columns/:dbname/:tblname':{get:'columns'	},
		'/dump/:dbname':			{get:'dump'		}

	},


	initialize: function($super , path){
		$super();
		this._path = path ; 
		this.delegateEvents( this.events ) ;

		
	},
	

	
	default: function(req,res){
		res.json({ message: 'sqliteAdmin' });	
	},

	tables: function(req,res){

		if (fs.existsSync( this._path +'/' + req.params.dbname ) === false ) { 
			this.error(res, 'File not found');
			return ;
		}

		var db = new schema( this._path + '/' +req.params.dbname );
		db.getTables(function(tables){
			res.json({ tables: tables });
		});

	},

	databases: function(req, res){
		var list = new databases( this._path );

		list.get(function(result){

			res.json({ databases: result  });

		}); 
				
	},

	indexes: function(req, res){

		var list = new schema( this._path + '/' +req.params.dbname );

		list.getIndexes(function(result){

			res.json({ indexes: result  });

		}); 

	},

	columns: function(req, res){
		var list = new schema( this._path + '/' +req.params.dbname );

		list.getColumns( req.params.tblname , function(result ){

			res.json({ columns: result  });

		});
	},

	dump: function(req , res ){
		var list = new schema( this._path + '/' +req.params.dbname );

		list.toSql(function(result){

			res.json({ dump: result  });

		}); 
	}

});

module.exports = sqliteSchema ; 