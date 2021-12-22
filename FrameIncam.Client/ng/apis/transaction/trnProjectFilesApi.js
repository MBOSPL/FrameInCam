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
    var apiName = "projectFilesApi";
    var url = "/api/transaction/project/file";

    // --------------------------------------------------------------------------------
    // Resources
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName + "Resources", [
        "$resource",
        function (p_$resource) {
            var actions = ng.fincam.resource.apply({}, [url, {
                getByProject: { method: "GET", url: "get-by-project/:projectId", isArray: true },
                updateSelection: { method: "POST", url: "update-selection" },
                getLatestProjectFiles: { method: "GET", url: "get-latest-files", isArray: true },
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
                transaction.trnProjectFiles
            ]);

            self.getByProject = function (p_projectId) {
                return p_resources.getByProject({ projectId: p_projectId }).$promise
                    .then(self.array, self.handleError, self.handleNotify);
            };

            self.getDefaultPresentationSrc = function (p_fileId, p_projectIdentifier) {
                return p_clientConfig.fincamApiUrl + url + "/get-default-presentation/" + p_fileId + "/" + p_projectIdentifier + "?t=" + p_$rootScope.token;
            }

            self.updateSelection = function (p_files) {
                return p_resources.updateSelection({}, p_files).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }
            self.getLatestProjectFiles = function () {
                return p_resources.getLatestProjectFiles({}).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }
            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));