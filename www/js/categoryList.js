angular.module('starter.controllers')
        .controller('CategoryLisrCtrl', function (CategoryService, $scope, $stateParams, $timeout) {
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

        })
