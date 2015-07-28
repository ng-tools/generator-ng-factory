'use strict';

var path = require('path');
var Promise = require('bluebird');

module.exports = function () {
  var self = this, done = this.async();
  var props = this.props;

  return Promise.resolve()
  .then(function writeConfigFiles() {

    return Promise.props({
      ngfactory: self.writeAsync('ngfactory.json', JSON.stringify(props.ngf, null, 2)),
      package: self.templateAsync('common/package.json', 'package.json')
    });

  })
  .then(function writeBaseFiles() {

    d(props);

    var dotfiles = ['.gitignore', '.gitattributes', '.editorconfig', '.jshintrc', '.bowerrc'];
    var pkgfiles = ['gulpfile.js', 'bower.json', 'README.md'];

    return Promise.props({
      dotfiles: Promise.all(dotfiles.map(function(file) {
        return self.templateAsync(path.join('common/dotfiles', file.substr(1)), file);
      })),
      pkgfiles: Promise.all(pkgfiles.map(function(file) {
        return self.templateAsync('common/' + file, file);
      }))
    });

  })
  .then(function() {

    var transpilers = props.ngf.transpilers;
    var transpilersMap = {
      scripts: {
        'none': 'js', 'babel': 'es', 'typescript': 'ts', 'coffee': 'coffee'
      },
      styles: {
        'none': 'css', 'less': 'less', 'sass': 'scss'
      },
      views: {
        'none': 'html', 'jade': 'jade'
      }
    };

    var files = Array.prototype.concat.call([], 'json', transpilersMap.scripts[transpilers.scripts], transpilersMap.styles[transpilers.styles], transpilersMap.views[transpilers.views]);
    return require('./' + props.ngf.type).call(self, files);

  })
  .then(function setupProjectFiles(props) {

    done();

  });

};
