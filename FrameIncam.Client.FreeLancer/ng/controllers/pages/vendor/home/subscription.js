(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "vendorSubscription";
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
        "api.masterSubscriptionApi",
        "api.masterVendorSubscriptionApi",
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
            p_masterSubscriptionApi,
            p_masterVendorSubscriptionApi,
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

            var subscription = p_models.namespace("fincam.master.subscription");
            var vendor = p_models.namespace("fincam.master.vendor");
            var commonSubscription = p_models.namespace("fincam.common.subscription")
            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {
                var asyncTasks = [];

                asyncTasks.push(p_masterSubscriptionApi.getAll().then(function (p_subscriptions) {
                    p_$scope.subscriptions = p_subscriptions;
                }));

                asyncTasks.push(p_masterVendorSubscriptionApi.getActiveSubscription().then(function (p_activeSubscription) {
                    p_$scope.activeSubscription = p_activeSubscription;
                }));

                asyncTasks.push(p_masterVendorSubscriptionApi.getActiveVendorSubscription().then(function (p_activeSubscription) {
                    p_$scope.activeVendorSubscription = p_activeSubscription;
                }));

                return p_$q.all(asyncTasks);
            }

            p_$scope.init = function () {
                p_$scope.subscriptions = p_models.array([], subscription.masterSubscription);
                p_$scope.activeSubscription = p_models.new(subscription.masterSubscription, {});
                p_$scope.activeVendorSubscription = p_models.new(vendor.masterVendorSubscriptions, {});
                var tasks = [];

                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {
                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            p_$scope.isSusbcriptionSelected = function (p_subscription) {
                if (!p_utils.isObject(p_$scope.activeSubscription))
                    return false;

                return p_$scope.activeSubscription.id === p_subscription.id;
            }
            p_$scope.transactionHandler = function (res, subscriptionId, orderId) {
                res.razorpay_order_id = orderId;
                var paymentRequest = p_models.new(commonSubscription.paymentRequestModel, res);
                return p_masterVendorSubscriptionApi.addSubscription(subscriptionId, paymentRequest).then(function (res) {
                    if (res.result == true) {
                        return p_$scope.refresh().then(function () {
                            $.alert({
                                title: "Frame Incam",
                                content: "Subscription updated successfully"
                            });
                        });
                    }
                    else {
                        $.alert({
                            title: "Error!",
                            content: res.errorMsgs.join(',')
                        });
                    }

                 });
            }
            p_$scope.selectSubscription = function (p_subscription) {
                if (!p_subscription || !p_subscription.id)
                    $.alert({
                        title: "Error!",
                        content: "Select a subscription to proceed"
                    });
                else {
                    $.confirm({
                        title: "Frame Incam",
                        content: "Are you sure, you want to select subscription?",
                        buttons: {
                            yes: {
                                text: "Yes",
                                btnClass: "btn-green",
                                action: function () {
                                    return p_masterSubscriptionApi.getOrderId(p_subscription.id).then(function (res) {
                                        var paymentOrderModel = res.paymentOrderModel;
                                        paymentOrderModel.handler = function (transaction) {
                                            p_$scope.transactionHandler(transaction, p_subscription.id, paymentOrderModel.order_id);
                                        }

                                        $.getScript('https://checkout.razorpay.com/v1/checkout.js', function () {
                                            var rzp1 = new Razorpay(paymentOrderModel);
                                            rzp1.open();
                                        })
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
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));