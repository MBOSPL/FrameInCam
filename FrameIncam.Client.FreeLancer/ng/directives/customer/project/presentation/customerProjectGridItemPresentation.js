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
    var directiveName = "ficCustomerProjectGridItemPresentation";
    var directiveControllerName = "directives." + directiveName + "Controller";
    var templateUrl = "/templates/directives/customer/project/presentation/customer-project-grid-item-presentation.html";

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
        "api.projectApi",
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
            p_projectApi,
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
                if (!p_$scope.value)
                    return p_$q.reject();

                var tasks = [];

                //p_$scope.defaultPresentationUrl = "https://localhost:44348/api/transaction/project/get-default-presentation/1?t=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiZmZlYzNmZTQtMWYyMy00NGQ1LWEzNTktMWYwOTQ2MWJmNDE2IiwibmFtZSI6IkZyYW1lIG4gc21pbGUiLCJ1c2VybmFtZSI6InNpdmEuZW52aXNpb25AZ21haWwuY29tIiwiZW1haWwiOiJzaXZhLmVudmlzaW9uQGdtYWlsLmNvbSIsIklzVmVuZG9yIjoiVHJ1ZSIsIlZlbmRvcklkIjoiMSIsIlZlbmRvcklkZW50aWZpZXIiOiJkMjUwNDM2NC01NTMyLTQ2MTItYjk4MS00NDk2NDkwODdhYmEiLCJhdWQiOlsiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzOTMvIiwiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzOTMvIl0sImV4cCI6MTYxMjEyMzc4NCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNDgvIn0.0SndEjH6hBBoedLeTh_PtHJcIwaVgWrQsKe7GiXmDPs";

                tasks.push(p_projectApi.getDefaultPresentationSrc(p_$scope.value.id).then(function (p_presentationUrl) {
                    p_$scope.defaultPresentationUrl = p_presentationUrl;
                }));

                return p_$q.all(tasks).then(function () {
                }).finally(function () {
                    p_$scope.ready = true;
                    p_$scope.loading = false;
                });
            }

            p_$scope.isShareEnabled = function () {
                return p_$scope.options && p_$scope.options.shareable;
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
                    options:"="
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