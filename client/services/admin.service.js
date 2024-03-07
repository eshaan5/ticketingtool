app.service("AdminService", function ($http) {
    // Service logic for signup page
    this.addAgent = function (formData) {
      return $http({
        method: "POST",
        url: "http://localhost:3000/user/createUser",
        data: formData,
        params: {
            brandId: JSON.parse(localStorage.getItem("user")).brandId
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    };
  
    this.getAgents = function () {
      return $http({
        method: "GET",
        url: "http://localhost:3000/user/allAgents",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    };
  });
  