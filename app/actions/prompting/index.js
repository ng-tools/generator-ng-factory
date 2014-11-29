'use strict';

var path = require('path');
var yosay = require('yosay');
var chalk = require('chalk');

module.exports = function () {
  var self = this, done = this.async();
  var props = this.props, argv = this.argv;

  // var promise = debug ? Promise.resolve(JSON.parse('{"git":{"name":"Olivier Louvignes","email":"olivier@mg-crea.com"},"type":"application","name":"test","ngVersion":"~1.3.0","ngModules":["animate","route"],"components":["twbs/bootstrap"],"htmlPreprocessor":"jade","jsPreprocessor":"none","cssPreprocessor":"less","supportLegacy":"no","license":"MIT","user":"mgcrea"}')).then(function(_props) { _.extend(props, _props); }) :

  // Have Yeoman greet the user
  self.log(yosay(chalk.yellow.bold('Welcome to ngFactory, ladies and gentlemen!')));

  props.git = {
    name: this.user.git.name(),
    email: this.user.git.email()
  };

  // Handle command-line args
  var basename = path.basename(process.env.PWD);
  if(argv.app || argv.application) {
    props.type = 'application';
  }
  if(argv.cmp || argv.component) {
    props.type = 'component';
  }
  if(argv.y || argv.yes) {
    props.name = basename;
    props.htmlPreprocessor = 'jade';
    props.jsPreprocessor = 'none';
    props.cssPreprocessor = 'less';
    props.license = 'MIT';
  }

  return self.promptAsync([{
    name: 'type',
    when: self.whenUndefinedProp('type'),
    message: 'What are you building today?',
    type: 'list',
    choices: ['application', 'component'],
    default: 0
  }, {
    name: 'name',
    when: self.whenUndefinedProp('name'),
    message: function() {
      return 'What\'s the package name of your ' + props.type + '?';
    },
    default: basename
  }])
  .then(function() {

    return require('./' + props.type).call(self);

  })
  .then(function askForBuildSettings() {

    return self.promptAsync([{
      name: 'htmlPreprocessor',
      when: self.whenUndefinedProp('htmlPreprocessor'),
      message: 'Should I set up one of those HTML preprocessors for you?',
      type: 'list',
      choices: ['none', 'jade'],
      default: 0
    },
    {
      name: 'jsPreprocessor',
      when: self.whenUndefinedProp('jsPreprocessor'),
      message: 'Should I set up one of those JS preprocessors for you?',
      type: 'list',
      choices: ['none', 'coffee'],
      default: 0
    },
    {
      name: 'cssPreprocessor',
      when: self.whenUndefinedProp('cssPreprocessor'),
      message: 'Should I set up one of those CSS preprocessors for you?',
      type: 'list',
      choices: ['none', 'less', 'sass'],
      default: 1
    },
    {
      name: 'license',
      when: self.whenUndefinedProp('license'),
      message: 'Under which license your project shall be released?',
      default: 'MIT'
    }]);

  })
  .then(function fetchGithubInfo() {

    if(argv.username) return argv.username;
    if(props.git.email) return require('./../../modules/github').email(props.git.email);

  })
  .then(function askForExtraInformation(username) {

    if(argv.y || argv.yes) {
      props.username = username;
    }

    return self.promptAsync([{
      name: 'username',
      when: self.whenUndefinedProp('username'),
      message: 'Would you mind telling me your username on GitHub?',
      default: username
    }]);

  })
  .then(function() {

    done(null);

  });

};
