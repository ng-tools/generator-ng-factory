
function AppComponent() {

}

AppComponent.config = function($locationProvider, $routeProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html'
    })
    .when('/features', {
      templateUrl: 'views/features.html'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html'
    })
    .otherwise({
      redirectTo: '/'
    });

}

angular.module('AppComponent', [
  'ngAnimate', 'ngRoute',
  'NavbarComponent',
  'HomeComponent', 'FeaturesComponent', 'ContactComponent'
])

.config(AppComponent.config)

.directive('app', () => ({
  scope: {},
  controllerAs: 'app',
  controller: AppComponent,
  bindToController: true,
  templateUrl: 'app.html'
}));
