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
    var apiName = "masterGeoApi";
    var url = "/api/master/geo";

    // --------------------------------------------------------------------------------
    // Resources
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName + "Resources", [
        "$resource",
        function (p_$resource) {
            var actions = ng.fincam.resource.apply({}, [url, {
                getByParams: { method: "GET", url: "get-by-params/:levelId/:parentId", isArray: true },
                getOperationalCityList: { method: "GET", url: "get-operational-city-list", isArray: true }
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
            var geo = p_models.namespace("fincam.master.geo");

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
                geo.masterGeo
            ]);

            self.getByParams = function (p_levelId,p_parentId) {
                return p_resources.getByParams({ levelId: p_levelId, parentId: p_parentId }).$promise
                    .then(self.array, self.handleError, self.handleNotify);
            };

            self.getOperationalCityList = function () {
                return p_resources.getOperationalCityList({ }).$promise
                    .then(self.array, self.handleError, self.handleNotify);
            };

            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));