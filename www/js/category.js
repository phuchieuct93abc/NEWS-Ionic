angular.module('starter.controllers')
  .controller('CategoryCtrl', function($scope,CategoryService) {
  var category = CategoryService.getCategoryList();
    $scope.categories=[]
    while(category.length>0){
      $scope.categories.push(category.splice(0,2));

    }


})
