var gulp, sass, minifycss, autoprefixer, del,
    runSequence, browserSync, config;

gulp         = require('gulp');
sass         = require('gulp-ruby-sass');
minifycss    = require('gulp-minify-css');
autoprefixer = require('gulp-autoprefixer');
del          = require('del');
runSequence  = require('run-sequence');
browserSync  = require('browser-sync');

config = {
    styles: {
        src: 'assets/scss/**/*.scss',
        dest: 'css',
        coverage: ['last 2 versions', 'ie 9']
    },
    browserSync: {
        server: {
            baseDir: './'
        }
    }
};

gulp.task('styles', function() {
    gulp.src(config.styles.src)
        .pipe(sass())
        .pipe(minifycss())
        //.pipe(autoprefixer(config.styles.coverage))
        .pipe(gulp.dest(config.styles.dest))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function() {
    gulp.watch('config.styles.src', ['styles']);
});

gulp.task('browser-sync', function() {
    browserSync(config.browserSync);
});

gulp.task('build', function() {
    runSequence('styles', 'watch', 'browser-sync');
});

gulp.task('default', ['build']);
