(function (angular, $) {
    "use strict";

    angular.module("Chart")
        .service("$chartDataService", ['$http', chartDataService]);

    function chartDataService($http) {
        var serviceScope = this;
        var $scope;

        serviceScope.init = function (scope) {
            $scope = scope;

        }
    }
})(angular, jQuery);