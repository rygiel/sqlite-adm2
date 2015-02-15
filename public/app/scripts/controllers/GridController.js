(function(){

  var GridController = BaseController.extend({
      init: function($scope , ngTableParams , $http , $state  ){


        var that =this ;

        this.$scope = $scope ;
        this.$scope.stateParams = $state.params ;


        this.$scope.tabClass = function(state){
          if ( state === $state.current.name ) return "active";
          return "";
        }

        this.$scope.tabs = $state.$current.self.tabs ;

        var requestUrl =  $state.$current.self.requestUrl ;
        for (var key in $state.params ){
          requestUrl = requestUrl.replace(':'+key , $state.params[key] );
        }

        var resultIndex = $state.$current.self.resultIndex ;


        $http.get(requestUrl ).success(function(data) {
          if ( data[resultIndex].length > 0 ){
            that.$scope.keyWords = _.keys( data[resultIndex][0]) ;
            that.initTable(ngTableParams ,data , resultIndex  );
          }
        });

      }
  });

  angular.module('sulidaeApp').controller('GridController',

  ['$scope','ngTableParams','$http','$state'  ,  GridController ]

  );

})();
