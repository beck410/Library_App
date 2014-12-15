;(function(){
  'use strict';
  angular.module('Library')
  .config(function($routeProvider){
    $routeProvider
    .when('/books',{
      templateUrl: 'views/table.html',
      controller: 'LibraryController',
      controllerAs: 'lib',
      private: true,
    })
    .when('/books/new',{
      templateUrl: 'views/form.html',
      controller: 'LibraryController',
      controllerAs: 'lib',
      private: true,
    })
    .when('/books/:bookId',{
      templateUrl: 'views/details.html',
      controller: 'detailsController',
      controllerAs: 'details',
      private: true,
    })
    .when('/books/:bookId/edit',{
      templateUrl: 'views/form.html',
      controller: 'editBookController',
      controllerAs: 'lib',
      private: true,
    })
  })
  .run(function($rootScope, authFactory){
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, priorRoute){
      if(nextRoute.$$route.private){
        authFactory.requireLogin();
      }
    })
  })
})();
