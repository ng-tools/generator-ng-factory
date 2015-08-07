
class AnalyticsComponent {
  constructor() {
    this.title = 'Analytics';
  }
}

angular.module('AnalyticsComponent', [])

.directive('analytics', () => ({
  scope: {},
  controllerAs: 'analytics',
  controller: AnalyticsComponent,
  bindToController: true,
  templateUrl: 'components/analytics/analytics.html'
}));

