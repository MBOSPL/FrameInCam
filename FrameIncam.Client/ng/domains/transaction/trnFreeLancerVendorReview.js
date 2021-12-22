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
        "$rootScope",
        "services.utils",
        "services.models",
        function (
            p_$rootScope,
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var transaction = p_models.namespace("fincam.transaction");
            var common = p_models.namespace("fincam.common");
            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: transaction,
                name: "trnFreeLancerVendorReview",
                base: {
                    namespace: fincam,
                    name: "logModel"
                },
                properties: {
                    id: "int",
                    vendor_id:"int",
                    title:"string",
                    body:"string",
                    ratings:"int",
                    is_show: "bool",
                    customerName: "string",
                    createdBy: "string",
                    createdDate: {
                        name: "date",
                        nullable: true
                    },
                    reply:"string",
                    updatedBy: "string",
                    updatedDate: {
                        name: "date",
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