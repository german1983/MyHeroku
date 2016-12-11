(function () {
    "use strict";

    angular.module("app")
        .controller("EvaluationQuestionController", evaluationQuestionController);


    function evaluationQuestionController(
        $scope,
        $window,
        $http,
        $timeout,
        questionFactory,
        $evaluationSharedService,
        EvaluationStatus
    )
    {
        $scope.testId = $evaluationSharedService.testId;
        $scope.evaluationId = $evaluationSharedService.evaluationId;
        $scope.counter = 4;
        $scope.questionNumber = 1;
        $scope.totalQuestions = 2;

        $scope.evaluationStarted = EvaluationStatus.getStatus();

        $scope.$watch('evaluationStarted', function (newValue, oldValue) {
            if (newValue !== oldValue) EvaluationStatus.setStatus(newValue);
        });

        $scope.answer = {
            question_id: undefined,
            evaluation_id: undefined,
            consumedTime: 0,
            option_id: undefined
        }

        $scope.onTimeout = function(){
            if ($scope.counter <= 0){
                $scope.answerQuestion();
                $timeout.cancel(mytimeout);
                return;
            }
            $scope.counter--;
            $scope.answer.consumedTime++;
            mytimeout = $timeout($scope.onTimeout,1000);
        }
        var mytimeout = $timeout($scope.onTimeout,1000);
    
        $scope.question = "This is not a question";
        $scope.options = [];

        $scope.selectedOption = {
                option: undefined
            };
        $scope.init = function () {
            $scope.getNextQuestion();
        }

        $scope.getNextQuestion = function(){
              questionFactory.getNextEvaluationQuestion($scope.evaluationId, $scope.questionNumber).then(function (nextQuestion) {
                console.log(JSON.stringify(nextQuestion));
                $scope.counter = nextQuestion.data[0].assignedTime;
                $scope.question = nextQuestion.data[0]._question;

                questionFactory.getOptions(nextQuestion.data[0]._question._id).then(function(allOptions)
                {
                    $scope.options = allOptions.data;
                });

            });
        }

        $scope.answerQuestion = function(){
            $scope.answer.question_id = $scope.question._id;
            $scope.answer.evaluation_id = $scope.evaluationId;
            if( $scope.selectedOption.option === undefined){
                console.log("You haven't selected any option for question with id: " + $scope.questionObject._id);
                $scope.answer.option_id = undefined;
            } else {
                $scope.answer.option_id = $scope.selectedOption.option._id;
            }
            console.log("The answer is: " + JSON.stringify($scope.answer));
            
            questionFactory.answerQuestion($scope.answer).then(function(data)
            {
                console.log("Data after save: " + JSON.stringify(data));
                if ($scope.totalQuestions > $scope.questionNumber++){
                    //$scope.questionNumber++;
                    $scope.getNextQuestion();
                } else {
                   // $scope.evaluationStarted = false;
                    $scope.evaluationFinished = true;
                    EvaluationStatus.setStatus(false);

                }
            });
        }

   
    }
})();