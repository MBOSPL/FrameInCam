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
            var freelancer = p_models.namespace("fincam.master.freelancer");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: freelancer,
                name: "masterFreeLancerPackage",
                base: {
                    namespace: fincam,
                    name: "logModel"
                },
                properties: {
                    id: "int",
                    freeLancerId: "int",
                    description: "string",
                    pricePerDay: "decimal"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));