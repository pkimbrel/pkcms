/*jslint nomen: true */
/*globals console,require,__dirname*/

var _ = require('underscore');
var mustache = require("mustache");
var file = require("./fileManager");

var websites = file.getWebsites();

var page = file.getPage("paulkimbrel-com", "/blog");
var component = file.getComponent("paulkimbrel-com", "/content/blog");
var componentTemplate = file.getComponentTemplate("paulkimbrel-com", component.template);

var model = _.extend(page.model, component.model);


console.log(mustache.render(componentTemplate, model));
