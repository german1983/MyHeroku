/// <reference path="~/Scripts/angular.js" />
/// <reference path="~/App/baseSvc.js" />


(function (angular) {
    "use strict";

    angular.module("PKBase")
        .factory("coreDataService", [
            "$q",
            "$http",
            "$coreServiceUrl",
            "$serviceUrls",
            "$userInfoService",
            "$commonServiceUrl",
            coreDataService
        ]);


    function coreDataService(
        $q,
        $http,
        $coreServiceUrl,
        $serviceUrls,
        $userInfoService,
        $commonServiceUrl) {


        function getCostItemDetails(costItemIds) {

            var deferred = $q.defer();

            var requests = [];

            angular.forEach(costItemIds, function(costitemId) {
                if (costitemId !== undefined && costitemId !== null) {
                    requests.push({
                        requestUri: $commonServiceUrl.CostItem + "(" + costitemId + ")",
                        method: "GET"
                    });
                }
            });

            window.odatajs.oData.request({
                requestUri: $serviceUrls.CommonServiceURL + "/$batch",
                method: "POST",
                data: {
                    __batchRequests: requests
                }
            }, function(data, response) {
                var costItems = [];
                angular.forEach(data.__batchResponses, function(item) {
                    costItems.push(item.data);
                });
                deferred.resolve({
                    data: costItems,
                    response: response
                }); // success call back function
            }, function(response) {
                deferred.reject(response); // error call back function
            }, window.odatajs.oData.batch.batchHandler);

            return deferred.promise;

        } // End - getCostItemDetails


        function getEmployeeDetails(employeeIds) {

            var deferred = $q.defer();

            var requests = [];

            angular.forEach(employeeIds, function(employeeId) {
                if (employeeId !== undefined && employeeId !== null) {
                    requests.push({
                        requestUri: $coreServiceUrl.Employees + "(" + employeeId + ")?$expand=Craft",
                        method: "GET"
                    });
                }
            });

            window.odatajs.oData.request(window.in8.auth.setHeaders({
                requestUri: $serviceUrls.CoreServiceURL + "$batch",
                method: "POST",
                data: {
                    __batchRequests: requests
                }
            }), function(data, response) {
                var employees = [];
                angular.forEach(data.__batchResponses, function(item) {
                    employees.push(item.data);
                });
                deferred.resolve({
                    data: employees,
                    response: response
                }); // success call back function
            }, function(response) {
                deferred.reject(response); // error call back function
            }, window.odatajs.oData.batch.batchHandler);

            return deferred.promise;

        } //End - getEmployeeDetails


        function getEquipmentDetails(equipmentIds) {

            var deferred = $q.defer();

            var requests = [];

            angular.forEach(equipmentIds, function(equipmentId) {
                if (equipmentId !== undefined && equipmentId !== null) {
                    requests.push({
                        requestUri: $coreServiceUrl.Equipment + "(" + equipmentId + ")",
                        method: "GET"
                    });
                }
            });

            window.odatajs.oData.request(window.in8.auth.setHeaders({
                requestUri: $serviceUrls.CoreServiceURL + "$batch",
                method: "POST",
                data: {
                    __batchRequests: requests
                }
            }), function(data, response) {
                var equipments = [];
                angular.forEach(data.__batchResponses, function(item) {
                    equipments.push(item.data);
                });
                deferred.resolve({
                    data: equipments,
                    response: response
                }); // success call back function
            }, function(response) {
                deferred.reject(response); // error call back function
            }, window.odatajs.oData.batch.batchHandler);

            return deferred.promise;

        } //End - getEquipmentDetails

        return {
            getCostItemDetails: getCostItemDetails,
            getEmployeeDetails: getEmployeeDetails,
            getEquipmentDetails: getEquipmentDetails
        };

    }

})(angular);