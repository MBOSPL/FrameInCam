(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Service
    // --------------------------------------------------------------------------------
    fincam.service = function (
        p_$rootScope,
        p_$q,
        p_$window,
        p_$stateParams,
        p_$state,
        p_$timeout,
        p_$interval,
        undefined
    ) {
        var self = this;
        return self;
    }

})(jQuery, angular, document.children[0].hasAttribute("debug"));