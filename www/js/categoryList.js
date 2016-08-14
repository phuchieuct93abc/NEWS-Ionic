angular.module('starter.controllers')
        .controller('CategoryLisrCtrl', function (CategoryService, $scope, $stateParams, $timeout,cache,$ionicScrollDelegate) {
          var headerHeight=0;

          $scope.scrollTo = function(position){

            var delegate = $ionicScrollDelegate.$getByHandle('categoryList');
            delegate.scrollTo(0,(420*position)+headerHeight,false);

          }
            $scope.title = $stateParams.categoryTitle;
            $scope.categoryId = $stateParams.categoryId;
            $scope.articlelist = CategoryService.getArticleList();

            $scope.loadMore = function () {
                CategoryService.loadMore(function (data) {
                    $scope.articlelist = $scope.articlelist.concat(data)
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $scope.$broadcast('scroll.refreshComplete');


                })



            };
            $scope.doRefresh = function () {
                CategoryService.clean();

                $scope.articlelist = []
                $timeout($scope.loadMore,500);

            };

          $scope.$on("$ionicView.beforeEnter", function(event, data){
            // handle event
            $scope.articlelist = CategoryService.getArticleList();

            var position = cache.get("selected-feed");
            if(position!=undefined){
              $scope.scrollTo(cache.get("selected-feed"))

            }
          });


        })
