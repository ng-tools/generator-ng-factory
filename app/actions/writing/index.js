'use strict';

var path = require('path');
var yosay = require('yosay');
var chalk = require('chalk');
var Promise = require('bluebird');
var _ = require('lodash');
var fs = Promise.promisifyAll(require('fs'));

module.exports = function () {
  var self = this, done = this.async();
  var props = this.props, argv = this.argv;

  return Promise.resolve()
  .then(function writeConfig() {
    var config = _.pick(props, 'type', 'name', 'module', 'username', /*'version', 'description', */ 'ngVersion', 'ngModules', 'license', 'htmlPreprocessor', 'jsPreprocessor', 'cssPreprocessor');
    config.module = props.moduleName; // @todo rename
    if(props.namespace) config.namespace = props.namespace;
    return self.writeAsync('ngfactory.json', JSON.stringify(config, null, 2));
  })
  .then(function() {

    var transpileMap = {
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

    var files = Array.prototype.concat.call([], 'json', transpileMap.scripts[props.jsPreprocessor], transpileMap.styles[props.cssPreprocessor], transpileMap.views[props.htmlPreprocessor]);
    return require('./' + props.type).call(self, files);

  })
  .then(function() {

    var dotfiles = ['.gitignore', '.gitattributes', '.editorconfig', '.jshintrc', '.bowerrc'];
    var pkgfiles = ['gulpfile.js', 'package.json', 'bower.json', 'README.md'];

    return Promise.props({
      dotfiles: Promise.all(dotfiles.map(function(file) {
        return self.templateAsync(path.join('dotfiles', file.substr(1)), file);
      })),
      pkgfiles: Promise.all(pkgfiles.map(function(file) {
        return self.templateAsync(file, file);
      }))
    });

  })
  .then(function setupProjectFiles(props) {

    done();

  });

};

/*
  writing: {
    app: function () {
    dd('writing');
      this.dest.mkdir('app');
      this.dest.mkdir('app/templates');

      this.src.copy('_package.json', 'package.json');
      this.src.copy('_bower.json', 'bower.json');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
    }
  },*/


  // .then(function setupApplicationFiles() {
  //   if(props.type === 'component') return;

  //   var files = ['js', props.htmlPreprocessor === 'jade' ? 'jade' : 'html', props.cssPreprocessor === 'less' ? 'less' : 'css'];

  //   // Copy base files
  //   return globAsync('app/**/*.{' + files.join(',') + '}', {cwd: path.join(__dirname, 'templates')}).each(function(filepath) {
  //     return self.template(filepath, filepath);
  //   });

  // })
  // .then(function setupProjectFiles() {

  //   // Dotfiles
  //   self.copy('.gitignore', '.gitignore');
  //   self.copy('.gitattributes', '.gitattributes');
  //   self.copy('.editorconfig', '.editorconfig');
  //   self.copy('.jshintrc', '.jshintrc');
  //   self.copy('.bowerrc', '.bowerrc');

  //   // Package
  //   self.template('gulpfile.js', 'gulpfile.js');
  //   self.template('package.json', 'package.json');
  //   self.template('bower.json', 'bower.json');
  //   self.template('README.md', 'README.md');

  // })
  // .then(function() {
  //   done();
  // });
