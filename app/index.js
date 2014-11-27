'use strict';
// @cli $ nodemon -w ~/DropboxBackup/Developer/yeoman/generator-gular-bootstrap -x yo angular-bootstrap

// Required modules
//
var util = require('util'), utils = require('./modules/utils');
var path = require('path');
var Promise = require('bluebird');
var semver = require('semver');
var yosay = require('yosay');
var chalk = require('chalk');
var globAsync = Promise.promisify(require('glob'));
var github = require('./modules/github');
var debug = false;

var Generator = module.exports = require('./modules/generator');

Generator.prototype.setup = function() {

  var self = this, _ = this._, props = this.props, done = this.async();

  // Have Yeoman greet the user.
  console.log(yosay(chalk.yellow.bold('Welcome to ngFactory, ladies and gentlemen!')));

  var components = self.components = {
    'angular/angular.js': ['~1.3.0', '~1.2.0'],
    'twbs/bootstrap': ['^3.0'],
    'fortawesome/font-awesome': ['^4.0'],
    'mgcrea/angular-strap': ['^2.0'],
    'mgcrea/angular-motion': ['^0.3'],
    'mgcrea/bootstrap-additions': ['^0.2'],
    'angular-ui/ui-router': ['^0.2']
  };

  props.git = {
    name: this.user.git.name(),
    email: this.user.git.email()
  };

  // var promise = debug ?
  var promise = debug ? Promise.resolve(JSON.parse('{"git":{"name":"Olivier Louvignes","email":"olivier@mg-crea.com"},"type":"application","name":"test","ngVersion":"~1.3.0","ngModules":["animate","route"],"components":["twbs/bootstrap"],"htmlPreprocessor":"jade","jsPreprocessor":"none","cssPreprocessor":"less","supportLegacy":"no","license":"MIT","user":"mgcrea"}')).then(function(_props) { _.extend(props, _props); }) :
  Promise.bind(this)
  .then(function askForAngularSettings() {
    return self.promptAsync([{
      name: 'type',
      message: 'What are you building today?',
      when: function(props) {
        // @TODO argv
        return true;
      },
      type: 'list',
      choices: ['application', 'component'],
      default: 0
    }, {
      name: 'name',
      message: function(props) {
        return 'What\'s the name of your ' + props.type + '?';
      },
      default: path.basename(process.env.PWD)
    }, {
      name: 'ngVersion',
      message: 'What version of angular would you like to use?',
      validate: function(value) {
        return semver.validRange(value) ? true : 'Please enter a valid semantic version (semver.org)';
      },
      type: 'list',
      choices: components['angular/angular.js'],
      default: 0
    }, {
      name: 'ngModules',
      message: 'Which official angular modules would you need?',
      type: 'checkbox',
      choices: [{name: 'animate', checked: true}, 'cookies', 'i18n', 'resource', {name: 'route', checked: true}, 'sanitize', 'touch']
    }, {
      name: 'locale',
      message: 'Should I preload a specific i18n-locale file?',
      when: function(props) {
        return props.ngModules.indexOf('i18n') !== -1;
      },
      type: 'list',
      choices: ['en', 'de', 'es', 'fr'],
      default: 0
    }]);
  })
  .then(function askForThirdPartyComponents() {

    var choices = Object.keys(components)
    .filter(function(k) { return k !== 'angular/angular.js'; })
    .map(function(k) { return {name: k + ' (' + components[k] + ')', value: k}; });
    choices[0].checked = true;

    return self.promptAsync([{
      name: 'components',
      message: 'Any third-party component you might require?',
      type: 'checkbox',
      choices: choices,
    }]);

  })
  .then(function askForBuildSettings() {

    return self.promptAsync([
    {
      name: 'htmlPreprocessor',
      message: 'Should I set up one of those HTML preprocessors for you?',
      type: 'list',
      choices: ['none', 'jade'],
      default: 0
    },
    {
      name: 'jsPreprocessor',
      message: 'Should I set up one of those JS preprocessors for you?',
      type: 'list',
      choices: ['none', 'coffee'],
      default: 0
    },
    {
      name: 'cssPreprocessor',
      message: 'Should I set up one of those CSS preprocessors for you?',
      type: 'list',
      choices: ['none', 'less', 'sass'],
      default: 1
    },
    {
      name: 'supportLegacy',
      message: 'Would you want me to support old versions of Internet Explorer (eg. before IE9)?',
      type: 'list',
      choices: ['yes', 'no'],
      default: 1
    },
    {
      name: 'license',
      message: 'Under which license your project shall be released?',
      default: 'MIT'
    }]);

  })
  .then(function fetchGithubInfo() {

    if(props.git.email) {
      return github.email(props.git.email);
    }

  })
  .then(function askForExtraInformation(username) {

    return self.promptAsync([{
      name: 'user',
      message: 'Would you mind telling me your username on GitHub?',
      default: username
    }]);

  });

  return promise.then(function() {

    // console.log(JSON.stringify(props));

    props.dashName = _.dasherize(props.name);
    if(!props.locale) props.locale = 'en';
    props.title = _.classify(props.name);
    props.module = (props.user ? props.user + '.' : '') + props.title;
    props.description = 'Yet another amazing AngularJS app';
    props.version = '0.1.0';

    // Prepare ngModules
    props.appModules = _(_.clone(props.ngModules))
    .reject('i18n')
    .map(_.classify)
    .map(function(name) {
      return 'ng' + name;
    });

    // Prepare components modules
    if(props.components.indexOf('mgcrea/angular-strap') !== -1) {
      props.appModules.push('mgcrea.ngStrap');
    }

  })
  .then(function setupApplicationFiles() {
    if(props.type === 'component') return;

    var files = ['js', props.htmlPreprocessor === 'jade' ? 'jade' : 'html', props.cssPreprocessor === 'less' ? 'less' : 'css'];

    // Copy base files
    return globAsync('app/**/*.{' + files.join(',') + '}', {cwd: path.join(__dirname, 'templates')}).each(function(filepath) {
      return self.template(filepath, filepath);
    });

  })
  .then(function setupProjectFiles() {

    // Dotfiles
    self.copy('.gitignore', '.gitignore');
    self.copy('.gitattributes', '.gitattributes');
    self.copy('.editorconfig', '.editorconfig');
    self.copy('.jshintrc', '.jshintrc');
    self.copy('.bowerrc', '.bowerrc');

    // Package
    self.template('gulpfile.js', 'gulpfile.js');
    self.template('package.json', 'package.json');
    self.template('bower.json', 'bower.json');
    self.template('README.md', 'README.md');

  })
  .then(function() {
    done();
  });

};


  //   Promise.all(Object.keys(components).map(function(component) {
  //   var minors = {};
  //   return github.tags(component, components[component]).filter(function(vObj, i) {
  //     // return i === 0;
  //     d(vObj);
  //     var vMinor = [vObj.major, vObj.minor].join('.');
  //     return !minors[vMinor] && (minors[vMinor] = true);
  //   }).map(function(vObj) {
  //     return vObj.toString();
  //   }).then(function(tags) {
  //     components[component] = tags;
  //     return tags;
  //   });
  // })).catch(function(err) {
  //   d(err);
  //   console.log('/!\\ Tag fetching failed, fallback to last known defaults.');
  //   components = JSON.parse('{"angular/angular.js":["^1.3.0","^1.2.0"],"twbs/bootstrap":["^3.0"],"fortawesome/font-awesome":["v4.0.3"],"mgcrea/angular-strap":["v2.0.2"],"mgcrea/angular-motion":["v0.3.2"],"mgcrea/bootstrap-additions":["v0.2.2"],"angular-ui/ui-router":["0.2.10"]}');
  // })
