(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "vendorDetail";
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
        "api.masterVendorApi",
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
            p_localStorage,
            p_masterVendorApi,
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
            var common = p_models.namespace("fincam.common");
            var commonVendor = p_models.namespace("fincam.common.vendor");
            var transaction = p_models.namespace("fincam.transaction");
            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {
                var vendorId = parseInt(p_$stateParams.vendorId);

                p_$scope.review = p_models.new(commonVendor.vendorCustomerReviewRequest, {});

                $('.listing_detail_header').css({
                    "background-image": "url('assets/images/vendors/1/cover.png')"
                });
                var asyncTasks = [];
                asyncTasks.push(p_masterVendorApi.getReview({ vendorId: vendorId, page: 1 })
                    .then(function (res) {
                        var records = res.pageRecords;
                        p_$scope.totalReviews = res.recordsTotal;
                        p_$scope.reviews = records;
                    }, err => {
                    }))
                asyncTasks.push(p_masterVendorApi.getDetail(vendorId, p_$rootScope.customerId).then(function (p_vendorDetail) {
                    p_$scope.detail = p_vendorDetail;
                    return p_$q.resolve();
                }));
                return p_$q.all(asyncTasks).then(function () {

                });
            }
            p_$scope.storeReview = function () {
                p_$scope.review_is_submitting = true;
                p_$scope.review.vendor_id =parseInt(p_$stateParams.vendorId);
                return p_masterVendorApi.storeReview(p_$scope.review).then(function (res) {
                    p_$scope.review_is_submitting = false;
                    if (res.result == true) {
                        $.alert({
                            title: "Success!",
                            content: "Review Posted Successfully"
                        })
                        return p_$scope.refresh().then(function () {
                            $('#listing_img_slider .owl-carousel').owlCarousel({
                                loop: true,
                                margin: 0,
                                nav: true,
                                dots: false,
                                autoplay: true,
                                autoplayTimeout: 5000,
                                responsive: {
                                    0: { items: 1 },
                                    400: { items: 2 },
                                    768: { items: 3 },
                                    992: { items: 4 }
                                }
                            })
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
            p_$scope.initCarousel = function () {
                console.log($('#listing_img_slider .owl-carousel'));
                $('#listing_img_slider .owl-carousel').owlCarousel({
                    loop: true,
                    margin: 0,
                    nav: true,
                    dots: false,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    responsive: {
                        0: { items: 1 },
                        400: { items: 2 },
                        768: { items: 3 },
                        992: { items: 4 }
                    }
                })
            }
            p_$scope.init = function () {
                /*if (!p_$rootScope.isUserLoggedIn()) {
                    window.location.href = "/customer-signin";
                    return;
                }*/
                p_$scope.totalReviews = 0;
                p_$scope.review_is_submitting = false;
                p_$scope.detail = p_models.new(commonVendor.vendorDetailSearchResult, {});
                p_$scope.review = p_models.new(transaction.trnVendorCustomerReview, {});
                p_$scope.photos = [];
                p_$scope.videos = [];
               // p_$scope.review.created_by = p_$rootScope.
                var vendorId = parseInt(p_$stateParams.vendorId);
                var tasks = [];
                tasks.push(
                    p_masterVendorFileApi.getPhotos(p_$stateParams.vendorId).then(function (res) {
                        var projectFiles = res;
                        p_$scope.photos = projectFiles.map(function (r) {
                            var obj = { presentationUrl: '' };
                            obj.presentationUrl = p_masterVendorFileApi.getDefaultPresentationSrc(vendorId,r.id);
                            return obj;
                        });
                    })
                );
                tasks.push(
                    p_masterVendorFileApi.getVideos(p_$stateParams.vendorId).then(function (res) {
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