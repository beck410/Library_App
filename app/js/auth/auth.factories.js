;(function(){
  'use strict';
  angular.module('Library')
  .factory('authFactory', function(FIREBASE_URL){
    var factory = {},
    ref = new Firebase(FIREBASE_URL);

    factory.loginUser = function(email,password,cb){
      ref.authWithPassword({
        email: email,
        password: password
      }, function(error, authData){
        if(error === null){
          console.log('user logged in successfully', authData);
          cb();
        } else {
          console.log('Error creating user:', error);
        }
      })
    }

    factory.registerUser = function(email,password,cb){
      ref.createUser({
        email: email,
        password: password
      }, function(error,authData){
        if(error === null){
          console.log('User created successfully', authData);
          cb()
        } else {
          console.log('Error creating user: ', error);
        }
      });
    }

    factory.forgotPassword = function(email){
      ref.resetPassword({
        email : email
      }, function(error) {
        if (error === null) {
          console.log("Password reset email sent successfully");
        } else {
          console.log("Error sending password reset email:", error);
        }
      })
    }

    factory.logout = function(cb){
      ref.unauth(function(){
        console.log('logout works')
        cb();
      });
    }

    factory.changePassword = function(oldPass, newPass, cb){
      ref.changePassword({
        email: ref.getAuth().password.email,
        oldPassword: oldPass,
        newPassword: newPass
      }, function(error){
        if (error === null) {
          console.log('Password changed successfully');
          cb();
        } else {
          console.log('Error changing password:', error);
        }
      })
    }

    return factory;
  })
})();
