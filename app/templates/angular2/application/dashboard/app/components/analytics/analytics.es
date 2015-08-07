import {Component, View} from 'angular2/angular2';

@Component({
  selector: 'analytics'
})
@View({
  templateUrl: 'components/analytics/analytics.html'
})
export class AnalyticsComponent {
  title: string;
  constructor() {
    this.title = 'Analytics';
  }
}
