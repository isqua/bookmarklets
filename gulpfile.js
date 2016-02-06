const sections = require('./sections');
const gulp = require('gulp');
const src = 'src';
const dest = 'build';
const browserSync = require('browser-sync').create();

const config = {
    jade: {
        src: 'src/index.jade',
        dest: dest,
        metrika: 28698696,
        opts: {
            locals: { sections: sections() }
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

require('nbld/tasks/jade')(gulp, config.jade);

gulp.task('default', [ 'jade:development', 'server' ], () => {
    gulp.watch(config.jade.src, [ 'jade:development', browserSync.reload ]);
});

gulp.task('production', [ 'jade:production' ]);
