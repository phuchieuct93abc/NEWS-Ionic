angular.module('starter.controllers')
  .controller('FeedViewCtrl', function($scope,$stateParams,Cache,$filter,$http) {
    $scope.feedId = $stateParams.feedId;
    var feedList = Cache.get("feeds");
    var LINK_FEED_CONTENT = "http://dataprovider.touch.baomoi.com/json/article.aspx?articleId={ID}";



    $scope.selectedFeed = $filter("where")(feedList,{ContentID:$scope.feedId})[0];

    $http.get(LINK_FEED_CONTENT.replace("{ID}", $scope.feedId),{cache:true}).success(function(data){
      console.log(data);
      $scope.selectedFeed.Body = data.article.Body


    })
    $scope.$on('$stateChangeSuccess', function() {

    });


  })
