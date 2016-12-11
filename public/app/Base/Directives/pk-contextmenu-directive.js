(function (angular) {
    "use strict";

    angular.module("PKBase")
        .directive("pkContextMenu", pkContextMenu);


    // ineight context menu
    function pkContextMenu($compile, $timeout, $utility) {
        
        var directive = {};
         
        directive.restrict = "E";

        directive.transclude = true;

        directive.template = "<div></div>";

        // directive controller
        directive.controller = function ($scope) {
             
            $scope.getContextMenuIconClass = function (item) {
                return $utility.getIconClass(item.icon) + " i-size i-padding-menu k-image" + (item.enabled === true ? "" : " i-disable");
            };

            $scope.contextMenuClickEvent = function (item) {
                if (item.action !== undefined && item.enabled === true && item.visible === true) {
                    $(".k-animation-container").toggle(false);
                    item.action(item);
                }
            }

            $scope.contextMenuOpen = function (e) {
              
            }

        };

        // directive link function
        directive.link = function ($scope, $element, $attributes) {
             
            var id = $scope[$attributes.options].id;
            var target = $scope[$attributes.options].target;

            var htmlContent =
                ' <ul kendo-context-menu="contextMenu' + id + '" id="' + id + '" k-on-open="contextMenuOpen(kendoEvent)" k-filter="' + target + '">' +
                    ' <li ng-repeat="item in ' + $attributes.options + '.items | filter:{visible:true} " id="{{item.id}}"' +
                        ' class="k-item k-state-default k-last" role="menuitem" ng-click="contextMenuClickEvent(item)" ng-disabled="!item.enabled">' +
                        ' <span class="k-link no-wrap" style="font-weight:normal;">' +
                            ' <i ng-class="getContextMenuIconClass(item)" style="float: left;"></i>' +
                            ' {{ item.text }}' +
                        ' </span>' +
                    ' </li>' +
                ' </ul>';

            $element.html(htmlContent);

            $compile($element.contents())($scope);

            $timeout(function () {
                $("#" + id).kendoContextMenu({
                    target: target,
                    animation:false,
                });
            }, 100);
        }


        return directive;


    } // End -ineightContextmenu

})(angular);