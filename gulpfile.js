const config = require('./gulp.config.js');
const {gulp, src, dest, watch, series, parallel} = require('gulp');
const browserSync = require('browser-sync');
const changed = require('gulp-changed');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const del = require('del');
const imagemin = require('gulp-imagemin');
const nunjucks = require('gulp-nunjucks');
const pngquant = require('imagemin-pngquant');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const rev = require('gulp-rev');
const sass = require('gulp-dart-sass');
const size = require('gulp-size');
const svgmin = require('gulp-svgmin');
const svgSymbols = require('gulp-svg-symbols');
const terser = require('gulp-terser');


// Styles task
const css = function (done) {
  // Make sure this feature is activated before running
	if (!config.tasks.css) return done();

  return src(config.css.src)
    .pipe(sass())
    .pipe(postcss())
    .pipe(csso())
    .pipe(size({ title: 'CSS', gzip: true, showFiles: true }))
    .pipe(dest(config.css.dist))
    .pipe(browserSync.stream());
}

const cssVendor = function (done) {
  // Make sure this feature is activated before running
	if (!config.tasks.cssVendor) return done();

  return src(config.cssVendor.src)
    .pipe(rename({
      prefix: '_',
      extname: '.scss'
    }))
    .pipe(dest(config.cssVendor.dist));
}


// Scripts task
const js = function (done) {
  // Make sure this feature is activated before running
	if (!config.tasks.js) return done();

  return src(config.js.src)
    .pipe(concat(config.js.name))
    .pipe(terser())
    .pipe(size({ title: 'JS', gzip: true }))
    .pipe(dest(config.js.dist));
}


// Images task
const img = function (done) {
  // Make sure this feature is activated before running
	if (!config.tasks.img) return done();

  return src(config.img.src)
    .pipe(changed(config.img.src))
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 50, progressive: true }),
      pngquant({ quality: [0.5, 0.5] }),
      imagemin.svgo()
    ]))
    .pipe(size({ title: 'Images', gzip: true }))
    .pipe(dest(config.img.dist));
}


// SVG Sprite task
const svgSprite = function (done) {
  // Make sure this feature is activated before running
	if (!config.tasks.svgSprite) return done();

  return src(config.svgSprite.src)
    .pipe(svgmin({ plugins: [{ removeViewBox: false }] }))
    .pipe(svgSymbols({ templates: ['default-svg'] }))
    .pipe(rename(config.svgSprite.name))
    .pipe(size({ title: 'SVG Sprite', gzip: true }))
    .pipe(dest(config.svgSprite.dist));
}


// Fonts task
const fonts = function (done) {
  // Make sure this feature is activated before running
	if (!config.tasks.fonts) return done();

  return src(config.fonts.src)
    .pipe(changed(config.fonts.src))
    .pipe(dest(config.fonts.dist));
}


// Templates task
const templates = function (done) {
	// Make sure this feature is activated before running
	if (!config.tasks.templates) return done();

  return src(config.templates.src)
		.pipe(nunjucks.compile())
    .pipe(dest(config.templates.dist));
};


// Version task
const version = function (done) {
  // Make sure this feature is activated before running
	if (!config.tasks.version) return done();

  return src(config.version.src, { base: config.version.base })
    .pipe(rev())
    .pipe(dest(config.version.dist))
    .pipe(rev.manifest())
    .pipe(dest(config.version.dist));

  // Signal completion
  done()
}


// Clean task
const clean = function (done) {
  // Make sure this feature is activated before running
	if (!config.tasks.clean) return done();

	del.sync(
		config.clean
	);

	// Signal completion
	return done();
}


// Server task
const startServer = function (done) {
	// Make sure this feature is activated before running
	if (!config.tasks.reload) return done();

	// Initialize BrowserSync
	browserSync.init({
    server: config.url
	});

	// Signal completion
	done();
};


// Reload the browser when files change
const reloadBrowser = function (done) {
  // Make sure this feature is activated before running
  if (!config.tasks.reload) return done();

  browserSync.reload();

  // Signal completion
  done();
};


// Watch for changes
const watchSource = function (done) {
	watch(config.css.src, series(css));
  watch(config.tailwind, series(css));
  watch(config.js.src, series(js, reloadBrowser));
  watch(config.img.src, series(img));
  watch(config.svgSprite.src, series(svgSprite));
  watch(config.fonts.src, series(fonts));
  watch(config.templates.watch, series(templates, reloadBrowser));

  // Signal completion
  done();
};


// Default task
exports.default = series(
  clean,
  cssVendor,
  parallel(css, js, img, svgSprite, fonts, templates),
  startServer,
  watchSource,
);


// Production task
exports.prod = series(
  clean,
  cssVendor,
  parallel(css, js, img, svgSprite, fonts, templates),
  version
);
