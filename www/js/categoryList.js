angular.module('starter.controllers')
        .controller('CategoryLisrCtrl', function ($localStorage,CategoryService, $scope, $stateParams, $timeout, cache, $ionicScrollDelegate, ionicMaterialInk,ionicMaterialMotion) {
            var headerHeight = 0;
    $scope.model = {}
    $scope.model.unReadList = $localStorage.unread;
    console.log($scope.model.unReadList)

            $scope.scrollTo = function (position) {

                var delegate = $ionicScrollDelegate.$getByHandle('categoryList');
                delegate.scrollTo(0, (320 * position) + headerHeight, false);

            }
            $scope.title = $stateParams.categoryTitle;
            $scope.categoryId = $stateParams.categoryId;
            $scope.articlelist = [];
            CategoryService.clean();


            $scope.loadMore = function (timeout) {

                $timeout(function () {
                    CategoryService.loadMore().then(function (data) {
                        $timeout(function () {
                            console.log('run')
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            $scope.$broadcast('scroll.refreshComplete');




                        })

                        $scope.articlelist = $scope.articlelist.concat(data)




                    })


                }, 500)



            };
            $scope.doRefresh = function () {
                CategoryService.clean();
                $scope.articlelist = []
                $timeout($scope.loadMore, 500);

            };


            $scope.$on("$ionicView.beforeEnter", function (event, data) {
                // handle event


                $scope.articlelist = CategoryService.getArticleList();
                var position = cache.get("selected-feed");
                if (position != undefined) {
                  $scope.scrollTo(cache.get("selected-feed"))

                }



            });



        })
