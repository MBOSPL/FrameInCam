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
            var commonVendor = p_models.namespace("fincam.common.vendor");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: commonVendor,
                name: "vendorSearchQuery",
                base: {
                    namespace: fincam,
                    name: "paginationQuery"
                },
                properties: {
                    vendorTypeId: {
                        name: "int",
                        nullable: true
                    },
                    geoCityId: {
                        name: "int",
                        nullable: true
                    },
                    search: "string",
                    customerId: {
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