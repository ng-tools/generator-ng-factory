
class ReportsComponent {
  constructor(Report, search, $scope) {
    this.search = search;
    Report.query().$promise.then((values) => {
      $scope.$evalAsync(() => {
        this.values = values;
      })
    });
  }
}

angular.module('ReportsComponent', [])

.directive('reports', () => ({
  scope: {},
  controllerAs: 'reports',
  controller: ReportsComponent,
  bindToController: true,
  templateUrl: 'components/reports/reports.html'
}));

