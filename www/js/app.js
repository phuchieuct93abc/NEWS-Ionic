
angular.module('starter', ['ionic', 'starter.controllers','starter.service','angular.filter',"ngCordova",'ionic-material'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

      var db = null;

      document.addEventListener('deviceready', function() {
        console.log("run")
        db = window.sqlitePlugin.openDatabase({name: 'demo.db', location: 'default'});
        // db.transaction(function(tx) {
        //   tx.executeSql('CREATE TABLE IF NOT EXISTS DemoTable (name, score)');
        //   tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101]);
        //   tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]);
        // }, function(error) {
        //   console.log('Transaction ERROR: ' + error.message);
        // }, function() {
        //   alert('Populated database OK');
        // });


        db.transaction(function(tx) {
          tx.executeSql('SELECT count(*)  FROM DemoTable', [], function(tx, rs) {
           console.log('Record count (expected to be 2): ' , rs.rows.item(0));

          }, function(tx, error) {
            console.log('SELECT error: ' + error.message);
          });
        });
      });




  });
})
  .factory('Cache', function($cacheFactory) {
    return $cacheFactory('cache');
  })

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
    .state('app.category', {
      url: '/category',
      views: {
        'menuContent': {
          templateUrl: 'templates/category.html',
          controller: 'CategoryCtrl'
        }
      }
    })
    .state('app.categoryList', {
      url: '/category/:categoryId/:categoryTitle',
      views: {
        'menuContent': {
          templateUrl: 'templates/categoryList.html',
          controller: 'CategoryLisrCtrl'
        }
      }
    })
    .state('app.feedView', {
      url: '/feed/:feedIndex/',
      views: {
        'menuContent': {
          templateUrl: 'templates/viewPager.html',
          controller: 'ViewPagerCtrl'
        }
      }
    })


  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/category');
});
