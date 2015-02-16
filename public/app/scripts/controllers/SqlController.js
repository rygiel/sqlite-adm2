
var SqlController = Class.extend( {

  init: function($scope , $state , $http  ){

     var that = this ; 
     $scope.stateParams = $state.params ;
     $scope.tabs = $state.$current.self.tabs ;



      this.requestUrl =  $state.$current.self.requestUrl ;
      for (var key in $state.params ){
        
        this.requestUrl = this.requestUrl.replace(':'+key , $state.params[key] );

      }


     $scope.tabClass = function(state){
       if ( state === $state.current.name ) return "active";
       return "";
     }

     $scope.onSubmit = function(){

        $http.post( that.requestUrl , {statement: $scope.statement}).success(function(result){

          console.log( result );

        });

       

     }

     $scope.statement = '\nSELECT * FROM '+$state.params.tableName+' LIMIT 0,10';


  }

});
angular.module('sulidaeApp').controller('SqlController',

['$scope' , '$state' , '$http' ,   SqlController ]

);

