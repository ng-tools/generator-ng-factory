import {Component, View} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';

@Component({
  selector: 'sidebar'
})
@View({
  directives: [RouterLink],
  templateUrl: 'components/sidebar/sidebar.html'
})
export class SidebarComponent {
  constructor() {
  }
}