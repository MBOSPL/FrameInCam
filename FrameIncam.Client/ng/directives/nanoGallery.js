(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Variables
    // --------------------------------------------------------------------------------
    var directiveName = "ficNanoGallery";
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
        "api.projectFilesApi",
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
            p_projectFilesApi,
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
            p_$scope.getFileThumbnailPresentation = function (p_file) {
                if (p_file.thumbnail!=0)
                    return p_projectFilesApi.getDefaultPresentationSrc(p_file.thumbnail, "");
                else
                    return p_projectFilesApi.getDefaultPresentationSrc(p_file.id, "");
            }

            p_$scope.getFilePresentation = function (p_file) {
                return p_projectFilesApi.getDefaultPresentationSrc(p_file.id, "");
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
                controller: directiveControllerName,
                scope: {
                    files: "=",
                    options: "="
                },
                link: function (p_$scope, p_$element, p_$attrs, p_$ngModel) {
                    var items = p_$scope.files.map(function (res) {
                        var item = {
                            ID: res.id,
                            src: p_$scope.getFilePresentation(res),
                            srct: p_$scope.getFileThumbnailPresentation(res),
                            title: res.fileName
                        }
                        return item;
                    });
                        /*items: [
                            { src: 'img_01.jpg', srct: 'img_01t.jpg', title: 'Title 1' },
                            { src: 'img_02.jpg', srct: 'img_02t.jpg', title: 'Title 2' },
                            { src: 'img_03.jpg', srct: 'img_03t.jpg', title: 'Title 3' }
                        ]*/
                    /*
                    var myLightboxTool = function (customElementName, $customIcon, item) {
                        console.log(customElementName, $customIcon, item);
                    }
                    viewerTools: { topRight: 'custom1,fullscreenButton,closeButton' },
                    icons: { viewerCustomTool1: '<input type="checkbox" class="lightbox-check">' },
                    fnImgToolbarCustClick: myLightboxTool,*/

                    $(p_$element).nanogallery2({
                        items: items,
                        thumbnailHoverEffect2: null,
                        thumbnailToolbarImage: { topLeft: 'select', topRight: 'featured,cart', bottomRight: 'display' },
                        thumbnailToolbarAlbum: { topLeft: 'select', topRight: 'counter', bottomRight: 'display' },
                        thumbnailSelectable: p_$scope.options.isSelectable
                    });
                    $(p_$element).on('itemSelected.nanogallery2 itemUnSelected.nanogallery2',
                        function (e) {
                            var ngy2data = $(p_$element).nanogallery2('data');

                            var sel = [];
                            ngy2data.items.forEach(function (item) {
                                if (item.selected) {
                                    sel.push(item.GetID());
                                }
                            });
                            p_$scope.files = p_$scope.files.map(function (r, index) {
                                if (sel.includes(r.id))
                                    r.currentApprovedState = 1;
                                else
                                    r.currentApprovedState = 0;
                                return r;
                            });
                            /*console.log(p_$scope.files,sel);*/
                        });
/*                    p_$timeout(function () {
                        console.log($('.nGY2GThumbnail'));
                    }, 10,false);*/
                    var preselected_id = p_$scope.files.filter(function (r) {
                        if (r.isApproved == 1)
                            return true;
                        return false;
                    }).map(r => r.id);

                    var ngy2data = $(p_$element).nanogallery2('data');

                    var preselect_data = ngy2data.items.filter(function (r) {
                        if (preselected_id.includes(r.GetID()))
                            return true;
                        return false;
                    });
                    $(p_$element).nanogallery2('itemsSetSelectedValue', preselect_data, true);
                }
            };
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));