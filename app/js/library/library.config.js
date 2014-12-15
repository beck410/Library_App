;(function(){
  'use strict';
  angular.module('Library')
  .config(function($routeProvider){
    $routeProvider
    .when('/books',{
      templateUrl: 'views/table.html',
      controller: 'LibraryController',
      controllerAs: 'lib'
    })
    .when('/books/new',{
      templateUrl: 'views/form.html',
      controller: 'LibraryController',
      controllerAs: 'lib'
    })
    .when('/books/:bookId',{
      templateUrl: 'views/details.html',
      controller: 'detailsController',
      controllerAs: 'details'
    })
    .when('/books/:bookId/edit',{
      templateUrl: 'views/form.html',
      controller: 'editBookController',
      controllerAs: 'lib'
    })
  })
})();
