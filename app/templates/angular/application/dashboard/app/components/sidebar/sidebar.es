
class SidebarComponent {
  constructor() {
  }
}

angular.module('SidebarModule', ['ngRoute'])

.directive('sidebar', () => {
  return {
    scope: {},
    controllerAs: 'sidebar',
    controller: SidebarComponent,
    bindToController: true,
    templateUrl: 'components/sidebar/sidebar.html'
  };
});

