(function ($, ng, debugMode, undefined)
{
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    module.run([
        "$q",
        "$filter",
        function (
            p_$q,
            p_$filter,
            undefined
        )
        {
            // --------------------------------------------------------------------------------
            // Constant
            // --------------------------------------------------------------------------------

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            // --------------------------------------------------------------------------------
            // Prototypes
            // --------------------------------------------------------------------------------
            if (!Blob.prototype.getBlobUrl)
                Blob.prototype.getBlobUrl = function ()
                {
                    var self = this;
                    return URL.createObjectURL(self);
                }

            if (!Blob.prototype.getString)
                Blob.prototype.getString = function ()
                {
                    var self = this;
                    return p_$q(function (p_resolve, p_reject)
                    {
                        var reader = new FileReader();
                        reader.addEventListener("loadend", function (p_event)
                        {
                            p_resolve(reader.result);
                        });

                        reader.addEventListener("error", function ()
                        {
                            p_reject(arguments);
                        });

                        reader.readAsText(self);
                    });
                }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));