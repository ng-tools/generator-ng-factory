'use strict';
/* eslint-env node */

var gulp = require('gulp');
var config = require('ng-factory').use(gulp, {
  factory: 'angular2-channels',
  server: {
    middleware: require('connect-modrewrite')([
      '!\\.[\\w\\?\\=]+$ /index.html [L]'
    ])
  }
});

//
// Hooks example

// var path = require('path');
// var src = config.src;
// gulp.task('afterBuild', function() {
//   gulp.src(['bower_components/font-awesome/fonts/*.woff'], {cwd: src.cwd})
//     .pipe(gulp.dest(path.join(src.dest, 'fonts')));
// });

//
// Aliases

gulp.task('serve', gulp.series('ng:serve'));
gulp.task('build', gulp.series('ng:build'/*, afterBuild */));
