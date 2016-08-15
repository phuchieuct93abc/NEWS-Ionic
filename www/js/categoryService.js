angular.module('starter.service', [])
  .service('CategoryService', function ($http,$filter,$q) {
    var categoryList = [];
    var LINK_CATEGORY = "http://dataprovider.touch.baomoi.com/json/articlelist.aspx?start={START_PAGE}&count=10&listType={LIST_TYPE}&listId={LIST_ID}&imageMinSize=300&mode=quickview";
    var duplicatedNumber = 0;
    var  ZONE_LIST_TYPE = "zone";

    var url= LINK_CATEGORY.replace("{LIST_TYPE}", ZONE_LIST_TYPE).replace("{LIST_ID}", 53);

    return {

      getCategoryList: function () {

        return [
          {
            id: "1",
            name: "Name",
            icon: "icon",

          }, {
            id: "2",
            name: "Name",
            icon: "icon"
          }, {
            id: "3",
            name: "Name",
            icon: "icon"
          }, {
            id: "4",
            name: "Name",
            icon: "icon"
          },
          {
            id: "5",
            name: "Name",
            icon: "icon"
          },
          {
            id: "6",
            name: "Name",
            icon: "icon"
          },


        ]


      },
      clean:function(){
          categoryList = [];
      },
      setListTypeAndZone:function(){
        url = LINK_CATEGORY.replace("{LIST_TYPE}", ZONE_LIST_TYPE).replace("{LIST_ID}", 53);

      },
      getArticleList:function(){
        return categoryList;
      },

      loadMore: function () {

        var deferred = $q.defer();




        var service=this;
        var getUrl = url.replace("{START_PAGE}", categoryList.length + duplicatedNumber);
        $http.get(getUrl).success(function (data) {
          var newData = data.articlelist;
          newData = (service.removeDupicateData(newData))
          categoryList = categoryList.concat(newData);
          deferred.resolve(newData);


        })
        return deferred.promise;

      },
      removeDupicateData: function (newData) {
        var idList = $filter('map')(categoryList, "ContentID");
        var omitedNewValue = $filter('omit')(newData, function (value) {
          return idList.indexOf(value.ContentID) >= 0

        })
        duplicatedNumber += newData.length - omitedNewValue.length;
        return omitedNewValue;


      }

    }


  })
