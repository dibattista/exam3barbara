(function() {
var app = angular.module('hobook', ['ngRoute'])

//////////////////@Routes //////////////////////////////
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'angular-app/hotel-all/hotels.html',
    controller : HotelsController,
    controllerAs : 'vm'
  })
  .when('/hotel/:id', {
    templateUrl : 'angular-app/hotel-on/hotel.html',
    controller : HotelController,
    controllerAs : 'vm'
  })
  .when('/connect', {
    templateUrl : 'angular-app/connect.html'
  });
}]);

//////////////////@Directives //////////////////////////////

app.directive('header', function() {
    return {
        restrict: 'A',
        templateUrl: 'angular-app/header.html'
    }
})
app.directive('rating', function() {
  return {
     restrict: 'E',
     template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">{{ star }}</span>',
     bindToController: true,
     controller: 'HotelController',
     controllerAs: 'vm',
     scope: {
       stars: '@'
     }
   }
});


})();
