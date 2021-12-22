(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Variables
    // --------------------------------------------------------------------------------
    var directiveName = "ficThumbnail";
    var directiveControllerName = "directives." + directiveName + "Controller";

    // --------------------------------------------------------------------------------
    // Controller
    // --------------------------------------------------------------------------------
    module.controller(directiveControllerName, [
        "$rootScope",
        "$scope",
        "$stateParams",
        "$state",
        "$parse",
        "$q",
        "$window",
        "$timeout",
        "$interval",
        function (
            p_$rootScope,
            p_$scope,
            p_$stateParams,
            p_$state,
            p_$parse,
            p_$q,
            p_$window,
            p_$timeout,
            p_$interval,
            undefined
        ) {
            ng.fincam.directive(
                p_$rootScope,
                p_$scope,
                p_$stateParams,
                p_$state,
                p_$parse,
                p_$q,
                p_$window,
                p_$timeout,
                p_$interval,
                directiveControllerName
            );

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------
            p_$scope.isDisabled = function () {
                return p_$scope.disabled;
            }
            p_$scope.init = function () {
                p_$scope.loading = false;
            }
        }
    ]);

    // --------------------------------------------------------------------------------
    // Directive
    // --------------------------------------------------------------------------------
    module.directive(directiveName, [
        "$rootScope",
        "$stateParams",
        "$state",
        "$parse",
        "$q",
        "$timeout",
        "$interval",
        "$http",
        "services.utils",
        function (
            p_$rootScope,
            p_$stateParams,
            p_$state,
            p_$parse,
            p_$q,
            p_$timeout,
            p_$interval,
            p_$http,
            p_utils,
            undefined
        ) {
            return {
                restrict: "E",
                template: "<div class=\"small\" ng-show=\"loading\"><i class=\"fa fa-spinner fa-pulse\"></i><span class=\"ml-2\">Downloading...</span></div>" +
                    "<span ng-click=\"options.selectable === true && onToggleSelectionHandler()\" class=\"w-100 absolute\"><div class='payment-check'><input type=\"checkbox\" ng-show=\"options.selectable === true\" ng-checked=\"isSelectedHandler({})\" ng-click=\"onToggleSelectionHandler({ $event: $event })\" /><label class='check-label' ><div ng-class=\"{'isselectable':options.selectable}\"><i class='text-success fa fa-check-circle'></i></div></label></div></span>",
                    //"<span ng-click=\"options.selectable === true && onToggleSelectionHandler()\" class=\"w-100 h-100 position-absolute\"><span class='badge badge-pill badge-success text-white' ng-if='isSelectedHandler({})'><i class=\"p-1 fa fa-check-circle\"></i> Selected </span></span>",
                //"<input type=\"checkbox\" ng-if=\"options.selectable === true\" ng-checked=\"isSelectedHandler({})\" ng-click=\"onToggleSelectionHandler({ $event: $event })\" />",
                controller: directiveControllerName,
                scope: {
                    src: "=",
                    asrc: "=",
                    options: "=",
                    isSelectedHandler: "&isSelected",
                    onToggleSelectionHandler: "&onToggleSelection"
                },
                link: function (p_$scope, p_$element, p_$attrs, p_$ngModel) {
                    // --------------------------------------------------------------------------------
                    // Events
                    // --------------------------------------------------------------------------------
                    var img_load = function (p_event, p_$img) {
                        var $img = p_$img || $(this);
                        if (!$img.is(":visible"))
                            return;

                        var naturalWidth = $img.get(0).naturalWidth;
                        var naturalHeight = $img.get(0).naturalHeight;
                        if (naturalHeight > naturalWidth) {
                            height = p_$element.height();
                            $img.removeAttr("style").css({
                                height: height + "px"
                            }).addClass("in");
                        }
                        else {
                            var width = p_$element.width();
                            var height = width / naturalWidth * naturalHeight;
                            var marginTop = Math.floor((p_$element.height() - height) / 2);
                            $img.removeAttr("style").css({
                                //width: width + "px",
                                width: "500px",
                                height: "100%",
                                //,
                                //marginTop: marginTop + "px"
                            }).addClass("in");
                        }

                        return setTimeout(function () {
                            p_$scope.init();
                            p_$scope.$digest();
                        });
                    }

                    // --------------------------------------------------------------------------------
                    // Events
                    // --------------------------------------------------------------------------------
                    p_$scope.$on("thumbnail.refresh", function () {
                        img_load(null, p_$element.find("img"));
                    });

                    // --------------------------------------------------------------------------------
                    // Render
                    // --------------------------------------------------------------------------------
                    p_$scope.$watch("src", function () {
                        p_$scope.loading = true;

                        var $loader = p_$element.children("div");
                        $loader.css({ top: (p_$element.width() - $loader.height()) / 2 });

                        p_$element.children("img").off("load").remove();

                        var $img = $("<img  class='rounded mediumblog-zoom-img'/>").appendTo(p_$element).off("load").on("load", img_load);
                        //$img[0].addEventListener("click", zoomImg);
                        const zoom = mediumZoom({ container: { top: 75 } })

                        zoom.attach($img[0]);

                        if (p_utils.isNullOrUndefined(p_$scope.src)) {
                            $img.attr("src", p_utils.blankDataUrl);
                        }
                        else {
                            $img.attr("src", p_$scope.src);
                        }
                    });

                    p_$scope.$watch("asrc", function () {
                        var $img = p_$element.children("img");

                        if (p_utils.isNullOrUndefined(p_$scope.asrc)) {
                            $img.attr("data-original", "");
                            $img.attr("data-zoom-src", "");
                        }
                        else {
                            $img.attr("data-original", p_$scope.asrc);
                            $img.attr("data-zoom-src", p_$scope.asrc);
                        }
                    });
                }
            };
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));