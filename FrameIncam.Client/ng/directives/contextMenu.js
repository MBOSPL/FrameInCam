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
    var directiveName = "ficContextMenu";
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
                p_$interval,
                directiveControllerName
            );

            // TODO
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
            var hideMenuCallbacks = [];
            p_$rootScope.hideContextMenus = function ()
            {
                for (var i = 0; i < hideMenuCallbacks.length; i++)
                {
                    var callback = hideMenuCallbacks[i];
                    callback(true);
                }

                return hideMenuCallbacks.clear();
            }

            p_utils.$d.on("scroll mousewheel", p_$rootScope.hideContextMenus);
            return {
                restrict: "A",
                controller: directiveControllerName,
                link: function (p_$scope, p_$element, p_$attrs)
                {
                    // --------------------------------------------------------------------------------
                    // Elements
                    // --------------------------------------------------------------------------------
                    var $menu = p_$element.next(".fic-context-menu");
                    if (!$menu.length)
                        return;

                    var $parent = $menu.parent().addClass("fic-context-menu-parent");
                    var $menuItems = $menu.children("li").on("click", menuItem_click);

                    // --------------------------------------------------------------------------------
                    // Private
                    // --------------------------------------------------------------------------------
                    var hideMenuHandler;
                    function hideMenu(p_now, p_event)
                    {
                        clearTimeout(hideMenuHandler);
                        var act = function ()
                        {
                            p_$scope.trigger(p_$attrs.contextMenuHide, {}, p_event);
                            p_$timeout.cancel(p_$scope.hideMenuHandler);
                            p_$scope.hideMenuHandler = p_$timeout(function ()
                            {
                                p_utils.$d.off("click", null, document_click);
                                $menu.removeClass("show").detach().insertAfter(p_$element);
                                hideMenuCallbacks.remove(hideMenu);
                            });
                        }

                        if (p_now)
                        {
                            act();
                        }
                        else
                        {
                            hideMenuHandler = setTimeout(act, 300);
                        }
                    }

                    function showMenu(p_event)
                    {
                        p_$scope.trigger(p_$attrs.contextMenuShow, {}, p_event);
                        p_$timeout.cancel(p_$scope.showMenuHandler);
                        p_$scope.showMenuHandler = p_$timeout(function ()
                        {
                            clearTimeout(hideMenuHandler);
                            p_$rootScope.hideContextMenus();
                            var left = p_event.clientX;
                            var top = p_event.clientY;
                            $menu.detach().appendTo(p_utils.$b).css({
                                left: left + "px",
                                top: top + "px",
                            }).addClass("show");

                            var newLeft, newTop;
                            if ($menu.width() + left > p_utils.$w.width())
                                newLeft = left - $menu.width() - 20;
                            else
                                newLeft = left;

                            if ($menu.height() + top > p_utils.$w.height())
                                newTop = top - $menu.height() - 20;
                            else
                                newTop = top;

                            if (newLeft !== left
                                || newTop !== top)
                            {
                                $menu.css({
                                    left: newLeft + "px",
                                    top: newTop + "px",
                                });
                            }

                            p_utils.$d.off("click", null, document_click).on("click", null, document_click);
                            hideMenuCallbacks.push(hideMenu);
                        });
                    }

                    function document_click(p_event)
                    {
                        hideMenu(true, p_event);
                    }

                    function element_contextMenu(p_event)
                    {
                        p_$rootScope.doNothing(p_event);
                        p_$rootScope.hideContextMenus();
                        showMenu(p_event);
                    }

                    function element_click(p_event)
                    {
                        if (p_utils.isNullOrUndefined(p_$attrs.contextMenuOptions))
                            return;

                        var options = p_$parse(p_$attrs.contextMenuOptions)(p_$scope);
                        if (!options
                            || options.leftClick !== true)
                        {
                            return;
                        }

                        p_$rootScope.doNothing(p_event);
                        p_$rootScope.hideContextMenus();
                        showMenu(p_event);
                    }

                    function menuItem_click(p_event)
                    {
                        p_$rootScope.doNothing(p_event);
                        hideMenu();
                    }

                    // --------------------------------------------------------------------------------
                    // Events
                    // --------------------------------------------------------------------------------
                    p_$element.off("contextmenu", element_contextMenu).on("contextmenu", element_contextMenu)
                        .off("click", element_click).on("click", element_click);
                }
            };
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));