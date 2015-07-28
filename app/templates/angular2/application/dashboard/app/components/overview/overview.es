import {Component, View, coreDirectives} from 'angular2/angular2';

@Component({
  selector: 'overview'
})
@View({
  templateUrl: 'components/overview/overview.html',
  directives: [coreDirectives]
})
export class Overview {
  title: string;
  // reports: Array<Object>;
  constructor() {
    this.title = 'Dashboard';
    // this.reports = [{name: 'Aarav'}, {name: 'Martín'}, {name: 'Shannon'}, {name: 'Ariana'}, {name: 'Kai'}];
    setTimeout(() => {
      this.title = 'Dashboard 2';
    }, 2000);
  }
}