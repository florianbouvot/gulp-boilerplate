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
var styles = function (done) {
  // Make sure this feature is activated before running
	if (!pkg.tasks.styles) return done();

  return src(pkg.paths.styles.input + '**/*.scss')
    .pipe(sass())
    .pipe(postcss())
    .pipe(gulpif(env === "production", csso()))
    .pipe(rename({ suffix: '.min' }))
    .pipe(size({ title: 'CSS', gzip: true, showFiles: true }))
    .pipe(dest(pkg.paths.styles.output))
    .pipe(browserSync.stream());
}


// Scripts task
var scripts = function (done) {
  // Make sure this feature is activated before running
	if (!pkg.tasks.scripts) return done();

  return src(pkg.globs.scripts)
    .pipe(concat(pkg.vars.scripts))
    .pipe(gulpif(env === "production", terser()))
    .pipe(size({ title: 'JS', gzip: true }))
    .pipe(dest(pkg.paths.scripts.output));
}


// Images task
var images = function (done) {
  // Make sure this feature is activated before running
	if (!pkg.tasks.images) return done();

  return src(pkg.paths.images.input + '**/*.{gif,jpg,png,svg,ico}')
    .pipe(changed(pkg.paths.images.input + '**/*.{gif,jpg,png,svg,ico}'))
    .pipe(gulpif(env === "production", imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 50, progressive: true }),
      pngquant({ quality: [0.5, 0.5] }),
      imagemin.svgo()
    ])))
    .pipe(size({ title: 'Images', gzip: true }))
    .pipe(dest(pkg.paths.images.output));
}


// Sprites task
var sprites = function (done) {
  // Make sure this feature is activated before running
	if (!pkg.tasks.sprites) return done();

  return src(pkg.paths.sprites.input + '*.svg')
    .pipe(svgmin({ plugins: [{ removeViewBox: false }] }))
    .pipe(svgSymbols({ templates: ['default-svg'] }))
    .pipe(rename(pkg.vars.sprites))
    .pipe(size({ title: 'Sprites', gzip: true }))
    .pipe(dest(pkg.paths.sprites.output));
}


// Fonts task
var fonts = function (done) {
  // Make sure this feature is activated before running
	if (!pkg.tasks.fonts) return done();

  return src(pkg.paths.fonts.input + '**/*.{woff,woff2}')
    .pipe(changed(pkg.paths.fonts.input + '**/*.{woff,woff2}'))
    .pipe(dest(pkg.paths.fonts.output));
}


// Templates task
var templates = function (done) {
	// Make sure this feature is activated before running
	if (!pkg.tasks.templates) return done();

	return src(pkg.paths.templates.input)
		.pipe(nunjucks.compile())
    .pipe(dest(pkg.paths.templates.output));
};


// Revision task
var revision = function (done) {
  // Make sure this feature is activated before running
	if (!pkg.tasks.revision) return done();

  return src([pkg.paths.styles.output + '*.css', pkg.paths.scripts.output + '*.js'], { base: pkg.paths.rev })
    .pipe(rev())
    .pipe(dest(pkg.paths.rev))
    .pipe(rev.manifest())
    .pipe(dest(pkg.paths.rev));

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

  watch(pkg.paths.styles.input + '**/*.scss', series(styles));
  watch(pkg.paths.tailwind, series(styles));
  watch(pkg.paths.scripts.input + '**/*.js', series(parallel(scripts), reloadBrowser));
  watch(pkg.paths.images.input + '**/*.{gif,jpg,png,svg,ico}', series(images));
  watch(pkg.paths.sprites.input + '*.svg', series(sprites));
  watch(pkg.paths.fonts.input + '**/*.{woff,woff2}', series(fonts));
  watch(pkg.paths.templates.input, series(templates, reloadBrowser));

  // Signal completion
  done();
};


// Default task
exports.default = series(
  clean,
  parallel(styles, scripts, images, sprites, fonts, templates),
  startServer,
  watchSource,
);


// Build task
exports.build = series(
  clean,
  parallel(styles, scripts, images, sprites, fonts, templates),
  revision
);
