(function () {
    "use strict";

    angular.module("app").service("$evaluationSharedService", ['$http', evaluationSharedService]);

    function evaluationSharedService($http) {
        var $scope;
        var serviceScope = this;

        this.evaluationId = '57e5e08864646c00d87b3686';
        this.testId = '57e5e06f64646c00d87b3685';
        this.evaluationStarted = false;

    };

    angular.module("app").factory('EvaluationStatus', function () {

        var data = {
            isInitialized: false,
            isFinished: false
        };

        return {
            getStatus: function () {
                return data.isInitialized;
            },
            setStatus: function (newStatus) {
                data.isInitialized = newStatus;
                data.isFinished = !newStatus;
            }
        };
    });

    angular.module("app").factory('questionFactory', ['$http', function($http) {

        var urlBase = '/api/questions';
        var dataFactory = {};

        dataFactory.getQuestions = function () {
            return $http.get(urlBase);
        };

        dataFactory.getQuestion = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        dataFactory.insertQuestion = function (cust) {
            return $http.post(urlBase, cust);
        };

        dataFactory.updateQuestion = function (cust) {
            return $http.put(urlBase + '/' + cust.ID, cust)
        };

        dataFactory.deleteQuestion = function (id) {
            return $http.delete(urlBase + '/' + id);
        };

        dataFactory.getOptions = function (id) {
            return $http.get(urlBase + '/' + id + '/options');
        };

        dataFactory.getNextEvaluationQuestion = function (evaluationId, questionNumber) {
            return $http.get('/api/evaluationQuestions/' + evaluationId + '/question/' + questionNumber)
                .error(function (data) {
                    console.log('There was an error accessing api/evaluationQuestions/:id/questions!', data);
            });
        };

       dataFactory.answerQuestion = function (answer) {
            return $http.post('/api/answers/', answer)
                .error(function (data) {
                    console.log('There was an error accessing api/evaluationQuestions/:id/questions!', data);
            });
        };

        return dataFactory;
    }]);
})();
