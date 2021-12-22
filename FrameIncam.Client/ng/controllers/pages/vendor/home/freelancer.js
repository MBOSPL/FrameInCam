(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "vendorFreelancer";
    var controllerName = pageName + "Controller";

    // --------------------------------------------------------------------------------
    // Controller
    // --------------------------------------------------------------------------------
    module.controller(controllerName, [
        "$rootScope",
        "$scope",
        "$stateParams",
        "$state",
        "$q",
        "$window",
        "$timeout",
        "$interval",
        "services.utils",
        "services.localStorage",
        "services.models",
        "api.masterFreeLancerApi",
        "api.masterFreeLancerTypeApi",
        "api.masterGeoApi",
        function (
            p_$rootScope,
            p_$scope,
            p_$stateParams,
            p_$state,
            p_$q,
            p_$window,
            p_$timeout,
            p_$interval,
            p_utils,
            p_localStorage,
            p_models,
            p_masterFreeLancerApi,
            p_masterFreeLancerTypeApi,
            p_masterGeoApi,
            undefined
        ) {
            ng.fincam.pageController(
                p_$rootScope,
                p_$scope,
                p_$stateParams,
                p_$state,
                p_$q,
                p_$window,
                p_$timeout,
                p_$interval,
                p_models,
                p_localStorage,
                controllerName,
                undefined
            );

            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------

            var transaction = p_models.namespace("fincam.transaction");
            var freelancer = p_models.namespace("fincam.master.freelancer");
            var commonFreeLancer = p_models.namespace("fincam.common.freelancer");
            var geo = p_models.namespace("fincam.master.geo");
            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {

                return p_masterFreeLancerApi.queryFreeLancer(p_$scope.searchQuery).then(function (p_projectList) {
                    p_$scope.freelancers = p_projectList
                });
            }

            p_$scope.init = function () {
                var tasks = [];

                /*p_$scope.isEditMode = false;
                p_$scope.selectedProject = null;*/
                p_$scope.errorMsgs = [];
                p_$scope.view = 'grid';
                p_$scope.freelancers = p_models.array([], commonFreeLancer.freelancerSearchResult);
                tasks.push(p_masterFreeLancerTypeApi.getAll().then(function (p_vendorTypes) {
                    var emptyVendorType = p_models.new(freelancer.masterFreeLancerType, {
                        id: 0,
                        type: "What you are looking for?"
                    });

                    p_$scope.vendorTypes = [emptyVendorType].concat(p_vendorTypes || []);
                }));
                tasks.push(p_masterGeoApi.getOperationalCityListForFreeLancer().then(function (p_cities) {
                    var emptyCity = p_models.new(geo.masterGeo, {
                        id: 0,
                        geoName: "Select City"
                    });

                    p_$scope.geoCities = [emptyCity].concat(p_cities || []);
                }));
                return p_$q.all(tasks).then(function () {
                    p_$scope.searchQuery = p_models.new(commonFreeLancer.freeLancerSearchQuery, {
                        freeLancerTypeId: 0,
                        geoCityId: 0,
                        search: "",
                        vendorId: (p_$rootScope.userProfile ? p_$rootScope.userProfile.vendorId : null)
                    });
                    return p_$scope.refresh().then(function () {
                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            /*p_$scope.newProject = function () {
                p_$scope.selectedProject = p_models.new(transaction.trnProject, {});
                p_$scope.isEditMode = true;
            }*/


            

/*            p_$scope.save = function (p_project) {
                var tasks = [];

                if (!p_project.id)
                    tasks.push(p_projectApi.add(p_project));
                else
                    tasks.push(p_projectApi.modify(p_project));

                return p_$q.all(tasks).then(function (p_result) {
                    var result = p_utils.isArray(p_result) ? p_result[0] : p_result;
                    if (p_utils.isObject(result) && p_utils.isArray(result.errorMsgs) && result.errorMsgs.length === 0)
                        return p_$scope.refresh().then(function () {
                            p_$scope.completeEdit();
                        });

                    else if (p_utils.isArray(result.errorMsgs) && result.errorMsgs.length > 0)
                        p_$scope.errorMsgs = result.errorMsgs;
                    else if (!p_utils.isObject(result))
                        p_$scope.errorMsgs = ['Save failed'];
                });
            }*/

            /*p_$scope.completeEdit = function () {
                p_$scope.isEditMode = false;
                p_$scope.selectedProject = null;
            }*/
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));