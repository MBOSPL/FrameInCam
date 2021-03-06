(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "index";
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
        '$location',
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
                
                /*var tasks = [
                    p_$rootScope.init()
                ];*/
                var tasks = [p_$scope.initPage()];
                return p_$q.all(tasks).then(function (p_data) {
                    return p_$scope.refresh().then(function () {
                        var s_path = p_$location.path()
                        var paths = s_path.split("/");
                        var last_path = paths[(paths.length) - 1];
                        if (last_path == "")
                            return p_$state.go("home");
                            //p_$window.location.href = "/subscription";
                            
                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            p_$scope.getContainerHeight = function () {
                var $appHeader = $("fic-app-header > header > nav");
                var $appFooter = $("fic-app-footer");

                return p_utils.$w.height() - $appHeader.height() - $appFooter.height() + 50;
            }

            p_$scope.getContainerTopOffset = function () {
                var $appHeader = $("fic-app-header > header > nav");

                return $appHeader.height();
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));