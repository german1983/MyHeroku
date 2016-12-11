(function () {
    "use strict";

    angular.module("app").service("$examSharedService", ['$http', examSharedService]);

    function examSharedService($http) {
        var $scope;
        var serviceScope = this;

        this.evaluationId = '57e5e08864646c00d87b3686';
        this.testId = '57e5e06f64646c00d87b3685';
        this.evaluationStarted = false;

    };

})();
