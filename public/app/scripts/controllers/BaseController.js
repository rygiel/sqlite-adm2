BaseController = Class.extend( {

  init: function($scope , ngTableParams , $http ){


  },



  initTable: function( ngTableParams ,data ,key ){

    this.$scope.tableParams = new ngTableParams({
      page: 1,
      count: 10
    }, {
      total: data[ key ].length ,
      getData: function($defer, params) {
        $defer.resolve(

          data[ key ].slice((params.page() - 1) * params.count(),

          params.page() * params.count())

        );
      }
    });

  }


});
