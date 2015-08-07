import {Component, View} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';
import {SearchService} from 'services/search.js';

@Component({
  selector: 'navbar'
})
@View({
  directives: [RouterLink],
  templateUrl: 'components/navbar/navbar.html'
})
export class NavbarComponent {
  constructor(search: SearchService) {
    this.title = 'Dashboard';
    this.search = search;
  }
  onKeyUp(ev, value) {
    this.search.value = value;
  }
}
