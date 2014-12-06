'use strict';

angular.module('{{ props.moduleName }}')

  .controller('MainCtrl', function($location, version) {

    var vm = this;
    vm.path = $location.path.bind($location);
    vm.version = version;

  });
