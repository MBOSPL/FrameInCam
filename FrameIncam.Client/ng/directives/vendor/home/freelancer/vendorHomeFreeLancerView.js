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
    var directiveName = "ficVendorHomeFreelancerView";
    var directiveControllerName = "directives." + directiveName + "Controller";
    var templateUrl = "/templates/directives/vendor/home/freelancer/vendor-home-freelancer-view.html";

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
        "api.masterFreeLancerApi",
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
            p_masterFreeLancerApi,
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
                return false;
            }

            p_$scope.init = function () {
                return p_$q.all([]).then(function () {
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }
            p_$scope.viewFreeLancer = function (freelancer) {
                if (p_$scope.view == 'list') {
                    var url = p_$state.href("vendor-freelancer-detail", {
                        freelancerId: freelancer.id
                    });
                    window.open(url, '_blank');
                    return;
                }
                return p_$state.go("vendor-freelancer-detail", {
                    freelancerId: freelancer.id
                });
            }
            p_$scope.assignFreeLancer = function (freelancer) {
                p_$scope.value.pageRecords = p_$scope.value.pageRecords.map(function (r) {
                    if (r.id != freelancer.id)
                        r.isSelected = false;
                    else
                        r.isSelected = true;
                    return r;
                });
            }
            p_$scope.toggleFreeLancerSelection = function (freeLancer) {
                freeLancer.isShortlisted = !freeLancer.isShortlisted;

                return p_masterFreeLancerApi.toggleFreeLancerSelection(freeLancer.id).then(function () {
                });
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
                    view:"=view"
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