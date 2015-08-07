
angular.module('AppComponent')

.service('search', class SearchService {
  constructor() {
    this._value = '';
  }
  get value() {
    return this._value;
  }
  set value(value) {
    return this._value = value;
  }
});
