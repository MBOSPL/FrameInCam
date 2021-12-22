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
    var apiName = "masterFreeLancerApi";
    var url = "/api/master/freelancer";

    // --------------------------------------------------------------------------------
    // Resources
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName + "Resources", [
        "$resource",
        function (p_$resource) {
            var actions = ng.fincam.resource.apply({}, [url, {
                getProfile: { method: "GET", url: "get-profile" },
                getDetail: { method: "GET", url: "get-freelancer-detail/:freelancerId/:vendorId" },
                updateProfile: { method: "POST", url: "update-profile" },
                query: { method: "POST", url: "query-freelancer" },
                getShortlistedFreeLancers: { method: "GET", url: "get-shortlisted" },
                toggleFreeLancerSelection: { method: "POST", url: "toggle-freelancer-selection/:freelancerId" },
                storeReview: { method: "POST", url: "reviews" },
                getReview: { method: "GET", url: "reviews/get-by-freelancer/:freelancerId" },
                storeReplayForReview: { method: "POST", url: "reviews/:reviewId/replay" },
                getMSILink: { method: "POST", url: "get-exe-link" },
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
            var freelancer = p_models.namespace("fincam.master.freelancer");
            var common = p_models.namespace("fincam.common");
            var commonfreeLancer = p_models.namespace("fincam.common.freelancer");
            var transaction = p_models.namespace("fincam.transaction");
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
                freelancer.masterfreeLancer
            ]);

            self.getProfile = function () {
                return p_resources.getProfile({}).$promise
                    .then(function (p_result) {
                        return p_models.new(common.freelancerProfile, p_result);
                    }, self.handleError, self.handleNotify);
            };

            self.getDetail = function (p_freelancerId, p_customerId) {
                return p_resources.getDetail({ freelancerId: p_freelancerId, vendorId: p_customerId }).$promise
                    .then(function (p_result) {
                        return p_models.new(commonfreeLancer.freeLancerDetailSearchResult, p_result);
                    }, self.handleError, self.handleNotify);
            };

            self.updateProfile = function (p_profile) {
                return p_resources.updateProfile({}, p_profile).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }

            self.queryFreeLancer = function (p_freelancerSearchQuery) {
                return p_resources.query({}, p_freelancerSearchQuery).$promise
                    .then(function (p_results) {
                        return p_models.new(fincam.paginationResults, p_results, {
                            element: commonfreeLancer.freelancerSearchResult
                        })
                    }, self.handleError, self.handleNotify);
            }

            self.getDefaultPresentationSrc = function (p_freelancerId) {
                return p_$q.resolve(p_clientConfig.fincamApiUrl + url + "/get-default-presentation/" + p_freelancerId);
            }

            self.getShortlistedFreeLancers = function () {
                return p_resources.getShortlistedFreeLancers({}).$promise
                    .then(function (p_results) {
                        return p_models.new(fincam.paginationResults, p_results, {
                            element: commonfreeLancer.freelancerSearchResult
                        });
                    }, self.handleError, self.handleNotify);
            }

            self.toggleFreeLancerSelection = function (p_freelancerId) {
                return p_resources.toggleFreeLancerSelection({ freelancerId: p_freelancerId }, null).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }
            self.storeReview = function (review) {
                return p_resources.storeReview(null, review).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }
            self.getReview = function (page_with_id) {
                return p_resources.getReview(page_with_id, null).$promise
                    .then(function (p_results) {
                        return p_models.new(fincam.paginationResults, p_results, {
                            element: transaction.trnfreeLancerCustomerReview
                        });
                    }, self.handleError, self.handleNotify);
            }
            self.storeReplayForReview = function(reviewId, body){
                return p_resources.storeReplayForReview({ 'reviewId': reviewId }, body).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }
            self.getMSILink = function () {
                return p_resources.getMSILink({}, null).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }
            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));