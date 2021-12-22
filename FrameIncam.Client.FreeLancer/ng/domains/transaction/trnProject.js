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
            var transaction = p_models.namespace("fincam.transaction");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: transaction,
                name: "trnProject",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    id: "int",
                    identifier: "string",
                    code: "int",
                    projectName: "string",
                    createdDate: "date",
                    projectDate: "date",
                    vendorId: "int",
                    customerId: "int",
                    gstNo: "string",
                    photographer: "int",
                    designer: "int",
                    projectValue: "number",
                    advanceAmt: "number",
                    folder: "string",
                    equipments: "string",
                    key: "string",
                    url: "string",
                    status: "string",
                    isActive: "int",
                    batch: "int",
                    bBatch: "int",
                    fileCount: "int",
                    customerCode: "int",
                    customerName: "string",
                    customerEmail: "string",
                    customerMobileNo: "string",
                    customerAlternateMobileNo: "string",
                    customerAddress1: "string",
                    customerAddress2: "string",
                    customerCity: "string",
                    customerPin: "string"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));