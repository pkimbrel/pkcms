/*jslint node: true,nomen: true */
/*globals exports */

"use strict";

var fs = require("fs");
var S = require('string');

var FOLDER_ROOT = __dirname + "/..";
var WEBSITE_ROOT = FOLDER_ROOT + "/websites";

exports.getWebsites = function () {
    var websites = fs.readdirSync(WEBSITE_ROOT),
        returnValue = [];
    websites.forEach(function (website) {
        if (!S(website).startsWith(".")) {
            returnValue.push(website);
        }
    });
    return returnValue;
};

exports.getChildPages = function (website, path) {
    var folders = fs.readdirSync(WEBSITE_ROOT + "/" + website + "/03-pages" + path),
        returnValue = [];
    folders.forEach(function (folder) {
        if (!S(folder).startsWith(".") && !S(folder).endsWith(".json")) {
            returnValue.push(folder);
        }
    });
    return returnValue;
};

exports.getComponent = function (website, path) {
    var returnValue = fs.readFileSync(WEBSITE_ROOT + "/" + website + "/02-components" + path + ".json", {
        "encoding": "utf8"
    });

    return JSON.parse(returnValue);
};

exports.getComponentTemplate = function (website, path) {
    var returnValue = fs.readFileSync(WEBSITE_ROOT + "/" + website + "/01-design/component-templates" + path + ".html", {
        "encoding": "utf8"
    });

    return returnValue;
};

exports.getPage = function (website, path) {
    var returnValue = fs.readFileSync(WEBSITE_ROOT + "/" + website + "/03-pages" + path + "/page.json", {
        "encoding": "utf8"
    });

    return JSON.parse(returnValue);
};

exports.getPageTemplate = function (website, path) {
    var returnValue = fs.readFileSync(WEBSITE_ROOT + "/" + website + "/01-design/page-templates" + path + ".html", {
        "encoding": "utf8"
    });

    return returnValue;
};