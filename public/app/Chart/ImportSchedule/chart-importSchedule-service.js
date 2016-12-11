(function (angular, $) {
    "use strict";

    angular.module("Chart")
        .service("$chartImportScheduleService", ['$http', chartImportScheduleService]);

    function chartImportScheduleService($http) {
        var serviceScope = this;
        var $scope;
     
        serviceScope.init = function (scope) {
            $scope = scope;

        }
    }
})(angular, jQuery);