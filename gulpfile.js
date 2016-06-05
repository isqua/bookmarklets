const sections = require('./sections');
const gulp = require('gulp');
const src = 'src';
const dest = 'build';
const browserSync = require('browser-sync').create();

const config = {
    pug: {
        src: 'src/index.jade',
        dest: dest,
        metrika: 28698696,
        data: {
            sections: sections()
        }
    }
};

gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: dest
        }
    });
});

require('nbld/tasks/pug')(gulp, config.pug);

gulp.task('default', [ 'pug:development', 'server' ], () => {
    gulp.watch(config.pug.src, [ 'pug:development', browserSync.reload ]);
});

gulp.task('production', [ 'pug:production' ]);
