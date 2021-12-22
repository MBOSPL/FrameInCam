(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "vendorPortfolio";
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
        'clientConfig',
        "api.masterVendorFilesApi",
        "$sce",
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
            p_clientConfig,
            p_masterVendorFileApi,
            p_$sce,
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
                //p_$scope.mockRecords();
                var tasks = [];
                tasks.push(
                    p_masterVendorFileApi.getPhotos(p_$rootScope.userProfile.vendorId).then(function (res) {
                        var projectFiles = res;
                        p_$scope.photos = projectFiles.map(function (r) {
                            var obj = { presentationUrl:''};
                            obj.presentationUrl = p_masterVendorFileApi.getDefaultPresentationSrc(p_$rootScope.userProfile.vendorId,r.id);
                            return obj;
                        });
                    })
                );
                tasks.push(
                    p_masterVendorFileApi.getVideos(p_$rootScope.userProfile.vendorId).then(function (res) {
                        var projectFiles = res;
                        p_$scope.videos = projectFiles.map(function (r) {
                            var obj = { presentationUrl: '' };
                            obj.presentationUrl = r.fileName;
                            return obj;
                        });
                    })
                );
                return p_$q.all(tasks).then(function () {
                    
                });
                return p_$q.resolve();
            }
            p_$scope.trustSrc = function (src) {
                return p_$sce.trustAsResourceUrl(src);
            };
            p_$scope.mockRecords = function () {
                p_$scope.mockPhotos();
                p_$scope.mockAlbums();
                p_$scope.mockVideos();
            }
            p_$scope.dzOptions = {
                url: p_clientConfig.fincamApiUrl +"/api/master/vendor/portfolio/photos",
                paramName: 'photo',
                maxFilesize: 5,
                acceptedFiles: 'image/jpeg, images/jpg, image/png',
                addRemoveLinks: true,
                autoProcessQueue: false,
                maxFiles: 25,
                parallelUploads: 25,
                headers: { 'Authorization': "Bearer " + p_$rootScope.token},
                init: function () {
                    var myDropzone = this;
                    //now we will submit the form when the button is clicked
                    $("#sbmtbtn").on('click', function (e) {
                        e.preventDefault();
                        p_masterVendorFileApi.clearOldFiles().then(function (res) {
                            if (res.result == true) {
                                myDropzone.processQueue();
                            }
                        })
                    });
                    myDropzone.on("complete", function (file) {
                        if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
                            p_$scope.refresh().then(function () {
                                $.alert({
                                    title: "Success!",
                                    content: "Photos Updated Successfully"
                                });
                                 $("#photoUploadModel").modal('hide');
                            });
                        }
                    });
                }
            };
            p_$scope.dzCallbacks = {
                'addedfile': function (file) {
                },
                'success': function (file, xhr) {
                    
                }
            };
            p_$scope.dzMethods = {};
            p_$scope.removeNewFile = function () {
                p_$scope.dzMethods.removeFile($scope.newFile); //We got $scope.newFile from 'addedfile' event callback
            }
            //p_$scope.dzMethods.removeFile(file);
            p_$scope.mockPhotos = function () {
                p_$scope.photos = [
                    { presentationUrl: "assets/images/projects/1/Bridge.jpg" },
                    { presentationUrl: "assets/images/projects/1/Building 1.jpg" },
                    { presentationUrl: "assets/images/projects/1/City.jpg" },
                    { presentationUrl: "assets/images/projects/1/Flag Art.jpg" },
                    { presentationUrl: "assets/images/projects/1/Great Barrier Brief.jpg" },
                    { presentationUrl: "assets/images/projects/1/Nature.jpg" },
                    { presentationUrl: "assets/images/projects/1/Sydney.jpg" }
                ];
            }

            p_$scope.mockAlbums = function () {
                p_$scope.albums = [];

                p_$scope.albums.push({
                    id: 1,
                    name: "Nature",
                    files: [{ presentationUrl: "assets/images/projects/1/Bridge.jpg" },
                    {
                        presentationUrl: "assets/images/projects/1/Building 1.jpg",
                        isCover: true
                    },
                    { presentationUrl: "assets/images/projects/1/City.jpg" },
                    { presentationUrl: "assets/images/projects/1/Flag Art.jpg" },
                    { presentationUrl: "assets/images/projects/1/Great Barrier Brief.jpg" },
                    { presentationUrl: "assets/images/projects/1/Nature.jpg" },
                    { presentationUrl: "assets/images/projects/1/Sydney.jpg" }
                    ]
                }, {
                    id: 2,
                    name: "Black & White",
                    files: [{
                        presentationUrl: "assets/images/projects/2/1.png",
                        isCover: true
                    },
                    { presentationUrl: "assets/images/projects/2/2.png" },
                    { presentationUrl: "assets/images/projects/2/3.png" },
                    { presentationUrl: "assets/images/projects/2/4.png" }
                    ]
                });
            }

            p_$scope.mockVideos = function () {

            }
            p_$scope.submitVideos = function () {
                var videos = p_$scope.videoFormsInput.filter(function (r) {
                    if (r.fileName != "")
                        return true;
                    return false;
                });
                p_masterVendorFileApi.storeVideos(videos).then(function (res) {
                    if (res.result == true) {
                        p_$scope.refresh().then(function () {
                            $.alert({
                                title: "Success!",
                                content: "Videos Updated Successfully"
                            });
                            $("#videoUploadModel").modal('hide');
                        });
                    }
                })
            }
            p_$scope.init = function () {
                var tasks = [];
                p_$scope.videoFormsInput = [{ fileName: "" }, { fileName: "" }, { fileName: "" }];
                $('.input-images').imageUploader();

                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {
                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));