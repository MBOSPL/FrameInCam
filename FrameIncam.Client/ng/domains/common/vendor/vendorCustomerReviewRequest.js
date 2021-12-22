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
        "$rootScope",
        "services.utils",
        "services.models",
        function (
            p_$rootScope,
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var vendor = p_models.namespace("fincam.master.vendor");
            var commonVendor = p_models.namespace("fincam.common.vendor");
            var common = p_models.namespace("fincam.common");
            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: commonVendor,
                name: "vendorCustomerReviewRequest",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    title: "string",
                    body: "string",
                    ratings: "int",
                    email: "string",
                    vendor_id:"int",
                },
                init: function (p_info) {
                    var self = this;
                    var login_user = p_models.new(common.userProfile, p_$rootScope.userProfile);
                    self.email = login_user.user.email;
                    self.ratings = "5";
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