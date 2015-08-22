
class AppComponent {
  constructor() {
    this.name = 'World';
  }
  static config($locationProvider) {
    $locationProvider.html5Mode(true);
  }
}

angular.module('AppComponent', [
  'ngAnimate', 'ngRoute'
])

.config(AppComponent.config)

.directive('app', () => ({
  scope: {},
  controllerAs: 'app',
  controller: AppComponent,
  bindToController: true,
  templateUrl: 'app.html'
}));