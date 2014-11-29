'use strict';

var path = require('path');
var Promise = require('bluebird');
var globAsync = Promise.promisify(require('glob'));

module.exports = function () {
  var self = this, done;
  var props = this.props, argv = this.argv;

  var files = ['js', props.htmlPreprocessor === 'jade' ? 'jade' : 'html', props.cssPreprocessor === 'less' ? 'less' : 'css'];

  // Copy base files
  var cwd = path.resolve(__dirname, '..', '..', 'templates');
  return globAsync('app/**/*.{' + files.join(',') + '}', {cwd: cwd}).each(function(filepath) {
    return self.templateAsync(filepath, filepath);
  });

};
