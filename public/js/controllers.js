'use strict';

/* Controllers */

var buildpackControllers = angular.module('buildpackControllers', []);

/* uses Service */
buildpackControllers.controller('BuildpackListCtrl', ['$scope','Buildpack', function ($scope, Buildpack,$http) {
   $scope.buildpacks = Buildpack.query();
}]);

/* uses http */
/*buildpackControllers.controller('BuildpackListCtrl', function BuildpackListCtrl($scope, $http) {
  $http.get('/api/buildpacks').
  success(function(data) {
    $scope.buildpacks = data;
  });
});*/

buildpackControllers.controller('BuildpackDetailCtrl', 
  ['$scope', '$routeParams', 'Buildpack' ,function($scope, $routeParams, Buildpack) {
    $scope.buildpack = Buildpack.get({bpid: $routeParams.bpid}, function(data) {
      $scope.buildpack = data;
    });
  }]
);
