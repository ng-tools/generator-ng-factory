'use strict';

var gulp = require('gulp');
var config = require('ng-factory').use(gulp);

//
// Post build example

// var path = require('path');
// var paths = config.paths;
// gulp.task('afterBuild', function() {
//   gulp.src('**/*.{webm,mp4,m4v}', {cwd: paths.cwd, base: paths.cwd})
//     .pipe(paths.dest);
// });

//
// Aliases

gulp.task('serve', gulp.series('ng:serve'/*, 'afterBuild'*/));
gulp.task('build', gulp.series('ng:build'));
