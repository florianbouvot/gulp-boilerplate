# Gulp Boilerplate

A boilerplate for building web projects with Gulp.

**Features**

* CSS
  * Sass
  * PostCSS (Tailwindcss, Autoprefixer)
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
  * Optimize icons with SVGO
  * Generate sprite
* Fonts
  * Copy
* Runs a web server (Browsersync) for style injection, auto-refreshing and cross-device synchronization
* Runs a file watcher (native Gulp feature) for running the right tasks on the right files and doing the above things

*Nunjunks templates are only present for the demo*

## Getting Started

Note: if you've previously installed Gulp globally, run `yarn global remove gulp` to remove it. (Details here)[https://medium.com/gulpjs/gulp-sips-command-line-interface-e53411d4467].

Prerequisites : 
  * [Node.js](https://nodejs.org/)
  * [Gulp Command Line Utility](http://gulpjs.com/)

1. In bash/terminal/command line, cd into your project directory.
2. Run `yarn install` to install required dependencies.
3. When it's done installing, run one of the task runners to get going:
  * `yarn dev` serve, watch for changes and automatically refresh across devices.
  * `yarn prod` build current project, ready for test or deployment.

## Futher reading

* [Integrating gulp-rev into your app](https://github.com/sindresorhus/gulp-rev/blob/master/integration.md)
* [A Better package.json for the Frontend](https://nystudio107.com/blog/a-better-package-json-for-the-frontend)

## License

MIT © [Florian Bouvot](https://github.com/florianbouvot)
