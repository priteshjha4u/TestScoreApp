'use strict';

define([
	'angular',
	'alertify',
    'jUI',
	'angularRoute',
	'xeditable',
	'services/localstorage'
	], function(angular, alertify) {
		angular.module('TestScore.TestStudents', ['ngRoute', 'xeditable', 'TestScore.localstorageservice'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/TestStudents', {
				templateUrl: 'TestStudents/TestStudents.html',
				controller: 'TestStudentsCtrl'
			});
			$routeProvider.when('/TestStudents/:id', {
				templateUrl: 'TestStudents/TestStudents.html',
				controller: 'TestStudentsCtrl'
			});
		}])
	// We can load the controller only when needed from an external file
	.controller('TestStudentsCtrl', ['$scope', '$injector', '$rootScope', '$routeParams', 'utility', '$location', function($scope, $injector, $rootScope, $routeParams, utility, $location) {
		$rootScope.rootTitle = 'Test Students';
		$rootScope.redirectToTestList = function() {
			$location.path('/TestList');
		}
		$rootScope.hideBtnViewList = false;
		$scope.currentTest = $routeParams.id;
		$scope.studentToAdd = {name:'', score:''};
		$scope.students = utility.getResults($scope.currentTest) || [];
		$scope.currentTestName = '';
        //$.jsPanel({position:'center',content:'Hello world'});
		var testArr = utility.getTests();
		for (var i = 0, len = testArr.length; i < len; ++i) {
			if ($scope.currentTest === testArr[i].id) {
				$scope.currentTestName = testArr[i].testName;
			}
		}

		if(!$scope.currentTestName) {
			$location.path('/TestList');
		}

    // Calculate and update test summary values
    $scope.setSummaryValues = function (students) {
    	var sum = 0,
    	count = 0,
    	score,
    	minScore = '',
    	maxScore = '';

    	angular.forEach(students, function (student) {
    		score = parseFloat(student.score);
    		sum += score || 0;

        // Only count actual numbers
        if ( !isNaN(score) ) {
        	count += 1;

        	if (minScore === '' || score < minScore) {
        		minScore = score;
        	}
        	if (maxScore === '' || score > maxScore) {
        		maxScore = score;
        	}
        }
    });
    	var avgScore = +(sum/count).toFixed(2);
    	$scope.avgScore = (isNaN(avgScore))? '' : avgScore;
    	$scope.minScore = minScore;
    	$scope.maxScore = maxScore;
    };

    $scope.setSummaryValues($scope.students);

    $scope.$watch('students', function (newValue, oldValue) {
    	if (newValue !== oldValue) {
    		utility.setResults($scope.currentTest, $scope.students);
    		$scope.setSummaryValues(newValue);
    	}
    }, true);

    $scope.addStudent = function () {
    	$scope.students.unshift( angular.copy($scope.studentToAdd) );
    	$scope.studentToAdd.name = '';
    	$scope.studentToAdd.score = '';
    };

    $scope.removeStudent = function (index) {
    	$scope.students.splice(index, 1);
    };

    $scope.removeAll = function () {
    	alertify.confirm('Are you sure you want to remove all student test results?', function (e) {
    		if (e) {
    			$scope.students = [];
    			$scope.$apply();
    		}
    		else {

    		}
    	});

    };

  }])
});

