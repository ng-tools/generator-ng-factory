import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';
import {ReportsComponent} from '../reports/reports.js';
import {AnalyticsComponent} from '../analytics/analytics.js';

@Component({
  selector: 'overview'
})
@View({
  templateUrl: 'components/overview/overview.html',
  directives: [CORE_DIRECTIVES, ReportsComponent, AnalyticsComponent]
})
export class OverviewComponent {
  constructor() {
    this.title = 'Dashboard';
    setTimeout(() => {
      this.title += ' v2!';
    }, 2000);
  }
}
