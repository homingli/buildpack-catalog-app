'use strict';

/* Services */

var bpcServices = angular.module('bpcServices', ['ngResource']);
 
bpcServices.factory('Buildpack', ['$resource',
  function($resource){
    return $resource('/api/buildpacks/:bpid', {bpid: '@bpid'}, {
      //query: {method:'GET', params:{}, isArray:true, cache: true}
      query: {method:'GET', params:{}, isArray:true}
    });
  }]
);
