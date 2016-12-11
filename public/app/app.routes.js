angular.module('app').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/views/Todo/todos.html',
      controller: 'TodoController'
    })

    .when('/todo/:id', {
      templateUrl: '/views/Todo/todo-details.html',
      controller: 'TodoDetailCtrl'
    })
    .when('/Evaluation', {
      templateUrl: '/views/Evaluation/shell.html',
      controller: 'EvaluationShellController'
    })
    .when('/Evaluation/Question/:question_id', {
      templateUrl: '/views/Evaluation/question.html'
    })
    .when('/Exam', {
      templateUrl: '/views/Exam/shell.html',
      controller: 'ExamShellController'
    })
    .when('/Exam/New', {
      templateUrl: '/views/Exam/new.html',
      controller: 'ExamShellController'
    })
    .when('/Exam/List', {
      templateUrl: '/views/Exam/list.html',
      controller: 'ExamShellController'
    });
}]);