import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';
import {ReportService} from './services/report.js';
import {FilterPipe} from 'pipes/filter.js';
import {SearchService} from 'services/search.js';

@Component({
  selector: 'reports',
  viewBindings: [ReportService]
})
@View({
  templateUrl: 'components/reports/reports.html',
  directives: [CORE_DIRECTIVES],
  pipes: [FilterPipe]
})
export class ReportsComponent {
  constructor(Report: ReportService, search: SearchService) {
    this.reports = Report.query();
    this.search = search;
  }
}
