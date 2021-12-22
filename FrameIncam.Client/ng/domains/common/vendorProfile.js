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
            var vendor = p_models.namespace("fincam.master.vendor");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: common,
                name: "vendorProfile",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    vendor: {
                        namespace: vendor,
                        name: "masterVendor"
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
                            name: "masterVendorServiceMap"
                        }
                    },
                    activeSubscription: {
                            namespace: vendor,
                            name: "masterVendorSubscriptions"
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