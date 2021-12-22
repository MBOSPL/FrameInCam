(function ($, ng, debugMode, undefined)
{
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
        )
        {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: fincam,
                name: "model",
                properties: {
                },
                prototype: new function ()
                {
                    var self = this;
                    return self;
                }
            });

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: fincam,
                name: "logModel",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    createdBy: "string",
                    createdDate: {
                        name: "date",
                        nullable: true
                    },
                    updatedBy: "string",
                    updatedDate: {
                        name: "date",
                        nullable: true
                    }
                },
                prototype: new function ()
                {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));