'use strict';

var util = require('util');
var chalk = require('chalk');

function log(level, message, params) {
  var args = [].slice.call(arguments, 1);
  message = util.format.apply(null, args);
  console.log(chalk.cyan(level) + ' ' + message);
}

module.exports.debug = log.bind(null, 'debug');
module.exports.error = log.bind(null, 'error');
