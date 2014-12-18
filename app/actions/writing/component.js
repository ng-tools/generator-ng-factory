'use strict';

var path = require('path');
var Promise = require('bluebird');
var globAsync = Promise.promisify(require('glob'));

module.exports = function(files) {
  var self = this, done;
  var props = this.props, argv = this.argv;

  // Copy base files
  var cwd = path.resolve(__dirname, '..', '..', 'templates', 'component');
  return globAsync('src/**/*.{' + files.join(',') + '}', {cwd: cwd}).each(function(filepath) {
    var dirname = path.dirname(filepath);
    var basename = path.basename(filepath);
    var destpath = path.join(dirname, props.pkgName + '.' + basename.split('.').slice(1).join('.'));
    return self.templateAsync(filepath, destpath, {cwd: cwd});
  }).then(function() {

    // Copy docs files
    return globAsync('docs/**/*.{' + files.join(',') + '}', {cwd: cwd}).each(function(filepath) {
      return self.templateAsync(filepath, filepath, {cwd: cwd});
    });

  });

};
