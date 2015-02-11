

function NavigationController ($scope, $location ) {

  $scope.navClass = function (page) {
    var currentRoute = $location.path().substring(1) || 'home';
    return page === currentRoute ? 'active' : '';
  };

}

angular.module('sulidaeApp').controller('NavigationController',

  ['$scope' ,'$location',NavigationController]

);
