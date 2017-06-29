'use strict';
app.controller('signupController', function ($scope, $location, $timeout, authService, $state) {

    $scope.registration = {
        username: "",
        email: "",
        mobile: "",
        password: "",
        confirm_password: ""
	};

	$scope.message = "";
	$scope.msgClass = "";

	$scope.signUp = function () {
		$('#btnSubmit').button('loading');
		var response = apiService.register($scope.registration).then(function (results) {
			if (results.data.success) {
				$scope.msgClass = "alert alert-success";
				$scope.message = "Verification link has been sent to your registered email id. Please verify. You will be redirected to login page in 4 seconds.";
				startTimer();
			}
			else {
				$scope.msgClass = "alert alert-danger";
				$scope.message = results.data.message;
				startMsgTimer();
			}
		}, function (error) {
			//alert(error.data.message);
			$scope.msgClass = "alert alert-danger";
			$scope.message = error.data.message;
			startMsgTimer();
		});
	};

    
    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $state.go("login");
        }, 4000);
    }

    var startMsgTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $scope.msgClass = "";
            $scope.message = "";
        }, 4000);
    }
}]);