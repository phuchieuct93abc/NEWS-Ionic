angular.module('starter.controllers')
  .controller('CategoryCtrl', function($scope,CategoryService) {
  $scope.category = CategoryService.getCategoryList();
})
