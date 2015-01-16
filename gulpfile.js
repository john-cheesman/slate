var gulp, sass, minifycss, autoprefixer, del,
    runSequence, config;

gulp         = require('gulp');
sass         = require('gulp-sass');
minifycss    = require('gulp-minify-css');
autoprefixer = require('gulp-autoprefixer');
del          = require('del');
runSequence  = require('run-sequence');

config = {
    styles: {
        src: 'assets/scss/*.scss',
        dest: 'css',
        coverage: ['last 2 versions', 'ie 9']
    }
};

gulp.task('styles', function() {
    gulp.src(config.styles.src)
        .pipe(sass())
        .pipe(autoprefixer(config.styles.coverage))
        .pipe(minifycss())
        .pipe(gulp.dest(config.styles.dest));
});

gulp.task('build', function() {
    runSequence('styles');
});

gulp.task('default', ['build']);
