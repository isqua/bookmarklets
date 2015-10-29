var fs = require('fs');
var path = require('path');
var Stream = require('stream');
var uglify = require("uglify-js");
var gutil = require("gulp-util");
var bookmarklets = require('./src/index');

function getContent(bookmarklets) {
    return Promise.all(bookmarklets.map(getSection))
        .then(function(sections) {
            return sections.join('');
        });
}

function getSection(section) {
    return Promise.all(section.content.map(getBookmarklet(section.id)))
        .then(function(bookmarklets) {
            return [ `<section id="${section.id}"><h2>${section.name}</h2><dl>` ]
                .concat(bookmarklets)
                .concat('</dl></section>')
                .join('');
        });
}

function getBookmarklet(sectionId) {
    return function (bookmarklet) {
        return getCode(sectionId, bookmarklet.id)
            .then(function(code) {
                return `<dt><a href="${code}">${bookmarklet.name}</a></dt><dd>${bookmarklet.text}</dd>`;
            });
    }
}

function getBookmarkletPath(sectionId, bookmarkletId) {
    return path.resolve(__dirname, `src/bm/${sectionId}/${bookmarkletId}.js`);
}

function getCode(sectionId, bookmarkletId) {
    return new Promise(function(resolve, reject) {
        fs.readFile(getBookmarkletPath(sectionId, bookmarkletId), function(err, data) {
            var code;

            if (err) {
                return reject(err);
            }

            code = uglify(data.toString("utf8"));
            gutil.log('added bookmark: ' + `${sectionId}/${bookmarkletId}`);

            resolve('javascript:' + encodeURIComponent(code));
        });
    });
}

module.exports = function() {
    var stream = new Stream.Transform({ objectMode: true });

    stream._transform = function(file, encoding, cb) {
        return getContent(bookmarklets)
            .then(function(content) {
                var newContent = file.contents
                    .toString("utf8")
                    .replace("{{content}}", content);

                file.contents = new Buffer(newContent);

                cb(null, file);
            }, function(error) {
                cb(error, null);
            });
    };

    return stream;
};
