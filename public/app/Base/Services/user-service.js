/// <reference path="../../baseSvc.js" />



(function (angular) {
    "use strict";

    angular.module("PKBase")
        .factory("userService", ["$userInfoService", userService]);

    // This service used for Update the Audit Field when we do the post/patch transactions
    function userService($userInfoService) {


        // Update Audit Fields for POST Transactions
        function updateAuditFieldsForPost(data) {

            var userInfo = $userInfoService.getUserInformation();

            data["CreatedById"] = userInfo.UserId;
            data["CreatedDate"] = new Date();

            data["ModifiedById"] = userInfo.UserId;
            data["ModifiedDate"] = new Date();

            return data;

        };


        // Update Audit Fields for PATCH Transactions
        function updateAuditFieldsForPatch(data) {

            var userInfo = $userInfoService.getUserInformation();

            data["ModifiedById"] = userInfo.UserId;
            data["ModifiedDate"] = new Date();

            return data;
        }



        // Update Audit Fields for PUT Transactions
        function updateAuditFieldsForPut(data) {

            var userInfo = $userInfoService.getUserInformation();

            data["ModifiedById"] = userInfo.UserId;
            data["ModifiedDate"] = new Date();

            return data;
        }


        // Update Audit Fields for DELETE Transactions
        //function updateAuditFieldsForDelete(data) {

        //    var userInfo = $userInfoService.getUserInformation();

        //    data["ModifiedById"] = userInfo.UserId;
        //    data["ModifiedDate"] = new Date();

        //    return data;
        //}


        return {
            updateAuditFields: {
                post: updateAuditFieldsForPost,
                patch: updateAuditFieldsForPatch,
                put: updateAuditFieldsForPut
                //delete: updateAuditFieldsForDelete
            }
        };

    }



})(angular);