(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "vendorProjects";
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
        "services.utils",
        "services.localStorage",
        "services.models",
        "api.projectApi",
        function (
            p_$rootScope,
            p_$scope,
            p_$stateParams,
            p_$state,
            p_$q,
            p_$window,
            p_$timeout,
            p_$interval,
            p_utils,
            p_localStorage,
            p_models,
            p_projectApi,
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

            var transaction = p_models.namespace("fincam.transaction");

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {
                p_projectApi.getByVendorWithStatus("owned").then(function (p_projectList) {
                    p_$scope.projects = (p_utils.isArray(p_projectList) ? p_projectList : []);
                });
                return p_projectApi.getByVendorWithStatus("assigned").then(function (p_projectList) {
                    p_$scope.assignedProjects = (p_utils.isArray(p_projectList) ? p_projectList : []);
                });
            }

            p_$scope.init = function () {
                var tasks = [];

                p_$scope.isEditMode = false;
                p_$scope.selectedProject = null;
                p_$scope.errorMsgs = [];
                p_$scope.projects = p_models.array([], transaction.trnProject);
                p_$scope.assignedProjects = p_models.array([], transaction.trnProject);
                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {
                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            p_$scope.newProject = function () {
                p_$scope.selectedProject = p_models.new(transaction.trnProject, {});
                p_$scope.isEditMode = true;
            }


            

            p_$scope.save = function (p_project) {
                var tasks = [];

                if (!p_project.id)
                    tasks.push(p_projectApi.add(p_project));
                else
                    tasks.push(p_projectApi.modify(p_project));

                return p_$q.all(tasks).then(function (p_result) {
                    var result = p_utils.isArray(p_result) ? p_result[0] : p_result;
                    if (p_utils.isObject(result) && p_utils.isArray(result.errorMsgs) && result.errorMsgs.length === 0)
                        return p_$scope.refresh().then(function () {
                            p_$scope.completeEdit();
                        });

                    else if (p_utils.isArray(result.errorMsgs) && result.errorMsgs.length > 0)
                        p_$scope.errorMsgs = result.errorMsgs;
                    else if (!p_utils.isObject(result))
                        p_$scope.errorMsgs = ['Save failed'];
                });
            }

            p_$scope.completeEdit = function () {
                p_$scope.isEditMode = false;
                p_$scope.selectedProject = null;
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));