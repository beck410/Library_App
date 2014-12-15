;(function(){
  'use strict';
  angular.module('Library')
    .config(function($routeProvider){
      $routeProvider
      .when('/',{
        templateUrl: 'views/landing.html'
      })
      .otherwise({redirectTo: '/'});
    })
})();
