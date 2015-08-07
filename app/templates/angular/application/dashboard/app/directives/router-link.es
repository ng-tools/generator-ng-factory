
class RouterLink {
  constructor($element, $route) {
    this._$element = $element;
    for (const route of this._routeParams) {
      if($route.routes[route]) {
        this._navigationHref = $route.routes[route].originalPath;
        this._$element[0].setAttribute('href', this._navigationHref);
        break;
      }
    }
  }
}

angular.module('AppComponent')

.directive('routerLink', () => ({
  restrict: 'A',
  controller: RouterLink,
  controllerAs: '$ctrl',
  bindToController: true,
  scope: {
    _routeParams: '=routerLink'
  }
}));