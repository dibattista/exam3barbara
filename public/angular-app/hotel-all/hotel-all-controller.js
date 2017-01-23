angular.module('hobook').controller('HotelsController', HotelsController);

function HotelsController($http){
  var vm = this;
  vm.title = "test Hotel App";
  $http.get('/api/hotels?count=10').then(function(response){
    vm.hotels =  response.data;
  });
}
