/*jslint node: true,nomen: true */
/*globals console,require,__dirname*/

"use strict";

var _ = require("underscore");
var mustache = require("mustache");
var file = require("./fileManager");
var moment = require('moment');

function renderComponent(website, path, pageModel) {
    var component = file.getComponent(website, path),
        componentTemplate = file.getComponentTemplate(website, component.template),
        model = _.extend(pageModel, component.model);
    return mustache.render(componentTemplate, model);
}

function renderPage(website, path) {
    var page = file.getPage(website, path),
        pageTemplate = file.getPageTemplate(website, page.template),
        key,
        component,
        finalMarkup = "",
        pageModel = page.model;

    page.model.year = new Date().getFullYear();
    page.model.formatDateHuman = function () {
        return function (text, render) {
            return moment(render(text)).format("MMM DD, YYYY");
        };
    };

    for (key in page.manifest) {
        if (page.manifest.hasOwnProperty(key)) {
            component = renderComponent(website, page.manifest[key], pageModel);
            pageModel[key] = component;
        }
    }

    finalMarkup = mustache.render(pageTemplate, pageModel);

    return finalMarkup;
}

function renderLevel(website, folder) {
    console.log("Rendering: " + folder);
    var pageData = renderPage(website, folder),
        childFolders = file.getPageChildFolders(website, folder);

    file.writePage(website, folder, "index.shtml", pageData);

    childFolders.forEach(function (child) {
        renderLevel(website, folder + "/" + child);
    });
}

exports.renderWebsite = function (website) {
    file.cleanPublishFolder(website);
    renderLevel(website, "");
    file.copyStaticContent(website);
};

exports.renderPage = function (website, path) {
    return renderPage(website, path);
};
