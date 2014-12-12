;(function(){
  'use strict';
  angular.module('Library')
    .config(function($routeProvider){
      $routeProvider
      .when('/',{
        templateUrl: 'views/landing.html'
      })
      .when('/login',{
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .when('/logout',{
        template: '',
        controller: 'LogoutController',
      })
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
      .otherwise({redirectTo: '/'});
    })
})();
