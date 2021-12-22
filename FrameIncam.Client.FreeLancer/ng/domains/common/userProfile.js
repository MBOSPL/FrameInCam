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
            var config = p_models.namespace("fincam.config");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: common,
                name: "userProfile",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    user: {
                        namespace: config,
                        name: "configUser"
                    },
                    role: {
                        namespace: config,
                        name: "configRole"
                    },
                    customerId: {
                        name: "int",
                        nullable: true
                    },
                    vendorId: {
                        name: "int",
                        nullable: true
                    },
                    freeLancerId: {
                        name: "int",
                        nullable: true
                    }

                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));