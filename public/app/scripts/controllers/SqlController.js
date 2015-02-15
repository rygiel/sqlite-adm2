(function(){

  var SqlController = Class.extend( {

    init: function($scope , $state  ){


       $scope.stateParams = $state.params ;
       $scope.tabs = $state.$current.self.tabs ;

       $scope.tabClass = function(state){

         if ( state === $state.current.name ) return "active";

         return "";

       }

       $scope.editorOptions = {
          lineWrapping : true,
          lineNumbers: true,
          mode: 'sql'
        };


    }

  });
  angular.module('sulidaeApp').controller('SqlController',

  ['$scope' , '$state' ,  SqlController ]

  );

})();
