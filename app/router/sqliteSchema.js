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
	
	
	routes: {

		'/databases': 				{get:'databases'},
		'/tables/:dbname': 			{get:'tables'	},
		'/indexes/:dbname': 		{get:'indexes'	},
		'/columns/:dbname/:tblname':{get:'columns'	},
		'/dump/:dbname':			{get:'dump'		}

	},


	initialize: function($super , path){
		$super();
		this._path = path ; 
		this.delegateRoutes( this.routes ) ;

		
	},
	

	tables: function(req,res){

		var that = this ; 

		var db = new schema( this._path + '/' +req.params.dbname );
		
		db.getTables().then(function( tables ){
			res.json({ tables: tables });
		}).fail(function(error){
			that.error(res , error );
		});

	},

	databases: function(req, res){

		var that = this ; 

		var list = new databases( this._path );

		list.get().then(function( result ){
			res.json({ databases: result  });
		}).fail(function(error){
			that.error(res , error );
		}); 
				
	},

	indexes: function(req, res){

		var that = this ; 
		var list = new schema( this._path + '/' +req.params.dbname );
		list.getIndexes().then(function(result){
			res.json({ indexes: result  });
		}).fail(function(error){
			that.error(res , error );
		});

	},

	columns: function(req, res){

		var that = this ; 

		var list = new schema( this._path + '/' +req.params.dbname );
		list.getColumns( req.params.tblname ).then(function(result){
			res.json({ columns: result  });
		}).fail(function(error){
			that.error(res , error );
		});


		
	},

	dump: function(req , res ){

		var that = this ; 
		var list = new schema( this._path + '/' +req.params.dbname );
		list.toSql().then(function(result){
			res.json({ dump: result  });
		}).fail(function(error){
			that.error(res , error );
		}); 

	}

});

module.exports = sqliteSchema ; 