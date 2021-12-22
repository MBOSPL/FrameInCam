(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------

    // --------------------------------------------------------------------------------
    // Route
    // --------------------------------------------------------------------------------
    ng.module("app").config([
        "$stateProvider",
        function (
            p_$stateProvider,
            undefined
        ) {
            // States
            p_$stateProvider

                // --------------------------------------------------------------------------------
                // Vendor
                // --------------------------------------------------------------------------------

                // Search
                .state("vendor-search", {
                    url: "/vendors/:vendorTypeId/:cityGeoId",
                    template: ng.fincam.template("/templates/pages/vendor/vendor-search.html"),
                    controller: "vendorSearchController"
                })

                // Detail
                .state("vendor-detail", {
                    url: "/vendor-detail/:vendorId",
                    template: ng.fincam.template("/templates/pages/vendor/vendor-detail.html"),
                    controller: "vendorDetailController"
                })

                // dashboard
                .state("vendor-dashboard", {
                    url: "/dashboard",
                    template: ng.fincam.template("/templates/pages/vendor/home/dashboard.html"),
                    controller: "vendorDashboardController"
                })

                // portfolio
                .state("vendor-portfolio", {
                    url: "/portfolio",
                    template: ng.fincam.template("/templates/pages/vendor/home/portfolio.html"),
                    controller: "vendorPortfolioController"
                })

                // project
                .state("vendor-projects", {
                    url: "/projects",
                    template: ng.fincam.template("/templates/pages/vendor/home/projects.html"),
                    controller: "vendorProjectsController"
                })

                // reviews
                .state("vendor-reviews", {
                    url: "/reviews",
                    template: ng.fincam.template("/templates/pages/vendor/home/reviews.html"),
                    controller: "vendorReviewsController"
                })

                // subscription
                .state("vendor-subscription", {
                    url: "/subscription",
                    template: ng.fincam.template("/templates/pages/vendor/home/subscription.html"),
                    controller: "vendorSubscriptionController"
                })

                // users
                .state("vendor-users", {
                    url: "/users",
                    template: ng.fincam.template("/templates/pages/vendor/home/users.html"),
                    controller: "vendorUsersController"
                })

                // profile
                .state("vendor-profile", {
                    url: "/profile",
                    template: ng.fincam.template("/templates/pages/vendor/home/profile.html"),
                    controller: "vendorProfileController"
                })

                /*.state("vendor-upcomingproject", {
                    url: "/upcoming",
                    template: ng.fincam.template("/templates/pages/vendor/home/upcoming.html"),
                    controller: "vendorProfileController"
                })*/

                // --------------------------------------------------------------------------------
                // Customer
                // --------------------------------------------------------------------------------

                // Home
                /*.state("customer-signin", {
                    url: "/customer-signin",
                    template: ng.fincam.template("./clogin.html"),
                    controller: "homeController"
                })*/

                // Search
                /*.state("customer-projects", {
                    url: "/customer/projects",
                    template: ng.fincam.template("/templates/pages/customer/projects/customer-projects.html"),
                    controller: "customerProjectsController"
                })*/

                // Project View
                .state("freelancer-project-view", {
                    url: "/vendor-home/project/:identifier",
                    template: ng.fincam.template("/templates/pages/customer/projects/customer-project-view.html"),
                    controller: "customerProjectViewController"
                })

                // Shortlisted vendors
                /*.state("vendor-shortlist", {
                    url: "/vendor-shortlist",
                    template: ng.fincam.template("/templates/pages/customer/vendor-shortlist.html"),
                    controller: "vendorShortlistController"
                })*/
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));