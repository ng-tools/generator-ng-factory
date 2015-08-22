
class RouterActiveClass {
  constructor($element, $scope, $rootScope, $route) {
    this._$element = $element;
    this._$route = $route;
    $scope.$evalAsync(() => {
      this._controllers = [].slice.call(this._$element[0].querySelectorAll('[router-link]'), 0).map((el) => {
        return angular.element(el).controller('routerLink');
      });
      this._navigationHref = this._controllers[0]._navigationHref;
      this.render();
    });
    $rootScope.$on('$routeChangeSuccess', this.render.bind(this));
  }
  render() {
    if (!this._$route || !this._$route.current || !this._$route.current.$$route) return;
    const enabled = this._$route.current.$$route.regexp.test(this._navigationHref);
    this._$element.toggleClass(this._activeClass || 'active', enabled);
  }
}

angular.module('AppComponent')

.directive('routerActiveClass', () => ({
  restrict: 'A',
  controller: RouterActiveClass,
  controllerAs: '$ctrl',
  bindToController: true,
  scope: {
    _activeClass: '=routerActiveClass'
  }
}));