﻿(function ($, ng, debugMode, undefined) {
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

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: vendor,
                name: "masterVendorType",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    id:"int",
                    type: "string",
                    isactive: "int"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));