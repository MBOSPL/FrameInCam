(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "vendorProfile";
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
        "api.masterVendorApi",
        "api.masterVendorTypeApi",
        "api.masterVendorServiceApi",
        "api.masterGeoApi",
        "api.masterLovApi",
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
            p_masterVendorApi,
            p_masterVendorTypeApi,
            p_masterVendorServiceApi,
            p_masterGeoApi,
            p_masterLovApi,
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
            var common = p_models.namespace("fincam.common");

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {
                var asyncTasks = [];

                asyncTasks.push(p_masterVendorApi.getProfile().then(function (p_vendorProfile) {
                    p_$scope.profile = p_vendorProfile;

                    if (!p_utils.isObject(p_$scope.profile.vendor))
                        p_$scope.profile.vendor = p_models.new(vendor.masterVendor, {});

                    if (!p_utils.isObject(p_$scope.profile.address) || !p_$scope.profile.address.id || p_$scope.profile.address.id === 0)
                        p_$scope.profile.address = p_models.new(vendor.masterVendorAddress, {
                           vendorId : p_$scope.profile.vendor.id
                        });

                    if (!p_utils.isArray(p_$scope.profile.services))
                        p_$scope.profile.services = p_models.array([], vendor.masterVendorServiceMap);
                }));

                asyncTasks.push(p_masterVendorTypeApi.getAll().then(function (p_vendorTypes) {
                    var emptyVendorType = p_models.new(vendor.masterVendorType, {
                        id: 0,
                        type: "Select Vendor Type"
                    });

                    p_$scope.vendorTypes = [emptyVendorType].concat(p_vendorTypes || []);
                }));

                asyncTasks.push(p_masterVendorServiceApi.getAll().then(function (p_vendorServices) {
                    p_$scope.vendorServices = (p_vendorServices || []);
                }));

/*                asyncTasks.push(p_masterGeoApi.getByParams(3).then(function (p_cities) {
                    var emptyCity = p_models.new(geo.masterGeo, {
                        id: 0,
                        geoName: "Select City"
                    });

                    p_$scope.geoCities = [emptyCity].concat(p_cities || []);
                }));*/

                asyncTasks.push(p_masterGeoApi.getByParams(2).then(function (p_states) {
                    var emptyState = p_models.new(geo.masterGeo, {
                        id: 0,
                        geoName: "Select State"
                    });
                    p_states.sort(function(a, b){
                        if(a.geoName < b.geoName) { return -1; }
                        if(a.geoName > b.geoName) { return 1; }
                        return 0;
                    });
                    p_$scope.geoStates = [emptyState].concat(p_states || []);
                }));
                asyncTasks.push(p_masterLovApi.getByType("vendor_experience").then(function (p_vendorExperiences) {
                    p_$scope.vendorExpList = (p_vendorExperiences || []);
                }));

                return p_$q.all(asyncTasks).then(function () {
                    p_$scope.getCities();
                });
            }

            p_$scope.init = function () {
                p_$scope.profile = p_models.new(common.vendorProfile, {});

                var tasks = [];

                p_$scope.initValidationOptions();

                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {
                        p_$scope.allServiceSelected = p_$scope.isAllServiceSelected();

                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }
            p_$scope.getCities = function () {
                var stateId = p_$scope.profile.address.stateGeoId;
                p_masterGeoApi.getByParams(3, stateId).then(function (p_cities) {
                    var emptyCity = p_models.new(geo.masterGeo, {
                        id: 0,
                        geoName: "Select City"
                    });

                    p_$scope.geoCities = [emptyCity].concat(p_cities || []);
                });
            }
            p_$scope.initValidationOptions = function () {
                p_$scope.profileUpdateValidationOptions = {
                    rules: {
                        mobile: {
                            required: true,
                            mobileIndia: true
                        },
                        name: {
                            required: true
                        },
                        type: {
                            numberRequired: true
                        },
                        websiteUrl: {
                            url: true
                        },
                        fbUrl: {
                            url: true
                        },
                        instagramUrl: {
                            url: true
                        },
                        youtubeUrl: {
                            url: true
                        },
                        pincode: {
                            required: true
                        },
                        addressLine1: {
                            required: true
                        },
                        city: {
                            numberRequired: true
                        },
                        state: {
                            numberRequired: true
                        }
                    },
                    messages: {
                        mobile: {
                            required: "",
                            mobileIndia: "Invalid mobile number"
                        },
                        name: "",
                        type: "",
                        websiteUrl: {
                            url: "Invalid url"
                        },
                        fbUrl: {
                            url: "Invalid url"
                        },
                        instagramUrl: {
                            url: "Invalid url"
                        },
                        youtubeUrl: {
                            url: "Invalid url"
                        },
                        pincode: "",
                        addressLine1: "",
                        city: "",
                        state: ""
                    }
                };
            }

            p_$scope.toggleServiceSelection = function (p_service) {
                if (!p_$scope.isServiceSelected(p_service))
                    p_$scope.selectService(p_service);
                else
                    p_$scope.unselectService(p_service);

                p_$scope.allServiceSelected = p_$scope.isAllServiceSelected();
            }

            p_$scope.isServiceSelected = function (p_service) {
                return p_$scope.profile.services.asEnumerable().any(function (p_selectedService) {
                    return p_service.id === p_selectedService.serviceId;
                });
            }

            p_$scope.selectService = function (p_service) {
                var serviceMap = p_models.new(vendor.masterVendorServiceMap, {
                    vendorId: p_$scope.profile.vendor.id,
                    serviceId: p_service.id
                });

                p_$scope.profile.services.push(serviceMap);
            }

            p_$scope.unselectService = function (p_service) {
                var serviceMapIndex = p_$scope.profile.services.findIndex(function (p_serviceMap) {
                    return p_serviceMap.serviceId === p_service.id;
                });

                if (serviceMapIndex > -1)
                    p_$scope.profile.services.splice(serviceMapIndex, 1);
            }

            p_$scope.isAllServiceSelected = function () {
                return p_$scope.vendorServices.asEnumerable().all(function (p_service) {
                    return p_$scope.isServiceSelected(p_service);
                });
            }

            p_$scope.toggleAllServiceSelection = function () {
                p_$scope.allServiceSelected = !p_$scope.allServiceSelected;

                p_$scope.vendorServices.asEnumerable().forEach(function (p_service) {
                    if (p_$scope.allServiceSelected) {
                        if (!p_$scope.isServiceSelected(p_service))
                            p_$scope.selectService(p_service);
                    } else {
                        if (p_$scope.isServiceSelected(p_service))
                            p_$scope.unselectService(p_service);
                    }
                });
            }

            p_$scope.isVendorExpSelected = function (p_vendorExp) {
                if (!p_$scope.profile.vendor.experienceLovId)
                    return false;

                return p_$scope.profile.vendor.experienceLovId === p_vendorExp.id;
            }

            p_$scope.selectVendorExp = function (p_vendorExp) {
                p_$scope.profile.vendor.experienceLovId = p_vendorExp.id;
            }

            p_$scope.updateProfile = function (p_updateProfileForm) {
                if (p_updateProfileForm.validate()) {

                    p_$scope.profile.packages = p_$scope.profile.packages.asEnumerable().where(function (p_package) {
                        return p_package.description && p_package.pricePerDay;
                    }).toArray();

                    return p_masterVendorApi.updateProfile(p_$scope.profile).then(function (res) {
                        if (res.result == true) {
                            $.alert({
                                title: "Success!",
                                content: "Profile Updated Successfully"
                            });
                            p_$scope.refresh();
                        }
                        else {
                            $.alert({
                                title: "Error!",
                                content: res.errorMsgs.join(',')
                            });
                        }
                    });
                }
                else{
                    var validator = $("#updateProfileForm").data("validator");
                    validator.focusInvalid();
                }
            }

            p_$scope.addPackage = function () {
                p_$scope.profile.packages.push(p_models.new(vendor.masterVendorPackage, {
                    vendorId:p_$scope.profile.vendor.id
                }));
            }

            p_$scope.removePackage = function (p_package) {
                var index = p_$scope.profile.packages.findIndex(function (p_profilePackage) {
                    if (p_profilePackage.id && p_profilePackage.id > 0)
                        return p_package.id === p_profilePackage.id;

                    return p_package.description === p_profilePackage.description && p_package.pricePerDay === p_profilePackage.pricePerDay;
                });

                if (index > -1)
                    p_$scope.profile.packages.splice(index, 1);
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));