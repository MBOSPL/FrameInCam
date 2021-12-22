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
    var directiveName = "ficVendorGridItemPresentation";
    var directiveControllerName = "directives." + directiveName + "Controller";
    var templateUrl = "/templates/directives/vendor/presentation/vendor-grid-item-presentation.html";

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
        "services.utils",
        "api.masterVendorApi",
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
            p_utils,
            p_masterVendorApi,
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
            p_$scope.init = function () {
                var tasks = [];

                tasks.push(p_masterVendorApi.getDefaultPresentationSrc(p_$scope.value.id).then(function (p_presentationUrl) {
                    p_$scope.presentationUrl = p_presentationUrl;
                }));

                return p_$q.all(tasks).then(function () {
                }).finally(function () {
                    p_$scope.ready = true;
                    p_$scope.loading = false;
                });
            }

            p_$scope.isDisabled = function () {
                return false;
            }

            p_$scope.selectVendor = function () {
                if (p_$scope.isDisabled() || p_utils.isNullOrUndefined(p_$scope.selectVendorHandler) || !p_utils.isString(p_$scope.selectVendorHandler)) {
                    return false;
                }

                return p_$scope.trigger(p_$scope.selectVendorHandler, { $vendor: p_$scope.value });
            }

            p_$scope.viewVendor = function () {
                if (p_$scope.isDisabled() || p_utils.isNullOrUndefined(p_$scope.viewVendorHandler) || !p_utils.isString(p_$scope.viewVendorHandler)) {
                    return false;
                }

                return p_$scope.trigger(p_$scope.viewVendorHandler, { $vendor: p_$scope.value });
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
                    selectVendorHandler: "@selectVendor",
                    viewVendorHandler: "@viewVendor"
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