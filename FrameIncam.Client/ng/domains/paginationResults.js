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