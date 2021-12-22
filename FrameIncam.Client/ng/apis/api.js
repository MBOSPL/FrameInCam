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