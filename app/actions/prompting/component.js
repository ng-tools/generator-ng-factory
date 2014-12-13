'use strict';

var path = require('path');
var semver = require('semver');
var _ = require('lodash');

module.exports = function() {
  var self = this;
  var props = this.props, argv = this.argv;

  var components = props.availableComponents = {
    'angular/angular.js': ['~1.3.0', '~1.2.0'],
  };

  // Handle command-line args
  var basename = path.basename(process.env.PWD);
  if(argv.y || argv.yes) {
    _.defaults(props, {
      ngVersion: components['angular/angular.js'][0]
    });
  }

  return self.promptAsync([{
    name: 'ngVersion',
    when: self.whenUndefinedProp('ngVersion'),
    message: 'What version of angular would your component use?',
    validate: function(value) {
      return semver.validRange(value) ? true : 'Please enter a valid semantic version (semver.org)';
    },
    type: 'list',
    choices: components['angular/angular.js'],
    default: 0
  }])
  .then(function() {

    props.componentName = _.classify(props.name.replace('angular-', '').replace('ng-', ''));
    props.description = 'Yet another amazing AngularJS component!';

  });

};


