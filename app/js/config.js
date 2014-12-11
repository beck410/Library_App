;(function(){
  'use strict';
  angular.module('Library')
    .config(function($routeProvider){
      $routeProvider
      .when('/',{
        templateUrl: 'views/table.html',
        controller: 'LibraryController',
        controllerAs: 'lib'
      })
      .when('/new',{
        templateUrl: 'views/form.html',
        controller: 'LibraryController',
        controllerAs: 'lib'
      })
      .when('/:bookId',{
        templateUrl: 'views/details.html',
        controller: 'detailsController',
        controllerAs: 'details'
      })
      .when('/:bookId/edit',{
        templateUrl: 'views/form.html',
        controller: 'editBookController',
        controllerAs: 'lib'
      })
      .otherwise({redirectTo: '/'});
    })
})();
