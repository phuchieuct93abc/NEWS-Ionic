angular.module('starter.controllers').directive('feedView', function ($http) {
    return {
        scope: {
            selectedFeed: "="
        },
        templateUrl: "templates/FeedView.html",
        controller: function ($scope) {
            var LINK_FEED_CONTENT = "http://dataprovider.touch.baomoi.com/json/article.aspx?articleId={ID}";
            var feedId = $scope.selectedFeed.ContentID;
            $http.get(LINK_FEED_CONTENT.replace("{ID}", feedId), {cache: true}).success(function (data) {
                $scope.selectedFeed.Body = data.article.Body;
            })
            $scope.openSource = function () {
                try {
                    console.log($scope.selectedFeed.ContentUrl);
                    window.open($scope.selectedFeed.ContentUrl, '_self', 'location=yes');
                } catch (e) {
                    console.log(e);
                }
            };
        }
    };
});
