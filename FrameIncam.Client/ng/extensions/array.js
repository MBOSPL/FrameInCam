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