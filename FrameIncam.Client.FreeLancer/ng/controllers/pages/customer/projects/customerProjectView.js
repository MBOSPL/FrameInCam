(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "customerProjectView";
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
        "api.projectApi",
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
            p_utils,
            p_localStorage,
            p_projectApi,
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

            var transaction = p_models.namespace("fincam.transaction");

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.goHome = function () {
                p_$window.location.href = "/";
            }

            p_$scope.refresh = function () {
                var deferred = p_$q.defer();

                p_projectApi.getByIdentifier(p_$scope.identifier).then(function (p_project) {
                    if (p_utils.isObject(p_project) && p_project.id) {
                        p_$scope.project = p_project;

                        return p_$scope.isAuthenticated().then(function () {
                            return p_projectFilesApi.getByProject(p_project.id).then(function (p_files) {
                                if (p_utils.isArray(p_files))
                                    p_$scope.files = p_files;

                                deferred.resolve();
                            });
                        }, function () {
                            deferred.reject();
                        });
                    }
                    else {
                        $.confirm({
                            title: 'Error',
                            content: 'Invalid request',
                            buttons: {
                                ok: {
                                    text: 'Ok',
                                    btnClass: 'btn-blue',
                                    action: function () {
                                        deferred.reject();
                                    }
                                }
                            }
                        });
                    }
                });

                return deferred.promise;
            }

            p_$scope.isAuthenticated = function () {
                var deferred = p_$q.defer();

                if (!p_$rootScope.isUserLoggedIn()) {
                    var promptPin = function (p_pin) {
                        if (!p_pin)
                            p_pin = "";

                        $.confirm({
                            title: 'Frame Incam',
                            closeIcon: false,
                            content: '' +
                                '<form action="" class="projectSignonForm">' +
                                '<div class="form-group">' +
                                '<label>Enter pin</label>' +
                                '<input type="text" placeholder="Your pin" class="pin form-control" value="'+ p_pin +'" required/>' +
                                '</div>' +
                                '</form>',
                            buttons: {
                                formSubmit: {
                                    text: "Submit",
                                    btnClass: "btn-green",
                                    action: function () {
                                        var pin = this.$content.find('.pin').val();
                                        if (!pin) {
                                            $.alert({
                                                title: 'Error',
                                                content: 'Please enter pin'
                                            });

                                            return false;
                                        }

                                        var project = p_models.new(transaction.trnProject, { id: p_$scope.project.id, key: pin });

                                        return p_projectApi.authenticatePin(project).then(function (p_result) {
                                            if (!p_result.result) {
                                                promptPin(pin);

                                                $.alert({
                                                    title: 'Error',
                                                    content: 'Invalid pin'
                                                });
                                            }
                                            else {
                                                p_$scope.projectPin = project.key;
                                                deferred.resolve();
                                            }
                                        });
                                    }
                                },
                                cancel: {
                                    text: "Cancel",
                                    btnClass: "btn-red",
                                    action: function () {
                                        deferred.reject();
                                    }
                                }
                            },
                            onContentReady: function () {
                                // bind to events
                                var jc = this;
                                this.$content.find('form').on('submit', function (e) {
                                    // if the user submits the form by pressing enter in the field.
                                    e.preventDefault();
                                    jc.$$formSubmit.trigger('click'); // reference the button and click it
                                });
                            }
                        });
                    };

                    if (!p_$scope.projectPin)
                        promptPin();
                }
                else {
                    deferred.resolve();
                }

                return deferred.promise;
            }

            p_$scope.init = function () {
                var tasks = [];
                p_$scope.identifier = p_$stateParams.identifier;
                p_$scope.project = p_models.new(transaction.trnProject, {});
                p_$scope.files = p_models.array([], transaction.trnProjectFiles);
                p_$scope.projectPin = "";
                p_$scope.isPinAuthentication = false;

                p_$scope.ready = false;
                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {
                        p_$scope.ready = true;
                    }, function () {
                        p_$scope.goHome();
                    });
                }).finally(function () {
                });
            }

            p_$scope.needApproval = function () {
                return p_$scope.project.status === "Photos Uploaded" && (p_$rootScope.isCustomerLoggedIn() || (p_$scope.projectPin!=""));
            }

            p_$scope.saveSelection = function (p_showMsgs) {
                if (p_showMsgs !== false)
                    p_showMsgs = true;

                var changedFiles = p_$scope.files.asEnumerable().where(function (p_file) {
                    return p_file.isApproved !== (p_file.currentApprovedState ? 1 : 0);
                }).select(function (p_file) {
                    return {
                        id: p_file.id,
                        isApproved: (p_file.currentApprovedState ? 1 : 0)
                    };
                }).toArray();

                if (!p_utils.isArray(changedFiles) || changedFiles.length === 0) {
                    if (p_showMsgs)
                        $.alert({
                            title: "Frame Incam",
                            content: "No changes made"
                        });

                    return p_$q.resolve();
                }

                return p_projectFilesApi.updateSelection(changedFiles).then(function (p_result) {
                    if (p_utils.isObject(p_result) && p_result.result) {
                        if (p_showMsgs)
                            $.alert({
                                title: "Frame Incam",
                                content: "Selection saved successfully"
                            });
                        //return p_$scope.refresh();

                        changedFiles.asEnumerable().forEach(function (p_file) {
                            var file = p_$scope.files.asEnumerable().firstOrDefault(function (p_dbFile) {
                                return p_dbFile.id === p_file.id;
                            });

                            if (file)
                                file.isApproved = p_file.isApproved;
                        });
                    }

                    return p_$q.resolve();
                });
            }

            p_$scope.confirmSelection = function () {
                $.confirm({
                    title: "Frame Incam",
                    content: "Are you sure, you want to approve?",
                    buttons: {
                        yes: {
                            text: "Yes",
                            btnClass: "btn-green",
                            action: function () {
                                return p_$scope.saveSelection(false).then(function () {
                                    var isFilesApproved = p_$scope.files.asEnumerable().any(function (p_file) {
                                        return p_file.isApproved;
                                    });

                                    if (!isFilesApproved) {
                                        $.alert({
                                            title: "Frame Incam",
                                            content: "Please select atleast a file to complete"
                                        });
                                    } else {
                                        return p_projectApi.approveProject(p_$scope.project.id).then(function () {
                                            return p_$scope.refresh().then(function () {
                                                $.alert({
                                                    title: "Frame Incam",
                                                    content: "Project approved successfully"
                                                });
                                            });
                                        });
                                    }
                                });
                            }
                        },
                        no: {
                            text: "No",
                            btnClass: "btn-red",
                            action: function () {

                            }
                        }
                    }
                });
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));