(function ($, ng, debugMode, undefined)
{
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Variables
    // --------------------------------------------------------------------------------
    var directiveName = "ficAfterRender";
    var directiveControllerName = "directives." + directiveName + "Controller";

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
        )
        {
            ng.fincam.directive(
                p_$rootScope,
                p_$scope,
                p_$stateParams,
                p_$state,
                p_$parse,
                p_$q,
                p_$window,
                p_$timeout,
                p_$interval
            );

            // TODO
        }
    ]);

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var currentHideHandler;

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
        "services.utils",
        function (
            p_$rootScope,
            p_$stateParams,
            p_$state,
            p_$parse,
            p_$q,
            p_$timeout,
            p_$interval,
            p_utils,
            undefined
        )
        {
            return {
                restrict: "A",
                terminal:true,
                controller: directiveControllerName,
                link: function (p_$scope, p_$element, p_$attrs) {
                    var afterRenderCallback = function () {
                        //var func = p_$parse(p_$attrs.ficAfterRender);
                        //func(p_$scope, { $element: p_$element });
                        p_$scope.$emit(p_$attrs.ficAfterRender, { $element: p_$element });
                    };

                    if (p_$scope.$last === true)
                        p_$timeout(afterRenderCallback, 0);
                }
            };
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));