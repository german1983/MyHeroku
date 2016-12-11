(function () {
    "use strict";

    angular.module("app")
        .controller("ExamShellController", examShellController);


    function examShellController(
        $scope,
        $window,
        $http
    )
    {
        $scope.evaluationTitle = "Evaluation Title goes here";
 
        $scope.init = function () {
  
        }

    }
})();