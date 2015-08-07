import {Component, View, bootstrap} from 'angular2/angular2';

import {RouteConfig, RouterOutlet, RouterLink, Router, routerInjectables} from 'angular2/router';

import {OverviewComponent} from './components/overview/overview.js';
import {AnalyticsComponent} from './components/analytics/analytics.js';
import {ReportsComponent} from './components/reports/reports.js';

import {NavbarComponent} from './components/navbar/navbar.js';
import {SidebarComponent} from './components/sidebar/sidebar.js';
import {SearchService} from 'services/search.js';

@Component({
  selector: 'app',
  viewInjector: [SearchService]
})
@View({
  directives: [NavbarComponent, SidebarComponent, RouterOutlet, RouterLink],
  templateUrl: 'app.html'
})
@RouteConfig([
  {path: '/', redirectTo: '/overview'},
  {path: '/overview', component: OverviewComponent, as: 'overview'},
  {path: '/analytics', component: AnalyticsComponent, as: 'analytics'},
  {path: '/reports', component: ReportsComponent, as: 'reports'}
])
class AppComponent {
  constructor(router: Router) {
  }
}

bootstrap(AppComponent, [routerInjectables]);
