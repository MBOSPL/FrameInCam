(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "vendorSignup";
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
        "api.accountApi",
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
            p_accountApi,
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

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {
                var asyncTasks = [];

                asyncTasks.push(p_masterVendorTypeApi.getAll().then(function (p_vendorTypes) {
                    var emptyVendorType = p_models.new(vendor.masterVendorType, {
                        id: 0,
                        type: "Select Freelancer Type"
                    });

                    p_$scope.vendorTypes = [emptyVendorType].concat(p_vendorTypes || []);
                }));

                return p_$q.all(asyncTasks);
            }

            p_$scope.init = function () {
                var tasks = [];

                p_$scope.initValidationOptions();
                p_$scope.is_processing = false;
                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {
                        p_$scope.vendor = p_models.new(vendor.masterVendor, {});
                        p_$scope.errorMsgs = [];
                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            p_$scope.initValidationOptions = function () {
                p_$scope.registrationValidateOptions = {
                    rules: {
                        name: {
                            required: true
                        },
                        type: {
                            numberRequired: true,
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        mobile: {
                            required: true,
                            mobileIndia: true
                        },
                        password: {
                            required: true,
                            pwdCheck: true,
                            minlength: 8
                        }
                    },
                    messages: {
                        name: "",
                        type: "",
                        email: {
                            required: "",
                            email: "Invalid email"
                        },
                        mobile: {
                            required: "",
                            mobileIndia: "Invalid mobile number"
                        },
                        password: {
                            required: "",
                            pwdCheck: "Password need to: <br/> Include both lower and upper case characters <br/> Include atleast one number",
                            minlength: "Minimum atleast 8 characters long"
                        }
                    }
                };
            }

            p_$scope.register = function (p_registerForm) {
                if (p_registerForm.validate()) {
                    p_$scope.is_processing = true;
                    return p_accountApi.registerFreelancer(p_$scope.vendor).then(function (p_authResult) {
                        p_$scope.is_processing = false;
                        if (p_utils.isArray(p_authResult.errorMsgs) && p_authResult.errorMsgs.length > 0) {
                            p_$scope.errorMsgs = p_authResult.errorMsgs;
                            return p_$q.reject();
                        }
                        p_$scope.successMsg = 'Confimation Mail Sent!';
                        p_$scope.init();

/*
                        if (p_utils.isNullOrEmpty(p_authResult.token)) {
                            p_$scope.errorMsgs = ["Registration failed. Try again"];
                            return p_$q.reject();
                        }

                        return p_$scope.saveToken(p_authResult.token).then(function () {
                            return p_accountApi.getUser().then(function (p_userProfile) {
                                if (!p_userProfile || !p_userProfile.user || !p_userProfile.user.id) {
                                    p_$scope.errorMsgs = ["Login failed. Try again"];
                                    return p_$q.reject();
                                }

                                return p_$scope.saveProfile(p_userProfile).then(function () {
                                    p_$window.location.href = "/vendor-home";
                                });
                            });
                        });*/
                    }, err => {
                            p_$scope.is_processing = false;
                    });
                }
            }

            p_$scope.login = function () {
                p_$window.location.href = "/vendor-signin";
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));