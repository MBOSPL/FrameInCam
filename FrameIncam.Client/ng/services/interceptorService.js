(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Inteceptor
    // --------------------------------------------------------------------------------
    module.factory('authInterceptorService', [
        "$q",
        "$injector",
        "$location",
        "$rootScope",
        "clientConfig",
        function (
            p_$q,
            p_$injector,
            p_$location,
            p_$rootScope,
            p_clientConfig,
            undefined
        ) {
            var authInterceptorServiceFactory = {};

            var _request = function (p_settings) {
                
                p_settings.url = p_clientConfig.fincamApiUrl + p_settings.url;

                p_settings.headers = p_settings.headers || {};
                p_settings.headers["Access-Control-Allow-Origin"] = "*";
                if (p_$rootScope.token) {
                    p_settings.headers.Authorization = 'Bearer ' + p_$rootScope.token;
                }

                return p_settings;
            }

            var _responseError = function (p_rejection) {
                return p_$q.reject(p_rejection);
            }

            authInterceptorServiceFactory.request = _request;
            authInterceptorServiceFactory.responseError = _responseError;
            return authInterceptorServiceFactory;
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));