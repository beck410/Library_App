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
    .when('/changepassword',{
      templateUrl: 'views/changepassword.html',
      controller: 'ChangePasswordController',
      controllerAs: 'changepw',
      private: true
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
