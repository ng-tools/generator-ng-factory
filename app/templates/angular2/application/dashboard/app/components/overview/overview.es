import {Component, View, coreDirectives} from 'angular2/angular2';
import {ReportsComponent} from '../reports/reports.js';
import {AnalyticsComponent} from '../analytics/analytics.js';

@Component({
  selector: 'overview'
})
@View({
  templateUrl: 'components/overview/overview.html',
  directives: [coreDirectives, ReportsComponent, AnalyticsComponent]
})
export class OverviewComponent {
  constructor() {
    this.title = 'Dashboard';
    setTimeout(() => {
      this.title += ' v2!';
    }, 2000);
  }
}
