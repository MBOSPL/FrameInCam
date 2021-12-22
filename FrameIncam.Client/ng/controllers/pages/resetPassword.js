(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "resetPassword";
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
        '$location',
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
            p_$location,
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
            var common = p_models.namespace("fincam.common")
            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {
                return p_$q.resolve();
            }

            p_$scope.init = function () {
                var tasks = [];
                p_$scope.errorMsgs = [];
                p_$scope.user = p_models.new(common.resetPasswordRequest, {});
                var searchObject = p_$location.search();
                if (p_utils.isObject(searchObject)) {
                    p_$location.search({});
                    p_$scope.user.token = searchObject.token;
                    p_$scope.user.email = searchObject.email;
                }
                console.log(searchObject, p_$scope.user);
                p_$scope.initValidationOptions();

                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {

                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            p_$scope.initValidationOptions = function () {
                p_$scope.resetPasswordValidationOptions = {
                    rules: {
                        email: {
                            required: true
                        },
                        token: {
                            required: true
                        },
                        password: {
                            required: true,
                            pwdCheck:true
                        },
                        confirmPassword: {
                            required: true,
                            pwdCheck: true,
                            equalTo: "#user_password"
                        },
                    },
                    messages: {
                        password: {
                            required: "Password Cannot Be Empty!",
                            pwdCheck: "Password needs to include both lower,upper case characters and atleast one number"
                        },
                        confirmPassword: {
                            required: "Password Cannot Be Empty!",
                            pwdCheck: "Password needs to include both lower,upper case characters and atleast one number",
                            equalTo:  "Password Doesn't Match"
                        }
                    }
                };
            }
            p_$scope.resetpassword = function (p_resetPasswordForm) {
                if (p_resetPasswordForm.validate()) {
                    return p_accountApi.resetPassword(p_$scope.user).then(function (p_authResult) {
                        if (p_utils.isArray(p_authResult.errorMsgs) && p_authResult.errorMsgs.length > 0) {
                            p_$scope.errorMsgs = p_authResult.errorMsgs;
                            return p_$q.reject();
                        }
                        $.alert({
                            title: "Success!",
                            content: "Email Password Reset Successfully"
                        })
                        p_$window.location.href = "/";
                    });
                }
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));