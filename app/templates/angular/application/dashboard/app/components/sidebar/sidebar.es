
angular.module('SidebarModule', ['ngRoute'])

.controller('SidebarComponent', class SidebarComponent {
  constructor() {
  }
})

.directive('sidebar', () => {
  return {
    scope: {},
    controllerAs: 'sidebar',
    controller: 'SidebarComponent',
    bindToController: true,
    templateUrl: 'components/sidebar/sidebar.html'
  };
});

