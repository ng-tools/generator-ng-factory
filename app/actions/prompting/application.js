'use strict';

var path = require('path');
var semver = require('semver');
var _ = require('lodash');
var Promise = require('bluebird');

module.exports = function() {
  var self = this;
  var props = this.props, argv = this.argv;

  var components = props.opt.availableComponents = {
    'angular/angular.js': ['~2.0.0', '~1.4.0', '~1.3.0', '~1.2.0'],
    'twbs/bootstrap': ['^3.3'],
    'fortawesome/font-awesome': ['^4.3'],
    'mgcrea/angular-strap': ['^2.3'],
    'mgcrea/angular-motion': ['^0.4'],
    'mgcrea/bootstrap-additions': ['^0.3'],
    'angular-translate/angular-translate': ['^2.5'],
    'angular-ui/ui-router': ['^0.2'],
    'lodash/lodash': ['^3.5'],
    'lsystems/angular-extend-promises': ['^1.0'],
    'automattic/socket.io-client': ['^1.2']
  };

  // Handle command-line args --yes
  var basename = path.basename(process.env.PWD);
  if(argv.y || argv.yes) {
    _.defaults(props.opt, {
      components: ['twbs/bootstrap']
    });
    _.defaults(props.ngf, {
      branch: components['angular/angular.js'][0],
      legacy: false
    });
  }

  return Promise.bind({})
  .then(function askForCoreModules() {

    if (props.opt.angular2) {

      // Angular ^2.0
      return self.promptAsync([{
        name: 'ngf.modules',
        whenUndefined: true,
        message: 'Which official angular modules would you need?',
        type: 'checkbox',
        choices: [{name: 'router', checked: true}, 'forms', 'http']
      }]);

    } else {

      // Angular ^1.2
      return self.promptAsync([{
        name: 'ngf.modules',
        whenUndefined: true,
        message: 'Which official angular modules would you need?',
        type: 'checkbox',
        choices: [{name: 'animate', checked: true}, 'cookies', 'i18n', 'resource', 'messages', {name: 'route', checked: true}, 'sanitize', 'touch']
      }, {
        name: 'ngf.locale',
        message: 'Should I preload a specific i18n-locale file?',
        type: 'list',
        choices: ['en', 'de', 'es', 'fr'],
        when: function(lprops) {
          return lprops.modules && lprops.modules.indexOf('i18n') !== -1;
        },
        default: 0
      }]);

    }

  })
  .then(function askForThirdPartyComponents() {

    var choices = Object.keys(components)
    .filter(function(k) { return k !== 'angular/angular.js'; })
    .map(function(k) { return {name: k + ' (' + components[k] + ')', value: k}; });
    choices[0].checked = true;

    return self.promptAsync([{
      name: 'opt.components',
      whenUndefined: true,
      message: 'Any third-party component you might require?',
      type: 'checkbox',
      choices: choices
    }]);

  })
  .then(function askForCompatibility() {

    return self.promptAsync([{
      name: 'opt.legacy',
      whenUndefined: true,
      message: 'Would you want me to try to support old versions of Internet Explorer (eg. before IE9)?',
      type: 'list',
      choices: ['yes', 'no'],
      default: 1
    }]);

  })
  .then(function askTemplate() {

    return self.promptAsync([{
      name: 'opt.template',
      whenUndefined: true,
      message: 'Which bootstrap template would you like to start from?',
      type: 'list',
      choices: ['dashboard', 'cover'],
      default: 0
    }]);

  })
  .then(function() {

    if(_.isUndefined(props.pkg.description)) {
      props.pkg.description = 'Yet another amazing AngularJS app!';
    }

  });

};
