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
            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {
                var asyncTasks = [];

                asyncTasks.push(p_masterVendorTypeApi.getAll().then(function (p_vendorTypes) {
                    var emptyVendorType = p_models.new(vendor.masterVendorType, {
                        id: 0,
                        type: "What you are looking for?"
                    });

                    p_$scope.vendorTypes = [emptyVendorType].concat(p_vendorTypes || []);
                }));

                asyncTasks.push(p_masterGeoApi.getOperationalCityList().then(function (p_cities) {
                    var emptyCity = p_models.new(geo.masterGeo, {
                        id: 0,
                        geoName: "Select City"
                    });

                    p_$scope.geoCities = [emptyCity].concat(p_cities || []);
                }));
                asyncTasks.push(p_projectFilesApi.getLatestProjectFiles().then(function (p_files) {
                    p_$scope.latestProjectFiles = p_files;
                }));
                return p_$q.all(asyncTasks).then(function () { });
            }

            p_$scope.init = function () {
                var tasks = [p_$scope.initPage()];

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
                    nav: true,
                    dots: false,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    responsive: {
                        0: { items: 1 },
                        650: { items: 2 },
                        1300: { items: 3 },
                        1950: { items: 4 },
                        2600: { items: 5 },
                        3250: { items: 6 }
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
                    cityGeoId: p_$scope.searchQuery.cityGeoId
                });
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));