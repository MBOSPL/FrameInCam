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
    var apiName = "accountApi";
    var url = "/api/account";

    // --------------------------------------------------------------------------------
    // Resources
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName + "Resources", [
        "$resource",
        function (p_$resource) {
            var actions = ng.fincam.resource.apply({}, [url, {
                registerVendor: { method: "POST", url: "register-vendor" },
                registerCustomer: { method: "POST", url: "register-customer" },
                registerFreelancer: { method: "POST", url: "register-freelancer" },
                connect: { method: "POST", url: "connect" },
                getUser: { method: "GET", url: "get-user" },
                getCustomer: { method: "GET", url: "get-customer" }
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
            undefined
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var common = p_models.namespace("fincam.common");
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
                common.authResult
            ]);

            self.registerVendor = function (p_vendor) {
                return p_resources.registerVendor({}, p_vendor).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }

            self.registerCustomer = function (p_customer) {
                return p_resources.registerCustomer({}, p_customer).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }
            self.registerFreelancer = function (p_freelancer) {
                return p_resources.registerFreelancer({}, p_freelancer).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }
            self.connect = function (p_request) {
                return p_resources.connect({}, p_request).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }

            self.getUser = function () {
                return p_resources.getUser({}).$promise
                    .then(function (p_result) {
                        return p_models.new(common.userProfile, p_result);
                    }, self.handleError, self.handleNotify);
            }

            self.getCustomer = function (p_request) {
                return p_resources.getCustomer(p_request).$promise
                    .then(function (p_result) {
                        return p_models.new(common.customerProfile, p_result)
                    }, self.handleError, self.handleNotify);
            }

            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));