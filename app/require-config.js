'use strict';

if(window.__karma__) {
	var allTestFiles = [];
	var TEST_REGEXP = /spec\.js$/;

	var pathToModule = function(path) {
		return path.replace(/^\/base\/app\//, '').replace(/\.js$/, '');
	};

	Object.keys(window.__karma__.files).forEach(function(file) {
		if (TEST_REGEXP.test(file)) {
			// Normalize paths to RequireJS module names.
			allTestFiles.push(pathToModule(file));
		}
	});
}

require.config({
	paths: {
		angular: 'bower_components/angular/angular',
		angularRoute: 'bower_components/angular-route/angular-route',
		jquery: 'bower_components/jquery/dist/jquery.min',
		angularMocks: 'bower_components/angular-mocks/angular-mocks',
		xeditable: 'bower_components/angular-xeditable/dist/js/xeditable',
		text: 'bower_components/requirejs-text/text',
		alertify: 'bower_components/alertify.js/lib/alertify.min',
		jUI: 'bower_components/jquery-ui/jquery-ui.min',
		jsPanel: 'bower_components/jspanel/source/jquery.jspanel.min'
	},
	shim: {
		'angular' : {
			deps:['jquery'],
			'exports' : 'angular'
		},
		'angularRoute': ['angular'],
		'angularMocks': {
			deps:['angular'],
			'exports':'angular.mock'
		},
		'xeditable' : {
			deps: ['angular']
		},
		'jquery' : {
			'exports':'$'
		}
	},
	priority: [
		"angular"
	],
	deps: window.__karma__ ? allTestFiles : [],
	callback: window.__karma__ ? window.__karma__.start : null,
	baseUrl: window.__karma__ ? '/base/app' : '',
});

require([
	'angular',
	'app'
	], function(angular, app) {
		var $html = angular.element(document.getElementsByTagName('html')[0]);
		angular.element().ready(function() {
			// bootstrap the app manually
			angular.bootstrap(document, ['TestScore']);
		});
	}
);