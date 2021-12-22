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

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: freelancer,
                name: "masterFreeLancer",
                base: {
                    namespace: fincam,
                    name: "logModel"
                },
                properties: {
                    id:  "int",
                    name: "string",
                    typeId:  "int",
                    email: "string",
                    mobile: "string",
                    description: "string",
                    paymentTerms: "string",
                    additionalCost: "string",
                    experienceLovId: "int",
                    siteUrl: "string",
                    fbUrl: "string",
                    instagramUrl: "string",
                    youtubeUrl: "string",
                    isactive: "int",
                    password: "string"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));