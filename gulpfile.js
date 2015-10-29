var gulp = require('gulp');
var build = require('./build');

gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(build())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', [ 'html' ]);
