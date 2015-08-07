
angular.module('AppComponent')

.directive('routerLink', ($route, $rootScope) => ({
  restrict: 'A',
  compile: (element, attrs) => {
    let routes = $rootScope.$eval(attrs.routerLink);
    for (let route of routes) {
      if($route.routes[route]) {
        element[0].setAttribute('href', $route.routes[route].originalPath);
        break;
      }
    }
  }
}));