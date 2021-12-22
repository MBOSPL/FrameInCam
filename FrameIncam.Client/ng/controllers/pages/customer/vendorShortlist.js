(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "vendorShortlist";
    var controllerName = pageName + "Controller";

    // --------------------------------------------------------------------------------
    // Controller
    // --------------------------------------------------------------------------------
    module.controller(controllerName, [
        "$rootScope",
        "$scope",
        "$stateParams",
        "$state",
        "$q",
        "$window",
        "$timeout",
        "$interval",
        "services.models",
        "services.utils",
        "services.localStorage",
        "api.masterVendorApi",
        function (
            p_$rootScope,
            p_$scope,
            p_$stateParams,
            p_$state,
            p_$q,
            p_$window,
            p_$timeout,
            p_$interval,
            p_models,
            p_utils,
            p_localStorage,
            p_masterVendorApi,
            undefined
        ) {
            ng.fincam.pageController(
                p_$rootScope,
                p_$scope,
                p_$stateParams,
                p_$state,
                p_$q,
                p_$window,
                p_$timeout,
                p_$interval,
                p_models,
                p_localStorage,
                controllerName,
                undefined
            );

            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------

            var fincam = p_models.namespace("fincam");
            var commonVendor = p_models.namespace("fincam.common.vendor");

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {
                return p_masterVendorApi.getShortlistedVendors().then(function (p_vendorSearchResult) {
                    if (p_utils.isObject(p_vendorSearchResult))
                        p_$scope.vendors = p_vendorSearchResult;

                    return p_$q.resolve();
                });
            }

            p_$scope.init = function () {
                var tasks = [];

                p_$scope.vendors = p_models.new(fincam.paginationResults, {});
                p_$scope.view = "grid";

                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {
                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            p_$scope.toggleVendorSelection = function (p_vendor) {
                p_vendor.isShortlisted = !p_vendor.isShortlisted;

                return p_masterVendorApi.toggleVendorSelection(p_vendor.id).then(function () {
                    return p_$scope.refresh();
                });
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));