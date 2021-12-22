(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Filter
    // --------------------------------------------------------------------------------
    module.filter("capitalize", [
        function (
            undefined
        ) {
            return function (p_value) {
                return p_value.capitalize();
            }
        }
    ])

})(jQuery, angular, document.children[0].hasAttribute("debug"));