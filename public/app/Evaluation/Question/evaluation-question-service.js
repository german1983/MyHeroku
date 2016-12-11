(function () {
    "use strict";

    angular.module("app").service("$evaluationQuestionService", ['$http', '$q', evaluationQuestionService]);

    function evaluationQuestionService($http, $q) {
        var $scope;
        var serviceScope = this;

        // this.getQuestions = function (testId) {
        //         var d = $q.defer();
        //         $http.get('/api/tests/' + testId + '/questions').success(function (data) {
        //             d.resolve(data);

        //         });
        //         return d.promise;
        // }
    };


     angular.module("app").factory('QuestionFactory', function QuestionFactory ($http) {
            var exports = {};

            // exports.getQuestions = function () {
            //     return $http.get('/api/questions')
            //         .error(function (data) {
            //             console.log('There was an error accessing api/questions!', data);
            //     });
            // };

          

            // exports.getQuestion = function (questionId) {
            //     return $http.get('/api/questions/' + questionId)
            //         .error(function (data) {
            //             console.log('There was an error accessing api/questions/:id!', data);
            //     });
            // }

            return exports;
     }); 
     
})();
