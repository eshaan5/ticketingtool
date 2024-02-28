var app = angular.module("myApp", ["ngRoute", "ui.bootstrap"]);

app.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "./login/login.html",
        controller: "LoginController",
      })
      .otherwise({
        redirectTo: "/",
      });
  },
]);
