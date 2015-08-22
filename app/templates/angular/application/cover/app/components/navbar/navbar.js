
function NavbarComponent($timeout) {
  this.title = 'Cover';
  $timeout(() => {
    this.title += ' v1!';
  }, 2000);
}

angular.module('NavbarComponent', ['ngRoute'])

.directive('navbar', () => ({
  scope: {},
  controllerAs: 'navbar',
  controller: NavbarComponent,
  bindToController: true,
  templateUrl: 'components/navbar/navbar.html'
}));

