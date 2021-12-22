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
    var apiName = "masterVendorFilesApi";
    var url = "/api/master/freelancer/portfolio";

    // --------------------------------------------------------------------------------
    // Resources
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName + "Resources", [
        "$resource",
        function (p_$resource) {
            var actions = ng.fincam.resource.apply({}, [url, {
                getPhotos: { method: "GET", url: "get-photos/:vendorId", isArray: true },
                clearOldFiles: { method: "POST", "url": 'clear-old-photos' },
                storeVideos: { method: "POST", url: "store-videos" },
                getVideos: { method: "POST", url: "get-videos/:vendorId", isArray: true  }
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
                vendor.masterVendorFiles
            ]);

            self.getPhotos = function (vendor_id) {
                return p_resources.getPhotos({ 'vendorId': vendor_id },null).$promise
                    .then(self.array, self.handleError, self.handleNotify);
            };
            self.getDefaultPresentationSrc = function (vendorId,p_fileId) {
                return (p_clientConfig.fincamApiUrl + url + "/get-default-presentation/" + vendorId+"/"+ p_fileId + "?t="+p_$rootScope.token);
            }
            self.clearOldFiles = function () {
                return p_resources.clearOldFiles({}).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }
            self.storeVideos = function (req) {
                return p_resources.storeVideos(null, req).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }
            self.getVideos = function (vendor_id) {
                return p_resources.getVideos({ 'vendorId': vendor_id },null).$promise
                    .then(self.array, self.handleError, self.handleNotify);
            }
            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));