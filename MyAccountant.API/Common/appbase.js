var app = angular.module('myAccountantApp', ['LocalStorageModule', 'ui.router', 'ngMessages']);

var apiBaseUrl = 'http://localhost:50225/';
var pageBaseUrl = 'http://localhost:50225/';

app.constant('ngAuthSettings', {
	apiBaseUrl: apiBaseUrl,
	pageBaseUrl: pageBaseUrl,
	clientId: 'ngAuthApp'
});

app.config(function ($httpProvider) {
	$httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', function (authService) {
	authService.fillAuthData();
}]);
