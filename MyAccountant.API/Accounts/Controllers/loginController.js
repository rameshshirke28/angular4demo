'use strict';
app.controller('loginController', function ($scope, $timeout, $location, authService, ngAuthSettings, $state) {

    $scope.loginData = {
        emailid:"",
        password: "",
        useRefreshTokens: false
    };

	$scope.message = "";
	$scope.msgClass = "";

    $scope.login = function () {
        $('#btnSubmit').button('loading');
        authService.login($scope.loginData).then(function (response) {
            if (response.success) {
                window.location.href = ngAuthSettings.pageBaseUrl + 'dashboard.html';
            }
            else{
                $scope.msgClass = "alert alert-danger";
                $scope.message = response.message;
                startMsgTimer();
            }
        },
         function (err) {
             //$scope.message = err.error_description;
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
});
