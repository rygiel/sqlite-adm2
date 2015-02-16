
  var GridController = BaseController.extend({
      /**
       *
       *
       *
       */
      init: function($scope , ngTableParams , $http , $state    ){


        var that =this ;

        this.ngTableParams = ngTableParams ; 

        this.$scope = $scope ;
        this.$http = $http; 
        this.$scope.stateParams = $state.params ;


        this.$scope.tabClass = function(state){
          if ( state === $state.current.name ) return "active";
          return "";
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
       *
       * @method load
       */
      load: function(){
        this.defaultRequest();
      },

      /**
       *
       *
       * @param callBack
       * @method defaultRequest
       */
      defaultRequest: function( callBack ){

        var that = this ; 

        this.$http.get( this.requestUrl ).success(function(data) {

          if ( data[that.resultIndex].length > 0 ){

            that.$scope.keyWords = _.keys( data[ that.resultIndex ][0]) ;

            that.initTable( that.ngTableParams ,data , that.resultIndex );

          }

          if ( _.isFunction( callBack ) ) {

            callBack();

          }

        });
      }


  });

  angular.module('sulidaeApp').controller('GridController',

  ['$scope','ngTableParams','$http','$state'  ,  GridController ]

  );

