(function (angular, $) {
    "use strict";

    angular.module("Chart")
        .service("$chartImportHistoryService", ['$http', chartImportHistoryService]);

    function chartImportHistoryService($http) {
        var serviceScope = this;
        var $scope;

        serviceScope.init = function (scope) {
            $scope = scope;

        }
    }
})(angular, jQuery);