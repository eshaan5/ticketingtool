var app = angular.module("myApp", ["ngRoute", "ui.bootstrap", 'ngAnimate']);

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
      .when("/agent", {
        templateUrl: "./app/agent/agent.html",
        controller: "AgentController",
      })
      .when("/ticket", {
        templateUrl: "./app/ticket/ticket.html",
        controller: "TicketController",
      })
      .when("/analytics", {
        templateUrl: "./app/analytics/analytics.html",
        // controller: "AnalyticsController"
      })
      .otherwise({
        redirectTo: "/",
      });
  },
]);

app.controller("BodyController", [
  "$scope",
  "$location",
  function ($scope, $location) {
  },
]);
