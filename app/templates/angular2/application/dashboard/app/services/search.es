
export class SearchService {
  constructor() {
    this._value = '';
  }
  get value() {
    return this._value;
  }
  set value(value) {
    return this._value = value;
  }
}
