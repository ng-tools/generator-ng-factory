import {Component, View} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';
import {RouterActiveClass} from 'directives/router-active-class.js';

@Component({
  selector: 'sidebar'
})
@View({
  directives: [RouterLink, RouterActiveClass],
  templateUrl: 'components/sidebar/sidebar.html'
})
export class SidebarComponent {
  constructor() {
  }
}
