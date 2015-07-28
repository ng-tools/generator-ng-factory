'use strict';

var gulp = require('gulp');
var config = require('ng-factory').use(gulp);

//
// Aliases

gulp.task('serve', gulp.series('ng:serve'));
gulp.task('build', gulp.series('ng:build'));

//
// Hooks example

// var path = require('path');
// var src = config.src;
// gulp.task('ng:afterBuild', function() {
//   gulp.src(['bower_components/font-awesome/fonts/*.woff'], {cwd: src.cwd})
//     .pipe(gulp.dest(path.join(src.dest, 'fonts')));
// });
