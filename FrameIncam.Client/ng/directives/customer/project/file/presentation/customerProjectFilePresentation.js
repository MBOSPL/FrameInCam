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
    var directiveName = "ficCustomerProjectFilePresentation";
    var directiveControllerName = "directives." + directiveName + "Controller";
    var templateUrl = "/templates/directives/customer/project/file/presentation/customer-project-file-presentation.html";

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
        "api.projectFilesApi",
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
            p_projectFilesApi,
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
                if (!p_$scope.value)
                    return p_$q.reject();

                var projectIdentifier = "";

                if (p_$scope.options && p_utils.isObject(p_$scope.options.project) && p_$scope.options.project.id)
                    projectIdentifier = p_$scope.options.project.identifier;
               
                
                if (p_$scope.value.thumbnail != null && p_$scope.value.thumbnail !="" )
                    p_$scope.thumbnailPresentationUrl = p_projectFilesApi.getDefaultPresentationSrc(p_$scope.value.thumbnail, "");
                else
                    p_$scope.thumbnailPresentationUrl = p_projectFilesApi.getDefaultPresentationSrc(p_$scope.value.id, "");
                p_$scope.originalPresentationUrl = p_projectFilesApi.getDefaultPresentationSrc(p_$scope.value.id, "");

                return p_$q.all([]).then(function () {
                }).finally(function () {
                    p_$scope.ready = true;
                    p_$scope.loading = false;
                });
            }

            p_$scope.isFileSelected = function () {
                return p_$scope.value.currentApprovedState;
            }

            p_$scope.toggleFileSelection = function () {
                p_$scope.value.currentApprovedState = !p_$scope.value.currentApprovedState;
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
                    options: "="
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