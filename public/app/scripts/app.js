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
        'ui.router.state',
        'ui.ace',
        'ncy-angular-breadcrumb'

    ])


.config(function ($stateProvider, $urlRouterProvider ) {



  $urlRouterProvider.otherwise('/databases');


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

    state('db',{

      url:'/db/:dbName',

      views: {
        '@':{
          templateUrl:'app/views/tables.html',
          controller:'GridController' ,
        }
      },

      tabs: [
      {state:'db', title:'Structure' },
      {state:'db.create', title:'Create table'}
      ],


      resultIndex: 'tables' ,
      requestUrl: '/schema/tables/:dbName',

      ncyBreadcrumb: {
        label: '{{ stateParams.dbName }}',
        parent: 'databases'
      }


    }).

    state('table',{

      url:'/table/:tableName/:dbName',
      templateUrl:'app/views/structure.html',
      controller:'GridController',

      tabs: [
              {state:'table', title:'Structure' },
              {state:'table.browse', title:'Browse'} ,
              {state:'table.insert', title:'Insert'} ,

              {state:'table.sql', title:'Sql'}
      ],


      resultIndex: 'columns' ,
      requestUrl: '/schema/columns/:dbName/:tableName',

      ncyBreadcrumb: {
        label: '{{ stateParams.tableName }}',
        parent: 'db'

      }



    }).

    state('table.insert',{

      url:'/insert',

      views: {

        '@':{
          templateUrl:'app/views/insert.html',
          controller:'InsertController',
        }

      },
      tabs: [
        {state:'table', title:'Structure' },
        {state:'table.browse', title:'Browse'} ,
        {state:'table.insert', title:'Insert'} ,

        {state:'table.sql', title:'Sql'}
      ],


      resultIndex: 'columns' ,
      requestUrl: '/schema/columns/:dbName/:tableName',

      ncyBreadcrumb: {
        label: 'Insert'

      }



    }).

    state('table.update',{

      url:'/update/:rowid',

      views: {

        '@':{
          templateUrl:'app/views/insert.html',
          controller:'UpdateController',
        }

      },
      tabs: [
        {state:'table', title:'Structure' },
        {state:'table.browse', title:'Browse'} ,
        {state:'table.update', title:'Update'} ,
        {state:'table.sql', title:'Sql'}
      ],


      resultIndex: 'columns' ,
      requestUrl: '/schema/columns/:dbName/:tableName',

      ncyBreadcrumb: {
        label: 'Update'

      }



    }).

    state('table.browse',{

      url:'/browse',

      views: {
        '@':{
          controller:'GridController',
          templateUrl:'app/views/browse.html'
        }
      },
      tabs: [
        {state:'table', title:'Structure' },
        {state:'table.browse', title:'Browse'} ,
        {state:'table.insert', title:'Insert'} ,
        {state:'table.sql', title:'Sql'}
      ],
      resultIndex: 'result' ,
      requestUrl: '/data/select/:dbName/:tableName' ,

      ncyBreadcrumb: {
        label: 'browse'
      }

    }).
    state('table.sql',{

      url:'/sql',

      views: {
        '@':{
          controller:'SqlController',
          templateUrl:'app/views/sqlform.html'
        }
      },

      tabs: [
        {state:'table', title:'Structure' },
        {state:'table.browse', title:'Browse'} ,
        {state:'table.insert', title:'Insert'} ,
        {state:'table.sql', title:'Sql'}
      ],
      resultIndex: 'result' ,
      requestUrl: '/data/query/:dbName' ,

      ncyBreadcrumb: {
        label: 'sql'
      }

    })





    ;






});
