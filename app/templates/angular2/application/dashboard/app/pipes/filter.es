
import {Pipe, PipeFactory, NullPipeFactory} from 'angular2/angular2';
import {Pipes} from 'angular2/change_detection';

export class FilterPipe implements Pipe {
  supports(array) {
    Array.isArray(array);
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

// We create a factory since we create an instance for each binding for stateful pipes
export class FilterFactory implements PipeFactory {
  supports(array): boolean {
    return Array.isArray(array);
  }
  create(ref): Pipe {
    return new FilterPipe();
  }
}

// Since templates in angular are async we are passing the value to
// NullPipeFactory if the value is not supported
export var filter = [new FilterFactory(), new NullPipeFactory()];

export var filterPipe = Pipes.extend({'filter': filter});
