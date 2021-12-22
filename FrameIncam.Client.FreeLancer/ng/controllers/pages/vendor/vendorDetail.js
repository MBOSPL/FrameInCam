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

            var commonVendor = p_models.namespace("fincam.common.vendor");
            var transaction = p_models.namespace("fincam.transaction");
            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {
                var vendorId = parseInt(p_$stateParams.vendorId);

                $('.listing_detail_header').css({
                    "background-image": "url('assets/images/vendors/1/cover.png')"
                });

                return p_masterVendorApi.getDetail(vendorId, p_$rootScope.customerId).then(function (p_vendorDetail) {
                    p_$scope.detail = p_vendorDetail;
                    return p_$q.resolve();
                });
            }

            p_$scope.init = function () {
                p_$scope.detail = p_models.new(commonVendor.vendorDetailSearchResult, {});
                p_$scope.review = p_models.new(transaction.trnVendorCustomerReview, {});
                ///p_$scope.review.created_by = p_$rootScope.
                var tasks = [];

                return p_$q.all(tasks).then(function () {
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
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));