import {Query, QueryList, Directive} from 'angular2/angular2';
import {ElementRef} from 'angular2/core';
import {Router, RouterLink, Location} from 'angular2/router';
import {Renderer} from 'angular2/render';

@Directive({
  selector: '[router-active-class]',
  properties: ['activeClass: router-active-class']
})
export class RouterActiveClass {
  constructor(@Query(RouterLink) dependencies: QueryList, _ngEl: ElementRef, _location: Location, _router: Router, _renderer: Renderer) {
    this._ngEl = _ngEl;
    this._location = _location;
    this._renderer = _renderer;
    this._router = _router;
    this._dependencies = dependencies;
    this._router.subscribe(this.onLocationChange.bind(this));
  }
  set activeClass(change) {
    this._activeClass = change && !isNaN(change) ? change : 'active';
  }
  onLocationChange(_navigationHref) {
    this._visibleHref = this._dependencies.first.visibleHref;
    const enabled = this._visibleHref.indexOf(this._location.path()) !== -1;
    this._renderer.setElementClass(this._ngEl, this._activeClass, enabled);
  }
}
