angular.module('starter.controllers')
  .controller('CategoryLisrCtrl', function($scope,$stateParams,$http,Cache) {
    $scope.title = $stateParams.categoryTitle;
    $scope.categoryId = $stateParams.categoryId;


    var LINK_CATEGORY = "http://dataprovider.touch.baomoi.com/json/articlelist.aspx?start={START_PAGE}&count=10&listType={LIST_TYPE}&listId={LIST_ID}&imageMinSize=300&mode=quickview";

    var  ZONE_LIST_TYPE = "zone";
    var SPECIAL_LIST_TYPE

    var url = LINK_CATEGORY.replace("{START_PAGE}",0).replace("{LIST_TYPE}",ZONE_LIST_TYPE).replace("{LIST_ID}",53)

    $scope.articlelist=[]
    $scope.$on('$stateChangeSuccess', function() {
      $scope.loadMore();
    });


    $scope.loadMore = function(){
      $http.get(url).success(function(data){

        $scope.articlelist = $scope.articlelist.concat(data.articlelist);
        Cache.put("feeds",$scope.articlelist)
        $scope.$broadcast('scroll.infiniteScrollComplete');


      })
    }
  })
