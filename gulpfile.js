const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

const paths = {
  html: 'src/html/*.html',
  scss: 'src/scss/**/*.scss',
  js: 'src/js/**/*.js',
  img: 'src/img/**/*',
  uploads: 'src/uploads/**/*',
  dist: 'dist'
};

function styles() {
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        paths.scss
    ])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
}

function images() {
  return gulp.src(paths.img)
    .pipe(gulp.dest(`${paths.dist}/img`));
}

function uploads() {
  return gulp.src(paths.uploads, { encoding: false })
    .pipe(gulp.dest(`${paths.dist}/uploads`));
}

function html() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.dist));
}

function serve() {
  browserSync.init({
    server: paths.dist,
    port: 3000
  });

  gulp.watch(paths.scss, styles);
  gulp.watch(paths.html, html).on('change', browserSync.reload);
  gulp.watch(paths.img, images); 
  gulp.watch(paths.img, uploads);
}

exports.default = gulp.series(
  gulp.parallel(styles, html, images, uploads),
  serve
);
