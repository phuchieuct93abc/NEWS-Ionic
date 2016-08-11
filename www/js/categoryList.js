angular.module('starter.controllers')
  .controller('CategoryLisrCtrl', function($scope,$stateParams,$http,Cache,$filter) {
    $scope.title = $stateParams.categoryTitle;
    $scope.categoryId = $stateParams.categoryId;
    var duplicatedNumber = 0;

    var LINK_CATEGORY = "http://dataprovider.touch.baomoi.com/json/articlelist.aspx?start={START_PAGE}&count=10&listType={LIST_TYPE}&listId={LIST_ID}&imageMinSize=300&mode=quickview";

    var  ZONE_LIST_TYPE = "zone";
    var url = LINK_CATEGORY.replace("{LIST_TYPE}",ZONE_LIST_TYPE).replace("{LIST_ID}",53)

    $scope.articlelist=[];
    $scope.loadMore = function(){
      var getUrl  = url.replace("{START_PAGE}",$scope.articlelist.length+duplicatedNumber);
      $http.get(getUrl).success(function(data){
                    var newData = data.articlelist;

        $scope.articlelist = $scope.articlelist.concat(removeDupicateData(newData));
        Cache.put("feeds",$scope.articlelist);
        $scope.$broadcast('scroll.infiniteScrollComplete');


      })
    }
    $scope.loadMore();

    function removeDupicateData(newData){
      var idList = $filter('map')($scope.articlelist,"ContentID");
      var omitedNewValue = $filter('omit')(newData,function(value){
        return idList.indexOf(value.ContentID)>=0

      })
      duplicatedNumber+=newData.length - omitedNewValue.length;
      console.log(omitedNewValue)
      return omitedNewValue;


    }
  })
