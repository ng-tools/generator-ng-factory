'use strict';

var gulp = require('gulp');
var config = require('ng-factory').use(gulp);

//
// Aliases

gulp.task('serve', ['ng:serve']);
gulp.task('build', ['ng:build']);
gulp.task('test', ['ng:test']);
