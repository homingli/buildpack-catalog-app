'use strict';

/* App Module */
var bpcApp = angular.module('bpcApp', [
  'ngRoute',
  'buildpackControllers',
  'buildpackFilters',
  'bpcServices'
]);

bpcApp.config(['$routeProvider','$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider.
      when('/buildpacks/new', {
        templateUrl: '/partials/new.html',
        controller: 'BuildpackNewCtrl'
      }).
      when('/buildpacks/:bpid', {
        templateUrl: '/partials/new.html',
        controller: 'BuildpackEditCtrl'
      }).
      when('/buildpacks/view/:bpid', {
        templateUrl: '/partials/view.html',
        controller: 'BuildpackViewCtrl',
      }).
      when('/buildpacks/', {
        templateUrl: '/partials/list.html',
        controller: 'BuildpackListCtrl',
      }).
      otherwise({
        redirectTo: '/buildpacks/'
      });
}]);

/*
bpcApp.run(function($rootScope,$route){
  $rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
    //Change page title, based on Route information
    $rootScope.title = currentRoute.title;
  });
});
*/
