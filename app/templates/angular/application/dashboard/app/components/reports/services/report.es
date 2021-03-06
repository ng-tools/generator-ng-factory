
angular.module('ReportsComponent')

.service('Report', class ReportService {
  constructor() {
    this._data = [];
  }
  get data() {
    return this._data;
  }
  query() {
    let promise = fetch('/components/reports/fixtures/reports.json', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      return this._data = res.json();
    });
    // Expose an ngResource-like API
    return {$promise: promise};
  }
});
