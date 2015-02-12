TreeController = Class.extend( {

  init: function($scope ,  $http ){

  	$scope.data = [ ] ; 
  	

  	 $http.get('/schema/tree' ).success(function(data) {


  	 	var id = 1 ;
  	 	_.each(data.tree , function(row ){

  	 		console.log( row );


  	 		var nodes = [];
  	 		_.each( row.tables , function(tableName ){

  	 			nodes.push( { id:id , title : tableName.name , nodes:[] } );

  	 			id++;
  	 		});

  	 		$scope.data . push( { id:id , title : row.database.basename , nodes:nodes } );


  	 		id++;
  	 	});

  	 });

	

	/*

		{"id": 1,"title": "node1","nodes": [

			{"id": 3,"title": "subNode1","nodes": []}

		]} ,
		{"id": 2,"title": "node2","nodes": []} 

	];

  	*/


  }


});


angular.module('sulidaeApp').controller('TreeController',
	['$scope','$http',  TreeController ] 
);