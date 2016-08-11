angular.module('starter.controllers')
  .controller('CategoryLisrCtrl', function(CategoryService,$scope,$stateParams,$http,Cache,$filter) {
    $scope.title = $stateParams.categoryTitle;
    $scope.categoryId = $stateParams.categoryId;



    $scope.articlelist=CategoryService.getArticleList();

    $scope.loadMore = function(){
      CategoryService.loadMore(function(data){
        $scope.articlelist =$scope.articlelist.concat(data)
        $scope.$broadcast('scroll.infiniteScrollComplete');

      })



    };

  })
