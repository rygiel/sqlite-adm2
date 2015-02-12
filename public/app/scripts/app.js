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
        'ui.router'
        
    ])


.config(function ($stateProvider, $urlRouterProvider ) {

  //$urlRouterProvider.otherwise('/databases');


  $stateProvider.

    state('databases',{
      url:'/databases',
      templateUrl:'app/views/databases.html',
      controller:'GridController',

      resultIndex: 'databases' ,
      requestUrl: '/schema/databases'

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
      requestUrl: '/schema/tables/:dbName'


    }).

    state('databaseTableBrowse',{

      url:'/table/:dbName/:tableName',
      templateUrl:'app/views/browse.html',
      controller:'GridController',

      resultIndex: 'result' ,
      requestUrl: '/data/select/:dbName/:tableName'



    }).
    state('databaseTableStructure',{

      url:'/tble/structure/:dbName/:tableName',
      templateUrl:'app/views/structure.html',
      controller:'GridController',

      resultIndex: 'columns' ,
      requestUrl: '/schema/columns/:dbName/:tableName'



    })




    ;



/*
    $routeProvider

    .when('/dbs', {
        templateUrl: 'app/views/databases.html',
        controller: 'DatabasesController',
        label: 'Databases'

    })

    .when('/dbs/tbl/:dbname', {
      templateUrl: 'app/views/tables.html',
      controller: 'TablesController',
      label: "Tables"
    })

    .when('/dbs/tbl/brw/:dbname/:tblname', {
      templateUrl: 'app/views/browse.html',
      controller: 'BrowseController',
      label:"Browse"
    })

    ;
*/


});
