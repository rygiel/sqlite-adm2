/**
 *
 *
 *
 */
var UpdateController = InsertController.extend({
    init: function($scope , ngTableParams , $http , $state  ){

      var that =this ;
      this.rowId = $state.params['rowid'];
      this._super($scope , ngTableParams , $http , $state );

      this.$scope.submit = function(){

        var url = '/data/update/'+that.dbName+'/'+ that.tableName+'/'+that.rowId ;
        $http.post( url , that.$scope.formData  ).success(function(data) {

          that.$scope.formData = {};

          $state.go('table.browse' , {
            dbName: that.dbName ,
            tableName: that.tableName
          });

        });
      }

    },

    load: function (){

      var that = this ;
      this.formStruct(
          that.loadData()
      );
    },

    loadData: function(){

      var that =this ;

      var statement = 'SELECT * FROM '+this.tableName+' WHERE rowid='+this.rowId+' LIMIT 0,1' ;


      this.$http.post('/data/query/'+this.dbName ,{

        statement: statement

      }).success(function(data){

        that.$scope.formData = data.result[0];

      });

    }
});
/**
 *
 *
 *
 */
angular.module('sulidaeApp').controller('UpdateController',

['$scope','ngTableParams','$http','$state'  ,  UpdateController ]

);
