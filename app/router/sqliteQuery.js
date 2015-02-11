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


	routes: {

		'/select/:dbname/:tblname':	{get:'select'} ,
		'/query/:dbname':			{post:'query'}
	},


	initialize: function($super , path){
		$super();
		this._path = path ;
		this.delegateRoutes( this.routes ) ;


	},

	result: function(sql , pathDb , res ){
		var that = this ;
		var db = new query( pathDb );
		db.data(sql ).then(function(result){
			res.json({ result: result });
		}).fail(function(error){
			that.error(res , error );
		});

	},


	query: function(req , res ){
		this.result(req.body.statement , this._path +'/' + req.params.dbname , res );
	},

	select: function(req,res){

		var sql = 'SELECT * FROM '+req.params.tblname+' LIMIT 0,100';
		this.result(sql , this._path +'/' + req.params.dbname , res );

	}

});

module.exports = sqliteQuery ;
