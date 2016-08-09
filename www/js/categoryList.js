angular.module('starter.controllers')
  .controller('CategoryLisrCtrl', function($scope,$stateParams) {
    $scope.title = $stateParams.categoryTitle;
    console.log($stateParams)
    $scope.categoryId = $stateParams.categoryId


})
