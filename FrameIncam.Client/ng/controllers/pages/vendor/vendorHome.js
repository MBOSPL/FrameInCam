(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "vendorHome";
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
        "$location",
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
            p_$location,
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

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {
                return p_$q.resolve();
            }

            p_$scope.init = function () {
                var tasks = [p_$scope.initPage()];

                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {
                        var s_path = p_$location.path()
                        var paths = s_path.split("/");
                        var last_path = paths[(paths.length) - 1];
                        if (last_path == "vendor-home")
                            return p_$scope.loadTab("vendor-profile");
                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            p_$scope.loadTab = function (p_tab) {
                return p_$state.go(p_tab, {});
            }
            p_$scope.downloadMSI = function () {
                p_masterVendorApi.getMSILink().then(function (res) {
                        window.open(res.errorMsgs[0], '_blank').focus();
                });
            }
            p_$scope.isMenuActive = function (menu_name) {
                if (p_$state.current.name == menu_name)
                    return true;
                else
                    return false;
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));