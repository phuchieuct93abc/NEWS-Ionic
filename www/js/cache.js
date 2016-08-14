angular.module('starter.service')
  .factory('cache', function($cacheFactory) {
    return $cacheFactory('app-cache');
  });
