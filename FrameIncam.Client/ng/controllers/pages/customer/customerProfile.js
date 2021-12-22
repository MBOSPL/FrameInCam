(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "customerProfile";
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
        "api.masterCustomerApi",
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
            p_masterCustomerApi,
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
            var geo = p_models.namespace("fincam.master.geo");
            var common = p_models.namespace("fincam.common");

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {
                var asyncTasks = [];
                asyncTasks.push(p_masterCustomerApi.getProfile().then(function (p_customerProfile) {
                    p_$scope.profile = p_customerProfile;
                }));
                return p_$q.all(asyncTasks).then(function () {

                });
            }

            p_$scope.init = function () {
                p_$scope.profile = p_models.new(customer.masterCustomer, {});
                var tasks = [];
                p_$scope.initValidationOptions();

                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {

                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            p_$scope.initValidationOptions = function () {
                p_$scope.profileUpdateValidationOptions = {
                    rules: {
                        email: {
                            required: true,
                            email: true
                        },
                        mobile: {
                            required: true,
                            mobileIndia: true
                        },
                        name: {
                            required: true
                        },
                        password: {
                            required: true,
                            pwdCheck: true,
                            minlength: 8
                        }
                    },
                    messages: {
                        mobile: {
                            required: "",
                            mobileIndia: "Invalid mobile number"
                        },
                        name: "",
                        password: {
                            required: "",
                            pwdCheck: "Password need to: <br/> Include both lower and upper case characters <br/> Include atleast one number",
                            minlength: "Minimum atleast 8 characters long"
                        }
                    }
                };
            }

            p_$scope.updateProfile = function (p_updateProfileForm) {
                console.log(p_updateProfileForm);
                if (p_updateProfileForm.validate()) {

                    return p_masterCustomerApi.updateProfile(p_$scope.profile).then(function (res) {
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
            }


        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));