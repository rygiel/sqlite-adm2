
var SqlController = BaseController.extend( {

  init: function($scope , $state , $http , ngTableParams ){

     var that = this ; 

     this.$scope = $scope ; 

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

        $http.post( that.requestUrl , {statement: $scope.statement}).success(function(data){

          if (!_.isUndefined( data['result'] ) ){

            that.$scope.keyWords = _.keys( data[ 'result' ][0]) ;
            that.$scope.result = data['result'] ; 

          } else {
            that.$scope.keyWords = [];
            that.$scope.result = []; 
          }
          

          


        });

       

     }

     $scope.statement = '\nSELECT * FROM '+$state.params.tableName+' LIMIT 0,10';


  }

});
angular.module('sulidaeApp').controller('SqlController',

['$scope' , '$state' , '$http' , 'ngTableParams',  SqlController ]

);

