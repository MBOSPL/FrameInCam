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
            var commonFreeLancer = p_models.namespace("fincam.common.freelancer");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: commonFreeLancer,
                name: "freeLancerDetailSearchResult",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    id:"int",
                    freeLancer: {
                        namespace: freelancer,
                        name: "masterFreeLancer"
                    },
                    rating: {
                        namespace: commonFreeLancer,
                        name: "freeLancerRating"
                    },
                    isShortlisted: "bool",
                    totalLikes: "int",
                    pricePerDay: {
                        name: "decimal",
                        nullable: true
                    },
                    address: {
                        namespace: freelancer,
                        name: "masterFreeLancerAddress"
                    },
                    packages: {
                        name: "array",
                        element: {
                            namespace: freelancer,
                            name: "masterFreeLancerPackages"
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