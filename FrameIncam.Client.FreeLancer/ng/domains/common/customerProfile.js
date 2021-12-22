(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var common = p_models.namespace("fincam.common");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: common,
                name: "customerProfile",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    customerId: "int",
                    customerAddressLine1: "string",
                    customerAddressLine2: "string",
                    customerAltMobileNo: "string",
                    customerCity: "string",
                    customerCode: "string",
                    customerEmail: "string",
                    customerMobileNo: "string",
                    customerName: "string"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));