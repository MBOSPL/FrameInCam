(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "vendorSearch";
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
        "services.models",
        "services.utils",
        "services.localStorage",
        "api.masterVendorTypeApi",
        "api.masterGeoApi",
        "api.masterVendorApi",
        function (
            p_$rootScope,
            p_$scope,
            p_$stateParams,
            p_$state,
            p_$q,
            p_$window,
            p_$timeout,
            p_$interval,
            p_models,
            p_utils,
            p_localStorage,
            p_masterVendorTypeApi,
            p_masterGeoApi,
            p_masterVendorApi,
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

            var vendor = p_models.namespace("fincam.master.vendor");
            var geo = p_models.namespace("fincam.master.geo");
            var fincam = p_models.namespace("fincam");
            var commonVendor = p_models.namespace("fincam.common.vendor");

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.vendorTypeConfig = {
                create: false,
                plugins: ['remove_button'],
                valueField: 'id',
                labelField: 'type',
                searchField:['type'],
                placeholder: 'What you are looking for?',
                onInitialize: function (selectize) {
                    // receives the selectize object as an argument
                },
                onChange: function (selectize) {
                    if (selectize == null) {
                        p_$scope.searchQuery.vendorTypeId = '';
                    }
                },
                maxItems: 1
            };
            p_$scope.cityConfig = {
                create: false,
                valueField: 'id',
                plugins:['remove_button'],
                labelField: 'geoName',
                searchField: ['geoName'],
                placeholder: 'Select City',
                onInitialize: function (selectize) {
                    // receives the selectize object as an argument
                },
                onChange: function (selectize) {
                    if (selectize == null) {
                        p_$scope.searchQuery.vendorTypeId = '';
                    }
                },
                maxItems: 1
            };
            p_$scope.refresh = function () {
                var asyncTasks = [];

                asyncTasks.push(p_masterVendorTypeApi.getAll().then(function (p_vendorTypes) {
                    var emptyVendorType = p_models.new(vendor.masterVendorType, {
                        id: 0,
                        type: "What you are looking for?"
                    });

                    //p_$scope.vendorTypes = [emptyVendorType].concat(p_vendorTypes || []);
                    p_$scope.vendorTypes = p_vendorTypes;
                }));

                asyncTasks.push(p_masterGeoApi.getOperationalCityList().then(function (p_cities) {
                    var emptyCity = p_models.new(geo.masterGeo, {
                        id: 0,
                        geoName: "Select City"
                    });

                    p_$scope.geoCities = p_cities;
                }));
                asyncTasks.push(p_masterVendorApi.queryVendor(p_$scope.searchQuery).then(function (p_vendorSearchResults) {
                    if (p_utils.isObject(p_vendorSearchResults))
                        p_$scope.vendors = p_vendorSearchResults
                }));
                return p_$q.all(asyncTasks).then(function () { });
            }

            p_$scope.clearSearch = function (p_event) {
                if (p_utils.isNullOrEmpty(p_$scope.searchQuery.search))
                    return;

                p_$scope.searchQuery.search = "";
                p_$scope.refresh();
            }
            p_$scope.clearFilter = function () {
                p_$scope.vendorTypeIdTV = 0;
                p_$scope.geoCityIdTV = 0;
                p_$scope.searchQuery.search = 0;
                p_$scope.refreshPage();
            }
            p_$scope.refreshPage = function () {
                return p_$state.go("vendor-search", {
                    vendorTypeId: p_$scope.vendorTypeIdTV||0,
                    cityGeoId: p_$scope.geoCityIdTV||0,
                    searchText: p_$scope.searchQuery.search == "" ? 0 : p_$scope.searchQuery.search
                });
            }
            p_$scope.isFilterApplied = function () {
                console.log(p_utils.isNullOrEmpty(p_$scope.searchQuery.vendorTypeId) == false, p_utils.isNullOrEmpty(p_$scope.searchQuery.geoCityId) == false, p_utils.isNullOrEmpty(p_$scope.searchQuery.search) == false
                    , p_utils.isNullOrUndefined(p_$scope.searchQuery.vendorTypeId) == false, p_utils.isNullOrUndefined(p_$scope.searchQuery.geoCityId) == false);
                return (p_utils.isNullOrEmpty(p_$scope.searchQuery.vendorTypeId) == false || p_utils.isNullOrEmpty(p_$scope.searchQuery.geoCityId) == false || p_utils.isNullOrEmpty(p_$scope.searchQuery.search) == false
                    || (p_utils.isNullOrUndefined(p_$scope.searchQuery.vendorTypeId) == false && p_$scope.searchQuery.vendorTypeId != 0) || p_utils.isNullOrUndefined(p_$scope.searchQuery.geoCityId) == false && p_$scope.searchQuery.geoCityId!=0)
                    ;
            }
            p_$scope.init = function () {
                var tasks = [];
                p_$scope.vendorTypes = p_models.array([], vendor.masterVendorType);
                p_$scope.geoCities = p_models.array([], geo.masterGeo);
                
                p_$scope.searchQuery = p_models.new(commonVendor.vendorSearchQuery, {
                    vendorTypeId: p_$stateParams.vendorTypeId,
                    geoCityId: p_$stateParams.cityGeoId,
                    search: p_$stateParams.searchText == 0 ? "" : p_$stateParams.searchText,
                    customerId: (p_$rootScope.userProfile ? p_$rootScope.userProfile.customerId : null)
                });
                p_$scope.vendorTypeIdTV = p_$scope.searchQuery.vendorTypeId;
                p_$scope.geoCityIdTV = p_$scope.searchQuery.geoCityId;
                p_$scope.vendors = p_models.new(fincam.paginationResults, {});

                p_$scope.view = "grid";
                p_$scope.title = "";

                if (p_$stateParams.vendorTypeId && p_$stateParams.vendorTypeId > 0)
                    tasks.push(p_masterVendorTypeApi.getById(p_$stateParams.vendorTypeId).then(function (p_vendorType) {
                        p_$scope.vendorType = p_vendorType;
                    }));

                if (p_$stateParams.cityGeoId && p_$stateParams.cityGeoId > 0)
                    tasks.push(p_masterGeoApi.getById(p_$stateParams.cityGeoId).then(function (p_cityGeo) {
                        p_$scope.geoCity = p_cityGeo;
                    }));

                return p_$q.all(tasks).then(function () {
                    p_$scope.title = (p_$scope.vendorType?p_$scope.vendorType.type:"") || "Vendors";

                    if (p_$scope.geoCity)
                        p_$scope.title = p_$scope.title + " in " + p_$scope.geoCity.geoName;

                    return p_$scope.refresh().then(function () {
                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }
            p_$scope.initializeVendorTypeSelect = function () {
                p_$timeout(function () {
                    $("#vendorType").selectize();
                }, 2000);
            }
            p_$scope.initializeCityIdSelect = function () {
                p_$timeout(function () {
                    $("#cityId").selectize();
                }, 2000);
            }
            p_$scope.toggleVendorSelection = function (p_vendor) {
                p_vendor.isShortlisted = !p_vendor.isShortlisted;

                return p_masterVendorApi.toggleVendorSelection(p_vendor.id).then(function () {
                });
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));