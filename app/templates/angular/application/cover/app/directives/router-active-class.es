
class RouterActiveClass {
  constructor($element, $location, $scope, $rootScope) {
    this._$element = $element;
    this._$location = $location;
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
    const enabled = this._navigationHref.indexOf(this._$location.path()) !== -1;
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