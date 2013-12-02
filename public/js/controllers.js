'use strict';

/* Controllers */

var buildpackControllers = angular.module('buildpackControllers', []);

/* uses Service */
/*
buildpackControllers.controller('BuildpackListCtrl', ['$scope','Buildpack', function ($scope, Buildpack,$http) {
   $scope.buildpacks = Buildpack.query();
}]);
*/

/* uses http */
buildpackControllers.controller('BuildpackListCtrl', function BuildpackListCtrl($scope, $http) {
  $http.get('/api/buildpacks').
  success(function(data) {
    $scope.buildpacks = data;
  }).
  error(function(data, status, headers, config) {
    if (data) console.log(data);
    console.log(status);
  });
});

/*
buildpackControllers.controller('BuildpackDetailCtrl', 
  ['$scope', '$routeParams', 'Buildpack' ,function($scope, $routeParams, Buildpack) {
    $scope.buildpack = Buildpack.get({bpid: $routeParams.bpid}, function(data) {
      $scope.buildpack = data;
    });
  }]
);
*/

buildpackControllers.controller('BuildpackEditCtrl', function BuildpackEditCtrl($scope, $routeParams, $location, $http) {
  var bpurl = '/api/buildpacks/'+$routeParams.bpid;

  $http.get(bpurl).
  success(function(data) {
    $scope.buildpack = data;
  });

  $scope.delete = function() {
    $http.delete(bpurl).
    success(function(data) {
      console.log(data);
      $location.path('buildpacks');
    });
  }

   $scope.addTag = function() {
     if ($scope.tag) {
       $scope.buildpack.tags.push($scope.tag);
       $scope.newForm.$setDirty();
     }
   };
 
   $scope.removeTag = function(index) {
     $scope.buildpack.tags.splice(index, 1);
     $scope.newForm.$setDirty();
   };


  $scope.save = function() {
    $http.put('/api/buildpacks/'+$scope.buildpack._id,$scope.buildpack).
    success(function(data) {
      console.log(data);
      $location.path('buildpacks');
    }).
    error(function(err) {
      console.log(err);
    });
  };

  $scope.$eval(function() {

        /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
        var disqus_shortname = 'buildpack-catalog';
        var disqus_identifier = $routeParams.bpid;

        /* * * DON'T EDIT BELOW THIS LINE * * */
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  });

});

buildpackControllers.controller('BuildpackNewCtrl', function BuildpackNewCtrl($scope, $location, $http) {

   $scope.addTag = function() {
     if ($scope.tag) {
       $scope.buildpack.tags.push($scope.tag);
       $scope.newForm.$setDirty();
     }
   };
 
   $scope.removeTag = function(index) {
     $scope.buildpack.tags.splice(index, 1);
     $scope.newForm.$setDirty();
   };

  $scope.save = function() {
    $http.post('/api/buildpacks',$scope.buildpack).
    success(function(data) {
      console.log(data);
      $location.path('buildpacks');
    });
  };
});
