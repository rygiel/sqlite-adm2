'use strict';

angular
.module('sulidaeApp')
.factory('localStorage', ['$window' , '$log'   ,  function($window ,  $log  ){
    return $window['localStorage'] ;
}]);
