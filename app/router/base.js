var Class		= require('Class') ;
var express    	= require('express');
var _ 			= require('underscore') ;


/** 
 *
 *
 *
 *
 * @class base
 */
var base = Class.create({

	initialize: function(){

		this.router = express.Router();

	},

	getRouter: function(){
		return this.router ; 
	},

	error: function(res , msg){
		res.json({ error: msg });
	},


	delegateEvents: function(events){

		var that = this ; 


		_.each( events , function(value, key, list) {

			var route = that.router.route( key );

			if ( !_.isUndefined( value['get'] ) ){
				route.get(function(req , res ){
					that[value['get']]( req , res );
				});
			}
			
			if ( !_.isUndefined( value['post'] ) ){
				route.post(function(req , res ){
					that[value['post']]( req , res );
				});
			}



		});

	}


});

module.exports = base ; 
