var express    	= require('express');
var Class		= require('Class') ;
var fs 			= require('fs');
var _ 			= require('underscore') ;
var databases	= require('../models/databases');
var schema		= require('../models/schema');
var base		= require('./base');
var query		= require('../models/query');


/** 
 *
 * @class rest
 */
var sqliteQuery = Class.create ( base, {
	
	
	events: {

		'/': 						{get:'default'	},
		'/select/:dbname/:tblname':	{get:'select'} ,
		'/select/:dbname/:tblname':	{get:'select' },
		'/query/:dbname':			{post:'query'}
	},


	initialize: function($super , path){
		$super();
		this._path = path ; 
		this.delegateEvents( this.events ) ;


	},
	
	result: function(sql , pathDb , res ){

		var db = new query( pathDb );
		db.data(sql , function(result){
			res.json({ result: result });	
		});

	},


	query: function(req , res ){
		

		this.result(req.body.statement , this._path +'/' + req.params.dbname , res );

	},	

	select: function(req,res){
	
		var sql = 'SELECT * FROM '+req.params.tblname+' LIMIT 0,10';
		this.result(sql , this._path +'/' + req.params.dbname , res );

	},

	
	default: function(req,res){
		res.json({ message: 'sqliteAdmin' });	
	}

	

});

module.exports = sqliteQuery ; 
