'use strict';
app.controller('forgotPasswordController', function ($scope, $location, $timeout, authService, ngAuthSettings, $state) {

	$scope.forgotPwdData = {
		emailid: "",
		useRefreshTokens: false
	};

	$scope.message = "";

	$scope.Submit = function () {
		apiService.forgotPassword($scope.forgotPwdData).then(function (response) {
			if (response.success) {
				//window.location.href = ngAuthSettings.pageBaseUrl + 'dashboard.html';
			}
			else {
				$scope.msgClass = "alert alert-danger";
				$scope.message = response.message;
				startMsgTimer();
			}
		},
			function (err) {
				$scope.msgClass = "alert alert-danger";
				$scope.message = err.error_description;
				startMsgTimer();
			});
	};

	var startMsgTimer = function () {
		var timer = $timeout(function () {
			$timeout.cancel(timer);
			$scope.msgClass = "";
			$scope.message = "";
		}, 4000);
	}
}};
