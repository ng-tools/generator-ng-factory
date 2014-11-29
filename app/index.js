'use strict';

var debug = require('./utils/debug');
var Base = require('./modules/generator');
var spinner = require('char-spinner');

var GenGenerator = Base.extend({

  initializing: function () {
    var self = this;
    this.spinner = spinner();
    this.engine = require('./modules/nunjucks-engine')();
    this.argv = require('minimist')(process.argv.slice(2));
    this.pkg = require('../package.json');
    this.props = {};
  },

  prompting: require('./actions/prompting'),

  writing: require('./actions/writing'),

  end: function () {
    this.installDependencies();
    // clearInterval(this.spinner);
  }

});

module.exports = GenGenerator;



