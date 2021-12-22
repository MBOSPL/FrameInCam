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
            var album = p_models.namespace("fincam.master.freelancer.album");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: album,
                name: "masterFreeLancerAlbum",
                base: {
                    namespace: fincam,
                    name: "logModel"
                },
                properties: {
                    id:  "int",
                    albumTitle: "string",
                    albumNote:  "string",
                    albumLocation: "string",
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