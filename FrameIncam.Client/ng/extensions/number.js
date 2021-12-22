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