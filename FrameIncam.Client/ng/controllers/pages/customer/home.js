(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "home";
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
        "services.localStorage",
        "api.masterVendorTypeApi",
        "api.masterGeoApi",
        "api.projectFilesApi",
        "api.masterVendorApi",
        "services.utils",
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
            p_localStorage,
            p_masterVendorTypeApi,
            p_masterGeoApi,
            p_projectFilesApi,
            p_masterVendorApi,
            p_utils,
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
            var projects = p_models.namespace("fincam.common.projects");
            var commonVendor = p_models.namespace("fincam.common.vendor");
            
            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------
            p_$scope.vendorTypeConfig = {
                create: false,
                plugins: ['remove_button'],
                valueField: 'id',
                labelField: 'type',
                searchField: ['type'],
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
                plugins: ['remove_button'],
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
                    p_$scope.vendorTypes = p_vendorTypes || [];
                }));

                asyncTasks.push(p_masterGeoApi.getOperationalCityList().then(function (p_cities) {
                    var emptyCity = p_models.new(geo.masterGeo, {
                        id: 0,
                        geoName: "Select City"
                    });

                    //p_$scope.geoCities = [emptyCity].concat(p_cities || []);
                    p_$scope.geoCities = p_cities || [];
                }));
                asyncTasks.push(p_projectFilesApi.getLatestProjectFiles().then(function (p_files) {
                    p_$scope.latestProjectFiles = p_files;
                }));
                return p_$q.all(asyncTasks).then(function () { });
            }
            p_$scope.navigateVendor = function (id) {
                
            }
            p_$scope.init = function () {
                var tasks = [];
                tasks.push(p_$scope.initPage());
                //$.fn.select2.defaults.set("height", "60px");
                p_$scope.searchQuery = p_models.new(commonVendor.vendorSearchQuery, {
                    vendorTypeId: 0,
                    geoCityId: 0,
                    search: "",
                    customerId: 0
                });
                tasks.push(p_masterVendorApi.queryVendor(p_$scope.searchQuery).then(function (p_vendorSearchResults) {
                    if (p_utils.isObject(p_vendorSearchResults))
                        p_$scope.vendors = p_vendorSearchResults.pageRecords;

                    return p_$q.resolve();
                }));
                p_$scope.searchQuery = {
                    vendorTypeId: 0,
                    cityGeoId: 0
                };
                p_$scope.vendorTypes = p_models.array([], vendor.masterVendorType);
                p_$scope.geoCities = p_models.array([], geo.masterGeo);
                p_$scope.latestProjectFiles = p_models.array([], projects.latestProjectFiles);
                $('.customer-home #listing_img_slider .owl-carousel').owlCarousel({
                    loop: true,
                    margin: 0,
                    dots: false,
                    autoplay: true,
                    autoplayTimeout: 3000,
                    responsive: {
                        0: { items: 1 },
                        650: { items: 2 },
                        1300: { items: 3 },
                        1950: { items: 4 },
                        2600: { items: 5 }
                    }
                })

                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {
                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            p_$scope.searchVendors = function () {
                return p_$state.go("vendor-search", {
                    vendorTypeId: p_$scope.searchQuery.vendorTypeId,
                    cityGeoId: p_$scope.searchQuery.cityGeoId,
                    searchText:0
                });
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));