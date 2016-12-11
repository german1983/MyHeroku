(function (angular) {
    "use strict";

    angular.module("PKBase")
     .filter('equalTo', function () {
         return function (data, filterParam) {
             var filterKeys = Object.keys(filterParam);

             angular.forEach(filterKeys, function (key) {
                 if (undefined != filterParam[key]) {
                     data = $.grep(data, function (item) {
                         return filterParam[key] === item[key];
                     });
                 }
             });
             return data;
         }
     });      
})(angular);