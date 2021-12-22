(function ($, ng, debugMode, undefined)
{
    "use strict";

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    function toJsonReplacer(p_key, p_value) {
        var val = p_value;
        if ((typeof p_key === "string" && p_key.charAt(0) === "$" && p_key.charAt(1) === "$")
            || (p_value && p_value.window === p_value)
            || (p_value && document === p_value)
            || (p_value && p_value.$evalAsync && p_value.$watch)
            || (p_value && (p_value instanceof File || p_value instanceof FileList))
        ) {
            val = undefined;
        }
        else if (fincam.isByteArray(p_value)) {
            val = p_value.encodeBase64();
        }

        return val;
    }

    // --------------------------------------------------------------------------------
    // Main
    // --------------------------------------------------------------------------------
    var fincam = ng.fincam = function (p_namespace)
    {
        if (fincam.isString(p_namespace)
            && !fincam.isNullOrUndefined(p_namespace))
        {
            var parts = p_namespace.split('.');
            var current = self;
            for (var i = 0; i < parts.length; i++)
            {
                var namespace = parts[i];
                if (!current[namespace])
                {
                    current[namespace] = function ()
                    {
                        return prop;
                    }
                }

                current = current[namespace];
            }

            return current;
        }
    }

    fincam.isObject = function (p_obj) {
        return p_obj !== null
            && typeof p_obj === "object";
    }

    fincam.isPlainObject = function (p_obj) {
        return $.isPlainObject(p_obj);
    }

    fincam.isNullOrUndefined = function (p_obj) {
        return p_obj === null
            || p_obj === undefined;
    }

    fincam.isNullOrEmpty = function (p_str) {
        return fincam.isNullOrUndefined(p_str)
            || !fincam.isString(p_str)
            || p_str.trim() === "";
    }

    fincam.isNullable = function (p_obj, p_type) {
        return p_obj === null
            || !fincam.isFunction(p_type)
            || p_type(p_obj);
    }

    fincam.isBoolean = function (p_bool) {
        return p_bool === true
            || p_bool === false;
    }

    fincam.isNullableBoolean = function (p_bool) {
        return fincam.isNullable(p_bool, fincam.isBoolean);
    }

    fincam.isFunction = function (p_func) {
        return p_func instanceof Function
            || typeof p_func === "function";
    }

    fincam.isNumber = function (p_number) {
        return !isNaN(p_number)
            && typeof p_number === "number";
    }

    fincam.isNullableNumber = function (p_number) {
        return fincam.isNullable(p_bool, fincam.isNumber);
    }

    fincam.isInteger = function (p_number) {
        return Number.isInteger(p_number);
    }

    fincam.isNullableInteger = function (p_number) {
        return fincam.isNullable(p_number, fincam.isInteger);
    }

    fincam.isDate = function (p_date) {
        return p_date instanceof Date
            && fincam.isInteger(p_date.getTime());
    }

    fincam.isNullableDate = function (p_date) {
        return fincam.isNullable(p_date, fincam.isDate);
    }

    fincam.isString = function (p_str) {
        return p_str === null
            || typeof p_str === "string";
    }

    fincam.isArray = function (p_arr) {
        return Array.isArray(p_arr);
    }

    fincam.isByteArray = function (p_arr) {
        return p_arr instanceof Uint8Array;
    }

    fincam.isFile = function (p_file) {
        return p_file instanceof File;
    }

    fincam.isFileList = function (p_fileList) {
        return p_fileList instanceof FileList;
    }

    fincam.isBlob = function (p_blob) {
        return p_blob instanceof Blob;
    }

    fincam.instanceOf = function (p_obj, p_type) {
        return p_obj instanceof p_type;
    }

    fincam.typeOf = function (p_obj) {
        return typeof p_obj;
    }

    fincam.isUri = function (p_uri) {
        return fincam.instanceOf(p_uri, URL);
    }

    fincam.fromJson = function (p_str) {
        return !fincam.isNullOrEmpty(p_str)
            ? JSON.parse(p_str)
            : p_str;
    }

    fincam.toJson = function (p_obj, p_pretty) {
        if (fincam.isNullOrUndefined(p_obj))
            return "null";

        var pretty = p_pretty;
        if (!fincam.isInteger(p_pretty)
            || p_pretty < 0) {
            pretty = p_pretty ? 2 : null;
        }

        return JSON.stringify(p_obj, toJsonReplacer, pretty);
    }

})(jQuery, angular, document.children[0].hasAttribute("debug"));
!(function (w, d, $w, $d, ng, fincam, p_useTemplates, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var cache = {
        "/templates/directives/app-footer.html": "<footer id=\"footer\" class=\"secondary-bg\"><div class=\"container\"><div class=\"row\"><div class=\"col-md-4\"><div class=\"footer_widgets\"><h5>Connect with Us</h5><div class=\"follow_us\"><ul><li><a href=\"#\"><i class=\"fa fa-facebook\" aria-hidden=\"true\"></i></a></li><li><a href=\"#\"><i class=\"fa fa-twitter\" aria-hidden=\"true\"></i></a></li><li><a href=\"#\"><i class=\"fa fa-linkedin\" aria-hidden=\"true\"></i></a></li><li><a href=\"#\"><i class=\"fa fa-google-plus\" aria-hidden=\"true\"></i></a></li><li><a href=\"#\"><i class=\"fa fa-instagram\" aria-hidden=\"true\"></i></a></li></ul></div></div></div><div class=\"col-md-4\"></div><div class=\"col-md-4\"><div class=\"footer_widgets\"><h5>Our Newsletter</h5><div class=\"newsletter_wrap\"><form action=\"\" method=\"get\"><input type=\"email\" class=\"form-control\" placeholder=\"Enter Email Address\"> <input type=\"submit\" value=\"subscribe\" class=\"btn\"></form></div></div></div></div></div><div class=\"footer_bottom\"><div class=\"container\"><p>Copyright &copy; 2020 Frame In Cam. All Rights Reserved</p></div></div></footer>",
        "/templates/directives/customer/customer-app-header.html": "<header id=\"header\" class=\"header_custom\"><nav class=\"navbar navbar-expand-lg fixed-top\" id=\"header_nav\"><div class=\"container-fluid\"><div class=\"row header_row\"><div class=\"col-md-3 col-sm-12 col-xs-12\"><div class=\"navbar-header\"><div class=\"logo\"><a ng-href=\"#!/home\"><h6 class=\"text-white d-inline-block\"><i class=\"fa fa-camera pr-1\"></i></h6><strong class=\"text-white d-inline-block\">Frame In Cam</strong></a></div></div><button id=\"menu_slide\" data-target=\"#navigation\" aria-expanded=\"false\" data-toggle=\"collapse\" class=\"navbar-toggler\" type=\"button\"><i class=\"fa fa-bars\"></i></button></div><div class=\"col-md-9 col-sm-12 col-xs-12\"><div class=\"collapse navbar-collapse\" id=\"navigation\"><ul class=\"nav navbar-nav mr-auto\"><li ng-if=\"!$root.isUserLoggedIn()\"><a href=\"/customer-signin\">Sign In</a></li></ul><div class=\"submit_listing\" ng-if=\"!$root.isUserLoggedIn()\"><a href ng-click=\"registerVendor()\" class=\"btn outline-btn\"><i class=\"fa fa-plus-circle\"></i> Register as Second Shooter</a></div></div></div></div></div></nav></header>",
        "/templates/directives/customer/project/explorer/customer-project-grid-explorer.html": "<div class=\"customer-project-grid-explorer\"><div class=\"row\"><div class=\"col-md-3 project\" ng-repeat=\"project in value\"><a href ng-disabled=\"isDisabled()\" ng-click=\"viewProject(project)\"><fic-customer-project-grid-item-presentation ng-model=\"project\" options=\"options\" ng-disabled=\"isDisabled()\"></fic-customer-project-grid-item-presentation></a></div></div></div>",
        "/templates/directives/customer/project/file/customer-project-file-explorer.html": "<div class=\"customer-project-file-explorer\"><fic-nano-gallery files=\"value\" options=\"options\"></fic-nano-gallery></div>",
        "/templates/directives/customer/project/file/presentation/customer-project-file-presentation.html": "<div class=\"p-2\"><fic-thumbnail src=\"thumbnailPresentationUrl\" asrc=\"originalPresentationUrl\" options=\"{ selectable:options.isSelectable }\" is-selected=\"isFileSelected()\" on-toggle-selection=\"toggleFileSelection()\" style=\"height: 200px !important;         width: 200px !important;         right: 5rem;         left: 2rem;         position: relative;\" ng-class=\"{'success':isFileSelected()}\"/></div>",
        "/templates/directives/customer/project/presentation/customer-project-grid-item-presentation.html": "<div class=\"customer-project-grid-item-presentation\" ng-if=\"value\"><div class=\"grid_view show_listing\"><div class=\"listing_wrap\"><div class=\"listing_img\"><span class=\"like_post\" ng-if=\"isShareEnabled()\"><i class=\"fa fa-share-square-o\"></i></span> <a href=\"#\"><img ng-src=\"{{defaultPresentationUrl}}\" alt=\"image\" width=\"257\" height=\"200\" style=\"object-fit:cover\"></a></div><div class=\"listing_info\"><h6><a href=\"#\" class=\"ellipsis\" ng-attr-title=\"{{value.projectName}}\">{{value.projectName}}</a></h6><p>{{value.fileCount || 0}} Photos</p><h6><span class=\"badge badge-primary\">{{ value.status || \"New\" }}</span></h6></div></div></div></div>",
        "/templates/directives/vendor/vendor-app-header.html": "<header id=\"header\" class=\"header_custom\"><nav class=\"navbar navbar-expand-lg fixed-top\" id=\"header_nav\"><div class=\"container-fluid\"><div class=\"row header_row\"><div class=\"col-md-3 col-sm-12 col-xs-12\"><div class=\"navbar-header\"><div class=\"logo\"><a href><h6 class=\"text-white d-inline-block\"><i class=\"fa fa-camera pr-1\"></i></h6><strong class=\"text-white d-inline-block\">Frame In Cam</strong></a></div></div><button id=\"menu_slide\" data-target=\"#navigation\" aria-expanded=\"false\" data-toggle=\"collapse\" class=\"navbar-toggler\" type=\"button\"><i class=\"fa fa-bars\"></i></button></div><div class=\"col-md-9 col-sm-12 col-xs-12\"><div class=\"collapse navbar-collapse\" id=\"navigation\"><ul class=\"nav navbar-nav mr-auto\"><li class=\"menu-item-has-children\"><a href>You</a> <span class=\"arrow\"></span><ul class=\"sub-menu\" style=\"left:-100px\"><li><a href>Change Password</a></li><li><a href ng-click=\"vendorLogout()\">Logout</a></li></ul></li></ul></div></div></div></div></nav></header>",
        "/templates/directives/vendor/explorer/vendor-grid-explorer.html": "<div class=\"vendor-grid-explorer\"><div class=\"row\"><div class=\"col-md-4 vendor\" ng-repeat=\"vendor in value.pageRecords\"><fic-vendor-grid-item-presentation ng-model=\"vendor\" view-vendor=\"viewVendor($vendor)\" select-vendor=\"selectVendor($vendor)\" ng-disabled=\"isDisabled()\"></fic-vendor-grid-item-presentation></div></div></div>",
        "/templates/directives/vendor/explorer/vendor-list-explorer.html": "<div class=\"vendor-list-explorer\"><div class=\"row\"><div class=\"vendor\" ng-repeat=\"vendor in value.pageRecords\"><fic-vendor-list-item-presentation ng-model=\"vendor\" view-vendor=\"viewVendor($vendor)\" select-vendor=\"selectVendor($vendor)\" ng-disabled=\"isDisabled()\"></fic-vendor-list-item-presentation></div></div></div>",
        "/templates/directives/vendor/home/projects/vendor-home-projects-edit-form.html": "<div class=\"vendor-home-projects-edit-form\" ng-if=\"value\"><form name=\"editProjectForm\" ng-submit=\"save(editProjectForm)\" ng-validate=\"saveProjectValidationOptions\" ng-if=\"ready\"><h4 class=\"mb-4\">{{ getTitle() }} <button type=\"submit\" class=\"btn btn-sm bg-success pull-right\"><i class=\"fa fa-save mr-2\"></i> SAVE</button> <button ng-click=\"cancelEdit()\" type=\"button\" class=\"btn btn-sm bg-danger pull-right mr-2\"><i class=\"fa fa-times mr-2\"></i> CANCEL</button></h4><div class=\"info-container\"><div class=\"widget_title\"><label class=\"font-weight-bold\">General Information</label> <span class=\"btn btn-sm bg-white text-primary text-capitalize p-0 pull-right\" data-toggle=\"collapse\" data-target=\"#general-info\" aria-expanded=\"false\" aria-controls=\"general-info\"><i class=\"fa fa-minus\"></i></span></div><div class=\"collapse show\" id=\"general-info\"><div class=\"row\"><div class=\"form-group col-6\"><label class=\"form-label\">Name</label> <input name=\"name\" type=\"text\" class=\"form-control\" ng-model=\"value.projectName\"></div><div class=\"form-group col-6\"><label class=\"form-label\">Date</label> <input name=\"date\" type=\"date\" class=\"form-control\" ng-model=\"value.projectDate\"></div></div><div class=\"row\"><div class=\"form-group col-6\"><label class=\"form-label\">Value</label> <input name=\"value\" type=\"number\" class=\"form-control\" ng-model=\"value.projectValue\"></div><div class=\"form-group col-6\"><label class=\"form-label\">Advance</label> <input name=\"advance\" type=\"number\" class=\"form-control\" ng-model=\"value.advanceAmt\"></div></div><div class=\"row\"><div class=\"form-group col-6\"><label class=\"form-label\">GST No</label> <input name=\"gstNo\" ng-model=\"value.gstNo\" type=\"text\" class=\"form-control\"></div></div></div><div class=\"widget_title\"><label class=\"font-weight-bold\">Customer Information</label> <span class=\"btn btn-sm bg-white text-primary text-capitalize p-0 pull-right\" data-toggle=\"collapse\" data-target=\"#customer-info\" aria-expanded=\"false\" aria-controls=\"customer-info\"><i class=\"fa fa-minus\"></i></span></div><div class=\"collapse show\" id=\"customer-info\"><div class=\"row\"><div class=\"form-group col-6\"><label class=\"form-label\">Customer Name</label> <input type=\"text\" class=\"form-control\" name=\"customerName\" ng-model=\"value.customerName\"></div><div class=\"form-group col-6\"><label class=\"form-label\">Customer Email</label><div class=\"input-group mb-3\"><input type=\"text\" class=\"form-control\" name=\"customerEmail\" ng-model=\"value.customerEmail\"><div class=\"input-group-append\"><button ng-click=\"getCustomer(value.customerEmail)\" class=\"btn btn-outline-secondary m-0\" type=\"button\"><i class=\"fa fa-search\"></i> Check</button></div></div></div></div><div class=\"row\"><div class=\"form-group col-6\"><label class=\"form-label\">Customer Mobile</label> <input type=\"tel\" class=\"form-control\" name=\"customerMobile\" ng-model=\"value.customerMobileNo\"></div><div class=\"form-group col-6\"><label class=\"form-label\">Customer Alternate Mobile</label> <input type=\"text\" class=\"form-control\" name=\"customerAlternateMobile\" ng-model=\"value.customerAlternateMobileNo\"></div></div><div class=\"row\"><div class=\"form-group col-6\"><label class=\"form-label\">PIN code</label> <input type=\"text\" class=\"form-control\" name=\"customerPin\" ng-model=\"value.customerPin\"></div><div class=\"form-group col-6\"><label class=\"form-label\">Door no., Building</label> <input type=\"text\" class=\"form-control\" name=\"customerAddressLine1\" ng-model=\"value.customerAddress1\"></div></div><div class=\"row\"><div class=\"form-group col-6\"><label class=\"form-label\">Street, Sector, Area, Colony</label> <input type=\"text\" class=\"form-control\" name=\"customerAddressLine2\" ng-model=\"value.customerAddress2\"></div><div class=\"form-group col-6\"><label class=\"form-label\">City</label> <input type=\"text\" class=\"form-control\" name=\"customerCity\" ng-model=\"value.customerCity\"></div></div></div></div></form></div>",
        "/templates/directives/vendor/home/projects/vendor-home-projects-view.html": "<div class=\"vendor-home-projects-view\" ng-if=\"value\"><div class=\"customer-projects-container\" ng-if=\"value.length > 0\"><fic-customer-project-grid-explorer ng-model=\"value\" ng-disabled=\"isDisabled()\"></fic-customer-project-grid-explorer></div><div class=\"customer-projects-container p-3\" ng-if=\"value.length === 0\"><span class=\"font-italic\">No projects found</span></div><div class=\"clear\"><nav class=\"pagination_nav\"><ul class=\"pagination\"><li class=\"disabled\"><a href=\"#\" aria-label=\"Previous\"><span aria-hidden=\"true\">&laquo;</span></a></li><li class=\"active\"><a href=\"#\">1</a></li><li class=\"disabled\"><a href=\"#\" aria-label=\"Next\"><span aria-hidden=\"true\">&raquo;</span></a></li></ul></nav></div></div>",
        "/templates/directives/vendor/presentation/vendor-grid-item-presentation.html": "<div class=\"vendor-grid-item-presentation\" ng-if=\"value\"><div class=\"grid_view show_listing\"><div class=\"listing_wrap\"><div class=\"listing_img\"><span class=\"like_post\"><i class=\"fa fa-share-square-o\"></i></span><div class=\"listing_cate\"><span class=\"listing_like\"><a href=\"#\" ng-click=\"selectVendor()\"><i class=\"fa\" ng-class=\"{'fa-heart':value.isShortlisted,'fa-heart-o':!value.isShortlisted}\"></i></a></span></div><img ng-src=\"{{presentationUrl}}\" alt=\"image\" width=\"350\" height=\"250\" style=\"object-fit:cover\"></div><div class=\"listing_info\" ng-click=\"viewVendor()\"><div class=\"post_category\"><a href=\"#\"><span ng-bind=\"value.type\"></span></a></div><div class=\"mt\"><h4><a href=\"#\"><span ng-bind=\"value.name | capitalize\"></span></a></h4></div><div class=\"listing_review_info\"><p><span class=\"review_score\" ng-bind=\"value.rating.value + '/5'\"></span> <i ng-class=\"{'active':value.rating.value >= 1}\" class=\"fa fa-star\"></i> <i ng-class=\"{'active':value.rating.value >= 2}\" class=\"fa fa-star\"></i> <i ng-class=\"{'active':value.rating.value >= 3}\" class=\"fa fa-star\"></i> <i ng-class=\"{'active':value.rating.value >= 4}\" class=\"fa fa-star\"></i> <i ng-class=\"{'active':value.rating.value == 5}\" class=\"fa fa-star\"></i> <span ng-bind=\"'(' + value.rating.totalReviews + ' Reviews)'\"></span></p><p class=\"listing_map_m\"><i class=\"fa fa-map-marker\"></i> <span ng-bind=\"value.location\"></span></p></div></div></div></div></div>",
        "/templates/directives/vendor/presentation/vendor-list-item-presentation.html": "<div class=\"vendor-list-item-presentation\" ng-if=\"value\"><div class=\"ml-3 listview show_listing\"><div class=\"listing_wrap\"><div class=\"listing_img\"><span class=\"like_post\"><i class=\"fa fa-share-square-o\"></i></span><div class=\"listing_cate\"><span class=\"listing_like\"><a href=\"#\" ng-click=\"selectVendor()\"><i class=\"fa\" ng-class=\"{'fa-heart':value.isShortlisted,'fa-heart-o':!value.isShortlisted}\"></i></a></span></div><img ng-src=\"{{presentationUrl}}\" alt=\"image\" style=\"object-fit:cover\"></div><div class=\"listing_info\" ng-click=\"viewVendor()\"><div class=\"post_category\"><a href=\"#\"><span ng-bind=\"value.type\"></span></a></div><h4><a href=\"#\"><span ng-bind=\"value.name | capitalize\"></span></a></h4><div class=\"w-100 pb-3\" ng-if=\"value.service\"><small class=\"text-dark col-6 pull-left pl-0\" ng-bind=\"value.service.description\"></small> <small class=\"text-dark font-weight-bold col-6 pull-right pr-0\"><span class=\"pull-right\"><i class=\"fa fa-rupee\"></i> {{value.service.price}}</span></small></div><div class=\"listing_review_info w-100\" style=\"position:absolute;bottom:0px;\"><p><span class=\"review_score\" ng-bind=\"value.rating.value + '/5'\"></span> <i ng-class=\"{'active':value.rating.value >= 1}\" class=\"fa fa-star\"></i> <i ng-class=\"{'active':value.rating.value >= 2}\" class=\"fa fa-star\"></i> <i ng-class=\"{'active':value.rating.value >= 3}\" class=\"fa fa-star\"></i> <i ng-class=\"{'active':value.rating.value >= 4}\" class=\"fa fa-star\"></i> <i ng-class=\"{'active':value.rating.value == 5}\" class=\"fa fa-star\"></i> <span ng-bind=\"'(' + value.rating.totalReviews + ' Reviews)'\"></span></p><p class=\"listing_map_m\"><i class=\"fa fa-map-marker\"></i> <span ng-bind=\"value.location\"></span></p></div></div></div></div></div>",
        "/templates/pages/customer/home.html": "<div ng-init=\"init()\" class=\"customer-home\"><section id=\"banner\" class=\"parallex-bg section-padding\"><div class=\"container-fluid\"><div id=\"listing_img_slider\"><div class=\"owl-carousel owl-theme\"><div class=\"item\"><img src=\"assets/images/landing-cover/2.jpg\" width=\"650\" height=\"325\" alt=\"image\"></div><div class=\"item\"><img src=\"assets/images/landing-cover/3.jpg\" width=\"650\" height=\"325\" alt=\"image\"></div><div class=\"item\"><img src=\"assets/images/landing-cover/6.jpg\" width=\"650\" height=\"325\" alt=\"image\"></div><div class=\"item\"><img src=\"assets/images/landing-cover/7.jpg\" width=\"650\" height=\"325\" alt=\"image\"></div><div class=\"item\"><img src=\"assets/images/landing-cover/8.jpg\" width=\"650\" height=\"325\" alt=\"image\"></div><div class=\"item\"><img src=\"assets/images/landing-cover/9.jpg\" width=\"650\" height=\"325\" alt=\"image\"></div></div></div></div><div class=\"container p-4\"><div class=\"intro_text white-text div_zindex\"><h1>Welcome to Frame In Cam</h1><span ng-if=\"$root.isCustomerLoggedIn()\"><h5>Find &amp; Explore Nearest Photographers</h5><div class=\"search_form\"><form><div class=\"form-group select\"><select name=\"type\" class=\"form-control\" ng-model=\"searchQuery.vendorTypeId\" ng-options=\"vendorType.id as vendorType.type for vendorType in vendorTypes\"></select></div><div class=\"form-group select\"><select name=\"city\" class=\"form-control\" ng-model=\"searchQuery.cityGeoId\" ng-options=\"geoCity.id as geoCity.geoName for geoCity in geoCities\"></select></div><div class=\"form-group search_btn\"><input type=\"submit\" value=\"Search\" class=\"btn btn-block\" ng-click=\"searchVendors()\"></div></form></div></span></div></div><div class=\"dark-overlay\"></div></section><section id=\"photo\" class=\"p-5 text-center\"><div class=\"container\"><h4 class=\"text-center\">Latest Active Photographers</h4><div class=\"row\"><div style=\"width:255px;height:170px;\" class=\"col-3 image mt-3\" ng-repeat=\"file in latestProjectFiles\"><img src=\"{{file.encodedImage}}\" class=\"img-fluid border-radius gallery-img\" style=\"border-radius: 10px;height: 100%;width: 100%;object-fit: contain\"/><div class=\"middle\"><div class=\"text\" ng-click=\"\">{{file.photographerName}}</div></div></div></div></div></section></div>",
        "/templates/pages/customer/vendor-shortlist.html": "<section id=\"inner_pages\" ng-init=\"init()\"><div class=\"container\" ng-if=\"ready\"><div class=\"listing_header mt-4\"><div class=\"pull-left\"><h5><span ng-bind=\"'Shortlisted Vendors(' + (vendors.pageRecords.length || 0) + ')'\"></span></h5></div><div class=\"layout-switcher\"><a href ng-class=\"{'active':view == 'grid'}\" ng-click=\"view = 'grid'\"><i class=\"fa fa-th\"></i></a> <a href ng-class=\"{'active':view == 'list'}\" ng-click=\"view = 'list'\"><i class=\"fa fa-align-justify\"></i></a></div></div><div ng-if=\"vendors.pageRecords.length > 0\"><div class=\"vendor-explorer-container\"><fic-vendor-grid-explorer ng-model=\"vendors\" select-vendor=\"toggleVendorSelection($vendor)\" ng-disabled=\"isDisabled()\" ng-if=\"view == 'grid'\"></fic-vendor-grid-explorer><fic-vendor-list-explorer ng-model=\"vendors\" select-vendor=\"toggleVendorSelection($vendor)\" ng-disabled=\"isDisabled()\" ng-if=\"view == 'list'\"></fic-vendor-list-explorer></div><nav class=\"pagination_nav\"><ul class=\"pagination\"><li class=\"disabled\"><a href=\"#\" aria-label=\"Previous\"><span aria-hidden=\"true\">&laquo;</span></a></li><li class=\"active\"><a href=\"#\">1</a></li><li class=\"disabled\"><a href=\"#\" aria-label=\"Next\"><span aria-hidden=\"true\">&raquo;</span></a></li></ul></nav></div><div ng-if=\"vendors.pageRecords.length === 0\"><span class=\"font-italic\" ng-bind=\"'You have\\'t shortlisted any vendors yet.'\"></span></div></div></section>",
        "/templates/pages/customer/projects/customer-project-view.html": "<section id=\"inner_pages\" ng-init=\"init()\"><div class=\"container\" ng-if=\"ready\"><div class=\"listing_header mt-4\"><h5 class=\"w-100\"><span ng-bind=\"project.projectName\"></span> <span ng-if=\"needApproval()\" class=\"pull-right\"><button class=\"btn btn-sm btn-primary mr-2\" ng-click=\"saveSelection()\"><i class=\"fa fa-save mr-2\"></i> SAVE</button> <button class=\"btn btn-sm bg-success\" ng-click=\"confirmSelection()\"><i class=\"fa fa-check mr-2\"></i> CONFIRM</button></span></h5><div class=\"clear\"><small>{{files.length || 0}} Photos</small></div></div><div class=\"project-detail-container\"><fic-customer-project-file-explorer ng-model=\"files\" ng-disabled=\"isDisabled()\" options=\"{project:project,isSelectable:needApproval()}\"></fic-customer-project-file-explorer></div><nav class=\"pagination_nav\"><ul class=\"pagination\"><li class=\"disabled\"><a href=\"#\" aria-label=\"Previous\"><span aria-hidden=\"true\">&laquo;</span></a></li><li class=\"active\"><a href=\"#\">1</a></li><li class=\"disabled\"><a href=\"#\" aria-label=\"Next\"><span aria-hidden=\"true\">&raquo;</span></a></li></ul></nav></div><div class=\"container\" ng-if=\"!ready\"><div class=\"listing_header mt-4\"><h5 class=\"w-100\"><span ng-bind=\"'Loading...'\" class=\"font-italic\"></span></h5></div></div></section>",
        "/templates/pages/customer/projects/customer-projects.html": "<section id=\"inner_pages\" ng-init=\"init()\"><div class=\"container\"><div class=\"listing_header mt-4\"><h5><span ng-bind=\"'Your Projects (' + (projects.length || 0) + ')'\"></span></h5></div><div class=\"customer-projects-container\"><fic-customer-project-grid-explorer ng-model=\"projects\" ng-disabled=\"isDisabled()\"></fic-customer-project-grid-explorer></div><nav class=\"pagination_nav\"><ul class=\"pagination\"><li class=\"disabled\"><a href=\"#\" aria-label=\"Previous\"><span aria-hidden=\"true\">&laquo;</span></a></li><li class=\"active\"><a href=\"#\">1</a></li><li class=\"disabled\"><a href=\"#\" aria-label=\"Next\"><span aria-hidden=\"true\">&raquo;</span></a></li></ul></nav></div></section>",
        "/templates/pages/vendor/vendor-detail.html": "<div class=\"vendor-detail\" ng-init=\"init()\" ng-show=\"ready\"><section class=\"listing_detail_header style2_header parallex-bg\"><div class=\"container\"><div class=\"div_zindex white-text\"><div class=\"row\"><div class=\"col-md-8\"><h1><span ng-bind=\"detail.vendor.name\"></span></h1><p></p><div class=\"listing_rating\"><p><span class=\"review_score\" ng-bind=\"detail.rating.value + '/5'\"></span> <i ng-class=\"{'active':detail.rating.value >= 1}\" class=\"fa fa-star\"></i> <i ng-class=\"{'active':detail.rating.value >= 2}\" class=\"fa fa-star\"></i> <i ng-class=\"{'active':detail.rating.value >= 3}\" class=\"fa fa-star\"></i> <i ng-class=\"{'active':detail.rating.value >= 4}\" class=\"fa fa-star\"></i> <i ng-class=\"{'active':detail.rating.value == 5}\" class=\"fa fa-star\"></i> <span ng-bind=\"'(' + detail.rating.totalReviews + ' Reviews)'\"></span></p><p class=\"listing_like\"><a href=\"#\"><i class=\"fa fa-heart-o\"></i> {{ detail.totalLikes }} Likes</a></p></div></div><div class=\"col-md-4\" ng-if=\"detail.pricePerDay && detail.pricePerDay > 0\"><div class=\"pricing_info\"><p class=\"listing_price\"><span><i class=\"fa fa-rupee\"></i> {{detail.pricePerDay | number:2}}</span></p><div class=\"listing_message\" ng-if=\"false\"><a class=\"btn\" data-toggle=\"modal\" data-target=\"#message_modal\"><i class=\"fa fa-envelope-o\"></i> Send Message</a></div></div></div></div></div></div><div class=\"dark-overlay\"></div></section><section class=\"listing_info_wrap listing_detail_2\"><div class=\"container\"><div class=\"sidebar_wrap listing_action_btn\"><ul><li><a data-toggle=\"modal\" data-target=\"#share_modal\"><i class=\"fa fa-share-alt\"></i> Share This</a></li><li><a href=\"#writereview\" class=\"js-target-scroll\"><i class=\"fa fa-star\"></i> Write a Review</a></li><li><a data-toggle=\"modal\" data-target=\"#report_modal\"><i class=\"fa fa-exclamation-triangle\"></i> Report</a></li></ul></div><div class=\"image_slider_wrap\"><div id=\"listing_img_slider\"><div class=\"owl-carousel owl-theme\"><div class=\"item\"><img src=\"assets/images/vendors/1/media/1.png\" width=\"400\" height=\"220\" alt=\"image\"></div><div class=\"item\"><img src=\"assets/images/vendors/1/media/2.png\" width=\"400\" height=\"220\" alt=\"image\"></div><div class=\"item\"><img src=\"assets/images/vendors/1/media/3.png\" width=\"400\" height=\"220\" alt=\"image\"></div><div class=\"item\"><img src=\"assets/images/vendors/1/media/4.png\" width=\"400\" height=\"220\" alt=\"image\"></div><div class=\"item\"><img src=\"assets/images/vendors/1/media/5.png\" width=\"400\" height=\"220\" alt=\"image\"></div><div class=\"item\"><img src=\"assets/images/vendors/1/media/6.png\" width=\"400\" height=\"220\" alt=\"image\"></div></div></div><div class=\"view_map\"><a href=\"#single_map\" class=\"js-target-scroll\"><i class=\"fa fa-map-marker\"></i></a></div></div><div class=\"row\"><div class=\"col-md-8\"><div class=\"ElemoListing_detail\"><div class=\"panel-group\" id=\"accordion\" role=\"tablist\" aria-multiselectable=\"true\"><div class=\"panel panel-default\"><div class=\"panel-heading\" role=\"tab\" id=\"headingOne\"><h4 class=\"panel-title\"><a role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#projects\" aria-expanded=\"true\" aria-controls=\"collapseOne\"><i class=\"fa fa-file-text-o\"></i> Projects</a></h4></div><div id=\"projects\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingOne\"><div class=\"panel-body\"><section id=\"nav-detail\" style=\"background:none;\"><ul class=\"nav nav-tabs\"><li class=\"active\"><a data-toggle=\"tab\" href=\"#home\">Portfolios (0)</a></li><li><a data-toggle=\"tab\" href=\"#menu1\">Albums (0)</a></li><li><a data-toggle=\"tab\" href=\"#menu2\">Videos (0)</a></li></ul><div class=\"tab-content\"><div id=\"portfolio\" class=\"tab-pane fade in active\"></div><div id=\"albums\" class=\"tab-pane fade\"></div><div id=\"videos\" class=\"tab-pane fade\"></div></div></section></div></div></div><div class=\"panel panel-default\"><div class=\"panel-heading\" role=\"tab\" id=\"headingTwo\"><h4 class=\"panel-title\"><a class=\"collapsed\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#\" aria-expanded=\"false\" aria-controls=\"collapseTwo\"><i class=\"fa fa-align-left\"></i> Services Offered</a></h4></div><div id=\"services\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingTwo\"><div class=\"panel-body\"><div class=\"features-li\"><ul><li ng-repeat=\"service in detail.services\"><span>{{ service.desc }}</span></li></ul></div></div></div></div><div class=\"panel panel-default\"><div class=\"panel-heading\" role=\"tab\" id=\"headingThree\"><h4 class=\"panel-title\"><a class=\"collapsed\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#costing\" aria-expanded=\"false\" aria-controls=\"collapseThree\"><i class=\"fa fa-rupee pr-2\"></i> Estimated Pricing</a></h4></div><div id=\"costing\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingThree\"><div class=\"panel-body\"><div class=\"w-100 py-3 ng-scope\" ng-repeat=\"package in detail.packages\"><label class=\"text-dark col-6 pull-left pl-0\">{{ package.description }}</label> <label class=\"text-dark font-weight-bold col-6 pull-right pr-0\"><span class=\"pull-right\"><i class=\"fa fa-rupee\"></i> {{ package.pricePerDay | number:2 }} per day</span></label></div></div></div></div><div class=\"panel panel-default\" ng-if=\"false\"><div class=\"panel-heading\" role=\"tab\" id=\"headingFour\"><h4 class=\"panel-title\"><a class=\"collapsed\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#opening_hours\" aria-expanded=\"false\" aria-controls=\"collapseFour\"><i class=\"fa fa-calendar-check-o\"></i> Opening Hours</a></h4></div><div id=\"opening_hours\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingFour\"><div class=\"panel-body\"><ul><li><span class=\"hours_title\"><i class=\"fa fa-clock-o\"></i>Monday</span> <span>8:00am</span> - <span>9:00pm</span></li><li><span class=\"hours_title\"><i class=\"fa fa-clock-o\"></i>Tuesday</span> <span>8:00am</span> - <span>9:00pm</span></li><li><span class=\"hours_title\"><i class=\"fa fa-clock-o\"></i>Wednesday</span> <span>8:00am</span> - <span>9:00pm</span></li><li><span class=\"hours_title\"><i class=\"fa fa-clock-o\"></i>Thursday</span> <span>8:00am</span> - <span>9:00pm</span></li><li><span class=\"hours_title\"><i class=\"fa fa-clock-o\"></i>Friday</span> <span>8:00am</span> - <span>9:00pm</span></li><li><span class=\"hours_title\"><i class=\"fa fa-clock-o\"></i>Saturday</span> <span>12:00am</span> - <span>9:00pm</span></li><li><span class=\"hours_title\"><i class=\"fa fa-clock-o\"></i>Sunday</span> <span>Closed</span></li></ul></div></div></div></div><div class=\"col-md-8\"><div class=\"ElemoListing_detail\"><div class=\"accordion\" id=\"accordionExample\"><div class=\"card\"><div class=\"card-header\" id=\"headingOne\"><h2 class=\"mb-0\"><a class=\"btn btn-link text-left\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapseOne\" aria-expanded=\"true\" aria-controls=\"collapseOne\"><i class=\"fa fa-file-text-o\"></i> Projects</a></h2></div><div id=\"collapseOne\" class=\"collapse show\" aria-labelledby=\"headingOne\" data-parent=\"#accordionExample\"><div class=\"card-body\"><section id=\"nav-detail\" style=\"background:none;\"><ul class=\"nav nav-tabs\"><li class=\"active\"><a data-toggle=\"tab\" href=\"#home\">Portfolios (0)</a></li><li><a data-toggle=\"tab\" href=\"#menu1\">Albums (0)</a></li><li><a data-toggle=\"tab\" href=\"#menu2\">Videos (0)</a></li></ul><div class=\"tab-content\"><div id=\"portfolio\" class=\"tab-pane fade in active\"></div><div id=\"albums\" class=\"tab-pane fade\"></div><div id=\"videos\" class=\"tab-pane fade\"></div></div></section></div></div></div><div class=\"card mt-5\"><div class=\"card-header\" id=\"headingTwo\"><h2 class=\"mb-0\"><a class=\"btn btn-link text-left collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapseTwo\" aria-expanded=\"false\" aria-controls=\"collapseTwo\"><i class=\"fa fa-align-left\"></i> Services Offered</a></h2></div><div id=\"collapseTwo\" class=\"collapse\" aria-labelledby=\"headingTwo\" data-parent=\"#accordionExample\"><div class=\"card-body\"><div class=\"features-li\"><ul><li ng-repeat=\"service in detail.services\"><span>{{ service.desc }}</span></li></ul></div></div></div></div><div class=\"card mt-5\"><div class=\"card-header\" id=\"headingThree\"><h2 class=\"mb-0\"><a class=\"btn btn-link text-left collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapseThree\" aria-expanded=\"false\" aria-controls=\"collapseThree\"><i class=\"fa fa-rupee pr-2\"></i> Estimated Pricing</a></h2></div><div id=\"collapseThree\" class=\"collapse\" aria-labelledby=\"headingThree\" data-parent=\"#accordionExample\"><div class=\"card-body\"><div class=\"w-100 py-3 ng-scope\" ng-repeat=\"package in detail.packages\"><label class=\"text-dark col-6 pull-left pl-0\">{{ package.description }}</label> <label class=\"text-dark font-weight-bold col-6 pull-right pr-0\"><span class=\"pull-right\"><i class=\"fa fa-rupee\"></i> {{ package.pricePerDay | number:2 }} per day</span></label></div></div></div></div><div class=\"card mt-5\"><div class=\"card-header\" id=\"headingFour\"><h2 class=\"mb-0\"><a class=\"btn btn-link text-left collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapseFour\" aria-expanded=\"false\" aria-controls=\"collapseFour\"><i class=\"fa fa-calendar-check-o\"></i> Opening Hours</a></h2></div><div id=\"collapseFour\" class=\"collapse\" aria-labelledby=\"headingFour\" data-parent=\"#accordionExample\"><div class=\"card-body\"><ul><li><span class=\"hours_title\"><i class=\"fa fa-clock-o\"></i>Monday</span> <span>8:00am</span> - <span>9:00pm</span></li><li><span class=\"hours_title\"><i class=\"fa fa-clock-o\"></i>Tuesday</span> <span>8:00am</span> - <span>9:00pm</span></li><li><span class=\"hours_title\"><i class=\"fa fa-clock-o\"></i>Wednesday</span> <span>8:00am</span> - <span>9:00pm</span></li><li><span class=\"hours_title\"><i class=\"fa fa-clock-o\"></i>Thursday</span> <span>8:00am</span> - <span>9:00pm</span></li><li><span class=\"hours_title\"><i class=\"fa fa-clock-o\"></i>Friday</span> <span>8:00am</span> - <span>9:00pm</span></li><li><span class=\"hours_title\"><i class=\"fa fa-clock-o\"></i>Saturday</span> <span>12:00am</span> - <span>9:00pm</span></li><li><span class=\"hours_title\"><i class=\"fa fa-clock-o\"></i>Sunday</span> <span>Closed</span></li></ul></div></div></div></div><div class=\"mt-5\" id=\"single_map \"><div class=\"widget_title\"><h4>View Map</h4></div><div id=\"singleListingMap-container\"><div id=\"singlemap\" data-latitude=\"34.6230191\" data-longitude=\"-98.4315764\" data-map-icon=\"assets/images/category-icon2.png\"></div></div></div><div class=\"reviews_list\"><div class=\"widget_title\"><h4><span>2 Reviews for</span> {{vendor.name}}</h4></div><div class=\"review_wrap\"><div class=\"review_author\"><img src=\"assets/images/13.jpg\" alt=\"image\"><figcaption><h6>Ravi</h6></figcaption></div><div class=\"review_detail\"><h5>Passionate and professionals</h5><p>We had a pleasant time with our photographers. I really loved how they put my pictures on our beautiful album. They are very communicative and clear. I also liked the way helped us plan the pre-wedding shoot. They are like family :)</p><div class=\"listing_rating\"><p><span class=\"review_score\">4.0/5</span> <i class=\"fa fa-star active\"></i> <i class=\"fa fa-star active\"></i> <i class=\"fa fa-star active\"></i> <i class=\"fa fa-star active\"></i> <i class=\"fa fa-star\"></i> (5 Reviews)</p><p><i class=\"fa fa-clock-o\"></i> April 11, 2020 8:52 am</p></div></div></div><div class=\"review_wrap\"><div class=\"review_author\"><img src=\"assets/images/13.jpg\" alt=\"image\"><figcaption><h6>Ravi</h6></figcaption></div><div class=\"review_detail\"><h5>Passionate and professionals</h5><p>We had a pleasant time with our photographers. I really loved how they put my pictures on our beautiful album. They are very communicative and clear. I also liked the way helped us plan the pre-wedding shoot. They are like family :)</p><div class=\"listing_rating\"><p><span class=\"review_score\">4.0/5</span> <i class=\"fa fa-star active\"></i> <i class=\"fa fa-star active\"></i> <i class=\"fa fa-star active\"></i> <i class=\"fa fa-star active\"></i> <i class=\"fa fa-star\"></i> (5 Reviews)</p><p><i class=\"fa fa-clock-o\"></i> April 11, 2020 8:52 am</p></div></div></div></div><div id=\"writereview\" class=\"review_form\"><div class=\"widget_title\"><h4>Write a Review</h4></div><form action=\"\" method=\"get\"><div class=\"form-group\"><label class=\"form-label\">Your Rating for this listing</label><div class=\"listing_rating\"><input name=\"rating\" ng-model=\"review.ratings\" id=\"rating-1\" value=\"1\" type=\"radio\"> <label for=\"rating-1\" class=\"fa fa-star\"></label> <input name=\"rating\" ng-model=\"review.ratings\" id=\"rating-2\" value=\"2\" type=\"radio\"> <label for=\"rating-2\" class=\"fa fa-star\"></label> <input name=\"rating\" ng-model=\"review.ratings\" id=\"rating-3\" value=\"3\" type=\"radio\"> <label for=\"rating-3\" class=\"fa fa-star\"></label> <input name=\"rating\" ng-model=\"review.ratings\" id=\"rating-4\" value=\"4\" type=\"radio\"> <label for=\"rating-4\" class=\"fa fa-star\"></label> <input name=\"rating\" ng-model=\"review.ratings\" id=\"rating-5\" value=\"5\" type=\"radio\"> <label for=\"rating-5\" class=\"fa fa-star\"></label></div></div><div class=\"form-group\"><label class=\"form-label\">Email</label> <input name=\"\" type=\"email\" ng-model=\"review.created_by\" placeholder=\"you@website.com\" class=\"form-control\"></div><div class=\"form-group\"><label class=\"form-label\">Title</label> <input name=\"\" type=\"text\" ng-model=\"review.title\" placeholder=\"Title of Your Review\" class=\"form-control\"></div><div class=\"form-group\"><label class=\"form-label\">Review</label> <textarea name=\"\" ng-model=\"review.body\" cols=\"\" rows=\"\" class=\"form-control\" placeholder=\"Yout Experience\"></textarea></div><div class=\"form-group\"><input type=\"submit\" class=\"btn\" value=\"Submit Review\"></div></form></div></div></div><div class=\"col-md-4\"><div class=\"ElemoListing_sidebar\"><div class=\"sidebar_wrap listing_contact_info\"><div class=\"widget_title\"><h6>Contact Info</h6></div><ul><li><i class=\"fa fa-map-marker\"></i> {{ detail.address.addressLine1 || \"\" }}</li><li ng-if=\"detail.address.addressLine2\">{{ detail.address.addressLine2 }}</li><li><i class=\"fa fa-phone\"></i> <a href>{{ detail.vendor.mobile }}</a></li><li><i class=\"fa fa-envelope\"></i> <a href>{{ detail.vendor.email }}</a></li><li><i class=\"fa fa-link\"></i> <a href>{{ detail.vendor.siteUrl }}</a></li></ul><div class=\"social_links\"><a href=\"#\" class=\"facebook_link\"><i class=\"fa fa-facebook-f\"></i></a> <a href=\"#\" class=\"linkedin_link\"><i class=\"fa fa-linkedin\"></i></a> <a href=\"#\" class=\"twitter_link\"><i class=\"fa fa-twitter\"></i></a> <a href=\"#\" class=\"google_plus_link\"><i class=\"fa fa-google-plus\"></i></a></div></div><div class=\"sidebar_wrap\"><div class=\"widget_title\"><h4>Watch Video</h4></div><div class=\"listing_video\"><iframe class=\"mfp-iframe\" src=\"https://www.youtube.com/embed/rqSoXtKMU3Q\" allowfullscreen></iframe></div></div></div></div></div></div></section></div>",
        "/templates/pages/vendor/vendor-search.html": "<section id=\"inner_pages\" ng-init=\"init()\"><div class=\"container\"><div class=\"listing_header mt-4\"><div class=\"pull-left\"><h5><span ng-bind=\"title | capitalize\"></span></h5><div class=\"clear\"><small class=\"font-italic\" ng-bind=\"'Showing ' + (vendors.pageRecords.length || 0) + ' results as per your search'\"></small></div></div><div class=\"layout-switcher\"><a href ng-class=\"{'active':view == 'grid'}\" ng-click=\"view = 'grid'\"><i class=\"fa fa-th\"></i></a> <a href ng-class=\"{'active':view == 'list'}\" ng-click=\"view = 'list'\"><i class=\"fa fa-align-justify\"></i></a></div><div class=\"pull-right col-4\"><input type=\"text\" class=\"form-control\" placeholder=\"Search\" ng-change=\"refresh()\" ng-model=\"searchQuery.search\"> <button type=\"button\" class=\"btn mr-3 btn-link btn-icon btn-clear-text\" tabindex=\"-1\" ng-if=\"searchQuery.search\" ng-click=\"clearSearch($event)\"><i class=\"fa fa-close text-danger\"></i></button></div></div><div class=\"vendor-explorer-container\"><fic-vendor-grid-explorer ng-model=\"vendors\" select-vendor=\"toggleVendorSelection($vendor)\" ng-disabled=\"isDisabled()\" ng-if=\"view == 'grid'\"></fic-vendor-grid-explorer><fic-vendor-list-explorer ng-model=\"vendors\" select-vendor=\"toggleVendorSelection($vendor)\" ng-disabled=\"isDisabled()\" ng-if=\"view == 'list'\"></fic-vendor-list-explorer></div><nav class=\"pagination_nav\"><ul class=\"pagination\"><li class=\"disabled\"><a href=\"#\" aria-label=\"Previous\"><span aria-hidden=\"true\">&laquo;</span></a></li><li class=\"active\"><a href=\"#\">1</a></li><li class=\"disabled\"><a href=\"#\" aria-label=\"Next\"><span aria-hidden=\"true\">&raquo;</span></a></li></ul></nav></div></section>",
        "/templates/pages/vendor/home/dashboard.html": "<div class=\"vendor-dashboard\"><h4 class=\"mb-4\">Dashboard</h4></div>",
        "/templates/pages/vendor/home/portfolio.html": "<div class=\"vendor-portfolio\" ng-init=\"init()\"><h4 class=\"mb-4\">Portfolio</h4><div class=\"row\"><div class=\"col-md-10\"><div class=\"tab-content\" id=\"v-pills-tabContent\"><div class=\"tab-pane bg-white show active\" id=\"v-pills-photo\" role=\"tabpanel\" aria-labelledby=\"v-pills-photo-tab\"><div class=\"widget_title\"><label class=\"font-weight-bold\">Photos</label> <span class=\"btn btn-sm bg-white text-primary text-capitalize p-0 pull-right\" data-toggle=\"modal\" data-target=\"#photoUploadModel\" aria-expanded=\"false\" aria-controls=\"photoUploadModel\"><i class=\"fa fa-plus\"></i> UPLOAD PHOTOS</span></div><div class=\"row\"><div class=\"col-12\"><a href class=\"d-block pull-left\" tabindex=\"-1\" ng-repeat=\"photo in photos\"><div class=\"p-2\"><fic-thumbnail src=\"photo.presentationUrl\" style=\"height: 200px !important;                                         width: 200px !important;                                         right: 5rem;                                         left: 2rem;                                         position: relative;\"/></div></a></div></div></div><div class=\"tab-pane bg-white\" id=\"v-pills-album\" role=\"tabpanel\" aria-labelledby=\"v-pills-album-tab\"><div class=\"widget_title\"><label class=\"font-weight-bold\">Albums</label> <span class=\"btn btn-sm bg-white text-primary text-capitalize p-0 pull-right\" data-toggle=\"collapse\" data-target=\"#personal-info\" aria-expanded=\"false\" aria-controls=\"personal-info\"><i class=\"fa fa-plus\"></i> NEW ALBUM</span></div><div class=\"row\"><div class=\"col-12\"><div class=\"customer-projects-container\"><fic-customer-project-grid-explorer ng-model=\"albums\" ng-disabled=\"isDisabled()\"></fic-customer-project-grid-explorer></div><div class=\"clear\"><nav class=\"pagination_nav\"><ul class=\"pagination\"><li class=\"disabled\"><a href=\"#\" aria-label=\"Previous\"><span aria-hidden=\"true\">&laquo;</span></a></li><li class=\"active\"><a href=\"#\">1</a></li><li class=\"disabled\"><a href=\"#\" aria-label=\"Next\"><span aria-hidden=\"true\">&raquo;</span></a></li></ul></nav></div></div></div></div><div class=\"tab-pane bg-white\" id=\"v-pills-video\" role=\"tabpanel\" aria-labelledby=\"v-pills-video-tab\"><div class=\"widget_title\"><label class=\"font-weight-bold\">Videos</label> <span class=\"btn btn-sm bg-white text-primary text-capitalize p-0 pull-right\" data-toggle=\"modal\" data-target=\"#videoUploadModel\" aria-expanded=\"false\" aria-controls=\"videoUploadModel\"><i class=\"fa fa-plus\"></i> UPLOAD VIDEOS</span></div><div class=\"row\"><div class=\"col-12\"><div class=\"col-4 pull-left\" ng-repeat=\"video in videos\"><div class=\"listing_video\"><iframe class=\"mfp-iframe\" ng-src=\"{{trustSrc(video.presentationUrl)}}\" allowfullscreen></iframe></div></div></div></div></div></div></div><div class=\"col-md-2\"><div class=\"nav flex-column nav-pills nav-pills-custom\" id=\"v-pills-tab\" role=\"tablist\" aria-orientation=\"vertical\"><a href=\"#v-pills-photo\" class=\"nav-link mb-3 p-3 shadow active\" id=\"v-pills-photo-tab\" data-toggle=\"pill\" role=\"tab\" aria-controls=\"v-pills-photo\" aria-selected=\"true\"><i class=\"fa fa-photo mr-2\"></i> <span class=\"font-weight-bold small text-uppercase\">Photos</span> </a><a href=\"#v-pills-video\" class=\"nav-link mb-3 p-3 shadow\" id=\"v-pills-videos-tab\" data-toggle=\"pill\" role=\"tab\" aria-controls=\"v-pills-video\" aria-selected=\"false\"><i class=\"fa fa-file-video-o mr-2\"></i> <span class=\"font-weight-bold small text-uppercase\">Videos</span></a></div></div></div></div><div class=\"modal\" id=\"photoUploadModel\" tabindex=\"-1\"><div class=\"modal-dialog modal-xl\"><div class=\"modal-content\"><div class=\"modal-header\"><h5 class=\"modal-title\" id=\"exampleModalLabel\">Upload a Photos</h5><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div><div class=\"modal-body\"><ng-dropzone class=\"dropzone\" options=\"dzOptions\" callbacks=\"dzCallbacks\" methods=\"dzMethods\"></ng-dropzone></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button> <button type=\"button\" id=\"sbmtbtn\" class=\"btn btn-primary\">Save changes</button></div></div></div></div><div class=\"modal\" id=\"videoUploadModel\" tabindex=\"-1\"><div class=\"modal-dialog modal-xl\"><div class=\"modal-content\"><div class=\"modal-header\"><h5 class=\"modal-title\" id=\"exampleModalLabel\">Embed a Videos</h5><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div><div class=\"modal-body\"><form ng-submit=\"submitVideos()\" id=\"submitVideoForm\"><div class=\"form-group\" ng-repeat=\"input in videoFormsInput\"><label for=\"email\">Video #{{$index+1}}:</label> <input ng-model=\"input.fileName\" type=\"text\" class=\"form-control\" placeholder=\"Enter a Embed Youtube or Vimeo Link\"></div></form></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button> <button type=\"button\" ng-click=\"submitVideos()\" class=\"btn btn-primary\">Save changes</button></div></div></div></div>",
        "/templates/pages/vendor/home/profile.html": "<div class=\"vendor-profile\" ng-init=\"init()\"><form name=\"updateProfileForm\" ng-submit=\"updateProfile(updateProfileForm)\" ng-validate=\"profileUpdateValidationOptions\" ng-if=\"ready\"><h4 class=\"mb-4\">Profile <button type=\"submit\" class=\"btn btn-sm bg-success pull-right\"><i class=\"fa fa-save mr-2\"></i> SAVE</button></h4><div class=\"info-container\"><div class=\"widget_title\"><label class=\"font-weight-bold\">Personal Information</label> <span class=\"btn btn-sm bg-white text-primary text-capitalize p-0 pull-right\" data-toggle=\"collapse\" data-target=\"#personal-info\" aria-expanded=\"false\" aria-controls=\"personal-info\"><i class=\"fa fa-minus\"></i></span></div><div class=\"collapse show\" id=\"personal-info\"><div class=\"row\"><div class=\"form-group col-6\"><label class=\"form-label\">Email</label> <label name=\"email\" class=\"form-label\" ng-bind=\"profile.freeLancer.email\"></label></div><div class=\"form-group col-6\"><label class=\"form-label\">Mobile</label> <input name=\"mobile\" type=\"tel\" class=\"form-control\" ng-model=\"profile.freeLancer.mobile\"></div></div><div class=\"row\"><div class=\"form-group col-6\"><label class=\"form-label\">Name</label> <input name=\"name\" type=\"text\" class=\"form-control\" ng-model=\"profile.freeLancer.name\"></div><div class=\"form-group col-6\"><label class=\"form-label\">Type</label> <select name=\"type\" class=\"form-control\" ng-model=\"profile.freeLancer.typeId\" ng-options=\"vendorType.id as vendorType.type for vendorType in vendorTypes\"></select></div></div><div class=\"row\"><div class=\"form-group col-6\"><label class=\"form-label\">Website Url</label> <input name=\"websiteUrl\" ng-model=\"profile.freeLancer.siteUrl\" type=\"text\" class=\"form-control\"></div><div class=\"form-group col-6\"><label class=\"form-label\">Facebook Url</label> <input type=\"text\" class=\"form-control\" name=\"fbUrl\" ng-model=\"profile.freeLancer.fbUrl\"></div></div><div class=\"row\"><div class=\"form-group col-6\"><label class=\"form-label\">Instagram Url</label> <input type=\"text\" class=\"form-control\" name=\"instagramUrl\" ng-model=\"profile.freeLancer.instagramUrl\"></div><div class=\"form-group col-6\"><label class=\"form-label\">Youtube Url</label> <input type=\"text\" class=\"form-control\" name=\"youtubeUrl\" ng-model=\"profile.freeLancer.youtubeUrl\"></div></div><div class=\"form-group\"><label class=\"form-label\">About</label> <textarea name=\"description\" cols=\"\" rows=\"\" class=\"form-control\" ng-model=\"profile.freeLancer.description\"></textarea></div></div><div class=\"widget_title\"><label class=\"font-weight-bold\">Address</label> <span class=\"btn btn-sm bg-white text-primary text-capitalize p-0 pull-right\" data-toggle=\"collapse\" data-target=\"#address-info\" aria-expanded=\"false\" aria-controls=\"address-info\"><i class=\"fa fa-minus\"></i></span></div><div class=\"collapse show\" id=\"address-info\"><div class=\"row\"><div class=\"form-group col-6\"><label class=\"form-label\">PIN code</label> <input type=\"text\" class=\"form-control\" name=\"pincode\" ng-model=\"profile.address.pincode\"></div><div class=\"form-group col-6\"><label class=\"form-label\">Door no., Building</label> <input type=\"text\" class=\"form-control\" name=\"addressLine1\" ng-model=\"profile.address.addressLine1\"></div></div><div class=\"row\"><div class=\"form-group col-6\"><label class=\"form-label\">Street, Sector, Area, Colony</label> <input type=\"text\" class=\"form-control\" name=\"addressLine2\" ng-model=\"profile.address.addressLine2\"></div><div class=\"form-group col-6\"><label class=\"form-label\">Landmark</label> <input type=\"text\" class=\"form-control\" name=\"landmark\" ng-model=\"profile.address.landmark\"></div></div><div class=\"row\"><div class=\"form-group col-6\"><label class=\"form-label\">State</label> <select name=\"state\" class=\"form-control\" ng-change=\"getCities();profile.address.cityGeoId = 0;\" ng-model=\"profile.address.stateGeoId\" ng-options=\"geoState.id as geoState.geoName for geoState in geoStates\"></select></div><div class=\"form-group col-6\"><label class=\"form-label\">City</label> <select name=\"city\" class=\"form-control\" ng-model=\"profile.address.cityGeoId\" ng-options=\"geoCity.id as geoCity.geoName for geoCity in geoCities\"></select></div></div></div><div class=\"widget_title\"><label class=\"font-weight-bold\">Packages</label> <button type=\"button\" class=\"btn btn-sm btn-success ml-2\" ng-click=\"addPackage()\">Add</button> <span class=\"btn btn-sm bg-white text-primary text-capitalize p-0 pull-right\" data-toggle=\"collapse\" data-target=\"#package-info\" aria-expanded=\"false\" aria-controls=\"package-info\"><i class=\"fa fa-minus\"></i></span></div><div class=\"collapse show\" id=\"package-info\"><div class=\"row\"><div class=\"form-group col-6\"><label class=\"form-label\">Name</label></div><div class=\"form-group col-4\"><label class=\"form-label\">Price per day</label></div><div class=\"form-group col-2\"></div></div><div class=\"row\" ng-repeat=\"package in profile.packages\"><div class=\"form-group col-6\"><input type=\"text\" class=\"form-control\" ng-model=\"package.description\"/></div><div class=\"form-group col-4\"><input type=\"number\" class=\"form-control\" ng-model=\"package.pricePerDay\"/></div><div class=\"form-group col-2\"><button type=\"button\" class=\"btn btn-sm btn-danger pull-right ml-2\" ng-click=\"removePackage(package)\">Remove</button></div></div></div><div class=\"widget_title\"><label class=\"font-weight-bold\">Additional Information</label> <span class=\"btn btn-sm bg-white text-primary text-capitalize p-0 pull-right\" data-toggle=\"collapse\" data-target=\"#additional-info\" aria-expanded=\"false\" aria-controls=\"additional-info\"><i class=\"fa fa-minus\"></i></span></div><div id=\"additional-info\" class=\"collapse show\"><div class=\"row\"><div class=\"form-group col-12\"><label class=\"form-label\">How long you have been into photography?</label><div class=\"form-check col-2 pull-left\" ng-repeat=\"vendorExp in vendorExpList track by $index\"><input style=\"width:15px;height:15px;\" class=\"form-check-input\" id=\"{{'customRadio' + $index }}\" type=\"radio\" ng-checked=\"isVendorExpSelected(vendorExp)\" ng-click=\"selectVendorExp(vendorExp)\"> <label class=\"form-check-label\" for=\"{{'customRadio' + $index }}\" ng-bind=\"vendorExp.desc\"></label></div></div></div><div class=\"row\"><div class=\"form-group col-6\"><label class=\"form-label\">Payment terms</label> <textarea name=\"paymentTerms\" cols=\"\" rows=\"\" class=\"form-control\" ng-model=\"profile.freeLancer.paymentTerms\"></textarea></div><div class=\"form-group col-6\"><label class=\"form-label\">Additional costs</label> <textarea name=\"addCost\" cols=\"\" rows=\"\" class=\"form-control\" ng-model=\"profile.freeLancer.additionalCost\"></textarea></div></div></div></div></form></div>",
        "/templates/pages/vendor/home/projects.html": "<div class=\"vendor-projects\" ng-init=\"init()\"><div><div class=\"row\"><div class=\"col-md-10\"><div class=\"tab-content\"><div class=\"tab-pane bg-white show active\" id=\"v-pills-upcomingproject\" role=\"tabpanel\" aria-labelledby=\"v-pills-ownproject\"><div class=\"widget_title\"><label class=\"font-weight-bold\">Upcoming Projects</label></div><fic-vendor-home-projects-view ng-model=\"projects\" ng-disabled=\"isDisabled()\"></fic-vendor-home-projects-view></div><div class=\"tab-pane bg-white\" id=\"v-pills-completedproject\" role=\"tabpanel\" aria-labelledby=\"v-pills-ownproject\"><div class=\"widget_title\"><label class=\"font-weight-bold\">Completed Projects</label></div><fic-vendor-home-projects-view ng-model=\"completedProjects\" ng-disabled=\"isDisabled()\"></fic-vendor-home-projects-view></div></div></div><div class=\"col-md-2\"><div class=\"nav flex-column nav-pills nav-pills-custom\" id=\"v-pills-tab\" role=\"tablist\" aria-orientation=\"vertical\"><a data-target=\"#v-pills-upcomingproject\" class=\"nav-link mb-3 p-3 shadow active\" id=\"v-pills-upcomingproject-tab\" data-toggle=\"pill\" role=\"tab\" aria-controls=\"v-pills-upcomingproject\" aria-selected=\"true\"><i class=\"fa fa-photo mr-2\"></i> <span class=\"font-weight-bold small text-uppercase\">Upcoming</span> </a><a data-target=\"#v-pills-completedproject\" class=\"nav-link mb-3 p-3 shadow\" id=\"v-pills-completedproject-tab\" data-toggle=\"pill\" role=\"tab\" aria-controls=\"v-pills-completedproject\" aria-selected=\"false\"><i class=\"fa fa-file-video-o mr-2\"></i> <span class=\"font-weight-bold small text-uppercase\">Completed</span></a></div></div></div></div></div>",
        "/templates/pages/vendor/home/reviews.html": "<div class=\"vendor-reviews\" ng-init=\"init()\"><h4 class=\"mb-4\">Reviews</h4><div class=\"row\"><div class=\"col-lg-12 col-md-12\"><div class=\"dashboard-list-box\"><ul><li class=\"listing-reviews\" ng-repeat=\"review in reviews\"><div class=\"review_img\"><img ng-src=\"{{review.reviewedUserIcon}}\" alt=\"image\"></div><div class=\"review_comments\"><div class=\"comment-by\">{{ review.reviewedBy }}<div class=\"listing_review_info\"><p><span class=\"review_score\" ng-bind=\"review.rating + '/5'\"></span> <i ng-class=\"{'active':review.rating >= 1}\" class=\"fa fa-star\"></i> <i ng-class=\"{'active':review.rating >= 2}\" class=\"fa fa-star\"></i> <i ng-class=\"{'active':review.rating >= 3}\" class=\"fa fa-star\"></i> <i ng-class=\"{'active':review.rating >= 4}\" class=\"fa fa-star\"></i> <i ng-class=\"{'active':review.rating == 5}\" class=\"fa fa-star\"></i></p></div></div><span class=\"date\">{{ review.date }}</span><div class=\"star-rating\"></div><p>{{ review.comment }}</p><a href=\"#\" class=\"button gray\"><i class=\"fa fa-reply\"></i> Reply to this review</a></div></li></ul></div></div></div></div>",
        "/templates/pages/vendor/home/subscription.html": "<div class=\"vendor-subscription\" ng-init=\"init()\"><h4 class=\"mb-4\">Subscription</h4><div class=\"row\"><div class=\"col-md-12\"><div class=\"alert alert-danger mt-4\"><strong>Subscription Details :</strong><br/><span ng-show=\"activeSubscription.id>0\">Package Name : <span>{{activeSubscription.name}}</span><br/>Expiry On : <span>{{activeVendorSubscription.validTill | date:'MMM d, y hh:mm a'}}</span> </span><span ng-show=\"activeSubscription.id==0\">No Valid Subscription Found!</span></div></div><div class=\"col-md-4\" ng-repeat=\"subscription in subscriptions\"><div class=\"pricing_wrap\"><div class=\"pricing_header\"><h2>{{ subscription.name || 'No name' }}</h2></div><div class=\"plan_info\"><div class=\"plan_price\"><i class=\"fa fa-rupee mr-2\"></i> {{ subscription.price | number:2 }}</div><ul><li><span><i class=\"fa fa-rupee mr-2\"></i>{{ subscription.description }}</span></li><li>Unlimited Projects</li><li>Accounting Module</li><li>Reporting</li><li>Free Upgrade on new Features</li></ul><button class=\"btn bg-primary\" ng-if=\"!isSusbcriptionSelected(subscription)\" ng-disabled=\"activeVendorSubscription.id>0\" ng-click=\"selectSubscription(subscription)\">Select</button> <button class=\"btn bg-success\" disabled=\"disabled\" ng-if=\"isSusbcriptionSelected(subscription)\">Selected</button></div></div></div></div></div>",
        "/templates/pages/vendor/home/upcoming.html": "<div class=\"vendor-upcomingproject\"><div ng-if=\"!isEditMode\"><h4 class=\"mb-5\">Upcoming Projects</h4><div class=\"col-lg-12 col-md-12\"><div class=\"row\"><div class=\"col-3\"><div class=\"card\"><img class=\"card-img-top\" src=\"https://image.wedmegood.com/resized/400X/uploads/vendor_cover_pic/31096/8421dc48-8e5a-42a0-b738-7edf3e807ac6.png\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-title\"><a href=\"../../customer/projects/customer-project-view.html\">Suriya Wedding</a></p><p class=\"card-text\"><a href=\"../../customer/projects/customer-project-view.html\">0 photos</a></p><p><span class=\"badge badge-primary ng-binding\">New</span></p></div></div></div><div class=\"col-3\"><div class=\"card\"><img class=\"card-img-top\" src=\"https://image.wedmegood.com/resized/400X/uploads/vendor_cover_pic/31096/8421dc48-8e5a-42a0-b738-7edf3e807ac6.png\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-title\"><a href=\"../../customer/projects/customer-project-view.html\">Sheeni Jaya wedding</a></p><p class=\"card-text\"><a href=\"../../customer/projects/customer-project-view.html\">0 photos</a></p><p><span class=\"badge badge-primary ng-binding\">New</span></p></div></div></div></div></div></div><div ng-if=\"isEditMode\"><div class=\"mt-2 mb-2 p-3 bg-danger\" ng-if=\"errorMsgs && errorMsgs.length > 0\"><div class=\"clear\" ng-repeat=\"errorMsg in errorMsgs\"><small class=\"text-white\" ng-bind=\"errorMsg\"></small></div></div></div></div>",
        "/templates/pages/vendor/home/users.html": "<div class=\"vendor-users\"><h4 class=\"mb-4\">Users</h4></div>"
    };

    // --------------------------------------------------------------------------------
    // Main
    // --------------------------------------------------------------------------------
    fincam.template = function (p_path) {
        if (!p_path)
            return null;

        var templates = cache[p_path.trim().toLowerCase()];
        if (!templates)
            return null;

        return templates;
    }
})(window, document, jQuery(window), jQuery(document), angular, angular.fincam, false);
(function ($, ng, debugMode, undefined) {
    "use strict";

    ng.module("app", ['ui.router', 'ngResource', 'angular-loading-bar', 'ngValidate', 'thatisuday.dropzone']);

    // --------------------------------------------------------------------------------
    // Run
    // --------------------------------------------------------------------------------

    ng.module("app").run([
        "$rootScope",
        "$state",
        "$q",
        "$injector",
        function (
            p_$rootScope,
            p_$state,
            p_$q,
            p_$injector,
            undefined
        ) {
            // --------------------------------------------------------------------------------
            // Constant
            // --------------------------------------------------------------------------------
            p_$rootScope.debugMode = debugMode;
            p_$rootScope.isCustomerLoggedOn = false;

            p_$rootScope.toggleCustomerLogin = function (p_isLoggedOn) {
                p_$rootScope.isCustomerLoggedOn = p_isLoggedOn;
            }


            p_$rootScope.ngModelOptions = {
                updateOn: 'default blur',
                debounce: {
                    default: 500,
                    blur: 0
                }
            };

            // --------------------------------------------------------------------------------
            // Function
            // --------------------------------------------------------------------------------
            p_$rootScope.preventDefault = function (p_event) {
                var event = p_event || window.event;
                if (!event)
                    return false;

                if (event.preventDefault)
                    event.preventDefault();
                else
                    event.returnValue = false;

                return false;
            }

            p_$rootScope.stopPropagation = function (p_event) {
                var event = p_event || window.event;
                if (!event)
                    return false;

                if (event.stopPropagation)
                    event.stopPropagation();
                else
                    event.cancelBubble = false;

                return false;
            }

            p_$rootScope.doNothing = function (p_event) {
                p_$rootScope.preventDefault(p_event);
                p_$rootScope.stopPropagation(p_event);
                return false;
            }

            p_$rootScope.init = function () {
                return p_$q.all([]).finally(function () {

                });
            }
        }])
        .config([
            "$qProvider",
            "$compileProvider",
            "$animateProvider",
            "$httpProvider",
            "$locationProvider",
            "$stateProvider",
            function (
                p_$qProvider,
                p_$compileProvider,
                p_$animateProvider,
                p_$httpProvider,
                p_$locationProvider,
                p_$stateProvider,
                undefined
            ) {
                // Debugging
                if (!debugMode) {
                    p_$compileProvider.debugInfoEnabled(false);
                    p_$qProvider.errorOnUnhandledRejections(false);
                }

                // Animation
                p_$animateProvider.classNameFilter(/ng-animate-enabled/);

                // Http
                p_$httpProvider.defaults.useXDomain = true;
                delete p_$httpProvider.defaults.headers.common['X-Requested-With'];

                p_$httpProvider.interceptors.push('authInterceptorService');

                // Location
                p_$locationProvider.html5Mode({
                    enabled: true,
                    requireBase: true,
                    rewriteLinks: false
                });
            }]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));
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
(function ($, ng, debugMode, undefined)
{
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    module.run([
        "$filter",
        function (
            p_$filter,
            undefined
        )
        {
            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------
            if (!Array.isArray)
                Array.isArray = function (p_arr)
                {
                    return p_arr instanceof Array
                        || (typeof p_arr !== 'undefined' &&
                            p_arr && p_arr.constructor === Array)
                        || Object.prototype.toString.call(p_arr) == "[object Array]";
                }

            // --------------------------------------------------------------------------------
            // Prototype
            // --------------------------------------------------------------------------------
            if (!Array.prototype.peek)
                Array.prototype.peek = function ()
                {
                    var self = this;
                    if (!self.length)
                        return undefined;

                    return self[self.length - 1];
                };

            if (!Array.prototype.clear)
                Array.prototype.clear = function ()
                {
                    var self = this;
                    self.splice(0);
                    return self;
                };

            if (!Array.prototype.indexOf)
                Array.prototype.indexOf = function (p_object)
                {
                    /// <summary>Get index of an array element</summary>

                    var self = this;

                    for (var i = 0; i < self.length; i++)
                        if (self[i] === p_object)
                            return i;

                    return -1;
                };

            if (!Array.prototype.lastIndexOf)
                Array.prototype.lastIndexOf = function (p_object)
                {
                    /// <summary>Get last index of an array element</summary>

                    var self = this;

                    for (var i = self.length - 1; i >= 0; i--)
                        if (self[i] === p_object)
                            return i;

                    return -1;
                };

            if (!Array.prototype.replace)
                Array.prototype.replace = function (p_arr)
                {
                    var self = this;
                    self.clear();
                    self.append(p_arr);
                }

            if (!Array.prototype.remove)
                Array.prototype.remove = function (p_object)
                {
                    /// <summary>Get last index of an array element</summary>

                    var self = this;
                    var nIndex = self.indexOf(p_object);
                    if (nIndex !== -1)
                        self.splice(nIndex, 1);

                    return self;
                };

            if (!Array.prototype.insert)
                Array.prototype.insert = function (p_object, p_index)
                {
                    /// <summary>Get last index of an array element</summary>

                    var self = this;
                    self.splice(p_index, 0, p_object);
                    return self;
                };

            if (!Array.prototype.add)
                Array.prototype.add = Array.prototype.push;

            if (!Array.prototype.append)
                Array.prototype.append = function (p_arr)
                {
                    var self = this;
                    if (!fincam.isArray(p_arr)
                        || !p_arr.length)
                    {
                        return self;
                    }

                    for (var i = 0; i < p_arr.length; i++)
                        self.add(p_arr[i]);

                    return self;
                }


            if (!Array.prototype.equals)
                Array.prototype.equals = function (p_array)
                {
                    var self = this;
                    if (!$.isArray(p_array) || self.length !== p_array.length)
                    {
                        return false;
                    }

                    for (var i = 0; i < self.length; i++)
                    {
                        var item = self[i];
                        var comparing = p_array[i];

                        if (item.equals && typeof item.equals === "function")
                        {
                            if (!item.equals(comparing))
                                return false;
                        }
                        else
                        {
                            if (item !== comparing)
                                return false;
                        }
                    }

                    return true;
                };

            if (!Array.prototype.contains)
                Array.prototype.contains = function (p_element)
                {
                    var self = this;
                    return self.indexOf(p_element) !== -1;
                }

            Array.empty = [];
            Array.prototype.asEnumerable = function ()
            {
                var self = this;
                return Enumerable.from(self);
            };

            if (!Array.prototype.toNumberRangeDisplayText)
                Array.prototype.toNumberRangeDisplayText = function ()
                {
                    var self = this;
                    var results = [];
                    var previousNumber;
                    var buffer;
                    var pushBuffer = function ()
                    {
                        if (buffer
                            && buffer.length > 0)
                        {
                            if (buffer.length > 1)
                                results.push(buffer[0] + "-" + buffer[buffer.length - 1]);
                            else
                                results.push(buffer.join(", "));
                        }
                    }

                    for (var i = 0; i < self.length; i++)
                    {
                        var currentNumber = self[i];
                        if (previousNumber
                            && previousNumber === currentNumber - 1)
                        {
                            buffer.push(currentNumber);
                        }
                        else
                        {
                            pushBuffer();
                            buffer = [currentNumber];
                        }

                        previousNumber = currentNumber;
                    }

                    pushBuffer();
                    return results.join(", ");
                }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined)
{
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    module.run([
        "$q",
        "$filter",
        function (
            p_$q,
            p_$filter,
            undefined
        )
        {
            // --------------------------------------------------------------------------------
            // Constant
            // --------------------------------------------------------------------------------

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            // --------------------------------------------------------------------------------
            // Prototypes
            // --------------------------------------------------------------------------------
            if (!Blob.prototype.getBlobUrl)
                Blob.prototype.getBlobUrl = function ()
                {
                    var self = this;
                    return URL.createObjectURL(self);
                }

            if (!Blob.prototype.getString)
                Blob.prototype.getString = function ()
                {
                    var self = this;
                    return p_$q(function (p_resolve, p_reject)
                    {
                        var reader = new FileReader();
                        reader.addEventListener("loadend", function (p_event)
                        {
                            p_resolve(reader.result);
                        });

                        reader.addEventListener("error", function ()
                        {
                            p_reject(arguments);
                        });

                        reader.readAsText(self);
                    });
                }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined)
{
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    module.run([
        "$rootScope",
        "$filter",
        function (
            p_$rootScope,
            p_$filter,
            undefined
        )
        {
            // --------------------------------------------------------------------------------
            // Constant
            // --------------------------------------------------------------------------------
            p_$rootScope.minTimestamp = Date.minTimestamp = 0;
            p_$rootScope.maxTimestamp = Date.maxTimestamp = 253402261199999;
            p_$rootScope.dateFormat = Date.dateFormat = "dd/MM/yyyy";
            p_$rootScope.shortDateFormat = Date.shortDateFormat = "d/M/yy";
            p_$rootScope.longDateFormat = Date.longDateFormat = "ddd d MMM yyyy";
            p_$rootScope.timeFormat = Date.timeFormat = "hh:mm tt";
            p_$rootScope.shortTimeFormat = Date.shortTimeFormat = "H:mm";
            p_$rootScope.longTimeFormat = Date.longTimeFormat = "hh:mm:ss tt";
            p_$rootScope.shortDateTimeFormat = Date.shortDateTimeFormat = Date.dateFormat + ' ' + Date.timeFormat;
            p_$rootScope.longDateTimeFormat = Date.longDateTimeFormat = Date.longDateFormat + ' ' + Date.longTimeFormat;
            p_$rootScope.firstDayOfWeek = Date.firstDayOfWeek = 1;

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------
            if (!Date.now)
                Date.now = function ()
                {
                    return new Date();
                }

            if (!Date.today)
                Date.today = function ()
                {
                    return new Date().clearTime();
                }

            if (!Date.min)
                Date.min = function ()
                {
                    return new Date(Date.minTimestamp);
                }

            if (!Date.max)
                Date.max = function ()
                {
                    return new Date(Date.maxTimestamp);
                }

            if (!Date.getWeekDayLabel)
            {
                var weekDaysLabel = [];
                Date.getWeekDayLabel = function (p_dayOfWeek, p_length)
                {
                    if (weekDaysLabel.length === 0)
                    {
                        var d = Date.today();
                        d.setDate(d.getDate() - d.getDay());
                        for (var i = 0; i < 7; i++)
                        {
                            weekDaysLabel.push(d.format("dddd"));
                            d.setDate(d.getDate() + 1);
                        }
                    }

                    var result = weekDaysLabel[p_dayOfWeek % 7];
                    if (Number.isInteger(p_length)
                        && p_length > 0)
                    {
                        return result.substr(0, p_length);
                    }
                    else
                    {
                        return result;
                    }
                }
            }

            if (!Date.getShortWeekDayLabel)
            {
                var weekDaysLabel = [];
                Date.getShortWeekDayLabel = function (p_dayOfWeek, p_length)
                {
                    if (weekDaysLabel.length === 0)
                    {
                        var d = Date.today();
                        d.setDate(d.getDate() - d.getDay());
                        for (var i = 0; i < 7; i++)
                        {
                            weekDaysLabel.push(d.format("ddd"));
                            d.setDate(d.getDate() + 1);
                        }
                    }

                    var result = weekDaysLabel[p_dayOfWeek % 7];
                    if (Number.isInteger(p_length)
                        && p_length > 0)
                    {
                        return result.substr(0, p_length);
                    }
                    else
                    {
                        return result;
                    }
                }
            }

            var parse = Date.parse;
            Date.parse = function (p_value, p_dateFormat)
            {
                var dateFormat;
                if (String.isNullOrWhiteSpace(p_dateFormat))
                {
                    dateFormat = p_settings.dateFormat;
                }
                else
                {
                    switch (p_dateFormat)
                    {
                        default:
                            dateFormat = p_dateFormat.replace(/yyyy/gi, "YYYY")
                                .replace(/yy/gi, "YY")
                                .replace(/dd/gi, "DD")
                                .replace(/d/gi, "D")
                                .replace(/tt/gi, "a")
                                .replace(/fff/gi, "SSS")
                                .replace(/K/gi, "Z")
                                ;

                            break;
                    }
                }

                var d = moment(
                    p_value,
                    dateFormat
                );

                if (d.isValid())
                    return d.toDate();

                return parse(p_value);
            }

            // --------------------------------------------------------------------------------
            // Prototypes
            // --------------------------------------------------------------------------------
            if (!Date.prototype.equals)
                Date.prototype.equals = function (Date)
                {
                    var self = this;
                    return self.getTime().equals(Date.getTime());
                }

            if (!Date.prototype.clone)
                Date.prototype.clone = function ()
                {
                    var self = this;
                    return new Date(self.getTime());
                }

            if (!Date.prototype.clearTime)
                Date.prototype.clearTime = function ()
                {
                    var self = this;
                    self.setHours(0);
                    self.setMinutes(0);
                    self.setSeconds(0);
                    self.setMilliseconds(0);
                    return self;
                }

            if (!Date.prototype.setDateFrom)
                Date.prototype.setDateFrom = function (p_targetDate)
                {
                    var self = this;
                    if (!fincam.isDate(p_targetDate))
                        return self;

                    self.setYear(p_targetDate.getFullYear());
                    self.setMonth(p_targetDate.getMonth());
                    self.setDate(p_targetDate.getDate());
                    return self;
                }

            if (!Date.prototype.setTimeFrom)
                Date.prototype.setTimeFrom = function (p_targetDate)
                {
                    var self = this;
                    if (!fincam.isDate(p_targetDate))
                        return self;

                    self.setHours(p_targetDate.getHours());
                    self.setMinutes(p_targetDate.getMinutes());
                    self.setSeconds(p_targetDate.getSeconds());
                    self.setMilliseconds(p_targetDate.getMilliseconds());
                    return self;
                }

            if (!Date.prototype.setDateTimeFrom)
                Date.prototype.setDateTimeFrom = function (p_targetDate)
                {
                    var self = this;
                    if (!fincam.isDate(p_targetDate))
                        return self;

                    return self.setDateFrom(p_targetDate).setTimeFrom(p_targetDate);
                }

            if (!Date.prototype.isWeekend)
                Date.prototype.isWeekend = function (p_targetDate)
                {
                    var self = this;
                    var dayOfWeek = self.getDay();
                    return dayOfWeek === 0
                        || dayOfWeek === 6;
                }

            if (!Date.prototype.format)
                Date.prototype.format = function (p_dateFormat, p_utc)
                {
                    var self;
                    if (p_utc === true)
                    {
                        self = this.clone();
                        self.setMinutes(self.getMinutes() + self.getTimezoneOffset());
                    }
                    else
                    {
                        self = this;
                    }

                    var dateFormat;
                    if (String.isNullOrWhiteSpace(p_dateFormat))
                    {
                        dateFormat = Date.longDateTimeFormat;
                    }
                    else
                    {
                        switch (p_dateFormat)
                        {
                            default:
                                dateFormat = p_dateFormat
                                    .replace(/dddd/gi, "EEEE")
                                    .replace(/ddd/gi, "EEE")
                                    .replace(/fff/gi, "sss")
                                    .replace(/tt/gi, "a")
                                    .replace(/K/gi, "Z")
                                    ;

                                break;
                        }
                    }

                    return p_$filter("date")(self, dateFormat);
                }

            if (!Date.prototype.dateOnly)
                Date.prototype.dateOnly = function ()
                {
                    var self = this;

                    var d = new Date(self);
                    d.setHours(0, 0, 0, 0);
                    return d;
                }

            if (!Date.prototype.isEqualDateOnly)
                Date.prototype.isEqualDateOnly = function (p_targetDate)
                {
                    var self = this;
                    if (!fincam.isDate(p_targetDate))
                        return false;

                    //if (self.toJSON().slice(0, 10) == p_targetDate.toJSON().slice(0, 10))
                    if (self.dateOnly().getTime() == p_targetDate.dateOnly().getTime())
                        return true;
                    else
                        return false;
                }


            if (!Date.prototype.isGreaterDateOnly)
                Date.prototype.isGreaterDateOnly = function (p_targetDate)
                {
                    var self = this;
                    if (!fincam.isDate(p_targetDate))
                        return false;

                    if (self.dateOnly() > p_targetDate.dateOnly())
                        return true;
                    else
                        return false;
                }

            if (!Date.prototype.isGreaterEqualDateOnly)
                Date.prototype.isGreaterEqualDateOnly = function (p_targetDate)
                {
                    var self = this;
                    if (!fincam.isDate(p_targetDate))
                        return false;

                    if (self.dateOnly() >= p_targetDate.dateOnly())
                        return true;
                    else
                        return false;
                }

            if (!Date.prototype.isSmallerDateOnly)
                Date.prototype.isSmallerDateOnly = function (p_targetDate)
                {
                    var self = this;
                    if (!fincam.isDate(p_targetDate))
                        return false;

                    if (self.dateOnly() < p_targetDate.dateOnly())
                        return true;
                    else
                        return false;
                }

            if (!Date.prototype.isSmallerEqualDateOnly)
                Date.prototype.isSmallerEqualDateOnly = function (p_targetDate)
                {
                    var self = this;
                    if (!fincam.isDate(p_targetDate))
                        return false;

                    if (self.dateOnly() <= p_targetDate.dateOnly())
                        return true;
                    else
                        return false;
                }

            if (!Date.prototype.getFirstDateOfWeek)
                Date.prototype.getFirstDateOfWeek = function ()
                {
                    var self = this;                    
                    
                    var day = self.getDay() || 7; 
                    if (day == 1)
                    {
                        return new Date(self.getTime());
                    }
                    else
                    {
                        return new Date(self.getTime() - (24 * 60 * 60 * 1000) * (day - 1));                        
                    }
                }

            if (!Date.prototype.getLastDateOfWeek)
                Date.prototype.getLastDateOfWeek = function ()
                {
                    var self = this;

                    var day = self.getDay() || 7;
                    if (day == 0)
                    {
                        return new Date(self.getTime());
                    }
                    else
                    {
                        return new Date(self.getTime() + (24 * 60 * 60 * 1000) * (7 - day));
                    }
                }


            if (!Date.prototype.dateUTC)
                Date.prototype.dateUTC = function ()
                {
                    var self = this;
                    return new Date(self.getTime() + self.getTimezoneOffset() * 60000);
                }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined)
{
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    module.run([
        "$filter",
        function (
            p_$filter,
            undefined
        )
        {
            // --------------------------------------------------------------------------------
            // Constants
            // --------------------------------------------------------------------------------
            Number.minByteValue = 0;
            Number.maxByteValue = 255;
            Number.minShortValue = -32768;
            Number.maxShortValue = 32767;
            Number.minUshortValue = 0;
            Number.maxUshortValue = 65535;
            Number.minIntValue = -2147483648;
            Number.maxIntValue = 2147483647;
            Number.minUintValue = 0;
            Number.maxUintValue = 4294967295;
            Number.minLongValue = -9223372036854775808;
            Number.maxLongValue = 9223372036854775807;
            Number.minDecimalValue = Number.MIN_SAFE_INTEGER || Number.MIN_VALUE;
            Number.maxDecimalValue = Number.MAX_SAFE_INTEGER || Number.MAX_VALUE;

            // --------------------------------------------------------------------------------
            // Private
            // --------------------------------------------------------------------------------

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------
            if (!Number.isInteger)
                Number.isInteger = function (p_int)
                {
                    return typeof p_int === "number"
                        && p_int === Math.ceil(p_int);
                }

            // --------------------------------------------------------------------------------
            // Prototype
            // --------------------------------------------------------------------------------
            if (!Number.prototype.equals)
                Number.prototype.equals = function (Number)
                {
                    var self = this;
                    return self === Number;
                }

            if (!Number.prototype.floor)
                Number.prototype.floor = function (p_decimal)
                {
                    var self = this;
                    var decimal = bn.isInteger(p_decimal) && p_decimal >= 0 ? p_decimal : 0;
                    var dividend = Math.pow(10, decimal);
                    return Math.floor(self * dividend) / dividend;
                }

            if (!Number.prototype.ceil)
                Number.prototype.ceil = function (p_decimal)
                {
                    var self = this;
                    var decimal = bn.isInteger(p_decimal) && p_decimal >= 0 ? p_decimal : 0;
                    var dividend = Math.pow(10, decimal);
                    return Math.ceil(self * dividend) / dividend;
                }

            if (!Number.prototype.round)
                Number.prototype.round = function (p_decimal)
                {
                    var self = this;
                    var decimal = bn.isInteger(p_decimal) && p_decimal >= 0 ? p_decimal : 0;
                    var dividend = Math.pow(10, decimal);
                    return Math.round(self * dividend) / dividend;
                }

            if (!Number.prototype.formatThousands)
                Number.prototype.formatThousands = function (p_sep)
                {
                    var self = this;
                    return self.toString().replace(/\B(?=(\d{3})+(?!\d))/g, p_sep || ",");
                }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined)
{
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    module.run([
        "$filter",
        function (
            p_$filter,
            undefined
        )
        {
            // --------------------------------------------------------------------------------
            // Constants
            // --------------------------------------------------------------------------------
            Object.empty = {};

            // --------------------------------------------------------------------------------
            // Private
            // --------------------------------------------------------------------------------

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------
            if (!Object.keys)
                Object.keys = function (p_obj)
                {
                    var result = [];
                    for (var prop in p_obj)
                    {
                        if (p_obj.hasOwnProperty(prop))
                            result.push(prop);
                    }

                    return result;
                }

            if (!Object.assign)
                Object.assign = function (p_this, p_base)
                {
                    return $.extend({}, p_this, p_base);
                }

            // --------------------------------------------------------------------------------
            // Prototype
            // --------------------------------------------------------------------------------
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined)
{
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    module.run([
        "$filter",
        function (
            p_$filter,
            undefined
        )
        {
            // --------------------------------------------------------------------------------
            // Const
            // --------------------------------------------------------------------------------
            var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------
            String.random = function (p_length)
            {
                var length = p_length || 8;
                var strResult = '';
                for (var i = 0; i < p_length; i++)
                {
                    strResult += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
                }

                return strResult;
            }

            // --------------------------------------------------------------------------------
            // Prototypes
            // --------------------------------------------------------------------------------
            if (!String.prototype.truncate)
            {
                String.prototype.truncate = function (p_maxLength)
                {
                    var self = this;
                    var maxLength = parseInt(p_maxLength);
                    if (isNaN(maxLength) || maxLength < 3)
                        maxLength = 3;

                    if (self.length > maxLength)
                    {
                        return self.substr(0, maxLength - 3) + "...";
                    }
                    else
                    {
                        return self;
                    }
                };
            }

            if (!String.prototype.endsWith)
            {
                String.prototype.endsWith = function (suffix)
                {
                    return this.indexOf(suffix, this.length - suffix.length) !== -1;
                };
            }

            if (!String.prototype.startsWith)
            {
                String.prototype.startsWith = function (prefix)
                {
                    return this.indexOf(prefix) === 0;
                };
            }

            if (!String.prototype.trim)
                String.prototype.trim = function ()
                {
                    var self = this;
                    return self.replace(/^\s+|\s+$/g, '');
                };

            if (!String.prototype.trimLeft)
                String.prototype.trimLeft = function ()
                {
                    var self = this;
                    return self.replace(/^\s+/, '');
                };

            if (!String.prototype.trimStart)
                String.prototype.trimStart = function (p_char)
                {
                    var self = this;
                    var char = p_char ? "[" + p_char + "]" : "\\s";
                    var regex = eval("(/^" + char + "+/g)");
                    return self.replace(regex, '');
                };

            if (!String.prototype.trimRight)
                String.prototype.trimRight = function (p_char)
                {
                    var self = this;
                    return self.replace(/\s+$/, '');
                };

            if (!String.prototype.trimEnd)
                String.prototype.trimEnd = function (p_char)
                {
                    var self = this;
                    var char = p_char ? "[" + p_char + "]" : "\\s";
                    var regex = eval("(/" + char + "+$/g)");
                    return self.replace(regex, '');
                };

            if (!String.prototype.padLeft)
                String.prototype.padLeft = function (p_length, p_char)
                {
                    var self = this;
                    if (self.length >= p_length)
                        return self;

                    var char = p_char || ' ';
                    var padLength = p_length - self.length;
                    var pad = "";
                    while (pad.length < padLength)
                    {
                        var remainder = padLength - pad.length;
                        if (remainder < char.length)
                            pad += char.substr(0, remainder);
                        else
                            pad += char;
                    }

                    return pad + self;
                };

            if (!String.prototype.padRight)
                String.prototype.padRight = function (p_length, p_char)
                {
                    var self = this;
                    if (self.length >= p_length)
                        return self;

                    var char = p_char || ' ';
                    var padLength = p_length - self.length;
                    var pad = "";
                    while (pad.length < padLength)
                    {
                        var remainder = padLength - pad.length;
                        if (remainder < char.length)
                            pad += char.substr(0, remainder);
                        else
                            pad += char;
                    }

                    return self + pad;
                };

            if (!String.prototype.isEmptyOrWhiteSpaces)
                String.prototype.isEmptyOrWhiteSpaces = function ()
                {
                    var self = this;

                    return self === null || self.match(/\S/) === null;
                };

            if (!String.prototype.toSearchRegExp)
                String.prototype.toSearchRegExp = function (p_caseSensitive)
                {
                    ///<summary>Convert a string into searching RegExp</summary>

                    var self = this.toString().trim();
                    if (self == null || self == '')
                        return /./i;

                    var strWord = "";
                    for (var i = 0, len = self.length; i < len; i++)
                        if (i == self.length - 1 && self[i] === '*')
                            strWord += '.+'; // Any character including space character
                        else
                            strWord += '[' + self[i] + ']';

                    return eval("(/" +
                        "(^" + strWord + "$)" + "|" + // Only word
                        "(^" + strWord + "[^\\w]+.*$)" + "|" + // Starts with word
                        "(^.*[^\\w]+" + strWord + "[^\\w]+.*$)" + "|" + // Contains word with
                        "(^.*[^\\w]+" + strWord + "$)" + // Ends with word
                        "/" + (p_caseSensitive ? "" : "i") + ")");
                };

            if (!String.prototype.capitalize)
                String.prototype.capitalize = function ()
                {
                    var self = this;

                    if (self.length <= 1)
                    {
                        return self.toUpperCase();
                    }
                    else
                    {
                        var astrParts = self.split(/[\s-_]/);
                        if (astrParts.length === 1)
                        {
                            return self[0].toUpperCase() + self.toLowerCase().substr(1);
                        }
                        else
                        {
                            for (var i = 0; i < astrParts.length; i++)
                            {
                                astrParts[i] = astrParts[i].capitalize();
                            }
                        }

                        return astrParts.join(" ");
                    }
                }

            if (!String.prototype.fulltext)
            {
                RegExp.prototype.matches = function (p_strValue)
                {
                    var self = this;
                    var matches = [];
                    var temp;

                    while ((temp = self.exec(p_strValue)))
                        matches.push(temp[0]);

                    return matches;
                }

                String.prototype.fulltext = function (p_searchPhrase)
                {
                    var self = this.toString().trim();

                    if (self == null || self == '')
                        return true;

                    var regex = /([\w,*]+)|(["][^"]+["])|([+][\w,*]+)|([+]["][^"]+["])|([-][\w,*]+)|([-]["][^"]+["])/gi;
                    var matches = regex.matches(p_searchPhrase);

                    if (!matches || matches.length == 0)
                        return true;

                    var astrOr = [];
                    var astrAnd = [];
                    var astrNot = [];

                    // Extract tests
                    for (var i = 0, ilen = matches.length; i < ilen; i++)
                    {
                        var match = matches[i];

                        if (match[0] === '+')
                            astrAnd.push(match.substr(1).replace(/["]/g, ''));
                        else if (match[0] === '-')
                            astrNot.push(match.substr(1).replace(/["]/g, ''));
                        else
                            astrOr.push(match.replace(/["]/g, ''));
                    }

                    // Test OR
                    var bResult = (astrOr.length == 0);

                    for (var i = 0, ilen = astrOr.length; i < ilen; i++)
                    {
                        var reg = astrOr[i].toSearchRegExp();

                        if (reg.test(self))
                        {
                            bResult = true;
                            break;
                        }
                    }

                    if (!bResult)
                        return false;

                    // Test AND
                    bResult = true;

                    for (var i = 0, ilen = astrAnd.length; i < ilen; i++)
                    {
                        var reg = astrAnd[i].toSearchRegExp();

                        if (!reg.test(self))
                        {
                            bResult = false;
                            break;
                        }
                    }

                    if (!bResult)
                        return false;

                    // Test NOT
                    bResult = true;

                    for (var i = 0, ilen = astrNot.length; i < ilen; i++)
                    {
                        var reg = astrNot[i].toSearchRegExp();

                        if (reg.test(self))
                        {
                            bResult = false;
                            break;
                        }
                    }

                    if (!bResult)
                        return false;

                    return bResult;
                }
            }

            if (!String.prototype.slug)
                String.prototype.slug = function (p_sep)
                {
                    var sep = p_sep || '-';
                    var self = this.toString().trim();
                    return self
                        .toLowerCase()
                        .replace(/ /g, sep)
                        .replace(/[^\w-]+/g, '')
                        ;
                }

            if (!String.prototype.fromBase64)
                String.prototype.fromBase64 = function (p_type)
                {
                    var self = this;
                    var type = p_type || Uint8Array;
                    return new type(atob(self).split('').map(function (c) { return c.charCodeAt(0); }));
                }

            if (!String.prototype.toCamelCase)
                String.prototype.toCamelCase = function ()
                {
                    var self = this;

                    // Lower cases the string
                    return self.toLowerCase()
                        // Replaces any - or _ characters with a space 
                        .replace(/[-_\.]+/g, ' ')
                        // Removes any non alphanumeric characters 
                        .replace(/[^\w\s]/g, '')
                        // Uppercases the first character in each group immediately following a space 
                        // (delimited by spaces) 
                        .replace(/ (.)/g, function ($1) { return $1.toUpperCase(); })
                        // Removes spaces 
                        .replace(/ /g, '');
                }

            if (!String.prototype.camelToPascalCase)
                String.prototype.camelToPascalCase = function ()
                {
                    var self = this;
                    return self[0].toUpperCase() + self.substr(1);
                }

            String.isNullOrEmpty = function (p_str)
            {
                return p_str === undefined
                    || p_str === null
                    || p_str === "";
            }

            String.isNullOrWhiteSpace = function (p_str)
            {
                return String.isNullOrEmpty(p_str)
                    || /^\s+$/.test(p_str);
            }

            if (!String.prototype.toSearchRegex)
            {
                String.prototype.toSearchRegex = function (p_strSuffix)
                {
                    var self = this;
                    var strResult = "";
                    for (var i = 0; i < self.length; i++)
                    {
                        switch (self[i])
                        {
                            default:
                                strResult += "[" + self[i] + "]";
                                break;
                        }
                    }

                    return eval("(/" + strResult + "/" + (p_strSuffix || "") + ")");
                };
            }

            if (!String.prototype.mapTags)
            {
                String.prototype.mapTags = function (p_aoMapping, p_funcFormat)
                {
                    var self = this;
                    if (!$.isArray(p_aoMapping)
                        && typeof p_aoMapping !== "object"
                    )
                    {
                        return self;
                    }

                    var aoMapping = p_aoMapping;
                    if (!$.isArray(aoMapping))
                    {
                        aoMapping = [aoMapping];
                    }

                    var strResult = "";
                    var strTemp = self;
                    var nStartIndex = -1;
                    var nEndIndex = -1;
                    for (var i = 0; i < aoMapping.length; i++)
                    {
                        var oMappingObject = aoMapping[i];
                        if (typeof oMappingObject !== "object")
                            continue;

                        while ((nStartIndex = strTemp.indexOf("{{")) !== -1
                            && (nEndIndex = strTemp.indexOf("}}", nStartIndex)) !== -1)
                        {
                            var mappingInfo = strTemp.substr(nStartIndex + 2, nEndIndex - nStartIndex - 2).split('.').map(function (p_tag)
                            {
                                var strProperty = p_tag.split(']')[0].split('[')[0];
                                var nIndex = parseInt(p_tag.split(']')[0].split('[')[1]);
                                if (!aps.isInteger(nIndex)
                                    || nIndex < 0)
                                {
                                    nIndex = 0;
                                }

                                return {
                                    object: oMappingObject,
                                    property: strProperty,
                                    index: nIndex
                                }
                            });

                            var mappingValue = oMappingObject;
                            for (var j = 0; j < mappingInfo.length; j++)
                            {
                                var info = mappingInfo[j];
                                mappingValue = mappingValue[info.property];
                                if (aps.isNullOrUndefined(mappingValue))
                                    break;
                            }

                            if (!aps.isNullOrUndefined(mappingValue))
                            {
                                if (aps.isFunction(p_funcFormat))
                                {
                                    mappingValue = p_funcFormat(mappingValue, mappingInfo);
                                }
                                else
                                {
                                    mappingValue = mappingValue.toString();
                                }
                            }

                            if (!aps.isNullOrUndefined(mappingValue))
                                strResult += strTemp.substr(0, nStartIndex) + mappingValue;
                            else
                                strResult += strTemp.substr(0, nEndIndex + 2);

                            strTemp = strTemp.substr(nEndIndex + 2);
                        }
                    }

                    strResult += strTemp;
                    return strResult.cleanTags();
                };
            }

            if (!String.prototype.cleanTags)
            {
                String.prototype.cleanTags = function ()
                {
                    var self = this;
                    var strResult = "";
                    var strTemp = self;
                    var nStartIndex = -1;
                    var nEndIndex = -1;
                    while ((nStartIndex = strTemp.indexOf("{{")) !== -1
                        && (nEndIndex = strTemp.indexOf("}}", nStartIndex)) !== -1)
                    {
                        strResult += strTemp.substr(0, nStartIndex);
                        strTemp = strTemp.substr(nEndIndex + 2);
                    }

                    strResult += strTemp;
                    return strResult;
                };
            }

            if (!String.prototype.fromNumberRangeDisplayText)
            {
                String.prototype.fromNumberRangeDisplayText = function ()
                {
                    var self = this;
                    var astrParts;
                    if (!self
                        || (astrParts = self.split(',')).length == 0
                    )
                    {
                        return [];
                    }

                    var results = [];
                    astrParts.asEnumerable().forEach(function (p_numberRange)
                    {
                        var astrRangeParts, nNumber, nFrom, nTo;
                        if (p_numberRange.indexOf('-') !== -1
                            && (astrRangeParts = p_numberRange.split('-')).length == 2
                            && !isNaN(nFrom = parseInt(astrRangeParts[0]))
                            && !isNaN(nTo = parseInt(astrRangeParts[1]))
                            && nFrom < nTo
                        )
                        {
                            for (var i = nFrom; i <= nTo; i++)
                            {
                                if (!results.contains(i))
                                    results.add(i);
                            }
                        }
                        else if (!isNaN(nNumber = parseInt(p_numberRange.Trim()))
                            && !results.contains(nNumber)
                        )
                        {
                            results.add(nNumber);
                        }
                    });

                    return results;
                }
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Service
    // --------------------------------------------------------------------------------
    fincam.service = function (
        p_$rootScope,
        p_$q,
        p_$window,
        p_$stateParams,
        p_$state,
        p_$timeout,
        p_$interval,
        undefined
    ) {
        var self = this;
        return self;
    }

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------

    // --------------------------------------------------------------------------------
    // Modules
    // --------------------------------------------------------------------------------
    module.factory("services.utils", [
        "$rootScope",
        "$q",
        "$window",
        "$timeout",
        "$interval",
        "$injector",
        function (
            p_$rootScope,
            p_$q,
            p_$window,
            p_$timeout,
            p_$interval,
            p_$injector,
            undefined
        ) {
            var self = fincam.service.apply(this, [
                p_$rootScope,
                p_$q,
                p_$window,
                null,
                null,
                p_$timeout,
                p_$interval,
            ]);

            // --------------------------------------------------------------------------------
            // Variables
            // --------------------------------------------------------------------------------
            self.$w = $(window);
            self.$d = $(document);
            self.$h = $(document.head);
            self.$b = $(document.body);
            self.$html = $(document.children[0]);
            self.blankDataUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAADUlEQVQYV2P4//8/AwAI/AL+iF8G4AAAAABJRU5ErkJggg==";

            // --------------------------------------------------------------------------------
            // Function
            // --------------------------------------------------------------------------------
            self.isNullOrUndefined = fincam.isNullOrUndefined;
            self.isObject = fincam.isObject;
            self.isPlainObject = fincam.isPlainObject;
            self.isNullOrUndefined = fincam.isNullOrUndefined;
            self.isNullOrEmpty = fincam.isNullOrEmpty;
            self.isNullable = fincam.isNullable;
            self.isBoolean = fincam.isBoolean;
            self.isNullableBoolean = fincam.isNullableBoolean;
            self.isFunction = fincam.isFunction;
            self.isNumber = fincam.isNumber;
            self.isNullableNumber = fincam.isNullableNumber;
            self.isInteger = fincam.isInteger;
            self.isNullableInteger = fincam.isNullableInteger;
            self.isDate = fincam.isDate;
            self.isNullableDate = fincam.isNullableDate;
            self.isString = fincam.isString;
            self.isArray = fincam.isArray;
            self.isByteArray = fincam.isByteArray;
            self.isWordArray = fincam.isWordArray;
            self.isFile = fincam.isFile;
            self.isFileList = fincam.isFileList;
            self.isBlob = fincam.isBlob;
            self.instanceOf = fincam.instanceOf;
            self.typeOf = fincam.typeOf;
            self.fromJson = fincam.fromJson;
            self.toJson = fincam.toJson;

            self.getProperties = function (p_obj) {
                if (!self.isObject(p_obj))
                    return [];

                return Object.keys(p_obj);
            }

            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Validations
    // --------------------------------------------------------------------------------
    module.config(function ($validatorProvider) {

        $validatorProvider.setDefaults({
            errorElement: 'small',
            highlight: function (p_element, p_errorClass) {

                if (!$(p_element).is('select'))
                    $(p_element).addClass("is-invalid")

                $(p_element).addClass("invalid-input");
                $(p_element).next("small").addClass("text-danger");
            },
            unhighlight: function (p_element, p_errorClass) {
                $(p_element).removeClass("is-invalid").removeClass("invalid-input");
                $(p_element).next("small").removeClass("text-danger");
            }
        });

        $validatorProvider.addMethod('mobileIndia', function (value, element) {
            return this.optional(element) || /^[6-9]\d{9}/.test(value);
        }, "Please enter a valid phone number");

        $validatorProvider.addMethod("pwdCheck", function (value) {
            return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
                && /[a-z]/.test(value) // has a lowercase letter
                && /\d/.test(value) // has a digit
        });

        $validatorProvider.addMethod('numberRequired', function (value, element) {
            var currentVal = value;

            if (currentVal.indexOf('number:') > -1)
                currentVal = currentVal.replace("number:", "")

            return currentVal && currentVal > 0;
        });
    });

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Inteceptor
    // --------------------------------------------------------------------------------
    module.factory('authInterceptorService', [
        "$q",
        "$injector",
        "$location",
        "$rootScope",
        "clientConfig",
        function (
            p_$q,
            p_$injector,
            p_$location,
            p_$rootScope,
            p_clientConfig,
            undefined
        ) {
            var authInterceptorServiceFactory = {};

            var _request = function (p_settings) {
                
                p_settings.url = p_clientConfig.fincamApiUrl + p_settings.url;

                p_settings.headers = p_settings.headers || {};
                p_settings.headers["Access-Control-Allow-Origin"] = "*";
                if (p_$rootScope.token) {
                    p_settings.headers.Authorization = 'Bearer ' + p_$rootScope.token;
                }

                return p_settings;
            }

            var _responseError = function (p_rejection) {
                return p_$q.reject(p_rejection);
            }

            authInterceptorServiceFactory.request = _request;
            authInterceptorServiceFactory.responseError = _responseError;
            return authInterceptorServiceFactory;
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Modules
    // --------------------------------------------------------------------------------
    module.factory("services.localStorage", [
        "$rootScope",
        "$q",
        "$window",
        "$timeout",
        "$interval",
        "$injector",
        "services.utils",
        function (
            p_$rootScope,
            p_$q,
            p_$window,
            p_$timeout,
            p_$interval,
            p_$injector,
            p_utils,
            undefined
        ) {
            var self = ng.fincam.service.apply(this, [
                p_$rootScope,
                p_$q,
                p_$window,
                null,
                null,
                p_$timeout,
                p_$interval,
            ]);

            self.get = function (p_key) {
                var obj = window.localStorage.getItem(p_key);
                if (p_utils.isNullOrUndefined(obj)) {
                    return p_$q.when(obj);
                }

                return p_$q.when(p_utils.fromJson(obj));
            }

            self.set = function (p_key, p_obj) {
                if (p_utils.isNullOrUndefined(p_obj))
                    return self.remove(p_key);

                window.localStorage.setItem(p_key, p_utils.toJson(p_obj));
                return p_$q.resolve();
            }

            self.remove = function (p_key) {
                window.localStorage.removeItem(p_key);
                return p_$q.resolve();
            }

            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined)
{
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var m_namespace = function () { };

    // --------------------------------------------------------------------------------
    // Modules
    // --------------------------------------------------------------------------------
    module.factory("services.models", [
        "$rootScope",
        "$q",
        "$window",
        "$stateParams",
        "$state",
        "$timeout",
        "$interval",
        "services.utils",
        function (
            p_$rootScope,
            p_$q,
            p_$window,
            p_$stateParams,
            p_$state,
            p_$timeout,
            p_$interval,
            p_utils,
            undefined
        )
        {
            var self = fincam.service.apply(this, [
                p_$rootScope,
                p_$q,
                p_$window,
                p_$stateParams,
                p_$state,
                p_$timeout,
                p_$interval,
            ]);

            // --------------------------------------------------------------------------------
            // Utils
            // --------------------------------------------------------------------------------
            self.getElementTypeInfo = function (p_info)
            {
                var info;
                if (p_utils.isFunction(p_info))
                {
                    info = {
                        element: p_info
                    };
                }
                else if (p_utils.isObject(p_info)
                    && (p_utils.isFunction(p_info.element)
                        || p_utils.isObject(p_info.element)
                    )
                )
                {
                    info = p_info;
                }
                else
                {
                    info = {};
                }

                return info;
            }

            self.getElementInstance = function (p_sourceElement, p_elementType, p_info)
            {
                var element;
                if (p_utils.isObject(p_info)
                    && !p_utils.isNullOrUndefined(p_elementType))
                {
                    if (p_utils.isFunction(p_elementType)
                        && p_elementType.class === true)
                    {
                        if (!p_elementType.abstract)
                        {
                            element = self.new(p_elementType, p_sourceElement, p_info.element);
                        }
                        else
                        {
                            element = null;
                        }
                    }
                    else
                    {
                        element = p_elementType.apply(p_elementType, [p_sourceElement, p_info.element]);
                    }
                }
                else
                {
                    element = p_sourceElement;
                }

                return element;
            }

            // --------------------------------------------------------------------------------
            // Types
            // --------------------------------------------------------------------------------
            self.bool = function (p_source, p_info)
            {
                var info = p_utils.isObject(p_info) ? p_info : {};
                var defaultValue = p_utils.isBoolean(info.default) ? info.default : (info.nullable ? null : false);
                var source = p_utils.isBoolean(p_source) ? p_source : defaultValue;
                return source;
            };

            self.byte = function (p_source, p_info)
            {
                var info = p_utils.isObject(p_info) ? p_info : {};
                var defaultValue = p_utils.isInteger(info.default) ? info.default : (info.nullable ? null : 0);
                var source = p_utils.isInteger(p_source) ? p_source : defaultValue;
                var res = source;
                if (!info.nullable
                    || res !== null)
                {
                    var max = p_utils.isInteger(info.max) ? Math.min(info.max, Number.maxByteValue) : Number.maxByteValue;
                    if (res > max)
                        res = max;

                    var min = p_utils.isInteger(info.min) ? Math.max(info.min, Number.minByteValue) : Number.minByteValue;
                    if (res < min)
                        res = min;
                }

                return res;
            };

            self.byteArray = function (p_source, p_info)
            {
                var info = p_utils.isObject(p_info) ? p_info : {};
                var defaultValue = p_utils.isString(info.default) ? info.default : null;
                var source;
                if (p_utils.isByteArray(p_source))
                {
                    source = p_source.clone();
                }
                else if (p_utils.isArray(p_source))
                {
                    source = new Uint8Array(p_source);
                }
                else if (p_utils.isString(p_source))
                {
                    source = Uint8Array.decodeBase64(p_source);
                }
                else
                {
                    source = null;
                }

                return source;
            };

            self.short = function (p_source, p_info)
            {
                var info = p_utils.isObject(p_info) ? p_info : {};
                var defaultValue = p_utils.isInteger(info.default) ? info.default : (info.nullable ? null : 0);
                var source = p_utils.isInteger(p_source) ? p_source : defaultValue;
                var res = source;
                if (!info.nullable
                    || res !== null)
                {
                    var max = p_utils.isInteger(info.max) ? Math.min(info.max, Number.maxShortValue) : Number.maxShortValue;
                    if (res > max)
                        res = max;

                    var min = p_utils.isInteger(info.min) ? Math.max(info.min, Number.minShortValue) : Number.minShortValue;
                    if (res < min)
                        res = min;
                }

                return res;
            };

            self.int = function (p_source, p_info)
            {
                var info = p_utils.isObject(p_info) ? p_info : {};
                var defaultValue = p_utils.isInteger(info.default) ? info.default : (info.nullable ? null : 0);
                var source = p_utils.isString(p_source) ? parseInt(p_source) : p_source;
                source = p_utils.isInteger(source) ? source : defaultValue;
                var res = source;
                if (!info.nullable
                    || res !== null)
                {
                    var max = p_utils.isInteger(info.max) ? Math.min(info.max, Number.maxIntValue) : Number.maxIntValue;
                    if (res > max)
                        res = max;

                    var min = p_utils.isInteger(info.min) ? Math.max(info.min, Number.minIntValue) : Number.minIntValue;
                    if (res < min)
                        res = min;
                }

                return res;
            };

            self.long = function (p_source, p_info)
            {
                var info = p_utils.isObject(p_info) ? p_info : {};
                var defaultValue = p_utils.isInteger(info.default) ? info.default : (info.nullable ? null : 0);
                var source = p_utils.isInteger(p_source) ? p_source : defaultValue;
                var res = source;
                if (!info.nullable
                    || res !== null)
                {
                    var max = p_utils.isInteger(info.max) ? Math.min(info.max, Number.maxLongValue) : Number.maxLongValue;
                    if (res > max)
                        res = max;

                    var min = p_utils.isInteger(info.min) ? Math.max(info.min, Number.minLongValue) : Number.minLongValue;
                    if (res < min)
                        res = min;
                }

                return res;
            };

            self.decimal = function (p_source, p_info)
            {
                var info = p_utils.isObject(p_info) ? p_info : {};
                var defaultValue = p_utils.isNumber(info.default) ? info.default : (info.nullable ? null : 0);
                var source = p_utils.isString(p_source) ? parseFloat(p_source) : p_source;
                source = p_utils.isNumber(source) ? source : defaultValue;
                var res = source;
                if (!info.nullable
                    || res !== null)
                {
                    var max = p_utils.isInteger(info.max) ? Math.min(info.max, Number.maxDecimalNumber) : Number.maxDecimalNumber;
                    if (res > max)
                        res = max;

                    var min = p_utils.isInteger(info.min) ? Math.max(info.min, Number.minDecimalNumber) : Number.minDecimalNumber;
                    if (res < min)
                        res = min;
                }

                return res;
            };

            self.date = function (p_source, p_info)
            {
                var info = p_utils.isObject(p_info) ? p_info : {};
                var defaultValue = p_utils.isDate(info.default) ? info.default : (info.nullable ? null : Date.min());
                var source;
                if (p_utils.isDate(p_source))
                {
                    source = p_source.clone();
                }
                else if ((p_utils.isString(p_source) && !p_utils.isNullOrEmpty(p_source))
                    || p_utils.isInteger(p_source))
                {
                    source = new Date(p_source);
                }
                else
                {
                    source = defaultValue;
                }

                var res = source;
                if (!info.nullable
                    || res !== null)
                {
                    var max = p_utils.isDate(info.max) ? Math.min(info.max.getTime(), Date.maxTimestamp) : Date.maxTimestamp;
                    if (res.getTime() > max)
                        res = new Date(max);

                    var min = p_utils.isDate(info.min) ? Math.max(info.min.getTime(), Date.minTimestamp) : Date.minTimestamp;
                    if (res.getTime() > min)
                        res = new Date(min);
                }

                return source;
            };

            self.file = function (p_source, p_info)
            {
                var info = p_utils.isObject(p_info) ? p_info : {};
                var defaultValue = p_utils.isFile(info.default) ? info.default : null;
                var source = p_utils.isFile(p_source) ? p_source : defaultValue;
                return source;
            };

            self.fileList = function (p_source, p_info)
            {
                var info = p_utils.isObject(p_info) ? p_info : {};
                var defaultValue = p_utils.isFileList(info.default) ? info.default : null;
                var source = p_utils.isFileList(p_source) ? p_source : defaultValue;
                return source;
            };

            self.string = function (p_source, p_info)
            {
                var info = p_utils.isObject(p_info) ? p_info : {};
                var defaultValue = p_utils.isString(info.default) ? info.default : null;
                var source = p_utils.isString(p_source) ? p_source : defaultValue;
                return source;
            };

            self.guid = function (p_source, p_info)
            {
                var info = p_utils.isObject(p_info) ? p_info : {};
                var defaultValue = p_utils.isString(info.default) ? info.default : (info.nullable ? null : String.emptyGuid);
                var source = p_utils.isString(p_source) ? p_source : defaultValue;
                return source;
            }

            self.any = function (p_source, p_info)
            {
                var info = p_utils.isObject(p_info) ? p_info : {};
                var defaultValue = !p_utils.isNullOrUndefined(info.default) ? info.default : null;
                var source = !p_utils.isNullOrUndefined(p_source) ? p_source : defaultValue;
                return source;
            }

            self.array = function (p_source, p_info)
            {
                var info = self.getElementTypeInfo(p_info);
                var defaultValue = p_utils.isArray(info.default) ? info.default : [];
                var source = p_utils.isArray(p_source) ? p_source : defaultValue;
                var elementType = self.getType(info.element, info);
                var res = [];
                for (var i = 0; i < source.length; i++)
                {
                    var sourceElement = source[i];
                    var element = self.getElementInstance(sourceElement, elementType, info);
                    res.push(element);
                }

                return res;
            };

            self.dictionary = function (p_source, p_info)
            {
                var source = p_utils.isObject(p_source) ? p_source : {};
                var info = self.getElementTypeInfo(p_info);
                var elementType = self.getType(info.element, info);
                var res = {};
                var pis = p_utils.getProperties(p_source);
                for (var i = 0; i < pis.length; i++)
                {
                    var pi = pis[i];
                    var sourceElement = source[pi];
                    var element = self.getElementInstance(sourceElement, elementType, info);
                    res[pi] = element;
                }

                return res;
            };

            self.new = function (p_type, p_source, p_info)
            {
                var type = self.getType(p_type);
                if (!p_utils.isFunction(type)
                    || !p_utils.isBoolean(type.class)
                    || !type.class
                )
                {
                    return null;
                }

                var typeInfo = type.getTypeInfo();
                var info = p_utils.isObject(p_info) ? p_info : {};
                var defaultValue = p_utils.isObject(info.default) ? info.default : null;
                var source = p_utils.isObject(p_source) ? p_source : defaultValue;
                var res;
                if (p_utils.isFunction(typeInfo.factory))
                    res = typeInfo.factory(source, info);
                else
                    res = new type();

                if (res
                    && p_utils.isFunction(res.apply))
                {
                    res.apply(source, info);
                }

                return res;
            };

            // --------------------------------------------------------------------------------
            // Class
            // --------------------------------------------------------------------------------
            self.namespace = function (p_namespace)
            {
                if (p_utils.isFunction(p_namespace))
                {
                    return p_namespace;
                }
                else if (p_utils.isString(p_namespace)
                    && !p_utils.isNullOrUndefined(p_namespace))
                {
                    var parts = p_namespace.split('.');
                    var current = m_namespace;
                    for (var i = 0; i < parts.length; i++)
                    {
                        var namespace = parts[i];
                        if (!current[namespace])
                        {
                            current[namespace] = function () { };
                            current[namespace].parent = current;
                        }

                        current = current[namespace];
                    }

                    return current;
                }

                return m_namespace;
            }

            self.getType = function (p_type, p_info)
            {
                var info = p_info || { namespace: m_namespace };
                if (p_utils.isFunction(p_type))
                {
                    return p_type;
                }
                else if (p_utils.isString(p_type))
                {
                    var parts = p_type.split(".");
                    if (parts.length === 1)
                    {
                        var typeNamespace = self.namespace(info.namespace);
                        return typeNamespace[parts[0]] || self[parts[0]];
                    }
                    else if (parts.length > 1)
                    {
                        var typeNamespace = self.namespace(parts.slice(0, parts.length - 1).join("."));
                        return typeNamespace[parts[parts.length - 1]];
                    }
                }
                else if (p_utils.isObject(p_type)
                    && p_utils.isString(p_type.name))
                {
                    if (p_utils.isNullOrEmpty(p_type.namespace)
                        && p_utils.isFunction(self[p_type.name]))
                    {
                        return self[p_type.name];
                    }
                    else
                    {
                        var typeNamespace = self.namespace(p_type.namespace);
                        return typeNamespace[p_type.name];
                    }
                }
            }

            self.addReflection = function (p_class, p_type)
            {
                if (!p_utils.isFunction(p_class))
                    return;

                p_class.getTypeInfo = function ()
                {
                    return p_type;
                };

                p_class.getBase = function ()
                {
                    var base;
                    if (p_utils.isFunction(p_type.base))
                    {
                        base = p_type.base;
                    }
                    else if (p_utils.isObject(p_type.base))
                    {
                        var namespace = self.namespace(p_type.base.namespace);
                        base = namespace[p_type.base.name];
                    }
                    else if (p_utils.isString(p_type.base)
                        && !p_utils.isNullOrUndefined(p_type.base))
                    {
                        var parts = p_type.base.split(".");
                        if (parts.length === 1)
                        {
                            base = self[parts[0]];
                        }
                        else
                        {
                            var namespace = self.namespace(parts.slice(0, parts.length - 1).join("."));
                            base = namespace[parts[parts.length - 1]];
                        }
                    }

                    if (!p_utils.isFunction(base))
                        base = m_namespace.object;

                    return base;
                }

                p_class.getProperties = function ()
                {
                    return p_utils.getProperties(p_type.properties);
                };

                p_class.getName = function ()
                {
                    return p_type.name;
                };

                p_class.getFullName = function ()
                {
                    var arr = [];
                    var namespace = self.namespace(p_type.namespace);
                    var namespaceFullName = namespace.getFullName();
                    if (!String.isNullOrEmpty(namespaceFullName))
                        arr.add(namespaceFullName);

                    arr.add(p_type.name);
                    return arr.join(".");
                };
            }

            self.prototype = function (p_res, p_type)
            {
                var self = this;

                self.getType = function ()
                {
                    return p_res;
                }

                return self;
            }

            self.class = function (p_type)
            {
                if (!p_type
                    || !p_type.name)
                {
                    return null;
                }

                var namespace = self.namespace(p_type.namespace);
                if (namespace[p_type.name])
                    return namespace[p_type.name];

                var res = namespace[p_type.name] = function () { };
                res.class = true;
                self.addReflection(res, p_type);

                // Prototype
                res.prototype = Object.create(new self.prototype(res, p_type));
                var base = res.getBase(p_type.base);
                if (res !== base
                    && base.prototype)
                {
                    res.prototype = Object.assign(res.prototype, base.prototype);
                }

                if (p_type.prototype)
                    res.prototype = Object.assign(res.prototype, p_type.prototype);

                res.prototype.apply = function (p_source, p_info)
                {
                    if (res !== base
                        && p_utils.isFunction(base)
                        && base.class === true
                    )
                    {
                        base.prototype.apply.apply(this, [p_source]);
                    }

                    var source = p_source || {};
                    if (p_utils.isObject(p_type.properties))
                    {
                        var properties = res.getProperties();
                        for (var i = 0; i < properties.length; i++)
                        {
                            var property = properties[i];
                            var pi = p_type.properties[property];
                            var type = self.getType(pi.name || pi, pi);
                            if (p_utils.isNullOrUndefined(type))
                                continue;

                            if (type.class)
                            {
                                this[property] = self.new(type, source[property], pi);
                            }
                            else if (type === self.array
                                && p_utils.isArray(this[property]))
                            {
                                this[property].clear().append(type.apply(type, [source[property], pi]));
                            }
                            else
                            {
                                this[property] = type.apply(type, [source[property], pi]);
                            }
                        }
                    }

                    if (p_utils.isFunction(p_type.init))
                        p_type.init.apply(this, [p_info]);
                };

                return res;
            }

            self.enum = function (p_type)
            {
                if (!p_type
                    || !p_type.name)
                {
                    return null;
                }

                var namespace = self.namespace(p_type.namespace);
                if (namespace[p_type.name])
                    return null;

                var res = p_type.namespace[p_type.name] = function (p_source, p_info)
                {
                    var defaultValue = p_utils.isInteger(p_info.default) ? p_info.default : (p_info.nullable ? null : this.values[0]);
                    var source = p_utils.isInteger(p_source) && this.values.contains(p_source) ? p_source : defaultValue;
                    return source;
                };

                res.enum = true;
                res.keys = p_utils.getProperties(p_type.values);
                res.values = [];
                for (var i = 0; i < res.keys.length; i++)
                {
                    var key = res.keys[i];
                    var value = p_type.values[key];
                    res.values.add(res[key] = value);
                }

                res.getSelectOptions = function ()
                {
                    return self.array(res.keys.asEnumerable().select(function (p_key)
                    {
                        var text, value;
                        if (p_type.descriptions)
                            text = p_type.descriptions[p_key] || p_key;
                        else
                            text = p_key;

                        value = p_type.values[p_key];
                        return {
                            text: text,
                            value: value
                        };
                    }).toArray(), self.selectOption);
                }

                res.getDescription = function (p_value)
                {
                    var key = res.keys.asEnumerable().firstOrDefault(function (p_key)
                    {
                        return p_type.values[p_key] === p_value;
                    });

                    if (!key)
                        return null;

                    return p_type.descriptions[key];
                }

                self.addReflection(res, p_type);
                res.prototype = Object.create(new self.prototype(res, p_type));
                return res;
            }

            // --------------------------------------------------------------------------------
            // Object
            // --------------------------------------------------------------------------------
            self.class({
                name: "object",
                properties: {
                },
                prototype: new function ()
                {
                    var self = this;
                    self.equals = function (p_obj)
                    {
                        var self = this;
                        return self === p_obj;
                    }

                    return self;
                }
            });

            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var common = p_models.namespace("fincam.common");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: common,
                name: "authResult",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    token: "string",
                    errorMsgs: {
                        name: "array",
                        element: "string"
                    }
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var common = p_models.namespace("fincam.common");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: common,
                name: "customerProfile",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    customerId: "int",
                    customerAddressLine1: "string",
                    customerAddressLine2: "string",
                    customerAltMobileNo: "string",
                    customerCity: "string",
                    customerCode: "string",
                    customerEmail: "string",
                    customerMobileNo: "string",
                    customerName: "string"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var common = p_models.namespace("fincam.common");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: common,
                name: "fincamSaveActionResult",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    result: "string",
                    errorMsgs: {
                        name: "array",
                        element: "string"
                    }
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var common = p_models.namespace("fincam.common");
            var config = p_models.namespace("fincam.config");
            var commonSubscription = p_models.namespace("fincam.common.subscription");
            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: common,
                name: "paymentOrderModel",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    order_id: {
                        name: "string"
                    },
                    key: {
                        name: "string"
                    },
                    amount: {
                        name: "int"
                    },
                    currency: {
                        name: "string"
                    },
                    name: {
                        name: "string"
                    },
                    email: {
                        name: "string"
                    },
                    contactNumber: {
                        name: "string"
                    },
                    address: {
                        name: "string"
                    },
                    description: {
                        name: "string"
                    },
                    prefill:{
                        namespace: commonSubscription,
                        name:"prefill"
                    }
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var common = p_models.namespace("fincam.common");
            var config = p_models.namespace("fincam.config");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: common,
                name: "paymentOrderResponse",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    status: {
                        name: "bool"
                    },
                    paymentOrderModel: {
                        namespace: common,
                        name:"paymentOrderModel"
                    },
                    message: {
                        name: "string"
                    }
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var common = p_models.namespace("fincam.common");
            var config = p_models.namespace("fincam.config");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: common,
                name: "userProfile",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    user: {
                        namespace: config,
                        name: "configUser"
                    },
                    role: {
                        namespace: config,
                        name: "configRole"
                    },
                    customerId: {
                        name: "int",
                        nullable: true
                    },
                    vendorId: {
                        name: "int",
                        nullable: true
                    },
                    freeLancerId: {
                        name: "int",
                        nullable: true
                    }

                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var common = p_models.namespace("fincam.common");
            var vendor = p_models.namespace("fincam.master.vendor");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: common,
                name: "vendorProfile",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    freeLancer: {
                        namespace: vendor,
                        name: "masterVendor"
                    },
                    address: {
                        namespace: vendor,
                        name: "masterVendorAddress"
                    },
                    packages: {
                        name: "array",
                        element: {
                            namespace: vendor,
                            name: "masterVendorPackages"
                        }
                    },
/*                    services: {
                        name: "array",
                        element: {
                            namespace: vendor,
                            name: "masterVendorServiceMap"
                        }
                    }*/
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var config = p_models.namespace("fincam.config");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: config,
                name: "configRole",
                base: {
                    namespace: fincam,
                    name: "logModel"
                },
                properties: {
                    id: "int",
                    name: "string",
                    type: "string",
                    isactive: "int"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var config = p_models.namespace("fincam.config");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: config,
                name: "configUser",
                base: {
                    namespace: fincam,
                    name: "logModel"
                },
                properties: {
                    id: "int",
                    userName: "string",
                    email: "string",
                    phoneNumber: "string",
                    userIdentifier: "int",
                    name: "string",
                    password: "string",
                    isactive: "string"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var transaction = p_models.namespace("fincam.transaction");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: transaction,
                name: "trnProject",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    id: "int",
                    identifier: "string",
                    code: "int",
                    projectName: "string",
                    createdDate: "date",
                    projectDate: "date",
                    vendorId: "int",
                    customerId: "int",
                    gstNo: "string",
                    photographer: "int",
                    designer: "int",
                    projectValue: "number",
                    advanceAmt: "number",
                    folder: "string",
                    equipments: "string",
                    key: "string",
                    url: "string",
                    status: "string",
                    isActive: "int",
                    batch: "int",
                    bBatch: "int",
                    fileCount: "int",
                    customerCode: "int",
                    customerName: "string",
                    customerEmail: "string",
                    customerMobileNo: "string",
                    customerAlternateMobileNo: "string",
                    customerAddress1: "string",
                    customerAddress2: "string",
                    customerCity: "string",
                    customerPin:"string"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var transaction = p_models.namespace("fincam.transaction");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: transaction,
                name: "trnProjectFiles",
                base: {
                    namespace: fincam,
                    name: "logModel"
                },
                properties: {
                    id:  "int",
                    fileName: "string",
                    contentLength:  "int",
                    contentType: "string",
                    isApproved: "int",
                    currentApprovedState:"bool",
                    approvedBy: "string",
                    approvedDate: "string",
                    thumbnail:"int"
                },
                init: function (p_info) {
                    var self = this;
                    self.currentApprovedState = (self.isApproved === 1);
                    return self;
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var transaction = p_models.namespace("fincam.transaction");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: transaction,
                name: "trnVendorCustomerReview",
                base: {
                    namespace: fincam,
                    name: "logModel"
                },
                properties: {
                    id: "int",
                    vendor_id:"int",
                    title:"string",
                    body:"string",
                    ratings:"int",
                    is_show:"bool"
                },
                init: function (p_info) {
                    var self = this;
                    return self;
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var commonSubscription = p_models.namespace("fincam.common.subscription");
            var config = p_models.namespace("fincam.config");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: commonSubscription,
                name: "paymentRequestModel",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    checkout_logo: {
                        name: "string"
                    },
                    custom_branding: {
                        name: "bool"
                    },
                    org_logo: {
                        name: "string"
                    },
                    checkout_logo: {
                        name: "string"
                    },
                    org_name: {
                        name: "string"
                    },
                    razorpay_payment_id: {
                        name: "string"
                    },
                    razorpay_order_id: {
                        name: "string"
                    },
                    razorpay_signature: {
                        name:"string"
                    }
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var commonSubscription = p_models.namespace("fincam.common.subscription");
            var config = p_models.namespace("fincam.config");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: commonSubscription,
                name: "prefill",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    name: {
                        name: "string"
                    },
                    email: {
                        name: "string"
                    },
                    contact: {
                        name: "string"
                    }
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var commonProjects = p_models.namespace("fincam.common.projects");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: commonProjects,
                name: "latestProjectFiles",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    Id: "int",
                    photographerName: "string",
                    encodedImage: "string",
                    projectId: "int",
                    projectIdentifier:"string"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var customer = p_models.namespace("fincam.master.customer");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: customer,
                name: "masterCustomer",
                base: {
                    namespace: fincam,
                    name: "logModel"
                },
                properties: {
                    id: "int",
                    code: "int",
                    name: "string",
                    email: "string",
                    mobile: "string",
                    alternateMobile: "string",
                    pincode: "string",
                    addressLine1: "string",
                    addressLine2: "string",
                    cityGeoId: "int",
                    city: "string",
                    stateGeoId: "int",
                    state: "string",
                    isactive: "int",
                    password:"string"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var vendor = p_models.namespace("fincam.master.vendor");
            var commonVendor = p_models.namespace("fincam.common.vendor");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: commonVendor,
                name: "vendorDetailSearchResult",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    id:"int",
                    vendor: {
                        namespace: vendor,
                        name: "masterVendor"
                    },
                    rating: {
                        namespace: commonVendor,
                        name: "vendorRating"
                    },
                    isShortlisted: "bool",
                    totalLikes: "int",
                    pricePerDay: {
                        name: "decimal",
                        nullable: true
                    },
                    address: {
                        namespace: vendor,
                        name: "masterVendorAddress"
                    },
                    packages: {
                        name: "array",
                        element: {
                            namespace: vendor,
                            name: "masterVendorPackages"
                        }
                    },
                    services: {
                        name: "array",
                        element: {
                            namespace: vendor,
                            name: "masterVendorService"
                        }
                    }
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var commonVendor = p_models.namespace("fincam.common.vendor");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: commonVendor,
                name: "vendorRating",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    value: "int",
                    totalReviews: "int"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var commonVendor = p_models.namespace("fincam.common.vendor");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: commonVendor,
                name: "vendorSearchQuery",
                base: {
                    namespace: fincam,
                    name: "paginationQuery"
                },
                properties: {
                    vendorTypeId: {
                        name: "int",
                        nullable: true
                    },
                    geoCityId: {
                        name: "int",
                        nullable: true
                    },
                    search: "string",
                    customerId: {
                        name: "int",
                        nullable: true
                    }
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var commonVendor = p_models.namespace("fincam.common.vendor");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: commonVendor,
                name: "vendorSearchResult",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    id:"int",
                    type: "string",
                    name: "string",
                    rating: {
                        namespace: commonVendor,
                        name: "vendorRating"
                    },
                    location: "string",
                    isShortlisted:"bool"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var geo = p_models.namespace("fincam.master.geo");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: geo,
                name: "masterGeo",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    id:  "int",
                    geoCode: "string",
                    geoName:  "string",
                    geoHead: "string",
                    geoLevel: "string",
                    geoType: "string",
                    geoTinNo: {
                        name: "int",
                        nullable: true
                    },
                    geoStateCode: "string",
                    geoLatitude:
                    {
                        name: "number",
                        nullable: true
                    },
                    geoLongitude: {
                        name: "number",
                        nullable: true
                    },
                    isactive: "int"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var geo = p_models.namespace("fincam.master.geo");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: geo,
                name: "masterGeoLevel",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    id:  "int",
                    geoLevelCode: "int",
                    geoLevelName:  "string",
                    geoLevelIsactive: "int"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var geo = p_models.namespace("fincam.master.geo");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: geo,
                name: "masterGeoType",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    id:  "int",
                    geoTypeCode: "int",
                    geoTypeName:  "string",
                    geoTypeIsactive: "int"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var subscription = p_models.namespace("fincam.master.subscription");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: subscription,
                name: "masterSubscription",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    id: "int",
                    name: "string",
                    price: "decimal",
                    projectCount: "int",
                    pricePerProject:
                    {
                        name: "decimal",
                        nullable: true
                    },
                    durationMonths: "int",
                    description: "string",
                    durationDays: "int"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var lov = p_models.namespace("fincam.master.lov");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: lov,
                name: "masterLov",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    id:  "int",
                    desc: "string",
                    type:  "string",
                    parentId: "int",
                    isactive: "int"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var vendor = p_models.namespace("fincam.master.vendor");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: vendor,
                name: "masterVendor",
                base: {
                    namespace: fincam,
                    name: "logModel"
                },
                properties: {
                    id:  "int",
                    name: "string",
                    typeId:  "int",
                    email: "string",
                    mobile: "string",
                    description: "string",
                    paymentTerms: "string",
                    additionalCost: "string",
                    experienceLovId: "int",
                    siteUrl: "string",
                    fbUrl: "string",
                    instagramUrl: "string",
                    youtubeUrl: "string",
                    isactive: "int",
                    password: "string"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var vendor = p_models.namespace("fincam.master.vendor");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: vendor,
                name: "masterVendorAddress",
                base: {
                    namespace: fincam,
                    name: "logModel"
                },
                properties: {
                    id: "int",
                    freeLancerId:"int",
                    pincode: "string",
                    addressLine1:  "string",
                    addressLine2: "string",
                    landmark: "string",
                    cityGeoId: "int",
                    stateGeoId: "int",
                    isprimary: "int",
                    isactive: "int"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var vendor = p_models.namespace("fincam.master.vendor");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: vendor,
                name: "masterVendorFiles",
                base: {
                    namespace: fincam,
                    name: "logModel"
                },
                properties: {
                    id: "int",
                    fileName: "string",
                    contentLength: "int",
                    contentType: "string",
                    fileType: "string"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var vendor = p_models.namespace("fincam.master.vendor");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: vendor,
                name: "masterVendorPackage",
                base: {
                    namespace: fincam,
                    name: "logModel"
                },
                properties: {
                    id: "int",
                    freeLancerId: "int",
                    description: "string",
                    pricePerDay: "decimal"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var vendor = p_models.namespace("fincam.master.vendor");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: vendor,
                name: "masterService",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    desc: "string",
                    typeId:  "int",
                    isactive: "int"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var vendor = p_models.namespace("fincam.master.vendor");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: vendor,
                name: "masterVendorServiceMap",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    vendorId:  "int",
                    serviceId: "int"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var vendor = p_models.namespace("fincam.master.vendor");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: vendor,
                name: "masterVendorSubscriptions",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    id:"int",
                    freeLancerId: "int",
                    subscriptionId: "int",
                    validFrom: "date",
                    validTill: {
                        name: "date",
                        nullable: true
                    }
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var vendor = p_models.namespace("fincam.master.vendor");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: vendor,
                name: "masterVendorType",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    id:"int",
                    type: "string",
                    isactive: "int"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var album = p_models.namespace("fincam.master.vendor.album");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: album,
                name: "masterVendorAlbum",
                base: {
                    namespace: fincam,
                    name: "logModel"
                },
                properties: {
                    id:  "int",
                    albumTitle: "string",
                    albumNote:  "string",
                    albumLocation: "string",
                    isactive: "int"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var album = p_models.namespace("fincam.master.vendor.album");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: album,
                name: "masterVendorAlbumFiles",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    id: "int",
                    albumId: "int",
                    vendorFileId: "int"
                },
                prototype: new function () {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined)
{
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        )
        {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: fincam,
                name: "model",
                properties: {
                },
                prototype: new function ()
                {
                    var self = this;
                    return self;
                }
            });

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: fincam,
                name: "logModel",
                base: {
                    namespace: fincam,
                    name: "model"
                },
                properties: {
                    createdBy: "string",
                    createdDate: {
                        name: "date",
                        nullable: true
                    },
                    updatedBy: "string",
                    updatedDate: {
                        name: "date",
                        nullable: true
                    }
                },
                prototype: new function ()
                {
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined)
{
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        )
        {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: fincam,
                name: "paginationQuery",
                properties: {
                    recordsPerPage: {
                        name: "int",
                        default: 10
                    },
                    pageIndex: "int"
                },
                prototype: new function ()
                {   
                    var self = this;
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined)
{
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        )
        {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");

            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                namespace: fincam,
                name: "paginationResults",
                properties: {
                    pageRecords: "array",
                    recordsTotal: "int",
                    recordsPerPage: "int",
                    pagesTotal: "int",
                    pageIndex: "int",
                    tags: "string",
                    firstRecordNumber: "int",
                    lastRecordNumber: "int"
                },
                prototype: new function ()
                {
                    var self = this;
                    self.getRecordsTotalText = function (p_limit)
                    {
                        var self = this;
                        var limit = p_utils.isInteger(p_limit) && p_limit > 0 ? p_limit : 10000;
                        var check = limit + self.pageIndex * self.recordsPerPage;
                        if (self.recordsTotal === check)
                            return "(" + self.recordsTotal.formatThousands() + "+)";
                        else
                            return "(" + self.recordsTotal.formatThousands() + ")";
                    }

                    return self;
                },
                init: function (p_info)
                {
                    var self = this;
                    var info = p_models.getElementTypeInfo(p_info);
                    if (info
                        && info.element)
                    {
                        var elementType = p_models.getType(info.element, info);
                        for (var i = 0; i < self.pageRecords.length; i++)
                        {
                            self.pageRecords[i] = p_models.getElementInstance(self.pageRecords[i], elementType, info);
                        }
                    }

                    self.firstRecordNumber = self.pageIndex * self.recordsPerPage + 1;
                    self.lastRecordNumber = Math.min((self.pageIndex) * self.recordsPerPage + self.recordsPerPage, self.recordsTotal);
                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined)
{
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Model
    // --------------------------------------------------------------------------------
    module.run([
        "services.utils",
        "services.models",
        function (
            p_utils,
            p_models
        )
        {
            // --------------------------------------------------------------------------------
            // Model
            // --------------------------------------------------------------------------------
            p_models.class({
                name: "selectOption",
                properties: {
                    text: "string",
                    value: "string",
                    group: "string",
                    tag: "any"
                },
                prototype: new function ()
                {
                    var self = this;
                    return self;
                },
                init: function (p_info)
                {
                    var self = this;
                    if (p_utils.isNullOrEmpty(self.group))
                        self.group = undefined;

                    return self;
                }
            });
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var apiName = "accountApi";
    var url = "/api/account";

    // --------------------------------------------------------------------------------
    // Resources
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName + "Resources", [
        "$resource",
        function (p_$resource) {
            var actions = ng.fincam.resource.apply({}, [url, {
                registerVendor: { method: "POST", url: "register-vendor" },
                registerCustomer: { method: "POST", url: "register-customer" },
                registerFreelancer: { method: "POST", url: "register-freelancer" },
                connect: { method: "POST", url: "connect" },
                getUser: { method: "GET", url: "get-user" },
                getCustomer: { method: "GET", url: "get-customer" }
            }]);

            return p_$resource(url, {}, actions);
        }
    ]);

    // --------------------------------------------------------------------------------
    // Modules
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName, [
        "$rootScope",
        "$q",
        "$window",
        "$stateParams",
        "$state",
        "$timeout",
        "$interval",
        "services.utils",
        "services.models",
        "api." + apiName + "Resources",
        function (
            p_$rootScope,
            p_$q,
            p_$window,
            p_$stateParams,
            p_$state,
            p_$timeout,
            p_$interval,
            p_utils,
            p_models,
            p_resources,
            undefined
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var common = p_models.namespace("fincam.common");
            var customer = p_models.namespace("fincam.master.customer");
            // --------------------------------------------------------------------------------
            // Modules
            // --------------------------------------------------------------------------------
            var self = ng.fincam.api.apply(this, [
                p_$rootScope,
                p_$q,
                p_$window,
                p_$stateParams,
                p_$state,
                p_$timeout,
                p_$interval,
                p_utils,
                p_models,
                p_resources,
                common.authResult
            ]);

            self.registerVendor = function (p_vendor) {
                return p_resources.registerVendor({}, p_vendor).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }

            self.registerCustomer = function (p_customer) {
                return p_resources.registerCustomer({}, p_customer).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }
            self.registerFreelancer = function (p_freelancer) {
                return p_resources.registerFreelancer({}, p_freelancer).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }
            self.connect = function (p_request) {
                return p_resources.connect({}, p_request).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }

            self.getUser = function () {
                return p_resources.getUser({}).$promise
                    .then(function (p_result) {
                        return p_models.new(common.userProfile, p_result);
                    }, self.handleError, self.handleNotify);
            }

            self.getCustomer = function (p_request) {
                return p_resources.getCustomer(p_request).$promise
                    .then(function (p_result) {
                        return p_models.new(common.customerProfile, p_result)
                    }, self.handleError, self.handleNotify);
            }

            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var processMethod = function (p_url, p_method) {
        p_method.url = p_url + "/" + p_method.url;
        p_method.ignoreLoadingBar = true;
        if (p_method.isLiteral) {
            p_method.transformResponse = function (data) {
                return {
                    responseData: data.toString()
                }
            };
        }
        else if (p_method.isForm) {
            p_method.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
            p_method.transformRequest = function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));

                return str.join("&");
            };
        }
        else if (p_method.isMultipartForm) {
            p_method.headers = {
                "Content-Type": undefined
            };

            p_method.transformRequest = function (p_files) {
                if (fincam.isNullOrUndefined(p_files))
                    return p_files;

                var formData = new FormData();
                var files = (p_files instanceof FileList || fincam.isArray(p_files)) && p_files.length ? p_files : [p_files];
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    var filename = file.name;
                    if (filename)
                        formData.append("file[" + i + "]", file, filename);
                    else
                        formData.append("file[" + i + "]", file);
                }

                return formData;
            }
        }
        else if (p_method.isBlob) {
            p_method.responseType = "arraybuffer";
            p_method.transformResponse = function (p_data, p_headers) {
                return {
                    response: new Blob([p_data], { type: p_method.contentType || "application/octet-stream" }),
                    headers: JSON.parse(p_headers("fincam-response-header"))
                }
            }
        }
    }

    var processResources = function (p_url, p_resources) {
        var pis = Object.keys(p_resources);
        for (var i = 0; i < pis.length; i++) {
            var pi = pis[i];
            var method = p_resources[pi];
            processMethod(p_url, method);
        }
    }

    // --------------------------------------------------------------------------------
    // Resource
    // --------------------------------------------------------------------------------
    fincam.resource = function (p_url, p_actions) {
        var self = Object.assign(p_actions || {}, Object.assign(this, {
            getAll: { method: "GET", url: "get-all", isArray: true },
            getById: { method: "GET", url: "get-by-id/:id" },
            getByIds: { method: "POST", url: "get-by-ids", isArray: true },
            insert: { method: "POST", url: "insert" },
            replace: { method: "PUT", url: "replace" },
            delete: { method: "DELETE", url: "delete/:id" },
        }));

        processResources(p_url, self);
        return self;
    }

    // --------------------------------------------------------------------------------
    // Api
    // --------------------------------------------------------------------------------
    fincam.baseApi = function (
        p_$rootScope,
        p_$q,
        p_$window,
        p_$stateParams,
        p_$state,
        p_$timeout,
        p_$interval,
        p_utils,
        p_models,
        p_resources,
        p_type,
        undefined
    ) {
        var self = this;
        self.type = p_type;
        self.new = function (p_model, p_type) {
            if (!p_utils.isNullOrUndefined(p_model.$promise)
                && p_model.$resolved === true
                && p_utils.getProperties(p_model).length === 2) {
                return null;
            }

            return p_model ? p_models.new(p_type || self.type, p_model) : null;
        }

        self.array = function (p_results, p_type) {
            return p_models.array(p_results, p_type || self.type);
        }

        self.pagination = function (p_results, p_type) {
            var fincam = p_models.namespace("fincam");
            return p_models.new(p_type || fincam.paginationResults, p_results, {
                element: self.type
            });
        }

        self.handleSuccess = function (p_result) {
            return p_$q.resolve(p_result);
        }

        self.handleNotify = function (p_progress) {
            return p_$q.notify(p_progress);
        }

        self.handleError = function (p_error) {
            var errorMessage;
            if (!p_utils.isNullOrUndefined(p_error)) {
                if (p_error.statusText || p_error.xhrStatus) {
                    errorMessage = p_error.statusText || p_error.xhrStatus;
                } else {
                    errorMessage = p_error.toString();
                }
            }
            else {
                errorMessage = "Unknown error";
            }

            console.log(p_error);
            return p_$q.reject(p_error);
        }

        return self;
    }

    fincam.api = function (
        p_$rootScope,
        p_$q,
        p_$window,
        p_$stateParams,
        p_$state,
        p_$timeout,
        p_$interval,
        p_utils,
        p_models,
        p_resources,
        p_type,
        undefined
    ) {
        var self = fincam.baseApi.apply(this, [
            p_$rootScope,
            p_$q,
            p_$window,
            p_$stateParams,
            p_$state,
            p_$timeout,
            p_$interval,
            p_utils,
            p_models,
            p_resources,
            p_type,
        ]);

        self.getAll = function (p_init) {
            var params = {};
            if (p_init === false)
                params.init = false;

            return p_resources.getAll(params).$promise
                .then(self.array, self.handleError, self.handleNotify);
        };

        self.getById = function (p_id, p_init) {
            var params = { id: p_id };
            if (p_init === false)
                params.init = false;

            return p_resources.getById(params).$promise
                .then(self.new, self.handleError, self.handleNotify);
        };

        self.getByIds = function (p_ids, p_init) {
            var params = {};
            if (p_init === false)
                params.init = false;

            return p_resources.getByIds(params, p_ids).$promise
                .then(self.array, self.handleError, self.handleNotify);
        };

        self.insert = function (p_model) {
            return p_resources.insert({}, p_model).$promise
                .then(self.new, self.handleError, self.handleNotify);
        }

        self.replace = function (p_model) {
            return p_resources.replace({}, p_model).$promise
                .then(self.new, self.handleError, self.handleNotify);
        }

        self.delete = function (p_id) {
            return p_resources.delete({ id: p_id }).$promise
                .then(self.handleSuccess, self.handleError, self.handleNotify);
        }

        return self;
    }
})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var apiName = "projectApi";
    var url = "/api/transaction/project";

    // --------------------------------------------------------------------------------
    // Resources
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName + "Resources", [
        "$resource",
        function (p_$resource) {
            var actions = ng.fincam.resource.apply({}, [url, {
                getByVendor: { method: "GET", url: "get-by-vendor", isArray: true },
                getByCustomer: { method: "GET", url: "get-by-customer", isArray: true },
                getByFreelancer: { method: "GET", url: "get-by-freelancer", isArray: true },
                getByFreelancerWithStatus: { method: "GET", url: "get-by-freelancer/:projectStatus", isArray: true },
                add: { method: "POST", url: "add",isArray:false },
                modify: { method: "POST", url: "modify" },
                getByIdentifier: { method: "GET", url: "get-by-identifier/:identifier" },
                authenticatePin: { method: "POST", url: "authenticate-pin" },
                approveProject: { method: "POST", url: "approve-project/:projectId" }
            }]);

            return p_$resource(url, {}, actions);
        }
    ]);

    // --------------------------------------------------------------------------------
    // Modules
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName, [
        "$rootScope",
        "$q",
        "$window",
        "$stateParams",
        "$state",
        "$timeout",
        "$interval",
        "services.utils",
        "services.models",
        "api." + apiName + "Resources",
        "clientConfig",
        function (
            p_$rootScope,
            p_$q,
            p_$window,
            p_$stateParams,
            p_$state,
            p_$timeout,
            p_$interval,
            p_utils,
            p_models,
            p_resources,
            p_clientConfig,
            undefined
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var transaction = p_models.namespace("fincam.transaction");
            var common = p_models.namespace("fincam.common");

            // --------------------------------------------------------------------------------
            // Modules
            // --------------------------------------------------------------------------------
            var self = ng.fincam.api.apply(this, [
                p_$rootScope,
                p_$q,
                p_$window,
                p_$stateParams,
                p_$state,
                p_$timeout,
                p_$interval,
                p_utils,
                p_models,
                p_resources,
                transaction.trnProject
            ]);

            self.getByVendor = function () {
                return p_resources.getByVendor({}).$promise
                    .then(self.array, self.handleError, self.handleNotify);
            };

            self.getByCustomer = function () {
                return p_resources.getByCustomer({}).$promise
                    .then(self.array, self.handleError, self.handleNotify);
            };
            self.getByFreelancer = function () {
                return p_resources.getByFreelancer({}).$promise
                    .then(self.array, self.handleError, self.handleNotify);
            };
            self.getByFreelancerWithStatus = function (projectStatus) {
                return p_resources.getByFreelancerWithStatus({ 'projectStatus': projectStatus}).$promise
                    .then(self.array, self.handleError, self.handleNotify);
            }
            self.add = function (p_project) {
                return p_resources.add({}, p_project).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }

            self.modify = function (p_project) {
                return p_resources.modify({}, p_project).$promise
                    .then(function (p_result) {
                        return p_models.new(common.fincamSaveActionResult, p_result);
                    }, self.handleError, self.handleNotify);
            }

            self.getDefaultPresentationSrc = function (p_projectId) {
                return p_$q.resolve(p_clientConfig.fincamApiUrl + url + "/get-default-presentation/" + p_projectId + "?t=" + p_$rootScope.token);
            }

            self.getByIdentifier = function (p_identifier) {
                return p_resources.getByIdentifier({ identifier: p_identifier }).$promise
                    .then(self.new, self.handleError, self.handleNotify);
            }

            self.authenticatePin = function (p_project) {
                return p_resources.authenticatePin({}, p_project).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }

            self.approveProject = function (p_projectId) {
                return p_resources.approveProject({ projectId: p_projectId }, null).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }

            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var apiName = "projectFilesApi";
    var url = "/api/transaction/project/file";

    // --------------------------------------------------------------------------------
    // Resources
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName + "Resources", [
        "$resource",
        function (p_$resource) {
            var actions = ng.fincam.resource.apply({}, [url, {
                getByProject: { method: "GET", url: "get-by-project/:projectId", isArray: true },
                updateSelection: { method: "POST", url: "update-selection" },
                getLatestProjectFiles: { method: "GET", url: "get-latest-files", isArray: true },
            }]);

            return p_$resource(url, {}, actions);
        }
    ]);

    // --------------------------------------------------------------------------------
    // Modules
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName, [
        "$rootScope",
        "$q",
        "$window",
        "$stateParams",
        "$state",
        "$timeout",
        "$interval",
        "services.utils",
        "services.models",
        "api." + apiName + "Resources",
        "clientConfig",
        function (
            p_$rootScope,
            p_$q,
            p_$window,
            p_$stateParams,
            p_$state,
            p_$timeout,
            p_$interval,
            p_utils,
            p_models,
            p_resources,
            p_clientConfig,
            undefined
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var transaction = p_models.namespace("fincam.transaction");
            var common = p_models.namespace("fincam.common");

            // --------------------------------------------------------------------------------
            // Modules
            // --------------------------------------------------------------------------------
            var self = ng.fincam.api.apply(this, [
                p_$rootScope,
                p_$q,
                p_$window,
                p_$stateParams,
                p_$state,
                p_$timeout,
                p_$interval,
                p_utils,
                p_models,
                p_resources,
                transaction.trnProjectFiles
            ]);

            self.getByProject = function (p_projectId) {
                return p_resources.getByProject({ projectId: p_projectId }).$promise
                    .then(self.array, self.handleError, self.handleNotify);
            };

            self.getDefaultPresentationSrc = function (p_fileId, p_projectIdentifier) {
                return p_clientConfig.fincamApiUrl + url + "/get-default-presentation/" + p_fileId + "/" + p_projectIdentifier + "?t=" + p_$rootScope.token;
            }

            self.updateSelection = function (p_files) {
                return p_resources.updateSelection({}, p_files).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }
            self.getLatestProjectFiles = function () {
                return p_resources.getLatestProjectFiles({}).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }
            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var apiName = "masterGeoApi";
    var url = "/api/master/geo";

    // --------------------------------------------------------------------------------
    // Resources
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName + "Resources", [
        "$resource",
        function (p_$resource) {
            var actions = ng.fincam.resource.apply({}, [url, {
                getByParams: { method: "GET", url: "get-by-params/:levelId/:parentId", isArray: true },
                getOperationalCityList: { method: "GET", url: "get-operational-city-list", isArray: true }
            }]);

            return p_$resource(url, {}, actions);
        }
    ]);

    // --------------------------------------------------------------------------------
    // Modules
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName, [
        "$rootScope",
        "$q",
        "$window",
        "$stateParams",
        "$state",
        "$timeout",
        "$interval",
        "services.utils",
        "services.models",
        "api." + apiName + "Resources",
        function (
            p_$rootScope,
            p_$q,
            p_$window,
            p_$stateParams,
            p_$state,
            p_$timeout,
            p_$interval,
            p_utils,
            p_models,
            p_resources,
            undefined
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var geo = p_models.namespace("fincam.master.geo");

            // --------------------------------------------------------------------------------
            // Modules
            // --------------------------------------------------------------------------------
            var self = ng.fincam.api.apply(this, [
                p_$rootScope,
                p_$q,
                p_$window,
                p_$stateParams,
                p_$state,
                p_$timeout,
                p_$interval,
                p_utils,
                p_models,
                p_resources,
                geo.masterGeo
            ]);

            self.getByParams = function (p_levelId,p_parentId) {
                return p_resources.getByParams({ levelId: p_levelId, parentId: p_parentId }).$promise
                    .then(self.array, self.handleError, self.handleNotify);
            };

            self.getOperationalCityList = function () {
                return p_resources.getOperationalCityList({ }).$promise
                    .then(self.array, self.handleError, self.handleNotify);
            };

            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var apiName = "masterLovApi";
    var url = "/api/master/lov";

    // --------------------------------------------------------------------------------
    // Resources
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName + "Resources", [
        "$resource",
        function (p_$resource) {
            var actions = ng.fincam.resource.apply({}, [url, {
                getByType: { method: "GET", url: "get-by-type/:type",isArray:true }
            }]);

            return p_$resource(url, {}, actions);
        }
    ]);

    // --------------------------------------------------------------------------------
    // Modules
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName, [
        "$rootScope",
        "$q",
        "$window",
        "$stateParams",
        "$state",
        "$timeout",
        "$interval",
        "services.utils",
        "services.models",
        "api." + apiName + "Resources",
        function (
            p_$rootScope,
            p_$q,
            p_$window,
            p_$stateParams,
            p_$state,
            p_$timeout,
            p_$interval,
            p_utils,
            p_models,
            p_resources,
            undefined
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var lov = p_models.namespace("fincam.master.lov");

            // --------------------------------------------------------------------------------
            // Modules
            // --------------------------------------------------------------------------------
            var self = ng.fincam.api.apply(this, [
                p_$rootScope,
                p_$q,
                p_$window,
                p_$stateParams,
                p_$state,
                p_$timeout,
                p_$interval,
                p_utils,
                p_models,
                p_resources,
                lov.masterLov
            ]);

            self.getByType = function (p_type) {
                return p_resources.getByType({ type: p_type }).$promise
                    .then(self.array, self.handleError, self.handleNotify);
            };

            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var apiName = "masterVendorApi";
    var url = "/api/master/freelancer";

    // --------------------------------------------------------------------------------
    // Resources
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName + "Resources", [
        "$resource",
        function (p_$resource) {
            var actions = ng.fincam.resource.apply({}, [url, {
                getProfile: { method: "GET", url: "get-profile" },
                getDetail: { method: "GET", url: "get-vendor-detail/:vendorId/:customerId" },
                updateProfile: { method: "POST", url: "update-profile" },
                query: { method: "POST", url: "query-vendor" },
                getShortlistedVendors: { method: "GET", url: "get-shortlisted" },
                toggleVendorSelection: { method: "POST", url: "toggle-vendor-selection/:vendorId" }
            }]);

            return p_$resource(url, {}, actions);
        }
    ]);

    // --------------------------------------------------------------------------------
    // Modules
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName, [
        "$rootScope",
        "$q",
        "$window",
        "$stateParams",
        "$state",
        "$timeout",
        "$interval",
        "services.utils",
        "services.models",
        "api." + apiName + "Resources",
        "clientConfig",
        function (
            p_$rootScope,
            p_$q,
            p_$window,
            p_$stateParams,
            p_$state,
            p_$timeout,
            p_$interval,
            p_utils,
            p_models,
            p_resources,
            p_clientConfig,
            undefined
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var vendor = p_models.namespace("fincam.master.vendor");
            var common = p_models.namespace("fincam.common");
            var commonVendor = p_models.namespace("fincam.common.vendor");

            // --------------------------------------------------------------------------------
            // Modules
            // --------------------------------------------------------------------------------
            var self = ng.fincam.api.apply(this, [
                p_$rootScope,
                p_$q,
                p_$window,
                p_$stateParams,
                p_$state,
                p_$timeout,
                p_$interval,
                p_utils,
                p_models,
                p_resources,
                vendor.masterVendor
            ]);

            self.getProfile = function () {
                return p_resources.getProfile({}).$promise
                    .then(function (p_result) {
                        return p_models.new(common.vendorProfile, p_result);
                    }, self.handleError, self.handleNotify);
            };

            self.getDetail = function (p_vendorId, p_customerId) {
                return p_resources.getDetail({ vendorId: p_vendorId, customerId: p_customerId }).$promise
                    .then(function (p_result) {
                        return p_models.new(commonVendor.vendorDetailSearchResult, p_result);
                    }, self.handleError, self.handleNotify);
            };

            self.updateProfile = function (p_profile) {
                return p_resources.updateProfile({}, p_profile).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }

            self.queryVendor = function (p_vendorSearchQuery) {
                return p_resources.query({}, p_vendorSearchQuery).$promise
                    .then(function (p_results) {
                        return p_models.new(fincam.paginationResults, p_results, {
                            element: commonVendor.vendorSearchResult
                        })
                    }, self.handleError, self.handleNotify);
            }

            self.getDefaultPresentationSrc = function (p_vendorId) {
                return p_$q.resolve(p_clientConfig.fincamApiUrl + url + "/get-default-presentation/" + p_vendorId);
            }

            self.getShortlistedVendors = function () {
                return p_resources.getShortlistedVendors({}).$promise
                    .then(function (p_results) {
                        return p_models.new(fincam.paginationResults, p_results, {
                            element: commonVendor.vendorSearchResult
                        });
                    }, self.handleError, self.handleNotify);
            }

            self.toggleVendorSelection = function (p_vendorId) {
                return p_resources.toggleVendorSelection({ vendorId: p_vendorId }, null).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }
            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var apiName = "masterVendorFilesApi";
    var url = "/api/master/freelancer/portfolio";

    // --------------------------------------------------------------------------------
    // Resources
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName + "Resources", [
        "$resource",
        function (p_$resource) {
            var actions = ng.fincam.resource.apply({}, [url, {
                getPhotos: { method: "GET", url: "get-photos/:vendorId", isArray: true },
                clearOldFiles: { method: "POST", "url": 'clear-old-photos' },
                storeVideos: { method: "POST", url: "store-videos" },
                getVideos: { method: "POST", url: "get-videos/:vendorId", isArray: true  }
            }]);

            return p_$resource(url, {}, actions);
        }
    ]);

    // --------------------------------------------------------------------------------
    // Modules
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName, [
        "$rootScope",
        "$q",
        "$window",
        "$stateParams",
        "$state",
        "$timeout",
        "$interval",
        "services.utils",
        "services.models",
        "api." + apiName + "Resources",
        "clientConfig",
        function (
            p_$rootScope,
            p_$q,
            p_$window,
            p_$stateParams,
            p_$state,
            p_$timeout,
            p_$interval,
            p_utils,
            p_models,
            p_resources,
            p_clientConfig,
            undefined
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var vendor = p_models.namespace("fincam.master.vendor");
            var common = p_models.namespace("fincam.common");
            var commonVendor = p_models.namespace("fincam.common.vendor");
            var transaction = p_models.namespace("fincam.transaction");
            // --------------------------------------------------------------------------------
            // Modules
            // --------------------------------------------------------------------------------
            var self = ng.fincam.api.apply(this, [
                p_$rootScope,
                p_$q,
                p_$window,
                p_$stateParams,
                p_$state,
                p_$timeout,
                p_$interval,
                p_utils,
                p_models,
                p_resources,
                vendor.masterVendorFiles
            ]);

            self.getPhotos = function (vendor_id) {
                return p_resources.getPhotos({ 'vendorId': vendor_id },null).$promise
                    .then(self.array, self.handleError, self.handleNotify);
            };
            self.getDefaultPresentationSrc = function (vendorId,p_fileId) {
                return (p_clientConfig.fincamApiUrl + url + "/get-default-presentation/" + vendorId+"/"+ p_fileId + "?t="+p_$rootScope.token);
            }
            self.clearOldFiles = function () {
                return p_resources.clearOldFiles({}).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }
            self.storeVideos = function (req) {
                return p_resources.storeVideos(null, req).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }
            self.getVideos = function (vendor_id) {
                return p_resources.getVideos({ 'vendorId': vendor_id },null).$promise
                    .then(self.array, self.handleError, self.handleNotify);
            }
            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var apiName = "masterVendorPackageApi";
    var url = "/api/master/freelancer-package";

    // --------------------------------------------------------------------------------
    // Resources
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName + "Resources", [
        "$resource",
        function (p_$resource) {
            var actions = ng.fincam.resource.apply({}, [url, {
            }]);

            return p_$resource(url, {}, actions);
        }
    ]);

    // --------------------------------------------------------------------------------
    // Modules
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName, [
        "$rootScope",
        "$q",
        "$window",
        "$stateParams",
        "$state",
        "$timeout",
        "$interval",
        "services.utils",
        "services.models",
        "api." + apiName + "Resources",
        function (
            p_$rootScope,
            p_$q,
            p_$window,
            p_$stateParams,
            p_$state,
            p_$timeout,
            p_$interval,
            p_utils,
            p_models,
            p_resources,
            undefined
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var vendor = p_models.namespace("fincam.master.vendor");

            // --------------------------------------------------------------------------------
            // Modules
            // --------------------------------------------------------------------------------
            var self = ng.fincam.api.apply(this, [
                p_$rootScope,
                p_$q,
                p_$window,
                p_$stateParams,
                p_$state,
                p_$timeout,
                p_$interval,
                p_utils,
                p_models,
                p_resources,
                vendor.masterVendorPackage
            ]);

            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var apiName = "masterVendorServiceApi";
    var url = "/api/master/freelancer-service";

    // --------------------------------------------------------------------------------
    // Resources
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName + "Resources", [
        "$resource",
        function (p_$resource) {
            var actions = ng.fincam.resource.apply({}, [url, {
            }]);

            return p_$resource(url, {}, actions);
        }
    ]);

    // --------------------------------------------------------------------------------
    // Modules
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName, [
        "$rootScope",
        "$q",
        "$window",
        "$stateParams",
        "$state",
        "$timeout",
        "$interval",
        "services.utils",
        "services.models",
        "api." + apiName + "Resources",
        function (
            p_$rootScope,
            p_$q,
            p_$window,
            p_$stateParams,
            p_$state,
            p_$timeout,
            p_$interval,
            p_utils,
            p_models,
            p_resources,
            undefined
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var vendor = p_models.namespace("fincam.master.vendor");

            // --------------------------------------------------------------------------------
            // Modules
            // --------------------------------------------------------------------------------
            var self = ng.fincam.api.apply(this, [
                p_$rootScope,
                p_$q,
                p_$window,
                p_$stateParams,
                p_$state,
                p_$timeout,
                p_$interval,
                p_utils,
                p_models,
                p_resources,
                vendor.masterVendorService
            ]);

            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var apiName = "masterVendorSubscriptionApi";
    var url = "/api/master/freelancer-subscription";

    // --------------------------------------------------------------------------------
    // Resources
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName + "Resources", [
        "$resource",
        function (p_$resource) {
            var actions = ng.fincam.resource.apply({}, [url, {
                getActiveSubscription: { method: "GET", url: "get-active-subscription" },
                addSubscription: { method: "POST", url: "add-subscription/:subscriptionId/:orderId/:paymentId" },
                getActiveVendorSubscription: { method: "GET", url: "get-active-freelancer-subscription" }
            }]);

            return p_$resource(url, {}, actions);
        }
    ]);

    // --------------------------------------------------------------------------------
    // Modules
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName, [
        "$rootScope",
        "$q",
        "$window",
        "$stateParams",
        "$state",
        "$timeout",
        "$interval",
        "services.utils",
        "services.models",
        "api." + apiName + "Resources",
        "clientConfig",
        function (
            p_$rootScope,
            p_$q,
            p_$window,
            p_$stateParams,
            p_$state,
            p_$timeout,
            p_$interval,
            p_utils,
            p_models,
            p_resources,
            p_clientConfig,
            undefined
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var vendor = p_models.namespace("fincam.master.vendor");
            var subscription = p_models.namespace("fincam.master.subscription");

            // --------------------------------------------------------------------------------
            // Modules
            // --------------------------------------------------------------------------------
            var self = ng.fincam.api.apply(this, [
                p_$rootScope,
                p_$q,
                p_$window,
                p_$stateParams,
                p_$state,
                p_$timeout,
                p_$interval,
                p_utils,
                p_models,
                p_resources,
                vendor.masterVendorSubscriptions
            ]);

            self.getActiveSubscription = function () {
                return p_resources.getActiveSubscription({}).$promise
                    .then(function (p_result) {
                        return p_models.new(subscription.masterSubscription, p_result);
                    }, self.handleError, self.handleNotify);
            }

            self.addSubscription = function (subscriptionId, paymentRequestModel) {
                return p_resources.addSubscription({ 'subscriptionId': subscriptionId }, paymentRequestModel).$promise
                    .then(self.handleSuccess, self.handleError, self.handleNotify);
            }
            self.getActiveVendorSubscription = function () {
                return p_resources.getActiveVendorSubscription({}).$promise
                    .then(function (p_result) {
                        return p_models.new(vendor.masterVendorSubscriptions, p_result);
                    }, self.handleError, self.handleNotify);
            }

            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var apiName = "masterVendorTypeApi";
    var url = "/api/master/freelancer-type";

    // --------------------------------------------------------------------------------
    // Resources
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName + "Resources", [
        "$resource",
        function (p_$resource) {
            var actions = ng.fincam.resource.apply({}, [url, {
            }]);

            return p_$resource(url, {}, actions);
        }
    ]);

    // --------------------------------------------------------------------------------
    // Modules
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName, [
        "$rootScope",
        "$q",
        "$window",
        "$stateParams",
        "$state",
        "$timeout",
        "$interval",
        "services.utils",
        "services.models",
        "api." + apiName + "Resources",
        function (
            p_$rootScope,
            p_$q,
            p_$window,
            p_$stateParams,
            p_$state,
            p_$timeout,
            p_$interval,
            p_utils,
            p_models,
            p_resources,
            undefined
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var vendor = p_models.namespace("fincam.master.vendor");

            // --------------------------------------------------------------------------------
            // Modules
            // --------------------------------------------------------------------------------
            var self = ng.fincam.api.apply(this, [
                p_$rootScope,
                p_$q,
                p_$window,
                p_$stateParams,
                p_$state,
                p_$timeout,
                p_$interval,
                p_utils,
                p_models,
                p_resources,
                vendor.masterVendorType
            ]);

            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var apiName = "masterSubscriptionApi";
    var url = "/api/master/subscription-for-freelancer";

    // --------------------------------------------------------------------------------
    // Resources
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName + "Resources", [
        "$resource",
        function (p_$resource) {
            var actions = ng.fincam.resource.apply({}, [url, {
                getOrderId: { method: "POST", url: "create-order/:subscriptionId"}
            }]);

            return p_$resource(url, {}, actions);
        }
    ]);

    // --------------------------------------------------------------------------------
    // Modules
    // --------------------------------------------------------------------------------
    module.factory("api." + apiName, [
        "$rootScope",
        "$q",
        "$window",
        "$stateParams",
        "$state",
        "$timeout",
        "$interval",
        "services.utils",
        "services.models",
        "api." + apiName + "Resources",
        function (
            p_$rootScope,
            p_$q,
            p_$window,
            p_$stateParams,
            p_$state,
            p_$timeout,
            p_$interval,
            p_utils,
            p_models,
            p_resources,
            undefined
        ) {
            // --------------------------------------------------------------------------------
            // Namespace
            // --------------------------------------------------------------------------------
            var fincam = p_models.namespace("fincam");
            var subscription = p_models.namespace("fincam.master.subscription");
            var common = p_models.namespace("fincam.common");
            // --------------------------------------------------------------------------------
            // Modules
            // --------------------------------------------------------------------------------
            var self = ng.fincam.api.apply(this, [
                p_$rootScope,
                p_$q,
                p_$window,
                p_$stateParams,
                p_$state,
                p_$timeout,
                p_$interval,
                p_utils,
                p_models,
                p_resources,
                subscription.masterSubscription
            ]);
            self.getOrderId = function (subscription_id) {
                return p_resources.getOrderId({ "subscriptionId": subscription_id }, null).$promise
                    .then(function (p_result) {
                        return p_models.new(common.paymentOrderResponse, p_result, {
                            element: common.paymentOrderModel
                            });
                    }, self.handleError, self.handleNotify);
            }
            return self;
        }]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Filter
    // --------------------------------------------------------------------------------
    module.filter("capitalize", [
        function (
            undefined
        ) {
            return function (p_value) {
                return p_value.capitalize();
            }
        }
    ])

})(jQuery, angular, document.children[0].hasAttribute("debug"));
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
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "index";
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
                return p_$q.resolve();
            }

            p_$scope.init = function () {
                var tasks = [
                    p_$rootScope.init()
                ];

                return p_$q.all(tasks).then(function (p_data) {
                    return p_$scope.refresh().then(function () {
                        return p_$state.go("home");
                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            p_$scope.getContainerHeight = function () {
                var $appHeader = $("fic-app-header > header > nav");
                var $appFooter = $("fic-app-footer");

                return p_utils.$w.height() - $appHeader.height() - $appFooter.height() + 50;
            }

            p_$scope.getContainerTopOffset = function () {
                var $appHeader = $("fic-app-header > header > nav");

                return $appHeader.height();
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "customerLogin";
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
        "api.accountApi",
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
            p_accountApi,
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
                return p_$q.resolve();
            }

            p_$scope.init = function () {
                var tasks = [];

                p_$scope.errorMsgs = [];
                p_$scope.user = {
                    username: "",
                    password: "",
                    scope: "SecondShooter"
                };

                p_$scope.initValidationOptions();

                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {
                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            p_$scope.initValidationOptions = function () {
                p_$scope.signinValidationOptions = {
                    rules: {
                        username: {
                            required: true
                        },
                        password: {
                            required: true
                        }
                    },
                    messages: {
                        username: "",
                        password: ""
                    }
                };
            }

            p_$scope.signin = function (p_customerSigninForm) {
                if (p_customerSigninForm.validate()) {
                    return p_accountApi.connect(p_$scope.user).then(function (p_authResult) {
                        if (p_utils.isArray(p_authResult.errorMsgs) && p_authResult.errorMsgs.length > 0) {
                            p_$scope.errorMsgs = p_authResult.errorMsgs;
                            return p_$q.reject();
                        }

                        if (p_utils.isNullOrEmpty(p_authResult.token)) {
                            p_$scope.errorMsgs = ["Invalid username/password"];
                            return p_$q.reject();
                        }

                        return p_$scope.saveToken(p_authResult.token).then(function () {
                            return p_accountApi.getUser().then(function (p_userProfile) {
                                if (!p_userProfile || !p_userProfile.user || !p_userProfile.user.id) {
                                    p_$scope.errorMsgs = ["Login failed. Try again"];
                                    return p_$q.reject();
                                }

                                return p_$scope.saveProfile(p_userProfile).then(function () {
                                    p_$window.location.href = "/";
                                });
                            });
                        });
                    });
                }
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "customerSignup";
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
        "api.accountApi",
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
            p_accountApi,
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

            var customer = p_models.namespace("fincam.master.customer");

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {
                return p_$q.resolve();
            }

            p_$scope.init = function () {
                var tasks = [];

                p_$scope.initValidationOptions();

                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {
                        p_$scope.customer = p_models.new(customer.masterCustomer, {});
                        p_$scope.errorMsgs = [];
                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            p_$scope.initValidationOptions = function () {
                p_$scope.registrationValidateOptions = {
                    rules: {
                        name: {
                            required: true
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        mobile: {
                            required: true,
                            mobileIndia: true
                        },
                        password: {
                            required: true,
                            pwdCheck: true,
                            minlength: 8
                        }
                    },
                    messages: {
                        name: "",
                        email: {
                            required: "",
                            email: "Invalid email"
                        },
                        mobile: {
                            required: "",
                            mobileIndia: "Invalid mobile number"
                        },
                        password: {
                            required: "",
                            pwdCheck: "Password need to: <br/> Include both lower and upper case characters <br/> Include atleast one number",
                            minlength: "Minimum atleast 8 characters long"
                        }
                    }
                };
            }

            p_$scope.register = function (p_customerRegisterForm) {
                if (p_customerRegisterForm.validate()) {
                    return p_accountApi.registerCustomer(p_$scope.customer).then(function (p_authResult) {
                        if (p_utils.isArray(p_authResult.errorMsgs) && p_authResult.errorMsgs.length > 0) {
                            p_$scope.errorMsgs = p_authResult.errorMsgs;
                            return p_$q.reject();
                        }

                        if (p_utils.isNullOrEmpty(p_authResult.token)) {
                            p_$scope.errorMsgs = ["Registration failed. Try again"];
                            return p_$q.reject();
                        }

                        return p_$scope.saveToken(p_authResult.token).then(function () {
                            return p_accountApi.getUser().then(function (p_userProfile) {
                                if (!p_userProfile || !p_userProfile.user || !p_userProfile.user.id) {
                                    p_$scope.errorMsgs = ["Registration failed. Try again"];
                                    return p_$q.reject();
                                }

                                return p_$scope.saveProfile(p_userProfile).then(function () {
                                    p_$window.location.href = "/";
                                });
                            });
                        });
                    });
                }
            }

            p_$scope.customerLogin = function () {
                p_$window.location.href = "/customer-signin";
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "home";
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
        "api.masterVendorTypeApi",
        "api.masterGeoApi",
        "api.projectFilesApi",
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
            p_masterVendorTypeApi,
            p_masterGeoApi,
            p_projectFilesApi,
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

            var vendor = p_models.namespace("fincam.master.vendor");
            var geo = p_models.namespace("fincam.master.geo");
            var projects = p_models.namespace("fincam.common.projects");
            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {
                var asyncTasks = [];

                asyncTasks.push(p_masterVendorTypeApi.getAll().then(function (p_vendorTypes) {
                    var emptyVendorType = p_models.new(vendor.masterVendorType, {
                        id: 0,
                        type: "What you are looking for?"
                    });

                    p_$scope.vendorTypes = [emptyVendorType].concat(p_vendorTypes || []);
                }));

                asyncTasks.push(p_masterGeoApi.getOperationalCityList().then(function (p_cities) {
                    var emptyCity = p_models.new(geo.masterGeo, {
                        id: 0,
                        geoName: "Select City"
                    });

                    p_$scope.geoCities = [emptyCity].concat(p_cities || []);
                }));
                asyncTasks.push(p_projectFilesApi.getLatestProjectFiles().then(function (p_files) {
                    p_$scope.latestProjectFiles = p_files;
                }));
                return p_$q.all(asyncTasks).then(function () { });
            }

            p_$scope.init = function () {
                var tasks = [p_$scope.initPage()];

                p_$scope.searchQuery = {
                    vendorTypeId: 0,
                    cityGeoId: 0
                };
                p_$scope.vendorTypes = p_models.array([], vendor.masterVendorType);
                p_$scope.geoCities = p_models.array([], geo.masterGeo);
                p_$scope.latestProjectFiles = p_models.array([], projects.latestProjectFiles);
                $('.customer-home #listing_img_slider .owl-carousel').owlCarousel({
                    loop: true,
                    margin: 0,
                    nav: true,
                    dots: false,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    responsive: {
                        0: { items: 1 },
                        650: { items: 2 },
                        1300: { items: 3 },
                        1950: { items: 4 },
                        2600: { items: 5 },
                        3250: { items: 6 }
                    }
                })

                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {
                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            p_$scope.searchVendors = function () {
                return p_$state.go("vendor-search", {
                    vendorTypeId: p_$scope.searchQuery.vendorTypeId,
                    cityGeoId: p_$scope.searchQuery.cityGeoId
                });
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "vendorShortlist";
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
            p_utils,
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

            var fincam = p_models.namespace("fincam");
            var commonVendor = p_models.namespace("fincam.common.vendor");

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {
                return p_masterVendorApi.getShortlistedVendors().then(function (p_vendorSearchResult) {
                    if (p_utils.isObject(p_vendorSearchResult))
                        p_$scope.vendors = p_vendorSearchResult;

                    return p_$q.resolve();
                });
            }

            p_$scope.init = function () {
                var tasks = [];

                p_$scope.vendors = p_models.new(fincam.paginationResults, {});
                p_$scope.view = "grid";

                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {
                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            p_$scope.toggleVendorSelection = function (p_vendor) {
                p_vendor.isShortlisted = !p_vendor.isShortlisted;

                return p_masterVendorApi.toggleVendorSelection(p_vendor.id).then(function () {
                    return p_$scope.refresh();
                });
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
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
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "vendorHome";
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
        "$location",
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
            p_$location,
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
                return p_$q.resolve();
            }

            p_$scope.init = function () {
                var tasks = [p_$scope.initPage()];

                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {
                        var s_path = p_$location.path()
                        var paths = s_path.split("/");
                        var last_path = paths[(paths.length) - 1];
                        if (last_path == "vendor-home")
                            return p_$scope.loadTab("vendor-profile");
                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            p_$scope.loadTab = function (p_tab) {
                return p_$state.go(p_tab, {});
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "vendorLogin";
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
        "api.accountApi",
        '$location',
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
            p_accountApi,
            p_$location,
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
                return p_$q.resolve();
            }

            p_$scope.init = function () {
                var tasks = [];

                p_$scope.errorMsgs = [];
                p_$scope.user = {
                    username: "",
                    password: "",
                    scope:"SecondShooter"
                };

                var searchObject = p_$location.search();
                if (p_utils.isObject(searchObject)) {
                    p_$location.search({});
                    var error_flag = searchObject.error_flag;
                    if (error_flag == "true") {
                        p_$scope.errorMsgs.push("Email Verification Failed");
                    }
                    else if (error_flag == "false") {
                        $.alert({
                            title: "Success!",
                            content: "Email Verified SuccessFully"
                        });
                        $("#user_password").focus();
                        p_$scope.user.username = searchObject.verified_email;
                    }
                }

                p_$scope.initValidationOptions();

                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {

                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            p_$scope.initValidationOptions = function () {
                p_$scope.signinValidationOptions = {
                    rules: {
                        username: {
                            required: true
                        },
                        password: {
                            required: true
                        }
                    },
                    messages: {
                        username: "",
                        password: ""
                    }
                };
            }
            p_$scope.vendorSignup = function () {
                p_$window.location.href = "/vendor-signup";
            }
            p_$scope.signin = function (p_vendorSigninForm) {
                if (p_vendorSigninForm.validate()) {
                    return p_accountApi.connect(p_$scope.user).then(function (p_authResult) {
                        if (p_utils.isArray(p_authResult.errorMsgs) && p_authResult.errorMsgs.length > 0) {
                            p_$scope.errorMsgs = p_authResult.errorMsgs;
                            return p_$q.reject();
                        }

                        if (p_utils.isNullOrEmpty(p_authResult.token)) {
                            p_$scope.errorMsgs = ["Invalid username/password"];
                            return p_$q.reject();
                        }

                        return p_$scope.saveToken(p_authResult.token).then(function () {
                            return p_accountApi.getUser().then(function (p_userProfile) {
                                if (!p_userProfile || !p_userProfile.user || !p_userProfile.user.id) {
                                    p_$scope.errorMsgs = ["Login failed. Try again"];
                                    return p_$q.reject();
                                }

                                return p_$scope.saveProfile(p_userProfile).then(function () {
                                    p_$window.location.href = "/vendor-home";
                                });
                            });
                        });
                    });
                }
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "vendorSearch";
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
        "api.masterVendorTypeApi",
        "api.masterGeoApi",
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
            p_utils,
            p_localStorage,
            p_masterVendorTypeApi,
            p_masterGeoApi,
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

            var vendor = p_models.namespace("fincam.master.vendor");
            var geo = p_models.namespace("fincam.master.geo");
            var fincam = p_models.namespace("fincam");
            var commonVendor = p_models.namespace("fincam.common.vendor");

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {
                return p_masterVendorApi.queryVendor(p_$scope.searchQuery).then(function (p_vendorSearchResults) {
                    if (p_utils.isObject(p_vendorSearchResults))
                        p_$scope.vendors = p_vendorSearchResults;

                    return p_$q.resolve();
                });
            }

            p_$scope.clearSearch = function (p_event) {
                if (p_utils.isNullOrEmpty(p_$scope.searchQuery.search))
                    return;

                p_$scope.searchQuery.search = "";
                p_$scope.refresh();
            }

            p_$scope.init = function () {
                var tasks = [];
                if (!p_$rootScope.isCustomerLoggedIn()) {
                    window.location.href = "/";
                    return;
                }
                p_$scope.searchQuery = p_models.new(commonVendor.vendorSearchQuery, {
                    vendorTypeId: p_$stateParams.vendorTypeId,
                    geoCityId: p_$stateParams.cityGeoId,
                    search: "",
                    customerId: (p_$rootScope.userProfile ? p_$rootScope.userProfile.customerId : null)
                });

                p_$scope.vendors = p_models.new(fincam.paginationResults, {});

                p_$scope.view = "grid";
                p_$scope.title = "";

                if (p_$stateParams.vendorTypeId && p_$stateParams.vendorTypeId > 0)
                    tasks.push(p_masterVendorTypeApi.getById(p_$stateParams.vendorTypeId).then(function (p_vendorType) {
                        p_$scope.vendorType = p_vendorType;
                    }));

                if (p_$stateParams.cityGeoId && p_$stateParams.cityGeoId > 0)
                    tasks.push(p_masterGeoApi.getById(p_$stateParams.cityGeoId).then(function (p_cityGeo) {
                        p_$scope.geoCity = p_cityGeo;
                    }));

                return p_$q.all(tasks).then(function () {
                    p_$scope.title = (p_$scope.vendorType?p_$scope.vendorType.type:"") || "Vendors";

                    if (p_$scope.geoCity)
                        p_$scope.title = p_$scope.title + " in " + p_$scope.geoCity.geoName;

                    return p_$scope.refresh().then(function () {
                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            p_$scope.toggleVendorSelection = function (p_vendor) {
                p_vendor.isShortlisted = !p_vendor.isShortlisted;

                return p_masterVendorApi.toggleVendorSelection(p_vendor.id).then(function () {
                });
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "vendorSignup";
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
        "api.masterVendorTypeApi",
        "api.accountApi",
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
            p_masterVendorTypeApi,
            p_accountApi,
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

            var vendor = p_models.namespace("fincam.master.vendor");

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {
                var asyncTasks = [];

                asyncTasks.push(p_masterVendorTypeApi.getAll().then(function (p_vendorTypes) {
                    var emptyVendorType = p_models.new(vendor.masterVendorType, {
                        id: 0,
                        type: "Select Freelancer Type"
                    });

                    p_$scope.vendorTypes = [emptyVendorType].concat(p_vendorTypes || []);
                }));

                return p_$q.all(asyncTasks);
            }

            p_$scope.init = function () {
                var tasks = [];

                p_$scope.initValidationOptions();
                p_$scope.is_processing = false;
                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {
                        p_$scope.vendor = p_models.new(vendor.masterVendor, {});
                        p_$scope.errorMsgs = [];
                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            p_$scope.initValidationOptions = function () {
                p_$scope.registrationValidateOptions = {
                    rules: {
                        name: {
                            required: true
                        },
                        type: {
                            numberRequired: true,
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        mobile: {
                            required: true,
                            mobileIndia: true
                        },
                        password: {
                            required: true,
                            pwdCheck: true,
                            minlength: 8
                        }
                    },
                    messages: {
                        name: "",
                        type: "",
                        email: {
                            required: "",
                            email: "Invalid email"
                        },
                        mobile: {
                            required: "",
                            mobileIndia: "Invalid mobile number"
                        },
                        password: {
                            required: "",
                            pwdCheck: "Password need to: <br/> Include both lower and upper case characters <br/> Include atleast one number",
                            minlength: "Minimum atleast 8 characters long"
                        }
                    }
                };
            }

            p_$scope.register = function (p_registerForm) {
                if (p_registerForm.validate()) {
                    p_$scope.is_processing = true;
                    return p_accountApi.registerFreelancer(p_$scope.vendor).then(function (p_authResult) {
                        p_$scope.is_processing = false;
                        if (p_utils.isArray(p_authResult.errorMsgs) && p_authResult.errorMsgs.length > 0) {
                            p_$scope.errorMsgs = p_authResult.errorMsgs;
                            return p_$q.reject();
                        }
                        p_$scope.successMsg = 'Confimation Mail Sent!';
                        p_$scope.init();

/*
                        if (p_utils.isNullOrEmpty(p_authResult.token)) {
                            p_$scope.errorMsgs = ["Registration failed. Try again"];
                            return p_$q.reject();
                        }

                        return p_$scope.saveToken(p_authResult.token).then(function () {
                            return p_accountApi.getUser().then(function (p_userProfile) {
                                if (!p_userProfile || !p_userProfile.user || !p_userProfile.user.id) {
                                    p_$scope.errorMsgs = ["Login failed. Try again"];
                                    return p_$q.reject();
                                }

                                return p_$scope.saveProfile(p_userProfile).then(function () {
                                    p_$window.location.href = "/vendor-home";
                                });
                            });
                        });*/
                    }, err => {
                            p_$scope.is_processing = false;
                    });
                }
            }

            p_$scope.login = function () {
                p_$window.location.href = "/vendor-signin";
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "customerProjectView";
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
        "api.projectApi",
        "api.projectFilesApi",
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
            p_projectApi,
            p_projectFilesApi,
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

            var transaction = p_models.namespace("fincam.transaction");

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.goHome = function () {
                p_$window.location.href = "/";
            }

            p_$scope.refresh = function () {
                var deferred = p_$q.defer();

                p_projectApi.getByIdentifier(p_$scope.identifier).then(function (p_project) {
                    if (p_utils.isObject(p_project) && p_project.id) {
                        p_$scope.project = p_project;

                        return p_$scope.isAuthenticated().then(function () {
                            return p_projectFilesApi.getByProject(p_project.id).then(function (p_files) {
                                if (p_utils.isArray(p_files))
                                    p_$scope.files = p_files;

                                deferred.resolve();
                            });
                        }, function () {
                            deferred.reject();
                        });
                    }
                    else {
                        $.confirm({
                            title: 'Error',
                            content: 'Invalid request',
                            buttons: {
                                ok: {
                                    text: 'Ok',
                                    btnClass: 'btn-blue',
                                    action: function () {
                                        deferred.reject();
                                    }
                                }
                            }
                        });
                    }
                });

                return deferred.promise;
            }

            p_$scope.isAuthenticated = function () {
                var deferred = p_$q.defer();

                if (!p_$rootScope.isUserLoggedIn()) {
                    var promptPin = function (p_pin) {
                        if (!p_pin)
                            p_pin = "";

                        $.confirm({
                            title: 'Frame Incam',
                            closeIcon: false,
                            content: '' +
                                '<form action="" class="projectSignonForm">' +
                                '<div class="form-group">' +
                                '<label>Enter pin</label>' +
                                '<input type="text" placeholder="Your pin" class="pin form-control" value="'+ p_pin +'" required/>' +
                                '</div>' +
                                '</form>',
                            buttons: {
                                formSubmit: {
                                    text: "Submit",
                                    btnClass: "btn-green",
                                    action: function () {
                                        var pin = this.$content.find('.pin').val();
                                        if (!pin) {
                                            $.alert({
                                                title: 'Error',
                                                content: 'Please enter pin'
                                            });

                                            return false;
                                        }

                                        var project = p_models.new(transaction.trnProject, { id: p_$scope.project.id, key: pin });

                                        return p_projectApi.authenticatePin(project).then(function (p_result) {
                                            if (!p_result.result) {
                                                promptPin(pin);

                                                $.alert({
                                                    title: 'Error',
                                                    content: 'Invalid pin'
                                                });
                                            }
                                            else {
                                                p_$scope.projectPin = project.key;
                                                deferred.resolve();
                                            }
                                        });
                                    }
                                },
                                cancel: {
                                    text: "Cancel",
                                    btnClass: "btn-red",
                                    action: function () {
                                        deferred.reject();
                                    }
                                }
                            },
                            onContentReady: function () {
                                // bind to events
                                var jc = this;
                                this.$content.find('form').on('submit', function (e) {
                                    // if the user submits the form by pressing enter in the field.
                                    e.preventDefault();
                                    jc.$$formSubmit.trigger('click'); // reference the button and click it
                                });
                            }
                        });
                    };

                    if (!p_$scope.projectPin)
                        promptPin();
                }
                else {
                    deferred.resolve();
                }

                return deferred.promise;
            }

            p_$scope.init = function () {
                var tasks = [];
                p_$scope.identifier = p_$stateParams.identifier;
                p_$scope.project = p_models.new(transaction.trnProject, {});
                p_$scope.files = p_models.array([], transaction.trnProjectFiles);
                p_$scope.projectPin = "";
                p_$scope.isPinAuthentication = false;

                p_$scope.ready = false;
                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {
                        p_$scope.ready = true;
                    }, function () {
                        p_$scope.goHome();
                    });
                }).finally(function () {
                });
            }

            p_$scope.needApproval = function () {
                return p_$scope.project.status === "Photos Uploaded" && (p_$rootScope.isCustomerLoggedIn() || (p_$scope.projectPin!=""));
            }

            p_$scope.saveSelection = function (p_showMsgs) {
                if (p_showMsgs !== false)
                    p_showMsgs = true;

                var changedFiles = p_$scope.files.asEnumerable().where(function (p_file) {
                    return p_file.isApproved !== (p_file.currentApprovedState ? 1 : 0);
                }).select(function (p_file) {
                    return {
                        id: p_file.id,
                        isApproved: (p_file.currentApprovedState ? 1 : 0)
                    };
                }).toArray();

                if (!p_utils.isArray(changedFiles) || changedFiles.length === 0) {
                    if (p_showMsgs)
                        $.alert({
                            title: "Frame Incam",
                            content: "No changes made"
                        });

                    return p_$q.resolve();
                }

                return p_projectFilesApi.updateSelection(changedFiles).then(function (p_result) {
                    if (p_utils.isObject(p_result) && p_result.result) {
                        if (p_showMsgs)
                            $.alert({
                                title: "Frame Incam",
                                content: "Selection saved successfully"
                            });
                        //return p_$scope.refresh();

                        changedFiles.asEnumerable().forEach(function (p_file) {
                            var file = p_$scope.files.asEnumerable().firstOrDefault(function (p_dbFile) {
                                return p_dbFile.id === p_file.id;
                            });

                            if (file)
                                file.isApproved = p_file.isApproved;
                        });
                    }

                    return p_$q.resolve();
                });
            }

            p_$scope.confirmSelection = function () {
                $.confirm({
                    title: "Frame Incam",
                    content: "Are you sure, you want to approve?",
                    buttons: {
                        yes: {
                            text: "Yes",
                            btnClass: "btn-green",
                            action: function () {
                                return p_$scope.saveSelection(false).then(function () {
                                    var isFilesApproved = p_$scope.files.asEnumerable().any(function (p_file) {
                                        return p_file.isApproved;
                                    });

                                    if (!isFilesApproved) {
                                        $.alert({
                                            title: "Frame Incam",
                                            content: "Please select atleast a file to complete"
                                        });
                                    } else {
                                        return p_projectApi.approveProject(p_$scope.project.id).then(function () {
                                            return p_$scope.refresh().then(function () {
                                                $.alert({
                                                    title: "Frame Incam",
                                                    content: "Project approved successfully"
                                                });
                                            });
                                        });
                                    }
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
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "customerProjects";
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
        "api.projectApi",
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
            p_projectApi,
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

            var transaction = p_models.namespace("fincam.transaction");

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {
                return p_projectApi.getByCustomer().then(function (p_projectList) {
                    p_$scope.projects = (p_utils.isArray(p_projectList) ? p_projectList : []);
                });
            }

            p_$scope.init = function () {
                var tasks = [];

                p_$scope.projects = p_models.array([], transaction.trnProject);

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
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "vendorDashboard";
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
                return p_$q.resolve();
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
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "vendorPortfolio";
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
        'clientConfig',
        "api.masterVendorFilesApi",
        "$sce",
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
            p_clientConfig,
            p_masterVendorFileApi,
            p_$sce,
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
            var vendor = p_models.namespace("fincam.master.vendor");
            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {
                //p_$scope.mockRecords();
                var tasks = [];
                tasks.push(
                    p_masterVendorFileApi.getPhotos(p_$rootScope.userProfile.freeLancerId).then(function (res) {
                        var projectFiles = res;
                        p_$scope.photos = projectFiles.map(function (r) {
                            var obj = { presentationUrl:''};
                            obj.presentationUrl = p_masterVendorFileApi.getDefaultPresentationSrc(p_$rootScope.userProfile.freeLancerId,r.id);
                            return obj;
                        });
                    })
                );
                tasks.push(
                    p_masterVendorFileApi.getVideos(p_$rootScope.userProfile.freeLancerId).then(function (res) {
                        var projectFiles = res;
                        p_$scope.videos = projectFiles.map(function (r) {
                            var obj = { presentationUrl: '' };
                            obj.presentationUrl = r.fileName;
                            return obj;
                        });
                    })
                );
                return p_$q.all(tasks).then(function () {
                    
                });
                return p_$q.resolve();
            }
            p_$scope.trustSrc = function (src) {
                return p_$sce.trustAsResourceUrl(src);
            };
            p_$scope.mockRecords = function () {
                p_$scope.mockPhotos();
                p_$scope.mockAlbums();
                p_$scope.mockVideos();
            }
            p_$scope.dzOptions = {
                url: p_clientConfig.fincamApiUrl +"/api/master/freelancer/portfolio/photos",
                paramName: 'photo',
                maxFilesize: 5,
                acceptedFiles: 'image/jpeg, images/jpg, image/png',
                addRemoveLinks: true,
                autoProcessQueue: false,
                maxFiles: 25,
                parallelUploads: 25,
                headers: { 'Authorization': "Bearer " + p_$rootScope.token},
                init: function () {
                    var myDropzone = this;
                    //now we will submit the form when the button is clicked
                    $("#sbmtbtn").on('click', function (e) {
                        e.preventDefault();
                        p_masterVendorFileApi.clearOldFiles().then(function (res) {
                            if (res.result == true) {
                                myDropzone.processQueue();
                            }
                        })
                    });
                    myDropzone.on("complete", function (file) {
                        if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
                            p_$scope.refresh().then(function () {
                                $.alert({
                                    title: "Success!",
                                    content: "Photos Updated Successfully"
                                });
                                 $("#photoUploadModel").modal('hide');
                            });
                        }
                    });
                }
            };
            p_$scope.dzCallbacks = {
                'addedfile': function (file) {
                },
                'success': function (file, xhr) {
                    
                }
            };
            p_$scope.dzMethods = {};
            p_$scope.removeNewFile = function () {
                p_$scope.dzMethods.removeFile($scope.newFile); //We got $scope.newFile from 'addedfile' event callback
            }
            //p_$scope.dzMethods.removeFile(file);
            p_$scope.mockPhotos = function () {
                p_$scope.photos = [
                    { presentationUrl: "assets/images/projects/1/Bridge.jpg" },
                    { presentationUrl: "assets/images/projects/1/Building 1.jpg" },
                    { presentationUrl: "assets/images/projects/1/City.jpg" },
                    { presentationUrl: "assets/images/projects/1/Flag Art.jpg" },
                    { presentationUrl: "assets/images/projects/1/Great Barrier Brief.jpg" },
                    { presentationUrl: "assets/images/projects/1/Nature.jpg" },
                    { presentationUrl: "assets/images/projects/1/Sydney.jpg" }
                ];
            }

            p_$scope.mockAlbums = function () {
                p_$scope.albums = [];

                p_$scope.albums.push({
                    id: 1,
                    name: "Nature",
                    files: [{ presentationUrl: "assets/images/projects/1/Bridge.jpg" },
                    {
                        presentationUrl: "assets/images/projects/1/Building 1.jpg",
                        isCover: true
                    },
                    { presentationUrl: "assets/images/projects/1/City.jpg" },
                    { presentationUrl: "assets/images/projects/1/Flag Art.jpg" },
                    { presentationUrl: "assets/images/projects/1/Great Barrier Brief.jpg" },
                    { presentationUrl: "assets/images/projects/1/Nature.jpg" },
                    { presentationUrl: "assets/images/projects/1/Sydney.jpg" }
                    ]
                }, {
                    id: 2,
                    name: "Black & White",
                    files: [{
                        presentationUrl: "assets/images/projects/2/1.png",
                        isCover: true
                    },
                    { presentationUrl: "assets/images/projects/2/2.png" },
                    { presentationUrl: "assets/images/projects/2/3.png" },
                    { presentationUrl: "assets/images/projects/2/4.png" }
                    ]
                });
            }

            p_$scope.mockVideos = function () {

            }
            p_$scope.submitVideos = function () {
                var videos = p_$scope.videoFormsInput.filter(function (r) {
                    if (r.fileName != "")
                        return true;
                    return false;
                });
                p_masterVendorFileApi.storeVideos(videos).then(function (res) {
                    if (res.result == true) {
                        p_$scope.refresh().then(function () {
                            $.alert({
                                title: "Success!",
                                content: "Videos Updated Successfully"
                            });
                            $("#videoUploadModel").modal('hide');
                        });
                    }
                })
            }
            p_$scope.init = function () {
                var tasks = [];
                p_$scope.videoFormsInput = [{ fileName: "" }, { fileName: "" }, { fileName: "" }];
                $('.input-images').imageUploader();

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
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "vendorProfile";
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
        "api.masterVendorApi",
        "api.masterVendorTypeApi",
        "api.masterVendorServiceApi",
        "api.masterGeoApi",
        "api.masterLovApi",
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
            p_masterVendorApi,
            p_masterVendorTypeApi,
            p_masterVendorServiceApi,
            p_masterGeoApi,
            p_masterLovApi,
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

            var vendor = p_models.namespace("fincam.master.vendor");
            var geo = p_models.namespace("fincam.master.geo");
            var common = p_models.namespace("fincam.common");

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {
                var asyncTasks = [];

                asyncTasks.push(p_masterVendorApi.getProfile().then(function (p_vendorProfile) {
                    p_$scope.profile = p_vendorProfile;
                    if (!p_utils.isObject(p_$scope.profile.vendor))
                        p_$scope.profile.vendor = p_models.new(vendor.masterVendor, {});

                    if (!p_utils.isObject(p_$scope.profile.address) || !p_$scope.profile.address.id || p_$scope.profile.address.id === 0)
                        p_$scope.profile.address = p_models.new(vendor.masterVendorAddress, {
                            freeLancerId: p_$scope.profile.freeLancer.id
                        });

                    if (!p_utils.isArray(p_$scope.profile.services))
                        p_$scope.profile.services = p_models.array([], vendor.masterVendorServiceMap);
                }));

                asyncTasks.push(p_masterVendorTypeApi.getAll().then(function (p_vendorTypes) {
                    var emptyVendorType = p_models.new(vendor.masterVendorType, {
                        id: 0,
                        type: "Select Vendor Type"
                    });

                    p_$scope.vendorTypes = [emptyVendorType].concat(p_vendorTypes || []);
                }));

                /*asyncTasks.push(p_masterVendorServiceApi.getAll().then(function (p_vendorServices) {
                    p_$scope.vendorServices = (p_vendorServices || []);
                }));*/

                /*asyncTasks.push(p_masterGeoApi.getByParams(3).then(function (p_cities) {
                    var emptyCity = p_models.new(geo.masterGeo, {
                        id: 0,
                        geoName: "Select City"
                    });

                    p_$scope.geoCities = [emptyCity].concat(p_cities || []);
                }));*/

                asyncTasks.push(p_masterGeoApi.getByParams(2).then(function (p_states) {
                    var emptyState = p_models.new(geo.masterGeo, {
                        id: 0,
                        geoName: "Select State"
                    });

                    p_$scope.geoStates = [emptyState].concat(p_states || []);
                }));

                asyncTasks.push(p_masterLovApi.getByType("vendor_experience").then(function (p_vendorExperiences) {
                    p_$scope.vendorExpList = (p_vendorExperiences || []);
                }));

                return p_$q.all(asyncTasks).then(function () {
                    p_$scope.getCities();
                });
            }
            p_$scope.getCities = function () {
                var stateId = p_$scope.profile.address.stateGeoId;
                p_masterGeoApi.getByParams(3, stateId).then(function (p_cities) {
                    var emptyCity = p_models.new(geo.masterGeo, {
                        id: 0,
                        geoName: "Select City"
                    });

                    p_$scope.geoCities = [emptyCity].concat(p_cities || []);
                });
            }
            p_$scope.init = function () {
                p_$scope.profile = p_models.new(common.vendorProfile, {});

                var tasks = [];

                p_$scope.initValidationOptions();

                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {
                        //p_$scope.allServiceSelected = p_$scope.isAllServiceSelected();

                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            p_$scope.initValidationOptions = function () {
                p_$scope.profileUpdateValidationOptions = {
                    rules: {
                        mobile: {
                            required: true,
                            mobileIndia: true
                        },
                        name: {
                            required: true
                        },
                        type: {
                            numberRequired: true
                        },
                        websiteUrl: {
                            url: true
                        },
                        fbUrl: {
                            url: true
                        },
                        instagramUrl: {
                            url: true
                        },
                        youtubeUrl: {
                            url: true
                        },
                        pincode: {
                            required: true
                        },
                        addressLine1: {
                            required: true
                        },
                        city: {
                            numberRequired: true
                        },
                        state: {
                            numberRequired: true
                        }
                    },
                    messages: {
                        mobile: {
                            required: "",
                            mobileIndia: "Invalid mobile number"
                        },
                        name: "",
                        type: "",
                        websiteUrl: {
                            url: "Invalid url"
                        },
                        fbUrl: {
                            url: "Invalid url"
                        },
                        instagramUrl: {
                            url: "Invalid url"
                        },
                        youtubeUrl: {
                            url: "Invalid url"
                        },
                        pincode: "",
                        addressLine1: "",
                        city: "",
                        state: ""
                    }
                };
            }

            p_$scope.toggleServiceSelection = function (p_service) {
                if (!p_$scope.isServiceSelected(p_service))
                    p_$scope.selectService(p_service);
                else
                    p_$scope.unselectService(p_service);

                p_$scope.allServiceSelected = p_$scope.isAllServiceSelected();
            }

            p_$scope.isServiceSelected = function (p_service) {
                return p_$scope.profile.services.asEnumerable().any(function (p_selectedService) {
                    return p_service.id === p_selectedService.serviceId;
                });
            }

            p_$scope.selectService = function (p_service) {
                var serviceMap = p_models.new(vendor.masterVendorServiceMap, {
                    freeLancerId: p_$scope.profile.freeLancer.id,
                    serviceId: p_service.id
                });

                p_$scope.profile.services.push(serviceMap);
            }

            p_$scope.unselectService = function (p_service) {
                var serviceMapIndex = p_$scope.profile.services.findIndex(function (p_serviceMap) {
                    return p_serviceMap.serviceId === p_service.id;
                });

                if (serviceMapIndex > -1)
                    p_$scope.profile.services.splice(serviceMapIndex, 1);
            }

            p_$scope.isAllServiceSelected = function () {
                return p_$scope.vendorServices.asEnumerable().all(function (p_service) {
                    return p_$scope.isServiceSelected(p_service);
                });
            }

            p_$scope.toggleAllServiceSelection = function () {
                p_$scope.allServiceSelected = !p_$scope.allServiceSelected;

                p_$scope.vendorServices.asEnumerable().forEach(function (p_service) {
                    if (p_$scope.allServiceSelected) {
                        if (!p_$scope.isServiceSelected(p_service))
                            p_$scope.selectService(p_service);
                    } else {
                        if (p_$scope.isServiceSelected(p_service))
                            p_$scope.unselectService(p_service);
                    }
                });
            }

            p_$scope.isVendorExpSelected = function (p_vendorExp) {
                if (!p_$scope.profile.freeLancer.experienceLovId)
                    return false;

                return p_$scope.profile.freeLancer.experienceLovId === p_vendorExp.id;
            }

            p_$scope.selectVendorExp = function (p_vendorExp) {
                p_$scope.profile.freeLancer.experienceLovId = p_vendorExp.id;
            }

            p_$scope.updateProfile = function (p_updateProfileForm) {
                if (p_updateProfileForm.validate()) {

                    p_$scope.profile.packages = p_$scope.profile.packages.asEnumerable().where(function (p_package) {
                        return p_package.description && p_package.pricePerDay;
                    }).toArray();

                    return p_masterVendorApi.updateProfile(p_$scope.profile).then(function () {
                        p_$scope.refresh();
                        alert('Updated successfully');
                    });
                }
            }

            p_$scope.addPackage = function () {
                p_$scope.profile.packages.push(p_models.new(vendor.masterVendorPackage, {
                    freeLancerId: p_$scope.profile.freeLancer.id
                }));
            }

            p_$scope.removePackage = function (p_package) {
                var index = p_$scope.profile.packages.findIndex(function (p_profilePackage) {
                    if (p_profilePackage.id && p_profilePackage.id > 0)
                        return p_package.id === p_profilePackage.id;

                    return p_package.description === p_profilePackage.description && p_package.pricePerDay === p_profilePackage.pricePerDay;
                });

                if (index > -1)
                    p_$scope.profile.packages.splice(index, 1);
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "vendorProjects";
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
        "services.utils",
        "services.localStorage",
        "services.models",
        "api.projectApi",
        function (
            p_$rootScope,
            p_$scope,
            p_$stateParams,
            p_$state,
            p_$q,
            p_$window,
            p_$timeout,
            p_$interval,
            p_utils,
            p_localStorage,
            p_models,
            p_projectApi,
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

            var transaction = p_models.namespace("fincam.transaction");

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------

            p_$scope.refresh = function () {
                p_projectApi.getByFreelancerWithStatus("upcoming").then(function (p_projectList) {
                    p_$scope.projects = (p_utils.isArray(p_projectList) ? p_projectList : []);
                });
                return p_projectApi.getByFreelancerWithStatus("completed").then(function (p_projectList) {
                    p_$scope.completedProjects = (p_utils.isArray(p_projectList) ? p_projectList : []);
                });
            }

            p_$scope.init = function () {
                var tasks = [];

                p_$scope.isEditMode = false;
                p_$scope.selectedProject = null;
                p_$scope.errorMsgs = [];
                p_$scope.projects = p_models.array([], transaction.trnProject);
                p_$scope.completedProjects = p_models.array([], transaction.trnProject);
                return p_$q.all(tasks).then(function () {
                    return p_$scope.refresh().then(function () {
                    });
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            p_$scope.newProject = function () {
                p_$scope.selectedProject = p_models.new(transaction.trnProject, {});
                p_$scope.isEditMode = true;
            }

            p_$scope.save = function (p_project) {
                var tasks = [];

                if (!p_project.id)
                    tasks.push(p_projectApi.add(p_project));
                else
                    tasks.push(p_projectApi.modify(p_project));

                return p_$q.all(tasks).then(function (p_result) {
                    var result = p_utils.isArray(p_result) ? p_result[0] : p_result;
                    if (p_utils.isObject(result) && p_utils.isArray(result.errorMsgs) && result.errorMsgs.length === 0)
                        return p_$scope.refresh().then(function () {
                            p_$scope.completeEdit();
                        });

                    else if (p_utils.isArray(result.errorMsgs) && result.errorMsgs.length > 0)
                        p_$scope.errorMsgs = result.errorMsgs;
                    else if (!p_utils.isObject(result))
                        p_$scope.errorMsgs = ['Save failed'];
                });
            }

            p_$scope.completeEdit = function () {
                p_$scope.isEditMode = false;
                p_$scope.selectedProject = null;
            }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));
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
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Private
    // --------------------------------------------------------------------------------
    var pageName = "vendorUsers";
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
                return p_$q.resolve();
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
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // TODO
    // --------------------------------------------------------------------------------
    fincam.directive = function (
        p_$rootScope,
        p_$scope,
        p_$stateParams,
        p_$state,
        p_$parse,
        p_$q,
        p_$window,
        p_$timeout,
        p_$interval,
        p_controllerName
    ) {
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

        p_$scope.trigger = function (p_parsing, p_params, p_event) {
            p_$rootScope.stopPropagation(p_event);
            if (fincam.isNullOrUndefined(p_parsing) || !fincam.isString(p_parsing)) {
                return;
            }

            var func = p_$parse(p_parsing);
            return func(p_$scope.$parent, p_params);
        }

        var digestHandler;
        p_$scope.digest = function (p_action) {
            p_action();
            clearTimeout(digestHandler);
            digestHandler = setTimeout(function () {
                p_$scope.$digest();
            }, 100);
        }

        var applyHandler;
        p_$scope.apply = function (p_action) {
            p_action();
            clearTimeout(applyHandler);
            applyHandler = setTimeout(function () {
                p_$scope.$apply();
            }, 100);
        }
    }

})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Variables
    // --------------------------------------------------------------------------------
    var directiveName = "ficCustomerProjectFilePresentation";
    var directiveControllerName = "directives." + directiveName + "Controller";
    var templateUrl = "/templates/directives/customer/project/file/presentation/customer-project-file-presentation.html";

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
        "services.utils",
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
            p_utils,
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
                return false;
            }

            p_$scope.init = function () {
                if (!p_$scope.value)
                    return p_$q.reject();

                var projectIdentifier = "";

                if (p_$scope.options && p_utils.isObject(p_$scope.options.project) && p_$scope.options.project.id)
                    projectIdentifier = p_$scope.options.project.identifier;
               
                
                if (p_$scope.value.thumbnail != null && p_$scope.value.thumbnail !="" )
                    p_$scope.thumbnailPresentationUrl = p_projectFilesApi.getDefaultPresentationSrc(p_$scope.value.thumbnail, "");
                else
                    p_$scope.thumbnailPresentationUrl = p_projectFilesApi.getDefaultPresentationSrc(p_$scope.value.id, "");
                p_$scope.originalPresentationUrl = p_projectFilesApi.getDefaultPresentationSrc(p_$scope.value.id, "");

                return p_$q.all([]).then(function () {
                }).finally(function () {
                    p_$scope.ready = true;
                    p_$scope.loading = false;
                });
            }

            p_$scope.isFileSelected = function () {
                return p_$scope.value.currentApprovedState;
            }

            p_$scope.toggleFileSelection = function () {
                p_$scope.value.currentApprovedState = !p_$scope.value.currentApprovedState;
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
        function (
            p_$rootScope,
            p_$stateParams,
            p_$state,
            p_$parse,
            p_$q,
            p_$timeout,
            p_$interval,
            undefined
        ) {
            return {
                restrict: "E",
                require: "^ngModel",
                template: ng.fincam.template(templateUrl),
                controller: directiveControllerName,
                scope: {
                    value: "=ngModel",
                    options: "="
                },
                link: function (p_$scope, p_$element, p_$attrs, p_$ngModel) {
                    // --------------------------------------------------------------------------------
                    // Events
                    // --------------------------------------------------------------------------------

                    // --------------------------------------------------------------------------------
                    // Render
                    // --------------------------------------------------------------------------------
                    p_$scope.init();
                }
            };
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));
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
    var directiveName = "ficAfterRender";
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
            return {
                restrict: "A",
                terminal:true,
                controller: directiveControllerName,
                link: function (p_$scope, p_$element, p_$attrs) {
                    var afterRenderCallback = function () {
                        //var func = p_$parse(p_$attrs.ficAfterRender);
                        //func(p_$scope, { $element: p_$element });
                        p_$scope.$emit(p_$attrs.ficAfterRender, { $element: p_$element });
                    };

                    if (p_$scope.$last === true)
                        p_$timeout(afterRenderCallback, 0);
                }
            };
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Variables
    // --------------------------------------------------------------------------------
    var directiveName = "ficAppFooter";
    var directiveControllerName = "directives." + directiveName + "Controller";
    var templateUrl = "/templates/directives/app-footer.html";

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
            p_$scope.init = function () {
                return p_$q.all([]).then(function () {
                }).finally(function () {
                    p_$scope.ready = true;
                    p_$scope.loading = false;
                });
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
        function (
            p_$rootScope,
            p_$stateParams,
            p_$state,
            p_$parse,
            p_$q,
            p_$timeout,
            p_$interval,
            undefined
        ) {
            return {
                restrict: "E",
                template: ng.fincam.template(templateUrl),
                controller: directiveControllerName,
                scope: {
                },
                link: function (p_$scope, p_$element, p_$attrs) {
                    // --------------------------------------------------------------------------------
                    // Events
                    // --------------------------------------------------------------------------------

                    // --------------------------------------------------------------------------------
                    // Render
                    // --------------------------------------------------------------------------------
                    p_$scope.init();
                }
            };
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));
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
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Variables
    // --------------------------------------------------------------------------------
    var directiveName = "ficCustomerAppHeader";
    var directiveControllerName = "directives." + directiveName + "Controller";
    var templateUrl = "/templates/directives/customer/customer-app-header.html";

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
        "$location",
        "$timeout",
        "$interval",
        "services.utils",
        function (
            p_$rootScope,
            p_$scope,
            p_$stateParams,
            p_$state,
            p_$parse,
            p_$q,
            p_$window,
            p_$location,
            p_$timeout,
            p_$interval,
            p_utils,
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
            p_$scope.init = function () {
                return p_$q.all([]).then(function () {
                }).finally(function () {
                    p_$scope.ready = true;
                    p_$scope.loading = false;
                });
            }

            p_$scope.browseProjects = function () {
                return p_$state.go("customer-projects", {});
            }

            p_$scope.registerVendor = function () {
                p_$window.location.href = "/vendor-signup";
            }

            p_$scope.logout = function () {
                return p_$rootScope.logout().then(function () {
                    p_$window.location.href = "/";
                });
            }

            p_$scope.browseShortlistedVendors = function () {
                return p_$state.go("vendor-shortlist", {});
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
        function (
            p_$rootScope,
            p_$stateParams,
            p_$state,
            p_$parse,
            p_$q,
            p_$timeout,
            p_$interval,
            undefined
        ) {
            return {
                restrict: "E",
                template: ng.fincam.template(templateUrl),
                controller: directiveControllerName,
                scope: {
                },
                link: function (p_$scope, p_$element, p_$attrs) {
                    // --------------------------------------------------------------------------------
                    // Events
                    // --------------------------------------------------------------------------------

                    // --------------------------------------------------------------------------------
                    // Render
                    // --------------------------------------------------------------------------------
                    p_$scope.init();
                }
            };
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Variables
    // --------------------------------------------------------------------------------
    var directiveName = "ficVendorAppHeader";
    var directiveControllerName = "directives." + directiveName + "Controller";
    var templateUrl = "/templates/directives/vendor/vendor-app-header.html";

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
            p_$scope.init = function () {
                return p_$q.all([]).then(function () {
                }).finally(function () {
                    p_$scope.ready = true;
                    p_$scope.loading = false;
                });
            }

            p_$scope.vendorLogout = function () {
                return p_$rootScope.logout().then(function () {
                    p_$window.location.href = "/";
                });
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
        function (
            p_$rootScope,
            p_$stateParams,
            p_$state,
            p_$parse,
            p_$q,
            p_$timeout,
            p_$interval,
            undefined
        ) {
            return {
                restrict: "E",
                template: ng.fincam.template(templateUrl),
                controller: directiveControllerName,
                scope: {
                },
                link: function (p_$scope, p_$element, p_$attrs) {
                    // --------------------------------------------------------------------------------
                    // Events
                    // --------------------------------------------------------------------------------

                    // --------------------------------------------------------------------------------
                    // Render
                    // --------------------------------------------------------------------------------
                    p_$scope.init();
                }
            };
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Variables
    // --------------------------------------------------------------------------------
    var directiveName = "ficVendorGridExplorer";
    var directiveControllerName = "directives." + directiveName + "Controller";
    var templateUrl = "/templates/directives/vendor/explorer/vendor-grid-explorer.html";

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
        "services.utils",
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
            p_utils,
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
                return false;
            }

            p_$scope.init = function () {
                return p_$q.all([]).then(function () {
                }).finally(function () {
                    p_$scope.ready = true;
                    p_$scope.loading = false;
                });
            }

            p_$scope.viewVendor = function (p_vendor) {
                return p_$state.go("vendor-detail", {
                    vendorId: p_vendor.id
                });
            }

            p_$scope.selectVendor = function (p_vendor) {
                if (p_$scope.isDisabled() || p_utils.isNullOrUndefined(p_$scope.selectVendorHandler) || !p_utils.isString(p_$scope.selectVendorHandler)) {
                    return false;
                }

                return p_$scope.trigger(p_$scope.selectVendorHandler, { $vendor: p_vendor });
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
        function (
            p_$rootScope,
            p_$stateParams,
            p_$state,
            p_$parse,
            p_$q,
            p_$timeout,
            p_$interval,
            undefined
        ) {
            return {
                restrict: "E",
                require: "^ngModel",
                template: ng.fincam.template(templateUrl),
                controller: directiveControllerName,
                scope: {
                    value: "=ngModel",
                    selectVendorHandler: "@selectVendor"
                },
                link: function (p_$scope, p_$element, p_$attrs, p_$ngModel) {
                    // --------------------------------------------------------------------------------
                    // Events
                    // --------------------------------------------------------------------------------

                    // --------------------------------------------------------------------------------
                    // Render
                    // --------------------------------------------------------------------------------
                    p_$scope.init();
                }
            };
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Variables
    // --------------------------------------------------------------------------------
    var directiveName = "ficVendorListExplorer";
    var directiveControllerName = "directives." + directiveName + "Controller";
    var templateUrl = "/templates/directives/vendor/explorer/vendor-list-explorer.html";

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
        "services.utils",
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
            p_utils,
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
                return false;
            }

            p_$scope.init = function () {
                return p_$q.all([]).then(function () {
                }).finally(function () {
                    p_$scope.ready = true;
                    p_$scope.loading = false;
                });
            }

            p_$scope.viewVendor = function (p_vendor) {
                return p_$state.go("vendor-detail", {
                    vendorId: p_vendor.id
                });
            }

            p_$scope.selectVendor = function (p_vendor) {
                if (p_$scope.isDisabled() || p_utils.isNullOrUndefined(p_$scope.selectVendorHandler) || !p_utils.isString(p_$scope.selectVendorHandler)) {
                    return false;
                }

                return p_$scope.trigger(p_$scope.selectVendorHandler, { $vendor: p_vendor });
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
        function (
            p_$rootScope,
            p_$stateParams,
            p_$state,
            p_$parse,
            p_$q,
            p_$timeout,
            p_$interval,
            undefined
        ) {
            return {
                restrict: "E",
                require: "^ngModel",
                template: ng.fincam.template(templateUrl),
                controller: directiveControllerName,
                scope: {
                    value: "=ngModel",
                    selectVendorHandler: "@selectVendor"
                },
                link: function (p_$scope, p_$element, p_$attrs, p_$ngModel) {
                    // --------------------------------------------------------------------------------
                    // Events
                    // --------------------------------------------------------------------------------

                    // --------------------------------------------------------------------------------
                    // Render
                    // --------------------------------------------------------------------------------
                    p_$scope.init();
                }
            };
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Variables
    // --------------------------------------------------------------------------------
    var directiveName = "ficVendorGridItemPresentation";
    var directiveControllerName = "directives." + directiveName + "Controller";
    var templateUrl = "/templates/directives/vendor/presentation/vendor-grid-item-presentation.html";

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
        "services.utils",
        "api.masterVendorApi",
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
            p_utils,
            p_masterVendorApi,
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
            p_$scope.init = function () {
                var tasks = [];

                tasks.push(p_masterVendorApi.getDefaultPresentationSrc(p_$scope.value.id).then(function (p_presentationUrl) {
                    p_$scope.presentationUrl = p_presentationUrl;
                }));

                return p_$q.all(tasks).then(function () {
                }).finally(function () {
                    p_$scope.ready = true;
                    p_$scope.loading = false;
                });
            }

            p_$scope.isDisabled = function () {
                return false;
            }

            p_$scope.selectVendor = function () {
                if (p_$scope.isDisabled() || p_utils.isNullOrUndefined(p_$scope.selectVendorHandler) || !p_utils.isString(p_$scope.selectVendorHandler)) {
                    return false;
                }

                return p_$scope.trigger(p_$scope.selectVendorHandler, { $vendor: p_$scope.value });
            }

            p_$scope.viewVendor = function () {
                if (p_$scope.isDisabled() || p_utils.isNullOrUndefined(p_$scope.viewVendorHandler) || !p_utils.isString(p_$scope.viewVendorHandler)) {
                    return false;
                }

                return p_$scope.trigger(p_$scope.viewVendorHandler, { $vendor: p_$scope.value });
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
        function (
            p_$rootScope,
            p_$stateParams,
            p_$state,
            p_$parse,
            p_$q,
            p_$timeout,
            p_$interval,
            undefined
        ) {
            return {
                restrict: "E",
                require: "^ngModel",
                template: ng.fincam.template(templateUrl),
                controller: directiveControllerName,
                scope: {
                    value: "=ngModel",
                    selectVendorHandler: "@selectVendor",
                    viewVendorHandler: "@viewVendor"
                },
                link: function (p_$scope, p_$element, p_$attrs, p_$ngModel) {
                    // --------------------------------------------------------------------------------
                    // Events
                    // --------------------------------------------------------------------------------

                    // --------------------------------------------------------------------------------
                    // Render
                    // --------------------------------------------------------------------------------
                    p_$scope.init();
                }
            };
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Variables
    // --------------------------------------------------------------------------------
    var directiveName = "ficVendorListItemPresentation";
    var directiveControllerName = "directives." + directiveName + "Controller";
    var templateUrl = "/templates/directives/vendor/presentation/vendor-list-item-presentation.html";

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
        "services.utils",
        "api.masterVendorApi",
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
            p_utils,
            p_masterVendorApi,
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
            p_$scope.init = function () {
                var tasks = [];

                tasks.push(p_masterVendorApi.getDefaultPresentationSrc(p_$scope.value.id).then(function (p_presentationUrl) {
                    p_$scope.presentationUrl = p_presentationUrl;
                }));

                return p_$q.all(tasks).then(function () {
                }).finally(function () {
                    p_$scope.ready = true;
                    p_$scope.loading = false;
                });
            }

            p_$scope.isDisabled = function () {
                return false;
            }

            p_$scope.selectVendor = function () {
                if (p_$scope.isDisabled() || p_utils.isNullOrUndefined(p_$scope.selectVendorHandler) || !p_utils.isString(p_$scope.selectVendorHandler)) {
                    return false;
                }

                return p_$scope.trigger(p_$scope.selectVendorHandler, { $vendor: p_$scope.value });
            }

            p_$scope.viewVendor = function () {
                if (p_$scope.isDisabled() || p_utils.isNullOrUndefined(p_$scope.viewVendorHandler) || !p_utils.isString(p_$scope.viewVendorHandler)) {
                    return false;
                }

                return p_$scope.trigger(p_$scope.viewVendorHandler, { $vendor: p_$scope.value });
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
        function (
            p_$rootScope,
            p_$stateParams,
            p_$state,
            p_$parse,
            p_$q,
            p_$timeout,
            p_$interval,
            undefined
        ) {
            return {
                restrict: "E",
                require: "^ngModel",
                template: ng.fincam.template(templateUrl),
                controller: directiveControllerName,
                scope: {
                    value: "=ngModel",
                    selectVendorHandler: "@selectVendor",
                    viewVendorHandler: "@viewVendor"
                },
                link: function (p_$scope, p_$element, p_$attrs, p_$ngModel) {
                    // --------------------------------------------------------------------------------
                    // Events
                    // --------------------------------------------------------------------------------

                    // --------------------------------------------------------------------------------
                    // Render
                    // --------------------------------------------------------------------------------
                    p_$scope.init();
                }
            };
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Variables
    // --------------------------------------------------------------------------------
    var directiveName = "ficCustomerProjectGridItemPresentation";
    var directiveControllerName = "directives." + directiveName + "Controller";
    var templateUrl = "/templates/directives/customer/project/presentation/customer-project-grid-item-presentation.html";

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
        "api.projectApi",
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
            p_projectApi,
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
                return false;
            }

            p_$scope.init = function () {
                if (!p_$scope.value)
                    return p_$q.reject();

                var tasks = [];

                //p_$scope.defaultPresentationUrl = "https://localhost:44348/api/transaction/project/get-default-presentation/1?t=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiZmZlYzNmZTQtMWYyMy00NGQ1LWEzNTktMWYwOTQ2MWJmNDE2IiwibmFtZSI6IkZyYW1lIG4gc21pbGUiLCJ1c2VybmFtZSI6InNpdmEuZW52aXNpb25AZ21haWwuY29tIiwiZW1haWwiOiJzaXZhLmVudmlzaW9uQGdtYWlsLmNvbSIsIklzVmVuZG9yIjoiVHJ1ZSIsIlZlbmRvcklkIjoiMSIsIlZlbmRvcklkZW50aWZpZXIiOiJkMjUwNDM2NC01NTMyLTQ2MTItYjk4MS00NDk2NDkwODdhYmEiLCJhdWQiOlsiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzOTMvIiwiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzOTMvIl0sImV4cCI6MTYxMjEyMzc4NCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNDgvIn0.0SndEjH6hBBoedLeTh_PtHJcIwaVgWrQsKe7GiXmDPs";

                tasks.push(p_projectApi.getDefaultPresentationSrc(p_$scope.value.id).then(function (p_presentationUrl) {
                    p_$scope.defaultPresentationUrl = p_presentationUrl;
                }));

                return p_$q.all(tasks).then(function () {
                }).finally(function () {
                    p_$scope.ready = true;
                    p_$scope.loading = false;
                });
            }

            p_$scope.isShareEnabled = function () {
                return p_$scope.options && p_$scope.options.shareable;
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
        function (
            p_$rootScope,
            p_$stateParams,
            p_$state,
            p_$parse,
            p_$q,
            p_$timeout,
            p_$interval,
            undefined
        ) {
            return {
                restrict: "E",
                require: "^ngModel",
                template: ng.fincam.template(templateUrl),
                controller: directiveControllerName,
                scope: {
                    value: "=ngModel",
                    options:"="
                },
                link: function (p_$scope, p_$element, p_$attrs, p_$ngModel) {
                    // --------------------------------------------------------------------------------
                    // Events
                    // --------------------------------------------------------------------------------

                    // --------------------------------------------------------------------------------
                    // Render
                    // --------------------------------------------------------------------------------
                    p_$scope.init();
                }
            };
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Variables
    // --------------------------------------------------------------------------------
    var directiveName = "ficCustomerProjectGridExplorer";
    var directiveControllerName = "directives." + directiveName + "Controller";
    var templateUrl = "/templates/directives/customer/project/explorer/customer-project-grid-explorer.html";

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
                return false;
            }

            p_$scope.init = function () {
                return p_$q.all([]).then(function () {
                }).finally(function () {
                    p_$scope.ready = true;
                    p_$scope.loading = false;
                });
            }

            p_$scope.viewProject = function (p_project) {
                return p_$state.go("freelancer-project-view", {
                    identifier: p_project.identifier
                });
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
        function (
            p_$rootScope,
            p_$stateParams,
            p_$state,
            p_$parse,
            p_$q,
            p_$timeout,
            p_$interval,
            undefined
        ) {
            return {
                restrict: "E",
                require: "^ngModel",
                template: ng.fincam.template(templateUrl),
                controller: directiveControllerName,
                scope: {
                    value: "=ngModel",
                    options: "="
                },
                link: function (p_$scope, p_$element, p_$attrs, p_$ngModel) {
                    // --------------------------------------------------------------------------------
                    // Events
                    // --------------------------------------------------------------------------------

                    // --------------------------------------------------------------------------------
                    // Render
                    // --------------------------------------------------------------------------------
                    p_$scope.init();
                }
            };
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Variables
    // --------------------------------------------------------------------------------
    var directiveName = "ficCustomerProjectFileExplorer";
    var directiveControllerName = "directives." + directiveName + "Controller";
    var templateUrl = "/templates/directives/customer/project/file/customer-project-file-explorer.html";

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
                return false;
            }

            p_$scope.init = function () {
                return p_$q.all([]).then(function () {
                }).finally(function () {
                    p_$scope.ready = true;
                    p_$scope.loading = false;
                });
            }

            p_$scope.getFileThumbnailPresentation = function (p_file) {
                return p_projectFilesApi.getDefaultPresentationSrc(p_file.id,"");
            }

            p_$scope.getFilePresentation = function (p_file) {
                return p_projectFilesApi.getDefaultPresentationSrc(p_file.id,"");
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
        function (
            p_$rootScope,
            p_$stateParams,
            p_$state,
            p_$parse,
            p_$q,
            p_$timeout,
            p_$interval,
            undefined
        ) {
            return {
                restrict: "E",
                require: "^ngModel",
                template: ng.fincam.template(templateUrl),
                controller: directiveControllerName,
                scope: {
                    value: "=ngModel",
                    options:"="
                },
                link: function (p_$scope, p_$element, p_$attrs, p_$ngModel) {
                    // --------------------------------------------------------------------------------
                    // Events
                    // --------------------------------------------------------------------------------

                    // --------------------------------------------------------------------------------
                    // Render
                    // --------------------------------------------------------------------------------
                    p_$scope.init();
                }
            };
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Variables
    // --------------------------------------------------------------------------------
    var directiveName = "ficVendorHomeProjectsEditForm";
    var directiveControllerName = "directives." + directiveName + "Controller";
    var templateUrl = "/templates/directives/vendor/home/projects/vendor-home-projects-edit-form.html";

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
        "services.utils",
        "api.accountApi",
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
            p_utils,
            p_accountApi,
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
                return false;;
            }

            p_$scope.init = function () {
                if (!p_$scope.value)
                    return p_$q.reject();

                p_$scope.initValidationOptions();

                var today = new Date();

                p_$scope.value.projectDate = today;

                return p_$q.all([]).then(function () {
                }).finally(function () {
                    p_$scope.ready = true;
                });
            }

            p_$scope.getTitle = function () {
                if (p_$scope.value.id && p_$scope.value.id > 0)
                    return "Edit " + p_$scope.value.projectName;

                return "New Project";
            }

            p_$scope.initValidationOptions = function () {
                p_$scope.saveProjectValidationOptions = {
                    rules: {
                        name: {
                            required: true
                        },
                        date: {
                            required: true
                        },
                        customerName: {
                            required: true
                        },
                        customerEmail: {
                            required: true,
                            email: true
                        },
                        customerMobile: {
                            required: true,
                            mobileIndia: true
                        },
                        customerCity: {
                            required: true
                        }
                    },
                    messages: {
                        name: "",
                        date: "",
                        customerName: "",
                        customerEmail: "",
                        customerMobile: {
                            required: "",
                            mobileIndia: "Invalid mobile number"
                        },
                        customerCity: ""
                    }
                };
            }

            p_$scope.save = function (p_projectEditForm) {
                if (p_projectEditForm.validate()) {
                    return p_$scope.saveProject();
                }
            }

            p_$scope.cancelEdit = function () {
                if (p_$scope.isDisabled() || p_utils.isNullOrUndefined(p_$scope.cancelEditHandler) || !p_utils.isString(p_$scope.cancelEditHandler)) {
                    return false;
                }

                return p_$scope.trigger(p_$scope.cancelEditHandler, {});
            }

            p_$scope.saveProject = function () {
                if (p_$scope.isDisabled() || p_utils.isNullOrUndefined(p_$scope.saveProjectHandler) || !p_utils.isString(p_$scope.saveProjectHandler)) {
                    return false;
                }

                return p_$scope.trigger(p_$scope.saveProjectHandler, { $project: p_$scope.value });
            }

            p_$scope.getCustomer = function (email) {
                p_accountApi.getCustomer({ 'email': email })
                    .then(function (result) {
                        console.log(p_$scope.value);
                        p_$scope.value.customerName = result.customerName;
                        p_$scope.value.customerId = result.customerId;
                        p_$scope.value.customerEmail = result.customerEmail;
                        p_$scope.value.customerMobileNo = result.customerMobileNo;
                        p_$scope.value.customerCity = result.customerCity;
                        p_$scope.value.customerAlternateMobileNo = result.customerAltMobileNo;
                        p_$scope.value.customerPin = result.customerPin;
                        p_$scope.value.customerAddress1 = result.customerAddressLine1;
                        p_$scope.value.customerAddress2 = result.customerAddressLine2;
                        //p_$scope.value = result;
                    })
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
        function (
            p_$rootScope,
            p_$stateParams,
            p_$state,
            p_$parse,
            p_$q,
            p_$timeout,
            p_$interval,
            undefined
        ) {
            return {
                restrict: "E",
                require: "^ngModel",
                template: ng.fincam.template(templateUrl),
                controller: directiveControllerName,
                scope: {
                    value: "=ngModel",
                    disabled: "=ngDisabled",
                    saveProjectHandler: "@saveProject",
                    cancelEditHandler: "@cancelEdit",
                    getCustomerHandler:"@getCustomer"
                },
                link: function (p_$scope, p_$element, p_$attrs, p_$ngModel) {
                    // --------------------------------------------------------------------------------
                    // Events
                    // --------------------------------------------------------------------------------

                    // --------------------------------------------------------------------------------
                    // Render
                    // --------------------------------------------------------------------------------
                    p_$scope.init();
                }
            };
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));
(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    // --------------------------------------------------------------------------------
    // Variables
    // --------------------------------------------------------------------------------
    var directiveName = "ficVendorHomeProjectsView";
    var directiveControllerName = "directives." + directiveName + "Controller";
    var templateUrl = "/templates/directives/vendor/home/projects/vendor-home-projects-view.html";

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
                return false;
            }

            p_$scope.init = function () {
                return p_$q.all([]).then(function () {
                }).finally(function () {
                    p_$scope.ready = true;
                });
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
        function (
            p_$rootScope,
            p_$stateParams,
            p_$state,
            p_$parse,
            p_$q,
            p_$timeout,
            p_$interval,
            undefined
        ) {
            return {
                restrict: "E",
                require: "^ngModel",
                template: ng.fincam.template(templateUrl),
                controller: directiveControllerName,
                scope: {
                    value: "=ngModel"
                },
                link: function (p_$scope, p_$element, p_$attrs, p_$ngModel) {
                    // --------------------------------------------------------------------------------
                    // Events
                    // --------------------------------------------------------------------------------

                    // --------------------------------------------------------------------------------
                    // Render
                    // --------------------------------------------------------------------------------
                    p_$scope.init();
                }
            };
        }
    ]);
})(jQuery, angular, document.children[0].hasAttribute("debug"));
angular.module("app")
.constant("clientConfig", {
  "fincamApiUrl": "http://localhost:5000"
});
