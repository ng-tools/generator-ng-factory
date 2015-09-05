'use strict';

require('./utils/string');
var Base = require('./modules/generator');
var spinner = require('char-spinner');
var path = require('path');

module.exports = Base.extend({

  initializing: function () {
    this.argv = require('yargs')
      .alias('app', 'application')
      .alias('cmp', 'component')
      .alias('t', 'type')
      .alias('y', 'yes')
      .argv;
    this.spinner = spinner();
    this.engine = require('./modules/nunjucks-engine')();
    this.pkg = require('../package.json');
    this.cwd = process.env.PWD; // cwd() not working
    this.basename = path.basename(this.cwd);

  },

  prompting: require('./actions/prompting'),

  writing: require('./actions/writing'),

  end: function () {
    this.installDependencies();
    // clearInterval(this.spinner);
  }

});
