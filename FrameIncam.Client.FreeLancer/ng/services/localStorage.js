(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Modules
    // --------------------------------------------------------------------------------
    module.factory("services.localStorage", [
        "$rootScope",
        "$q",
        "$window",
        "$timeout",
        "$interval",
        "$injector",
        "services.utils",
        function (
            p_$rootScope,
            p_$q,
            p_$window,
            p_$timeout,
            p_$interval,
            p_$injector,
            p_utils,
            undefined
        ) {
            var self = ng.fincam.service.apply(this, [
                p_$rootScope,
                p_$q,
                p_$window,
                null,
                null,
                p_$timeout,
                p_$interval,
            ]);

            self.get = function (p_key) {
                var obj = window.localStorage.getItem(p_key);
                if (p_utils.isNullOrUndefined(obj)) {
                    return p_$q.when(obj);
                }

                return p_$q.when(p_utils.fromJson(obj));
            }

            self.set = function (p_key, p_obj) {
                if (p_utils.isNullOrUndefined(p_obj))
                    return self.remove(p_key);

                window.localStorage.setItem(p_key, p_utils.toJson(p_obj));
                return p_$q.resolve();
            }

            self.remove = function (p_key) {
                window.localStorage.removeItem(p_key);
                return p_$q.resolve();
            }

            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));