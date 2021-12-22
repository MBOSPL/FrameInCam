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
            var commonSubscription = p_models.namespace("fincam.common.subscription");
            var config = p_models.namespace("fincam.config");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: commonSubscription,
                name: "paymentRequestModel",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    checkout_logo: {
                        name: "string"
                    },
                    custom_branding: {
                        name: "bool"
                    },
                    org_logo: {
                        name: "string"
                    },
                    checkout_logo: {
                        name: "string"
                    },
                    org_name: {
                        name: "string"
                    },
                    razorpay_payment_id: {
                        name: "string"
                    },
                    razorpay_order_id: {
                        name: "string"
                    },
                    razorpay_signature: {
                        name:"string"
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