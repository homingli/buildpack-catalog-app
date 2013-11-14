'use strict';

/* App Module */
var bpcApp = angular.module('bpcApp', [
  'ngRoute',
  'buildpackControllers',
  //'buildpackFilters',
  'bpcServices'
]);

bpcApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/buildpacks/new', {
        templateUrl: 'partials/new.html'
      }).
      when('/buildpacks/:bpid', {
        templateUrl: 'partials/detail.html',
        controller: 'BuildpackDetailCtrl'
      }).
      when('/buildpacks', {
        templateUrl: 'partials/list.html',
        controller: 'BuildpackListCtrl'
      }).
      otherwise({
        redirectTo: '/buildpacks'
      });
  }]);
