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