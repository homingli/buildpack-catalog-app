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
        templateUrl: 'partials/new.html',
        controller: 'BuildpackNewCtrl'
      }).
      when('/buildpacks/:bpid', {
        templateUrl: 'partials/new.html',
        controller: 'BuildpackEditCtrl'
      }).
      when('/buildpacks/', {
        templateUrl: 'partials/list.html',
        controller: 'BuildpackListCtrl'
      }).
      otherwise({
        redirectTo: '/buildpacks/'
      });
  }]);
