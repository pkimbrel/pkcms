/*jslint nomen: true */
/*globals console,require,__dirname*/

var fs = require("fs");
var mustache = require("./lib/mustache.js");
var file = require("./lib/file.js");

var ROOT = __dirname + "/..";
var WEBSITE_ROOT = ROOT + "/websites";

var websites = fs.readdirSync(WEBSITE_ROOT);
console.log(websites);

var view = {
    "articles": [
        {
            "title": "Entry #1",
            "body": "This is the body of the first article"
        },
        {
            "title": "Entry #2",
            "body": "This is the body of the second article"
        },
        {
            "title": "Entry #3",
            "body": "This is the body of the third article"
        },
        {
            "title": "Entry #4",
            "body": "This is the body of the forth article"
        },
        {
            "title": "Entry #5",
            "body": "This is the body of the fifth article"
        },
        {
            "title": "Entry #6",
            "body": "This is the body of the sixth article"
        },
        {
            "title": "Entry #7",
            "body": "This is the body of the seventh article"
        }
    ]
};

var template = fs.readFileSync(__dirname + "/../websites/paulkimbrel-com/pages/blog/index.html", {
    "encoding": "utf8"
});


console.log(mustache.render(template, view));