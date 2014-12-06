;(function(){
  'use strict';

  angular.module('Library',[])
    .controller('LibraryController',function(){
      var vm = this;
      vm.newBook = {};
      vm.category = {};
      
      vm.books = [
        {
          category: 'Fiction',
          bookTitle: 'War and Peace',
          author: 'Leo Tolstoy',
          rating: 4
        },
        {
          category: 'Non-Fiction',
          bookTitle: 'The Big Bang',
          author: 'Simon Singh',
          rating: 3
        },
        {
          category: 'Fiction',
          bookTitle: 'Foundation',
          author: 'Issac Asimov',
          rating: 4
        },
        {
          category: 'Non-Fiction',
          bookTitle: 'The White Mouse',
          author: 'Nancy Wake',
          rating: 5
        },
        {
          category: 'Fiction',
          bookTitle: 'The Martian Chronicles',
          author: 'Ray Bradbury',
          rating: 2
        }
      ];

      vm.ratings = {
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

    vm.addNewBook = function(){
      console.log("called")
      vm.books.push(vm.newBook);
      vm.newBook = {};         
    };
  });
})();

