'use strict';

/* Services */

var bpcServices = angular.module('bpcServices', ['ngResource']);
 
bpcServices.factory('Buildpack', ['$resource',
  function($resource){
    return $resource('/api/buildpacks/:bpid', {}, {
      query: {method:'GET', params:{bpid:''}, isArray:true}
    });
  }]
);
