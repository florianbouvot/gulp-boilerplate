module.exports = {
  url: 'dist/',
  css: {
    src: 'src/css/**/*.scss',
    dist: 'dist/css/',
  },
  cssVendor: {
    src: [
      'node_modules/baguettebox.js/dist/baguettebox.css',
    ],
    dist: 'src/css/vendor/',
  },
  js: {
    src: [
      'src/js/main.js',
    ],
    dist: 'dist/js/',
    name: 'main.js',
  },
  img: {
    src: 'src/img/**/*.{gif,jpg,png,svg,ico}',
    dist: 'dist/img/',
  },
  svgSprite: {
    src: 'src/icons/**/*.svg',
    dist: 'dist/',
    name: 'icons.svg',
  },
  fonts: {
    src: 'src/fonts/**/*.{woff,woff2}',
    dist: 'dist/fonts',
  },
  version: {
    src: [
      'dist/css/*.css',
      'dist/js/*.js',
    ],
    dist: 'dist/',
    base: 'dist/',
  },
  clean: [
    'src/vendor/',
    'dist/**/*',
    '!dist/',
  ],
  tailwind: 'tailwind.config.js',
  templates: {
    src: 'src/templates/*.{html,njk}',
    dist: 'dist/',
    watch: 'src/templates/**/*.{html,njk}',
  },
  tasks: {
    css: true,
    cssVendor: true,
    js: true,
    img: true,
    svgSprite: true,
    fonts: true,
    version: true,
    clean: true,
    reload: true,
    templates: true,
  },
}
