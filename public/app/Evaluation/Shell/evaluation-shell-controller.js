(function () {
    "use strict";

    angular.module("app")
        .controller("EvaluationShellController", evaluationShellController);


    function evaluationShellController(
        $scope,
        $window,
        $http,
        questionFactory,
        $evaluationSharedService,
        EvaluationStatus
    )
    {
        $scope.evalId = $evaluationSharedService.evaluationId;
        $scope.testId = $evaluationSharedService.testId;
        $scope.evaluationStarted = false;
        $scope.evaluationFinished = false;

        $scope.$watch('evaluationStarted', function (newValue, oldValue) {
            if (newValue !== oldValue) EvaluationStatus.setStatus(newValue);
        });

        $scope.$watch(function () { return EvaluationStatus.getStatus(); }, function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.evaluationStarted = newValue;
                $scope.evaluationFinished = !newValue;
            }
        });

        $scope.questionUrl = "/views/Evaluation/question.html";
        $scope.finishedUrl = "/views/Evaluation/finished.html";
        $scope.init = function () {
  
        }

        $scope.isEvaluationStarted = function(){
            return $evaluationSharedService.evaluationStarted;
        }

        $scope.startEvaluation = function(){
            console.log("The evaluation should begin ");
            $scope.evaluationStarted = true;
        }
    }
})();