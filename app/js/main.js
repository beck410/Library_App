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
    .when('/:bookId/edit',{
      templateUrl: 'views/form.html',
      controller: 'editBookController',
      controllerAs: 'lib'
    })
    .otherwise({redirectTo: '/'});
  })
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
  .controller('detailsController',function($http, $routeParams, libFactory){
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
