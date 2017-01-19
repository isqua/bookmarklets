var gulp = require('gulp');
var pug = require('gulp-pug');
var inlinesource = require('gulp-inline-source');
var metrika = require('./gulp/metrika');

function getData() {
    var sectionsFile = require.resolve('./sections')

    delete require.cache[sectionsFile];

    return {
        sections: require(sectionsFile)()
    };
}

gulp.task('html', function() {
    return gulp.src('src/index.pug')
        .pipe(pug({
            data: getData()
        }))
        .pipe(inlinesource())
        .pipe(metrika(28698696))
        .pipe(gulp.dest('build/'));
});

gulp.task('production', [ 'html' ]);

gulp.task('development', [ 'html' ], function functionName() {
    gulp.watch(
        [ 'src/**/*.{pug,css,js}', 'sections.js' ],
        [ 'html' ]
    );
});
