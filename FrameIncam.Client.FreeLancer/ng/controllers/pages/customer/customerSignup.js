(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "customerSignup";
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

            var customer = p_models.namespace("fincam.master.customer");

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {
                return p_$q.resolve();
            }

            p_$scope.init = function () {
                var tasks = [];

                p_$scope.initValidationOptions();

                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {
                        p_$scope.customer = p_models.new(customer.masterCustomer, {});
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

            p_$scope.register = function (p_customerRegisterForm) {
                if (p_customerRegisterForm.validate()) {
                    return p_accountApi.registerCustomer(p_$scope.customer).then(function (p_authResult) {
                        if (p_utils.isArray(p_authResult.errorMsgs) && p_authResult.errorMsgs.length > 0) {
                            p_$scope.errorMsgs = p_authResult.errorMsgs;
                            return p_$q.reject();
                        }

                        if (p_utils.isNullOrEmpty(p_authResult.token)) {
                            p_$scope.errorMsgs = ["Registration failed. Try again"];
                            return p_$q.reject();
                        }

                        return p_$scope.saveToken(p_authResult.token).then(function () {
                            return p_accountApi.getUser().then(function (p_userProfile) {
                                if (!p_userProfile || !p_userProfile.user || !p_userProfile.user.id) {
                                    p_$scope.errorMsgs = ["Registration failed. Try again"];
                                    return p_$q.reject();
                                }

                                return p_$scope.saveProfile(p_userProfile).then(function () {
                                    p_$window.location.href = "/";
                                });
                            });
                        });
                    });
                }
            }

            p_$scope.customerLogin = function () {
                p_$window.location.href = "/customer-signin";
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));