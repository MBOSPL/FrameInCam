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
            var vendor = p_models.namespace("fincam.master.vendor");
            var commonVendor = p_models.namespace("fincam.common.vendor");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: commonVendor,
                name: "vendorDetailSearchResult",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    id:"int",
                    vendor: {
                        namespace: vendor,
                        name: "masterVendor"
                    },
                    rating: {
                        namespace: commonVendor,
                        name: "vendorRating"
                    },
                    isShortlisted: "bool",
                    totalLikes: "int",
                    pricePerDay: {
                        name: "decimal",
                        nullable: true
                    },
                    address: {
                        namespace: vendor,
                        name: "masterVendorAddress"
                    },
                    packages: {
                        name: "array",
                        element: {
                            namespace: vendor,
                            name: "masterVendorPackages"
                        }
                    },
                    services: {
                        name: "array",
                        element: {
                            namespace: vendor,
                            name: "masterVendorService"
                        }
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