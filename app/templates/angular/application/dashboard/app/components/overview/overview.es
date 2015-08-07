
class OverviewComponent {
  constructor($timeout) {
    this.title = 'Dashboard';
    $timeout(() => {
      this.title += ' v1!';
    }, 2000);
  }
}

angular.module('OverviewComponent', [])

.directive('overview', () => ({
  scope: {},
  controllerAs: 'overview',
  controller: OverviewComponent,
  bindToController: true,
  templateUrl: 'components/overview/overview.html'
}));

