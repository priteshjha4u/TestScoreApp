'use strict';

define([
	'angular',
	'angularRoute',
	'TestList/TestList',
	'TestStudents/TestStudents'
], function(angular, angularRoute, TestList, TestStudents) {
	// Declare app level module which depends on views, and components
	return angular.module('TestScore', [
		'ngRoute',
		'TestScore.TestList',
		'TestScore.TestStudents'
	]).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/TestList'});
	}])
	.run(['$rootScope', function ($rootScope) {
        $rootScope.hideBtnViewList = true;
    }]);
});

