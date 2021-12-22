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
            var subscription = p_models.namespace("fincam.master.subscription");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: subscription,
                name: "masterSubscription",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    id: "int",
                    name: "string",
                    price: "decimal",
                    projectCount: "int",
                    pricePerProject:
                    {
                        name: "decimal",
                        nullable: true
                    },
                    durationMonths: "int",
                    description: "string",
                    durationDays: "int"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));