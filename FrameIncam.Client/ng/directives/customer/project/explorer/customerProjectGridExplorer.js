(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Variables
    // --------------------------------------------------------------------------------
    var directiveName = "ficCustomerProjectGridExplorer";
    var directiveControllerName = "directives." + directiveName + "Controller";
    var templateUrl = "/templates/directives/customer/project/explorer/customer-project-grid-explorer.html";

    // --------------------------------------------------------------------------------
    // Controller
    // --------------------------------------------------------------------------------
    module.controller(directiveControllerName, [
        "$rootScope",
        "$scope",
        "$stateParams",
        "$state",
        "$parse",
        "$q",
        "$window",
        "$timeout",
        "$interval",
        function (
            p_$rootScope,
            p_$scope,
            p_$stateParams,
            p_$state,
            p_$parse,
            p_$q,
            p_$window,
            p_$timeout,
            p_$interval,
            undefined
        ) {
            ng.fincam.directive(
                p_$rootScope,
                p_$scope,
                p_$stateParams,
                p_$state,
                p_$parse,
                p_$q,
                p_$window,
                p_$timeout,
                p_$interval,
                directiveControllerName
            );

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.isDisabled = function () {
                return false;
            }

            p_$scope.init = function () {
                return p_$q.all([]).then(function () {
                }).finally(function () {
                    p_$scope.ready = true;
                    p_$scope.loading = false;
                });
            }

            p_$scope.viewProject = function (p_project) {
                return p_$scope.trigger(p_$scope.viewProjectHandler, { $projectId: p_project.identifier });
                /*return p_$state.go("customer-project-view", {
                    identifier: p_project.identifier
                });*/
            }
        }
    ]);

    // --------------------------------------------------------------------------------
    // Directive
    // --------------------------------------------------------------------------------
    module.directive(directiveName, [
        "$rootScope",
        "$stateParams",
        "$state",
        "$parse",
        "$q",
        "$timeout",
        "$interval",
        function (
            p_$rootScope,
            p_$stateParams,
            p_$state,
            p_$parse,
            p_$q,
            p_$timeout,
            p_$interval,
            undefined
        ) {
            return {
                restrict: "E",
                require: "^ngModel",
                template: ng.fincam.template(templateUrl),
                controller: directiveControllerName,
                scope: {
                    value: "=ngModel",
                    options: "=",
                    viewProjectHandler:"@viewProject"
                },
                link: function (p_$scope, p_$element, p_$attrs, p_$ngModel) {
                    // --------------------------------------------------------------------------------
                    // Events
                    // --------------------------------------------------------------------------------

                    // --------------------------------------------------------------------------------
                    // Render
                    // --------------------------------------------------------------------------------
                    p_$scope.init();
                }
            };
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));