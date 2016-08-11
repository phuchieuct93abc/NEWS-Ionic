angular.module('starter.controllers')
        .controller('ViewPagerCtrl', function ($scope, $stateParams, Cache, $filter, $timeout,$http,$ionicSlideBoxDelegate) {
            var LINK_CATEGORY = "http://dataprovider.touch.baomoi.com/json/articlelist.aspx?start={START_PAGE}&count=10&listType={LIST_TYPE}&listId={LIST_ID}&imageMinSize=300&mode=quickview";
            duplicatedNumber = 0;
            var ZONE_LIST_TYPE = "zone";
            var url = LINK_CATEGORY.replace("{LIST_TYPE}", ZONE_LIST_TYPE).replace("{LIST_ID}", 53)
            $scope.articlelist = Cache.get("feeds");
            $scope.indexOfSelectedFeed = parseInt($stateParams.feedIndex);


            $timeout(function(){
                $ionicSlideBoxDelegate.update();
            },2000)

            $scope.$on("tab-changed-position", function (event, $index) {
                if ($index >= $scope.articlelist.length - 2) {
                    $scope.loadMore()
                }

            });

            $scope.loadMore = function () {
                var getUrl = url.replace("{START_PAGE}", $scope.articlelist.length + duplicatedNumber);
                $http.get(getUrl).success(function (data) {
                    var newData = data.articlelist;

                    $scope.articlelist = $scope.articlelist.concat(removeDupicateData(newData));
                    Cache.put("feeds", $scope.articlelist);
                    $scope.$broadcast('scroll.infiniteScrollComplete');


                })
            }
            function removeDupicateData(newData) {
                var idList = $filter('map')($scope.articlelist, "ContentID");
                var omitedNewValue = $filter('omit')(newData, function (value) {
                    return idList.indexOf(value.ContentID) >= 0

                })
                duplicatedNumber += newData.length - omitedNewValue.length;
                console.log(omitedNewValue)
                return omitedNewValue;


            }



        })
