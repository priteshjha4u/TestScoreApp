'use strict';
define([
	'angular'
	], function(angular) {
		var myApp = angular.module('TestScore.localstorageservice', []);

		myApp.factory('utility', function() {

			var testStorageId = 'TestScoreStorage',
				tests;
		
			var localStorageNotSupported = false;
			if(typeof localStorage == undefined) {
				localStorageNotSupported = true;
			}

			function getTests() {
				return JSON.parse(localStorage.getItem(testStorageId) || '[]');
			}
			
			function getGuid(){
				return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
					return v.toString(16);
				});
			}

			return {
				getGuid: getGuid,
				getTests: getTests,

				addTest: function (newTestKey) {
					
					if (newTestKey.testName === testStorageId) {
						return false;
					}
					// Check to make sure the test won't be a duplicate
					tests = getTests();
					for (var i = 0, len = tests.length; i < len; ++i) {
						if (newTestKey.testName === tests[i].testName) {
							// Unsuccessful addition
							return false;
						}
					}
					// Add the test to front
					tests.unshift(newTestKey);
					localStorage.setItem(testStorageId, JSON.stringify(tests));
					return true;
				},

				deleteTest: function (testToDeleteKey) {
					// Find the test and remove it
					tests = getTests();
					for (var i = 0, len = tests.length; i < len; ++i) {
						if (testToDeleteKey.id === tests[i].id) {
							tests.splice(i, 1);
							// Redefine the tests with the test removed
							localStorage.setItem(testStorageId, JSON.stringify(tests));

							// Remove associated results data
							localStorage.removeItem(testToDeleteKey.id);
							// Successful
							return true;
						}
					}
					// Couldn't find the matching test
					return false;
				},

				// Get the results for a specific test
				getResults: function (testKey) {
					if (!testKey || testKey === testStorageId) {
						// Not allowed
						return false;
					}
					return JSON.parse(localStorage.getItem(testKey) || '[]');
				},

				// Set the results for a specific test
				setResults: function (testKey, students) {
					if (testKey === testStorageId) {
						// Not allowed
						return false;
					}
					var stringifiedData = JSON.stringify(students, function(key, val) {
						if(key === '$$hashKey') {
							return undefined;
						}
						return val;
					});
					localStorage.setItem(testKey, stringifiedData);
				},
				//local storage support check

				localStorageNotSupported : localStorageNotSupported,
				testStorageId: testStorageId
			};

		});

		return myApp;

	});

