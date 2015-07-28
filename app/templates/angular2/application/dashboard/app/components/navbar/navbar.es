import {Component, View} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';

@Component({
  selector: 'navbar'
})
@View({
  directives: [RouterLink],
  templateUrl: 'components/navbar/navbar.html'
})
export class Navbar {
  name: string;
  constructor() {
    this.name = 'Alice';
  }
}