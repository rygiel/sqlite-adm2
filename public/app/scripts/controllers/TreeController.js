(function(){

  var TreeController = Class.extend( {

    init: function($scope ,  $http ){
    	var that = this ;

    	this.$scope = $scope ;

    	this.$scope.data = [ ] ;

    	$http.get('/schema/tree' ).success(function(data) {
    		that.createTree(data);
    	 });






    },

    createTree: function(data){
    	var that = this ;
   	_.each(data.tree , function(row ){

   		var nodes = [];
   		_.each( row.tables , function(tableName ){

   			nodes.push( {
   				title : tableName.name ,
   				sref:'table',
   				srefParam:{ dbName: row.database.basename , tableName: tableName.name } ,
   				nodes:[]
   			} );

   		});

   		that.$scope.data . push( {

   			title : row.database.basename ,
   			sref: 'db',
   			srefParam: { dbName:row.database.basename }

   			, nodes:nodes } );


   	});
    }


  });


  angular.module('sulidaeApp').controller('TreeController',
  	['$scope','$http',  TreeController ]
  );


})();
