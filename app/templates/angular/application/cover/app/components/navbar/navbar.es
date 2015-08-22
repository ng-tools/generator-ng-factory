
class NavbarComponent {
  constructor() {
  }
}

angular.module('NavbarComponent', ['ngRoute'])

.directive('navbar', () => ({
  scope: {},
  controllerAs: 'navbar',
  controller: NavbarComponent,
  bindToController: true,
  templateUrl: 'components/navbar/navbar.html'
}));

