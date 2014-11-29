'use strict';

var _ = require('lodash');
var nunjucks = require('nunjucks');

module.exports = function() {
  var me = this;

  var env = new nunjucks.Environment();
  env.addFilter('split', function(str, val) {
    return str.split(val);
  });
  env.addFilter('contains', function(array, val) {
    return array.indexOf(val) !== -1;
  });
  env.addFilter('ngModules', function(array) {
    if(!array || !array.length) return '';

    var modules = _(array)
      .reject('i18n')
      .map(_.classify)
      .map(function(name) {
        return 'ng' + name;
      });

    return '\'' + modules.join('\', \'') + '\'';
  });

  var engine = function(source, data) {
   return env.renderString(source, data);
  };

  engine.detect = function (body) {
    return body.indexOf('{%') > -1 || body.indexOf('{{') > -1;
  };

  return engine;

};


/*'use strict';

var nunjucks = require('nunjucks');
var env = new nunjucks.Environment();

function engine(source, data) {
  env.addFilter('split', function(str, val) {
    return str.split(val);
  });
  env.addFilter('contains', function(array, val) {
    return array.indexOf(val) !== -1;
  });
  env.addFilter('modules', function(array) {
    return array.length ? '\'' + array.join('\', \'') + '\'' : '';
  });
  return env.renderString(source, data);
}

engine.detect = function(body) {
  return body.indexOf('{%') > -1 || body.indexOf('{{') > -1;
};

// _ = require('underscore.string');
// ['camelize', 'dasherize', 'underscored'].forEach(function(helper) {
//   Handlebars.registerHelper(helper, _[helper]);
// });

module.exports = engine;
*/
