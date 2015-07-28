'use strict';

/**
 * @namespace {{ props.moduleName }}
 */

angular.module('{{ props.moduleName }}', [])

  .provider('${{ props.namespace }}{{ props.componentName }}', function() {

    var defaults = this.defaults = {};

    this.$get = function() {};

  })

  .directive('{{ props.namespace }}{{ props.componentName }}', function(${{ props.namespace }}{{ props.componentName }}) {

    var defaults = ${{ props.namespace }}{{ props.componentName }}.defaults;

    return {
      restrict: 'EAC',
      // require: 'ngModel',
      link: function postLink(scope, element, attr, controller) {

        // viewValue -> $parsers -> modelValue
        // controller.$parsers.unshift(function(viewValue) {
        //   console.warn('$parser("%s"): viewValue=%o (%s)', element.attr('ng-model'), viewValue, typeof viewValue);
        //   return viewValue;
        // });

        // modelValue -> $formatters -> viewValue
        // controller.$formatters.push(function(modelValue) {
        //   console.warn('$formatter("%s"): modelValue=%o (%s)', element.attr('ng-model'), modelValue, typeof modelValue);
        //   return modelValue;
        // });

      }
    };

  });
