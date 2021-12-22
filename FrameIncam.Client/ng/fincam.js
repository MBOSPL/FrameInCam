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