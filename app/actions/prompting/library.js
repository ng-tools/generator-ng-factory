'use strict';

var _ = require('lodash');

module.exports = function() {
  var self = this;
  var props = this.props;


  return Promise.bind({})
  .then(function askForModuleName() {

    if (props.opt.angular2) {

      return self.promptAsync([{
        name: 'ngf.module',
        whenUndefined: true,
        message: 'What\'s the base module name of your ' + props.ngf.type + '?',
        default: props.pkg.name + '/' + _.capitalize(_.camelcase(props.pkg.name)) + 'Component'
      }]);

    } else {

      return self.promptAsync([{
        name: 'ngf.module',
        whenUndefined: true,
        message: 'What\'s the base module name of your ' + props.ngf.type + '?',
        default: props.ngf.username + '.' + _.capitalize(_.camelcase(props.pkg.name))
      }]);

    }

  });

};
