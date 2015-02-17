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

		'/select/:dbname/:tblname':				{get:'select'} ,
		'/query/:dbname':						{post:'query'},
		'/insert/:dbname/:tblname':				{post:'insert'},
		'/update/:dbname/:tblname/:rowid':		{post:'update'}

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

	/**
	 *
	 * @todo dopisac limitowanie dla SELECT
	 */
	query: function(req , res ){



		this.result(req.body.statement , this._path +'/' + req.params.dbname , res );


	},

	select: function(req,res){

		var sql = 'SELECT rowid , * FROM '+req.params.tblname+' LIMIT 0,10';
		this.result(sql , this._path +'/' + req.params.dbname , res );

	},

	insert: function(req,res){

		var keys = _.keys(req.body) ;
		var values = [] ;
		_.each ( keys ,  function (key){
			values.push( "'"+req.body[key]+"'" );
		}) ;


		var sql = [
			'INSERT INTO ',
			req.params.tblname ,
			' ( '+

			keys.join(" , ") +

			' ) ' +

			' VALUES ( ' +
			values.join( ' , ' ) +
			' ) '


		].join('');

		this.result( sql ,this._path +'/' + req.params.dbname , res ) ;

	},

	update: function(req,res){

		var keys = _.keys(req.body) ;
		var values = [] ;
		_.each ( keys ,  function (key){
			values.push( key+ " = '"+req.body[key]+"'" );
		}) ;


		var sql = [
		'UPDATE ',
		req.params.tblname ,
		' SET '+
		values.join(' , ')+
		' WHERE rowid='+
		req.params.rowid

		].join('');

		this.result( sql ,this._path +'/' + req.params.dbname , res ) ;
		
	}



});

module.exports = sqliteQuery ;
