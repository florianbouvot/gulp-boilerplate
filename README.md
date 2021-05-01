# Gulp Boilerplate

A boilerplate for building web projects with Gulp 4.

**Features**

* CSS
  * Sass compilation
  * Copy and rename CSS vendor to allow Sass import 
  * PostCSS transformation (Tailwindcss with JIT mode, Autoprefixer)
  * Remove unused CSS with PurgeCSS
  * Minify with CSSO
  * File versioning for cache-busting (in production)
* JavaScript
  * Minify with terser (RollupJs with multi entry support)
  * File versioning for cache-busting (in production)
* Images
  * Copy
  * Optimize with imagemin
* SVG sprite
  * Optimize SVG with SVGO
  * Converts SVG files to SVG sprite
* Fonts
  * Copy
* Runs a web server (Browsersync) for style injection, auto-refreshing and cross-device synchronization
* Runs a file watcher (native Gulp feature) for running the right tasks on the right files and doing the above things

**Tasks are configurable and can be easily turn on and off** in [`gulp.config.js`](https://github.com/florianbouvot/gulp-boilerplate/blob/main/gulp.config.js).

*Nunjunks templates are only present for the demo.*

## Getting Started

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install`.
3. Run tasks:
  * Development server `npm run dev`
  * Production build `npm run build`

## Futher reading

* [Integrating gulp-rev into your app](https://github.com/sindresorhus/gulp-rev/blob/master/integration.md) from [Sindre Sorhus](https://sindresorhus.com)
* [A Better package.json for the Frontend](https://nystudio107.com/blog/a-better-package-json-for-the-frontend) from [Andrew Welch](https://nystudio107.com)
* [Gulp Boilerplate](https://github.com/cferdinandi/gulp-boilerplate) from [Chris Ferdinandi](https://gomakethings.com)

## License

MIT © [Florian Bouvot](https://github.com/florianbouvot)
