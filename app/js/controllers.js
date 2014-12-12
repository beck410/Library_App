;(function(){
  'use strict';
  angular.module('Library')
    .controller('LoginController',function($scope,$location){
      var vm = this;

      vm.loginUser = function(){
        var ref = new Firebase('https://bcd-library.firebaseio.com/');

        ref.authWithPassword({
          email: vm.email,
          password: vm.password
        }, function(error, authData){
            if(error === null){
              console.log('user logged in successfully', authData);
              $location.path('/');
              $scope.$apply();
            } else {
              console.log('Error creating user:', error);
            }
        });
      };

      vm.registerUser = function(){
        var ref = new Firebase('https://bcd-library.firebaseio.com/');

        ref.createUser({
          email: vm.email,
          password: vm.password
        }, function(error,authData){
          if(error === null){
            console.log('User created successfully', authData);
            vm.loginUser();
          } else {
            console.log('Error creating user: ', error);
          }
        });
      };

      vm.forgotPassword = function(){
        var ref = new Firebase('https://bcd-library.firebaseio.com/');
        ref.resetPassword({
          email : vm.email
        }, function(error) {
          if (error === null) {
            console.log("Password reset email sent successfully");
          } else {
              console.log("Error sending password reset email:", error);
          }
        })
      }
    })
    .controller('detailsController',function($routeParams, libFactory){
      var vm = this;
      var bookId = $routeParams.bookId;
      libFactory.getBook(bookId,function(data){
        vm.book = data;
        vm.coverImageUrl = _coverImageUrl();
      });

      function _coverImageUrl() {
        var isbn = vm.book.ISBN;
        var url = 'http://covers.openlibrary.org/b/isbn/' + isbn + '-L.jpg';
        return url;
      }
    })
    .controller('editBookController',function($routeParams, libFactory){
      var vm = this;
      var id = $routeParams.bookId;

      libFactory.getBook(id, function(data){
        vm.newBook = data;
      });

      vm.addNewBook = function(){
        libFactory.editBook(id,vm.newBook);
      };

      vm.rating = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5
      };

    })
    .controller('LibraryController',function($http,$location, libFactory){

      var vm = this;

      libFactory.getAllBooks(function(data){
        vm.books = data;
      });

      vm.addNewBook = function(){
        libFactory.createNewBook(vm.newBook, function(data){
          vm.books[data.name] = vm.newBook;
          libFactory.defaultBook();
          $location.path('/');
        });
      };

      vm.removeBook = function(bookId){
        libFactory.deleteBook(bookId,function(){
          delete vm.books[bookId];
        });
      };

      vm.updateRead = function(bookId, readValue,book){
        book.read = readValue;
        var url = 'https://bcd-library.firebaseio.com/books/' + bookId + '.json';
        $http.put(url, book)
        .success(function(){
        })
        .error(function(err){
          console.log('update read error: ' + err);
        });
      };

      vm.rating = libFactory.rating;

      vm.category = libFactory.category;

      vm.addStars = function(rating){
        return rating;
      };
    });
})();
