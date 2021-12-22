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
    var apiName = "projectApi";
    var url = "/api/transaction/project";

    // --------------------------------------------------------------------------------
    // Resources
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName + "Resources", [
        "$resource",
        function (p_$resource) {
            var actions = ng.fincam.resource.apply({}, [url, {
                getByVendor: { method: "GET", url: "get-by-vendor", isArray: true },
                getByCustomer: { method: "GET", url: "get-by-customer", isArray: true },
                getByFreelancer: { method: "GET", url: "get-by-freelancer", isArray: true },
                getByFreelancerWithStatus: { method: "GET", url: "get-by-freelancer/:projectStatus", isArray: true },
                add: { method: "POST", url: "add",isArray:false },
                modify: { method: "POST", url: "modify" },
                getByIdentifier: { method: "GET", url: "get-by-identifier/:identifier" },
                authenticatePin: { method: "POST", url: "authenticate-pin" },
                approveProject: { method: "POST", url: "approve-project/:projectId" }
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
            var transaction = p_models.namespace("fincam.transaction");
            var common = p_models.namespace("fincam.common");

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
                transaction.trnProject
            ]);

            self.getByVendor = function () {
                return p_resources.getByVendor({}).$promise
                    .then(self.array, self.handleError, self.handleNotify);
            };

            self.getByCustomer = function () {
                return p_resources.getByCustomer({}).$promise
                    .then(self.array, self.handleError, self.handleNotify);
            };
            self.getByFreelancer = function () {
                return p_resources.getByFreelancer({}).$promise
                    .then(self.array, self.handleError, self.handleNotify);
            };
            self.getByFreelancerWithStatus = function (projectStatus) {
                return p_resources.getByFreelancerWithStatus({ 'projectStatus': projectStatus}).$promise
                    .then(self.array, self.handleError, self.handleNotify);
            }
            self.add = function (p_project) {
                return p_resources.add({}, p_project).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }

            self.modify = function (p_project) {
                return p_resources.modify({}, p_project).$promise
                    .then(function (p_result) {
                        return p_models.new(common.fincamSaveActionResult, p_result);
                    }, self.handleError, self.handleNotify);
            }

            self.getDefaultPresentationSrc = function (p_projectId) {
                return p_$q.resolve(p_clientConfig.fincamApiUrl + url + "/get-default-presentation/" + p_projectId + "?t=" + p_$rootScope.token);
            }

            self.getByIdentifier = function (p_identifier) {
                return p_resources.getByIdentifier({ identifier: p_identifier }).$promise
                    .then(self.new, self.handleError, self.handleNotify);
            }

            self.authenticatePin = function (p_project) {
                return p_resources.authenticatePin({}, p_project).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }

            self.approveProject = function (p_projectId) {
                return p_resources.approveProject({ projectId: p_projectId }, null).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }

            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));