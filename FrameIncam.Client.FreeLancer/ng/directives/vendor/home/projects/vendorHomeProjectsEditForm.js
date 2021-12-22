(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Variables
    // --------------------------------------------------------------------------------
    var directiveName = "ficVendorHomeProjectsEditForm";
    var directiveControllerName = "directives." + directiveName + "Controller";
    var templateUrl = "/templates/directives/vendor/home/projects/vendor-home-projects-edit-form.html";

    // --------------------------------------------------------------------------------
    // Controller
    // --------------------------------------------------------------------------------
    module.controller(directiveControllerName, [
        "$rootScope",
        "$scope",
        "$stateParams",
        "$state",
        "$parse",
        "$q",
        "$window",
        "$timeout",
        "$interval",
        "services.utils",
        "api.accountApi",
        function (
            p_$rootScope,
            p_$scope,
            p_$stateParams,
            p_$state,
            p_$parse,
            p_$q,
            p_$window,
            p_$timeout,
            p_$interval,
            p_utils,
            p_accountApi,
            undefined
        ) {
            ng.fincam.directive(
                p_$rootScope,
                p_$scope,
                p_$stateParams,
                p_$state,
                p_$parse,
                p_$q,
                p_$window,
                p_$timeout,
                p_$interval,
                directiveControllerName
            );

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.isDisabled = function () {
                return false;;
            }

            p_$scope.init = function () {
                if (!p_$scope.value)
                    return p_$q.reject();

                p_$scope.initValidationOptions();

                var today = new Date();

                p_$scope.value.projectDate = today;

                return p_$q.all([]).then(function () {
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            p_$scope.getTitle = function () {
                if (p_$scope.value.id && p_$scope.value.id > 0)
                    return "Edit " + p_$scope.value.projectName;

                return "New Project";
            }

            p_$scope.initValidationOptions = function () {
                p_$scope.saveProjectValidationOptions = {
                    rules: {
                        name: {
                            required: true
                        },
                        date: {
                            required: true
                        },
                        customerName: {
                            required: true
                        },
                        customerEmail: {
                            required: true,
                            email: true
                        },
                        customerMobile: {
                            required: true,
                            mobileIndia: true
                        },
                        customerCity: {
                            required: true
                        }
                    },
                    messages: {
                        name: "",
                        date: "",
                        customerName: "",
                        customerEmail: "",
                        customerMobile: {
                            required: "",
                            mobileIndia: "Invalid mobile number"
                        },
                        customerCity: ""
                    }
                };
            }

            p_$scope.save = function (p_projectEditForm) {
                if (p_projectEditForm.validate()) {
                    return p_$scope.saveProject();
                }
            }

            p_$scope.cancelEdit = function () {
                if (p_$scope.isDisabled() || p_utils.isNullOrUndefined(p_$scope.cancelEditHandler) || !p_utils.isString(p_$scope.cancelEditHandler)) {
                    return false;
                }

                return p_$scope.trigger(p_$scope.cancelEditHandler, {});
            }

            p_$scope.saveProject = function () {
                if (p_$scope.isDisabled() || p_utils.isNullOrUndefined(p_$scope.saveProjectHandler) || !p_utils.isString(p_$scope.saveProjectHandler)) {
                    return false;
                }

                return p_$scope.trigger(p_$scope.saveProjectHandler, { $project: p_$scope.value });
            }

            p_$scope.getCustomer = function (email) {
                p_accountApi.getCustomer({ 'email': email })
                    .then(function (result) {
                        console.log(p_$scope.value);
                        p_$scope.value.customerName = result.customerName;
                        p_$scope.value.customerId = result.customerId;
                        p_$scope.value.customerEmail = result.customerEmail;
                        p_$scope.value.customerMobileNo = result.customerMobileNo;
                        p_$scope.value.customerCity = result.customerCity;
                        p_$scope.value.customerAlternateMobileNo = result.customerAltMobileNo;
                        p_$scope.value.customerPin = result.customerPin;
                        p_$scope.value.customerAddress1 = result.customerAddressLine1;
                        p_$scope.value.customerAddress2 = result.customerAddressLine2;
                        //p_$scope.value = result;
                    })
            }
        }
    ]);

    // --------------------------------------------------------------------------------
    // Directive
    // --------------------------------------------------------------------------------
    module.directive(directiveName, [
        "$rootScope",
        "$stateParams",
        "$state",
        "$parse",
        "$q",
        "$timeout",
        "$interval",
        function (
            p_$rootScope,
            p_$stateParams,
            p_$state,
            p_$parse,
            p_$q,
            p_$timeout,
            p_$interval,
            undefined
        ) {
            return {
                restrict: "E",
                require: "^ngModel",
                template: ng.fincam.template(templateUrl),
                controller: directiveControllerName,
                scope: {
                    value: "=ngModel",
                    disabled: "=ngDisabled",
                    saveProjectHandler: "@saveProject",
                    cancelEditHandler: "@cancelEdit",
                    getCustomerHandler:"@getCustomer"
                },
                link: function (p_$scope, p_$element, p_$attrs, p_$ngModel) {
                    // --------------------------------------------------------------------------------
                    // Events
                    // --------------------------------------------------------------------------------

                    // --------------------------------------------------------------------------------
                    // Render
                    // --------------------------------------------------------------------------------
                    p_$scope.init();
                }
            };
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));