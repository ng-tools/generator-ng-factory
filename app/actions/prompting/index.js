'use strict';

var path = require('path');
var chalk = require('chalk');
var _ = require('lodash');
var Promise = require('bluebird');
var tildify = require('tildify');
var util = require('util');
var fs = Promise.promisifyAll(require('fs'));

module.exports = function () {
  var self = this, done = this.async();
  var argv = this.argv;

  // All answers will be combined in this object
  var props = this.props = {
    pkg: {}, // package.json
    ngf: {}, // ngfactory.json
    opt: {}  // cli options
  };

  clearInterval(this.spinner);

  // Load any existing files
  return Promise.all([
    loadJSONAsync('package.json', {cwd: self.cwd}),
    loadJSONAsync('ngfactory.json', {cwd: self.cwd})
  ])
  .spread(function(pkg, ngf) {
    if (pkg) {
      self.log('Using package config from %s', chalk.magenta(tildifyCwd('package.json', {cwd: self.cwd})));
      _.extend(props.pkg, _.pick(pkg, 'name', 'description', 'version', 'license'));
    }
    if (ngf) {
      self.log('Using factory config from %s', chalk.magenta(tildifyCwd('ngfactory.json', {cwd: self.cwd})));
      _.extend(props.ngf, ngf);
    }
  })
  .then(function() {

    // Fetch git config settings
    // var email = require('git-user-email');
    props.git = {
      name: self.user.git.name(),
      email: self.user.git.email()
    };

    // Handle command-line args
    if (argv.yes) {
      _.defaults(props, {
        type: 'application',
        username: 'mgcrea',
        name: _.kebabCase(self.basename),
        license: 'MIT'
      });
    }
    if (argv.type) {
      props.ngf.type = argv.type;
    } if (argv.application) {
      props.ngf.type = 'application';
    } else if (argv.component) {
      props.ngf.type = 'component';
    }
    if (argv.username) {
      props.ngf.username = argv.username;
    }

    return self.promptAsync([{
      name: 'ngf.type',
      whenUndefined: true,
      message: 'What are you building today?',
      type: 'list',
      choices: ['application', 'component', 'library'],
      default: 0
    }]).then(function() {
      return self.promptAsync([{
        name: 'pkg.name',
        whenUndefined: true,
        message: 'What\'s the package name of your ' + props.ngf.type + '?',
        validate: function(value) {
          var expected = _.kebabCase(value);
          return value === expected ? true : util.format('Please enter a valid package name (eg. %s)', expected);
        },
        default: _.kebabCase(self.basename)
      }]);
    });

  })
  .then(function askForGitHubUsername() {

    return self.promptAsync([{
      name: 'ngf.username',
      whenUndefined: true,
      message: 'Would you mind telling me your username on GitHub?',
      default: require('./../../modules/github').email(props.git.email).catch(function(err) {})
    }]);

  })
  .then(function askAngularBranch() {

    return self.promptAsync([{
      name: 'ngf.branch',
      whenUndefined: true,
      message: 'What branch of angular would you like to use?',
      type: 'list',
      choices: ['~2.0.0', '~1.4.0', '~1.3.0'],
      default: 1
    }]).tap(function() {
      props.opt.angular2 = /^\~2/.test(props.ngf.branch);
    });

  })
  .then(function() {

    return require('./' + props.ngf.type).call(self);

  })
  .then(function askForBuildSettings() {

    return self.promptAsync([{
      name: 'ngf.transpilers.views',
      whenUndefined: true,
      message: 'Should I set up one of those views preprocessors for you?',
      type: 'list',
      choices: ['none', 'jade'],
      default: 1
    },
    {
      name: 'ngf.transpilers.scripts',
      whenUndefined: true,
      message: 'Should I set up one of those scripts transpilers for you?',
      type: 'list',
      choices: props.opt.angular2 ? ['babel'/*, 'typescript'*/] : ['none', 'babel'/*, 'typescript'*/],
      default: 1
    },
    {
      name: 'ngf.transpilers.styles',
      whenUndefined: true,
      message: 'Should I set up one of those styles transpilers for you?',
      type: 'list',
      choices: ['none', 'less'/*, 'sass'*/],
      default: 1
    },
    {
      name: 'pkg.license',
      whenUndefined: true,
      message: 'Under which license your project shall be released?',
      default: 'MIT'
    }]);

  })
  .then(function prepareViewProps() {

    if (_.isUndefined(props.pkg.description)) {
      props.pkg.description = 'Yet another amazing AngularJS ' + props.ngf.type + '!';
    }
    if (_.isUndefined(props.pkg.version)) {
      props.pkg.version = '0.1.0';
    }
    if (_.isUndefined(props.ngf.locale)) {
      props.ngf.locale = 'en';
    }

  })
  .then(function() {

    done(null);

  });

};

// Helpers

function resolveCwd(file, options) {
  options = options || {cwd: '.'};
  return path.resolve(options.cwd, file);
}

function tildifyCwd(file, options) {
  return tildify(resolveCwd(file, options));
}

function loadJSONAsync(file, options) {
  options = options || {cwd: '.'};
  return fs.readFileAsync(resolveCwd(file)).then(JSON.parse).catch(function() {
    return false;
  });
}
