import {Component, View, bootstrap} from 'angular2/angular2';

@Component({
  selector: 'app'
})
@View({
  directives: [],
  templateUrl: 'app.html'
})
class AppComponent {
  constructor() {
    this.name = 'World';
    setTimeout(() => {
      this.name += ' v2!';
    }, 2000);
  }
}

bootstrap(AppComponent, []);
