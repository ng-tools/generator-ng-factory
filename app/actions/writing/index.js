'use strict';

var path = require('path');
var yosay = require('yosay');
var chalk = require('chalk');
var Promise = require('bluebird');

module.exports = function () {
  var self = this, done = this.async();
  var props = this.props, argv = this.argv;

  return require('./' + props.type).call(self)
  .then(function() {

    var dotfiles = ['.gitignore', '.gitattributes', '.editorconfig', '.jshintrc', '.bowerrc'];
    var pkgfiles = ['gulpfile.js', 'ngfactory.json', 'package.json', 'bower.json', 'README.md'];

    return Promise.props({
      dotfiles: Promise.all(dotfiles.map(function(file) {
        return self.copyAsync(file, file);
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
