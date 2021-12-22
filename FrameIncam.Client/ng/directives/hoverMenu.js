(function ($, ng, debugMode, undefined)
{
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Variables
    // --------------------------------------------------------------------------------
    var directiveName = "ficHoverMenu";
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
        )
        {
            ng.fincam.directive(
                p_$rootScope,
                p_$scope,
                p_$stateParams,
                p_$state,
                p_$parse,
                p_$q,
                p_$window,
                p_$timeout,
                p_$interval
            );

            // TODO
        }
    ]);

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var currentHideHandler;

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
        "services.utils",
        function (
            p_$rootScope,
            p_$stateParams,
            p_$state,
            p_$parse,
            p_$q,
            p_$timeout,
            p_$interval,
            p_utils,
            undefined
        )
        {
            p_$rootScope.hideCurrentHoverMenu = function ()
            {
                if (!p_utils.isFunction(currentHideHandler))
                    return;

                currentHideHandler(true);
            }

            return {
                restrict: "A",
                controller: directiveControllerName,
                link: function (p_$scope, p_$element, p_$attrs)
                {
                    // --------------------------------------------------------------------------------
                    // Elements
                    // --------------------------------------------------------------------------------
                    var $menu = p_$element.next(".fic-hover-menu");
                    if (!$menu.length)
                        return;

                    if (p_$attrs.ficHoverMenu === "fixed")
                        $menu.addClass("position-fixed");

                    $menu.on("click", p_$rootScope.stopPropagation);
                    var $parent = $menu.parent().addClass("fic-hover-menu-parent");

                    // --------------------------------------------------------------------------------
                    // Private
                    // --------------------------------------------------------------------------------
                    function getMarginTopForFixedPositionMenu()
                    {
                        var result = 0;
                        var $parent = p_$element.parent();
                        while (!p_utils.isNullOrUndefined($parent.get(0)))
                        {
                            result += $parent.scrollTop();
                            $parent = $parent.parent();
                        }

                        return result;
                    }

                    var hideMenuHandler;
                    function hideMenu(p_now)
                    {
                        var hide = function ()
                        {
                            $parent.off("mouseenter", parent_mouseenter)
                                .off("mouseleave", parent_mouseleave);

                            $menu.removeClass("show");
                            if (currentHideHandler === hideMenu)
                                currentHideHandler = null;
                        }

                        clearTimeout(hideMenuHandler);
                        if (p_now === true)
                            hide();
                        else
                            hideMenuHandler = setTimeout(hide, 300);
                    }

                    function showMenu()
                    {
                        if (p_$element.is(":disabled")
                            || p_$element.hasClass("disabled")
                        )
                        {
                            return;
                        }

                        if (!p_utils.isNullOrEmpty(p_$attrs.ficHoverMenu)
                            && p_$attrs.ficHoverMenu !== "fixed"
                            && p_$scope.trigger(p_$attrs.ficHoverMenu) === false)
                        {
                            return;
                        }

                        clearTimeout(hideMenuHandler);
                        if (!p_$scope.isSubMenu)
                        {
                            if (p_utils.isFunction(currentHideHandler)
                                && currentHideHandler !== hideMenu)
                            {
                                currentHideHandler(true);
                            }

                            currentHideHandler = hideMenu;
                        }

                        $menu.addClass("show");
                        $parent.off("mouseenter", parent_mouseenter).on("mouseenter", parent_mouseenter)
                            .off("mouseleave", parent_mouseleave).on("mouseleave", parent_mouseleave)
                            ;

                        if (p_$attrs.ficHoverMenu === "fixed"
                            || $menu.hasClass("position-fixed"))
                        {
                            var marginTop = getMarginTopForFixedPositionMenu();
                            if (p_utils.isInteger(marginTop))
                                $menu.css({
                                    "margin-top": (-1 * marginTop) + "px"
                                });

                            if ($menu.hasClass("dropdown-menu-right"))
                            {
                                $menu.css({
                                    "margin-left": -1 * ($menu.width() - p_$element.width() - 10) + "px"
                                });
                            }
                        }
                    }

                    function parent_mouseenter(p_event)
                    {
                        showMenu();
                    }

                    function parent_mouseleave(p_event)
                    {
                        hideMenu();
                    }

                    function element_mouseenter(p_event)
                    {
                        showMenu();
                    }

                    // --------------------------------------------------------------------------------
                    // Events
                    // --------------------------------------------------------------------------------
                    p_$element.off("mouseenter", element_mouseenter)
                        .on("mouseenter", element_mouseenter);

                    p_$scope.isSubMenu = p_$element.parent("li").parent("ul.dropdown-menu").length > 0;
                }
            };
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));