'use strict';
define([
	'angular',
	'alertify',
	'angularRoute',
	'xeditable',
	'services/localstorage'
	], function(angular, alertify) {
		angular.module('TestScore.TestList', ['ngRoute', 'xeditable', 'TestScore.localstorageservice'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/TestList', {
				templateUrl: 'TestList/TestList.html',
				controller: 'TestListCtrl'
			});
		}])
		.run(function(editableOptions) {
	  		editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
	  	})
		.controller('TestListCtrl', ['$scope', '$route', '$filter', '$rootScope', '$location', 'utility', function($scope, $route, $filter, $rootScope, $location, utility) {
			
			$rootScope.rootTitle = 'Test List';
			$rootScope.hideBtnViewList = true;
			$scope.tests = utility.getTests();
			console.log($scope.tests);
			$scope.localStorageNotSupported = utility.localStorageNotSupported;
			
			$scope.routeToTest = function (testName) {
				$location.path('TestStudents/'+testName);
			};

			$scope.addTest = function (testName) {
				var id = utility.getGuid(), testObj = {id:id, testName:testName};
				var testAdded = utility.addTest(testObj);
				if (testAdded) {
					$scope.routeToTest(testObj.id);
				}
				else {
					alertify.alert('This test name already exists!');
				}
			};

			$scope.updateTestName = function(val, id) {
				//var tests = $scope.tests = utility.getTests();
				var testArr = utility.getTests();
				for (var i = 0, len = testArr.length; i < len; ++i) {
					if (id === testArr[i].id) {
						testArr[i].testName = val;
					}
				}
				var stringifiedData = JSON.stringify(testArr, function(key, val) {
					if(key === '$$hashKey') {
						return undefined;
					}
					return val;
				});
				localStorage.setItem(utility.testStorageId, stringifiedData);
				$scope.tests = utility.getTests();
				return true;
			};


			$scope.removeTest = function (index) {
				alertify.confirm('Are you sure you want to remove this test and all associated data?', function (e) {
						if (e) {
							var testRemoved = utility.deleteTest($scope.tests[index]);
							if (testRemoved) {
								$scope.tests.splice(index, 1);
							//console.log($scope.tests);
							//$location.path('/view1');
							$route.reload();
						}
					} else {
						
					}
				});
			};

		}]);
});

