'use strict';

var path = require('path');
var util = require('util');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var mkdirpAsync = Promise.promisify(require('mkdirp'));
var chalk = require('chalk');
var _ = require('lodash');
var inquirer = require('inquirer');
var log = require('./../utils/log');
var bufferEqual = require('buffer-equal');

var yeoman = require('yeoman-generator');
var Generator = yeoman.generators.Base;

// Generator.prototype.log = function() {
//   console.log('[' + chalk.gray('{' + new Date().toLocaleTimeString() + '}] '));
//   console.log.apply(console, arguments);
// };

// Generator.extend = require('class-extend').extend;

Generator.prototype.prompt = inquirer.prompt;

Generator.prototype.promptAsync = function(questions) {
  var self = this;
  return new Promise(function(resolve/*, reject*/) {
    // Support {whenUndefined: true}
    _.map(questions, function(question) {
      if(question.whenUndefined) {
        question.when = whenUndefinedFn(self.props, question.name);
        delete question.whenUndefined;
      }
    });
    // Actually prompt via inquirer
    self.prompt(questions, function(props) {
      _.each(props, function(value, key) {
        // Parse boolean-like values
        if(value === 'yes') {
          value = true;
        } else if(value === 'no') {
          value = false;
        }
        // Support dot
        if(/\./.test(key)) {
          _.set(self.props, key, value);
        } else {
          self.props[key] = value;
        }
      });
      resolve(self.props);
    });
  });
};

var queueAsync = Promise.bind({});
Generator.prototype.queueAsync = function(next) {
  var self = this;
  return (queueAsync = queueAsync.then(next));
};

function whenUndefinedFn(props, key) {
  return function() {
    return _.isUndefined(/\./.test(key) ? _.get(props, key) : props[key]);
  };
}

function readSourceFileAsync(source, options) {
  options = options || {cwd: '.'};
  return fs.readFileAsync(path.join(options.cwd, source))
  .catch(function(err) {
    throw err;
  });
}

function readDestFileAsync(source) {
  return fs.readFileAsync(path.join(process.env.PWD, source))
  .catch(function(/* err */) {
    return null;
  });
}

function readFilePairAsync(source, dest, options) {
  return Promise.all([
    readSourceFileAsync(source, options),
    readDestFileAsync(dest)
  ]);
}

var writeDestFileAsyncForce = false;
function writeDestFileAsync(dest, sourceBuffer, destBuffer, source) {
  /* jshint validthis:true */
  var self = this;
  var argv = this.argv;

  // var colors = {
  //   skip: 'yellow',
  //   force: 'yellow',
  //   create: 'green',
  //   invoke: 'bold',
  //   conflict: 'red',
  //   identical: 'cyan',
  //   info: 'gray'
  // };

  if(!Buffer.isBuffer(sourceBuffer)) {
    sourceBuffer = new Buffer(sourceBuffer);
  }

  if(!destBuffer) {

    return mkdirpAsync(path.dirname(dest))
    .then(function() {
      return fs.writeFileAsync(dest, sourceBuffer);
    })
    .then(function() {
      return self.queueAsync(function() {
        self.log(chalk.green('create') + ' ' + dest);
        return 'create';
      });
    });

  }

  if(bufferEqual(sourceBuffer, destBuffer)) {

    return self.queueAsync(function() {
      self.log(chalk.cyan('identical') + ' ' + dest);
      return 'identical';
    });

  } else {

    var prompt = {
      name: 'action',
      type: 'expand',
      message: 'Overwrite ' + dest + '?',
      when: function() {
        return !writeDestFileAsyncForce && !argv.yes && !argv.y;
      },
      choices: [{
        key: 'y',
        name: 'overwrite',
        value: 'write'
      }, {
        key: 'n',
        name: 'do not overwrite',
        value: 'skip'
      }, {
        key: 'a',
        name: 'overwrite this and all others',
        value: 'force'
      }, {
        key: 'x',
        name: 'abort',
        value: 'abort'
      }]
    };

    return self.queueAsync(function(answer) {

      self.log(chalk.red('conflict') + ' ' + dest);
      return new Promise(function(resolve, reject) {
        self.prompt(prompt, function(props) {
          if(props.action === 'abort') {
            process.exit(0);
            return;
          }
          if(props.action === 'force') {
            writeDestFileAsyncForce = true;
          }
          if(argv.y || argv.yes || writeDestFileAsyncForce || props.action === 'force' || props.action === 'write') {
            return resolve(fs.writeFileAsync(dest, sourceBuffer).then(function() {
              self.log(chalk.yellow('force') + ' ' + dest);
            }).return(props.action));
          }
          if(props.action === 'skip') {
            self.log(chalk.yellow('skip') + ' ' + dest);
          }
          resolve(props.action);
        });
      });

    });
  }
}

Generator.prototype.writeAsync = function(dest, buffer) {
  var self = this;

  return readDestFileAsync(dest)
  .then(function(destBuffer) {
    return writeDestFileAsync.call(self, dest, buffer, destBuffer);
  });

};

Generator.prototype.copyAsync = function(source, dest, options) {
  var self = this;

  // log.debug('Processing file "%s"', source);
  return readFilePairAsync(source, dest, options)
  .spread(function(sourceBuffer, destBuffer) {
    return writeDestFileAsync.call(self, dest, sourceBuffer, destBuffer, source);
  });

};

Generator.prototype.templateAsync = function(source, dest, options) {
  var self = this;
  options = options || {
    cwd: path.join(__dirname, '..', 'templates', (self.props.opt.angular2 ? 'angular2' : 'angular'))
  };

  return readFilePairAsync(source, dest, options)
  .spread(function(sourceBuffer, destBuffer) {
    var template = self.engine(sourceBuffer.toString(), {props: self.props, pkg: self.pkg});
    return [new Buffer(template), destBuffer];
  })
  .spread(function(sourceBuffer, destBuffer) {
    return writeDestFileAsync.call(self, dest, sourceBuffer, destBuffer, source);
  }).catch(function(err) {
    log.error(err);
    throw err;
  });

};

module.exports = Generator;

