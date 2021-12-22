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
                name: "paymentOrderModel",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    order_id: {
                        name: "string"
                    },
                    key: {
                        name: "string"
                    },
                    amount: {
                        name: "int"
                    },
                    currency: {
                        name: "string"
                    },
                    name: {
                        name: "string"
                    },
                    email: {
                        name: "string"
                    },
                    contactNumber: {
                        name: "string"
                    },
                    address: {
                        name: "string"
                    },
                    description: {
                        name: "string"
                    },
                    prefill:{
                        namespace: commonSubscription,
                        name:"prefill"
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