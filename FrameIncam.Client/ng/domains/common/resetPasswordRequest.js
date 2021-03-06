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
            var commonSubscription = p_models.namespace("fincam.common.subscription");
            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: common,
                name: "resetPasswordRequest",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    password: {
                        name: "string"
                    },
                    confirmPassword: {
                        name: "string"
                    },
                    email: {
                        name: "string"
                    },
                    token: {
                        name: "string"
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