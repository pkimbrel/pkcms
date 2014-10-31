/*jslint node: true,nomen: true */
/*globals console,require,__dirname*/

"use strict";

var _ = require("underscore");
var mustache = require("mustache");
var file = require("./fileManager");

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

    var childPages = file.getChildPages(website, folder);
    childPages.forEach(function (child) {
        renderLevel(website, folder + "/" + child);
    });
}

exports.renderWebsite = function (website) {
    renderLevel(website, "");
};

exports.renderPage = function (website, path) {
    return renderPage(website, path);
};