import {Component, View, coreDirectives} from 'angular2/angular2';
import {ReportService} from './services/report.js';
import {filterPipe} from 'pipes/filter.js';
import {SearchService} from 'services/search.js';

@Component({
  selector: 'reports',
  viewBindings: [ReportService, filterPipe]
})
@View({
  templateUrl: 'components/reports/reports.html',
  directives: [coreDirectives]
})
export class ReportsComponent {
  constructor(Report: ReportService, search: SearchService) {
    this.reports = Report.query();
    this.search = search;
  }
}
