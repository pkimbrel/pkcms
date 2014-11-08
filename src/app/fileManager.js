/*jslint node: true,nomen: true */
/*globals exports */

"use strict";

var fs = require("fs-extra");
var S = require('string');

var FOLDER_ROOT = __dirname + "/../..";
var WEBSITE_ROOT = FOLDER_ROOT + "/websites";
var PUB_ROOT = FOLDER_ROOT + "/staging";

exports.getWebsites = function () {
    var websites = fs.readdirSync(WEBSITE_ROOT),
        returnValue = [];
    websites.forEach(function (website) {
        var sWebsite = new S(website);
        if (!sWebsite.startsWith(".")) {
            returnValue.push(website);
        }
    });
    return returnValue;
};

exports.getPageChildFolders = function (website, path) {
    var folders = fs.readdirSync(WEBSITE_ROOT + "/" + website + "/03-pages" + path),
        returnValue = [];
    folders.forEach(function (folder) {
        var sFolder = new S(folder);

        if (!sFolder.startsWith(".") && !sFolder.endsWith(".json")) {
            returnValue.push(folder);
        }
    });
    return returnValue;
};

exports.copyStaticContent = function (website) {
    var src = WEBSITE_ROOT + "/" + website + "/04-static",
        dest = PUB_ROOT + "/" + website;
    
    fs.copySync(src, dest);
    
    return;
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

exports.writePage = function (website, path, fileName, fileData) {
    var newPath = PUB_ROOT + "/" + website + path;
    if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath, "0755");
    }
    fs.writeFileSync(newPath + "/" + fileName, fileData, {
        "encoding": "utf8",
        "mode": "0644"
    });
};

exports.cleanPublishFolder = function (website) {
    var path = PUB_ROOT + "/" + website;

    fs.removeSync(PUB_ROOT + "/" + website);
    fs.mkdirsSync(PUB_ROOT + "/" + website, "0755");
};
