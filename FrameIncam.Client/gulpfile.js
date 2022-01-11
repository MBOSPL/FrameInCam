﻿"use strict";

var fs = require("fs");
var path = require('path');
var merge = require('merge-stream');
var gulp = require('gulp');

//var hash = require('gulp-hash');
function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function (file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

function getFiles(dir, p_filter) {
    return fs.readdirSync(dir)
        .filter(function (file) {
            return fs.statSync(path.join(dir, file)).isFile()
                && (!p_filter
                    || p_filter(file));
        });
}
gulp.task('hello', function () {
    console.log('Hello Zell');
});

var gulp = require("gulp"),
    nop = require("gulp-nop"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    htmlmin = require('gulp-htmlmin'),
    gulpNgConfig = require('gulp-ng-config'),
    addStream = require('add-stream');

function getAppConfig() {
    return gulp.src('clientsettings.json').pipe(gulpNgConfig('app', { createModule: false, pretty: true }));
}

gulp.task('ng.css', function () {
    return gulp.src([
        "node_modules/angular-loading-bar/build/loading-bar.css",
        "node_modules/bootstrap-select/dist/css/bootstrap-select.css",
        "node_modules/viewerjs/dist/viewer.css",
        "node_modules/jquery-confirm/dist/jquery-confirm.min.css",
        "node_modules/dropzone/dist/min/dropzone.min.css",
        "node_modules/ngdropzone/dist/ng-dropzone.min.css",
        "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css",
        "ng/css/**/*.css",
        "ng/controllers/**/*.css",
        "ng/directives/**/*.css"
    ], { base: "." })
        .pipe(concat("wwwroot/css/ng.css"))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task('_lib', function () {
    return gulp.src([
        "node_modules/angular/angular.js",
        "node_modules/angular-resource/angular-resource.js",
        "node_modules/angular-route/angular-route.js",
        "node_modules/angular-ui-router/release/angular-ui-router.js",
        "node_modules/jquery-validation/dist/jquery.validate.min.js",
        "node_modules/jpkleemans-angular-validate/dist/angular-validate.min.js",
        "node_modules/angular-ui-router/release/angular-ui-router.js",
        "node_modules/angular-loading-bar/build/loading-bar.js",
        "node_modules/linq/linq.js",
        "node_modules/bootstrap-select/dist/js/bootstrap-select.js",
        "node_modules/viewerjs/dist/viewer.js",
        "node_modules/jquery-confirm/dist/jquery-confirm.min.js",
        "node_modules/dropzone/dist/min/dropzone.min.js",
        "node_modules/ngdropzone/dist/ng-dropzone.min.js",
        "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
        "node_modules/angular-ui-sortable/dist/sortable.min.js",
    ], { base: "." })
        .pipe(concat("wwwroot/dist/lib.js"))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task('ng.js', function () {
    return gulp.src([
        "ng/fincam.js",
        "ng/template.js",
        "ng/app.js",
        "ng/route.js",
        "ng/extensions/**/*.js",
        "ng/services/service.js",
        "ng/services/utils.js",
        "ng/services/**/*.js",
        "ng/domains/**/*.js",
        "ng/apis/**/*.js",
        "ng/filters/**/*.js",
        "ng/controllers/controller.js",
        "ng/controllers/**/*.js",
        "ng/directives/directive.js",
        "ng/directives/**/*.js"
    ], { base: "." })
        .pipe(addStream.obj(getAppConfig()))
        .pipe(concat("wwwroot/dist/ng.js", { allowEmpty: true }))
        .pipe(gulp.dest("."));
});


gulp.task('html', gulp.series([
    function minHtml() {
        var tasks = [];
        function createFolderTasks(p_path) {
            var files = getFiles(p_path, function (p_file) {
                return /[.]html$/i.test(p_file)
                    && !/[.]min[.]html$/i.test(p_file);
            });

            if (files
                && files.length) {
                files.map(function (p_file) {
                    var htmlFilePath = path.join(p_path, "/" + p_file);
                    var minHtmlFilePath = path.join(p_path, "/" + p_file.replace(/[.]html$/, ".min.html"));
                    fs.copyFileSync(htmlFilePath, minHtmlFilePath);
                    return gulp.src(minHtmlFilePath)
                        .pipe(htmlmin({
                            collapseWhitespace: true,
                            removeComments: true,
                            includeAutoGeneratedTags: false,
                            caseSensitive: true,
                            keepClosingSlash: true
                        }))
                        .pipe(gulp.dest("."));
                }).forEach(function (p_task) {
                    tasks.push(p_task);
                });
            }

            var folders = getFolders(p_path);
            if (folders
                && folders.length) {
                folders.forEach(function (p_folder) {
                    createFolderTasks(path.join(p_path, p_folder));
                });
            }
        }

        createFolderTasks("wwwroot/templates");
        return merge(tasks);
    },
    function templateJs() {
        var templateJsPath = "ng/template.js";
        var templateJs = fs.readFileSync(templateJsPath, "utf8");
        var templates = [];
        function compileTemplate(p_path) {
            var files = getFiles(p_path, function (p_file) {
                return /[.]min[.]html$/i.test(p_file);
            });

            if (files
                && files.length) {
                files.forEach(function (p_file) {
                    var minHtmlFilePath = path.join(p_path, "/" + p_file);
                    templates.push("        \"" +
                        minHtmlFilePath.replace(/\\/g, "/").replace(/^wwwroot/, "").replace(/.min.html$/i, ".html") +
                        "\": \"" +
                        fs.readFileSync(minHtmlFilePath, "utf8").replace(/\\/g, "\\\\").replace(/["]/g, "\\\"").replace(/\r\n/gi, " ").replace(/\n/gi, " ") +
                        "\""
                    );
                });
            }

            var folders = getFolders(p_path);
            if (folders
                && folders.length) {
                folders.forEach(function (p_folder) {
                    compileTemplate(path.join(p_path, p_folder));
                });
            }
        }

        compileTemplate("wwwroot/templates");
        var firstIndex = templateJs.indexOf("    var cache = {\r\n");
        var lastIndex = templateJs.indexOf("\r\n    }", firstIndex);
        templateJs = templateJs.substr(0, firstIndex + 19)
            + templates.join(",\r\n")
            + templateJs.substr(lastIndex);

        fs.writeFileSync(templateJsPath, templateJs);
        return gulp.src('.')
            .pipe(nop());
    }
]));

gulp.task("__ng", gulp.series([
    gulp.parallel([
        "ng.css",
        "html"
    ]),
    "ng.js"
]));