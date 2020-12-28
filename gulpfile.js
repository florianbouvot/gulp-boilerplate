// Requires
var {gulp, src, dest, watch, series, parallel} = require('gulp');
var pkg = require('./package.json');
var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var gulpif = require('gulp-if');
var del = require('del');
var imagemin = require('gulp-imagemin');
var nunjucks = require('gulp-nunjucks');
var pngquant = require('imagemin-pngquant');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var rev = require('gulp-rev');
var sass = require('gulp-sass');
var size = require('gulp-size');
var svgmin = require('gulp-svgmin');
var svgSymbols = require('gulp-svg-symbols');
var terser = require('gulp-terser');
var env = process.env.NODE_ENV;



// Styles task
var css = function (done) {
  // Make sure this feature is activated before running
	if (!pkg.tasks.css) return done();

  return src(pkg.paths.src.css + '**/*.scss')
    .pipe(sass())
    .pipe(postcss())
    .pipe(gulpif(env === "production", csso()))
    .pipe(size({ title: 'CSS', gzip: true, showFiles: true }))
    .pipe(dest(pkg.paths.dist.css))
    .pipe(browserSync.stream());
}


// Scripts task
var js = function (done) {
  // Make sure this feature is activated before running
	if (!pkg.tasks.js) return done();

  return src(pkg.globs.js)
    .pipe(concat(pkg.vars.js))
    .pipe(gulpif(env === "production", terser()))
    .pipe(size({ title: 'JS', gzip: true }))
    .pipe(dest(pkg.paths.dist.js));
}


// Images task
var img = function (done) {
  // Make sure this feature is activated before running
	if (!pkg.tasks.img) return done();

  return src(pkg.paths.src.img + '**/*.{gif,jpg,png,svg,ico}')
    .pipe(changed(pkg.paths.src.img + '**/*.{gif,jpg,png,svg,ico}'))
    .pipe(gulpif(env === "production", imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 50, progressive: true }),
      pngquant({ quality: [0.5, 0.5] }),
      imagemin.svgo()
    ])))
    .pipe(size({ title: 'Images', gzip: true }))
    .pipe(dest(pkg.paths.dist.img));
}


// Stripe task
var stripe = function (done) {
  // Make sure this feature is activated before running
	if (!pkg.tasks.stripe) return done();

  return src(pkg.paths.src.stripe + '**/*.svg')
    .pipe(svgmin({ plugins: [{ removeViewBox: false }] }))
    .pipe(svgSymbols({ templates: ['default-svg'] }))
    .pipe(rename(pkg.vars.stripe))
    .pipe(size({ title: 'Stripe', gzip: true }))
    .pipe(dest(pkg.paths.dist.stripe));
}


// Fonts task
var fonts = function (done) {
  // Make sure this feature is activated before running
	if (!pkg.tasks.fonts) return done();

  return src(pkg.paths.src.fonts + '**/*.{woff,woff2}')
    .pipe(changed(pkg.paths.src.fonts + '**/*.{woff,woff2}'))
    .pipe(dest(pkg.paths.dist.fonts));
}


// Templates task
var templates = function (done) {
	// Make sure this feature is activated before running
	if (!pkg.tasks.templates) return done();

  return src(pkg.paths.templates + '*.html')
		.pipe(nunjucks.compile())
    .pipe(dest(pkg.paths.dist.base));
};


// Revision task
var revision = function (done) {
  // Make sure this feature is activated before running
	if (!pkg.tasks.revision) return done();

  return src([pkg.paths.dist.css + '*.css', pkg.paths.dist.js + '*.js'], { base: pkg.paths.dist.base })
    .pipe(rev())
    .pipe(dest(pkg.paths.dist.base))
    .pipe(rev.manifest())
    .pipe(dest(pkg.paths.dist.base));

  done()
}


// Clean task
var clean = function (done) {
  // Make sure this feature is activated before running
	if (!pkg.tasks.clean) return done();

	del.sync(
		pkg.paths.clean
	);

	// Signal completion
	return done();
}


// Server task
var startServer = function (done) {
	// Make sure this feature is activated before running
	if (!pkg.tasks.reload) return done();

	// Initialize BrowserSync
	browserSync.init({
    server: pkg.paths.reload
	});

	// Signal completion
	done();
};


// Reload the browser when files change
var reloadBrowser = function (done) {
  // Make sure this feature is activated before running
  if (!pkg.tasks.reload) return done();

  browserSync.reload();

  // Signal completion
  done();
};


// Watch for changes
var watchSource = function (done) {
	// Make sure this feature is activated before running
  if (!pkg.tasks.reload) return done();

  watch(pkg.paths.src.css + '**/*.scss', series(css));
  watch(pkg.paths.tailwind, series(css));
  watch(pkg.paths.src.js + '**/*.js', series(js, reloadBrowser));
  watch(pkg.paths.src.img + '**/*.{gif,jpg,png,svg,ico}', series(img));
  watch(pkg.paths.src.stripe + '**/*.svg', series(stripe));
  watch(pkg.paths.src.fonts + '**/*.{woff,woff2}', series(fonts));
  watch(pkg.paths.templates + '**/*.html', series(templates, reloadBrowser));

  // Signal completion
  done();
};


// Default task
exports.default = series(
  clean,
  parallel(css, js, img, stripe, fonts, templates),
  startServer,
  watchSource,
);


// Build task
exports.build = series(
  clean,
  parallel(css, js, img, stripe, fonts, templates),
  revision
);
