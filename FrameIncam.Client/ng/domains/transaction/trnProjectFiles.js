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
            var transaction = p_models.namespace("fincam.transaction");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: transaction,
                name: "trnProjectFiles",
                base: {
                    namespace: fincam,
                    name: "logModel"
                },
                properties: {
                    id:  "int",
                    fileName: "string",
                    contentLength:  "int",
                    contentType: "string",
                    isApproved: "int",
                    currentApprovedState:"bool",
                    approvedBy: "string",
                    approvedDate: "string",
                    thumbnail:"int"
                },
                init: function (p_info) {
                    var self = this;
                    self.currentApprovedState = (self.isApproved === 1);
                    return self;
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));