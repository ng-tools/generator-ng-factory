import {Component, View, bootstrap} from 'angular2/angular2';

import {RouteConfig, RouterOutlet, RouterLink, ROUTER_BINDINGS} from 'angular2/router';

import {OverviewComponent} from './components/overview/overview.js';
import {AnalyticsComponent} from './components/analytics/analytics.js';
import {ReportsComponent} from './components/reports/reports.js';

import {NavbarComponent} from './components/navbar/navbar.js';
import {SidebarComponent} from './components/sidebar/sidebar.js';
import {SearchService} from 'services/search.js';

@Component({
  selector: 'app',
  viewBindings: [SearchService]
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
  constructor() {
  }
}

bootstrap(AppComponent, [ROUTER_BINDINGS]);
