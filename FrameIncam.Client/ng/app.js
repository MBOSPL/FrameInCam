(function ($, ng, debugMode, undefined) {
    "use strict";

    ng.module("app", ['ui.router', 'ngResource', 'angular-loading-bar', 'ngValidate', 'thatisuday.dropzone', 'ui.bootstrap.carousel','ui.bootstrap.tpls']);

    // --------------------------------------------------------------------------------
    // Run
    // --------------------------------------------------------------------------------

    ng.module("app").run([
        "$rootScope",
        "$state",
        "$q",
        "$injector",
        "$anchorScroll",
        function (
            p_$rootScope,
            p_$state,
            p_$q,
            p_$injector,
            p_$anchorScroll,
            undefined
        ) {
            // --------------------------------------------------------------------------------
            // Constant
            // --------------------------------------------------------------------------------
            p_$rootScope.debugMode = debugMode;
            p_$rootScope.isCustomerLoggedOn = false;

            p_$rootScope.toggleCustomerLogin = function (p_isLoggedOn) {
                p_$rootScope.isCustomerLoggedOn = p_isLoggedOn;
            }

            p_$rootScope.$on("$locationChangeSuccess", function () {
                p_$anchorScroll();
            });

            p_$rootScope.ngModelOptions = {
                updateOn: 'default blur',
                debounce: {
                    default: 500,
                    blur: 0
                }
            };

            // --------------------------------------------------------------------------------
            // Function
            // --------------------------------------------------------------------------------
            p_$rootScope.preventDefault = function (p_event) {
                var event = p_event || window.event;
                if (!event)
                    return false;

                if (event.preventDefault)
                    event.preventDefault();
                else
                    event.returnValue = false;

                return false;
            }

            p_$rootScope.stopPropagation = function (p_event) {
                var event = p_event || window.event;
                if (!event)
                    return false;

                if (event.stopPropagation)
                    event.stopPropagation();
                else
                    event.cancelBubble = false;

                return false;
            }

            p_$rootScope.doNothing = function (p_event) {
                p_$rootScope.preventDefault(p_event);
                p_$rootScope.stopPropagation(p_event);
                return false;
            }

            p_$rootScope.init = function () {
                return p_$q.all([]).finally(function () {

                });
            }
        }])
        .config([
            "$qProvider",
            "$compileProvider",
            "$animateProvider",
            "$httpProvider",
            "$locationProvider",
            "$stateProvider",
            function (
                p_$qProvider,
                p_$compileProvider,
                p_$animateProvider,
                p_$httpProvider,
                p_$locationProvider,
                p_$stateProvider,
                undefined
            ) {
                // Debugging
                if (!debugMode) {
                    p_$compileProvider.debugInfoEnabled(false);
                    p_$qProvider.errorOnUnhandledRejections(false);
                }

                // Animation
                p_$animateProvider.classNameFilter(/ng-animate-enabled/);

                // Http
                p_$httpProvider.defaults.useXDomain = true;
                delete p_$httpProvider.defaults.headers.common['X-Requested-With'];

                p_$httpProvider.interceptors.push('authInterceptorService');

                // Location
                p_$locationProvider.html5Mode({
                    enabled: true,
                    requireBase: true,
                    rewriteLinks: false
                });
            }]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));