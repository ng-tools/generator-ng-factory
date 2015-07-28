// babel --plugins babel-plugin-angular2-annotations --optional es7.decorators app/scripts/app.es

import {Component, View, bootstrap} from 'angular2/angular2';

import {RouteConfig, RouterOutlet, RouterLink, Router, routerInjectables} from 'angular2/router';

import {Overview} from './components/overview/overview.js';
import {Analytics} from './components/analytics/analytics.js';

import {Navbar} from './components/navbar/navbar.js';
import {Sidebar} from './components/sidebar/sidebar.js';

@Component({
  selector: 'app'
})
@View({
  directives: [Navbar, Sidebar, RouterOutlet, RouterLink],
  // templateUrl: 'views/partials/sidebar.html'
  template: `
    <navbar></navbar>
    <div class="container-fluid">
      <div class="row">
        <sidebar class="sidebar col-sm-3 col-md-2"></sidebar>
        <main class="main col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
@RouteConfig([
  {path: '/', redirectTo: '/overview'},
  {path: '/overview', component: Overview, as: 'overview'},
  {path: '/analytics', component: Analytics, as: 'analytics'}
])
// Component controller
class AppComponent {
  title: string;
  constructor(router: Router) {
    this.title = 'Yet another amazing Angular2 app!';
  }
}

bootstrap(AppComponent, [routerInjectables]);
