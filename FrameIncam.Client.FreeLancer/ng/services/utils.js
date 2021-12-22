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