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
    var apiName = "masterVendorSubscriptionApi";
    var url = "/api/master/freelancer-subscription";

    // --------------------------------------------------------------------------------
    // Resources
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName + "Resources", [
        "$resource",
        function (p_$resource) {
            var actions = ng.fincam.resource.apply({}, [url, {
                getActiveSubscription: { method: "GET", url: "get-active-subscription" },
                addSubscription: { method: "POST", url: "add-subscription/:subscriptionId/:orderId/:paymentId" },
                getActiveVendorSubscription: { method: "GET", url: "get-active-freelancer-subscription" }
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
            var vendor = p_models.namespace("fincam.master.vendor");
            var subscription = p_models.namespace("fincam.master.subscription");

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
                vendor.masterVendorSubscriptions
            ]);

            self.getActiveSubscription = function () {
                return p_resources.getActiveSubscription({}).$promise
                    .then(function (p_result) {
                        return p_models.new(subscription.masterSubscription, p_result);
                    }, self.handleError, self.handleNotify);
            }

            self.addSubscription = function (subscriptionId, paymentRequestModel) {
                return p_resources.addSubscription({ 'subscriptionId': subscriptionId }, paymentRequestModel).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }
            self.getActiveVendorSubscription = function () {
                return p_resources.getActiveVendorSubscription({}).$promise
                    .then(function (p_result) {
                        return p_models.new(vendor.masterVendorSubscriptions, p_result);
                    }, self.handleError, self.handleNotify);
            }

            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));