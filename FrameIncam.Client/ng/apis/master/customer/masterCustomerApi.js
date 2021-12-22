(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var apiName = "masterCustomerApi";
    var url = "/api/master/customer";

    // --------------------------------------------------------------------------------
    // Resources
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName + "Resources", [
        "$resource",
        function (p_$resource) {
            var actions = ng.fincam.resource.apply({}, [url, {
                getProfile: { method: "GET", url: "get-profile" },
                updateProfile: { method: "POST", url: "update-profile" },
            }]);

            return p_$resource(url, {}, actions);
        }
    ]);

    // --------------------------------------------------------------------------------
    // Modules
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName, [
        "$rootScope",
        "$q",
        "$window",
        "$stateParams",
        "$state",
        "$timeout",
        "$interval",
        "services.utils",
        "services.models",
        "api." + apiName + "Resources",
        "clientConfig",
        function (
            p_$rootScope,
            p_$q,
            p_$window,
            p_$stateParams,
            p_$state,
            p_$timeout,
            p_$interval,
            p_utils,
            p_models,
            p_resources,
            p_clientConfig,
            undefined
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var customer = p_models.namespace("fincam.master.customer");
            // --------------------------------------------------------------------------------
            // Modules
            // --------------------------------------------------------------------------------
            var self = ng.fincam.api.apply(this, [
                p_$rootScope,
                p_$q,
                p_$window,
                p_$stateParams,
                p_$state,
                p_$timeout,
                p_$interval,
                p_utils,
                p_models,
                p_resources,
                customer.masterCustomer
            ]);

            self.getProfile = function () {
                return p_resources.getProfile({}).$promise
                    .then(function (p_result) {
                        return p_models.new(customer.masterCustomer, p_result);
                    }, self.handleError, self.handleNotify);
            };

            self.updateProfile = function (p_profile) {
                return p_resources.updateProfile({}, p_profile).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }

            self.getDefaultPresentationSrc = function (p_vendorId) {
                return p_$q.resolve(p_clientConfig.fincamApiUrl + url + "/get-default-presentation/" + p_vendorId);
            }
            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));