
import {Pipe} from 'angular2/angular2';

@Pipe({
  name: 'filter'
})
export class FilterPipe {
  supports(array) {
    return Array.isArray(array);
  }
  onDestroy() {}
  transform(values, args = []) {
    return !args[0] ? values : values.filter(function(object) {
      return Object.keys(object).some(function(key) {
        return String(object[key]).toLowerCase().indexOf(String(args[0]).toLowerCase()) !== -1;
      });
    });
  }
}
