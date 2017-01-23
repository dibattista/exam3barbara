angular.module('hobook').controller('HotelController', HotelController);

function HotelController($route, $routeParams, hotelDataFactory) {
  var vm = this;
  var id = $routeParams.id;
  vm.isSubmitted = false;
  hotelDataFactory.hotelDisplay(id).then(function(response) {
    vm.hotels = response.data;
    vm.stars = _getStarRating(response.data.stars);
  });
/////////////@get stars//////////////
  function _getStarRating(stars) {
    return new Array(stars);
  }
/////////////@form //////////////
  vm.addReview = function() {
    var postData = {
      name: vm.name,
      rating: vm.rating,
      review: vm.review
    };
    if (vm.reviewForm.$valid) {
      hotelDataFactory.postReview(id, postData).then(function(response) {
        if (response.status === 200) {
          $route.reload();
        }
      }).catch(function(error) {
        console.log(error);
      });
    } else {
      vm.isSubmitted = true;
    }
  };

}
