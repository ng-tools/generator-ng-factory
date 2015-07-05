'use strict';

var path = require('path');
var semver = require('semver');
var _ = require('lodash');

module.exports = function() {
  var self = this;
  var props = this.props, argv = this.argv;

  var components = props.availableComponents = {
    'angular/angular.js': ['~1.4.0', '~1.3.0', '~1.2.0'],
    'twbs/bootstrap': ['^3.3'],
    'fortawesome/font-awesome': ['^4.3'],
    'mgcrea/angular-strap': ['^2.2'],
    'mgcrea/angular-motion': ['^0.4'],
    'mgcrea/bootstrap-additions': ['^0.3'],
    'angular-translate/angular-translate': ['^2.5'],
    'angular-ui/ui-router': ['^0.2'],
    'lodash/lodash': ['^3.5'],
    'lsystems/angular-extend-promises': ['^1.0'],
    'automattic/socket.io-client': ['^1.2']
  };

  // Handle command-line args
  var basename = path.basename(process.env.PWD);
  if(argv.y || argv.yes) {
    _.defaults(props, {
      ngVersion: components['angular/angular.js'][0],
      ngModules: ['animate', 'route'],
      components: ['twbs/bootstrap'],
      supportLegacy: 'no'
    });
  }

  return self.promptAsync([{
    name: 'ngVersion',
    when: self.whenUndefinedProp('ngVersion'),
    message: 'What version of angular would you like to use?',
    validate: function(value) {
      return semver.validRange(value) ? true : 'Please enter a valid semantic version (semver.org)';
    },
    type: 'list',
    choices: components['angular/angular.js'],
    default: 0
  }, {
    name: 'ngModules',
    when: self.whenUndefinedProp('ngModules'),
    message: 'Which official angular modules would you need?',
    type: 'checkbox',
    choices: [{name: 'animate', checked: true}, 'cookies', 'i18n', 'resource', {name: 'route', checked: true}, 'sanitize', 'touch']
  }, {
    name: 'locale',
    message: 'Should I preload a specific i18n-locale file?',
    type: 'list',
    choices: ['en', 'de', 'es', 'fr'],
    when: function(props) {
      return props.ngModules && props.ngModules.indexOf('i18n') !== -1;
    },
    default: 0
  }])
  .then(function askForThirdPartyComponents() {

    var choices = Object.keys(components)
    .filter(function(k) { return k !== 'angular/angular.js'; })
    .map(function(k) { return {name: k + ' (' + components[k] + ')', value: k}; });
    choices[0].checked = true;

    return self.promptAsync([{
      name: 'components',
      when: self.whenUndefinedProp('components'),
      message: 'Any third-party component you might require?',
      type: 'checkbox',
      choices: choices
    }]);

  })
  .then(function askForCompatibility() {

    return self.promptAsync([{
      name: 'supportLegacy',
      message: 'Would you want me to support old versions of Internet Explorer (eg. before IE9)?',
      type: 'list',
      choices: ['yes', 'no'],
      when: function() {
        return !props.supportLegacy;
      },
      default: 1
    }]);

  })
  .then(function askTemplate() {

    return self.promptAsync([{
      name: 'baseTemplate',
      message: 'Which bootstrap template would you like to start from?',
      type: 'list',
      choices: ['dashboard', 'cover'],
      default: 0
    }]);

  })
  .then(function() {

    props.description = 'Yet another amazing AngularJS app!';

  });

};
