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