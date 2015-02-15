/*jslint node: true,nomen: true */
/*globals console,require,__dirname*/

"use strict";

var file = require("./fileManager");
var engine = require("./publishingEngine");
var root = (process.argv[2] !== undefined)?process.argv[2]:"";

try {
    //var page = engine.renderPage("paulkimbrel-com", "/blog");
    //console.log(page);
    engine.renderWebsite("paulkimbrel-com", root);
} catch (e) {
    console.log("Error in operation '" + e.syscall + "'");
    console.log(e.message);
}