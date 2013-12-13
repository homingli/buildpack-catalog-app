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
buildpackControllers.controller('BuildpackListCtrl', function BuildpackListCtrl($scope, $http, $filter) {
  $http.get('/api/buildpacks').
  success(function(data) {
    $scope.buildpacks = data;
    document.title="Buildpack Catalog";

  $scope.currentPage = 1;
  $scope.numPerPage = 20;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
    var filtered_list = $filter('filter')($scope.buildpacks,$scope.query);
    $scope.totalItems = filtered_list.length;
    var offset = ($scope.currentPage - 1) * $scope.numPerPage;
    $scope.data = filtered_list.slice(offset,offset + $scope.numPerPage);
  };

  $scope.rePaginate = function (q) {
    $scope.currentPage = 1;
    var filtered_list = $filter('filter')($scope.buildpacks,q);
    $scope.totalItems = filtered_list.length;
    var offset = ($scope.currentPage - 1) * $scope.numPerPage;
    $scope.data = filtered_list.slice(offset,offset + $scope.numPerPage);
  };

  $scope.$watch( 'query', $scope.rePaginate );
  $scope.$watch( 'currentPage', $scope.setPage );

  }).
  error(function(data, status, headers, config) {
    if (data) console.log(data);
    console.log(status);
  });

});

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
});

buildpackControllers.controller('BuildpackViewCtrl', function BuildpackViewCtrl($scope, $routeParams, $location, $http) {

  var bpurl = '/api/buildpacks/'+$routeParams.bpid;

  $http.get(bpurl).
  success(function(data) {
    $scope.buildpack = data;

        var disqus_shortname = 'buildpack-catalog';
        var disqus_url = document.URL;
	var disqus_identifier = $location.path();
        document.title=$scope.buildpack.name;
        var disqus_title=$scope.buildpack.name;

        (function() {
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();

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

buildpackControllers.controller('BuildpackListGithubReposCtrl', ['$scope','BuildpackRepos', function ($scope, BuildpackRepos) {

    // Instantiate an object to store your scope data in (Best Practices)
    $scope.myData = {
      currentBuildpack: null,
      BuildpackList: [],
      BuildpackListTotal: 0,
      BuildpackListPerPage: 50,
      BuildpackListPage: 1,
      BuildpackSearchTerm: '',
      error: {}
    };

    $scope.setBuildpackList = function() {
      BuildpackRepos.get({
        page: $scope.myData.BuildpackListPage,
        q: $scope.myData.BuildpackSearchTerm,
        perpage: $scope.myData.BuildpackListPerPage
      },
      function(data) {
        $scope.myData.BuildpackList = data.items;
        $scope.myData.BuildpackListTotal = data.total_count;
        $scope.myData.error = {};
      },
      function(error) {
        console.error(error.status, ':', error.data.message);
        $scope.myData.BuildpackList = [];
        $scope.myData.error = error;
      });
    };
    
    $scope.Object = Object; // for Object.keys()

    $scope.updateBuildpackList = function(direction) {
      if (direction=='p' && $scope.myData.BuildpackListPage > 1) {
        $scope.myData.BuildpackListPage--;
      }
      else if (direction=='n') {
        $scope.myData.BuildpackListPage++;
      }
      else {
        return;
      }
      $scope.setBuildpackList();
    };

    $scope.setBuildpackList();

}]);
