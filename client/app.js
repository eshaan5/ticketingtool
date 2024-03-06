var app = angular.module("myApp", ["ngRoute", "ui.bootstrap"]);

app.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "./login/login.html",
        controller: "LoginController",
      })
      .when("/superAdmin", {
        templateUrl: "./superAdmin/superAdmin.html",
        controller: "SuperAdminController",
      })
      .when("/detailsForm", {
        templateUrl: "./detailsForm/detailsForm.html",
        controller: "DetailsFormController",
      })
      .when("/admin", {
        templateUrl: "./admin/admin.html",
        controller: "AdminController",
      })
      .otherwise({
        redirectTo: "/",
      });
  },
]);
