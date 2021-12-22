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
            var commonFreeLancer = p_models.namespace("fincam.common.freelancer");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: commonFreeLancer,
                name: "freelancerSearchResult",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    id:"int",
                    type: "string",
                    name: "string",
                    rating: {
                        namespace: commonFreeLancer,
                        name: "freeLancerRating"
                    },
                    location: "string",
                    isShortlisted:"bool"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));