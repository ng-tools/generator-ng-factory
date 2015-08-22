
class AppComponent {
  constructor() {

  }
  static config($locationProvider, $routeProvider) {

    // Uncomment in production for a significant performance boost
    // $compileProvider.debugInfoEnabled(false);

    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/overview', {
        template: '<overview></overview>'
      })
      .when('/reports', {
        template: '<reports></reports>'
      })
      .when('/analytics', {
        template: '<analytics></analytics>'
      })
      .otherwise({
        redirectTo: '/overview'
      });

  }
}
AppComponent.config.$inject = ['$locationProvider', '$routeProvider'];

angular.module('AppComponent', [
  'ngAnimate', 'ngRoute',
  'NavbarComponent', 'SidebarModule',
  'OverviewComponent', 'AnalyticsComponent', 'ReportsComponent'
])

.config(AppComponent.config)

.directive('app', () => ({
  scope: {},
  controllerAs: 'app',
  controller: AppComponent,
  bindToController: true,
  templateUrl: 'app.html'
}));
