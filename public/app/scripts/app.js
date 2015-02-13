'use strict';

/**
 * @ngdoc overview
 * @name sulidaeApp
 * @description
 * # sulidaeApp
 *
 *
 */
angular.module('sulidaeApp', [

        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngTouch',
        'ngTable',
        'ui.router',
        'ui.tree',
        'ui.codemirror',
        'ncy-angular-breadcrumb'
        
    ])


.config(function ($stateProvider, $urlRouterProvider ) {

 // $urlRouterProvider.otherwise('/databases');


  $stateProvider.

    state('databases',{
      url:'/databases',
      templateUrl:'app/views/databases.html',
      controller:'GridController',

      resultIndex: 'databases' ,
      requestUrl: '/schema/databases',
      ncyBreadcrumb: {
        label: 'Databases'
      }

    }).

    state('database.struct',{

      url:'/struct/:dbName/:tableName',
      templateUrl:'app/views/tables.html',
      controller:'GridController'

    }).
    state('databaseTables',{

      url:'/tables/:dbName ',
      templateUrl:'app/views/tables.html',
      controller:'GridController',

      resultIndex: 'tables' ,
      requestUrl: '/schema/tables/:dbName',

      ncyBreadcrumb: {
        label: 'Tables {{ stateParams.dbName }}',
        parent:'databases'
      }


    }).

    state('databaseTableBrowse',{

      url:'/table/:dbName/:tableName',
      templateUrl:'app/views/browse.html',
      controller:'GridController',

      resultIndex: 'result' ,
      requestUrl: '/data/select/:dbName/:tableName' ,

      ncyBreadcrumb: {
        label: 'Browse {{ stateParams.tableName }}',
        parent:'databaseTables'
      }



    }).
    state('databaseTableStructure',{

      url:'/tble/structure/:dbName/:tableName',
      templateUrl:'app/views/structure.html',
      controller:'GridController',

      resultIndex: 'columns' ,
      requestUrl: '/schema/columns/:dbName/:tableName',

      ncyBreadcrumb: {
        label: 'Structure',
        parent:'databaseTables'
      }



    }).
    state('sqlEditor',{

      url:'/sql/:dbName/:tableName',
      templateUrl:'app/views/sqlform.html',
      controller:'SqlController',

      ncyBreadcrumb: {
        label: 'Sql',
        parent:'databaseTables'
      }



    })




    ;






}).run(function($rootScope, $state, $breadcrumb) {

  $rootScope.isActive = function(stateName) {
    return $state.includes(stateName);
  }


});


