const gulp = require('gulp');
const pug = require('gulp-pug');
const inlinesource = require('gulp-inline-source');
const metrika = require('./gulp/metrika');

function getData() {
    var sectionsFile = require.resolve('./gulp/sections')

    delete require.cache[sectionsFile];

    return {
        sections: require(sectionsFile)()
    };
}

function html() {
    return gulp
        .src('src/index.pug')
        .pipe(pug({
            data: getData()
        }))
        .pipe(inlinesource())
        .pipe(metrika(28698696))
        .pipe(gulp.dest('build/'));
}

function watch() {
    gulp.watch(
        [ 'src/**/*.{pug,css,js}', 'sections.js' ],
        html
    );
}

module.exports.production = html;
module.exports.development = gulp.series(html, watch);
