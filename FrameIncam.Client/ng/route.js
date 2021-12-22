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
                    url: "/vendor-home/dashboard",
                    template: ng.fincam.template("/templates/pages/vendor/home/dashboard.html"),
                    controller: "vendorDashboardController"
                })

                // portfolio
                .state("vendor-portfolio", {
                    url: "/vendor-home/portfolio",
                    template: ng.fincam.template("/templates/pages/vendor/home/portfolio.html"),
                    controller: "vendorPortfolioController"
                })
                //freelancer
                .state("vendor-freelancer",{
                    url: "/vendor-home/freelancer",
                    template: ng.fincam.template("/templates/pages/vendor/home/freelancer.html"),
                    controller: "vendorFreelancerController"
                })

                // project
                .state("vendor-projects", {
                    url: "/vendor-home/projects",
                    template: ng.fincam.template("/templates/pages/vendor/home/projects.html"),
                    controller: "vendorProjectsController"
                })

                // reviews
                .state("vendor-reviews", {
                    url: "/vendor-home/reviews",
                    template: ng.fincam.template("/templates/pages/vendor/home/reviews.html"),
                    controller: "vendorReviewsController"
                })

                // subscription
                .state("vendor-subscription", {
                    url: "/vendor-home/subscription",
                    template: ng.fincam.template("/templates/pages/vendor/home/subscription.html"),
                    controller: "vendorSubscriptionController"
                })
                .state("vendor-home-subscription", {
                    url: "/subscription",
                    template: ng.fincam.template("/templates/pages/vendor/home/home-subscription.html"),
                    controller: "vendorHomeSubscriptionController"
                })
                // users
                .state("vendor-users", {
                    url: "/vendor-home/users",
                    template: ng.fincam.template("/templates/pages/vendor/home/users.html"),
                    controller: "vendorUsersController"
                })

                // profile
                .state("vendor-profile", {
                    url: "/vendor-home/vendor-profile",
                    template: ng.fincam.template("/templates/pages/vendor/home/profile.html"),
                    controller: "vendorProfileController"
                })
                .state("vendor-project-view", {
                    url: "/vendor-home/project/:identifier",
                    template: ng.fincam.template("/templates/pages/customer/projects/customer-project-view.html"),
                    controller: "customerProjectViewController"
                })
                .state("vendor-freelancer-detail", {
                    url: "/vendor-home/freelancer/detail/:freelancerId",
                    template: ng.fincam.template("/templates/pages/freelancer/freelancer-detail.html"),
                    controller: "freeLancerDetailController"
                })
                // --------------------------------------------------------------------------------
                // Customer
                // --------------------------------------------------------------------------------

                // Home
                 .state("home", {
                     url: "/home",
                     template: ng.fincam.template("/templates/pages/customer/home.html"),
                     controller: "homeController"
                 })

                // Search
                .state("customer-projects", {
                    url: "/customer/projects",
                    template: ng.fincam.template("/templates/pages/customer/projects/customer-projects.html"),
                    controller: "customerProjectsController"
                })

                // Project View
                .state("customer-project-view", {
                    url: "/customer/project/:identifier",
                    template: ng.fincam.template("/templates/pages/customer/projects/customer-project-view.html"),
                    controller: "customerProjectViewController"
                })

                .state("customer-profile", {
                    url: "/customer/customer-profile",
                    template: ng.fincam.template("/templates/pages/customer/home/customer-profile.html"),
                    controller:"customerProfileController"
                })

                // Shortlisted vendors
                .state("vendor-shortlist", {
                    url: "/customer/vendor-shortlist",
                    template: ng.fincam.template("/templates/pages/customer/vendor-shortlist.html"),
                    controller: "vendorShortlistController"
                })
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));