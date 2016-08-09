angular.module('starter.service', [])
  .service('CategoryService', function () {
    return {

      getCategoryList: function () {

        return [
          {
            id: "1",
            name: "Name",
            icon: "icon"
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


        ]


      }

    }


  })
