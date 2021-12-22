(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "freeLancerDetail";
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
        "services.localStorage",
        "api.masterFreeLancerApi",
        "api.masterFreeLancerFilesApi",
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
            p_localStorage,
            p_masterFreeLancerApi,
            p_masterFreeLancerFileApi,
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
            var common = p_models.namespace("fincam.common");
            var commonFreeLancer = p_models.namespace("fincam.common.freelancer");
            var transaction = p_models.namespace("fincam.transaction");
            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------
            p_$scope.toggleFreeLancerSelection = function (freeLancer) {
                freeLancer.isShortlisted = !freeLancer.isShortlisted;

                return p_masterFreeLancerApi.toggleFreeLancerSelection(freeLancer.id).then(function () {
                });
            }
            p_$scope.refresh = function () {
                var freelancerId = parseInt(p_$stateParams.freelancerId);
                p_$scope.review = p_models.new(commonFreeLancer.freeLancerVendorReviewRequest, {});
                $('.listing_detail_header').css({
                    "background-image": "url('assets/images/freelancers/1/cover.png')"
                });
                var asyncTasks = [];
                /*asyncTasks.push(p_masterFreeLancerApi.getReview({ freelancerId: freelancerId, page: 1 })
                    .then(function (res) {
                        var records = res.pageRecords;
                        p_$scope.totalReviews = res.recordsTotal;
                        p_$scope.reviews = records;
                    }, err => {
                            console.log(err);
                    }))*/
                asyncTasks.push(p_masterFreeLancerApi.getDetail(freelancerId, p_$rootScope.userProfile.vendorId).then(function (p_freelancerDetail) {
                    p_$scope.detail = p_freelancerDetail;
                    return p_$q.resolve();
                }));
                return p_$q.all(asyncTasks).then(function () {

                });
            }
            p_$scope.storeReview = function () {
                p_$scope.review_is_submitting = true;
                p_$scope.review.freelancer_id =parseInt(p_$stateParams.freelancerId);
                return p_masterFreeLancerApi.storeReview(p_$scope.review).then(function (res) {
                    p_$scope.review_is_submitting = false;
                    if (res.result == true) {
                        $.alert({
                            title: "Success!",
                            content: "Review Posted Successfully"
                        })
                        return p_$scope.refresh().then(function () {
                        });
                    }
                    else {
                        $.alert({
                            title: "Error!",
                            content: res.errorMsgs.join(',')
                        })
                    }
                }, err => {
                    p_$scope.review_is_submitting = false;
                });
            }
            p_$scope.showLoginAlert = function () {
                if (!p_$rootScope.isCustomerLoggedIn()) {
                    $.confirm({
                        title: "Alert!",
                        content: "Sign in as a customer to write a review!",
                        buttons: {
                            yes: {
                                text: "Sign in",
                                btnClass: "btn-green",
                                action: function () {
                                    return window.location.href = "/customer-signin";

                                }
                            },
                            no: {
                                text: "Cancel",
                                btnClass: "btn-red",
                                action: function () {

                                }
                            }
                        }
                    });
                }
            }
            p_$scope.trustSrc = function (src) {
                return p_$sce.trustAsResourceUrl(src);
            };

            p_$scope.init = function () {
                /*if (!p_$rootScope.isUserLoggedIn()) {
                    window.location.href = "/customer-signin";
                    return;
                }*/
                p_$scope.totalReviews = 0;
                p_$scope.review_is_submitting = false;
                p_$scope.detail = p_models.new(commonFreeLancer.freelancerDetailSearchResult, {});
                p_$scope.review = p_models.new(commonFreeLancer.freeLancerVendorReviewRequest, {});
                p_$scope.photos = [];
                p_$scope.videos = [];
               // p_$scope.review.created_by = p_$rootScope.
                var freelancerId = parseInt(p_$stateParams.freelancerId);
                var tasks = [];
                tasks.push(
                    p_masterFreeLancerFileApi.getPhotos(p_$stateParams.freelancerId).then(function (res) {
                        var projectFiles = res;
                        p_$scope.photos = projectFiles.map(function (r) {
                            var obj = { presentationUrl: '' };
                            obj.presentationUrl = p_masterFreeLancerFileApi.getDefaultPresentationSrc(freelancerId,r.id);
                            return obj;
                        });
                    })
                );
                tasks.push(
                    p_masterFreeLancerFileApi.getVideos(p_$stateParams.freelancerId).then(function (res) {
                        var projectFiles = res;
                        p_$scope.videos = projectFiles.map(function (r) {
                            var obj = { presentationUrl: '' };
                            obj.presentationUrl = r.fileName;
                            return obj;
                        });
                    })
                );
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