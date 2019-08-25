var fs = require('fs');
var path = require('path');
var uglify = require('uglify-es');
var gutil = require('gulp-util');
var bookmarklets = require('./src/index');

function getContent(bookmarklets) {
    return bookmarklets.map(getSection);
}

function getSection(section) {
    return {
        name: section.name,
        id: section.id,
        content: section.content.map(getBookmarklet(section.id))
    };
}

function getBookmarklet(sectionId) {
    return function (bookmarklet) {
        return {
            name: bookmarklet.name,
            id: bookmarklet.id,
            text: bookmarklet.text,
            code: getCode(sectionId, bookmarklet.id)
        };
    };
}

function getCode(sectionId, bookmarkletId) {
    var data = fs.readFileSync(getBookmarkletPath(sectionId, bookmarkletId));
    var res = uglify.minify(data.toString('utf8'));

    gutil.log('added bookmark: ' + `${sectionId}/${bookmarkletId}`);

    return 'javascript:' + encodeURIComponent(res.code);
}

function getBookmarkletPath(sectionId, bookmarkletId) {
    return path.resolve(__dirname, `src/bm/${sectionId}/${bookmarkletId}.js`);
}

module.exports = function() {
    return getContent(bookmarklets);
};
