angular.module('starter.controllers')
        .controller('ViewPagerCtrl', function ($scope, $stateParams, CategoryService, $filter, $timeout,$http,$ionicSlideBoxDelegate) {
            $scope.articlelist = CategoryService.getArticleList();
            $scope.indexOfSelectedFeed = parseInt($stateParams.feedIndex);
        $scope.model={
          activeIndex:parseInt($stateParams.feedIndex)
        }



          $scope.loadMore = function(){
            CategoryService.loadMore(function(data){
              $scope.articlelist =$scope.articlelist.concat(data)

            })



          };




          $scope.options = {
            loop: false,
            speed: 500,
          }

          $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
            // data.slider is the instance of Swiper
            $scope.slider = data.slider;
            $scope.slider.slideTo($scope.indexOfSelectedFeed,0);
          });

          $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
            var activeIndex = data.slider.activeIndex
            var previousIndex = data.slider.previousIndex;
            console.log(previousIndex,activeIndex)

            if(activeIndex==previousIndex+1){
              $scope.model.activeIndex++;

            }else if(activeIndex==previousIndex-1){
              $scope.model.activeIndex--;


            }



            $scope.$evalAsync()
            $scope.previousIndex = data.previousIndex;
            if ($scope.model.activeIndex  >= $scope.articlelist.length - 2) {
              $scope.loadMore();
            }
          });





        })
