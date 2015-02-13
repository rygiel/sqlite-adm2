SqlController = Class.extend( {

  init: function($scope  ){

     $scope.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        mode: 'sql'
      };


  }

});
angular.module('sulidaeApp').controller('SqlController',

['$scope' ,  SqlController ]

);
