
class AppComponent {
  constructor($timeout) {
    this.name = 'World';
    $timeout(() => {
      this.name += ' v1!';
    }, 2000);
  }
  static config($locationProvider) {
    $locationProvider.html5Mode(true);
  }
}
AppComponent.config.$inject = ['$locationProvider'];

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