'use strict';

/* Services */

var bpcServices = angular.module('bpcServices', ['ngResource']);
 
bpcServices.factory('Buildpack', ['$resource',
  function($resource){
    return $resource('/api/buildpacks/:bpid', {bpid: '@bpid'}, {
      //query: {method:'GET', params:{}, isArray:true, cache: true}
    });
  }]
);

bpcServices.factory('BuildpackRepos', function($resource){
    return $resource('https://api.github.com/search/repositories?q=buildpack+:q&per_page=100&page=:page', {page: '@page', q: '@q'}, {
      get: {method:'GET', cache: true}
    });
});

bpcServices.value('version','0.1');

