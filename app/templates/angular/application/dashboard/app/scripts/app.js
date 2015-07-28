'use strict';

angular.module('{{ props.moduleName }}', [{{ props.ngModules | ngModules }}])

  .constant('version', 'v{{ props.version }}')
{%- if props.ngModules|contains('route') %}

  .config(function($locationProvider, $routeProvider) {

    $locationProvider.html5Mode(false);

    $routeProvider
      .when('/', {
        templateUrl: 'views/overview.html'
      })
      .when('/reports', {
        templateUrl: 'views/reports.html'
      })
      .when('/analytics', {
        templateUrl: 'views/analytics.html'
      })
      .when('/export', {
        templateUrl: 'views/export.html'
      })
      .otherwise({
        redirectTo: '/'
      });

  });
{%- else %}

  .config(function($locationProvider) {

    $locationProvider.html5Mode(false);

  });
{%- endif %}
