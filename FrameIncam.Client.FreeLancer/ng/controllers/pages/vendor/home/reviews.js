(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "vendorReviews";
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

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {
                p_$scope.reviews = [];
                p_$scope.mockReviews();
                return p_$q.resolve();
            }

            p_$scope.mockReviews = function () {
                p_$scope.reviews.push({
                    reviewedBy: "Samuvel",
                    reviewedUserIcon: "assets/images/11.jpg",
                    rating: 4.5,
                    date: "May 12,2020",
                    comment: "We had a pleasant time with photographers. I really loved how they put my pictures on our beautiful album. They are very communicative and clear. I also liked the way helped us plan the pre-wedding shoot. They are like family :)"
                });
                p_$scope.reviews.push({
                    reviewedBy: "Premkumar",
                    reviewedUserIcon: "assets/images/13.jpg",
                    rating: 4.8,
                    date: "May 12,2020",
                    comment: "Good professionals."
                });
            }

            p_$scope.init = function () {
                var tasks = [];

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