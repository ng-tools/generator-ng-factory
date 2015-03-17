'use strict';

var path = require('path');
var Promise = require('bluebird');
var globAsync = Promise.promisify(require('glob'));

module.exports = function(files) {
  var self = this, done;
  var props = this.props, argv = this.argv;

  // Copy base files
  d(props.baseTemplate);
  var cwd = path.resolve(__dirname, '..', '..', 'templates', 'application', props.baseTemplate);
  return globAsync('app/**/*.{' + files.join(',') + '}', {cwd: cwd}).each(function(filepath) {
    return self.templateAsync(filepath, filepath, {cwd: cwd});
  });

};
