const gulp = require("gulp"),
  sass = require("gulp-sass"),
  autoprefixer = require('gulp-autoprefixer'),
  gulpif = require('gulp-if'),
  sourcemaps = require("gulp-sourcemaps"),
  browserSync = require("browser-sync").create(),
  pug = require("gulp-pug"),
  clean = require("gulp-clean"),
  cleanCSS = require('gulp-clean-css');

const styles = ['*'];
const path = {
  css : {
    src : `_HTML/src/sass/${styles}.scss`,
		watch: `_HTML/src/sass/**/*.scss`,
    dest : `_DIST/media/assets/css`
  },
  html: {
    watch: `_DIST/*.html`
  }
};

const config = {
  autoprefixer: false
};

function style() {
  return (
    gulp
      .src(path.css.src)
      .pipe(sass())
      .on("error", sass.logError)
			.pipe(gulpif(config.autoprefixer, autoprefixer()))
			.pipe(cleanCSS())
      .pipe(gulp.dest(path.css.dest))
      .pipe(browserSync.stream())
  );
}

function reload(done) {
  browserSync.reload();
	done();
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './_DIST'
    }
  });
  gulp.watch(path.css.watch, style);
  gulp.watch(path.html.watch, reload)
}

gulp.task('watch', gulp.series(watch));
