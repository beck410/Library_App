;(function(){
  'use strict';
  angular.module('Library')
    .factory('libFactory', function($http, $location){

      function getBook(id, cb){
        var url = 'https://bcd-library.firebaseio.com/books/' + id +'.json';

        $http.get(url)
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          console.log(err);
        });
      }

      function editBook(id, newBook){
        var url = 'https://bcd-library.firebaseio.com/books/' + id +'.json';
        $http.put(url, newBook)
        .success(function(data){
          $location.path('/');
        })
        .error(function(err){
          console.log('edit book error:' + err);
        });
      }

      function getAllBooks(cb){
        $http.get('https://bcd-library.firebaseio.com/books.json')
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          console.log(err);
        });
      }

      function createNewBook(newBook, cb){
        $http.post('https://bcd-library.firebaseio.com/books.json',newBook)
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          console.log('add Book error:' + err);
        });
      }

      function deleteBook(bookId, cb){
        var url = 'https://bcd-library.firebaseio.com/books/' + bookId + '.json';
        $http.delete(url)
        .success(function(){
          cb();
        })
        .error(function(err){
          console.log('delete book error: ' + err);
        });
      }

      var ratingOptions = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5
      };

      var categoryOptions = {
        fiction: 'Fiction',
        nonFiction: 'Non-Fiction'
      };

      var defaultBook = function(){
        return {
          rating: 3,
          read: false
        };
      };

      return {
        getAllBooks: getAllBooks,
        getBook: getBook,
        editBook: editBook,
        createNewBook: createNewBook,
        deleteBook: deleteBook,
        rating: ratingOptions,
        category: categoryOptions,
        defaultBook: defaultBook
      };
    })
})();
