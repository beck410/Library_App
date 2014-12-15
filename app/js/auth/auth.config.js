;(function(){
  'use strict';
  angular.module('Library')
  .config(function($routeProvider){
    $routeProvider
    .when('/login',{
      templateUrl: 'views/login.html',
      controller: 'LoginController',
      controllerAs: 'login'
    })
    .when('/logout',{
      template: '',
      controller: 'LogoutController',
    })
  })
})();
