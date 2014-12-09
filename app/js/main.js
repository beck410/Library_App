;(function(){
  'use strict';

  angular.module('Library',['ngRoute'])
    .config(function($routeProvider){
      $routeProvider
      .when('/',{
        templateUrl: 'views/table.html',
        controller: 'LibraryController',
        controllerAs: 'lib'
      })
      .when('/new',{
        templateUrl: 'views/form.html',
        controller: 'LibraryController',
        controllerAs: 'lib'
      })
      .when('/:bookId',{
        templateUrl: 'views/details.html',
        controller: 'detailsController',
        controllerAs: 'details'
      })
      .otherwise({redirectTo: '/'});
    })
    .controller('detailsController',function($http, $routeParams){
      var vm = this;
      var bookId = $routeParams.bookId;
      var url ='https://bcd-library.firebaseio.com/books/' + bookId +'.json';
      console.log(url);
      $http.get(url)
        .success(function(data){
          console.log(data);
          vm.book = data;
        })
        .error(function(err){
          console.log(err);
        });
    })
    .controller('LibraryController',function($http){
      //private vars
      var vm = this;

      //private functions
      $http.get('https://bcd-library.firebaseio.com/books.json')
        .success(function(data){
          if(data){
            vm.books = data;
          } else {
            vm.books = {};
          }
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

      vm.updateRead = function(bookId, readValue,book){
        book.read = readValue;
        var url = 'https://bcd-library.firebaseio.com/books/' + bookId + '.json';
        $http.put(url, book)
          .success(function(readValue){
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

