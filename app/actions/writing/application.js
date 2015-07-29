'use strict';

var path = require('path');
var Promise = require('bluebird');
var globAsync = Promise.promisify(require('glob'));
var chalk = require('chalk');

module.exports = function(files) {
  var self = this;
  var props = this.props;

  // Copy base files
  var cwd = path.resolve(__dirname, '..', '..', 'templates', props.opt.angular2 ? 'angular2' : 'angular', 'application', props.opt.template);
  return globAsync('app/**/*.{' + files.join(',') + '}', {cwd: cwd}).each(function(filepath) {
    return self.copyAsync(filepath, filepath, {cwd: cwd});
  });

};
