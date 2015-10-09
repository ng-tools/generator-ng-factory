'use strict';

var path = require('path');
var Base = require('./modules/generator');
var spinner = require('char-spinner');
var pkg = require('../package.json');
var updateNotifier = require('update-notifier');
var yosay = require('yosay');
var chalk = require('chalk');

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
    this.pkg = pkg;
    this.cwd = process.env.PWD; // cwd() not working
    this.basename = path.basename(this.cwd);

    // Check for updates
    updateNotifier({pkg: pkg, updateCheckInterval: 1}).notify({defer: false});

    // Have Yeoman greet the user
    this.log(yosay(chalk.yellow.bold('Welcome to ngFactory, ladies and gentlemen!')));

  },

  prompting: require('./actions/prompting'),

  writing: require('./actions/writing'),

  end: function () {
    this.installDependencies();
    // clearInterval(this.spinner);
  }

});
