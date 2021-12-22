(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // TODO
    // --------------------------------------------------------------------------------
    fincam.directive = function (
        p_$rootScope,
        p_$scope,
        p_$stateParams,
        p_$state,
        p_$parse,
        p_$q,
        p_$window,
        p_$timeout,
        p_$interval,
        p_controllerName
    ) {
        fincam.controller(
            p_$rootScope,
            p_$scope,
            p_$stateParams,
            p_$state,
            p_$q,
            p_$window,
            p_$timeout,
            p_$interval,
            p_controllerName
        );

        p_$scope.trigger = function (p_parsing, p_params, p_event) {
            p_$rootScope.stopPropagation(p_event);
            if (fincam.isNullOrUndefined(p_parsing) || !fincam.isString(p_parsing)) {
                return;
            }

            var func = p_$parse(p_parsing);
            return func(p_$scope.$parent, p_params);
        }

        var digestHandler;
        p_$scope.digest = function (p_action) {
            p_action();
            clearTimeout(digestHandler);
            digestHandler = setTimeout(function () {
                p_$scope.$digest();
            }, 100);
        }

        var applyHandler;
        p_$scope.apply = function (p_action) {
            p_action();
            clearTimeout(applyHandler);
            applyHandler = setTimeout(function () {
                p_$scope.$apply();
            }, 100);
        }
    }

})(jQuery, angular, document.children[0].hasAttribute("debug"));