;(function(){
  'use strict';
  angular.module('Library')
  .controller('LoginController',function(authFactory,$scope,$location){
    var vm = this;

    vm.loginUser = function(){
      authFactory.loginUser(vm.email, vm.password, function(){
        $location.path('/books');
        $scope.$apply();
      })
    };

    vm.registerUser = function(){
      authFactory.registerUser(vm.email,vm.password, function(){
        vm.loginUser();
      })
    };

    vm.forgotPassword = function(){
      authFactory.forgotPassword(vm.email);
    }

  })
  .controller('LogoutController',function($location, $scope, authFactory){
    authFactory.logout(function(){
      $location.path('/');
      $scope.$apply();
    })
  })
})();
