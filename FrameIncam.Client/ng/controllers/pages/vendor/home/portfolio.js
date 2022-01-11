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
        "api.masterVendorApi",
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
            p_masterVendorApi,
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

            var currentlyScrolling = false;

            var SCROLL_AREA_HEIGHT = 40;

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------
            p_$scope.sortableOptions = {
                placeholder: "app",
                connectWith: ".apps-container",
                scroll: true,
                sort: function (event, ui) {

                    if (p_$scope.currentlyScrolling) {
                        return;
                    }

                    var windowHeight = $(window).height();
                    var mouseYPosition = event.clientY;

                    if (mouseYPosition < SCROLL_AREA_HEIGHT) {
                        p_$scope.currentlyScrolling = true;

                        $('html, body').animate({
                            scrollTop: "-=" + windowHeight / 2 + "px" // Scroll up half of window height.
                        },
                            400, // 400ms animation.
                            function () {
                                p_$scope.currentlyScrolling = false;
                            });

                    } else if (mouseYPosition > (windowHeight - SCROLL_AREA_HEIGHT)) {

                        p_$scope.currentlyScrolling = true;

                        $('html, body').animate({
                            scrollTop: "+=" + windowHeight / 2 + "px" // Scroll down half of window height.
                        },
                            400, // 400ms animation.
                            function () {
                                p_$scope.currentlyScrolling = false;
                            });

                    }
                },
                start: function (e, ui) {
                    p_$scope.sourceModelClone = ui.item.sortable.sourceModel.slice();
                    p_$scope.startPos = ui.item.index();
                    console.log(p_$scope.startPos);
                },
                stop: function (e, ui) {
                    // if the element is removed from the first container
                    if (
                        $(e.target).hasClass("uploaded-photos") &&
                        ui.item.sortable.droptarget &&
                        e.target != ui.item.sortable.droptarget[0]
                    ) {
                        ui.item.sortable.sourceModel.length = 0;
                        // clone the original model to restore the removed item
                        Array.prototype.push.apply(
                            ui.item.sortable.sourceModel,
                            p_$scope.sourceModelClone
                        );
                        //p_$scope.profile_photos = [];
                        p_$scope.sourceModelClone = null;

                        var selectedFile = p_$scope.photos[p_$scope.startPos];
                        console.log(selectedFile, p_$scope.photos);
                        p_masterVendorFileApi.setProfileImage(selectedFile.id).then(res => {
                            if (res.result == true) {
                                p_$scope.profile_photos = [{ presentationUrl: selectedFile.presentationUrl }];
                                $.alert({ title: 'Success', 'content': "Profile Picture Changed Successfully!" });
                            }
                            else {
                                p_$scope.profile_photos = [];
                                $.alert({ title: 'Error', content: 'Failed To Change a Profile Image' });
                            }
                        }, err => {
                            p_$scope.profile_photos = [];
                            $.alert({ title: 'Error', content: 'Failed To Change a Profile Image' });
                        })
                    }
                },
                receive: function (event, ui) {

                }
            };

            p_$scope.profileImg = 'http://localhost:5000/api/master/vendor/portfolio/get-default-presentation/19/124?t=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNCIsImp0aSI6Ijc4MzUyYTMyLWY3NzktNGZkNi04NjAwLThlZDMzYmM5NzgyZSIsIm5hbWUiOiJTdXJpeWEgRmxpbXMiLCJ1c2VybmFtZSI6InN1cml5YXByYWthc2hAbWF6ZXdvcmtzc29sdXRpb25zLmNvbSIsImVtYWlsIjoic3VyaXlhcHJha2FzaEBtYXpld29ya3Nzb2x1dGlvbnMuY29tIiwiSXNWZW5kb3IiOiJUcnVlIiwiVmVuZG9ySWQiOiIxOSIsIlZlbmRvcklkZW50aWZpZXIiOiIxZWNiYTE4My00ODIzLTQxYmItOGIyMC00OGI3NTE0ODVkMHMiLCJhdWQiOlsiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzOTMvIiwiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzOTMvIl0sImV4cCI6MTYyNjUzNjkyMCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNDgvIn0.hfvsIQFkqJl5HsimptBLFO-oslZQJiUN5z9F6JI60TM';
            p_$scope.refresh = function () {
                //p_$scope.mockRecords();
                var tasks = [];
                p_$scope.profile_photos = [];
                tasks.push(p_masterVendorApi.getDefaultPresentationSrc(p_$rootScope.userProfile.vendorId).then(function (p_presentationUrl) {
                    p_$scope.profile_photos.push({ 'presentationUrl': p_presentationUrl + "?ver=" + (Math.floor(Math.random() * 100) + 1) });
                }));
                tasks.push(
                    p_masterVendorFileApi.getPhotos(p_$rootScope.userProfile.vendorId).then(function (res) {
                        p_$scope.projectFiles = res;
                        p_$scope.photos = res.map(function (r) {
                            var obj = { presentationUrl: '', id: 0 };
                            obj.presentationUrl = p_masterVendorFileApi.getDefaultPresentationSrc(p_$rootScope.userProfile.vendorId, r.id);
                            obj.id = r.id;
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
            var fileMaxSize = 25;
            if (p_$rootScope.userProfile.maxProfilePhotoSizeInMB != null) {
                fileMaxSize = p_$rootScope.userProfile.maxProfilePhotoSizeInMB;
            }
            p_$scope.handlePaste = function (index, e) {
                var videolink = e.originalEvent.clipboardData.getData('text/plain');
                if (!p_$scope.isURL(videolink)) {
                    e.preventDefault();
                    var parser = new DOMParser();

                    var parsedIframe = parser.parseFromString(videolink, "text/html");
                    let iFrame = parsedIframe.getElementsByTagName("iframe");

                    // Read URL:
                    var src = iFrame[0].src;
                    p_$timeout(() => { p_$scope.videoFormsInput[index].fileName = src;}, 100);
                    
                    //return src;
                }
            }
            p_$scope.isURL = function(str) {
                var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
                    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
                return pattern.test(str);
            }
            p_$scope.dzOptions = {
                url: p_clientConfig.fincamApiUrl +"/api/master/vendor/portfolio/photos",
                paramName: 'photo',
                maxFilesize: fileMaxSize,
                acceptedFiles: 'image/jpeg, images/jpg, image/png',
                addRemoveLinks: true,
                autoProcessQueue: false,
                maxFiles: 25,
                parallelUploads: 25,
                headers: { 'Authorization': "Bearer " + p_$rootScope.token},
                init: function () {
                    var myDropzone = this;
                    p_$scope.myDropzone=myDropzone;
                    //now we will submit the form when the button is clicked
                    $("#sbmtbtn").on('click', function (e) {
                        e.preventDefault();
                        myDropzone.processQueue();
                    });
                    myDropzone.on("removedfile", function(file) {
                        if(!file.serverId) { return; }
                        p_masterVendorFileApi.clearOldFiles(file.serverId).then(function (res) {
                            if (res.result != true) {
                                $.alert({
                                    title: "Failed!",
                                    content: "Photo deletion failed."
                                });
                            }
                        },err=>{
                            $.alert({
                                title: "Failed!",
                                content: "Photo deletion failed."
                            });
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
                    p_masterVendorFileApi.getPhotos(p_$rootScope.userProfile.vendorId).then(function (res) {
                        res.forEach((photo,index)=>{
                            var mockFile={name:photo.fileName,size:photo.contentLength,serverId:photo.id};
                            var imageLink=p_masterVendorFileApi.getDefaultPresentationSrc(p_$rootScope.userProfile.vendorId,photo.id);
                            myDropzone.options.addedfile.call(myDropzone,mockFile);
                            myDropzone.options.thumbnail.call(myDropzone,mockFile, imageLink);
                        });
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
            p_$scope.loadExistingPhotos=function(){
                p_$scope.projectFiles.forEach((photo,index)=>{
                    var mockFile={name:photo.fileName,size:photo.contentLength};
                    p_$scope.myDropzone.options.addedfile(mockFile);
                    p_$scope.myDropzone.options.thumbnail(mockFile, p_$scope.photos[index].presentationUrl);
                });
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
                p_$scope.projectFiles=[];
                p_$scope.videoFormsInput = [{ fileName: "" }, { fileName: "" }, { fileName: "" }];
                $('.input-images').imageUploader();

                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {
                        if(p_$scope.videos.length>0)
                        {
                            p_$scope.videos.forEach((video,i)=>{
                                p_$scope.videoFormsInput[i].fileName=video.presentationUrl
                            });
                        }
                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));