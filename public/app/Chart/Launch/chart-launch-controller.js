(function (angular) {
    "use strict";

    angular.module("Chart")
        .controller("ChartLaunchController", chartLaunchController);


    function chartLaunchController(
        $scope,
        $window,
        $http
    )
    {
        $scope.userName = "";
        $scope.projectName = '';
        $scope.init = function () {
 
        }
    }
})(angular);