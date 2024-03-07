var app = angular.module("myApp", ["ngRoute", "ui.bootstrap"]);

app.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "./app/login/login.html",
        controller: "LoginController",
      })
      .when("/superAdmin", {
        templateUrl: "./app/superAdmin/superAdmin.html",
        controller: "SuperAdminController",
      })
      .when("/admin", {
        templateUrl: "./app/admin/admin.html",
        controller: "AdminController",
      })
      .otherwise({
        redirectTo: "/",
      });
  },
]);
