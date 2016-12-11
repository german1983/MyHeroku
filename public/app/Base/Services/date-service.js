(function (angular, $) {
    "use strict";

    angular.module("PKBase")
        .factory("dateService", dateService);

 
    function dateService() {
        function getUTCDate(date) {
            var dateFormat = new Date(date);
            var utcDate = new Date(dateFormat.getUTCFullYear(), dateFormat.getUTCMonth(), dateFormat.getUTCDate(), dateFormat.getUTCHours(), dateFormat.getUTCMinutes(), dateFormat.getUTCSeconds());
            return utcDate;
        }
        return {
            getUTCDate: getUTCDate
        };
    }
   


})(angular, jQuery);