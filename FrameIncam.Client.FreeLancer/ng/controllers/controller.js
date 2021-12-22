(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var key_userToken = "userToken";
    var key_userProfile = "userProfile";

    // --------------------------------------------------------------------------------
    // TODO
    // --------------------------------------------------------------------------------
    fincam.controller = function (
        p_$rootScope,
        p_$scope,
        p_$stateParams,
        p_$state,
        p_$q,
        p_$window,
        p_$timeout,
        p_$interval,
        p_controllerName,
        undefined
    ) {
        var self = this;
        if (!fincam.isNullOrUndefined(p_controllerName))
            p_$scope.controllerName = p_controllerName;

        return self;
    }

    fincam.pageController = function (
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
        p_controllerName,
        undefined
    ) {
        var self = this;
        fincam.controller(
            p_$rootScope,
            p_$scope,
            p_$stateParams,
            p_$state,
            p_$q,
            p_$window,
            p_$timeout,
            p_$interval,
            p_controllerName
        );

        // --------------------------------------------------------------------------------
        // Namespace
        // --------------------------------------------------------------------------------

        var common = p_models.namespace("fincam.common");

        p_$rootScope.getPageScope = function () {
            return p_$scope;
        }

        p_$scope.initPage = function () {
            var tasks = [];
            tasks.push(p_$scope.restoreUserProfile());

            return p_$q.all(tasks).then(function () {

            });
        }

        p_$scope.restoreUserProfile = function () {
            return p_$q.all([p_localStorage.get(key_userToken).then(function (p_token) {
                p_$rootScope.token = p_token;
            }), p_localStorage.get(key_userProfile).then(function (p_userProfile) {
                p_$rootScope.userProfile = p_userProfile;
            })]).then(function () {
            });
        }

        p_$rootScope.isUserLoggedIn = function () {
            return p_$rootScope.userProfile && p_$rootScope.userProfile.user && p_$rootScope.userProfile.user.id;
        }

        p_$rootScope.isVendorLoggedIn = function () {
            return p_$rootScope.isUserLoggedIn() && p_$rootScope.userProfile.role && (p_$rootScope.userProfile.role.name || "").toLowerCase() === "vendor";
        }

        p_$rootScope.isCustomerLoggedIn = function () {
            return p_$rootScope.isUserLoggedIn() && p_$rootScope.userProfile.role && (p_$rootScope.userProfile.role.name || "").toLowerCase() === "customer";
        }

        p_$scope.saveToken = function (p_token) {
            p_$rootScope.token = p_token;

            return p_localStorage.set(key_userToken, p_$rootScope.token)
                .then(function () { });
        }

        p_$scope.saveProfile = function (p_userProfile) {
            p_$rootScope.userProfile = p_userProfile;

            return p_localStorage.set(key_userProfile, p_$rootScope.userProfile).then(function () {
            });
        }

        p_$rootScope.logout = function () {
            if (p_$rootScope.isUserLoggedIn())
                return p_$q.all([
                    p_$scope.saveToken(null),
                    p_$scope.saveProfile(p_models.new(common.userProfile, {}))
                ]).then(function () { });

            return p_$q.resolve();
        }

        return self;
    }

})(jQuery, angular, document.children[0].hasAttribute("debug"));