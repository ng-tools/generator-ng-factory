'use strict';

var gulp = require('gulp');
var config = require('ng-factory').use(gulp);

//
// Aliases

gulp.task('serve', ['ng:serve']);
gulp.task('build', ['ng:build']);
gulp.task('test', ['ng:test']);

//
// Hooks example

// var path = require('path');
// var src = config.src;
// gulp.task('ng:afterBuild', function() {
//   gulp.src(['bower_components/font-awesome/fonts/*.woff'], {cwd: src.cwd})
//     .pipe(gulp.dest(path.join(src.dest, 'fonts')));
// });
