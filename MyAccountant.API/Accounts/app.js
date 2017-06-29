app.config(function ($stateProvider, $urlRouterProvider, ngAuthSettings) {
	var pageUrl = ngAuthSettings.pageBaseUrl;
	$urlRouterProvider.otherwise('/login');

	$stateProvider
		.state('login', {
			// Posts list state. This state is child of posts state
			url: '/login',
			controller: "loginController",
			templateUrl: pageUrl + 'Accounts/views/login.html'
		})
		.state('signup', {
			// Posts info state. This state is child of posts state
			url: '/signup',
			controller: "signupController",
			templateUrl: pageUrl + 'Accounts/views/signup.html'
		})
		.state('forgotPassword', {
			// Posts info state. This state is child of posts state
			url: '/forgotPassword',
			controller: "forgotPasswordController",
			templateUrl: pageUrl + 'Accounts/views/forgotPassword.html'
		})
});
