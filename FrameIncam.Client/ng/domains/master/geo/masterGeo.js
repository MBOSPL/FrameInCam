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
            var geo = p_models.namespace("fincam.master.geo");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: geo,
                name: "masterGeo",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    id:  "int",
                    geoCode: "string",
                    geoName:  "string",
                    geoHead: "string",
                    geoLevel: "string",
                    geoType: "string",
                    geoTinNo: {
                        name: "int",
                        nullable: true
                    },
                    geoStateCode: "string",
                    geoLatitude:
                    {
                        name: "number",
                        nullable: true
                    },
                    geoLongitude: {
                        name: "number",
                        nullable: true
                    },
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