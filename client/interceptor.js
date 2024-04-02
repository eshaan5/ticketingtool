app.config([
  "$httpProvider",
  function ($httpProvider, $q) {
    $httpProvider.interceptors.push(function () {
      return {
        request: function (config) {
          config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
          if (!config.url.startsWith(".") && !config.url.startsWith("/") && !config.url.startsWith("uib") && !config.url.endsWith(".html")) {
            config.url = "http://localhost:3000/" + config.url;
          }
          return config;
        },
        response: function (response) {
          if (response.status.toString().startsWith("4") || response.status.toString().startsWith("5")) {
            console.log(response.status);
          }
          return response;
        },
      };
    });
  },
]);
