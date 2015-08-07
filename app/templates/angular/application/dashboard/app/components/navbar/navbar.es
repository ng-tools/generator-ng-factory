
class NavbarComponent {
  constructor(search) {
    this.title = 'Dashboard';
    this.search = search;
  }
}

angular.module('NavbarComponent', [])

.directive('navbar', () => ({
  scope: {},
  controllerAs: 'navbar',
  controller: NavbarComponent,
  bindToController: true,
  templateUrl: 'components/navbar/navbar.html'
}));

