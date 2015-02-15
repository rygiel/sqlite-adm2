  var InsertController = BaseController.extend({
      init: function($scope , ngTableParams , $http , $state  ){


        var that =this ;
        this.$http = $http ;
        this.$scope = $scope ;
        this.$scope.stateParams = $state.params ;

        this.$scope.formData = {} ;
        this.dbName = this.$scope.stateParams['dbName'];
        this.tableName = this.$scope.stateParams['tableName'];

        this.$scope.tabClass = function(state){
          if ( state === $state.current.name ) return "active";
          return "";
        }

        this.$scope.submit = function(){

          $http.post('/data/insert/'+that.dbName+'/'+ that.tableName , that.$scope.formData  ).success(function(data) {

            that.$scope.formData = {};

          });

        }


        this.$scope.tabs = $state.$current.self.tabs ;

        this.requestUrl =  $state.$current.self.requestUrl ;
        for (var key in $state.params ){
          this.requestUrl = this.requestUrl.replace(':'+key , $state.params[key] );
        }

        this.resultIndex = $state.$current.self.resultIndex ;

        this.load();


      },


      /**
       *
       * @method load
       */
      load: function(){
        this.formStruct();
      },

      /**
       *
       * @method formStruct
       * @param callBack
       */
       formStruct: function( callBack ){
        var that = this ;
        this.$http.get(this.requestUrl ).success(function(data) {

          if ( data[that.resultIndex].length > 0 ){
            that.$scope.formStruct = data[that.resultIndex] ;
          }

          if ( _.isFunction( callBack ) ){
            callBack();
          }

        });

      }





  });
  /**
   *
   *
   *
   */
  angular.module('sulidaeApp').controller('InsertController',

  ['$scope','ngTableParams','$http','$state'  ,  InsertController ]

  );
