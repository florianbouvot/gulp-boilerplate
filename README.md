# Gulp Boilerplate

A boilerplate for building web projects with Gulp 4.

**Features**

* CSS
  * Sass compilation
  * PostCSS transformation (Tailwindcss, Autoprefixer)
  * Remove unused CSS with PurgeCSS
  * Minify with CSSO (in production)
  * File versioning for cache-busting (in production)
* JavaScript
  * Concatenate
  * Minify with terser (in production)
  * File versioning for cache-busting (in production)
* Images
  * Copy
  * Optimize with imagemin (in production)
* SVG sprite
  * Optimize SVG with SVGO
  * Converts SVG files to SVG sprite
* Fonts
  * Copy
* Runs a web server (Browsersync) for style injection, auto-refreshing and cross-device synchronization
* Runs a file watcher (native Gulp feature) for running the right tasks on the right files and doing the above things

*Nunjunks templates are only present for the demo.*

## Getting Started

### Prerequisites

Note: if you've previously installed Gulp globally, run `npm rm --global gulp` or `yarn global remove gulp` to remove it. [Details here](https://medium.com/gulpjs/gulp-sips-command-line-interface-e53411d4467).

Make sure these are installed first.

* [Node.js](https://nodejs.org/)
* [Gulp Command Line Utility](http://gulpjs.com/)

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` or `yarn install`.
3. Run tasks :
  * Development server `npm run dev` or `yarn dev`
  * Production build `npm run prod` or `yarn prod`

## Futher reading

* [Integrating gulp-rev into your app](https://github.com/sindresorhus/gulp-rev/blob/master/integration.md)
* [A Better package.json for the Frontend](https://nystudio107.com/blog/a-better-package-json-for-the-frontend)

## License

MIT © [Florian Bouvot](https://github.com/florianbouvot)
