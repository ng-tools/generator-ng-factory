'use strict';

var path = require('path');
var Promise = require('bluebird');
var globAsync = Promise.promisify(require('glob'));

module.exports = function(files) {
  var self = this;
  var props = this.props;

  var cwd = path.resolve(__dirname, '..', '..', 'templates', props.opt.angular2 ? 'angular2' : 'angular', 'application', props.opt.template);

  return Promise.all([
    // Copy empty files
    globAsync('**/empty', {cwd: cwd}).each(function(filepath) {
      return self.copyAsync(filepath, filepath, {cwd: cwd});
    }),
    // Copy files
    globAsync('app/**/*.{' + files.join(',') + '}', {cwd: cwd}).each(function(filepath) {
      var ext = path.extname(filepath);
      return self.copyAsync(filepath, ext === '.es' ? filepath.replace(/\.es$/, '.js') : filepath, {cwd: cwd});
    }),
    // Render templates
    globAsync('app/**/*.{' + files.map(function(v) { return v + '.j2'; }).join(',') + '}', {cwd: cwd}).each(function(filepath) {
      return self.templateAsync(filepath, filepath.replace(/\.j2$/, ''), {cwd: cwd});
    })
  ]);

};
