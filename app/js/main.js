;(function(){
  'use strict';

  angular.module('Library',[])
    .controller('LibraryController',function($http){
      //private vars
      var vm = this;

      //private functions
      $http.get('https://bcd-library.firebaseio.com/books.json')
        .success(function(data){
          vm.books = data;
        })
        .error(function(err){
          console.log('book error: ' + err);
        });

      //public vars
      vm.newBook = {};
      vm.rating = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5
      };
      vm.category = {
        fiction: 'Fiction',
        nonFiction: 'Non-Fiction'
      };

      //public functions
      vm.addNewBook = function(){
        $http.post('https://bcd-library.firebaseio.com/books.json',vm.newBook)
        .success(function(data){
          vm.books[data.name] = vm.newBook;
          vm.newBook = {};
        })
        .error(function(err){
          console.log('add Book error:' + err);
        });
      };

      vm.removeBook = function(bookId){
        var url = 'https://bcd-library.firebaseio.com/books/' + bookId + '.json';
        $http.delete(url)
          .success(function(){
            delete vm.books[bookId];
          })
          .error(function(err){
            console.log('book delete error:' + err);
          })
      }
    });
})();

