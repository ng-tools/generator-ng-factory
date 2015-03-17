'use strict';

angular.module('{{ props.moduleName }}')

.provider('config', function($provide) {

  var defaults = this.defaults = {
    debug: false,
    version: '0.1.0',
    locale: 'en_US',
    locales: [
      {
        id: 'en_US',
        name: 'English'
      },
      {
        id: 'fr_FR',
        name: 'French'
      }
    ]
  };
  var config = this.config = angular.copy(defaults);

  // var request = new XMLHttpRequest();
  // request.open('GET', 'config/config.json', false);
  // request.send(null);
  // if (request.status === 200) {
  //   angular.extend(config, JSON.parse(request.responseText));
  // }

  $provide.constant('$version', config.version);

  this.$get = function() {
    return config;
  };

});
