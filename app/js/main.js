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

      function _defaultBook(){
        return {
          rating: 3,
          read: false

        };
      }

      //public vars
      vm.newBook = _defaultBook();
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
          vm.newBook = _defaultBook();
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

      vm.updateRead = function(bookId, readValue){
        console.log(readValue);
        var url = 'https://bcd-library.firebaseio.com/books/' + bookId +'/read.json';
        $http.put(url, readValue)
          .success(function(readValue){
            console.log(readValue);
          })
          .error(function(err){
            console.log('update read error: ' + err);
          });
      };

      vm.addStars = function(rating){
        return rating;
      }
    });
})();

