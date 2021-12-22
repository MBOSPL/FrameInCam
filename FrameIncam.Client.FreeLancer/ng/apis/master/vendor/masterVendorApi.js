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
    var apiName = "masterVendorApi";
    var url = "/api/master/freelancer";

    // --------------------------------------------------------------------------------
    // Resources
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName + "Resources", [
        "$resource",
        function (p_$resource) {
            var actions = ng.fincam.resource.apply({}, [url, {
                getProfile: { method: "GET", url: "get-profile" },
                getDetail: { method: "GET", url: "get-vendor-detail/:vendorId/:customerId" },
                updateProfile: { method: "POST", url: "update-profile" },
                query: { method: "POST", url: "query-vendor" },
                getShortlistedVendors: { method: "GET", url: "get-shortlisted" },
                toggleVendorSelection: { method: "POST", url: "toggle-vendor-selection/:vendorId" }
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
            var common = p_models.namespace("fincam.common");
            var commonVendor = p_models.namespace("fincam.common.vendor");

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
                vendor.masterVendor
            ]);

            self.getProfile = function () {
                return p_resources.getProfile({}).$promise
                    .then(function (p_result) {
                        return p_models.new(common.vendorProfile, p_result);
                    }, self.handleError, self.handleNotify);
            };

            self.getDetail = function (p_vendorId, p_customerId) {
                return p_resources.getDetail({ vendorId: p_vendorId, customerId: p_customerId }).$promise
                    .then(function (p_result) {
                        return p_models.new(commonVendor.vendorDetailSearchResult, p_result);
                    }, self.handleError, self.handleNotify);
            };

            self.updateProfile = function (p_profile) {
                return p_resources.updateProfile({}, p_profile).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }

            self.queryVendor = function (p_vendorSearchQuery) {
                return p_resources.query({}, p_vendorSearchQuery).$promise
                    .then(function (p_results) {
                        return p_models.new(fincam.paginationResults, p_results, {
                            element: commonVendor.vendorSearchResult
                        })
                    }, self.handleError, self.handleNotify);
            }

            self.getDefaultPresentationSrc = function (p_vendorId) {
                return p_$q.resolve(p_clientConfig.fincamApiUrl + url + "/get-default-presentation/" + p_vendorId);
            }

            self.getShortlistedVendors = function () {
                return p_resources.getShortlistedVendors({}).$promise
                    .then(function (p_results) {
                        return p_models.new(fincam.paginationResults, p_results, {
                            element: commonVendor.vendorSearchResult
                        });
                    }, self.handleError, self.handleNotify);
            }

            self.toggleVendorSelection = function (p_vendorId) {
                return p_resources.toggleVendorSelection({ vendorId: p_vendorId }, null).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }
            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));