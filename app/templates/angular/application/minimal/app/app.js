
function AppComponent($timeout) {
  this.name = 'World';
  $timeout(() => {
    this.name += ' v1!';
  }, 2000);
}

AppComponent.config = function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);
}

angular.module('AppComponent', [])

.config(AppComponent.config)

.directive('app', () => ({
  scope: {},
  controllerAs: 'app',
  controller: AppComponent,
  bindToController: true,
  templateUrl: 'app.html'
}));
