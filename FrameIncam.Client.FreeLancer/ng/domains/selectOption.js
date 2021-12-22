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
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                name: "selectOption",
                properties: {
                    text: "string",
                    value: "string",
                    group: "string",
                    tag: "any"
                },
                prototype: new function ()
                {
                    var self = this;
                    return self;
                },
                init: function (p_info)
                {
                    var self = this;
                    if (p_utils.isNullOrEmpty(self.group))
                        self.group = undefined;

                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));