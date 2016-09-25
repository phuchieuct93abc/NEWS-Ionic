angular.module('starter.controllers').controller('ViewPagerCtrl', function ($scope, $stateParams, CategoryService, cache, $localStorage) {
    $scope.articlelist = CategoryService.getArticleList();
    $scope.indexOfSelectedFeed = parseInt($stateParams.feedIndex);
    $localStorage.$default({
        unread: {}
    });

    cache.put("selected-feed", $scope.indexOfSelectedFeed);
    $scope.$on("$ionicView.enter", function (event, data) {
        console.log(data)
        cache.put("selected-feed", $scope.indexOfSelectedFeed)

    });
    $scope.model = {
        activeIndex: parseInt($stateParams.feedIndex)
    }


    $scope.loadMore = function () {

        CategoryService.loadMore().then(function (data) {
            $scope.articlelist = $scope.articlelist.concat(data)

        })


    };


    $scope.options = {
        loop: false,
        speed: 500,
        pagination: ""
    }

    $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
        // data.slider is the instance of Swiper
        $scope.slider = data.slider;
        $scope.slider.slideTo($scope.indexOfSelectedFeed, 0);
    });

    $scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
        $scope.model.activeIndex = data.slider.activeIndex;
        //Set read with feed at activeIndex
        $localStorage.unread[$scope.articlelist[$scope.model.activeIndex].ContentID] = true

        cache.put("selected-feed", $scope.model.activeIndex);

        $scope.$evalAsync();

        if ($scope.model.activeIndex >= $scope.articlelist.length - 2){
            $scope.loadMore();
        }
    });




})
